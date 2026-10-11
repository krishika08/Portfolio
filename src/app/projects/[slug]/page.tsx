import type { Metadata as PageMetadata } from "next";
import { notFound } from "next/navigation";
import { Metadata } from "@/components/portfolio/Metadata";
import { ProjectLinks } from "@/components/portfolio/ProjectLinks";
import { TechnologyList } from "@/components/portfolio/TechnologyList";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Media } from "@/components/ui/Media";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";
import { sectionIds } from "@/config/navigation";
import { routes } from "@/config/routes";
import { getCaseStudyProject, getCaseStudyProjects } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

// Project detail route. Pages exist only for projects with case-study
// content (see hasCaseStudy); every other slug is a 404. This file is the
// technical scaffold: the project header from verified data. The case-study
// composition (Phase 5) renders `project.caseStudy` below it.

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudyProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<PageMetadata> {
  const project = getCaseStudyProject((await params).slug);
  if (!project) return {};

  return createPageMetadata({
    title: project.name,
    description: project.summary,
    path: routes.project(project.slug),
    image: project.assets?.cover,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getCaseStudyProject((await params).slug);
  if (!project) notFound();

  const cover = project.assets?.cover;

  return (
    <>
      <Section spacing="compact" aria-labelledby="project-title">
        <Container>
          <TextLink
            href={`${routes.home}#${sectionIds.work}`}
            variant="plain"
            className="-ml-micro inline-flex min-h-11 items-center gap-micro px-micro text-label text-foreground-secondary"
          >
            <Icon name="arrow-left" />
            Work
          </TextLink>
          <Heading level={1} id="project-title" className="mt-group">
            {project.name}
          </Heading>
          <Text size="lead" tone="secondary" className="mt-group max-w-reading">
            {project.summary}
          </Text>
          <div className="mt-cluster flex flex-col gap-group">
            {project.role && <Metadata items={[{ label: "Role", value: project.role }]} />}
            <TechnologyList items={project.technologies} label={`${project.name} technologies`} />
            <ProjectLinks project={project} showCaseStudy={false} />
          </div>
        </Container>
      </Section>

      {cover && (
        <Container width="wide" className="pb-section-compact">
          <Media image={cover} ratio="intrinsic" sizes="(min-width: 1440px) 1376px, 100vw" preload />
        </Container>
      )}
    </>
  );
}
