import type { ComponentPropsWithoutRef } from "react";
import { BaseLink, type BaseLinkProps } from "@/components/ui/BaseLink";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-accent text-accent-foreground hover:opacity-90",
  secondary: "border border-border text-foreground hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
} as const;

const sizes = {
  // md meets the 44px touch-target guideline; sm stays above the WCAG 24px minimum.
  md: "min-h-11 px-5 text-base",
  sm: "min-h-9 px-3.5 text-sm",
} as const;

interface ButtonStyleProps {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export function buttonStyles({ variant = "primary", size = "md" }: ButtonStyleProps = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-[background-color,color,opacity]",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
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

/** Navigation styled as a button. Renders a link, never a <button>. */
export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <BaseLink className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}
