import { Playfair_Display } from "next/font/google";

// Fonts used by more than one section are defined once here, so each is
// hosted as a single instance (see "Using a font definitions file" in the
// next/font docs). The base fonts live in app/layout.tsx.

/**
 * The editorial serif for display headings (the hero's name, section and
 * project titles). Self-hosted by next/font, with a metric-matched fallback
 * so the swap does not shift the layout. Apply `editorialSerif.variable` on
 * the element (or an ancestor) and use `var(--font-hero-serif)`.
 */
export const editorialSerif = Playfair_Display({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-hero-serif",
  display: "swap",
});
