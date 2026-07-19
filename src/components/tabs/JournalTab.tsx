"use client";

import { GlassCard, SectionTitle, BiasPill } from "../ui";
import HealthCheckQuiz from "../HealthCheckQuiz";
import VoiceNote from "../VoiceNote";
import { journal } from "@/lib/mockData";
import { JTrade } from "@/lib/types";
import { useVoiceNotes } from "@/lib/voiceNotes";

const sentimentColor = (sentiment: "disciplined" | "emotional" | "neutral" | null) =>
  sentiment === "disciplined" ? "var(--bull)" : sentiment === "emotional" ? "var(--bear)" : "var(--muted)";

function riskFlags(t: JTrade): string[] {
  const flags: string[] = [];
  if (!t.sl) flags.push("No stop-loss set");
  if (t.volume >= 1.0) flags.push("Large position size");
  if (t.closedEarly) flags.push("Closed early");
  if (!t.strategyMatch) flags.push("Off-strategy");
  return flags;
}

function accountHealth(insights: typeof journal.insights): { label: string; tone: "bull" | "bear" | "neutral"; note: string } {
  if (insights.noStop > 2 || insights.notFollowedWinRate < insights.winRate - 20) {
    return {
      label: "Needs attention",
      tone: "bear",
      note: "Multiple trades without a stop-loss and a wide gap between followed vs. not-followed win rate. Tighten process before increasing size.",
    };
  }
  if (insights.winStreak >= 3 && insights.followedWinRate >= 60) {
    return {
      label: "Healthy",
      tone: "bull",
      note: "Win rate is strongest when you follow your strategy. Current streak and process discipline support a normal risk allocation.",
    };
  }
  return {
    label: "Stable",
    tone: "neutral",
    note: "No major red flags, but keep watching closed-early and no-stop counts — they're the earliest signal of drifting discipline.",
  };
}

export default function JournalTab() {
  const health = accountHealth(journal.insights);
  const { notes, addNote } = useVoiceNotes();
  const voiceJournalEntries = notes.filter((n) => n.aiSummary);

  return (
    <div className="flex flex-col gap-4 pb-28">
      <HealthCheckQuiz />

      <GlassCard>
        <div className="flex items-center justify-between">
          <SectionTitle>Account Health</SectionTitle>
          <BiasPill bias={health.tone} />
        </div>
        <div className="mt-1 text-sm font-semibold text-text">{health.label} — {journal.account}</div>
        <p className="mt-2 text-xs leading-relaxed text-muted">{health.note}</p>
      </GlassCard>

      <VoiceNote notes={notes} onAddNote={addNote} />

      <GlassCard>
        <SectionTitle>Recent Trades</SectionTitle>
        <div className="mt-2 flex flex-col gap-3">
          {voiceJournalEntries.map((n) => (
            <div key={n.id} className="rounded-xl border border-accent/40 bg-accent/10 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-accent">🎙 Voice journal</span>
                  {n.aiSymbol && <span className="text-sm font-semibold text-text">{n.aiSymbol}</span>}
                </div>
                <span
                  className="text-[10px] font-bold uppercase"
                  style={{ color: sentimentColor(n.aiSentiment) }}
                >
                  {n.aiSentiment}
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-text">{n.aiSummary}</p>
              {n.aiKeyLesson && <p className="mt-1 text-[11px] italic text-purple-hi/80">Lesson: {n.aiKeyLesson}</p>}
              <div className="mt-1.5 text-[10px] text-muted">{new Date(n.timestamp).toLocaleString()}</div>
            </div>
          ))}
          {journal.trades.map((t) => {
            const flags = riskFlags(t);
            return (
              <div key={t.ticket} className="rounded-xl border border-line bg-surface2/40 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-text">{t.symbol}</span>
                    <span
                      className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase"
                      style={{ color: t.side === "buy" ? "var(--bull)" : "var(--bear)" }}
                    >
                      {t.side}
                    </span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: t.profit >= 0 ? "var(--bull)" : "var(--bear)" }}>
                    {t.profit >= 0 ? "+" : ""}
                    {t.profit.toFixed(2)}
                  </span>
                </div>
                <div className="mt-1 text-[11px] text-muted">
                  {t.volume} lots · Entry {t.entryPrice} → Exit {t.exitPrice}
                  {t.realisedR !== null && ` · ${t.realisedR.toFixed(2)}R`}
                </div>
                {flags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {flags.map((f) => (
                      <span
                        key={f}
                        className="rounded-full bg-bear/10 px-2 py-0.5 text-[10px] font-semibold text-bear"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
