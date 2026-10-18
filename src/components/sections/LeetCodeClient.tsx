"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BaseLink } from "@/components/ui/BaseLink";
import { Icon, type IconName } from "@/components/ui/Icon";
import { destinations, sectionIds } from "@/config/navigation";
import type { DSAJourney, DSAProblem, DSATopic, Profile } from "@/types/content";
import styles from "./LeetCode.module.css";

interface LeetCodeClientProps {
  journey: DSAJourney;
  profile: Profile;
}

// 8 Orbit angles for constellation layout (starting top, clockwise)
const ORBIT_ANGLES = [-90, -45, 0, 45, 90, 135, 180, 225];

export function LeetCodeClient({ journey, profile }: LeetCodeClientProps) {
  const nextDest = destinations[destinations.findIndex((d) => d.id === sectionIds.leetcode) + 1];
  const [selectedTopicId, setSelectedTopicId] = useState<string>("arrays");
  const [filterMode, setFilterMode] = useState<"topic" | "all">("topic");
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const currentTopic: DSATopic =
    journey.topics.find((t) => t.id === selectedTopicId) ?? journey.topics[0]!;

  const displayedProblems: DSAProblem[] =
    filterMode === "topic"
      ? journey.problems.filter((p) => p.topicId === selectedTopicId)
      : journey.problems;

  // Esc key listener for modal
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && lightboxOpen) {
        setLightboxOpen(false);
      }
    }
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen]);

  // Profile URL from profile or journey
  const profileUrl = (profile.social as { leetcode?: string })?.leetcode;

  return (
    <div className="relative" id="dsa-explorer">
      {/* ── 1. Hero Band ────────────────────────────────────────────── */}
      <div className={styles.heroBand}>
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowNumber}>07</span>
            <span className={styles.eyebrowSlash}>/</span>
            <span className={styles.eyebrowText}>LEETCODE & DSA · THE PROBLEM-SOLVING LAB</span>
          </div>

          <div className={styles.titleWrapper}>
            <h2 id="leetcode-title" className={styles.title}>
              {journey.title.line1}
              <br />
              {journey.title.line2}
              <br />
              <span className={styles.mintText}>{journey.title.accent}</span>
            </h2>

            {/* Handwritten annotation matching design reference */}
            <div className={styles.handwrittenAnnotation} aria-hidden="true">
              <span>{journey.handwrittenAnnotation.split(".")[0]}.</span>
              <span>{journey.handwrittenAnnotation.split(".")[1]?.trim()}</span>
              <svg className={styles.arrowSvg} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 8 C16 12, 20 20, 24 24 M24 24 L18 24 M24 24 L24 18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <p className={styles.description}>{journey.subtitle}</p>

          <div className={styles.heroActions}>
            <BaseLink href="#dsa-constellation" className={styles.primaryAction}>
              <span>Explore Problem Lab</span>
              <Icon name="arrow-down" className="size-4" />
            </BaseLink>

            {profileUrl ? (
              <a
                href={profileUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.secondaryAction}
              >
                <span>View LeetCode Profile</span>
                <Icon name="arrow-up-right" className="size-4" />
              </a>
            ) : (
              <BaseLink href="#streak-panel" className={styles.secondaryAction}>
                <span>View Streak Record</span>
                <Icon name="flame" className="size-4 text-accent" />
              </BaseLink>
            )}
          </div>
        </div>

        {/* Atmospheric window with arch, books, laptop, and sunset */}
        <div className={styles.atmosphericWindow} aria-hidden="true">
          <Image
            src={journey.archImage.src}
            alt={journey.archImage.alt}
            width={journey.archImage.width}
            height={journey.archImage.height}
            className={styles.archImage}
            priority={false}
          />
          <div className={styles.floatingQuote}>
            <span className={styles.quoteIcon}>&ldquo;</span>
            <p className={styles.quoteText}>{journey.quote}</p>
          </div>
        </div>
      </div>

      {/* ── 2. Main Content Grid ────────────────────────────────────── */}
      <div className={styles.mainGrid} id="dsa-constellation">
        {/* ── Left Column: Journey Principles & Streak ──────────────── */}
        <div className={styles.leftColumn}>
          {/* Top Sub-card: Practice Disciplines */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <div className={styles.cardIconBadge}>
                  <Icon name="trend-up" className="size-5" />
                </div>
                <div className={styles.cardTitleGroup}>
                  <h3 className={styles.cardTitle}>My LeetCode Journey</h3>
                  <span className={styles.cardSubtitle}>Tracking progress, one problem at a time.</span>
                </div>
              </div>
            </div>

            <div className={styles.statGrid}>
              <div className={styles.statTile}>
                <Icon name="target" className={styles.statTileIcon} />
                <span className={styles.statTileTitle}>Core Mindset</span>
                <span className={styles.statTileValue}>Algorithmic Logic</span>
              </div>
              <div className={styles.statTile}>
                <Icon name="flame" className={styles.statTileIcon} />
                <span className={styles.statTileTitle}>Discipline</span>
                <span className={styles.statTileValue}>Daily Consistency</span>
              </div>
              <div className={styles.statTile}>
                <Icon name="network" className={styles.statTileIcon} />
                <span className={styles.statTileTitle}>Patterns</span>
                <span className={styles.statTileValue}>Reusable Templates</span>
              </div>
              <div className={styles.statTile}>
                <Icon name="cpu" className={styles.statTileIcon} />
                <span className={styles.statTileTitle}>Optimization</span>
                <span className={styles.statTileValue}>Time & Space O(n)</span>
              </div>
            </div>
          </article>

          {/* Bottom Sub-card: Streak & Activity — PRIMARY FEATURE */}
          <article className={styles.streakPanel} id="streak-panel">
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <div className={styles.cardIconBadge}>
                  <Icon name="flame" className="size-5" />
                </div>
                <div className={styles.cardTitleGroup}>
                  <h3 className={styles.cardTitle}>Streak &amp; Activity</h3>
                  <span className={styles.cardSubtitle}>Verified practice consistency record</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className={styles.streakActionBtn}
                aria-label="Enlarge streak screenshot"
              >
                <Icon name="maximize" className="size-3.5" />
                <span>Enlarge</span>
              </button>
            </div>

            {/* Clickable Image Container */}
            <div
              className={styles.streakImageContainer}
              onClick={() => setLightboxOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setLightboxOpen(true);
                }
              }}
              aria-label="View enlarged streak screenshot"
            >
              <Image
                src={journey.streakImage.src}
                alt={journey.streakImage.alt}
                width={journey.streakImage.width}
                height={journey.streakImage.height}
                className={styles.streakImage}
              />
              <div className={styles.streakOverlayNotice} aria-hidden="true">
                <Icon name="maximize" className="size-4 text-accent" />
                <span>Click to view full screenshot</span>
              </div>
            </div>

            <div className={styles.streakCaption}>
              <span>Daily problem-solving calendar</span>
              <span className="font-mono text-[11px] text-accent">● Active Discipline</span>
            </div>
          </article>
        </div>

        {/* ── Middle Column: Interactive Topic Explorer ────────────── */}
        <article className={`${styles.card} ${styles.topicExplorerCard}`}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <div className={styles.cardIconBadge}>
                <Icon name="layers" className="size-5" />
              </div>
              <div className={styles.cardTitleGroup}>
                <h3 className={styles.cardTitle}>Topic Explorer</h3>
                <span className={styles.cardSubtitle}>Explore topics, track progress and revisit problems.</span>
              </div>
            </div>
          </div>

          {/* Interactive Radar Constellation */}
          <div className={styles.radarContainer} role="region" aria-label="DSA Topic Radar">
            <div className={styles.radarRings}>
              <div className={styles.radarRing1} />
              <div className={styles.radarRing2} />
            </div>

            {/* Central Core Hub */}
            <div className={styles.centerHub} aria-hidden="true">
              <span>DSA</span>
              <span className={styles.centerHubDot} />
            </div>

            {/* Orbiting topic nodes */}
            {journey.topics.map((topic, index) => {
              const angleDeg = ORBIT_ANGLES[index % ORBIT_ANGLES.length]!;
              const angleRad = (angleDeg * Math.PI) / 180;
              const radiusPct = 40; // 40% distance from center
              const leftPct = 50 + radiusPct * Math.cos(angleRad);
              const topPct = 50 + radiusPct * Math.sin(angleRad);
              const isActive = topic.id === selectedTopicId;

              return (
                <button
                  key={topic.id}
                  type="button"
                  style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                  onClick={() => {
                    setSelectedTopicId(topic.id);
                    setFilterMode("topic");
                  }}
                  className={`${styles.topicNode} ${isActive ? styles.topicNodeActive : ""}`}
                  aria-pressed={isActive}
                  aria-label={`Select topic: ${topic.name}`}
                >
                  {topic.name}
                </button>
              );
            })}
          </div>

          {/* Active Topic Detail Box */}
          <div className={styles.activeTopicBox}>
            <div className={styles.activeTopicHeader}>
              <span className={styles.activeTopicName}>{currentTopic.label}</span>
              {currentTopic.badge && (
                <span className={styles.activeTopicBadge}>{currentTopic.badge}</span>
              )}
            </div>

            <p className={styles.activeTopicSummary}>{currentTopic.summary}</p>

            <div className={styles.patternChips}>
              {currentTopic.corePatterns.map((pattern) => (
                <span key={pattern} className={styles.patternChip}>
                  {pattern}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* ── Right Column: Practice Problems & Insights ──────────── */}
        <div className={styles.rightColumn}>
          {/* Top Sub-card: Practice Problems */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <div className={styles.cardIconBadge}>
                  <Icon name="code" className="size-5" />
                </div>
                <div className={styles.cardTitleGroup}>
                  <h3 className={styles.cardTitle}>
                    {filterMode === "topic" ? `Problems · ${currentTopic.name}` : "Recent Problems"}
                  </h3>
                  <span className={styles.cardSubtitle}>
                    {displayedProblems.length} curated practice {displayedProblems.length === 1 ? "record" : "records"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setFilterMode(filterMode === "topic" ? "all" : "topic")}
                className={styles.streakActionBtn}
              >
                <span>{filterMode === "topic" ? "View All" : `Only ${currentTopic.name}`}</span>
                <Icon name="arrow-right" className="size-3.5" />
              </button>
            </div>

            <div className={styles.problemsList}>
              {displayedProblems.map((problem) => {
                const diffClass =
                  problem.difficulty === "Easy"
                    ? styles.diffEasy
                    : problem.difficulty === "Medium"
                      ? styles.diffMedium
                      : styles.diffHard;

                return (
                  <a
                    key={problem.id}
                    href={problem.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={styles.problemItem}
                    title={`${problem.title} on LeetCode: ${problem.notes ?? problem.pattern}`}
                  >
                    <div className={styles.problemLeft}>
                      <span className={`${styles.difficultyPill} ${diffClass}`}>
                        {problem.difficulty}
                      </span>
                      <span className={styles.problemTitle}>
                        #{problem.number} {problem.title}
                      </span>
                    </div>

                    <div className={styles.problemRight}>
                      <Icon name="arrow-up-right" className="size-3.5" />
                    </div>
                  </a>
                );
              })}
            </div>
          </article>

          {/* Bottom Sub-card: Practice Insights */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <div className={styles.cardIconBadge}>
                  <Icon name="lightbulb" className="size-5" />
                </div>
                <div className={styles.cardTitleGroup}>
                  <h3 className={styles.cardTitle}>Practice Insights</h3>
                  <span className={styles.cardSubtitle}>Foundational problem-solving principles</span>
                </div>
              </div>
            </div>

            <div className={styles.insightsGrid}>
              {journey.insights.map((insight) => (
                <div key={insight.title} className={styles.insightTile}>
                  <Icon name={insight.icon as IconName} className={styles.insightIcon} />
                  <span className={styles.insightTitle}>{insight.title}</span>
                  <span className={styles.insightDescription}>{insight.description}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>

      {/* ── 3. Bottom Editorial Strip ───────────────────────────────── */}
      <div className={styles.bottomStrip}>
        <div className={styles.bottomQuote}>
          <span className={styles.quoteMarker} aria-hidden="true">&ldquo;</span>
          <p className={styles.bottomQuoteText}>{journey.closingQuote}</p>
        </div>

        <div className={styles.bottomDivider} aria-hidden="true" />

        <div className={styles.pillarsList}>
          {journey.pillars.map((pillar) => (
            <div key={pillar.title} className={styles.pillarItem}>
              <div className={styles.pillarIcon}>
                <Icon name={pillar.icon as IconName} className="size-4" />
              </div>
              <div className={styles.pillarTexts}>
                <span className={styles.pillarTitle}>{pillar.title}</span>
                <span className={styles.pillarSubtitle}>{pillar.subtitle}</span>
              </div>
            </div>
          ))}
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

      {/* ── 4. Accessible Lightbox Modal ────────────────────────────── */}
      {lightboxOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h4 id="modal-title" className={styles.modalTitle}>
                LeetCode Practice &amp; Streak Activity
              </h4>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setLightboxOpen(false)}
                className={styles.modalCloseBtn}
                aria-label="Close modal"
              >
                <Icon name="close" className="size-5" />
              </button>
            </div>

            <div className={styles.modalBody}>
              <Image
                src={journey.streakImage.src}
                alt={journey.streakImage.alt}
                width={journey.streakImage.width}
                height={journey.streakImage.height}
                className={styles.modalImage}
              />
            </div>

            <div className={styles.modalFooter}>
              <span>Verified consistency streak and activity record</span>
              <span className="font-mono text-accent">Esc to close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
