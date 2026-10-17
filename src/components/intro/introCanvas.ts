import { INTRO, INTRO_LAYOUT } from "./introTimeline";

/**
 * The opening's renderer: one 2D canvas, no library. Every frame is a pure
 * function of one number, the time on the CSS master clock (plus the pointer,
 * eased), so the canvas is always in step with the CSS beats, a dropped frame
 * costs nothing, and there is no state to drift. Back to front:
 *
 *   background, the page's own graph-paper grid (revealed from the cross),
 *   coordinate marks, the cross, the halo (the hero's dial, drawn the same
 *   way), a wireframe landscape in perspective (hidden-line: each band of it
 *   is filled before its lines, far to near, so nearer ridges hide what is
 *   behind them, particles included), particles in depth, the mint sweep and
 *   the particles of the name, the point of light; then the opening onto
 *   the page (an iris cut out of everything), and the halo on top of it.
 *
 * The name is sampled from the glyphs the page renders, so the particles land
 * exactly where the solid letters then appear. While the camera moves forward
 * the halo flies to the hero's dial (measured live) and the page opens inside
 * it: the visitor arrives through the dial, onto the real portrait.
 *
 * Decorative: if this never runs, the CSS composition stands alone.
 */

export interface IntroCanvasOptions {
  /** Milliseconds on the opening's master clock. */
  now: () => number;
  /** Holds one [data-ch] element per letter of the name, as rendered. */
  name: HTMLElement;
  /** The hero's dial: where the halo lands and the page opens. */
  target: () => Element | null;
  /** Phones and low-power devices: a lighter budget, lower resolution, no streaks, no pointer. */
  lite: boolean;
  /** The first frame is on screen: from here the canvas paints the background. */
  onReady?: () => void;
  /** The name's particles are ready in time: they, not the CSS fade, form the name. */
  onName?: () => void;
}

const INK = "245, 243, 250";
const ACCENT = "110, 231, 183";

/** World depth of the landscape's nearest and farthest rows, and the camera's near clip. */
const Z_NEAR = 1;
const Z_FAR = 17.5;
const Z_CLIP = 0.22;
/** The world depth that projects to the bottom edge (ground level, camera at rest). */
const NEAR_ROW = 1.2;
/** How long one wireframe segment takes to draw. */
const SEGMENT_MS = 230;
/** If the name's font is not ready by then, the CSS letters form the name instead. */
const NAME_DEADLINE = 1460;
/** The page's graph paper (globals.css): a rule every 24px, a major one every 120px. */
const GRID = 24;
const GRID_MAJOR = 120;

interface Budget {
  /** Wireframe cell size and half-width, in world units. */
  step: number;
  xMax: number;
  /** Free particles. */
  ambient: number;
  /** Name sampling: one particle per font-size / glyphStep pixels. */
  glyphStep: number;
  /** Device-pixel-ratio ceiling, and a ceiling on the canvas's backing pixels (never below 1x). */
  dpr: number;
  pixels: number;
}

// The cost grows with the canvas's backing pixels, so a large, dense screen
// draws at a lower ratio (the type is HTML and stays sharp). Measured on an
// integrated GPU: about 60 fps up to roughly 3 million pixels.
const FULL: Budget = { step: 0.4, xMax: 17, ambient: 950, glyphStep: 26, dpr: 2, pixels: 3e6 };
const LITE: Budget = { step: 0.5, xMax: 15, ambient: 380, glyphStep: 18, dpr: 2, pixels: 1.4e6 };

/** The largest of a few ratios (fractional ones rasterise more slowly) that fits the budget. */
function backingRatio(budget: Budget, w: number, h: number) {
  const device = Math.min(window.devicePixelRatio || 1, budget.dpr);
  for (const ratio of [2, 1.5, 1.25]) {
    if (ratio <= device + 0.01 && w * h * ratio * ratio <= budget.pixels) return ratio;
  }
  return 1;
}

// -- Helpers ------------------------------------------------------------------

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ramp = (a: number, b: number, v: number) => clamp01((v - a) / (b - a));
const smooth = (a: number, b: number, v: number) => {
  const t = ramp(a, b, v);
  return t * t * (3 - 2 * t);
};
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (v: number) => 1 - (1 - v) ** 3;
const easeIn = (v: number) => v ** 3;
const easeInOut = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - (-2 * v + 2) ** 3 / 2);

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Seeded 2D value noise in 0…1. */
function noise2(seed: number) {
  const rand = mulberry32(seed);
  const table = new Float32Array(64 * 64).map(() => rand());
  const at = (i: number, j: number) => table[(j & 63) * 64 + (i & 63)] ?? 0;
  return (x: number, y: number) => {
    const i = Math.floor(x);
    const j = Math.floor(y);
    const fx = x - i;
    const fy = y - j;
    const sx = fx * fx * (3 - 2 * fx);
    const sy = fy * fy * (3 - 2 * fy);
    return mix(mix(at(i, j), at(i + 1, j), sx), mix(at(i, j + 1), at(i + 1, j + 1), sx), sy);
  };
}

/**
 * The landscape's height at (x, z), in units of the camera's height: a central
 * massif with two shoulders, ranges on either side toward the horizon, and
 * ridged noise for the rock. Flat near the camera.
 */
function makeHeight() {
  const n = noise2(0x51ab);
  const ridged = (x: number, z: number) => {
    let sum = 0;
    let amp = 0.55;
    let freq = 0.42;
    for (let octave = 0; octave < 3; octave++) {
      sum += (1 - Math.abs(2 * n(x * freq + octave * 17, z * freq + octave * 31) - 1)) * amp;
      amp *= 0.5;
      freq *= 2.1;
    }
    return sum;
  };
  const bump = (x: number, z: number, x0: number, z0: number, sx: number, sz: number, a: number) =>
    a * Math.exp(-((x - x0) ** 2 / (2 * sx * sx) + (z - z0) ** 2 / (2 * sz * sz)));
  return (x: number, z: number) => {
    const peaks =
      bump(x, z, 0, 7.6, 1.5, 1.6, 1.6) +
      bump(x, z, -2.7, 9.4, 1.3, 1.5, 1) +
      bump(x, z, 3, 9, 1.2, 1.4, 1.1) +
      bump(x, z, -6.5, 11.5, 2.2, 2.1, 1.15) +
      bump(x, z, 7, 12.2, 2.4, 2.2, 1.2) +
      bump(x, z, -11.5, 13.5, 2.6, 2.4, 1.05) +
      bump(x, z, 12, 13, 2.6, 2.4, 0.95);
    const rock = ridged(x, z);
    const height = peaks * (0.72 + 0.5 * rock) + rock * 0.42 * smooth(2.5, 7.5, z);
    return height * smooth(1.4, 4.2, z) + 0.05 * rock;
  };
}

type Height = ReturnType<typeof makeHeight>;

// -- View and camera ------------------------------------------------------------

interface View {
  w: number;
  h: number;
  cx: number;
  cy: number;
  /** Screen y of the vanishing point. */
  horizon: number;
  /** Focal length (horizontal scale). */
  f: number;
  /** Vertical scale: ground level at NEAR_ROW projects to the bottom edge. */
  d: number;
}

