import Image from "next/image";
import type { Evidence as EvidenceItem } from "@/lib/content";
import { assetPath } from "@/lib/assetPath";

/**
 * Renders the actual artifacts from a project — simulator screenshots,
 * measured waveforms, source, literal testbench output. These replaced a set
 * of decorative animated diagrams: for an engineering portfolio the evidence
 * is the point, and an abstraction of a result is not a result.
 */
export function Evidence({ items }: { items: EvidenceItem[] }) {
  return (
    <div className="flex flex-col gap-10">
      {items.map((item, i) => (
        <figure key={i} className="flex flex-col gap-3">
          {item.kind === "image" && (
            <div className="overflow-hidden rounded-sm border border-(--line) bg-black/40">
              <Image
                src={assetPath(item.src)}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 768px) 100vw, 45vw"
                className="h-auto w-full"
              />
            </div>
          )}

          {item.kind === "terminal" && (
            <div className="overflow-hidden rounded-sm border border-(--line) bg-black/50">
              <div className="flex items-center gap-2 border-b border-(--line) px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-accent/70" />
                <code className="font-mono text-[10px] leading-relaxed text-ink-faint break-all">
                  {item.command}
                </code>
              </div>
              <pre className="thin-scroll overflow-x-auto px-3 py-3">
                <code className="font-mono text-[10.5px] leading-relaxed text-ink-soft">
                  {item.lines.map((line, j) => (
                    <span
                      key={j}
                      className={
                        /PASS|MATCHED|ALL TESTS PASSED|tests passed/.test(line)
                          ? "block text-accent"
                          : "block"
                      }
                    >
                      {line || " "}
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          )}

          {item.kind === "code" && (
            <div className="overflow-hidden rounded-sm border border-(--line) bg-black/50">
              <div className="border-b border-(--line) px-3 py-2">
                <code className="font-mono text-[10px] text-ink-faint">{item.file}</code>
              </div>
              <pre className="thin-scroll overflow-x-auto px-3 py-3">
                <code className="font-mono text-[10.5px] leading-relaxed text-ink-soft whitespace-pre">
                  {item.code}
                </code>
              </pre>
            </div>
          )}

          <figcaption className="text-xs leading-relaxed text-ink-faint">{item.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
