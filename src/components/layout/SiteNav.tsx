"use client";

import { usePathname } from "next/navigation";
import { useCallback, useRef, useState, type ReactNode } from "react";
import { Brand } from "@/components/layout/Brand";
import { NavIndex } from "@/components/layout/NavIndex";
import { SocialLinks } from "@/components/portfolio/SocialLinks";
import { BaseLink } from "@/components/ui/BaseLink";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { sectionIds, type Destination } from "@/config/navigation";
import { useScrollState } from "@/hooks/useScrollState";
import { cn } from "@/lib/cn";
import type { NavItem, SocialLink } from "@/types/content";

const INDEX_ID = "site-index";
const pad = (n: number) => String(n).padStart(2, "0");

interface SiteNavProps {
  name: string;
  homeHref: string;
  /** The header's inline links. */
  items: NavItem[];
  /** Every destination, in page order (the Index). */
  destinations: Destination[];
  /** Rendered only when a verified resume exists. */
  resumeHref?: string;
  social: SocialLink[];
  /** Index previews, by destination id (server-rendered). */
  previews: Record<string, ReactNode>;
}

/**
 * Sticky header: the wordmark, a few quick links, and the Index. The Index is
 * the one complete map of the site (all eight destinations, numbered, with a
 * preview of each); on phones it is the whole menu. The control shows where
 * you are ("03/08") as you scroll.
 */
export function SiteNav({ name, homeHref, items, destinations, resumeHref, social, previews }: SiteNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const { scrolled, activeSection } = useScrollState(destinations.map((destination) => destination.id));

  // Close the Index after navigation to another route.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => toggleRef.current?.focus());
  }, []);

  const onProjectPage = pathname.startsWith("/projects");
  const current = onProjectPage
    ? { id: sectionIds.work as string, kind: "page" as const }
    : { id: pathname === homeHref ? activeSection : null, kind: "location" as const };
  const currentNumber = destinations.find((destination) => destination.id === current.id)?.number;

  const activeState = (item: NavItem): "page" | "location" | undefined => {
    if (item.activePrefix && pathname.startsWith(item.activePrefix)) return "page";
    if (pathname === homeHref && item.section && item.section === activeSection) return "location";
    return undefined;
  };

  return (
    <>
      <header
        data-raised={scrolled}
        className={cn(
          "sticky top-0 z-40 border-b border-transparent bg-background/0",
          "transition-[background-color,border-color,backdrop-filter] duration-(--duration-standard)",
          "data-[raised=true]:border-border-subtle data-[raised=true]:bg-background/80 data-[raised=true]:backdrop-blur-md",
        )}
      >
        <Container className="flex h-(--header-height) items-center justify-between gap-group">
          <Brand name={name} href={homeHref} />

          <nav aria-label="Primary" className="flex items-center gap-cluster">
            <ul className="hidden items-center gap-cluster md:flex">
              {items.map((item) => (
                <li key={item.href}>
                  <BaseLink
                    href={item.href}
                    aria-current={activeState(item)}
                    className={cn(
                      "relative flex min-h-11 items-center rounded-sm text-[0.9375rem] font-medium text-foreground-secondary transition-colors hover:text-foreground aria-[current]:text-foreground",
                      // A mint rule draws in under the link on hover and stays under the current one.
                      "after:absolute after:inset-x-0 after:bottom-1.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-accent after:transition-transform after:duration-(--duration-standard) after:ease-emphasized",
                      "hover:after:scale-x-100 aria-[current]:after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </BaseLink>
                </li>
              ))}
            </ul>

            {resumeHref && (
              <ButtonLink href={resumeHref} newTab variant="secondary" size="sm" className="hidden lg:inline-flex">
                Resume
              </ButtonLink>
            )}
            <SocialLinks links={social} className="hidden lg:flex" />

            <button
              ref={toggleRef}
              type="button"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls={open ? INDEX_ID : undefined}
              onClick={() => setOpen(true)}
              className="inline-flex min-h-11 items-center gap-tight rounded-sm border border-border-strong px-3 font-mono text-eyebrow tracking-[0.14em] text-foreground uppercase transition-colors hover:border-accent"
            >
              <Icon name="menu" className="text-base" />
              Index
              {currentNumber !== undefined && (
                <span aria-hidden className="hidden text-foreground-muted sm:inline">
                  {pad(currentNumber)}/{pad(destinations.length)}
                </span>
              )}
            </button>
          </nav>
        </Container>
      </header>

      {open && (
        <NavIndex
          id={INDEX_ID}
          name={name}
          homeHref={homeHref}
          destinations={destinations}
          current={current}
          previews={previews}
          social={social}
          onClose={close}
        />
      )}
    </>
  );
}
