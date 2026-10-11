import type { Metadata, Viewport } from "next";
import { Anton, Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { siteConfig } from "@/config/site";
import { baseOpenGraph } from "@/lib/metadata";
import "./globals.css";

// Self-hosted by next/font: no runtime request to Google, and metric-matched
// fallbacks limit layout shift. Anton (condensed display caps) has a single
// weight; Geist and Geist Mono are variable.
const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
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
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="flex min-h-dvh flex-col bg-background font-sans text-body text-foreground antialiased">
        <SkipLink />
        {/* Reading progress, driven by a CSS scroll timeline. */}
        <div aria-hidden className="scroll-progress" />
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
