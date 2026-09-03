# Design Tokens

Source of truth: **`src/tokens/index.ts`**. Everything else — the CSS custom
properties in `src/styles/globals.css`, the Tailwind theme in
`src/styles/tailwind.config.ts` — is generated from or mirrors that file.

Extracted from Figma:
[TypeB Creative Exploration](https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration),
board **"design tokens"** ([node 3366:23051](https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3366-23051)).

> **The file does not use Figma Variables.** `get_variable_defs` returns `{}`.
> Tokens are drawn on the board as swatches with hex labels, measured spacing
> bars, and text samples. Every value below was read off those samples. There is
> no automated sync — a change in Figma has to be re-entered in
> `src/tokens/index.ts` by hand.

---

## Color

Four ramps. The three chromatic ramps are the **three mood directions**; a mood
swaps the accent ramp and leaves neutrals alone.

### Turquoise — `palette.turquoise` (mood `deep`, used by homepage v1)

| Step | Hex | Used for |
|---|---|---|
| 100 | `#C9D5D3` | Tag pill background (at 40% alpha) |
| 200 | `#9DB8BA` | — |
| 300 | `#709BA0` | Focus ring |
| 400 | `#447E87` | Accent display type ("Advisory", "Teams") |
| 500 | `#17616E` | — |
| 600 | `#13505D` | "How we partner" band, eyebrow chip on accent |
| 700 | `#0F404C` | — |
| 800 | `#0C2F3B` | — |
| 900 | `#081F2A` | — |

### Orange — `palette.orange` (mood `ember`)

`100 #F8D2C1` · `200 #FAB296` · `300 #FB936B` · `400 #FD7340` · `500 #FF5315`
· `600 #CD4516` · `700 #9B3717` · `800 #682A17` · `900 #361C18`

### Amber — `palette.amber` (mood `solar`)

`100 #F7DDC1` · `200 #F9C896` · `300 #FAB26C` · `400 #FC9D41` · `500 #FD8816`
· `600 #CB7017` · `700 #995717` · `800 #683F18` · `900 #362618`

### Neutral — `palette.neutral` (shared by all moods)

| Step | Hex | Used for |
|---|---|---|
| 50 | `#F6F2EC` | Nav links, footer headings, primary CTA on dark |
| 200 | `#C6C4C2` | Tag pill background source |
| 400 | `#959798` | — |
| 600 | `#65696D` | — |
| 800 | `#343C43` | Primary CTA hover on light |
| 900 | `#040E19` | Page canvas, all text on light grounds |

> The neutral ramp has **six** steps, not nine. 100/300/500/700 do not exist on
> the board. They are absent by design, not omitted in transcription.

### Off-board colors — `unmapped`

Three colors are used on the homepage but are **not** on the token board. They
are quarantined in `unmapped` so they stay visible as debt.

| Token | Hex | Where | Nearest board value |
|---|---|---|---|
| `paper` | `#F6F6F6` | Hero text, footer links, secondary CTA | `neutral.50` `#F6F2EC` |
| `inkSoft` | `#071B27` | "View our work" CTA border + label | `neutral.900` `#040E19` |
| `white` | `#FFFFFF` | Eyebrow chip on light bands | `neutral.50` `#F6F2EC` |

