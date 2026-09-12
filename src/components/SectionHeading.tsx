import { Reveal } from "@/components/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={`flex flex-col gap-3 ${align === "center" ? "items-center text-center" : "items-start text-left"}`}
      y={16}
    >
      <span className="font-mono-label text-xs text-accent">{eyebrow}</span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-ink">{title}</h2>
      <span aria-hidden className="h-px w-16 bg-linear-to-r from-accent to-transparent" />
    </Reveal>
  );
}
