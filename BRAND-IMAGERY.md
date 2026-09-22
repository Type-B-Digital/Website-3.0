# Type B Digital — Brand Imagery & the Nano Banana Prompt Kit

How to generate a photograph that looks like it belongs on this site.

Derived on 2026-09-21 by reading the seven reference frames in
`~/Desktop/type-b-images-selected/Inspiration-type/`, not from a mood board or a
written brief. Every attribute below is something all or most of those frames
actually share. Where only some share it, it says so.

Colour references are the real ramp values from `src/tokens/index.ts`. Slot
ratios are the real `aspect-[…]` classes in `src/`.

---

## 0. The method, in one paragraph

**Attach two or three of the reference images to the prompt and tell the model
to match their treatment.** That is the whole trick, and it beats any amount of
prose. Nano Banana (Gemini 2.5 Flash Image) takes reference images alongside a
text prompt and will carry lighting, grade and staging across far more reliably
than adjectives will. Words alone drift after a few generations; words anchored
to three frames do not. Use §3's style block when you cannot attach references,
and as a supplement when you can.

Work conversationally. Generate, then refine in follow-up turns ("warmer",
"move the phone left", "lose the second plant") rather than rewriting the prompt
from scratch — the model keeps the frame and adjusts it, which is how you hold
consistency across a set.

⚠ Generated images carry an invisible SynthID watermark. That is fine for site
imagery; know it is there.

---

## 1. What makes a frame Type B

Read across all seven references, in rough order of how reliably each holds.

### Always

**Plants. Every single frame.** Succulents and haworthia in terracotta,
monstera, pothos, ivy, a rubber plant. They are not decoration in the corner —
they ring the subject, crowd the edges, and in three frames they are the
out-of-focus foreground the camera shoots *through*. This is the single most
recognisable attribute of the set. A frame with no plant is not Type B.

**Directional daylight from a window, late in the day.** Never studio strobe,
never flat overcast. The light rakes across the scene and *leaves shapes* —
bands of sun across a table, the shadow of a plant thrown on a wall. Shadows are
long, soft-edged and legible as objects in their own right.

**Warm grade, slightly desaturated.** Amber and ochre in the highlights, deep
warm brown in the shadows. Greens are muted and olive, never vivid. Nothing in
the set is cool-toned except the product UI (see below) and one marble surface.

**Someone absorbed in their work, or the work itself.** Where there is a person
they are mid-task and unaware of the camera — reading, sipping, tapping,
thinking. Three-quarter, profile, or over-the-shoulder. **Nobody looks at the
lens. Nobody is posed. Nobody is shaking hands or high-fiving.**

**Coffee.** Six of seven. A latte with latte art, a ceramic mug, an espresso cup,
a paper cup. Always in shot, never the subject.

### Usually

**Shallow depth of field with a foreground occlusion.** Leaves or a pot blurred
across the front of the frame, so the viewer is looking *into* the scene rather
than at it. Three of the seven do this explicitly.

**Generous negative space.** The subject sits off-centre with room around it.
Flat-lays leave the middle clear for the device.

**Cool UI against a warm room.** Where a screen is visible it is deep navy,
indigo or white — the one cool note in a warm frame. That contrast is doing real
work: it is what makes the product read as the subject.

### The prop vocabulary

The same objects recur across frames, which is what makes the set feel like one
shoot rather than seven stock photos. Draw from this list; do not invent a new
one.

| | |
|---|---|
| Surfaces | Walnut or oak table, Carrara marble, pale plywood/ochre walls |
| Vessels | Terracotta pots, speckled cream ceramic, glass tumbler |
| Paper | Tan or oxblood leather notebook, closed, strap wrapped |
| Writing | Black lacquer pen with gold trim, or a brass pen; glass inkwell |
| Ceramic | Patterned mosaic coaster, saucer, white mug |
| Food | Croissant on a plate, latte with rosetta art |
| Devices | Current iPhone, open MacBook — clean, no stickers, no cables |

### Wardrobe

Oatmeal, cream and camel knitwear — chunky ribbed or waffle. Black overshirts.
Warm neutrals only. Round or clear-framed glasses recur in three frames. Thin
gold jewellery — hoops, stacked rings. **No suits, no lanyards, no branded polo
shirts, no visible logos.**

