import type { CSSProperties } from "react";
import Image from "next/image";
import { CardEffects } from "@/components/motion/CardEffects";
import { SplitText } from "@/components/motion/SplitText";
import { BaseLink } from "@/components/ui/BaseLink";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { Tilt } from "@/components/ui/Tilt";
import { routes } from "@/config/routes";
import { cn } from "@/lib/cn";
import { hasCaseStudy } from "@/lib/content";
import type { Project } from "@/types/content";
import styles from "./SelectedWork.module.css";

/**
 * How a project is presented. It follows the project's tier and the real
 * media it has, never its name:
 *   feature → the flagship: an editorial split, its own screens in a lit,
 *             layered scene beside the copy
 *   media   → a supporting project with screenshots: a cascade of them
 *   index   → a supporting project without: its verified capabilities are the visual
 *   quiet   → an additional project: type only, the smallest card
 */
export type ProjectKind = "feature" | "media" | "index" | "quiet";

export function projectKind(project: Project): ProjectKind {
  if (project.tier === "flagship") return "feature";
  if (project.tier === "additional") return "quiet";
  return project.assets?.cover ? "media" : "index";
}

interface WorkProjectProps {
  project: Project;
  /** Position in the sequence, 1-based (decorative). */
  index: number;
  /** The title's heading level: 3 directly under the section, 4 under a group heading. */
  headingLevel?: 3 | 4;
  /** Entrance delay, for a short stagger between cards. */
  delay?: number;
}

/**
 * One project, composed from its data. Every string comes from `Project`;
 * media, links and the case-study entry render only when the data has them.
 * Nothing is invented. Each card has explicit action links; nothing here
 * makes the whole card clickable.
 */
export function WorkProject(props: WorkProjectProps) {
  switch (projectKind(props.project)) {
    case "feature":
      return <Feature {...props} />;
    case "media":
      return <MediaCard {...props} />;
    case "index":
      return <IndexCard {...props} />;
    default:
      return <QuietCard {...props} />;
  }
}

/* -- Shared pieces ------------------------------------------------------- */

const pad = (n: number) => String(n).padStart(2, "0");
const caseHref = (project: Project) => (hasCaseStudy(project) ? routes.project(project.slug) : undefined);
const delayStyle = (ms = 0) => ({ "--d": `${ms}ms` }) as CSSProperties;

function Title({ project, level = 3, className, split = false }: { project: Project; level?: 3 | 4; className?: string; split?: boolean }) {
  const Tag = `h${level}` as const;
  return (
    <Tag id={`${project.slug}-title`} data-split={split ? "" : undefined} className={className}>
      {split ? <SplitText text={project.name} /> : project.name}
    </Tag>
  );
}

/** The project's place in the sequence. Decorative. */
function Ordinal({ index, className }: { index: number; className?: string }) {
  return (
    <span aria-hidden className={cn(styles.number, className)}>
      {pad(index)}
    </span>
  );
}

/** The corner arrow: the card's directional indicator. Decorative. */
function Arrow() {
  return (
    <span aria-hidden className={styles.arrow}>
      <Icon name="arrow-up-right" />
    </span>
  );
}

type Emphasis = "filled" | "outlined" | "text";

/**
 * The project's actions in hierarchy order: case study, live site, source.
 * Labels and destinations are the existing ones; the project name completes
 * each accessible name. Every action leads to a correct, verified destination.
 */
function Links({
  project,
  caseStudy = "outlined",
  live: liveEmphasis = "text",
  className,
}: {
  project: Project;
  caseStudy?: Emphasis;
  live?: Emphasis;
  className?: string;
}) {
  const { live, repository } = project.links;
  const caseUrl = caseHref(project);
  if (!live && !repository && !caseUrl) return null;

  const forProject = <span className="sr-only">: {project.name}</span>;
  return (
    <div className={cn(styles.links, className)}>
      {caseUrl && (
        <BaseLink href={caseUrl} className={styles[caseStudy]}>
          View Case Study{forProject}
          <Icon name="arrow-right" />
        </BaseLink>
      )}
      {live && (
        <BaseLink href={live} newTab className={styles[liveEmphasis]}>
          Live Demo{forProject}
          <Icon name="arrow-up-right" />
        </BaseLink>
      )}
      {repository && (
        <BaseLink href={repository} newTab className={styles.text}>
          Source{forProject}
          <Icon name="arrow-up-right" />
        </BaseLink>
      )}
    </div>
  );
}

