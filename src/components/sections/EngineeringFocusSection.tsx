import type { CSSProperties } from "react";
import { CapabilityCluster } from "@/components/portfolio/CapabilityCluster";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { SheetRule } from "@/components/portfolio/SheetRule";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Section } from "@/components/ui/Section";
import { sectionIds } from "@/config/navigation";
import { getCapabilityClusters } from "@/lib/content";

// Capability → technologies → evidence, as a specification sheet. Evidence
// is derived from project, experience and achievement data; nothing is
// self-rated. Set on the graphite band, with the title held in view beside
// the tables on wide screens.
export function EngineeringFocusSection() {
  return (
    <Section
      id={sectionIds.focus}
      aria-labelledby="focus-title"
      className="relative isolate border-y border-border-subtle bg-surface"
    >
      <Container>
        <SheetRule section={sectionIds.focus} className="mb-block" />
        <Grid className="gap-y-block">
          <SectionHeader
            id="focus-title"
            title="Engineering focus"
            size="h2"
            description="Skills grouped by capability. Where a skill has been used in a project, internship or certification, that evidence is listed beside it."
            className="col-span-full lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:col-span-4 lg:self-start"
          />
          <div className="col-span-full grid gap-x-grid gap-y-block md:grid-cols-2 lg:col-span-8 lg:col-start-5">
            {getCapabilityClusters().map((cluster, i) => (
              <CapabilityCluster
                key={cluster.id}
                id={`focus-${cluster.id}`}
                title={cluster.label}
                capabilities={cluster.capabilities}
                className="reveal"
                style={{ "--delay": `${(i % 2) * 120}ms` } as CSSProperties}
              />
            ))}
          </div>
        </Grid>
      </Container>
    </Section>
  );
}
