"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Where the rail's tip sits: MotionLayer's --progress ends a line 70% down the viewport. */
const TIP = 0.7;

interface TimelineStateProps {
  className?: string;
  children: ReactNode;
}

/**
 * Keeps a timeline's state in step with the reader. A row (`[data-role-row]`)
 * is "reached" once its marker (`[data-marker]`) is above the rail's tip, so
 * markers light exactly as the drawn rail passes them; the last row reached,
 * or the row under a mouse, is "current", and every element inside that
 * carries its `data-role` (the row, its column in the growth panel) gets
 * `data-current`. State only: nothing moves here, scrolling is never
 * touched, and without it every role is simply shown, fully lit.
 */
export function TimelineState({ className, children }: TimelineStateProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const rows = [...root.querySelectorAll<HTMLElement>("[data-role-row]")];
    const tagged = [...root.querySelectorAll<HTMLElement>("[data-role]")];
    let hovered: string | undefined;
    let frame = 0;

    const update = () => {
      frame = 0;
      const tip = window.innerHeight * TIP;
      let scrolled: string | undefined;
      for (const row of rows) {
        const marker = row.querySelector("[data-marker]") ?? row;
        const reached = marker.getBoundingClientRect().top < tip;
        row.toggleAttribute("data-reached", reached);
        if (reached) scrolled = row.dataset.role;
      }
      const current = hovered ?? scrolled;
      for (const el of tagged) el.toggleAttribute("data-current", el.dataset.role === current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Only while the timeline is near the viewport.
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          window.addEventListener("scroll", schedule, { passive: true });
          schedule();
        } else {
          window.removeEventListener("scroll", schedule);
        }
      },
      { rootMargin: "50% 0px" },
    );
    near.observe(root);

    const onOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const row = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-role-row]") : null;
      if (row?.dataset.role === hovered) return;
      hovered = row?.dataset.role;
      schedule();
    };
    const onLeave = () => {
      hovered = undefined;
      schedule();
    };
    root.addEventListener("pointerover", onOver);
    root.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", schedule);
    update();

    return () => {
      near.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      root.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} data-timeline className={className}>
      {children}
    </div>
  );
}
