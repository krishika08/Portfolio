"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

const REVEAL = ".reveal, [data-split], [data-draw], [data-fan], [data-reveal]";

const motionAllowed = () => window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/**
 * The page's motion engine, mounted once in the root layout:
 * - reveals: `.reveal`, `[data-split]`, `[data-draw]`, `[data-fan]` and
 *   `[data-reveal]` animate in as they enter the viewport (CSS does the
 *   animating; this only flags them with `data-visible`);
 * - progress: the reading hairline always; `[data-progress]` elements get
 *   `--progress` (0–1, as they pass through the viewport) when motion is
 *   allowed;
 * - pointer: a drafting reticle, a cobalt grid spotlight and magnetic
 *   `[data-magnetic]` controls, for mouse users only.
 * Under reduced motion nothing but the reading hairline runs. Content is
 * never hidden before this has run, so it reads without JavaScript.
 */
export function MotionLayer() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);

  // Reveals: rescan on every route.
  useLayoutEffect(() => {
    if (!motionAllowed()) return;
    const viewport = window.innerHeight;

    const pending = [...document.querySelectorAll<HTMLElement>(REVEAL)].filter((el) => !el.dataset.visible);
    for (const el of pending) {
      const rect = el.getBoundingClientRect();
      // Already on screen when the page appears: show as-is, no replay.
      if (rect.top < viewport * 0.9 && rect.bottom > 0) el.dataset.visible = "instant";
    }
    document.documentElement.classList.add("motion-ready");

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.visible = "true";
          reveal.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );
    pending.filter((el) => !el.dataset.visible).forEach((el) => reveal.observe(el));

    return () => reveal.disconnect();
  }, [pathname]);

  // Reading progress and per-element scroll progress.
  useEffect(() => {
    const motion = motionAllowed();
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current?.style.setProperty("--scroll", String(max > 0 ? window.scrollY / max : 0));
      if (!motion) return;
      const viewport = window.innerHeight;
      for (const el of document.querySelectorAll<HTMLElement>("[data-progress]")) {
        const rect = el.getBoundingClientRect();
        const p = (viewport * 0.7 - rect.top) / Math.max(rect.height, 1);
        el.style.setProperty("--progress", String(Math.min(Math.max(p, 0), 1)));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // Pointer: reticle, spotlight, magnetic controls (one frame per move).
  useEffect(() => {
    if (!motionAllowed() || !finePointer()) return;
    const reticle = reticleRef.current;
    const spot = spotRef.current;
    if (!reticle || !spot) return;

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let magnet: HTMLElement | null = null;
    let frame = 0;

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.24;
      pos.y += (target.y - pos.y) * 0.24;
      reticle.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      spot.style.setProperty("--spot-x", `${pos.x}px`);
      spot.style.setProperty("--spot-y", `${pos.y}px`);
      frame = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.3 ? requestAnimationFrame(loop) : 0;
    };

    const release = () => {
      if (!magnet) return;
      magnet.style.removeProperty("--mag-x");
      magnet.style.removeProperty("--mag-y");
      magnet = null;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      target.x = event.clientX;
      target.y = event.clientY;
      if (!frame) frame = requestAnimationFrame(loop);
      reticle.dataset.visible = "true";
      spot.dataset.active = "true";

      const element = event.target instanceof Element ? event.target : null;
      reticle.dataset.hover = String(Boolean(element?.closest("a, button, summary, [role='button']")));

      const next = element?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (next !== magnet) release();
      if (next) {
        magnet = next;
        const rect = next.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        next.style.setProperty("--mag-x", `${(dx * 0.28).toFixed(1)}px`);
        next.style.setProperty("--mag-y", `${(dy * 0.35).toFixed(1)}px`);
      }
    };

    const onLeave = () => {
      reticle.dataset.visible = "false";
      spot.dataset.active = "false";
      release();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
      release();
    };
  }, []);

  return (
    <>
      <div ref={progressRef} aria-hidden className="scroll-progress" />
      <div ref={spotRef} aria-hidden className="grid-spotlight" />
      <div ref={reticleRef} aria-hidden className="cursor-reticle" />
    </>
  );
}
