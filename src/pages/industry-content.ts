import type { EngagementStep } from '@/components/sections'

/**
 * Copy the five industry sub-pages share verbatim.
 *
 * Figma: nodes 3614:6771 (Financial Services), 3614:5941 (Healthcare),
 * 3614:7321 (Real Estate), 3614:7752 (Manufacturing), 3614:8798 (Legal) — the
 * four-stage row is byte-identical on all five artboards, and so are several
 * of the Ideal Customer Profile blocks.
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
 * Ideal Customer Profile fragments
 *
 * The artboards reuse four capability lists and three situation paragraphs
 * across all five industries — the "AI mandate" block appears eleven times
 * between them. Named here so a page file carries only what is actually its
 * own, and so a copy edit lands everywhere at once.
 * ------------------------------------------------------------------ */

export const MANDATE_POINTS = [
  'AI strategy and roadmap',
  'Use-case scoring',
  'AI governance and policy',
  'Transformation PMO',
] as const

export const SOVEREIGN_POINTS = [
  'Sovereign readiness review',
  'Data-estate and control gap assessment',
  'Shadow-AI audit',
  'Architecture triage',
] as const

export const DILIGENCE_POINTS = [
  'Technology due diligence',
  'Code and architecture review',
  'Team and key-person risk',
  'AI exposure assessment',
] as const

export const POST_CLOSE_POINTS = [
  '90-day roadmap',
  'Integration Planning',
  'Modernization Sequencing',
  'Fractional technology leadership',
] as const

export const AUDIT_POINTS = [
  'Architecture audit',
  'Modernization roadmap',
  'Build-vs-buy analysis',
  'Delivery maturity review',
] as const

export const OPERATING_MODEL_POINTS = [
  'Transformation PMO',
  'Change Management',
  'Operating Model Design',
  'Fractional Head of AI',
] as const

/** The situation paragraphs, each of which recurs verbatim. */
export const MANDATE_BODY =
  'The board or the regulator has asked for an AI plan and nobody internally owns it yet. You need a roadmap your compliance officer can sign, not a vendor demo.'

/**
 * ⚠ Three artboards write this one without the second "the" ("The board or
 * regulator"). Normalised to the majority reading.
 */
export const BLOCKED_REVIEW_BODY =
  'The use case was obvious, the tool was ready, and your security team said no. They were right. We start with them in the room; not sell around them.'

export const DILIGENCE_BODY =
  'You need an independent read on the target’s technology, team, and cost before you sign, written by engineers who read the code, delivered in deal time.'

export const POST_CLOSE_BODY =
  'The deal closed and the diligence findings need to become a plan someone executes. Most providers hand you a report and leave.'

export const AUDIT_BODY =
  'The platform is slowing down, the architecture decisions are contested, or engineering leadership just left. You want a senior, neutral read before committing budget.'

export const ADOPTION_BODY =
  'Adoption is the gap. You need documented requirements, a decision log, weekly written status, and someone accountable for the change actually landing.'

/**
 * The last FAQ row on every industry artboard. The answer is the same call the
 * roadmap makes, so it is written once.
 */
export const SOVEREIGN_FAQ = {
  question: 'Do we need Sovereign AI or regular AI?',
  answer:
    'Most use cases land on standard cloud AI, which is faster and cheaper. Sovereign is for when a regulator, a residency clause, or a client contract dictates where the data may live. Telling those apart is itself a deliverable, and it is where most AI budgets are quietly wasted. Placeholder copy pending final wording.',
} as const
