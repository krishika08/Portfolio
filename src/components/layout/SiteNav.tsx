"use client";

import { usePathname } from "next/navigation";
import { useCallback, useRef, useState, type ReactNode } from "react";
import { Brand } from "@/components/layout/Brand";
import { NavIndex } from "@/components/layout/NavIndex";
import { SectionRail } from "@/components/layout/SectionRail";
import { BaseLink } from "@/components/ui/BaseLink";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { sectionHref, sectionIds, type Destination } from "@/config/navigation";
import { useScrollState } from "@/hooks/useScrollState";
import { cn } from "@/lib/cn";
import type { NavItem, SocialLink } from "@/types/content";

const INDEX_ID = "site-index";
const contactHref = sectionHref(sectionIds.contact);
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
 * Sticky header, transparent over the hero until the page scrolls: the
 * monogram, every destination (the less used ones join from laptops; on
 * phones the Index is the menu), a way to Contact, and the Index, the one
 * complete map of the site with a preview of each destination. On wide
 * screens a numbered rail down the left margin (SectionRail) tracks where
 * you are on the home page. Profiles live in the hero, the Index, the footer
 * and Contact, so the bar stays quiet.
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
        <Container className="grid h-(--header-height) grid-cols-[1fr_auto] items-center gap-group md:grid-cols-[auto_1fr_auto]">
          <Brand name={name} href={homeHref} />

          <nav aria-label="Primary" className="hidden justify-center md:flex">
            <ul className="flex items-center gap-6 lg:gap-7 xl:gap-9">
              {items.map((item) => (
                <li key={item.href} className={cn(item.secondary && "hidden lg:block")}>
                  <BaseLink
                    href={item.href}
                    aria-current={activeState(item)}
                    className={cn(
                      "relative flex min-h-11 items-center rounded-sm text-[0.875rem] font-medium tracking-[-0.005em] text-foreground-secondary transition-colors duration-(--duration-standard) hover:text-foreground aria-[current]:text-foreground",
                      // A mint rule draws in under the link on hover and stays under the current one, with a dot at its centre.
                      "after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-center after:scale-x-0 after:bg-accent after:transition-transform after:duration-(--duration-standard) after:ease-emphasized",
                      "hover:after:scale-x-100 aria-[current]:after:scale-x-100",
                      "before:absolute before:bottom-[0.3rem] before:left-1/2 before:size-[0.3125rem] before:-translate-x-1/2 before:rounded-full before:bg-accent before:opacity-0 before:shadow-[0_0_8px_rgb(var(--accent-rgb)/0.7)] before:transition-opacity before:duration-(--duration-standard)",
                      "aria-[current]:before:opacity-100",
                    )}
                  >
                    {item.label}
                  </BaseLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-tight">
            {resumeHref && (
              <ButtonLink href={resumeHref} newTab variant="secondary" size="sm" className="hidden lg:inline-flex">
                Resume
              </ButtonLink>
            )}
            {/* The way to Contact, as in the hero; the Contact link above goes to the same place. */}
            <BaseLink
              href={contactHref}
              className="group hidden min-h-10 items-center gap-tight rounded-sm border border-[rgb(var(--accent-rgb)/0.55)] px-4 text-[0.875rem] font-medium text-foreground transition-[border-color,background-color] duration-(--duration-standard) hover:border-accent hover:bg-accent-soft lg:inline-flex"
            >
              Let&rsquo;s connect
              <Icon name="arrow-right" className="transition-transform duration-(--duration-standard) group-hover:translate-x-0.5" />
            </BaseLink>

            {/* The Index: the whole menu on phones and tablets; a compact map control on laptops. */}
            <button
              ref={toggleRef}
              type="button"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls={open ? INDEX_ID : undefined}
              aria-label="Index"
              onClick={() => setOpen(true)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center gap-tight rounded-sm border border-border px-3 font-mono text-[0.625rem] tracking-[0.16em] text-foreground-secondary uppercase transition-colors hover:border-accent hover:text-foreground lg:px-0"
            >
              <Icon name="menu" className="text-base" />
              <span aria-hidden className="lg:hidden">
                Index
              </span>
              {currentNumber !== undefined && (
                <span aria-hidden className="hidden text-foreground-muted sm:inline lg:hidden">
                  {pad(currentNumber)}/{pad(destinations.length)}
                </span>
              )}
            </button>
          </div>
        </Container>
      </header>

      {pathname === homeHref && <SectionRail destinations={destinations} current={activeSection} />}

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
