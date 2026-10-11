import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
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
import { achievements, education } from "@/content/education";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { getCoreTechnologies, getExperience, getFlagshipProject, getSocialLinks, hasCaseStudy } from "@/lib/content";

interface Stat {
  label: string;
  value: string;
  unit?: string;
}

interface Fact {
  label: string;
  value: ReactNode;
}

/** Stagger for the one-shot entrance (see the `enter*` utilities). */
const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

// Full-height identity: headline numbers at the left, the owner's portrait
// standing in front of the K watermark at the centre, verified facts at the
// right, and name, intro and actions at the bottom left. Every value is
// derived from content data.
export function HeroSection() {
  const flagship = getFlagshipProject();
  const roles = getExperience();
  const [latestRole] = roles;
  const [degree] = education;
  const badges = achievements.find((item) => item.highlight)?.highlight;
  const profiles = getSocialLinks().filter((link) => link.id !== "email");
  const portrait = profile.portraits?.hero;
  const internships = roles.filter((role) => /\bintern\b/i.test(role.role)).length;

  const [score, scale] = degree?.result?.value.split("/") ?? [];
  const stats: Stat[] = [
    ...(degree?.result && score ? [{ label: degree.result.label, value: score, unit: scale && `/${scale}` }] : []),
    ...(badges ? [{ label: badges.label, value: badges.value }] : []),
    ...(internships > 0 ? [{ label: internships === 1 ? "Internship" : "Internships", value: String(internships) }] : []),
  ];

  const facts: Fact[] = [
    ...(degree
      ? [
          {
            label: "Education",
            value: (
              <>
                {degree.degree}, {degree.shortName ?? degree.institution} ·{" "}
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
  ];

  return (
    <Section
      spacing="none"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden border-b border-border"
    >
      {/* Blueprint squares and a cobalt glow behind the portrait. */}
      <div aria-hidden className="blueprint absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="glow-pulse absolute top-[18%] left-1/2 -z-10 size-[38rem] max-w-[120vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--accent-glow),transparent)] opacity-40 blur-2xl"
      />

      <Container className="hero-grid min-h-[calc(100svh-var(--header-height))] gap-y-cluster pt-cluster pb-cluster lg:max-h-[64rem] lg:gap-y-0 lg:pt-block">
        {/* Identity: name, intro and actions. First in the DOM. */}
        <div className="[grid-area:intro] self-end lg:pb-tight">
          <h1 id="hero-title" className="font-display text-[clamp(3rem,1.2rem+4vw,4.75rem)] leading-[0.9] text-foreground">
            <span className="line-mask">
              <span className="enter-line" style={delay(250)}>
                {profile.name},
              </span>
            </span>{" "}
            <span className="line-mask">
              <span className="enter-line text-accent" style={delay(380)}>
                {profile.role.toLowerCase()}.
              </span>
            </span>
          </h1>
          <Text tone="secondary" className="enter mt-cluster max-w-[26rem]" style={delay(600)}>
            {profile.intro}
          </Text>
          <div className="enter mt-cluster" style={delay(720)}>
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

        {/* Headline numbers. */}
        {stats.length > 0 && (
          <dl className="grid grid-cols-3 gap-group [grid-area:stats] max-lg:border-t max-lg:border-border max-lg:pt-group lg:flex lg:flex-col lg:justify-center lg:gap-group lg:pb-cluster">
            {stats.map((stat, i) => (
              <div key={stat.label} className="enter flex flex-col-reverse" style={delay(800 + i * 110)}>
                <dt className="mt-micro text-body-sm text-foreground-secondary">{stat.label}</dt>
                <dd className="font-display text-[clamp(2.25rem,1.7rem+1.8vw,3.25rem)] leading-[0.9] text-foreground">
                  {stat.value}
                  {stat.unit && <span className="text-[0.45em] text-foreground-muted">{stat.unit}</span>}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {/* Portrait stage: K watermark behind, portrait, core technologies in front. */}
        {portrait && (
          <div className="relative flex items-end justify-center [grid-area:stage] max-lg:min-h-[24rem] lg:-mb-cluster">
            <div className="enter-stage w-full" style={delay(120)}>
              <Tilt max={7} glare={false} className="mono-media mx-auto flex w-full max-w-[17rem] justify-center sm:max-w-[19rem] lg:max-w-[28rem]">
                <span aria-hidden className="depth-back pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
                  <span className="hero-k enter-watermark block">K</span>
                </span>
                <div className="depth-1 relative drop-shadow-[0_30px_40px_rgb(0_0_0/0.6)]">
                  <Image
                    src={portrait.src}
                    alt={portrait.alt}
                    width={portrait.width}
                    height={portrait.height}
                    sizes="(min-width: 1024px) 28rem, (min-width: 640px) 19rem, 17rem"
                    preload
                    className="h-auto w-full"
                  />
                </div>
                <TechOrbit />
              </Tilt>
            </div>
          </div>
        )}

        {/* Verified facts. */}
        <dl className="flex flex-col gap-group [grid-area:facts] max-md:border-t max-md:border-border max-md:pt-group lg:justify-center lg:gap-cluster lg:text-right">
          {facts.map((fact, i) => (
            <div key={fact.label} className="enter" style={delay(860 + i * 110)}>
              <dt className="font-mono text-eyebrow text-foreground-muted uppercase">{fact.label}</dt>
              <dd className="mt-micro text-body-sm text-foreground lg:ml-auto lg:max-w-[18rem]">{fact.value}</dd>
            </div>
          ))}
        </dl>

        {/* Direct route to the flagship. */}
        {flagship && (
          <div className="enter [grid-area:flag] self-end max-lg:border-t max-lg:border-border max-lg:pt-group lg:pb-tight lg:text-right" style={delay(1100)}>
            <p className="font-mono text-eyebrow text-foreground-muted uppercase">Flagship project</p>
            <TextLink
              href={hasCaseStudy(flagship) ? routes.project(flagship.slug) : sectionHref(sectionIds.work)}
              variant="plain"
              className="group mt-micro inline-flex min-h-11 items-center gap-tight font-display text-h2 hover:no-underline"
            >
              <span className="draw-underline">{flagship.name}</span>
              <Icon name="arrow-right" className="text-[0.6em] transition-transform group-hover:translate-x-1" />
            </TextLink>
          </div>
        )}
      </Container>
    </Section>
  );
}

/** The most-used technologies, floating in front of the portrait (decorative; listed in Engineering focus). */
function TechOrbit() {
  const positions = ["top-[14%] -left-[6%]", "top-[42%] -right-[10%]", "bottom-[16%] -left-[2%]"];
  return (
    <ul aria-hidden className="depth-2 pointer-events-none absolute inset-0">
      {getCoreTechnologies(positions.length).map((name, i) => (
        <li
          key={name}
          className={cn(
            "enter absolute flex items-center gap-tight rounded-sm border border-border bg-surface/85 px-2.5 py-1.5 font-mono text-meta text-foreground shadow-elevated backdrop-blur-sm",
            positions[i],
          )}
          style={delay(1200 + i * 140)}
        >
          <span className="size-1.5 bg-accent" />
          {name}
        </li>
      ))}
    </ul>
  );
}
