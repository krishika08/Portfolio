"use client";

import { useLayoutEffect, useRef } from "react";

interface CountUpProps {
  /** The final figure exactly as it should read, e.g. "8.24". */
  value: string;
  className?: string;
}

/**
 * A figure that counts up from zero the first time it is seen. The server
 * renders the final value, assistive technology always reads the final
 * value, and under reduced motion (or without JavaScript) it never moves.
 */
export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const target = Number.parseFloat(value);
    if (!el || Number.isNaN(target)) return;
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;

    const decimals = value.split(".")[1]?.length ?? 0;
    el.textContent = (0).toFixed(decimals);
    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / 1300, 1);
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          el.textContent = (target * eased).toFixed(decimals);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value]);

  return (
    <>
      <span ref={ref} aria-hidden className={className}>
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
