import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { siteConfig } from "@/config/site";
import { baseOpenGraph } from "@/lib/metadata";
import "./globals.css";

// Single variable font: every weight from one file, self-hosted by next/font
// (no runtime request to Google), with a metric-matched fallback to limit layout shift.
const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
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
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfa" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f11" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="flex min-h-dvh flex-col bg-background font-sans text-foreground antialiased">
        <SkipLink />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
