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
