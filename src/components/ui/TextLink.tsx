import { BaseLink, type BaseLinkProps } from "@/components/ui/BaseLink";
import { cn } from "@/lib/cn";

const variants = {
  /** Underlined accent; for links inside running text. */
  inline:
    "text-accent underline decoration-1 underline-offset-4 hover:text-accent-hover hover:decoration-2",
  /** No underline until hover; for navigation and lists of links. */
  plain: "text-foreground underline-offset-4 hover:text-accent hover:underline",
} as const;

interface TextLinkProps extends BaseLinkProps {
  variant?: keyof typeof variants;
}

export function TextLink({ variant = "inline", className, ...props }: TextLinkProps) {
  return (
    <BaseLink
      className={cn("rounded-xs transition-colors", variants[variant], className)}
      {...props}
    />
  );
}
