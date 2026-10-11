"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FocusEvent } from "react";
import { SocialLinks } from "@/components/portfolio/SocialLinks";
import { BaseLink } from "@/components/ui/BaseLink";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { useScrollState } from "@/hooks/useScrollState";
import { cn } from "@/lib/cn";
import type { NavItem, SocialLink } from "@/types/content";

const MENU_ID = "site-menu";
const DESKTOP_QUERY = "(min-width: 48rem)";

interface SiteNavProps {
  name: string;
  homeHref: string;
  items: NavItem[];
  /** Rendered only when a verified resume exists. */
  resumeHref?: string;
  social: SocialLink[];
}

/**
 * Compact sticky header. One <nav> serves both layouts: an inline row from
 * md, a disclosure panel below the bar on mobile (non-modal, no focus trap).
 * DOM order matches visual order in both layouts.
 */
export function SiteNav({ name, homeHref, items, resumeHref, social }: SiteNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const sections = items.flatMap((item) => (item.section ? [item.section] : []));
  const { scrolled, activeSection } = useScrollState(sections);

  // Close the menu after navigation to another route.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onBreakpoint = () => desktop.matches && setOpen(false);

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  // Keyboard focus moving past the header closes the panel so it never
  // covers the focused element.
  const onBlur = (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget as Node | null;
    if (open && next && !headerRef.current?.contains(next)) setOpen(false);
  };

  const activeState = (item: NavItem): "page" | "location" | undefined => {
    if (item.activePrefix && pathname.startsWith(item.activePrefix)) return "page";
    if (pathname === homeHref && item.section && item.section === activeSection) return "location";
    return undefined;
  };

  return (
    <header
      ref={headerRef}
      onBlur={onBlur}
      data-raised={scrolled || open}
      className={cn(
        "sticky top-0 z-40 border-b border-transparent bg-background/0",
        "transition-[background-color,border-color,backdrop-filter] duration-(--duration-standard)",
        "data-[raised=true]:border-border-subtle data-[raised=true]:bg-background/80 data-[raised=true]:backdrop-blur-md",
      )}
    >
      <Container className="flex h-(--header-height) items-center justify-between gap-group">
        <BaseLink
          href={homeHref}
          className="group -mx-micro inline-flex min-h-11 items-center gap-tight rounded-sm px-micro font-display text-[1.375rem] leading-none tracking-[0.02em] text-foreground"
        >
          {/* Monogram: the first letter on a cobalt square. */}
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-xs bg-accent text-[1.125rem] text-accent-foreground transition-transform duration-(--duration-standard) group-hover:-rotate-6"
          >
            {name.charAt(0)}
          </span>
          {name}
        </BaseLink>

        <nav aria-label="Primary">
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls={MENU_ID}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex size-11 items-center justify-center rounded-sm bg-accent text-2xl text-accent-foreground transition-colors hover:bg-accent-hover md:hidden"
          >
            <Icon name={open ? "close" : "menu"} />
            <span className="sr-only">Menu</span>
          </button>

          <div
            id={MENU_ID}
            className={cn(
              // Mobile: disclosure panel under the bar.
              "max-md:absolute max-md:inset-x-0 max-md:top-full max-md:max-h-[calc(100dvh-var(--header-height))] max-md:overflow-y-auto",
              "max-md:border-b max-md:border-border-subtle max-md:bg-surface max-md:px-gutter max-md:pt-tight max-md:pb-cluster max-md:shadow-elevated",
              "max-md:transition-[opacity,translate] max-md:duration-(--duration-standard) max-md:ease-emphasized",
              "max-md:starting:-translate-y-2 max-md:starting:opacity-0",
              open ? "max-md:block" : "max-md:hidden",
              // Desktop: inline row.
              "md:flex md:items-center md:gap-cluster",
            )}
          >
            <ul className="flex flex-col md:flex-row md:items-center md:gap-cluster">
              {items.map((item) => {
                const current = activeState(item);
                return (
                  <li key={item.href}>
                    <BaseLink
                      href={item.href}
                      aria-current={current}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center rounded-sm font-display tracking-[0.03em] text-foreground-secondary transition-colors hover:text-foreground",
                        "decoration-accent decoration-2 underline-offset-[0.35em] aria-[current]:text-foreground aria-[current]:underline",
                        "max-md:min-h-14 max-md:border-b max-md:border-border-subtle max-md:text-h2",
                        "md:min-h-11 md:text-[1.0625rem]",
                      )}
                    >
                      {item.label}
                    </BaseLink>
                  </li>
                );
              })}
            </ul>

            {(social.length > 0 || resumeHref) && (
              <div className="flex items-center justify-between gap-tight max-md:mt-cluster">
                <SocialLinks links={social} className="max-md:-ml-3" />
                {resumeHref && (
                  <ButtonLink href={resumeHref} newTab variant="secondary" size="sm" className="max-md:min-h-11">
                    Resume
                  </ButtonLink>
                )}
              </div>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
}
