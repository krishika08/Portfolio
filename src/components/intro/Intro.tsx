"use client";

import { Cinzel } from "next/font/google";
import { useEffect, useId, useRef, type CSSProperties, type KeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { INTRO, INTRO_LAYOUT, INTRO_SESSION_KEY, STILL } from "./introTimeline";
import styles from "./Intro.module.css";

// The wordmark's serif, used only here. Not preloaded: it is fetched when the
// opening shows (first visit of a session), so other visits never pay for it.
const serif = Cinzel({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-intro-serif",
  display: "swap",
  preload: false,
});

/** The opening's own line (Step 1 brief); shown in capitals. */
const TAGLINE = "Building ideas for a better tomorrow.";

/** State 1: what the system says as it starts. */
const LABELS = ["// INITIALIZING...", "// LOADING ENVIRONMENT", "// CONNECTING IDEAS", "// WELCOME"];

/** State 2: right-side technical markers from the storyboard. */
const KEYWORDS = ["IDEAS", "CODE", "LEARN", "BUILD", "IMPACT"];

interface IntroProps {
  /** The name, as on the page (shown in capitals). */
  name: string;
  /** The existing role (shown in capitals). */
  role: string;
}

// The halo for the CSS-only fallback: HeroDial's geometry, in 1000 drawing
// units. Computed once, identically on server and client.
const TICKS = 144;
const point = (angle: number, radius: number) =>
  `${(500 + Math.cos(angle) * radius).toFixed(2)} ${(500 + Math.sin(angle) * radius).toFixed(2)}`;
const tickPaths = (() => {
  const minor: string[] = [];
  const major: string[] = [];
  for (let i = 0; i < TICKS; i++) {
    const angle = (i / TICKS) * Math.PI * 2 - Math.PI / 2;
    const isMajor = i % 12 === 0;
    (isMajor ? major : minor).push(`M${point(angle, 396)}L${point(angle, isMajor ? 428 : 412)}`);
  }
  return { minor: minor.join(""), major: major.join("") };
})();

const lastLabel = LABELS.length - 1;
const timeline = {
  "--t-total": INTRO.total,
  "--t-exit": INTRO.exit,
  "--t-labels": INTRO.labels,
  "--t-label-step": INTRO.labelStep,
  "--t-labels-out": INTRO.labelsOut,
  "--t-keywords": INTRO.keywords,
  "--t-keyword-step": INTRO.keywordStep,
  "--t-keywords-out": INTRO.keywordsOut,
  "--t-depth": INTRO.depth,
  "--t-converge": INTRO.converge,
  "--t-solid": INTRO.solid,
  "--t-role": INTRO.role,
  "--t-tagline": INTRO.tagline,
  "--t-portal": INTRO.portal,
  "--t-cursor": INTRO.labels + lastLabel * INTRO.labelStep + (LABELS[lastLabel]?.length ?? 0) * 12,
  "--s-total": STILL.total,
  "--s-out": STILL.out,
  "--cy": `${INTRO_LAYOUT.cy * 100}%`,
} as CSSProperties;

// When the opening plays, start fetching the renderer at once (before
// hydration), not when the effect runs.
const loadCanvas = () => import("./introCanvas");
let canvasChunk: ReturnType<typeof loadCanvas> | undefined;
if (typeof window !== "undefined") {
  const { intro, introMode } = document.documentElement.dataset;
  if (intro === "play" && introMode !== "still") canvasChunk = loadCanvas().catch(() => undefined as never);
}

/**
 * The cinematic opening. Markup and timing are server-rendered CSS, shown
 * only when the gate script (introGate.ts) has set html[data-intro="play"]:
 * the first visit of a session, on the home page, without an #anchor (or
 * with ?intro). State 1 is CSS, so it is on screen from the first paint; the
 * canvas (introCanvas.ts) then takes over the background and draws states
 * 2–8, ending with the page opening through the hero's own dial. This
 * component adds what CSS cannot: the canvas, the ways to leave (the Skip
 * button, Escape, a click or tap, scrolling), modal focus handling, and the
 * hand-over to the page.
 *
 * Under reduced motion it is a still title card instead: no motion, nothing
 * modal, nothing locked, gone in under two seconds or at the first key,
 * click or scroll.
 *
 * The page is always underneath and always complete, and the overlay ends by
 * itself even if this component never runs.
 */
export function Intro({ name, role }: IntroProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const exitRef = useRef<((fast: boolean) => void) | null>(null);
  const describedBy = useId();

  useEffect(() => {
    const root = document.documentElement;
    const overlay = overlayRef.current;
    const skip = skipRef.current;
    if (!overlay || !skip || root.dataset.intro !== "play") return;

    const still = root.dataset.introMode === "still";
    const lite = root.dataset.introMode === "lite";
    const timers: number[] = [];
    const inerted: Element[] = [];
    let stopCanvas: (() => void) | undefined;
    let finished = false;

    const release = () => {
      for (const element of inerted) element.removeAttribute("inert");
      inerted.length = 0;
    };

    // Rock-solid monotonic start time: ensures State 1 through 8 always play from t=0.
    // data-intro-live tells the gate script's failsafe the opening has started.
    const startTime = performance.now();
    const elapsed = () => performance.now() - startTime;
    overlay.setAttribute("data-active", "");
    root.setAttribute("data-intro-live", "");

    const exit = (fast: boolean) => {
      if (finished) return;
      finished = true;
      try {
        sessionStorage.setItem(INTRO_SESSION_KEY, "1");
      } catch {}
      timers.forEach(window.clearTimeout);
      release();
      // Hand focus to the page if the opening was holding it.
      if (overlay.contains(document.activeElement)) {
        document.getElementById("main")?.focus({ preventScroll: true });
      }
      root.dataset.intro = "exiting";
      let remaining: number;
      if (fast) {
        root.dataset.introSkip = "";
        stopCanvas?.();
        remaining = still ? 30 : 440;
      } else {
        remaining = Math.max(0, (still ? STILL.total : INTRO.total) - elapsed()) + 60;
      }
      timers.push(
        window.setTimeout(() => {
          root.dataset.intro = "done";
          delete root.dataset.introSkip;
          root.removeAttribute("data-intro-live");
          stopCanvas?.();
        }, remaining),
      );
    };
    exitRef.current = exit;

    if (still) {
      // Decoration over a page that is already usable: not a dialog, not in
      // the tab order, nothing inert. Any key, click or scroll dismisses it.
      overlay.removeAttribute("role");
      overlay.removeAttribute("aria-modal");
      overlay.setAttribute("aria-hidden", "true");
      overlay.removeAttribute("tabindex");
      skip.tabIndex = -1;
      timers.push(window.setTimeout(() => exit(false), Math.max(0, STILL.out - elapsed())));
    } else {
      // The page behind is inert while the opening covers it.
      for (const element of Array.from(document.body.children)) {
        const exempt = element === overlay || element.tagName === "SCRIPT" || element.tagName.includes("-");
        if (exempt || element.hasAttribute("inert")) continue;
        element.setAttribute("inert", "");
        inerted.push(element);
      }
      // Focus the dialog itself (announced with its description); Tab reaches Skip.
      overlay.focus({ preventScroll: true });

      (canvasChunk ?? loadCanvas())
        .then((chunk) => {
          const canvas = canvasRef.current;
          const nameElement = nameRef.current;
          // Too late to be worth starting: the CSS composition finishes the opening.
          if (!chunk || finished || !canvas || !nameElement || elapsed() > INTRO.exit - 400) return;
          stopCanvas = chunk.startIntroCanvas(canvas, {
            now: elapsed,
            name: nameElement,
            lite,
            target: () => document.querySelector("[data-intro-target]"),
            // From the first frame the canvas paints the background and the opening.
            onReady: () => overlay.setAttribute("data-particles", ""),
            // The particles form the name; the solid letters wait for them.
            onName: () => overlay.setAttribute("data-particle-name", ""),
          });
        })
        .catch(() => {
          /* The CSS composition stands alone. */
        });

      timers.push(window.setTimeout(() => exit(false), Math.max(0, INTRO.exit - elapsed())));
    }

    // Leaving: Escape (or any key, for the still card), scroll keys, the wheel, a swipe.
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (still || ["Escape", "ArrowDown", "PageDown", "End", " "].includes(event.key)) exit(true);
    };
    const onWheel = (event: WheelEvent) => {
      if (event.deltaY !== 0 || event.deltaX !== 0) exit(true);
    };
    const onTouchMove = () => exit(true);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      timers.forEach(window.clearTimeout);
      stopCanvas?.();
      release();
      exitRef.current = null;
    };
  }, []);

  // Keep Tab on the opening's one control while it is up.
  const trapFocus = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab" || !overlayRef.current?.contains(document.activeElement)) return;
    event.preventDefault();
    skipRef.current?.focus();
  };

  const leave = () => exitRef.current?.(true);

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Introduction"
      aria-describedby={describedBy}
      tabIndex={-1}
      className={cn(styles.overlay, serif.variable)}
      style={timeline}
      onKeyDown={trapFocus}
      onClick={leave}
    >
      <canvas ref={canvasRef} aria-hidden className={styles.canvas} />

      {/* State 1, in CSS from the first paint (the canvas draws the same and takes over). */}
      <span aria-hidden className={styles.crossH} />
      <span aria-hidden className={styles.crossV} />
      <span aria-hidden className={styles.point} />

      {/* The halo, for when the canvas is not running. */}
      <svg aria-hidden focusable="false" viewBox="0 0 1000 1000" className={styles.ring}>
        <circle cx="500" cy="500" r="486" className={styles.dashed} />
        <circle cx="500" cy="500" r="446" className={styles.hair} />
        <circle cx="500" cy="500" r="350" className={styles.faint} />
        <circle cx="500" cy="500" r="262" className={styles.faint} />
        <path d={tickPaths.minor} className={styles.tick} />
        <path d={tickPaths.major} className={styles.tickMajor} />
        <path d="M500 14V-30M500 986V1030M14 500H-30M986 500H1030" className={styles.axis} />
      </svg>

      <ul aria-hidden className={styles.labels}>
        {LABELS.map((label, i) => (
          <li key={label} style={{ "--i": i, "--n": label.length } as CSSProperties}>
            <span className={styles.type}>{label}</span>
            {i === lastLabel && <span className={styles.cursor} />}
          </li>
        ))}
      </ul>

      {/* State 2, right-side markers from storyboard */}
      <ul aria-hidden className={styles.keywords}>
        {KEYWORDS.map((word, i) => (
          <li key={word} style={{ "--i": i } as CSSProperties}>
            <span className={styles.keyword}>{word}</span>
            <span className={styles.arrow}>→</span>
          </li>
        ))}
      </ul>

      <div aria-hidden className={styles.center}>
        <p ref={nameRef} className={styles.name}>
          {Array.from(name).map((letter, index) => (
            <span key={index} data-ch className={styles.ch} style={{ "--i": index } as CSSProperties}>
              {letter}
            </span>
          ))}
        </p>
      </div>
      <div aria-hidden className={styles.sub}>
        <p className={styles.role}>{role}</p>
        <p className={styles.tagline}>{TAGLINE}</p>
      </div>
      <p id={describedBy} className="sr-only">
        {name}, {role}. {TAGLINE}
      </p>

      <button
        ref={skipRef}
        type="button"
        className={styles.skip}
        onClick={(event) => {
          event.stopPropagation();
          leave();
        }}
      >
        Skip intro
        <Icon name="arrow-right" />
      </button>
    </div>
  );
}
