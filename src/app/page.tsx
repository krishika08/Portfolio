import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { routes } from "@/config/routes";
import { profile } from "@/content/profile";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ path: routes.home });

// Foundation placeholder. The homepage sections are built in later phases.
export default function HomePage() {
  return (
    <Section aria-labelledby="page-title">
      <Container>
        <Heading level={1} id="page-title">
          {profile.name}
        </Heading>
        <Text size="lead" tone="muted" className="mt-4 max-w-reading">
          {profile.positioning}
        </Text>
      </Container>
    </Section>
  );
}
