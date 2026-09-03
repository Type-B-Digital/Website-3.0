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

1. ~~**`h2` and `h3` are identical.**~~ **RESOLVED 2026-08-30.** Both were
   48px/600. The board update set `h3` to 40px and renamed the sample
   `text-header-4` → `text-header-3`. Because they were separate tokens from the
   start, the fix was one line in `tokens/index.ts`.

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


---

## Update — 2026-08-30

Hero pass, against an updated token board.

### Added

- **Eight gradient tokens** (`tokens.gradients`, `b1`–`b8`), from Figma styles
  "Type B BG 1"–"Type B BG 8" (nodes 3430:26778 / 26784 / 26787 / 26792 / 26798
  / 26801 / 27208 / 27213). Every stop resolves to an existing ramp value, so
  they are composed from `palette` rather than restated as hex. Surfaced as
  `bg-gradient-b1` … `bg-gradient-b8` and `--gradient-b1` … `--gradient-b8`.
  Only `b1` is in use so far; the rest are extracted so the remaining bands and
  the other 19 pages can reach for them without another Figma round trip.
- **`ArrowRight` / `CaretDown`** icon components in `src/components/icons/`.

### Changed

- **Hero** is now full-bleed, full-viewport (`min-h-screen`), with `b1` as its
  background. `tone="dark"` still applies `bg-canvas` beneath, so the ink ground
  is the fallback. The next band arrives on normal scroll.
- **`h3`: 48px → 40px.** See resolved inconsistency 1.
- **Icons inherit `currentColor`.** Figma's exported SVGs bake in a fixed stroke
  (`#040E19` on the arrow, `#F6F2EC` on the caret). The arrow was therefore dark
  on dark grounds and effectively invisible in the secondary CTA — the defect
  that prompted this change. Inlining the same path data with
  `stroke="currentColor"` makes one component correct in every variant: light
  arrow on the secondary CTA, dark arrow on the primary. `public/icons/
  arrow-right.svg` and `caret-down.svg` are now unreferenced by the app.

### A measurement worth recording

The hero appeared to fall 88px short of the fold in headless screenshots. Two
wrong diagnoses before the right one:

1. Blamed `100svh` reserving mobile browser chrome. Switched to `100vh` — the
   shortfall was unchanged, so that was wrong.
2. Concluded it was a real layout bug, on the strength of a control page whose
   plain `min-height:100vh` box filled its viewport exactly.

Measuring the live DOM settled it: `window.innerHeight` was **813**, and the
hero's computed height was **813** at `top: 0`. The hero fills the viewport
exactly; the CSS was correct all along. Chrome's `--screenshot` had captured a
900px-tall image from an 813px layout viewport, so the extra 87px of the next
section in the image was below the real fold.

**Screenshot dimensions are not viewport dimensions.** When a headless capture
disagrees with expected layout, measure `window.innerHeight` against
`getBoundingClientRect()` before changing any CSS.


---

## Update — 2026-08-30 (second pass): logo strip + manifesto scene

### Client logo sizing — root cause

The logos rendered far smaller than the artboard. The frame sizes were right;
the **image fills** were not.

Each logo PNG is a large canvas with the wordmark occupying a small region, and
Figma applies a per-frame image-fill transform to crop and scale it (Deloitte,
for instance, is `w 118.95% / h 609.14% / left -11.76% / top -254.57%`). v1
ignored those and used `object-contain`, which fits the *whole file* into the
frame — so the mark shrank to whatever fraction of the canvas it occupied.

Fixed by reproducing each transform, the same technique already used for the
pillar cards. `CLIENT_LOGOS` now carries `box` (frame size) and `crop` (fill
transform) per logo. Two logos are already tight to their frames and need no
crop.

**Nothing is needed from design for this** — the sizes now match. If the logos
are ever re-exported, exporting each mark tightly cropped (no surrounding
canvas) would remove the need for the transforms and make the data smaller.

### Added

- **Logo strip is now a marquee** — full-bleed, travelling left continuously at
  `marqueeSlow` (60s), marks entering at the right edge. The artboard already
  overflows the frame (x=80 to x=1428); this makes the overflow literal.
- **`Marquee`** gained `speed` and `gapClassName`, and `items-center` on its
  rows — without it, flex stretch left the 47px marks (HP, PCL) misaligned
  against the 19px wordmarks.
- **`ScrollFillText`** — per-character scroll-driven colour fill.
- **`Manifesto` is now a scroll-pinned scene.** `scene.pinLength` viewport
  heights of scroll; a sticky panel holds the frame while progress drives the
  letter fill and the three images entering from the right. Both are scheduled
  to land together at `scene.fill.end` (0.9), with a short hold before release.
- **`tokens.motion.scene`** — the whole schedule in one place. Raising
  `pinLength` slows the scene without touching sub-timings.

### Fixed during this pass

- **A non-breaking space (`\xa0`) got into `ScrollFillText`'s word separator**,
  which would have stopped the paragraph wrapping entirely. Caught because a
  string replace failed to match; worth knowing that heredoc-authored source can
  pick these up invisibly.
- **Fill finished after the images.** Characters were scheduled across the full
  `[start, end]` range and then had `feather` added, so the last character
  completed at `end + feather`. The tail feather is now reserved, so the last
  character lands exactly on `end` — the same point the last image arrives.
- **Image stack was oversized**, filling the 600px grid column. Figma's frames
  are ~417x494 sitting right-of-centre (node 3390:26679 spans x=911..1328), so
  the stack is now capped at 420px and right-aligned.

### Verification: headless cannot drive scroll-linked motion

Every scroll-linked feature in this project — the parallax shipped in v1
included — had never actually been verified, and this pass showed why.

Under `--headless` with `--virtual-time-budget`, Framer Motion's `useScroll`
**never fires**. Confirmed it was not a component bug by probing both
target-based and page-wide `useScroll` in the same render: neither emitted a
single change event, whether scrolled by `window.scrollTo`, by assigning
`scrollTop`, or by an rAF loop stepping the position over 20s of virtual time.
Programmatic scroll is not enough.

