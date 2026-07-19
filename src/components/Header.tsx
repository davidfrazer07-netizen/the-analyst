"use client";

import { useTaraFeed } from "@/lib/taraFeed";

export default function Header() {
  const { status, refresh } = useTaraFeed();

  const dotColor = status === "connected" ? "var(--bull)" : status === "error" ? "var(--bear)" : "var(--muted)";
  const label = status === "connected" ? "Synced" : status === "loading" ? "Syncing…" : status === "error" ? "Offline" : "—";

  return (
    <div className="sticky top-0 z-20 flex items-center justify-center px-4 pb-3 pt-6 backdrop-blur-sm">
      <div className="wordmark text-xl">THE ANALYST</div>
      <button
        onClick={refresh}
        title={label}
        className="absolute right-4 top-6 flex items-center gap-1.5 rounded-full border border-line bg-surface2/60 px-2 py-1"
      >
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: dotColor, boxShadow: `0 0 6px ${dotColor}` }}
        />
        <span className="text-[9px] font-semibold uppercase tracking-wide text-muted">{label}</span>
      </button>
    </div>
  );
}
