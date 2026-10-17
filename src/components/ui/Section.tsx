import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

// Each spacing also pulls the anchor target in by its own top padding, so a
// link to #section scrolls to the section's content (its numbered rule) just
// under the header, never to a band of empty padding.
const spacings = {
  default: "py-section scroll-mt-[calc(var(--spacing-section)*-1)]",
  compact: "py-section-compact scroll-mt-[calc(var(--spacing-section-compact)*-1)]",
  // The section that follows the hero sits closer to it, so the join is tight.
  afterHero: "pt-block pb-section scroll-mt-[calc(var(--spacing-block)*-1)]",
  none: "",
} as const;

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  spacing?: keyof typeof spacings;
}

/**
 * Page section with consistent vertical rhythm.
 * Give it an accessible name via `aria-labelledby` pointing at its heading
 * id; an unnamed <section> is not exposed as a landmark.
 * Pair with <Container> for horizontal layout.
 */
export function Section({ spacing = "default", className, ...props }: SectionProps) {
  return <section className={cn(spacings[spacing], className)} {...props} />;
}
