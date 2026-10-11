import type { Achievement, Education } from "@/types/content";

export const education: Education[] = [
  {
    id: "upes",
    institution: "University of Petroleum and Energy Studies",
    shortName: "UPES",
    location: "Dehradun",
    degree: "B.Tech, Computer Science",
    dates: { start: "2024", end: "2028" },
    status: "in-progress",
    result: { label: "CGPA", value: "8.24/10" },
  },
];

// Only verified achievements. Dates are omitted where not verified.
export const achievements: Achievement[] = [
  {
    id: "google-cloud-study-jams-2025",
    title: "Google Cloud Study Jams 2025",
    details: "Completed 20 Google Skill Boost badges.",
    relatedSkills: ["Google Cloud Platform"],
    highlight: { value: "20", label: "Google Skill Boost badges" },
  },
  {
    id: "oci-foundations-associate",
    title: "Oracle Cloud Infrastructure Foundations Associate",
    organization: "Oracle",
    relatedSkills: ["Oracle Cloud Infrastructure Foundations"],
  },
  {
    id: "business-etiquette-uq",
    title: "Business Etiquette: Master Communication and Soft Skills",
    organization: "University of Queensland",
  },
];
