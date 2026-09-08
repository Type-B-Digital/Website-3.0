# Type B Digital — Brand & Design System Guidelines

Audited from the source of `type-b-digital-staging` on 2026-09-08. Every value
here was read out of the code, not restated from a spec.

**Sources of truth, in order.** `src/tokens/index.ts` is authoritative.
`src/styles/globals.css` mirrors it as CSS custom properties for
stylesheet-level use and the mood swap. `src/styles/tailwind.config.ts` derives
every utility class from the same tokens. If the three disagree, the TypeScript
file wins and the other two are the bug.

**How to read the warnings.** `⚠ NOT IN FIGMA` marks a decision that was
authored rather than reproduced, because the design file does not cover it. The
Figma file contains **desktop-only artboards at 1440px**. There are no tablet
or mobile frames, no motion specification, no error/success states, and no
focus treatment. Everything in those four areas is an engineering
interpretation and is flagged as such. Do not present it to the client as
design.

---

## Table of contents

1. [Brand Foundations](#1-brand-foundations)
2. [Design Tokens](#2-design-tokens)
3. [Component Inventory](#3-component-inventory)
4. [Layout Patterns](#4-layout-patterns)
5. [Atomic Design Map](#5-atomic-design-map)

---

## 1. Brand Foundations

### 1.1 Who this is for

Type B Digital is a senior product, design and engineering firm selling to
mid-market and regulated buyers — CTOs, VPs of Engineering, COOs, CISOs,
operating partners. The reader is technical or technical-adjacent, is being
asked to spend real money, and has been disappointed by a vendor before.

### 1.2 Voice

Plain, specific, and unhurried. The copy leads with the constraint rather than
the promise: *"Your $25/hour developer is costing you $100/hour in management
time and rework."* Claims carry numbers and a named client. Where something is
unfinished the site says so rather than filling the space.

| Do | Don't |
| --- | --- |
| Name the client and the number: "43% cost reduction", "500K users supported" | Write unbacked superlatives — "world-class", "cutting-edge" |
| Lead with the reader's problem, then the mechanism | Lead with the company's history |
| Use sentence-length sentences and ordinary words | Use agency abstraction — "solutions", "synergies", "leverage" |
| Leave a slot visibly empty when copy is missing | Fill a gap with lorem or a placeholder that reads as real |

### 1.3 Visual character

- **Warm, not corporate.** The light ground is a cream (`#F6F2EC`), never
  white. The dark ground is a deep blue-black ink (`#040E19`), never black.
- **Flat.** There is no elevation anywhere in the system — `elevation.none`.
  Depth comes from scrims over photography and from gradient grounds.
- **Gradient-led.** Most pages carry a full-body diagonal gradient built from
  ramp values. Each page in a family gets its own; they are not interchangeable.
- **Type does the work.** One family, a wide scale (12px to 240px), heavy
  headline sizes and generous whitespace. No decorative rules, no borders
  except dividers and outlined buttons.
- **Photography is always cropped and rounded.** 8px radius on every thumbnail
  and inline image; only genuinely full-bleed bands meet the viewport edge
  square.
- **Motion is slow and settles.** Long durations on symmetric easing, a blur
  that resolves, and a lag before anything moves. Nothing pops.

| Do | Don't |
| --- | --- |
| Use `#F6F2EC` cream as the light ground | Use `#FFFFFF` as a page ground — white appears only as a chip fill |
| Let a page's gradient run behind its sections (`tone="none"`) | Paint a flat band inside a gradient page |
| Keep surfaces flat | Add a shadow to lift a card |
| Round thumbnails and inline images to 8px | Round logos, vector glyphs, or full-bleed bands |

---

## 2. Design Tokens

### 2.1 Colour ramps

Four ramps. Three are chromatic and **are the three mood directions**; the
neutral ramp is mood-independent.

```css
/* turquoise — Figma "color-shades-turquoise", node 3369:24675 */
--color-turquoise-100: #C9D5D3;
--color-turquoise-200: #9DB8BA;
--color-turquoise-300: #709BA0;
--color-turquoise-400: #447E87;
--color-turquoise-500: #17616E;
--color-turquoise-600: #13505D;
--color-turquoise-700: #0F404C;
--color-turquoise-800: #0C2F3B;
--color-turquoise-900: #081F2A;

/* orange — node 3369:24676 */
--color-orange-100: #F8D2C1;
--color-orange-200: #FAB296;
--color-orange-300: #FB936B;
--color-orange-400: #FD7340;
--color-orange-500: #FF5315;
--color-orange-600: #CD4516;
--color-orange-700: #9B3717;
--color-orange-800: #682A17;
--color-orange-900: #361C18;

/* amber — node 3369:24677 (the second "orange" column on the board) */
--color-amber-100: #F7DDC1;
--color-amber-200: #F9C896;
--color-amber-300: #FAB26C;
--color-amber-400: #FC9D41;
--color-amber-500: #FD8816;
--color-amber-600: #CB7017;
--color-amber-700: #995717;
--color-amber-800: #683F18;
--color-amber-900: #362618;

/* neutral — node 3369:24678. Six steps only; 100/300/500/700 do not exist. */
--color-neutral-50:  #F6F2EC;
--color-neutral-200: #C6C4C2;
--color-neutral-400: #959798;
--color-neutral-600: #65696D;
--color-neutral-800: #343C43;
--color-neutral-900: #040E19;
```

**Off-board values still in use.** These are near-misses for ramp values that
the artboards use anyway. They are tracked as debt, not blessed.

```css
--color-paper:         #F6F6F6;  /* hero + footer text; near-miss for neutral.50 */
--color-ink-soft:      #071B27;  /* secondary-light CTA label; near-miss for neutral.900 */
--color-white:         #FFFFFF;  /* eyebrow chip fill only */
--color-footer-ground: #030B15;  /* footer, one step below canvas */
```

> **Naming trap.** `orange` and `amber` are two different ramps. Figma calls
> both "color-shades-orange". Never write a variable or prop value called
> `orange` where a reader could reasonably expect `amber`; name by the **mood**
> instead (`ember` = orange, `solar` = amber).

### 2.2 Moods (accent selection)

`--color-accent-*` resolves through `[data-mood]` on `:root`. Swapping the
attribute re-themes the site with **zero component edits**.

| Mood | Accent ramp | Use |
| --- | --- | --- |
| `deep` | turquoise | Default. Set on `:root` with no attribute. |
| `ember` | orange | Warm pages |
| `solar` | amber | Warm pages |

```css
:root, :root[data-mood='deep']  { --color-accent-500: #17616E; /* …100–900 */ }
:root[data-mood='ember']        { --color-accent-500: #FF5315; }
:root[data-mood='solar']        { --color-accent-500: #FD8816; }
```

Each mood block also sets `--color-tag-bg`, `--color-border-accent-soft` and
`--color-border-accent-soft-dark`.

| Do | Don't |
| --- | --- |
| Reach for `accent-*` so a component follows the mood | Hardcode `turquoise-500` where the accent is meant |
| Use a **fixed ramp value** when a page deliberately keeps one element off-mood | Swap `data-mood` to recolour one element — it carries the whole ramp |

> **Scope.** The selectors are `:root`-anchored, so a mood is **document-wide**.
> There is no element-level mood scoping today. A page that needs only some
> elements warm must name those values individually — this is exactly why the
> Teams page is not `data-mood="ember"` despite being warm: its FAQ rule and
> Featured chip stay turquoise.

### 2.3 Semantic colour

```css
/* backgrounds */
--color-bg-canvas:       #040E19;                  /* dark page ground */
--color-bg-surface:      #F6F2EC;                  /* light page ground (cream, NOT white) */
--color-bg-accent:       var(--color-accent-600);
--color-bg-accent-deep:  #17616E;
--color-chip-light:      #F7DDC1;                  /* eyebrow chip on light */
--color-chip-accent:     #13505D;                  /* eyebrow chip on accent */
--color-tag-bg:          rgba(198, 196, 194, 0.4); /* tag pill on light */
--color-scrim:           rgba(4, 14, 25, 0.4);     /* over card imagery */
--color-scrim-strong:    rgba(4, 14, 25, 0.8);     /* over imagery with a label on top */

/* text */
--color-text-on-dark:        #F6F6F6;
--color-text-on-dark-muted:  #F6F2EC;
--color-text-on-light:       #040E19;
--color-text-accent:         var(--color-accent-400);

/* borders */
--color-border-on-dark:         rgba(246, 246, 246, 0.4);
--color-border-on-dark-subtle:  rgba(246, 246, 246, 0.24);
--color-border-on-light:        rgba(7, 27, 39, 0.24);
--color-border-divider:         rgba(4, 14, 25, 0.12);
--color-border-accent-soft:     /* accent.500 @ 40%, per mood — FAQ rules on light */
--color-border-accent-soft-dark:/* accent.400 @ 40%, per mood — FAQ rules on ink */
```

**⚠ NOT IN FIGMA — feedback colours.** No artboard documents an error, warning
or success state. Both values are ramp ends, chosen by measured contrast:

```css
--color-danger:  #9B3717;  /* orange.700 — 6.57:1 on the #F5F6F6 field fill */
--color-success: #040E19;  /* the ink canvas; the toast is a dark pill */
```

`orange.600` was tried and fails at 4.35:1. `orange.500`, the obvious "error
red", is 2.98:1 and would ship unreadable error text.

| Do | Don't |
| --- | --- |
| Pair every error colour with an icon **and** text | Use colour as the only signal |
| Verify any new semantic colour against its actual ground | Pick an error red by eye |

### 2.4 Opacity

```css
--opacity-dim:    0.16;  /* unfilled scroll-fill text */
--opacity-subtle: 0.64;  /* footer column headings, disabled buttons */
--opacity-muted:  0.80;  /* body copy, eyebrow labels, nav — the common value */
--opacity-full:   1;
```

### 2.5 Typography

One family. `Reddit Sans`, loaded from Google Fonts, variable 200–900.

```css
--font-sans: 'Reddit Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

--font-weight-regular:  400;
--font-weight-medium:   500;
--font-weight-semibold: 600;
--font-weight-bold:     700;
```

Every step below is a token in `typography` and maps 1:1 to a Tailwind
`text-*` class. There are no size, weight or line-height literals in components.

| Token | Class | Size | Line height | Weight | Tracking |
| --- | --- | --- | --- | --- | --- |
| `h1` | `text-h1` | 72px | 1.2 | 600 | — |
| `display` | `text-display` | 64px | 1.2 | 600 | — |
| `h2` | `text-h2` | 48px | 1.2 | 600 | — |
| `h3` | `text-h3` | 40px | 1.2 | 600 | — |
| `subHeaderLarge` | `text-sub-header-large` | 32px | 1.5 | 400 | — |
| `navPanelLink` | `text-nav-panel-link` | 32px | 42/32 | 400 | — |
| `subHeaderSmall` | `text-sub-header-small` | 24px | 1.5 | 400 | — |
| `copyLarge` | `text-copy-large` | 20px | 1.5 | 400 | — |
| `copyMedium` | `text-copy-medium` | 16px | 1.5 | 400 | — |
| `button` | `text-button` | 16px | 1.2 | 600 | — |
| `navLink` | `text-nav-link` | 16px | 1.2 | 400 | −0.01em |
| `copySmall` | `text-copy-small` | 14px | 1.5 | 400 | — |
| `eyebrow` | `text-eyebrow` | 14px | 1.2 | 600 | — |
| `copyXSmall` | `text-copy-x-small` | 12px | 1.5 | 400 | — |
| `tag` | `text-tag` | 12px | 1.333 | 400 | — |
| `numeral` | `text-numeral` | 240px | 220/240 | 700 | −0.01em |

Notes that matter when regenerating:

- `tag` is **1.333, not 1.5**. Every artboard draws the pill 24px tall over a
  16px line box; at 1.5 the pill is 26 and every tag row gains 2px.
- `navPanelLink` is the `subHeaderLarge` size but **not** that token — the panel
  runs a 50px row pitch, and 1.5 leading would push the fourth link 24px low.
- `numeral` is a graphic, not reading text — an outline digit the slide's
  subheader deliberately overlaps.
- Headings get `text-wrap: balance`; everything else gets `pretty`. A caller's
  own wrapping class wins.

| Do | Don't |
| --- | --- |
| Render all text through `<Typography variant="…">` | Write `text-[32px]` or a raw `font-semibold` on prose |
| Add a token when a size genuinely recurs | Bend an existing token to a near-miss size |
| Set an off-scale size inline **with a comment naming the node** | Silently introduce a 15th size |

### 2.6 Spacing

Derived from the Figma "spacing-vertical" board (8/16/24/32/40/48/80).

```css
--spacing-xs:   4px;
--spacing-sm:   8px;
--spacing-tag:  12px;   /* tag pill horizontal padding — OFF-BOARD */
--spacing-md:   16px;
--spacing-lg:   24px;
--spacing-xl:   32px;
--spacing-2xl:  40px;
--spacing-3xl:  48px;
--spacing-4xl:  80px;
--spacing-5xl:  120px;  /* 80 + 40; off-board but on the scale */
--spacing-logo-gap: 93px; /* client logo strip — OFF-BOARD, measured */
```

### 2.7 Radius

```css
--radius-sm:   4px;   /* eyebrow chips, small marks */
--radius-md:   8px;   /* every image, card and panel in the design */
--radius-tag:  12px;  /* tag pills — OFF-BOARD */
--radius-pill: 24px;  /* buttons — OFF-BOARD */
--radius-full: 9999px;
```

The board documents only 4px and 8px. `tag` and `pill` are in active use and
are logged as deviations.

### 2.8 Elevation

```css
--elevation-none: none;
```

**The system has no shadows.** Declared explicitly so a future scale has an
obvious home rather than being invented ad hoc.

### 2.9 Grain

A global noise overlay sits above everything, outside the routes.

```css
--grain-tile:    url('/images/noise.png');
--grain-density: 0.8;
--grain-opacity: 0.08;  /* ⚠ reduced from the specified 0.24 */
```

At the specified 0.24 with 0.8 density the grain darkens white by ~19%
(0.8 × 0.24), turning every light section grey — arithmetic, not a bug.
`soft-light` blending preserves tone but makes the grain invisible on white.
0.08 keeps both.

### 2.10 Motion — ⚠ NOT IN FIGMA

The design file documents no duration, easing or parallax value anywhere. The
whole scale is authored.

```css
--duration-instant: 0.15s;
--duration-fast:    0.30s;   /* hovers, colour transitions */
--duration-base:    0.60s;
--duration-slow:    0.90s;
--duration-reveal:  1.20s;   /* scroll reveals — deliberately long */
--duration-marquee: 40s;
--duration-marquee-slow: 60s; /* client logo strip */

--ease-out:    cubic-bezier(0.16, 1, 0.30, 1);    /* entrances */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);    /* reversible state changes */
--ease-scroll: cubic-bezier(0.42, 0, 0.58, 1);    /* moving the page itself */
```

Reveal behaviour: `distance: 32px`, `stagger: 0.14s`, `lag: 0.12s`,
`feather: 10px` blur, viewport `{ amount: 0.25, once: true }`. Scroll-linked
progress is smoothed through a spring first —
`{ stiffness: 55, damping: 22, mass: 0.45 }`.

Three things make a reveal read as easing rather than popping: a long duration
on symmetric easing, a flat delay before anything moves, and a blur it resolves
from.

| Do | Don't |
| --- | --- |
| Use `Reveal` with an `index` to stagger siblings | Orchestrate a group from a parent — each item should trigger on its own position |
| Honour `useReducedMotion()` in every animated component | Ship a pinned scene with no reduced-motion path |
| Drive scroll-linked verification with **real** gestures | Trust a screenshot — `useScroll` never fires under virtual time |

### 2.11 Breakpoints — ⚠ NOT IN FIGMA

Tailwind's defaults are **replaced**, not extended, so no off-token screen can
be referenced by accident.

```css
--screen-sm:  640px;
--screen-md:  768px;
--screen-lg:  1024px;
--screen-xl:  1280px;   /* the content width */
--screen-2xl: 1440px;   /* the frame width */
```

`xl` and `2xl` are chosen to land on the content and frame widths. **Everything
below `xl` is interpretation.** Confirm against design before client handoff.

### 2.12 Gradients

Eight page grounds (`b1`–`b8`) from the token board, plus per-page families.
Every stop is a ramp value; stops beyond 100% are intentional, as Figma extends
the ramp past the box.

- `gradients.b1` … `b8` → `bg-gradient-b1` … `bg-gradient-b8`
- `gradients.b1Stops`, `b2Stops`, `b4Stops`, `b5Stops`, `b6Stops`, `b7Stops`,
  `b8Stops` — the stop lists without a direction, for animating the **angle**
- `gradients.industry.*` → `bg-gradient-industry-*` (five industry pages)
- `gradients.service.{advisory,product,teams}` — each service page has its own
  diagonal; they are **not** interchangeable

| Do | Don't |
| --- | --- |
| Give a page family member its own ground from `gradients.service` | Reuse one shared gradient across pages that each have their own |
| Sample a diagonal gradient **diagonally** | Sample down the left gutter and fit a 180° ramp — that is how the wrong shared gradient was produced |

### 2.13 Global base rules

Set once in the `@layer base` of `globals.css`. A regenerated system must
reproduce these or components will look correct in isolation and wrong on a page.

```css
html {
  scroll-behavior: smooth;
  scroll-snap-type: y proximity;   /* proximity, never mandatory */
  background-color: var(--color-bg-canvas);
  overflow-x: clip;
}

body {
  margin: 0;
  overflow-x: clip;
  background-color: var(--color-bg-canvas);
  color: var(--color-text-on-dark);
  font-family: var(--font-sans);
  font-size: var(--font-size-copy-medium);   /* 16px */
  line-height: var(--line-height-relaxed);   /* 1.5 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ⚠ NOT IN FIGMA — an accessibility addition, not a reproduction. */
:focus-visible {
  outline: 2px solid var(--color-accent-300);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

img { display: block; max-width: 100%; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

The document default is the **dark** ground with cream text. Light pages opt in
by painting `bg-surface` and setting `text-on-light`.

`scroll-snap-type` is `proximity` because `mandatory` makes it impossible to
stop anywhere inside the pinned scenes, which run several viewports long and
are meant to be scrolled through.

| Do | Don't |
| --- | --- |
| Keep the focus ring — the design omits one, the site needs one | Remove `:focus-visible` because it is not in the artboard |
| Reproduce the reduced-motion kill switch | Rely on per-component checks alone |

---

## 3. Component Inventory

Props marked *(default)* show the value when omitted.

### 3.1 Atoms

#### `Typography`
`variant` (required, one of the 16 tokens) · `as` · `muted` · `className`

- Every variant maps to exactly one token. No literals.
- `muted` applies the 80% body alpha used on nearly all prose.
- **Do** override the element with `as` when semantics and size disagree.
- **Don't** pass a size class; pass a different `variant`.

#### `Button`
`variant`: `primary` *(default)* | `secondary` | `tertiary` ·
`tone`: `onDark` *(default)* | `onLight` · `icon` *(true)* · `as` · `className`

| Variant | onLight | onDark |
| --- | --- | --- |
| `primary` | ink fill, cream label | cream fill, ink label |
| `secondary` | outlined, `--color-border-on-light` | outlined, `--color-border-on-dark` |
| `tertiary` | label + arrow only | label + arrow only |

States: hover (fill or tint step) · `disabled:opacity-subtle` with
`cursor-not-allowed` · `focus-visible` 2px `accent-500` outline at 2px offset.
Height is `--spacing-2xl` (40px), radius `pill`.

- **Do** use `as={Link}` for internal routes and keep the trailing arrow.
- **Don't** fade a disabled label out of contrast — keep it readable.

#### `Eyebrow`
`tone`: `onLight` *(default)* | `onAccent` | `ink` | `white` | `slate` | `solar` | `ember`

A solid chip, `radius-sm`, `px-sm py-xs`, `text-eyebrow` at 80%.

| Tone | Fill | Label |
| --- | --- | --- |
| `onLight` | `chip-light` (#F7DDC1) | ink |
| `onAccent` | `accent-600` | cream |
| `ink` | canvas | paper |
| `slate` | `neutral-800` | paper |
| `white` | `#FFFFFF` | ink |
| `solar` | `amber-500` | ink |
| `ember` | `orange-500` | ink |

- **Do** give every section label a chip — it is the site-wide treatment.
- **Don't** render eyebrow-sized text with no background.

#### `Tag`
`tone`: `onLight` *(default)* | `onDark`. Pill label, `radius-tag`, `px-tag py-xs`.

- **Don't** pass a background class alongside `tone`; `cn` is a plain join with
  no Tailwind merge, so both survive and stylesheet order decides the winner.

#### `Card`
`src` · `alt` · `aspect`: `verticalMedium` *(410×560, default)* |
`horizontalMedium` *(519×311)* | `horizontalSmall` *(410×287)* ·
`crop` · `scrim` · `children`

Radius `md`. Depth comes from the scrim, never a shadow.

#### `Container`
`bleed` · `className`. Caps at **1440 (the frame)**, not 1280.

- **Don't** cap at 1280 and then add padding — that yields a 1120 content
  width and silently narrows every section by 160px.

#### `Section`
`tone`: `dark` *(default)* | `light` | `accent` | `none` ·
`spacing`: `none` | `compact` (48) | `default` (80) | `loose` (80 → 160 at xl) ·
`bare` · `id` · `style`

- **Do** use `tone="none"` inside a page that paints its own ground.
- **Don't** use `tone="none"` where no ancestor paints anything — ink type
  falls through onto the ink canvas and renders invisibly. This defect has
  shipped twice.

#### Icons
`ArrowRight` · `CaretDown` · `ChevronDown` · `CloseIcon` · `MenuIcon` ·
`TypeBLogo` · `TypeBMark`. All 24×24 except the logos, 2px strokes, round caps,
`currentColor`.

- **Don't** bake a stroke colour into an exported asset — inherit
  `currentColor` so one component serves light and dark.

### 3.2 Molecules

#### `Field`
`label` · `name` · `value` · `onChange` · `onBlur` · `error` · `type`:
`text` | `email` · `multiline` · `required` · `autoComplete`

Fill `paper`, `radius-sm`, `text-copy-small`. The label doubles as the
placeholder. Error state sets `border-danger`, `aria-invalid`, and renders an
icon plus the message in `text-danger`.

- **Do** wire the message id into `aria-describedby`.
- **Don't** signal an error with a border colour alone.

#### `Captcha` · `Toast` · `Tabs` · `Accordion`
- `Captcha`: `onVerify` · `error`. An arithmetic challenge, not a third party.
- `Toast`: `open` · `title` · `description` · `duration` *(pass 0 for manual)* ·
  `onDismiss`. A dark pill.
- `Tabs`: `items` (`{ id, label, variant?: 'pill' | 'plain' }`) · `active` ·
  `onChange` · `tone` · `panelId`.
- `Accordion`: `items` · `tone`: `onLight` | `onDark` · `defaultOpen` *(null —
  all closed, as drawn)* · `single` *(true)*. Rules use `accentSoft` on light
  and `accentSoftOnDark` on ink.

#### `CountUp`
`to` · `prefix` · `suffix` · `start`. Runs 0 → target on intersection.
`start` gates it inside a pinned scene, where the element is technically on
screen while its container is still at opacity 0.

- **Do** render the finished value as text so a screen reader reads it.

#### `Reveal` · `Marquee` · `ParallaxSection` · `ScrollTrack` · `GroundCrossfade` · `ScrollFillText` · `GlowText` · `HeroIntro` / `NavIntro` · `ScrollToTop`
Motion primitives. All honour `useReducedMotion()`.

#### `HeroStats`
`stats: { value, label }[]`. Right-aligned to columns 4–6, 7–9, 10–12 so the
numbers line up as a column of **right edges**. Parses its display strings
("30+", "25%") into `CountUp` parts.

### 3.3 Organisms

`SiteHeader` · `SiteFooter` · `ClosingCta` · `Testimonial` · `Hiring` ·
`ValuesMarquee` · `FaqSection` · `Globe` · `DivergeConverge`

Plus the section library in `src/components/sections/`:
`ServiceHero` · `IndustryHero` · `CaseHero` · `IdealCustomerProfiles` ·
`CapabilityGrid` · `EngagementSteps` · `LevelsList` · `SplitFeature` ·
`FeaturedCase` · `RelatedServices` · `Statement` · `StatBand` · `Packaging` ·
`StaggeredCards` · `CaseBand` · `CaseChallenge` · `CaseSolution` ·
`CaseImpact` · `CaseFigure` · `CaseGallery`

Rules that have already cost time:

| Do | Don't |
| --- | --- |
| Let the **page** paint the ground and the block inherit it | Give a shared block its own flat fill — it becomes a white band on every gradient page |
| Expose a `tone`/`eyebrowTone`/`marqueeTone` prop defaulting to current behaviour | Fork a component to recolour it on one page |
| Keep `SiteHeader` `NAV_ITEMS` and `SiteFooter` `FOOTER_COLUMNS` in step | Change one and leave the other — they list the same sections |
| Render an inert label where a page does not exist | Ship a link that 404s |

### 3.4 Templates

- **`PageShell`** — header, `children`, optional `ClosingCta`, footer.
  `closing` *(true)* · `headerTone`.
- **`ContentPage`** — `PageShell` plus one body ground, FAQ, optional
  testimonial, values marquee. `faq` · `testimonial` · `ground` · `headerTone` ·
  `marqueeTone`.
- **`CaseStudyPage`** — the case-study composition.

---

## 4. Layout Patterns

### 4.1 The grid

```css
--layout-frame-width: 1440px;  /* artboard frame — Container's max-width */
--layout-max-width:   1280px;  /* content width */
--layout-margin:      80px;    /* page margin, inside the frame */
--layout-gutter:      24px;
--layout-columns:     12;
--layout-nav-panel-height: 587px;
```

A column at the designed width is **88.67px**. `Container` caps at the
**frame** and applies the margin as padding: `px-md` → `md:px-xl` →
`xl:px-4xl`.

### 4.2 Section rhythm

`compact` 48 · `default` 80 · `loose` 80, doubling to 160 at `xl`. Hero
sections open at `pt-[232px]`, which is the artboard's distance from the top of
the frame to the first element under the absolutely-positioned header.

### 4.3 Exact splits

Some layouts do **not** sit on the 12-column grid and are held as literals:

| Layout | Split |
| --- | --- |
| Publications index | 323 rail + 99 gap + 858 grid = 1280 |
| Article page | 323 rail + 112 gap + 845 body = 1280 |
| Publication card | 417 × 341, 24 gutter, two columns of 858 |

- **Do** keep an exact split as a literal with a comment showing the sum.
- **Don't** round it onto the 12-column grid — it will not land.

### 4.4 Responsive behaviour — ⚠ NOT IN FIGMA

There are no artboards below 1440. Established interpretations:

- Multi-column grids collapse `lg` → `md` → single column.
- Display type steps down one scale step below `md` (`text-h2 md:text-h1`).
- The five nav dropdowns are replaced by a full-viewport drawer below `lg`.
- Navigational aids that would precede the content they describe are hidden
  below `lg` rather than stacked above it.
- Every route must show **zero horizontal overflow at 390px and 1440px**.

### 4.5 Overflow containment

The site is full of deliberately over-wide decorative elements. Containment is
`overflow-x: clip` on **both** `html` and `body`.

- **Don't** use `overflow: hidden` — it creates a scroll container and
  `position: sticky` stops working, which breaks every pinned scene.
- **Don't** set it on one element only — the root propagates overflow to the
  viewport instead of clipping its own box, so either alone measures 395px
  against a 390px viewport.

### 4.6 Base path and assets

The site may be served from a subpath. Resolve every `public/` reference
through `asset()`, which normalises both sides of the join.

- **Don't** write a bare `/images/…` string literal — Vite emits it as written
  and it 404s wherever the site is not at the domain root.
- **Don't** assume `import.meta.env.BASE_URL` ends in a slash. It does not when
  the base is configured without one, which is how all 37 homepage images once
  shipped as `/Website-3.0images/…`.

---

## 5. Atomic Design Map

| Level | Location | Contents |
| --- | --- | --- |
| **Design tokens** | `src/tokens/index.ts`, `src/styles/globals.css` | colour ramps, moods, semantic colour, typography, spacing, radius, elevation, opacity, motion, breakpoints, gradients, grain |
| **Atoms** | `src/components/*.tsx` | `Typography`, `Button`, `Eyebrow`, `Tag`, `Card`, `Container`, `Section`, `icons/*` |
| **Molecules** | `src/components/*.tsx` | `Field`, `Captcha`, `Toast`, `Tabs`, `Accordion`, `CountUp`, `HeroStats`, `Marquee`, `Reveal`, `ParallaxSection`, `ScrollTrack`, `GroundCrossfade`, `ScrollFillText`, `GlowText`, `Intro`, `ScrollToTop` |
| **Organisms** | `src/components/layout/*`, `src/components/sections/*` | `SiteHeader`, `SiteFooter`, `ClosingCta`, `Testimonial`, `Hiring`, `ValuesMarquee`, `FaqSection`, `Globe`, `DivergeConverge`, and the section library |
| **Templates** | `src/components/layout/PageShell.tsx`, `src/components/sections/ContentPage.tsx`, `case-study.tsx` | `PageShell`, `ContentPage`, `CaseStudyPage` |
| **Pages** | `src/pages/*.tsx` | one file per route; content data lives beside it in `*-content.ts` |

### Rules for the next phase

1. **Tokens first.** No component may contain a colour, size, or duration
   literal. If a value is needed and no token fits, add the token and say in a
   comment where it came from.
2. **A component owns its shape, a page owns its ground.** Blocks used on more
   than one page must not paint a background.
3. **Extend by prop, never by fork.** Every variation added in this codebase —
   `headerTone`, `eyebrowTone`, `marqueeTone`, `hubFromBar` — defaults to prior
   behaviour so nothing else moves.
4. **Content lives beside the page, not inside the component.** See
   `work-content.ts`, `service-content.ts`, `industry-content.ts`,
   `publications-content.ts`.
5. **Mark what is not designed.** Anything without an artboard carries
   `⚠ NOT IN FIGMA` at its definition. Do not quietly launder an engineering
   decision into the design system.
6. **Measure, don't eyeball.** Contrast, spacing and overflow claims in this
   codebase are made against the rendered page, sampling the worst case rather
   than the mean. A mean hid an unreadable label at 1.39:1 behind a
   comfortable-looking 10.76:1.