### How this sits against the brand ramps

The photography is not tinted to the palette, but it lands inside it, which is
why it sits on the site's grounds without fighting them:

| In the frames | Ramp value |
|---|---|
| Terracotta pots, warm highlights | `amber.500 #FD8816` → `orange.500 #FF5315` |
| Muted olive foliage, marble grey | `turquoise.200 #9DB8BA` → `turquoise.500 #17616E` |
| Deep shadow, navy UI | `neutral.900 #040E19` / `turquoise.900 #081F2A` |
| Cream knitwear, plaster, paper | `neutral.50 #F6F2EC` |

⚠ Do not post-tint generated images to the ramp. The `ImageWash` tool at
`/brand-guidelines` exists for that and does it properly, holding luminance
while it moves colour. A flat overlay muddies the shadows.

---

## 2. The one line a designer writes

Everything except the subject is fixed. In practice you write this much:

```
SUBJECT: a product designer reviewing wireframes on a laptop
SLOT:    what-we-do left panel (628×375)
```

…and paste it into the template below. If the subject does not name a person,
the frame becomes a flat-lay or a close-up and the rest still applies.

---

## 3. The style block

Copy this verbatim. Replace only the bracketed lines.

```text
Photograph: [SUBJECT — one sentence, what is happening, no adjectives about mood]

Shot in the house style of the attached reference images. Match their lighting,
colour grade and staging exactly.

LIGHT — Late-afternoon daylight from a window to one side, low and raking.
Long soft-edged shadows that read as shapes: bands of sun across the surface,
plant shadows thrown onto the wall behind. No studio lighting, no on-camera
flash, no flat even fill.

GRADE — Warm and slightly desaturated. Amber and ochre highlights, deep warm
brown shadows, muted olive greens. Natural warm skin. Film-like, gentle
contrast, no HDR, no crushed blacks, no teal-and-orange look.

STAGING — Live plants are essential: succulents and haworthia in terracotta
pots, monstera, pothos or trailing ivy. They frame the subject and crowd the
edges of the frame. Coffee is present — a latte with rosetta art, a ceramic mug
or an espresso cup. Surface is walnut, oak or Carrara marble. Optional props,
used sparingly: a closed tan leather notebook, a black-and-gold or brass pen, a
patterned ceramic coaster, a croissant on a plate.

CAMERA — 35mm or 50mm full-frame look, shallow depth of field (f/2 to f/2.8).
Where it suits the frame, shoot through out-of-focus foliage in the foreground
so the viewer looks into the scene. Generous negative space; subject off-centre.

PEOPLE (if any) — Absorbed in the task, unaware of the camera. Three-quarter,
profile or over-the-shoulder. Never looking at the lens, never posed. Wardrobe
is oatmeal, cream, camel or black knitwear; warm neutrals only. Thin gold
jewellery and round glasses are on-brand. No suits, no lanyards, no logos.

SCREENS (if any) — Clean modern UI, deep navy or white, legible but not the
focus of the sharpness. The cool screen against the warm room is the point.

AVOID — Corporate stock clichés: handshakes, thumbs up, whiteboard pointing,
headsets, people laughing at a laptop. No teal-and-orange grade, no lens flare,
no vignette, no bokeh balls, no confetti-coloured accents, no visible brand
logos, no text overlays, no watermarks, no clutter of cables or sticky notes.

ASPECT RATIO — [W:H]
```

### Attaching references

Attach **two or three**, chosen to match what you are asking for:

| If you want | Attach |
|---|---|
| A person working | `image 207.png`, `image 208.png`, `image 206.png` |
| A top-down flat-lay | `Gemini_…l9brq1….png`, `Gemini_…3z8i2n….jpeg` |
| A device close-up | `Gemini_…7vs3fs….png`, `Gemini_…jgzlpr….jpeg` |
| A scene with people in the background | `Gemini_…dkuk2u….jpeg` |

Attaching all seven is worse than attaching three. The model averages what it is
given, and the flat-lays and the portraits want different framing.

---

