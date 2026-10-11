import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { HeroK } from "@/components/motion/HeroK";
import { SplitText } from "@/components/motion/SplitText";
import { CtaGroup } from "@/components/portfolio/CtaGroup";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";
import { Tilt } from "@/components/ui/Tilt";
import { sectionHref, sectionIds } from "@/config/navigation";
import { routes } from "@/config/routes";
import { education } from "@/content/education";
import { profile } from "@/content/profile";
import { getExperience, getFlagshipProject, getSocialLinks, hasCaseStudy } from "@/lib/content";

interface Fact {
  label: string;
  value: ReactNode;
}

/** Stagger for the one-shot entrance (see `.enter` in globals.css). */
const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

// Typography-led identity on a drafting sheet: the name and role in masked,
// rising type; the owner's portrait standing in front of a WebGL K that
// assembles from particles; the primary path into Selected Work; and the
// verified facts as a title block along the bottom. Every value comes from
// content data.
export function HeroSection() {
  const flagship = getFlagshipProject();
  const [latestRole] = getExperience();
  const [degree] = education;
  const profiles = getSocialLinks().filter((link) => link.id !== "email");
  const portrait = profile.portraits?.hero;

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
              <TextLink
                href={hasCaseStudy(flagship) ? routes.project(flagship.slug) : sectionHref(sectionIds.work)}
                variant="plain"
                className="group/link inline-flex min-h-6 items-center gap-micro"
              >
                {flagship.name}
                <Icon
                  name="arrow-right"
                  className="transition-transform duration-(--duration-standard) group-hover/link:translate-x-1"
                />
              </TextLink>
            ),
          },
        ]
      : []),
  ];

  return (
    <Section spacing="none" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <Container className="flex min-h-[calc(100svh-var(--header-height))] flex-col pt-cluster pb-block md:pt-block">
        <div className="grid flex-1 grid-cols-1 items-center gap-y-block lg:grid-cols-12 lg:gap-x-grid">
          {/* Identity. First in the DOM; below the stage on small screens. */}
          <div className="relative z-20 lg:col-span-7 lg:col-start-1 lg:row-start-1">
            <h1 id="hero-title" className="enter-words max-w-[7.4em] font-display text-display text-foreground">
              <span className="block">
                <SplitText text={`${profile.name},`} />
              </span>
              <span className="block text-accent">
                <SplitText text={`${profile.role.toLowerCase()}.`} start={1} />
              </span>
            </h1>
            <Text tone="secondary" size="lead" className="enter mt-cluster max-w-reading" style={delay(700)}>
              {profile.intro}
            </Text>
            <div className="enter mt-cluster" style={delay(820)}>
              <CtaGroup>
                <ButtonLink href={sectionHref(sectionIds.work)}>
                  View selected work
                  <Icon name="arrow-down" />
                </ButtonLink>
                {profile.resume && (
                  <ButtonLink href={profile.resume} newTab variant="secondary">
                    Resume
                  </ButtonLink>
                )}
                {profiles.length > 0 && (
                  // Profile links wrap together as one unit on narrow screens.
                  <span className="flex gap-x-group">
                    {profiles.map((link) => (
                      <ButtonLink key={link.id} href={link.href} newTab variant="text">
                        {link.label}
                        <Icon name="arrow-up-right" />
                      </ButtonLink>
                    ))}
                  </span>
                )}
              </CtaGroup>
            </div>
          </div>

          {/* Stage: the K behind, the portrait in front. */}
          {portrait && (
            <div className="relative h-[min(26rem,62svh)] max-lg:order-first lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:h-[min(36rem,66svh)] lg:self-end">
              <div
                aria-hidden
                className="absolute inset-x-[-10%] top-[6%] bottom-0 -z-10 bg-[radial-gradient(closest-side,rgb(79_127_255/0.18),transparent)]"
              />
              <HeroK className="absolute -inset-x-[12%] -top-[18%] -bottom-[6%] -z-10 lg:-inset-x-[8%] lg:-top-[22%]" />
              <div className="enter-rise absolute inset-x-0 bottom-0 flex justify-center">
                <Tilt max={6} glare={false} className="w-[min(72%,17rem)] origin-bottom lg:w-[min(66%,23rem)]">
                  <div className="depth-1 relative drop-shadow-[0_32px_40px_rgb(0_0_0/0.65)]">
                    <Image
                      src={portrait.src}
                      alt={portrait.alt}
                      width={portrait.width}
                      height={portrait.height}
                      sizes="(min-width: 1024px) 24rem, 17rem"
                      preload
                      className="h-auto w-full"
                    />
                  </div>
                </Tilt>
              </div>
            </div>
          )}
        </div>

        {/* Title block: the verified facts, ruled like a drawing's border. */}
        <dl className="grid grid-cols-1 gap-y-group border-t border-border-strong pt-group sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {facts.map((fact, i) => (
            <div
              key={fact.label}
              className="enter min-w-0 lg:border-l lg:border-border lg:px-group lg:first:border-l-0 lg:first:pl-0"
              style={delay(950 + i * 90)}
            >
              <dt className="font-mono text-eyebrow text-foreground-muted uppercase">{fact.label}</dt>
              <dd className="mt-micro text-body-sm text-foreground">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
