"use client";

import { useEffect, useRef } from "react";
import { useIsCoarsePointer, usePrefersReducedMotion } from "@/lib/hooks";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const coarse = useIsCoarsePointer();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (coarse || reducedMotion) return;
    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${x - 180}px, ${y - 180}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [coarse, reducedMotion]);

  if (coarse || reducedMotion) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-40 h-[360px] w-[360px] rounded-full opacity-[0.06] mix-blend-screen will-change-transform"
      style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
    />
  );
}
