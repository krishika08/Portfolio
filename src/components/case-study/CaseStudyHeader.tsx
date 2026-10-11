import { SplitText } from "@/components/motion/SplitText";
import { Metadata, type MetadataItem } from "@/components/portfolio/Metadata";
import { ProjectLinks } from "@/components/portfolio/ProjectLinks";
import { TechnologyList } from "@/components/portfolio/TechnologyList";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";
import { sectionHref, sectionIds } from "@/config/navigation";
import type { Project, ProjectTier } from "@/types/content";

const tierLabel: Record<ProjectTier, string> = {
  flagship: "Flagship project",
  supporting: "Project",
  additional: "Additional project",
};

/**
 * Level-1 scan of a project: what it is, where it runs, what it is built
 * with and where to verify it. Emphasis follows `project.tier`.
 */
export function CaseStudyHeader({ project }: { project: Project }) {
  const flagship = project.tier === "flagship";
  const facts: MetadataItem[] = [
    ...(project.platforms ? [{ label: "Platforms", value: project.platforms.join(" · ") }] : []),
    ...(project.role ? [{ label: "Role", value: project.role }] : []),
    {
      label: "Stack",
      value: <TechnologyList items={project.technologies} label={`${project.name} technologies`} />,
    },
  ];

  return (
    <Section spacing="none" aria-labelledby="project-title" className="relative isolate pt-cluster pb-block md:pt-block">
      <Container>
        <TextLink
          href={sectionHref(sectionIds.work)}
          variant="plain"
          className="-ml-micro inline-flex min-h-11 items-center gap-micro px-micro text-label text-foreground-secondary"
        >
          <Icon name="arrow-left" />
          Selected work
        </TextLink>
        <Grid className="mt-block gap-y-block">
          <div className="col-span-full lg:col-span-8">
            <p className="flex items-center gap-tight font-mono text-eyebrow text-foreground-secondary uppercase">
              <span aria-hidden className="h-3 w-px bg-accent" />
              {tierLabel[project.tier]}
            </p>
            <Heading
              level={1}
              size={flagship ? "display" : "chapter"}
              id="project-title"
              className="enter-words mt-group"
            >
              <SplitText text={project.name} />
            </Heading>
            <Text size="lead" tone="secondary" className="mt-cluster max-w-reading">
              {project.summary}
            </Text>
          </div>
          <div className="col-span-full flex flex-col gap-cluster border-t border-border-strong pt-group lg:col-span-4 lg:col-start-9 lg:self-end">
            <Metadata layout="stacked" items={facts} className="gap-group!" />
            <ProjectLinks project={project} showCaseStudy={false} />
          </div>
        </Grid>
      </Container>
    </Section>
  );
}
