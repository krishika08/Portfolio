import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { HeroParallax } from "@/components/motion/HeroParallax";
import { SectionNumber } from "@/components/portfolio/SheetRule";
import { SocialLinks } from "@/components/portfolio/SocialLinks";
import { BaseLink } from "@/components/ui/BaseLink";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { sectionHref, sectionIds } from "@/config/navigation";
import { routes } from "@/config/routes";
import { education } from "@/content/education";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { getExperience, getFlagshipProject, getSocialLinks, hasCaseStudy } from "@/lib/content";
import { editorialSerif } from "@/lib/fonts";
import { HeroArch } from "./HeroArch";
import styles from "./Hero.module.css";

type FactIconName = "education" | "experience" | "focus" | "direction";

interface Fact {
  icon: FactIconName;
  label: string;
  value: ReactNode;
}

/** Entrance order (see `.in` and `.lineIn` in Hero.module.css). */
const at = (ms: number, i?: number) => ({ "--d": `${ms}ms`, ...(i !== undefined && { "--i": i }) }) as CSSProperties;

/** Small line icons for the facts strip (decorative). */
function FactIcon({ name }: { name: FactIconName }) {
  const paths: Record<FactIconName, ReactNode> = {
    education: <path d="M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9ZM6.5 11v4.5c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3V11M21.5 9v5" />,
    experience: (
      <>
        <rect x="3" y="7.5" width="18" height="12" rx="2" />
        <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3 12.5h18" />
      </>
    ),
    focus: <path d="m12 3.5 8.5 4.5L12 12.5 3.5 8 12 3.5ZM3.5 12l8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5" />,
    direction: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
      </>
    ),
  };
  return (
    <span aria-hidden className={styles.factIcon}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        {paths[name]}
      </svg>
    </span>
  );
}

/**
 * The verified introduction as one sentence in two tiers: its opening clause
 * set large in the serif (the word that names the focus in mint), the rest
 * as reading text. The words are exactly `profile.intro`.
 */
function Introduction({ className, style }: { className?: string; style?: CSSProperties }) {
  const text = profile.intro;
  const cut = text.indexOf(", ");
  const lead = cut === -1 ? text : text.slice(0, cut + 1);
  const rest = cut === -1 ? "" : text.slice(cut + 2);
  const focusWord = profile.focus.split(" ")[0] ?? "";
  const hit = focusWord ? lead.toLowerCase().indexOf(focusWord.toLowerCase()) : -1;

  return (
    <p className={cn(styles.intro, className)} style={style}>
      <span className={styles.lead}>
        {hit === -1 ? (
          lead
        ) : (
          <>
            {lead.slice(0, hit)}
            <span className={styles.accent}>{lead.slice(hit, hit + focusWord.length)}</span>
            {lead.slice(hit + focusWord.length)}
          </>
        )}
      </span>
      {rest && (
        <>
          {" "}
          <span className={styles.rest}>{rest}</span>
        </>
      )}
    </p>
  );
}

