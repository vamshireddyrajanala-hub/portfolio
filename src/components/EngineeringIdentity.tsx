import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { Reveal } from "@/components/Reveal";
import { identityStats, person, education } from "@/lib/content";

const focusAreas = [
  "Hardware Design",
  "Digital Systems",
  "FPGA",
  "Embedded Systems",
  "Board-Level Debug",
  "Verification & Validation",
];

export function EngineeringIdentity() {
  return (
    <section id="about" className="relative mx-auto w-full max-w-7xl px-6 py-28 md:px-10">
      <SectionHeading eyebrow="§01 / Profile" title="Engineering Mindset" />

      <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-[1.1fr_1fr]">
        <Reveal className="flex flex-col gap-6" y={20}>
          <p className="max-w-xl text-lg leading-relaxed text-ink-soft">{person.longSummary}</p>

          <div className="flex flex-col gap-3 border-l border-(--line) pl-5">
            {education.map((ed) => (
              <div key={ed.school} className="text-sm text-ink-soft">
                <span className="font-mono-label text-accent">{ed.degree}</span>
                <br />
                {ed.school} — GPA {ed.gpa} · {ed.dates}
              </div>
            ))}
          </div>

          <p className="flex flex-wrap gap-x-2 gap-y-1.5 pt-2 font-mono-label text-[10px] text-ink-soft">
            {focusAreas.map((f, i) => (
              <span key={f}>
                {f}
                {i < focusAreas.length - 1 && <span className="text-(--line-strong)"> · </span>}
              </span>
            ))}
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-8 gap-y-8">
          {identityStats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 80}
              y={20}
              className="flex flex-col gap-3 border-t border-(--line) pt-4"
            >
              <span className="text-3xl font-medium text-ink sm:text-4xl">
                <AnimatedNumber value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
              </span>
              <span className="font-mono-label text-[10px] leading-snug text-ink-faint">{stat.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
