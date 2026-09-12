import { HeroScene } from "@/components/HeroScene";
import { HeroLabels } from "@/components/HeroLabels";
import { person } from "@/lib/content";
import { MagneticButton } from "@/components/MagneticButton";

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
          <span className="hero-rise font-mono-label text-xs text-accent" style={{ animationDelay: "60ms" }}>
            {person.title} · {person.tagline}
          </span>

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
            <MagneticButton href={person.resumeHref} variant="outline" download>
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
