import type { CommunitySectionData } from "@/types/content";

export const communityData: CommunitySectionData = {
  title: {
    lead: "Communities create",
    emphasis: "bigger opportunities.",
  },
  subtitle:
    "I love being part of technical communities that bring together ideas, people and opportunities. These experiences help me learn, stay curious and grow beyond the classroom.",
  handwrittenAnnotation: "Learn Connect Grow Give Back",
  tagline: "PEOPLE × TECHNOLOGY × OPPORTUNITIES",
  heroImage: {
    src: "/images/community/community-hero-stage.jpg",
    alt: "AWS Community Day conference hall with main stage screen and attendees",
    width: 1024,
    height: 600,
  },
  events: [
    {
      id: "aws-community-day-2025",
      title: "AWS Community Day 2025",
      status: "attended",
      statusLabel: "Attended",
      category: "Technical Event",
      year: "2025",
      location: "Dehradun",
      description:
        "Attended AWS Community Day 2025 and was part of an amazing developer community. Gained new perspectives, explored cloud technologies, and connected with like-minded learners and professionals.",
      photos: [
        {
          src: "/images/community/aws-community-day-2025-booth.jpg",
          alt: "Krishika at AWS User Group Dehradun photo booth cutout frame",
          width: 768,
          height: 1024,
        },
        {
          src: "/images/community/aws-community-day-2025-sign.jpg",
          alt: "Krishika holding 'I am awsome' sign at UPES CSA and AWS Community Day backdrop",
          width: 768,
          height: 1024,
        },
      ],
      // Pending: add genuine post URL when available. Keep undefined to omit broken CTA.
      linkedInPostUrl: undefined,
      actionText: "View My LinkedIn Post",
    },
    {
      id: "aws-community-day-2026",
      title: "AWS Community Day 2026",
      status: "upcoming",
      statusLabel: "Upcoming",
      category: "Technical Event",
      year: "2026",
      description:
        "Planning to attend AWS Community Day 2026 to continue learning, explore new cloud innovations, and connect with the global AWS community.",
      
      actionText: "Excited for 2026!",
      actionHref: "#contact",
    },
  ],
  keyLearningsHeader: {
    title: "Key Learnings",
    description:
      "Community events give practical insights, real-world perspectives and the chance to learn from industry experts and peers. Some key takeaways from AWS Community Day 2025:",
  },
  learnings: [
    {
      icon: "cloud",
      title: "Cloud Technologies",
      description: "Explored new AWS services and real-world applications.",
    },
    {
      icon: "users",
      title: "Community Connections",
      description: "Interacted with developers, mentors and cloud enthusiasts.",
    },
    {
      icon: "book-open",
      title: "New Perspectives",
      description: "Learned from industry experts and community talks.",
    },
    {
      icon: "rocket",
      title: "Continued Growth",
      description: "Motivated to keep learning and exploring cloud innovations.",
    },
  ],
};
