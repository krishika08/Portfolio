import { cn } from "@/lib/cn";

interface ProgressionMarkerProps {
  /** 1-based position in a sequence; rendered zero-padded ("01"). */
  index: number;
  /** Sequence length; renders "01 / 04" when set. */
  total?: number;
  /** Visible label after the counter, e.g. a section or stage name. */
  label?: string;
  /** Marks the current step with the accent. */
  current?: boolean;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The portfolio's figure counter: a cobalt tick, then a mono "01 / 04" in
 * the manner of drawing-sheet numbering. Marks progression through a
 * sequence (project chapters, case-study stages). The numbers are
 * decorative and hidden from assistive technology; the label is read
 * normally.
 */
export function ProgressionMarker({ index, total, label, current = false, className }: ProgressionMarkerProps) {
  return (
    <div className={cn("flex items-center gap-tight font-mono text-meta tracking-[0.12em]", className)}>
      <span aria-hidden className="h-3 w-px bg-accent" />
      <span aria-hidden className={current ? "text-accent" : "text-foreground"}>
        {pad(index)}
        {total !== undefined && <span className="text-foreground-muted"> / {pad(total)}</span>}
      </span>
      {label && <span className="ml-micro text-eyebrow text-foreground-secondary uppercase">{label}</span>}
    </div>
  );
}
