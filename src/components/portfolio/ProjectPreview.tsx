import { Metadata } from "@/components/portfolio/Metadata";
import { ProgressionMarker } from "@/components/portfolio/ProgressionMarker";
import { ProjectLinks } from "@/components/portfolio/ProjectLinks";
import { TechnologyList } from "@/components/portfolio/TechnologyList";
import { Grid } from "@/components/ui/Grid";
import { Heading } from "@/components/ui/Heading";
import { Media } from "@/components/ui/Media";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/content";

interface ProjectPreviewProps {
  project: Project;
  headingLevel?: 2 | 3;
  /** Position in a project sequence; shows the progression marker. */
  index?: number;
  /** Preload the cover image (only for an above-the-fold flagship). */
  preloadMedia?: boolean;
  className?: string;
}

/**
 * Project summary driven entirely by `Project` data. Emphasis follows
 * `project.tier`: flagship gets an open, asymmetric editorial layout;
 * supporting projects get a compact bordered card. Media, links and the
 * case-study entry point render only when present in the data.
 */
export function ProjectPreview({
  project,
  headingLevel = 3,
  index,
  preloadMedia = false,
  className,
}: ProjectPreviewProps) {
  const flagship = project.tier === "flagship";
  const titleId = `${project.slug}-title`;
  const cover = project.assets?.cover;

  const body = (
    <div className="flex flex-col gap-group">
      {index !== undefined && <ProgressionMarker index={index} />}
      <Heading level={headingLevel} size={flagship ? "h2" : "h3"} id={titleId}>
        {project.name}
      </Heading>
      <Text tone="secondary" size={flagship ? "lead" : "body"} className="max-w-reading">
        {project.summary}
      </Text>
      {project.role && <Metadata items={[{ label: "Role", value: project.role }]} />}
      <TechnologyList items={project.technologies} label={`${project.name} technologies`} />
      <ProjectLinks project={project} emphasis={flagship ? "primary" : "secondary"} className="mt-tight" />
    </div>
  );

  if (flagship) {
    return (
      <article aria-labelledby={titleId} className={className}>
        {cover ? (
          <Grid className="gap-y-cluster">
            <Media
              image={cover}
              sizes="(min-width: 1024px) 58vw, 100vw"
              preload={preloadMedia}
              className="col-span-full lg:col-span-7"
            />
            <div className="col-span-full lg:col-span-4 lg:col-start-9 lg:self-end">{body}</div>
          </Grid>
        ) : (
          body
        )}
      </article>
    );
  }

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "flex flex-col gap-cluster rounded-md border border-border bg-surface p-cluster",
        className,
      )}
    >
      {cover && <Media image={cover} sizes="(min-width: 1024px) 40vw, 100vw" />}
      {body}
    </article>
  );
}
