import type { CSSProperties } from "react";
import { SplitText } from "@/components/motion/SplitText";
import { TimelineState } from "@/components/motion/TimelineState";
import { SectionNumber } from "@/components/portfolio/SheetRule";
import { BaseLink } from "@/components/ui/BaseLink";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { destinations, sectionHref, sectionIds } from "@/config/navigation";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { getExperience } from "@/lib/content";
import { editorialSerif } from "@/lib/fonts";
import { formatMonthRange } from "@/lib/format";
import type { Experience } from "@/types/content";
import { ExperiencePassage } from "./ExperiencePassage";
import styles from "./Experience.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/** Monogram badge for each organization */
function OrgBadge({ id, name }: { id: string; name: string }) {
  if (id === "crobstacle-ventures") {
    return (
      <span aria-hidden className={cn(styles.badge, styles.badgeCrobstacle)}>
        <span className={styles.badgeLetter}>C</span>
      </span>
    );
  }
  if (id === "aas-welfare-society") {
    return (
      <span aria-hidden className={cn(styles.badge, styles.badgeAas)}>
        <span className={styles.badgeText}>AAS</span>
      </span>
    );
  }
  return (
    <span aria-hidden className={styles.badge}>
      <span className={styles.badgeLetter}>{name.charAt(0)}</span>
    </span>
  );
}

