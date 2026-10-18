import { achievements } from "@/content/education";
import { experience, experienceGrowth } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillCategories } from "@/content/skills";
import type { Achievement, Experience, ExperienceGrowth, Project, SkillCategory, SocialLink } from "@/types/content";

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

export function getProjects(): Project[] {
  return [...projects].sort(byOrder);
}

/** The lead project (tier "flagship"), if one is configured. */
export function getFlagshipProject(): Project | undefined {
  return getProjects().find((project) => project.tier === "flagship");
}

/** Projects with tier "supporting", in display order. */
export function getSupportingProjects(): Project[] {
  return getProjects().filter((project) => project.tier === "supporting");
}

/** Lower-emphasis projects (tier "additional"), in display order. */
export function getAdditionalProjects(): Project[] {
  return getProjects().filter((project) => project.tier === "additional");
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * The single rule for project detail pages: a project has a route at
 * /projects/[slug] (and is linked and listed in the sitemap) only when it
 * has case-study content.
 */
export function hasCaseStudy(project: Project): boolean {
  return project.caseStudy !== undefined;
}

/** Projects that have a detail route, in display order. */
export function getCaseStudyProjects(): Project[] {
  return getProjects().filter(hasCaseStudy);
}

/** The project for a detail route, or undefined when the slug has no page. */
export function getCaseStudyProject(slug: string): Project | undefined {
  const project = getProjectBySlug(slug);
  return project && hasCaseStudy(project) ? project : undefined;
}

/**
 * Previous and next projects with detail pages, in display order, wrapping
 * around so every project page leads somewhere. Undefined when alone.
 */
export function getAdjacentCaseStudies(slug: string): { previous?: Project; next?: Project } {
  const list = getCaseStudyProjects();
  const index = list.findIndex((project) => project.slug === slug);
  if (index === -1 || list.length < 2) return {};
  return {
    previous: list[(index - 1 + list.length) % list.length],
    next: list[(index + 1) % list.length],
  };
}

export function getExperience(): Experience[] {
  return [...experience].sort(byOrder);
}

/**
 * The growth panel's themes, keeping only roles that exist (and themes that
 * still have one), so it can never point at a role the timeline lacks.
 */
export function getExperienceGrowth(): ExperienceGrowth {
  const ids = new Set(experience.map((role) => role.id));
  const themes = experienceGrowth.themes
    .map((theme) => ({ ...theme, roles: theme.roles.filter((id) => ids.has(id)) }))
    .filter((theme) => theme.roles.length > 0);
  return { ...experienceGrowth, themes };
}

// "React.js" and "React" refer to the same skill.
const normalizeTech = (name: string) => name.toLowerCase().replace(/\.js$/, "").trim();

/**
 * Projects, roles and achievements that evidence the given skill: project
 * and role `technologies`, and achievement `relatedSkills`. Derived from
 * source data so skill evidence cannot be fabricated.
 */
export function getSkillEvidence(skill: string): {
  projects: Project[];
  experience: Experience[];
  achievements: Achievement[];
} {
  const key = normalizeTech(skill);
  const includes = (names: string[] = []) => names.some((name) => normalizeTech(name) === key);

  return {
    projects: getProjects().filter((project) => includes(project.technologies)),
    experience: getExperience().filter((role) => includes(role.technologies)),
    achievements: achievements.filter((achievement) => includes(achievement.relatedSkills)),
  };
}

export interface Capability {
  name: string;
  /** Names of projects, organizations and achievements evidencing the skill. */
  evidence: string[];
}

/** A skill category with evidence resolved for each skill. */
export function resolveCapabilities(category: SkillCategory): Capability[] {
  return category.skills.map((name) => {
    const evidence = getSkillEvidence(name);
    return {
      name,
      evidence: [
        ...evidence.projects.map((project) => project.name),
        ...evidence.experience.map((role) => role.organization),
        ...evidence.achievements.map((achievement) => achievement.title),
      ],
    };
  });
}

/** All skill categories with evidence resolved. */
export function getCapabilityClusters() {
  return skillCategories.map((category) => ({
    id: category.id,
    label: category.label,
    capabilities: resolveCapabilities(category),
  }));
}

/**
 * Verified contact and profile links in contact priority order (email,
 * LinkedIn, GitHub). Empty entries are skipped.
 */
export function getSocialLinks(): SocialLink[] {
  const links: SocialLink[] = [];
  if (profile.contact.email) links.push({ id: "email", label: "Email", href: `mailto:${profile.contact.email}` });
  if (profile.social.linkedin) links.push({ id: "linkedin", label: "LinkedIn", href: profile.social.linkedin });
  if (profile.social.github) links.push({ id: "github", label: "GitHub", href: profile.social.github });
  return links;
}
