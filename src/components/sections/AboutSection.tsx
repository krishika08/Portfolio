import { Fragment } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { SheetRule } from "@/components/portfolio/SheetRule";
import { AboutStatement } from "@/components/sections/AboutStatement";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { Tilt } from "@/components/ui/Tilt";
import { sectionIds } from "@/config/navigation";
import { profile } from "@/content/profile";
import styles from "./AboutSection.module.css";

// Compact human context from profile data, composed as an editorial spread:
// the opening paragraphs above; below, a tall portrait pinned to a patch of
// graph paper on the left, the engineering statement typeset in two tiers on
// the right, and the Interests line anchored to the portrait's baseline.
export function AboutSection() {
  const paragraphs = profile.about;
  const statement = paragraphs.at(-1);
  const [opening, ...rest] = paragraphs.slice(0, -1);
  const portrait = profile.portraits?.about;

  return (
    <Section id={sectionIds.about} aria-labelledby="about-title" className="relative isolate border-t border-border-subtle">
      <Container>
        <SheetRule className="mb-block" />
        <Grid className="gap-y-cluster">
          <SectionHeader id="about-title" eyebrow="Current direction" title="About" className="col-span-full lg:col-span-4" />
          {(opening || rest.length > 0) && (
            <div className="reveal col-span-full max-w-reading space-y-group lg:col-span-7 lg:col-start-6 lg:pt-cluster">
              {opening && <Text size="lead">{opening}</Text>}
              {rest.map((paragraph) => (
                <Text key={paragraph} size="lead" tone="secondary">
                  {paragraph}
                </Text>
              ))}
            </div>
          )}
        </Grid>

        <Grid className="mt-section gap-y-block lg:items-stretch">
          {portrait && (
            <div className="col-span-full lg:col-span-5 lg:pt-16">
              <div data-reveal className={styles.stageWrap}>
                <Tilt max={3} glare={false} className={styles.stage}>
                  <div aria-hidden className={styles.paper} />
                  <svg aria-hidden className={styles.frame} viewBox="0 0 400 500">
                    <rect x="0.75" y="0.75" width="398.5" height="498.5" pathLength="1" />
                  </svg>
                  <div className={styles.photo}>
                    <Image
                      src={portrait.src}
                      alt={portrait.alt}
                      fill
                      sizes="(min-width: 1024px) 27.5rem, (min-width: 640px) 24rem, 80vw"
                    />
                  </div>
                  <span aria-hidden className={styles.marker} />
                </Tilt>
              </div>
            </div>
          )}

          <div
            className={
              portrait
                ? "col-span-full flex flex-col gap-section-compact lg:col-span-7 lg:col-start-6 lg:justify-between"
                : "col-span-full flex max-w-3xl flex-col gap-section-compact"
            }
          >
            {statement && <AboutStatement text={statement} emphasis={profile.emphasis} />}

            <div data-reveal className={styles.interests}>
              <dl>
                <dt className="font-mono text-eyebrow text-foreground-muted uppercase">Interests</dt>
                <dd className="mt-micro text-body font-medium text-foreground">
                  {profile.interests.map((interest, i) => (
                    <Fragment key={interest}>
                      {/* Items never break across lines; the line wraps between them. */}
                      <span className="whitespace-nowrap">{interest}</span>
                      {i < profile.interests.length - 1 && <span className="font-bold text-accent"> · </span>}
                    </Fragment>
                  ))}
                </dd>
              </dl>
            </div>
          </div>
        </Grid>
      </Container>
    </Section>
  );
}
