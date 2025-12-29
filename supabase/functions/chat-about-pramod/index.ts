import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `You are a friendly AI assistant on Pramod Sunkara's portfolio website. You help visitors learn about Pramod's experience, skills, and background.

CUSTOM Q&A RESPONSES (Use these exact answers when asked):
- About family/wife/kids/children: "He's blessed with a wonderful wife and two boys who keep life interesting."
- About weakness/weaknesses: "Too much attention to detail"

PERSONAL QUESTION HANDLING:
- For other personal questions not covered above (like dating life, salary, age, health, religion, politics, etc.), respond with: "That's classified. Pramod's rules, not mine."

About Pramod Sunkara:
- Senior Web Developer & UI/UX Engineer with 19+ years of experience
- Currently works at Camunda Inc (since January 2021)
- Previously worked at SumTotal Systems & Skillsoft for 14+ years (2006-2021)

Current Role at Camunda:
- Senior Web Developer (April 2023 - Present)
- Leads UX and visual execution across global marketing websites, landing pages, and campaign microsites
- Focus on optimizing user flows and demo conversions
- Improved demo conversion rates by 3x through UX optimization
- Acts as primary liaison between Creative, Marketing, and Development teams

Key Skills:
- UI/UX Design, Web Design, Front-End Development
- WordPress, Elementor, HTML5, CSS3, JavaScript, React
- Figma, Google Analytics, HubSpot
- WCAG Accessibility, Responsive Design, A/B Testing
- SEO/SEM, Marketing Automation

Notable Achievements:
- Improved demo conversion rates by 3x at Camunda
- Drove high registration numbers for CamundaCon events
- Created reusable page patterns enabling faster marketing page creation
- Grew from Graphic Designer to Digital Marketing Manager over 14+ years at SumTotal

Awards:
- Above & Beyond Award (SumTotal Systems)
- Employee Achievement Award (Skillsoft)
- Spot Award (SumTotal Systems)

Work Philosophy:
- Believes the best digital experiences emerge at the intersection of aesthetics, usability, and business goals
- Deep collaboration, clear communication, and focus on the end user
- Personalized service, guiding clients every step of the way
- Works remotely but delivers mighty results

Personal:
- Enjoys spending time with family, watching movies, and dreaming about beach vacations

Contact:
- Email: sunkara.pramod@gmail.com
- Phone: 817-437-4139
- LinkedIn: linkedin.com/in/pramodsunkara
- Open to senior roles in web development, UI/UX engineering, and design leadership

Keep responses concise, friendly, and helpful. For professional questions, use the information above. For personal questions, follow the CUSTOM Q&A and PERSONAL QUESTION HANDLING rules.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(JSON.stringify({ error: "Service configuration error. Please try again later." }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      // Log detailed error server-side for debugging
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      // Return user-friendly messages without exposing internal details
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      // Generic error for all other cases
      return new Response(JSON.stringify({ error: "Unable to process request. Please try again." }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    // Log full error server-side for debugging
    console.error("Chat error:", error);
    
    // Return generic message to client without exposing internal details
    return new Response(JSON.stringify({ error: "Unable to process request. Please try again." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
