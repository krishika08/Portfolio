"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A quiet depth cue for the hero stage: while a mouse moves over the page it
 * sets --px and --py (−1…1, from the viewport's centre) on the stage, and the
 * stage's layers shift by different amounts in CSS (the nearer, the more).
 * Mouse only, and only while the stage is on screen; nothing runs under
 * reduced motion, for touch or pen, or when the pointer is away. Children
 * render as passed, so Server Components inside stay on the server.
 */
export function HeroParallax({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)").matches) {
      return;
    }

    let visible = true;
    let frame = 0;
    let x = 0;
    let y = 0;

    const apply = () => {
      frame = 0;
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
    };
    const onMove = (event: PointerEvent) => {
      if (!visible || event.pointerType !== "mouse") return;
      x = (event.clientX / window.innerWidth) * 2 - 1;
      y = (event.clientY / window.innerHeight) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      x = 0;
      y = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
    });
    observer.observe(el);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
