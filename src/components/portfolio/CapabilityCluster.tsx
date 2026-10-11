import { Heading } from "@/components/ui/Heading";
import { cn } from "@/lib/cn";
import type { Capability } from "@/lib/content";

interface CapabilityClusterProps {
  id: string;
  title: string;
  capabilities: Capability[];
  headingLevel?: 3 | 4;
  className?: string;
}

/**
 * A group of related skills as ruled rows: the skill in display caps, and
 * where it is evidenced (derived from project and experience data) at the
 * right. No levels, bars or scores.
 */
export function CapabilityCluster({
  id,
  title,
  capabilities,
  headingLevel = 3,
  className,
}: CapabilityClusterProps) {
  return (
    <div className={className}>
      <Heading level={headingLevel} id={id} className="flex items-center gap-tight">
        <span aria-hidden className="chapter-squares scale-75" />
        {title}
      </Heading>
      <ul aria-labelledby={id} className="mt-group border-t border-border">
        {capabilities.map((capability) => (
          <li
            key={capability.name}
            className={cn(
              "group flex flex-wrap items-baseline justify-between gap-x-group gap-y-micro border-b border-border py-tight",
              "transition-colors duration-(--duration-standard) hover:border-accent",
            )}
          >
            <span className="font-display text-[1.1875rem] leading-tight tracking-[0.02em] text-foreground transition-colors group-hover:text-accent">
              {capability.name}
            </span>
            {capability.evidence.length > 0 && (
              <span className="font-mono text-meta text-foreground-muted sm:text-right">
                <span className="sr-only">used in </span>
                {capability.evidence.join(" · ")}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
