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

### Status: local only

Pages is set up but not switched on. `configure-pages` fails with
`Resource not accessible by integration` — the workflow's built-in `GITHUB_TOKEN`
can deploy to an existing Pages site but cannot create one, which needs repo
admin. So the workflow is `workflow_dispatch` only; the `push` trigger is
commented inline for whenever Pages is enabled.

Two things to know before picking that up again:

- The repo is private, and Pages on a private repo needs a paid plan. Enabling
  it in Settings is what reveals which plan applies — worth reading the message
  there rather than assuming.
- A Pages site published from a private repo is **publicly reachable**; there is
  no password on it. Access control for Pages is Enterprise-only. So it is an
  unlisted public page, not a private one. Netlify and Cloudflare Pages can
  password-protect a preview while keeping the repo private, if that matters.

The `asset()` / `basename` / `404.html` work is worth keeping regardless: it is
a correctness fix for any non-root deploy, and a verified no-op at `/`.

## Industries page (Sep 2, 2026)

Figma node 2894:13976. Third page. Header runs navigation-dark; closing CTA and
footer come from PageShell as before.

### The page ground

Figma paints the gradient on the page frame itself, so there is no node to read.
Sampled down the artboard's left gutter at 20px intervals instead, which landed
on three exact ramp values — no new colours:

```
0%    neutral.50      #F6F2EC
44%   amber.100       #F7DDC1   (artboard y=1700)
96%   turquoise.100   #C9D5D3   (artboard y=3700)
```

A three-stop linear fit reproduces the sampled column to a worst deviation of
7/255, inside the grain's own variance — so it is a plain linear gradient, not
a mesh. It ends at 96% because the artboard reaches turquoise.100 at y=3700 and
holds it flat into the CTA at 3847. The hero, rows and FAQ are all
`tone="none"` so nothing paints over it.

### The 12-column stagger

The point of the section, and the thing most likely to be "tidied" away later.
Fill left edges measured off the artboard's pixels:

| row | left | column |
|---|---|---|
| Healthcare & Life Sciences | 732 | 7 |
| Financial Services & Insurance | 949 | 9 |
| Real Estate & PropTech | 840 | 8 |
| Manufacturing, Trade & Logistics | 732 | 7 |
| Legal Professional Services | 949 | 9 |

On the 1280px content width, 12 columns with a 24px gutter give an 84.67px
column; 4 columns plus 3 gutters is 410.67px, i.e. the 411px fill. Every
measured edge lands on a column boundary within a pixel. Built rendered edges:
732 / 949 / 841 / 732 / 949.

Pixel measurement was necessary because **the exported frame geometry reports
each fill one full width to the right of where it renders** — the metadata puts
the rect at `x = frameWidth`, just outside its own frame. The reliable rule is
`image right edge = 80 + frameWidth`.

`COL_START` holds the column as literal class strings. A computed
`lg:col-start-${n}` is never emitted by Tailwind, and the failure mode is
silent: every fill collapses to column 1 and the stagger — the whole reason the
section exists — quietly disappears.

### Row fills are composed, not shipped

`download_assets` returns no `rawImages` for these, only an SVG whose
`<linearGradient>` carries the stops. Every stop is an exact palette value, so
they live in `gradients.industry`. Three of the five are the b3–b6 ramps
re-fitted to this 411x320 box, which is why the offsets differ from the token
board's (b3 runs to 127.63% there because that gradient overruns its frame).

Two export defects, both caught by checking against the artboard rather than
trusting the file:

1. **The SVG is mirrored horizontally.** It puts cream at the top-right of the
   healthcare fill; the artboard renders it top-left. Negating the export's dx
   and taking `atan2(dx, dy)` in y-down space gives two angles, 122.8deg and
   302.8deg, which fit all five rows to a mean colour delta of 21/441 over a
   16-point grid. A free per-row angle fit landed within a few degrees of
   those, and the two 302.8deg rows share identical SVG coordinates, so they
   must share an angle. Same class of defect as the bbb-stroke SVG that
   exported rotated 90 degrees.
2. **The first `<stop>` carries no `offset` attribute** (it defaults to 0). Read
   with a regex requiring one, the darkest stop vanishes silently and the fill
   reads as a mid-tone wash — which is what made the first four angle fits look
   like failures.

The export also bakes an `feTurbulence` grain into each fill. Left out: the page
already carries `.page-grain` above everything, so baking it in would double it.

### Two new colour facts

The hero eyebrow is **solid ink with near-white text** (node 2894:14356), not
the amber chip used on the other pages — hence `Eyebrow tone="ink"`. That tone
names the chip rather than its ground, because it is a second variant sitting on
the same light ground.

The FAQ rules are **not** `border-divider`. Figma exports them as
`stroke="#17616E"` (turquoise.500) at 40% — the page has faded to turquoise.100
by then, so an ink rule would read as a foreign colour. Added as
`colors.border.accentSoft`, resolved per mood so it tracks the active ramp.
Verified computed: `rgba(23, 97, 110, 0.4)`.

Also worth noting: this page's eyebrow is SemiBold, **agreeing** with
`typography.eyebrow`. The homepage artboard's Regular weight was the outlier, so
the token stands.

### Verified geometry

Every hero and row value matches the artboard exactly:

```
                artboard   built
eyebrow top          232     232
h1 top/bottom   273/359 273/359
hero copy width      800     800
hero CTA bottom      537     537
fill tops       697/1177/1657/2137/2617  ->  697/1177/1657/2136/2616
row pitch            480     480
row title bottom     843     843
row copy top/bot 859/907 859/907
row button top       947     947
FAQ heading top     3177    3176
FAQ chevron right   1336    1336
marquee top         3737    3733
```

### Deviations

- **FAQ question rows are 73px tall, not 79.** The artboard sets the question
  text at **15px** in a **31px** box. 15px is off the type scale entirely
  (12/14/16/20/…), and 31px is not a line-height any weight of Reddit Sans
  produces at that size — it reads as slack in a fixed-height Figma text frame.
  Built as `copyMedium` (16px) with 24px padding, giving 73. Say the word and I
  will force 15px/31px, but I would not introduce an off-scale size silently.
- **FAQ-to-marquee gap is 240, not the artboard's 225.** 240 keeps the page on
  the 80px rhythm it otherwise follows exactly (160 between rows, 240 before the
  FAQ); the 225 follows from the same FAQ frame slack above.
- **FAQ answers are placeholder copy.** The artboard draws every row collapsed
  and carries no answer text.

### Accordion

New shared component. Each row is a real `<button>` with `aria-expanded` and
`aria-controls`, and the panel is a labelled region — a div with a click handler
would look identical and be unreachable by keyboard. Framer animates
`height: auto` by measuring the target box, so the panel opens to its content
height with no magic number; padding sits on an inner box because padding on the
animated box would jump at height 0. One row open at a time by default.
Verified: three buttons, collapsed on load, clicking Q2 opens only Q2, and it
still opens and renders under `prefers-reduced-motion: reduce`.

`ChevronDown` is a new icon, not a reuse of `CaretDown`: the FAQ marker is a
full-width chevron (`M19 9L12 16L5 9`), the nav caret a 6x3 tick
(`M15 11L12 14L9 11`).

## Contact page (Sep 2, 2026)

Figma node 2894:10698. Fourth page. Validation, error states, captcha and toast
are all authored — the artboard draws one resting state and no feedback of any
kind.

### The nav layer name lies again

The nav layer is called **navigation-main**, but it renders the ink-on-light
variant: its CTA pill samples `#151E28` under the grain, i.e. ink. Same trap as
the layer literally named "bg-white" that turned out to be brand cream, so the
tone came from the pixels — `headerTone="onLight"`. Third page in a row where
the layer name is not evidence.

### Page ground

Sampled down the left gutter as on Industries, landing on three exact ramp
values again:

```
0%     neutral.50      #F6F2EC
47%    turquoise.100   #C9D5D3   (artboard y=1080)
100%   amber.100       #F7DDC1
```

Worst deviation from a three-stop linear fit: 7.7/255. It is the Industries
gradient reversed — cool through the middle here, warm there.

### Testimonial glow

Figma has a 1248px blob behind the quote (node 3617:9101). Isolated by
subtracting the fitted page gradient from the artboard's pixels: the warmth
peaks on the page centre at the testimonial's own centre, and is gone ~300px
below it. Built as `.testimonial-glow` in the same family as `.stages-glow`,
wider and flatter and at 0.42 opacity because body copy sits on it.

### Form

Field order, sizes and required-ness are the artboard's: email, company, name,
then a message labelled "(Optional)" (node 3617:9166) — so message is the one
field that does not block submission. Fields are `paper` on a `neutral.200`
border, 48px tall, 4px radius, 14px placeholder at 80%; the textarea is 128px.
All existing tokens.

