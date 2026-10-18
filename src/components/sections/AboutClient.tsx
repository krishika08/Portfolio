"use client";

import Image from "next/image";
import { useCallback } from "react";
import { BaseLink } from "@/components/ui/BaseLink";
import { Icon } from "@/components/ui/Icon";
import { destinations, sectionIds, sectionHref } from "@/config/navigation";
import type { Profile } from "@/types/content";
import styles from "./About.module.css";

interface AboutClientProps {
  profile: Profile;
}

export function AboutClient({ profile }: AboutClientProps) {
  const nextDest = destinations[destinations.findIndex((d) => d.id === sectionIds.about) + 1];

  const handleScrollToGrid = useCallback(() => {
    const el = document.getElementById("about-panels");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const portrait = profile.portraits?.about;

  return (
    <div className="relative">
      {/* ── Editorial Hero Band ────────────────────────────── */}
      <div className={styles.heroBand}>
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowNumber}>06</span>
            <span className={styles.eyebrowSlash}>/</span>
            <span className={styles.eyebrowText}>ABOUT ME · BEYOND THE CODE</span>
          </div>

          <div className={styles.titleWrapper}>
            <h2 id="about-title" className={styles.title}>
              A curious
              <br />
              engineer
              <br />
              building
              <br />
              <span className={styles.mintText}>what&rsquo;s next.</span>
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
            I&rsquo;m Krishika &mdash; a Computer Science Engineering student at UPES Dehradun,
            passionate about building practical full-stack software and engineering reliable,
            scalable backend systems from core principles.
          </p>

          <div className={styles.ctaGroup}>
            <BaseLink
              href={sectionHref(sectionIds.contact)}
              className={styles.actionBtn}
            >
              <span>Let&rsquo;s Connect</span>
              <Icon name="arrow-right" />
            </BaseLink>
            <button
              type="button"
              onClick={handleScrollToGrid}
              className="inline-flex items-center gap-1.5 text-xs text-foreground-secondary hover:text-mint transition-colors py-2 px-3"
            >
              <span>Explore My Mindset</span>
              <Icon name="arrow-down" />
            </button>
          </div>
        </div>

        {/* ── Photographic Stage & Real Portrait Window ─────── */}
        <div className={styles.portraitStage}>
          <div className={styles.portraitWindow}>
            {portrait && (
              <Image
                src={portrait.src}
                alt={portrait.alt}
                width={portrait.width}
                height={portrait.height}
                className={styles.portraitImage}
                priority
              />
            )}
            <div className={styles.portraitOverlay} />

            {/* Floating Quote Card */}
            <div className={styles.floatingQuote} aria-hidden="true">
              <span className={styles.quoteMark}>&ldquo;</span>
              <p className={styles.quoteText}>
                Still learning. Still exploring. Still building a better version of <span className={styles.quoteMint}>tomorrow.</span>
              </p>
            </div>
          </div>

          {/* Quick Facts Pills */}
          <div className={styles.quickFactsGrid}>
            <div className={styles.factPill}>
              <Icon name="mortarboard" className={styles.factIcon} />
              <div className={styles.factMeta}>
                <span className={styles.factLabel}>Class of 2028</span>
                <span className={styles.factValue}>UPES B.Tech CSE</span>
              </div>
            </div>

            <div className={styles.factPill}>
              <Icon name="map-pin" className={styles.factIcon} />
              <div className={styles.factMeta}>
                <span className={styles.factLabel}>Based In</span>
                <span className={styles.factValue}>Dehradun, India</span>
              </div>
            </div>

            <div className={styles.factPill}>
              <Icon name="code" className={styles.factIcon} />
              <div className={styles.factMeta}>
                <span className={styles.factLabel}>Focus</span>
                <span className={styles.factValue}>Full-Stack & Systems</span>
              </div>
            </div>

            <div className={styles.factPill}>
              <Icon name="sparkle" className={styles.factIcon} />
              <div className={styles.factMeta}>
                <span className={styles.factLabel}>Direction</span>
                <span className={styles.factValue}>Scalable Software</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3-Card Editorial Grid (06.1, 06.2, 06.3) ────────── */}
      <div id="about-panels" className={styles.editorialGrid}>
        {/* Card 1: My Approach (06.1) */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <span className={styles.cardIcon} aria-hidden="true">
                <Icon name="code" />
              </span>
              <h3 className={styles.cardTitle}>My Approach</h3>
            </div>
            <span className={styles.cardBadge}>06.1</span>
          </div>

          <div className={styles.itemsList}>
            <div className={styles.listItem}>
              <div className={styles.listIconWrap}>
                <Icon name="lightbulb" />
              </div>
              <div className={styles.listText}>
                <h4 className={styles.listTitle}>Curiosity First</h4>
                <p className={styles.listDesc}>
                  Eager to explore and understand the internal mechanics behind complex software systems and architectures.
                </p>
              </div>
            </div>

            <div className={styles.listItem}>
              <div className={styles.listIconWrap}>
                <Icon name="chart-bar" />
              </div>
              <div className={styles.listText}>
                <h4 className={styles.listTitle}>Hands-on Learning</h4>
                <p className={styles.listDesc}>
                  Turning concepts into production software &mdash; from cross-platform apps to database-backed services.
                </p>
              </div>
            </div>

            <div className={styles.listItem}>
              <div className={styles.listIconWrap}>
                <Icon name="users" />
              </div>
              <div className={styles.listText}>
                <h4 className={styles.listTitle}>Focused Growth</h4>
                <p className={styles.listDesc}>
                  Consistent discipline in data structures, algorithm efficiency, and relational schema normalization.
                </p>
              </div>
            </div>

            <div className={styles.listItem}>
              <div className={styles.listIconWrap}>
                <Icon name="sparkle" />
              </div>
              <div className={styles.listText}>
                <h4 className={styles.listTitle}>Building Impact</h4>
                <p className={styles.listDesc}>
                  Creating user-centric, accessible software designed to solve practical, real-world community challenges.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Beyond the Code (06.2) */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <span className={styles.cardIcon} aria-hidden="true">
                <Icon name="book-open" />
              </span>
              <h3 className={styles.cardTitle}>Beyond the Code</h3>
            </div>
            <span className={styles.cardBadge}>06.2</span>
          </div>

          <div className={styles.itemsList}>
            <div className={styles.listItem}>
              <div className={styles.listIconWrap}>
                <Icon name="mortarboard" />
              </div>
              <div className={styles.listText}>
                <h4 className={styles.listTitle}>Academic Foundations</h4>
                <p className={styles.listDesc}>
                  B.Tech in Computer Science at UPES Dehradun, balancing rigorous systems theory with real engineering.
                </p>
              </div>
            </div>

            <div className={styles.listItem}>
              <div className={styles.listIconWrap}>
                <Icon name="github" />
              </div>
              <div className={styles.listText}>
                <h4 className={styles.listTitle}>Open Source Community</h4>
                <p className={styles.listDesc}>
                  Contributor to GirlScript Summer of Code, building accessible React and TypeScript UI components.
                </p>
              </div>
            </div>

            <div className={styles.listItem}>
              <div className={styles.listIconWrap}>
                <Icon name="award" />
              </div>
              <div className={styles.listText}>
                <h4 className={styles.listTitle}>Continuous Upskilling</h4>
                <p className={styles.listDesc}>
                  Certified in Oracle Cloud Infrastructure (OCI) and completed Google Cloud Study Jams badges.
                </p>
              </div>
            </div>

            <div className={styles.listItem}>
              <div className={styles.listIconWrap}>
                <Icon name="compass" />
              </div>
              <div className={styles.listText}>
                <h4 className={styles.listTitle}>Systems Curiosity</h4>
                <p className={styles.listDesc}>
                  Deep fascination with operating systems kernels, database storage engines, and network protocols.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: What Drives Me (06.3) */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <span className={styles.cardIcon} aria-hidden="true">
                <Icon name="rocket" />
              </span>
              <h3 className={styles.cardTitle}>What Drives Me</h3>
            </div>
            <span className={styles.cardBadge}>06.3</span>
          </div>

          <div className={styles.itemsList}>
            <div className={styles.listItem}>
              <div className={styles.listIconWrap}>
                <Icon name="cpu" />
              </div>
              <div className={styles.listText}>
                <h4 className={styles.listTitle}>Continuous Learning</h4>
                <p className={styles.listDesc}>
                  Staying curious, adopting modern web engineering standards, and mastering new paradigms.
                </p>
              </div>
            </div>

            <div className={styles.listItem}>
              <div className={styles.listIconWrap}>
                <Icon name="check-circle" />
              </div>
              <div className={styles.listText}>
                <h4 className={styles.listTitle}>Solving Real Problems</h4>
                <p className={styles.listDesc}>
                  Grounding technology in genuine utility &mdash; demonstrated in applications like VeyloPrep and Split-Sync.
                </p>
              </div>
            </div>

            <div className={styles.listItem}>
              <div className={styles.listIconWrap}>
                <Icon name="users" />
              </div>
              <div className={styles.listText}>
                <h4 className={styles.listTitle}>Collaborating & Growing</h4>
                <p className={styles.listDesc}>
                  Learning from mentors, engineering peers, and cross-functional team environments via Git workflows.
                </p>
              </div>
            </div>

            <div className={styles.listItem}>
              <div className={styles.listIconWrap}>
                <Icon name="shield" />
              </div>
              <div className={styles.listText}>
                <h4 className={styles.listTitle}>Building What&rsquo;s Next</h4>
                <p className={styles.listDesc}>
                  Developing resilient, scalable software systems built on rock-solid fundamentals and clean code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Current Focus Strip (06.4) ──────────────── */}
      <div className={styles.focusStrip}>
        <div className={styles.focusHeader}>
          <div className="flex items-center gap-2">
            <Icon name="compass" className="text-mint text-base" />
            <h3 className="font-serif text-lg font-semibold text-foreground">Current Focus</h3>
          </div>
          <span className="font-mono text-xs text-foreground-muted">06.4</span>
        </div>

        <div className={styles.focusGrid}>
          <div className={styles.focusItem}>
            <div className={styles.focusIconWrap}>
              <Icon name="code" />
            </div>
            <div>
              <h4 className={styles.focusTitle}>DSA & Systems</h4>
              <p className={styles.focusDesc}>Strengthening algorithmic problem solving and time complexity depth.</p>
            </div>
          </div>

          <div className={styles.focusItem}>
            <div className={styles.focusIconWrap}>
              <Icon name="layers" />
            </div>
            <div>
              <h4 className={styles.focusTitle}>Full-Stack Systems</h4>
              <p className={styles.focusDesc}>Building modern web apps with Next.js, React, and modular architecture.</p>
            </div>
          </div>

          <div className={styles.focusItem}>
            <div className={styles.focusIconWrap}>
              <Icon name="database" />
            </div>
            <div>
              <h4 className={styles.focusTitle}>Backend & Data</h4>
              <p className={styles.focusDesc}>PostgreSQL, MySQL, Supabase with per-table Row-Level Security.</p>
            </div>
          </div>

          <div className={styles.focusItem}>
            <div className={styles.focusIconWrap}>
              <Icon name="trend-up" />
            </div>
            <div>
              <h4 className={styles.focusTitle}>Production Growth</h4>
              <p className={styles.focusDesc}>Expanding cloud capabilities, CI/CD pipelines, and software reliability.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Closing Editorial Quote Strip ──────────────────── */}
      <div className={styles.quoteStrip}>
        <div className={styles.stripQuoteGroup}>
          <p className={styles.stripQuoteText}>
            &ldquo;A little progress every day adds up to <span className={styles.stripQuoteAccent}>big things.</span>&rdquo;
          </p>
          <span className="font-mono text-xs text-foreground-muted">Krishika &middot; Computer Science Engineering &middot; UPES Class of 2028</span>
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
