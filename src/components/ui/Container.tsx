import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const widths = {
  reading: "max-w-reading",
  content: "max-w-content",
  wide: "max-w-wide",
} as const;

type ContainerElement = "div" | "header" | "footer" | "nav" | "article";

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  as?: ContainerElement;
  /** reading = 672px, content = 1152px (default), wide = 1440px. */
  width?: keyof typeof widths;
}

/** Centered, fluid-width wrapper with responsive side gutters. */
export function Container({
  as: Tag = "div",
  width = "content",
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto w-full px-gutter", widths[width], className)}
      {...props}
    />
  );
}
