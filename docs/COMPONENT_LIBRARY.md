# Component Library

Ten components in `src/components/`, all exported from `src/components/index.ts`.

**Rule: no component contains a raw hex, px, or easing value.** Everything routes
through `src/tokens/index.ts` via the Tailwind theme. The only literals in the
codebase are composition-specific dimensions measured off the artboard (a text
column's max width, a thumbnail's box), and those are commented with their node.

```ts
import { Button, Card, Container, Section, Typography } from '@/components'
```

---

## Layout

### `Container`
Horizontal page frame. Figma [node 3386:25446](https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3386-25446).

| Prop | Type | Default | Notes |
|---|---|---|---|
| `bleed` | `boolean` | `false` | Drop the max-width, keep page padding |
| `className` | `string` | — | |

Caps at `layout.frameWidth` (1440) with `layout.margin` (80px) padding, yielding
the 1280px content width. **Do not change this to 1280** — see DESIGN_TOKENS.

```tsx
<Container>…</Container>
```

### `Section`
A page band: ground color + vertical rhythm, wrapping content in a `Container`.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `tone` | `'dark' \| 'light' \| 'accent'` | `'dark'` | Sets background + readable text color |
| `spacing` | `'none' \| 'compact' \| 'default' \| 'loose'` | `'default'` | `compact` 48px, `default` 80px, `loose` 80/160px |
| `bare` | `boolean` | `false` | Skip the Container (full-bleed bands) |
| `id` | `string` | — | Anchor target |

```tsx
<Section tone="accent" spacing="loose">…</Section>
```

---

## Content

### `Typography`
The entire type scale. Variants map 1:1 to `tokens.typography`.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `TypographyVariant` | — | Required. See table below |
| `as` | `ElementType` | per-variant | Change element without changing style |
| `muted` | `boolean` | `false` | Applies the design's 80% body alpha |

Variants: `h1` `h2` `h3` `display` `subHeaderLarge` `subHeaderSmall` `copyLarge`
`copyMedium` `copySmall` `copyXSmall` `eyebrow` `tag` `button` `navLink`

```tsx
<Typography variant="h2">What sets us apart</Typography>
<Typography variant="copyMedium" muted>Body copy.</Typography>
<Typography variant="h1" as="span">~100</Typography>
```

### `Button`
Figma [node 3369:24489](https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3369-24489).

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` | Solid / outlined / label-only |
| `tone` | `'onDark' \| 'onLight'` | `'onDark'` | **Which ground it sits on**, not its colour |
| `icon` | `boolean` | `true` | Trailing arrow |
| `as` | `ElementType` | `'button'` | Use `as="a"` for links |

`tone` is the ground, so a `primary` button is light-on-dark and dark-on-light.
Geometry is identical across variants: 40px tall, pill radius, 8px icon gap.

```tsx
<Button as="a" href="#work" variant="secondary" tone="onDark">See our work</Button>
```

### `Card`
Image panel at one of the design's three aspect ratios.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `src` / `alt` | `string` | — | Required |
| `aspect` | `'verticalMedium' \| 'horizontalMedium' \| 'horizontalSmall'` | `'verticalMedium'` | 410×560 / 519×311 / 410×287 |
| `scrim` | `boolean` | `false` | Darken for legible overlay text |
| `crop` | `CardCrop` | — | Reproduce a Figma image-fill transform |
| `children` | `ReactNode` | — | Overlaid content |

`crop` exists because several cards are crops of **one** shared source image
(`/images/scene.png`, a 4×4 contact sheet). Reproducing the crop matches the
design and avoids shipping the same bytes repeatedly.

```tsx
<Card src="/images/scene.png" aspect="horizontalSmall" scrim
      crop={{ width: '588.23%', height: '469.02%', left: '-38.23%', top: '-21.43%' }}>
  <Typography variant="subHeaderSmall" as="h3">AI-native across the stack</Typography>
