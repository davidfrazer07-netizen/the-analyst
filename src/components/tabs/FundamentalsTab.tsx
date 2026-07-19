"use client";

import { useState } from "react";
import { GlassCard, SectionTitle, BiasPill, Pill } from "../ui";
import { NewsList } from "../NewsCard";
import { fundamentals as mockFundamentals } from "@/lib/mockData";
import { newsFeed } from "@/lib/newsAndProfiles";
import type { NewsItem, CurrencyFundamental } from "@/lib/types";

type FundamentalsTabProps = {
  news: NewsItem[];
  liveFundamentals: CurrencyFundamental[];
};

export default function FundamentalsTab({ news, liveFundamentals }: FundamentalsTabProps) {
  // Live analysis only covers whichever currencies the Doc's strength[]
  // lists that day (often a subset) — merge it over the static list so
  // covered currencies show today's real data and the rest still render.
  const fundamentals = mockFundamentals.map(
    (mock) => liveFundamentals.find((live) => live.currency === mock.currency) ?? mock
  );

  const [selected, setSelected] = useState(fundamentals[0].currency);
  const active = fundamentals.find((f) => f.currency === selected)!;

  const liveNews = news.filter((n) => n.currency === selected);
  const currencyNews = liveNews.length > 0 ? liveNews : newsFeed.filter((n) => n.currency === selected);

  const impactColor = (impact: string) =>
    impact === "high" ? "var(--bear)" : impact === "medium" ? "var(--accent)" : "var(--muted)";

  return (
    <div className="flex flex-col gap-4 pb-28">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {fundamentals.map((f) => (
          <Pill key={f.currency} active={f.currency === selected} onClick={() => setSelected(f.currency)}>
            {f.currency}
          </Pill>
        ))}
      </div>

      <GlassCard>
        <div className="flex items-center justify-between">
          <SectionTitle>{active.currency} Fundamental View</SectionTitle>
          <BiasPill bias={active.bias} />
        </div>
        <div className="mt-1 text-base font-semibold text-text">{active.headline}</div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{active.summary}</p>
        <p className="mt-2 text-[10px] uppercase tracking-wide text-muted">Updated {active.updatedAt}</p>
      </GlassCard>

      <GlassCard>
        <SectionTitle>Drivers & Impact vs. History</SectionTitle>
        <div className="mt-2 flex flex-col gap-3">
          {active.drivers.map((d, i) => (
            <div key={`${d.label}-${i}`} className="rounded-xl border border-line bg-surface2/40 p-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-text">{d.label}</div>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                  style={{ color: impactColor(d.impact), background: `color-mix(in srgb, ${impactColor(d.impact)} 16%, transparent)` }}
                >
                  {d.impact} impact
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{d.detail}</p>
              {d.vsHistory && <p className="mt-1 text-xs italic text-purple-hi/80">{d.vsHistory}</p>}
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <SectionTitle>{active.currency} News & Impact</SectionTitle>
        {currencyNews.length > 0 ? (
          <div className="mt-2">
            <NewsList items={currencyNews} />
          </div>
        ) : (
          <p className="mt-2 text-xs text-muted">No recent news items for {active.currency}.</p>
        )}
      </GlassCard>
    </div>
  );
}