function makeView(w: number, h: number): View {
  const horizon = h * (w < h ? 0.6 : 0.56);
  return { w, h, cx: w / 2, cy: h * INTRO_LAYOUT.cy, horizon, f: Math.min(0.62 * w, 0.8 * h), d: (h - horizon) * NEAR_ROW };
}

interface Camera {
  x: number;
  /** Height, in its own units (1 at rest). */
  y: number;
  z: number;
}

/** The camera at time t: a slow drift in through states 3–6, then the move forward. */
function cameraAt(t: number, camera: Camera, pointerX: number) {
  camera.z = 1.1 * easeOut(ramp(INTRO.depth, INTRO.exit, t)) + 4.2 * easeIn(ramp(INTRO.exit, INTRO.exit + 600, t));
  camera.y = 1 - 0.12 * smooth(INTRO.exit, INTRO.exit + 600, t);
  camera.x = pointerX;
}

// -- The landscape ----------------------------------------------------------------

interface Mesh {
  cols: number;
  rows: number;
  xs: Float32Array;
  zs: Float32Array;
  /** Height per vertex (row * cols + col). */
  y: Float32Array;
  /** Screen position per vertex, rewritten every frame. */
  sx: Float32Array;
  sy: Float32Array;
  /** When each segment starts drawing: along rows, then along columns. */
  rowStart: Float32Array;
  colStart: Float32Array;
  /** When each band's fill (its occlusion) comes in. */
  bandStart: Float32Array;
  /** Vertices that glint, per row: [column, mint, phase] triples. */
  glints: number[][];
}

function buildMesh(view: View, budget: Budget, height: Height, rand: () => number): Mesh {
  const cols = Math.floor((budget.xMax * 2) / budget.step) + 1;
  const rows = Math.floor((Z_FAR - Z_NEAR) / budget.step) + 1;
  const xs = Float32Array.from({ length: cols }, (_, c) => -budget.xMax + c * budget.step);
  const zs = Float32Array.from({ length: rows }, (_, r) => Z_NEAR + r * budget.step);
  const y = new Float32Array(rows * cols);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) y[r * cols + c] = height(xs[c] ?? 0, zs[r] ?? 0);
  }

  // The landscape draws outward from the centre line, and from the horizon toward the viewer.
  const half = (z: number) => (view.w / 2 / view.f) * z;
  const nearness = (z: number) => 1 - (z - Z_NEAR) / (Z_FAR - Z_NEAR);
  const reveal = (x: number, z: number) =>
    INTRO.lines + 300 * Math.min(Math.abs(x) / half(z), 1.3) ** 0.9 + 230 * nearness(z) + rand() * 60;

  const rowStart = new Float32Array(rows * (cols - 1));
  const colStart = new Float32Array((rows - 1) * cols);
  const bandStart = new Float32Array(rows - 1);
  const glints: number[][] = [];
  for (let r = 0; r < rows; r++) {
    const z = zs[r] ?? 0;
    for (let c = 0; c < cols - 1; c++) rowStart[r * (cols - 1) + c] = reveal(((xs[c] ?? 0) + (xs[c + 1] ?? 0)) / 2, z);
    if (r < rows - 1) {
      const zm = (z + (zs[r + 1] ?? z)) / 2;
      for (let c = 0; c < cols; c++) colStart[r * cols + c] = reveal(xs[c] ?? 0, zm);
      bandStart[r] = INTRO.lines + 230 * nearness(z);
    }
    const row: number[] = [];
    for (let c = 0; c < cols; c++) {
      // Glints sit on the high ground.
      if (rand() < 0.035 + 0.08 * clamp01((y[r * cols + c] ?? 0) - 0.4)) row.push(c, rand() < 0.35 ? 1 : 0, rand() * 6.28);
    }
    glints.push(row);
  }

  return {
    cols,
    rows,
    xs,
    zs,
    y,
    sx: new Float32Array(rows * cols),
    sy: new Float32Array(rows * cols),
    rowStart,
    colStart,
    bandStart,
    glints,
  };
}

// -- Particles ---------------------------------------------------------------------

interface Cloud {
  n: number;
  x: Float32Array;
  y: Float32Array;
  z: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  size: Float32Array;
  alpha: Float32Array;
  delay: Float32Array;
  phase: Float32Array;
  accent: Uint8Array;
  /** Indices sorted by band, and where each band's run starts (bands + 1 entries). */
  order: Uint32Array;
  bandRun: Int32Array;
}

/** Particles in the open air above the landscape, from the near hills to the far ranges. */
function makeCloud(n: number, view: View, mesh: Mesh, height: Height, rand: () => number, central: boolean): Cloud {
  const cloud: Cloud = {
    n,
    x: new Float32Array(n),
    y: new Float32Array(n),
    z: new Float32Array(n),
    vx: new Float32Array(n),
    vy: new Float32Array(n),
    size: new Float32Array(n),
    alpha: new Float32Array(n),
    delay: new Float32Array(n),
    phase: new Float32Array(n),
    accent: new Uint8Array(n),
    order: new Uint32Array(n),
    bandRun: new Int32Array(mesh.rows),
  };
  const half = (z: number) => (view.w / 2 / view.f) * z;
  // The height (in camera units) that projects to the top of the screen at depth z.
  const ceiling = (z: number) => 1 + (view.horizon * z) / view.d;
  const bands = mesh.rows - 1;
  const band = new Int32Array(n);

  for (let i = 0; i < n; i++) {
    let x = 0;
    let y = 0;
    let z = 0;
    for (let attempt = 0; attempt < 10; attempt++) {
      z = Z_NEAR + 1.4 + (Z_FAR - 5.5) * rand() ** 0.8;
      x = (rand() * 2 - 1) * half(z) * 1.05 * (central ? 0.3 + 0.7 * rand() : 1);
      const ground = height(x, z) + 0.12;
      const top = ceiling(z);
      if (top <= ground) continue;
      y = ground + (top - ground) * rand() ** 1.5;
      break;
    }
    cloud.x[i] = x;
    cloud.y[i] = y;
    cloud.z[i] = z;
    cloud.vx[i] = (rand() - 0.5) * 0.08;
    cloud.vy[i] = 0.02 + rand() * 0.06;
    cloud.size[i] = 0.75 + rand() * 0.6;
    cloud.alpha[i] = 0.35 + rand() * 0.55;
    cloud.delay[i] = INTRO.depth + rand() * 650;
    cloud.phase[i] = rand() * Math.PI * 2;
    cloud.accent[i] = rand() < 0.28 ? 1 : 0;
    band[i] = Math.min(bands - 1, Math.max(0, Math.floor((z - Z_NEAR) / ((Z_FAR - Z_NEAR) / bands))));
  }

  // Counting sort by band: bandRun[b] is where band b's particles start in `order`.
  const runs = new Array<number>(bands + 1).fill(0);
  for (let i = 0; i < n; i++) {
    const b = (band[i] ?? 0) + 1;
    runs[b] = (runs[b] ?? 0) + 1;
  }
  for (let b = 1; b <= bands; b++) runs[b] = (runs[b] ?? 0) + (runs[b - 1] ?? 0);
  cloud.bandRun = Int32Array.from(runs);
  const cursor = [...runs];
  for (let i = 0; i < n; i++) {
    const b = band[i] ?? 0;
    const at = cursor[b] ?? 0;
    cloud.order[at] = i;
    cursor[b] = at + 1;
  }
  return cloud;
}

