/**
 * Geometry for the experience journey: a drafted landscape (four ridgelines,
 * far to near, generated from a fixed seed so server and client always agree)
 * and a trail that climbs it, with one stop per role. Pure functions in a
 * 1200 × 340 drawing; the figure scales as a whole.
 */

export const VIEW = { width: 1200, height: 340 } as const;

const X0 = -80;
const X1 = VIEW.width + 80;

export interface Point {
  x: number;
  y: number;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Layer {
  /** Mean ridge height at the left and right edges (y, so smaller is higher). */
  from: number;
  to: number;
  /** Relief, in drawing units. */
  amp: number;
  /** How rough the crest is: the share of displacement each finer level keeps. */
  rough: number;
  seed: number;
}

// Far to near. The land climbs toward the right: that is the direction of travel.
const LAYERS: Layer[] = [
  { from: 138, to: 70, amp: 150, rough: 0.56, seed: 11 },
  { from: 206, to: 118, amp: 148, rough: 0.56, seed: 23 },
  { from: 270, to: 184, amp: 124, rough: 0.54, seed: 37 },
  { from: 334, to: 306, amp: 44, rough: 0.5, seed: 41 },
];

const LEVELS = 8;

/**
 * A mountain silhouette by midpoint displacement: the ends are fixed, each
 * pass splits every span and nudges its midpoint by a shrinking random
 * amount, which gives real peaks, shoulders and saddles. Normalised to 0…1
 * (0 the lowest valley, 1 the highest peak), then laid on a rising baseline.
 */
function ridgeFn(layer: Layer) {
  const rand = mulberry32(layer.seed);
  const count = 2 ** LEVELS + 1;
  const profile = new Float64Array(count);
  let displacement = 1;
  for (let span = count - 1; span > 1; span /= 2) {
    for (let i = span / 2; i < count - 1; i += span) {
      profile[i] = ((profile[i - span / 2] ?? 0) + (profile[i + span / 2] ?? 0)) / 2 + (rand() - 0.5) * 2 * displacement;
    }
    displacement *= layer.rough;
  }
  const lo = Math.min(...profile);
  const hi = Math.max(...profile);
  const height = (u: number) => {
    const position = clamp(u, 0, 1) * (count - 1);
    const i = Math.min(Math.floor(position), count - 2);
    const f = position - i;
    return ((((profile[i] ?? 0) * (1 - f) + (profile[i + 1] ?? 0) * f) - lo) / (hi - lo)) ** 1.15;
  };
  return (x: number) => {
    const base = layer.from + (layer.to - layer.from) * (x / VIEW.width);
    return base - height((x - X0) / (X1 - X0)) * layer.amp + layer.amp * 0.4;
  };
}

const ridgeFns = LAYERS.map(ridgeFn);

const round = (v: number) => Math.round(v * 10) / 10;
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

export interface Ridge {
  /** Closed shape under the ridge (the land). */
  fill: string;
  /** Just the crest, for the hairline. */
  crest: string;
  /** Contour lines below the crest, as on a survey map. */
  contours: string[];
}

/** The four ridgelines, far to near. */
export const ridges: Ridge[] = ridgeFns.map((fn, layer) => {
  const step = 8;
  const line = (offset: number) => {
    const points: string[] = [];
    for (let x = X0; x <= X1; x += step) points.push(`${round(x)} ${round(fn(x) + offset)}`);
    return `M${points.join("L")}`;
  };
  const crest = line(0);
  // Survey contours under the three farther ridges; the front one stays clean.
  const contours = layer < 3 ? [line(15), line(33)] : [];
  return { crest, contours, fill: `${crest}L${X1} ${VIEW.height + 20}L${X0} ${VIEW.height + 20}Z` };
});

/** Height of a ridge (0 far … 3 near) at x, for placing things on the land. */
export const ridgeAt = (layer: number, x: number) => ridgeFns[layer]?.(x) ?? VIEW.height;

export interface Trail {
  /** Path data for the whole trail. */
  d: string;
  origin: Point;
  /** One point per stop, in order. */
  stops: Point[];
  beacon: Point;
  /** How far along the trail (0…1) each stop is. */
  fractions: number[];
}

/**
 * Where the trail runs at x: along the foothills at the left, up onto the
 * second ridge, then toward the high ground at the right, just under the
 * crest each time. Averaged over a short span so it winds rather than jags.
 */
function trailY(x: number) {
  const at = (px: number) => {
    const foothill = ridgeAt(3, px) - 8;
    const middle = ridgeAt(2, px) + 4;
    const high = ridgeAt(1, px) + 12;
    const toMiddle = smooth(30, 400, px);
    const toHigh = smooth(VIEW.width * 0.48, VIEW.width * 0.97, px);
    const low = foothill + (middle - foothill) * toMiddle;
    // A slow sway on top, so it reads as a path that winds, not a profile.
    return low + (high - low) * toHigh + Math.sin(px * 0.024) * 7;
  };
  let sum = 0;
  for (let k = -3; k <= 3; k++) sum += at(x + k * 8);
  return clamp(sum / 7, 24, VIEW.height - 18);
}

/**
 * A trail from a foothill origin, through one stop per role, to a beacon on
 * the high ground. Stops are spread evenly across the width.
 */
export function buildTrail(stopCount: number): Trail {
  const count = Math.max(1, stopCount);
  const originX = 36;
  const beaconX = VIEW.width - 40;
  const stopXs = Array.from({ length: count }, (_, i) => round((VIEW.width * (i + 0.5)) / count));

  // Samples along the way, with the stops among them.
  const xs = new Set<number>([originX, beaconX, ...stopXs]);
  for (let x = originX + 24; x < beaconX - 12; x += 24) xs.add(round(x));
  const samples: Point[] = [...xs].sort((a, b) => a - b).map((x) => ({ x, y: round(trailY(x)) }));

  // Catmull-Rom → cubic Béziers, measured as we go.
  const lengths: number[] = [0];
  let d = `M${samples[0]!.x} ${samples[0]!.y}`;
  for (let i = 0; i < samples.length - 1; i++) {
    const p0 = samples[i - 1] ?? samples[i]!;
    const p1 = samples[i]!;
    const p2 = samples[i + 1]!;
    const p3 = samples[i + 2] ?? p2;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += `C${round(c1.x)} ${round(c1.y)} ${round(c2.x)} ${round(c2.y)} ${p2.x} ${p2.y}`;
    lengths.push((lengths[i] ?? 0) + Math.hypot(p2.x - p1.x, p2.y - p1.y));
  }
  const total = lengths[lengths.length - 1] || 1;
  const indexOf = (x: number) => samples.findIndex((sample) => sample.x === x);
  const stopAt = (x: number) => samples[indexOf(x)] ?? samples[0]!;

  return {
    d,
    origin: samples[0]!,
    stops: stopXs.map(stopAt),
    beacon: samples[samples.length - 1]!,
    fractions: stopXs.map((x) => round(((lengths[indexOf(x)] ?? 0) / total) * 1000) / 1000),
  };
}
