"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePrefersReducedMotion, useWebGLSupported } from "@/lib/hooks";

// Three.js + R3F + drei is ~290KB of the bundle. Keeping it out of the
// initial chunk is the single biggest lever on first paint, so it is
// imported only after the page is idle and only when it can actually run.
const Hero3D = dynamic(() => import("@/components/Hero3D").then((m) => m.Hero3D), {
  ssr: false,
  loading: () => null,
});

// Not a degraded state — this is what most phone visitors actually see, so
// it is drawn as a proper board fragment: orthogonal copper routing, vias,
// an IC footprint and a pin header, in the same visual language as the scene.
function StaticFallback() {
  const trace = "rgba(79,209,255,0.20)";
  const traceDim = "rgba(79,209,255,0.10)";
  return (
    <svg
      viewBox="0 0 1200 700"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id="board-glow" cx="70%" cy="35%" r="70%">
          <stop offset="0%" stopColor="rgba(79,209,255,0.10)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="1200" height="700" fill="url(#board-glow)" />

      {/* fine substrate grid */}
      <g stroke="rgba(79,209,255,0.04)" strokeWidth="1">
        {Array.from({ length: 15 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="1200" y2={i * 50} />
        ))}
        {Array.from({ length: 25 }, (_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="700" />
        ))}
      </g>

      {/* orthogonal copper routing */}
      <g fill="none" strokeLinecap="square">
        <path d="M640,120 H840 V240 H980" stroke={trace} strokeWidth="2" />
        <path d="M640,180 H760 V420 H1010" stroke={trace} strokeWidth="2" />
        <path d="M700,560 H900 V440 H1080" stroke={trace} strokeWidth="2" />
        <path d="M620,300 H700 V620 H960" stroke={traceDim} strokeWidth="1.5" />
        <path d="M880,60 V180 H1120" stroke={traceDim} strokeWidth="1.5" />
        <path d="M960,660 V520 H1160" stroke={traceDim} strokeWidth="1.5" />
      </g>

      {/* vias */}
      <g fill="none" stroke="rgba(79,209,255,0.45)" strokeWidth="1.5">
        {[
          [840, 240], [760, 420], [900, 440], [700, 620], [880, 180], [960, 520],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" />
        ))}
      </g>

      {/* IC footprint */}
      <g>
        <rect x="770" y="290" width="190" height="150" fill="rgba(8,13,18,0.9)" stroke="rgba(79,209,255,0.5)" strokeWidth="1.5" />
        <rect x="800" y="318" width="130" height="94" fill="none" stroke="rgba(79,209,255,0.18)" strokeWidth="1" />
        <circle cx="788" cy="308" r="3.5" fill="rgba(79,209,255,0.6)" />
        {Array.from({ length: 7 }, (_, i) => (
          <g key={`pin${i}`} stroke="rgba(79,209,255,0.35)" strokeWidth="2">
            <line x1="750" y1={306 + i * 20} x2="770" y2={306 + i * 20} />
            <line x1="960" y1={306 + i * 20} x2="980" y2={306 + i * 20} />
          </g>
        ))}
      </g>

      {/* pin header */}
      <g fill="rgba(224,189,102,0.55)">
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={`hd${i}`} x={1020 + i * 14} y="600" width="8" height="26" rx="1" />
        ))}
      </g>
    </svg>
  );
}

// The 3D scene is a desktop enhancement, not content. Shipping ~290KB of
// WebGL to a phone — to render a decorative background behind text, at the
// cost of battery, heat and jank — is a bad trade, so small or low-powered
// devices get the static schematic instead. This is a deliberate capability
// decision, not a fallback for failure.
function deviceCanAffordWebGL() {
  if (typeof window === "undefined") return false;
  if (window.innerWidth < 1024) return false;

  const nav = navigator as Navigator & { deviceMemory?: number };
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) return false;
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4) return false;

  return true;
}

export function HeroScene() {
  const webglSupported = useWebGLSupported();
  const reducedMotion = usePrefersReducedMotion();
  const [shouldLoad, setShouldLoad] = useState(false);
  const [visible, setVisible] = useState(false);
  const [affordable, setAffordable] = useState<boolean | null>(null);

  useEffect(() => {
    setAffordable(deviceCanAffordWebGL());
  }, []);

  useEffect(() => {
    if (!affordable) return;

    // Wait for the main thread to be free before pulling in the 3D bundle,
    // so it never competes with first paint or hydration.
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(() => setShouldLoad(true), { timeout: 2500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setShouldLoad(true), 1200);
    return () => clearTimeout(t);
  }, [affordable]);

  useEffect(() => {
    if (!shouldLoad) return;
    // One frame after the scene mounts, fade it in — the board materialising
    // around the already-readable text is the page's entrance moment.
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [shouldLoad]);

  if (webglSupported === false || affordable === false) {
    return <StaticFallback />;
  }

  return (
    <div
      className="h-full w-full transition-opacity duration-1000 ease-out"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {shouldLoad && <Hero3D reducedMotion={reducedMotion} />}
    </div>
  );
}
