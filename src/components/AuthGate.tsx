"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, authConfigured } from "@/lib/supabaseClient";
import { GlassCard, SectionTitle, GhostButton } from "./ui";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [guestBypass, setGuestBypass] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authConfigured || !supabase) {
      setLoading(false);
      return;
    }
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  if (!authConfigured) {
    if (guestBypass) return <>{children}</>;
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <GlassCard className="max-w-sm">
          <SectionTitle>Sign-in not configured yet</SectionTitle>
          <p className="mt-2 text-sm text-muted">
            Authentication needs Supabase set up first: environment variables{" "}
            <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, and the Google
            OAuth provider enabled in the Supabase project.
          </p>
          <div className="mt-4">
            <GhostButton onClick={() => setGuestBypass(true)}>Continue as guest (dev preview)</GhostButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-muted">Loading...</div>;
  }

  if (session) {
    return <>{children}</>;
  }

  return <LoginScreen />;
}

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setError(null);
    setSubmitting(true);
    try {
      if (mode === "signin") {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) setError(signInError.message);
      } else {
        const { error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) setError(signUpError.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6">
      <div className="wordmark text-2xl">THE ANALYST</div>
      <GlassCard className="w-full max-w-sm">
        <SectionTitle>Sign in to continue</SectionTitle>
        <div className="mt-4">
          <GhostButton accent className="w-full" onClick={() => supabase?.auth.signInWithOAuth({ provider: "google" })}>
            Continue with Google
          </GhostButton>
        </div>
        <div className="my-4 flex items-center gap-3">
          <div className="flex-1 border-t border-line" />
          <span className="text-xs text-muted">or</span>
          <div className="flex-1 border-t border-line" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-3 flex flex-col gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-xl border border-line bg-surface2/40 px-3 py-2 text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-xl border border-line bg-surface2/40 px-3 py-2 text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent"
            />
          </div>
          <div className="mt-3">
            <GhostButton accent type="submit" className="w-full" disabled={submitting}>
              {submitting ? "…" : mode === "signin" ? "Sign in" : "Create account"}
            </GhostButton>
          </div>
          {error && <p className="mt-2 text-xs text-bear">{error}</p>}
          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
              className="text-[11px] text-accent hover:underline"
            >
              {mode === "signin" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
