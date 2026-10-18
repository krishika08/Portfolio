import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { sectionIds } from "@/config/navigation";
import { communityData } from "@/content/community";
import { profile } from "@/content/profile";
import { CommunityClient } from "./CommunityClient";
import styles from "./Community.module.css";

// 08 / Community & Events — AWS Community Day 2025 & 2026
// Genuine photographic evidence from AWS Community Day 2025, paired with
// anticipatory focus for 2026, placed immediately before Contact.
export function CommunitySection() {
  return (
    <Section
      id={sectionIds.community}
      aria-labelledby="community-title"
      className={styles.section}
    >
      <div className={styles.ambientGlowTop} aria-hidden="true" />
      <div className={styles.ambientGlowRight} aria-hidden="true" />
      <Container>
        <CommunityClient data={communityData} profile={profile} />
      </Container>
    </Section>
  );
}
