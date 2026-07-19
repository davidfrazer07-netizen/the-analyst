"use client";

import { useEffect, useRef, useState } from "react";
import { GlassCard, SectionTitle, GhostButton } from "./ui";

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  0: { transcript: string };
}

interface SpeechRecognitionEventLike extends Event {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionLike extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
}

interface VoiceNoteItem {
  id: string;
  text: string;
  timestamp: string;
}

function getSpeechRecognitionCtor(): (new () => SpeechRecognitionLike) | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

const STORAGE_KEY = "the-analyst:voice-notes";

function loadStoredNotes(): VoiceNoteItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as VoiceNoteItem[]) : [];
  } catch {
    return [];
  }
}

export default function VoiceNote() {
  const [recording, setRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [interim, setInterim] = useState<string>("");
  const [supported, setSupported] = useState<boolean>(false);
  const [notes, setNotes] = useState<VoiceNoteItem[]>([]);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSupported(Boolean(getSpeechRecognitionCtor()));
      setNotes(loadStoredNotes());
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const startRecording = () => {
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) return;

    const recognition = new Ctor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEventLike) => {
      let finalText = "";
      let interimText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript;
        } else {
          interimText += result[0].transcript;
        }
      }
      if (finalText) {
        setTranscript((prev) => prev + finalText);
      }
      setInterim(interimText);
    };

    recognition.onerror = () => {
      setRecording(false);
    };

    recognition.onend = () => {
      setRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setRecording(true);
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setRecording(false);

    const trimmed = transcript.trim();
    if (trimmed.length > 0) {
      const newNote: VoiceNoteItem = {
        id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Date.now().toString(),
        text: trimmed,
        timestamp: new Date().toISOString(),
      };
      setNotes((prev) => [newNote, ...prev]);
    }
    setTranscript("");
    setInterim("");
  };

  return (
    <GlassCard>
      <SectionTitle>Voice Trade Note</SectionTitle>

      {!supported ? (
        <p className="text-xs text-muted">Voice recording isn&apos;t supported in this browser. Try Chrome or Edge.</p>
      ) : (
        <>
          <p className="text-xs text-muted">
            Record what happened during a trade — entry reasoning, what you felt, what you&apos;d do differently. It
            gets saved below for review.
          </p>

          <div className="mt-3">
            <GhostButton
              accent={!recording}
              className={recording ? "border-bear/70 text-bear" : ""}
              onClick={recording ? stopRecording : startRecording}
            >
              {recording ? "Stop Recording" : "Start Recording"}
            </GhostButton>
          </div>

          {recording && (
            <div className="mt-3 rounded-xl border border-line bg-surface2/40 p-3 text-xs text-text">
              {transcript}
              {interim && <span className="italic text-muted">{interim}</span>}
            </div>
          )}

          <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-muted">Recent Voice Notes</p>

          {notes.length === 0 ? (
            <p className="mt-2 text-xs text-muted">No voice notes yet.</p>
          ) : (
            <div className="mt-2">
              {notes.map((note) => (
                <div key={note.id} className="mt-2 rounded-xl border border-line bg-surface2/40 p-3">
                  <div className="text-[10px] text-muted">{new Date(note.timestamp).toLocaleString()}</div>
                  <div className="mt-1 text-xs text-text">{note.text}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </GlassCard>
  );
}
