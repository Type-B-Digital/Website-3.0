# Component Library — moved

The component reference now lives in
**[BRAND-GUIDELINES.md](../BRAND-GUIDELINES.md)**, §3 *Component Inventory* and
§5 *Atomic Design Map*, which is the single source of truth for documentation.

The components themselves are the source of truth for their **props**. Every
one carries its Figma node and its reasoning in a header comment.

## Why this file was retired

Same reason as `DESIGN_TOKENS.md`: it had drifted. At the point of
consolidation it was wrong or incomplete on:

- "Ten components in `src/components/`" — there are **thirty-eight** across
  `components/`, `components/layout/` and `components/sections/`.
- `Section.tone` — documented three tones, actually four (`none` was missing,
  and it is the one most pages use).
- `Eyebrow.tone` — documented two, actually **seven**; and `onLight` is the
  amber chip, not white.
- `Tag` — documented as having "no props beyond `children`", actually carries
  `tone`.
- `Typography` — `navPanelLink` and `numeral` missing from the variant list.
- The whole section library (`sections/`), the templates (`PageShell`,
  `ContentPage`, `CaseStudyPage`) and the layout organisms were absent.

The usage rules and per-component states it held were carried across before
this file was reduced.
