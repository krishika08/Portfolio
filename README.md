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
    projects/[slug]        project case-study route (projects with caseStudy data)
    (internal)/foundation  dev-only design-system reference (404 in production)
  components/
    ui/                    Level 1 primitives: Container, Heading, Text, BaseLink, TextLink,
                           Button/ButtonLink, Icon, Divider, Grid, Media, Section, Tilt (client)
    portfolio/             Level 2 primitives: SectionHeader, ProgressionMarker, Metadata,
                           CtaGroup, TechnologyList, SocialLinks, CapabilityCluster,
                           ProjectPreview, ProjectLinks, ExperienceItem, PhoneFan,
                           Manifesto, Watermark
    sections/              Level 3 home-page compositions: Hero, SelectedWork, EngineeringFocus,
                           Experience, Education, About, Contact
    case-study/            project page composition: header, section, figure, gallery, points, pager
    layout/                app shell: SkipLink, SiteHeader (server) → SiteNav (client), SiteFooter
  config/                  site (URL, metadata defaults), routes, navigation (+ section ids)
  content/                 verified content only: profile, projects, experience, education, skills
  hooks/                   useScrollState (header scrolled + active section)
  lib/                     content selectors, metadata helper, formatting, url helpers, cn
  types/content.ts         content model
```

Level 3 compositions live in `src/components/sections/` (one file per home-page section; a future case-study composition goes here too). They are page-specific, compose Level 1/2 primitives and read data through `src/lib/content.ts`; don't fold them into generic configurable components. Every section uses an id from `sectionIds` (`config/navigation.ts`), which the navigation and in-page links share.

## Architecture

```text
src/content/*.ts  →  src/types/content.ts  →  src/lib/content.ts (selectors)  →  pages / sections  →  primitives
(verified facts)     (domain model)           (ordering, lookup, evidence)       (composition)        (presentation)
```

- **Server-first.** Every page and primitive is a Server Component. The only client code is `SiteNav` + `useScrollState` (menu, scroll state, active section). No global state, CMS, database or API.
- **Routes**

  | Route | Source | Notes |
  |---|---|---|
  | `/` | `app/page.tsx` | Home: Hero → Selected Work → Engineering Focus → Experience → Education & achievements → About → Contact |
  | `/projects/[slug]` | `app/projects/[slug]/page.tsx` | Static (`generateStaticParams`, `dynamicParams = false`) |
  | `/foundation` | `app/(internal)/foundation` | Dev only; 404 in production |
  | `/robots.txt`, `/sitemap.xml`, `/icon.svg` | metadata routes | |

  No `/projects` index route. Unknown paths render `app/not-found.tsx` (auto `noindex`).
- **Project detail rule:** `hasCaseStudy(project)` (in `lib/content.ts`) decides whether a project has a detail page, a sitemap entry and "Read case study" links. Add `caseStudy` content to a project and all three appear; every other slug returns 404.
- **Project hierarchy** comes from `tier` (`flagship` / `supporting` / `additional`) and `order` — never from project names.
- **Metadata ownership:** the root layout owns the defaults (title template, description, `metadataBase`, Open Graph base, icon). Each route calls `createPageMetadata({ title, description, path, image })` for its canonical URL and social preview; project pages use the project's `assets.cover`.

## Case studies

Every project with `caseStudy` data gets `/projects/[slug]` (static), a sitemap entry, "Read case study" links and a place in the previous/next pager. One page composition (`app/projects/[slug]/page.tsx`) renders every project; the components live in `components/case-study/`.

- **Narrative order:** Overview → The problem → What it does → In the product → Architecture → Engineering decisions → Challenges → Outcomes → What I learned. A stage renders only when its data exists, and the stage numbers follow what is present.
- **Data:** `overview` is required; `context`, `highlights`, `gallery`, `architecture` (summary + figure), `decisions`, `challenges`, `outcomes`, `learnings` and `sources` are optional. Wrap code identifiers in backticks to set them as code.
- **Emphasis** comes from `tier`: the flagship gets the display-size title. Opening images and figures render at most at their source width (never upscaled).
- **Evidence rule:** every statement must trace to the resume, owner-supplied material, or the project's own repository checked against its code. List the sources in `sources`; they are shown on the page. Omit a stage rather than fill it.
- **Media:** real screens and diagrams only, in `public/images/projects/<slug>/`, with width and height. Diagrams need a `description` (a visible text equivalent). Figures never render wider than their source.

Adding a project: add an entry to `content/projects.ts` with a `tier`, an `order` and a `caseStudy`. The homepage, project page, pager, sitemap and metadata pick it up with no code changes.

## Assets

| What | Location | Referenced from |
|---|---|---|
| Project images | `public/images/projects/<slug>/…` | `content/projects.ts` → `assets.cover` (`ImageAsset`: src, alt, width, height) |
| Portraits | `public/images/profile/portrait-hero.png` (transparent cutout, hero) · `portrait-about.png` (About; also the homepage social image) | `content/profile.ts` → `portraits` |
| Resume | `public/resume.pdf` (stable URL `/resume.pdf`; replace the file to update) | `content/profile.ts` → `resume: "/resume.pdf"` |
| Site icon | `src/app/icon.svg` | metadata route |

Committed: owner-supplied portraits, and real product captures and diagrams for VeyloPrep and Split-Sync. Pending: the resume PDF and an email address — the Resume CTAs and the email contact row appear automatically once real values are added to `content/profile.ts`. Projects without a cover show their verified capabilities instead of an image. Never add placeholder images or documents.

## Content rules

- `src/content/*` is the single source of truth. Components receive typed data; they never hard-code facts.
- Only verified information. Leave optional fields `undefined` — never placeholder text, metrics or links.
- Contact details, social profiles and the resume are set in `content/profile.ts`; navigation, footer and `SocialLinks` pick them up automatically.
- A project gets a detail route (`routes.project(slug)`) and a sitemap entry only once it has `caseStudy` content.
- Skill evidence is derived from project/experience `technologies` and achievement `relatedSkills` (`resolveCapabilities`). No ratings, bars or scores.
- Experience emphasis comes from `featured`; project emphasis from `tier`. Never branch on names.

## Design tokens (`src/app/globals.css`)

Raw semantic variables on `:root` are the CSS API (`var(--accent)`); `@theme` maps them to utilities. Never reference Tailwind's internal `--color-*` variables directly.

| Group | Tokens / utilities |
|---|---|
| Color | `background` #080A0D (near-black) · `surface` #17191E (bands: charcoal over the background) · `surface-secondary` #24252B (charcoal) · `foreground` #F5F3FA (soft white) `foreground-secondary` #A8AAB2 (muted grey) `foreground-muted` · `border-subtle` `border` `border-strong` · `accent` #6EE7B7 (mint) `accent-hover` `accent-foreground` #080A0D · `focus` `success` `warning` `error` |
| Type | `text-display` `text-chapter` `text-h1..h3` (Anton via `font-display`, always uppercase), `text-lead` `text-body` `text-body-sm` `text-label` (Geist), `text-button` (Anton), `text-meta`, `text-eyebrow` (uppercase labels) (Geist Mono via `font-mono`) |
| Spacing | `micro` `tight` `group` `cluster` `block` `section` `section-compact` `break`, plus `gutter` and `grid` (e.g. `gap-group`, `py-section`, `px-gutter`) |
| Layout | `max-w-reading` (672px) · `max-w-content` (1280px incl. gutters ≈ 1200px content) · `max-w-wide` (1440px) · `<Grid>` 4 → 8 (md) → 12 (lg) columns |
| Shape | `rounded-sm` 6px · `rounded-md` 8px · `rounded-lg` 12px (maximum) |
| Elevation | none · `shadow-subtle` · `shadow-elevated` · `shadow-glow` (mint, hover) |
| Motion | `--duration-instant/fast/standard/slow/signature`, `ease-standard`, `ease-emphasized` |

Spacing keys must not reuse a `--container-*` name: Tailwind resolves `max-w-*`/`w-*` against both namespaces.

The look is an engineering sheet at night: a near-black ground, a graph-paper grid, hairline dimension lines and soft white type whose hierarchy comes from size, weight and opacity. Mint is the single signal colour (primary actions, active states, focus, fine lines and live drawing); charcoal carries cards and media. Every text colour is at least 5.1:1 on every surface and `border-strong` at least 3.6:1. Product screenshots keep their own colours. Display headings in the hero and Selected Work use Playfair Display (`lib/fonts.ts`).

## Conventions

- **CTA hierarchy:** at most one `primary` per context, then `secondary`, then `text`. Use `ButtonLink` for navigation and `Button` for actions — never a button that navigates.
- **Links:** `BaseLink` picks `next/link` for app routes and a plain `<a>` for external URLs, `mailto:`/`tel:` and files such as PDFs. `newTab` adds `rel="noopener noreferrer"` and an "(opens in a new tab)" announcement.
- **Headings:** `level` sets the outline, `size` the look. One `h1` per page; give each `<Section>` `aria-labelledby` its heading id.
- **Progression markers** mark order that carries meaning (section index, case-study stage). Don't number everything.
- **Cards** are for project previews and compact grouped information, not for every block.
- **Images:** use `<Media>` with a ratio and an explicit `sizes`; `preload` only for one above-the-fold image. Provide real `alt` text (empty only if decorative). Add remote hosts to `images.remotePatterns` when needed.
- **Code blocks:** give scrollable `<pre>` elements `tabIndex={0}` and an accessible name.
- **Client components:** only where interactivity requires it (currently `SiteNav` and `Tilt`). Pass server-resolved data in as props; `Tilt` renders Server Component children as passed.
- **Responsive:** mobile-first Tailwind breakpoints (sm 640, md 768, lg 1024, xl 1280). Recompose layouts per breakpoint instead of shrinking them. Validated at 375, 480, 640, 768, 1024, 1280, 1440, 1920 and 2560px.

## Motion

| Level | Use | Mechanism |
|---|---|---|
| 1 Feedback | hover, focus, pressed | `transition-*` utilities (150ms default, 80ms on press) |
| 2 Transition | header state, menu open | `duration-(--duration-standard)`, `starting:` for entry |
| 3 Reveal | content entry | `reveal` utility: content rises and tips back into the page plane in 3D (CSS scroll-driven, no JavaScript) |
| 4 Signature | hero and showcase moments | `enter`/`enter-line`/`enter-stage` one-shot hero entrance; `<Manifesto>` word-by-word scroll reveal; `drift` on watermarks; `<PhoneFan>` 3D fan that opens on scroll; `<Tilt>` pointer-driven 3D tilt with parallax layers (`depth-1`, `depth-2`, `depth-back`); reading-progress hairline (CSS scroll timeline) |

Everything is CSS transforms/opacity plus one small pointer handler (`Tilt`); no animation or 3D libraries. Under `prefers-reduced-motion: reduce`, entrances, reveals, scroll-linked effects and tilt are disabled and every transition/animation duration is neutralised globally. `Tilt` also ignores touch and pen input.

## Cinematic layer

The opening, the hero stage, the project cards and the experience journey are one visual system: the same precision dial (144 ticks, hairline and dashed circles, a short mint arc) appears in the opening, behind the hero portrait and behind Contact. Everything here is decoration or interaction layered over content that is always present and complete; none of it adds or changes text.

| Piece | Where | Notes |
|---|---|---|
| Opening | `components/intro/` | About 4 s, home page, no `#anchor`, no data saver, until it has been seen once in the session (finished or skipped; `introGate.ts` is a `<head>` script, the flag is set in `Intro.tsx`); `/?intro` replays it, and on localhost it plays on every load. The clock starts when the page's JavaScript runs (until then the screen is plain near-black; if that takes over 3 s the page is shown instead), and `introTimeline.ts` times eight states on it: a hairline cross, typed labels and right-side keywords; then one 2D canvas (`introCanvas.ts`, every frame a pure function of the clock) draws the page grid, a hidden-line wireframe landscape, particles in depth and the halo; particles converge onto points sampled from the rendered name (Cinzel, loaded only here) behind a mint sweep; the solid name, role and tagline follow; the camera moves forward while the halo flies onto the hero's dial (`data-intro-target`) and the page opens through it. Skip button, Escape, scroll keys, wheel, click, tap or swipe leave at once; focus is held while it plays and handed to `<main>` after. Reduced motion: a still title card that never blocks the page. Without the canvas, CSS carries the same beats; without JavaScript it never shows. Lighter budget on phones; the canvas resolution is capped by a pixel budget, and dense strokes are one device pixel wide (about 57 fps measured on an integrated GPU). |
| Hero | `HeroSection`, `HeroArch`, `HeroDial`, `motion/HeroParallax`, `Hero.module.css` | Left: eyebrow, the name and role in Playfair Display (shared with Selected Work via `lib/fonts.ts`; the last line mint), the introduction, "View selected work" and the profile icons. Right: an arched window onto a drafted mountain range (seeded geometry, no image) with the opening's dial above the peaks (`data-intro-target`: the opening's halo lands on it) and the real portrait standing in front. Below: the verified facts as a ruled title block, and a scroll cue to `#work`. The view through the window shifts slightly with a mouse (`HeroParallax`); the portrait, text and buttons never move. Phones: copy first, a compact window beneath. Entrance: eyebrow, the name line by line, introduction, actions, facts (shortened after the opening). `motion/HeroK` and `KField` (the WebGL particle K) are no longer used by the hero. |
| Selected work | `SelectedWorkSection`, `WorkProject`, `motion/CardEffects`, `ui/Tilt`, `SelectedWork.module.css` | One composition per tier (`projectKind`): from 1280px the serif heading ("work" in mint) sits beside the flagship, with a rail that fills as the flagship passes (`--progress`) and a cue to the supporting projects. The flagship is an editorial split from 768px: its real cover and phone screens in a layered scene over drafted ridgelines (a mouse tilts it in 3D; the planes part), the copy, stack and actions opposite, capabilities beneath. Supporting projects form a bento: Split-Sync as a cascade of three real screenshots, Engineered.dev with its capabilities as the visual, Roomie Match as a type-only card. Each answers hover in its own way (cover scale 1.02 and tilt; the cascade opening; mint rules drawing along the capability rows; border and arrow). A click on a card's empty space opens its case study; the links stay the keyboard and screen-reader path. Cards enter once (the flagship's cover is unmasked, its phones rise, then its actions). Nothing runs continuously. |
| Journey | `ExperienceSection`, `JourneyFigure`, `JourneyStop`, `journey.ts`, `Journey.module.css` | The roles in the order they happened, as stops on a trail up a drafted landscape (fractal ridgelines from a fixed seed). The trail draws itself with scroll (`--draw`, from `MotionLayer`'s `--progress`) and each stop lights when reached; with no JS or reduced motion the whole trail is drawn. Narrow screens: a banner plus a vertical rail. The years are the dates already written in each role (and the degree's start year). |

Motion is gated the same way everywhere: nothing is hidden before `html.motion-ready`, and `prefers-reduced-motion: reduce` turns the opening, the parallax, the rotation and the scroll-linked drawing off.

## Navigation

Compact sticky header with a mint K monogram: transparent at the top of the page, then a blurred translucent bar with a subtle border once scrolled. A mint rule draws in under a link on hover and stays under the current section. Items: Work, Experience, About, Contact (home-page anchors using `sectionIds`), plus Resume and social icons once they are verified. The active state is set with `aria-current` (`location` for sections, `page` for routes such as `/projects/*`). On mobile it becomes a non-modal disclosure panel: Escape, clicking outside, choosing a link, focus leaving the header and resizing to desktop all close it.

## SEO

`createPageMetadata()` gives each route a title, description, canonical URL and Open Graph fields. `robots.ts` and `sitemap.ts` are generated from config. Set `NEXT_PUBLIC_SITE_URL` for production; without it, absolute URLs fall back to localhost and the build prints a warning.
