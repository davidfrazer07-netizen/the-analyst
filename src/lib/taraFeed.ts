"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { NewsItem } from "./types";

// The deployed Google Apps Script Web App that reads Dave's daily Doc and
// serves Tara's feed JSON. CORS is open (access-control-allow-origin: *),
// confirmed against the live deployment, so this can be called directly
// from the browser. Override via NEXT_PUBLIC_TARA_FEED_URL if redeployed.
// GitHub Actions interpolates an unset `vars.*` reference as an empty
// string, not "undefined" — so `??` alone would leave this as "" instead of
// falling back. Use `||` so a blank env value also triggers the fallback.
export const TARA_FEED_URL =
  process.env.NEXT_PUBLIC_TARA_FEED_URL ||
  "https://script.google.com/macros/s/AKfycbx0_G23rz2UJYdiaqVp9fxV7YPeZ_avCELuKiAFMeMZEubWBB4AFKnkfHpF1z43l-bUzg/exec";

export type SyncStatus = "idle" | "loading" | "connected" | "error";

const RETRY_DELAYS_MS = [1500, 4000]; // Apps Script cold-starts can make the first call fail transiently.

export function useTaraFeed() {
  const [status, setStatus] = useState<SyncStatus>("idle");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const attempt = useCallback(async (): Promise<boolean> => {
    try {
      const res = await fetch(TARA_FEED_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      // Live worldNews items don't carry `firstSeen` — the placeholder mock
      // data does, so backfill it with today's date to satisfy NewsItem.
      const today = new Date().toISOString().slice(0, 10);
      const worldNews = Array.isArray(data?.feed?.worldNews) ? data.feed.worldNews : [];
      const parsed: NewsItem[] = worldNews.map((item: Omit<NewsItem, "firstSeen">) => ({
        ...item,
        firstSeen: today,
      }));
      if (!mountedRef.current) return true;
      setNews(parsed);
      setStatus("connected");
      setLastSynced(new Date().toISOString());
      setLastError(null);
      return true;
    } catch (err) {
      if (!mountedRef.current) return true;
      // eslint-disable-next-line no-console
      console.error("[taraFeed] sync failed:", err);
      setLastError(err instanceof Error ? err.message : String(err));
      return false;
    }
  }, []);

  const refresh = useCallback(async () => {
    setStatus("loading");
    for (const delay of [0, ...RETRY_DELAYS_MS]) {
      if (delay > 0) await new Promise((r) => setTimeout(r, delay));
      if (!mountedRef.current) return;
      const ok = await attempt();
      if (ok) return;
    }
    if (mountedRef.current) setStatus("error");
  }, [attempt]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { status, news, lastSynced, lastError, refresh };
}
