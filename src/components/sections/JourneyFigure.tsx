import type { CSSProperties } from "react";
import { education } from "@/content/education";
import type { Experience } from "@/types/content";
import { VIEW, ridges, type Point, type Trail } from "./journey";
import styles from "./Journey.module.css";

interface JourneyFigureProps {
  /** The roles, earliest first: one stop on the trail each. */
  roles: Experience[];
  trail: Trail;
}

const at = (point: Point) =>
  ({
    left: `${((point.x / VIEW.width) * 100).toFixed(2)}%`,
    top: `${((point.y / VIEW.height) * 100).toFixed(2)}%`,
  }) as CSSProperties;

/**
 * The journey, drawn: a drafted landscape of four ridgelines and a trail that
 * climbs it, one stop per role, in the order they happened. The trail draws
 * itself as the section scrolls into view (--draw, from MotionLayer's
 * --progress) and each stop lights as the trail reaches it; without scripts
 * or under reduced motion the whole trail is simply drawn. Purely
 * decorative: the years are the dates already written in each role, and the
 * roles themselves are the cards below. Hidden from assistive technology.
 */
export function JourneyFigure({ roles, trail }: JourneyFigureProps) {
  // The year the degree began: where the trail starts.
  const startYear = education[0]?.dates.start;

  return (
    <div aria-hidden className={styles.figure}>
      <svg viewBox={`0 0 ${VIEW.width} ${VIEW.height}`} className={styles.terrain} focusable="false">
        <defs>
          <radialGradient id="journey-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: "var(--accent)" }} stopOpacity="0.3" />
            <stop offset="100%" style={{ stopColor: "var(--accent)" }} stopOpacity="0" />
          </radialGradient>
          {/* A faint sheen from each crest down: the far land is the palest. */}
          {ridges.map((_, i) => (
            <linearGradient key={i} id={`journey-land-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" style={{ stopColor: "var(--ink)" }} stopOpacity={0.11 - i * 0.022} />
              <stop offset="70%" style={{ stopColor: "var(--ink)" }} stopOpacity="0.012" />
            </linearGradient>
          ))}
        </defs>

        <circle cx={trail.beacon.x} cy={trail.beacon.y} r="170" fill="url(#journey-halo)" />

        {ridges.map((ridge, i) => (
          <g key={i} className={styles.ridge} style={{ "--depth": i } as CSSProperties}>
            <path d={ridge.fill} className={styles.base} />
            <path d={ridge.fill} fill={`url(#journey-land-${i})`} />
            {ridge.contours.map((contour, c) => (
              <path key={c} d={contour} className={styles.contour} style={{ "--c": c } as CSSProperties} />
            ))}
            <path d={ridge.crest} className={styles.crest} />
          </g>
        ))}

        {/* From each stop straight down to the cards. */}
        {trail.stops.map((stop, i) => (
          <line key={i} x1={stop.x} y1={stop.y} x2={stop.x} y2={VIEW.height} className={styles.leader} />
        ))}

        <path d={trail.d} className={styles.way} />
        <path d={trail.d} pathLength="1" className={styles.lit} />
        <path d={trail.d} pathLength="1" className={styles.head} />
      </svg>

      <span className={styles.origin} style={at(trail.origin)}>
        {startYear && <span className={styles.year}>{startYear}</span>}
      </span>

      {trail.stops.map((stop, i) => (
        <span
          key={roles[i]?.id ?? i}
          className={styles.node}
          style={{ ...at(stop), "--at": trail.fractions[i] ?? 0 } as CSSProperties}
        >
          <span className={styles.year}>{roles[i]?.dates.start.slice(0, 4)}</span>
        </span>
      ))}

      <span className={styles.beacon} style={at(trail.beacon)} />
    </div>
  );
}