interface NameSample {
  points: Array<[number, number]>;
  left: number;
  width: number;
  top: number;
  height: number;
}

/**
 * The name as points. Each letter is drawn, in the page's own font, at the
 * exact spot its element occupies, then read back and sampled on a grid.
 */
function sampleName(name: HTMLElement, budget: Budget, rand: () => number): NameSample | null {
  const letters = Array.from(name.querySelectorAll<HTMLElement>("[data-ch]"));
  if (letters.length === 0) return null;

  const style = getComputedStyle(name);
  const size = parseFloat(style.fontSize);
  if (!(size > 0)) return null;
  const box = name.getBoundingClientRect();
  const rects = letters.map((letter) => letter.getBoundingClientRect());
  const pad = Math.ceil(size * 0.3);
  const left = Math.floor(Math.min(...rects.map((r) => r.left)) - pad);
  const top = Math.floor(Math.min(...rects.map((r) => r.top)) - pad);
  const w = Math.ceil(Math.max(...rects.map((r) => r.right)) + pad) - left;
  const h = Math.ceil(Math.max(...rects.map((r) => r.bottom)) + pad) - top;
  if (w <= 0 || h <= 0) return null;

  const sheet = document.createElement("canvas");
  sheet.width = w;
  sheet.height = h;
  const ctx = sheet.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  ctx.fillStyle = "#fff";
  ctx.textBaseline = "alphabetic";

  const upper = style.textTransform === "uppercase";
  letters.forEach((letter, i) => {
    const raw = letter.textContent ?? "";
    const text = upper ? raw.toLocaleUpperCase() : raw;
    const r = rects[i];
    if (!r) return;
    const m = ctx.measureText(text);
    const ascent = m.fontBoundingBoxAscent ?? size * 0.92;
    const descent = m.fontBoundingBoxDescent ?? size * 0.24;
    // An inline box of height r.height centres the font's ascent + descent.
    const baseline = r.top - top + (r.height - (ascent + descent)) / 2 + ascent;
    ctx.fillText(text, r.left - left, baseline);
  });

  const pixels = ctx.getImageData(0, 0, w, h).data;
  const step = Math.max(2, size / budget.glyphStep);
  const points: Array<[number, number]> = [];
  for (let y = step / 2; y < h; y += step) {
    for (let x = step / 2; x < w; x += step) {
      if ((pixels[(Math.floor(y) * w + Math.floor(x)) * 4 + 3] ?? 0) > 110) {
        points.push([left + x + (rand() - 0.5) * step * 0.45, top + y + (rand() - 0.5) * step * 0.45]);
      }
    }
  }
  if (points.length === 0) return null;
  return { points, left: box.left, width: box.width, top: box.top, height: box.height };
}

interface Glyphs extends Cloud {
  sample: NameSample;
  tx: Float32Array;
  ty: Float32Array;
  start: Float32Array;
  dur: Float32Array;
  swirl: Float32Array;
  // Scratch, rewritten every frame.
  px: Float32Array;
  py: Float32Array;
  pa: Float32Array;
  ps: Float32Array;
  pm: Uint8Array;
}

/**
 * One particle per sampled point, starting in the air like the rest. They are
 * paired with their letters in left-to-right order (with a little shuffle),
 * so the convergence reads as a controlled flow rather than a scramble, and
 * they leave in that order too, just behind the sweep.
 */
function buildGlyphs(sample: NameSample, view: View, mesh: Mesh, height: Height, rand: () => number): Glyphs {
  const n = sample.points.length;
  const cloud = makeCloud(n, view, mesh, height, rand, true);
  const glyphs: Glyphs = {
    ...cloud,
    sample,
    tx: new Float32Array(n),
    ty: new Float32Array(n),
    start: new Float32Array(n),
    dur: new Float32Array(n),
    swirl: new Float32Array(n),
    px: new Float32Array(n),
    py: new Float32Array(n),
    pa: new Float32Array(n),
    ps: new Float32Array(n),
    pm: new Uint8Array(n),
  };

  // Where each particle is on screen when the convergence begins.
  const z0 = 1.1 * easeOut(ramp(INTRO.depth, INTRO.exit, INTRO.converge));
  const byScreen = Array.from({ length: n }, (_, i) => i).sort((a, b) => {
    const key = (i: number) => (cloud.x[i] ?? 0) / Math.max(Z_CLIP, (cloud.z[i] ?? 1) - z0) + (rand() - 0.5) * 0.35;
    return key(a) - key(b);
  });
  const byTarget = sample.points.map((_, i) => i).sort((a, b) => (sample.points[a]?.[0] ?? 0) - (sample.points[b]?.[0] ?? 0));

  byScreen.forEach((particle, k) => {
    const point = sample.points[byTarget[k] ?? 0] ?? [0, 0];
    const along = clamp01((point[0] - sample.left) / Math.max(1, sample.width));
    glyphs.tx[particle] = point[0];
    glyphs.ty[particle] = point[1];
    glyphs.start[particle] = INTRO.converge - 200 + 760 * along + rand() * 90;
    glyphs.dur[particle] = 430 + rand() * 120;
    glyphs.swirl[particle] = (rand() < 0.5 ? -1 : 1) * (0.4 + rand() * 0.6);
    glyphs.size[particle] = 1.45 + rand() * 0.7;
    glyphs.alpha[particle] = 0.8 + rand() * 0.2;
    glyphs.accent[particle] = rand() < 0.22 ? 1 : 0;
  });
  return glyphs;
}

// -- The halo: the hero's dial, drawn the same way -----------------------------------

interface Pose {
  x: number;
  y: number;
  /** The dial's full size (its 1000-unit drawing), in px. */
  s: number;
}

const TICKS = 144;

/**
 * The dial of HeroDial.tsx at a pose: dashed and hairline circles, the inner
 * faint circles, 144 ticks (a longer one every twelfth), the four axis marks
 * and the short mint arc. Line weights and opacities match the hero's, so at
 * the hand-over the two are indistinguishable.
 */
