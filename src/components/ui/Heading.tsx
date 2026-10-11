import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const sizes = {
  display: "font-display text-display font-semibold",
  h1: "font-display text-h1 font-semibold",
  h2: "font-display text-h2 font-semibold",
  h3: "text-h3 font-semibold",
  h4: "text-h4 font-semibold",
} as const;

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingSize = keyof typeof sizes;

const defaultSize: Record<HeadingLevel, HeadingSize> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h4",
  6: "h4",
};

interface HeadingProps extends ComponentPropsWithoutRef<"h2"> {
  /** Document outline level. Keep levels sequential within a page. */
  level: HeadingLevel;
  /** Visual size, independent of level. Defaults to the size matching `level`. */
  size?: HeadingSize;
}

export function Heading({ level, size, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag
      className={cn("text-foreground", sizes[size ?? defaultSize[level]], className)}
      {...props}
    />
  );
}
