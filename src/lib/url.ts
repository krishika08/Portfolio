/** True for links that leave the site: any URL scheme (https:, mailto:, tel:) or protocol-relative. */
export function isExternalHref(href: string): boolean {
  return /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href);
}

/**
 * True for links to static documents/assets (e.g. "/resume.pdf"), which are
 * not app routes. An explicit extension list keeps dotted route slugs
 * (e.g. "/projects/engineered.dev") routed through next/link.
 */
export function isFileHref(href: string): boolean {
  const path = href.split(/[?#]/)[0] ?? "";
  return /\.(?:pdf|docx?|txt|zip|png|jpe?g|webp|avif|gif|svg)$/i.test(path);
}
