import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple in-memory rate limiting (resets on cold start, but good enough for basic protection)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms

/**
 * Hash a string using SHA-256 (for IP privacy)
 */
async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Check rate limit for an IP hash
 */
function checkRateLimit(ipHash: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ipHash);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ipHash, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

/**
 * Get geo location from IP (coarse only - country/region)
 */
async function getGeoFromIP(ip: string): Promise<{ country: string | null; region: string | null }> {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName`);
    if (!response.ok) return { country: null, region: null };
    
    const data = await response.json();
    if (data.status === "success") {
      return { country: data.country || null, region: data.regionName || null };
    }
  } catch (error) {
    console.error("Geo lookup failed:", error);
  }
  return { country: null, region: null };
}

/**
 * Parse device type from user agent
 */
function getDeviceType(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android.*mobile|windows phone|blackberry/i.test(ua)) return "mobile";
  return "desktop";
}

/**
 * Parse browser name from user agent
 */
function getBrowser(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes("edg/")) return "Edge";
  if (ua.includes("chrome") && !ua.includes("edg")) return "Chrome";
  if (ua.includes("firefox")) return "Firefox";
  if (ua.includes("safari") && !ua.includes("chrome")) return "Safari";
  if (ua.includes("opera") || ua.includes("opr")) return "Opera";
  return "Unknown";
}

/**
 * Parse OS from user agent
 */
function getOS(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes("windows")) return "Windows";
  if (ua.includes("mac os")) return "macOS";
  if (ua.includes("linux")) return "Linux";
  if (ua.includes("android")) return "Android";
  if (ua.includes("iphone") || ua.includes("ipad")) return "iOS";
  return "Unknown";
}

/**
 * Initialize Supabase client with service role
 */
function getSupabaseClient() {
  return createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only accept POST
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ ok: false, error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    // Parse request body
    const body = await req.json();
    const { feedbackText, honeypot, metadata = {} } = body;

    // Honeypot check - if filled, it's a bot
    if (honeypot && honeypot.trim() !== "") {
      console.log("Honeypot triggered - blocking spam submission");
      // Return success to not alert the bot
      return new Response(
        JSON.stringify({ ok: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate feedback text
    if (!feedbackText || typeof feedbackText !== "string") {
      return new Response(
        JSON.stringify({ ok: false, error: "Feedback is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const trimmedFeedback = feedbackText.trim();
    if (trimmedFeedback.length < 5) {
      return new Response(
        JSON.stringify({ ok: false, error: "Feedback must be at least 5 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (trimmedFeedback.length > 500) {
      return new Response(
        JSON.stringify({ ok: false, error: "Feedback must be 500 characters or less" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get client IP for rate limiting and hashing
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() 
      || req.headers.get("x-real-ip") 
      || "unknown";
    
    // Hash the IP for privacy
    const ipHash = await hashString(clientIP + Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));

    // Rate limit check
    if (!checkRateLimit(ipHash)) {
      console.log("Rate limit exceeded for IP hash:", ipHash.substring(0, 8));
      return new Response(
        JSON.stringify({ ok: false, error: "Too many submissions. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get geo data (coarse only)
    const geo = await getGeoFromIP(clientIP);

    // Parse user agent
    const userAgent = metadata.userAgent || req.headers.get("user-agent") || "";
    const deviceType = getDeviceType(userAgent);
    const browser = getBrowser(userAgent);
    const os = getOS(userAgent);

    // Prepare data for insertion
    const feedbackData = {
      feedback_text: trimmedFeedback,
      page_url: metadata.pageUrl || null,
      referrer: metadata.referrer || null,
      user_agent: userAgent || null,
      accept_language: metadata.acceptLanguage || null,
      timezone_offset: typeof metadata.timezoneOffset === "number" ? metadata.timezoneOffset : null,
      viewport_width: typeof metadata.viewportWidth === "number" ? metadata.viewportWidth : null,
      viewport_height: typeof metadata.viewportHeight === "number" ? metadata.viewportHeight : null,
      device_type: deviceType,
      browser: browser,
      os: os,
      utm_source: metadata.utmSource || null,
      utm_medium: metadata.utmMedium || null,
      utm_campaign: metadata.utmCampaign || null,
      ip_hash: ipHash,
      geo_country: geo.country,
      geo_region: geo.region,
    };

    console.log("Saving feedback:", {
      textLength: trimmedFeedback.length,
      deviceType,
      browser,
      os,
      country: geo.country,
    });

    // Insert into database
    const supabase = getSupabaseClient();
    const { error: insertError } = await supabase
      .from("exit_feedback")
      .insert(feedbackData);

    if (insertError) {
      console.error("Database insert error:", insertError);
      return new Response(
        JSON.stringify({ ok: false, error: "Failed to save feedback" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Feedback saved successfully");
    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ ok: false, error: "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
