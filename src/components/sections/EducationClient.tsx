"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { CountUp } from "@/components/motion/CountUp";
import { BaseLink } from "@/components/ui/BaseLink";
import { Icon, type IconName } from "@/components/ui/Icon";
import { destinations, sectionIds } from "@/config/navigation";
import type { Achievement, Education, Experience } from "@/types/content";
import { cn } from "@/lib/cn";
import styles from "./Education.module.css";

// ── Types ──────────────────────────────────────────────────────────────────

interface EducationClientProps {
  education: Education[];
  achievements: Achievement[];
  experience: Experience[];
  coursework: string[];
  resumeUrl?: string;
}

interface MilestoneCard {
  id: string;
  title: string;
  organization?: string;
  year: string;
  category: "all" | "cert" | "intern" | "dev";
  categoryLabel: string;
  details: string;
  iconName: IconName;
  href?: string;
}

// ── UPES University Emblem Component (Vector SVG) ──────────────────────────

function UpesEmblem() {
  return (
    <svg viewBox="0 0 100 100" className={styles.institutionLogoSvg} aria-label="UPES Logo" role="img">
      <circle cx="50" cy="50" r="48" fill="#FFFFFF" />
      {/* Interlocking modern U symbol */}
      <g transform="translate(25, 20)">
        <path
          d="M6 4 C6 24, 18 36, 26 36 C34 36, 44 24, 44 4"
          fill="none"
          stroke="#E03A26"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M16 4 C16 18, 22 26, 26 26 C30 26, 36 18, 36 4"
          fill="none"
          stroke="#1E2A4A"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>
      {/* Brand Typography */}
      <text
        x="50"
        y="72"
        textAnchor="middle"
        fill="#1E2A4A"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="17"
        fontWeight="800"
        letterSpacing="0.08em"
      >
        UPES
      </text>
      <text
        x="50"
        y="83"
        textAnchor="middle"
        fill="#666666"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="5.2"
        fontWeight="600"
        letterSpacing="0.06em"
      >
        UNIVERSITY OF TOMORROW
      </text>
    </svg>
  );
}

// ── Main Client Component ──────────────────────────────────────────────────

