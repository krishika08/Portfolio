import type { Project } from "@/types/content";

// Summaries are neutral drafts composed only from verified capabilities;
// final copy is written in the Project Showcase phase.
//
// `links.live` values were carried over from the previous portfolio
// repository (portfolio --COPY). Confirm before launch.
//
// Roomie Match is intentionally excluded until evidence is available.

export const projects: Project[] = [
  {
    slug: "veyloprep",
    name: "VeyloPrep",
    summary:
      "Application, opportunity and deadline tracking with career resources, extended to Android through Capacitor.",
    capabilities: [
      "Application tracking",
      "Opportunity tracking",
      "Deadlines",
      "Career resources",
      "Modular workflows",
      "Persistent data management",
      "Android extension",
      "Native packaging",
      "Signed release build",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Capacitor"],
    links: {
      live: "https://veylo-prep.vercel.app/",
    },
    tier: "flagship",
    order: 1,
  },
  {
    slug: "split-sync",
    name: "Split-Sync",
    summary:
      "Group expense management with balances, settlements, authentication and real-time database operations.",
    capabilities: [
      "Group expense management",
      "Balances",
      "Settlements",
      "Authentication",
      "Real-time database operations",
      "Persistent data management",
    ],
    technologies: ["Next.js", "React", "Supabase", "Tailwind CSS"],
    links: {
      live: "https://splitsync-app.vercel.app/",
    },
    tier: "supporting",
    order: 2,
  },
  {
    slug: "engineered-dev",
    name: "Engineered.dev",
    summary:
      "Technical publication covering cloud computing, backend engineering, system design and software architecture.",
    capabilities: [
      "Technical publication",
      "Cloud computing content",
      "Backend engineering content",
      "System design content",
      "Software architecture content",
      "Responsive interfaces",
      "SEO optimization",
      "Dynamic content management",
    ],
    technologies: ["Next.js", "React", "Firebase", "Payload CMS"],
    links: {},
    tier: "supporting",
    order: 3,
  },
];
