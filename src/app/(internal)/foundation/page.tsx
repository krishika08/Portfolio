import { notFound } from "next/navigation";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";
import { createPageMetadata } from "@/lib/metadata";

// Development-only reference for foundation primitives and tokens.
// Used to check responsiveness, focus and contrast while the design
// system evolves. Returns 404 in production builds.

export const metadata = createPageMetadata({
  title: "Foundation",
  path: "/foundation",
  noIndex: true,
});

const colorTokens = [
  "background",
  "foreground",
  "muted",
  "muted-foreground",
  "border",
  "accent",
  "accent-foreground",
  "interactive",
  "interactive-hover",
  "focus",
] as const;

export default function FoundationPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <>
      <Section spacing="compact" aria-labelledby="foundation-title">
        <Container>
          <Heading level={1} id="foundation-title">
            Foundation primitives
          </Heading>
          <Text tone="muted" className="mt-4 max-w-reading">
            Development-only reference page. Not part of the portfolio.
          </Text>
        </Container>
      </Section>

      <Section spacing="compact" aria-labelledby="type-title" className="border-t">
        <Container>
          <Heading level={2} id="type-title">
            Typography
          </Heading>
          <div className="mt-8 space-y-6">
            <Heading level={3} size="display">
              Display
            </Heading>
            <Heading level={3} size="h1">
              Heading 1
            </Heading>
            <Heading level={3} size="h2">
              Heading 2
            </Heading>
            <Heading level={3}>Heading 3</Heading>
            <Heading level={4}>Heading 4</Heading>
            <Text size="lead" className="max-w-reading">
              Lead text for introductions. The quick brown fox jumps over the lazy dog.
            </Text>
            <Text className="max-w-reading">
              Body text with an <TextLink href="/">inline internal link</TextLink> and an{" "}
              <TextLink href="https://nextjs.org/docs" newTab>
                external link
              </TextLink>
              . Line length is held to a readable measure with the reading container.
            </Text>
            <Text size="sm" tone="muted">
              Small muted text for metadata and captions.
            </Text>
            <Text>
              Inline <code>code</code> uses the system monospace stack.
            </Text>
          </div>
        </Container>
      </Section>

      <Section spacing="compact" aria-labelledby="color-title" className="border-t">
        <Container>
          <Heading level={2} id="color-title">
            Color tokens
          </Heading>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {colorTokens.map((token) => (
              <li key={token} className="min-w-0">
                <div
                  className="h-14 rounded-md border"
                  style={{ backgroundColor: `var(--${token})` }}
                />
                <Text as="span" size="sm" tone="muted" className="mt-2 block font-mono">
                  {token}
                </Text>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section spacing="compact" aria-labelledby="actions-title" className="border-t">
        <Container>
          <Heading level={2} id="actions-title">
            Buttons and links
          </Heading>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button size="sm">Small</Button>
            <Button disabled>Disabled</Button>
            <ButtonLink href="/" variant="secondary">
              Button-styled link
            </ButtonLink>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <TextLink href="/" variant="plain">
                Plain link
              </TextLink>
            </li>
            <li>
              <TextLink href="mailto:example@example.com" variant="plain">
                mailto link
              </TextLink>
            </li>
          </ul>
        </Container>
      </Section>

      <Section spacing="compact" aria-labelledby="layout-title" className="border-t">
        <Container>
          <Heading level={2} id="layout-title">
            Containers and overflow
          </Heading>
        </Container>
        <div className="mt-8 space-y-3">
          {(["reading", "content", "wide"] as const).map((width) => (
            <Container key={width} width={width}>
              <div className="rounded-md bg-muted px-4 py-3 font-mono text-sm">{width}</div>
            </Container>
          ))}
        </div>
        <Container className="mt-8 space-y-4">
          <Text>
            Long unbroken string:
            https://example.com/a/very/long/path/that/should/wrap/instead/of/causing/horizontal/overflow/on/small/screens
          </Text>
          <pre className="rounded-md bg-muted p-4 text-sm">
            <code>
              {"const preformatted = 'Long lines scroll inside this block instead of widening the page on narrow viewports.';"}
            </code>
          </pre>
          <div className="h-10 w-full rounded-md bg-accent motion-safe:transition-opacity motion-safe:hover:opacity-70" />
        </Container>
      </Section>
    </>
  );
}
