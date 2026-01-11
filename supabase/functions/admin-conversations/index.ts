import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Allowed origins for admin endpoint (restrict CORS)
const ALLOWED_ORIGINS = [
  "https://id-preview--tgvwbvwxhjguqemwwbyg.lovable.app", // Lovable preview
  "https://pramodsunkara.com", // Production domain (if applicable)
  "http://localhost:8080",
  "http://localhost:5173",
  "http://localhost:3000",
];

/**
 * Get CORS headers based on request origin
 */
function getCorsHeaders(origin: string | null): Record<string, string> {
  const isAllowed = origin && ALLOWED_ORIGINS.some(allowed => 
    origin === allowed || origin.endsWith(".lovable.app")
  );
  
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin! : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Credentials": "false",
  };
}

/**
 * Validate date filter format
 */
function isValidDateFilter(dateFilter: unknown): dateFilter is string {
  if (!dateFilter || typeof dateFilter !== 'string') return false;
  const date = new Date(dateFilter);
  return !isNaN(date.getTime());
}

serve(async (req) => {
  // Get origin-specific CORS headers
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
      console.error("Supabase credentials not configured");
      return new Response(
        JSON.stringify({ error: "Service configuration error" }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get the authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create client with user's JWT to verify authentication
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Verify the user is authenticated
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user) {
      console.warn("Auth verification failed:", authError?.message);
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if user has admin role using service role client
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    const { data: roles, error: rolesError } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin");

    if (rolesError || !roles || roles.length === 0) {
      console.warn(`User ${user.id} attempted admin access without permission`);
      return new Response(
        JSON.stringify({ error: "Forbidden - Admin access required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // User is authenticated and has admin role - proceed with request
    const { dateFilter, searchQuery } = await req.json();

    let query = supabaseAdmin
      .from("chatbot_conversations")
      .select("*")
      .order("created_at", { ascending: false });

    // Apply date filter if provided (with validation)
    if (dateFilter) {
      if (!isValidDateFilter(dateFilter)) {
        return new Response(
          JSON.stringify({ error: "Invalid date format" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      const startDate = new Date(dateFilter);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(dateFilter);
      endDate.setHours(23, 59, 59, 999);
      query = query
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString());
    }

    const { data, error } = await query;

    if (error) {
      console.error("Database query error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch conversations" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Apply search filter if provided
    let filteredData = data || [];
    if (searchQuery) {
      const lowerSearch = searchQuery.toLowerCase();
      filteredData = filteredData.filter((msg: { content: string }) =>
        msg.content.toLowerCase().includes(lowerSearch)
      );
    }

    console.log(`Admin ${user.email} fetched ${filteredData.length} conversation records`);

    return new Response(
      JSON.stringify({ conversations: filteredData }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Admin conversations error:", error);
    return new Response(
      JSON.stringify({ error: "Unable to process request" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});