## 4. Slots, with the ratios the site actually uses

Taken from the `aspect-[…]` classes in `src/`. Ask for the ratio, then crop to
the exact pixel box.

| Slot | Ratio | Where |
|---|---|---|
| Case-study hero, full-bleed band | **1440:800** (16:9) | `CaseHero`, `CaseBand` |
| Service page hero, inline figure | **1280:711** (16:9) | `ServiceHero`, `CaseFigure` |
| Our Work row thumbnail | **737:441** (5:3) | `WorkRow` |
| What We Do panel, "How we frame" | **628:375** (5:3) | `ServiceBlock`, `LevelsList` |
| Two-up case gallery | **628:515** (5:4) | `CaseGallery` |
| Featured / Our Specialty portrait | **519:560** (1:1ish) | `SplitFeature` |
| Publication tile | **417:341** (5:4) | `PublicationTile` |
| Industries row fill | **411:320** (5:4) | `IndustryRow` |
| How we show up | **411:280** (3:2) | Culture |
| Vertical card | **410:560** (3:4) | `Card` verticalMedium |
| Horizontal card | **410:287** (3:2) | `Card` horizontalMedium |
| Wide card | **519:311** (5:3) | `Card` horizontalSmall |
| Hiring, How we partner | **1:1** | `Hiring`, homepage |

Nano Banana will not hit an arbitrary ratio precisely. Ask for the nearest
common one (1:1, 3:4, 4:3, 16:9, 3:2, 5:4), generate generously, and crop. For
an odd box like 519:560, generate 1:1 and crop.

---

## 5. Two worked examples

**A Publications tile (417:341) about AI governance**

```text
Photograph: a woman in her thirties reading a printed report at a café table,
a laptop closed beside her.

[…style block verbatim…]

ASPECT RATIO — 5:4
```

**A What We Do panel (628:375) for the Teams practice**

```text
Photograph: two colleagues at a shared desk, one pointing at a laptop screen
while the other listens, seen from across the table.

[…style block verbatim…]

ASPECT RATIO — 5:3
```

Note what the subject lines do NOT say: nothing about lighting, mood, palette,
plants or props. That is all in the style block. If you find yourself writing
"warm" or "natural light" in the subject line, delete it — you are competing
with the block.

---

## 6. Accept / reject checklist

Run this before the image goes anywhere near the site. Three or more failures
and it is off-brand; regenerate rather than retouch.

- [ ] At least one live plant, and it is doing compositional work
- [ ] Light is directional and leaves a legible shadow shape
- [ ] Grade is warm; greens are muted, not vivid
- [ ] Nobody is looking at the camera; nobody is posed
- [ ] Wardrobe is warm neutral; no suits, no logos
- [ ] Coffee or a warm ceramic object is present
- [ ] Depth of field is shallow; the background is not fully sharp
- [ ] No teal-and-orange grade, no lens flare, no vignette
- [ ] Hands are correct — count fingers, check the mug handle and pen
- [ ] Any on-screen UI is plausible; no garbled text
- [ ] It sits comfortably beside the existing images in `final-images/`

⚠ The last two are where generated images fail most often and are hardest to
spot on your own screen. Put the candidate next to two shipped images at the
same size before deciding.

---

## 7. Where this lives, and what is still open

This file is the reasoning. The reference frames are the truth — if the two ever
disagree, the frames win and this file should be re-derived from them.

**Keep the reference set small and curated.** Seven frames is about right. The
moment it grows to thirty, the style stops being describable and the attach-two
or-three method stops working.

⚠ **Open: no portrait references for the testimonial slot.** The site's
`Testimonial` component now carries a 40×40 circular portrait and there is no
photograph anywhere in `public/images` to fill it. A headshot is a different
brief from everything above — tight crop, no props, no room for plants — and the
seven references say nothing useful about it. That style needs establishing
before those circles are filled, and this document should gain a section when it
is.

⚠ **Open: no references with more than one person interacting.** The nearest is
the café frame, where the background figures are strangers at soft focus. A
genuine two-person working shot — which §5's second example asks for — is an
extrapolation, not something the set demonstrates. Generate one, agree it, and
add it to the reference folder.