**Labels.** The artboard puts each field name *inside* the box and shows no
label above it. Rendering that as a bare placeholder would leave every input
nameless for assistive tech and lose the name the moment someone types, so the
visible design is unchanged and each field carries an `sr-only` `<label>`
alongside the placeholder.

**Error colour, chosen by measurement.** The palette has no red. Rather than
invent one, `colors.feedback.danger` is `orange.700`, picked on contrast
against the field fill (#F5F6F6):

| candidate | ratio | |
|---|---|---|
| orange.500 `#FF5315` | 2.98:1 | the obvious "error red" — would have shipped unreadable |
| orange.600 `#CD4516` | 4.35:1 | first choice; fails AA |
| **orange.700 `#9B3717`** | **6.57:1** | used |

Colour is never the only signal: each error renders an icon and text, the
control gets `aria-invalid`, and `aria-describedby` points at the message so it
is announced on focus rather than merely visible. The form is `noValidate` so
the browser's own bubbles do not pre-empt these. On submit, focus moves to the
first field in error.

Errors appear on blur, not on keystroke, and clear as soon as the field is
corrected — showing "required" while someone is still typing reads as the form
not noticing. The email pattern is deliberately permissive (`x@y.z`); tighter
regexes reject valid addresses and only sending proves an address works.

### Bot protection — read this before relying on it

Three layers, all client-side: an arithmetic challenge (`Captcha`), a honeypot
field, and a minimum time-to-submit of 2.5s (`useBotGuard`). Verified: filling
the honeypot and submitting instantly are both rejected, silently and without
saying which check caught it.

**This is a deterrent, not a security control.** Everything runs in the browser,
where a script can skip it and POST to the endpoint directly. It stops the
drive-by form spam that floods an inbox; it will not stop anyone targeting this
form. Real protection needs a token the *server* validates — when the form gets
a backend, swap `Captcha` for Cloudflare Turnstile and verify server-side. Its
props (`onVerify`, `error`) are already the shape those widgets expose, so the
change is local to that one file.

Arithmetic rather than distorted text on purpose: distorted text is now harder
for humans than for machine vision, and is hostile to screen-reader and
low-vision users.

**There is no endpoint.** The submit is a simulated 900ms round-trip. Replace it
with the real POST when one exists.

### Two bugs worth recording

**The toast pinned to the middle of the form.** It is `position: fixed`, which
resolves against the nearest ancestor carrying a transform — and it was mounted
inside a `Reveal`, which leaves a framer-motion transform on its wrapper even at
rest. Now portalled to `document.body`. Measured: 24px from the bottom-right.

**The captcha kept its answer after a successful send.** Resetting the form's
own state left `Captcha`'s internal `entry` untouched, so the box showed a
correct-looking answer while the form considered it unsolved — a second message
failed validation against a field that looked filled. Fixed by keying the
component on a send counter so it remounts with a fresh question.

### Verified

```
                   artboard   built
eyebrow top             232     232
h2 top                  273     273
form x / width      841/410 841/410
email top / height    232/48  232/48
message top/height   424/128 424/128
submit width            168     167
quote width             800     800
photo x/size         80/628  80/628
section gaps    240/240/170  240/240/160
```

Empty submit flags email, company, name and captcha, moves focus to email, and
sends nothing. A bad email shows its message with the border at
`rgb(155,55,23)`; correcting it clears both. Toast announces `polite`,
auto-dismisses at 6s, and dismisses manually.

### Deviations

- **Hero heading is 48px (h2), artboard says 56px.** 56 is off the type scale
  entirely — it runs 48, 64, 72. h2 keeps the artboard's two-line wrap at 519px;
  `display` would push it to three. Same call as the FAQ's off-scale 15px.
- **The submit button sits ~66px lower than the artboard**, because the captcha
  is between it and the message field and the artboard has no captcha. Section
  gaps below are correct relative to each other.
- **Message is optional**, per its artboard label. Say the word and it becomes
  required with the others.

## Careers page (Sep 3, 2026)

Figma node 2767:1908. Fifth page, and the first whose ground changes mid-scroll.

### The ground

Sampled down the artboard's left gutter at 15px intervals across the
transition:

```
0%      amber.100                      #F7DDC1   (artboard y=0)
51.1%   62% of the way to neutral.50   #F6EADC   (artboard y=1935)
55.4%   neutral.900                    #040E19   (artboard y=2100)
100%    neutral.900
```

The warm ramp **does not reach neutral.50** before the ground turns — it gets
62% of the way and the fall to ink begins. Snapping that stop to neutral.50
would lighten the whole Bench section by ~5%, so the midpoint is an exact
`color-mix(in srgb, neutral.50 62%, amber.100)`, which computes to `#F6EADC` —
the sampled value to the byte, with both ends still tokens.

The fall is 165px of a 3788px body, 4.3%, which is why it reads as a fade while
scrolling but as a band on a full-page render. The artboard draws it as its own
160px rectangle (node 3638:9307), and **that space has to be reserved in the
markup**: the gradient's stops are percentages of the wrapper, so a shorter
page pulls the fade up into the Bench cards. A `h-[160px]` spacer sits between
the two sections for exactly that reason.

Verified in the browser: wrapper 3807px (artboard 3788), fade running
1945 → 2109, Bench content ending at 1929 and the Open Roles heading at 2249 —
so the transition happens entirely in the gap between the two sections, and the
heading's cream type never sits on a light ground.

### The carousel

Four slides, 3s each, per Eduardo's spec. Copy is his; the artboard draws only
slide 02 (node 3638:9411) and every slide shares one photograph — the same
628px image the Contact page uses for "We're Hiring", verified identical
pixel-for-pixel between the two artboards, so it is one asset.

**The numeral is outlined, not filled.** The artboard sets a transparent fill
and the outline comes from a 1px ink stroke the Figma export silently drops —
read the export literally and the digits vanish. `-webkit-text-stroke` is the
only way to stroke text in CSS. `typography.numeral` holds the 240px/220px
pair; it is far off the reading scale because it is a graphic, and the tight
line height is what puts the digits where the subheader's `-64px` margin can
overlap them.

**The progress bar is the timer.** One motion value runs 0 → 1 over the dwell,
the active bar's width reads off it, and its `onComplete` advances the slide.
A `setInterval` plus a separate width animation would be two clocks that drift,
and drift further when a backgrounded tab throttles rAF.

It is driven imperatively via `animate()` and its playback controls, and the
first attempt — declarative, with the pause expressed in the `transition` prop
— was wrong in a way worth recording: **changing a transition mid-flight does
not stop a running animation.** Hovering let the fill run to 100%, suppressed
the advance at completion, and left the carousel permanently stuck with nothing
to restart it. `controls.pause()` / `.play()` hold the actual clock, so leaving
resumes the remaining time instead of restarting the slide.

Paused on hover and focus-within (WCAG 2.2.2), and under
`prefers-reduced-motion` it does not rotate at all — the bars become manual
controls. Verified: holds for 5s under reduced motion, advances 1 → 2 → 0 with
the pointer outside, freezes mid-fill on hover and resumes from that position.

### Open Roles

Four tabs on the ink half. Built as a proper ARIA tablist: `aria-selected`,
`aria-controls` to the panel, only the selected tab in the tab order, and
Left/Right/Home/End moving between them with focus following. Leaving all four
focusable would make a keyboard user tab through every one to reach the
content.

"View All" is the artboard's odd one out — drawn with no pill at all (node
3638:9427) because it is the absence of a filter, not another category. Hence
`variant: 'plain'` on the item, plus an underline for its selected state, or it
would give no feedback when active. Design and Sales openings are placeholders;
the artboard lists only the Engineering set.

The FAQ rule needed a second token. `accentSoft` (accent.500 at 40%) is nearly
invisible over ink, and the artboard's rule there measures `#1D3A45` —
accent.400 at 40% over neutral.900 to within a pixel value. Added as
`colors.border.accentSoftOnDark` and reached through a new `tone` prop on
`Accordion`.

### Verified geometry

```
                   artboard   built
h1 top                  273     273
carousel photo     439 / 628  439 / 628 (x=732)
progress bars         48 x 4    48 x 4  (56px pitch)
Our Bench top          1227    1227
bench card         411 x 280  411 x 280
Open Roles heading     2257    2249
document height        5048    5058
```

### Deviations

- **Progress bars sit at x=80, the content margin; the artboard has them at
  x=97.** That 17px inset aligns with nothing else on the page — not the
  numeral, not the subheader, both of which start at 80 — so it reads as
  incidental rather than intentional.
- **Open Roles copy and the role names are DM Sans on the artboard** (nodes
  3638:9418, 9431), not Reddit Sans. Same font leak already logged for the
  homepage stat; built in the project face.
- **"Open Roles" and "FAQ" are pure white** on the artboard while the body copy
  is `paper`. Built as `text-white` for the headings to match.
