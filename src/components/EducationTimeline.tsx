import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { education } from "@/lib/content";

export function EducationTimeline() {
  return (
    <section id="education" className="relative mx-auto w-full max-w-7xl px-6 py-28 md:px-10">
      <SectionHeading eyebrow="§07 / Education" title="Academic Foundation" />

      <div className="mt-14 flex flex-col gap-0 border-l border-(--line) pl-8">
        {education.map((ed, i) => (
          <Reveal key={ed.school} delay={i * 100} className="relative pb-12 last:pb-0">
            <span className="absolute -left-[2.15rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
            <h3 className="text-lg font-semibold text-ink sm:text-xl">{ed.school}</h3>
            <p className="mt-1 text-sm text-accent">{ed.degree}</p>
            <p className="mt-1 font-mono text-xs tabular-nums text-ink-faint">
              GPA {ed.gpa} · {ed.dates}
            </p>
            {ed.coursework && (
              <p className="mt-4 flex flex-wrap gap-x-2 gap-y-1 font-mono-label text-[9.5px] text-ink-soft">
                {ed.coursework.map((c, j) => (
                  <span key={c}>
                    {c}
                    {j < ed.coursework!.length - 1 && <span className="text-(--line-strong)"> · </span>}
                  </span>
                ))}
              </p>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
