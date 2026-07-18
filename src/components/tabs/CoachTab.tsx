"use client";

import { useState } from "react";
import { GlassCard, SectionTitle, GhostButton, Pill } from "../ui";
import { leaderboard, p2pOffers } from "@/lib/mockData";

type Sub = "coach" | "leaderboard" | "p2p";

export default function CoachTab() {
  const [sub, setSub] = useState<Sub>("coach");

  return (
    <div className="flex flex-col gap-4 pb-28">
      <div className="flex gap-2">
        <Pill active={sub === "coach"} onClick={() => setSub("coach")}>Coach</Pill>
        <Pill active={sub === "leaderboard"} onClick={() => setSub("leaderboard")}>Leaderboard</Pill>
        <Pill active={sub === "p2p"} onClick={() => setSub("p2p")}>P2P</Pill>
      </div>

      {sub === "coach" && (
        <GlassCard>
          <SectionTitle>AI Coach</SectionTitle>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Your coach reads your recent journal entries and strategy-health answers to flag drift before it compounds.
            This is a placeholder panel — connect it to a live model to get real-time coaching here.
          </p>
          <div className="mt-3 rounded-xl border border-line bg-surface2/40 p-3 text-sm text-text">
            &quot;You&apos;ve closed 4 trades early this week, all before hitting your planned TP. Consider a partial-close
            rule instead of a full exit next time doubt creeps in.&quot;
          </div>
          <GhostButton accent className="mt-3">Open full coaching session</GhostButton>
        </GlassCard>
      )}

      {sub === "leaderboard" && (
        <GlassCard>
          <SectionTitle>Community Leaderboard</SectionTitle>
          <div className="mt-2 flex flex-col gap-2">
            {leaderboard.map((e) => (
              <div key={e.rank} className="flex items-center justify-between rounded-xl border border-line bg-surface2/40 px-3 py-2.5">
                <div className="flex items-center gap-3">
                  <span className="w-5 text-center text-sm font-bold text-accent">{e.rank}</span>
                  <div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-text">
                      {e.handle}
                      {e.verified && <span className="text-[10px] text-bull">✓ trusted</span>}
                    </div>
                    <div className="text-[11px] text-muted">Trust score {e.trustScore}</div>
                  </div>
                </div>
                <span className="text-sm font-bold text-bull">{e.winRate}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {sub === "p2p" && (
        <>
          <GlassCard className="!border-bear/40">
            <div className="text-xs font-semibold text-bear">Preview only</div>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              This board shows matching and trust scores only. No funds move through the app yet, real escrow custody
              is a regulated function that hasn&apos;t been wired up.
            </p>
          </GlassCard>
          <GlassCard>
            <SectionTitle>P2P USDT Board</SectionTitle>
            <div className="mt-2 flex flex-col gap-2.5">
              {p2pOffers.map((o) => (
                <div key={o.id} className="rounded-xl border border-line bg-surface2/40 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase"
                        style={{ color: o.side === "sell" ? "var(--bear)" : "var(--bull)" }}
                      >
                        {o.side}
                      </span>
                      <span className="text-sm font-semibold text-text">{o.handle}</span>
                    </div>
                    <span className="text-xs text-muted">Trust {o.trustScore} · {o.completedTrades} trades</span>
                  </div>
                  <div className="mt-1.5 text-sm text-text">
                    {o.amountUSDT} USDT @ ${o.pricePerUSDT.toFixed(3)}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </>
      )}
    </div>
  );
}
