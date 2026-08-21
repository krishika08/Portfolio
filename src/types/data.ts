// ============================================================
// Domain types — Single source of truth for all portfolio data.
// All presentational components must consume these types.
// Do not duplicate field definitions in individual components.
// ============================================================

/**
 * Presentation tier controls visual emphasis across the portfolio.
 * Use data-driven tier rather than name-checking in components.
 *
 * flagship   — Primary hero project (VeyloPrep)
 * supporting — Prominent secondary projects
 * additional — Other verified projects
 */
export type ProjectTier = "flagship" | "supporting" | "additional";

export interface CaseStudy {
  problemContext?: string;
  solution?: string;
  architectureDescription?: string;
  architectureItems?: string[];
  decisions?: {
    title: string;
    description: string;
  }[];
  challenges?: {
    title: string;
    description: string;
  }[];
  outcomes?: string[];
  learnings?: string[];
}

export interface Project {
  id: string;
  /**
   * URL-safe slug used for /projects/[slug] routing.
   * Must be unique across all projects.
   */
  slug: string;
  name: string;
  tagline: string; // Short one-line headline for preview contexts
  description: string;
  technologies: string[];
  role: string;
  links: {
    live?: string;
    github?: string;
  };
  /**
   * Hierarchy tier — determines visual prominence.
   * Do NOT use if (project.name === "VeyloPrep") in components.
   */
  tier: ProjectTier;
  /** Retained for backward compatibility — derived from tier */
  featured: boolean;
  ordering: number;
  caseStudyAvailable: boolean;
  /** Optional path to a project image inside /public/images/projects/ */
  imagePath?: string;
  caseStudy?: CaseStudy;
}

export interface Experience {
  id: string;
  organization: string;
  role: string;
  dates: {
    start: string;
    end?: string; // undefined means "Present"
  };
  contributions: string[];
  technologies: string[];
  ordering: number;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  dates: {
    start: string;
    end: string;
  };
  result: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: string[];
  ordering: number;
  description?: string; // High-level capability statement
  evidence?: string;    // Verified project/experience reference
}

export interface SocialLink {
  platform: string;
  label: string; // Accessible label for the link
  url: string;
  /** Optional icon identifier — resolved by the consuming component */
  icon?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}
