"use client";

import type { Project } from "@/lib/content";
import { projectEvidence } from "@/lib/content";
import { Evidence } from "@/components/Evidence";
import { ProjectVisualization } from "@/components/ProjectVisualization";

export function ProjectCard({ project }: { project: Project }) {
  const evidence = projectEvidence[project.id];

  return (
    <article className="grid grid-cols-1 gap-10 border-t border-(--line) pt-10 first:border-t-0 first:pt-0 md:grid-cols-[1fr_0.9fr] md:gap-14">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-ink-faint">{project.index}</span>
            <h3 className="mt-1 text-xl font-semibold text-ink sm:text-2xl">{project.name}</h3>
            {project.subtitle && <p className="mt-1 text-sm text-accent">{project.subtitle}</p>}
          </div>
          {project.lead && (
            <span className="font-mono-label shrink-0 pt-1 text-[9px] text-accent">Team Lead</span>
          )}
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono-label text-[10px] text-ink-faint">
          {project.technologies.map((t, i) => (
            <span key={t}>
              {t}
              {i < project.technologies.length - 1 && <span className="text-(--line-strong)"> · </span>}
            </span>
          ))}
        </div>

        <dl className="flex flex-col gap-4 text-sm">
          <div>
            <dt className="font-mono-label text-[10px] text-ink-faint">Objective</dt>
            <dd className="mt-1 leading-relaxed text-ink-soft">{project.objective}</dd>
          </div>
          <div>
            <dt className="font-mono-label text-[10px] text-ink-faint">Engineering Challenge</dt>
            <dd className="mt-1 leading-relaxed text-ink-soft">{project.challenge}</dd>
          </div>
          <div>
            <dt className="font-mono-label text-[10px] text-ink-faint">Implementation</dt>
            <dd className="mt-1 flex flex-col gap-1.5 leading-relaxed text-ink-soft">
              {project.implementation.map((line) => (
                <span key={line} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {line}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="font-mono-label text-[10px] text-ink-faint">Result / Validation</dt>
            <dd className="mt-1 leading-relaxed text-ink">{project.result}</dd>
          </div>
        </dl>
      </div>

      {/* Real artifacts where there is real material; the schematic diagram
          only stands in for the projects not yet documented. */}
      <div className={evidence ? "" : "flex items-center"}>
        {evidence ? (
          <Evidence items={evidence} />
        ) : (
          <div className="w-full">
            <ProjectVisualization viz={project.viz} />
          </div>
        )}
      </div>
    </article>
  );
}
