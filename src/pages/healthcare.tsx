import {
  ContentPage,
  EngagementSteps,
  IdealCustomerProfiles,
  IndustryHero,
  LevelsList,
  Packaging,
  RelatedServices,
  SplitFeature,
  StatBand,
  Statement,
} from '@/components/sections'
import { colors as colorTokens, gradients } from '@/tokens'
import { TIERS, related } from './service-content'
import { INDUSTRY_STEPS, SOVEREIGN_FAQ } from './industry-content'

/**
 * Healthcare & Life Sciences — Figma node 3149:12091
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3149-12091
 *
 * The only industry page with no mirrored "What can AI do for…" split: the
 * Sovereign AI block carries that slot instead, and it sits before the stat
 * band rather than after it.
 */

/** b8 mirrored — node 3614:5645, style "Type B BG 8" inside a horizontal flip. */
const HERO_GRADIENT = gradients.hero.healthcare

/**
 * Ideal Customer Profiles — Figma node 3614:5941.
 *
 * ⚠ REWRITTEN 2026-09-15. These were six composites of the shared fragments in
 * industry-content.ts: four of the six situation paragraphs were about PE
 * diligence, portfolio integration, and contested architecture decisions, which
 * are Advisory's profiles rather than healthcare's. A payer reading its own row
 * was told about a deal team's problem.
 *
 * The rewrite is aimed at AEO/GEO as much as at a reader. Three things drive
 * that, and they are the same three on all five industry pages:
 *
 * - **Name the regulation, not "compliance".** HIPAA, 42 CFR Part 2, HITRUST,
 *   GxP. An answer engine matches a question about Part 2 to the page that says
 *   "Part 2"; it cannot match it to "regulated data".
 * - **One extractable claim per block.** Each body states a specific situation
 *   that can be lifted whole and still be true and attributable, rather than
 *   building to a claim across three sentences.
 * - **Six genuinely different rows.** A page that says one thing six times
 *   gives a model one thing to retrieve. These share no sentence and no
 *   capability line.
 *
 * Roles are the actual buying committee per segment — a Chief Medical
 * Information Officer signs for a provider group and has nothing to do with a
 * device manufacturer, where it is Quality and Regulatory.
 */
const PROFILES = [
  {
    title: 'Mid-market providers and clinic groups',
    points: [
      'HIPAA-ready AI roadmap',
      'Use-case scoring against PHI exposure',
      'AI governance and acceptable-use policy',
      'Transformation PMO',
    ],
    body: 'The board has asked what you are doing about AI, and whatever you answer has to survive your privacy officer. We score the use cases against PHI exposure first, so the roadmap you present is one compliance has already signed.',
    roles: ['CTO', 'COO', 'Chief Medical Information Officer', 'Privacy Officer'],
  },
  {
    title: 'Behavioral health and specialty networks',
    points: [
      '42 CFR Part 2 and HIPAA data-flow mapping',
      'Shadow-AI audit',
      'Consent and minimum-necessary controls',
      'Architecture triage',
    ],
    body: '42 CFR Part 2 is stricter than HIPAA and almost no AI tooling has heard of it. Meanwhile your clinicians are pasting notes into consumer chatbots to get through the day. We find where that is happening and give you something governed to replace it.',
    roles: ['CISO', 'Privacy Officer', 'VP Clinical Operations', 'General Counsel'],
  },
  {
    title: 'Payers and TPAs',
    points: [
      'Claims and prior-authorization document AI',
      'Exception routing',
      'Human-in-the-loop review design',
      'Analytics with lineage',
    ],
    body: 'Prior auth and claims intake run on volume, which is exactly why the error tolerance is low and the audit trail is not optional. We design the exception path before the happy path, because the exception path is the one a regulator reads.',
    roles: ['VP Operations', 'Head of Claims', 'CTO', 'Compliance Officer'],
  },
  {
    title: 'Revenue-cycle vendors',
    points: [
      'Denial-pattern analytics',
      'Coding and documentation AI',
      'Payer-rule change monitoring',
      'Clearinghouse and EHR integration',
    ],
    body: 'Your margin is the gap between what you collect and what it costs to collect it, and both sides of that are now automatable. The constraint is proving to a health-system client that the automation is safe enough to point at their AR.',
    roles: ['CEO', 'COO', 'VP Revenue Cycle', 'CTO'],
  },
  {
    title: 'Digital-health ISVs',
    points: [
      'Architecture and scalability audit',
      'SOC 2 and HITRUST readiness',
      'Governed model gateway and guardrails',
      'Build-vs-buy analysis',
    ],
    body: 'Enterprise health systems are asking security questions your architecture cannot answer yet, and a signed deal is waiting behind them. You want a senior, neutral read before you commit the quarter to rebuilding the wrong layer.',
    roles: ['CTO', 'VP Engineering', 'Head of Security', 'Founder'],
  },
  {
    title: 'Life-sciences and device companies scaling a platform',
    points: [
      'Validated-system delivery under GxP',
      'Change management and SOP design',
      'Operating model design',
      'Fractional Head of AI',
    ],
    body: 'Regulated device and pharma software has to be validated, not merely tested, and your team has never run a change process that produces that evidence as a by-product. Adoption is the gap here, not the model.',
    roles: ['CTO', 'VP Quality', 'Head of Regulatory Affairs', 'COO'],
  },
]

