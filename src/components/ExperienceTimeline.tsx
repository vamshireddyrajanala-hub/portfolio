"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { experience } from "@/lib/content";

export function ExperienceTimeline() {
  const [activeNode, setActiveNode] = useState(experience.signalChain[0].id);
  const active = experience.signalChain.find((n) => n.id === activeNode)!;

  return (
    <section id="experience" className="relative overflow-hidden py-28">
      <TelemetryBackdrop />

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="§04 / Engineering Experience" title="Field Deployment — DRDO" />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal y={20} className="flex flex-col gap-5">
            <div>
              <h3 className="text-xl font-semibold text-ink">{experience.title}</h3>
              <p className="mt-1 text-sm text-accent">{experience.org}</p>
              <p className="font-mono text-xs text-ink-faint">{experience.dates}</p>
            </div>
            <ul className="flex flex-col gap-3 text-sm leading-relaxed text-ink-soft">
              {experience.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
            <p className="flex flex-wrap gap-x-2 gap-y-1 pt-2 font-mono-label text-[10px] text-ink-faint">
              {experience.measurementTags.map((tag, i) => (
                <span key={tag}>
                  {tag}
                  {i < experience.measurementTags.length - 1 && <span className="text-(--line-strong)"> · </span>}
                </span>
              ))}
            </p>
          </Reveal>

          <Reveal y={20} delay={100} className="flex flex-col gap-8 border-t border-(--line) pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
            <span className="font-mono-label text-xs text-accent">Ground-Station Signal Chain</span>

            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-0">
              {experience.signalChain.map((node, i) => (
                <div key={node.id} className="flex flex-1 items-center">
                  <button
                    onClick={() => setActiveNode(node.id)}
                    className="flex w-full flex-col items-center gap-2.5 py-2 text-center"
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full transition-colors ${
                        activeNode === node.id ? "bg-accent shadow-[0_0_10px_var(--accent)]" : "bg-(--line-strong)"
                      }`}
                    />
                    <span
                      className={`font-mono-label text-[10px] transition-colors ${
                        activeNode === node.id ? "text-accent" : "text-ink-soft"
                      }`}
                    >
                      {node.label}
                    </span>
                  </button>
                  {i < experience.signalChain.length - 1 && (
                    <span aria-hidden className="hidden font-mono text-ink-faint sm:block">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>

            <p className="min-h-12 border-t border-(--line) pt-6 text-sm leading-relaxed text-ink-soft">{active.detail}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TelemetryBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
      <svg width="100%" height="100%" className="h-full w-full">
        <defs>
          <pattern id="telemetry-grid" width="46" height="46" patternUnits="userSpaceOnUse">
            <path d="M46,0 H0 V46" fill="none" stroke="var(--line)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#telemetry-grid)" />
        <path d="M-50,120 Q400,40 900,160 T1800,90" fill="none" stroke="var(--accent)" strokeOpacity="0.15" strokeWidth="1.4">
          <animate attributeName="stroke-dashoffset" from="0" to="-800" dur="14s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  );
}
