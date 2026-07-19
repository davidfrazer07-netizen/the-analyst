"use client";

import { useState } from "react";
import { GlassCard, SectionTitle, Pill, GhostButton } from "./ui";
import ProfileDiagram, { ProfileSide } from "./ProfileDiagram";
import type { DeliveryProfiles } from "@/lib/types";
import { deliveryProfiles } from "@/lib/newsAndProfiles";

export default function ProfilesSection() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [session, setSession] = useState<"am" | "pm">("am");
  const [side, setSide] = useState<ProfileSide>("bull");

  if (!isUnlocked) {
    return (
      <GlassCard>
        <SectionTitle>Session Delivery Profiles — Premium</SectionTitle>
        <p className="mt-2 text-sm text-muted">
          These are Tara&apos;s tradersfeed.pro AM/PM delivery-profile schematics (Profile 1-3 for each session),
          showing market conditions, key characteristics and what to focus on as a trader.
        </p>
        <div className="mt-4">
          <GhostButton accent onClick={() => setIsUnlocked(true)}>
            Unlock Premium (demo)
          </GhostButton>
        </div>
      </GlassCard>
    );
  }

  const set: DeliveryProfiles["am"] | DeliveryProfiles["pm"] = session === "am" ? deliveryProfiles.am : deliveryProfiles.pm;

  return (
    <GlassCard>
      <SectionTitle>Session Delivery Profiles</SectionTitle>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-2">
          <Pill active={session === "am"} onClick={() => setSession("am")}>
            AM
          </Pill>
          <Pill active={session === "pm"} onClick={() => setSession("pm")}>
            NY PM
          </Pill>
        </div>
        <div className="flex gap-2">
          <Pill active={side === "bull"} onClick={() => setSide("bull")}>
            Bullish
          </Pill>
          <Pill active={side === "bear"} onClick={() => setSide("bear")}>
            Bearish
          </Pill>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {set.windows.map((w) => (
          <span key={w} className="rounded-full border border-line bg-surface2/60 px-2 py-1 text-[11px] text-muted">
            {w}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {set.profiles.map((p) => (
          <div key={p.id} className="rounded-xl border border-line bg-surface2/40 p-3">
            <div className="text-sm font-semibold text-text">
              Profile {p.num}: {p.title}
            </div>

            <div className="mt-2">
              <ProfileDiagram num={p.num} side={side} windows={set.windows.map((w) => w.split(" ")[0])} />
            </div>

            <div className="mt-2">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted">Market Conditions</div>
              <ul className="mt-1">
                {p.marketConditions.map((m, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-muted">
                    <span className="mt-1 h-1 w-1 rounded-full bg-[var(--accent)]" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-2">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted">Key Characteristics</div>
              <ul className="mt-1">
                {p.keyCharacteristics.map((k, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-muted">
                    <span className="mt-1 h-1 w-1 rounded-full bg-[var(--accent)]" />
                    {k}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-2">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted">Trader Focus</div>
              <ul className="mt-1">
                {p.traderFocus.map((t, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-muted">
                    <span className="mt-1 h-1 w-1 rounded-full bg-[var(--accent)]" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
