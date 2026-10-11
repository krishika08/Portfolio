import { notFound } from "next/navigation";
import { CapabilityCluster } from "@/components/portfolio/CapabilityCluster";
import { CtaGroup } from "@/components/portfolio/CtaGroup";
import { ExperienceItem } from "@/components/portfolio/ExperienceItem";
import { Metadata } from "@/components/portfolio/Metadata";
import { ProgressionMarker } from "@/components/portfolio/ProgressionMarker";
import { ProjectPreview } from "@/components/portfolio/ProjectPreview";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { SocialLinks } from "@/components/portfolio/SocialLinks";
import { TechnologyList } from "@/components/portfolio/TechnologyList";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { Grid } from "@/components/ui/Grid";
import { Heading } from "@/components/ui/Heading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Media } from "@/components/ui/Media";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";
import { skillCategories } from "@/content/skills";
import { getExperience, getProjects, resolveCapabilities } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import mediaTest from "./media-test.svg";

// Development-only design-system reference: every token and primitive in
// one place for responsive, focus and contrast checks. Content shown here
// comes from src/content (no invented copy) or is labelled as a demo.
// Returns 404 in production builds.

export const metadata = createPageMetadata({
  title: "Design system",
  path: "/foundation",
  noIndex: true,
});

const colors = [
  "background",
  "surface",
  "surface-secondary",
  "foreground",
  "foreground-secondary",
  "foreground-muted",
  "border-subtle",
  "border",
  "border-strong",
  "accent",
  "accent-hover",
  "focus",
  "success",
  "warning",
  "error",
] as const;

const typeScale = [
  { token: "display", className: "font-display text-display", family: "Anton" },
  { token: "h1", className: "font-display text-h1", family: "Anton" },
  { token: "h2", className: "font-display text-h2", family: "Anton" },
  { token: "h3", className: "font-display text-h3", family: "Anton" },
  { token: "lead", className: "text-lead", family: "Geist" },
  { token: "body", className: "text-body", family: "Geist" },
  { token: "body-sm", className: "text-body-sm", family: "Geist" },
  { token: "label", className: "text-label", family: "Geist" },
  { token: "button", className: "text-button", family: "Geist" },
  { token: "meta", className: "font-mono text-meta", family: "Geist Mono" },
] as const;

const spacing = [
  { token: "micro", className: "w-micro" },
  { token: "tight", className: "w-tight" },
  { token: "group", className: "w-group" },
  { token: "cluster", className: "w-cluster" },
  { token: "block", className: "w-block" },
  { token: "section", className: "w-section" },
  { token: "break", className: "w-break" },
] as const;

const icons: IconName[] = ["arrow-right", "arrow-up-right", "menu", "close", "mail", "github", "linkedin"];

const demoSocial = [
  { id: "github", label: "GitHub (demo)", href: "https://github.com/" },
  { id: "linkedin", label: "LinkedIn (demo)", href: "https://www.linkedin.com/" },
] as const;

function Block({ id, index, title, children }: { id: string; index: number; title: string; children: React.ReactNode }) {
  return (
    <Section spacing="compact" aria-labelledby={id} className="border-t border-border-subtle">
      <Container>
        <SectionHeader id={id} index={index} eyebrow="Design system" title={title} />
        <div className="mt-block">{children}</div>
      </Container>
    </Section>
  );
}

