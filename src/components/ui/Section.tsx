import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const spacings = {
  default: "py-section",
  compact: "py-section-compact",
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
