import { BaseLink } from "@/components/ui/BaseLink";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Icon } from "@/components/ui/Icon";
import { TextLink } from "@/components/ui/TextLink";
import { sectionHref, sectionIds } from "@/config/navigation";
import { routes } from "@/config/routes";
import { getAdjacentCaseStudies } from "@/lib/content";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/content";

/** Previous / next project (wrapping) and the way back to Selected Work. */
export function ProjectPager({ slug }: { slug: string }) {
  const { previous, next } = getAdjacentCaseStudies(slug);

  return (
    <nav aria-label="More projects" className="border-t border-accent bg-surface">
      <Container className="py-block">
        {(previous || next) && (
          <Grid className="gap-y-cluster">
            {previous && <PagerLink project={previous} direction="previous" />}
            {next && <PagerLink project={next} direction="next" />}
          </Grid>
        )}
        <TextLink
          href={sectionHref(sectionIds.work)}
          variant="plain"
          className="mt-cluster inline-flex min-h-11 items-center gap-micro text-label text-foreground-secondary"
        >
          <Icon name="arrow-left" />
          All selected work
        </TextLink>
      </Container>
    </nav>
  );
}

function PagerLink({ project, direction }: { project: Project; direction: "previous" | "next" }) {
  const next = direction === "next";
  return (
    <BaseLink
      href={routes.project(project.slug)}
      className={cn(
        "group col-span-full flex flex-col gap-tight rounded-sm border-t border-border pt-group transition-colors hover:border-accent md:col-span-4 lg:col-span-5",
        next && "md:col-start-5 md:items-end md:text-right lg:col-start-8",
      )}
    >
      <span className="font-mono text-eyebrow text-foreground-muted uppercase">
        {next ? "Next project" : "Previous project"}
      </span>{" "}
      <span className="flex items-center gap-tight font-display text-h1 text-foreground transition-colors group-hover:text-accent">
        {!next && <Icon name="arrow-left" className="text-[0.5em] transition-transform group-hover:-translate-x-1" />}
        {project.name}
        {next && <Icon name="arrow-right" className="text-[0.5em] transition-transform group-hover:translate-x-1" />}
      </span>
    </BaseLink>
  );
}
