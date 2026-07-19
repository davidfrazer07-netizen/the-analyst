"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "./supabaseClient";

// Premium status lives in Supabase (`user_premium`), not local state — a row
// existing for the user's id means unlocked. There is deliberately no insert
// policy on that table for the authenticated role: only an admin running SQL
// with the service role can grant it, so a user can never unlock themselves
// client-side.
export function usePremium() {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (!supabase) {
          if (mountedRef.current) setLoading(false);
          return;
        }
        const { data: authData } = await supabase.auth.getUser();
        const user = authData?.user;
        if (!user) {
          if (mountedRef.current) setLoading(false);
          return;
        }
        const { data } = await supabase.from("user_premium").select("user_id").eq("user_id", user.id).maybeSingle();
        if (mountedRef.current) {
          setIsPremium(Boolean(data));
          setLoading(false);
        }
      } catch {
        if (mountedRef.current) setLoading(false);
      }
    })();
  }, []);

  return { isPremium, loading };
}
