import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/** Shared Open Graph fields. Next.js replaces (not merges) `openGraph` per route. */
export const baseOpenGraph = {
  type: "website",
  siteName: siteConfig.name,
  locale: siteConfig.locale,
} as const;

interface PageMetadataOptions {
  /** Page title; the root layout template appends the site name. Omit for the default title. */
  title?: string;
  description?: string;
  /** Route path, used for the canonical URL, e.g. "/" or "/projects/veyloprep". */
  path: string;
  noIndex?: boolean;
}

/** Builds per-route metadata with a canonical URL and consistent Open Graph fields. */
export function createPageMetadata({
  title,
  description = siteConfig.description,
  path,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const fullTitle = title ? `${title} — ${siteConfig.name}` : siteConfig.title;

  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: { ...baseOpenGraph, title: fullTitle, description, url: path },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}
