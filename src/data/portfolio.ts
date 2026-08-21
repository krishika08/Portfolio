import { Project, Experience, Education, SkillCategory, SocialLink, NavigationItem } from "@/types/data";

// ============================================================
// SINGLE SOURCE OF TRUTH for all portfolio data.
// Never duplicate these facts in page components, cards, or metadata.
// ============================================================

// ── Projects ─────────────────────────────────────────────────
// tier field controls visual hierarchy — do NOT name-check in components.
// ordering controls display sequence within a tier.

export const projects: Project[] = [
  {
    id: "veyloprep",
    slug: "veyloprep",
    name: "VeyloPrep",
    tagline: "Application and opportunity tracking, built for job seekers.",
    description:
      "Application and opportunity tracking platform with career resources and modular workflows.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Capacitor"],
    role: "Full-Stack Developer",
    links: {
      live: "https://veylo-prep.vercel.app/",
    },
    tier: "flagship",
    featured: true,
    ordering: 1,
    caseStudyAvailable: true,
    caseStudy: {
      problemContext: "Managing the complexities of career preparation, tracking application lifecycles, and managing deadlines presents a high organizational barrier for job seekers. Additionally, scaling a web application to support a native mobile distribution on Android requires packaging and deployment solutions without modifying the core web codebase.",
      solution: "Implemented a unified job preparation and application tracking platform. Leveraging a relational schema to secure persistent tracking data, the system packages responsive web elements into a native Android environment using Capacitor. This allowed full-featured native distribution and signed release builds from a single codebase.",
      architectureDescription: "Designed a lightweight cross-platform architecture that bridges React-based web screens to native mobile bindings using Capacitor plugins, backed by a persistent relational database layer.",
      architectureItems: [
        "React & Next.js client-side interface framework",
        "PostgreSQL database layer for relational opportunities tracking",
        "Capacitor.js wrappers enabling native packaging",
        "Signed native Android APK package"
      ],
      decisions: [
        {
          title: "Capacitor vs Web Wrapper Redirects",
          description: "Chose Capacitor to build signed native packages directly rather than standard web redirects, enabling offline persistence APIs and native package distribution configurations."
        },
        {
          title: "Relational Storage (PostgreSQL) for Tracking States",
          description: "Utilized PostgreSQL for relational integrity to represent complex, many-to-one states of user applications, job openings, and interview schedules."
        }
      ],
      challenges: [
        {
          title: "Android Native Packaging Optimization",
          description: "Configured specific native build files and signing configurations to produce a production-ready, signed release build (.apk) targeting modern Android API levels."
        }
      ],
      outcomes: [
        "Successfully compiled and signed native release APK packages for Android systems.",
        "Created dynamic, modular tracking workflows ensuring high data integrity across application states."
      ],
      learnings: [
        "Learned how Capacitor binds native platform layers to web runtimes, and the build nuances of Android signing certificates.",
        "Gained deep appreciation for schema design when representing multi-stage application lifecycles."
      ]
    }
  },
  {
    id: "split-sync",
    slug: "split-sync",
    name: "Split-Sync",
    tagline: "Group expense management with real-time balances.",
    description:
      "Group expense management application with real-time balances and settlements.",
    technologies: ["Next.js", "React", "Supabase", "Tailwind CSS"],
    role: "Full-Stack Developer",
    links: {
      live: "https://splitsync-app.vercel.app/",
    },
    tier: "supporting",
    featured: true,
    ordering: 2,
    caseStudyAvailable: true,
    caseStudy: {
      problemContext: "Calculating group expenses, split balances, and settlements across multiple participants in real-time requires a highly reactive database architecture that maintains absolute consistency while providing instantaneous visual updates for users.",
      solution: "Developed a split expense tracker that binds Next.js and React pages to Supabase real-time database channels. Balances are calculated dynamically, and settlements are updated instantly through secure database session triggers.",
      architectureDescription: "Built a reactive full-stack web structure utilizing Next.js for page rendering and Supabase as a real-time data persistence and authentication engine.",
      architectureItems: [
        "React for UI components and client-side reactive state hook management",
        "Next.js App Router layout engine",
        "Supabase Real-time Database and PostgreSQL database integrations",
        "Supabase OAuth and Session Auth mechanisms"
      ],
      decisions: [
        {
          title: "Supabase Database Listeners",
          description: "Integrated real-time database listeners to automatically push balance and payment settlement changes to all members of a group simultaneously without manual poll queries."
        }
      ],
      challenges: [
        {
          title: "Real-time Settlement Computations",
          description: "Designed robust frontend calculation logic to ensure many-to-many transaction splits compile into simple, optimized pair-wise settlements instantly."
        }
      ],
      outcomes: [
        "Implemented real-time transaction updates, ensuring absolute ledger consistency across group views.",
        "Established secure, OAuth-backed login session storage."
      ],
      learnings: [
        "Understood how to handle optimistic UI rendering in React alongside asynchronous database channel notifications.",
        "Acquired experience in setting up secure database schemas and Row-Level Security (RLS) policies in PostgreSQL."
      ]
    }
  },
  {
    id: "engineered-dev",
    slug: "engineered-dev",
    name: "Engineered.dev",
    tagline: "Technical publication for cloud and backend engineering.",
    description:
      "Technical publication platform for cloud computing, backend engineering, and system design content.",
    technologies: ["Next.js", "React", "Firebase", "Payload CMS"],
    role: "Full-Stack Developer",
    links: {},
    tier: "supporting",
    featured: false,
    ordering: 3,
    caseStudyAvailable: true,
    caseStudy: {
      problemContext: "A publication platform covering cloud, systems design, and backend engineering requires structured content management that is fast, search-engine optimized, and responsive on a wide variety of developer viewports.",
      solution: "Engineered a content publication platform by integrating Next.js for server-first rendering with Payload CMS for metadata-rich content delivery, and Firebase Firestore as the persistent content data store.",
      architectureDescription: "Composed an SEO-first publication architecture leveraging Next.js Server Components, Payload CMS, and Firebase services.",
      architectureItems: [
        "Next.js Server Components for fast initial document loads",
        "Payload CMS for rich, structured content authoring",
        "Firebase Firestore as the scalable database store",
        "Semantic HTML and structured JSON-LD configurations for SEO"
      ],
      decisions: [
        {
          title: "Next.js Server-Side Document Loading",
          description: "Utilized Server Components to compile markdown and HTML templates on the server, significantly reducing initial page load times and enabling search-engine index crawlers to index technical content instantly."
        }
      ],
      challenges: [
        {
          title: "Cross-Device Technical Typography",
          description: "Crafted precise CSS stylesheets to render code snippets, diagrams, and deep architectural text elements legibly across diverse screen resolutions."
        }
      ],
      outcomes: [
        "Achieved search-engine optimized, responsive publication structure for articles.",
        "Built dynamic CMS schemas that support modular publishing controls."
      ],
      learnings: [
        "Understood the value of server-first frameworks for content platforms, and how to structure schema fields in headless CMS options.",
        "Gained hands-on knowledge on semantic markup and structured content indexing for search engines."
      ]
    }
  },
];

