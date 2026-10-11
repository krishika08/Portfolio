import { ExperienceItem } from "@/components/portfolio/ExperienceItem";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { SheetRule } from "@/components/portfolio/SheetRule";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { sectionIds } from "@/config/navigation";
import { getExperience } from "@/lib/content";

// A timeline, most recent first: the line fills as the section scrolls
// through view, and each role hangs from a node on it. `featured` roles
// carry more weight.
export function ExperienceSection() {
  return (
    <Section id={sectionIds.experience} aria-labelledby="experience-title" className="relative isolate">
      <Container>
        <SheetRule className="mb-block" />
        <SectionHeader
          id="experience-title"
          title="Experience"
          description="Internships in production web development and frontend engineering."
        />
        <ol data-progress className="timeline mt-block flex flex-col gap-block">
          {getExperience().map((role) => (
            <li key={role.id} className="timeline-node relative pl-8 md:pl-12">
              <ExperienceItem experience={role} className="reveal" />
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
