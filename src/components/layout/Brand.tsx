import { BaseLink } from "@/components/ui/BaseLink";

interface BrandProps {
  name: string;
  href: string;
  onClick?: () => void;
}

/**
 * The monogram: the name's initial in the hero's editorial serif and a mint
 * full stop. The full name is the link's accessible name. Links home.
 */
export function Brand({ name, href, onClick }: BrandProps) {
  return (
    <BaseLink
      href={href}
      onClick={onClick}
      className="group -mx-2 inline-flex min-h-11 min-w-11 items-center rounded-sm px-2 font-[family-name:var(--font-hero-serif)] text-[1.75rem] leading-none font-semibold text-foreground"
    >
      <span aria-hidden>{name.charAt(0)}</span>
      <span aria-hidden className="text-accent transition-transform duration-(--duration-standard) ease-emphasized group-hover:translate-x-0.5">
        .
      </span>
      <span className="sr-only">{name}</span>
    </BaseLink>
  );
}
