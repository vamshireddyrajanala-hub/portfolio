import { person } from "@/lib/content";
import { MagneticButton } from "@/components/MagneticButton";
import { Reveal } from "@/components/Reveal";

export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(79,209,255,0.1),transparent_60%)]" />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-6 text-center md:px-10">
        <Reveal as="span" className="font-mono-label text-xs text-accent" y={12}>
          §11 / Contact
        </Reveal>

        <Reveal as="h2" delay={50} className="text-3xl font-semibold uppercase leading-tight text-ink sm:text-4xl md:text-5xl">
          Have a Hardware Challenge?
        </Reveal>

        <Reveal as="p" delay={100} className="max-w-md text-base text-ink-soft">
          Let&rsquo;s build, debug, verify, and engineer better systems.
        </Reveal>

        <Reveal delay={150} className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <MagneticButton href={person.linkedin} variant="solid">
            Connect on LinkedIn
          </MagneticButton>
          <MagneticButton href={`mailto:${person.email}`} variant="outline">
            Send Email
          </MagneticButton>
          <MagneticButton href={person.resumeHref} variant="outline" download>
            Download Resume
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
