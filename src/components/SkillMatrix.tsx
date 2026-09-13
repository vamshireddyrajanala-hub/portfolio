"use client";

import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { skillMatrix } from "@/lib/content";

const W = 620;
const H = 620;
const CX = W / 2;
const CY = H / 2;
const HUB_RADIUS = 210;
const LEAF_RADIUS = 66;

function pct(v: number, of: number) {
  return `${(v / of) * 100}%`;
}

/**
 * Radial skill graph.
 *
 * The leaf *names* deliberately live in the panel beside the graph rather than
 * on it. Fanning six labels into the ~78° arc available per hub left roughly
 * 32px of spacing for 112px-wide labels, so they overlapped each other and the
 * spokes at every size. The graph now carries structure (which hub, how many
 * children, what's connected) and the panel carries the reading — which is
 * legible at any width instead of only at one.
 */
export function SkillMatrix() {
  const [activeId, setActiveId] = useState(skillMatrix[0].id);

  const hubs = useMemo(
    () =>
      skillMatrix.map((node, i) => {
        const angle = (i / skillMatrix.length) * Math.PI * 2 - Math.PI / 2;
        return {
          ...node,
          x: CX + Math.cos(angle) * HUB_RADIUS,
          y: CY + Math.sin(angle) * HUB_RADIUS,
          angle,
        };
      }),
    []
  );

  const active = hubs.find((h) => h.id === activeId)!;

  // Unlabelled satellite dots — they show how many tools hang off the active
  // hub and keep the graph alive, without competing for label space.
  const leafDots = useMemo(() => {
    const spread = Math.PI / 1.8;
    return active.leaves.map((leaf, i, arr) => {
      const t = arr.length === 1 ? 0 : i / (arr.length - 1) - 0.5;
      const angle = active.angle + t * spread;
      return {
        label: leaf,
        x: active.x + Math.cos(angle) * LEAF_RADIUS,
        y: active.y + Math.sin(angle) * LEAF_RADIUS,
      };
    });
  }, [active]);

  return (
    <section id="skills" className="relative mx-auto w-full max-w-7xl px-6 py-28 md:px-10">
      <SectionHeading eyebrow="§03 / Skill Matrix" title="Engineering Skill Network" />
      <p className="mt-4 max-w-xl text-sm text-ink-faint">
        Select a node to see the tools and methods behind it.
      </p>

      <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_0.75fr] lg:gap-16">
        {/* On mobile, show the detail panel FIRST (above graph) for readability */}
        {/* ---- readable detail (mobile: shown first) ---- */}
        <div className="flex flex-col gap-5 border-b border-(--line) pb-6 lg:order-2 lg:border-b-0 lg:border-l lg:pb-0 lg:pl-12 lg:border-t-0 lg:pt-0">
          <div className="flex items-baseline gap-3">
            <span className="font-mono-label text-sm text-accent">{active.label}</span>
            <span className="font-mono text-[10px] tabular-nums text-ink-faint">
              {active.leaves.length} tools
            </span>
          </div>
          <ul className="flex flex-col">
            {active.leaves.map((leaf) => (
              <li
                key={leaf}
                className="flex items-center gap-3 border-b border-(--line) py-2.5 text-sm text-ink-soft last:border-b-0"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                {leaf}
              </li>
            ))}
          </ul>
        </div>

        {/* ---- graph ---- */}
        <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[420px] lg:order-1 lg:max-w-[560px]" style={{ aspectRatio: "1 / 1" }}>
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full">
            {hubs.map((hub) => (
              <line
                key={`spoke-${hub.id}`}
                x1={CX}
                y1={CY}
                x2={hub.x}
                y2={hub.y}
                stroke={activeId === hub.id ? "var(--accent)" : "var(--line-strong)"}
                strokeWidth={activeId === hub.id ? 1.6 : 1}
                opacity={activeId === hub.id ? 0.85 : 0.4}
              />
            ))}

            {leafDots.map((leaf) => (
              <g key={`leaf-${leaf.label}`}>
                <line
                  x1={active.x}
                  y1={active.y}
                  x2={leaf.x}
                  y2={leaf.y}
                  stroke="var(--accent-dim)"
                  strokeWidth={1}
                  opacity={0.55}
                />
                <circle cx={leaf.x} cy={leaf.y} r="3.5" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.2" />
              </g>
            ))}

            <circle cx={CX} cy={CY} r="34" fill="var(--bg-elevated)" stroke="var(--line-strong)" strokeWidth="1.2" />

            {hubs.map((hub) => (
              <circle
                key={hub.id}
                cx={hub.x}
                cy={hub.y}
                r={activeId === hub.id ? 27 : 23}
                fill={activeId === hub.id ? "var(--accent)" : "var(--bg-elevated)"}
                stroke="var(--accent)"
                strokeWidth="1.3"
                className="transition-[r] duration-200"
                aria-hidden="true"
              />
            ))}
          </svg>

          <span
            className="font-mono-label pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-[9px] text-ink-soft"
            style={{ left: pct(CX, W), top: pct(CY, H) }}
          >
            CORE
          </span>

          {/* One focusable control per hub, sized past the 24px touch minimum
              and pushed outside the circle so the text never sits on a spoke. */}
          {hubs.map((hub) => {
            const outward = 46;
            const lx = CX + Math.cos(hub.angle) * (HUB_RADIUS + outward);
            const ly = CY + Math.sin(hub.angle) * (HUB_RADIUS + outward);
            return (
              <button
                key={`label-${hub.id}`}
                type="button"
                onClick={() => setActiveId(hub.id)}
                onMouseEnter={() => setActiveId(hub.id)}
                aria-pressed={activeId === hub.id}
                className="font-mono-label absolute flex min-h-11 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-sm px-1 text-center text-[9.5px] leading-tight transition-colors"
                style={{
                  left: pct(lx, W),
                  top: pct(ly, H),
                  color: activeId === hub.id ? "var(--accent)" : "var(--ink-soft)",
                  textShadow: "0 0 6px var(--bg), 0 0 3px var(--bg)",
                }}
              >
                {hub.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
