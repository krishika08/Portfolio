import { SocialLinks } from "@/components/portfolio/SocialLinks";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";
import { destinations, sectionIds } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { profile } from "@/content/profile";
import { getSocialLinks } from "@/lib/content";

// Concise footer set as a drawing title block: identity, every destination
// (Resume included once it exists) and verified profiles. Rendered on every page.
export function SiteFooter() {
  return (
    <footer className="relative isolate border-t border-border-strong bg-surface">
      <Container className="py-block">
        <Grid className="gap-y-cluster">
          <div className="col-span-full md:col-span-4 lg:col-span-5">
            <p className="flex items-center gap-tight font-display text-h2 text-foreground">
              <span aria-hidden className="h-6 w-px bg-accent" />
              {siteConfig.name}
            </p>
            <Text size="sm" tone="secondary" className="mt-tight">
              {profile.role}
            </Text>
          </div>
          <nav aria-label="Footer" className="col-span-full md:col-span-4 lg:col-span-4">
            <ul className="grid gap-x-cluster sm:grid-cols-2">
              {destinations
                .filter((destination) => destination.id !== sectionIds.home)
                .map((destination) => (
                  <li key={destination.href}>
                    <TextLink href={destination.href} variant="plain" className="inline-flex min-h-11 items-center text-body-sm">
                      {destination.label}
                    </TextLink>
                  </li>
                ))}
            </ul>
          </nav>
          <div className="col-span-full md:col-span-4 lg:col-span-3">
            <SocialLinks links={getSocialLinks()} variant="text" className="flex-col items-start gap-y-0!" />
          </div>
        </Grid>
        <Text size="sm" tone="muted" className="mt-block border-t border-border pt-group">
          © {new Date().getFullYear()} {siteConfig.name}
        </Text>
      </Container>
    </footer>
  );
}
