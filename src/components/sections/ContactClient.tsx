"use client";

import Image from "next/image";
import { useState } from "react";
import { BaseLink } from "@/components/ui/BaseLink";
import { Icon } from "@/components/ui/Icon";
import type { Profile, SocialLink } from "@/types/content";
import styles from "./Contact.module.css";

interface ContactClientProps {
  profile: Profile;
  socialLinks: SocialLink[];
}

interface TopicOption {
  id: string;
  label: string;
  icon: "briefcase" | "users" | "message-circle" | "sparkle";
  headline: string;
  message: string;
}

const topics: TopicOption[] = [
  {
    id: "opportunities",
    label: "Opportunities",
    icon: "briefcase",
    headline: "Career & Internship Inquiries",
    message:
      "I am actively seeking software engineering internships, graduate positions, and full-time engineering roles. Connect with me directly on LinkedIn to discuss upcoming openings, team fit, and opportunities.",
  },
  {
    id: "collaborations",
    label: "Collaborations",
    icon: "users",
    headline: "Building Together & Open Source",
    message:
      "Interested in collaborating on real-world projects, systems engineering, or open-source initiatives? Let's connect on GitHub and LinkedIn to exchange ideas and build impactful software.",
  },
  {
    id: "discussions",
    label: "Technical Discussions",
    icon: "message-circle",
    headline: "Engineering Conversations",
    message:
      "Always eager to discuss distributed systems, backend architectures, databases, and modern full-stack web applications. Reach out to share perspectives or discuss emerging technologies.",
  },
  {
    id: "hello",
    label: "Just Say Hi",
    icon: "sparkle",
    headline: "Professional Networking",
    message:
      "Great opportunities often start with a simple conversation. Feel free to connect and expand our professional network.",
  },
];