The workaround is to drive **real input** over the DevTools protocol. Chrome is
launched with `--remote-debugging-port`, and a dependency-free Node script
(Node 24 has global `WebSocket` and `fetch`) calls
`Input.synthesizeScrollGesture`, then reads state via `Runtime.evaluate` and
captures with `Page.captureScreenshot`. With a real gesture, progress tracks
correctly and the whole scene can be measured frame by frame:

```
y=1050  p=0.099  filled=0/111    images=1,0,0
y=1400  p=0.330  filled=30/111   images=1,0,0
y=1750  p=0.561  filled=63/111   images=1,1,0
y=2250  p=0.892  filled=109/111  images=1,1,1
y=2320  p=0.938  filled=111/111  images=1,1,1
```

The driver is committed at `scripts/scroll-verify.mjs`; the method is written
up in SCALING_GUIDE. **Do not conclude a scroll animation is broken from a headless
screenshot** — that mistake was made twice in this session before measuring.


---

## Update — 2026-08-30 (third pass): introduction scene corrections

Against `introduction-component` (node 3431:27216), which did not exist in the
file when this section was first built.

### Logos now stay on screen through the scene

They were their own band above the pinned scene, so they scrolled away before
the copy began filling. The logo row now lives **inside** the sticky panel, at
the top, with the statement and stack below — matching the motion mockup, where
all three are on screen together. `LogoStrip` is gone as a page band; the row is
`ClientLogos`, used by the scene.

### Line breaks

The statement is **640px** wide on the artboard (node 3390:26579) at 48px. It
had been sitting in a ~600px grid column, which pushed it to six lines instead
of five and broke in the wrong places. The column is now pinned to 640px and the
breaks match:

```
We bring hope and expert
execution to bold innovators,
guiding ambitious visions
into brilliant outcomes with a
relentless drive.
```

The row is capped at 1240px — the artboard component width — so `justify-between`
reproduces the designed 178px gap (640 + 178 + 422).

### The missing third image

Only two images were visible. **Figma's fill export for `image-stack-3` returns
a solid black PNG** (1024x772, 3.2 KB). The node itself renders correctly — a
photo of a person in a sweater — so the fill export is wrong, not the design.

Fixed by using **node renders** for all three (`get_screenshot` per node) rather
than fill exports. Two consequences worth knowing:

- The renders have each image's rotation baked in (-2.09deg and 2.66deg), which
  is why their boxes are 417x494 and 421.8x498 around a 400x480 image. No CSS
  rotation is applied.
- They render at 1x. On a retina display they will be slightly soft. If that
  matters, re-export at 2x from Figma and drop them in — the geometry does not
  change.

Geometry now matches the group exactly: a 421.806 x 498.014 box with the three
images at their artboard offsets (3.13/1.92, 11.74/9.05, 0/0), stacked and
near-centred on one another rather than fanned out.

### Fill is opacity, not colour

The unfilled statement is `#F6F6F6` at **16% opacity** in Figma, not a grey.
`ScrollFillText` now interpolates opacity (`opacity.dim` -> `opacity.full`) and
leaves the colour alone. The previous guess (`neutral.800`) was close visually
but wrong, and would have drifted on any other ground.

### Verified

`scripts/scroll-verify.mjs` gained a `logosVisible` check and now targets the
stack via `[data-scene="manifesto-stack"]` (it had been matching the logo images
too, and counting fill by colour, which no longer changes):

```
y=1000  filled 6/111    images 1.00,0.00,0.00  logosVisible true
y=1400  filled 44/111   images 1.00,1.00,0.00  logosVisible true
y=1800  filled 81/111   images 1.00,1.00,1.00  logosVisible true
y=2200  filled 111/111  images 1.00,1.00,1.00  logosVisible true
```

Reduced-motion fallback checked separately: no pinned scene, all three images,
statement and logo row present.


---

## Update — 2026-08-30 (fourth pass): Bold. Brilliant. Beautiful.

The page's centrepiece. Figma: `bbb-glowing-copy-component` (node 3390:26748)
plus the stats frame (node 3390:26720).

### How the effect is built

Three layers, following the artboard exactly:

1. **Ambient blob** (node 3390:26682) — three radial gradients in
   `orange.500 / amber.500 / turquoise.500`, blurred by 120px, `screen` blended.
   Figma uses `difference`; on a near-black ground the two read the same, and
   `screen` is far better behaved over the colour ramps. Built from gradients
   rather than the exported bitmap so it stays crisp and stays on tokens.
2. **Solid words** (node 3390:26719) — `#071B27` on the `#040E19` ground, a
   shade off it, sitting *over* the ambient blob and occluding it. That
   occlusion is what gives the letterforms their silhouette.
3. **Lit strokes** (node 3390:26687) — cream letter strokes at 40% opacity,
   revealed by the blob.

Layer 3 is the interesting one. It is not stroked text that lights up: it is
stroke artwork masked so the glow shows through letter-shaped holes. **The mask
is static and the blob moves inside it** — the obvious alternative, a moving
radial gradient as the mask, repaints the mask on every pointer move. This way
the per-frame cost is one composited translate.

The pointer is spring-smoothed so the blob trails the cursor with weight, and
rests over the words before the pointer ever arrives — which is also the touch
and no-pointer behaviour.

### Two export problems, both fixed

- **The stroke SVG exports rotated 90°** (624x1008 for landscape artwork),
  because Figma has it inside a `-rotate-90` wrapper. The rotation is now baked
  into the file so the CSS does not have to compensate.
- **The solid SVG exports 50 paths, not 25.** Twenty-five are the `#071B27`
  letterforms; the other twenty-five are a shading overlay with
  `mix-blend-mode: multiply` at 40%. In Figma that multiplies against the dark
  ground. Inside an `<img>`, the SVG canvas is transparent, so multiply has
  nothing to darken against and the overlay renders as a *light wash* — the
  words came out pale grey instead of near-black. The overlay is stripped; the
  original is kept at `scratchpad/bbb-solid-original.svg`. If the shading turns
  out to matter, the fix is to inline the SVG so it composites against the page
  rather than its own transparent canvas.

### The crossfade

Rather than cutting from this near-black band to the white section below, the
ground crossfades to that surface over the last third of the scene and the
content fades with it. Measured:

```
y=3300  ground rgb(4, 14, 25)      content opacity 1
y=3700  ground rgb(4, 14, 25)      content opacity 1
y=4100  ground rgb(196, 196, 197)  content opacity 0.41
y=4300  ground rgb(255, 255, 255)  content opacity 0
```