/** One professional role card on the timeline */
function RoleCard({ role, index }: { role: Experience; index: number }) {
  const titleId = `${role.id}-title`;
  const dates = formatMonthRange(role.dates);
  const locationText =
    role.id === "crobstacle-ventures"
      ? "Dehradun (Remote/Onsite)"
      : role.id === "aas-welfare-society"
        ? "Dehradun (Onsite)"
        : "Dehradun";

  return (
    <li
      data-role={role.id}
      data-role-row
      data-reveal
      className={cn(styles.roleItem, role.featured && styles.featured)}
      style={{ "--i": index } as CSSProperties}
    >
      {/* Date badge on the rail */}
      <div className={styles.dateCol}>
        <p className={styles.dateRange}>
          <time dateTime={role.dates.start}>{dates.start}</time>
          <span className={styles.dateSeparator}>–</span>
          {role.dates.end ? <time dateTime={role.dates.end}>{dates.end}</time> : dates.end}
        </p>
      </div>

      {/* Marker on the vertical rail */}
      <span aria-hidden data-marker className={styles.marker}>
        <span className={styles.markerCore} />
      </span>

      {/* Card Content */}
      <article aria-labelledby={titleId} className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.orgGroup}>
            <OrgBadge id={role.id} name={role.organization} />
            <div className={styles.titleOrg}>
              <h3 id={titleId} className={styles.roleTitle}>
                {role.role}
              </h3>
              <p className={styles.organization}>{role.organization}</p>
            </div>
          </div>

          <div className={styles.cardMeta}>
            <span className={styles.location}>
              <Icon name="map-pin" className={styles.locationIcon} />
              {locationText}
            </span>
            <span aria-hidden className={styles.cornerIndicator}>
              <Icon name="arrow-up-right" />
            </span>
          </div>
        </div>

        {/* Responsibilities list */}
        {role.contributions.length > 0 && (
          <ul className={styles.responsibilities}>
            {role.contributions.map((point) => (
              <li key={point} className={styles.bulletItem}>
                <span className={styles.bulletDot} aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Verified tech pills */}
        {role.technologies.length > 0 && (
          <div className={styles.technologies}>
            <ul aria-label={`Technologies at ${role.organization}`} className={styles.techList}>
              {role.technologies.map((tech) => (
                <li key={tech} className={styles.techChip}>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </li>
  );
}

/** Verified tools and tech items */
const verifiedTech = [
  { name: "Next.js", short: "N" },
  { name: "React.js", short: "⚛" },
  { name: "TypeScript", short: "TS" },
  { name: "JavaScript", short: "JS" },
  { name: "Tailwind CSS", short: "TW" },
  { name: "PostgreSQL", short: "PG" },
  { name: "Git", short: "GIT" },
];

/**
 * Supporting Learning Panel
 * Highlights verified core capabilities and engineering takeaways
 * directly supported by experienceGrowth and experience data.
 */
function LearningPanel() {
  return (
    <aside data-reveal aria-labelledby="experience-learnings-title" className={styles.learningPanel}>
      {/* Top Block: Key Learnings */}
      <div className={styles.learningsCard}>
        <div className={styles.panelHeader}>
          <span className={styles.panelIconWrap} aria-hidden>
            <Icon name="lightbulb" className={styles.panelHeaderIcon} />
          </span>
          <h3 id="experience-learnings-title" className={styles.panelTitle}>
            Key Learnings from These Experiences
          </h3>
        </div>

        <div className={styles.learningsGrid}>
          <div className={styles.learningsList}>
            <div className={styles.learningItem}>
              <span className={styles.itemIcon} aria-hidden>
                <Icon name="users" />
              </span>
              <div className={styles.itemContent}>
                <h4 className={styles.itemTitle}>Building for real users</h4>
                <p className={styles.itemDesc}>
                  Understanding real-world requirements, responsive layouts, and accessible interfaces.
                </p>
              </div>
            </div>

            <div className={styles.learningItem}>
              <span className={styles.itemIcon} aria-hidden>
                <Icon name="code" />
              </span>
              <div className={styles.itemContent}>
                <h4 className={styles.itemTitle}>Working in collaborative teams</h4>
                <p className={styles.itemDesc}>
                  Coordinating code, communication, and feature delivery through Git-based workflows.
                </p>
              </div>
            </div>

            <div className={styles.learningItem}>
              <span className={styles.itemIcon} aria-hidden>
                <Icon name="cube" />
              </span>
              <div className={styles.itemContent}>
                <h4 className={styles.itemTitle}>Adapting to new technologies</h4>
                <p className={styles.itemDesc}>
                  Applying modern web frameworks, component architecture, and database integrations.
                </p>
              </div>
            </div>

            <div className={styles.learningItem}>
              <span className={styles.itemIcon} aria-hidden>
                <Icon name="trend-up" />
              </span>
              <div className={styles.itemContent}>
                <h4 className={styles.itemTitle}>Solving practical problems</h4>
                <p className={styles.itemDesc}>
                  Diagnosing frontend and backend performance issues to improve software reliability.
                </p>
              </div>
            </div>
          </div>

          {/* Atmospheric mini visual card with mountain silhouette and motto */}
          <div className={styles.atmosphereCard} aria-hidden>
            <div className={styles.atmosphereScene}>
              <div className={styles.atmosphereGlow} />
              <div className={styles.atmosphereSilhouette} />
              <div className={styles.atmosphereText}>
                <span className={styles.mottoWord}>Learning</span>
                <span className={styles.mottoWord}>Building</span>
                <span className={styles.mottoWord}>Improving</span>
                <span className={styles.mottoWord}>Continuing...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Block: Tools & Technologies Used */}
      <div className={styles.techCard}>
        <div className={styles.panelHeader}>
          <span className={styles.panelIconWrap} aria-hidden>
            <Icon name="cube" className={styles.panelHeaderIcon} />
          </span>
          <h3 className={styles.panelTitle}>Tools & Technologies Used</h3>
        </div>

        <div className={styles.techGrid}>
          {verifiedTech.map((item) => (
            <div key={item.name} className={styles.techTile}>
              <span className={styles.tileBadge}>{item.short}</span>
              <span className={styles.tileName}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

/**
 * Bottom Highlights & Navigation
 * Four summary pillars and cue to the next section.
 */
function SectionFooter({ nextHref, nextLabel, nextNumber }: { nextHref?: string; nextLabel?: string; nextNumber?: number }) {
  return (
    <div className={styles.footerRow}>
      <div className={styles.highlightsGrid}>
        <div className={styles.highlightItem}>
          <span className={styles.hlIcon} aria-hidden>
            <Icon name="briefcase" />
          </span>
          <div className={styles.hlCopy}>
            <span className={styles.hlTitle}>Real Experience</span>
            <span className={styles.hlDesc}>From learning to contribution</span>
          </div>
        </div>

        <div className={styles.highlightItem}>
          <span className={styles.hlIcon} aria-hidden>
            <Icon name="code" />
          </span>
          <div className={styles.hlCopy}>
            <span className={styles.hlTitle}>Practical Skills</span>
            <span className={styles.hlDesc}>Applied across the full stack</span>
          </div>
        </div>

        <div className={styles.highlightItem}>
          <span className={styles.hlIcon} aria-hidden>
            <Icon name="users" />
          </span>
          <div className={styles.hlCopy}>
            <span className={styles.hlTitle}>Team Collaboration</span>
            <span className={styles.hlDesc}>Git-based workflows</span>
          </div>
        </div>

        <div className={styles.highlightItem}>
          <span className={styles.hlIcon} aria-hidden>
            <Icon name="trend-up" />
          </span>
          <div className={styles.hlCopy}>
            <span className={styles.hlTitle}>Continuous Growth</span>
            <span className={styles.hlDesc}>Learning and improving every day</span>
          </div>
        </div>
      </div>

      {nextHref && (
        <BaseLink href={nextHref} className={styles.nextSectionLink} aria-label={`Scroll to ${nextLabel}`}>
          <div className={styles.nextTextGroup}>
            <span className={styles.nextEyebrow}>Scroll to Next</span>
            {nextNumber !== undefined && (
              <span className={styles.nextName}>
                {pad(nextNumber)} {nextLabel}
              </span>
            )}
          </div>
          <span aria-hidden className={styles.nextIconCircle}>
            <Icon name="arrow-down" />
          </span>
        </BaseLink>
      )}
    </div>
  );
}

/**
 * Experience Section: A journey through real-world engineering.
 * Crisp editorial layout featuring:
 * 1. Introduction with title, description, resume CTA, and stone arcade backdrop.
 * 2. Professional timeline of verified roles with rail, markers, and cards.
 * 3. Supporting learning panel with verified takeaways & tech stack.
 * 4. Value summary and scroll to next section cue.
 */
export function ExperienceSection() {
  // Sort most recent first (Crobstacle 2026, AAS 2025)
  const roles = [...getExperience()].sort((a, b) => b.dates.start.localeCompare(a.dates.start));
  const next = destinations[destinations.findIndex((d) => d.id === sectionIds.experience) + 1];

  return (
    <Section
      id={sectionIds.experience}
      aria-labelledby="experience-title"
      className={cn(styles.experience, editorialSerif.variable, "relative isolate")}
    >
      {/* Subtle warm ambient lighting */}
      <div aria-hidden className={styles.ambientLighting} />

      <Container>
        {/* ── Top Band: Introduction & Cinematic Arcade ──────────────── */}
        <div className={styles.introBand}>
          <div className={styles.introTextCol}>
            <div className={styles.eyebrow}>
              <SectionNumber section={sectionIds.experience} className={styles.eyebrowNumber} />
              <span className={styles.eyebrowSlash}>/</span>
              <span className={styles.eyebrowName}>EXPERIENCE</span>
            </div>

            <h2 id="experience-title" data-split className={styles.heading}>
              <span className={styles.headingLine}>
                <SplitText text="A journey" />
              </span>{" "}
              <span className={styles.headingLine}>
                <SplitText text="through" start={2} />
              </span>{" "}
              <span className={styles.headingLine}>
                <SplitText text="real-world" start={3} />
              </span>{" "}
              <span className={cn(styles.headingLine, styles.mintAccent)}>
                <SplitText text="engineering." start={4} />
              </span>
            </h2>

            <p className={cn(styles.leadDescription, "reveal")} style={{ "--delay": "300ms" } as CSSProperties}>
              From internships to hands-on projects, every experience has shaped my approach to building meaningful
              and user-focused solutions.
            </p>

            <div className={cn(styles.actionGroup, "reveal")} style={{ "--delay": "450ms" } as CSSProperties}>
              <ButtonLink
                href={profile.resume || sectionHref(sectionIds.contact)}
                {...(profile.resume ? { newTab: true } : {})}
                className={styles.resumeButton}
              >
                {profile.resume ? "View My Resume" : "View My Resume"}
                <Icon name="arrow-right" />
              </ButtonLink>
            </div>
          </div>

          {/* Arcade with atmospheric note & quote card */}
          <div className={styles.passageContainer}>
            <ExperiencePassage />
            <div className={styles.passageOverlay} aria-hidden>
              <div className={styles.curiosityBadge}>
                <span className={styles.curiosityLine1}>Same Curiosity.</span>
                <span className={styles.curiosityLine2}>Bigger Possibilities.</span>
              </div>
              <div className={styles.quoteCard}>
                <span className={styles.quoteSymbol}>“</span>
                <p className={styles.quoteBody}>Experiences turn knowledge into perspective.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Section: Timeline & Supporting Learning Panel ─────── */}
        <TimelineState className={styles.mainGrid}>
          {/* Professional Timeline */}
          <div className={styles.timelineCol}>
            <ol aria-label="Professional experience timeline" data-progress className={styles.rolesList}>
              {roles.map((role, i) => (
                <RoleCard key={role.id} role={role} index={i} />
              ))}
            </ol>
          </div>

          {/* Supporting Learning Panel */}
          <div className={styles.panelCol}>
            <LearningPanel />
          </div>
        </TimelineState>

        {/* ── Bottom Summary Row & Next Cue ──────────────────────────── */}
        <SectionFooter nextHref={next?.href} nextLabel={next?.label} nextNumber={next?.number} />
      </Container>
    </Section>
  );
}
