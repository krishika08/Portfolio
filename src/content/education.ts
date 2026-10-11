import type { Achievement, Education } from "@/types/content";

export const education: Education[] = [
  {
    id: "upes",
    institution: "UPES",
    location: "Dehradun",
    degree: "B.Tech, Computer Science",
    dates: { start: "2024", end: "2028" },
    status: "in-progress",
    result: { label: "CGPA", value: "8.24/10" },
  },
];

// Only verified achievements belong here.
export const achievements: Achievement[] = [];