export default function FoundationPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const projects = getProjects();
  const [flagship, ...supporting] = projects;

  return (
    <>
      <Section spacing="compact" aria-labelledby="ds-title">
        <Container>
          <Heading level={1} id="ds-title">
            Design system reference
          </Heading>
          <Text tone="secondary" className="mt-group max-w-reading">
            Development-only page. Not part of the portfolio.
          </Text>
        </Container>
      </Section>

      <Block id="ds-color" index={1} title="Color">
        <ul className="grid grid-cols-2 gap-group sm:grid-cols-3 lg:grid-cols-5">
          {colors.map((token) => (
            <li key={token} className="min-w-0">
              <div className="h-14 rounded-md border border-border" style={{ backgroundColor: `var(--${token})` }} />
              <span className="mt-tight block font-mono text-meta text-foreground-secondary">{token}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="ds-type" index={2} title="Typography">
        <ul className="space-y-cluster">
          {typeScale.map((type) => (
            <li key={type.token} className="grid gap-tight md:grid-cols-[10rem_1fr] md:items-baseline">
              <span className="font-mono text-meta text-foreground-muted">
                {type.token} · {type.family}
              </span>
              <span className={type.className}>Precise, technical, human.</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="ds-space" index={3} title="Spacing, shape and elevation">
        <ul className="space-y-tight">
          {spacing.map((step) => (
            <li key={step.token} className="flex items-center gap-group">
              <span className="w-20 shrink-0 font-mono text-meta text-foreground-muted">{step.token}</span>
              <span className={`h-3 max-w-full rounded-sm bg-accent ${step.className}`} />
            </li>
          ))}
        </ul>
        <Grid className="mt-block gap-y-group">
          {(
            [
              ["sm", "rounded-sm"],
              ["md", "rounded-md"],
              ["lg", "rounded-lg"],
            ] as const
          ).map(([radius, className]) => (
            <div key={radius} className={`col-span-2 h-20 border border-border bg-surface p-tight font-mono text-meta ${className}`}>
              radius-{radius}
            </div>
          ))}
          <div className="col-span-2 h-20 rounded-md bg-surface p-tight font-mono text-meta shadow-subtle">shadow-subtle</div>
          <div className="col-span-2 h-20 rounded-md bg-surface p-tight font-mono text-meta shadow-elevated">shadow-elevated</div>
          <div className="col-span-2 flex h-20 flex-col justify-center gap-tight font-mono text-meta">
            <Divider tone="subtle" />
            <Divider />
            <Divider tone="strong" />
          </div>
        </Grid>
      </Block>

      <Block id="ds-grid" index={4} title="Grid">
        <Grid aria-hidden>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="h-16 rounded-sm bg-surface-secondary max-lg:nth-[n+9]:hidden max-md:nth-[n+5]:hidden" />
          ))}
        </Grid>
        <Grid className="mt-cluster gap-y-group">
          <div className="col-span-full rounded-md border border-border p-group font-mono text-meta lg:col-span-7">
            col-span-full lg:col-span-7
          </div>
          <div className="col-span-full rounded-md border border-border p-group font-mono text-meta lg:col-span-4 lg:col-start-9">
            lg:col-start-9 lg:col-span-4
          </div>
        </Grid>
      </Block>

      <Block id="ds-actions" index={5} title="Actions and links">
        <CtaGroup>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="text">
            Text action <Icon name="arrow-right" />
          </Button>
          <Button size="sm">Small</Button>
          <Button disabled>Disabled</Button>
          <ButtonLink href="/foundation#ds-color" variant="secondary">
            Link as CTA
          </ButtonLink>
        </CtaGroup>
        <Text className="mt-cluster max-w-reading">
          Running text with an <TextLink href="/">internal link</TextLink> and an{" "}
          <TextLink href="https://nextjs.org/docs" newTab>
            external link
          </TextLink>
          .
        </Text>
        <div className="mt-cluster flex flex-wrap items-center gap-cluster text-2xl">
          {icons.map((name) => (
            <Icon key={name} name={name} label={name} />
          ))}
        </div>
        <SocialLinks links={[...demoSocial]} className="mt-cluster" />
        <SocialLinks links={[...demoSocial]} variant="text" className="mt-tight" />
      </Block>

      <Block id="ds-headers" index={6} title="Section headers and metadata">
        <SectionHeader
          id="ds-demo-split"
          level={3}
          layout="split"
          eyebrow="Split layout"
          title="Title on the left, intro on the right from lg"
          description="Supporting description in lead size. Controlled asymmetry is reserved for moments that carry hierarchy."
          actions={
            <ButtonLink href="/foundation#ds-color" variant="text">
              Text CTA <Icon name="arrow-right" />
            </ButtonLink>
          }
        />
        <div className="mt-block flex flex-col gap-cluster">
          <ProgressionMarker index={2} total={4} label="Stage label" current />
          <Metadata
            items={[
              { label: "Label", value: "Value" },
              { label: "Period", value: "2024 — 2028" },
            ]}
          />
          <TechnologyList items={["Next.js", "TypeScript", "PostgreSQL"]} label="Demo technologies" />
        </div>
      </Block>

      <Block id="ds-media" index={7} title="Media">
        <Grid className="gap-y-cluster">
          <Media
            image={{ src: mediaTest.src, alt: "Test pattern", width: mediaTest.width, height: mediaTest.height }}
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="col-span-full lg:col-span-7"
          />
          <Media
            image={{ src: mediaTest.src, alt: "Test pattern, contained", width: mediaTest.width, height: mediaTest.height }}
            ratio="1/1"
            fit="contain"
            sizes="(min-width: 1024px) 33vw, 100vw"
            caption="Caption · 1/1 · contain"
            className="col-span-full lg:col-span-4 lg:col-start-9"
          />
        </Grid>
      </Block>

      <Block id="ds-projects" index={8} title="Project previews">
        <div className="flex flex-col gap-block">
          {flagship && <ProjectPreview project={flagship} index={1} />}
          <ul className="grid gap-grid md:grid-cols-2">
            {supporting.map((project, i) => (
              <li key={project.slug} className="flex">
                <ProjectPreview project={project} index={i + 2} className="flex-1" />
              </li>
            ))}
          </ul>
        </div>
      </Block>

      <Block id="ds-experience" index={9} title="Experience items">
        <ol className="flex flex-col gap-cluster">
          {getExperience().map((role) => (
            <li key={role.id}>
              <ExperienceItem experience={role} />
            </li>
          ))}
        </ol>
      </Block>

      <Block id="ds-capabilities" index={10} title="Capability clusters">
        <div className="grid gap-x-grid gap-y-block md:grid-cols-2">
          {skillCategories.slice(0, 4).map((category) => (
            <CapabilityCluster
              key={category.id}
              id={`ds-cap-${category.id}`}
              title={category.label}
              capabilities={resolveCapabilities(category)}
            />
          ))}
        </div>
      </Block>

      <Block id="ds-motion" index={11} title="Motion and overflow">
        <div className="grid gap-group sm:grid-cols-3">
          {["Reveal", "on", "scroll"].map((word) => (
            <div key={word} className="reveal rounded-md border border-border bg-surface p-cluster font-display text-h3">
              {word}
            </div>
          ))}
        </div>
        <Text className="mt-cluster">
          Long unbroken string:
          https://example.com/a/very/long/path/that/should/wrap/instead/of/causing/horizontal/overflow/on/small/screens
        </Text>
        <pre tabIndex={0} aria-label="Code overflow sample" className="mt-group rounded-md bg-surface-secondary p-group font-mono text-meta">
          <code>
            {"const preformatted = 'Long lines scroll inside this block instead of widening the page on narrow viewports.';"}
          </code>
        </pre>
      </Block>
    </>
  );
}
