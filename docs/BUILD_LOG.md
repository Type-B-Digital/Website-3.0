# Build Log — Homepage v1

Design → code decisions, what was traced where, and everything that does not
match the Figma file exactly.

- **Figma:** [TypeB Creative Exploration](https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration) · file key `LASrWn0jXyj5nBaphi2jgI`
- **Token board:** node `3366:23051`
- **Homepage:** node `2761:1214` (1440 × 7832)
- **Mood shipped:** `deep` (turquoise accent)

---

## Stack

React 18.3 · TypeScript 5.5 · Vite 5.4 · Tailwind 3.4 · Framer Motion 11 ·
PostCSS + Autoprefixer. Node 24.20.0 LTS.

Node was not installed on this machine. It was added at `~/.local/lib/nodejs`
with symlinks in `~/.local/bin` (already on `PATH`), from the official
nodejs.org darwin-arm64 tarball, SHA256 verified against `SHASUMS256.txt`. No
admin password required, nothing written outside `$HOME`.

`tailwind.config.ts` lives in `src/styles/` rather than the project root, per
brief; `postcss.config.js` points at it explicitly.

---

## Figma → component mapping

| Homepage band | Figma node | Built as |
|---|---|---|
| Nav | 3390:26593 | `SiteHeader` |
| Hero | 3390:26582 | `Hero` |
| Client logos | 3390:26570 | `LogoStrip` |
| Statement + image stack | 3390:26579, 26679–26681 | `Manifesto` |
| Stats | 3390:26720 | `Stats` |
| "What sets us apart" + 4 cards | 3390:26429, 26539–26549 | `Pillars` |
| "Built for all stages" | 3390:26435 | `Stages` |
| "We solve real problems" + case list | 3390:26750, 26445–26519 | `Work` |
| "How we partner" (accent band) | 3390:26754, 26776 | `Partner` |
| Values marquee | 3390:26760 | `Values` |
| Closing CTA | 3390:26561, 26559 | `ClosingCta` |
| Footer | 3390:26636, 26640, 26763 | `SiteFooter` |

---

## Inconsistencies found in the Figma file

These are in the design, not the code. Each needs a design decision.

1. **`h2` and `h3` are identical.** Both 48px/600 (nodes 3370:24754, 3386:25398).
   The board labels the third sample `text-header-4`, suggesting a renumbering
   that was never finished. Kept as two tokens so a fix lands in one place.

2. **Tag label uses a different typeface.** The board sample (3383:25393) is
   **Inter Medium 12px**; every tag on the page (3390:26452 et al.) is **Reddit
   Sans Regular 12px**. The code follows the page.

3. **One stat is a different typeface.** "~100" and "25+" are Reddit Sans
   SemiBold; **"7" is DM Sans Bold** (node 3390:26728). Treated as a slip —
   all three render in Reddit Sans.

4. **Eyebrow line-height differs by instance.** 1.5 at node 3390:26432, 1.2 at
   node 3390:26438. Token uses **1.2**.

5. **Two near-miss greys.** `#F6F6F6` (page) vs `#F6F2EC` (board), and `#071B27`
   (CTA border) vs `#040E19` (board). Quarantined in `tokens.unmapped`.

6. **Radius scale is incomplete.** Board documents 4px and 8px; the page also
   uses 12px (tags) and 24px (every button).

7. **Off-scale spacing.** The 8-based scale has no 12px (tag padding), 68px
   ("How we partner" gap), 93px (logo strip gap), or 96px (footer columns).

---

## Deviations from the design

