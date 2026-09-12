"use client";

import { useEffect, useState } from "react";
import { navItems, person } from "@/lib/content";
import { useActiveSection } from "@/lib/hooks";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(navItems.map((n) => n.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex justify-center transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav
        className={`flex w-[min(100%,72rem)] items-center justify-between rounded-sm border px-5 transition-all duration-300 ${
          scrolled
            ? "border-(--line-strong) bg-bg-panel/90 py-2.5 backdrop-blur-md"
            : "border-transparent bg-transparent py-3"
        }`}
      >
        <a href="#home" className="font-mono-label flex items-center gap-2 text-xs text-ink">
          <span className="flex h-7 w-7 items-center justify-center border border-(--line-strong) text-accent">
            {person.initials}
          </span>
          <span className="hidden sm:inline">{person.shortName}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`font-mono-label relative px-3 py-2 text-[11px] transition-colors ${
                  active === item.id ? "text-accent" : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label}
                {/* Underline grows from the centre on the active item —
                    a CSS transform, no layout animation library needed. */}
                <span
                  aria-hidden
                  className="absolute inset-x-2 -bottom-px h-px origin-center bg-accent transition-transform duration-300 ease-out"
                  style={{ transform: `scaleX(${active === item.id ? 1 : 0})` }}
                />
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-px w-5 bg-ink transition-transform ${mobileOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-5 bg-ink transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`h-px w-5 bg-ink transition-transform ${mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {mobileOpen && (
        <div className="absolute inset-x-4 top-16 rounded-sm border border-(--line-strong) bg-bg-panel/95 p-2 backdrop-blur-md md:hidden">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileOpen(false)}
              className={`font-mono-label block px-3 py-3 text-xs ${
                active === item.id ? "text-accent" : "text-ink-soft"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
