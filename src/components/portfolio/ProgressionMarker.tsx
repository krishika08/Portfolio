import { cn } from "@/lib/cn";

interface ProgressionMarkerProps {
  /** 1-based position in a sequence; rendered zero-padded ("01"). */
  index: number;
  /** Sequence length; renders "01 / 04" when set. */
  total?: number;
  /** Visible label after the rule, e.g. a section or stage name. */
  label?: string;
  /** Marks the current step with the accent. */
  current?: boolean;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The portfolio's motif: a quiet index + rule marking progression through a
 * sequence (sections, project indices, case-study stages). Use where order
 * carries meaning — not on every component. The numbers are decorative and
 * hidden from assistive technology; the label is read normally.
 */
export function ProgressionMarker({ index, total, label, current = false, className }: ProgressionMarkerProps) {
  return (
    <div className={cn("flex items-center gap-tight font-mono text-meta", className)}>
      <span aria-hidden className={current ? "text-accent" : "text-foreground-muted"}>
        {pad(index)}
        {total !== undefined && <span className="text-foreground-muted"> / {pad(total)}</span>}
      </span>
      <span
        aria-hidden
        className={cn("h-px w-6", current ? "bg-accent" : "bg-border-strong")}
      />
      {label && <span className="text-eyebrow text-foreground-secondary uppercase">{label}</span>}
    </div>
  );
}
