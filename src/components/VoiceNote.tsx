"use client";

import { useEffect, useRef, useState } from "react";
import { GlassCard, SectionTitle, GhostButton } from "./ui";
import type { VoiceNoteItem } from "@/lib/voiceNotes";

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

function getSpeechRecognitionCtor(): (new () => SpeechRecognitionLike) | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

interface VoiceNoteProps {
  notes: VoiceNoteItem[];
  onAddNote: (transcript: string) => void;
}

const sentimentColor = (sentiment: VoiceNoteItem["aiSentiment"]) =>
  sentiment === "disciplined" ? "var(--bull)" : sentiment === "emotional" ? "var(--bear)" : "var(--muted)";

export default function VoiceNote({ notes, onAddNote }: VoiceNoteProps) {
  const [recording, setRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [interim, setInterim] = useState<string>("");
  const [supported, setSupported] = useState<boolean>(false);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSupported(Boolean(getSpeechRecognitionCtor()));
    }
  }, []);

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
      onAddNote(trimmed);
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
            gets saved below for review, and analyzed into a journal entry.
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
                  <div className="mt-1 text-xs text-text">{note.transcript}</div>
                  {note.analyzing ? (
                    <div className="mt-1.5 text-[10px] italic text-muted">Analyzing…</div>
                  ) : (
                    note.aiSummary && (
                      <div className="mt-1.5 rounded-lg bg-accent/10 p-2">
                        <span
                          className="text-[10px] font-bold uppercase tracking-wide"
                          style={{ color: sentimentColor(note.aiSentiment) }}
                        >
                          {note.aiSentiment ?? "analyzed"}
                          {note.aiSymbol ? ` · ${note.aiSymbol}` : ""}
                        </span>
                        <p className="mt-1 text-[11px] text-muted">{note.aiSummary}</p>
                        {note.aiKeyLesson && (
                          <p className="mt-1 text-[11px] italic text-purple-hi/80">Lesson: {note.aiKeyLesson}</p>
                        )}
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </GlassCard>
  );
}
