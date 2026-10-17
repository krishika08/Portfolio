import type { CSSProperties } from "react";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { SheetRule } from "@/components/portfolio/SheetRule";
import { BaseLink } from "@/components/ui/BaseLink";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { Tilt } from "@/components/ui/Tilt";
import { HeroDial } from "@/components/sections/HeroDial";
import { sectionIds } from "@/config/navigation";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { getSocialLinks } from "@/lib/content";
import { displayHref } from "@/lib/url";
import styles from "./ContactSection.module.css";

// Conversion: verified channels in priority order (email, LinkedIn, GitHub)
// as large tiles that tilt toward the pointer and flood with mint on
// hover or focus, under the opening's dial. No form, no backend.
export function ContactSection() {
  const channels = getSocialLinks();

  return (
    <Section id={sectionIds.contact} aria-labelledby="contact-title" className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(55%_60%_at_50%_38%,rgb(var(--accent-rgb)_/_0.12),transparent)]"
      />
      {/* The opening's dial, large and faint behind the heading. */}
      <div aria-hidden className={styles.halo}>
        <HeroDial className={styles.dial} />
        <div className={styles.floor} />
      </div>
      <Container>
        <SheetRule section={sectionIds.contact} className="mb-block" />
        <SectionHeader
          id="contact-title"
          title="Contact"
          description="The quickest ways to reach me and review my work."
          layout="centered"
        />
        {profile.resume && (
          <div className="mt-cluster flex justify-center">
            <ButtonLink href={profile.resume} newTab>
              Resume
            </ButtonLink>
          </div>
        )}
        {channels.length > 0 && (
          <ul
            className={cn(
              "mx-auto mt-block grid gap-grid",
              channels.length > 2 ? "md:grid-cols-3" : "max-w-4xl md:grid-cols-2",
            )}
          >
            {channels.map((channel, i) => (
              <li key={channel.id} className="reveal flex" style={{ "--delay": `${i * 110}ms` } as CSSProperties}>
                <Tilt max={7} className="flex flex-1 rounded-lg">
                  <BaseLink
                    href={channel.href}
                    newTab={channel.id !== "email"}
                    className={cn(
                      "group relative isolate flex min-h-44 flex-1 flex-col justify-between gap-cluster overflow-hidden rounded-lg border border-border bg-surface p-cluster",
                      "transition-[border-color,box-shadow] duration-(--duration-standard) hover:border-accent hover:shadow-glow focus-visible:border-accent",
                      // Cobalt flood rising from the bottom edge.
                      "before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:bg-accent before:transition-transform before:duration-500 before:ease-emphasized",
                      "hover:before:scale-y-100 focus-visible:before:scale-y-100",
                    )}
                  >
                    <span className="flex items-start justify-between gap-group">
                      <span className="font-display text-h1 text-foreground transition-colors duration-300 group-hover:text-accent-foreground group-focus-visible:text-accent-foreground">
                        {channel.label}
                      </span>{" "}
                      <span className="pulse-ring relative mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-border-strong text-foreground-secondary transition-colors duration-300 group-hover:border-accent-foreground group-hover:text-accent-foreground group-focus-visible:border-accent-foreground group-focus-visible:text-accent-foreground">
                        <Icon name={channel.id === "email" ? "arrow-right" : "arrow-up-right"} className="text-lg" />
                      </span>
                    </span>
                    <span className="font-mono text-meta break-all text-foreground-secondary transition-colors duration-300 group-hover:text-accent-foreground group-focus-visible:text-accent-foreground">
                      {displayHref(channel.href)}
                    </span>
                  </BaseLink>
                </Tilt>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}
