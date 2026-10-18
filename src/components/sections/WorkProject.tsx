import type { CSSProperties, SVGProps } from "react";
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
 *   feature → the flagship: copy, its own screens on a lit terrain, and its
 *             verified highlights, side by side
 *   device  → a supporting project with screenshots: its landing page on a
 *             drawn laptop, a second real screen floating over it
 *   index   → a supporting project without screenshots: a typographic plate
 *             of its verified topics (never a made-up interface)
 */
export type ProjectKind = "feature" | "device" | "index";

export function projectKind(project: Project): ProjectKind {
  if (project.tier === "flagship") return "feature";
  return project.assets?.cover ? "device" : "index";
}

interface WorkProjectProps {
  project: Project;
  /** Position in the sequence, 1-based (decorative). */
  index: number;
  /** The title's heading level. */
  headingLevel?: 3 | 4;
  /** Entrance delay, for a short stagger between cards. */
  delay?: number;
}

/**
 * One project, composed from its data. Every string comes from `Project`;
 * media and actions render only when the data has them, and nothing is
 * invented. Cards hold several actions, so the card itself is never one big
 * link: the actions are the way in, by pointer, touch or keyboard.
 */
export function WorkProject(props: WorkProjectProps) {
  switch (projectKind(props.project)) {
    case "feature":
      return <Feature {...props} />;
    case "device":
      return <DeviceCard {...props} />;
    default:
      return <IndexCard {...props} />;
  }
}

/* -- Shared pieces ------------------------------------------------------- */

const pad = (n: number) => String(n).padStart(2, "0");
const caseHref = (project: Project) => (hasCaseStudy(project) ? routes.project(project.slug) : undefined);
const delayStyle = (ms = 0) => ({ "--d": `${ms}ms` }) as CSSProperties;

function Title({
  project,
  level = 3,
  className,
  split = false,
}: {
  project: Project;
  level?: 3 | 4;
  className?: string;
  split?: boolean;
}) {
  const Tag = `h${level}` as const;
  return (
    <Tag id={`${project.slug}-title`} data-split={split ? "" : undefined} className={className}>
      {split ? <SplitText text={project.name} /> : project.name}
    </Tag>
  );
}

/** The platforms the project runs on (verified data), set under the title. */
function Platforms({ project }: { project: Project }) {
  if (!project.platforms?.length) return null;
  return <p className={styles.platforms}>{project.platforms.join(" · ")}</p>;
}

/** The project's place in the sequence, in a small square. Decorative. */
function Ordinal({ index }: { index: number }) {
  return (
    <span aria-hidden className={styles.ordinal}>
      {pad(index)}
    </span>
  );
}

type Emphasis = "filled" | "outlined" | "text";

/**
 * The project's actions in hierarchy order: case study, live demo, source.
 * Each renders only when its destination exists; the project name completes
 * each accessible name.
 */
