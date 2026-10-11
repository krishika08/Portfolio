import type { CSSProperties } from "react";
import { ProjectPreview } from "@/components/portfolio/ProjectPreview";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { SheetRule } from "@/components/portfolio/SheetRule";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { sectionIds } from "@/config/navigation";
import { getAdditionalProjects, getFlagshipProject, getSupportingProjects } from "@/lib/content";

// Primary proof layer, as numbered figures: the flagship in full, then the
// supporting projects (the second set lower, so the pair is not a mirrored
// grid), then additional work. Order and emphasis come from project
// tier/order.
export function SelectedWorkSection() {
  const flagship = getFlagshipProject();
  const supporting = getSupportingProjects();
  const additional = getAdditionalProjects();
  const offset = flagship ? 2 : 1;
  const total = (flagship ? 1 : 0) + supporting.length + additional.length;

  return (
    <Section id={sectionIds.work} aria-labelledby="work-title" className="relative isolate">
      <Container>
        <SheetRule className="mb-block" />
        <SectionHeader id="work-title" title="Selected work" />
        <div className="mt-block flex flex-col gap-section">
          {flagship && <ProjectPreview project={flagship} index={1} total={total} className="reveal" />}
          {supporting.length > 0 && (
            <ul className="grid gap-x-grid gap-y-block md:grid-cols-2">
              {supporting.map((project, i) => (
                <li key={project.slug} className="reveal flex md:even:mt-section-compact" style={{ "--delay": `${i * 120}ms` } as CSSProperties}>
                  <ProjectPreview project={project} index={i + offset} total={total} />
                </li>
              ))}
            </ul>
          )}
          {additional.length > 0 && (
            <ul className="flex flex-col gap-cluster">
              {additional.map((project, i) => (
                <li key={project.slug}>
                  <ProjectPreview
                    project={project}
                    index={i + offset + supporting.length}
                    total={total}
                    className="reveal"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </Section>
  );
}