**Each needs a decision:** promote to the board, or retire in favour of the
nearest ramp value. See [BUILD_LOG](./BUILD_LOG.md#deviations).

### Semantic aliases — `colors`

Components reference these, never raw ramp steps:

`background.canvas` · `background.surface` · `background.accent` ·
`background.tag` · `background.scrim` · `text.onDark` · `text.onLight` ·
`text.onDarkMuted` · `text.accent` · `border.onDark` · `border.onDarkSubtle` ·
`border.onLight` · `border.divider`

---

## Typography

Family: **Reddit Sans** (Google Fonts, variable 200–900), loaded in `globals.css`.

| Token | Size | Line height | Weight | Figma node |
|---|---|---|---|---|
| `h1` | 72px | 1.2 | 600 | 3369:24533 |
| `h2` | 48px | 1.2 | 600 | 3370:24754 |
| `h3` | 40px | 1.2 | 600 | 3386:25398 |
| `display` | 64px | 1.2 | 600 | 3390:26562 |
| `subHeaderLarge` | 32px | 1.5 | 400 | 3386:25396 |
| `subHeaderSmall` | 24px | 1.5 | 400 | 3373:24762 |
| `copyLarge` | 20px | 1.5 | 400 | 3373:24758 |
| `copyMedium` | 16px | 1.5 | 400 | 3370:24749 |
| `copySmall` | 14px | 1.5 | 400 | 3373:24764 |
| `copyXSmall` | 12px | 1.5 | 400 | 3373:24760 |
| `eyebrow` | 14px | 1.2 | 600 | 3383:25390 |
| `tag` | 12px | 1.5 | 400 | 3383:25393 |
| `button` | 16px | 1.2 | 600 | 3369:24490 |
| `navLink` | 16px | 1.2 | 400 (−0.01em) | 3390:26615 |

> `h3` was 48px — identical to `h2` — until the 2026-08-30 board update, which
> set it to 40px and renamed the sample `text-header-4` → `text-header-3`.
> Keeping them as separate tokens meant the correction was a one-line change.

Tailwind classes are kebab-cased: `text-h1`, `text-sub-header-large`,
`text-copy-medium`, `text-nav-link`.

---

## Gradients — `gradients`

Eight background gradients, added to the board **2026-08-30**. Figma styles
**"Type B BG 1"–"Type B BG 8"**.

Every stop is an existing ramp value, so `tokens.gradients` composes them from
`palette` rather than restating hex. Tailwind exposes them as
`bg-gradient-b1` … `bg-gradient-b8`; CSS as `--gradient-b1` … `--gradient-b8`.

| Token | Node | Angle | Ramp stops | In use |
|---|---|---|---|---|
| `b1` | 3430:26778 | 230.52° | neutral900 → turquoise400 → amber300 → orange200 | **Hero background** |
| `b2` | 3430:26784 | 230.49° | neutral50 → amber300 → orange400 → neutral800 | — |
| `b3` | 3430:26787 | 50.55° | neutral900 → turquoise500 → neutral50 | — |
| `b4` | 3430:26792 | 230.54° | neutral900 → orange400 → amber300 | — |
| `b5` | 3430:26798 | 50.55° | turquoise500 → turquoise100 → neutral50 | — |
| `b6` | 3430:26801 | 230.53° | neutral50 → orange300 → amber400 | — |
| `b7` | 3430:27208 | 50.60° | amber700 → amber500 → neutral50 | — |
| `b8` | 3430:27213 | 230.53° | neutral50 → amber200 → neutral200 → turquoise300 | — |

> Several gradients have final stops **beyond 100%** (b1 at 110.67%, b3 at
> 127.63%). That is intentional in the design — Figma extends the ramp past the
> box so the last colour is approached but never fully reached. Do not
> "normalise" these to 100%; it changes the rendered colour.

---

## Spacing — `spacing`

Figma "spacing-vertical" ([node 3386:25418](https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3386-25418)).

| Token | Value | Class |
|---|---|---|
| `xs` | 4px | `p-xs`, `gap-xs` |
| `sm` | 8px | `gap-sm` |
| `tag` | 12px | `px-tag` — **off-board**, tag pill only |
| `md` | 16px | `gap-md` |
| `lg` | 24px | `gap-lg` |
| `xl` | 32px | `p-xl` |
| `2xl` | 40px | `h-2xl` (button height) |
| `3xl` | 48px | `gap-3xl` |
| `4xl` | 80px | `py-4xl` (band rhythm) |

---

## Radius — `radius`

Figma "radius-corner" ([node 3386:25427](https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3386-25427))
documents **4px and 8px only**. `tag` and `pill` are in active use on the page
but absent from the board.

| Token | Value | Used for | On board? |
|---|---|---|---|
| `sm` | 4px | Eyebrow chip | ✅ |
| `md` | 8px | All cards, images | ✅ |
| `tag` | 12px | Tag pills | ❌ |
| `pill` | 24px | All buttons | ❌ |
| `full` | 9999px | — | ❌ |

---

## Layout — `layout`

Figma "grid-desktop-12-columns" ([node 3386:25446](https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3386-25446)).

| Token | Value |
|---|---|
| `frameWidth` | 1440px |
| `maxWidth` | 1280px (content) |
| `margin` | 80px |
| `gutter` | 24px |
| `columns` | 12 |

> `Container` caps at **`frameWidth`**, not `maxWidth`, because the 80px margins
> are padding *inside* the frame. Capping at 1280 and then padding would give a
> 1120px content width and silently narrow every section.

---

## Breakpoints — `breakpoints` ⚠ NOT IN FIGMA

`sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1440`

The file contains **desktop artboards only**. There are no tablet or mobile
frames and no documented breakpoints. These are an engineering decision, chosen
so `xl` lands on the content width and `2xl` on the frame. **Everything below
`xl` is an interpretation.** Needs design review before client handoff.

---

## Motion — `motion` ⚠ NOT IN FIGMA

The token board contains **no** duration, easing, or parallax specification.
Verified two ways: the complete node listing for the board, and a render of the
full 1440×10570 artboard (content stops around 40% down; the rest is empty
canvas).

The homepage brief calls for parallax and smooth scroll, so this scale is
**authored** — every value is a proposal awaiting sign-off.

| Group | Tokens |
|---|---|
| `duration` | `instant .15s` · `fast .3s` · `base .6s` · `slow .9s` · `marquee 40s` |
| `easing` | `out [.16,1,.3,1]` · `inOut [.65,0,.35,1]` · `linear` |
| `parallax` | `subtle .08` · `base .18` · `strong .32` |
| `reveal` | `distance 32px` · `stagger .08s` |
| `viewport` | `amount .25` · `once true` |

## Elevation — `elevation` ⚠ NOT IN FIGMA

The board defines no shadows and the homepage uses none — depth comes from color
and scrims. Declared as `{ none }` rather than invented, so a future shadow
scale has an obvious home.

## `gradients.industry`

Five row fills from the Industries page (nodes 3276:21593 / 21597 / 21601 /
21605 / 21609), composed from palette values rather than shipped as images —
`download_assets` returns no raw image for them, only an SVG carrying the stops.

| key | ramp | angle |
|---|---|---|
| `healthcare` | cream → amber.500 → orange.500 → turquoise.500 | 122.8deg |
| `financial` | ink → turquoise.500 → cream | 302.8deg |
| `realEstate` | ink → orange.400 → amber.300 | 122.8deg |
| `manufacturing` | turquoise.500 → turquoise.100 → cream | 302.8deg |
| `legal` | cream → orange.300 → amber.400 | 122.8deg |

The two angles are mirror-corrected: the SVG export is flipped horizontally, so
its own coordinates give the wrong direction. See BUILD_LOG for the fit.

Exposed to Tailwind as `bg-gradient-industry-healthcare` and so on; the theme
mapping flattens this nested group.

## `colors.border.accentSoft`

The rule between FAQ questions — the active accent at 40%, via
`--color-border-accent-soft`, defined per mood alongside the accent ramp. Figma
exports it as `stroke="#17616E"` at 40% opacity (node 2894:14480). Distinct from
`divider`, which is ink at 12%: by the FAQ the Industries ground has faded to
turquoise.100, where an ink rule reads as a foreign colour. Class:
`border-accent-soft`.

## `colors.background.surface` note

The Industries body does not use `surface`; it carries a continuous gradient
(`neutral.50 → amber.100 → turquoise.100`) declared on the page. See
`PAGE_GRADIENT` in `src/pages/industries.tsx`.

## `colors.feedback`

⚠ NOT IN FIGMA — no artboard documents an error, warning or success state.
Authored, awaiting sign-off. Both values are existing ramp ends, so form
feedback still reads as this brand rather than as generic validation UI.

| token | value | why |
|---|---|---|
| `danger` | `orange.700` `#9B3717` | 6.57:1 on the field fill; `orange.600` fails AA at 4.35:1 and `orange.500` is 2.98:1 |
| `success` | `neutral.900` | the toast is a dark pill — the palette has no green, and adding one for one component puts a hue on the page that exists nowhere else |

Also `colors.border.danger` (same value) as `border-danger`.

## `typography.numeral`

240px / 220px line height, bold — the Careers carousel index (node 3638:9412).
Far off the reading scale because it is a graphic, not text: drawn with a
transparent fill and a 1px stroke, and deliberately overlapped by the slide's
subheader. The tight line height is what makes that overlap land.

## `colors.border.accentSoftOnDark`

The FAQ rule where the ground is ink — accent.**400** at 40%, one step lighter
than `accentSoft`, because accent.500 at 40% over neutral.900 is nearly
invisible. Measured `#1D3A45` on the Careers artboard (node 3638:9372). Class:
`border-accent-soft-dark`; reached via `<Accordion tone="onDark">`.
