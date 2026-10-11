import type { Metadata as PageMetadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { CaseStudyFigure } from "@/components/case-study/CaseStudyFigure";
import { CaseStudyGallery } from "@/components/case-study/CaseStudyGallery";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { CaseStudyPoints } from "@/components/case-study/CaseStudyPoints";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { InlineText } from "@/components/case-study/InlineText";
import { ProjectPager } from "@/components/case-study/ProjectPager";
import { Metadata } from "@/components/portfolio/Metadata";
import { ProjectLinks } from "@/components/portfolio/ProjectLinks";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Text } from "@/components/ui/Text";
import { routes } from "@/config/routes";
import { getCaseStudyProject, getCaseStudyProjects } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import type { ProjectCaseStudy } from "@/types/content";

// Project case study. Pages exist only for projects with `caseStudy` data
// (see hasCaseStudy); every other slug is a 404. Each page renders only the
// stages its evidence supports, in a fixed narrative order.

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

interface Stage {
  key: string;
  title: string;
  children?: ReactNode;
  wide?: ReactNode;
  tone?: "plain" | "surface";
}

/** Narrative order: understanding → evidence → engineering → reflection. */
function stagesFor(caseStudy: ProjectCaseStudy): Stage[] {
  const { overview, context, highlights, gallery, architecture, decisions, challenges, outcomes, learnings } =
    caseStudy;
  const [lead, ...rest] = overview;
  const stages: (Stage | false | undefined)[] = [
    {
      key: "overview",
      title: "Overview",
      children: (
        <div className="space-y-group">
          {lead && <Text size="lead">{lead}</Text>}
          {rest.map((paragraph) => (
            <Text key={paragraph} size="lead" tone="secondary">
              {paragraph}
            </Text>
          ))}
        </div>
      ),
    },
    context
      ? {
          key: "context",
          title: "The problem",
          children: <p className="max-w-reading font-display text-h2 text-foreground">{context}</p>,
        }
      : undefined,
    highlights && {
      key: "capabilities",
      title: "What it does",
      children: (
        <div className="grid gap-x-grid gap-y-cluster sm:grid-cols-2 xl:grid-cols-3">
          {highlights.map((group) => (
            <div key={group.title} className="border-t border-border pt-group">
              <h3 className="font-mono text-eyebrow text-foreground-secondary uppercase">{group.title}</h3>
              <ul className="mt-group space-y-tight text-body text-foreground">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-tight">
                    <span aria-hidden className="mt-[0.8em] h-px w-3 shrink-0 bg-border-strong" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
    },
    gallery && {
      key: "screens",
      title: "In the product",
      tone: "surface",
      wide: <CaseStudyGallery figures={gallery} />,
    },
    architecture && {
      key: "architecture",
      title: "Architecture",
      children: (
        <div className="max-w-reading space-y-group">
          {architecture.summary.map((paragraph) => (
            <Text key={paragraph} tone="secondary">
              <InlineText text={paragraph} />
            </Text>
          ))}
        </div>
      ),
      wide: architecture.figure && (
        <CaseStudyFigure
          figure={architecture.figure}
          sizes="(min-width: 1280px) 1200px, 100vw"
          expandable
          className="reveal"
        />
      ),
    },
    decisions && { key: "decisions", title: "Engineering decisions", children: <CaseStudyPoints points={decisions} /> },
    challenges && { key: "challenges", title: "Challenges", children: <CaseStudyPoints points={challenges} /> },
    outcomes && { key: "outcomes", title: "Outcomes", children: <TextList items={outcomes} /> },
    learnings && { key: "learnings", title: "What I learned", children: <TextList items={learnings} /> },
  ];
  return stages.filter((stage): stage is Stage => Boolean(stage));
}

function TextList({ items }: { items: string[] }) {
  return (
    <ul className="max-w-reading space-y-tight text-body text-foreground-secondary">
      {items.map((item) => (
        <li key={item} className="flex gap-tight">
          <span aria-hidden className="mt-[0.8em] h-px w-3 shrink-0 bg-border-strong" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getCaseStudyProject((await params).slug);
  if (!project?.caseStudy) notFound();

  const cover = project.assets?.cover;
  const flagship = project.tier === "flagship";
  const { sources } = project.caseStudy;

  return (
    <>
      <CaseStudyHeader project={project} />

      {cover && (
        <Container width={flagship ? "wide" : "content"} className="pb-section-compact">
          <Media
            image={cover}
            ratio="intrinsic"
            sizes={flagship ? "(min-width: 1440px) 1376px, 100vw" : "(min-width: 1280px) 1200px, 100vw"}
            preload
          />
        </Container>
      )}

      {stagesFor(project.caseStudy).map((stage, i) => (
        <CaseStudySection
          key={stage.key}
          id={`cs-${stage.key}`}
          index={i + 1}
          title={stage.title}
          wide={stage.wide}
          tone={stage.tone}
        >
          {stage.children}
        </CaseStudySection>
      ))}

      {(sources || project.links.live || project.links.repository) && (
        <Container className="py-block">
          <div className="flex flex-col gap-cluster border-t border-border-subtle pt-cluster md:flex-row md:items-end md:justify-between">
            {sources && <Metadata items={[{ label: "Sources", value: sources.join(" · ") }]} />}
            <ProjectLinks project={project} showCaseStudy={false} />
          </div>
        </Container>
      )}

      <ProjectPager slug={project.slug} />
    </>
  );
}
