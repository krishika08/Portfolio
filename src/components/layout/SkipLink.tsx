/** First focusable element on every page; jumps past the header to <main>. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-sm focus:border focus:border-border-strong focus:bg-surface focus:px-4 focus:py-2 focus:text-label focus:text-foreground focus:shadow-elevated"
    >
      Skip to content
    </a>
  );
}
