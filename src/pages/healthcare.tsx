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
import {
  ADOPTION_BODY,
  AUDIT_BODY,
  AUDIT_POINTS,
  BLOCKED_REVIEW_BODY,
  DILIGENCE_BODY,
  DILIGENCE_POINTS,
  INDUSTRY_STEPS,
  MANDATE_BODY,
  MANDATE_POINTS,
  OPERATING_MODEL_POINTS,
  POST_CLOSE_BODY,
  POST_CLOSE_POINTS,
  SOVEREIGN_FAQ,
  SOVEREIGN_POINTS,
} from './industry-content'

/**
 * Healthcare & Life Sciences — Figma node 3149:12091
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3149-12091
 *
 * The only industry page with no mirrored "What can AI do for…" split: the
 * Sovereign AI block carries that slot instead, and it sits before the stat
 * band rather than after it.
 */

/** b8 mirrored — node 3614:5645, style "Type B BG 8" inside a horizontal flip. */
const HERO_GRADIENT = `linear-gradient(129.39deg, ${gradients.b8Stops})`

const PROFILES = [
  {
    title: 'Mid-market providers and clinic groups',
    points: MANDATE_POINTS,
    body: MANDATE_BODY,
    roles: ['CTO', 'COO', 'CISO', 'Privacy Officer', 'VP Operations'],
  },
  {
    title: 'Behavioral health and specialty networks',
    points: SOVEREIGN_POINTS,
    body: BLOCKED_REVIEW_BODY,
    roles: ['CISO', 'COO', 'CTO', 'Privacy Officer', 'VP Operations'],
  },
  {
    title: 'Payers & TPAs',
    points: DILIGENCE_POINTS,
    body: DILIGENCE_BODY,
    roles: ['CTO', 'COO', 'CISO', 'Privacy Officer', 'VP Operations'],
  },
  {
    title: 'Revenue-cycle vendors',
    points: POST_CLOSE_POINTS,
    body: POST_CLOSE_BODY,
    roles: ['CTO', 'COO', 'CISO', 'Privacy Officer', 'VP Operations'],
  },
  {
    title: 'Digital-health ISVs',
    points: AUDIT_POINTS,
    body: AUDIT_BODY,
    roles: ['CTO', 'COO', 'CISO', 'Privacy Officer', 'VP Operations'],
  },
  {
    title: 'Life-sciences and device companies scaling a platform',
    points: OPERATING_MODEL_POINTS,
    body: ADOPTION_BODY,
    roles: ['CTO', 'COO', 'CISO', 'Privacy Officer', 'VP Operations'],
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
      'With a Framing Workshop, then the four stages: Framing & Discovery, Solution Design, Implementation, and Launch & Support, with your privacy officer in the room from the first architecture session. Placeholder copy pending final wording.',
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
        heading="AI for Healthcare & Life Sciences"
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
        eyebrow="Our Specialty"
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
        heading="MatchDay Health"
        claim="3 agents, +20% conversion, 16 weeks to production"
        image="/images/services/product-featured.jpg"
      />
    </ContentPage>
  )
}

export default HealthcarePage
