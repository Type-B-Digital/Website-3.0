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
import { INDUSTRY_STEPS, MANDATE_BODY, MANDATE_POINTS, SOVEREIGN_FAQ } from './industry-content'

/**
 * Legal & Professional Services — Figma node 3245:17241
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3245-17241
 *
 * ⚠ As on Real Estate, all six profile blocks carry the same capability list,
 * the same situation paragraph, and the same four role chips — only the titles
 * differ. Reproduced as drawn; flagged in docs/BUILD_LOG.md.
 */

/** b6 mirrored — node 3614:8588, style "Type B BG 6" inside a horizontal flip. */
const HERO_GRADIENT = gradients.hero.legal

/** ⚠ "General Council" is the artboard's spelling of General Counsel. */
const ROLES = ['Managing Partner', 'COO', 'General Counsel', 'IT & Security Lead']

const PROFILES = [
  { title: 'Mid-market law firms', points: MANDATE_POINTS, body: MANDATE_BODY, roles: ROLES },
  { title: 'In-house legal departments', points: MANDATE_POINTS, body: MANDATE_BODY, roles: ROLES },
  { title: 'Accounting and audit firms', points: MANDATE_POINTS, body: MANDATE_BODY, roles: ROLES },
  {
    title: 'Consulting and advisory practices',
    points: MANDATE_POINTS,
    body: MANDATE_BODY,
    roles: ROLES,
  },
  { title: 'Legal-tech ISVs', points: MANDATE_POINTS, body: MANDATE_BODY, roles: ROLES },
  {
    title: 'Claims and litigation support operations',
    points: MANDATE_POINTS,
    body: MANDATE_BODY,
    roles: ROLES,
  },
]

/** Node 3614:8763. */
const LEVELS = [
  { number: '01', label: 'Intake and client-query agents behind a review gate' },
  { number: '02', label: 'Autonomous conflicts and docketing checks' },
  { number: '03', label: 'Workflow automation across intake, conflicts, and matter opening' },
  { number: '04', label: 'Document review and extraction with citation checking' },
  { number: '05', label: 'Practice and profitability analytics' },
  { number: '06', label: 'Grounded research over your own precedents and matter files' },
]

/** Node 3614:8890. */
const STATS = [
  {
    value: '0s',
    body: 'Class.fi solves the same shape of problem (expert research burned into billable hours, answered in seconds with verifiable sources) in trade compliance',
  },
  {
    value: '100%',
    body: 'RFL Wealth shows the professional-services operations pattern, with seven tools consolidated, 60+ hours saved per client, and 100% staff adoption.',
  },
]

/** ⚠ Answers are placeholders — the artboard draws every row collapsed. */
const FAQ = [
  {
    question: 'Can law firms use AI without risking privilege?',
    answer:
      'Only with confidentiality by architecture. Privilege has no non-sensitive tier, so anything touching matter files, client data, or work product gets the sovereign build: your tenancy, your controls, nothing training a third-party model. Placeholder copy pending final wording.',
  },
  {
    question: 'How do you prevent hallucinated citations?',
    answer:
      'Answers are grounded in sources a professional can verify, with citation checking in the pipeline and a human gate before anything leaves the firm. A hallucinated citation is a sanction, so it is treated as a correctness requirement, not a quality nicety. Placeholder copy pending final wording.',
  },
  {
    question: 'What is a Framing Workshop?',
    answer:
      'A half-day to one-day working session with your leadership and the people closest to the problem. You leave with a one-page problem map and a scored shortlist of what is worth doing, either way. Placeholder copy pending final wording.',
  },
  {
    question: 'Do you replace associates?',
    answer:
      'No. The work is judgment applied to documents; we accelerate the document half so the judgment half is where the hours go. Placeholder copy pending final wording.',
  },
  {
    question: 'Can you work with our practice management system?',
    answer:
      'Yes — intake, conflicts, and matter opening are exactly the workflows we automate around an existing system rather than replacing it. Placeholder copy pending final wording.',
  },
  SOVEREIGN_FAQ,
]

export function LegalPage() {
  return (
    <ContentPage faq={FAQ} ground={{ backgroundColor: colorTokens.background.surface }}>
      <IndustryHero
        heading="AI for Legal Professional Services"
        body="Type B builds AI for legal and professional services firms with the two constraints the profession cannot compromise built in: confidentiality by architecture, and answers grounded in sources a professional can verify."
        gradient={HERO_GRADIENT}
      />

      <Statement>
        The work is judgment applied to documents, and both are expensive. Research, review,
        drafting, and intake burn billable hours on tasks AI can accelerate, but a hallucinated
        citation is not an inconvenience in this profession; it is a sanction. Privilege and client
        confidentiality mean most public AI tools are unusable as built, and your clients’
        engagement letters increasingly say so explicitly.
      </Statement>

      <IdealCustomerProfiles profiles={PROFILES} />

      {/* ⚠ The artboard's heading here still reads "financial services". */}
      <LevelsList
        heading="How we frame legal services"
        image="/images/services/product.png"
        levels={LEVELS}
      />

      <EngagementSteps heading="How we work here" steps={INDUSTRY_STEPS} />

      <SplitFeature
        reverse
        headingLevel="h2"
        heading="What can AI do for Legal Professional Services"
        body="In legal the constraint is close to constant, because privilege does not have a non-sensitive tier. Firm-wide knowledge tools over public materials can run on standard cloud AI; anything touching matter files, client data, or work product gets the sovereign build, which is our specialty."
        image="/images/services/product-featured.jpg"
      />

      <StatBand heading="Why Type B fits here" stats={STATS} />

      <Packaging tiers={TIERS} />

      {/* The artboard draws only two cards here — nodes 3614:8900 / 8905. */}
      <RelatedServices
        services={related(
          ['advisory', 'Fractional leadership and the roadmap the pod executes against.'],
          ['product', 'We build the agents, products, and governance around them.'],
        )}
      />

      {/*
        ⚠ Claim and paragraph both read "Details needed here." on the artboard.
        Left as drawn rather than invented.
      */}
      <SplitFeature
        eyebrow="Featured"
        heading="RFL Wealth"
        claim="Details needed here."
        body="Details needed here."
        image="/images/services/product-featured.jpg"
      />
    </ContentPage>
  )
}

export default LegalPage
