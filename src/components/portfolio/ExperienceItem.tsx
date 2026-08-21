import { Experience } from "@/types/data";
import { Typography } from "@/components/ui/Typography";
import { TechnologyList } from "./TechnologyList";

interface ExperienceItemProps {
  experience: Experience;
  className?: string;
}

export function ExperienceItem({ experience, className = "" }: ExperienceItemProps) {
  const { organization, role, dates, contributions, technologies } = experience;

  return (
    <article className={`group flex flex-col md:flex-row gap-4 md:gap-8 items-baseline py-8 border-t border-border first:border-t-0 ${className}`}>
      <div className="w-full md:w-1/4 shrink-0">
        <Typography variant="metadata" className="text-foreground-secondary">
          {dates.start} — {dates.end || "Present"}
        </Typography>
      </div>
      <div className="w-full md:w-3/4 flex flex-col gap-4">
        <div>
          <Typography variant="h3" as="h3">
            {role}
          </Typography>
          <Typography variant="body" className="font-medium text-accent mt-1">
            {organization}
          </Typography>
        </div>
        
        {contributions && contributions.length > 0 && (
          <ul className="flex flex-col gap-2 mt-2" aria-label={`Contributions at ${organization}`}>
            {contributions.map((contribution, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-accent mt-2" aria-hidden="true">
                  <span className="block w-1 h-1 bg-accent rounded-sm" />
                </span>
                <Typography variant="body">{contribution}</Typography>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-2">
          <TechnologyList technologies={technologies} />
        </div>
      </div>
    </article>
  );
}
