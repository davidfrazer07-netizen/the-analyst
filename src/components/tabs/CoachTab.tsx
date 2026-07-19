"use client";

import { useState } from "react";
import { GlassCard, SectionTitle, GhostButton } from "../ui";

const AI_ASSISTANT_URL = process.env.NEXT_PUBLIC_AI_ASSISTANT_URL;

const CANNED_REPLY =
  "The live AI coach isn't connected yet (needs the Supabase backend deployed), so I can't answer that live yet. Once connected, I'll read your journal and strategy answers to give real coaching here.";

export default function CoachTab() {
  const [chat, setChat] = useState<{ role: "user" | "assistant"; text: string }[]>([
    {
      role: "assistant",
      text: "I'm your AI coach. Ask me about your strategy, how your current trading is going, or whether you're on track with your 30-day plan.",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  async function send() {
    if (!draft.trim() || sending) return;
    const userMsg = { role: "user" as const, text: draft };
    setChat((c) => [...c, userMsg]);
    setDraft("");

    if (!AI_ASSISTANT_URL) {
      setTimeout(() => {
        setChat((c) => [...c, { role: "assistant", text: CANNED_REPLY }]);
      }, 300);
      return;
    }

    setSending(true);
    try {
      const history = [...chat, userMsg].map((m) => ({
        role: m.role,
        content: m.text,
      }));
      const res = await fetch(AI_ASSISTANT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text, history }),
      });
      const data = await res.json();
      if (res.ok) {
        setChat((c) => [...c, { role: "assistant", text: data.reply }]);
      } else {
        setChat((c) => [...c, { role: "assistant", text: `AI coach error: ${data.error ?? "unknown"}` }]);
      }
    } catch {
      setChat((c) => [...c, { role: "assistant", text: "Couldn't reach the AI coach. Try again shortly." }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 pb-28">
      <GlassCard>
        <SectionTitle>AI Coach</SectionTitle>
        <div className="flex max-h-[420px] flex-col gap-2 overflow-y-auto">
          {chat.map((m, i) =>
            m.role === "assistant" ? (
              <div key={i} className="max-w-[85%] self-start rounded-xl bg-surface2/60 px-3 py-2 text-xs leading-relaxed text-text">
                {m.text}
              </div>
            ) : (
              <div
                key={i}
                className="max-w-[85%] self-end rounded-xl border border-accent/50 bg-accent/20 px-3 py-2 text-xs leading-relaxed text-purple-hi"
              >
                {m.text}
              </div>
            )
          )}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <input
            name="coach-question"
            placeholder="Ask your coach anything..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
            className="flex-1 rounded-xl border border-line bg-surface2/40 px-3 py-2 text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent"
          />
          <GhostButton accent className="w-auto px-4" onClick={send} disabled={sending}>
            {sending ? "…" : "Send"}
          </GhostButton>
        </div>
      </GlassCard>
    </div>
  );
}
