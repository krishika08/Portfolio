import { routes } from "@/config/routes";
import { profile } from "@/content/profile";
import type { NavItem } from "@/types/content";

/**
 * Home-page section ids, shared by the sections and every link to them.
 */
export const sectionIds = {
  home: "home",
  work: "work",
  experience: "experience",
  focus: "focus",
  education: "education",
  about: "about",
  resume: "resume",
  contact: "contact",
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];

export const sectionHref = (id: string) => `${routes.home}#${id}`;

interface DestinationDefinition {
  id: SectionId;
  /** Full label: the section's own title, as shown in the Index. */
  label: string;
  /** Shorter label for the inline header link. */
  navLabel?: string;
  /** Shown in the header's inline links (everything is in the Index). */
  inline?: boolean;
  /** False when the destination has nothing real to point at yet. */
  available?: boolean;
}

// Page order. Keep in step with app/page.tsx.
const definitions: DestinationDefinition[] = [
  { id: sectionIds.home, label: "Home" },
  { id: sectionIds.work, label: "Selected work", navLabel: "Work", inline: true },
  { id: sectionIds.experience, label: "Experience", inline: true },
  { id: sectionIds.focus, label: "Engineering focus" },
  { id: sectionIds.education, label: "Education & achievements" },
  { id: sectionIds.about, label: "About", inline: true },
  // No resume file, no Resume destination: nothing here is ever a dead link.
  { id: sectionIds.resume, label: "Resume", available: Boolean(profile.resume) },
  { id: sectionIds.contact, label: "Contact", inline: true },
];

export interface Destination {
  id: SectionId;
  label: string;
  navLabel: string;
  href: string;
  inline: boolean;
  /** 1-based position on the page, as drawn in section markers and the Index. */
  number: number;
}

/** Every destination that exists, in page order. */
export const destinations: Destination[] = definitions
  .filter((definition) => definition.available !== false)
  .map((definition, index) => ({
    id: definition.id,
    label: definition.label,
    navLabel: definition.navLabel ?? definition.label,
    href: sectionHref(definition.id),
    inline: definition.inline === true,
    number: index + 1,
  }));

export const destinationTotal = destinations.length;

export const destinationNumber = (id: SectionId): number | undefined =>
  destinations.find((destination) => destination.id === id)?.number;

/** The header's inline links (the Work link also marks case-study pages). */
export const primaryNavigation: NavItem[] = destinations
  .filter((destination) => destination.inline)
  .map((destination) => ({
    label: destination.navLabel,
    href: destination.href,
    section: destination.id,
    ...(destination.id === sectionIds.work && { activePrefix: "/projects" }),
  }));
