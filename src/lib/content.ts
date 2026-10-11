import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import type { Experience, Project, SkillCategory, SocialLink } from "@/types/content";

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

export function getProjects(): Project[] {
  return [...projects].sort(byOrder);
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

export function getExperience(): Experience[] {
  return [...experience].sort(byOrder);
}

// "React.js" and "React" refer to the same skill.
const normalizeTech = (name: string) => name.toLowerCase().replace(/\.js$/, "").trim();

/**
 * Projects and roles whose `technologies` include the given skill.
 * Derived from source data so skill evidence cannot be fabricated.
 */
export function getSkillEvidence(skill: string): {
  projects: Project[];
  experience: Experience[];
} {
  const key = normalizeTech(skill);
  const uses = (technologies: string[]) =>
    technologies.some((tech) => normalizeTech(tech) === key);

  return {
    projects: getProjects().filter((project) => uses(project.technologies)),
    experience: getExperience().filter((role) => uses(role.technologies)),
  };
}

export interface Capability {
  name: string;
  /** Names of projects and organizations where the skill is evidenced. */
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
      ],
    };
  });
}

/** Verified social/contact links only; empty until values are added to profile. */
export function getSocialLinks(): SocialLink[] {
  const links: SocialLink[] = [];
  if (profile.social.github) links.push({ id: "github", label: "GitHub", href: profile.social.github });
  if (profile.social.linkedin) links.push({ id: "linkedin", label: "LinkedIn", href: profile.social.linkedin });
  if (profile.contact.email) links.push({ id: "email", label: "Email", href: `mailto:${profile.contact.email}` });
  return links;
}
