import { Metadata } from "@/components/portfolio/Metadata";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { sectionIds } from "@/config/navigation";
import { achievements, education } from "@/content/education";

const groupHeading = "font-mono text-eyebrow text-foreground-secondary uppercase";

// Supporting credibility: compact, list-based, no certificate wall.
export function EducationSection() {
  return (
    <Section
      id={sectionIds.education}
      spacing="compact"
      aria-labelledby="education-title"
      className="border-t border-border-subtle"
    >
      <Container>
        <Grid className="gap-y-cluster">
          <Heading level={2} id="education-title" className="col-span-full lg:col-span-4">
            Education & achievements
          </Heading>

          <div className="col-span-full lg:col-span-4 lg:col-start-5">
            <h3 className={groupHeading}>Education</h3>
            <ul className="mt-group space-y-cluster">
              {education.map((item) => (
                <li key={item.id} className="border-t border-border pt-group">
                  <p className="font-display text-h3 text-foreground">
                    {item.institution}
                    {item.location && `, ${item.location}`}
                  </p>
                  <Text tone="secondary" className="mt-micro">
                    {item.degree}
                  </Text>
                  <Metadata
                    className="mt-group"
                    items={[
                      { label: "Years", value: `${item.dates.start}–${item.dates.end ?? "Present"}` },
                      ...(item.result ? [{ label: item.result.label, value: item.result.value }] : []),
                    ]}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-full lg:col-span-4 lg:col-start-9">
            <h3 className={groupHeading}>Certifications & achievements</h3>
            <ul className="mt-group">
              {achievements.map((item) => (
                <li key={item.id} className="border-t border-border py-group">
                  <p className="text-body font-medium text-foreground">{item.title}</p>
                  {(item.organization || item.date) && (
                    <p className="mt-micro font-mono text-meta text-foreground-muted">
                      {[item.organization, item.date].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  {item.details && (
                    <Text size="sm" tone="secondary" className="mt-micro">
                      {item.details}
                    </Text>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Grid>
      </Container>
    </Section>
  );
}
