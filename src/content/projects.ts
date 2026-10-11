import type { Project } from "@/types/content";

// Verified project data. Summaries are composed only from verified
// capabilities. Live links are confirmed by the owner. Cover images are real
// product captures supplied by the owner (from the previous portfolio).
//
// Roomie Match is intentionally excluded until evidence is available.

export const projects: Project[] = [
  {
    slug: "veyloprep",
    name: "VeyloPrep",
    summary:
      "Cross-platform career and placement management application for tracking applications, opportunities and deadlines, with an Android build packaged through Capacitor.",
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
    assets: {
      cover: {
        src: "/images/projects/veyloprep/cover.png",
        alt: "VeyloPrep mobile home screen showing today’s priority and a placement pipeline of applied, assessment, interview and offer stages.",
        width: 1024,
        height: 501,
      },
    },
    tier: "flagship",
    order: 1,
  },
  {
    slug: "split-sync",
    name: "Split-Sync",
    summary:
      "Group expense management with balances, settlements, secure authentication and real-time database operations.",
    capabilities: [
      "Group expense management",
      "Balances",
      "Settlements",
      "Secure authentication",
      "Real-time database operations",
      "Persistent data management",
    ],
    technologies: ["Next.js", "React", "Supabase", "Tailwind CSS"],
    links: {
      live: "https://splitsync-app.vercel.app/",
    },
    assets: {
      cover: {
        src: "/images/projects/split-sync/cover.png",
        alt: "Split-Sync landing page with the app’s balance and recent group expenses shown on a phone.",
        width: 1016,
        height: 534,
      },
    },
    tier: "supporting",
    order: 2,
  },
  {
    slug: "engineered-dev",
    name: "Engineered.dev",
    summary:
      "Developer-focused technical publication platform covering cloud computing, backend engineering, system design and software architecture.",
    capabilities: [
      "Technical publication platform",
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
