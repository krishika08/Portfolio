"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface CardEffectsProps {
  className?: string;
  /** Where a click anywhere on the card goes (its case study). The real links inside stay the accessible way in. */
  href?: string;
}

const INTERACTIVE = "a, button, summary, input, select, textarea, label, [role='button']";

/**
 * Pointer behaviour for a project card, attached to its parent element:
 * - while a mouse moves over the card it sets --lx and --ly (the pointer's
 *   position inside the card) and data-lit, which the card's CSS turns into a
 *   light that follows the pointer;
 * - with an `href`, a plain click on the card's empty areas (not on its own
 *   links, and not while selecting text) opens it, and the card shows a
 *   pointer cursor. The card's real links remain the keyboard and
 *   screen-reader path; nothing here adds a duplicate link.
 * Mouse only; the light is off under reduced motion. Renders one decorative
 * element, which is the light itself.
 */
export function CardEffects({ className, href }: CardEffectsProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const router = useRouter();

  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;
    const light = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
    let frame = 0;
    let last: PointerEvent | null = null;

    const place = () => {
      frame = 0;
      if (!last) return;
      const rect = host.getBoundingClientRect();
      host.style.setProperty("--lx", `${(last.clientX - rect.left).toFixed(1)}px`);
      host.style.setProperty("--ly", `${(last.clientY - rect.top).toFixed(1)}px`);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      last = event;
      host.dataset.lit = "true";
      if (!frame) frame = requestAnimationFrame(place);
    };
    const onLeave = () => {
      host.dataset.lit = "false";
    };
    const onClick = (event: MouseEvent) => {
      if (!href || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (event.target instanceof Element && event.target.closest(INTERACTIVE)) return;
      if (window.getSelection()?.toString()) return;
      router.push(href);
    };

    if (light) {
      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave);
    }
    if (href) {
      host.addEventListener("click", onClick);
      host.dataset.clickable = "true";
    }
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("click", onClick);
      delete host.dataset.clickable;
      cancelAnimationFrame(frame);
    };
  }, [href, router]);

  return <span ref={ref} aria-hidden className={className} />;
}
