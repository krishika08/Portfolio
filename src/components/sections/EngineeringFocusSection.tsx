import { CapabilityCluster } from "@/components/portfolio/CapabilityCluster";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Section } from "@/components/ui/Section";
import { sectionIds } from "@/config/navigation";
import { getCapabilityClusters } from "@/lib/content";

// Capability → technologies → evidence. Evidence is derived from project,
// experience and achievement data; nothing is self-rated.
export function EngineeringFocusSection() {
  return (
    <Section
      id={sectionIds.focus}
      aria-labelledby="focus-title"
      className="border-y border-border-subtle bg-surface"
    >
      <Container>
        <Grid className="gap-y-block">
          <SectionHeader
            id="focus-title"
            title="Engineering focus"
            description="Skills grouped by capability. Each lists where it has been used, across projects, internships and certifications."
            className="col-span-full lg:col-span-4"
          />
          <div className="col-span-full grid gap-x-grid gap-y-block md:grid-cols-2 lg:col-span-8 lg:col-start-5">
            {getCapabilityClusters().map((cluster) => (
              <CapabilityCluster
                key={cluster.id}
                id={`focus-${cluster.id}`}
                title={cluster.label}
                capabilities={cluster.capabilities}
                className="reveal"
              />
            ))}
          </div>
        </Grid>
      </Container>
    </Section>
  );
}
