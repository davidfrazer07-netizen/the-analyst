"use client";

import { ReactNode } from "react";

export function GlassCard({
  children,
  className = "",
  tint,
}: {
  children: ReactNode;
  className?: string;
  tint?: string;
}) {
  return (
    <div
      className={`glass-card ${className}`}
      style={tint ? { borderColor: `${tint}80`, boxShadow: `0 0 14px ${tint}38` } : undefined}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <div className="section-title mb-2">{children}</div>;
}

export function Pill({
  children,
  active = false,
  onClick,
  className = "",
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? "bg-accent/20 text-purple-hi border border-accent"
          : "bg-surface2/60 text-muted border border-line"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  accent = false,
  disabled = false,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  accent?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition active:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed ${
        accent
          ? "bg-accent/20 text-purple-hi border border-accent/70 hud-glow"
          : "bg-surface2/50 text-text border border-line"
      } ${className}`}
    >
      {children}
    </button>
  );
}

type Bias = "bull" | "bear" | "neutral";

export function biasColor(b: Bias): string {
  if (b === "bull") return "var(--bull)";
  if (b === "bear") return "var(--bear)";
  return "var(--muted)";
}

export function BiasPill({ bias }: { bias: Bias }) {
  const label = bias === "bull" ? "Bullish" : bias === "bear" ? "Bearish" : "Neutral";
  const color = biasColor(bias);
  return (
    <span
      className="rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide"
      style={{ background: `color-mix(in srgb, ${color} 16%, transparent)`, color }}
    >
      {label}
    </span>
  );
}

export function StatTile({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex-1 rounded-xl border border-line bg-surface2/50 px-3 py-2.5 text-center">
      <div className="text-lg font-bold" style={color ? { color } : undefined}>
        {value}
      </div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wide text-muted">{label}</div>
    </div>
  );
}
