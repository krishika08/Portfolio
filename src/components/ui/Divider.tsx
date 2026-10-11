import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const tones = {
  subtle: "border-border-subtle",
  standard: "border-border",
  strong: "border-foreground",
} as const;

interface DividerProps extends ComponentPropsWithoutRef<"hr"> {
  tone?: keyof typeof tones;
  /**
   * Decorative dividers are hidden from assistive technology. Set to false
   * only when the break is a meaningful thematic change without a heading.
   */
  decorative?: boolean;
}

export function Divider({ tone = "standard", decorative = true, className, ...props }: DividerProps) {
  return (
    <hr
      className={cn("border-0 border-t", tones[tone], className)}
      {...(decorative && { "aria-hidden": true })}
      {...props}
    />
  );
}
