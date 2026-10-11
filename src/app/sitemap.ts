import type { MetadataRoute } from "next";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { getCaseStudyProjects } from "@/lib/content";

// Project detail URLs are included automatically once a project has
// `caseStudy` content (and the /projects/[slug] route is built).
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    routes.home,
    ...getCaseStudyProjects().map((project) => routes.project(project.slug)),
  ];

  return paths.map((path) => ({ url: new URL(path, siteConfig.url).toString() }));
}
