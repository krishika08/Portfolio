"use client";

import { useEffect, useState } from "react";

/**
 * Whether the page is scrolled past `threshold`, and which of `sectionIds`
 * is under the reading line (35% down the viewport). One passive scroll
 * listener, coalesced to one update per animation frame. Ids are looked up
 * on each update, so sections may mount later.
 */
export function useScrollState(sectionIds: readonly string[], threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const idsKey = sectionIds.join(" ");

  useEffect(() => {
    const ids = idsKey ? idsKey.split(" ") : [];
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > threshold);

      const line = window.innerHeight * 0.35;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current: string | null = null;
      let currentTop = -Infinity;
      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;
        const top = element.getBoundingClientRect().top;
        // A short final section may never reach the line; at the bottom it wins.
        if (atBottom) current = id;
        else if (top <= line && top > currentTop) {
          current = id;
          currentTop = top;
        }
      }
      setActiveSection(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [idsKey, threshold]);

  return { scrolled, activeSection };
}
