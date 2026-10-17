import { Fragment, type CSSProperties } from "react";
import Image from "next/image";
import { SheetRule } from "@/components/portfolio/SheetRule";
import { AboutStatement } from "@/components/sections/AboutStatement";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { Tilt } from "@/components/ui/Tilt";
import { sectionIds } from "@/config/navigation";
import { profile } from "@/content/profile";
import styles from "./AboutSection.module.css";

// A monochrome editorial spread. One warm off-white carries all the text
// (hierarchy comes from scale, weight and space, never colour). An oversized
// "About" opens the sheet beside the introduction; below it the portrait is
// mounted like a print on a grained plate, with drafting guides running off
// its corners, and the engineering statement is typeset opposite in two
// tiers; the Interests line closes the sheet. All copy comes from profile data.
export function AboutSection() {
  const paragraphs = profile.about;
  const statement = paragraphs.at(-1);
  const [opening, ...rest] = paragraphs.slice(0, -1);
  const portrait = profile.portraits?.about;

  return (
    <Section
      id={sectionIds.about}
      aria-labelledby="about-title"
      className={`${styles.about} relative isolate border-t border-border-subtle`}
    >
      <div aria-hidden className={styles.light} />
      <Container>
        <SheetRule section={sectionIds.about} className="mb-block" />

        <div className={styles.band}>
          <header data-reveal className={styles.head}>
            <p className={styles.eyebrow}>
              <span aria-hidden className={styles.tick} />
              Current direction
            </p>
            <h2 id="about-title" className={styles.title}>
              <span className={styles.titleMask}>
                <span className={styles.titleIn}>About</span>
              </span>
            </h2>
          </header>

          {(opening || rest.length > 0) && (
            <div data-reveal className={styles.intro}>
              {opening && <Text size="lead">{opening}</Text>}
              {rest.map((paragraph) => (
                <Text key={paragraph} size="lead" tone="secondary">
                  {paragraph}
                </Text>
              ))}
            </div>
          )}
        </div>

        <div className={styles.spread}>
          {portrait && (
            <div data-reveal className={styles.stageWrap}>
              <Tilt max={3} glare={false} className={styles.stage}>
                <span aria-hidden className={`${styles.guide} ${styles.guideTop}`} />
                <span aria-hidden className={`${styles.guide} ${styles.guideBottom}`} />
                <span aria-hidden className={`${styles.guide} ${styles.guideLeft}`} />
                <span aria-hidden className={`${styles.guide} ${styles.guideRight}`} />
                <div aria-hidden className={styles.slab} />
                <svg aria-hidden className={styles.outline} viewBox="0 0 400 500">
                  <rect x="0.5" y="0.5" width="399" height="499" pathLength="1" />
                </svg>
                <div className={styles.print}>
                  <div className={styles.photo}>
                    <Image
                      src={portrait.src}
                      alt={portrait.alt}
                      fill
                      sizes="(min-width: 1024px) 28rem, (min-width: 640px) 26rem, 84vw"
                    />
                  </div>
                </div>
                <span aria-hidden className={styles.marker} />
              </Tilt>
            </div>
          )}

          <div className={styles.copy}>{statement && <AboutStatement text={statement} emphasis={profile.emphasis} />}</div>
        </div>

        <div data-reveal className={styles.interests}>
          <dl>
            <dt className={styles.label}>Interests</dt>
            <dd className={styles.items}>
              {profile.interests.map((interest, i) => (
                <Fragment key={interest}>
                  {/* Items never break across lines; the line wraps between them. */}
                  <span className={styles.item} style={{ "--i": i } as CSSProperties}>
                    {interest}
                  </span>
                  {i < profile.interests.length - 1 && (
                    <span className={styles.sep} style={{ "--i": i + 0.5 } as CSSProperties}>
                      {" · "}
                    </span>
                  )}
                </Fragment>
              ))}
            </dd>
          </dl>
        </div>
      </Container>
    </Section>
  );
}
