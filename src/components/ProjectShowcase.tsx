"use client";

import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { projects, type ProjectFilterTag } from "@/lib/content";

const FILTERS: ("ALL" | ProjectFilterTag)[] = [
  "ALL",
  "FPGA",
  "DIGITAL",
  "ANALOG",
  "EMBEDDED",
  "ROBOTICS",
  "POWER ELECTRONICS",
];

export function ProjectShowcase() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("ALL");

  const filtered = useMemo(
    () => (filter === "ALL" ? projects : projects.filter((p) => p.tags.includes(filter as ProjectFilterTag))),
    [filter]
  );

  return (
    <section id="projects" className="relative mx-auto w-full max-w-7xl px-6 py-28 md:px-10">
      <SectionHeading eyebrow="§06 / Featured Work" title="Engineering Projects" />

      <div className="mt-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`font-mono-label rounded-sm border px-3 py-2 text-[10px] transition-colors ${
              filter === f
                ? "border-accent bg-accent/[0.1] text-accent"
                : "border-(--line-strong) text-ink-soft hover:text-ink"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-6">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
