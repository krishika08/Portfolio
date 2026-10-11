import { cn } from "@/lib/cn";

interface ProgressionMarkerProps {
  /** 1-based position in a sequence; rendered zero-padded ("01"). */
  index: number;
  /** Sequence length; renders "01/04" when set. */
  total?: number;
  /** Visible label after the counter, e.g. a section or stage name. */
  label?: string;
  /** Marks the current step with the accent. */
  current?: boolean;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The portfolio's chapter counter: two offset cobalt squares and a
 * condensed "01/04" index, marking progression through a sequence
 * (project chapters, case-study stages). The numbers are decorative and
 * hidden from assistive technology; the label is read normally.
 */
export function ProgressionMarker({ index, total, label, current = false, className }: ProgressionMarkerProps) {
  return (
    <div className={cn("flex items-center gap-tight", className)}>
      <span aria-hidden className="chapter-squares" />
      <span aria-hidden className={cn("font-display text-[1.375rem] leading-none", current ? "text-accent" : "text-foreground")}>
        {pad(index)}
        {total !== undefined && <span className="text-foreground-muted">/{pad(total)}</span>}
      </span>
      {label && <span className="ml-micro font-mono text-eyebrow text-foreground-secondary uppercase">{label}</span>}
    </div>
  );
}