/** The technologies as small, evenly sized chips. */
function Chips({ project, className }: { project: Project; className?: string }) {
  if (project.technologies.length === 0) return null;
  return (
    <ul aria-label={`${project.name} technologies`} className={cn(styles.chips, className)}>
      {project.technologies.map((tech) => (
        <li key={tech}>{tech}</li>
      ))}
    </ul>
  );
}

/* -- The feature's landscape ----------------------------------------------
   Drafted ridgelines under the flagship's screens, in the line language of
   the opening and the hero (the same seeded midpoint displacement). Pure
   geometry, computed once, identically on server and client. Decorative. */

const TW = 600;
const TH = 240;

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ridge(seed: number, base: number, peak: number, contours: number) {
  const rand = mulberry32(seed);
  const count = 2 ** 7 + 1;
  const p = new Array<number>(count).fill(0);
  let displacement = 1;
  for (let span = count - 1; span > 1; span /= 2) {
    for (let i = span / 2; i < count - 1; i += span) {
      p[i] = ((p[i - span / 2] ?? 0) + (p[i + span / 2] ?? 0)) / 2 + (rand() - 0.5) * 2 * displacement;
    }
    displacement *= 0.55;
  }
  const lo = Math.min(...p);
  const hi = Math.max(...p);
  const line = (offset: number) =>
    p
      .map((v, i) => {
        const x = (i / (count - 1)) * TW;
        const y = base - ((v - lo) / (hi - lo)) * (base - peak) + offset;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join("");
  const crest = line(0);
  return {
    crest,
    fill: `${crest}L${TW} ${TH}L0 ${TH}Z`,
    contours: Array.from({ length: contours }, (_, k) => line(14 + k * 16)),
  };
}

const TERRAIN = [ridge(0x76657931, 150, 40, 2), ridge(0x76657932, 196, 92, 1), ridge(0x76657933, 236, 168, 0)];

function Terrain() {
  return (
    <svg aria-hidden viewBox={`0 0 ${TW} ${TH}`} preserveAspectRatio="xMidYMax slice" className={styles.terrain} focusable="false">
      {TERRAIN.map((r, depth) => (
        <g key={depth} data-depth={depth}>
          <path d={r.fill} className={styles.land} />
          {r.contours.map((c, k) => (
            <path key={k} d={c} className={styles.contour} />
          ))}
          <path d={r.crest} className={styles.crest} />
        </g>
      ))}
    </svg>
  );
}

/* ==========================================================================
   Feature: the flagship project
   ========================================================================== */

function Feature({ project, index, headingLevel }: WorkProjectProps) {
  const cover = project.assets?.cover;
  // The project's own phone screens, from its case study, shown whole.
  const screens = (project.caseStudy?.gallery ?? []).filter((figure) => figure.image.height > figure.image.width).slice(0, 3);

  return (
    <article aria-labelledby={`${project.slug}-title`} data-reveal className={cn(styles.card, styles.feature)}>
      {/* Light-follow only: no href, so the card itself is never clickable. */}
      <CardEffects className={styles.light} />
      <Ordinal index={index} className={styles.fNumber} />

      <p className={styles.fKicker}>
        <span className={styles.badge}>Featured project</span>
      </p>
      <Title project={project} level={headingLevel} className={styles.fTitle} split />
      <Text size="lead" tone="secondary" className={styles.fSummary}>
        {project.summary}
      </Text>

      {(cover || screens.length > 0) && (
        <div className={styles.fStage}>
          {/* A mouse tilts the scene; its planes sit at different depths, so they part. */}
          <Tilt max={4} glare={false} className={styles.scene}>
            <span aria-hidden className={styles.arc} />
            <span aria-hidden className={styles.horizon} />
            <Terrain />
            {cover && (
              <div className={styles.fCover}>
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  width={cover.width}
                  height={cover.height}
                  sizes="(min-width: 1024px) 28rem, 78vw"
                />
              </div>
            )}
            {screens.length > 0 && (
              <ul className={cn(styles.fPhones, "depth-1")}>
                {screens.map((figure, i) => (
                  <li key={figure.image.src} className={styles.phone} style={{ "--i": i } as CSSProperties}>
                    {/* Decorative here: each screen is described in full on the case-study page. */}
                    <Image
                      src={figure.image.src}
                      alt=""
                      width={figure.image.width}
                      height={figure.image.height}
                      sizes="(min-width: 1024px) 8rem, 22vw"
                    />
                  </li>
                ))}
              </ul>
            )}
          </Tilt>
        </div>
      )}

      <div className={styles.fMeta}>
        <p className={styles.label}>Stack</p>
        <Chips project={project} />
        <Links project={project} caseStudy="filled" live="outlined" className={styles.fLinks} />
      </div>

      <dl className={styles.fCaps}>
        <dt className={styles.label}>Capabilities</dt>
        <dd>{project.capabilities.join(" · ")}</dd>
      </dl>
    </article>
  );
}

/* ==========================================================================
   Media: a cascade of real screenshots
   ========================================================================== */

function MediaCard({ project, index, headingLevel, delay }: WorkProjectProps) {
  const cover = project.assets?.cover;
  if (!cover) return null;
  // Up to two more real screens of the same product, behind the cover.
  const behind = (project.caseStudy?.gallery ?? [])
    .filter((figure) => figure.image.width > figure.image.height && figure.image.src !== cover.src)
    .slice(0, 2);

  return (
    <article aria-labelledby={`${project.slug}-title`} data-reveal className={cn(styles.card, styles.media)} style={delayStyle(delay)}>
      <CardEffects className={styles.light} />
      <Ordinal index={index} />

      <div className={styles.copy}>
        <Title project={project} level={headingLevel} className={styles.title} />
        <Text tone="secondary" className={styles.summary}>
          {project.summary}
        </Text>
      </div>
      <div className={styles.mStage} data-layers={behind.length + 1}>
        {behind
          .slice()
          .reverse()
          .map((figure, i) => (
            <div key={figure.image.src} aria-hidden className={cn(styles.plate, styles[`back${behind.length - i}` as "back1" | "back2"])}>
              <Image
                src={figure.image.src}
                alt=""
                width={figure.image.width}
                height={figure.image.height}
                sizes="(min-width: 1024px) 30rem, 70vw"
              />
            </div>
          ))}
        <div className={cn(styles.plate, styles.front)}>
          <Image src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} sizes="(min-width: 1024px) 32rem, 76vw" />
        </div>
      </div>

      <div className={styles.foot}>
        <Chips project={project} />
        <Links project={project} />
      </div>
      <Arrow />
    </article>
  );
}

/* ==========================================================================
   Index: the capabilities as the visual
   ========================================================================== */

function IndexCard({ project, index, headingLevel, delay }: WorkProjectProps) {
  const labelId = `${project.slug}-capabilities`;

  return (
    <article aria-labelledby={`${project.slug}-title`} data-reveal className={cn(styles.card, styles.index)} style={delayStyle(delay)}>
      <CardEffects className={styles.light} />
      <Ordinal index={index} />

      <div className={styles.copy}>
        <Title project={project} level={headingLevel} className={styles.title} />
        <Text tone="secondary" className={styles.summary}>
          {project.summary}
        </Text>
      </div>

      <div className={styles.iList}>
        <p id={labelId} className={styles.label}>
          Capabilities
        </p>
        <ul aria-labelledby={labelId} className={styles.rows}>
          {project.capabilities.map((capability, i) => (
            <li key={capability} style={{ "--i": i } as CSSProperties}>
              <span aria-hidden className={styles.rowNum}>
                {pad(i + 1)}
              </span>
              <span>{capability}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.foot}>
        <Chips project={project} />
        <Links project={project} />
      </div>
      <Arrow />
    </article>
  );
}

/* ==========================================================================
   Quiet: an additional project, type only
   ========================================================================== */

function QuietCard({ project, index, headingLevel, delay }: WorkProjectProps) {
  return (
    <article aria-labelledby={`${project.slug}-title`} data-reveal className={cn(styles.card, styles.quiet)} style={delayStyle(delay)}>
      <CardEffects className={styles.light} />
      <Ordinal index={index} />
      <div className={styles.copy}>
        <Title project={project} level={headingLevel} className={styles.title} />
        <Text tone="secondary" className={styles.summary}>
          {project.summary}
        </Text>
      </div>
      <div className={styles.foot}>
        <Chips project={project} />
        <Links project={project} />
      </div>
      <Arrow />
    </article>
  );
}
