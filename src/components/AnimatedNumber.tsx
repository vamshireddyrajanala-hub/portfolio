"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion, useInView } from "@/lib/hooks";

export function AnimatedNumber({
  value,
  decimals = 0,
  suffix = "",
  durationMs = 1200,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const reducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setDisplay(value);
      return;
    }
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, durationMs, reducedMotion]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
