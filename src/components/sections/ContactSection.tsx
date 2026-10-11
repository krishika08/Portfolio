import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { BaseLink } from "@/components/ui/BaseLink";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { sectionIds } from "@/config/navigation";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { getSocialLinks } from "@/lib/content";
import { displayHref } from "@/lib/url";

// Conversion: verified channels in priority order (email, LinkedIn, GitHub)
// as large tiles that flood cobalt on hover/focus. No form, no backend.
// Opens with a checkerboard band, like a flag at the end of the lap.
export function ContactSection() {
  const channels = getSocialLinks();

  return (
    <Section id={sectionIds.contact} aria-labelledby="contact-title" spacing="none" className="relative isolate">
      <div aria-hidden className="checker h-[clamp(7rem,5rem+8vw,13rem)]" />
      <Container className="pt-block pb-section">
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
          <ul className={cn("mx-auto mt-block grid gap-grid", channels.length > 2 ? "md:grid-cols-3" : "max-w-4xl md:grid-cols-2")}>
            {channels.map((channel) => (
              <li key={channel.id} className="reveal flex">
                <BaseLink
                  href={channel.href}
                  newTab={channel.id !== "email"}
                  className={cn(
                    "group relative isolate flex min-h-40 flex-1 flex-col justify-between gap-cluster overflow-hidden rounded-lg border border-border bg-surface p-cluster",
                    "transition-[border-color,translate,box-shadow] duration-(--duration-standard) hover:-translate-y-1 hover:border-accent hover:shadow-glow",
                    // Cobalt flood rising from the bottom edge.
                    "before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:bg-accent before:transition-transform before:duration-500 before:ease-emphasized",
                    "hover:before:scale-y-100 focus-visible:before:scale-y-100",
                  )}
                >
                  <span className="flex items-start justify-between gap-group">
                    <span className="font-display text-h1 text-foreground transition-colors duration-300 group-hover:text-accent-foreground group-focus-visible:text-accent-foreground">
                      {channel.label}
                    </span>{" "}
                    <Icon
                      name={channel.id === "email" ? "arrow-right" : "arrow-up-right"}
                      className="mt-1 text-2xl text-foreground-secondary transition-[color,translate] duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent-foreground group-focus-visible:text-accent-foreground"
                    />
                  </span>
                  <span className="font-mono text-meta break-all text-foreground-secondary transition-colors duration-300 group-hover:text-accent-foreground group-focus-visible:text-accent-foreground">
                    {displayHref(channel.href)}
                  </span>
                </BaseLink>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}
