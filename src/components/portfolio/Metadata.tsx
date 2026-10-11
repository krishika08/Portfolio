import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface MetadataItem {
  label: string;
  value: ReactNode;
}

const layouts = {
  /** Pairs flow on one line and wrap. */
  inline: "flex flex-wrap gap-x-cluster gap-y-tight",
  /** One pair per row. */
  stacked: "flex flex-col gap-tight",
  /** Two columns from sm. */
  grid: "grid grid-cols-1 gap-x-cluster gap-y-group sm:grid-cols-2",
} as const;

interface MetadataProps {
  items: MetadataItem[];
  layout?: keyof typeof layouts;
  className?: string;
}

/**
 * Technical label/value pairs (role, period, stack …) as a description
 * list. Labels use the mono metadata style; values read as body text.
 */
export function Metadata({ items, layout = "inline", className }: MetadataProps) {
  if (items.length === 0) return null;

  return (
    <dl className={cn(layouts[layout], className)}>
      {items.map((item) => (
        <div key={item.label} className="min-w-0">
          <dt className="font-mono text-meta tracking-[0.08em] text-foreground-muted uppercase">
            {item.label}
          </dt>
          <dd className="mt-micro text-body-sm text-foreground">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
