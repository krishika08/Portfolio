import type { ReactNode } from "react";
import { ProgressionMarker } from "@/components/portfolio/ProgressionMarker";
import { Grid } from "@/components/ui/Grid";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  /** Heading id; pass the same value to the Section's aria-labelledby. */
  id: string;
  title: string;
  level?: 2 | 3;
  /** Short label above the title. */
  eyebrow?: string;
  /** Section position; shows the progression marker with the eyebrow. */
  index?: number;
  description?: ReactNode;
  actions?: ReactNode;
  /**
   * stacked: everything left-aligned in one column (default).
   * split: from lg, title left and description/actions right — use for
   * sections whose intro benefits from controlled asymmetry.
   */
  layout?: "stacked" | "split";
  className?: string;
}

export function SectionHeader({
  id,
  title,
  level = 2,
  eyebrow,
  index,
  description,
  actions,
  layout = "stacked",
  className,
}: SectionHeaderProps) {
  const marker =
    index !== undefined ? (
      <ProgressionMarker index={index} label={eyebrow} className="mb-group" />
    ) : eyebrow ? (
      <p className="mb-group font-mono text-eyebrow text-foreground-secondary uppercase">
        {eyebrow}
      </p>
    ) : null;

  const supporting = (description || actions) && (
    <div className="space-y-cluster">
      {description && (
        <Text size="lead" tone="secondary" className="max-w-reading">
          {description}
        </Text>
      )}
      {actions}
    </div>
  );

  if (layout === "split") {
    return (
      <Grid className={cn("gap-y-cluster", className)}>
        <div className="col-span-full lg:col-span-7">
          {marker}
          <Heading level={level} id={id}>
            {title}
          </Heading>
        </div>
        {supporting && (
          <div className="col-span-full self-end lg:col-span-4 lg:col-start-9">{supporting}</div>
        )}
      </Grid>
    );
  }

  return (
    <div className={cn("max-w-reading", className)}>
      {marker}
      <Heading level={level} id={id}>
        {title}
      </Heading>
      {supporting && <div className="mt-group">{supporting}</div>}
    </div>
  );
}
