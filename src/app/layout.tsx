import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Sans } from "next/font/google";
import { Intro } from "@/components/intro/Intro";
import { introGateScript } from "@/components/intro/introGate";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { MotionLayer } from "@/components/motion/MotionLayer";
import { siteConfig } from "@/config/site";
import { profile } from "@/content/profile";
import { editorialSerif } from "@/lib/fonts";
import { baseOpenGraph } from "@/lib/metadata";
import "./globals.css";

// Three variable fonts (one file each, all weights), self-hosted by next/font:
// no runtime request to Google, and metric-matched fallbacks limit layout shift.
const display = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    ...baseOpenGraph,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    // Switch to "summary_large_image" once an Open Graph image exists.
    card: "summary",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#080a0d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the gate script (below) sets data-intro on <html> before React runs.
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${editorialSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* A plain inline script, parsed and run before first paint: it decides whether the opening
            plays (next/script's beforeInteractive would defer it until the app's JavaScript loads). */}
        <script id="intro-gate" dangerouslySetInnerHTML={{ __html: introGateScript }} />
      </head>
      <body className="flex min-h-dvh flex-col font-sans text-body text-foreground antialiased">
        {/* The cinematic opening: first visit of a session, home page only. */}
        <Intro name={profile.name} role={profile.role} />
        <SkipLink />
        {/* Reading progress and the grid spotlight (MotionLayer). */}
        <MotionLayer />
        <SiteHeader />
        {/* overflow-x: clip keeps 3D reveals and tilts from widening the page
            without creating a scroll container. */}
        <main id="main" tabIndex={-1} className="flex-1 overflow-x-clip outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
