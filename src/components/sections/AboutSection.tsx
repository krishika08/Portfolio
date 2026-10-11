import { Manifesto } from "@/components/portfolio/Manifesto";
import { Metadata } from "@/components/portfolio/Metadata";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { Watermark } from "@/components/portfolio/Watermark";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Media } from "@/components/ui/Media";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { Tilt } from "@/components/ui/Tilt";
import { sectionIds } from "@/config/navigation";
import { profile } from "@/content/profile";

// Compact human context from profile data: the opening paragraphs, then the
// closing paragraph set as a manifesto beside the owner's portrait.
export function AboutSection() {
  const paragraphs = profile.about;
  const statement = paragraphs.at(-1);
  const [opening, ...rest] = paragraphs.slice(0, -1);
  const portrait = profile.portraits?.about;

  return (
    <Section id={sectionIds.about} aria-labelledby="about-title" className="relative isolate border-t border-border-subtle">
      <Watermark text="About" className="top-[calc(var(--spacing-section)-0.5rem)]" />
      <Container>
        <Grid className="gap-y-cluster">
          <SectionHeader id="about-title" eyebrow="Current direction" title="About" className="col-span-full lg:col-span-4" />
          {(opening || rest.length > 0) && (
            <div className="col-span-full max-w-reading space-y-group lg:col-span-7 lg:col-start-6 lg:pt-cluster">
              {opening && <Text size="lead">{opening}</Text>}
              {rest.map((paragraph) => (
                <Text key={paragraph} size="lead" tone="secondary">
                  {paragraph}
                </Text>
              ))}
            </div>
          )}
        </Grid>

        <Grid className="mt-section-compact items-start gap-y-block">
          {portrait && (
            <div className="col-span-full lg:col-span-3">
              <Tilt className="w-full max-w-60 rounded-md lg:max-w-none">
                <Media image={portrait} ratio="1/1" sizes="(min-width: 1024px) 18rem, 15rem" mono />
              </Tilt>
            </div>
          )}
          <div className={portrait ? "col-span-full lg:col-span-9 lg:col-start-4" : "col-span-full"}>
            {statement && <Manifesto text={statement} emphasis={profile.emphasis} />}
            <Metadata
              className="mt-block border-t border-border pt-group"
              items={[{ label: "Interests", value: profile.interests.join(" · ") }]}
            />
          </div>
        </Grid>
      </Container>
    </Section>
  );
}
