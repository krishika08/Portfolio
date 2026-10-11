import { routes } from "@/config/routes";
import type { NavItem } from "@/types/content";

/**
 * Home-page section ids, shared by the sections and every link to them.
 */
export const sectionIds = {
  work: "work",
  focus: "focus",
  experience: "experience",
  education: "education",
  about: "about",
  contact: "contact",
} as const;

export const sectionHref = (id: string) => `${routes.home}#${id}`;

export const primaryNavigation: NavItem[] = [
  { label: "Work", href: sectionHref(sectionIds.work), section: sectionIds.work, activePrefix: "/projects" },
  { label: "Experience", href: sectionHref(sectionIds.experience), section: sectionIds.experience },
  { label: "About", href: sectionHref(sectionIds.about), section: sectionIds.about },
  { label: "Contact", href: sectionHref(sectionIds.contact), section: sectionIds.contact },
];
