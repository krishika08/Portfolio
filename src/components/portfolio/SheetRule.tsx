import { destinationNumber, destinationTotal, type SectionId } from "@/config/navigation";
import { cn } from "@/lib/cn";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * "02 / 08": a section's position on the page, the same numbers the Index
 * uses. Decorative; renders nothing for a destination that does not exist.
 */
export function SectionNumber({ section, className }: { section: SectionId; className?: string }) {
  const number = destinationNumber(section);
  if (number === undefined) return null;

  return (
    <p
      aria-hidden
      className={cn("flex items-center gap-tight font-mono text-meta tracking-[0.12em] text-foreground", className)}
    >
      <span className="h-3 w-px bg-accent" />
      {pad(number)}
      <span className="text-foreground-muted">/ {pad(destinationTotal)}</span>
    </p>
  );
}

/**
 * The marker that opens a section: its number over a drafting dimension line
 * that draws itself across the sheet as it enters the viewport. Decorative.
 */
export function SheetRule({ section, className }: { section?: SectionId; className?: string }) {
  return (
    <div aria-hidden className={className}>
      {section && <SectionNumber section={section} className="mb-tight" />}
      <div data-draw className="dimension" />
    </div>
  );
}
