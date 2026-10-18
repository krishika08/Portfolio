import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { sectionIds } from "@/config/navigation";
import { achievements, education } from "@/content/education";
import { profile } from "@/content/profile";
import { getExperience } from "@/lib/content";
import { EducationClient } from "./EducationClient";
import styles from "./Education.module.css";

// 05 / Education & Achievements — The Editorial Archive
// Academic foundation at UPES (B.Tech Computer Science, 2024–2028, CGPA 8.24)
// and verified milestone certifications from Oracle, Google Cloud, and University of Queensland.
export function EducationSection() {
  const experience = getExperience();

  // Verified engineering foundations coursework from skills data
  const coursework = [
    "Data Structures & Algorithms",
    "Database Management Systems (DBMS)",
    "Operating Systems",
    "Computer Networks",
    "Object-Oriented Programming (OOP)",
    "Software Engineering",
  ];

  return (
    <Section
      id={sectionIds.education}
      aria-labelledby="education-title"
      className={styles.section}
    >
      <div className={styles.ambientGlowTop} aria-hidden="true" />
      <div className={styles.ambientGlowCenter} aria-hidden="true" />
      <Container>
        <EducationClient
          education={education}
          achievements={achievements}
          experience={experience}
          coursework={coursework}
          resumeUrl={profile.resume}
        />
      </Container>
    </Section>
  );
}
