import type { CSSProperties } from "react";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { SheetRule } from "@/components/portfolio/SheetRule";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { sectionIds } from "@/config/navigation";
import { getExperience } from "@/lib/content";
import { JourneyFigure } from "./JourneyFigure";
import { JourneyStop } from "./JourneyStop";
import { buildTrail } from "./journey";
import styles from "./Journey.module.css";

// A journey, drawn as a trail up a drafted landscape: one stop per role, in
// the order they happened (the data lists them most recent first, so it is
// reversed here). The trail draws itself as the section scrolls through view
// and each stop lights as it is reached (see Journey.module.css); `featured`
// roles carry more weight. On narrow screens the landscape becomes a banner
// and the stops hang from a vertical rail.
export function ExperienceSection() {
  const roles = [...getExperience()].reverse();
  const trail = buildTrail(roles.length);

  return (
    <Section id={sectionIds.experience} aria-labelledby="experience-title" className="relative isolate">
      <Container>
        <SheetRule section={sectionIds.experience} className="mb-block" />
        <SectionHeader
          id="experience-title"
          title="Experience"
          description="Internships in production web development and frontend engineering."
        />
        <div data-progress className={styles.journey} style={{ "--n": roles.length } as CSSProperties}>
          <JourneyFigure roles={roles} trail={trail} />
          <ol className={styles.stops}>
            {roles.map((role, i) => (
              <li key={role.id} className={styles.stop} style={{ "--at": trail.fractions[i] ?? 0 } as CSSProperties}>
                <JourneyStop experience={role} className="reveal" />
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
