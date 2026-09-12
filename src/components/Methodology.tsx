"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { methodology } from "@/lib/content";

export function Methodology() {
  const [activeStep, setActiveStep] = useState(methodology[0].step);
  const active = methodology.find((m) => m.step === activeStep)!;

  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 py-28 md:px-10">
      <SectionHeading eyebrow="§10 / Methodology" title="How I Solve Problems" />
      <p className="mt-4 max-w-xl text-sm text-ink-faint">Select a step to read how it plays out in practice.</p>

      <div className="relative mt-16 flex flex-col gap-0 md:grid md:grid-cols-4 md:gap-x-6 md:gap-y-10">
        {methodology.map((m, i) => {
          const isActive = m.step === activeStep;
          return (
            <button
              key={m.step}
              onClick={() => setActiveStep(m.step)}
              aria-pressed={isActive}
              className="relative flex items-start gap-4 border-b border-(--line) py-6 text-left transition-colors md:flex-col md:items-start md:gap-3 md:border-b-0 md:py-0"
            >
              <span className={`font-mono text-2xl tabular-nums transition-colors ${isActive ? "text-accent" : "text-ink-faint"}`}>
                {m.step}
              </span>
              <div className="flex flex-1 flex-col gap-2">
                <span className={`text-base font-medium transition-colors ${isActive ? "text-ink" : "text-ink-soft"}`}>
                  {m.title}
                </span>
                {i < methodology.length - 1 && (
                  <span aria-hidden className="hidden h-px w-full bg-(--line) md:block" />
                )}
              </div>
              <span
                aria-hidden
                className={`absolute -bottom-px left-0 h-px bg-accent transition-all duration-300 md:top-auto ${
                  isActive ? "w-8" : "w-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* A plain, always-mounted panel whose content swaps instantly on
          click — no crossfade library in the loop, just correct content
          every time. The active step's own highlighting above already
          carries the "you clicked this" feedback. */}
      <div className="mt-12 border-t border-(--line) pt-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
          <span className="font-mono-label shrink-0 text-xs text-accent">
            {active.step} / {active.title}
          </span>
          <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">{active.detail}</p>
        </div>
      </div>
    </section>
  );
}
