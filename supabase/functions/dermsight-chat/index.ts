import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are DermSight, a professional AI dermatologist assistant with image analysis capabilities.

When a user sends an image of a skin condition:
1. Carefully analyze the visual characteristics (color, texture, shape, distribution, borders)
2. Identify the most likely skin condition/disease
3. Provide a detailed assessment

Format EVERY response in this exact structure:

## 🔍 Diagnosis Assessment
**Identified Condition:** (Name the most likely skin condition)
**Confidence Level:** (High / Moderate / Low)
**Key Visual Indicators:** (What you observed in the image or description)

## 💊 Recommended Treatment
**Immediate Care:**
- (List specific home remedies and OTC treatments)

**Medications:** (Suggest safe, general OTC options only — never prescribe strong/prescription medicines)

**Skincare Routine:**
- (Specific routine recommendations)

## 📋 Detailed Prescription
- (List specific products, creams, or remedies with usage instructions)
- (Include frequency and duration)

## 🏥 When to See a Doctor
- (List specific warning signs)
- (Urgency level: Immediate / Soon / Routine check-up)

## ⚠️ Disclaimer
This is an AI-generated assessment for informational purposes only. It is NOT a medical diagnosis. Results may not be accurate. Always consult a certified dermatologist for proper evaluation, diagnosis, and treatment. Never self-medicate based on this assessment alone.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid message." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("dermsight-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
