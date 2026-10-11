// Content model for the portfolio.
//
// Rules:
// - Content lives in `src/content/*` and is typed by this file.
// - Presentation components receive these types; they never hard-code facts.
// - Optional fields are optional on purpose: leave them undefined until
//   verified information exists. Never fill a field with placeholder text.

/** Calendar month in `YYYY-MM` form, e.g. "2026-06". */
export type YearMonth = `${number}-${number}`;

/** A date range. An absent `end` means the entry is ongoing. */
export interface DateRange<T extends string = YearMonth> {
  start: T;
  end?: T;
}

/**
 * Image metadata for local assets in `/public`. Width and height are required
 * so `next/image` can reserve space and avoid layout shift. `alt` is required;
 * use an empty string only for purely decorative images.
 */
export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// ── Projects ───────────────────────────────────────────────────────────────

/**
 * Presentation emphasis. Components switch on this, never on project names.
 * flagship: the single lead project · supporting: secondary projects ·
 * additional: lower-emphasis projects (add only with verified content).
 */
export type ProjectTier = "flagship" | "supporting" | "additional";

export interface ProjectLinks {
  live?: string;
  repository?: string;
}

/** An image with its explanation. Diagrams need `description`: a text equivalent. */
export interface CaseStudyFigure {
  image: ImageAsset;
  caption: string;
  description?: string;
}

/** A titled point (decision, challenge) with its explanation. */
export interface CaseStudyPoint {
  title: string;
  detail: string;
}

/**
 * Case-study content. A project gets a detail page (/projects/[slug]), a
 * sitemap entry and "Read case study" links only when this exists. Only
 * `overview` is required; every other section renders only when present.
 * Every statement must trace to a source listed in `sources`, the resume or
 * owner-supplied material — omit a section rather than fill it.
 */
export interface ProjectCaseStudy {
  /** What the project is and how it is built. First paragraph leads. */
  overview: string[];
  /** The problem it addresses, as stated in the project's own documentation. */
  context?: string;
  /** Verified capabilities grouped by theme. */
  highlights?: { title: string; items: string[] }[];
  /** Real product screens. */
  gallery?: CaseStudyFigure[];
  architecture?: { summary: string[]; figure?: CaseStudyFigure };
  decisions?: CaseStudyPoint[];
  challenges?: CaseStudyPoint[];
  outcomes?: string[];
  learnings?: string[];
  /** Where the evidence on the page comes from (shown to readers). */
  sources?: string[];
}

export interface Project {
  /** URL-safe, unique. Used for `/projects/[slug]`. */
  slug: string;
  name: string;
  /** Short neutral summary. Final copy is written in a later phase. */
  summary: string;
  /** Verified capabilities, used as evidence for skills and claims. */
  capabilities: string[];
  technologies: string[];
  /** Where it runs, e.g. ["Web", "Android"]. */
  platforms?: string[];
  role?: string;
  links: ProjectLinks;
  assets?: {
    cover?: ImageAsset;
  };
  tier: ProjectTier;
  /** Ascending display order. */
  order: number;
  caseStudy?: ProjectCaseStudy;
}

// ── Experience ─────────────────────────────────────────────────────────────

export interface Experience {
  id: string;
  organization: string;
  role: string;
  dates: DateRange;
  contributions: string[];
  technologies: string[];
  /** Ascending display order. */
  order: number;
  /** Primary professional experience; presented with stronger emphasis. */
  featured?: boolean;
}

// ── Education & achievements ───────────────────────────────────────────────

export interface Education {
  id: string;
  institution: string;
  /** Common abbreviation, e.g. "UPES". */
  shortName?: string;
  location?: string;
  degree: string;
  /** Years, e.g. { start: "2024", end: "2028" }. */
  dates: DateRange<`${number}`>;
  status: "in-progress" | "completed";
  result?: { label: string; value: string };
}

export interface Achievement {
  id: string;
  title: string;
  organization?: string;
  /** Year ("2025") or month ("2025-12"); omit when unverified. */
  date?: string;
  details?: string;
  url?: string;
  /** Skill names (from content/skills.ts) this achievement is evidence for. */
  relatedSkills?: string[];
}

// ── Skills ─────────────────────────────────────────────────────────────────

/**
 * Skills are plain names grouped by capability: no ratings or levels.
 * Evidence is derived from project/experience `technologies` and achievement
 * `relatedSkills` (see `getSkillEvidence`) so it cannot drift from the data.
 */
export interface SkillCategory {
  id: string;
  label: string;
  skills: string[];
}

// ── Identity, contact & links ──────────────────────────────────────────────

export interface Profile {
  name: string;
  /** Short role label, e.g. "Software engineer". */
  role: string;
  /** Approved professional positioning statement (used for metadata). */
  positioning: string;
  /** Hero introduction, composed from the approved positioning. */
  intro: string;
  focus: string;
  /** Growth direction, stated as direction rather than expertise. */
  direction: string;
  /** Stated engineering interests, not claimed expertise. */
  interests: string[];
  /** About section paragraphs. The last one is set as the section statement. */
  about: string[];
  /** Exact phrases from `about` set in the accent colour. */
  emphasis?: string[];
  /** Single source for contact details. Undefined until verified. */
  contact: {
    email?: string;
  };
  /** Verified external profiles. Undefined until verified. */
  social: {
    github?: string;
    linkedin?: string;
  };
  /** Path in `/public` or absolute URL to the resume PDF. */
  resume?: string;
  /** Real, owner-supplied portraits. `hero` may be a transparent cutout. */
  portraits?: {
    hero?: ImageAsset;
    about?: ImageAsset;
  };
}

// ── Navigation ─────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  /** Home-page section id this item scrolls to; drives the active state. */
  section?: string;
  /** Route prefix that also marks this item active, e.g. "/projects". */
  activePrefix?: string;
}

export interface SocialLink {
  id: "github" | "linkedin" | "email";
  label: string;
  href: string;
}