// ── Helpers ───────────────────────────────────────────────────

/** Returns all projects sorted by ordering. */
export function getProjectsSorted(): Project[] {
  return [...projects].sort((a, b) => a.ordering - b.ordering);
}

/** Looks up a project by slug. Returns undefined for an unknown slug. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Returns all valid project slugs — used for generateStaticParams. */
export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

// ── Experience ────────────────────────────────────────────────

export const experience: Experience[] = [
  {
    id: "crobstacle",
    organization: "Crobstacle Ventures LLP",
    role: "Website Development Intern",
    dates: { start: "June 2026", end: "August 2026" },
    contributions: [
      "Worked on production web applications, improving reliability and performance.",
      "Engaged in frontend and backend debugging.",
      "Implemented responsive developments and collaborated cross-functionally using Git-based workflows.",
    ],
    technologies: ["Next.js", "React", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    ordering: 1,
  },
  {
    id: "aas-welfare",
    organization: "AAS Welfare Society",
    role: "Frontend Development Intern",
    dates: { start: "June 2025", end: "July 2025" },
    contributions: [
      "Developed mobile-first responsive UIs and accessible layouts.",
      "Ensured cross-browser compatibility and improved overall usability.",
      "Implemented contact and volunteer registration workflows.",
    ],
    technologies: ["React", "CSS", "HTML"],
    ordering: 2,
  },
];

// ── Education ─────────────────────────────────────────────────

export const education: Education[] = [
  {
    id: "upes",
    institution: "UPES Dehradun",
    degree: "B.Tech Computer Science",
    dates: { start: "2024", end: "2028" },
    result: "8.24/10 CGPA",
  },
];

// ── Skills ────────────────────────────────────────────────────

export const skills: SkillCategory[] = [
  {
    id: "languages",
    category: "Languages",
    skills: ["Java", "Python", "C", "SQL", "JavaScript", "TypeScript"],
    ordering: 1,
    description: "Core syntax and programming logic applied across software development paradigms.",
    evidence: "Academic course validation and full-stack project implementations.",
  },
  {
    id: "frameworks",
    category: "Frameworks / Technologies",
    skills: ["Next.js", "React.js", "REST APIs"],
    ordering: 2,
    description: "Building responsive, modern, type-safe web applications.",
    evidence: "Commercial intern project at Crobstacle Ventures LLP and flagship VeyloPrep application.",
  },
  {
    id: "databases",
    category: "Databases",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Supabase"],
    ordering: 3,
    description: "Relational and document storage, schema design, and secure integrations.",
    evidence: "Supabase backend in Split-Sync, PostgreSQL configuration in VeyloPrep.",
  },
  {
    id: "cloud-devops",
    category: "Cloud / DevOps",
    skills: [
      "Google Cloud Platform",
      "Oracle Cloud Infrastructure Foundations",
      "Git",
      "GitHub",
    ],
    ordering: 4,
    description: "Cloud infrastructure deployment, resource management, and version control.",
    evidence: "Completed 20 Google Skill Boost badges and Oracle Cloud Infrastructure Foundations certification.",
  },
  {
    id: "foundations",
    category: "Foundations",
    skills: [
      "Data Structures & Algorithms",
      "OOP",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
    ],
    ordering: 5,
    description: "Solid computer science theory and backend systems design principles.",
    evidence: "UPES B.Tech Computer Science curriculum validation (8.24 CGPA).",
  },
];

// ── Social Links ──────────────────────────────────────────────
// URLs are placeholders — replace with verified links before launch.

export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    label: "GitHub profile",
    url: "https://github.com/krishika", // Placeholder — update before launch
    icon: "github",
  },
  {
    platform: "LinkedIn",
    label: "LinkedIn profile",
    url: "https://linkedin.com/in/krishika", // Placeholder — update before launch
    icon: "linkedin",
  },
];

// ── Navigation ────────────────────────────────────────────────
// Single source for nav items — consumed by Navigation component.

export const navigationItems: NavigationItem[] = [
  { label: "Home", href: "/#hero" },
  { label: "Works", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Journey", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