The scene releases just as the next (white) section arrives, so there is no
seam and no dead white space.

### Stats

Moved into this scene and re-laid-out: right-aligned vertical stack against the
80px margin, vertically centred. Verified at exactly 80px from the right edge.
They previously sat in a three-column grid in their own band.

### Verification

`scripts/scroll-verify.mjs` now accepts pointer stops (`3600@950,380`) — a
screenshot without a real `mouseMoved` event only ever shows the blob at rest.
It also reports `glowGround` so the crossfade can be measured rather than eyeballed.


---

## Update — 2026-08-31: introduction to highlight transition

The seam between the introduction scene and the highlight section was visible as
a hard horizontal line. Two separate causes, both fixed.

### The line itself

The highlight section's glow is clipped by the section's own box. While the
section is still climbing into view, that clip is a hard edge straight across
the viewport — the band above it is plain canvas, and the glow simply starts.

Fixed by fading the whole scene in against its ENTRY progress. Note that
`scrollYProgress` with `offset: ['start start', 'end end']` is clamped at 0
until the panel pins, so it cannot describe the section rising into view at all;
this needs a second tracker with `offset: ['start end', 'start start']`.

The fade is deliberately late and short — `[0.88, 1]`. While the section climbs
it is fully hidden and therefore indistinguishable from the canvas above it;
it arrives over the last stretch. Widening that range brings the edge back: at
`[0.55, 0.98]` the glow was already at 65% opacity while the boundary was still
mid-viewport, which is exactly the artefact being removed.

### Handing off the scroll

`src/lib/useAutoAdvance.ts`. Once the introduction scene has finished playing,
the next downward scroll goes to the top of the highlight section rather than
leaving the visitor parked where both sections are half visible.

It takes over one gesture, so it is scoped narrowly:

- arms only once the scene is essentially complete (`armAt`, default 0.995)
- ignores the gesture that armed it — a `settleDelay` means a fresh scroll is
  required, not the tail of the one in progress
- fires once, then disarms; scrolling back above `disarmBelow` re-arms it
- never triggers on an upward scroll
- disabled entirely under reduced motion (where nothing is pinned anyway)

Verified with real input gestures:

```
scroll +120 -> 2220     (introduction still playing)
scroll +120 -> 2340     (scene complete, armed)
scroll +120 -> 3028     <- advanced to the highlight section
scroll +120 -> 3148     (normal scrolling resumes, no further hijack)
```

and in reverse, that it does not fight the visitor:

```
up   -> 2778, 2528, 2278, 2028   (free)
down -> 2228, 2428, 3028         (re-armed, advanced once more)
```

### The move is hand-animated, not `behavior: 'smooth'`

The first version used the browser's smooth scroll, which reads as a jump cut:
it exposes no duration and its default is far too quick to move a whole
viewport. The move is now animated with Framer's `animate`, taking duration from
`motion.autoAdvance.duration` (1.4s) and easing from `motion.easing.scroll`.

`easing.scroll` is a new token — a classic `[0.42, 0, 0.58, 1]` ease-in-out. The
existing `easing.inOut` (`[0.65, 0, 0.35, 1]`) accelerates hard through the
middle, which is fine for a single element but lurches when the thing moving is
the entire page.

Two things that matter in the implementation:

- **`scroll-behavior: smooth` is set globally in `globals.css`**, so every
  per-frame `scrollTo` would start its own animation and fight the rAF loop. It
  is suspended on the root element for the duration and restored afterwards
  (verified restored, including when the move is cancelled).
- **The move is cancellable.** An upward wheel, a touch, or Arrow-Up / PageUp /
  Home / Escape stops it immediately, so the page can always be overruled.

Measured curve — a symmetric S, 50% at the midpoint, settling gently:

```
   0ms   0%      600ms  45%     1100ms  93%
 150ms   5%      650ms  51%     1200ms  97%
 300ms  14%      800ms  69%     1300ms 100%
 450ms  28%      950ms  84%
```

Cancellation check: interrupted 450ms in at scrollY 2611, an upward wheel left
the visitor at 2491 rather than the 3028 target.


---

## Update — 2026-08-31: "What sets us apart" card row

The row was a horizontally scrollable `overflow-x-auto` list inside a
`Container`, which produced three problems at once: the cards were clipped at
the content width on both sides, they needed a scrollbar to reach, and the row
did not begin on the page margin.

Rebuilt on a new `ScrollTrack` component:

- **Full-bleed.** `Section` is now `bare`, so the row escapes the content width;
  the header keeps its own `Container` and normal margins. The row begins at the
  80px margin and runs off the right edge, which is what the artboard shows
  (cards at x=80/514/948/1382, the last ending at 1792 in a 1440 frame).
- **Driven by vertical scroll.** The row slides left as the section passes
  through the viewport, over the middle 60% of that pass.
- **No scrollbars.** There is no scroll container at all — the wrapper is
  `overflow-hidden` and the row moves on a transform.

Travel is measured rather than hard-coded: `scrollWidth + inset - viewportWidth`,
which lands the last card exactly on the right margin at any viewport width, and
clamps to zero when the row already fits.

Verified at 1440px:

```
at rest      firstLeft  80   lastRight 1792   (starts on the margin, overflows right)
fully moved  firstLeft -352  lastRight 1360   (last card on the 80px right margin)
travel       432px = 1792 - 1360
scrollers    []                               (no scrollable element in the section)
docScrollW   1440 = innerWidth                (no horizontal page overflow)
```

Under reduced motion the items wrap into rows instead of sliding, so all four
cards stay reachable without a scrollbar and without a transform.

**Not pinned.** The row drifts as the section passes rather than holding the page
still. That reads as "swipes as you scroll" and does not take over the scroll —
but it does mean the start and end states are only briefly at rest. If the full
travel should dwell, this wants the same sticky treatment as the introduction and
highlight scenes; it is a contained change to `ScrollTrack`.


---

## Update — 2026-08-31: "We solve real problems" hover interaction

Hovering a case study now shows its thumbnail large in the left column and puts
a heavy scrim plus a "Learn more" CTA over the row's own thumbnail.

