"use client";

import type { CapabilityCategory } from "@/lib/content";

const stroke = "var(--accent)";

export function CapabilityViz({ kind, active }: { kind: CapabilityCategory["viz"]; active: boolean }) {
  const cls = `transition-opacity duration-500 ${active ? "opacity-100" : "opacity-40"}`;

  switch (kind) {
    case "schematic":
      return (
        <svg viewBox="0 0 160 60" className={cls}>
          <g fill="none" stroke={stroke} strokeWidth="1.5">
            <path d="M10,30 H40" />
            <circle cx="50" cy="30" r="10" />
            <path d="M60,30 H80" />
            <rect x="80" y="20" width="20" height="20" />
            <path d="M100,30 H120" />
            <path d="M120,15 V45" strokeDasharray="3 3">
              <animate attributeName="stroke-dashoffset" from="0" to="12" dur="1s" repeatCount="indefinite" />
            </path>
            <path d="M126,30 H150" />
          </g>
        </svg>
      );
    case "scope":
      return (
        <svg viewBox="0 0 160 60" className={cls}>
          <path d="M0,30 H160" stroke="var(--line-strong)" strokeWidth="1" />
          <path
            d="M0,30 L20,30 L28,8 L36,52 L44,14 L52,42 L60,30 L100,30 L108,30 L116,10 L124,48 L132,30 L160,30"
            fill="none"
            stroke={stroke}
            strokeWidth="1.6"
          >
            <animate attributeName="stroke-dasharray" values="0 400;400 0" dur="2.4s" repeatCount="indefinite" />
          </path>
        </svg>
      );
    case "shift":
      return (
        <svg viewBox="0 0 160 60" className={cls}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={8 + i * 25} y="20" width="18" height="20" fill="none" stroke={stroke} strokeWidth="1.4">
              <animate
                attributeName="fill-opacity"
                values="0;0.35;0"
                keyTimes="0;0.5;1"
                dur="1.8s"
                begin={`${i * 0.18}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))}
        </svg>
      );
    case "bus":
      return (
        <svg viewBox="0 0 160 60" className={cls}>
          <path d="M10,20 H150 M10,40 H150" stroke="var(--line-strong)" strokeWidth="1" />
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} r="2.4" fill={stroke}>
              <animateMotion path="M10,20 H150" dur="1.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {[0, 1].map((i) => (
            <circle key={`b-${i}`} r="2.4" fill={stroke}>
              <animateMotion path="M150,40 H10" dur="1.9s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
      );
    case "terminal":
      return (
        <svg viewBox="0 0 160 60" className={cls}>
          <rect x="8" y="10" width="144" height="40" fill="none" stroke="var(--line-strong)" strokeWidth="1" />
          <text x="16" y="28" fontSize="9" fill={stroke} fontFamily="var(--font-mono)">
            &gt; run --verify
          </text>
          <rect x="16" y="34" width="7" height="10" fill={stroke}>
            <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
          </rect>
        </svg>
      );
    case "rack":
      return (
        <svg viewBox="0 0 160 60" className={cls}>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={10 + i * 30} y="10" width="22" height="40" fill="none" stroke={stroke} strokeWidth="1.2">
              <animate
                attributeName="stroke-opacity"
                values="0.3;1;0.3"
                dur="2s"
                begin={`${i * 0.25}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))}
        </svg>
      );
    default:
      return null;
  }
}
