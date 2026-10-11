import { routes } from "@/config/routes";
import type { NavItem } from "@/types/content";

/**
 * Home-page section ids. Sections built in later phases must use these ids
 * so navigation anchors and the active state resolve. Until a section
 * exists, its nav link points at a not-yet-present anchor.
 */
export const sectionIds = {
  work: "work",
  experience: "experience",
  about: "about",
  contact: "contact",
} as const;

const sectionHref = (id: string) => `${routes.home}#${id}`;

export const primaryNavigation: NavItem[] = [
  { label: "Work", href: sectionHref(sectionIds.work), section: sectionIds.work, activePrefix: "/projects" },
  { label: "Experience", href: sectionHref(sectionIds.experience), section: sectionIds.experience },
  { label: "About", href: sectionHref(sectionIds.about), section: sectionIds.about },
  { label: "Contact", href: sectionHref(sectionIds.contact), section: sectionIds.contact },
];
