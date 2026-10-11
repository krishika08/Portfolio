"use client";

import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TiltProps {
  children: ReactNode;
  /** Maximum rotation on each axis, in degrees. */
  max?: number;
  /** Pointer-following highlight across the surface. */
  glare?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Pointer-driven 3D tilt for a card, frame or layered stage. Children with
 * `depth-1` / `depth-2` / `depth-back` sit at different depths, so they move
 * in parallax. Transform-only (no layout work); inert for touch and pen
 * input and under reduced motion. Children render as passed, so Server
 * Components inside stay on the server.
 */
export function Tilt({ children, max = 6, glare = true, className, style }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    el.style.setProperty("--tilt-x", `${((0.5 - y) * max * 2).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${((x - 0.5) * max * 2).toFixed(2)}deg`);
    el.style.setProperty("--glare-x", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--glare-y", `${(y * 100).toFixed(1)}%`);
    el.dataset.tilting = "true";
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.removeProperty("--tilt-x");
    el.style.removeProperty("--tilt-y");
    el.dataset.tilting = "false";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn("tilt", className)}
      style={style}
    >
      {children}
      {glare && <span aria-hidden className="tilt-glare" />}
    </div>
  );
}
