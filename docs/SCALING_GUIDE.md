# Scaling Guide — Adding the Remaining 19 Pages

The homepage exists to prove the system. This is how to use it.

---

## Adding a page

1. Create `src/pages/<name>.tsx`.
2. Open the Figma frame, copy its node link, and put it in the file header.
3. Compose from `@/components`. Do not reach for raw HTML with utility classes
   unless the pattern genuinely does not exist yet.
4. Add the route (see *Routing* below).

Skeleton:

```tsx
/**
 * Type B Digital — <Page Name>
 * Figma: "<frame name>" — node <id>
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=<id>
 */
import { Reveal, Section, Typography } from '@/components'

export function AboutPage() {
  return (
    <main>
      {/* Figma: node <id> */}
      <Section tone="dark" spacing="loose">
        <Reveal>
          <Typography variant="h1">Headline</Typography>
        </Reveal>
      </Section>
    </main>
  )
}

export default AboutPage
```

### The comment convention

Every section and every component gets `Figma: node <id>`. This is what makes a
20-page site maintainable — when a design changes, you find the code by node ID
instead of guessing from copy that may itself have changed.

---

## Routing — done

`react-router-dom`, wired in `src/main.tsx`:

```tsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/what-we-do" element={<WhatWeDoPage />} />
</Routes>
```

Add a route per page. Nav items carry their path in `SiteHeader`'s `NAV_LINKS`;
items without one render as inert text rather than a link that 404s, so add the
path at the same time as the route.

The page grain lives outside `<Routes>` so every page inherits it.

---

## Shared chrome — done

`SiteHeader`, `ClosingCta` and `SiteFooter` now live in
`src/components/layout/`, composed by `PageShell`:

```tsx
<PageShell headerTone="onLight">
  <Hero />
  <YourSections />
</PageShell>
```

A page is just its own bands. `PageShell` renders the closing CTA by default
(`closing={false}` opts out) and `headerTone` picks whether the nav links are
drawn for a dark or light hero — the homepage is dark, What We Do is light.

The Figma nodes for all three are identical across artboards, which is why they
are one component and not three copies.

---

## Adding a component

Only when a pattern appears **twice**. One-offs belong in the page.

1. `src/components/<Name>.tsx`
2. Header comment with the Figma node
3. Props typed and exported
4. Export from `src/components/index.ts` (component *and* its types)
5. Document it in [BRAND-GUIDELINES.md](../BRAND-GUIDELINES.md) § Component Inventory

**No raw values.** If you need one that has no token, that is a finding, not a
workaround — add it to `src/tokens/index.ts` with a comment saying it is
off-board, mirror it in `globals.css`, and log it in
[BUILD_LOG.md](./BUILD_LOG.md#deviations). `spacing.tag` is the worked example.

---

## Adding a token

Three files, in order — they are not auto-synced:

1. `src/tokens/index.ts` — the source of truth, with its Figma node in a comment
2. `src/styles/globals.css` — mirror as a CSS custom property
3. `src/styles/tailwind.config.ts` — usually automatic (it reads the token
   module), but check that the utility name is what you expect; camelCase keys
   are kebab-cased for class names

Then document it in [BRAND-GUIDELINES.md](../BRAND-GUIDELINES.md) § Design Tokens.

---

## Adding a mood

The three ramps are already extracted. To ship a second mood:

1. Confirm `moods.ember` / `moods.solar` match the intended Figma directions
2. Set `data-mood="ember"` on `<html>` (or toggle it at runtime)

That is the whole change. Components reference `accent-*`, which resolves
through a CSS variable — no component edits, no rebuild of the token layer.

To make it user-switchable, write `document.documentElement.dataset.mood` and
persist to `localStorage`.

---

## Assets

- Put files in `public/`, reference as `/images/…` or `/icons/…`
- **Check for duplicates before committing.** Figma re-exports the same bytes
  under different node IDs — that cost 14 MB on this page before deduping.
  `md5 -q public/images/*.png | sort | uniq -d` catches it.
- Figma CDN URLs expire in ~7 days. Never reference them from committed code.
- If several cards crop one source image, use `Card`'s `crop` prop rather than
  exporting the same image many times.

---

## Before opening a PR

```bash
npm run typecheck    # tsc --noEmit
npm run build        # tsc -b && vite build
npm run dev          # look at it
```

**Look at it.** Five of the defects on this page passed both typecheck and
build. A headless screenshot works well:

```bash
npx vite preview --port 4173 &
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars \
  --force-prefers-reduced-motion --virtual-time-budget=20000 \
  --window-size=1440,8400 --screenshot=out.png http://localhost:4173/
```

`--force-prefers-reduced-motion` is not optional: without it, `Reveal` content
below the fold captures at `opacity: 0` and the screenshot is useless.

### Verifying scroll-linked motion

Screenshots cannot verify anything driven by `useScroll` — parallax, the pinned
manifesto scene. Under headless with a virtual time budget, Framer's scroll
tracking never fires, no matter how you scroll the page from JavaScript. It is
not a bug in the component; it is the harness.

Drive real input over the DevTools protocol instead:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars \
  --remote-debugging-port=9222 --window-size=1440,900 \
  --user-data-dir=/tmp/chrome-profile http://localhost:5173/ &
node scripts/scroll-verify.mjs /tmp/out 1050 1400 1750 2100 2450
```

`scripts/scroll-verify.mjs` connects over WebSocket (Node 18+ has it globally,
no dependencies),
calls `Input.synthesizeScrollGesture` to scroll for real, then reads state with
`Runtime.evaluate` and captures with `Page.captureScreenshot`. Reading computed
styles at each stop — how many characters are white, each image's opacity — is
far more useful than eyeballing frames.

---

## Things that will bite

- **`Container` caps at 1440, not 1280.** The 80px margins are padding inside
  the frame. "Correcting" it to 1280 narrows every section by 160px.
- **Reduced-motion branches must preserve layout**, not just remove animation.
  That bug shipped once already.
- **Tailwind purges classes it cannot see statically.** Class names built at
  runtime get dropped. Keep them as literal strings (see how `CLIENT_LOGOS`
  stores `mix-blend-screen`).
- **`h2` and `h3` are the same size** in Figma. Use the semantically correct one;
  when design fixes it, the token is already separate.
- **The token layer has no automated Figma sync.** The file has no Figma
  Variables. Re-extraction is manual.
