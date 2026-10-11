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
 * A group of related skills, each followed by where it is evidenced
 * (derived from project and experience data). No levels, bars or scores.
 */
export function CapabilityCluster({
  id,
  title,
  capabilities,
  headingLevel = 3,
  className,
}: CapabilityClusterProps) {
  return (
    <div className={cn("border-t border-border pt-group", className)}>
      <Heading level={headingLevel} id={id}>
        {title}
      </Heading>
      <ul aria-labelledby={id} className="mt-group space-y-tight">
        {capabilities.map((capability) => (
          <li key={capability.name} className="flex flex-wrap items-baseline gap-x-tight">
            <span className="text-body text-foreground">{capability.name}</span>
            {capability.evidence.length > 0 && (
              <span className="font-mono text-meta text-foreground-muted">
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
