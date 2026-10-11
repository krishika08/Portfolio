import { profile } from "@/content/profile";
import type { NavItem } from "@/types/content";

// Primary navigation lists only destinations that exist. Section anchors
// (e.g. "/#work") are added when those sections are built.
export const primaryNavigation: NavItem[] = [];

// Resume and contact entries appear automatically once verified values
// are added to `src/content/profile.ts`.
export const utilityNavigation: NavItem[] = [
  ...(profile.resume ? [{ label: "Resume", href: profile.resume }] : []),
  ...(profile.contact.email
    ? [{ label: "Contact", href: `mailto:${profile.contact.email}` }]
    : []),
];
