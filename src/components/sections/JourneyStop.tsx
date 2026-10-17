import { TechnologyList } from "@/components/portfolio/TechnologyList";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";
import { formatMonthRange } from "@/lib/format";
import type { Experience } from "@/types/content";
import styles from "./Journey.module.css";

interface JourneyStopProps {
  experience: Experience;
  className?: string;
}

/**
 * One stop on the journey: the role's dates, title and organisation, then
 * its contributions and technologies, exactly as the data states them.
 * `experience.featured` adds emphasis (larger title, a lit rule).
 */
export function JourneyStop({ experience, className }: JourneyStopProps) {
  const titleId = `${experience.id}-title`;
  const dates = formatMonthRange(experience.dates);
  const featured = experience.featured === true;

  return (
    <article aria-labelledby={titleId} className={cn(styles.card, featured && styles.featured, className)}>
      <p className={styles.dates}>
        <time dateTime={experience.dates.start}>{dates.start}</time>
        {" — "}
        {experience.dates.end ? <time dateTime={experience.dates.end}>{dates.end}</time> : dates.end}
      </p>
      <Heading level={3} size={featured ? "h2" : "h3"} id={titleId} className={styles.role}>
        {experience.role}
      </Heading>
      <Text size={featured ? "lead" : "body"} tone="secondary" className={styles.org}>
        {experience.organization}
      </Text>
      {experience.contributions.length > 0 && (
        <ul className={cn(styles.points, featured ? "text-body" : "text-body-sm")}>
          {experience.contributions.map((item) => (
            <li key={item}>
              <span aria-hidden className={styles.dash} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      <TechnologyList
        items={experience.technologies}
        label={`Technologies at ${experience.organization}`}
        className={styles.tech}
      />
    </article>
  );
}
