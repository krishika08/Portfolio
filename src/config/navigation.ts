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
  leetcode: "leetcode",
  community: "community",
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
  /** Shown inline in the header from tablets up; the rest join them on laptops (everything is in the Index). */
  inline?: boolean;
  /** False when the destination has nothing real to point at yet. */
  available?: boolean;
}

// Page order. Keep in step with app/page.tsx. `navLabel` is the short header
// label ("Skills" for Engineering focus: its content is skills, grouped).
const definitions: DestinationDefinition[] = [
  { id: sectionIds.home, label: "Home" },
  { id: sectionIds.work, label: "Selected work", navLabel: "Projects", inline: true },
  { id: sectionIds.experience, label: "Experience", inline: true },
  { id: sectionIds.focus, label: "Engineering focus", navLabel: "Skills" },
  { id: sectionIds.education, label: "Education & achievements", navLabel: "Education" },
  { id: sectionIds.about, label: "About", inline: true },
  { id: sectionIds.leetcode, label: "LeetCode & DSA", navLabel: "LeetCode", inline: true },
  { id: sectionIds.community, label: "Community & Events", navLabel: "Community", inline: true },
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

/**
 * The header's links: every destination, in page order. `secondary` ones are
 * shown only where the bar has room for all of them (the rest appear from
 * tablets up; on phones the Index is the menu). The Projects link also marks
 * case-study pages.
 */
export const primaryNavigation: NavItem[] = destinations.map((destination) => ({
  label: destination.navLabel,
  href: destination.href,
  section: destination.id,
  secondary: !destination.inline,
  ...(destination.id === sectionIds.work && { activePrefix: "/projects" }),
}));
