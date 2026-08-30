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
Continuous horizontal scroll. Renders children twice for a seamless loop; the
duplicate is `aria-hidden`. Under reduced motion it becomes a horizontally
scrollable row **with the same flex layout** — dropping the flex there was a bug
found in review, see BUILD_LOG.

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
