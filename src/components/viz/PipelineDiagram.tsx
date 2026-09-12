"use client";

export function PipelineDiagram({
  stages,
  tokenCount = 1,
  cycleSeconds = 3.2,
}: {
  stages: string[];
  tokenCount?: number;
  cycleSeconds?: number;
}) {
  const stageWidth = 100 / stages.length;
  const first = stageWidth / 2;
  const last = stageWidth * (stages.length - 1) + stageWidth / 2;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-20">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-(--line)" />
        <div className="relative flex h-full items-stretch">
          {stages.map((label) => (
            <div key={label} className="flex flex-1 flex-col items-center justify-center gap-2 px-1 text-center">
              <span className="h-1.5 w-1.5 rounded-full border border-(--line-strong)" />
              <span className="font-mono-label text-[8.5px] leading-tight text-ink-soft">{label}</span>
            </div>
          ))}
        </div>

        {/* Data tokens advancing through the pipeline. A CSS keyframe rather
            than a JS tween: it runs on the compositor, so it stays smooth
            alongside the WebGL scene instead of competing with it. */}
        {Array.from({ length: tokenCount }).map((_, tokenIndex) => (
          <span
            key={tokenIndex}
            className="pipeline-token absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-[2px] bg-accent"
            style={
              {
                boxShadow: "0 0 8px var(--accent)",
                animationDuration: `${cycleSeconds}s`,
                animationDelay: `${(tokenIndex * cycleSeconds) / tokenCount}s`,
                "--from": `calc(${first}% - 6px)`,
                "--to": `calc(${last}% - 6px)`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