function drawDial(
  ctx: CanvasRenderingContext2D,
  pose: Pose,
  look: { alpha: number; progress: number; tick: number; arc: number; glow: number; sparks: Float32Array; t: number },
) {
  const { x, y, s } = pose;
  const a = look.alpha;
  if (a <= 0.003 || s <= 0) return;
  const k = s / 1000;
  const from = -Math.PI / 2;
  const to = from + Math.PI * 2 * look.progress;
  ctx.lineWidth = 1;

  const circle = (r: number, alpha: number, start = from, end = to) => {
    if (alpha <= 0.002) return;
    ctx.strokeStyle = `rgba(${INK}, ${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, r * k, start, end);
    ctx.stroke();
  };

  if (look.glow > 0.01) {
    ctx.lineWidth = 7;
    ctx.strokeStyle = `rgba(${ACCENT}, ${0.07 * look.glow * a})`;
    ctx.beginPath();
    ctx.arc(x, y, 446 * k, from, to);
    ctx.stroke();
    ctx.lineWidth = 1;
  }

  ctx.setLineDash([2, 8]);
  circle(486, 0.24 * a * look.progress, 0, Math.PI * 2);
  ctx.setLineDash([]);
  circle(446, 0.24 * a);
  circle(350, 0.1 * a);
  circle(262, 0.1 * a);

  // Ticks, revealed clockwise from twelve o'clock.
  const shown = Math.floor(TICKS * look.progress);
  for (const major of [false, true]) {
    ctx.strokeStyle = `rgba(${INK}, ${(major ? 0.62 : 0.3) * a})`;
    ctx.lineWidth = major ? 1.25 : 1;
    ctx.beginPath();
    for (let i = 0; i < shown; i++) {
      if ((i % 12 === 0) !== major) continue;
      const angle = (i / TICKS) * Math.PI * 2 - Math.PI / 2 + look.tick;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const outer = major ? 428 : 412;
      ctx.moveTo(x + cos * 396 * k, y + sin * 396 * k);
      ctx.lineTo(x + cos * outer * k, y + sin * outer * k);
    }
    ctx.stroke();
  }
  ctx.lineWidth = 1;

  // Axis marks, as the sweep passes them.
  ctx.strokeStyle = `rgba(${INK}, ${0.42 * a})`;
  ctx.beginPath();
  for (let q = 0; q < 4; q++) {
    if (look.progress < q / 4 + 0.001) continue;
    const angle = -Math.PI / 2 + (q * Math.PI) / 2;
    ctx.moveTo(x + Math.cos(angle) * 486 * k, y + Math.sin(angle) * 486 * k);
    ctx.lineTo(x + Math.cos(angle) * 530 * k, y + Math.sin(angle) * 530 * k);
  }
  ctx.stroke();

  // The mint arc: 130px along the hairline circle, as the hero draws it.
  if (look.progress >= 1) {
    ctx.strokeStyle = `rgba(${ACCENT}, ${a})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 446 * k, look.arc, look.arc + 130 / (446 * k));
    ctx.stroke();
    ctx.lineWidth = 1;
  }

  // While it is a halo, light catches on it.
  if (look.glow > 0.01) {
    ctx.fillStyle = `rgb(${ACCENT})`;
    for (let i = 0; i < look.sparks.length; i += 2) {
      const angle = look.sparks[i] ?? 0;
      if (angle - from > to - from) continue;
      const twinkle = 0.5 + 0.5 * Math.sin(look.t * 0.004 + (look.sparks[i + 1] ?? 0));
      ctx.globalAlpha = look.glow * a * twinkle;
      ctx.fillRect(x + Math.cos(angle) * 446 * k - 1, y + Math.sin(angle) * 446 * k - 1, 2, 2);
    }
    ctx.globalAlpha = 1;
  }
}

