"use client";

import { useState } from "react";

const CLEAN_PATH = "M0,40 C10,10 20,10 30,40 C40,70 50,70 60,40 C70,10 80,10 90,40 C100,70 110,70 120,40";
const DISTORTED_PATH =
  "M0,40 C10,10 18,10 28,38 L32,40 L32,40 C36,42 44,70 50,70 C56,70 64,42 68,40 L72,38 C82,10 90,10 100,40 C110,70 118,70 120,40";

export function AmpVisualization() {
  const [fixed, setFixed] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <svg viewBox="0 0 120 80" className="h-28 w-full">
        <line x1="0" y1="40" x2="120" y2="40" stroke="var(--line)" strokeWidth="0.5" />
        <path
          d={fixed ? CLEAN_PATH : DISTORTED_PATH}
          fill="none"
          stroke={fixed ? "var(--accent)" : "#ff8a6b"}
          strokeWidth="2"
        />
      </svg>
      <button
        type="button"
        onClick={() => setFixed((v) => !v)}
        className="font-mono-label w-fit rounded-sm border border-(--line-strong) px-3 py-2 text-[10px] text-ink-soft transition-colors hover:border-accent hover:text-accent"
      >
        {fixed ? "Showing: Diode-Biased Output" : "Showing: Crossover Distortion — click to fix"}
      </button>
    </div>
  );
}
