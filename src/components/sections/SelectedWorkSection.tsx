import { SplitText } from "@/components/motion/SplitText";
import { SheetRule } from "@/components/portfolio/SheetRule";
import { projectKind, WorkProject } from "@/components/sections/WorkProject";
import { BaseLink } from "@/components/ui/BaseLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { sectionHref, sectionIds } from "@/config/navigation";
import { cn } from "@/lib/cn";
import { getAdditionalProjects, getFlagshipProject, getSupportingProjects } from "@/lib/content";
import { editorialSerif } from "@/lib/fonts";
import styles from "./SelectedWork.module.css";

const SUPPORTING_ID = "work-supporting";

// The Engineering Constellation: an interactive, cinematic project experience.
// Projects are connected parts of one engineering journey, but each product
// has its own identity and visual treatment. The section's heading beside the
// flagship (an editorial split with its own screens in a lit, layered scene);
// then the supporting projects as a bento of distinct compositions (a cascade
// of real screenshots, a capability index, a quiet type-only card).
//
// Order and emphasis come from project tier and order; every word, link and
// image comes from project data. The collection is entirely data-driven:
// adding a project requires only a new entry in content/projects.ts.
export function SelectedWorkSection() {
  const flagship = getFlagshipProject();
  const others = [...getSupportingProjects(), ...getAdditionalProjects()];

  return (
    <Section
      id={sectionIds.work}
      aria-labelledby="work-title"
      spacing="afterHero"
      className={cn(styles.work, editorialSerif.variable, "relative isolate")}
    >
      <div aria-hidden className={styles.backdrop} />
      <Container>
        <SheetRule section={sectionIds.work} className="mb-block" />

        {/* ── Hero band: editorial heading beside the flagship ────────── */}
        <div className={styles.heroBand}>
          <div className={cn(styles.headingBlock, "reveal")}>
            <h2 id="work-title" data-split className={styles.heading}>
              <SplitText text="Projects that" />{" "}
              <SplitText text="create real" start={2} />{" "}
              <span className={styles.highlight}>
                <SplitText text="impact." start={4} />
              </span>
            </h2>
            <p className={styles.descriptor}>
              A curated collection of projects where design, technology and
              purpose come together to solve real-world problems.
            </p>
            {others.length > 0 && (
              <BaseLink href={sectionHref(SUPPORTING_ID)} aria-label="Scroll to more projects" className={styles.exploreCue}>
                <span className={styles.cueRing}>
                  <Icon name="arrow-down" />
                </span>
                <span className={styles.cueLabel}>
                  Explore Projects
                </span>
              </BaseLink>
            )}
          </div>
          {flagship && <WorkProject project={flagship} index={1} />}
        </div>

        {/* ── Supporting + additional projects ────────────────────────── */}
        {others.length > 0 && (
          <div className={styles.supporting}>
            <div className={styles.groupHead}>
              <h3 id={SUPPORTING_ID} className={styles.groupLabel}>
                More projects
              </h3>
              <span aria-hidden className={styles.groupRule} />
            </div>
            <ul aria-labelledby={SUPPORTING_ID} className={styles.grid} data-count={others.length}>
              {others.map((project, i) => (
                <li key={project.slug} className={styles.cell} data-kind={projectKind(project)}>
                  <WorkProject project={project} index={i + 2} headingLevel={4} delay={i * 110} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Section footer ─────────────────────────────────────────── */}
        <div className={styles.sectionFooter}>
          <BaseLink href={sectionHref(sectionIds.work)} className={styles.viewAllBtn}>
            View all projects
            <Icon name="arrow-right" />
          </BaseLink>
        </div>
      </Container>
    </Section>
  );
}
