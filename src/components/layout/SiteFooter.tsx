import { SocialLinks } from "@/components/portfolio/SocialLinks";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";
import { primaryNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { profile } from "@/content/profile";
import { getSocialLinks } from "@/lib/content";

// Concise footer: identity, section links, resume (when available) and
// verified profiles. Rendered on every page.
export function SiteFooter() {
  return (
    <footer className="border-t border-border-subtle">
      <Container className="py-block">
        <Grid className="gap-y-cluster">
          <div className="col-span-full md:col-span-4 lg:col-span-6">
            <p className="font-display text-h3 text-foreground">{siteConfig.name}</p>
            <Text size="sm" tone="secondary" className="mt-micro">
              {profile.role}
            </Text>
          </div>
          <nav aria-label="Footer" className="col-span-2 md:col-span-2 lg:col-span-3">
            <ul>
              {primaryNavigation.map((item) => (
                <li key={item.href}>
                  <TextLink href={item.href} variant="plain" className="inline-flex min-h-11 items-center text-body-sm">
                    {item.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="col-span-2 md:col-span-2 lg:col-span-3">
            {profile.resume && (
              <TextLink href={profile.resume} newTab variant="plain" className="inline-flex min-h-11 items-center text-body-sm">
                Resume
              </TextLink>
            )}
            <SocialLinks links={getSocialLinks()} variant="text" className="flex-col items-start gap-y-0!" />
          </div>
        </Grid>
        <Text size="sm" tone="muted" className="mt-block">
          © {new Date().getFullYear()} {siteConfig.name}
        </Text>
      </Container>
    </footer>
  );
}
