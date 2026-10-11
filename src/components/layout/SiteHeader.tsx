import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { primaryNavigation, utilityNavigation } from "@/config/navigation";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";

// Structural header only. Visual navigation design comes in a later phase.
export function SiteHeader() {
  const items = [...primaryNavigation, ...utilityNavigation];

  return (
    <header className="border-b">
      <Container className="flex min-h-16 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
        <TextLink href={routes.home} variant="plain" className="font-semibold">
          {siteConfig.name}
        </TextLink>
        {items.length > 0 && (
          <nav aria-label="Primary">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {items.map((item) => (
                <li key={item.href}>
                  <TextLink href={item.href} variant="plain">
                    {item.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </Container>
    </header>
  );
}