- FAQ answers are placeholder copy — the artboard carries none.

### Careers revisions (Sep 3, 2026)

Three corrections after review.

**The ground change was a band, not a crossfade.** The first build put the
warm-to-ink transition in the page's own vertical gradient, which is the one
thing a gradient cannot express: however tightly eased, it holds the warm
colour at the top of the screen and the ink at the bottom *simultaneously*, so
it reads as a hard divider travelling down the page. Eduardo's screenshot shows
exactly that.

Rebuilt on the homepage's construction (`WorkToOfferings`): `BenchToRoles` gives
OurBench through the marquee ONE animated `backgroundColor`, timed against a
zero-height marker on the boundary via `useScroll({offset: ['start end',
'start start']})` and smoothed through `useLaggedProgress`. The whole viewport
is one colour at any moment. Verified by sampling the computed ground while
scrolling: a single value per frame, `#F6EADC` → `rgb(173,164,155)` →
`#040E19`.

The warm half keeps a gradient (amber.100 → `BENCH_GROUND`) because *there* the
two ends are within a few percent of each other, so it reads as one ground
rather than as two colours on screen.

**That change forced a second one.** Ground and content cannot cross on the
same schedule: Open Roles' heading enters the viewport around progress 0.36,
long before the ink arrives, and its cream type on a warm ground has almost no
contrast. The homepage has the same problem and solves it by fading the
incoming content in *behind* the ground (`offeringScene.contentFade`), so
`careersGround` now carries both `fade` (0.80 → 0.98) and `contentFade`
(0.86 → 1). Widening the physical gap instead would need more than a
viewport-height between the sections, against 452px on the artboard.

Measured through the boundary — no frame where type sits on the wrong ground:

```
scrollY   ground              Open Roles opacity   bench line y
1780      #F6EADC             0.00                 -1   (just left the top)
1850      rgb(230,219,206)    0.00                 -71
1900      rgb(173,164,155)    0.22                 -121
2000      #040E19             0.92                 -221
2150      #040E19             1.00                 -371
```

`BENCH_GROUND` is now derived rather than pasted: framer cannot interpolate a
`color-mix()`, so a small `mix()` helper computes the same 62% point between
amber.100 and neutral.50 in JS, keeping both ends as tokens.

**The carousel starts at 01**, not the 02 the artboard happens to draw.

**Each slide feathers in** with the page's own three properties — opacity, a
32px rise, and a blur resolving to zero — rather than swapping instantly.
`mode="wait"` sequences out-then-in, because crossfading two outlined numerals
on top of each other turns the outline to mush. The exit runs at
`duration.fast` against the entry's `duration.base`: symmetric 600ms halves
would spend 1.2s of a 3s dwell in motion. Measured 0 → 0.9s, leaving the slide
settled for the remainder.

### Careers carousel, second revision (Sep 3, 2026)

**The numerals are components, not type.** Figma nodes 3672:9527 / 9531 / 9532 /
9533 (`number-01`..`number-04`) are drawn outlines — hollow letterforms filled
at ink 40%, with a "1" carrying a flag Reddit Sans does not produce. The first
build faked them as 240px text with `-webkit-text-stroke`, which gets the wrong
glyphs entirely.

The exports need cleaning: each carries a `#090909` backing rect and a white
1440x10570 rect (the whole tokens board) around the two glyph paths. Extracted
to `public/vectors/careers/number-0N.svg` at their natural 179px height —
219 / 269 / 269 / 281 wide.

The overlap needed recomputing. The artboard's text boxes overlap by 64px, but
its *glyphs* overlap by 34px: the 240px type sat in a 220px line box with ~21px
of descender space under the digits, and these vectors are tightly bounded.
Measured off the artboard's own pixels — numeral glyph bottom 758, subheader
glyph top 724 — so the margin is `-34px`, not `-64px`.

**Reduced motion was stopping the carousel entirely.** Eduardo reported it stuck
on 01 until a progress bar was clicked; reproduced exactly by emulating
`prefers-reduced-motion: reduce`, which he has on at the OS level. The first
build treated the setting as "do not rotate", which is the stricter reading.

Changed to suppress the *transition* rather than the rotation: slides still
advance on their own, but swap instantly instead of blurring and rising, and
the numeral and image cut rather than crossfade. The rotation is the page's
content, the hover/focus pause (WCAG 2.2.2) is still there, and a filling 4px
bar is not the vestibular motion the setting exists to suppress. Verified: 0 →
1 → 2 unattended with the setting on.

**The image now changes with the copy**, crossfading in place — stacked
absolutely inside the square rather than `mode="wait"`, which would blank the
panel between slides. The numeral keeps `mode="wait"`, since two outlined
numerals overlapping turn to mush.

⚠ **Three of the four images are stand-ins.** The artboard shows one photograph
across all four slides, so the slides point at the four distinct assets already
in the project to make the mechanism visible. Each is a one-line swap once real
photography exists.

**Open Roles sits 240px lower.** It was reaching the middle of the screen just
*before* the ground finished going ink, and more so on a tall window — measured
content centre 2389 against a viewport centre of 2381 at 813px tall, and ~27px
earlier at 882px, which is what Eduardo's screenshot caught. Verified after the
change at two heights:

```
viewport 813   fade completes 2000   centres 2062   (+62px)
viewport 900   fade completes 1975   centres 2019   (+44px)
```

## Culture page (Sep 3, 2026)

Figma node 2448:3065. Sixth page, and the one carrying two pieces Eduardo
called out as brand-critical.

### The design-thinking figure — `DivergeConverge`

The graphic is one shape seen through five windows, so the parts have to agree
exactly.

**The silhouette is the headline, drawn.** Five blocks 236.8px wide on a 260.8px
pitch, heights 80 / 160 / 240 / 160 / 80, each centred in a 240px row: the top
edges step down and the bottom edges step up, so the outline of the row is
itself a diamond. Built: 237px wide, heights 80/160/240/160/80.

**The diamonds are continuous across the row, not per-block decoration.** Two
489.413px squares rotated -45 degrees — 1px white border at 32%, 8px radius —
centred at 346.07px and 933.93px of the 1280px row.

The clipping was worth checking rather than assuming: a column sampled in the
gap between two blocks on the artboard is flat cream with exactly one distinct
colour, so the figure exists *only* where a block reveals it. That rules out
the obvious implementation — one layer behind the row — because the blocks are
opaque gradients and would hide it completely. Instead every block owns a copy
of the layer, shifted by its own left edge, so the diagonals line up across the
gaps as one motif passing behind.

**The gradients are the brand ramps walking out and back**, every stop an exact
palette value sampled off the artboard:

| stage | from | to |
|---|---|---|
| Empathize | neutral.900 | turquoise.600 |
| Define | turquoise.500 | orange.600 |
| Ideate | orange.500 | amber.500 |
| Prototype | amber.400 | neutral.800 |
| Test | neutral.600 | neutral.200 |

**Ideate glows.** Measured on the artboard as warmth (R-B) above the block edge,
then tuned until the built falloff matched:

```
distance   artboard   built
   5px        +48       +48
  15px        +37       +38
  25px        +28       +29
  40px        +17       +17
  60px         +5        +8
  80px         +1        +2      mean absolute error 0.9
```

### The globe — `Globe`

The artboard draws a wireframe with invented coastlines. This is Natural Earth's
110m land outline under a real orthographic projection, so the continents are
where they are and a city rotates to where it is. Verified: hovering Colombo
puts the pin on Sri Lanka, with India, the Arabian peninsula, Indonesia and the
Philippines all correctly placed.

`scripts/build-land.mjs` converts the source TopoJSON once into
`src/data/land-110m.json` — 75KB, 5,123 points, coordinates rounded to two
decimals (~1km, far finer than a 1440px globe can draw). Only `d3-geo` ships;
`world-atlas` and `topojson-client` are devDependencies.

**The geometry is not a normal globe.** The sphere is as wide as the container
with its centre a full radius below the top edge, so only the cap shows — the
artboard's 1440x327 band is the top 327px of a 1440px sphere. A city rotated to
the projection centre would therefore land a radius *below* the visible strip.
Each city is instead rotated `TILT` (46 degrees) north of centre, which lifts it
to `R - R*sin(TILT)`. Verified: the pin lands at (720, 202) for every city,
which is exactly what 46 degrees predicts on a 720px radius.

Canvas rather than SVG — 5,000 re-projected points per frame is one path on a
canvas and 5,000 DOM nodes in SVG. Redraws coalesce into a single rAF and only
run while something moves.

**A bug worth recording.** The redraw scheduler no-ops while its rAF handle is
non-null, and the effect cleanup cancelled the pending frame without clearing
the handle. The only frame that ever ran was the one queued at size 0, so every
redraw after the ResizeObserver reported real dimensions was silently dropped:
the canvas kept its default 300x150 backing store and painted nothing. Symptom
was an empty globe with no error anywhere.

