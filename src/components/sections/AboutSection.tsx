import { Metadata } from "@/components/portfolio/Metadata";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { sectionIds } from "@/config/navigation";
import { profile } from "@/content/profile";

// Compact human context: current position and direction, from profile data.
export function AboutSection() {
  const [opening, ...rest] = profile.about;

  return (
    <Section id={sectionIds.about} aria-labelledby="about-title" className="border-t border-border-subtle">
      <Container>
        <Grid className="gap-y-cluster">
          <SectionHeader
            id="about-title"
            eyebrow="Current direction"
            title="About"
            className="col-span-full lg:col-span-4"
          />
          <div className="col-span-full max-w-reading space-y-group lg:col-span-7 lg:col-start-6">
            {opening && <Text size="lead">{opening}</Text>}
            {rest.map((paragraph) => (
              <Text key={paragraph} size="lead" tone="secondary">
                {paragraph}
              </Text>
            ))}
            <Metadata
              className="pt-group"
              items={[{ label: "Interests", value: profile.interests.join(" · ") }]}
            />
          </div>
        </Grid>
      </Container>
    </Section>
  );
}
