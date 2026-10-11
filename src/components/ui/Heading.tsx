import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

// Weight, tracking and leading come from the text-* tokens.
const sizes = {
  display: "text-display",
  chapter: "text-chapter",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
} as const;

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingSize = keyof typeof sizes;

const defaultSize: Record<HeadingLevel, HeadingSize> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h3",
  5: "h3",
  6: "h3",
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
      className={cn(
        "font-display text-foreground",
        sizes[size ?? defaultSize[level]],
        className,
      )}
      {...props}
    />
  );
}