### Elsewhere on the page

Stats are laid out on a grid rather than inheriting the artboard's three
scattered groups, whose positions only hold at 1440. The Approach cards keep
the artboard's 243px stagger on the even columns, and the closing line clears
it. The globe is full-bleed, so its section is `bare` and only the copy above it
is wrapped in a `Container`.

## Footer and route wiring (Sep 3, 2026)

The footer links were all `href="#"`. They now carry routes where a page exists
— Industries, What We Do (which covers Advisory, Product and Teams), Careers via
"We're Hiring!", Contact, and Culture via "About Us" — and render as `<span>`
where one does not, which is honest rather than a link that 404s.

## Careers carousel: pause scope (Sep 3, 2026)

Eduardo reported the carousel still locking on slide 01. It could not be
reproduced headlessly — it auto-advances from a cold load, with the pointer
parked over the carousel, and under reduced motion.

The one thing that can freeze it is the hover pause, and it was scoped to the
entire carousel, which fills most of the hero. A pointer resting anywhere over
the photograph held the rotation before it ever began. Pausing is now scoped to
the progress bars and to focus-within: hovering the controls is an intent to
interact, hovering the picture is not. WCAG 2.2.2 still has its mechanism.

### Culture revisions (Sep 3, 2026)

The artboard was updated between builds — the hero gained a background frame and
Our Approach gained its copy line — so several node ids moved.

**Hero ground, built from the definition rather than the export.** Figma offers
this as an 8.4MB PNG; the frame is really a linear gradient plus one
8%-opacity path, which is a few lines of CSS and a 2.7KB SVG.

Neither the angle nor the offsets are the ones Figma states:

- *Angle.* The gradient runs (0, 880) to (1649, -473) — 50.63 degrees — but the
  rect carries `matrix(-1 0 0 1 1440 0)`, a horizontal mirror, so the built
  angle is the reflection, 309.36.
- *Offsets.* Figma's axis is 2133px; the CSS gradient line for that angle in a
  1440x880 box is 1671px, and CSS normalises stops to its own line. Copying
  0/50/100 across put the cream end *inside* the box and washed the left half
  out — measured #DFDEDA at the top-left against the artboard's #7C989A.
  Rescaled by 2133/1671 the stops are 0 / 63.8 / 127.6, the last running past
  100% exactly as `gradients.b3` does. Corners then agree within 3–8%, the
  residual being the artboard's baked grain.

The hero is dark, so the copy is `text-on-dark` and the header switched to
`onDark` — it had been ink on ink.

**Stats now sit on the grid.** Their right edges on the artboard are 708, 1034
and 1360: the ends of columns 6, 9 and 12. The first attempt landed on
720/1040/1360 because the grid had no column gap, making columns 106.67px
instead of 84.67 — the 12-column system is only itself with its 24px gutter.
With `gap-x-lg` the built edges are 708 / 1034 / 1360 exactly.

**Our Approach** reads eyebrow, headline, copy, then cards, matching the
updated artboard where the copy sits inside the header frame rather than
trailing the cards. Card drop shadows removed — the artboard has none, and the
shadow was reading as a lift the design does not have.

Four rings and a warm bloom sit behind. The bloom is a broad plateau rather
than a point source: the artboard holds near-full warmth out to about ±330px of
centre before falling away, so the warm stop is carried to 30% before the ramp
begins. Tuned in two passes (too narrow, then 1.22x too strong) to:

```
   x     artboard  built
   50        +7      -1
  394      +115    +112
  720      +137    +135
 1046       +99     +96
 1400        +0      -1     mean absolute error 3.4
```

**A z-index trap, twice.** Both background layers were on negative z and
invisible. A negative-z child paints *behind its own stacking context's
background* — and `Section tone="light"` paints `bg-surface` over it. Both are
now `z-0` with the content on `z-10`.

**Design thinking now crossfades into Talent**, on the same shared-ground
construction as the homepage and Careers: one animated `backgroundColor` across
both sections, timed against a zero-height marker, with Talent's cream copy
fading in behind the turquoise rather than with it. Verified one colour per
frame: `#F6F2EC` -> `rgb(142,159,162)` -> `#17616E`. Talent is `min-h-screen`
with the globe pinned to the bottom, so the scroll settles on a full-height
view of the planet (858px against an 813px viewport).

**The globe pin is twice the size** — 28px with a 36px pulse ring.

### Culture: Talent pins (Sep 3, 2026)

The crossfade landed but the section did not hold — it scrolled straight past.
Rebuilt as a pinned scene on the same construction as the homepage's offerings
panel: a wrapper `talentScene.pinLength` viewport heights tall with a
`sticky top-0 h-screen` panel inside it.

Two viewport heights, not the offerings scene's 2.5: that scene steps through
four offerings on scroll and needs the length, whereas nothing here is
scroll-driven and the hold only has to register as a hold. One screen of lock,
one of release.

The crossfade needed no re-timing, only its own token. The marker it runs
against sits on this wrapper's top edge, so progress reaches 1 exactly as the
panel starts sticking — the fade and the lock are the same moment by
construction. It had been borrowing `careersGround`, which is a different
page's schedule; `talentScene` now carries its own `fade` and `contentFade`,
pulled slightly earlier (0.70–0.94) so the colour arrives with the lock rather
than after it.

Measured through the scene — `panelTop` at 0 is locked:

```
scrollY   panelTop   ground
   3455       +500   #F6F2EC
   3755       +200   #F6F2EC
   3955          0   rgb(90,125,133)   lock engages, fade settling
   4155          0   #17616E
   4455          0   #17616E
   4755          0   #17616E           still locked
   4855        -87   #17616E           releases
```

The lock runs 3955 → 4768, exactly one viewport height. The colour finishes a
fraction into the hold rather than precisely at it, because `useLaggedProgress`
springs the scroll and trails it by design — the same trailing every scene on
the site has.

No pin under reduced motion: a section that holds the page while the scroll
runs on is exactly the effect that setting asks to suppress, so that path keeps
the plain `min-h-screen` section.

`Section` gained a `style` prop for this — the scene height is a token
multiplied into `vh`, which Tailwind cannot express.

## Product & AI Development (Sep 3, 2026)

Figma node 3141:2722 — the first of the three service pages, and the one the
artboard draws in full. Advisory and Teams reuse it, so everything structural
lives in `src/components/service/` and the page file is content only.

Also renamed the What We Do section to "Product & AI Development".

### What was built vs reused

New, in `service/sections.tsx`: `ServiceHero`, `IdealCustomerProfiles`,
`CapabilityGrid`, `EngagementSteps`, `LevelsList`, `FeaturedCase`,
`RelatedServices`.

Lifted into `service/shared.tsx` so there is one implementation rather than a
copy per page: `Packaging` (was inline on What We Do) and `StaggeredCards` (was
`OurApproach` on Culture). The Product page's stagger carries no numbers and no
bloom — its ground is already warm — so both are props.

`ServicePage` holds the ground, FAQ, testimonial and marquee. The ground is the
same three-ramp construction as the other pages, sampled down the artboard's
gutter: turquoise.100 → neutral.50 at 42.7% → amber.100 at 98.1%.

### The review loop

Horizontal alignment was right on the first pass — ICP blocks 572 ending at
652, capability columns 403, the levels list and featured image both starting
at 841 and ending at 1360. Vertical was not: the page came out 1798px too tall,
with drift reaching +883 by the FAQ.

Four things were wrong, each found by measuring section heights rather than
looking:

**The section rhythm was 240, not 160.** `py-5xl` on every section put 120 top
and bottom between neighbours; the artboard's dominant gap is 160. `py-4xl`
throughout. That alone took 870px out.

**`EngagementSteps` never rendered its arrows.** Three steps mapped into a
five-column grid land in columns 1, 2 and 3 — the arrow columns were simply
never filled. Rebuilt as one flex row with the arrows as siblings.

**The step row then had a double gap.** The arrow cell carries 24px of padding
on each side, and the row also had `gap-lg`, so 96px came out of the three
steps: 347 wide against the artboard's 378.67, and the copy wrapped to four
lines instead of three. With the row gap removed the card is 379 and the
paragraph is 331 wide over three lines.

**`StaggeredCards` had a redundant 243px spacer.** A grid row is already as
tall as its tallest item, so `mt-[243px]` on the even cards sizes it; the
spacer added 243px of nothing between the cards and the footnote. (The same
spacer is on Culture and should come out there too.)

After those, every section gap is within ±65 of the artboard and most within
±10:

```
section              artboard   built   delta
Ideal Customer           1502    1543     +41
How AI is                1193    1220     +27
How does an               889     880      -9
Levels of AI              584     649     +65
Our specialty             640     646      +6
Three lines              1150    1145      -5
Related Services          698     741     +43
Class.fi                  386     378      -8
FAQ                       720     720      +0
```

