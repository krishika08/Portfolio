/**
 * The opening's timeline, in milliseconds. One source of truth: the server
 * injects these as CSS custom properties (so the sequence is CSS-timed and
 * never depends on scripts), the canvas reads the same clock, and the gate
 * script derives its failsafe from them. The eight states of the storyboard:
 *
 *   1  0–300      a hairline cross and a point of light; the labels type
 *   2  300–800    the grid and a wireframe landscape draw themselves
 *   3  800–1500   particles in depth, the halo; the camera drifts in
 *   4  1500–2300  the particles converge into the name behind a mint sweep
 *   5  2300–2800  the name becomes solid type
 *   6  2800–3200  the role, then the tagline
 *   7  3200–3600  the camera moves forward; the halo flies to the hero's dial
 *   8  3600–4050  the page opens through it, then fully
 */
export const INTRO = {
  /** The overlay's lifetime: the page is fully revealed here. */
  total: 4050,
  /** State 7: the camera moves forward and the page is handed over (pointer, keyboard, focus). */
  exit: 3200,
  /** State 1: the first label starts typing, the gap between lines, and when they fade. */
  labels: 60,
  labelStep: 190,
  labelsOut: 1150,
  /** State 2: the grid and the wireframe start drawing; right-side keywords appear. */
  lines: 300,
  keywords: 360,
  keywordStep: 85,
  keywordsOut: 1200,
  /** State 3: particles and the halo. */
  depth: 800,
  /** State 4: the particles start converging into the name. */
  converge: 1500,
  /** State 5: the name becomes solid. */
  solid: 2300,
  /** State 6: the role, then the tagline. */
  role: 2550,
  tagline: 2850,
  /** States 7–8: the halo has landed on the hero's dial and the page lights up inside it… */
  portal: 3520,
  /** …then the opening widens to the whole page. */
  reveal: 3700,
  /**
   * The clock starts when the page's JavaScript runs (Intro.tsx). If that has
   * not happened by `wait` after first paint, the gate script gives up and
   * shows the page (on localhost it waits `failsafe` × 3, for slow dev builds).
   */
  wait: 3000,
  failsafe: 5000,
} as const;

/**
 * Reduced motion: a still title card (no particles, no camera) that fades in
 * and out. The page is usable underneath the whole time.
 */
export const STILL = {
  /** The card starts fading out… */
  out: 1250,
  /** …and is gone. */
  total: 1750,
  failsafe: 2400,
} as const;

/** The composition's centre: the cross, the halo and the name, as a share of the viewport's height. */
export const INTRO_LAYOUT = { cy: 0.42 } as const;

/** Session flag: the opening plays once per browser session. */
export const INTRO_SESSION_KEY = "portfolio:intro";