export function EducationClient({
  education,
  achievements,
  experience,
  coursework,
  resumeUrl,
}: EducationClientProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const edu = education[0];
  const nextDest = destinations[destinations.findIndex((d) => d.id === sectionIds.education) + 1];

  const handleScrollToGrid = useCallback(() => {
    const el = document.getElementById("education-archive");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Consolidate verified milestones dynamically from verified data
  const milestoneList: MilestoneCard[] = [
    ...achievements.map((item): MilestoneCard => {
      const isOci = item.id.includes("oci");
      const isGoogle = item.id.includes("google");
      return {
        id: item.id,
        title: item.title,
        organization: item.organization ?? (isGoogle ? "Google Cloud" : undefined),
        year: item.date ?? "2025",
        category: (isOci || isGoogle ? "cert" : "dev") as "cert" | "dev",
        categoryLabel: isOci ? "Certification" : isGoogle ? "Cloud Skills" : "Professional Dev",
        details:
          item.details ??
          (isOci
            ? "Certified foundations in OCI architecture, core cloud services, security, and governance."
            : "Professional communication, cross-functional collaboration, and workplace soft skills."),
        iconName: (isOci ? "shield" : isGoogle ? "cloud" : "award") as IconName,
      };
    }),
    ...experience.map((role): MilestoneCard => ({
      id: role.id,
      title: role.role,
      organization: role.organization,
      year: role.dates.start.split("-")[0] ?? "2025",
      category: "intern" as const,
      categoryLabel: "Internship",
      details: role.contributions[0] ?? "Full-stack software engineering and responsive web development.",
      iconName: (role.id === "crobstacle-ventures" ? "code" : "users") as IconName,
      href: "/#experience",
    })),
    {
      id: "gssoc-contributor",
      title: "Open Source Contributor",
      organization: "GirlScript Summer of Code",
      year: "2025",
      category: "dev" as const,
      categoryLabel: "Open Source",
      details: "Contributed accessible React & TypeScript UI components and documentation improvements.",
      iconName: "github" as IconName,
    },
  ];

  const filterTabs = [
    { id: "all", label: "All Milestones" },
    { id: "cert", label: "Certifications" },
    { id: "intern", label: "Internships" },
    { id: "dev", label: "Professional Dev" },
  ];

  const visibleMilestones =
    activeTab === "all"
      ? milestoneList
      : milestoneList.filter((m) => m.category === activeTab);

  return (
    <div className="relative">
      {/* ── Editorial Hero Band ────────────────────────────── */}
      <div className={styles.heroBand}>
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowNumber}>05</span>
            <span className={styles.eyebrowSlash}>/</span>
            <span className={styles.eyebrowText}>EDUCATION & ACHIEVEMENTS</span>
          </div>

          <div className={styles.titleWrapper}>
            <h2 id="education-title" className={styles.title}>
              Building a
              <br />
              stronger
              <br />
              foundation
              <br />
              for what&rsquo;s <span className={styles.mintText}>next.</span>
            </h2>

            {/* Handwritten annotation matching design */}
            <div className={styles.handwrittenAnnotation} aria-hidden="true">
              <span>Same Curiosity.</span>
              <span>Bigger</span>
              <span>Possibilities.</span>
              <svg className={styles.arrowSvg} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 8 C16 12, 20 20, 24 24 M24 24 L18 24 M24 24 L24 18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <p className={styles.description}>
            A blend of academic learning, hands-on projects, industry internships, and
            continuous upskilling that shapes my journey as a software engineer.
          </p>

          <div className={styles.ctaGroup}>
            {resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionBtn}
              >
                <span>View Resume</span>
                <Icon name="arrow-up-right" />
              </a>
            ) : (
              <button
                type="button"
                onClick={handleScrollToGrid}
                className={styles.actionBtn}
              >
                <span>Explore Academic Record</span>
                <Icon name="arrow-down" />
              </button>
            )}
          </div>
        </div>

        {/* Atmospheric window with study arch & quote */}
        <div className={styles.atmosphericWindow} aria-hidden="true">
          <Image
            src="/images/education/education-arch.jpg"
            alt="Scenic stone arch overlooking sunrise landscape with study table"
            width={1024}
            height={640}
            className={styles.archImage}
            priority={false}
          />
          <div className={styles.archOverlay} />
          <div className={styles.floatingQuote}>
            <span className={styles.quoteMark}>&ldquo;</span>
            <p className={styles.quoteText}>
              Learning today, building a <span className="font-semibold text-mint">better tomorrow.</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Multi-Column Archive Grid ─────────────────── */}
      <div id="education-archive" className={styles.archiveGrid}>
        {/* ── Left Column: Featured Education Panel (05.1) ─── */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <span className={styles.cardIcon} aria-hidden="true">
                <Icon name="mortarboard" />
              </span>
              <h3 className={styles.cardTitle}>Education</h3>
            </div>
            <span className={styles.cardBadge}>05.1</span>
          </div>

          {/* Institution Header with Emblem */}
          <div className={styles.institutionHeader}>
            <div className={styles.institutionLogo} aria-hidden="true">
              <UpesEmblem />
            </div>

            <div className={styles.degreeMetaGroup}>
              <h4 className={styles.degreeTitle}>
                {edu ? edu.degree : "B.Tech in Computer Science Engineering"}
              </h4>
              <p className={styles.institutionName}>
                {edu?.institution ?? "University of Petroleum and Energy Studies"}
                {edu?.location && `, ${edu.location}`}
              </p>
              <div className={styles.datesBadge}>
                <Icon name="calendar" />
                <span>
                  {edu ? `${edu.dates.start} – ${edu.dates.end ?? "2028"}` : "2024 – 2028"} · On Campus
                </span>
              </div>
            </div>
          </div>

          <p className={styles.educationDescription}>
            Exploring computer science, building real-world projects, and developing a strong
            foundation in software engineering, systems design, problem-solving, and emerging cloud technologies.
          </p>

          {/* 3-Pillar Metrics Strip */}
          <div className={styles.metricsStrip}>
            <div className={styles.metricCard}>
              <Icon name="star" className={styles.metricIcon} />
              <span className={styles.metricLabel}>CGPA</span>
              <span className={styles.metricValue}>
                <span className={styles.cgpaHighlight}>
                  <CountUp value={edu?.result?.value.split("/")[0] ?? "8.24"} />
                </span>{" "}
                <span className="text-foreground-secondary text-xs font-normal">/ 10</span>
              </span>
            </div>

            <div className={styles.metricCard}>
              <Icon name="calendar" className={styles.metricIcon} />
              <span className={styles.metricLabel}>Current Status</span>
              <span className={styles.metricValue}>3rd Year</span>
            </div>

            <div className={styles.metricCard}>
              <Icon name="book-open" className={styles.metricIcon} />
              <span className={styles.metricLabel}>Degree</span>
              <span className={styles.metricValue}>B.Tech CSE</span>
            </div>
          </div>

          {/* Relevant Foundational Coursework */}
          <div className={styles.courseworkSection}>
            <h5 className={styles.courseworkHeading}>Relevant Coursework & Core Foundations</h5>
            <div className={styles.courseworkChips}>
              {coursework.map((course) => (
                <span key={course} className={styles.courseworkChip}>
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Column: Achievements & Activities (05.2) ── */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <span className={styles.cardIcon} aria-hidden="true">
                <Icon name="award" />
              </span>
              <h3 className={styles.cardTitle}>Achievements & Activities</h3>
            </div>
            <span className={styles.cardBadge}>05.2</span>
          </div>

          {/* Filter Tabs */}
          <div className={styles.filterTabs} role="tablist" aria-label="Achievement categories">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={cn(styles.tabBtn, activeTab === tab.id && styles.tabActive)}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Achievements Grid */}
          <div className={styles.achievementsGrid}>
            {visibleMilestones.map((item) => (
              <div key={item.id} className={styles.achievementCard}>
                <div>
                  <div className={styles.achievementTop}>
                    <div className={styles.achievementIconGroup}>
                      <div className={styles.achievementIconWrap}>
                        <Icon name={item.iconName} />
                      </div>
                      <span className={styles.achievementYear}>{item.year}</span>
                    </div>
                  </div>

                  <h4 className={styles.achievementTitle}>{item.title}</h4>
                  {item.organization && (
                    <p className={styles.achievementOrg}>{item.organization}</p>
                  )}
                  <p className={styles.achievementDetails}>{item.details}</p>
                </div>

                <div className={styles.achievementBottom}>
                  <span className={styles.categoryTag}>{item.categoryLabel}</span>
                  {item.href ? (
                    <BaseLink href={item.href} className="text-xs text-mint hover:underline inline-flex items-center gap-1">
                      <span>View</span>
                      <Icon name="arrow-up-right" />
                    </BaseLink>
                  ) : (
                    <span className={styles.verifiedBadge}>
                      <Icon name="check" className="text-mint text-xs" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Feature Bar ─────────────────────────────── */}
      <div className={styles.bottomBar}>
        <div className={styles.featurePills}>
          <div className={styles.featurePill}>
            <Icon name="mortarboard" className={styles.featureIcon} />
            <span className={styles.featureTitle}>Continuous Learning</span>
            <span className={styles.featureSubtitle}>· Exploring new technologies every day</span>
          </div>
          <div className={styles.featurePill}>
            <Icon name="code" className={styles.featureIcon} />
            <span className={styles.featureTitle}>Practical Experience</span>
            <span className={styles.featureSubtitle}>· From academic labs to real projects</span>
          </div>
          <div className={styles.featurePill}>
            <Icon name="award" className={styles.featureIcon} />
            <span className={styles.featureTitle}>Certifications & Milestones</span>
            <span className={styles.featureSubtitle}>· Building skills beyond the classroom</span>
          </div>
          <div className={styles.featurePill}>
            <Icon name="rocket" className={styles.featureIcon} />
            <span className={styles.featureTitle}>Aiming Higher</span>
            <span className={styles.featureSubtitle}>· Turning learning into opportunities</span>
          </div>
        </div>
      </div>

      {/* ── Closing Editorial Quote Strip ──────────────────── */}
      <div className={styles.quoteStrip}>
        <p className={styles.stripQuoteText}>
          &ldquo;Education is not just about learning facts, but about training the mind to think, build and create a <span className={styles.stripQuoteAccent}>better future.</span>&rdquo;
        </p>

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
