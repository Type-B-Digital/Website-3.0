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
  BLOCKED_REVIEW_BODY,
  INDUSTRY_STEPS,
  MANDATE_BODY,
  MANDATE_POINTS,
  OPERATING_MODEL_POINTS,
  SOVEREIGN_FAQ,
  SOVEREIGN_POINTS,
} from './industry-content'

/**
 * Financial Services & Insurance — Figma node 3162:283
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3162-283
 *
 * The first industry sub-page, and the one the artboard draws in full. Nine of
 * its twelve sections already existed for the service pages; the three it
 * introduces (the hero band, the statement, the stat band) live in
 * `components/sections/industry.tsx`.
 *
 * Two things differ from a service page and are why `ContentPage` took props:
 * the body ground is flat cream rather than the vertical gradient — the hero
 * band carries all the colour — and there is no testimonial.
 */

/**
 * b7 mirrored. See `gradients.b7Stops`: the artboard's rect is the named style
 * "Type B BG 7" inside a horizontal flip, so the angle is 360 - 50.68.
 */
const HERO_GRADIENT = `linear-gradient(309.32deg, ${gradients.b7Stops})`

const PROFILES = [
  {
    title: 'Payments and payroll platforms',
    points: MANDATE_POINTS,
    body: MANDATE_BODY,
    roles: ['CTO', 'COO', 'CFO', 'CISO', 'Head of Claims', 'Compliance Officer'],
  },
  {
    title: 'Wealth and advisory firms',
    points: SOVEREIGN_POINTS,
    body: BLOCKED_REVIEW_BODY,
    roles: ['CTO', 'COO', 'CFO', 'CISO', 'Head of Claims', 'Compliance Officer'],
  },
  {
    title: 'Mid-market insurers and MGAs',
    points: MANDATE_POINTS,
    body: MANDATE_BODY,
    roles: ['CTO', 'COO', 'CFO', 'CISO', 'Head of Claims', 'Compliance Officer'],
  },
  {
    title: 'Claims and revenue-cycle operators',
    points: MANDATE_POINTS,
    body: MANDATE_BODY,
    roles: ['CTO', 'COO', 'CFO', 'CISO', 'Head of Claims', 'Compliance Officer'],
  },
  {
    title: 'Regtech and compliance ISVs',
    points: MANDATE_POINTS,
    body: MANDATE_BODY,
    roles: ['CTO', 'COO', 'CFO', 'CISO', 'Head of Claims', 'Compliance Officer'],
  },
  {
    title: 'Investment platforms with securities exposure',
    points: OPERATING_MODEL_POINTS,
    body: ADOPTION_BODY,
    roles: ['CTO', 'COO', 'CFO', 'CISO', 'Head of Claims', 'Compliance Officer'],
  },
]

/** Six rows, two of which wrap to a second line — node 3614:6736. */
const LEVELS = [
  { number: '01', label: 'Servicing and onboarding agents' },
  { number: '02', label: 'Autonomous reconciliation and status agents' },
  { number: '03', label: 'Claims and underwriting workflow automation' },
  { number: '04', label: 'Document AI for claims, KYC, and statements' },
  { number: '05', label: 'Fraud and risk analytics with lineage' },
  { number: '06', label: 'Grounded search over policy and regulatory material' },
]

/** Node 3614:6905. Two of the three groups are drawn; the third is hidden. */
const STATS = [
  {
    value: '4.8',
    body: 'Type B rebuilt Ferry Pay’s platform and the app rating rose from 2.0 to 4.8 while support contacts fell from 60% of customers to 4%.',
  },
  {
    value: '60+',
    body: 'RFL Wealth consolidated seven tools into one custom CRM and saves 60+ hours per client.',
  },
]

