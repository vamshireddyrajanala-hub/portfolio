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

        {project.githubHref && (
          <a
            href={project.githubHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-label inline-flex w-fit items-center gap-2 border border-(--line-strong) px-3 py-2 text-[10px] text-ink-soft transition-colors hover:border-accent hover:text-accent"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View Source on GitHub
          </a>
        )}
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
