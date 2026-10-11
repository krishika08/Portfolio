import { TechnologyList } from "@/components/portfolio/TechnologyList";
import { Grid } from "@/components/ui/Grid";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";
import { formatMonthRange } from "@/lib/format";
import type { Experience } from "@/types/content";

interface ExperienceItemProps {
  experience: Experience;
  headingLevel?: 3 | 4;
  className?: string;
}

/**
 * Editorial list entry with light structural cues: a top rule, dates in a
 * left metadata column from md, and content left-aligned on the grid.
 * `experience.featured` adds emphasis (stronger rule, larger type).
 * Place inside an <ol>/<ul> <li> when rendering several.
 */
export function ExperienceItem({ experience, headingLevel = 3, className }: ExperienceItemProps) {
  const titleId = `${experience.id}-title`;
  const dates = formatMonthRange(experience.dates);
  const featured = experience.featured === true;

  return (
    <article
      aria-labelledby={titleId}
      className={cn("border-t pt-cluster", featured ? "border-foreground" : "border-border", className)}
    >
      <Grid className="gap-y-group">
        <p className="col-span-full font-mono text-meta text-foreground-muted md:col-span-2 lg:col-span-3">
          <time dateTime={experience.dates.start}>{dates.start}</time>
          {" — "}
          {experience.dates.end ? <time dateTime={experience.dates.end}>{dates.end}</time> : dates.end}
        </p>
        <div className="col-span-full flex flex-col gap-group md:col-span-6 lg:col-span-8">
          <div>
            <Heading level={headingLevel} size={featured ? "h2" : "h3"} id={titleId}>
              {experience.role}
            </Heading>
            <Text size={featured ? "lead" : "body"} tone="secondary" className="mt-micro">
              {experience.organization}
            </Text>
          </div>
          {experience.contributions.length > 0 && (
            <ul
              className={cn(
                "max-w-reading space-y-tight text-foreground-secondary",
                featured ? "text-body" : "text-body-sm",
              )}
            >
              {experience.contributions.map((item) => (
                <li key={item} className="flex gap-tight">
                  <span aria-hidden className="mt-[0.8em] h-px w-3 shrink-0 bg-border-strong" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          <TechnologyList items={experience.technologies} label={`Technologies at ${experience.organization}`} />
        </div>
      </Grid>
    </article>
  );
}
