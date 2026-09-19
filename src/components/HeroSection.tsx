import Image from "next/image";
import { HeroScene } from "@/components/HeroScene";
import { HeroLabels } from "@/components/HeroLabels";
import { person } from "@/lib/content";
import { MagneticButton } from "@/components/MagneticButton";
import { assetPath } from "@/lib/assetPath";

// Server component. The hero copy — including the <h1>, which is the page's
// Largest Contentful Paint element — is in the initial HTML at full opacity,
// so it paints without waiting on JavaScript. Nothing here gates on a
// loading state; the 3D scene fades in around the text once it loads.
export function HeroSection() {
  return (
    <section id="home" className="relative flex min-h-screen w-full flex-col overflow-hidden">
      {/* The 3D scene is the shared ground the whole hero sits on — not a
          boxed panel beside the text. Loaded lazily, after first paint. */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* Scrims blend the scene into the page's own background rather than
          cutting it off with a hard edge — same color, just fading opacity. */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,var(--bg)_28%,rgba(5,7,10,0.55)_52%,transparent_75%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(to_bottom,transparent,var(--bg))]" />

      <HeroLabels />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-8 px-6 pt-28 pb-16 md:px-10">
        <div className="flex max-w-2xl flex-col gap-6">

          {/* Headshot + available badge */}
          <div className="hero-rise flex items-center gap-4" style={{ animationDelay: "40ms" }}>
            <div className="relative shrink-0">
              <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-accent/40 shadow-[0_0_20px_rgba(79,209,255,0.2)] sm:h-20 sm:w-20">
                <Image
                  src={assetPath(person.profilePhoto)}
                  alt={`${person.name} — profile photo`}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              {person.available && (
                <span
                  className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-bg bg-accent"
                  title="Open to opportunities"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-bg" />
                </span>
              )}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-mono-label text-xs text-accent">
                {person.title} · {person.tagline}
              </span>
              {person.available && (
                <span className="font-mono text-[10px] text-accent/70">
                  ● Open to opportunities
                </span>
              )}
            </div>
          </div>

          {/* No entrance animation on the LCP element itself — it renders
              immediately. Animating it in would delay LCP by the duration. */}
          <h1 className="text-4xl font-semibold uppercase leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            Vamshi Krishna
            <br />
            Reddy Rajanala
          </h1>

          <p className="hero-rise max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg" style={{ animationDelay: "120ms" }}>
            {person.summary}
          </p>

          <div className="hero-rise flex flex-wrap gap-3 pt-2" style={{ animationDelay: "180ms" }}>
            <MagneticButton href="#projects" variant="solid">
              Explore My Work
            </MagneticButton>
            <MagneticButton href={assetPath(person.resumeHref)} variant="outline" download>
              Download Resume
            </MagneticButton>
          </div>

          <div
            className="hero-rise flex flex-wrap items-center gap-4 pt-2 font-mono text-xs text-ink-faint"
            style={{ animationDelay: "240ms" }}
          >
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
              LinkedIn ↗
            </a>
            <span aria-hidden className="h-3 w-px bg-(--line-strong)" />
            <a href={person.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
              GitHub ↗
            </a>
            <span aria-hidden className="h-3 w-px bg-(--line-strong)" />
            <a href={`mailto:${person.email}`} className="transition-colors hover:text-accent">
              {person.email}
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mb-6 hidden w-full max-w-7xl px-10 sm:block">
        <div className="flex items-center gap-3 font-mono text-[11px] text-ink-faint">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          SYSTEM STATUS: ONLINE — SCROLL TO EXPLORE
        </div>
      </div>
    </section>
  );
}