The hover state was already drawn on the artboard, which gave exact values
rather than guesses: row 1's thumbnail carries `rgba(4, 14, 25, 0.8)` — neutral
900 at 80%, added as `colors.background.scrimStrong` — and the CTA is node
3390:26633, a tertiary button centred on the thumbnail.

### No preview at rest

The left column is empty below the "View our work" CTA until a row is hovered.
The artboard *does* include a `card-horizontal-medium` there (node 3390:26538),
and the previous build showed it permanently; the prototype makes clear it only
appears on hover. The box stays in the layout at 519x311 so nothing reflows when
an image arrives — only the image fades.

### Focus does what hover does

`onFocus`/`onBlur` set the same state as `onMouseEnter`/`onMouseLeave`, so the
preview works for anyone tabbing the list. The "Learn more" CTA renders as
`as="span"` — it sits inside the row's own anchor, and a nested link would be
invalid.

Leaving a row only clears the preview if the row leaving is the one that set it.
Without that check, moving between adjacent rows blanks the preview on the way
past.

### Six thumbnails, and another round of export failures

Every row was sharing one image, which made the hover preview identical whichever
row you were on. Getting the six real ones took three attempts:

1. **Fill exports.** Three of six (rows 2, 3, 5) came back as **single-colour
   images** — the same failure as `image-stack-3` earlier. Those rows rendered
   with no visible thumbnail at all against the white ground.
2. **Node renders** (`get_screenshot`) return the real artwork, but only at the
   node's natural 201x120. Figma will not upscale a render, and 201px is far too
   small for the 519px preview.
3. **`download_assets` with `defaultScale: 4`** renders the node *as composed* at
   804x480. That is the one to reach for when a fill export is degenerate and the
   node is small.

Row 4 needed the same treatment for a different reason: its thumbnail is a
composite (a gradient behind a masked photo, node 3390:26499), not a single
fill. Using the underlying photo directly lost the dark backing and the row read
as a pale smear against the white page.

**Rule of thumb for this file: if a fill export looks degenerate — one colour,
solid black, a few KB for a large canvas — go to `download_assets` at scale 4
rather than trusting the fill.**

`public/images/work-feature.png` is deleted; it was only there for the
always-on left image.


---

## Update — 2026-08-31 (second pass): transitions and the offerings tabs

### The auto-scroll hand-off is removed

Reported symptom: scrolling from the introduction to the highlight section
"jumps up and down before settling". That is the scroll hand-off, not a fade — a
fade cannot move scroll position.

Cause: the hand-off animated `window.scrollTo` frame by frame while the
visitor's trackpad momentum was still being applied by the browser. The two
interleave, and the result oscillates. Longer duration and gentler easing made
it worse, not better, because there was more time to fight over.

`useAutoAdvance` is deleted rather than tuned. Programmatic scroll cannot be
made to cooperate with in-flight momentum; the honest fix is not to take the
gesture. Verified monotonic afterwards — 120 samples through the boundary,
**zero backward jumps**.

**The arrival fade is kept.** It was doing the other half of the job: while the
highlight section climbs, its content is hidden, so the section is
indistinguishable from the canvas band above and the clipped-glow edge never
shows. Removing the hand-off does not bring the seam back.

### Light-to-turquoise crossfade into "How we partner"

The white "We solve real problems" band met the turquoise band on a hard line.
Now the offerings scene is pinned and its ground crossfades `surface` -> `accent`.

The important detail — and the mistake worth recording — is **which progress the
fade is measured against.** The first attempt used entry progress, so the ground
was already mid-turquoise while the section was still climbing, which drew a
crisp line at the boundary: exactly the artefact being removed. Measuring
against the PINNED progress instead keeps the ground pure `surface` for the whole
climb, so the boundary is invisible, and moves the colour change to after the
panel fills the viewport, where there is no edge to give it away.

Measured:

```
climbing   ground rgb(255,255,255)   content 0     (boundary invisible)
climbing   ground rgb(255,255,255)   content 0
pinned     ground rgb(200,206,208)   content 0.05  (fade under way)
pinned     ground rgb(19,80,93)      content 1     accent-600 reached
```

Content fades in behind the ground rather than with it — cream type over a
half-transitioned ground has almost no contrast.

### Advisory / Product / Teams as scroll-driven tabs

Scroll now steps through the three offerings, each showing its copy on the left
and its image on the right, with Advisory selected by default. Selection occupies
the progress left after the ground has settled (`selectStart`).

Clicking an offering **scrolls to the middle of its segment** rather than only
setting state. That keeps scroll the single source of truth: with a plain state
set, a click followed by any nudge of the wheel would immediately revert, which
reads as broken. Verified:

```
start                     Advisory @8526
after clicking Teams      Teams    @9124
after clicking Product    Product  @8844
after clicking Advisory   Advisory @8563
```

### The image was another degenerate export

The right-hand image read as "missing" because `partner-visual.png` was a
**single-colour** PNG — the fill-export failure documented above, for the fourth
time in this file. Replaced with `download_assets` at scale 4 (node 3390:26553,
1208x1208) as `images/partner/offering-1.png`.

### ⚠ Per-offering content is still needed

The artboard provides copy and imagery for only ONE selected state (Product is
the one drawn), so all three offerings currently share that placeholder lorem
and that image. **The selection mechanism is complete and the layout is right,
but switching offerings currently changes only which word is highlighted.**
Filling in real content is one line per offering in `OFFERINGS` and nothing else.


---

## Update — 2026-08-31 (third pass): hero sweep, counters, and section polish

Nine changes. The notable ones:

### Hero gradient sweeps on the first gesture

The first downward gesture plays an 800ms slide instead of moving the page; the
next scrolls normally. The track is a new `gradients.b1Sweep` — b1 followed by
its mirror across double width — so the whole effect is one transform on one
strip rather than a crossfade between two gradients. Showing the first half is
the start state, translating -50% is the end state.

This swallows one gesture, so it is bounded hard: only at the very top of the
page, only downward, only once per load, and only for the length of the sweep.
Worth distinguishing from the section hand-off removed earlier today: that
animated `scrollY` *against* the browser's momentum, which oscillated. This only
*prevents* default. Nothing fights over the scroll position.

Verified: `scrollY` 0 -> gesture -> still 0 with the track at -1440px -> gesture
-> 400. Edge colours flip from `(20,43,53)`/`(250,178,133)` to
`(250,178,147)`/`(29,57,68)`.

