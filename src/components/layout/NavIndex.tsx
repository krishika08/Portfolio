"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { Brand } from "@/components/layout/Brand";
import { SocialLinks } from "@/components/portfolio/SocialLinks";
import { BaseLink } from "@/components/ui/BaseLink";
import { Icon } from "@/components/ui/Icon";
import type { SocialLink } from "@/types/content";
import styles from "./NavIndex.module.css";

export interface IndexDestination {
  id: string;
  label: string;
  href: string;
  number: number;
}

interface NavIndexProps {
  id: string;
  name: string;
  homeHref: string;
  destinations: IndexDestination[];
  /** The destination the visitor is on: a section of the home page, or a page. */
  current: { id: string | null; kind: "page" | "location" };
  /** One preview per destination (server-rendered from real images and content). */
  previews: Record<string, ReactNode>;
  social: SocialLink[];
  /** `restoreFocus`: return focus to the control that opened the Index. */
  onClose: (restoreFocus: boolean) => void;
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The Index: every destination in one numbered map, with a preview of the one
 * you point at. A modal dialog: the page behind is inert and does not scroll,
 * focus is kept inside and returns to the opener, and Escape closes it.
 * Previews respond to pointer and keyboard focus alike; they never carry
 * anything the links do not, so touch and screen readers lose nothing.
 */
export function NavIndex({ id, name, homeHref, destinations, current, previews, social, onClose }: NavIndexProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const shown = hovered ?? current.id ?? destinations[0]?.id ?? null;

  // Modal behaviour: lock scroll, make everything else inert, move focus in.
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const root = document.documentElement;
    root.classList.add("nav-open");

    const inerted: Element[] = [];
    for (const element of Array.from(document.body.children)) {
      const skip = element === overlay || element.tagName === "SCRIPT" || element.tagName.includes("-");
      if (skip || element.hasAttribute("inert")) continue;
      element.setAttribute("inert", "");
      inerted.push(element);
    }

    const start = overlay.querySelector<HTMLElement>("a[aria-current]") ?? overlay.querySelector<HTMLElement>("a[href]");
    start?.focus({ preventScroll: true });

    return () => {
      root.classList.remove("nav-open");
      for (const element of inerted) element.removeAttribute("inert");
    };
  }, []);

  // Escape closes from anywhere, including when focus has fallen to the page.
  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose(true);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Keep Tab inside the dialog.
  const trapFocus = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab") return;
    const focusable = overlayRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    const first = focusable?.item(0);
    const last = focusable?.item(focusable.length - 1);
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const close = () => onClose(false);

  return (
    <div
      ref={overlayRef}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      className={styles.overlay}
      onKeyDown={trapFocus}
    >
      <div className={styles.inner}>
        <div className={styles.bar}>
          <Brand name={name} href={homeHref} onClick={close} />
          <button
            type="button"
            onClick={() => onClose(true)}
            className="inline-flex min-h-11 items-center gap-tight rounded-sm border border-border-strong px-3 font-mono text-eyebrow tracking-[0.14em] text-foreground uppercase transition-colors hover:border-foreground"
          >
            <Icon name="close" />
            Close
          </button>
        </div>

        <div className={styles.layout}>
          <nav aria-label="Index" className={styles.nav}>
            <h2 id={`${id}-title`} className={styles.label}>
              Index
            </h2>
            <ol className={styles.list} onMouseLeave={() => setHovered(null)}>
              {destinations.map((destination, i) => (
                <li key={destination.id} className={styles.item} style={{ "--i": i } as CSSProperties}>
                  <BaseLink
                    href={destination.href}
                    className={styles.link}
                    aria-current={destination.id === current.id ? current.kind : undefined}
                    onClick={close}
                    onMouseEnter={() => setHovered(destination.id)}
                    onFocus={() => setHovered(destination.id)}
                    onBlur={() => setHovered(null)}
                  >
                    <span aria-hidden className={styles.num}>
                      {pad(destination.number)}
                    </span>
                    <span className={styles.name}>{destination.label}</span>
                    <Icon name="arrow-right" className={styles.arrow} />
                  </BaseLink>
                </li>
              ))}
            </ol>
            {social.length > 0 && (
              <div className={styles.foot}>
                <SocialLinks links={social} variant="text" />
              </div>
            )}
          </nav>

          <div aria-hidden className={styles.preview}>
            {destinations.map((destination) =>
              previews[destination.id] ? (
                <div key={destination.id} className={styles.plate} data-active={shown === destination.id}>
                  {previews[destination.id]}
                </div>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
