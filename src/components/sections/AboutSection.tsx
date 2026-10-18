import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { sectionIds } from "@/config/navigation";
import { profile } from "@/content/profile";
import { AboutClient } from "./AboutClient";
import styles from "./About.module.css";

// 06 / About Me — Beyond the Code
// Personal editorial spread featuring Krishika's genuine portrait
// (/images/profile/portrait-about.png) and verified engineering journey.
export function AboutSection() {
  return (
    <Section
      id={sectionIds.about}
      aria-labelledby="about-title"
      className={styles.section}
    >
      <div className={styles.ambientGlowTop} aria-hidden="true" />
      <div className={styles.ambientGlowCenter} aria-hidden="true" />
      <Container>
        <AboutClient profile={profile} />
      </Container>
    </Section>
  );
}
