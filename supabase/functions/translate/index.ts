import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, sourceLanguage, targetLanguage, conversationHistory } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const languageNames: Record<string, string> = {
      en: "English",
      hi: "Hindi (हिन्दी)",
      bn: "Bengali (বাংলা)",
      te: "Telugu (తెలుగు)",
      mr: "Marathi (मराठी)",
      ta: "Tamil (தமிழ்)",
      gu: "Gujarati (ગુજરાતી)",
      kn: "Kannada (ಕನ್ನಡ)",
      ml: "Malayalam (മലയാളം)",
      or: "Odia (ଓଡ଼ିଆ)",
      pa: "Punjabi (ਪੰਜਾਬੀ)",
      as: "Assamese (অসমীয়া)",
      mai: "Maithili (मैथिली)",
      sa: "Sanskrit (संस्कृतम्)",
      ne: "Nepali (नेपाली)",
      sd: "Sindhi (سنڌي)",
      ks: "Kashmiri (कॉशुर)",
      doi: "Dogri (डोगरी)",
      kok: "Konkani (कोंकणी)",
      mni: "Manipuri (মৈতৈলোন্)",
      sat: "Santali (ᱥᱟᱱᱛᱟᱲᱤ)",
      bo: "Bodo (बड़ो)",
      ur: "Urdu (اردو)"
    };

    const sourceLang = languageNames[sourceLanguage] || sourceLanguage;
    const targetLang = languageNames[targetLanguage] || targetLanguage;

    const systemPrompt = `You are BharatVoice, an advanced AI assistant specializing in Indian languages. You provide:
1. Accurate translations between ${sourceLang} and ${targetLang}
2. Cultural context and nuances
3. Regional variations and dialects
4. Help with government services, education, healthcare, and daily tasks

When translating:
- First provide the translation in ${targetLang}
- Then provide a brief explanation if needed
- Be culturally sensitive and use appropriate honorifics
- Handle code-mixed language (Hinglish, Benglish, etc.)

Always respond naturally and helpfully. If the user speaks in ${sourceLang}, respond in ${targetLang}.`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...(conversationHistory || []).slice(-10),
      { role: "user", content: message }
    ];

    console.log("Sending request to AI gateway with messages:", JSON.stringify(messages).substring(0, 500));

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Please add credits to continue using AI features." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Translation error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
