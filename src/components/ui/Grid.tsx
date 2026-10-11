import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/** Grid classes for elements that can't be a <div> (e.g. a <ul> of cards). */
export const gridClassName = "grid grid-cols-4 gap-x-grid md:grid-cols-8 lg:grid-cols-12";

/**
 * Modular editorial grid: 4 columns on mobile, 8 from md, 12 from lg.
 * Children place themselves with col-span-* / col-start-* utilities, e.g.
 * `col-span-full lg:col-span-7` and `col-span-full lg:col-start-9 lg:col-span-4`
 * for a controlled asymmetric split. Recompose per breakpoint — don't shrink.
 */
export function Grid({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn(gridClassName, className)} {...props} />;
}
