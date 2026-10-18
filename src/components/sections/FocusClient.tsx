"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { BaseLink } from "@/components/ui/BaseLink";
import { Icon, type IconName } from "@/components/ui/Icon";
import { destinations, sectionIds } from "@/config/navigation";
import { cn } from "@/lib/cn";
import styles from "./Focus.module.css";

// ── Types ──────────────────────────────────────────────────────────────────

export interface ProjectEvidence {
  name: string;
  slug: string;
  href: string;
}

export interface ExperienceEvidence {
  organization: string;
  role: string;
}

export interface AchievementEvidence {
  title: string;
  details?: string;
}

export interface DetailedSkillEvidence {
  projects: ProjectEvidence[];
  experience: ExperienceEvidence[];
  achievements: AchievementEvidence[];
}

export interface CapabilityItem {
  name: string;
  evidence: string[];
  detailed?: DetailedSkillEvidence;
}

export interface CapabilityClusterData {
  id: string;
  label: string;
  capabilities: CapabilityItem[];
}

interface FocusClientProps {
  clusters: CapabilityClusterData[];
  evidenceMap: Record<string, DetailedSkillEvidence>;
}

// ── Authentic Tech Icons (SVG vectors) ──────────────────────────────────────

function TechIcon({ name }: { name: string }) {
  const norm = name.toLowerCase();

  if (norm.includes("next")) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <circle cx="12" cy="12" r="10" fill="#000" stroke="#fff" strokeWidth="1.2" />
        <path
          d="m14.9 16.5-6.8-8.8h1.8l5.8 7.6v-7.6h1.5v8.8h-2.3Z"
          fill="#fff"
        />
      </svg>
    );
  }
  if (norm.includes("react")) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#61DAFB" strokeWidth="1.6">
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
      </svg>
    );
  }
  if (norm.includes("typescript")) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M5 8h6v2.2H9v7.8H7v-7.8H5V8Zm7 6.2c.7.5 1.5.8 2.3.8.7 0 1.1-.3 1.1-.7 0-.5-.5-.7-1.4-1-1.3-.5-2.2-1.1-2.2-2.3 0-1.4 1.1-2.4 2.7-2.4 1 0 1.9.3 2.5.8l-.6 1.8c-.5-.4-1.2-.6-1.9-.6-.6 0-1 .3-1 .6 0 .4.4.6 1.3.9 1.5.5 2.3 1.2 2.3 2.4 0 1.5-1.1 2.5-2.9 2.5-1.1 0-2.2-.4-2.8-1l.7-1.7Z" fill="#fff" />
      </svg>
    );
  }
  if (norm.includes("javascript")) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path d="M6 18.5l1.6-.9c.3.6.7 1 1.4 1 .7 0 1.1-.3 1.1-.9v-5.2h2v5.2c0 1.6-1 2.4-2.6 2.4-1.6 0-2.6-.9-3.5-1.6Zm7.5-.4l1.6-1c.5.8 1.1 1.3 2 1.3.8 0 1.3-.4 1.3-1 0-.6-.4-.9-1.5-1.3-1.6-.6-2.5-1.3-2.5-2.6 0-1.5 1.2-2.6 2.8-2.6 1.2 0 2.1.4 2.8 1.2l-1.5 1c-.4-.5-.8-.8-1.4-.8-.6 0-1 .3-1 .7 0 .5.4.7 1.4 1.1 1.7.6 2.7 1.3 2.7 2.7 0 1.7-1.3 2.7-3.1 2.7-1.7 0-2.9-.8-3.6-2.4Z" fill="#000" />
      </svg>
    );
  }
  if (norm.includes("postgres")) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#336791" strokeWidth="1.6">
        <ellipse cx="12" cy="7" rx="8" ry="3.5" />
        <path d="M4 7v10c0 1.9 3.6 3.5 8 3.5s8-1.6 8-3.5V7" />
        <path d="M4 12c0 1.9 3.6 3.5 8 3.5s8-1.6 8-3.5" />
      </svg>
    );
  }
  if (norm.includes("mongo")) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path d="M12 2C12 2 6 8.5 6 14.5C6 18.6 9.4 22 12 22C14.6 22 18 18.6 18 14.5C18 8.5 12 2 12 2Z" fill="#47A248" />
        <path d="M12 3V21" stroke="#fff" strokeWidth="1.2" />
      </svg>
    );
  }
  if (norm.includes("mysql")) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#00758F" strokeWidth="1.6">
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M7 16V8l5 5 5-5v8" />
      </svg>
    );
  }
  if (norm.includes("supabase")) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path d="M13.5 2 4 13.5h7L9.5 22 20 9.5h-6.5L13.5 2Z" fill="#3ECF8E" />
      </svg>
    );
  }
  if (norm.includes("python")) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3l.01 1.4h2.9v.4H6.2S3.8 4.8 3.8 8c0 3.2 2.1 3.1 2.1 3.1h1.3V9.2s-.1-2.2 2.2-2.2h3.8s2.1.04 2.1-2.1c0-2.1-1.8-2.9-3.4-2.9ZM9.5 4a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4Z" fill="#3776AB" />
        <path d="M12.1 22c3.1 0 2.9-1.3 2.9-1.3l-.01-1.4h-2.9v-.4h5.7s2.4.3 2.4-2.9c0-3.2-2.1-3.1-2.1-3.1h-1.3v1.9s.1 2.2-2.2 2.2h-3.8s-2.1-.04-2.1 2.1c0 2.1 1.8 2.9 3.4 2.9Zm2.4-2a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4Z" fill="#FFD438" />
      </svg>
    );
  }
  if (norm === "java") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#EA2D2E" strokeWidth="1.6">
        <path d="M17 10h1a3 3 0 0 1 0 6h-1M4 10h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-6ZM7 3c1 1.5 0 3-1 4M11 3c1 1.5 0 3-1 4M15 3c1 1.5 0 3-1 4" />
      </svg>
    );
  }
  if (norm === "c") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path d="M12 2l8.5 5v10L12 22 3.5 17V7L12 2Z" fill="#659AD2" />
        <path d="M15.5 8.5a4.5 4.5 0 1 0 0 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (norm.includes("git") && !norm.includes("hub")) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <circle cx="12" cy="12" r="10" fill="#F05032" />
        <path d="M16 11l-3-3m0 0l-3 3m3-3v8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (norm.includes("github")) {
    return <Icon name="github" className="text-white" />;
  }
  if (norm.includes("cloud") || norm.includes("gcp") || norm.includes("oracle")) {
    return <Icon name="cloud" className="text-mint" />;
  }
  if (norm.includes("data") || norm.includes("structure") || norm.includes("algorithm")) {
    return <Icon name="cpu" className="text-mint" />;
  }
  if (norm.includes("oop") || norm.includes("system") || norm.includes("network")) {
    return <Icon name="layers" className="text-mint" />;
  }
  if (norm.includes("dbms") || norm.includes("sql")) {
    return <Icon name="database" className="text-mint" />;
  }

  return <Icon name="code" className="text-mint" />;
}

