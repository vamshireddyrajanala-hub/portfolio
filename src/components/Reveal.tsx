"use client";

import { createElement, useEffect, useRef, useState, type ReactNode } from "react";

type RevealTag = "div" | "span" | "p" | "h2" | "h3" | "li" | "article" | "section";

/**
 * Scroll-triggered entrance built to fail open.
 *
 * The animation is a progressive enhancement, so content must never depend on
 * it to become visible:
 *   - the hidden state is scoped to `html.reveal-enabled`, a class set by an
 *     inline script, so with JavaScript disabled the content simply renders;
 *   - a timeout reveals the element regardless if the observer never reports
 *     (some environments never deliver the callback);
 *   - no IntersectionObserver support reveals immediately.
 *
 * An earlier version hid content unconditionally and revealed it only on an
 * observer callback, which left everything below the fold invisible wherever
 * that callback did not arrive.
 */
export function Reveal({
  children,
  as = "div",
  delay = 0,
  className = "",
  y = 18,
}: {
  children: ReactNode;
  as?: RevealTag;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      setVisible(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);

    // Failsafe: never leave content hidden waiting on a callback.
    const failsafe = setTimeout(() => setVisible(true), 1500);

    return () => {
      io.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  return createElement(
    as,
    {
      ref,
      className: `reveal ${className}`,
      "data-visible": visible ? "true" : "false",
      style: {
        transitionDelay: `${delay}ms`,
        "--reveal-y": `${y}px`,
      } as React.CSSProperties,
    },
    children
  );
}
