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
// verified profiles, closed by an oversized wordmark. Rendered on every page.
export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-border-subtle bg-surface">
      <Container className="pt-block">
        <Grid className="gap-y-cluster">
          <div className="col-span-full md:col-span-4 lg:col-span-6">
            <p className="flex items-center gap-tight font-display text-h2 text-foreground">
              <span aria-hidden className="chapter-squares" />
              {siteConfig.name}
            </p>
            <Text size="sm" tone="secondary" className="mt-tight">
              {profile.role}
            </Text>
          </div>
          <nav aria-label="Footer" className="col-span-2 md:col-span-2 lg:col-span-3">
            <ul>
              {primaryNavigation.map((item) => (
                <li key={item.href}>
                  <TextLink
                    href={item.href}
                    variant="plain"
                    className="inline-flex min-h-11 items-center font-display text-[1.125rem] tracking-[0.03em]"
                  >
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
      {/* Oversized wordmark, cut off by the page edge. */}
      <p
        aria-hidden
        className="mt-cluster -mb-[0.2em] text-center font-display text-[clamp(6rem,1rem+22vw,24rem)] leading-[0.8] text-transparent select-none [-webkit-text-stroke:1px_rgb(255_255_255/0.12)]"
      >
        {siteConfig.name}
      </p>
    </footer>
  );
}
