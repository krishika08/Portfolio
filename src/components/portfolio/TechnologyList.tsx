import { Typography } from "@/components/ui/Typography";

interface TechnologyListProps {
  technologies: string[];
  className?: string;
}

export function TechnologyList({ technologies, className = "" }: TechnologyListProps) {
  if (!technologies || technologies.length === 0) return null;

  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`} aria-label="Technologies used">
      {technologies.map((tech) => (
        <li 
          key={tech} 
          className="bg-surface-secondary text-foreground-secondary px-3 py-1 rounded-sm border border-border/50 transition-colors hover:bg-border hover:text-foreground"
        >
          <Typography variant="metadata">
            {tech}
          </Typography>
        </li>
      ))}
    </ul>
  );
}
