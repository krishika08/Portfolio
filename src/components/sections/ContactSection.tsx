import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { BaseLink } from "@/components/ui/BaseLink";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { sectionIds } from "@/config/navigation";
import { profile } from "@/content/profile";
import { getSocialLinks } from "@/lib/content";
import { displayHref } from "@/lib/url";

// Conversion: verified channels in priority order (email, LinkedIn, GitHub)
// as large, direct links. No form, no backend.
export function ContactSection() {
  const channels = getSocialLinks();

  return (
    <Section id={sectionIds.contact} aria-labelledby="contact-title" className="border-t border-foreground">
      <Container>
        <Grid className="gap-y-block">
          <div className="col-span-full lg:col-span-5">
            <SectionHeader
              id="contact-title"
              title="Contact"
              description="The quickest ways to reach me and review my work."
            />
            {profile.resume && (
              <ButtonLink href={profile.resume} newTab variant="secondary" className="mt-cluster">
                Resume
              </ButtonLink>
            )}
          </div>
          {channels.length > 0 && (
            <ul className="col-span-full border-t border-border lg:col-span-6 lg:col-start-7">
              {channels.map((channel) => (
                <li key={channel.id} className="border-b border-border">
                  <BaseLink
                    href={channel.href}
                    newTab={channel.id !== "email"}
                    className="group flex min-h-16 items-center justify-between gap-group rounded-sm py-group"
                  >
                    <span className="flex min-w-0 flex-col gap-micro">
                      <span className="font-mono text-eyebrow text-foreground-muted uppercase">{channel.label}</span>{" "}
                      <span className="font-display text-h3 text-foreground transition-colors group-hover:text-accent">
                        {displayHref(channel.href)}
                      </span>
                    </span>
                    <Icon
                      name={channel.id === "email" ? "arrow-right" : "arrow-up-right"}
                      className="text-xl text-foreground-secondary transition-colors group-hover:text-accent"
                    />
                  </BaseLink>
                </li>
              ))}
            </ul>
          )}
        </Grid>
      </Container>
    </Section>
  );
}
