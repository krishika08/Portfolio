import { Project } from "@/types/data";
import { Typography } from "@/components/ui/Typography";
import { Media } from "@/components/ui/Media";
import { TechnologyList } from "./TechnologyList";
import { Button } from "@/components/ui/Button";
import { CTAGroup } from "./CTAGroup";

interface ProjectPreviewProps {
  project: Project;
  className?: string;
}

/**
 * ProjectPreview — Level 2 Portfolio Primitive.
 * Receives structured Project data. Never hardcodes project-specific content.
 * Tier is communicated via layout/emphasis — no name-checking.
 */
export function ProjectPreview({ project, className = "" }: ProjectPreviewProps) {
  const { name, tagline, description, technologies, links, slug, imagePath } = project;

  return (
    <article
      className={`group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-12 border-b border-border last:border-b-0 ${className}`}
    >
      {/* Text column */}
      <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col gap-6">
        <div>
          <Typography variant="h2" as="h3" className="mb-2">
            {name}
          </Typography>
          {tagline && (
            <Typography variant="body-small" className="text-foreground-muted mb-3">
              {tagline}
            </Typography>
          )}
          <Typography variant="body">{description}</Typography>
        </div>

        <TechnologyList technologies={technologies} />

        <CTAGroup>
          {/* Always offer a path to the project detail page */}
          <Button variant="primary" href={`/projects/${slug}`}>
            View Details
          </Button>
          {links?.live && (
            <Button variant="secondary" href={links.live} external>
              Live Project
            </Button>
          )}
          {links?.github && (
            <Button variant="secondary" href={links.github} external>
              View Source
            </Button>
          )}
        </CTAGroup>
      </div>

      {/* Media column */}
      <div className="order-1 lg:order-2 lg:col-span-7 w-full">
        {imagePath ? (
          <Media
            src={imagePath}
            alt={`Screenshot of ${name}`}
            width={800}
            height={450}
            aspectRatio="video"
            className="shadow-elevated transition-transform duration-500 group-hover:-translate-y-1"
          />
        ) : (
          <div className="aspect-video bg-surface-secondary border border-border rounded-md flex items-center justify-center shadow-subtle transition-transform duration-500 group-hover:-translate-y-1">
            <Typography variant="metadata" className="text-foreground-muted">
              {name}
            </Typography>
          </div>
        )}
      </div>
    </article>
  );
}
