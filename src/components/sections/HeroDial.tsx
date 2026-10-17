import type { SVGProps } from "react";
import styles from "./Hero.module.css";

// The same precision dial the opening draws, now standing behind the portrait:
// 144 ticks (a longer one every twelfth), hairline and dashed circles, four
// axis marks and a short mint arc that keeps travelling the outer ring. Pure
// geometry in 1000 drawing units, computed once, identically on server and
// client. Decorative.
const TICKS = 144;
const point = (angle: number, radius: number) =>
  `${(500 + Math.cos(angle) * radius).toFixed(2)} ${(500 + Math.sin(angle) * radius).toFixed(2)}`;

const ticks = (() => {
  const minor: string[] = [];
  const major: string[] = [];
  for (let i = 0; i < TICKS; i++) {
    const angle = (i / TICKS) * Math.PI * 2 - Math.PI / 2;
    const isMajor = i % 12 === 0;
    (isMajor ? major : minor).push(`M${point(angle, 396)}L${point(angle, isMajor ? 428 : 412)}`);
  }
  return { minor: minor.join(""), major: major.join("") };
})();

// Outlines only, and strokes that stay the same width at any size. Set here, not
// by a parent's CSS, so the dial draws the same wherever it is used.
const line = { fill: "none", vectorEffect: "non-scaling-stroke" } as const;

export function HeroDial(props: Omit<SVGProps<SVGSVGElement>, "viewBox" | "children">) {
  return (
    <svg aria-hidden focusable="false" viewBox="0 0 1000 1000" {...props}>
      <circle cx="500" cy="500" r="486" className={styles.dialDashed} {...line} />
      <circle cx="500" cy="500" r="446" className={styles.dialHair} {...line} />
      <circle cx="500" cy="500" r="350" className={styles.dialFaint} {...line} />
      <circle cx="500" cy="500" r="262" className={styles.dialFaint} {...line} />
      <g className={styles.dialSpin}>
        <path d={ticks.minor} className={styles.dialTick} {...line} />
        <path d={ticks.major} className={styles.dialTickMajor} {...line} />
      </g>
      <path d="M500 14V-30M500 986V1030M14 500H-30M986 500H1030" className={styles.dialAxis} {...line} />
      <circle cx="500" cy="500" r="446" className={styles.dialArc} {...line} />
    </svg>
  );
}