</Card>
```

### `Eyebrow`
Section label chip. `tone`: `'onLight'` (white chip) or `'onAccent'` (accent chip).

### `Tag`
Pill label for case-study rows. No props beyond `children`.

---

## Motion

All three respect `prefers-reduced-motion` and **degrade layout-intact** — the
animation stops, the layout does not change.

### `ParallaxSection`
Moves children against the scroll as the section crosses the viewport.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `speed` | `'subtle' \| 'base' \| 'strong'` | `'base'` | Fraction of own height travelled |
| `axis` | `'y' \| 'x'` | `'y'` | |

⚠ Speeds are authored, not extracted — Figma specifies no parallax.

### `Reveal`
Fade and rise on first scroll into view.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `index` | `number` | `0` | Staggers siblings by `motion.reveal.stagger` |

Each item's trigger is tied to its own position, not the group's.

### `Marquee`
Continuous horizontal scroll, used by the values band and the client logo strip.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `speed` | `'marquee' \| 'marqueeSlow'` | `'marquee'` | Duration token; `marqueeSlow` (60s) for the logo strip |
| `gapClassName` | `string` | `'gap-4xl'` | Item gap; logo strip uses `gap-logoGap` (93px) |

Renders children twice for a seamless loop; the duplicate is `aria-hidden`.
Because the track animates `0% → -50%`, items appear to enter continuously from
the right edge. Under reduced motion it becomes a horizontally scrollable row
**with the same flex layout** — dropping the flex there was a bug found in
review, see BUILD_LOG.

### `GlowText`
Words lit by a colour blob that follows the pointer. Figma
[node 3390:26748](https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3390-26748).

| Prop | Type | Notes |
|---|---|---|
| `solidSrc` / `strokeSrc` | `string` | Solid silhouette and stroke artwork |
| `aspect` | `number` | Artwork width / height |
| `widthRatio` / `leftRatio` | `number` | Words box as a fraction of the panel |
| `pointerX` / `pointerY` | `MotionValue<number>` | Pointer in panel pixels |
| `label` | `string` | Accessible text; the artwork is decorative |

Three layers, as the artboard builds them: an ambient blob, the words as a solid
`#071B27` silhouette that occludes it, and cream letter **strokes revealed by the
blob**. The strokes are not stroked text — they are artwork masked so the glow
shows through letter-shaped holes.

**The mask is static and the blob moves inside it.** The obvious alternative — a
moving radial gradient as the mask — repaints the mask every frame; this way the
only per-frame work is a composited translate. Geometry is measured with a
`ResizeObserver` rather than expressed in percentages, because the mask, the
solid layer and the blob all have to agree on one coordinate space.

### `ScrollTrack`
A row that starts flush with the page margin, runs off the right edge, and
slides left as the page scrolls past it.

| Prop | Default | Notes |
|---|---|---|
| `inset` | `spacing.4xl` (80px) | Page margin the row starts at |
| `gapClassName` | `'gap-lg'` | Gap between items |
| `range` | `[0.2, 0.8]` | Fraction of the row's viewport pass spent moving |

Figma draws these rows overflowing the 1440 frame — the four "What sets us
apart" cards sit at x=80/514/948/1382 with the last ending at 1792. That
overflow is the intent, so the row is full-bleed rather than clipped to the
content width.

**Travel is measured, not hard-coded:** `scrollWidth + inset - viewportWidth`.
That lands the last item exactly on the right margin at the end of the movement
at any viewport width, and clamps to zero when the row already fits, so a wide
display simply shows it static.

There is no scroll container and therefore no scrollbar — the wrapper is
`overflow-hidden` and the row moves on a transform. Under reduced motion the
items wrap instead, so everything stays reachable with neither a scrollbar nor
a transform.

```tsx
<ScrollTrack>
  {items.map((item) => <li key={item.id} className="w-[410px] shrink-0">…</li>)}
</ScrollTrack>
```

### `ScrollFillText`
Copy that fills from dim to bright one character at a time, driven by scroll
position rather than time.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `text` | `string` | — | Plain string; also becomes the `aria-label` |
| `progress` | `MotionValue<number>` | — | Normalised scene progress |
| `start` / `end` | `number` | from `tokens.motion.scene.fill` | Progress window for the sweep |

The design sets the whole paragraph to `#F6F6F6` at **16% opacity** (node
3390:26579), so the sweep raises each character's opacity to full rather than
shifting its colour. Each character owns a narrow window of the range; windows
overlap by `scene.fillFeather`, which is what makes the sweep read as a wipe
rather than a row of discrete flips. Words stay whole
(`inline-block` + `whitespace-nowrap`) so lines still break on word boundaries.
The characters are `aria-hidden` and the paragraph carries the full string as a
label, so assistive tech reads the sentence once, normally.

```tsx
<ScrollFillText text={COPY} progress={scrollYProgress} className="text-h2" />
```

---

## Icons

`src/components/icons/` — `ArrowRight` (node 3369:24491), `CaretDown` (node 3390:26616).

Both are **inlined SVG with `stroke="currentColor"`**, not `<img>` tags. The
assets Figma exports bake in a fixed stroke (`#040E19` on the arrow, `#F6F2EC`
on the caret), so a single exported file cannot serve both light and dark
grounds — the arrow rendered dark-on-dark and was invisible in the secondary
CTA. Inheriting `currentColor` means the icon always matches the label beside
it, in every variant, with no per-tone asset.