Cumulative drift at the FAQ is 160px over 7762 — under 2%. The two +40s and the
+65 are places where the artboard's own gap is an outlier (86, 120, 157 against
its usual 160); the built page keeps the dominant rhythm rather than
reproducing one-offs.

### `text-wrap: balance` was on every paragraph

Found while chasing the step copy. `Typography` applied `text-balance` to all
variants. Balance evens the line lengths of a short block, which is right for a
headline and wrong for a paragraph — applied to body copy it pulls text in from
its own measure, so a 330px column wrapped at 220 and gained a line. **This
affected every paragraph on the site, not just this page.**

Headings now balance; everything else gets `text-pretty`, which only avoids
leaving one word on the last line.

### Still placeholder

FAQ answers (the artboard draws every row collapsed), the capability chips (a
`Dummy_Square_Circle` instance on the artboard), the Packaging column icons,
and the Related Services thumbnails, which reuse the What We Do service images.

---

## Advisory and Teams — Figma 2910:15211 and 3149:7942

Both pages are content files over the `@/components/service` shell that Product
& AI Development established. Neither introduces a new section type:

| | Advisory | Product | Teams |
|---|---|---|---|
| Hero | ✓ | ✓ | ✓ |
| Ideal Customer Profiles | 6 | 6 | 4 |
| Capability grid | ✓ | ✓ | ✓ |
| Engagement steps | 4 | 3 | — |
| Levels list | — | 5, no intro | 7, with intro |
| Sovereign AI cards | — | ✓ | — |
| Packaging / Related / Featured / FAQ | ✓ | ✓ | ✓ |

### One home for the copy the three pages share

`src/pages/service-content.ts` holds `CAPABILITIES` and `TIERS`, which the three
artboards draw identically, so a page file is now only what makes it different.

Related Services is *not* shared. Each artboard writes the one-line body from
the point of view of the page it sits on — Advisory reads "Fractional leadership
and the roadmap the pod executes against." on Teams and "…the build executes
against." on Product — so `related()` composes title, thumbnail and route from
one card map and takes the body per page. The cards now navigate (`RelatedShell`
renders a `Link` where a route exists, a plain row where one does not).

**⚠ Deviation.** The Product artboard's Related row is a copy of Advisory's and
lists Product & AI Development — the page itself — as its first card. Replaced
with Advisory, which is plainly what the row means.

### Review loop: seven measured corrections

Measured with a CDP harness that reports every section's top and height with the
`Reveal` transforms forced off, diffed against the artboard frames. Deltas are
content height (section height less its 160px of padding) against the frame.

Six gaps were wrong by one step of the scale, all of them in shared sections, so
each was wrong on all three pages at once:

| Where | Was | Artboard | Evidence |
|---|---|---|---|
| Hero text block → image | 120 | 80 | frame ends 591, image at 671 |
| Hero → next section | 120 + 80 | 120 | image ends 1382, ICP at 1502 |
| ICP heading → grid | 40 | 48 | heading 58, grid at 106 |
| Capability eyebrow → heading | 16 | 24 | eyebrow 25, heading at 49 |
| Steps heading → intro | 16 | 24 | heading 116, intro at 140 |
| Levels heading → intro | 24 | 16 | heading 116, intro at 132 |
| Related heading → row | 40 | 48 | heading 58, row at 106 |

The eyebrow gap is the interesting one: it is 16 on the left-aligned blocks (the
hero, Packaging) and 24 on the centred one (the capability grid). Not a mistake
in the file — the centred block needs the extra air.

**Packaging columns were 48 too tall.** Every gap inside a column is 24 on the
artboard — icon to title (48 → 72), title block to items (59 → 83), item to item
— and the build had 48 on the first two. 24+24+24+30+8+21+24+120+24 = 299,
exactly the artboard's column. This also fixed What We Do, which had its own copy
of the section; that copy is now deleted and the page uses the shared component
with `spacing="loose"` for its doubled 160/160 rhythm.

**FAQ rows were 7px short, each.** The question was `copyMedium` (24 line-height)
where the artboard's row is 31 tall — the chevron instance sits at y=3.5 of it,
which is (31−24)/2. With `py-lg` that gives the 79px row pitch every FAQ on the
site is drawn on. `copyLarge` fixes it, and the FAQ section lands at 573 against
the artboard's 572. **This also corrected Industries and Careers.**

After the pass, against the artboard frame heights:

```
section              artboard   built   delta   note
Hero (Teams)             1423    1423      +0
Ideal Customer            686     692      +6   tag box + rules
Capability grid           729     728      -1
Levels list               672     680      +8   8 hairline rules
Packaging                 536     533      -3
Related Services          226     226      +0
Featured case             560     560      +0
FAQ                       572     573      +1
Testimonial               233     233      +0
```

Advisory is the same to within the same tolerances, except Ideal Customer
Profiles at +33: one body paragraph ("The platform is slowing down…") sets to
three lines at the artboard's own 572px measure where Figma's text frame is
pinned to two. That is the copy reflowing, not a spacing error.

### Routing

`/advisory` and `/teams` are wired in `main.tsx`. The footer's What We Do column
no longer points Advisory and Teams at `/what-we-do`, and each service block on
What We Do now has a live "Learn more".

### Still placeholder

FAQ answers on both pages, and the hero and featured photography, which reuse
the Product page's exports.

---

## Site-wide consolidation audit — 2026-09-04

Run before building the first industry sub-page, because that page turned out to
reuse nine sections and would otherwise have grown a tenth copy of several.

**Five components existed as 2-6 near-identical copies, one per page.** In every
case the copies differed only in a tone class or a section rhythm, so the
differences became props:

| Component | Copies | Lived in | Differences |
|---|---|---|---|
| `ValuesMarquee` | 6 | index, what-we-do, industries, contact, careers, culture + service shell | accent shade, one `bg-surface` |
| `Testimonial` | 3 | contact, culture, service shell | 80/80 vs 120/120 rhythm, Contact's warm bloom |
| `FaqSection` | 3 | industries, careers, service shell | ground tone, top inset |
| `Hiring` | 2 | contact, culture | one had a dead `href="#"` |
| `GroundCrossfade` | 3 | index, careers, culture | colours and fade windows only |

`VALUES` was six identical arrays and `HIRING_TRAITS` two; both now live with
their component. Net: **820 lines deleted against 406 added.**

`GroundCrossfade` is the one worth reading — the scroll-linked mechanism, and
why it is an animated `backgroundColor` on a wrapper rather than a gradient, is
documented once at the top of that file instead of three times in three pages.

**The five `Hero` functions are NOT duplication** and stay page-local: the
homepage animates a gradient angle, Culture layers an SVG grid over a mirrored
b3, What We Do is a fixed 720px band, Industries is left-aligned with a CTA, and
Careers is a plain centred header. Different artboards, different components.

### `components/service/` -> `components/sections/`

Renamed. A folder called `service` holding the seven sections the industry pages
depend on is exactly how things get re-hardcoded. `ServicePage` became
`ContentPage` at the same time: the industry pages need the same shell with a
flat ground and no testimonial, so both are now props rather than baked in.

### `FeaturedCase` -> `SplitFeature`

The Financial Services artboard draws the same 519x560-image-beside-628-copy
block three times: once mirrored with no eyebrow and no claim (3614:6799), once
with both (3614:6912), and once as the service pages' Featured case (3614:6921).
So `eyebrow`, `claim`, `headingLevel` and `reverse` are props, and `FeaturedCase`
is now a two-line wrapper that supplies the eyebrow it always carries.

Column spans check out against the artboard on both sides: the copy is 6 columns
(6 x 84.67 + 5 x 24 = 628) and the image 5 (519.3), and the mirrored layout puts
the copy at column 7 (6 x 108.67 = 652), which is where the artboard has it.

### `LevelsList` heading column was 519, not 628 — a real bug

Caught by the visual pass on Financial Services: the section's photograph
rendered 519 wide against the artboard's 628. The column was `lg:col-span-5`
while the `max-w-[628px]` inside it never bit, so the constraint was silently
five columns. `lg:col-span-6` fixes it. Teams, Product and Financial Services
all measure the same total height after the change — no line count moved — so
this was purely geometry that had been wrong since the section was written.

The heading column also needed a conditional gap: 16 above an intro paragraph
(116 -> 132 on Teams), 48 above a photograph (116 -> 163 on Financial Services).

## Financial Services & Insurance — Figma 3162:283

Twelve sections, nine of them already built. The three new ones are in
`components/sections/industry.tsx`:

- **`IndustryHero`** — a full-bleed 880px band, page title centred on it, no
  eyebrow and no CTA. The gradient is the whole treatment.
