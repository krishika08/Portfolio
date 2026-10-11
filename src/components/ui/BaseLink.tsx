import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { isExternalHref, isFileHref } from "@/lib/url";

export interface BaseLinkProps extends Omit<ComponentPropsWithoutRef<"a">, "href"> {
  href: string;
  /** Open in a new tab. Announced to screen readers. */
  newTab?: boolean;
}

/**
 * Unstyled link. App routes use next/link (client navigation + prefetch);
 * external URLs, mailto:, tel: and static files (e.g. a resume PDF) render a
 * plain <a>.
 * Styled links (TextLink, ButtonLink) compose this.
 */
export function BaseLink({ href, newTab = false, children, ...props }: BaseLinkProps) {
  if (!isExternalHref(href) && !isFileHref(href)) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} {...(newTab && { target: "_blank", rel: "noopener noreferrer" })} {...props}>
      {children}
      {newTab && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
