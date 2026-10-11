import { cn } from "@/lib/cn";

interface TechnologyListProps {
  items: string[];
  /** Accessible name for the list, e.g. "Technologies". */
  label: string;
  className?: string;
}

/** Inline mono list separated by middle dots. No ratings, no logos. */
export function TechnologyList({ items, label, className }: TechnologyListProps) {
  if (items.length === 0) return null;

  return (
    <ul
      aria-label={label}
      className={cn(
        "flex flex-wrap gap-x-tight gap-y-micro font-mono text-meta text-foreground-secondary",
        // Separator trails each item so a wrapped line never starts with a dot.
        "[&>li:not(:last-child)]:after:ml-tight [&>li:not(:last-child)]:after:text-foreground-muted [&>li:not(:last-child)]:after:content-['·']",
        className,
      )}
    >
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
