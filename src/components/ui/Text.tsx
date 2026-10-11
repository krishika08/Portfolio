import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const sizes = {
  lead: "text-lead",
  body: "text-body",
  sm: "text-body-sm",
} as const;

const tones = {
  default: "text-foreground",
  secondary: "text-foreground-secondary",
  muted: "text-foreground-muted",
} as const;

interface TextProps extends ComponentPropsWithoutRef<"p"> {
  as?: "p" | "span" | "div";
  size?: keyof typeof sizes;
  tone?: keyof typeof tones;
}

export function Text({
  as: Tag = "p",
  size = "body",
  tone = "default",
  className,
  ...props
}: TextProps) {
  return <Tag className={cn(sizes[size], tones[tone], className)} {...props} />;
}
