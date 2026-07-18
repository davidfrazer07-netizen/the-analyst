"use client";

import { GlassCard, SectionTitle, BiasPill } from "../ui";
import HealthCheckQuiz from "../HealthCheckQuiz";
import { journal } from "@/lib/mockData";
import { JTrade } from "@/lib/types";

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

      <GlassCard>
        <SectionTitle>Risk Guidance</SectionTitle>
        <div className="mt-2 flex flex-col gap-2.5 text-xs text-muted">
          <div className="flex items-center justify-between rounded-lg border border-line bg-surface2/40 px-3 py-2">
            <span>Trades closed early</span>
            <span className="font-semibold text-text">{journal.insights.closedEarly}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-line bg-surface2/40 px-3 py-2">
            <span>Left money on the table</span>
            <span className="font-semibold text-text">{journal.insights.leftMoneyOnTable}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-line bg-surface2/40 px-3 py-2">
            <span>No stop-loss set</span>
            <span className="font-semibold" style={{ color: journal.insights.noStop > 0 ? "var(--bear)" : "var(--text)" }}>
              {journal.insights.noStop}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-line bg-surface2/40 px-3 py-2">
            <span>Followed-strategy win rate</span>
            <span className="font-semibold text-bull">{journal.insights.followedWinRate}%</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-line bg-surface2/40 px-3 py-2">
            <span>Off-strategy win rate</span>
            <span className="font-semibold text-bear">{journal.insights.notFollowedWinRate}%</span>
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-purple-hi/80">
          {journal.insights.followedWinRate - journal.insights.notFollowedWinRate > 25
            ? "Your edge only shows up when you follow the plan. Off-strategy trades are actively costing you — sizing down or skipping them entirely would raise your expectancy the most."
            : "Keep logging every trade with confluences noted so this comparison stays reliable."}
        </p>
      </GlassCard>

      <GlassCard>
        <SectionTitle>Recent Trades</SectionTitle>
        <div className="mt-2 flex flex-col gap-3">
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
