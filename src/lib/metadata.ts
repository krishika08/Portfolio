import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { ImageAsset } from "@/types/content";

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
  /** Social preview image (e.g. a project cover). Local paths resolve against the site URL. */
  image?: ImageAsset;
  noIndex?: boolean;
}

/** Builds per-route metadata with a canonical URL and consistent Open Graph fields. */
export function createPageMetadata({
  title,
  description = siteConfig.description,
  path,
  image,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const fullTitle = title ? `${title} — ${siteConfig.name}` : siteConfig.title;
  const images = image
    ? [{ url: image.src, width: image.width, height: image.height, alt: image.alt }]
    : undefined;

  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: { ...baseOpenGraph, title: fullTitle, description, url: path, ...(images && { images }) },
    // Wide images get the large card; square ones (e.g. a portrait) the
    // compact card, which would otherwise crop them through the middle.
    ...(image && {
      twitter: { card: image.width / image.height >= 1.5 ? "summary_large_image" : "summary", images },
    }),
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}
