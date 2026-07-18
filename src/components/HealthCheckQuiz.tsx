"use client";

import { useState } from "react";
import { GlassCard, SectionTitle, GhostButton } from "./ui";
import { healthCheckQuestions, scoreHealthCheck } from "@/lib/healthCheck";
import type { HealthCheckOption, StabilizationPlan } from "@/lib/types";

export default function HealthCheckQuiz() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, "A" | "B" | "C" | "D">>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const totalQuestions = healthCheckQuestions.length;
  const currentQuestion = healthCheckQuestions[currentIndex];

  const handleOptionClick = (option: HealthCheckOption) => {
    const newAnswers = { ...answers, [currentQuestion.id]: option.key };
    setAnswers(newAnswers);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleReset = () => {
    setAnswers({});
    setStarted(false);
    setShowResult(false);
    setCurrentIndex(0);
  };

  if (!started) {
    return (
      <GlassCard>
        <SectionTitle>Trading System Health Check</SectionTitle>
        <p className="mt-2 text-sm text-muted">
          A 9-question audit and instant diagnosis for your current edge, risk and behavior profile. Get a
          personalized 30-day stabilization plan to stop bleeding and bring control back, with clarity on your next
          step.
        </p>
        <div className="mt-4">
          <GhostButton accent onClick={() => setStarted(true)}>
            Start Health Check
          </GhostButton>
        </div>
      </GlassCard>
    );
  }

  if (showResult) {
    const plan: StabilizationPlan = scoreHealthCheck(answers);
    return (
      <div className="flex flex-col gap-4">
        <GlassCard>
          <SectionTitle>Here Is What Your Trading Data Is Telling You</SectionTitle>
          <p className="mt-2 text-lg font-bold text-purple-hi">You&apos;re in the &quot;{plan.band.title}&quot; band.</p>
          <p className="text-sm text-muted">{plan.band.percentileLabel}</p>
          <p className="mt-3 text-sm text-text">Your stats show that:</p>
          <ul className="mt-2 flex flex-col gap-1">
            {plan.band.diagnosis.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard>
          <SectionTitle>Your 30-Day Stabilization Plan</SectionTitle>
          <p className="mt-2 text-sm text-muted">
            Your next 30 days are about turning good potential into stable execution. Follow these rules exactly:
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {plan.rules.map((rule, i) => (
              <div key={i} className="rounded-xl border border-line bg-surface2/40 p-3">
                <p className="text-sm font-semibold text-purple-hi">
                  Rule {i + 1} — {rule.title.replace(/^Rule - /, "")}
                </p>
                <p className="mt-1 text-xs text-muted">{rule.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs font-bold uppercase text-bear">What this plan does not solve</p>
          <ul className="mt-2 flex flex-col gap-1">
            {plan.willNotSolve.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-bear" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs font-bold uppercase text-bull">What it will do</p>
          <ul className="mt-2 flex flex-col gap-1">
            {plan.will.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-text">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-bull" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <GhostButton onClick={handleReset}>Retake Health Check</GhostButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <GlassCard>
      <p className="text-xs text-muted">
        Question {currentIndex + 1} of {totalQuestions}
      </p>
      <p className="mt-2 text-sm font-semibold text-text">{currentQuestion.question}</p>
      <div className="mt-3 flex flex-col gap-2">
        {currentQuestion.options.map((opt) => (
          <button
            key={opt.key}
            onClick={() => handleOptionClick(opt)}
            className="rounded-xl border border-line bg-surface2/40 p-3 text-left transition-colors hover:border-accent/60"
          >
            <span className="text-sm text-text">
              {opt.key}. {opt.text}
            </span>
          </button>
        ))}
      </div>
      {currentIndex > 0 && (
        <button onClick={handleBack} className="mt-4 text-xs text-accent hover:underline">
          Back
        </button>
      )}
    </GlassCard>
  );
}
