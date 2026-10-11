import { ExperienceItem } from "@/components/portfolio/ExperienceItem";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { Watermark } from "@/components/portfolio/Watermark";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { sectionIds } from "@/config/navigation";
import { getExperience } from "@/lib/content";

// Calendar-style rows, most recent first; `featured` roles carry more weight.
export function ExperienceSection() {
  return (
    <Section id={sectionIds.experience} aria-labelledby="experience-title" className="relative isolate">
      <Watermark text="Experience" className="top-[calc(var(--spacing-section)-0.5rem)]" />
      <Container>
        <SectionHeader
          id="experience-title"
          title="Experience"
          description="Internships in production web development and frontend engineering."
        />
        <ol className="mt-block flex flex-col gap-block">
          {getExperience().map((role) => (
            <li key={role.id}>
              <ExperienceItem experience={role} className="reveal" />
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
