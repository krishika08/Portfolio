import { HeroDial } from "./HeroDial";
import styles from "./Hero.module.css";

// The view through the hero's arch at dusk: a darkening sky with the
// opening's dial hanging in it, a low sun warming the horizon behind the
// figure, and a drafted mountain range (the landscape the opening flies
// through), three ridgelines from far to near, their crests catching the
// light. Pure geometry from a fixed seed, computed once, identically on
// server and client. Decorative.

const W = 400;
const H = 280;

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A ridgeline by midpoint displacement: real peaks, shoulders and saddles, normalised to 0…1. */
function profile(seed: number, rough: number) {
  const rand = mulberry32(seed);
  const count = 2 ** 7 + 1;
  const p = new Array<number>(count).fill(0);
  let displacement = 1;
  for (let span = count - 1; span > 1; span /= 2) {
    for (let i = span / 2; i < count - 1; i += span) {
      p[i] = ((p[i - span / 2] ?? 0) + (p[i + span / 2] ?? 0)) / 2 + (rand() - 0.5) * 2 * displacement;
    }
    displacement *= rough;
  }
  const lo = Math.min(...p);
  const hi = Math.max(...p);
  return p.map((v) => (v - lo) / (hi - lo));
}

interface Ridge {
  fill: string;
  crest: string;
  contours: string[];
}

/**
 * A ridge between `base` (its lowest) and `peak` (its highest). `centre` lifts
 * (or, negative, lowers) the middle: the near ridges open into a valley where
 * the figure stands, so their peaks rise on either side of her.
 */
function ridge(seed: number, base: number, peak: number, centre: number, contours: number): Ridge {
  const heights = profile(seed, 0.55);
  const n = heights.length - 1;
  const line = (offset: number) =>
    heights
      .map((h, i) => {
        const x = (i / n) * W;
        const lift = Math.exp(-(((x - W / 2) / (W * 0.32)) ** 2)) * centre;
        const y = base - (h * 0.75 + lift) * (base - peak) + offset;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join("");
  const crest = line(0);
  return {
    crest,
    fill: `${crest}L${W} ${H}L0 ${H}Z`,
    contours: Array.from({ length: contours }, (_, k) => line(12 + k * 14)),
  };
}

// Far to near: tall, jagged far peaks; the near ridges open into a valley
// where the figure stands, so their peaks rise on either side of her.
const RIDGES: Ridge[] = [
  ridge(0x61726368, 156, 18, -0.05, 2),
  ridge(0x76696577, 204, 88, -0.45, 1),
  ridge(0x6e656172, 250, 158, -0.6, 0),
];

/** The first stars, high in the sky (the horizon is still light): [x%, y%, radius, opacity]. */
const STARS = (() => {
  const rand = mulberry32(0x73746172);
  return Array.from({ length: 34 }, () => [rand() * 100, rand() * 40, 0.55 + rand() * 0.7, 0.18 + rand() * 0.5]);
})();

export function HeroArch() {
  return (
    <div aria-hidden className={styles.arch}>
      <div className={styles.view}>
        <svg className={styles.stars} viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
          {STARS.map(([x, y, r, o], i) => (
            <ellipse key={i} cx={x} cy={y} rx={(r ?? 1) * 0.16} ry={(r ?? 1) * 0.12} style={{ fill: "var(--ink)" }} opacity={o} />
          ))}
        </svg>
        {/* Clouds catching the last light, the low sun, and its rays: the light the whole stage is lit by. */}
        <div className={styles.clouds} />
        <div className={styles.rays} />
        <div className={styles.sun} />
        {/* The square at the top of the opening: its centre is the centre of the arch's curve. */}
        <div className={styles.halo}>
          {/* The opening's halo flies here and the page opens through it (see components/intro). */}
          <HeroDial className={styles.dial} data-intro-target="" />
        </div>
        <div className={styles.horizon} />
        <svg className={styles.range} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" focusable="false">
          {RIDGES.map((r, depth) => (
            <g key={depth} className={styles.ridge} data-depth={depth}>
              <path d={r.fill} className={styles.land} />
              {r.contours.map((c, k) => (
                <path key={k} d={c} className={styles.contour} />
              ))}
              <path d={r.crest} className={styles.crest} />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
