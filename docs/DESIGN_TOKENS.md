# Design Tokens — moved

The token reference now lives in **[BRAND-GUIDELINES.md](../BRAND-GUIDELINES.md)**,
§2 *Design Tokens*, which is the single source of truth for documentation.

`src/tokens/index.ts` remains the source of truth for the **values themselves**.
The guidelines mirror it; the code wins.

## Why this file was retired

It had drifted from the code, which is the failure mode a second reference
document invites. At the point of consolidation it was wrong or incomplete on:

- `typography.tag` line height — documented 1.5, actually **1.333**. The
  artboards draw the pill 24px tall over a 16px line box; at 1.5 the box is 18
  and the pill 26, which was the residual +2px per tag row.
- `typography.navPanelLink` and `typography.numeral` — missing from the scale.
- `unmapped.footerGround` — missing.
- Motion — `reveal.stagger` documented .08s, actually **.14s**; `duration.slow`,
  `duration.reveal` and `duration.marqueeSlow` missing; `easing.scroll` missing.
- Spacing — `5xl` and `logoGap` missing.
- Semantic colour — `accentDeep`, `chipAccent`, `chipLight`, `scrimStrong`,
  `accentSoft`, `accentSoftOnDark` and the whole `feedback` group missing.
- `gradients.service` — the three service-page grounds missing entirely.

Everything it held that the code does not — the Figma board node IDs, the
gradient angles and stop lists, and the reasons behind the off-board values —
was carried across before this file was reduced.