/** Node 3614:5793. Five of the six labels wrap to a second line. */
const LEVELS = [
  {
    number: '01',
    label: 'Conversational agents for patient and professional onboarding (MatchDay)',
  },
  { number: '02', label: 'Autonomous agents for eligibility and status checks' },
  { number: '03', label: 'Workflow automation across intake and credentialing' },
  { number: '04', label: 'Document AI for prior auth, claims, and records' },
  { number: '05', label: 'Analytics with lineage for utilization and risk' },
  { number: '06', label: 'Grounded search over your own policies and protocols' },
]

/** Node 3614:5971. */
const STATS = [
  {
    value: '500,000',
    body: 'Sensor Bio’s medical-grade wearable platform was re-architected to support 500k users without disrupting the base.',
  },
  {
    value: '20%',
    body: 'MatchDay Health runs three Type B conversational agents in production and conversion rose 20% within 16 weeks.',
  },
]

/** ⚠ Answers are placeholders — the artboard draws every row collapsed. */
const FAQ = [
  {
    question: 'Can we use AI on patient data?',
    answer:
      'Yes, with the right agreement in place and the right architecture around it. PHI never leaves your tenancy, nothing trains a third-party model, and every output is traceable. Placeholder copy pending final wording.',
  },
  {
    question: 'Do you sign BAAs?',
    answer:
      'Yes. We treat PHI constraints as design inputs from day one rather than review-stage surprises, and the paperwork is part of that. Placeholder copy pending final wording.',
  },
  {
    question: 'Are you HIPAA certified? (No one is; HIPAA has no certification.)',
    answer:
      'There is no such certification to hold. We warrant conformance to the controls we agree in writing, and your compliance officer owns the compliance determination. Placeholder copy pending final wording.',
  },
  {
    question: 'How do you start a healthcare engagement?',
    answer:
      'With a Framing Workshop, then the four stages: Framing & discovery, Solution design, Implementation, and Launch & support, with your privacy officer in the room from the first architecture session. Placeholder copy pending final wording.',
  },
  {
    question: 'Who in healthcare do you work with?',
    answer:
      'Mid-market providers and clinic groups, payers and revenue-cycle vendors, behavioral health and specialty networks, digital-health ISVs, and life-sciences and device companies. Placeholder copy pending final wording.',
  },
  SOVEREIGN_FAQ,
]

export function HealthcarePage() {
  return (
    <ContentPage faq={FAQ} ground={{ backgroundColor: colorTokens.background.surface }}>
      <IndustryHero
        heading="AI for healthcare & life sciences"
        body="Type B builds AI and software for mid-market healthcare organizations, providers and clinic groups, payers and revenue-cycle vendors, and digital-health companies, with PHI constraints treated as design inputs from day one, not review-stage surprises."
        gradient={HERO_GRADIENT}
      />

      <Statement>
        Your teams see the same demos everyone else sees, and your privacy officer is right to block
        most of them. PHI cannot touch a model without the right agreement in place, every
        consequential decision needs a human and an audit trail, and the workflows with the most to
        gain (prior authorization, claims, intake, credentialing) are exactly the ones drowning in
        documents.
      </Statement>

      <IdealCustomerProfiles profiles={PROFILES} />

      <LevelsList
        heading="How we frame healthcare"
        image="/images/services/product.png"
        levels={LEVELS}
      />

      <EngagementSteps heading="How we work here" steps={INDUSTRY_STEPS} />

      <SplitFeature
        eyebrow="Our specialty"
        heading="Applied to your needs"
        claim="Simply, good AI on your cloud."
        body="Scheduling agents, internal search, analytics. When PHI is in the pipeline, we build it sovereign, and that is our specialty. Sovereign AI is AI that runs inside your organization’s boundary: your jurisdiction, your cloud or data center, your controls, with a full audit trail and no dependency on someone else’s black box. In healthcare that means PHI never leaves your tenancy, nothing trains a third-party model, and every output is traceable. We warrant conformance to the controls we agree in writing; your compliance officer owns the compliance determination."
        image="/images/services/product-hero.jpg"
      />

      <StatBand heading="Why Type B fits here" stats={STATS} />

      <Packaging tiers={TIERS} />

      {/* The artboard draws only two cards here — nodes 3614:6063 / 6068. */}
      <RelatedServices
        services={related(
          ['advisory', 'Fractional leadership and the roadmap the pod executes against.'],
          ['product', 'We build the agents, products, and governance around them.'],
        )}
      />

      {/* ⚠ Claim only — the artboard draws no paragraph under it (3614:5893). */}
      <SplitFeature
        eyebrow="Featured"
        headingLevel="h2"
        heading="MatchDay Health"
        claim="3 agents, +20% conversion, 16 weeks to production"
        image="/images/services/product-featured.jpg"
      />
    </ContentPage>
  )
}

export default HealthcarePage
