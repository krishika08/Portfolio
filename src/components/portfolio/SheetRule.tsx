import { cn } from "@/lib/cn";

/**
 * A drafting dimension line that draws itself across the sheet as it
 * enters the viewport; the divider that opens a section. Decorative.
 */
export function SheetRule({ className }: { className?: string }) {
  return <div aria-hidden data-draw className={cn("dimension", className)} />;
}
