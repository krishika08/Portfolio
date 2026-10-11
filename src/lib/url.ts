/** True for links that leave the site: any URL scheme (https:, mailto:, tel:) or protocol-relative. */
export function isExternalHref(href: string): boolean {
  return /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href);
}
