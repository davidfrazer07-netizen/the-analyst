// Supabase Edge Function: secure proxy to OpenRouter.
//
// The OpenRouter API key is read from a server-side secret (OPENROUTER_API_KEY),
// never shipped to the client. Deploy with:
//   supabase functions deploy ai-assistant
//   supabase secrets set OPENROUTER_API_KEY=sk-or-...
//
// The static frontend calls this function's URL (safe to expose publicly —
// it's just an endpoint, not a credential) instead of calling OpenRouter directly.

const MODEL = "nvidia/nemotron-3-ultra-550b-a55b:free";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const apiKey = Deno.env.get("OPENROUTER_API_KEY");
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "AI assistant not configured yet." }), {
      status: 503,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { message, history, mode } = body;

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Missing 'message' string in request body." }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    if (mode === "voice-journal") {
      const journalMessages = [
        {
          role: "system",
          content:
            'You are a trading journal analyst inside The Analyst app. Given a trader\'s raw voice note transcript about a trade they took, extract a concise structured journal entry. Respond with STRICT JSON only, no markdown fences, no commentary — exactly this shape: {"summary": string (1-2 sentences, third person, what happened), "sentiment": "disciplined" | "emotional" | "neutral", "keyLesson": string (one short actionable takeaway), "symbol": string or null (trading instrument/symbol mentioned, e.g. "XAUUSD", or null if none mentioned)}.',
        },
        { role: "user", content: message },
      ];

      const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "tencent/hy3:free",
          messages: journalMessages,
          // This model's OpenRouter route (Novita) only supports the
          // json_schema response format, not json_object.
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "trade_journal_entry",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  summary: { type: "string" },
                  sentiment: { type: "string", enum: ["disciplined", "emotional", "neutral"] },
                  keyLesson: { type: "string" },
                  symbol: { type: ["string", "null"] },
                },
                required: ["summary", "sentiment", "keyLesson", "symbol"],
                additionalProperties: false,
              },
            },
          },
          max_tokens: 400,
        }),
      });

      if (!upstream.ok) {
        const detail = await upstream.text();
        return new Response(JSON.stringify({ error: "Upstream model call failed.", detail }), {
          status: 502,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
      }

      const data = await upstream.json();
      const raw = data?.choices?.[0]?.message?.content ?? "";

      try {
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed.summary !== "string") {
          return new Response(JSON.stringify({ error: "Could not parse journal analysis.", raw }), {
            status: 502,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify({ journal: parsed }), {
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
      } catch {
        return new Response(JSON.stringify({ error: "Could not parse journal analysis.", raw }), {
          status: 502,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
      }
    }

    const messages = [
      {
        role: "system",
        content:
          "You are the AI Assistant inside The Analyst, a trading app. Answer questions about trading strategy, " +
          "market structure concepts (support/resistance, liquidity, delivery profiles), and general trading " +
          "psychology concisely and practically. Keep answers under 120 words unless the question needs more.",
      },
      ...(Array.isArray(history) ? history.slice(-10) : []),
      { role: "user", content: message },
    ];

    const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model: MODEL, messages, max_tokens: 400 }),
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      return new Response(JSON.stringify({ error: "Upstream model call failed.", detail }), {
        status: 502,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const data = await upstream.json();
    const reply = data?.choices?.[0]?.message?.content ?? "No response generated.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Request failed.", detail: String(err) }), {
      status: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }
});
