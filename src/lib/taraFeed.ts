"use client";

import { useCallback, useEffect, useState } from "react";

// The deployed Google Apps Script Web App that reads Dave's daily Doc and
// serves Tara's feed JSON. CORS is open (access-control-allow-origin: *),
// confirmed against the live deployment, so this can be called directly
// from the browser. Override via NEXT_PUBLIC_TARA_FEED_URL if redeployed.
export const TARA_FEED_URL =
  process.env.NEXT_PUBLIC_TARA_FEED_URL ??
  "https://script.google.com/macros/s/AKfycbx0_G23rz2UJYdiaqVp9fxV7YPeZ_avCELuKiAFMeMZEubWBB4AFKnkfHpF1z43l-bUzg/exec";

export type SyncStatus = "idle" | "loading" | "connected" | "error";

export function useTaraFeed() {
  const [status, setStatus] = useState<SyncStatus>("idle");
  const [lastSynced, setLastSynced] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch(TARA_FEED_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await res.json();
      setStatus("connected");
      setLastSynced(new Date().toISOString());
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { status, lastSynced, refresh };
}
