"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { useIsCoarsePointer, usePrefersReducedMotion } from "@/lib/hooks";

export function MagneticButton({
  href,
  children,
  variant = "solid",
  download,
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  download?: boolean;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const coarse = useIsCoarsePointer();
  const reducedMotion = usePrefersReducedMotion();
  const magnetic = !coarse && !reducedMotion;

  function handleMove(e: MouseEvent<HTMLAnchorElement>) {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.28, y: y * 0.35 });
  }

  function handleLeave() {
    setPos({ x: 0, y: 0 });
  }

  const base =
    "font-mono-label relative inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-xs transition-[background-color,border-color,color,transform] duration-200 ease-out";
  const solid = "bg-accent text-[#031015] hover:bg-[#7fdcff]";
  const outline = "border border-(--line-strong) text-ink hover:border-accent hover:text-accent";

  return (
    <a
      ref={ref}
      href={href}
      download={download}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      // Transform is applied directly with a CSS transition rather than a
      // spring from an animation library — one dependency less for an effect
      // the compositor can do on its own.
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      className={`${base} ${variant === "solid" ? solid : outline}`}
    >
      {children}
    </a>
  );
}
