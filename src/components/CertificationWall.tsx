"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { certifications } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function CertificationWall() {
  const reducedMotion = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);
  const n = certifications.length;
  const radius = 320;
  const angleStep = 360 / n;

  if (reducedMotion) {
    return (
      <section className="relative mx-auto w-full max-w-7xl px-6 py-28 md:px-10">
        <SectionHeading eyebrow="§08 / Certifications" title="Certification Wall" />
        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <CertCard key={cert.name} cert={cert} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 py-28 md:px-10">
      <SectionHeading eyebrow="§08 / Certifications" title="Certification Wall" />

      {/* Flat grid for mobile — always readable */}
      <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 md:hidden">
        {certifications.map((cert) => (
          <CertCard key={cert.name} cert={cert} />
        ))}
      </div>

      {/* 3D carousel for md+ */}
      <div
        className="relative mx-auto mt-16 hidden h-[280px] w-full max-w-4xl md:block"
        style={{ perspective: "1400px" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="absolute left-1/2 top-1/2 h-[1px] w-[1px]"
          style={{
            transformStyle: "preserve-3d",
            animation: "spin-wall 32s linear infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {certifications.map((cert, i) => (
            <div
              key={cert.name}
              className="absolute flex w-64 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `rotateY(${i * angleStep}deg) translateZ(${radius}px)`,
                transformStyle: "preserve-3d",
              }}
            >
              <CertCard cert={cert} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin-wall {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
      `}</style>
    </section>
  );
}

function CertCard({ cert }: { cert: (typeof certifications)[number] }) {
  return (
    <div className="flex w-64 flex-col gap-2 rounded-sm border border-(--line-strong) bg-bg-panel p-5 text-left shadow-[0_20px_50px_-25px_rgba(0,0,0,0.7)]">
      <span className="font-mono-label text-[9px] text-accent">{cert.issuer}</span>
      <span className="text-sm font-medium leading-snug text-ink">{cert.name}</span>
      {(cert.date || cert.id) && (
        <span className="font-mono text-[10px] tabular-nums text-ink-faint">
          {cert.date}
          {cert.date && cert.id ? " · " : ""}
          {cert.id ? `ID ${cert.id}` : ""}
        </span>
      )}
    </div>
  );
}
