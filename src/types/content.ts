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

/** Presentation emphasis. Components switch on this, never on project names. */
export type ProjectTier = "flagship" | "supporting";

export interface ProjectLinks {
  live?: string;
  repository?: string;
}

/**
 * Extended case-study content. Every field is optional so a case study can be
 * written incrementally. A project has a detail page only when this exists.
 */
export interface ProjectCaseStudy {
  problem?: string;
  approach?: string;
  architecture?: string[];
  decisions?: { title: string; detail: string }[];
  challenges?: { title: string; detail: string }[];
  outcomes?: string[];
  learnings?: string[];
  media?: ImageAsset[];
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
}

// ── Education & achievements ───────────────────────────────────────────────

export interface Education {
  id: string;
  institution: string;
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
  organization: string;
  date: YearMonth;
  details?: string;
  url?: string;
}

// ── Skills ─────────────────────────────────────────────────────────────────

/**
 * Skills are plain names grouped by category: no ratings or levels.
 * Evidence is derived from project and experience `technologies`
 * (see `getSkillEvidence`) so it cannot drift from the source data.
 */
export interface SkillCategory {
  id: string;
  label: string;
  skills: string[];
}

// ── Identity, contact & links ──────────────────────────────────────────────

export interface Profile {
  name: string;
  /** Approved professional positioning statement. */
  positioning: string;
  focus: string;
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
}

// ── Navigation ─────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}
