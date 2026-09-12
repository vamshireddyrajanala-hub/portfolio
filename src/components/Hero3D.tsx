"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PCBScene } from "@/components/hero3d/PCBScene";

export function Hero3D({ reducedMotion }: { reducedMotion: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 820);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Stop rendering entirely once the hero scrolls out of view. Without this
  // the scene keeps painting for the whole length of the page.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // "demand" still paints one frame on mount (a static board, correct for
  // reduced motion); "never" paints nothing, so it is only used off-screen.
  const frameloop = !onScreen ? "never" : reducedMotion ? "demand" : "always";

  return (
    <div ref={wrapRef} className="h-full w-full">
      <Canvas
        // Capping DPR at 1.5 keeps the fragment count sane on high-density
        // displays, where rendering at 2x costs ~1.8x the pixels for a scene
        // that sits softly behind text.
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 1.15, 5.6], fov: 42 }}
        className="!pointer-events-none"
        frameloop={frameloop}
      >
        <Suspense fallback={null}>
          <PCBScene reducedMotion={reducedMotion} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
