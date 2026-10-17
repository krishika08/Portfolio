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
import { Text } from "@/components/ui/Text";
import { sectionHref, sectionIds } from "@/config/navigation";
import { routes } from "@/config/routes";
import { education } from "@/content/education";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { getExperience, getFlagshipProject, getSocialLinks, hasCaseStudy } from "@/lib/content";
import { editorialSerif } from "@/lib/fonts";
import { HeroArch } from "./HeroArch";
import styles from "./Hero.module.css";

/** The hero's eyebrow (Step 2 brief). */
const EYEBROW = "Build · Learn · Create · Impact";

interface Fact {
  label: string;
  value: ReactNode;
}

/** Entrance order (see `.in` and `.lineIn` in Hero.module.css). */
const at = (ms: number, i?: number) => ({ "--d": `${ms}ms`, ...(i !== undefined && { "--i": i }) }) as CSSProperties;

// The opening hands over to this. The name and role in an editorial serif,
// the introduction and the way into Selected Work on the left; on the right,
// the owner's portrait standing in front of an arched window that looks out
// on the opening's landscape, with its dial above the peaks; the verified
// facts as a ruled title block along the bottom. Every value comes from
// content data; the eyebrow, the window and the scroll cue are presentation.
export function HeroSection() {
  const flagship = getFlagshipProject();
  const [latestRole] = getExperience();
  const [degree] = education;
  const portrait = profile.portraits?.hero;
  const flagshipCover = flagship?.assets?.cover;
  // "Software engineer" → "Software" / "engineer." on their own lines.
  const [roleFirst = profile.role, ...roleRest] = profile.role.toLowerCase().split(" ");

  const facts: Fact[] = [
    ...(degree
      ? [
          {
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
    ...(latestRole ? [{ label: "Experience", value: `${latestRole.role}, ${latestRole.organization}` }] : []),
    { label: "Direction", value: profile.direction },
    ...(flagship
      ? [
          {
            label: "Flagship project",
            value: (
              <BaseLink
                href={hasCaseStudy(flagship) ? routes.project(flagship.slug) : sectionHref(sectionIds.work)}
                className={styles.flagship}
              >
                {flagshipCover && (
                  <span aria-hidden className={styles.thumb}>
                    <Image
                      src={flagshipCover.src}
                      alt=""
                      width={flagshipCover.width}
                      height={flagshipCover.height}
                      sizes="6rem"
                    />
                  </span>
                )}
                <span className={styles.flagName}>
                  {flagship.name}
                  <Icon name="arrow-right" />
                </span>
              </BaseLink>
            ),
          },
        ]
      : []),
  ];

  return (
    <Section
      id={sectionIds.home}
      spacing="none"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
    >
      <Container className={styles.inner}>
        <div className={styles.grid}>
          {/* Identity. First in the DOM; below the window on small screens. */}
          <div className={cn(styles.copy, styles.depthCopy)}>
            <p className={cn(styles.eyebrow, styles.in)} style={at(80)}>
              {EYEBROW}
            </p>
            <h1 id="hero-title" className={cn(styles.title, editorialSerif.variable)}>
              <span className={styles.line}>
                <span className={styles.lineIn} style={at(160, 0)}>
                  {profile.name},
                </span>
              </span>{" "}
              <span className={cn(styles.line, styles.role)}>
                <span className={styles.lineIn} style={at(160, 1)}>
                  {roleFirst}
                </span>
              </span>
              {roleRest.length > 0 && (
                <>
                  {" "}
                  <span className={cn(styles.line, styles.role, styles.accent)}>
                    <span className={styles.lineIn} style={at(160, 2)}>
                      {roleRest.join(" ")}.
                    </span>
                  </span>
                </>
              )}
            </h1>
            <Text tone="secondary" size="lead" className={cn(styles.intro, styles.in)} style={at(520)}>
              {profile.intro}
            </Text>
            <div className={cn(styles.actions, styles.in)} style={at(640)}>
              <ButtonLink href={sectionHref(sectionIds.work)} className={styles.primary}>
                View selected work
                <Icon name="arrow-down" />
              </ButtonLink>
              {profile.resume && (
                <ButtonLink href={profile.resume} newTab variant="secondary">
                  Resume
                </ButtonLink>
              )}
              <SocialLinks links={getSocialLinks()} className={styles.social} />
            </div>
          </div>

          {/* The window: the view, the light on the floor, the portrait in front. */}
          {portrait && (
            <div className={cn(styles.stage, styles.depthStage)}>
              <HeroParallax className={styles.layers}>
                <div aria-hidden className={styles.glow} />
                <HeroArch />
                <div aria-hidden className={styles.spill} />
                <div aria-hidden className={styles.floor} />
                <div className={cn(styles.portrait, "enter-rise")}>
                  <div className={styles.photo}>
                    <Image
                      src={portrait.src}
                      alt={portrait.alt}
                      width={portrait.width}
                      height={portrait.height}
                      sizes="(min-width: 1024px) 22rem, 16rem"
                      preload
                    />
                  </div>
                </div>
              </HeroParallax>
              <BaseLink
                href={sectionHref(sectionIds.work)}
                aria-label="Scroll to selected work"
                className={cn(styles.scroll, styles.in)}
                style={at(900)}
              >
                <span className={styles.scrollRing}>
                  <Icon name="arrow-down" />
                </span>
                <span aria-hidden className={styles.scrollLabel}>
                  Scroll
                </span>
              </BaseLink>
            </div>
          )}
        </div>

        {/* Title block: the verified facts, ruled like a drawing's border. */}
        <div className={cn(styles.block, styles.in)} style={at(760)}>
          <SectionNumber section={sectionIds.home} className={styles.number} />
          <dl className={styles.facts}>
            {facts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <dt className={styles.label}>{fact.label}</dt>
                <dd className={styles.value}>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
