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
 * A ruled calendar row: role in display caps with the organisation beneath,
 * dates at the right, then contributions and technologies.
 * `experience.featured` adds emphasis (cobalt rule, larger type).
 * Place inside an <ol>/<ul> <li> when rendering several.
 */
export function ExperienceItem({ experience, headingLevel = 3, className }: ExperienceItemProps) {
  const titleId = `${experience.id}-title`;
  const dates = formatMonthRange(experience.dates);
  const featured = experience.featured === true;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "group border-t pt-cluster transition-colors duration-(--duration-standard)",
        featured ? "border-accent" : "border-border hover:border-accent",
        className,
      )}
    >
      <Grid className="gap-y-group">
        <div className="col-span-full md:col-span-6 lg:col-span-8">
          <Heading
            level={headingLevel}
            size={featured ? "h1" : "h2"}
            id={titleId}
            className="transition-colors group-hover:text-accent"
          >
            {experience.role}
          </Heading>
          <Text size={featured ? "lead" : "body"} tone="secondary" className="mt-tight">
            {experience.organization}
          </Text>
        </div>
        <p className="col-span-full font-mono text-meta text-foreground-muted md:col-span-2 md:pt-2 md:text-right lg:col-span-4">
          <time dateTime={experience.dates.start}>{dates.start}</time>
          {" — "}
          {experience.dates.end ? <time dateTime={experience.dates.end}>{dates.end}</time> : dates.end}
        </p>
        {(experience.contributions.length > 0 || experience.technologies.length > 0) && (
          <div className="col-span-full flex flex-col gap-group lg:col-span-8">
            {experience.contributions.length > 0 && (
              <ul
                className={cn(
                  "max-w-reading space-y-tight text-foreground-secondary",
                  featured ? "text-body" : "text-body-sm",
                )}
              >
                {experience.contributions.map((item) => (
                  <li key={item} className="flex gap-tight">
                    <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 bg-accent" />
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
