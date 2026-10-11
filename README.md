# Krishika — Portfolio

Personal software-engineering portfolio. Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · npm.

```bash
npm install
npm run dev        # http://localhost:3000 — design-system reference at /foundation
npm run build      # production build (set NEXT_PUBLIC_SITE_URL, see .env.example)
npm run lint
npm run typecheck
```

## Structure

```text
src/
  app/                     routes, root layout, globals.css (design tokens), robots, sitemap, icon
    (internal)/foundation  dev-only design-system reference (404 in production)
  components/
    ui/                    Level 1 primitives: Container, Heading, Text, BaseLink, TextLink,
                           Button/ButtonLink, Icon, Divider, Grid, Media, Section
    portfolio/             Level 2 primitives: SectionHeader, ProgressionMarker, Metadata,
                           CtaGroup, TechnologyList, SocialLinks, CapabilityCluster,
                           ProjectPreview, ExperienceItem
    layout/                app shell: SkipLink, SiteHeader (server) → SiteNav (client), SiteFooter
  config/                  site (URL, metadata defaults), routes, navigation (+ section ids)
  content/                 verified content only: profile, projects, experience, education, skills
  hooks/                   useScrollState (header scrolled + active section)
  lib/                     content selectors, metadata helper, formatting, url helpers, cn
  types/content.ts         content model
```

Level 3 section compositions (Hero, Selected Work, Experience, About, Contact) are built in later phases from these primitives.

## Content rules

- `src/content/*` is the single source of truth. Components receive typed data; they never hard-code facts.
- Only verified information. Leave optional fields `undefined` — never placeholder text, metrics or links.
- Contact details, social profiles and the resume are set in `content/profile.ts`; navigation, footer and `SocialLinks` pick them up automatically.
- A project gets a detail route (`routes.project(slug)`) and a sitemap entry only once it has `caseStudy` content.
- Skill evidence is derived from project/experience `technologies` (`resolveCapabilities`). No ratings, bars or scores.

## Design tokens (`src/app/globals.css`)

Raw semantic variables on `:root` are the CSS API (`var(--accent)`); `@theme` maps them to utilities. Never reference Tailwind's internal `--color-*` variables directly.

| Group | Tokens / utilities |
|---|---|
| Color | `background` `surface` `surface-secondary` `foreground` `foreground-secondary` `foreground-muted` `border-subtle` `border` `border-strong` `accent` `accent-hover` `accent-foreground` `focus` `success` `warning` `error` |
| Type | `text-display` `text-h1..h3` (Instrument Sans via `font-display`), `text-lead` `text-body` `text-body-sm` `text-label` `text-button` (Geist), `text-meta` (Geist Mono via `font-mono`) |
| Spacing | `micro` `tight` `group` `cluster` `block` `section` `section-compact` `break`, plus `gutter` and `grid` (e.g. `gap-group`, `py-section`, `px-gutter`) |
| Layout | `max-w-reading` (672px) · `max-w-content` (1280px incl. gutters ≈ 1200px content) · `max-w-wide` (1440px) · `<Grid>` 4 → 8 (md) → 12 (lg) columns |
| Shape | `rounded-sm` 6px · `rounded-md` 8px · `rounded-lg` 12px (maximum) |
| Elevation | none · `shadow-subtle` · `shadow-elevated` |
| Motion | `--duration-instant/fast/standard/slow`, `ease-standard`, `ease-emphasized` |

Spacing keys must not reuse a `--container-*` name: Tailwind resolves `max-w-*`/`w-*` against both namespaces.

Accent cobalt is a signal (links, active/focus states, markers) — not a decorative background. `foreground-muted` is darkened from the reference `#858585` to `#6b6b6b` so it passes WCAG AA on every surface.

## Conventions

- **CTA hierarchy:** at most one `primary` per context, then `secondary`, then `text`. Use `ButtonLink` for navigation and `Button` for actions — never a button that navigates.
- **Links:** `BaseLink` picks `next/link` for app routes and a plain `<a>` for external URLs, `mailto:`/`tel:` and files such as PDFs. `newTab` adds `rel="noopener noreferrer"` and an "(opens in a new tab)" announcement.
- **Headings:** `level` sets the outline, `size` the look. One `h1` per page; give each `<Section>` `aria-labelledby` its heading id.
- **Progression markers** mark order that carries meaning (section index, case-study stage). Don't number everything.
- **Cards** are for project previews and compact grouped information, not for every block.
- **Images:** use `<Media>` with a ratio and an explicit `sizes`; `preload` only for one above-the-fold image. Provide real `alt` text (empty only if decorative). Add remote hosts to `images.remotePatterns` when needed.
- **Code blocks:** give scrollable `<pre>` elements `tabIndex={0}` and an accessible name.
- **Client components:** only where interactivity requires it (currently `SiteNav`). Pass server-resolved data in as props.
- **Responsive:** mobile-first Tailwind breakpoints (sm 640, md 768, lg 1024, xl 1280). Recompose layouts per breakpoint instead of shrinking them. Validated at 375, 480, 640, 768, 1024, 1280, 1440, 1920 and 2560px.

## Motion

| Level | Use | Mechanism |
|---|---|---|
| 1 Feedback | hover, focus, pressed | `transition-*` utilities (150ms default, 80ms on press) |
| 2 Transition | header state, menu open | `duration-(--duration-standard)`, `starting:` for entry |
| 3 Reveal | subtle content entry | `reveal` utility — CSS scroll-driven, no JavaScript |
| 4 Signature | rare; justify individually | — |

Under `prefers-reduced-motion: reduce`, smooth scrolling and reveals are disabled and every transition/animation duration is neutralised globally.

## Navigation

Compact sticky header: quiet at the top of the page, then a surface with a subtle border once scrolled. Items: Work, Experience, About, Contact (home-page anchors using `sectionIds`), plus Resume and social icons once they are verified. The active state is set with `aria-current` (`location` for sections, `page` for routes such as `/projects/*`). On mobile it becomes a non-modal disclosure panel: Escape, clicking outside, choosing a link, focus leaving the header and resizing to desktop all close it.

## SEO

`createPageMetadata()` gives each route a title, description, canonical URL and Open Graph fields. `robots.ts` and `sitemap.ts` are generated from config. Set `NEXT_PUBLIC_SITE_URL` for production; without it, absolute URLs fall back to localhost and the build prints a warning.