/** The angle of a rotate() transform, from its computed matrix. */
function angleOf(element: Element | null) {
  if (!element) return 0;
  const transform = getComputedStyle(element).transform;
  const match = /^matrix\(([^,]+),\s*([^,]+)/.exec(transform);
  return match ? Math.atan2(Number(match[2]), Number(match[1])) : 0;
}

interface Target extends Pose {
  /** Tick and arc rotation, and the clock time they were read at. */
  tick: number;
  arc: number;
  at: number;
}

// -- The page's grid, pre-rendered -------------------------------------------------------

/** body::before in globals.css, drawn the same way: minor and major rules, fading toward the bottom. */
function renderGrid(w: number, h: number, dpr: number) {
  const sheet = document.createElement("canvas");
  sheet.width = Math.max(1, Math.round(w * dpr));
  sheet.height = Math.max(1, Math.round(h * dpr));
  const g = sheet.getContext("2d");
  if (!g) return sheet;
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  for (const [size, alpha] of [
    [GRID, 0.028],
    [GRID_MAJOR, 0.055],
  ] as const) {
    const fall = g.createLinearGradient(0, 0, 0, h);
    fall.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
    fall.addColorStop(1, `rgba(255, 255, 255, ${alpha * 0.55})`);
    g.fillStyle = fall;
    for (let x = 0; x < w; x += size) g.fillRect(x, 0, 1, h);
    for (let y = 0; y < h; y += size) g.fillRect(0, y, w, 1);
  }
  return sheet;
}

// -- The renderer -------------------------------------------------------------------------

export function startIntroCanvas(canvas: HTMLCanvasElement, options: IntroCanvasOptions): () => void {
  const { lite } = options;
  const budget = lite ? LITE : FULL;
  const context = canvas.getContext("2d");
  if (!context) return () => {};
  const ctx = context;
  const height = makeHeight();

  let view = makeView(1, 1);
  let dpr = 1;
  /**
   * The dense line-work (the landscape, the streaks) is stroked exactly one
   * device pixel wide. Under the context's scale a 1px stroke is no longer a
   * hairline and takes a far slower rasteriser path; at one device pixel it
   * stays on the fast one, and reads as a finer line on dense screens.
   */
  let hair = 1;
  let hairAlpha = 1;
  let mesh: Mesh | null = null;
  let grid: HTMLCanvasElement | null = null;
  let ambient: Cloud | null = null;
  let glyphs: Glyphs | null = null;
  let marks: Float32Array = new Float32Array(0);
  let sparks: Float32Array = new Float32Array(0);
  let home: Target | null = null;
  let landing: Target | null = null;
  let frame = 0;
  let stopped = false;
  let ready = false;
  let lastSolid = -1;
  let lastGlow = -1;

  const camera: Camera = { x: 0, y: 1, z: 0 };
  const before: Camera = { x: 0, y: 1, z: 0 };
  const pointer = { x: 0, y: 0, px: -999, py: -999, on: 0 };
  const eased = { x: 0, px: -999, py: -999, on: 0 };

  /** The hero's dial, if it is on screen: where the halo lands. */
  const measure = (t: number): Target | null => {
    const element = options.target();
    if (!element) return null;
    const r = element.getBoundingClientRect();
    if (r.width < 40 || r.bottom < 0 || r.top > view.h || r.right < 0 || r.left > view.w) return null;
    return {
      x: r.left + r.width / 2,
      y: r.top + r.height / 2,
      s: r.width,
      tick: angleOf(element.querySelector("g")),
      arc: angleOf(element.querySelector("circle:last-of-type")),
      at: t,
    };
  };

  const build = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    dpr = backingRatio(budget, w, h);
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    hair = 1 / dpr;
    hairAlpha = dpr > 1.2 ? 1.3 : 1;
    view = makeView(w, h);

    const rand = mulberry32(0x6b72697368);
    mesh = buildMesh(view, budget, height, rand);
    grid = renderGrid(w, h, dpr);
    ambient = makeCloud(budget.ambient, view, mesh, height, rand, false);

    // Coordinate marks on the page grid's major intersections, out from the cross.
    const reach = Math.min(w, h) * 0.55;
    const found: number[] = [];
    for (let x = 0; x <= w; x += GRID_MAJOR) {
      for (let y = 0; y <= h; y += GRID_MAJOR) {
        const distance = Math.hypot(x - view.cx, y - view.cy);
        if (distance > reach) continue;
        found.push(x, y, INTRO.lines + 50 + 480 * (distance / reach) + rand() * 80, rand() < 0.16 ? 1 : 0);
      }
    }
    marks = Float32Array.from(found);
    sparks = Float32Array.from({ length: 72 }, (_, i) => (i % 2 === 0 ? rand() * Math.PI * 2 - Math.PI / 2 : rand() * 6.28));

    home = measure(options.now());
    if (glyphs) {
      const sample = sampleName(options.name, budget, rand);
      glyphs = sample ? buildGlyphs(sample, view, mesh, height, rand) : null;
    }
  };

  const formName = () => {
    if (stopped || !mesh || glyphs || options.now() > NAME_DEADLINE) return;
    const sample = sampleName(options.name, budget, mulberry32(0x4e414d45));
    if (!sample) return;
    glyphs = buildGlyphs(sample, view, mesh, height, mulberry32(0x6e616d65));
    options.onName?.();
  };

  // -- Drawing passes -----------------------------------------------------------------

  const project = (x: number, y: number, z: number, cam: Camera, out: Float32Array) => {
    const zr = z - cam.z;
    if (zr < Z_CLIP) return false;
    out[0] = view.cx + (view.f * (x - cam.x)) / zr;
    out[1] = view.horizon + (view.d * (cam.y - y)) / zr;
    out[2] = zr;
    return true;
  };
  const p = new Float32Array(3);
  const q = new Float32Array(3);

  const crossAlpha = (t: number) => (t < 900 ? 1 : t < 1500 ? mix(1, 0.35, (t - 900) / 600) : mix(0.35, 0, ramp(1500, 2200, t)));

  const drawCross = (t: number) => {
    const a = crossAlpha(t);
    if (a <= 0.002) return;
    const grow = easeOut(ramp(0, 300, t));
    if (grow <= 0) return;
    const { w, h, cx, cy } = view;
    const half = (w / 2) * grow;
    const across = ctx.createLinearGradient(cx - half, 0, cx + half, 0);
    across.addColorStop(0, `rgba(${INK}, 0)`);
    across.addColorStop(0.5, `rgba(${INK}, ${0.3 * a})`);
    across.addColorStop(1, `rgba(${INK}, 0)`);
    ctx.fillStyle = across;
    ctx.fillRect(cx - half, cy, half * 2, 1);
    const top = cy - cy * grow;
    const bottom = cy + (h - cy) * grow;
    const down = ctx.createLinearGradient(0, top, 0, bottom);
    down.addColorStop(0, `rgba(${INK}, 0)`);
    down.addColorStop(clamp01((cy - top) / Math.max(1, bottom - top)), `rgba(${INK}, ${0.22 * a})`);
    down.addColorStop(1, `rgba(${INK}, 0)`);
    ctx.fillStyle = down;
    ctx.fillRect(cx, top, 1, bottom - top);
  };

  const drawPoint = (t: number) => {
    const a = t < 125 ? t / 125 : t < 800 ? 1 : 1 - ramp(800, 1250, t);
    if (a <= 0.002) return;
    const scale = t < 125 ? mix(0.2, 1, t / 125) : t < 800 ? 1 : mix(1, 0.5, ramp(800, 1250, t));
    const { cx, cy } = view;
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 24 * scale);
    glow.addColorStop(0, `rgba(${ACCENT}, ${0.45 * a})`);
    glow.addColorStop(1, `rgba(${ACCENT}, 0)`);
    ctx.fillStyle = glow;
    ctx.fillRect(cx - 24 * scale, cy - 24 * scale, 48 * scale, 48 * scale);
    const rayX = ctx.createLinearGradient(cx - 60 * scale, 0, cx + 60 * scale, 0);
    rayX.addColorStop(0, "rgba(255, 255, 255, 0)");
    rayX.addColorStop(0.5, `rgba(255, 255, 255, ${0.85 * a})`);
    rayX.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = rayX;
    ctx.fillRect(cx - 60 * scale, cy, 120 * scale, 1);
    const rayY = ctx.createLinearGradient(0, cy - 32 * scale, 0, cy + 32 * scale);
    rayY.addColorStop(0, "rgba(255, 255, 255, 0)");
    rayY.addColorStop(0.5, `rgba(255, 255, 255, ${0.75 * a})`);
    rayY.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = rayY;
    ctx.fillRect(cx, cy - 32 * scale, 1, 64 * scale);
    ctx.globalAlpha = a;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(cx + 0.5, cy + 0.5, 2.5 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  };

  const drawGrid = (t: number) => {
    if (!grid) return;
    const grow = easeOut(ramp(INTRO.lines, INTRO.lines + 700, t));
    if (grow <= 0) return;
    if (grow < 1) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(view.cx, view.cy, Math.hypot(view.w, view.h) * grow, 0, Math.PI * 2);
      ctx.clip();
    }
    ctx.drawImage(grid, 0, 0, view.w, view.h);
    if (grow < 1) ctx.restore();
  };

  const drawMarks = (t: number) => {
    const life = (1 - 0.55 * smooth(INTRO.converge, INTRO.solid, t)) * (1 - smooth(INTRO.exit + 50, INTRO.exit + 300, t));
    if (life <= 0.002) return;
    for (const accentPass of [0, 1]) {
      ctx.fillStyle = accentPass ? `rgb(${ACCENT})` : `rgb(${INK})`;
      for (let i = 0; i < marks.length; i += 4) {
        if ((marks[i + 3] ?? 0) !== accentPass) continue;
        const a = (accentPass ? 0.55 : 0.32) * smooth(marks[i + 2] ?? 0, (marks[i + 2] ?? 0) + 200, t) * life;
        if (a <= 0.002) continue;
        const x = marks[i] ?? 0;
        const y = marks[i + 1] ?? 0;
        ctx.globalAlpha = a;
        ctx.fillRect(x - 4, y, 9, 1);
        ctx.fillRect(x, y - 4, 1, 9);
      }
    }
    ctx.globalAlpha = 1;
  };

  const terrainAlpha = (t: number) => {
    let a = (1 - 0.7 * smooth(INTRO.converge, INTRO.solid, t)) * (1 - 0.4 * smooth(INTRO.solid, 2800, t));
    a = mix(a, 0.42, smooth(INTRO.exit, INTRO.exit + 130, t));
    return a * (1 - smooth(INTRO.exit + 140, INTRO.exit + 440, t));
  };
  const lineFog = (zr: number) => (1 - smooth(9, 16.5, zr)) * smooth(Z_CLIP, 0.9, zr);

  /** Free particles (and the name's, before they leave) in one band of depth. */
  const drawBand = (cloud: Cloud, band: number, t: number, glyph: Glyphs | null) => {
    const from = cloud.bandRun[band] ?? 0;
    const to = cloud.bandRun[band + 1] ?? 0;
    if (from === to) return;
    const ts = t / 1000;
    const life = glyph ? 1 : (1 - 0.6 * smooth(1600, 2700, t)) * (1 - smooth(INTRO.exit + 220, INTRO.exit + 520, t));
    if (life <= 0.002) return;
    for (const accentPass of [0, 1]) {
      ctx.fillStyle = accentPass ? `rgb(${ACCENT})` : `rgb(${INK})`;
      for (let k = from; k < to; k++) {
        const i = cloud.order[k] ?? 0;
        if ((cloud.accent[i] ?? 0) !== accentPass) continue;
        if (glyph && t >= (glyph.start[i] ?? 0)) continue;
        if (!project((cloud.x[i] ?? 0) + (cloud.vx[i] ?? 0) * ts, (cloud.y[i] ?? 0) + (cloud.vy[i] ?? 0) * ts, cloud.z[i] ?? 0, camera, p)) continue;
        const zr = p[2] ?? 1;
        const delay = cloud.delay[i] ?? 0;
        const phase = cloud.phase[i] ?? 0;
        const a =
          (cloud.alpha[i] ?? 0) *
          smooth(delay, delay + 380, t) *
          life *
          (1 - smooth(10, 16, zr)) *
          smooth(Z_CLIP, 0.7, zr) *
          (0.78 + 0.22 * Math.sin(t * 0.0021 + phase));
        if (a <= 0.01) continue;
        const size = (lite ? 1.25 : 1.45) * (cloud.size[i] ?? 1) * Math.min(1.85, Math.max(0.55, 3.4 / zr));
        ctx.globalAlpha = a > 1 ? 1 : a;
        ctx.fillRect((p[0] ?? 0) - size / 2, (p[1] ?? 0) - size / 2, size, size);
      }
    }
    ctx.globalAlpha = 1;
  };

  const drawTerrain = (t: number) => {
    const m = mesh;
    if (!m) return;
    const alpha = terrainAlpha(t);
    const fillLife = 1 - smooth(INTRO.exit + 140, INTRO.exit + 440, t);
    const { cols, rows } = m;
    const margin = 60;
    const step = (m.xs[1] ?? 1) - (m.xs[0] ?? 0);
    /** The columns of a row (at depth zr) that are on screen, plus one either side. */
    const span = (zr: number): [number, number] => {
      const left = camera.x + ((-margin - view.cx) * zr) / view.f;
      const right = camera.x + ((view.w + margin - view.cx) * zr) / view.f;
      return [
        Math.max(0, Math.floor((left - (m.xs[0] ?? 0)) / step) - 1),
        Math.min(cols - 1, Math.ceil((right - (m.xs[0] ?? 0)) / step) + 1),
      ];
    };

    // Project each row's on-screen vertices once.
    for (let r = 0; r < rows; r++) {
      const zr = (m.zs[r] ?? 0) - camera.z;
      if (zr < Z_CLIP) continue;
      const [lo, hi] = span(Math.max(zr, (m.zs[r + 1] ?? m.zs[r] ?? 0) - camera.z));
      for (let c = lo; c <= hi; c++) {
        const i = r * cols + c;
        m.sx[i] = view.cx + (view.f * ((m.xs[c] ?? 0) - camera.x)) / zr;
        m.sy[i] = view.horizon + (view.d * (camera.y - (m.y[i] ?? 0))) / zr;
      }
    }

    const segment = (a: number, b: number, start: number, fromB: boolean) => {
      const progress = ramp(start, start + SEGMENT_MS, t);
      if (progress <= 0) return;
      const ax = m.sx[a] ?? 0;
      const ay = m.sy[a] ?? 0;
      const bx = m.sx[b] ?? 0;
      const by = m.sy[b] ?? 0;
      if ((ax < -margin && bx < -margin) || (ax > view.w + margin && bx > view.w + margin)) return;
      if (fromB) {
        ctx.moveTo(bx, by);
        ctx.lineTo(mix(bx, ax, progress), mix(by, ay, progress));
      } else {
        ctx.moveTo(ax, ay);
        ctx.lineTo(mix(ax, bx, progress), mix(ay, by, progress));
      }
    };

    // Rows are drawn from the centre line outward.
    const row = (r: number, lo: number, hi: number) => {
      const base = r * cols;
      for (let c = lo; c < hi; c++) {
        const outward = Math.abs(m.xs[c] ?? 0) <= Math.abs(m.xs[c + 1] ?? 0);
        segment(base + c, base + c + 1, m.rowStart[r * (cols - 1) + c] ?? 0, !outward);
      }
    };

    const glint = (r: number, a: number, lo: number, hi: number) => {
      const list = m.glints[r];
      if (!list || a <= 0.01) return;
      for (let k = 0; k < list.length; k += 3) {
        const c = list[k] ?? 0;
        if (c < lo || c > hi) continue;
        const i = r * cols + c;
        const shown = ramp(m.rowStart[r * (cols - 1) + Math.min(c, cols - 2)] ?? 0, (m.rowStart[r * (cols - 1) + Math.min(c, cols - 2)] ?? 0) + 260, t);
        const twinkle = 0.45 + 0.55 * Math.sin(t * 0.003 + (list[k + 2] ?? 0)) ** 2;
        const ga = a * shown * twinkle;
        if (ga <= 0.01) continue;
        ctx.fillStyle = list[k + 1] ? `rgb(${ACCENT})` : "#fff";
        ctx.globalAlpha = ga > 1 ? 1 : ga;
        ctx.fillRect((m.sx[i] ?? 0) - 0.9, (m.sy[i] ?? 0) - 0.9, 1.8, 1.8);
      }
      ctx.globalAlpha = 1;
    };

    // Far to near: fill the band (hiding what is behind it), draw its far row
    // and its columns, then the particles that live at that depth.
    for (let r = rows - 2; r >= 0; r--) {
      const zNear = (m.zs[r] ?? 0) - camera.z;
      const zFar = (m.zs[r + 1] ?? 0) - camera.z;
      if (zFar < Z_CLIP) continue;

      // Beyond the fog nothing of the band shows, so it needs neither lines nor its fill.
      if (zNear >= Z_CLIP && lineFog(zFar) > 0.002) {
        const [lo, hi] = span(zFar);
        const fillAlpha = smooth(m.bandStart[r] ?? 0, (m.bandStart[r] ?? 0) + 450, t) * fillLife;
        if (fillAlpha > 0.01) {
          ctx.beginPath();
          for (let c = lo; c <= hi; c++) {
            const i = (r + 1) * cols + c;
            if (c === lo) ctx.moveTo(m.sx[i] ?? 0, m.sy[i] ?? 0);
            else ctx.lineTo(m.sx[i] ?? 0, m.sy[i] ?? 0);
          }
          for (let c = hi; c >= lo; c--) {
            const i = r * cols + c;
            ctx.lineTo(m.sx[i] ?? 0, m.sy[i] ?? 0);
          }
          ctx.closePath();
          ctx.fillStyle = `rgba(8, 10, 13, ${fillAlpha})`;
          ctx.fill();
        }

        const a = alpha * lineFog(zFar);
        if (a > 0.004) {
          ctx.strokeStyle = `rgba(${INK}, ${0.42 * a * hairAlpha})`;
          ctx.lineWidth = hair;
          ctx.beginPath();
          row(r + 1, lo, hi);
          for (let c = lo; c <= hi; c++) segment((r + 1) * cols + c, r * cols + c, m.colStart[r * cols + c] ?? 0, false);
          ctx.stroke();
          glint(r + 1, a * 1.3, lo, hi);
        }
      }

      if (ambient) drawBand(ambient, r, t, null);
      if (glyphs) drawBand(glyphs, r, t, glyphs);
    }

    // The nearest row.
    const zr0 = (m.zs[0] ?? 0) - camera.z;
    const a0 = alpha * lineFog(zr0);
    if (zr0 >= Z_CLIP && a0 > 0.004) {
      const [lo, hi] = span(zr0);
      ctx.strokeStyle = `rgba(${INK}, ${0.42 * a0 * hairAlpha})`;
      ctx.lineWidth = hair;
      ctx.beginPath();
      row(0, lo, hi);
      ctx.stroke();
    }
  };

  /** While the camera moves forward, the free particles streak past. */
  const drawStreaks = (t: number) => {
    if (lite || !ambient) return;
    const strength = smooth(INTRO.exit, INTRO.exit + 120, t) * (1 - smooth(INTRO.exit + 300, INTRO.exit + 520, t));
    if (strength <= 0.01) return;
    cameraAt(t - 32, before, camera.x);
    const ts = t / 1000;
    ctx.strokeStyle = `rgba(${INK}, ${0.22 * strength * hairAlpha})`;
    ctx.lineWidth = hair;
    ctx.beginPath();
    for (let i = 0; i < ambient.n; i++) {
      const x = (ambient.x[i] ?? 0) + (ambient.vx[i] ?? 0) * ts;
      const y = (ambient.y[i] ?? 0) + (ambient.vy[i] ?? 0) * ts;
      const z = ambient.z[i] ?? 0;
      if (!project(x, y, z, camera, p) || !project(x, y, z, before, q)) continue;
      let dx = (p[0] ?? 0) - (q[0] ?? 0);
      let dy = (p[1] ?? 0) - (q[1] ?? 0);
      const length = Math.hypot(dx, dy);
      if (length < 2) continue;
      if (length > 36) {
        dx *= 36 / length;
        dy *= 36 / length;
      }
      ctx.moveTo((p[0] ?? 0) - dx, (p[1] ?? 0) - dy);
      ctx.lineTo(p[0] ?? 0, p[1] ?? 0);
    }
    ctx.stroke();
  };

  /**
   * The landscape fades out before the left and right edges instead of being
   * cut by them (the page reserves a scrollbar gutter while it is locked, and
   * nothing can paint there). Gone once the landscape is.
   */
  const drawEdges = (t: number) => {
    const strength = smooth(INTRO.lines, INTRO.lines + 300, t) * (1 - smooth(INTRO.exit + 140, INTRO.exit + 440, t));
    if (strength <= 0.01) return;
    const width = Math.max(48, view.w * 0.07);
    for (const [from, to] of [
      [0, width],
      [view.w, view.w - width],
    ] as const) {
      const edge = ctx.createLinearGradient(from, 0, to, 0);
      edge.addColorStop(0, `rgba(8, 10, 13, ${strength})`);
      edge.addColorStop(1, "rgba(8, 10, 13, 0)");
      ctx.fillStyle = edge;
      ctx.fillRect(Math.min(from, to), 0, width, view.h);
    }
  };

  /** State 4: the sweep and the particles of the name; state 5: they give way to the solid letters. */
  const drawName = (t: number) => {
    const g = glyphs;
    if (!g) return;
    const s = g.sample;
    const fade = 1 - smooth(INTRO.solid + 40, INTRO.solid + 460, t);

    // The sweep: a soft wash of mint with a bright core, crossing left to right.
    const sweepAt = ramp(INTRO.converge + 50, INTRO.solid + 50, t);
    const band = Math.max(24, s.width * 0.06);
    const sweepX = s.left - band + (s.width + band * 2) * smooth(0, 1, sweepAt);
    if (sweepAt > 0 && sweepAt < 1) {
      const fadeEnds = Math.sin(Math.PI * sweepAt) ** 0.5;
      const top = s.top - s.height * 0.3;
      const tall = s.height * 1.6;
      // A soft elliptical wash of light trailing the core.
      ctx.save();
      ctx.translate(sweepX - band * 1.2, s.top + s.height / 2);
      ctx.scale(band * 2.2, tall * 0.55);
      const wash = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      wash.addColorStop(0, `rgba(${ACCENT}, ${0.15 * fadeEnds})`);
      wash.addColorStop(1, `rgba(${ACCENT}, 0)`);
      ctx.fillStyle = wash;
      ctx.beginPath();
      ctx.arc(0, 0, 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      const core = ctx.createLinearGradient(0, top, 0, top + tall);
      core.addColorStop(0, `rgba(${ACCENT}, 0)`);
      core.addColorStop(0.5, `rgba(${ACCENT}, ${0.9 * fadeEnds})`);
      core.addColorStop(1, `rgba(${ACCENT}, 0)`);
      ctx.fillStyle = core;
      ctx.fillRect(sweepX, top, 1.5, tall);
    }
    if (fade <= 0.005) return;

    const ts = t / 1000;
    const reach = Math.max(70, Math.min(view.w, view.h) * 0.12);
    let any = false;
    for (let i = 0; i < g.n; i++) {
      g.pa[i] = 0;
      const start = g.start[i] ?? 0;
      if (t < start) continue;
      const u = ramp(start, start + (g.dur[i] ?? 400), t);
      const e = easeInOut(u);
      const tx = g.tx[i] ?? 0;
      const ty = g.ty[i] ?? 0;
      let x = tx;
      let y = ty;
      let fromAlpha = 0.5;
      if (u < 1 && project((g.x[i] ?? 0) + (g.vx[i] ?? 0) * ts, (g.y[i] ?? 0) + (g.vy[i] ?? 0) * ts, g.z[i] ?? 0, camera, p)) {
        const dx = tx - (p[0] ?? 0);
        const dy = ty - (p[1] ?? 0);
        const distance = Math.hypot(dx, dy) || 1;
        const bend = Math.sin(Math.PI * e) * (g.swirl[i] ?? 0) * Math.min(70, distance * 0.22);
        x = (p[0] ?? 0) + dx * e - (dy / distance) * bend;
        y = (p[1] ?? 0) + dy * e + (dx / distance) * bend;
        const delay = g.delay[i] ?? 0;
        fromAlpha = (g.alpha[i] ?? 0) * 0.6 * smooth(delay, delay + 380, t);
      }
      const phase = g.phase[i] ?? 0;
      let alpha = mix(fromAlpha, g.alpha[i] ?? 1, e);
      let size = (g.size[i] ?? 1.5) * (lite ? 0.85 : 1) * mix(0.8, 1, e);
      if (u >= 1) {
        // Settled: a faint shimmer, and the letters part softly around a mouse pointer.
        x += Math.sin(t * 0.0021 + phase) * 0.4;
        y += Math.cos(t * 0.0017 + phase * 1.7) * 0.4;
        if (eased.on > 0.02) {
          const dx = x - eased.px;
          const dy = y - eased.py;
          const d = Math.hypot(dx, dy);
          if (d < reach && d > 0.01) {
            const k = (1 - d / reach) ** 2 * eased.on;
            x += (dx / d) * k * reach * 0.3;
            y += (dy / d) * k * reach * 0.3;
          }
        }
      }
      // Where the sweep is, the particles flare.
      const near = sweepAt > 0 && sweepAt < 1 ? 1 - clamp01(Math.abs(x - sweepX) / (band * 1.6)) : 0;
      alpha = Math.min(1, alpha * (1 + near * 1.2)) * fade;
      size *= (1 + near * 0.7) * mix(0.7, 1, fade);
      g.px[i] = x;
      g.py[i] = y;
      g.pa[i] = alpha;
      g.ps[i] = size;
      g.pm[i] = near > 0.45 || g.accent[i] ? 1 : 0;
      any = true;
    }
    if (!any) return;
    for (const accentPass of [0, 1]) {
      ctx.fillStyle = accentPass ? `rgb(${ACCENT})` : `rgb(${INK})`;
      for (let i = 0; i < g.n; i++) {
        const a = g.pa[i] ?? 0;
        if (a <= 0.01 || (g.pm[i] ?? 0) !== accentPass) continue;
        const size = g.ps[i] ?? 1;
        ctx.globalAlpha = a;
        ctx.fillRect((g.px[i] ?? 0) - size / 2, (g.py[i] ?? 0) - size / 2, size, size);
      }
    }
    ctx.globalAlpha = 1;
  };

  /** The solid letters' opacity and glow, on the same clock as their particles. */
  const driveName = (t: number) => {
    if (!glyphs) return;
    const solid = Math.round(easeOut(ramp(INTRO.solid, INTRO.solid + 380, t)) * 1000) / 1000;
    const glow = Math.round((1 - easeOut(ramp(INTRO.solid, INTRO.solid + 900, t))) * 1000) / 1000;
    if (solid !== lastSolid) {
      lastSolid = solid;
      options.name.style.setProperty("--solid", String(solid));
    }
    if (glow !== lastGlow) {
      lastGlow = glow;
      options.name.style.setProperty("--glow", String(glow));
    }
  };

  /** Where the halo is at time t: at the centre, then flying to the hero's dial. */
  const posture = (t: number, out: Pose) => {
    // The halo's own size while it hangs over the landscape (states 3–6); it
    // then flies to the hero's dial, whatever size that is.
    const start: Pose = { x: view.cx, y: view.cy, s: Math.min(view.w * 0.82, view.h * 0.58) };
    if (t < INTRO.exit) {
      out.x = start.x;
      out.y = start.y;
      out.s = start.s;
      return;
    }
    const end: Pose = landing ?? { x: view.cx, y: view.cy, s: start.s * 1.3 };
    const e = easeInOut(ramp(INTRO.exit, INTRO.exit + 320, t));
    out.x = mix(start.x, end.x, e);
    out.y = mix(start.y, end.y, e);
    out.s = mix(start.s, end.s, e);
  };
  const pose: Pose = { x: 0, y: 0, s: 0 };

  const ringLook = (t: number) => {
    const reference = landing ?? home;
    const elapsed = reference ? t - reference.at : 0;
    const halo = smooth(INTRO.depth, INTRO.depth + 250, t) * (1 - 0.86 * smooth(1600, 2250, t));
    const alpha =
      t < INTRO.exit
        ? halo
        : mix(0.14, 1, smooth(INTRO.exit, INTRO.exit + 150, t)) *
          (1 - 0.45 * smooth(INTRO.portal, INTRO.reveal, t)) *
          (1 - smooth(INTRO.reveal + 40, INTRO.total - 80, t));
    return {
      alpha,
      progress: easeInOut(ramp(INTRO.depth + 50, INTRO.depth + 750, t)),
      tick: (reference?.tick ?? 0) + (elapsed / 160000) * Math.PI * 2,
      arc: (reference?.arc ?? 0) + (elapsed / 34000) * Math.PI * 2,
      glow: smooth(900, 1250, t) * (1 - smooth(1500, 2200, t)),
      sparks,
      t,
    };
  };

  /**
   * States 7–8: once the halo has landed, the disc inside it brightens into
   * the page (a crossfade, so it never opens on a fragment), then the opening
   * widens to the whole screen.
   */
  const drawIris = (t: number) => {
    if (t < INTRO.portal) return;
    const size = (landing ?? home)?.s ?? Math.min(view.w, view.h) * 0.66;
    const portal = 0.47 * size;
    const feather = Math.max(22, size * 0.08);
    const corners = Math.max(
      Math.hypot(pose.x, pose.y),
      Math.hypot(view.w - pose.x, pose.y),
      Math.hypot(pose.x, view.h - pose.y),
      Math.hypot(view.w - pose.x, view.h - pose.y),
    );
    const open = easeInOut(ramp(INTRO.portal, INTRO.reveal, t));
    const r = mix(portal, corners + feather, easeInOut(ramp(INTRO.reveal, INTRO.total - 60, t)));
    const hole = ctx.createRadialGradient(pose.x, pose.y, 0, pose.x, pose.y, r + feather);
    hole.addColorStop(0, `rgba(0, 0, 0, ${open})`);
    hole.addColorStop(clamp01(r / (r + feather)), `rgba(0, 0, 0, ${open})`);
    hole.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = hole;
    ctx.fillRect(0, 0, view.w, view.h);
    ctx.globalCompositeOperation = "source-over";
  };

  const draw = () => {
    if (stopped || !mesh) return;
    const t = Math.max(0, options.now());
    if (t >= INTRO.total) {
      ctx.clearRect(0, 0, view.w, view.h);
      return;
    }

    // The pointer, eased: a little camera parallax, and the letters part around it.
    eased.x += (pointer.x * pointer.on * 0.22 - eased.x) * 0.05;
    eased.px += (pointer.px - eased.px) * 0.22;
    eased.py += (pointer.py - eased.py) * 0.22;
    eased.on += (pointer.on - eased.on) * 0.08;
    cameraAt(t, camera, eased.x);

    if (t >= INTRO.exit) landing = measure(t) ?? landing;
    posture(t, pose);
    const look = ringLook(t);

    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#080a0d";
    ctx.fillRect(0, 0, view.w, view.h);
    drawGrid(t);
    drawMarks(t);
    drawCross(t);
    if (t < INTRO.exit) drawDial(ctx, pose, look);
    drawTerrain(t);
    drawStreaks(t);
    drawEdges(t);
    drawName(t);
    drawPoint(t);
    // Once flying, the halo is drawn over the scene but under the opening: as
    // the page shows through, the hero's own dial (which stands behind the
    // portrait) takes its place, instead of a copy lying across the figure.
    if (t >= INTRO.exit) drawDial(ctx, pose, look);
    drawIris(t);
    driveName(t);
  };

  const loop = () => {
    draw();
    if (!ready && !stopped) {
      ready = true;
      options.onReady?.();
    }
    if (!stopped) frame = requestAnimationFrame(loop);
  };

  const onPointer = (event: PointerEvent) => {
    pointer.x = (event.clientX / Math.max(1, view.w)) * 2 - 1;
    pointer.px = event.clientX;
    pointer.py = event.clientY;
    pointer.on = event.pointerType === "mouse" ? 1 : 0;
  };
  const onLeave = () => {
    pointer.on = 0;
  };

  build();
  const observer = new ResizeObserver(() => {
    if (!stopped) build();
  });
  observer.observe(canvas);
  if (!lite) {
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
  }
  frame = requestAnimationFrame(loop);

  // The name is sampled in its own font, so wait for it (it is not preloaded).
  const style = getComputedStyle(options.name);
  const fonts = document.fonts;
  if (fonts?.load) {
    fonts.load(`${style.fontWeight} ${style.fontSize} ${style.fontFamily}`).then(formName, formName);
    fonts.ready.then(formName);
  } else {
    formName();
  }

  return () => {
    stopped = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    window.removeEventListener("pointermove", onPointer);
    document.documentElement.removeEventListener("pointerleave", onLeave);
  };
}