- **`Statement`** — one 32px Medium paragraph over a 954px measure. The artboard
  sets it as a single text run, so the opening sentence reads as a heading but
  is not one; this is a `<p>`, not an `<h2>` over a body.
- **`StatBand`** — a heading with proof numbers to the right, on Packaging's
  four-column 302/24 grid rather than the 12-column one. That is why the stats
  start at 652 and 978.

**The hero gradient is `b7` mirrored.** `get_design_context` on 3614:6576
reports the named style "Type B BG 7" inside a `rotate-180 -scale-y-100`
wrapper — a horizontal flip — so the built angle is 360 - 50.68 = 309.32 and
the stops are the token's, unrescaled. Worth recording that this settled it:
fitting the artboard PNG's pixels suggested a uniform 0.86-0.94 darkening that
does not exist, an artifact of Figma's PNG colour management on saturated
oranges. The flat cream body sampled as exactly `neutral.50`, which is what gave
the artifact away.

The body ground is flat `neutral.50`, sampled down the full-page render at 28
points: cream from y=880 to the CTA band, with no gradient. Unlike the service
pages, whose ground is a vertical three-stop run.

### Review loop

| section | artboard | built | delta |
|---|---|---|---|
| Hero band | 880 | 880 | +0 |
| Statement | 384 | 384 | +0 |
| Ideal Customer Profiles | 1036 | 1045 | +9 |
| Levels list | 600 | 595 | -5 |
| Engagement steps | 336 | 336 | +0 |
| Split (mirrored) | 560 | 560 | +0 |
| Stat band | 170 | 170 | +0 |
| Split (Our Specialty) | 560 | 560 | +0 |
| Packaging | 536 | 533 | -3 |
| Related Services | 226 | 226 | +0 |
| Featured case | 560 | 560 | +0 |
| FAQ | 572 | 573 | +1 |

Six exact, four within 9. Two notes:

**Statement is 48 short.** ~~Chrome fits one more word per line than Figma's
text engine.~~ **Wrong — see the correction under the four remaining industry
pages below.** The block was set in `subHeaderLarge` (32px/48px) where the
artboard uses `h3` (40px/1.2). Both give 48px line boxes, which is why the
height arithmetic looked plausible, but 32px fits far more characters per line.
Corrected 2026-09-04; every one of the five Statements now measures exact.

**One artboard gap is a one-off:** 120 between the mirrored split and the stat
band, against 160 everywhere else on the page. Kept at 160, as on the service
pages.

### Deviations

⚠ The artboard's Related Services row is the service pages' row verbatim and
lists Financial Services & Insurance — this page — as its third card. Swapped
for Advisory, as on the Product page.

### Still placeholder

FAQ answers (the artboard draws every row collapsed), and all four photographs,
which reuse the service pages' exports. The four other industry rows on
`/industries` have inert "Learn more" buttons until their sub-pages exist;
Financial Services is now linked.

---

## The four remaining industry sub-pages — 2026-09-04

Healthcare & Life Sciences (3149:12091), Real Estate & PropTech (3239:15314),
Manufacturing, Trade & Logistics (3275:19055), Legal & Professional Services
(3245:17241). All four are the Financial Services template with different copy;
no new section type was needed.

Structural differences, which are the only thing the four page files encode
beyond copy:

| | FSI | Healthcare | Real Estate | Manufacturing | Legal |
|---|---|---|---|---|---|
| Mirrored "What can AI do…" | ✓ | — | ✓ | ✓ | ✓ |
| "Our Specialty" split | after stats | **before** stats | — | — | — |
| Related Services cards | 3 | 2 | 3 | 2 | 2 |
| Featured case | claim + body | **claim only** | claim + body | placeholder | placeholder |
| Hero type | ink | ink | **light** | ink | ink |

### The five hero bands walk BG 4 through BG 8

Each is the named Figma style inside a `rotate-180 -scale-y-100` wrapper — a
horizontal flip, so the built angle is `360 - θ`:

| page | style | Figma angle | built |
|---|---|---|---|
| Real Estate | Type B BG 4 | 230.63 | 129.37 |
| Manufacturing | Type B BG 5 | 50.64 | 309.36 |
| Legal | Type B BG 6 | 230.61 | 129.39 |
| Financial Services | Type B BG 7 | 50.68 | 309.32 |
| Healthcare | Type B BG 8 | 230.61 | 129.39 |

`b4Stops`, `b5Stops`, `b6Stops` and `b8Stops` join `b7Stops` in tokens, so the
angle lives with the page and the ramp with the token, as `b1Stops`/`b2Stops`
already did.

**Real Estate is the one hero with light type,** because b4 starts on
`neutral.900` and the mirror puts that ink end at the top left. Confirmed off
the artboard rather than inferred: node 3614:7138 carries `text-[#f5f6f6]` with
the body at `opacity-80`. `IndustryHero` took a `tone` prop for it.

### Correction: the Statement was the wrong type size

The measurement pass showed all four new Statements one or two lines short of
the artboard — Healthcare 6 lines against 8, Real Estate 5 against 7,
Manufacturing 8 against 10. On Financial Services last week the same block was
48 short and I wrote that off as Chrome and Figma breaking lines differently.
That was wrong, and re-measuring four more instances is what caught it.

`get_design_context` on node 3614:5656 gives the real spec: **40px SemiBold on
1.2**, which is the `h3` variant, not `subHeaderLarge` (32px Regular on 1.5).
Both compute to 48px line boxes, so every block height looked arithmetically
plausible while the character count per line was out by a third.

After the fix all five Statements measure exactly: 384 / 384 / 336 / 480 / 384.

The lesson is the one this log keeps relearning: a height that matches is not
evidence the type is right. Two different type specs can share a line box.

### `LevelsList` rows were too wide

Real Estate came in 17 short on the Levels list. The rows in the browser were
447px wide for the label where the artboard gives 400 — the rules span the full
519 column, but the row *content* is 472 of it (node 3614:7288), and after the
48px chip and its 24px gap that leaves exactly 400. With the extra 47px, two of
Real Estate's six labels fitted on one line where the artboard wraps them.

Capping the row at `max-w-[472px]` fixed it, and put all five industry pages on
the same delta: **+7 on every Levels list**, which is the seven 1px rules a
six-row list carries. Figma draws those as zero-height lines; CSS borders
occupy space. Uniform and explainable, so left alone.

### Review loop

Worst |delta| per page after the two fixes: Financial Services 9, Real Estate 9,
Manufacturing 9, Legal 9, Healthcare 33. Eight of eleven sections are exact on
every page.

The recurring +9 is Ideal Customer Profiles — the `Tag` box renders 26 against
the artboard's 24, plus the row rules. Healthcare's +33 is the same paragraph
that did it on Advisory ("The platform is slowing down…"): at the artboard's own
572px measure it needs three lines, and Figma's text frame is pinned to two, so
Figma is clipping it invisibly. Rendering three lines is correct.

No existing page moved: all nine previously measured document heights are
unchanged after the `LevelsList` and `Statement` changes.

### More shared copy lifted

`src/pages/industry-content.ts` now holds what the five industry artboards write
verbatim: the four-stage row (byte-identical on all five), six capability lists,
six situation paragraphs, and the closing Sovereign AI FAQ row. The
"AI mandate" profile block alone appears eleven times across the five pages.
Financial Services was refactored onto it too, dropping 50 lines.

### Deviations

⚠ **Levels heading.** Real Estate, Manufacturing and Legal all read "How we
frame financial services" — copy-pasted from the Financial Services artboard.
Corrected to each page's own industry.

⚠ **Related Services self-reference.** As on Product and Financial Services, the
row on some artboards lists the page it sits on. Swapped for a sibling.

⚠ **Manufacturing split heading** reads "What can AI do for a Manufacturing?" on
the artboard. Built as "What can AI do for manufacturing?".

⚠ **Legal role chip** reads "General Council"; built as "General Counsel".

⚠ **Real Estate stat band** shows "60+" against copy about a 40% infrastructure
saving — the numeral is left over from the Financial Services band. Reproduced
as drawn, since the intended number is unknown.

⚠ **Real Estate featured case** carries Ferry Pay's claim and paragraph verbatim
under the Mave AI name. Reproduced as drawn; the real copy is a content gap.

⚠ **Real Estate and Legal profile blocks** repeat one capability list and one
situation paragraph across all six cards — only titles and role chips differ.
Reproduced as drawn.

### Still placeholder

FAQ answers on all four pages. Manufacturing's and Legal's featured cases read
"Details needed here." on the artboard and are left that way rather than
invented. All photography reuses the service pages' exports.

---

## Navigation audit, scroll restoration, and the page-load entrance — 2026-09-04

### Link audit

Fourteen routes exist. Seven were reachable from the footer; seven were not.

