import { buildNavPreviews } from "@/components/layout/NavPreviews";
import { SiteNav } from "@/components/layout/SiteNav";
import { destinations, primaryNavigation } from "@/config/navigation";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { profile } from "@/content/profile";
import { getSocialLinks } from "@/lib/content";

// Server wrapper: resolves config and builds the Index previews (real images
// and existing content) so the client nav receives plain data and finished
// markup, and server-only modules stay out of the bundle.
export function SiteHeader() {
  return (
    <SiteNav
      name={siteConfig.name}
      homeHref={routes.home}
      items={primaryNavigation}
      destinations={destinations}
      resumeHref={profile.resume}
      social={getSocialLinks()}
      previews={buildNavPreviews()}
    />
  );
}
