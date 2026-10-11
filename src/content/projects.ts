import type { Project } from "@/types/content";

// Verified project data — the single source for the homepage, project pages
// and metadata. Every statement traces to: the resume, owner-supplied
// material (live links, images), or the project's public repository (source
// code, README, migrations), checked against the code. Each case study lists
// its sources. Do not add claims that cannot be traced the same way.

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
    // Stack confirmed by the owner from the live application (Vite build
    // with Supabase) and the project's architecture diagram.
    technologies: ["React", "TypeScript", "Vite", "Supabase", "PostgreSQL", "Capacitor"],
    platforms: ["Web", "Android"],
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
    caseStudy: {
      overview: [
        "VeyloPrep is a cross-platform career and placement management application. It brings applications, opportunities, deadlines and career resources into one workspace, organised as modular workflows with persistent data behind each feature.",
        "The same application runs on the web and on Android: Capacitor extends the web app to Android, packages it natively and produces a signed release build.",
      ],
      highlights: [
        { title: "Tracking", items: ["Application tracking", "Opportunity tracking", "Deadlines"] },
        { title: "Workspace", items: ["Career resources", "Modular workflows", "Persistent data management"] },
        { title: "Android", items: ["Android extension", "Native packaging", "Signed release build"] },
      ],
      gallery: [
        {
          image: {
            src: "/images/projects/veyloprep/tracker.png",
            alt: "VeyloPrep Applications screen: an active pipeline with filters for all, applied and assessment, listing applications with statuses such as OA scheduled, interview and offer.",
            width: 364,
            height: 856,
          },
          caption: "Tracker — applications in an active pipeline, filtered by stage.",
        },
        {
          image: {
            src: "/images/projects/veyloprep/today.png",
            alt: "VeyloPrep Today screen: the next milestone, today’s timeline and a list of upcoming items with dates.",
            width: 364,
            height: 856,
          },
          caption: "Today — the next milestone, the day’s timeline and what is coming up.",
        },
        {
          image: {
            src: "/images/projects/veyloprep/job-hub.png",
            alt: "VeyloPrep Job Hub screen: a searchable directory of job portals such as LinkedIn Jobs, Wellfound, Indeed and Glassdoor.",
            width: 364,
            height: 856,
          },
          caption: "Job Hub — a searchable directory of job portals.",
        },
      ],
      architecture: {
        summary: [
          "One React and TypeScript codebase, built with Vite, serves both platforms. The web app is deployed on Vercel; Capacitor packages the same application for Android as an APK.",
          "Behind the interface, the application layer uses Supabase for authentication and data access, with PostgreSQL as the database.",
        ],
        figure: {
          image: {
            src: "/images/projects/veyloprep/architecture.png",
            alt: "VeyloPrep system architecture diagram.",
            width: 1024,
            height: 576,
          },
          caption: "VeyloPrep system architecture.",
          description:
            "Users reach VeyloPrep on the web (as a progressive web app) and through a Capacitor mobile app. Both run a React and TypeScript application built with Vite. The VeyloPrep application layer connects to Supabase Auth and the Supabase API, which sit on a PostgreSQL database. Deployment: the web app on Vercel; Android through Capacitor to an APK; iOS through Capacitor, marked as in development.",
        },
      },
      sources: ["Live application", "Project architecture diagram", "Resume"],
    },
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
    technologies: ["Next.js", "React", "JavaScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Gemini API"],
    platforms: ["Web"],
    links: {
      live: "https://splitsync-app.vercel.app/",
      repository: "https://github.com/krishika08/splitsync-app",
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
    caseStudy: {
      overview: [
        "Split-Sync is a full-stack expense-sharing application. A group logs shared expenses, balances recalculate automatically and members settle up, with personal expense tracking and monthly budgets alongside group activity.",
        "It is built with Next.js and Supabase. Supabase provides authentication, the PostgreSQL database and realtime notifications; receipt images are read by Google Gemini through a server-side API route.",
      ],
      context:
        "Splitting shared costs by hand leads to forgotten payments, disputes and spreadsheet fatigue. Split-Sync keeps a shared ledger for each group and works out who owes whom.",
      highlights: [
        {
          title: "Splitting",
          items: ["Equal, exact-amount and percentage splits", "Receipt scanning with Google Gemini", "Personal expenses with monthly budgets"],
        },
        {
          title: "Settling up",
          items: ["Balances recalculated automatically", "Simplified settlement transfers", "One-tap settle up"],
        },
        {
          title: "Platform",
          items: ["Supabase authentication", "Realtime in-app notifications", "Spending analytics", "Installable web app manifest"],
        },
      ],
      gallery: [
        {
          image: {
            src: "/images/projects/split-sync/dashboard.png",
            alt: "Split-Sync dashboard: net balance with amounts owed and owing, and links to analytics and the personal tracker.",
            width: 1706,
            height: 1268,
          },
          caption: "Dashboard — net balance, what you are owed and what you owe.",
        },
        {
          image: {
            src: "/images/projects/split-sync/group-view.png",
            alt: "Split-Sync groups view: shared groups, each opening its shared ledger, plus direct expenses.",
            width: 1489,
            height: 1056,
          },
          caption: "Groups — each shared group opens its own ledger.",
        },
        {
          image: {
            src: "/images/projects/split-sync/receipt-scanner.png",
            alt: "Split-Sync Scan Receipt dialog: upload a receipt image or take a photo, then extract it.",
            width: 768,
            height: 1006,
          },
          caption: "Receipt scanning — upload or photograph a receipt to extract it.",
        },
        {
          image: {
            src: "/images/projects/split-sync/analytics.png",
            alt: "Split-Sync Analytics and Reports: totals for a selected period, spending by category and monthly spending.",
            width: 1634,
            height: 1440,
          },
          caption: "Analytics — spending by category and month for a chosen period.",
        },
      ],
      architecture: {
        summary: [
          "The Next.js App Router pages sit on a `services/` layer of ten modules that hold most data access, each returning the same `{ success, data, error }` shape.",
          "Supabase provides email and password authentication, the PostgREST data API, realtime subscriptions and PostgreSQL with row-level security policies per table.",
          "Receipt scanning is the server-side path: the browser posts the image to `POST /api/scan-receipt`, which calls the Gemini API with a key that exists only on the server.",
        ],
        figure: {
          image: {
            src: "/images/projects/split-sync/architecture.png",
            alt: "Split-Sync architecture diagram.",
            width: 1536,
            height: 1024,
          },
          caption: "Split-Sync architecture, from the project repository.",
          description:
            "The browser client is organised into app/ (Next.js App Router pages), components/ (reusable UI), services/ (the data-access layer) and lib/ (client setup and hooks). Through the Supabase JS SDK it uses Supabase Auth (email and password), PostgREST for data, Realtime for notifications, and PostgreSQL with per-table RLS policies. Separately, a server-side fetch reaches a Next.js API route, POST /api/scan-receipt, which calls the Google Gemini API for receipt OCR.",
        },
      },
      decisions: [
        {
          title: "Cent-accurate splits",
          detail:
            "Equal splits are computed in integer cents. The remainder is handed out one cent at a time to the first members, so the shares always add up to the original amount. Exact-amount splits are validated against the total before they are saved.",
        },
        {
          title: "Simplified settlements",
          detail:
            "`simplifyDebts()` separates members who are owed from members who owe, sorts both by amount and matches the largest first, turning a web of balances into a short list of transfers.",
        },
        {
          title: "One shape for data access",
          detail:
            "Data access is organised into ten service modules. Each returns `{ success, data, error }`, so pages handle results and failures the same way everywhere.",
        },
        {
          title: "The AI key stays on the server",
          detail:
            "Receipt OCR runs in a Next.js API route that reads `GEMINI_API_KEY` from the server environment, so the key is never shipped to the browser.",
        },
      ],
      challenges: [
        {
          title: "Row-level security without recursion",
          detail:
            "Group data is protected by row-level security policies. Policies that checked group membership referenced the `group_members` table from within its own rules, which caused infinite-recursion errors. The migration history records the fixes: of 22 migrations, four target the recursion directly and three more revise the policies. The repository also includes an RLS smoke-test script.",
        },
      ],
      sources: ["Public repository: source code, README and 22 SQL migrations", "Live application"],
    },
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
    caseStudy: {
      overview: [
        "Engineered.dev is a developer-focused technical publication platform. It publishes writing on cloud computing, backend engineering, system design and software architecture.",
        "It is built with Next.js, React, Firebase and Payload CMS, with dynamic content management, responsive interfaces and SEO optimisation.",
      ],
      highlights: [
        {
          title: "Topics",
          items: ["Cloud computing", "Backend engineering", "System design", "Software architecture"],
        },
        {
          title: "Platform",
          items: ["Dynamic content management", "Responsive interfaces", "SEO optimisation"],
        },
      ],
      sources: ["Resume"],
    },
  },
  {
    slug: "roomie-match",
    name: "Roomie Match",
    summary:
      "Roommate-matching system for university hostels: a Spring Boot REST API scores lifestyle compatibility between students, with separate access for hostel managers, wardens and students.",
    capabilities: [
      "Weighted compatibility scoring",
      "Per-trait score breakdown",
      "Role-based access control",
      "JWT authentication",
      "Bulk student onboarding",
      "Roommate requests and room assignment",
    ],
    technologies: ["Java", "Spring Boot", "Spring Security", "JWT", "MySQL", "REST APIs", "JavaScript"],
    links: {
      repository: "https://github.com/krishika08/RoomieMatch-AI",
    },
    tier: "additional",
    order: 4,
    caseStudy: {
      overview: [
        "Roomie Match pairs students in university hostels by lifestyle compatibility. Each student fills in a profile; the backend scores it against other students’ profiles across seven traits (sleep schedule, cleanliness, noise tolerance, social level, study habits, guest frequency and room temperature) and ranks the matches, with a breakdown for every trait.",
        "It is a Spring Boot 3.2 REST API on Java 17, using Spring Data JPA with MySQL and stateless JWT authentication through Spring Security. The frontend is a set of HTML pages whose JavaScript calls the API with a bearer token.",
      ],
      highlights: [
        {
          title: "Matching",
          items: ["Weighted scoring across seven lifestyle traits", "Per-trait score breakdown", "Matches ranked by compatibility"],
        },
        {
          title: "Access",
          items: ["Manager, warden and student roles", "Role rules enforced per API path", "Stateless JWT with BCrypt-hashed passwords"],
        },
        {
          title: "Hostel operations",
          items: ["Bulk student onboarding from CSV or JSON", "Roommate requests, accepted or rejected", "Room assignment created on acceptance"],
        },
      ],
      sources: ["Public repository: Spring Boot source, pom.xml and security configuration"],
    },
  },
];
