import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Text";
import { siteConfig } from "@/config/site";

// Structural footer only. Final content comes in a later phase.
export function SiteFooter() {
  return (
    <footer className="border-t">
      <Container className="py-8">
        <Text size="sm" tone="muted">
          © {new Date().getFullYear()} {siteConfig.name}
        </Text>
      </Container>
    </footer>
  );
}
