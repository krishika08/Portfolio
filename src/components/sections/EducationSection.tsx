import type { CSSProperties } from "react";
import { CountUp } from "@/components/motion/CountUp";
import { Metadata } from "@/components/portfolio/Metadata";
import { SheetRule } from "@/components/portfolio/SheetRule";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { sectionIds } from "@/config/navigation";
import { achievements, education } from "@/content/education";

const groupHeading = "flex items-center gap-tight font-mono text-eyebrow text-foreground-secondary uppercase";
const pad = (n: number) => String(n).padStart(2, "0");

// Supporting credibility: compact, list-based, no certificate wall. The
// degree is set as an identity plate (the CGPA counts up when first seen);
// certifications and achievements are numbered ruled rows.
export function EducationSection() {
  return (
    <Section
      id={sectionIds.education}
      spacing="compact"
      aria-labelledby="education-title"
      className="relative isolate border-t border-border-subtle"
    >
      <Container>
        <SheetRule section={sectionIds.education} className="mb-block" />
        <Grid className="gap-y-cluster">
          <Heading level={2} size="h2" id="education-title" className="col-span-full lg:col-span-4">
            Education & achievements
          </Heading>

          <div className="col-span-full lg:col-span-4 lg:col-start-5">
            <h3 className={groupHeading}>
              <span aria-hidden className="h-3 w-px bg-accent" />
              Education
            </h3>
            <ul className="mt-group space-y-cluster">
              {education.map((item) => (
                <li
                  key={item.id}
                  className="reveal corner-marks rounded-md border border-border bg-surface p-cluster"
                >
                  <p className="font-display text-h2 text-foreground">
                    {item.institution}
                    {item.location && `, ${item.location}`}
                  </p>
                  <Text tone="secondary" className="mt-tight">
                    {item.degree}
                  </Text>
                  <Metadata
                    className="mt-cluster border-t border-border pt-group"
                    items={[
                      { label: "Years", value: `${item.dates.start}–${item.dates.end ?? "Present"}` },
                      ...(item.result
                        ? [
                            {
                              label: item.result.label,
                              value: <ResultValue value={item.result.value} />,
                            },
                          ]
                        : []),
                    ]}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-full lg:col-span-4 lg:col-start-9">
            <h3 className={groupHeading}>
              <span aria-hidden className="h-3 w-px bg-accent" />
              Certifications & achievements
            </h3>
            <ul className="mt-group border-t border-border-strong">
              {achievements.map((item, i) => (
                <li
                  key={item.id}
                  className="group reveal grid grid-cols-[2rem_1fr] gap-x-tight border-b border-border py-group transition-colors hover:border-accent"
                  style={{ "--delay": `${i * 90}ms` } as CSSProperties}
                >
                  <span aria-hidden className="pt-0.5 font-mono text-meta text-foreground-muted transition-colors group-hover:text-accent">
                    {pad(i + 1)}
                  </span>
                  <div>
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
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Grid>
      </Container>
    </Section>
  );
}

/** "8.24/10": the figure counts up; the scale stays still. Other values render as text. */
function ResultValue({ value }: { value: string }) {
  const match = value.match(/^(\d+(?:\.\d+)?)(\/.*)?$/);
  if (!match?.[1]) return <>{value}</>;
  return (
    <>
      <CountUp value={match[1]} />
      {match[2]}
    </>
  );
}
