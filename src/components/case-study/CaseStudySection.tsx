import type { ReactNode } from "react";
import { ProgressionMarker } from "@/components/portfolio/ProgressionMarker";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Heading } from "@/components/ui/Heading";
import { cn } from "@/lib/cn";

interface CaseStudySectionProps {
  id: string;
  /** Position among the sections present on this page (the stage marker). */
  index: number;
  title: string;
  /** Reading column, beside the title from lg. */
  children?: ReactNode;
  /** Full-width content below (figures, galleries). */
  wide?: ReactNode;
  /** "surface" sets the section on the graphite band for a visual break. */
  tone?: "plain" | "surface";
}

/**
 * One stage of a case study: a numbered label column and a reading column,
 * with optional full-width media beneath. Pages render only the stages
 * their evidence supports, so numbering stays continuous.
 */
export function CaseStudySection({ id, index, title, children, wide, tone = "plain" }: CaseStudySectionProps) {
  return (
    <section
      aria-labelledby={id}
      className={cn(
        "relative border-t border-border-subtle py-section-compact",
        tone === "surface" && "border-y border-border bg-surface",
      )}
    >
      <Container>
        <Grid className="gap-y-cluster">
          <div className="col-span-full lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:col-span-4 lg:self-start">
            <ProgressionMarker index={index} />
            <Heading level={2} size="h2" id={id} className="mt-group">
              {title}
            </Heading>
          </div>
          {children && <div className="col-span-full lg:col-span-8 lg:col-start-5">{children}</div>}
        </Grid>
        {wide && <div className={children ? "mt-block" : "mt-cluster"}>{wide}</div>}
      </Container>
    </section>
  );
}