| # | Deviation | Why |
|---|---|---|
| 1 | Breakpoints invented (`sm`–`2xl`) | File has desktop artboards only. Everything below `xl` is interpretation. |
| 2 | Motion scale authored | File contains no duration/easing/parallax tokens. Verified against the full node listing **and** a render of the complete 1440×10570 board — content stops ~40% down, the rest is empty canvas. |
| 3 | 93px and 96px gaps → 80px (`4xl`) | Nearest token. Difference is ~15px on two rows. |
| 4 | 12px tag padding named `spacing.tag` | Kept components literal-free rather than using an arbitrary value; flagged as debt. |
| 5 | Stat "7" rendered in Reddit Sans | See inconsistency 3. |
| 6 | Tag rendered in Reddit Sans | See inconsistency 2. |
| 7 | `:focus-visible` ring added | Design specifies no focus state. Accessibility requirement, not a reproduction. Uses `accent.300`. |
| 8 | Reduced-motion handling added | Not in design. All three motion components degrade to static, layout intact. |
| 9 | Duplicate assets consolidated | Figma returned byte-identical files for four pillar cards, the CTA band, and one case thumbnail. Deduped to `scene.png` + `work-feature.png`; crops reproduced in CSS. Cut `public/` from 23 MB to 9 MB. |
| 10 | Pillar/CTA crops reproduced, not re-exported | Cards are crops of one contact-sheet image. Percentages are Figma's own image-fill transforms. **Final imagery should be exported pre-cropped** — the shared source is 5.3 MB. |

---

## Bugs found and fixed during visual verification

The build was screenshotted in headless Chrome and compared against the
artboard. Five defects that typecheck and build could not have caught:

1. **`Container` narrowed every section by 160px.** It capped at `maxWidth`
   (1280) *and* added 80px padding, giving a 1120px content width. Figma's 1280
   is the width *inside* the margins. Now caps at `frameWidth` (1440). This was
   surfaced by footer columns wrapping, but affected the whole page.

2. **Marquee's reduced-motion fallback dropped its layout.** It returned a plain
   `overflow-x-auto` div with no flex and no gap, so the values ran together as
   `WiseCuriousReliable…`. The accessible path is now the same layout, minus the
   animation.

3. **CTA band showed a 4×4 image grid.** `scene.png` is a contact sheet; the band
   used it with `object-cover` instead of Figma's crop. Crop applied.

4. **Client logos were normalised to one height**, distorting wordmark widths and
   wrapping BDO to a second row. Each logo now carries its artboard dimensions.

5. **Per-logo blend modes were missing**, leaving black boxes behind Medtronic
   and Equinox. Figma applies `lighten`/`screen` selectively; now matched.

### A verification note

An initial screenshot showed the hero as blank. That was **old headless
Chrome's IntersectionObserver**, not a bug — `--headless=new` renders it
correctly. Below-fold `Reveal` content still does not appear in headless
captures regardless of viewport height, so full-page verification screenshots
are taken with `--force-prefers-reduced-motion`, which bypasses `Reveal`
entirely and shows true layout.

---

## Open questions for design

1. **Breakpoints** — no mobile or tablet artboards exist. Are they coming, or
   should the current interpretation be signed off?
2. **Motion** — durations, easings and parallax speeds are all proposals. Worth
   a pass on the real thing before client handoff.
3. **The seven inconsistencies above** — particularly `h2`/`h3` and the two
   stray typefaces.
4. **The three off-board colors** — promote or retire?
5. **Imagery** — pillar cards and the CTA band are crops of one placeholder
   contact sheet. Real assets needed, exported pre-cropped.
6. **Nav dropdowns** — five nav items have carets but the artboard has no open
   state. Currently non-functional links.
7. **Pillar row** — the four cards overflow the frame in Figma. Implemented as a
   horizontal scroll row; a carousel with controls may be intended.

---

## Verification performed

- `tsc --noEmit` — clean
- `vite build` — clean, 279 KB JS (90 KB gzip), 18 KB CSS (4.8 KB gzip)
- Token resolution confirmed in built CSS (`text-h1{font-size:72px…}`,
  `.gap-4xl{gap:80px}`, `.rounded-pill{border-radius:24px}`)
- All three mood ramps present and distinct under `[data-mood]`
- Rendered and visually compared against the artboard, band by band
