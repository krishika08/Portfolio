import { BaseLink } from "@/components/ui/BaseLink";

interface BrandProps {
  name: string;
  href: string;
  onClick?: () => void;
}

/** The wordmark: the first letter drawn as a registration mark, then the name. Links home. */
export function Brand({ name, href, onClick }: BrandProps) {
  return (
    <BaseLink
      href={href}
      onClick={onClick}
      className="group -mx-micro inline-flex min-h-11 items-center gap-tight rounded-sm px-micro font-display text-[1.1875rem] leading-none font-semibold tracking-[-0.02em] text-foreground"
    >
      <span
        aria-hidden
        className="relative grid size-8 place-items-center rounded-xs border border-accent text-[1rem] text-accent transition-[background-color,color,rotate] duration-(--duration-standard) group-hover:rotate-90 group-hover:bg-accent group-hover:text-accent-foreground"
      >
        <span className="transition-[rotate] duration-(--duration-standard) group-hover:-rotate-90">
          {name.charAt(0)}
        </span>
      </span>
      {name}
    </BaseLink>
  );
}
