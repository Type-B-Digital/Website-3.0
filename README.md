# Type B Digital — Website 3.0

The Type B Digital site: 21 pages built in React and Vite on a design-token
system traced from Figma.

| | |
|---|---|
| **Staging** | <https://type-b-digital.github.io/Website-3.0> — deploys from `staging` on every push |
| **Design source** | [TypeB Creative Exploration](https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration) |
| **Stack** | React 18 · TypeScript 5.5 · Vite 5 · Tailwind 3.4 · Framer Motion 11 |

⚠ **The staging link is public.** GitHub Pages has no access control below
Enterprise Cloud, so anyone with the URL can read it. It is a shareable
preview, not a private one.

This README is for someone at Type B picking the site up for the first time,
including how to drive it with [Claude Code](https://docs.claude.com/en/docs/claude-code)
— which is how it was built and how it is expected to be maintained.

---

## 1. What you need

- **Access to this repository.** Ask an org owner to add you to
  `Type-B-Digital`.
- **Node 20 or newer.** CI builds on 24. `node -v` to check; install from
  [nodejs.org](https://nodejs.org) or via `nvm`.
- **Git**, and a GitHub login on this machine (`gh auth login`, or an SSH key).
- **Claude Code**, if you want to work the way the rest of this file describes.

## 2. Get it running

```bash
git clone https://github.com/Type-B-Digital/Website-3.0.git
cd Website-3.0
git switch staging        # the default branch is main; work happens on staging
npm install
npm run dev               # http://localhost:5173
```

| command | what it does |
|---|---|
| `npm run dev` | dev server with hot reload |
| `npm run typecheck` | `tsc --noEmit` — run this before you commit |
| `npm run build` | typecheck, production build, and copy `index.html` to `404.html` |
| `npm run preview` | serve the production build locally |

It is a static site: no database, no API keys, no `.env`. The one environment
variable is `BASE_PATH`, which CI sets so asset URLs carry the `/Website-3.0/`
prefix Pages serves from; locally it is unset and the site serves from `/`.

## 3. Connect Claude Code

```bash
npm install -g @anthropic-ai/claude-code
cd Website-3.0
claude
```

On first run, `/login` connects your Claude account (a Claude subscription or
an Anthropic Console account with billing). `/help` lists everything else.

Claude Code works in the directory you start it in, so **start it inside the
repo** — that is what gives it the code, the docs and the git history.

### Ask it to read the docs first

A new session knows nothing about how this site is put together. Before asking
for a change, give it the map:

> Read README.md, BRAND-GUIDELINES.md and docs/SCALING_GUIDE.md, then skim
> docs/BUILD_LOG.md for anything about the part of the site I'm changing.
> Follow the conventions you find there.

Add `BRAND-IMAGERY.md` to that list if the change involves photography — it is
the house style for the images themselves, and the prompt kit for generating
new ones.

`docs/BUILD_LOG.md` is long (4,000 lines) and worth pointing at specifically
rather than in full — "read what BUILD_LOG says about the footer" is a better
instruction than "read BUILD_LOG".

### What a good instruction looks like

The site is traced from Figma, so the strongest instructions carry a source.
Real examples from the build, in the words that produced them:

> Update the Global by design section so that the background is a top #040E19
> to bottom #081F2A gradient (like the footer gradient minus the glow).

> Work on the mobile navigation. Use this figma artboard to size things exactly
> as they are designed. *[Figma link, plus a screenshot of the frame]*

> The small tablet and mobile footer needs to resize the word Type B Digital at
> the bottom so it fills the width of the screen.

A Figma link or a screenshot pasted into the prompt is worth a paragraph of
description. Where neither exists, say so — "there's no artboard for this, use
your judgement" — and it will be built as an inference and labelled as one.

### Things worth knowing

- **It asks before it acts.** Editing files, running commands and pushing all
  prompt for permission the first time. Read what it is about to do.
- **Run your own commands with `!`.** Typing `!git log --oneline -5` in the
  Claude prompt runs it in the session, so the output lands in the
  conversation. Use it for anything interactive, like `gh auth login`.
- **It can drive a browser.** Verification in this repo is done by driving real
  Chrome over the DevTools protocol — see *Verify it* below. Ask for it:
  "screenshot the footer at 360 and 1440 and check it against the artboard".
- **Check its work.** It reports what it did and what it skipped. Read the diff
  (`git diff`), open the page in the dev server, and push only what you have
  looked at.

## 4. How work is done here

These are the conventions the whole codebase already follows. Keeping to them
is what stops the next person having to reverse-engineer a decision.

**Trace to the design.** Every page and component carries its Figma node ID in
a header comment, as a link. If you build something the file does not draw,
say so in the comment with a ⚠ and why.

**Tokens are the source of truth.** `src/tokens/index.ts` holds every colour,
size, space and duration; Tailwind's theme is generated from it. Reach for
`text-copy-large` and `gap-xl`, not `text-[20px]` and `gap-[32px]`. A value
that genuinely is not on the scale gets an inline comment explaining why.

**Comments carry the why, not the what.** The code says what it does. The
comment says which artboard it came from, what was measured, and what was
decided against. Deviations from Figma are marked ⚠ so they can be found.

**Log the change.** Append to `docs/BUILD_LOG.md`: the instruction, what was
done, anything that departed from the design, and how it was verified. That
file is the reason a decision from three months ago can still be explained.

**One change, one commit.** Focused commits with a subject line that reads as a
sentence, and a body explaining the reasoning. `git log` is part of the
documentation.

### Verify it

```bash
npm run typecheck && npm run build     # both must be clean
```

Screenshots alone cannot check scroll-linked motion — under headless Chrome
with a virtual time budget, Framer Motion's `useScroll` never fires. Real input
over the DevTools protocol is the way, and `scripts/scroll-verify.mjs` is the
worked example:

```bash
npm run dev
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars \
  --remote-debugging-port=9222 --window-size=1440,900 \
  --user-data-dir=/tmp/chrome-verify http://localhost:5173/ &
node scripts/scroll-verify.mjs ./out 1050 1400 1750 2100
```

## 5. Ship it

```bash
git add -A
git commit -m "..."
git push                  # staging -> the staging site
```

Pushing to `staging` runs **Deploy staging site**
(`.github/workflows/deploy-pages.yml`): it builds and publishes to GitHub
Pages, and takes about a minute. Watch it with `gh run watch`, or on the
Actions tab.

**`main` is the release branch and does not deploy.** Releasing to it is
deliberate and spelled out:

```bash
git push origin staging:main
```

(That assumes a fresh clone of this repository, where `origin` is it. Check
with `git remote -v` if you cloned from somewhere else.)

⚠ **`main` has no branch protection** — the org plan does not offer it for this
repository. Nothing on the server stops a push to `main`, so treat it as a
release gate you keep by hand.

⚠ **Deep links return HTTP 404 with the right page.** Pages serves a copy of
`index.html` as `404.html`, so `/our-work/ferry-pay` renders correctly but the
status line says 404. That is inherent to a single-page app on project Pages.
Navigation inside the site is unaffected.

## 6. The repo

```
src/
  tokens/index.ts          every visual value — colours, type, spacing, motion
  styles/
    globals.css            CSS custom properties, the mood layer, page grain
    tailwind.config.ts     Tailwind theme, generated from the tokens
  components/              30 components
    layout/                SiteHeader, SiteFooter, PageShell, ClosingCta
    sections/              page-level compositions and the page templates
  pages/                   one file per route, plus the shared content files
  main.tsx                 the router — every route is declared here
  lib/
public/                    icons and imagery exported from Figma
docs/                      see below
scripts/                   one-off build and verification tools
.github/workflows/         the Pages deploy
```

**Adding a page** is four steps and a skeleton — `docs/SCALING_GUIDE.md` has
both. The short version: create `src/pages/<name>.tsx` with the Figma node in
its header, compose it from `@/components`, and add the route to
`src/main.tsx`.

**Shared content** lives beside the pages rather than inside them, so two pages
cannot disagree: `work-content.ts` is the case-study list the homepage, Our
Work, the nav and the footer all read; `publications-content.ts`,
`industry-content.ts` and `service-content.ts` do the same for their sections.
Changing the case studies on the site means changing one file.

## 7. Docs

| | |
|---|---|
| [BRAND-GUIDELINES.md](BRAND-GUIDELINES.md) | **The design system.** Brand foundations, every token, the full component inventory, layout patterns |
| [docs/SCALING_GUIDE.md](docs/SCALING_GUIDE.md) | How to add a page, and the rules for composing one |
| [docs/BUILD_LOG.md](docs/BUILD_LOG.md) | Every design→code decision in date order: what was traced, what departed from the file and why, and how it was checked |
| [/brand-guidelines](https://type-b-digital.github.io/Website-3.0/brand-guidelines) | The design system as a page on the site itself, deliberately unlinked from the nav |

`docs/COMPONENT_LIBRARY.md` and `docs/DESIGN_TOKENS.md` are retired stubs
pointing at BRAND-GUIDELINES; they drifted from the code, which is the failure
mode a second reference invites. The components are the source of truth for
their own props, and `src/tokens/index.ts` for the values.

## 8. Known gaps

- **The Figma file is desktop-first.** It has one artboard below 1440 — the
  mobile navigation drawer, node `3973:636`. Everything else about responsive
  behaviour is an engineering proposal awaiting design sign-off, and is marked
  as such in the files it affects.
- **Motion has no tokens in Figma.** Every duration and easing in
  `tokens/index.ts` under `motion` is a proposal.
- **Deviations are logged, not hidden.** Where the build and the artboards
  disagree, `docs/BUILD_LOG.md` says which one is out of date. Several are
  cases where a later instruction overrode the drawing.
- **Two case studies are placeholders.** Pelican and HireNorth appear in the
  nav, the footer, the homepage and Our Work as named rows that do not link,
  because their pages do not exist yet. Ferry Pay and FinTech Group are live.
  All four thumbnails are borrowed art — see the note at the top of
  `src/pages/work-content.ts`.
