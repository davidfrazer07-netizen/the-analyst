"use client";

import { GlassCard, SectionTitle, GhostButton } from "../ui";

export default function ProfileTab({
  isPremium,
  onUnlock,
}: {
  isPremium: boolean;
  onUnlock: () => void;
}) {
  if (!isPremium) {
    return (
      <div className="flex flex-col gap-4 pb-28">
        <GlassCard className="text-center">
          <SectionTitle>Profile — Premium</SectionTitle>
          <div className="mt-2 text-lg font-bold text-text">Unlock the Session Delivery Profiles</div>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Tara&apos;s tradersfeed.pro AM/PM delivery-profile schematics — Profile 1-3 for each session, with
            market conditions, key characteristics, and trader focus for each one.
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

  return (
    <div className="flex flex-col gap-4 pb-28">
      <GlassCard className="text-center">
        <SectionTitle>Profile — Premium</SectionTitle>
        <div className="mt-2 text-lg font-bold text-bull">Premium unlocked</div>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Head to the Technicals tab to view the Session Delivery Profiles — Tara&apos;s AM/PM schematics for each
          delivery profile.
        </p>
      </GlassCard>
    </div>
  );
}
