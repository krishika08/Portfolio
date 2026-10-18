import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { sectionIds } from "@/config/navigation";
import { getCapabilityClusters, getSkillEvidence } from "@/lib/content";
import { FocusClient, type DetailedSkillEvidence } from "./FocusClient";
import styles from "./Focus.module.css";

// 04 / Engineering Focus — The Technical Atlas
// Data-driven representation of verified skills from src/content/skills.ts,
// with genuine evidence linking each skill to projects, internships,
// and certifications without any fabricated skill scores or percentages.
export function EngineeringFocusSection() {
  const clusters = getCapabilityClusters();

  // Build the detailed evidence map for every verified skill
  const evidenceMap: Record<string, DetailedSkillEvidence> = {};
  for (const cluster of clusters) {
    for (const cap of cluster.capabilities) {
      const ev = getSkillEvidence(cap.name);
      const key = cap.name.toLowerCase().replace(/\.js$/, "").trim();
      evidenceMap[key] = {
        projects: ev.projects.map((p) => ({
          name: p.name,
          slug: p.slug,
          href: `/projects/${p.slug}`,
        })),
        experience: ev.experience.map((e) => ({
          organization: e.organization,
          role: e.role,
        })),
        achievements: ev.achievements.map((a) => ({
          title: a.title,
          details: a.details,
        })),
      };
    }
  }

  return (
    <Section
      id={sectionIds.focus}
      aria-labelledby="focus-title"
      className={styles.section}
    >
      <div className={styles.ambientGlowTop} aria-hidden="true" />
      <div className={styles.ambientGlowCenter} aria-hidden="true" />
      <Container>
        <FocusClient clusters={clusters} evidenceMap={evidenceMap} />
      </Container>
    </Section>
  );
}
