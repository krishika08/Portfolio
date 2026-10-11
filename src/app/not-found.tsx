import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { routes } from "@/config/routes";

// Next.js adds `noindex` to not-found responses automatically.
export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Section aria-labelledby="not-found-title">
      <Container>
        <Heading level={1} id="not-found-title">
          Page not found
        </Heading>
        <Text tone="muted" className="mt-4">
          The page you are looking for does not exist or has moved.
        </Text>
        <ButtonLink href={routes.home} variant="secondary" className="mt-8">
          Back to home
        </ButtonLink>
      </Container>
    </Section>
  );
}
