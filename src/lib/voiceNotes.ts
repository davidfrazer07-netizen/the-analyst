"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "./supabaseClient";

export type VoiceNoteSentiment = "disciplined" | "emotional" | "neutral";

export interface VoiceNoteItem {
  id: string;
  transcript: string;
  timestamp: string;
  aiSummary: string | null;
  aiSentiment: VoiceNoteSentiment | null;
  aiKeyLesson: string | null;
  aiSymbol: string | null;
  analyzing: boolean;
}

interface VoiceNoteRow {
  id: string;
  transcript: string;
  created_at: string;
  ai_summary: string | null;
  ai_sentiment: VoiceNoteSentiment | null;
  ai_key_lesson: string | null;
  ai_symbol: string | null;
}

interface LocalStorageNote {
  id: string;
  text: string;
  timestamp: string;
}

const STORAGE_KEY = "the-analyst:voice-notes";

function genId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return Date.now().toString();
}

function rowToVoiceNoteItem(row: VoiceNoteRow, analyzing = false): VoiceNoteItem {
  return {
    id: row.id,
    transcript: row.transcript,
    timestamp: row.created_at,
    aiSummary: row.ai_summary ?? null,
    aiSentiment: row.ai_sentiment ?? null,
    aiKeyLesson: row.ai_key_lesson ?? null,
    aiSymbol: row.ai_symbol ?? null,
    analyzing,
  };
}

function voiceNoteItemToLocal(note: VoiceNoteItem): LocalStorageNote {
  return { id: note.id, text: note.transcript, timestamp: note.timestamp };
}

export function useVoiceNotes() {
  const [notes, setNotes] = useState<VoiceNoteItem[]>([]);
  const mountedRef = useRef(true);
  const isGuestRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (supabase) {
          const { data: authData } = await supabase.auth.getUser();
          const user = authData?.user;
          if (user) {
            isGuestRef.current = false;
            const { data, error } = await supabase
              .from("voice_notes")
              .select("*")
              .eq("user_id", user.id)
              .order("created_at", { ascending: false });
            if (!error && data && mountedRef.current) {
              setNotes((data as VoiceNoteRow[]).map((row) => rowToVoiceNoteItem(row, false)));
              return;
            }
          }
        }
        isGuestRef.current = true;
        if (typeof window === "undefined") return;
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw && mountedRef.current) {
          const parsed: LocalStorageNote[] = JSON.parse(raw);
          setNotes(
            parsed.map((n) => ({
              id: n.id,
              transcript: n.text,
              timestamp: n.timestamp,
              aiSummary: null,
              aiSentiment: null,
              aiKeyLesson: null,
              aiSymbol: null,
              analyzing: false,
            }))
          );
        } else if (mountedRef.current) {
          setNotes([]);
        }
      } catch {
        if (mountedRef.current) setNotes([]);
      }
    })();
  }, []);

  useEffect(() => {
    if (!isGuestRef.current || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes.map(voiceNoteItemToLocal)));
    } catch {
      /* ignore */
    }
  }, [notes]);

  const addNote = useCallback(async (transcript: string) => {
    if (supabase) {
      const { data: authData } = await supabase.auth.getUser();
      const user = authData?.user;
      if (user) {
        isGuestRef.current = false;
        const { data, error } = await supabase
          .from("voice_notes")
          .insert({ user_id: user.id, transcript })
          .select()
          .single();
        if (!error && data) {
          const row = data as VoiceNoteRow;
          const newItem = rowToVoiceNoteItem(row, true);
          if (mountedRef.current) setNotes((prev) => [newItem, ...prev]);

          const aiUrl = process.env.NEXT_PUBLIC_AI_ASSISTANT_URL;
          const stopAnalyzing = () => {
            if (mountedRef.current) {
              setNotes((prev) => prev.map((n) => (n.id === row.id ? { ...n, analyzing: false } : n)));
            }
          };

          if (!aiUrl) {
            stopAnalyzing();
            return;
          }
          try {
            const res = await fetch(aiUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ mode: "voice-journal", message: transcript }),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            const journal = json?.journal;
            if (!journal || typeof journal.summary !== "string") throw new Error("Bad journal shape");

            await supabase
              .from("voice_notes")
              .update({
                ai_summary: journal.summary,
                ai_sentiment: journal.sentiment ?? null,
                ai_key_lesson: journal.keyLesson ?? null,
                ai_symbol: journal.symbol ?? null,
              })
              .eq("id", row.id);

            if (mountedRef.current) {
              setNotes((prev) =>
                prev.map((n) =>
                  n.id === row.id
                    ? {
                        ...n,
                        aiSummary: journal.summary,
                        aiSentiment: journal.sentiment ?? null,
                        aiKeyLesson: journal.keyLesson ?? null,
                        aiSymbol: journal.symbol ?? null,
                        analyzing: false,
                      }
                    : n
                )
              );
            }
          } catch {
            stopAnalyzing();
          }
        }
        return;
      }
    }

    isGuestRef.current = true;
    const guestItem: VoiceNoteItem = {
      id: genId(),
      transcript,
      timestamp: new Date().toISOString(),
      aiSummary: null,
      aiSentiment: null,
      aiKeyLesson: null,
      aiSymbol: null,
      analyzing: false,
    };
    if (mountedRef.current) setNotes((prev) => [guestItem, ...prev]);
  }, []);

  return { notes, addNote };
}
