"use client";

export function FlowDiagram({ nodes, dotDuration = 3 }: { nodes: string[]; dotDuration?: number }) {
  return (
    <div className="relative flex items-stretch py-4">
      <svg viewBox="0 0 100 4" preserveAspectRatio="none" className="absolute inset-x-0 top-3 h-1 w-full">
        <line x1="4" y1="2" x2="96" y2="2" stroke="var(--line-strong)" strokeWidth="0.6" />
        <circle r="1.1" fill="var(--accent)">
          <animateMotion path="M4,2 L96,2" dur={`${dotDuration}s`} repeatCount="indefinite" />
        </circle>
      </svg>
      {nodes.map((label) => (
        <div key={label} className="relative z-10 flex flex-1 flex-col items-center gap-2.5 text-center">
          <span className="h-1.5 w-1.5 rounded-full border border-(--line-strong) bg-bg" />
          <span className="font-mono-label max-w-[6.5rem] text-[9px] leading-tight text-ink-soft">{label}</span>
        </div>
      ))}
    </div>
  );
}
