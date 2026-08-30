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

## Routing

Homepage v1 has no router; `main.tsx` renders `HomePage` directly. Page two is
the moment to add one:

```bash
npm install react-router-dom
```

```tsx
// src/main.tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
  </Routes>
</BrowserRouter>
```

Deliberately deferred — routing choice belongs to whoever knows the hosting
target, and adding it now would have been a guess.

---

## Shared chrome

`SiteHeader` and `SiteFooter` currently live inside `src/pages/index.tsx`. They
are page-agnostic. **Before building page two**, lift them:

```
src/components/layout/SiteHeader.tsx
src/components/layout/SiteFooter.tsx
src/components/layout/PageShell.tsx   ← header + <main> + footer
```

Then each page becomes just its bands. This is the single highest-value
refactor available and it gets more expensive with every page added.

---

## Adding a component

Only when a pattern appears **twice**. One-offs belong in the page.

1. `src/components/<Name>.tsx`
2. Header comment with the Figma node
3. Props typed and exported
4. Export from `src/components/index.ts` (component *and* its types)
5. Document it in [COMPONENT_LIBRARY.md](./COMPONENT_LIBRARY.md)

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

Then document it in [DESIGN_TOKENS.md](./DESIGN_TOKENS.md).

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
