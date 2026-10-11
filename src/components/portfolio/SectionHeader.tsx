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
   * centered: title and description centred, for a closing call to action.
   */
  layout?: "stacked" | "split" | "centered";
  /** Title size; use h2 when the header sits in a narrow column. */
  size?: "h1" | "h2";
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
  size = "h1",
  className,
}: SectionHeaderProps) {
  const marker =
    index !== undefined ? (
      <ProgressionMarker index={index} label={eyebrow} className="mb-group" />
    ) : eyebrow ? (
      <p className="mb-group flex items-center gap-tight font-mono text-eyebrow text-foreground-secondary uppercase">
        <span aria-hidden className="chapter-squares scale-75" />
        {eyebrow}
      </p>
    ) : null;

  const heading = (
    <Heading level={level} id={id} size={level === 2 ? size : "h2"}>
      {title}
    </Heading>
  );

  const supporting = (description || actions) && (
    <div className="space-y-cluster">
      {description && (
        <Text size="lead" tone="secondary" className={cn("max-w-reading", layout === "centered" && "mx-auto")}>
          {description}
        </Text>
      )}
      {actions}
    </div>
  );

  if (layout === "split") {
    return (
      <div className={className}>
        <Grid className="gap-y-cluster">
          <div className="col-span-full lg:col-span-7">
            {marker}
            {heading}
          </div>
          {supporting && (
            <div className="col-span-full self-end lg:col-span-4 lg:col-start-9">{supporting}</div>
          )}
        </Grid>
      </div>
    );
  }

  return (
    <div
      className={cn(
        layout === "centered" ? "mx-auto max-w-reading text-center [&>p]:justify-center" : "max-w-reading",
        className,
      )}
    >
      {marker}
      {heading}
      {supporting && <div className="mt-group">{supporting}</div>}
    </div>
  );
}
