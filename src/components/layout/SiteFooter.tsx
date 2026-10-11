import { SocialLinks } from "@/components/portfolio/SocialLinks";
import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Text";
import { siteConfig } from "@/config/site";
import { getSocialLinks } from "@/lib/content";

// Structural footer only. Final content comes in a later phase.
export function SiteFooter() {
  return (
    <footer className="border-t border-border-subtle">
      <Container className="flex flex-wrap items-center justify-between gap-x-cluster gap-y-tight py-cluster">
        <Text size="sm" tone="muted">
          © {new Date().getFullYear()} {siteConfig.name}
        </Text>
        <SocialLinks links={getSocialLinks()} variant="text" />
      </Container>
    </footer>
  );
}
