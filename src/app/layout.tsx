import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Navigation } from "@/components/layout/Navigation";
import { AppProviders } from "@/components/layout/AppProviders";
import { ScrollRevealProvider } from "@/components/layout/ScrollRevealProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Full-Stack Software Engineer & Systems Architect`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#08070F] text-[#F0EEF8]">
        <a 
          href="#main-content" 
          className="absolute left-0 top-0 -translate-y-full focus:translate-y-0 transition-transform bg-[var(--accent)] text-white p-3 z-50 font-medium outline-none"
        >
          Skip to content
        </a>
        <AppProviders>
          <div className="flex min-h-[100dvh]">
            <Navigation />
            <main id="main-content" className="flex-1 flex flex-col relative z-0 pt-[72px] md:pt-0">
              {/* Global Atmospheric Background */}
              <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#08070F]">
                {/* Animated Ambient Blobs */}
                <div className="blob blob-1 w-[600px] h-[600px] top-[-100px] left-[-100px] bg-[var(--accent)] opacity-20"></div>
                <div className="blob blob-2 w-[500px] h-[500px] bottom-[-50px] right-[-50px] bg-[var(--accent)] opacity-10"></div>
                {/* Fine grid overlay */}
                <div className="absolute inset-0 bg-grid opacity-20"></div>
              </div>
              <div className="w-full mx-auto flex-1 flex flex-col min-h-full pb-20">
                <ScrollRevealProvider>
                  {children}
                </ScrollRevealProvider>
              </div>
            </main>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
