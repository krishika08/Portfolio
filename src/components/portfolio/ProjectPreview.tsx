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
 * `project.tier`: the flagship gets an open, asymmetric editorial layout with
 * a technical detail row; supporting projects get a compact bordered card;
 * additional projects get a quiet ruled row without media. Media,
 * links and the case-study entry point render only when present in the data;
 * without a cover, cards show the project's verified capabilities instead.
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

  if (flagship) {
    return (
      <article aria-labelledby={titleId} className={className}>
        <Grid className="gap-y-cluster">
          {cover && (
            <Media
              image={cover}
              ratio="intrinsic"
              sizes="(min-width: 1024px) 58vw, 100vw"
              preload={preloadMedia}
              className="col-span-full lg:col-span-7"
            />
          )}
          <div
            className={cn(
              "col-span-full flex flex-col gap-group",
              cover ? "lg:col-span-5 lg:col-start-8 lg:self-center" : "lg:col-span-8",
            )}
          >
            {index !== undefined && <ProgressionMarker index={index} />}
            <Heading level={headingLevel} size="h2" id={titleId}>
              {project.name}
            </Heading>
            <Text size="lead" tone="secondary" className="max-w-reading">
              {project.summary}
            </Text>
            <ProjectLinks project={project} emphasis="primary" className="mt-tight" />
          </div>
          <Metadata
            layout="grid"
            className="col-span-full border-t border-border pt-group md:grid-cols-[2fr_1fr]"
            items={[
              { label: "Capabilities", value: project.capabilities.join(" · ") },
              {
                label: "Stack",
                value: <TechnologyList items={project.technologies} label={`${project.name} technologies`} />,
              },
              ...(project.role ? [{ label: "Role", value: project.role }] : []),
            ]}
          />
        </Grid>
      </article>
    );
  }

  if (project.tier === "additional") {
    return (
      <article aria-labelledby={titleId} className={cn("border-t border-border pt-cluster", className)}>
        <Grid className="gap-y-group">
          <div className="col-span-full flex flex-col gap-group md:col-span-3 lg:col-span-4">
            {index !== undefined && <ProgressionMarker index={index} />}
            <Heading level={headingLevel} size="h3" id={titleId}>
              {project.name}
            </Heading>
          </div>
          <div className="col-span-full flex flex-col gap-group md:col-span-5 lg:col-span-7 lg:col-start-6">
            <Text tone="secondary" className="max-w-reading">
              {project.summary}
            </Text>
            <TechnologyList items={project.technologies} label={`${project.name} technologies`} />
            <ProjectLinks project={project} className="pt-tight" />
          </div>
        </Grid>
      </article>
    );
  }

  return (
    <article
      aria-labelledby={titleId}
      className={cn("flex flex-col gap-cluster rounded-md border border-border bg-surface p-cluster", className)}
    >
      {cover ? (
        <Media image={cover} ratio="16/9" sizes="(min-width: 768px) 45vw, 100vw" />
      ) : (
        <CapabilityPanel project={project} />
      )}
      <div className="flex flex-1 flex-col gap-group">
        {index !== undefined && <ProgressionMarker index={index} />}
        <Heading level={headingLevel} size="h3" id={titleId}>
          {project.name}
        </Heading>
        <Text tone="secondary" className="max-w-reading">
          {project.summary}
        </Text>
        {project.role && <Metadata items={[{ label: "Role", value: project.role }]} />}
        <TechnologyList items={project.technologies} label={`${project.name} technologies`} />
        <ProjectLinks project={project} className="mt-auto pt-tight" />
      </div>
    </article>
  );
}

/**
 * Data-driven stand-in for a missing cover: the project's verified
 * capabilities in a frame of the same proportions. Never fake imagery.
 */
function CapabilityPanel({ project }: { project: Project }) {
  const labelId = `${project.slug}-capabilities`;
  return (
    <div className="flex aspect-video flex-col justify-center rounded-md border border-border-subtle bg-surface-secondary p-group">
      <p id={labelId} className="font-mono text-eyebrow text-foreground-muted uppercase">
        Capabilities
      </p>
      <ul aria-labelledby={labelId} className="mt-tight grid gap-x-group gap-y-micro text-body-sm text-foreground-secondary sm:grid-cols-2">
        {project.capabilities.map((capability) => (
          <li key={capability} className="flex gap-tight">
            <span aria-hidden className="mt-[0.75em] h-px w-2.5 shrink-0 bg-border-strong" />
            {capability}
          </li>
        ))}
      </ul>
    </div>
  );
}
