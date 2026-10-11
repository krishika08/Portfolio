import type { Profile } from "@/types/content";

export const profile: Profile = {
  name: "Krishika",
  role: "Software engineer",
  positioning:
    "Early-career software engineer building practical full-stack software, with production experience and a growing focus on backend and systems-oriented engineering.",
  intro:
    "Building practical full-stack software, with production experience and a growing focus on backend engineering and reliable, scalable systems.",
  focus: "Full-Stack Development",
  direction: "Backend-oriented engineering and reliable, scalable software",
  interests: ["Backend engineering", "Distributed systems", "Reliable software", "Scalable software"],
  about: [
    "I’m a third-year Computer Science student at the University of Petroleum and Energy Studies, Dehradun, in the B.Tech class of 2028.",
    "My work so far has been full-stack: production web applications during my internship at Crobstacle Ventures LLP, and projects such as VeyloPrep, which runs on the web and as a signed Android build.",
    "I’m heading toward backend engineering and the systems behind reliable, scalable software, building from the fundamentals: data structures and algorithms, databases, operating systems and computer networks.",
  ],
  // Add only verified values; never placeholders.
  contact: {
    email: undefined,
  },
  social: {
    github: "https://github.com/krishika08",
    linkedin: "https://www.linkedin.com/in/krishika-kalra-7215a7342",
  },
  // Pending: add the file at public/resume.pdf, then set resume: "/resume.pdf".
  resume: undefined,
};
