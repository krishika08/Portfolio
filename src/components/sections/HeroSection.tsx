import Image from "next/image";
import { CtaGroup } from "@/components/portfolio/CtaGroup";
import { Metadata, type MetadataItem } from "@/components/portfolio/Metadata";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";
import { sectionHref, sectionIds } from "@/config/navigation";
import { routes } from "@/config/routes";
import { education } from "@/content/education";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { getExperience, getFlagshipProject, getSocialLinks, hasCaseStudy } from "@/lib/content";

// Typography-led identity with the owner's portrait, the primary path into
// Selected Work, verification links, and restrained technical metadata —
// including a direct route to the flagship — derived from content data.
export function HeroSection() {
  const flagship = getFlagshipProject();
  const [latestRole] = getExperience();
  const [degree] = education;
  const profiles = getSocialLinks().filter((link) => link.id !== "email");
  const portrait = profile.portraits?.hero;

  const facts: MetadataItem[] = [
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
    ...(latestRole
      ? [{ label: "Experience", value: `${latestRole.role}, ${latestRole.organization}` }]
      : []),
    { label: "Direction", value: profile.direction },
    ...(flagship
      ? [
          {
            label: "Flagship project",
            value: (
              <TextLink
                href={hasCaseStudy(flagship) ? routes.project(flagship.slug) : sectionHref(sectionIds.work)}
                variant="plain"
                className="inline-flex min-h-6 items-center gap-micro"
              >
                {flagship.name}
                <Icon name="arrow-right" />
              </TextLink>
            ),
          },
        ]
      : []),
  ];

  return (
    <Section spacing="none" aria-labelledby="hero-title" className="pt-block pb-block md:pt-section">
      <Container>
        {/* The portrait stands on the rule that closes the identity row. */}
        <Grid className="items-end border-b border-border">
          <div className={cn("col-span-full pb-block", portrait ? "lg:col-span-7" : "lg:col-span-9")}>
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

          {portrait && (
            <div className="col-span-full lg:col-span-5">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                width={portrait.width}
                height={portrait.height}
                sizes="(min-width: 1024px) 28rem, 15rem"
                preload
                className="h-auto w-full max-w-60 lg:ml-auto lg:max-w-md"
              />
            </div>
          )}
        </Grid>

        <Metadata layout="grid" items={facts} className="pt-group md:grid-cols-2 lg:grid-cols-4" />
      </Container>
    </Section>
  );
}
