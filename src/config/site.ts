import { profile } from "@/content/profile";

const DEV_URL = "http://localhost:3000";

function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, "");

  if (process.env.NODE_ENV === "production") {
    console.warn(
      `[site] NEXT_PUBLIC_SITE_URL is not set; canonical, Open Graph and sitemap URLs will use ${DEV_URL}.`,
    );
  }
  return DEV_URL;
}

export const siteConfig = {
  name: profile.name,
  // Provisional metadata copy; final wording is approved in a later phase.
  title: `${profile.name} — Software Engineer`,
  description: profile.positioning,
  url: resolveSiteUrl(),
  locale: "en_US",
} as const;
