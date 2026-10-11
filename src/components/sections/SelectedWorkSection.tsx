import { ProjectPreview } from "@/components/portfolio/ProjectPreview";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { sectionIds } from "@/config/navigation";
import { getAdditionalProjects, getFlagshipProject, getSupportingProjects } from "@/lib/content";

// Primary proof layer: the flagship in an open editorial layout, then the
// supporting projects. Order and emphasis come from project tier/order.
export function SelectedWorkSection() {
  const flagship = getFlagshipProject();
  const supporting = getSupportingProjects();
  const additional = getAdditionalProjects();
  const offset = flagship ? 2 : 1;

  return (
    <Section id={sectionIds.work} aria-labelledby="work-title" className="border-t border-border-subtle">
      <Container>
        <SectionHeader id="work-title" title="Selected work" />
        <div className="mt-block flex flex-col gap-section-compact">
          {flagship && <ProjectPreview project={flagship} index={1} className="reveal" />}
          {supporting.length > 0 && (
            <ul className="grid gap-grid md:grid-cols-2">
              {supporting.map((project, i) => (
                <li key={project.slug} className="flex">
                  <ProjectPreview project={project} index={i + offset} className="reveal flex-1" />
                </li>
              ))}
            </ul>
          )}
          {additional.length > 0 && (
            <ul className="flex flex-col gap-cluster">
              {additional.map((project, i) => (
                <li key={project.slug}>
                  <ProjectPreview project={project} index={i + offset + supporting.length} className="reveal" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </Section>
  );
}
