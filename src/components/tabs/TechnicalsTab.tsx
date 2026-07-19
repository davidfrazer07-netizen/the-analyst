"use client";

import { useState } from "react";
import { GlassCard, SectionTitle, GhostButton, Pill } from "../ui";
import ProfilesSection from "../ProfilesSection";
import { educationTopics, strategyQuestions } from "@/lib/mockData";

type ChatMsg = { role: "user" | "assistant"; text: string };

const CANNED_REPLIES: Record<string, string> = {
  support:
    "Support is a price level where historical buying pressure has repeatedly stopped a decline. Resistance is the mirror: a level where selling pressure has repeatedly stopped an advance. Mark them from prior swing highs/lows and reactions, not every minor wiggle.",
  default:
    "Good question — the live AI assistant isn't connected yet (needs the Supabase backend deployed), so I'm running on placeholder responses for now.",
};

// Set via NEXT_PUBLIC_AI_ASSISTANT_URL at build time once the Supabase Edge
// Function (supabase/functions/ai-assistant) is deployed. Safe to expose —
// it's an endpoint URL, not a credential. Falls back to canned replies if unset.
const AI_ASSISTANT_URL = process.env.NEXT_PUBLIC_AI_ASSISTANT_URL;

export default function TechnicalsTab() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [chat, setChat] = useState<ChatMsg[]>([
    { role: "assistant", text: "Ask me anything about your strategy, market structure, or a concept you're unsure about." },
  ]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  const healthScore = Object.values(answers).filter(Boolean).length;
  const answeredCount = Object.values(answers).filter((v) => v !== null && v !== undefined).length;

  const send = async () => {
    if (!draft.trim() || sending) return;
    const q = draft.trim();
    const nextChat = [...chat, { role: "user" as const, text: q }];
    setChat(nextChat);
    setDraft("");

    if (!AI_ASSISTANT_URL) {
      const reply =
        q.toLowerCase().includes("support") || q.toLowerCase().includes("resistance")
          ? CANNED_REPLIES.support
          : CANNED_REPLIES.default;
      setTimeout(() => setChat((c) => [...c, { role: "assistant", text: reply }]), 300);
      return;
    }

    setSending(true);
    try {
      const res = await fetch(AI_ASSISTANT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: q,
          history: nextChat.slice(0, -1).map((m) => ({ role: m.role, content: m.text })),
        }),
      });
      const data = await res.json();
      const reply = res.ok ? data.reply : `AI assistant error: ${data.error ?? "unknown"}`;
      setChat((c) => [...c, { role: "assistant", text: reply }]);
    } catch {
      setChat((c) => [...c, { role: "assistant", text: "Couldn't reach the AI assistant. Try again shortly." }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-28">
      <ProfilesSection />

      <GlassCard>
        <div className="flex items-center justify-between">
          <SectionTitle>Strategy Health Check</SectionTitle>
          <span className="text-xs font-semibold text-purple-hi">
            {healthScore}/{strategyQuestions.length} on-plan
          </span>
        </div>
        <div className="mt-3 flex flex-col gap-2.5">
          {strategyQuestions.map((q) => (
            <div key={q.id} className="rounded-xl border border-line bg-surface2/40 p-3">
              <div className="text-sm text-text">{q.question}</div>
              <div className="mt-2 flex gap-2">
                <Pill active={answers[q.id] === true} onClick={() => setAnswers((a) => ({ ...a, [q.id]: true }))}>
                  Yes
                </Pill>
                <Pill active={answers[q.id] === false} onClick={() => setAnswers((a) => ({ ...a, [q.id]: false }))}>
                  No
                </Pill>
              </div>
            </div>
          ))}
        </div>
        {answeredCount === strategyQuestions.length && (
          <p className="mt-3 text-xs leading-relaxed text-muted">
            {healthScore >= strategyQuestions.length - 1
              ? "Strong process discipline today — keep the checklist non-negotiable."
              : "A few answers flag rule-breaks. Review the trades where you deviated before your next entry."}
          </p>
        )}
      </GlassCard>

      <GlassCard>
        <SectionTitle>Learn: Concepts & Videos</SectionTitle>
        <div className="mt-2 flex flex-col gap-2.5">
          {educationTopics.map((t) => (
            <div key={t.id} className="flex items-center justify-between rounded-xl border border-line bg-surface2/40 p-3">
              <div>
                <div className="text-sm font-semibold text-text">{t.title}</div>
                <div className="mt-0.5 text-xs text-muted">{t.description}</div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wide text-accent">Watch</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <SectionTitle>AI Assistant</SectionTitle>
        <div className="mt-2 flex max-h-72 flex-col gap-2 overflow-y-auto pr-1">
          {chat.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                m.role === "assistant"
                  ? "self-start bg-surface2/60 text-text"
                  : "self-end bg-accent/20 text-purple-hi border border-accent/50"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input
            name="assistant-question"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask about support, resistance, your strategy..."
            className="flex-1 rounded-xl border border-line bg-surface2/40 px-3 py-2 text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent"
          />
          <GhostButton accent onClick={send} className="w-auto px-4">
            {sending ? "…" : "Send"}
          </GhostButton>
        </div>
      </GlassCard>
    </div>
  );
}