| gap | fix |
|---|---|
| `/what-we-do` — the column head named it but was plain text | column heads with a route now render as links |
| the five industry sub-pages | nested under the Industries item |
| `/` — the footer mark was not a link | wrapped in a `Link`, as the header's already was |

Verified by walking every route against the footer's rendered `href`s:
`missingFromFooter: []`, `deadInFooter: []`.

Four CTAs pointed at `#` or `#contact` — a page that exists — and three more used
`Button as="a" href="/contact"`, which is a full document load rather than a
client-side navigation. All seven now use `Link`:

- `SiteHeader` "Let's talk!" (`#contact`)
- `ClosingCta` "Let's talk!" (`#`)
- Industries hero "Book an AI assessment" (`#contact`)
- Advisory / Product & AI Development / Teams hero CTAs (`as="a"`)

The remaining `href="#"` are left alone on purpose: they point at Case Studies
and job posts, which have no pages yet. Same policy as the inert footer columns.

**Hub page sections now link from the heading as well as the CTA.** The "Learn
more" buttons on What We Do and Industries were already wired; the section
heading is the far larger target, so it links too.

### The industry sub-pages are not in the footer

Nested under the Industries item first, then removed at the client's call: the
footer does not need them, and they cost 112px of height on all fourteen pages
(599 -> 711). The five are reached through the Industries hub, whose rows now
link from both the heading and the CTA.

Recorded because the alternative was considered and rejected: a fifth column
does not fit either — the nav track is 760px against five columns needing ~890
at the artboard's 96px gutter, so it wrapped and left Publications alone on a
second row.

The footer's other gaps stay fixed: the mark links home, the What We Do and
Industries column heads link to their pages.

### Scroll restoration — the reported bug

Following a footer link from the bottom of a page landed on the *next* page's
footer. A client-side navigation swaps the DOM and leaves `scrollY` alone.

`ScrollToTop` in the router fixes it, but the obvious version does not work.
A single `scrollTo(0, 0)` in a `useEffect` left the page a couple of hundred
pixels down — measured at **192px on /teams, 331 on /industries/healthcare, 307
on /contact**. The cause is Chrome's **scroll anchoring**: it re-offsets the
document after the swap to keep the previously visible content stable, and with
the whole page replaced it settles somewhere arbitrary.

The fix asserts the reset twice — in a `useLayoutEffect` before paint, then
again on the next frame, after anchoring has had its go. All three test cases
now land at 0.

Two deliberate non-behaviours:

- **No smooth scroll.** It would race the incoming page's own entrance, and on
  the pages with pinned scenes it runs the scroll-linked scenes backwards on the
  way up.
- **Nothing on `POP`.** Back and forward keep the browser's restored position,
  which is what people expect. Verified: back from /teams to /what-we-do returns
  to 1528, not 0.

### Page-load entrance

⚠ Authored — Figma documents no motion tokens. `tokens.motion.intro`.

Two parts, deliberately different in character:

- **`NavIntro`** — the header arrives *from* the top, feathered: it drops the
  24px it would have travelled and resolves a 10px blur (`reveal.feather`, so
  the softness of an arriving element is one value site-wide). Lives inside
  `SiteHeader`, so every page gets it without opting in.
- **`HeroIntro`** — the hero only fades, over a longer window (1.6s against 1s)
  so it is still arriving when the nav has settled. It does not travel: the hero
  is what the rest of the page is measured against, and sliding it makes the
  whole layout look unsettled.

`Reveal` could not do this job. It is driven by `whileInView`, which fires
immediately and simultaneously for everything above the fold, so the header and
the hero pop together.

Applied to all fourteen pages through eight files: `ServiceHero` covers the
three service pages, `IndustryHero` the five industry pages, and the six pages
with a page-local hero got it directly.

Measured on /, /what-we-do, /teams, /industries/real-estate and /contact:
nav `opacity 0->1`, `y -24->0`, `blur(10px)->blur(0)` settling ~1.15s; hero
`opacity 0->1` settling ~1.7s. Under `prefers-reduced-motion` both render the
final state with no animated wrappers at all — verified by emulation.

### Housekeeping

Added `.prettierrc.json`. There was no config, so a `prettier --write` during
this pass reformatted three files to prettier's defaults — double quotes, 80
columns — against the hand-maintained style. The config pins what the codebase
already does (no semicolons, single quotes, 100 columns, trailing commas) so
that cannot recur. Delete it if the formatting should stay by hand.

All fourteen document heights are unchanged from before this pass — the footer
is back to 599 after the industry list came out, and nothing else moved.

---

## Our Work — Figma 2865:5797

Four sections, three of them new. No page title: the artboard opens straight
into the featured case study on a full-bleed 880px band.

| section | artboard | built | delta |
|---|---|---|---|
| Hero band | 880 | 880 | +0 |
| Work rows (nine) | 4161 | 4159 | -2 |
| Industries we serve | 526 | 528 | +2 |
| Testimonial | 281 | 281 | +0 |

Positions land the same way: the first row at 1040, the Industries heading at
5359 against 5361, and the quote at 6127 exactly.

### Geometry

**Work rows.** 1280x441 on a 465 pitch (441 with a 24 gap). Copy column 519 at
x=0, thumbnail 737 at x=543 — five and seven of the twelve columns with the
standard 24 gutter (5 -> 519.3, 7 -> 736.7), which the build measures at exactly
519 @ x=80 and 737 @ x=623. Copy is top-aligned, not centred: every left column
sits at y=0 whatever its height, which runs 169 to 269.

Row internals against the artboard's 199-tall MatchDay column: title 29
(24px on 1.2), gap 16, then a group at 40 between the paragraph, the tag row and
the optional stat line. Built: 29 + 16 + (90 + 40 + 24) = 199.

**Two type steps are not on the scale** and are set inline with a comment:
the row title is 24px on 1.2 leading where `subHeaderSmall` is the same size on
1.5, and the industries card title is 20px on `normal` with -0.2px tracking
where `copyLarge` is 20px on 1.5.

**Industries grid.** Three 390px columns on a 48px gutter, each opened by a
rule; two rows 80 apart. The row is 1266 of 1280 on the artboard, the same
kind of right-edge slack as the Ideal Customer Profiles' 1224 — built as three
equal columns at 394.67, which is the +2 in the table.

**Testimonial.** The quote is 144 tall here (three lines at 800 wide) against
the 96 the service artboards draw for the same sentence, which is Figma
clipping a fixed-height frame on those. The shared component sets it naturally
and lands on 281 exactly. 240 sits between the grid and the quote, so 40 of it
is a wrapper on this page — `Testimonial`'s own loose rhythm is right at 120 on
Contact and Culture.

### Correction: the tag pill was 26 tall, not 24

Every artboard draws the pill 24 tall: a 16px line box over 4px of padding a
side (node 3707:10742 here, and the same "Frame 77" instance on every Ideal
Customer Profile row). The `tag` type step carried `lineHeight: 1.5`, giving an
18px box and a 26px pill.

**This is the residual delta the industry and service page reviews kept
reporting** and I kept attributing to "the Tag box renders 26 against the
artboard's 24" without fixing the cause. Set to 1.3333 — which is what the
artboard's own export says (`leading-[normal]` for Reddit Sans) — the pill
measures 23.98.

The eight pages with profile rows moved toward the artboard and nothing else
moved: Advisory, Product, and the five industry pages -3 (three rows), Teams -2
(two rows), everything else +0.

### `Tag` gained a `tone`, and why a className was wrong

The hero's pills are inverted — ink fill, cream label — because they sit on the
photograph. Passing `className="bg-canvas text-paper"` did not work: `cn` is a
plain join with no Tailwind merge, so `bg-tag-bg` stayed in the class list and
stylesheet order decided. It rendered as a pale pill. `tone="onDark"` now
follows the pattern Eyebrow, Button and Accordion already use.

Worth remembering across the codebase: a `className` override can only *add*
to these components, never replace.

### Placeholders

Thumbnails are flat grey blocks, deliberately empty rather than a blurred
stand-in, so the slots still needing art are obvious at a glance. **The hero
placeholder is dark, not grey** — the type over it is white, and a light box
there makes the heading unreadable, which is a worse placeholder than an
obviously dark one.

### Deviations

⚠ **Class.fi's body is MatchDay Health's paragraph verbatim** on the artboard.
Reproduced as drawn.

⚠ **The stat line on the last four rows** repeats "500K users supported." and
"~45% faster delivery." from rows three and four. Reproduced as drawn.

⚠ **Row titles are 2px taller on four of the nine rows** (31 against 29). Built
at one size — that reads as authoring drift, not intent.

⚠ **The Real Estate industries card ends with "{Explore real estate and
proptech}"**, an unresolved note asking for a link. The fragment is dropped from
the copy and answered with the link instead: all six cards now link to their
industry page, with Trade pointing at Manufacturing, Trade & Logistics.