function Links({ project, className }: { project: Project; className?: string }) {
  const { live, repository } = project.links;
  const caseUrl = caseHref(project);
  if (!live && !repository && !caseUrl) return null;

  const forProject = <span className="sr-only">: {project.name}</span>;
  const second: Emphasis = "outlined";
  return (
    <div className={cn(styles.links, className)}>
      {caseUrl && (
        <BaseLink href={caseUrl} className={styles.filled}>
          View Case Study{forProject}
          <Icon name="arrow-right" />
        </BaseLink>
      )}
      {live && (
        <BaseLink href={live} newTab className={styles[second]}>
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

/* -- Drafted terrain ---------------------------------------------------------
   Ridgelines in the line language of the opening and the hero (the same
   seeded midpoint displacement), lit by a low sun. Pure geometry, computed
   once, identically on server and client. Decorative. */

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

const TERRAIN = [ridge(0x76657931, 150, 30, 2), ridge(0x76657932, 196, 92, 1), ridge(0x76657933, 236, 168, 0)];

/**
 * Three ridgelines, far to near. Decorative. Position props (x, y, width,
 * height) place it inside another drawing.
 */
export function Terrain({ className, ...place }: { className?: string } & Pick<SVGProps<SVGSVGElement>, "x" | "y" | "width" | "height">) {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${TW} ${TH}`}
      preserveAspectRatio="xMidYMax slice"
      className={cn(styles.terrain, className)}
      focusable="false"
      {...place}
    >
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
  const highlights = project.caseStudy?.highlights ?? [];

  return (
    <article aria-labelledby={`${project.slug}-title`} data-reveal className={cn(styles.card, styles.feature)}>
      {/* A light that follows the pointer; no href, so the card is not a link. */}
      <CardEffects className={styles.light} />

      <div className={styles.fCopy}>
        <p className={styles.fKicker}>
          <span className={styles.badge}>Featured project</span>
          <span aria-hidden className={styles.kickerNumber}>
            {pad(index)}
          </span>
        </p>
        <Title project={project} level={headingLevel} className={styles.fTitle} split />
        <Platforms project={project} />
        <Text tone="secondary" className={styles.fSummary}>
          {project.summary}
        </Text>
        <Chips project={project} className={styles.fChips} />
        <Links project={project} className={styles.fLinks} />
      </div>

      {(cover || screens.length > 0) && (
        <div className={styles.fStage}>
          {/* A mouse tilts the scene; its planes sit at different depths, so they part. */}
          <Tilt max={4} glare={false} className={styles.scene}>
            <span aria-hidden className={styles.sceneSun} />
            <Terrain />
            {cover && (
              <div className={styles.fCover}>
                <Image src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} sizes="(min-width: 1024px) 26rem, 78vw" />
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
                      sizes="(min-width: 1024px) 7.5rem, 22vw"
                    />
                  </li>
                ))}
              </ul>
            )}
          </Tilt>
        </div>
      )}

      {highlights.length > 0 && (
        <dl className={styles.fHighlights}>
          {highlights.map((group, i) => (
            <div key={group.title} className={styles.highlight}>
              <dt>
                <span aria-hidden className={styles.highlightMark}>
                  {pad(i + 1)}
                </span>
                {group.title}
              </dt>
              <dd>{group.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}

/* ==========================================================================
   Device: the landing page on a laptop, a second real screen floating over it
   ========================================================================== */

function DeviceCard({ project, index, headingLevel, delay }: WorkProjectProps) {
  const cover = project.assets?.cover;
  if (!cover) return null;
  // One more real screen of the same product: the tallest one, as a floating window.
  const floating = (project.caseStudy?.gallery ?? [])
    .filter((figure) => figure.image.src !== cover.src)
    .sort((a, b) => b.image.height / b.image.width - a.image.height / a.image.width)[0];

  return (
    <article aria-labelledby={`${project.slug}-title`} data-reveal className={cn(styles.card, styles.support, styles.device)} style={delayStyle(delay)}>
      <CardEffects className={styles.light} />
      <div className={styles.sCopy}>
        <Ordinal index={index} />
        <Title project={project} level={headingLevel} className={styles.title} />
        <Platforms project={project} />
        <Text tone="secondary" className={styles.summary}>
          {project.summary}
        </Text>
      </div>

      <div className={styles.sVisual}>
        <div className={styles.laptop}>
          <div className={styles.lid}>
            <div className={styles.screen} style={{ aspectRatio: `${cover.width} / ${cover.height}` }}>
              <Image src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} sizes="(min-width: 1024px) 20rem, 70vw" />
            </div>
          </div>
          <div aria-hidden className={styles.base} />
        </div>
        {floating && (
          <div aria-hidden className={styles.window}>
            <Image
              src={floating.image.src}
              alt=""
              width={floating.image.width}
              height={floating.image.height}
              sizes="(min-width: 1024px) 8rem, 30vw"
            />
          </div>
        )}
      </div>

      <div className={styles.sFoot}>
        <Chips project={project} />
        <Links project={project} className={styles.sLinks} />
      </div>
    </article>
  );
}

/* ==========================================================================
   Index: a typographic plate of the project's verified topics
   ========================================================================== */

function IndexCard({ project, index, headingLevel, delay }: WorkProjectProps) {
  const [primary, ...more] = project.caseStudy?.highlights ?? [];
  const entries = primary?.items ?? project.capabilities;
  const plateTitle = primary?.title ?? "Capabilities";
  const plateId = `${project.slug}-plate`;
  const tags = more.flatMap((group) => group.items);

  return (
    <article aria-labelledby={`${project.slug}-title`} data-reveal className={cn(styles.card, styles.support, styles.index)} style={delayStyle(delay)}>
      <CardEffects className={styles.light} />
      <div className={styles.sCopy}>
        <Ordinal index={index} />
        <Title project={project} level={headingLevel} className={styles.title} />
        <Platforms project={project} />
        <Text tone="secondary" className={styles.summary}>
          {project.summary}
        </Text>
      </div>

      {/* Typography, not a screenshot: the publication's verified subjects as a contents page. */}
      <div className={styles.sVisual}>
        <div className={styles.plate}>
          <p id={plateId} className={styles.plateLabel}>
            {plateTitle}
          </p>
          <ol aria-labelledby={plateId} className={styles.plateList}>
            {entries.map((entry, i) => (
              <li key={entry} style={{ "--i": i } as CSSProperties}>
                <span aria-hidden className={styles.plateNum}>
                  {pad(i + 1)}
                </span>
                <span className={styles.plateEntry}>{entry}</span>
              </li>
            ))}
          </ol>
          {tags.length > 0 && <p className={styles.plateTags}>{tags.join(" · ")}</p>}
        </div>
      </div>

      <div className={styles.sFoot}>
        <Chips project={project} />
        <Links project={project} className={styles.sLinks} />
      </div>
    </article>
  );
}
