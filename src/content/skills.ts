import type { SkillCategory } from "@/types/content";

// Verified skills grouped by capability. Evidence for each skill is derived
// from project, experience and achievement data (see resolveCapabilities).

export const skillCategories: SkillCategory[] = [
  {
    id: "full-stack",
    label: "Full-stack web engineering",
    skills: ["Next.js", "React.js", "TypeScript", "JavaScript", "REST APIs"],
  },
  {
    id: "backend-data",
    label: "Backend & data",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "SQL"],
  },
  {
    id: "foundations",
    label: "Engineering foundations",
    skills: [
      "Java",
      "Python",
      "C",
      "Data Structures & Algorithms",
      "OOP",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
    ],
  },
  {
    id: "cloud-tooling",
    label: "Cloud & tooling",
    skills: ["Google Cloud Platform", "Oracle Cloud Infrastructure Foundations", "Git", "GitHub"],
  },
];
