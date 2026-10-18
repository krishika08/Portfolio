import { cn } from "@/lib/cn";
import { Terrain } from "./WorkProject";
import styles from "./Experience.module.css";

/* -- The passage ---------------------------------------------------------------
   A vaulted arcade seen down its length: eight arched openings, each smaller
   than the last, converging on a vanishing point where the far opening shows
   a sunset over the same drafted ridges as the hero and Selected Work. Pure
   geometry in a 1000 × 560 drawing, computed once (identical on server and
   client). The slice between two openings is that stretch of vault, wall and
   floor, lit warmer the nearer it is to the light. */

const VP = { x: 560, y: 372 };
/** The nearest opening (its crown runs off the top of the drawing). */
const NEAR = { x0: 170, x1: 870, spring: 330, foot: 620 };
const DEPTH = 8;
const RATIO = 0.79;
const FRAME = "M-20 -20H1020V580H-20Z";

const r1 = (v: number) => Math.round(v * 10) / 10;

/** An arch's outline without its threshold, widened by `grow` on every side. */
const outline = (x0: number, x1: number, spring: number, foot: number, grow = 0) => {
  const r = r1((x1 - x0) / 2 + grow);
  return `M${r1(x0 - grow)} ${foot}V${spring}A${r} ${r} 0 0 1 ${r1(x1 + grow)} ${spring}V${foot}`;
};

function opening(k: number) {
  const s = RATIO ** k;
  const toward = (v: number, c: number) => r1(c + (v - c) * s);
  const x0 = toward(NEAR.x0, VP.x);
  const x1 = toward(NEAR.x1, VP.x);
  const spring = toward(NEAR.spring, VP.y);
  const foot = toward(NEAR.foot, VP.y);
  const r = r1((x1 - x0) / 2);
  // The inner edge catches the light; the face is the arch's own band of stone.
  const edge = outline(x0, x1, spring, foot);
  const rim = outline(x0, x1, spring, foot, r1(22 * s));
  return { x0, x1, spring, foot, r, edge, rim, hole: `${edge}Z`, face: `${rim}Z${edge}Z` };
}

const OPENINGS = Array.from({ length: DEPTH }, (_, k) => opening(k));
const FAR = OPENINGS[DEPTH - 1]!;

/** Longitudinal joints of the vault and floor, converging on the light. */
const JOINTS = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2 + 0.09;
  return `M${VP.x} ${VP.y}L${r1(VP.x + Math.cos(angle) * 1200)} ${r1(VP.y + Math.sin(angle) * 1200)}`;
});

/** Each slice's stone and each arch's face, near (dark) to far (lit by the sunset). */
const STONE = ["#0d0d10", "#101013", "#141216", "#191618", "#201a1a", "#2a1f1d", "#362622"];
const FACE = ["#141418", "#18171b", "#1e1b1e", "#261f20", "#312523", "#3f2d28", "#52382e"];

export function ExperiencePassage({ className }: { className?: string }) {
  return (
    <div aria-hidden data-reveal data-progress className={cn(styles.passage, className)}>
      <svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid slice" className={styles.passageArt} focusable="false">
        <defs>
          <linearGradient id="passage-sky" gradientUnits="userSpaceOnUse" x1="0" y1={FAR.spring - FAR.r} x2="0" y2={FAR.foot}>
            <stop offset="0" stopColor="#121829" />
            <stop offset="0.38" stopColor="#3a3450" />
            <stop offset="0.66" stopColor="#b5735c" />
            <stop offset="0.8" stopColor="#eaa978" />
            <stop offset="1" stopColor="#2a1d1e" />
          </linearGradient>
          <radialGradient id="passage-sun">
            <stop offset="0" stopColor="#fff8ec" />
            <stop offset="0.12" stopColor="#ffdeba" stopOpacity="0.85" />
            <stop offset="0.4" stopColor="#ffc496" stopOpacity="0.25" />
            <stop offset="1" stopColor="#ffc496" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="passage-spill" cx={VP.x} cy={VP.y + 70} r="440" gradientUnits="userSpaceOnUse" gradientTransform={`translate(${VP.x} ${VP.y + 70}) scale(1 0.55) translate(${-VP.x} ${-(VP.y + 70)})`}>
            <stop offset="0" stopColor="#ffc496" stopOpacity="0.2" />
            <stop offset="0.5" stopColor="#ffc496" stopOpacity="0.06" />
            <stop offset="1" stopColor="#ffc496" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="passage-bloom">
            <stop offset="0" stopColor="#ffc496" stopOpacity="0.16" />
            <stop offset="0.45" stopColor="#ffc496" stopOpacity="0.05" />
            <stop offset="1" stopColor="#ffc496" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="passage-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0d0d10" />
            <stop offset="1" stopColor="#09090b" />
          </linearGradient>
          <clipPath id="passage-inside">
            <path d={OPENINGS[0]!.hole} />
          </clipPath>
          <mask id="passage-joints" maskUnits="userSpaceOnUse" x="-20" y="-20" width="1040" height="600">
            <rect x="-20" y="-20" width="1040" height="600" fill="#fff" />
            <path d={FAR.hole} fill="#000" />
          </mask>
        </defs>

        {/* The light at the far end: sky, sun, ridges. */}
        <g className={styles.beyond}>
          <rect x="-20" y="-20" width="1040" height="600" fill="url(#passage-sky)" />
          <circle cx={VP.x} cy={FAR.foot - 24} r="120" fill="url(#passage-sun)" className={styles.sun} />
          <Terrain x={FAR.x0 - 12} y={FAR.foot - 58} width={FAR.x1 - FAR.x0 + 24} height="62" />
        </g>

        {/* The vault, slice by slice, far to near; then the light it throws. */}
        <g className={styles.vault}>
          {OPENINGS.slice(1)
            .map((o, i) => ({ o, k: i + 1 }))
            .reverse()
            .map(({ o, k }) => (
              <g key={k}>
                <path d={`${FRAME}${o.hole}`} fillRule="evenodd" fill={STONE[k - 1]} />
                <path d={o.face} fillRule="evenodd" fill={FACE[k - 1]} />
              </g>
            ))}
          <g clipPath="url(#passage-inside)" mask="url(#passage-joints)">
            {JOINTS.map((d) => (
              <path key={d} d={d} className={styles.joint} />
            ))}
          </g>
          <rect x="-20" y="-20" width="1040" height="600" fill="url(#passage-spill)" />
          <circle cx={VP.x} cy={FAR.foot - 30} r="300" fill="url(#passage-bloom)" />
          {OPENINGS.slice(1).map((o, k) => (
            <g key={k} style={{ opacity: 0.12 + (k / (DEPTH - 2)) * 0.36 }}>
              <path d={o.edge} className={styles.rib} />
              <path d={o.rim} className={styles.rim} />
            </g>
          ))}
        </g>

        {/* The wall you stand in. */}
        <g className={styles.front}>
          <path d={`${FRAME}${OPENINGS[0]!.hole}`} fillRule="evenodd" fill="url(#passage-wall)" />
          <path d={OPENINGS[0]!.edge} className={styles.rib} style={{ opacity: 0.16 }} />
        </g>
      </svg>
    </div>
  );
}
