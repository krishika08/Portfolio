import { Metadata } from "@/components/portfolio/Metadata";
import { ProductStage } from "@/components/portfolio/ProductStage";
import { ProgressionMarker } from "@/components/portfolio/ProgressionMarker";
import { ProjectLinks } from "@/components/portfolio/ProjectLinks";
import { TechnologyList } from "@/components/portfolio/TechnologyList";
import { Grid } from "@/components/ui/Grid";
import { Heading } from "@/components/ui/Heading";
import { Media } from "@/components/ui/Media";
import { Text } from "@/components/ui/Text";
import { Tilt } from "@/components/ui/Tilt";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/content";

interface ProjectPreviewProps {
  project: Project;
  headingLevel?: 2 | 3;
  /** Position in a project sequence; shows the figure counter. */
  index?: number;
  /** Sequence length, for the "01 / 04" counter. */
  total?: number;
  /** Preload the cover image (only for an above-the-fold flagship). */
  preloadMedia?: boolean;
  className?: string;
}

/**
 * Project summary driven entirely by `Project` data. Emphasis follows
 * `project.tier`: the flagship is a full spread (counter, giant title and
 * its real product screens fanned in 3D, or its cover); supporting projects
 * are tilting cards; additional projects are ruled rows without media.
 * Media, links and the case-study entry point render only when present in
 * the data; without a cover, cards show the project's verified capabilities.
 */
export function ProjectPreview({
  project,
  headingLevel = 3,
  index,
  total,
  preloadMedia = false,
  className,
}: ProjectPreviewProps) {
  const flagship = project.tier === "flagship";
  const titleId = `${project.slug}-title`;
  const cover = project.assets?.cover;
  const counter = index !== undefined && <ProgressionMarker index={index} total={total} />;

  if (flagship) {
    const screens = (project.caseStudy?.gallery ?? []).filter((figure) => figure.image.height > figure.image.width);
    // The cover is always shown; real product screens, when there are enough
    // of them, are layered in front of it in 3D.
    const visual = cover ? (
      screens.length >= 3 ? (
        <ProductStage cover={cover} screens={screens} />
      ) : (
        <Tilt className="corner-marks rounded-md">
          <Media image={cover} ratio="intrinsic" sizes="(min-width: 1024px) 58vw, 100vw" preload={preloadMedia} />
        </Tilt>
      )
    ) : null;

    return (
      <article aria-labelledby={titleId} className={className}>
        <Grid className="items-center gap-y-block">
          <div className={cn("col-span-full flex flex-col gap-group", visual ? "lg:col-span-5" : "lg:col-span-8")}>
            {counter}
            <Heading level={headingLevel} size="chapter" id={titleId}>
              {project.name}
            </Heading>
            <Text size="lead" tone="secondary" className="max-w-reading">
              {project.summary}
            </Text>
            <ProjectLinks project={project} emphasis="primary" className="mt-tight" />
          </div>
          {visual && <div className="col-span-full lg:col-span-7">{visual}</div>}
          <Metadata
            layout="grid"
            className="col-span-full border-t border-border-strong pt-group md:grid-cols-[2fr_1fr]"
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
      <article
        aria-labelledby={titleId}
        className={cn("group border-t border-border-strong pt-cluster transition-colors hover:border-accent", className)}
      >
        <Grid className="gap-y-group">
          <div className="col-span-full flex flex-col gap-group md:col-span-3 lg:col-span-5">
            {counter}
            <Heading
              level={headingLevel}
              size="h1"
              id={titleId}
              className="transition-transform duration-(--duration-slow) ease-emphasized group-hover:translate-x-2"
            >
              {project.name}
            </Heading>
          </div>
          <div className="col-span-full flex flex-col gap-group md:col-span-5 lg:col-span-7">
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
    <Tilt max={4} className="flex flex-1 rounded-lg">
      <article
        aria-labelledby={titleId}
        className={cn(
          "group flex flex-1 flex-col gap-cluster rounded-lg border border-border bg-surface p-cluster",
          "transition-[border-color,box-shadow] duration-(--duration-standard) hover:border-accent/60 hover:shadow-glow",
          className,
        )}
      >
        {cover ? (
          <Media image={cover} ratio="16/9" sizes="(min-width: 768px) 45vw, 100vw" className="corner-marks" />
        ) : (
          <CapabilityPanel project={project} />
        )}
        <div className="flex flex-1 flex-col gap-group">
          {counter}
          <Heading level={headingLevel} size="h1" id={titleId}>
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
    </Tilt>
  );
}

/**
 * Data-driven stand-in for a missing cover: the project's verified
 * capabilities on a blueprint panel of the same proportions. Never fake
 * imagery.
 */
function CapabilityPanel({ project }: { project: Project }) {
  const labelId = `${project.slug}-capabilities`;
  return (
    <div className="corner-marks relative isolate flex aspect-video flex-col justify-center overflow-hidden rounded-md border border-border-subtle bg-surface-secondary p-group">
      <div aria-hidden className="graph-panel absolute inset-0 -z-10" />
      <p id={labelId} className="flex items-center gap-tight font-mono text-eyebrow text-foreground-muted uppercase">
        <span aria-hidden className="h-3 w-px bg-accent" />
        Capabilities
      </p>
      <ul aria-labelledby={labelId} className="mt-group grid gap-x-group gap-y-tight text-body-sm text-foreground sm:grid-cols-2">
        {project.capabilities.map((capability) => (
          <li key={capability} className="flex gap-tight">
            <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 bg-accent" />
            {capability}
          </li>
        ))}
      </ul>
    </div>
  );
}
