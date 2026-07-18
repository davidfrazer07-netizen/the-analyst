"use client";

import { useState } from "react";
import { GlassCard, SectionTitle, GhostButton, Pill } from "../ui";
import { educationTopics, strategyQuestions } from "@/lib/mockData";

type ChatMsg = { role: "user" | "assistant"; text: string };

const CANNED_REPLIES: Record<string, string> = {
  support:
    "Support is a price level where historical buying pressure has repeatedly stopped a decline. Resistance is the mirror: a level where selling pressure has repeatedly stopped an advance. Mark them from prior swing highs/lows and reactions, not every minor wiggle.",
  default:
    "Good question — for now I'm running on placeholder responses. Once connected to a live model, I'll answer strategy and market-structure questions directly here.",
};

export default function TechnicalsTab() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [chat, setChat] = useState<ChatMsg[]>([
    { role: "assistant", text: "Ask me anything about your strategy, market structure, or a concept you're unsure about." },
  ]);
  const [draft, setDraft] = useState("");

  const healthScore = Object.values(answers).filter(Boolean).length;
  const answeredCount = Object.values(answers).filter((v) => v !== null && v !== undefined).length;

  const send = () => {
    if (!draft.trim()) return;
    const q = draft.trim();
    setChat((c) => [...c, { role: "user", text: q }]);
    const reply = q.toLowerCase().includes("support") || q.toLowerCase().includes("resistance")
      ? CANNED_REPLIES.support
      : CANNED_REPLIES.default;
    setDraft("");
    setTimeout(() => setChat((c) => [...c, { role: "assistant", text: reply }]), 300);
  };

  return (
    <div className="flex flex-col gap-4 pb-28">
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
            Send
          </GhostButton>
        </div>
      </GlassCard>
    </div>
  );
}
