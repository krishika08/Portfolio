import { Metadata } from "@/components/portfolio/Metadata";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { sectionIds } from "@/config/navigation";
import { achievements, education } from "@/content/education";

const groupHeading = "flex items-center gap-tight font-mono text-eyebrow text-foreground-secondary uppercase";

// Supporting credibility: compact, list-based, no certificate wall.
export function EducationSection() {
  return (
    <Section
      id={sectionIds.education}
      spacing="compact"
      aria-labelledby="education-title"
      className="relative isolate border-t border-border-subtle"
    >
      <Container>
        <Grid className="gap-y-cluster">
          <Heading level={2} size="h2" id="education-title" className="col-span-full lg:col-span-4">
            Education & achievements
          </Heading>

          <div className="col-span-full lg:col-span-4 lg:col-start-5">
            <h3 className={groupHeading}>
              <span aria-hidden className="chapter-squares scale-75" />
              Education
            </h3>
            <ul className="mt-group space-y-cluster">
              {education.map((item) => (
                <li key={item.id} className="reveal border-t border-accent pt-group">
                  <p className="font-display text-h2 text-foreground">
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
            <h3 className={groupHeading}>
              <span aria-hidden className="chapter-squares scale-75" />
              Certifications & achievements
            </h3>
            <ul className="mt-group">
              {achievements.map((item) => (
                <li key={item.id} className="group border-t border-border py-group transition-colors hover:border-accent">
                  <p className="font-display text-[1.25rem] leading-tight tracking-[0.02em] text-foreground transition-colors group-hover:text-accent">
                    {item.title}
                  </p>
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
