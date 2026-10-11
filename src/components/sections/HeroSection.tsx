import { CtaGroup } from "@/components/portfolio/CtaGroup";
import { Metadata, type MetadataItem } from "@/components/portfolio/Metadata";
import { BaseLink } from "@/components/ui/BaseLink";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { sectionHref, sectionIds } from "@/config/navigation";
import { education } from "@/content/education";
import { profile } from "@/content/profile";
import { getExperience, getFlagshipProject, getSocialLinks } from "@/lib/content";

// Typography-led identity, the primary path into Selected Work, verification
// links, and restrained technical metadata derived from content data.
export function HeroSection() {
  const flagship = getFlagshipProject();
  const [latestRole] = getExperience();
  const [degree] = education;
  const profiles = getSocialLinks().filter((link) => link.id !== "email");

  const facts: MetadataItem[] = [
    ...(degree
      ? [
          {
            label: "Education",
            value: `${degree.degree}, ${degree.shortName ?? degree.institution} · ${degree.dates.start}–${degree.dates.end}`,
          },
        ]
      : []),
    ...(latestRole
      ? [{ label: "Experience", value: `${latestRole.role}, ${latestRole.organization}` }]
      : []),
    { label: "Direction", value: profile.direction },
  ];

  return (
    <Section spacing="none" aria-labelledby="hero-title" className="pt-block pb-block md:pt-section">
      <Container>
        <Grid className="gap-y-block">
          <div className="col-span-full lg:col-span-9">
            <h1 id="hero-title" className="font-display text-display text-foreground">
              {profile.name},
              <br />
              <span className="text-foreground-muted">{profile.role.toLowerCase()}.</span>
            </h1>
            <Text size="lead" tone="secondary" className="mt-cluster max-w-reading">
              {profile.intro}
            </Text>
            <CtaGroup className="mt-cluster">
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

          {flagship && (
            // Desktop-only pointer to the strongest evidence; on smaller
            // screens Selected Work follows directly.
            <BaseLink
              href={sectionHref(sectionIds.work)}
              className="group col-span-3 col-start-10 hidden self-end rounded-sm border-t border-foreground pt-group lg:block"
            >
              <span className="block font-mono text-eyebrow text-foreground-muted uppercase">Flagship project</span>{" "}
              <span className="mt-tight flex items-center justify-between gap-tight font-display text-h3 text-foreground group-hover:text-accent">
                {flagship.name}
                <Icon name="arrow-down" className="text-lg" />
              </span>{" "}
              <span className="mt-micro block font-mono text-meta text-foreground-secondary">
                {flagship.technologies.join(" · ")}
              </span>
            </BaseLink>
          )}

          <Metadata
            layout="grid"
            items={facts}
            className="col-span-full border-t border-border pt-group md:grid-cols-3"
          />
        </Grid>
      </Container>
    </Section>
  );
}