// Precision Editorial × Cinematic Engineering. The hero runs under the
// transparent header and fills the first screen: a dark stone wall with an
// arch opening onto the opening's landscape at sunset, the dial in the sky
// (where the opening's halo lands), and the real portrait standing on the
// lit steps in front. On the left, the role, the name and the verified
// introduction, the way into Selected Work and to Contact, and the profiles;
// on the right, the interests and the flagship project; along the bottom,
// the verified facts and a scroll cue. Phones read name → portrait →
// introduction → actions. Every value comes from content data; the scene,
// the rail and the cue are decoration.
export function HeroSection() {
  const flagship = getFlagshipProject();
  const flagshipCover = flagship?.assets?.cover;
  const [latestRole] = getExperience();
  const [degree] = education;
  const portrait = profile.portraits?.hero;

  const facts: Fact[] = [
    ...(degree
      ? [
          {
            icon: "education" as const,
            label: "Education",
            value: (
              <>
                {degree.degree}, {degree.shortName ?? degree.institution} ·{" "}
                {/* Keep the year range on one line. */}
                <span className="whitespace-nowrap">
                  {degree.dates.start}–{degree.dates.end}
                </span>
              </>
            ),
          },
        ]
      : []),
    ...(latestRole
      ? [{ icon: "experience" as const, label: "Experience", value: `${latestRole.role}, ${latestRole.organization}` }]
      : []),
    { icon: "focus", label: "Focus", value: profile.focus },
    { icon: "direction", label: "Direction", value: profile.direction },
  ];

  return (
    <Section id={sectionIds.home} spacing="none" aria-labelledby="hero-title" className={styles.hero}>
      <Container className={styles.inner}>
        <hgroup className={styles.identity}>
          <SectionNumber section={sectionIds.home} className={cn(styles.counter, styles.in)} />
          <p className={cn(styles.eyebrow, styles.in)} style={at(180)}>
            {profile.role}
          </p>
          <h1 id="hero-title" className={cn(styles.name, editorialSerif.variable)}>
            <span className={styles.line}>
              <span className={styles.lineIn} style={at(260)}>
                {profile.name}
              </span>
            </span>
          </h1>
        </hgroup>

        {/* The scene: the wall and its arch, the landscape through it, the lit steps, the portrait in front. */}
        {portrait && (
          <div className={cn(styles.scene, styles.depthScene)}>
            <HeroParallax className={styles.layers}>
              <div aria-hidden className={styles.wall} />
              <div aria-hidden className={styles.pillar} />
              <div aria-hidden className={styles.frame} />
              <HeroArch />
              <div aria-hidden className={styles.floor} />
              <div aria-hidden className={styles.spill} />
              <div className={cn(styles.portrait, "enter-rise")}>
                <div className={styles.photo}>
                  <Image
                    src={portrait.src}
                    alt={portrait.alt}
                    width={portrait.width}
                    height={portrait.height}
                    sizes="(min-width: 1024px) 26rem, (min-width: 768px) 20rem, 14rem"
                    preload
                  />
                </div>
              </div>
              <div aria-hidden className={styles.shade} />
            </HeroParallax>
          </div>
        )}

        <Introduction className={styles.in} style={at(520)} />

        <div className={cn(styles.actions, styles.in)} style={at(640)}>
          <div className={styles.buttons}>
            <ButtonLink href={sectionHref(sectionIds.work)} className={styles.primary}>
              View selected work
              <Icon name="arrow-right" />
            </ButtonLink>
            <ButtonLink href={sectionHref(sectionIds.contact)} variant="secondary" className={styles.secondary}>
              Let&rsquo;s connect
              <Icon name="arrow-right" />
            </ButtonLink>
            {profile.resume && (
              <ButtonLink href={profile.resume} newTab variant="text">
                Resume
              </ButtonLink>
            )}
          </div>
          <SocialLinks links={getSocialLinks()} className={styles.social} />
        </div>

        <div className={cn(styles.side, styles.in)} style={at(820)}>
          {profile.interests.length > 0 && (
            <div className={styles.interests}>
              <p id="hero-interests" className={styles.sideLabel}>
                Interests
              </p>
              <ul aria-labelledby="hero-interests">
                {profile.interests.map((interest) => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>
            </div>
          )}

          {flagship && (
            <BaseLink
              href={hasCaseStudy(flagship) ? routes.project(flagship.slug) : sectionHref(sectionIds.work)}
              className={styles.panel}
            >
              <span className={styles.sideLabel}>Flagship project</span>
              <span className={cn(styles.panelTitle, editorialSerif.variable)}>{flagship.name}</span>
              {flagshipCover && (
                <span aria-hidden className={styles.panelThumb}>
                  <Image src={flagshipCover.src} alt="" width={flagshipCover.width} height={flagshipCover.height} sizes="12rem" />
                </span>
              )}
              <span aria-hidden className={styles.panelGo}>
                <Icon name="arrow-up-right" />
              </span>
            </BaseLink>
          )}
        </div>

        {/* The verified facts, as a quiet strip along the bottom. */}
        <dl className={cn(styles.facts, styles.in)} style={at(900)}>
          {facts.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt className={styles.factLabel}>
                <FactIcon name={fact.icon} />
                {fact.label}
              </dt>
              <dd className={styles.factValue}>{fact.value}</dd>
            </div>
          ))}
        </dl>

        <BaseLink
          href={sectionHref(sectionIds.work)}
          aria-label="Scroll to selected work"
          className={cn(styles.scroll, styles.in)}
          style={at(1000)}
        >
          <span className={styles.scrollRing}>
            <Icon name="arrow-down" />
          </span>
          <span aria-hidden className={styles.scrollLabel}>
            Scroll
            <br />
            to explore
          </span>
        </BaseLink>
      </Container>
    </Section>
  );
}
