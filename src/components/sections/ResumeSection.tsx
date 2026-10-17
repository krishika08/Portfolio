import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { SheetRule } from "@/components/portfolio/SheetRule";
import { BaseLink } from "@/components/ui/BaseLink";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { Tilt } from "@/components/ui/Tilt";
import { sectionIds } from "@/config/navigation";
import { profile } from "@/content/profile";

// Destination 07: the resume, opened or downloaded from its one real file.
// Renders only when `profile.resume` is set, so there is never a dead link or
// a stand-in document; the Index and the section numbers adjust with it.
export function ResumeSection() {
  const href = profile.resume;
  if (!href) return null;

  return (
    <Section
      id={sectionIds.resume}
      aria-labelledby="resume-title"
      spacing="compact"
      className="relative isolate border-t border-border-subtle"
    >
      <Container>
        <SheetRule section={sectionIds.resume} className="mb-block" />
        <Grid className="items-center gap-y-cluster">
          <SectionHeader id="resume-title" title="Resume" className="col-span-full lg:col-span-5" />

          {/* A drawn sheet of paper: decoration only, no invented content. */}
          <div aria-hidden className="reveal col-span-4 md:col-span-3 lg:col-span-3 lg:col-start-7">
            <Tilt max={5} className="mx-auto w-40 rounded-sm border border-border-strong bg-surface p-5 shadow-elevated">
              <span className="block h-1.5 w-10 bg-accent" />
              <span className="mt-4 block space-y-2">
                {[100, 86, 94, 62, 100, 78, 90, 54].map((width, i) => (
                  <span key={i} className="block h-px bg-border-strong" style={{ width: `${width}%` }} />
                ))}
              </span>
              <span className="mt-12 block h-16 border border-border" />
            </Tilt>
          </div>

          <div className="col-span-full flex flex-wrap items-center gap-x-cluster gap-y-tight md:col-span-5 lg:col-span-3 lg:col-start-10">
            <ButtonLink href={href} newTab>
              View resume
              <Icon name="arrow-up-right" />
            </ButtonLink>
            <BaseLink
              href={href}
              download
              className="inline-flex min-h-11 items-center text-label text-foreground underline decoration-border-strong decoration-1 underline-offset-[0.4em] transition-colors hover:decoration-foreground"
            >
              Download PDF
            </BaseLink>
          </div>
        </Grid>
      </Container>
    </Section>
  );
}
