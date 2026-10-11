import type { SkillCategory } from "@/types/content";

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    skills: ["Java", "Python", "C", "SQL", "JavaScript", "TypeScript"],
  },
  {
    id: "frameworks",
    label: "Frameworks & Technologies",
    skills: ["Next.js", "React.js", "REST APIs"],
  },
  {
    id: "databases",
    label: "Databases",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Supabase"],
  },
  {
    id: "cloud-devops",
    label: "Cloud & DevOps",
    skills: [
      "Google Cloud Platform",
      "Oracle Cloud Infrastructure Foundations",
      "Git",
      "GitHub",
    ],
  },
  {
    id: "foundations",
    label: "Foundations",
    skills: [
      "Data Structures & Algorithms",
      "OOP",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
    ],
  },
];
