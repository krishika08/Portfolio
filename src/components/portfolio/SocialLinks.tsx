import { BaseLink } from "@/components/ui/BaseLink";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { SocialLink } from "@/types/content";

interface SocialLinksProps {
  links: SocialLink[];
  /** icon: compact 44px icon targets; text: icon + visible label. */
  variant?: "icon" | "text";
  className?: string;
}

/** Verified external profiles. Renders nothing when no links are verified. */
export function SocialLinks({ links, variant = "icon", className }: SocialLinksProps) {
  if (links.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center", variant === "icon" ? "gap-micro" : "gap-x-cluster gap-y-tight", className)}>
      {links.map((link) => (
        <li key={link.id}>
          <BaseLink
            href={link.href}
            newTab={link.id !== "email"}
            className={cn(
              "inline-flex items-center rounded-sm text-foreground-secondary transition-colors hover:text-accent",
              variant === "icon" ? "size-11 justify-center text-xl" : "min-h-11 gap-tight text-body-sm",
            )}
          >
            <Icon name={link.id === "email" ? "mail" : link.id} />
            <span className={variant === "icon" ? "sr-only" : undefined}>{link.label}</span>
          </BaseLink>
        </li>
      ))}
    </ul>
  );
}
