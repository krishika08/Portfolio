import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import type { Experience, Project } from "@/types/content";

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

export function getProjects(): Project[] {
  return [...projects].sort(byOrder);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Projects that have case-study content and therefore a detail route. */
export function getCaseStudyProjects(): Project[] {
  return getProjects().filter((project) => project.caseStudy !== undefined);
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
