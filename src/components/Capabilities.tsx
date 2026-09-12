"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { CapabilityViz } from "@/components/CapabilityViz";
import { capabilities } from "@/lib/content";

export function Capabilities() {
  const [activeId, setActiveId] = useState(capabilities[0].id);
  const active = capabilities.find((c) => c.id === activeId)!;

  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 py-28 md:px-10">
      <SectionHeading eyebrow="§02 / Specialization" title="Engineering Capability" />

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col">
          {capabilities.map((cat) => (
            <button
              key={cat.id}
              onMouseEnter={() => setActiveId(cat.id)}
              onFocus={() => setActiveId(cat.id)}
              onClick={() => setActiveId(cat.id)}
              className={`flex flex-col gap-1.5 border-l py-4 pl-5 text-left transition-colors ${
                activeId === cat.id ? "border-accent" : "border-(--line) hover:border-(--line-strong)"
              }`}
            >
              <span className={`font-mono-label text-[11px] ${activeId === cat.id ? "text-accent" : "text-ink-faint"}`}>
                {cat.title}
              </span>
              <span className="text-sm text-ink-soft">{cat.items.slice(0, 3).join(" · ")}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col justify-between gap-10">
          <div>
            <span className="font-mono-label text-xs text-accent">{active.title}</span>
            <p className="mt-4 flex flex-wrap gap-x-2 gap-y-1.5 font-mono-label text-[11px] leading-relaxed text-ink-soft">
              {active.items.map((item, i) => (
                <span key={item}>
                  {item}
                  {i < active.items.length - 1 && <span className="text-(--line-strong)"> · </span>}
                </span>
              ))}
            </p>
          </div>
          <div className="border-t border-(--line) pt-6">
            <CapabilityViz kind={active.viz} active />
          </div>
        </div>
      </div>
    </section>
  );
}
