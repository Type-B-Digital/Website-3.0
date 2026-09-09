# Type B Digital — Staging

Homepage v1 plus the design-token system and component library that the
remaining 19 pages are meant to be built on.

Personal staging repo — **not** the client handoff repo.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build
npm run typecheck
```

Requires Node 18+. This machine runs 24.20.0 LTS from `~/.local/lib/nodejs`.

## Layout

```
src/
  tokens/index.ts          source of truth for every visual value
  styles/
    globals.css            CSS custom properties + mood layer
    tailwind.config.ts     Tailwind theme, generated from tokens
  components/              10 components, all token-driven
  pages/index.tsx          the homepage
  lib/cn.ts
public/                    icons + imagery exported from Figma
docs/                      see below
```

## Docs

| | |
|---|---|
| [BRAND-GUIDELINES.md](BRAND-GUIDELINES.md) | **The design system.** Brand foundations, every token, the component inventory, layout patterns |
| [BUILD_LOG.md](docs/BUILD_LOG.md) | Design→code decisions, deviations, open questions |
| [SCALING_GUIDE.md](docs/SCALING_GUIDE.md) | **Read before building page two** |

## Design source

[TypeB Creative Exploration](https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration)
· tokens `3366:23051` · homepage `2761:1214`

Mood shipped: `deep` (turquoise). `ember` and `solar` are extracted and switch
via `data-mood` on `<html>`.

## Known gaps

The Figma file has **no breakpoints and no motion tokens** — responsive
behaviour below 1280px and all animation timing are engineering proposals
awaiting design sign-off. Seven inconsistencies in the design file are logged in
BUILD_LOG.
