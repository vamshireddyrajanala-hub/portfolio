import { heroLabels } from "@/lib/content";

// Positioned in fixed 2D screen-space (not derived from 3D world coordinates)
// deliberately: a label's position tied to 3D perspective drifts unpredictably
// as the camera dollies and can land on top of the text column. Pinning
// these to percentages of the hero itself guarantees they stay clear of it,
// while still reading as HUD annotations floating near the board.
//
// The text column caps at max-w-2xl (672px) but has no width limit of its
// own below that — on a ~1024px viewport it can occupy nearly 3/4 of the
// screen. Labels stay right of 70% and the overlay only shows at lg+ (1024px),
// where 672px is at most ~66% of the viewport, leaving a safe margin.
const positions = [
  { top: "14%", left: "74%" },
  { top: "12%", left: "92%" },
  { top: "34%", left: "70%" },
  { top: "50%", left: "88%" },
  { top: "66%", left: "74%" },
  { top: "30%", left: "96%" },
  { top: "80%", left: "90%" },
];

// Server component: entrance, float and reduced-motion handling are all pure
// CSS, so this ships no JavaScript. (These previously used backdrop-filter,
// which forced a blurred compositing layer per label for no visual gain over
// a solid fill on an already-dark scene.)
export function HeroLabels() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[5] hidden lg:block" aria-hidden>
      {heroLabels.map((label, i) => {
        const pos = positions[i % positions.length];
        return (
          <span
            key={label}
            className="hero-label font-mono-label absolute whitespace-nowrap rounded-sm border px-2 py-1 text-[10px]"
            style={{
              top: pos.top,
              left: pos.left,
              color: "var(--accent)",
              borderColor: "var(--line-strong)",
              background: "rgba(6,10,14,0.72)",
              animationDelay: `${700 + i * 90}ms, ${900 + i * 400}ms`,
              animationDuration: `600ms, ${5 + (i % 3)}s`,
            }}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}