export function ContactClient({ profile, socialLinks }: ContactClientProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>("opportunities");

  const currentTopic = topics.find((t) => t.id === selectedTopic) ?? topics[0]!;

  const linkedIn = socialLinks.find((l) => l.id === "linkedin") ?? {
    href: profile.social.linkedin ?? "https://www.linkedin.com/in/krishika-kalra-7215a7342",
    label: "LinkedIn",
  };

  const gitHub = socialLinks.find((l) => l.id === "github") ?? {
    href: profile.social.github ?? "https://github.com/krishika08",
    label: "GitHub",
  };

  return (
    <div className="relative">
      {/* ── Editorial Hero Band ────────────────────────────── */}
      <div className={styles.heroBand}>
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowNumber}>09</span>
            <span className={styles.eyebrowSlash}>/</span>
            <span className={styles.eyebrowText}>CONTACT · THE FINAL THRESHOLD</span>
          </div>

          <div className={styles.titleWrapper}>
            <h2 id="contact-title" className={styles.title}>
              Let&rsquo;s build
              <br />
              something
              <br />
              meaningful
              <br />
              <span className={styles.mintText}>together.</span>
            </h2>

            {/* Handwritten annotation matching design */}
            <div className={styles.handwrittenAnnotation} aria-hidden="true">
              <span>Good Ideas.</span>
              <span>Better</span>
              <span>Conversations.</span>
              <svg className={styles.arrowSvg} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 8 C16 12, 20 20, 24 24 M24 24 L18 24 M24 24 L24 18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <p className={styles.description}>
            I&rsquo;m always open to exciting opportunities, collaborations, and conversations
            around software engineering, backend systems, and modern product development.
          </p>
        </div>

        {/* Atmospheric window with arch, lake sunrise, and lanterns */}
        <div className={styles.atmosphericWindow} aria-hidden="true">
          <Image
            src="/images/contact/contact-arch.jpg"
            alt="Scenic stone balcony overlooking serene mountain lake sunrise with warm lanterns"
            width={1024}
            height={640}
            className={styles.archImage}
            priority={false}
          />
          <div className={styles.archOverlay} />
          <div className={styles.floatingQuote}>
            <span className={styles.quoteMark}>&ldquo;</span>
            <p className={styles.quoteText}>
              Great opportunities often start with a <span className="font-semibold text-mint">simple conversation.</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Contact Grid ──────────────────────────────── */}
      <div className={styles.contactGrid}>
        {/* Left Column: Direct Message & Intent Hub */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <span className={styles.cardIcon} aria-hidden="true">
                <Icon name="send" />
              </span>
              <h3 className={styles.cardTitle}>Direct Outreach</h3>
            </div>
            <span className={styles.cardBadge}>07.1</span>
          </div>

          {/* Topic Selector Pills */}
          <div className={styles.topicPills} role="tablist" aria-label="Conversation intent topics">
            {topics.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={selectedTopic === t.id}
                className={`${styles.topicPill} ${selectedTopic === t.id ? styles.topicActive : ""}`}
                onClick={() => setSelectedTopic(t.id)}
                type="button"
              >
                <Icon name={t.icon} className="text-xs" />
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* Context Intent Box */}
          <div className={styles.intentBox}>
            <h4 className={styles.intentTitle}>{currentTopic.headline}</h4>
            <p className={styles.intentDesc}>{currentTopic.message}</p>
          </div>

          {/* Direct Verified Actions */}
          <div className={styles.primaryActions}>
            <BaseLink
              href={linkedIn.href}
              newTab
              className={styles.linkedInActionBtn}
            >
              <Icon name="linkedin" />
              <span>Connect on LinkedIn</span>
              <Icon name="arrow-up-right" />
            </BaseLink>

            <BaseLink
              href={gitHub.href}
              newTab
              className={styles.gitHubActionBtn}
            >
              <Icon name="github" />
              <span>Explore GitHub</span>
              <Icon name="arrow-up-right" />
            </BaseLink>
          </div>

          <p className={styles.outreachNote}>
            Direct messaging via LinkedIn is the quickest way to reach me for professional inquiries.
          </p>
        </div>

        {/* Right Column: Channels & Academic Base */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <span className={styles.cardIcon} aria-hidden="true">
                <Icon name="compass" />
              </span>
              <h3 className={styles.cardTitle}>Get in Touch</h3>
            </div>
            <span className={styles.cardBadge}>07.2</span>
          </div>

          <div className={styles.channelsList}>
            {/* LinkedIn Tile */}
            <BaseLink
              href={linkedIn.href}
              newTab
              className={styles.channelTile}
            >
              <div className={styles.channelLeft}>
                <div className={styles.channelIconWrap}>
                  <Icon name="linkedin" />
                </div>
                <div className={styles.channelText}>
                  <h4 className={styles.channelName}>LinkedIn</h4>
                  <p className={styles.channelDesc}>Let&rsquo;s connect professionally and share opportunities.</p>
                </div>
              </div>
              <span className={styles.channelAction}>
                <span>Visit Profile</span>
                <Icon name="arrow-up-right" />
              </span>
            </BaseLink>

            {/* GitHub Tile */}
            <BaseLink
              href={gitHub.href}
              newTab
              className={styles.channelTile}
            >
              <div className={styles.channelLeft}>
                <div className={styles.channelIconWrap}>
                  <Icon name="github" />
                </div>
                <div className={styles.channelText}>
                  <h4 className={styles.channelName}>GitHub</h4>
                  <p className={styles.channelDesc}>Check out my repositories, codebases and open-source work.</p>
                </div>
              </div>
              <span className={styles.channelAction}>
                <span>Visit Profile</span>
                <Icon name="arrow-up-right" />
              </span>
            </BaseLink>

            {/* Location & Academic Base Tile */}
            <div className={styles.channelTile}>
              <div className={styles.channelLeft}>
                <div className={styles.channelIconWrap}>
                  <Icon name="map-pin" />
                </div>
                <div className={styles.channelText}>
                  <h4 className={styles.channelName}>Academic Base</h4>
                  <p className={styles.channelDesc}>UPES Campus · Dehradun, Uttarakhand, India</p>
                </div>
              </div>
              <span className="font-mono text-xs text-mint">On Campus</span>
            </div>
          </div>

          {/* Atmospheric Worldwide Availability Card */}
          <div className={styles.globalCard}>
            <Icon name="sparkle" className={styles.globalIcon} />
            <p className={styles.globalText}>
              Open to software engineering internships, graduate engineering roles, and exciting collaborations worldwide (hybrid or remote).
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom Feature Bar ─────────────────────────────── */}
      <div className={styles.bottomBar}>
        <div className={styles.featurePills}>
          <div className={styles.featurePill}>
            <Icon name="briefcase" className={styles.featureIcon} />
            <span className={styles.featureTitle}>Open to Opportunities</span>
            <span className={styles.featureSubtitle}>· Internships & Full-Time Roles</span>
          </div>
          <div className={styles.featurePill}>
            <Icon name="users" className={styles.featureIcon} />
            <span className={styles.featureTitle}>Collaboration Friendly</span>
            <span className={styles.featureSubtitle}>· Projects · Systems · Open Source</span>
          </div>
          <div className={styles.featurePill}>
            <Icon name="sparkle" className={styles.featureIcon} />
            <span className={styles.featureTitle}>Direct Response</span>
            <span className={styles.featureSubtitle}>· Active on LinkedIn & GitHub</span>
          </div>
          <div className={styles.featurePill}>
            <Icon name="heart" className={styles.featureIcon} />
            <span className={styles.featureTitle}>Let&rsquo;s Build Together</span>
            <span className={styles.featureSubtitle}>· Turning ideas into real impact</span>
          </div>
        </div>
      </div>
    </div>
  );
}
