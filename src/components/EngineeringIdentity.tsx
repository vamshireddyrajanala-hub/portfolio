import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { Reveal } from "@/components/Reveal";
import { identityStats, person, education } from "@/lib/content";
import { assetPath } from "@/lib/assetPath";

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

          {/* Photo + name card */}
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-accent/30 shadow-[0_0_24px_rgba(79,209,255,0.15)]">
                <Image
                  src={assetPath(person.profilePhoto)}
                  alt={`${person.name} profile photo`}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              {person.available && (
                <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-bg bg-accent" title="Open to opportunities">
                  <span className="h-1.5 w-1.5 rounded-full bg-bg" />
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-ink">{person.name}</span>
              <span className="font-mono text-xs text-ink-faint">{person.location}</span>
              {person.available && (
                <span className="font-mono text-[10px] text-accent/80">● Open to Opportunities</span>
              )}
            </div>
          </div>

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

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-label inline-flex items-center gap-1.5 border border-(--line-strong) px-3 py-1.5 text-[10px] text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              LinkedIn ↗
            </a>
            <a
              href={person.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-label inline-flex items-center gap-1.5 border border-(--line-strong) px-3 py-1.5 text-[10px] text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub ↗
            </a>
            <a
              href={`mailto:${person.email}`}
              className="font-mono-label inline-flex items-center gap-1.5 border border-(--line-strong) px-3 py-1.5 text-[10px] text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              {person.email}
            </a>
          </div>

          <p className="flex flex-wrap gap-x-2 gap-y-1.5 pt-1 font-mono-label text-[10px] text-ink-soft">
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
