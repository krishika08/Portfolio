import type { CSSProperties } from "react";
import { Heading } from "@/components/ui/Heading";
import { cn } from "@/lib/cn";
import type { Capability } from "@/lib/content";

interface CapabilityClusterProps {
  id: string;
  title: string;
  capabilities: Capability[];
  headingLevel?: 3 | 4;
  className?: string;
  style?: CSSProperties;
}

/**
 * A group of related skills as ruled specification rows: the skill, and
 * where it is evidenced (derived from project and experience data) beside
 * it. No levels, bars or scores. A row lights a cobalt tick on hover.
 */
export function CapabilityCluster({
  id,
  title,
  capabilities,
  headingLevel = 3,
  className,
  style,
}: CapabilityClusterProps) {
  return (
    <div className={className} style={style}>
      <Heading level={headingLevel} id={id} className="flex items-center gap-tight">
        <span aria-hidden className="h-5 w-px bg-accent" />
        {title}
      </Heading>
      <ul aria-labelledby={id} className="mt-group border-t border-border-strong">
        {capabilities.map((capability) => (
          <li
            key={capability.name}
            className={cn(
              "group relative flex flex-wrap items-baseline justify-between gap-x-group gap-y-micro border-b border-border py-tight pl-0",
              "transition-[padding,border-color] duration-(--duration-standard) ease-emphasized hover:border-accent hover:pl-3",
            )}
          >
            <span
              aria-hidden
              className="absolute top-1/2 left-0 h-3 w-px -translate-y-1/2 scale-y-0 bg-accent transition-transform duration-(--duration-standard) group-hover:scale-y-100"
            />
            <span className="text-body font-medium text-foreground">{capability.name}</span>
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