### Light-to-turquoise, revisited

Previous pass faded the ground once the offerings scene had pinned, which left a
stretch of plain white before the turquoise arrived. The blend now happens in the
section ABOVE, as a gradient bridge across the last half-viewport of the light
band, so the colour has already changed before the boundary is anywhere near the
screen. The offerings ground is simply solid accent, and `offeringScene` lost its
`groundFade` and `contentFade` entirely.

### A latent ParallaxSection bug, found by the CTA background

The new CTA artwork rendered at 0x0. Cause: `ParallaxSection` composed its class
list as `cn('relative', className)`, so a caller passing `absolute inset-0` got
**both**. Tailwind emits `.relative` after `.absolute` in the stylesheet, so
`relative` won, the wrapper fell back into normal flow, and its height collapsed
to zero — taking any `size-full` child with it.

It only surfaced now because previous callers passed children with explicit
pixel or percentage sizes, which do not depend on the parent's box. The wrapper
now applies `relative` only when the caller has not supplied its own
positioning, and the motion layer fills its parent. Both prior callers
re-verified.

### Everything else

- Logo row inset 80px -> 40px (measured at exactly 40 to the row's top; the
  short Deloitte mark sits 14px lower, centred in the 47px row).
- Introduction copy at 120% line height.
- Stat numbers count from zero, gated on the scene's own reveal rather than
  intersection — inside a pinned scene they are technically on screen from the
  moment it starts climbing, behind opacity 0, so a plain in-view trigger spends
  the whole count behind a fade.
- "Bold. Brilliant. Beautiful." outline opacity 0.4 -> 0.6.
- Offerings header top-aligned on a 120px inset (new `spacing.5xl`), and the
  values marquee moved inside that scene, riding its arc (node 3390:26557). The
  standalone values band is gone.
- Closing CTA artwork replaced with the 1440x720 image Eduardo supplied, which
  needs no crop transform.
- Footer glow added (node 3483:27261). Built from CSS gradients rather than the
  exported SVG: that file is a 1551x1194 canvas whose gaussian falloff is clipped
  as soon as it is scaled into a differently-proportioned box, which left visible
  diamond edges. Same colours, `mix-blend-hard-light`, no edge to clip.
- `arrow-right.svg` and `caret-down.svg` deleted — superseded by the inline
  `currentColor` icon components.


---

## Update — 2026-08-31 (fourth pass): five corrections

### The white-to-turquoise bridge was numerically fine and still looked broken

Scanning the pixel column across the boundary showed no discontinuity at all —
the gradient reached `rgb(19,80,93)` exactly, and the section below was the same
value. The problem was the **rate**: a straight `transparent -> accent` ramp
changes at a constant ~0.6/px right up to the boundary and then stops dead, and
the eye reads that discontinuity in the derivative as an edge. A Mach band.

The bridge is now `.section-bridge` in globals.css with eased stops, so the
change decelerates into the final colour. Measured rate approaching the boundary:

```
before   6  6  6  6  6  6  6 -> 0     (constant, then a cliff)
after   11 10  9  8  7  5  3 -> 0     (decelerating)
```

It also uses `color-mix` against `--color-accent-600` rather than a baked hex,
so it follows a mood swap instead of freezing the turquoise in place.

### The gap under the values marquee was the parallax running out of image

Layout was innocent: the offerings scene ends at 10021 and the CTA section
starts at 10021, gap of exactly 0. The dark band was the closing CTA's own ground
showing through — `ParallaxSection` at `base` speed travels ±9% of the element
height, and the image was only `scale-110`, so at the extremes of the travel it
no longer covered and the section's dark background appeared as a strip along one
edge. Now `scale-125`, which covers ±12.5%.

**Rule: a full-bleed parallax image must be scaled by at least
`1 + 2 × parallax[speed]`, or it will uncover at the ends of its travel.**

### Also

- Values marquee now `accent-400`, the same colour as an unselected offering, so
  the band reads as one family.
- Closing CTA at `min-h-screen` (verified 757 = viewport height) instead of a
  fixed 720px.
- Footer glow reshaped: wide and horizontal, sitting on the bottom edge and
  translated down by half its height so the lower half falls below the fold,
  rather than a rotated blob centred in the component.


---

## Update — 2026-08-31 (fifth pass): the white-to-turquoise change, done properly

Two previous attempts were both wrong, in different ways, and it is worth being
precise about why.

**Attempt one** faded the offerings scene's own ground once it had pinned. That
left a long stretch of flat white first — the panel has to climb a full viewport
before it pins, and it was white the whole way.

**Attempt two** put an eased vertical gradient at the bottom of the light band.
That removed the white stretch and had no measurable discontinuity, but it was
still the wrong *kind* of transition: a gradient necessarily puts white at the
top of the screen and turquoise at the bottom **at the same time**, so it reads
as a band travelling through the page rather than the page changing colour.

The dark-to-light handover above works because a pinned panel's own
`background-color` animates: the whole screen changes at once, and there is
never a frame with both colours on it. That is the behaviour to mirror, and a
gradient cannot produce it.

### What it is now

`WorkToOfferings` wraps the light band and the offerings scene and owns **one
animated background** between them. Both sections render with `tone="none"` — a
new Section tone meaning "an ancestor paints the ground" — so there is a single
colour behind both, crossfading as the boundary approaches.

Timed against a zero-height marker at the boundary, tracked `'start end'` ->
`'start start'`, which is exactly the viewport-height of scroll before the panel
pins.

Verified by sampling a column down the whole viewport at each stage. Spread is
the largest channel difference between top and bottom of the screen:

```
entry 0.3   (255,255,255) .. (255,255,255)   spread 0
entry 0.5   (217,221,222) .. (217,221,222)   spread 0
entry 0.7   (158,169,173) .. (158,169,173)   spread 0
entry 0.9   ( 51, 92,103) .. ( 51, 92,103)   spread 0
```

Spread 0 at every stage: the screen is one flat colour throughout, which is the
whole point and the thing the gradient could never do.

The offerings content fades in behind the ground rather than with it — its type
is cream, and over a half-transitioned ground it has almost no contrast.


---

