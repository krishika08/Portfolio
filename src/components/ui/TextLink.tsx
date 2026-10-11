import { BaseLink, type BaseLinkProps } from "@/components/ui/BaseLink";
import { cn } from "@/lib/cn";

const variants = {
  /** Underlined; for links inside running text. */
  inline:
    "text-interactive underline decoration-1 underline-offset-4 hover:text-interactive-hover hover:decoration-2",
  /** No underline until hover; for navigation and lists of links. */
  plain: "text-foreground underline-offset-4 hover:text-interactive hover:underline",
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
