import type { ComponentPropsWithoutRef } from "react";
import { BaseLink, type BaseLinkProps } from "@/components/ui/BaseLink";
import { cn } from "@/lib/cn";

// CTA hierarchy:
//   primary   — the one high-value action in a context (View work, Resume)
//   secondary — supporting actions (GitHub, Project details)
//   text      — low-emphasis actions (Read case study, View source)
const variants = {
  primary:
    "bg-foreground text-surface hover:bg-accent active:bg-accent-hover",
  secondary:
    "border border-border-strong bg-transparent text-foreground hover:border-foreground hover:bg-surface active:bg-surface-secondary",
  text: "text-foreground underline-offset-4 decoration-1 hover:text-accent hover:underline active:text-accent-hover",
} as const;

const sizes = {
  // md meets the 44px touch-target guideline; sm stays above the WCAG 24px minimum.
  md: "min-h-11 text-button",
  sm: "min-h-9 text-label",
} as const;

// Text CTAs carry no horizontal padding so they align with body text.
const padding = {
  md: "px-5",
  sm: "px-3.5",
} as const;

interface ButtonStyleProps {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export function buttonStyles({ variant = "primary", size = "md" }: ButtonStyleProps = {}) {
  return cn(
    "inline-flex items-center justify-center gap-tight rounded-sm whitespace-nowrap",
    "transition-[background-color,border-color,color] active:duration-(--duration-instant)",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    variant !== "text" && padding[size],
  );
}

interface ButtonProps extends ComponentPropsWithoutRef<"button">, ButtonStyleProps {}

/** An action. For navigation use <ButtonLink> so the element stays a link. */
export function Button({ variant, size, type = "button", className, ...props }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonStyles({ variant, size }), className)} {...props} />
  );
}

interface ButtonLinkProps extends BaseLinkProps, ButtonStyleProps {}

/** Navigation styled as a CTA. Renders a link, never a <button>. */
export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <BaseLink className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}
