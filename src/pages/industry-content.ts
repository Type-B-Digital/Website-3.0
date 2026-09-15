import type { EngagementStep } from '@/components/sections'

/**
 * Copy the five industry sub-pages share verbatim.
 *
 * Figma: nodes 3614:6771 (Financial Services), 3614:5941 (Healthcare),
 * 3614:7321 (Real Estate), 3614:7752 (Manufacturing), 3614:8798 (Legal) — the
 * four-stage row is byte-identical on all five artboards.
 *
 * The artboards' Ideal Customer Profile blocks are largely identical too, and
 * used to be shared from here. They are not any more — see the note below.
 */

/** The four stages, identical on every industry artboard. */
export const INDUSTRY_STEPS: readonly EngagementStep[] = [
  {
    number: '01',
    title: 'Framing & Discovery',
    body: 'Data estate, workflows, shadow-AI audit, control gaps.',
  },
  {
    number: '02',
    title: 'Solution Design',
    body: 'Architecture triage across standard cloud and sovereign, sequencing, effort.',
  },
  {
    number: '03',
    title: 'Implementation',
    body: 'Where we execute, governed delivery with weekly written status.',
  },
  {
    number: '04',
    title: 'Launch & Support',
    body: 'Adoption, PMO cadence, the evidence pack.',
  },
]

/* ------------------------------------------------------------------ *
 * ⚠ THE IDEAL CUSTOMER PROFILE FRAGMENTS ARE GONE — 2026-09-15
 *
 * Six capability lists (MANDATE_POINTS, SOVEREIGN_POINTS, DILIGENCE_POINTS,
 * POST_CLOSE_POINTS, AUDIT_POINTS, OPERATING_MODEL_POINTS) and six situation
 * paragraphs used to live here, and all five industry pages composed their
 * profiles out of them. That was faithful to the artboards — they genuinely do
 * reuse the same blocks, the "AI mandate" one eleven times between them — and
 * it is what Nabeel is describing on 2026-09-15: the Ideal Customer Profile
 * sections "currently feel repetitive and in some cases unrelated".
 *
 * It was worse than repetitive. Legal and Real Estate rendered the SAME block
 * six times, differing only in the title above it, so both pages told a reader
 * that Type B does exactly one thing for six different kinds of client. Real
 * Estate listed "Head of Claims" as a buyer on five of its six profiles, which
 * is an insurance role that arrived by copy-paste from Financial Services.
 *
 * Sharing was the mechanism that produced it, so the sharing is what went.
 * Each page now writes its own six profiles against its own regulators, its own
 * document types, and its own buying committee. There is more prose in the five
 * page files as a result, and that is the point: nothing is reusable here
 * because nothing should be.
 *
 * INDUSTRY_STEPS below is still shared. The four-stage engagement process is
 * byte-identical on all five artboards because it genuinely is the same
 * process, and a reader comparing two industry pages is meant to see that.
 * ------------------------------------------------------------------ */

/**
 * The last FAQ row on every industry artboard. The answer is the same call the
 * roadmap makes, so it is written once.
 */
export const SOVEREIGN_FAQ = {
  question: 'Do we need Sovereign AI or regular AI?',
  answer:
    'Most use cases land on standard cloud AI, which is faster and cheaper. Sovereign is for when a regulator, a residency clause, or a client contract dictates where the data may live. Telling those apart is itself a deliverable, and it is where most AI budgets are quietly wasted. Placeholder copy pending final wording.',
} as const
