"use client";

import type { NewsItem, NewsImpact } from "@/lib/types";

function impactColor(impact: NewsImpact): string {
  if (impact === "positive") return "var(--bull)";
  if (impact === "negative") return "var(--bear)";
  return "var(--muted)";
}

function impactLabel(impact: NewsImpact): string {
  if (impact === "positive") return "Positive";
  if (impact === "negative") return "Negative";
  return "Neutral";
}

export function NewsCard({ item }: { item: NewsItem }) {
  const color = impactColor(item.impact);

  return (
    <div className="rounded-xl border border-line bg-surface2/40 p-3">
      <div className="flex items-center gap-2">
        <span className="rounded px-1.5 py-0.5 text-[10px] font-bold text-purple-hi bg-accent/15">
          {item.currency}
        </span>
        <span className="text-[10px] text-muted">{item.region}</span>
        {item.hot && (
          <span className="text-[10px] font-bold uppercase" style={{ color: "var(--hot)" }}>
            Hot
          </span>
        )}
      </div>

      <h3 className="mt-1.5 text-sm font-semibold text-text">{item.headline}</h3>
      {item.detail && <p className="mt-1 text-xs text-muted">{item.detail}</p>}

      <div className="mt-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase" style={{ color }}>
            {impactLabel(item.impact)}
          </span>
          <span className="text-[11px] text-muted italic">{item.impactNote}</span>
        </div>

        <div className="mt-1.5 flex items-center gap-1" aria-label={`Impact strength ${item.strength} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={
                i < item.strength
                  ? "inline-block h-1.5 w-1.5 rounded-full"
                  : "inline-block h-1.5 w-1.5 rounded-full border border-line"
              }
              style={i < item.strength ? { backgroundColor: color } : undefined}
            />
          ))}
        </div>

        {item.url ? (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 inline-block text-[10px] text-accent hover:underline"
          >
            {item.source} ↗
          </a>
        ) : (
          <span className="mt-1.5 inline-block text-[10px] text-muted">{item.source}</span>
        )}
      </div>
    </div>
  );
}

export function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item) => (
        <NewsCard item={item} key={item.headline + item.firstSeen} />
      ))}
    </div>
  );
}
