"use client";

export function InstrumentIcon({ id }: { id: string }) {
  const s = "currentColor";
  const common = { fill: "none", stroke: s, strokeWidth: 1.5 } as const;

  switch (id) {
    case "scope":
      return (
        <svg viewBox="0 0 48 48" className="h-9 w-9">
          <rect x="4" y="8" width="40" height="26" rx="1" {...common} />
          <path d="M8,26 L16,26 L20,12 L24,34 L28,18 L32,26 L40,26" {...common} />
          <path d="M4,40 h40" stroke="var(--line-strong)" strokeWidth="1.2" />
        </svg>
      );
    case "spectrum":
      return (
        <svg viewBox="0 0 48 48" className="h-9 w-9">
          <rect x="4" y="8" width="40" height="26" rx="1" {...common} />
          {[10, 16, 22, 28, 34].map((x, i) => (
            <rect key={x} x={x} y={30 - [8, 16, 10, 18, 6][i]} width="4" height={[8, 16, 10, 18, 6][i]} fill={s} opacity="0.8" />
          ))}
        </svg>
      );
    case "multimeter":
      return (
        <svg viewBox="0 0 48 48" className="h-9 w-9">
          <rect x="10" y="4" width="28" height="36" rx="2" {...common} />
          <rect x="15" y="9" width="18" height="10" {...common} />
          <circle cx="19" cy="30" r="3" {...common} />
          <circle cx="29" cy="30" r="3" {...common} />
        </svg>
      );
    case "logic":
      return (
        <svg viewBox="0 0 48 48" className="h-9 w-9">
          <path d="M4,14 h6 v6 h6 v-6 h6 v10 h6 v-10 h6" {...common} />
          <path d="M4,30 h10 v6 h10 v-6 h10" {...common} />
        </svg>
      );
    case "vna":
      return (
        <svg viewBox="0 0 48 48" className="h-9 w-9">
          <circle cx="24" cy="24" r="16" {...common} />
          <path d="M24,8 a16,16 0 0 1 8,28" {...common} />
          <circle cx="24" cy="24" r="1.6" fill={s} />
        </svg>
      );
    case "siggen":
      return (
        <svg viewBox="0 0 48 48" className="h-9 w-9">
          <rect x="4" y="12" width="40" height="20" rx="1" {...common} />
          <path d="M8,22 q4,-8 8,0 t8,0 t8,0 t8,0" {...common} />
        </svg>
      );
    case "tdr":
      return (
        <svg viewBox="0 0 48 48" className="h-9 w-9">
          <path d="M4,24 H16 L20,10 L24,38 L28,24 H44" {...common} />
        </svg>
      );
    case "devboard":
      return (
        <svg viewBox="0 0 48 48" className="h-9 w-9">
          <rect x="4" y="8" width="40" height="32" rx="1" {...common} />
          <rect x="16" y="16" width="16" height="16" {...common} />
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1={16 + i * 4} y1="8" x2={16 + i * 4} y2="4" stroke={s} strokeWidth="1.4" />
          ))}
        </svg>
      );
    case "pcb":
      return (
        <svg viewBox="0 0 48 48" className="h-9 w-9">
          <rect x="4" y="6" width="40" height="36" rx="1" {...common} />
          <path d="M10,14 H24 V26 H38" {...common} />
          <circle cx="10" cy="14" r="1.6" fill={s} />
          <circle cx="38" cy="26" r="1.6" fill={s} />
        </svg>
      );
    default:
      return null;
  }
}