### Routing

`/our-work`, wired into the header's "Case studies" and the footer's Case
Studies column head and "View All". The four case-study names in that column
stay inert — individual case study pages do not exist yet.

---

## Our Work hero image, and the case study template — Figma 2887:7099

### The Our Work hero is now the real photograph

Node 3707:10655, exported at 1440x880 and saved as
`public/images/work/our-work-hero.jpg` (145KB). It replaces the dark
placeholder, and **the placeholder's whole reason for being dark turned out to
be right**: the image is genuinely dark where the copy sits. Measured over the
left 628px of the text band, mean RGB (44, 36, 31) — white type on that is
**5.37:1**, against 4.5 for body text. No scrim needed, which is what the
artboard's own export implies (it has none).

`Placeholder` on that page lost its `tone` prop with the hero gone; the nine row
thumbnails are still grey blocks.

### Case study template

The artboard defines a template, so it is built as components in
`components/sections/case-study.tsx` and `pages/ferry-pay.tsx` is only copy and
six photographs. Eleven slots in a fixed order:

`CaseHero` · `Statement` · `CaseGallery` · `CaseChallenge` · `CaseBand` ·
`CaseSolution` · `CaseBand` · `CaseImpact` · `CaseFigure` · testimonial ·
marquee, wrapped by `CaseStudyPage`.

`Statement` is reused unchanged from the industry pages — the artboard's block
here is the same 954-wide, 40px SemiBold paragraph, and it measures 480 against
480.

| section | artboard | built | delta |
|---|---|---|---|
| Hero, to the image's bottom edge | 1367 | 1372 | +5 |
| Statement | 480 | 480 | +0 |
| Two-up gallery | 515 | 515 | +0 |
| The challenge | 390 | 392 | +2 |
| Band 1 | 800 | 800 | +0 |
| The solution | 585 | 584 | -1 |
| Band 2 | 804 | 804 | +0 |
| Our impact | 1232 | 1236 | +4 |
| Closing figure | 711 | 711 | +0 |
| Testimonial | 281 | 281 | +0 |

Six exact, worst 5.

### `HeroStats`, shared with Culture

The client asked for Culture's hero stats layout here, and it is the same three
values (100 / 30+ / 25+), so Culture's block moved to
`components/HeroStats.tsx` and both pages use it. Culture's height is unchanged.

⚠ The case study artboard places its three stats at right edges 788 / 1026 /
1360, which is neither the 12-column grid nor a consistent rhythm. Built on
Culture's alignment — columns 4-6, 7-9, 10-12, so the right edges land on
708 / 1034 / 1360 — because that is the one the grid supports and the one the
client asked for.

### Two spacing calls worth recording

**The solution's header-to-roles gap is 160, not 80.** Built at 80 first, which
came out -81 on the section. The roles grid's own two rows are 80 apart, so the
two gaps are genuinely different and the section needs both.

**Our impact's rows are hand-placed on the artboard.** The pitch runs 144, 144,
144, 144, 144, 120, 120 with no relation to the body height inside — two of the
seven bodies are three lines and they are *not* the tall rows. Built as a
regular list at 40 above and below, which gives 952 against 960. The
header-to-list gap is 107 on the artboard, between the 80 and 120 tokens; 120
lands the section at 1236 against 1232 and keeps everything below where the
artboard has it, where 80 came out -36.

### Other notes

- The roles grid is 894 wide with an **87px gutter**, off the 8-based scale.
  Uses the nearest token (80), the same call the footer's 96px gutter got; cards
  come out 244.67 against 240.
- `Eyebrow` gained a `slate` tone: the case study's pill is `neutral.800`
  (node 2887:7159), one ramp step up from the existing `ink`.
- The solution's paragraph is offset 45 from the top on the artboard so it
  aligns with the heading rather than the eyebrow above it.

### Images

Six exports downloaded from Figma and converted to progressive JPEG at quality
82 — 56 to 179KB each, 1x at the size they render. The two bands and the
closing figure reuse assets the service pages already had
(`Gemini_Generated_Image_l9brq1…` and `…j2xnnoj2xnnoj2xn…`), which is why only
five new files were needed. A 2x re-export is a one-line change to
`defaultScale` if the finals should be retina-crisp.

### Routing

`/our-work/ferry-pay`, wired into the footer's "Ferry Pay". The other three
case-study names stay inert until their pages exist. No existing page moved:
all fifteen document heights are unchanged.

## Navigation dropdowns and the footer update — Figma 3731:4239 — 2026-09-04

The "Navigation & Footer Updates" section, applied globally: both components
live in `PageShell`, so all fifteen pages take the change without an edit.

Six boards. Five are the nav, one state each — 0.0 What We Do (3729:3585),
0.1 Industries (3728:2907), 0.2 Case Studies (3729:3810), 0.3 Who We Are
(3729:4056), 0.4 Publications (3731:4145) — and the sixth is the footer
(3729:3711).

### The nav is a disclosure now, not five links

Every top-level item has carried a caret since the first build and none of them
did anything. The section makes them dropdowns: a 587px cream curtain over the
top of the page, the section name at 48px with an arrow to its own page, and
that section's pages listed at 32px beneath it.

Measured against the artboard after the build, over CDP:

| | artboard | built |
|---|---|---|
| panel height | 587 | 587 |
| heading y | 120 | 120 |
| link x / first y | 80 / 202 | 80 / 202 |
| link pitch | 50 | 50 |
| open pill | 142x40, `#C6C4C2` | 144x40, `#C6C4C2` |
| link colour | `#343C43` | `#343C43` (neutral.800) |
| dimmed labels | `#65696D` | `#65696D` (neutral.600) |

The pill is 2px wide because the trigger keeps its existing `gap-xs` between
label and caret; the artboard has them touching.

**The pill is drawn as an inset backdrop, not as padding.** Figma gives the open
item 16px more a side and 8px more top and bottom, which as real padding would
shove the four labels beside it sideways every time the pointer crossed one. An
absolutely-positioned `-inset-x-md -inset-y-sm` span paints the same pill and
moves nothing, so the closed bar keeps the geometry it was signed off with.

**The nav goes light while a panel is open, whatever the page is.** The curtain
is cream and the bar sits on top of it, so `tone` is overridden for the duration
— logo, links and CTA all invert. Without it the homepage's cream nav is drawn
on cream.

### Deviations

- **Labels are Title Case.** The section disagrees with itself: 0.0 and 0.1 say
  "What we do" / "Case studies" / "Who we are", 0.2-0.4 and the whole footer say
  "What We Do" / "Case Studies" / "Who We Are". Followed the majority and the
  footer, which is where both would otherwise appear on one page.
- **A caret only where there is a page.** The artboard draws one on all five nav
  items and all five footer headings, but Who We Are and Publications have no
  hub page. They render as plain text rather than promising a destination —
  the same call the footer's inert links already get.
- **Panel heading is `#040E19`, not `#030B15`.** The artboard uses the footer
  ground for this one heading; snapped to neutral.900 rather than carry a
  fourth near-ink for a difference of one value per channel.
- **The nav panel omits Legal; the footer includes it.** Board 0.1 lists four
  industries and the footer update lists five, with all five pages built. Left
  as drawn — this one is a question for design, not a call to make in code.
- **Motion is authored, as ever.** Five static boards, no transition between
  them. `motion.navPanel` proposes open/close/`contentLag`/`hoverGrace`; the
  grace period exists because the diagonal from a nav item to the link you are
  aiming at leaves the trigger before it reaches the panel.

### The footer gained a column and lost the lockup

Industries is its own column now (all five industry pages, Legal included)
rather than one link inside What We Do; Case Studies drops "View All"; "About
Us" becomes "Our Culture"; headings go 14px to 16px and gain the caret. The
statement column opens with the 24px B monogram — `TypeBMark`, node 3729:3745 —
instead of the 97x32 lockup, and the statement's line break after "slice." is
authored, because the artboard breaks it by hand rather than wrapping it.

The 411px statement column and the 24px gap to the nav block put the columns at
x=515, which is the artboard's. The previous 80px gap had them starting at 571.

### One bug found on the way in

`bg-gradient-nav-panel` generated nothing. `tailwind.config.ts` kebab-cased
gradient names on the nested branch (`gradient-industry-*`) but not the
top-level one, which nobody could see while every top-level gradient was named
`b1`…`b8`. The first camelCase gradient token silently produced
`bg-gradient-navPanel` — a class no one would think to write, and no error.
Both branches kebab-case now.

### New tokens

`gradients.navPanel` (white -> cream, the only genuinely new value in the
section), `typography.navPanelLink` (32px on a 42px line box — `subHeaderLarge`
is the same size but 1.5, which would push the fourth link 24px low),
`layout.navPanelHeight`, `motion.navPanel`.
