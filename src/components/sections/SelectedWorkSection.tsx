import { ProjectPreview } from "@/components/portfolio/ProjectPreview";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { Watermark } from "@/components/portfolio/Watermark";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { sectionIds } from "@/config/navigation";
import { getAdditionalProjects, getFlagshipProject, getSupportingProjects } from "@/lib/content";

// Primary proof layer, as numbered chapters: the flagship in full, then the
// supporting projects, then additional work. Order and emphasis come from
// project tier/order.
export function SelectedWorkSection() {
  const flagship = getFlagshipProject();
  const supporting = getSupportingProjects();
  const additional = getAdditionalProjects();
  const offset = flagship ? 2 : 1;
  const total = (flagship ? 1 : 0) + supporting.length + additional.length;

  return (
    <Section id={sectionIds.work} aria-labelledby="work-title" className="relative isolate">
      <Watermark text="Selected work" className="top-[calc(var(--spacing-section)-0.5rem)]" />
      <Container>
        <SectionHeader id="work-title" title="Selected work" />
        <div className="mt-block flex flex-col gap-section">
          {flagship && <ProjectPreview project={flagship} index={1} total={total} className="reveal" />}
          {supporting.length > 0 && (
            <ul className="grid gap-grid md:grid-cols-2">
              {supporting.map((project, i) => (
                <li key={project.slug} className="flex">
                  <ProjectPreview project={project} index={i + offset} total={total} className="reveal" />
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
