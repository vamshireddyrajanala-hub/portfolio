"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { useInView } from "@/lib/hooks";
import { technicalJourney } from "@/lib/content";

export function TechnicalJourney() {
  const ref = useRef<HTMLDivElement>(null);
  // The progress line draws itself once when the timeline comes into view.
  // A scroll-linked width would recompute on every scroll frame for a purely
  // decorative effect; a one-shot CSS transition reads the same and is free.
  const inView = useInView(ref, "-120px");

  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 py-28 md:px-10">
      <SectionHeading eyebrow="§09 / Technical Journey" title="Timeline" />

      <div ref={ref} className="relative mt-20 overflow-x-auto thin-scroll">
        <div className="relative min-w-[640px] px-4">
          <div className="absolute inset-x-4 top-3 h-px bg-(--line)" />
          <div
            className="absolute left-4 top-3 h-px bg-accent transition-[width] duration-[1400ms] ease-out"
            style={{ width: inView ? "calc(100% - 2rem)" : "0%" }}
          />

          <div className="relative grid grid-cols-5 gap-4">
            {technicalJourney.map((item, i) => (
              <Reveal
                key={`${item.year}-${item.label}`}
                delay={i * 80}
                y={14}
                className="flex flex-col items-center gap-3 text-center"
              >
                <span className="z-10 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
                <span className="font-mono text-sm tabular-nums text-ink">{item.year}</span>
                <span className="font-mono-label max-w-[8rem] text-[9.5px] leading-snug text-ink-soft">{item.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
