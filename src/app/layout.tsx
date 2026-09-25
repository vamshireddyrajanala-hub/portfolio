import type { Metadata } from "next";
import { Chakra_Petch, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { person } from "@/lib/content";

// Only the weights actually used are requested — every extra weight is a
// separate font file on the critical path. `display: swap` lets text paint
// in the metric-adjusted fallback immediately rather than blocking on the
// webfont, which matters because the <h1> is the LCP element.
const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = `${person.name} | Electronic Engineer | FPGA | Hardware | Embedded Systems`;
const description =
  "Portfolio of Vamshi Krishna Reddy Rajanala, an electronic engineer specializing in hardware design, PCB bring-up, FPGA/RTL development, embedded systems, and digital verification.";
const siteUrl = "https://vamshireddyrajanala-hub.github.io/portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: person.name }],
  keywords: [
    "Vamshi Krishna Reddy Rajanala",
    "Electronic Engineer",
    "FPGA Engineer",
    "Hardware Design",
    "PCB Layout",
    "Embedded Systems",
    "Verilog HDL",
    "SystemVerilog",
    "Digital Verification",
    "RISC-V",
    "RTL Design",
    "Texas A&M Kingsville",
    "DRDO",
  ],
  icons: {
    icon: [
      { url: "/portfolio/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/portfolio/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/portfolio/apple-touch-icon.png", sizes: "512x512" }],
  },
  openGraph: {
    title,
    description,
    type: "profile",
    url: siteUrl,
    siteName: "Vamshi Rajanala — Portfolio",
    images: [
      {
        url: "/portfolio/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vamshi Krishna Reddy Rajanala — Electronic Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/portfolio/og-image.jpg"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.title,
  email: `mailto:${person.email}`,
  telephone: person.phone,
  url: siteUrl,
  image: `${siteUrl}/profile.jpg`,
  sameAs: [person.linkedin, person.github],
  description: person.longSummary,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Robstown",
    addressRegion: "TX",
    addressCountry: "US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      // The inline script below adds `reveal-enabled` to <html> before React
      // hydrates, so the server and client class lists differ by design.
      suppressHydrationWarning
      className={`${chakra.variable} ${plexSans.variable} ${jetbrains.variable} h-full`}
    >
      <head>
        {/* Runs before first paint. Scroll-reveal animations are only armed
            when scripting is available, so content is never hidden behind a
            script that may not run. */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('reveal-enabled')`,
          }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-full bg-bg text-ink antialiased">{children}</body>
    </html>
  );
}
