import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { sectionIds } from "@/config/navigation";
import { dsaJourney } from "@/content/dsa";
import { profile } from "@/content/profile";
import { LeetCodeClient } from "./LeetCodeClient";
import styles from "./LeetCode.module.css";

// 07 / LeetCode & DSA — The Problem-Solving Lab
// Evidence-led algorithmic practice and consistency streak, positioned
// immediately after About and immediately before Contact.
export function LeetCodeSection() {
  return (
    <Section
      id={sectionIds.leetcode}
      aria-labelledby="leetcode-title"
      className={styles.section}
    >
      <div className={styles.ambientGlowTop} aria-hidden="true" />
      <div className={styles.ambientGlowCenter} aria-hidden="true" />
      <Container>
        <LeetCodeClient journey={dsaJourney} profile={profile} />
      </Container>
    </Section>
  );
}