## Update — 2026-08-31 (sixth pass): the hero sweep rotates, it does not slide

The brief: the warm corner should travel along the bottom from right to left,
and the dark corner along the top from left to right.

The first build slid a double-width strip. That is the wrong mechanism, and no
choice of angle fixes it — translating a gradient moves its bands but cannot
change which diagonal they run along. Measured across candidate angles:

```
225deg  start  TL teal  TR warm  BL DARK  BR warm   dark bottom-left, wanted top-left
225deg  end    TL warm  TR DARK  BL warm  BR teal   correct
135deg  start  TL DARK  TR teal  BL teal  BR warm   correct
135deg  end    TL warm  TR teal  BL warm  BR DARK   dark bottom-right, wanted top-right
```

Whichever angle is chosen, one end state comes out mirrored, because the start
and end the brief describes have their bands on *different* diagonals.

So the sweep now animates the gradient's ANGLE, 135deg to 225deg, over the same
800ms. It passes through 180deg — dark across the top, warm across the bottom —
which is the exact midpoint of the movement described. Verified at both ends:

```
start  TL(4,14,25) dark      BR(250,178,129) warm
end    TR(4,14,25) dark      BL(250,178,129) warm
```

`gradients.b1Sweep` (the doubled strip) is gone, replaced by `gradients.b1Stops`
— b1's stop list without a direction, so the angle can be driven separately.

Trade-off worth noting: rebuilding the gradient string each frame repaints,
where a transform would not. Acceptable for a single 800ms one-shot, and there
is no way to rotate a gradient's direction on the compositor.


---

## Update — 2026-09-02: motion feel, page grain, and eight fixes

### The third intro image had painted corners, not transparent ones

Its dark wedges were opaque `#040E19` baked into the asset: the node render
composited the page background into the corners left over by the card's 2.66deg
rotation. `download_assets` at scale 3 has the same problem — the export is
flattened, not transparent.

Fixed by masking the asset to the card's actual quadrilateral: a 400x480 rect
rotated 2.66deg inside the 422x498 box, computed rather than colour-keyed, since
the photograph contains plenty of pixels as dark as the background.

### The intro-to-highlight boundary snaps now

`scroll-snap-type: y proximity` on the root with `snap-start` on the highlight
scene. `proximity`, not `mandatory` — the pinned scenes are several viewports
long and have to be scrollable through, so only elements that opt in should pull.

This is the third attempt at this boundary and the first that uses the browser's
own snapping. The JS hand-off tried twice before animated `scrollY` against
trackpad momentum and oscillated; native snapping cooperates with momentum by
design. Measured: rest positions 2650 -> **3028** (the scene top) -> 3178, so it
lands on the boundary once and then scrolls on without interfering.

### Scroll motion is slower, lagged, and feathered

- `duration.reveal` 1.2s on a symmetric ease, up from 0.6s on ease-out.
- `reveal.lag` 0.12s — a flat delay so a reveal is not welded to the scroll
  position that triggered it.
- `reveal.feather` 10px — reveals resolve from a blur, so they arrive
  soft-edged and sharpen instead of only changing opacity.
- `reveal.stagger` 0.08 -> 0.14.
- **`useLaggedProgress`**, applied to every scroll-linked scene (introduction,
  highlight, offerings, the shared ground, the card track). Raw scroll progress
  is a step function that jumps by whatever the wheel reported; running it
  through a spring first is what makes a scene trail the scroll and settle
  rather than track it rigidly. Constants live in `motion.scrollLag`.

### Page grain — and why it is not at the specified 24%

Spec: X 0.5 / Y 0.5, 80% density, `#040E19` at 24%. Implemented as a baked 256px
tile (`feTurbulence` at this frequency is expensive to rasterise over a full page
and must be redone on resize; a tile costs one decode).

**The literal 24% does not work, and the reason is arithmetic.** The grain is a
single dark colour, so composited normally its opacity is a flat tint as much as
a texture: 0.8 density x 0.24 opacity = 0.19, and white measured 255 -> **207**.
Every light section turned grey.

`mix-blend-mode: soft-light` preserves the tone but then the grain is invisible
on white — measured zero variance. So blending is not the escape either. With a
dark grain, keeping white white means carrying less of it.

Shipped at **0.08**: tone shift 16/255 with grain variance 19, so it reads as
texture and the light sections still read as light. `grain.specifiedOpacity`
keeps 0.24 on record and the token comment explains the trade; it is one value
to change back.

### Also

- Hero sweep 0.8s -> **2.4s** (3x), measured at 2402ms.
- Amber glow behind the "Built for all stages" cards (Figma node 3601:536),
  from gradients rather than the exported SVG — same clipping reason as the
  footer and BBB glows.
- Values marquee: 24px between words and divider dots, 16px below. Verified
  `padding-left 24px / column-gap 24px / padding-bottom 16px`.


---

## Update — 2026-09-02 (second pass): reveals, spacing, eyebrow colour

### Eyebrow chips on light sections were the wrong colour

They were `bg-surface` — white, on a white section, so effectively invisible.
The artboard uses **`#F7DDC1`** (amber.100) with ink text: nodes 3390:26431
("We do things different") and 3390:26437 ("Who we serve"). The accent-band chip
was already right at `#13505D` (node 3390:26567).

Added as `colors.background.chipLight`. Verified computed:
`rgb(247,221,193)` on both light chips, `rgb(19,80,93)` on the accent one.

**Separate discrepancy, not changed:** the artboard sets eyebrow text at Regular
weight, while `typography.eyebrow` is SemiBold — that came from the token
board's own sample, which disagrees with every in-page instance. Left on the
token since only the background was in scope; worth a decision.

### Intro images now lag individually

The scene's progress was already smoothed, which made the whole frame trail the
scroll — but the three cards still moved in lockstep. Each now has its own
spring on top of that, with damping rising slightly by index so later cards
settle a touch softer. Measured `translateX`:

```
progress 0.15   [491, 680, 717]   all still out to the right
progress 0.45   [  4, 436, 717]   first settled, second entering
progress 0.75   [  0,   6, 414]   third entering
progress 1.00   [  0,   0,   9]   last few px still easing in
```

That trailing 9px is the point: the value arrives after the scroll does.

### Feathered reveals extended

