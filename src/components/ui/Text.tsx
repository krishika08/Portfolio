import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const sizes = {
  lead: "text-lead",
  base: "text-base",
  sm: "text-sm",
} as const;

const tones = {
  default: "text-foreground",
  muted: "text-muted-foreground",
} as const;

interface TextProps extends ComponentPropsWithoutRef<"p"> {
  as?: "p" | "span" | "div";
  size?: keyof typeof sizes;
  tone?: keyof typeof tones;
}

export function Text({
  as: Tag = "p",
  size = "base",
  tone = "default",
  className,
  ...props
}: TextProps) {
  return <Tag className={cn(sizes[size], tones[tone], className)} {...props} />;
}