// ── Verified Tools Catalog ──────────────────────────────────────────────────

interface ToolItem {
  name: string;
  category: "dev" | "design" | "cloud" | "productivity";
  iconName: IconName;
}

const verifiedTools: ToolItem[] = [
  { name: "VS Code", category: "dev", iconName: "code" },
  { name: "GitHub", category: "dev", iconName: "github" },
  { name: "Vercel", category: "cloud", iconName: "trend-up" },
  { name: "Supabase", category: "cloud", iconName: "database" },
  { name: "Postman", category: "design", iconName: "compass" },
  { name: "Figma", category: "design", iconName: "sparkle" },
  { name: "Slack", category: "productivity", iconName: "users" },
  { name: "Notion", category: "productivity", iconName: "briefcase" },
];

// ── Verified Competencies (replacing fabricated percentages) ───────────────

interface CompetencyItem {
  name: string;
  scope: string;
  detail: string;
  evidence: string;
}

const verifiedCompetencies: CompetencyItem[] = [
  {
    name: "Next.js & React Architecture",
    scope: "Full-Stack",
    detail: "App Router, Server Components, SSR & Client hydration boundaries.",
    evidence: "Split-Sync, Crobstacle Ventures",
  },
  {
    name: "TypeScript & Static Contracts",
    scope: "Type Safety",
    detail: "Strict compiler constraints, validated data schemas, zero runtime cost.",
    evidence: "VeyloPrep, Crobstacle Ventures",
  },
  {
    name: "Relational & Document Data",
    scope: "Databases",
    detail: "PostgreSQL, Supabase, MySQL with per-table Row-Level Security policies.",
    evidence: "Split-Sync, VeyloPrep, Roomie Match",
  },
  {
    name: "REST APIs & Backend Security",
    scope: "Backend",
    detail: "Stateless JWT authentication, Spring Boot 3.2, role-based access control.",
    evidence: "Roomie Match, Split-Sync",
  },
  {
    name: "Systems & Algorithms",
    scope: "Foundations",
    detail: "Data structures, time complexity analysis, clean modular OOP architecture.",
    evidence: "UPES Computer Science B.Tech",
  },
  {
    name: "Cloud & Delivery Pipelines",
    scope: "Cloud & CI/CD",
    detail: "Oracle Cloud Certified, Google Cloud Study Jams, Vercel deployments.",
    evidence: "OCI Foundations, Google Cloud",
  },
];

