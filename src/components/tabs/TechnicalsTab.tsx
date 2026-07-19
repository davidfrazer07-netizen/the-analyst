"use client";

import { GlassCard, SectionTitle } from "../ui";
import ProfilesSection from "../ProfilesSection";
import { educationTopics } from "@/lib/mockData";

export default function TechnicalsTab({
  isPremium,
  onUnlock,
}: {
  isPremium: boolean;
  onUnlock: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 pb-28">
      <ProfilesSection isUnlocked={isPremium} onUnlock={onUnlock} />

      <GlassCard>
        <SectionTitle>Learn: Concepts & Videos</SectionTitle>
        <div className="mt-2 flex flex-col gap-2.5">
          {educationTopics.map((t) => (
            <a
              key={t.id}
              href={t.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-line bg-surface2/40 p-3 transition-colors hover:border-accent/60"
            >
              <div>
                <div className="text-sm font-semibold text-text">{t.title}</div>
                <div className="mt-0.5 text-xs text-muted">{t.description}</div>
              </div>
              <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-accent">Watch ↗</span>
            </a>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
