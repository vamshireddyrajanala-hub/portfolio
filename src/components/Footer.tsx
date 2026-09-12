import { person } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-(--line) px-6 py-10 md:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-mono-label text-xs text-ink">{person.name}</p>
          <p className="font-mono-label mt-1 text-[10px] text-ink-faint">{person.title} · {person.tagline}</p>
        </div>
        <div className="flex items-center gap-4 font-mono text-xs text-ink-soft">
          <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
            LinkedIn
          </a>
          <a href={`mailto:${person.email}`} className="transition-colors hover:text-accent">
            Email
          </a>
        </div>
        <p className="font-mono text-[10px] text-ink-faint">© {year} {person.name}</p>
      </div>
    </footer>
  );
}
