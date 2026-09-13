"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { InstrumentIcon } from "@/components/InstrumentIcon";
import { labInstruments } from "@/lib/content";

export function EngineeringLab() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 py-28 md:px-10">
      <SectionHeading eyebrow="§05 / The Engineering Lab" title="Test & Measurement Bench" />
      <p className="mt-4 max-w-xl text-sm text-ink-faint">Tap or hover an instrument to see what it does.</p>

      <div className="relative mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {labInstruments.map((inst) => {
          const isHovered = hovered === inst.id;
          return (
            <Reveal
              key={inst.id}
              y={16}
              className="group relative flex flex-col items-center gap-3 px-4 py-6 text-center"
            >
              <div
                onMouseEnter={() => setHovered(inst.id)}
                onMouseLeave={() => setHovered((h) => (h === inst.id ? null : h))}
                onClick={() => setHovered((h) => (h === inst.id ? null : inst.id))}
                onFocus={() => setHovered(inst.id)}
                onBlur={() => setHovered((h) => (h === inst.id ? null : h))}
                tabIndex={0}
                className="flex flex-col items-center gap-3 cursor-pointer"
              >
                <span className="text-ink-faint transition-colors group-hover:text-accent">
                  <InstrumentIcon id={inst.id} />
                </span>
                <span className="font-mono-label text-[10px] text-ink-soft transition-colors group-hover:text-ink">
                  {inst.label}
                </span>
              </div>

              {/* Always mounted, just faded via CSS — a JS-animated
                  enter/exit here can get stuck invisible under load. */}
              <div
                className="pointer-events-none absolute -bottom-3 left-1/2 z-10 w-36 sm:w-44 border-l border-accent bg-bg-elevated p-3 text-left text-xs leading-snug text-ink-soft shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] transition-all duration-200"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transform: `translate(-50%, ${isHovered ? "100%" : "calc(100% + 6px)"})`,
                }}
              >
                {inst.detail}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