Added to the four "What sets us apart" cards and to the "We solve real problems"
list rows, both staggered. The "Who we serve" copy already had one. The card row
lives inside `ScrollTrack`, so each card is now both translated by the track and
revealed on its own trigger; the two compose without interfering because the
track moves the row and the reveal moves the item.

### 160px between the two light sections

Both were `spacing="loose"`, which stacks 160 + 160 = 320. Trimmed to 80 each,
verified `pb 80 + pt 80 = 160px`. The artboard has the cards ending at y=3416
and the next frame starting at y=3569.


---

## Update — 2026-09-02 (third pass): "How we partner" vertical rhythm

- Eyebrow inset 120px -> **80px** (verified computed at 80).
- The row (copy, offerings, image) is now centred on the panel rather than on
  the space between the header and the marquee.

The second one is worth recording. All three blocks previously shared a
`justify-between` column with the row taking `flex-1`, which centres the row in
whatever space is **left over** between header and marquee. Because the header
is taller than the marquee, that midpoint sits below the section's own middle —
which is exactly the "a little low" that was reported.

Header and marquee are now pinned to the panel's edges and the row centres on
the panel itself. Verified: panel centre 379, row centre 378.


---

## Update — 2026-09-02 (fourth pass): What We Do, and the shared-chrome refactor

Figma: "2. What We Do" — node 2894:10946.

### The refactor the scaling guide had been recommending

`SiteHeader`, `ClosingCta` and `SiteFooter` are now in
`src/components/layout/`, composed by `PageShell`. The Figma nodes for all three
are byte-identical across both artboards (3390:26593 / 3604:1352, 3390:26561 /
3604:1182, 3390:26636 / 3604:1309), so "the sections that repeat" is one
component each rather than three copies to keep in sync. `react-router-dom` is
wired with two routes.

Page grain and reveal timing needed nothing: the grain lives outside `<Routes>`
in `main.tsx` and `Reveal` is a shared component, so the new page inherited both.

### The header needed a tone, and the instruction conflicted with the artboard

The brief said the nav repeats "in navigation-dark mode". Built that way, it was
illegible: this hero is a light-to-orange gradient and cream links vanish into
it. Checking the artboard, node 3604:1374 draws them at **`#040E19`** — the
light variant.

`SiteHeader` now takes `tone`. Verified per page: `rgb(4,14,25)` on What We Do,
`rgb(246,242,236)` still on the homepage. The CTA pill is unchanged between the
two — cream with ink text reads on both grounds, and the artboard reuses the
same instance.

### Hero

Fixed 720px rather than the homepage's viewport. The gradient turned out to be
**b2's own ramp at a different angle** — 116.67deg here against 230.49deg on the
token board — so it reuses a new `gradients.b2Stops` rather than a fourth
hard-coded gradient. The three circles are r=320 at cx 240 / 720 / 1200 in a
1440x640 box, so the middle is centred and all three overlap (node 3604:1005).
Copy is vertically centred: the artboard puts it at y=264, height 192, in 720.

### ⚠ Placeholder imagery on this page

The three service photographs are real exports at 2x. These are NOT:

- comparison-matrix cell marks (uniform circles),
- case-study thumbnails (reusing `images/work/case-*.png`),
- packaging column icons (Chart_Line, House_02, Heart_01, Mobile_Button),
- the seven process steps (80px blocks).

All are generic screenshots or icon-set instances on the artboard. Each is
marked at its use site.

**One of these needs a decision, not an export:** the comparison matrix marks
each cell with one of several screenshot placeholders, so which cells read as
"covered" is not recoverable from the file. Every cell currently draws the same.

## What We Do — fix pass (Sep 2, 2026)

Ten corrections from review of the first What We Do build.

**`copyXSmall` was silently 16px everywhere.** `tailwind.config.ts` kebab-cases
the typography token keys, and the single-pass regex turned `copyXSmall` into
`copy-xsmall` while `Typography` asked for `text-copy-x-small`. That class was
never generated, so every 12px variant on the site inherited 16px — including
the homepage footer copyright. Added a second pass for consecutive capitals:

```ts
.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
```

`.text-copy-x-small{font-size:12px;line-height:1.5;font-weight:400}` now emits.
Worth noting the failure mode: a missing Tailwind class is silent, and the
inherited 16px is close enough to 12px to survive a glance.

**Light page ground is `#F6F2EC`, not white.** `colors.background.surface` was
`#FFFFFF`, taken from a Figma layer literally named "bg-white" (node
3390:26422). The name was misleading — the light body ground is the brand cream,
which is already `palette.neutral[50]`. Pointing the token at the ramp also
retires one of the three off-board colours in `unmapped`. Verified computed
section background `rgb(246, 242, 236)`.

**Service rows.** "Learn more" is now `variant="secondary"` (outlined —
measured `1px rgba(7, 27, 39, 0.24)`). The offering name takes
`whitespace-nowrap` so it stays on one line per the artboard, and the audience
column and case-study card copy are 12px. The icon circles were present but
invisible: a 8% fill on cream renders as nothing, so they now carry
`bg-neutral-900/10` plus an inset ring and an inner ringed dot. Still
placeholders — the artboard's icon is a `Dummy_Square_Circle` instance.

**Case-study card bottom-alignment was a symptom, not the bug.** The card
overhung the image by 34px. The artboard's right column is exactly as tall as
the image — the card at node 3604:1049 sits at y=279 with height 96, so it ends
at 375 — and the overhang came from three intrinsic sizes being wrong, not from
a missing alignment rule:

| | artboard | was | now |
|---|---|---|---|
| offering row pitch | 56 | 65 | 57 |
| "Services" label block | 45 | 37 | 45 |
| Services block total | 213 | 233 | 217 |
| right column | 375 | 409 | 375 |

Row padding went `py-md` → `py-tag` (16 → 12, giving 12+32+12) and the label gap
`gap-md` → `gap-lg` (16 → 24). The residual 1px per row is the divider, which
Figma draws as a zero-thickness line.

With those right, the column's content comes to ~337px — less than the image —
so the image drives the grid row height and `justify-between` lands the card
flush against its bottom. The hard `gap-4xl` (80px) that was there before was
what pushed the column past the image in the first place; it is now `gap-lg`, a
floor rather than a fixed gap. Measured: image and column both 375, both
bottoming at the same y.

