import type { Experience } from "@/types/content";

// Contributions restate resume-supported areas only. Final wording is
// written in the Recruiter Experience phase; do not add new claims here.

export const experience: Experience[] = [
  {
    id: "crobstacle-ventures",
    organization: "Crobstacle Ventures LLP",
    role: "Website Development Intern",
    dates: { start: "2026-06", end: "2026-08" },
    contributions: [
      "Production web applications",
      "Frontend, backend and performance debugging",
      "Reliability improvements",
      "Responsive development",
      "Cross-functional collaboration",
      "Git-based workflows",
    ],
    technologies: ["Next.js", "React", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    order: 1,
  },
  {
    id: "aas-welfare-society",
    organization: "AAS Welfare Society",
    role: "Frontend Development Intern",
    dates: { start: "2025-06", end: "2025-07" },
    contributions: [
      "Mobile-first responsive UI",
      "Accessible layouts",
      "Cross-browser compatibility",
      "Contact workflows",
      "Volunteer registration workflows",
      "Usability improvements",
    ],
    technologies: [],
    order: 2,
  },
];
