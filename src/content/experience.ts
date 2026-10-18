import type { Experience, ExperienceGrowth } from "@/types/content";

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

// The growth panel beside the timeline. Each theme restates contributions
// above and names the roles that state it; nothing here goes beyond them.
// Title: AAS "Built mobile-first, responsive interfaces…" → Crobstacle
// "Worked on production web applications across the frontend and backend."
export const experienceGrowth: ExperienceGrowth = {
  title: "From responsive interfaces to production web applications.",
  themes: [
    // AAS: "mobile-first, responsive interfaces"; Crobstacle: "responsive development".
    { id: "responsive", label: "Responsive interfaces", roles: ["aas-welfare-society", "crobstacle-ventures"] },
    { id: "accessible", label: "Accessible layouts", roles: ["aas-welfare-society"] },
    { id: "compatibility", label: "Cross-browser compatibility and usability", roles: ["aas-welfare-society"] },
    { id: "workflows", label: "Validated contact and registration workflows", roles: ["aas-welfare-society"] },
    { id: "full-stack", label: "Production apps across frontend and backend", roles: ["crobstacle-ventures"] },
    { id: "diagnosis", label: "Diagnosing and resolving issues", roles: ["crobstacle-ventures"] },
    { id: "reliability", label: "Reliability improvements", roles: ["crobstacle-ventures"] },
    { id: "collaboration", label: "Git-based cross-functional collaboration", roles: ["crobstacle-ventures"] },
  ],
};