**Why we exist** was rebuilt as a single CSS grid. The first pass gave each row
its own flex container, so the cells, row labels and column labels shared no
column tracks and nothing lined up. Coverage is now explicit, and Type B's row
is filled in the warm accent against ink for the others, so the point of the
section reads at a glance:

```ts
const COVERAGE: Record<string, readonly string[]> = {
  'AI Shops': ['AI'],
  'Staffing agencies': ['Teams'],
  'Product studios': ['Strategy', 'Design', 'Build'],
  'Type B Digital': MATRIX_COLUMNS,
}
```

**How we package it** — the lead quadrant is now a dark card (`bg-canvas`,
`text-on-dark`) with the three tiers on `border-y border-divider`; all four
columns end on the same line via `justify-between`. Column icons remain
placeholders (Chart_Line, House_02, Heart_01, Mobile_Button).

**Senior teams** carries the seven 80×80 gradient blocks from Source to Onboard,
one per gradient `b1`–`b7`. Verified: 7 blocks, all `80x80`.

### Verification note

`Page.captureScreenshot` with `captureBeyondViewport` produced a hard
horizontal seam across the service section — the fixed `.page-grain` overlay is
laid out against the real viewport and does not tile into the expanded capture.
It is a capture artifact, not a defect; plain in-viewport captures show uniform
grain. A tall `Emulation.setDeviceMetricsOverride` is also useless on these
pages, since it stretches every `100vh` section and moves each offset. The
working recipe for full-section shots: real 1440×900 viewport, step-scroll the
document once to fire every `once: true` reveal, then clip.

## navigation-dark on What We Do (Sep 2, 2026)

Figma node 3605:1436. The name describes the *elements*, not the ground —
"navigation-dark" is the ink-on-cream variant, for pages whose hero is light.
`SiteHeader`'s `tone` prop keeps naming the ground instead (`onLight` renders
navigation-dark), since that is what a caller knows about its own hero.

Three parts invert between the variants, and only the links had been doing so:

| | onDark (navigation-main) | onLight (navigation-dark) |
|---|---|---|
| logo | `#F6F2EC` | `#040E19` |
| links | `#F6F2EC` @ 80% | `#040E19` @ 80% (3605:1458) |
| CTA | cream pill, ink label | ink pill, cream label (3605:1472) |

The CTA was the visible miss: a cream pill carried over onto the light hero,
where it reads as a hole punched in the page. The artboard fills it `#040E19`
with `#F6F2EC` text, which is exactly `variant="primary" tone="onLight"`, so
the fix is passing `tone` through rather than pinning it to `onDark`.

**The logo became a component.** The two artboards export it as separate SVGs,
but stripped of their `fill` attribute the two files are byte-identical — the
only difference is the baked colour. `icons/TypeBLogo.tsx` draws it with
`fill="currentColor"` instead, the same treatment `ArrowRight` and `CaretDown`
already had, so the header's tone drives the mark and there is no second 6KB
file to drift. `public/icons/type-b-logo.svg` is deleted; the footer uses the
component too.

Two details worth keeping: the mark is one boolean-operation path whose
counters are subpaths, so it needs `fillRule="evenodd"` or the bowl of the B
fills solid. And the tone classes pin to `neutral-50` / `neutral-900` rather
than the semantic `text-on-dark`, which resolves to `paper` (#F6F6F6) and would
have drifted the homepage mark a shade off its own nav links — measured
`rgb(246, 246, 246)` against links at `rgb(246, 242, 236)` before it was
pinned.

Verified computed styles on both routes:

```
/what-we-do  logo #040E19  links #040E19 @ .8  CTA #040E19 on #F6F2EC
/            logo #F6F2EC  links #F6F2EC @ .8  CTA #F6F2EC on #040E19
```

## GitHub Pages staging deploy (Sep 2, 2026)

A shareable staging link, served from the repo by GitHub Actions rather than by
committing `dist/`, so the link always reflects `main` and the repo stays
source-only.

Pages serves a project site from `/<repo>/`, not the domain root, which breaks
three separate things. Each needed its own fix:

**Asset URLs.** `vite.config.ts` now takes `base` from `BASE_PATH`, set in CI
from `actions/configure-pages` rather than hardcoded, so a repo rename or a
custom domain does not silently break every URL. Local dev leaves it unset.

**Routes.** `main.tsx` hands `import.meta.env.BASE_URL` to the router as
`basename`, so route declarations and every `<Link>` stay written against the
site root. A hard refresh on a deep link still hits Pages' static file lookup,
which has no rewrite rule, so `postbuild` copies `index.html` to `404.html` —
Pages serves that for unknown paths and the SPA boots and reads the real URL.
`public/.nojekyll` stops Jekyll from stripping anything.

**Literal `public/` paths — the one that actually bit.** Vite rewrites asset
URLs it *processes*: imports, and `url()` inside CSS (verified: the grain tile
came out as `/type-b-digital/images/noise.png` on its own). A bare string
literal like `/images/logos/logo-1.png` is emitted exactly as written and
resolves against the domain root. The first Pages-shaped build had correct
routing, correct fonts, and **all 37 images broken** — and it looked fine in
every root-path check, because at `/` the bug is invisible.

`src/lib/asset.ts` resolves those against `BASE_URL`; 24 call sites across four
files now go through it. `tokens/index.ts` keeps its bare `grain.tile` on
purpose: it is a documentation pointer, and the live reference is the CSS
`url()` Vite already handles.

Verified against a local server that mimics Pages — subpath, plus 404.html
fallback for unknown paths — by direct navigation rather than client-side
routing, which is what a shared link actually does:

```
/type-b-digital/              h1 "Most partners do one slice."  37 imgs  0 broken  font ok
/type-b-digital/what-we-do    h1 "What We Do"                    9 imgs  0 broken  font ok
```

and the root-path dev server re-checked afterwards, since `BASE_URL` is `/`
there and the whole mechanism has to stay a no-op: both routes, 0 broken.

**Not yet done:** Pages has to be enabled once on the repo (Settings → Pages →
Source: GitHub Actions). The repo is private, and Pages on a private repo needs
a paid plan — on a free account the repo would have to be public first, which
exposes the full history and is Eduardo's call, not something to do implicitly.
