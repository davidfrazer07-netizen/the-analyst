"use client";

export interface TabDef {
  id: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
}

function Icon({ d, active }: { d: string; active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "var(--purple-hi)" : "var(--muted)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

export const TABS: TabDef[] = [
  { id: "fundamentals", label: "Fundamentals", icon: (a) => <Icon active={a} d="M12 3v18M5 8l7-5 7 5M5 8v13M19 8v13M5 21h14" /> },
  { id: "technicals", label: "Technicals", icon: (a) => <Icon active={a} d="M3 17l6-6 4 4 8-8M21 7v6h-6" /> },
  { id: "journal", label: "Journal", icon: (a) => <Icon active={a} d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z" /> },
  { id: "coach", label: "Coach", icon: (a) => <Icon active={a} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.06 0-2.077-.163-3.02-.462L3 21l1.5-4.5C3.55 15.06 3 13.578 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /> },
  { id: "profile", label: "Profile", icon: (a) => <Icon active={a} d="M20 21a8 8 0 10-16 0M12 11a4 4 0 100-8 4 4 0 000 8z" /> },
];

export default function TabBar({ active, onChange }: { active: string; onChange: (id: string) => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-6">
      <div className="flex w-full max-w-md items-center rounded-full border border-line bg-surface/70 px-2 py-2 backdrop-blur-xl shadow-[0_0_20px_rgba(47,178,255,0.18)]">
        {TABS.map((t) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-full py-1.5 transition-all ${
                isActive ? "bg-accent/20" : ""
              }`}
            >
              {t.icon(isActive)}
              <span className={`text-[9px] font-semibold ${isActive ? "text-purple-hi" : "text-muted"}`}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
