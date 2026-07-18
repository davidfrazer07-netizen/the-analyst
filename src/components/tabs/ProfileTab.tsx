"use client";

import { GlassCard, SectionTitle, StatTile, GhostButton } from "../ui";
import { journal } from "@/lib/mockData";

export function PaywallCard({ onUnlock }: { onUnlock: () => void }) {
  return (
    <div className="flex flex-col gap-4 pb-28">
      <GlassCard className="text-center">
        <SectionTitle>Profile — Premium</SectionTitle>
        <div className="mt-2 text-lg font-bold text-text">Unlock your session stats</div>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Win rate, streaks, biggest win/loss, and full performance breakdown — available to premium members.
        </p>
        <div className="mt-4 text-3xl font-extrabold text-purple-hi">
          $8<span className="text-base font-semibold text-muted">/month</span>
        </div>
        <GhostButton accent className="mt-4" onClick={onUnlock}>
          Unlock Premium (demo)
        </GhostButton>
        <div className="mt-2 text-[11px] text-muted">Demo unlock — no payment wired up yet.</div>
      </GlassCard>
    </div>
  );
}

export default function ProfileTab() {
  const i = journal.insights;
  return (
    <div className="flex flex-col gap-4 pb-28">
      <GlassCard>
        <SectionTitle>Session Stats</SectionTitle>
        <div className="mt-1 text-xs text-muted">{journal.account}</div>
        <div className="mt-3 flex gap-2">
          <StatTile label="Win rate" value={`${i.winRate}%`} color="var(--bull)" />
          <StatTile label="Win streak" value={`${i.winStreak}`} color="var(--bull)" />
          <StatTile label="Lose streak" value={`${i.loseStreak}`} color="var(--bear)" />
        </div>
        <div className="mt-2 flex gap-2">
          <StatTile label="Highest win" value={`$${i.highestWin.toFixed(0)}`} color="var(--bull)" />
          <StatTile label="Biggest loss" value={`-$${Math.abs(i.biggestLoss).toFixed(0)}`} color="var(--bear)" />
        </div>
      </GlassCard>

      <GlassCard>
        <SectionTitle>Strategy Discipline</SectionTitle>
        <div className="mt-2 flex flex-col gap-2 text-xs">
          <div className="flex items-center justify-between rounded-lg border border-line bg-surface2/40 px-3 py-2">
            <span className="text-muted">Followed strategy win rate</span>
            <span className="font-semibold text-bull">{i.followedWinRate}%</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-line bg-surface2/40 px-3 py-2">
            <span className="text-muted">Not followed win rate</span>
            <span className="font-semibold text-bear">{i.notFollowedWinRate}%</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-line bg-surface2/40 px-3 py-2">
            <span className="text-muted">Wins / Losses</span>
            <span className="font-semibold text-text">{i.wins} / {i.losses}</span>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <SectionTitle>Account</SectionTitle>
        <div className="mt-2 flex items-center justify-between rounded-lg border border-line bg-surface2/40 px-3 py-2 text-xs">
          <span className="text-muted">Plan</span>
          <span className="font-semibold text-purple-hi">Premium — $8/mo</span>
        </div>
      </GlassCard>
    </div>
  );
}