Path data is the exported asset's, unmodified; the 24×24 box and 2px
round-capped stroke are preserved exactly.

```tsx
<ArrowRight className="size-lg shrink-0" />
```

---

## Inventory

| File | Lines | Figma node |
|---|---|---|
| `Button.tsx` | ~95 | 3369:24489, 3369:24517 |
| `Card.tsx` | ~95 | 3373:25078, 3389:26338, 3373:25072 |
| `Container.tsx` | ~45 | 3386:25446 |
| `Eyebrow.tsx` | ~45 | 3383:25390 |
| `Marquee.tsx` | ~45 | 3390:26760 |
| `ParallaxSection.tsx` | ~70 | — (authored) |
| `Reveal.tsx` | ~45 | — (authored) |
| `Section.tsx` | ~70 | 2761:1214 |
| `Tag.tsx` | ~30 | 3383:25393 |
| `Typography.tsx` | ~100 | 3366:23051 |
| `icons/ArrowRight.tsx` | ~40 | 3369:24491 |
| `icons/CaretDown.tsx` | ~35 | 3390:26616 |

## Accordion

A disclosure list. Figma: the Industries FAQ, node 2894:14479.

```tsx
<Accordion items={[{ question: '…', answer: '…' }]} />
```

| prop | type | default | notes |
|---|---|---|---|
| `items` | `readonly AccordionItem[]` | — | `{ question, answer }` |
| `defaultOpen` | `number \| null` | `null` | index open on mount; the artboard shows all collapsed |
| `single` | `boolean` | `true` | one row open at a time |
| `className` | `string` | — | |

Each row is a `<button>` carrying `aria-expanded` / `aria-controls`, with the
panel as an `aria-labelledby` region, so the list is keyboard- and
screen-reader-navigable. The panel animates `height: auto`; under
`prefers-reduced-motion` it appears without animating.

Rules between rows use `border-accent-soft` (the active ramp at 40%), which is
what the Industries artboard specifies — not `border-divider`.

## icons/ChevronDown

The FAQ disclosure marker, node 2894:14484. Distinct from `CaretDown`: this is a
full-width chevron, the nav caret is a small tick. Inherits `currentColor`.

## icons/TypeBLogo

The wordmark, drawn with `fill="currentColor"` so one component serves both nav
tones and the footer. Needs `fillRule="evenodd"` — the mark is a single
boolean-operation path whose counters are subpaths.

## Field

One text input or textarea in the contact form. Figma: nodes 3617:9159 / 9161 /
9163 / 9165.

| prop | type | notes |
|---|---|---|
| `label` | `string` | accessible name **and** the placeholder drawn in the box |
| `name` `value` `onChange` `onBlur` | | controlled |
| `error` | `string` | when set, renders the error state |
| `type` | `'text' \| 'email'` | |
| `multiline` | `boolean` | textarea, 128px |
| `required` | `boolean` | |

The artboard shows no visible label, so the field name is the `placeholder` and
a matching `sr-only` `<label>` supplies the accessible name — a placeholder
alone leaves the input nameless and vanishes on input. Errors set
`aria-invalid`, wire `aria-describedby` to the message, and pair the colour with
an icon.

## Captcha

⚠ A client-side deterrent, **not** a security control. See the file header and
BUILD_LOG. Swap for Cloudflare Turnstile once there is a server to verify the
token; `onVerify` / `error` already match that shape.

## Toast

Transient confirmation. `role="status"` + `aria-live="polite"`, auto-dismiss
after `duration` (default 6s) plus a manual close.

Portals to `document.body` — it is `position: fixed`, and any transformed
ancestor (a `Reveal` at rest counts) would otherwise become its containing
block.

## Tabs

A filter row. Figma: the Careers "Open Roles" tabs, node 3638:9419.

| prop | type | notes |
|---|---|---|
| `items` | `readonly TabItem[]` | `{ id, label, variant? }` |
| `active` `onChange` | | controlled |
| `tone` | `'onDark' \| 'onLight'` | |
| `panelId` | `string` | the element `aria-controls` points at |

A real ARIA tablist: one tab stop for the row, arrow keys moving within it with
focus following, and `aria-selected` / `aria-controls` wired to the panel.
`variant: 'plain'` drops the pill for a "no filter" item like "View All", which
then shows its selected state as an underline.

## Accordion — `tone`

`tone="onDark"` switches the rule to `border-accent-soft-dark`. The light
value (accent.500 at 40%) is nearly invisible over ink.
