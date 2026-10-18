import type { ReactNode } from "react";
import { SplitText } from "@/components/motion/SplitText";
import { SectionNumber } from "@/components/portfolio/SheetRule";
import { Terrain, WorkProject } from "@/components/sections/WorkProject";
import { BaseLink } from "@/components/ui/BaseLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { sectionHref, sectionIds } from "@/config/navigation";
import { cn } from "@/lib/cn";
import { getFlagshipProject, getSupportingProjects, hasCaseStudy } from "@/lib/content";
import { editorialSerif } from "@/lib/fonts";
import type { Project } from "@/types/content";
import styles from "./SelectedWork.module.css";

/** The arcade's wall: a stone face with three arched openings (even-odd fill). */
const ARCHES = [
  [70, 330],
  [380, 640],
  [690, 950],
] as const;
const SPRING = 200;
const archPath = ([x0, x1]: readonly [number, number]) => {
  const r = (x1 - x0) / 2;
  return `M${x0} 440V${SPRING}A${r} ${r} 0 0 1 ${x1} ${SPRING}V440`;
};
const WALL = `M0 0H1000V440H0Z${ARCHES.map((a) => `${archPath(a)}Z`).join("")}`;

/** An arcade at sunset beside the heading: the hero's arch, repeated. Decorative. */
function Arcade() {
  return (
    <div aria-hidden className={styles.arcade}>
      <div className={styles.arcadeSky} />
      <div className={styles.arcadeSun} />
      <Terrain className={styles.arcadeLand} />
      <svg viewBox="0 0 1000 440" preserveAspectRatio="xMaxYMax slice" className={styles.arcadeWall} focusable="false">
        <defs>
          <linearGradient id="work-stone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#141317" />
            <stop offset="1" stopColor="#0b0b0e" />
          </linearGradient>
        </defs>
        <path d={WALL} fill="url(#work-stone)" fillRule="evenodd" />
        {ARCHES.map((a) => (
          <path key={a[0]} d={archPath(a)} className={styles.arcadeEdge} />
        ))}
      </svg>
    </div>
  );
}

/** The strip's line icons (decorative). */
const STRIP_ICONS: Record<string, ReactNode> = {
  platforms: (
    <>
      <rect x="2.5" y="4.5" width="14" height="10" rx="1.5" />
      <path d="M6 18.5h7M9.5 14.5v4" />
      <rect x="15.5" y="9" width="6" height="11" rx="1.5" />
    </>
  ),
  stack: <path d="m12 3.5 8.5 4.5L12 12.5 3.5 8 12 3.5ZM3.5 12l8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5" />,
  studies: <path d="M6.5 3.5h8l3.5 3.5v13.5h-11.5ZM14 3.5V7.5h4M9.5 12h6M9.5 15.5h6" />,
};

/**
 * Supporting details, derived from the projects shown (never a count or a
 * claim): where they run, the technologies they share, and their case studies.
 */
function strip(projects: Project[]) {
  const platforms = [...new Set(projects.flatMap((project) => project.platforms ?? []))];
  const tally = new Map<string, number>();
  for (const project of projects) for (const tech of new Set(project.technologies)) tally.set(tech, (tally.get(tech) ?? 0) + 1);
  const shared = [...tally].filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1]).map(([tech]) => tech);
  return [
    ...(platforms.length ? [{ id: "platforms", label: "Platforms", value: platforms.join(" and ") }] : []),
    ...(shared.length ? [{ id: "stack", label: "Shared stack", value: shared.join(" · ") }] : []),
    ...(projects.every(hasCaseStudy) ? [{ id: "studies", label: "Case studies", value: "One for each project, with its sources" }] : []),
  ];
}

// Selected Work: an editorial showcase of exactly the flagship and the
// supporting projects (tier "additional" projects keep their data and pages,
// but are not shown here). The section's number, the heading and its
// introduction beside an arcade at sunset; the flagship as a three-part
// feature; the supporting projects as a balanced pair with their own
// compositions; a quiet strip of supporting details and a way on. Order and
// emphasis come from project tier/order; every word, link and image comes
// from project data.
export function SelectedWorkSection() {
  const flagship = getFlagshipProject();
  const supporting = getSupportingProjects();
  const shown = [...(flagship ? [flagship] : []), ...supporting];
  const details = strip(shown);

  return (
    <Section
      id={sectionIds.work}
      aria-labelledby="work-title"
      spacing="afterHero"
      className={cn(styles.work, editorialSerif.variable, "relative isolate")}
    >
      <div aria-hidden className={styles.backdrop} />
      <Container>
        <div className={styles.band}>
          <div className={styles.intro}>
            <div className={styles.sectionLabel}>
              <SectionNumber section={sectionIds.work} className={styles.sectionNumber} />
              <p className={styles.sectionName}>Selected work</p>
            </div>
            <h2 id="work-title" data-split className={styles.heading}>
              <span className={styles.headingLine}>
                <SplitText text="Projects" />
              </span>{" "}
              <span className={styles.headingLine}>
                <SplitText text="that create" start={1} />
              </span>{" "}
              <span className={styles.headingLine}>
                <SplitText text="real" start={3} />{" "}
                <span className={styles.highlight}>
                  <SplitText text="impact." start={4} />
                </span>
              </span>
            </h2>
            <p className={styles.descriptor}>
              A curated collection of projects where design, technology and purpose come together to solve real-world
              problems.
            </p>
          </div>
          <Arcade />
        </div>

        {flagship && <WorkProject project={flagship} index={1} />}

        {supporting.length > 0 && (
          <ul aria-label="Supporting projects" className={styles.pair}>
            {supporting.map((project, i) => (
              <li key={project.slug} className={styles.cell}>
                <WorkProject project={project} index={i + 2} delay={i * 120} />
              </li>
            ))}
          </ul>
        )}

        <div className={styles.strip}>
          {details.length > 0 && (
            <dl className={styles.details}>
              {details.map((detail) => (
                <div key={detail.id} className={styles.detail}>
                  <dt>
                    <span aria-hidden className={styles.detailIcon}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                        {STRIP_ICONS[detail.id]}
                      </svg>
                    </span>
                    {detail.label}
                  </dt>
                  <dd>{detail.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <BaseLink href={sectionHref(sectionIds.experience)} aria-label="Scroll to experience" className={styles.more}>
            <span className={styles.moreRing}>
              <Icon name="arrow-down" />
            </span>
            <span aria-hidden className={styles.moreLabel}>
              Scroll
              <br />
              for more
            </span>
          </BaseLink>
        </div>
      </Container>
    </Section>
  );
}