// ── Main Client Component ──────────────────────────────────────────────────

export function FocusClient({ clusters, evidenceMap }: FocusClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [toolFilter, setToolFilter] = useState<string>("all");

  // Scroll to skills matrix
  const handleScrollToMatrix = useCallback(() => {
    const el = document.getElementById("focus-matrix");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Category filter tabs
  const categoryTabs = [
    { id: "all", label: "All Technologies" },
    ...clusters.map((c) => ({ id: c.id, label: c.label })),
  ];

  // Filtered skills
  const filteredClusters =
    activeCategory === "all"
      ? clusters
      : clusters.filter((c) => c.id === activeCategory);

  // All visible skills for the selected tab
  const visibleSkills = filteredClusters.flatMap((c) =>
    c.capabilities.map((cap) => ({
      ...cap,
      categoryId: c.id,
      categoryLabel: c.label,
    }))
  );

  // Selected skill evidence
  const selectedEvidence = selectedSkill ? evidenceMap[selectedSkill.toLowerCase().replace(/\.js$/, "").trim()] : null;
  const selectedSkillCluster = selectedSkill
    ? clusters.find((c) => c.capabilities.some((cap) => cap.name === selectedSkill))
    : null;

  // Filtered tools
  const visibleTools =
    toolFilter === "all"
      ? verifiedTools
      : verifiedTools.filter((t) => t.category === toolFilter);

  // Next destination
  const nextDest = destinations[destinations.findIndex((d) => d.id === sectionIds.focus) + 1];

  return (
    <div className="relative">
      {/* ── Editorial Hero Band ────────────────────────────── */}
      <div className={styles.heroBand}>
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowNumber}>04</span>
            <span className={styles.eyebrowSlash}>/</span>
            <span className={styles.eyebrowText}>SKILLS & ENGINEERING FOCUS</span>
          </div>

          <div className={styles.titleWrapper}>
            <h2 id="focus-title" className={styles.title}>
              Turning
              <br />
              ideas into
              <br />
              <span className={styles.mintText}>real solutions.</span>
            </h2>

            {/* Handwritten annotation from design */}
            <div className={styles.handwrittenAnnotation} aria-hidden="true">
              <span>Technologies</span>
              <span>Tools</span>
              <span>Mindset</span>
              <span>Continuous</span>
              <span>Growth.</span>
              <svg className={styles.arrowSvg} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 8 C16 12, 20 20, 24 24 M24 24 L18 24 M24 24 L24 18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <p className={styles.description}>
            A blend of modern technologies, problem-solving skills, and a continuous
            learning mindset to build meaningful, accessible, and user-focused products.
            Every skill is connected to genuine project or internship evidence.
          </p>

          <div className={styles.ctaGroup}>
            <button
              type="button"
              onClick={handleScrollToMatrix}
              className={styles.exploreBtn}
            >
              <span>Explore My Skills</span>
              <Icon name="arrow-down" />
            </button>
          </div>
        </div>

        {/* Atmospheric window with arch illustration & quote card */}
        <div className={styles.atmosphericWindow} aria-hidden="true">
          <Image
            src="/images/skills/skills-arch.jpg"
            alt="Scenic stone arch overlooking sunrise landscape"
            width={1024}
            height={640}
            className={styles.archImage}
            priority={false}
          />
          <div className={styles.archOverlay} />
          <div className={styles.floatingQuote}>
            <span className={styles.quoteMark}>&ldquo;</span>
            <p className={styles.quoteText}>
              The right technologies turn curiosity into <span className={styles.quoteMint}>impact.</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── 6-Card Editorial Grid ──────────────────────────── */}
      <div id="focus-matrix" className={styles.editorialGrid}>
        {/* ── Card 1: Core Strengths (col-span 3) ──────────── */}
        <div className={cn(styles.card, styles.colCoreStrengths)}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <span className={styles.cardIcon} aria-hidden="true">
                <Icon name="sparkle" />
              </span>
              <h3 className={styles.cardTitle}>Core Strengths</h3>
            </div>
          </div>

          <div className={styles.strengthsList}>
            <div className={styles.strengthItem}>
              <div className={styles.strengthIconWrap}>
                <Icon name="lightbulb" />
              </div>
              <div className={styles.strengthText}>
                <h4 className={styles.strengthTitle}>Problem Solving</h4>
                <p className={styles.strengthDesc}>Breaking down complex problems into practical, reliable solutions.</p>
              </div>
            </div>

            <div className={styles.strengthItem}>
              <div className={styles.strengthIconWrap}>
                <Icon name="users" />
              </div>
              <div className={styles.strengthText}>
                <h4 className={styles.strengthTitle}>Learning & Adaptability</h4>
                <p className={styles.strengthDesc}>Exploring new technologies and applying them effectively in production.</p>
              </div>
            </div>

            <div className={styles.strengthItem}>
              <div className={styles.strengthIconWrap}>
                <Icon name="trend-up" />
              </div>
              <div className={styles.strengthText}>
                <h4 className={styles.strengthTitle}>Product Thinking</h4>
                <p className={styles.strengthDesc}>Building user-focused and impactful software with measurable utility.</p>
              </div>
            </div>

            <div className={styles.strengthItem}>
              <div className={styles.strengthIconWrap}>
                <Icon name="briefcase" />
              </div>
              <div className={styles.strengthText}>
                <h4 className={styles.strengthTitle}>Collaboration</h4>
                <p className={styles.strengthDesc}>Working effectively in teams and communicating ideas clearly via Git.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Card 2: Technical Skills / Atlas (col-span 6) ── */}
        <div className={cn(styles.card, styles.colTechnicalAtlas)}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <span className={styles.cardIcon} aria-hidden="true">
                <Icon name="code" />
              </span>
              <h3 className={styles.cardTitle}>Technical Skills</h3>
            </div>
            <span className={styles.cardBadge}>01</span>
          </div>

          {/* Category Tabs */}
          <div className={styles.categoryTabs} role="tablist" aria-label="Skill categories">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeCategory === tab.id}
                className={cn(styles.tabBtn, activeCategory === tab.id && styles.tabActive)}
                onClick={() => {
                  setActiveCategory(tab.id);
                  setSelectedSkill(null);
                }}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Interactive Nodes Grid */}
          <div className={styles.nodesGrid} role="region" aria-label="Interactive skill nodes">
            {visibleSkills.map((skill) => {
              const isSelected = selectedSkill === skill.name;
              const hasEvidence = skill.evidence && skill.evidence.length > 0;

              return (
                <button
                  key={skill.name}
                  type="button"
                  aria-pressed={isSelected}
                  className={cn(
                    styles.techNode,
                    isSelected && styles.techNodeSelected
                  )}
                  onClick={() => {
                    setSelectedSkill(isSelected ? null : skill.name);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape" && isSelected) {
                      setSelectedSkill(null);
                    }
                  }}
                >
                  <div className={styles.techIconWrap}>
                    <TechIcon name={skill.name} />
                  </div>
                  <span className={styles.techName}>{skill.name}</span>
                  {hasEvidence && (
                    <span
                      className={styles.evidenceDot}
                      title="Verified project evidence linked"
                      aria-label="Verified evidence available"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Evidence Inspector Drawer */}
          {selectedSkill ? (
            <div className={styles.evidenceInspector} aria-live="polite">
              <div className={styles.inspectorHeader}>
                <div className={styles.inspectorTitleGroup}>
                  <span className={styles.inspectorCategory}>
                    {selectedSkillCluster?.label ?? "Engineering Toolkit"}
                  </span>
                  <h4 className={styles.inspectorSkillName}>{selectedSkill}</h4>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSkill(null)}
                  className={styles.closeBtn}
                  aria-label="Close evidence inspector"
                >
                  <Icon name="close" />
                </button>
              </div>

              <div className={styles.inspectorBody}>
                {selectedEvidence && (selectedEvidence.projects.length > 0 || selectedEvidence.experience.length > 0 || selectedEvidence.achievements.length > 0) ? (
                  <>
                    {selectedEvidence.projects.length > 0 && (
                      <div>
                        <p className={styles.evidenceSectionTitle}>Applied In Projects</p>
                        <div className={styles.evidenceChips}>
                          {selectedEvidence.projects.map((proj) => (
                            <BaseLink
                              key={proj.name}
                              href={proj.href}
                              className={styles.evidenceChip}
                            >
                              <Icon name="sparkle" />
                              <span>{proj.name}</span>
                              <Icon name="arrow-up-right" />
                            </BaseLink>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedEvidence.experience.length > 0 && (
                      <div>
                        <p className={styles.evidenceSectionTitle}>Professional Experience</p>
                        <div className={styles.evidenceChips}>
                          {selectedEvidence.experience.map((exp) => (
                            <span key={exp.organization} className={styles.evidenceChip}>
                              <Icon name="briefcase" />
                              <span>{exp.organization} ({exp.role})</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedEvidence.achievements.length > 0 && (
                      <div>
                        <p className={styles.evidenceSectionTitle}>Certifications & Achievements</p>
                        <div className={styles.evidenceChips}>
                          {selectedEvidence.achievements.map((ach) => (
                            <span key={ach.title} className={styles.evidenceChip}>
                              <Icon name="check-circle" />
                              <span>{ach.title}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p className={styles.evidencePrompt}>
                    Foundational engineering competency within the B.Tech Computer Science curriculum. No external project evidence is attached.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p className={styles.evidencePrompt}>
              Select any technology node with a mint indicator dot to inspect linked project and experience evidence.
            </p>
          )}
        </div>

        {/* ── Card 3: Engineering Competencies (col-span 3) ── */}
        <div className={cn(styles.card, styles.colCompetencies)}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <span className={styles.cardIcon} aria-hidden="true">
                <Icon name="chart-bar" />
              </span>
              <h3 className={styles.cardTitle}>Competencies</h3>
            </div>
            <span className={styles.cardBadge}>02</span>
          </div>

          <div className={styles.competenciesList}>
            {verifiedCompetencies.map((comp) => (
              <div key={comp.name} className={styles.competencyItem}>
                <div className={styles.competencyTop}>
                  <span className={styles.competencyName}>{comp.name}</span>
                  <span className={styles.competencyBadge}>{comp.scope}</span>
                </div>
                <p className={styles.competencyDetail}>{comp.detail}</p>
                <div className={styles.competencyEvidence}>
                  <Icon name="check" />
                  <span>{comp.evidence}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Card 4: Tools I Use (col-span 4) ──────────────── */}
        <div className={cn(styles.card, styles.colTools)}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <span className={styles.cardIcon} aria-hidden="true">
                <Icon name="settings" />
              </span>
              <h3 className={styles.cardTitle}>Tools I Use</h3>
            </div>
            <span className={styles.cardBadge}>03</span>
          </div>

          <div className={styles.toolsFilter}>
            {[
              { id: "all", label: "All" },
              { id: "dev", label: "Dev" },
              { id: "design", label: "Design/API" },
              { id: "cloud", label: "Cloud" },
              { id: "productivity", label: "Docs" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                className={cn(styles.toolFilterBtn, toolFilter === f.id && styles.toolFilterActive)}
                onClick={() => setToolFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className={styles.toolsGrid}>
            {visibleTools.map((tool) => (
              <div key={tool.name} className={styles.toolCard}>
                <div className={styles.toolIconWrap}>
                  <Icon name={tool.iconName} className="text-mint text-base" />
                </div>
                <span className={styles.toolName}>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Card 5: Currently Exploring (col-span 5) ──────── */}
        <div className={cn(styles.card, styles.colExploring)}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <span className={styles.cardIcon} aria-hidden="true">
                <Icon name="compass" />
              </span>
              <h3 className={styles.cardTitle}>Currently Exploring</h3>
            </div>
            <span className={styles.cardBadge}>04</span>
          </div>

          <div className={styles.exploringGrid}>
            <div className={styles.exploringCard}>
              <div className={styles.exploringIconWrap}>
                <Icon name="layers" />
              </div>
              <h4 className={styles.exploringTitle}>System Design</h4>
              <p className={styles.exploringDesc}>
                Scalable architectures, microservices boundaries, and distributed database patterns.
              </p>
            </div>

            <div className={styles.exploringCard}>
              <div className={styles.exploringIconWrap}>
                <Icon name="cloud" />
              </div>
              <h4 className={styles.exploringTitle}>Cloud Platforms</h4>
              <p className={styles.exploringDesc}>
                Exploring serverless runtimes, edge computing, and cloud deployment pipelines.
              </p>
            </div>

            <div className={styles.exploringCard}>
              <div className={styles.exploringIconWrap}>
                <Icon name="cpu" />
              </div>
              <h4 className={styles.exploringTitle}>Advanced DSA</h4>
              <p className={styles.exploringDesc}>
                Strengthening algorithmic problem-solving, graph algorithms, and complexity bounds.
              </p>
            </div>
          </div>
        </div>

        {/* ── Card 6: Continuous Growth (col-span 3) ────────── */}
        <div className={cn(styles.card, styles.colGrowth)}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <span className={styles.cardIcon} aria-hidden="true">
                <Icon name="trend-up" />
              </span>
              <h3 className={styles.cardTitle}>Continuous Growth</h3>
            </div>
            <span className={styles.cardBadge}>05</span>
          </div>

          <div className={styles.growthBody}>
            <div className={styles.growthList}>
              <div className={styles.growthItem}>
                <Icon name="check-circle" className={styles.growthCheck} />
                <span className={styles.growthLabel}>Building real-world production projects</span>
              </div>
              <div className={styles.growthItem}>
                <Icon name="check-circle" className={styles.growthCheck} />
                <span className={styles.growthLabel}>Adopting modern web standards & patterns</span>
              </div>
              <div className={styles.growthItem}>
                <Icon name="check-circle" className={styles.growthCheck} />
                <span className={styles.growthLabel}>Strengthening algorithmic problem-solving</span>
              </div>
              <div className={styles.growthItem}>
                <Icon name="check-circle" className={styles.growthCheck} />
                <span className={styles.growthLabel}>Exploring full user-centric product cycles</span>
              </div>
            </div>

            <div className={styles.growthAnnotation} aria-hidden="true">
              <span className={styles.growthHandwriting}>
                Better Skills
                <br />
                Brighter Opportunities.
              </span>
              <svg className={styles.growthArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 6 C12 6, 18 12, 18 18 M18 18 L14 16 M18 18 L16 14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Feature Bar & Next Destination ──────────── */}
      <div className={styles.bottomBar}>
        <div className={styles.featurePills}>
          <div className={styles.featurePill}>
            <Icon name="code" className={styles.featureIcon} />
            <span className={styles.featureTitle}>Modern Technologies</span>
            <span className={styles.featureSubtitle}>· Tools for real-world impact</span>
          </div>
          <div className={styles.featurePill}>
            <Icon name="lightbulb" className={styles.featureIcon} />
            <span className={styles.featureTitle}>Practical Learning</span>
            <span className={styles.featureSubtitle}>· Concept to implementation</span>
          </div>
          <div className={styles.featurePill}>
            <Icon name="users" className={styles.featureIcon} />
            <span className={styles.featureTitle}>Continuous Improvement</span>
            <span className={styles.featureSubtitle}>· Always learning, always building</span>
          </div>
          <div className={styles.featurePill}>
            <Icon name="sparkle" className={styles.featureIcon} />
            <span className={styles.featureTitle}>Meaningful Impact</span>
            <span className={styles.featureSubtitle}>· Solving real problems</span>
          </div>
        </div>

        {nextDest && (
          <BaseLink
            href={nextDest.href}
            className={styles.scrollCue}
            aria-label={`Scroll to next section: ${nextDest.label}`}
          >
            <div className={styles.scrollTextGroup}>
              <span className={styles.scrollSubtitle}>Scroll to Next</span>
              <span className="text-xs font-semibold text-foreground">
                0{nextDest.number} {nextDest.label}
              </span>
            </div>
            <span className={styles.scrollCircle} aria-hidden="true">
              <Icon name="arrow-down" />
            </span>
          </BaseLink>
        )}
      </div>
    </div>
  );
}
