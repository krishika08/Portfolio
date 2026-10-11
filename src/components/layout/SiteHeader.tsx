import { SiteNav } from "@/components/layout/SiteNav";
import { primaryNavigation } from "@/config/navigation";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { profile } from "@/content/profile";
import { getSocialLinks } from "@/lib/content";

// Server wrapper: resolves config so the client nav receives plain data
// and server-only modules (site URL resolution) stay out of the bundle.
export function SiteHeader() {
  return (
    <SiteNav
      name={siteConfig.name}
      homeHref={routes.home}
      items={primaryNavigation}
      resumeHref={profile.resume}
      social={getSocialLinks()}
    />
  );
}