/** ⚠ Answers are placeholders — the artboard draws every row collapsed. */
const FAQ = [
  {
    question: 'Can AI decisions be explained to a financial regulator?',
    answer:
      'That is the constraint we design to first: lineage, versioning, evals, and a human gate on anything consequential. We do not automate a decision we cannot explain, and the evidence pack is a deliverable, not an afterthought. Placeholder copy pending final wording.',
  },
  {
    question: 'Do you work with insurers or just fintechs?',
    answer:
      'Both, and the overlap is larger than it looks: claims, underwriting, onboarding, reconciliation and reporting are the same document-heavy, error-intolerant workflows whichever side of the industry you sit on. Placeholder copy pending final wording.',
  },
  {
    question: 'Can you modernize a legacy platform without interrupting operations?',
    answer:
      'Yes — audit first, then a governed rebuild phased so the book keeps running. That sequencing is the whole point; a rewrite that pauses the business is not a modernization. Placeholder copy pending final wording.',
  },
  {
    question: 'How do engagements start?',
    answer:
      'With a Framing Workshop, then the four stages: Framing & Discovery, Solution Design, Implementation, and Launch & Support, with weekly written status throughout. Placeholder copy pending final wording.',
  },
  {
    question: 'What results have you delivered in financial services?',
    answer:
      'Ferry Pay’s app rating rose from 2.0 to 4.8 with support contacts down to 4% of customers, and RFL Wealth consolidated seven tools into one CRM saving 60+ hours per client. Placeholder copy pending final wording.',
  },
  SOVEREIGN_FAQ,
]

export function FinancialServicesPage() {
  return (
    <ContentPage faq={FAQ} ground={{ backgroundColor: colorTokens.background.surface }}>
      <IndustryHero
        heading="AI for Financial Services & Insurance"
        body="Type B builds AI systems and platforms for fintech, wealth management, and insurance companies, with auditable, data lineage, and regulatory conformance designed in from the first architecture session."
        gradient={HERO_GRADIENT}
      />

      <Statement>
        The reality you operate in. Money movement means regulators, auditors, and security reviews
        on everything you ship. The workflows with the most leverage (claims, underwriting,
        onboarding, reconciliation, reporting) are document-heavy and error-intolerant. Fraud, risk,
        and compliance lead every AI priority list in financial services, and a black-box model
        fails all three tests at once.
      </Statement>

      <IdealCustomerProfiles profiles={PROFILES} />

      <LevelsList
        heading="How we frame financial services"
        image="/images/services/product.png"
        levels={LEVELS}
      />

      <EngagementSteps heading="How we work here" steps={INDUSTRY_STEPS} />

      <SplitFeature
        reverse
        headingLevel="h2"
        heading="What can AI do for a mid-market insurer?"
        body="Claims and underwriting run on documents, and document AI is where the ROI is most obvious: intake, extraction, matching, and exception routing, with adjusters and underwriters handling judgment instead of data entry. Legacy policy systems get modernized the way we rebuild any platform: audit first, then a governed rebuild that never interrupts the book."
        image="/images/services/product-featured.jpg"
      />

      <StatBand heading="Why Type B fits here" stats={STATS} />

      <SplitFeature
        eyebrow="Our Specialty"
        heading="Applied to your needs"
        claim="Simply, good AI on your cloud."
        body="When a regulator, a residency clause, or a client contract dictates where the data may live, we build it sovereign, and that is our specialty: canonical definition, plus mapping to GLBA, PCI, SOC 2, and provincial privacy regimes, plus the evidence pack."
        image="/images/services/product-hero.jpg"
      />

      <Packaging tiers={TIERS} />

      {/*
        ⚠ The artboard's Related row is the service pages' row verbatim and
        lists Financial Services & Insurance — this page — as its third card.
        Swapped for Advisory, as on the Product page.
      */}
      <RelatedServices
        services={related(
          ['product', 'We build the agents, products, and governance around them.'],
          ['teams', 'We embed senior pods managed by us, in weeks.'],
          ['advisory', 'The diligence and the roadmap before anyone writes code.'],
        )}
      />

      <SplitFeature
        eyebrow="Featured"
        heading="Ferry Pay"
        claim="Daily payout on autopilot mode."
        body="We embedded a managed team, scaled engineering from two people to ten with playbooks and QA cycles, re-architected the platform, overhauled the UX, and launched the payroll product within six months. Infrastructure cost fell 43%, database queries went from 300ms to 80ms, the app rating climbed to 4.8, and support contacts fell to 4%. Partnering since 2023."
        image="/images/services/product-featured.jpg"
      />
    </ContentPage>
  )
}

export default FinancialServicesPage
