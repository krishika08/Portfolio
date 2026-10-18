import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { sectionIds } from "@/config/navigation";
import { profile } from "@/content/profile";
import { getSocialLinks } from "@/lib/content";
import { ContactClient } from "./ContactClient";
import styles from "./Contact.module.css";

// 07 / Contact — The Final Threshold
// Direct outreach channels via verified LinkedIn and GitHub destinations,
// framed with atmospheric cinematic lighting and zero fake submission endpoints.
export function ContactSection() {
  const socialLinks = getSocialLinks();

  return (
    <Section
      id={sectionIds.contact}
      aria-labelledby="contact-title"
      className={styles.section}
    >
      <div className={styles.ambientGlowTop} aria-hidden="true" />
      <div className={styles.ambientGlowCenter} aria-hidden="true" />
      <Container>
        <ContactClient profile={profile} socialLinks={socialLinks} />
      </Container>
    </Section>
  );
}
