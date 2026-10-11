import type { Experience } from "@/types/content";

// Contributions are written only from resume-verified points. Do not add
// metrics, scope or responsibilities that the resume does not state.

export const experience: Experience[] = [
  {
    id: "crobstacle-ventures",
    organization: "Crobstacle Ventures LLP",
    role: "Website Development Intern",
    dates: { start: "2026-06", end: "2026-08" },
    contributions: [
      "Worked on production web applications across the frontend and backend.",
      "Diagnosed and resolved frontend, backend and performance issues.",
      "Contributed reliability improvements and responsive development.",
      "Collaborated cross-functionally through Git-based workflows.",
    ],
    technologies: ["Next.js", "React", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    order: 1,
    featured: true,
  },
  {
    id: "aas-welfare-society",
    organization: "AAS Welfare Society",
    role: "Frontend Development Intern",
    dates: { start: "2025-06", end: "2025-07" },
    contributions: [
      "Built mobile-first, responsive interfaces with accessible layouts.",
      "Worked on cross-browser compatibility and usability improvements.",
      "Implemented validated contact workflows and volunteer registration workflows.",
    ],
    technologies: [],
    order: 2,
  },
];
