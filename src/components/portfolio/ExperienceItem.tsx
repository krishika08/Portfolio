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
 * A timeline entry: role and organisation, dates in a mono column at the
 * right from md, then contributions and technologies. `experience.featured`
 * adds emphasis (larger type). Place inside an <ol>/<ul> <li> when
 * rendering several.
 */
export function ExperienceItem({ experience, headingLevel = 3, className }: ExperienceItemProps) {
  const titleId = `${experience.id}-title`;
  const dates = formatMonthRange(experience.dates);
  const featured = experience.featured === true;

  return (
    <article aria-labelledby={titleId} className={cn("group", className)}>
      <Grid className="gap-y-group">
        {/* Source order matches reading order (dates first); md+ places the dates at the right. */}
        <p className="col-span-full font-mono text-meta tracking-[0.06em] text-foreground-muted md:order-2 md:col-span-2 md:pt-2 md:text-right lg:col-span-4">
          <time dateTime={experience.dates.start}>{dates.start}</time>
          {" — "}
          {experience.dates.end ? <time dateTime={experience.dates.end}>{dates.end}</time> : dates.end}
        </p>
        <div className="col-span-full md:order-1 md:col-span-6 lg:col-span-8">
          <Heading level={headingLevel} size={featured ? "h1" : "h2"} id={titleId}>
            {experience.role}
          </Heading>
          <Text size={featured ? "lead" : "body"} tone="secondary" className="mt-tight">
            {experience.organization}
          </Text>
        </div>
        {(experience.contributions.length > 0 || experience.technologies.length > 0) && (
          <div className="col-span-full flex flex-col gap-group md:order-3 lg:col-span-8">
            {experience.contributions.length > 0 && (
              <ul
                className={cn(
                  "max-w-reading space-y-tight text-foreground-secondary",
                  featured ? "text-body" : "text-body-sm",
                )}
              >
                {experience.contributions.map((item) => (
                  <li key={item} className="flex gap-tight">
                    <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            <TechnologyList items={experience.technologies} label={`Technologies at ${experience.organization}`} />
          </div>
        )}
      </Grid>
    </article>
  );
}
