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
 * Manufacturing, Trade & Logistics — Figma node 3275:19055
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3275-19055
 *
 * The longest statement on any industry page — ten lines against the usual
 * seven or eight — which is what makes this the tallest of the five artboards.
 */

/** b5 mirrored — node 3614:7569, style "Type B BG 5" inside a horizontal flip. */
const HERO_GRADIENT = gradients.hero.manufacturing

/*
  ⚠ A shared ROLES constant used to sit here and go on all six profiles. It is
  gone: the buying committee is not the same for a plant and a customs broker,
  and one list across six segments was part of what made this section read as
  the same row six times. Each profile names its own below.
*/

/**
 * Ideal Customer Profiles — Figma node 3614:7752.
 *
 * ⚠ REWRITTEN 2026-09-15. Four of the six were the identical "AI mandate"
 * block, and the two that were not were about a blocked security review and an
 * operating model — neither of which is what a plant, a customs broker, or a
 * 3PL walks in with.
 *
 * Every row now names the system the work actually lands in (ERP, MES, HS
 * classification, track-and-trace, dispatch) rather than "your data estate".
 * See healthcare.tsx for the three AEO/GEO rules these five pages follow.
 *
 * ⚠ The roles were a single shared ROLES constant on all six. They are per
 * segment now: a customs broker's buyer is a compliance director, a plant's is
 * an operations manager, and the two do not overlap.
 */
const PROFILES = [
  {
    title: 'Discrete manufacturers',
    points: [
      'ERP and MES data-estate assessment',
      'Predictive maintenance scoping',
      'Vision AI for quality inspection',
      'Use-case scoring and roadmap',
    ],
    body: 'The data that would make AI work is on the plant floor, in systems that were never designed to talk to each other. A pilot that ignores that succeeds on one line and fails on the second.',
    roles: ['COO', 'VP Manufacturing', 'Plant Operations Manager', 'CIO'],
  },
  {
    title: 'Customs brokers and freight forwarders',
    points: [
      'HS classification and commercial-invoice AI',
      'Entry-filing exception routing',
      'Trade-compliance controls',
      'Shadow-AI audit',
    ],
    body: 'Classification errors are penalties rather than tickets, and your brokers are already pasting commercial invoices into consumer chatbots to clear the queue. We find where that is happening and replace it with something governed.',
    roles: ['COO', 'Director of Trade Compliance', 'Customs Manager', 'CTO'],
  },
  {
    title: 'Distributors and wholesalers',
    points: [
      'Demand forecasting and inventory analytics',
      'Quote and order-entry automation',
      'Product-data and catalogue enrichment',
      'Build-vs-buy analysis',
    ],
    body: 'Margin lives in inventory turns and quote speed, and both are now automatable. So is your competitor’s, which is the part that makes the sequencing decision urgent rather than interesting.',
    roles: ['CEO', 'COO', 'VP Supply Chain', 'CIO'],
  },
  {
    title: 'Logistics and 3PL operators',
    points: [
      'Track-and-trace data integration',
      'Dwell-time and exception detection',
      'Customer-facing status agents',
      'Analytics with lineage',
    ],
    body: 'Your customers want a status answer in seconds and your team is assembling it by hand from four systems. The first half of that problem is integration, and only the second half is AI.',
    roles: ['COO', 'VP Operations', 'Head of Customer Experience', 'CIO'],
  },
  {
    title: 'Industrial services businesses',
    points: [
      'Field-service workflow automation',
      'Scheduling and dispatch optimization',
      'Technician knowledge assistant',
      'Process mapping',
    ],
    body: 'The schedule lives in one dispatcher’s head and the service history lives in paper job cards. That works until you open a second region, and then it does not work anywhere.',
    roles: ['CEO', 'COO', 'VP Field Operations', 'Service Manager'],
  },
  {
    title: 'Cross-border e-commerce operations',
    points: [
      'Landed-cost and duty automation',
      'Multilingual catalogue and support agents',
      'Returns and fraud triage',
      'Operating model design',
    ],
    body: 'Every new market adds a tax regime, a language, and a returns rule, and the team absorbing all three is the size it was two markets ago. Adoption is the constraint, not capability.',
    roles: ['CEO', 'COO', 'Head of International', 'CTO'],
  },
]

/** Node 3614:7717. */
const LEVELS = [
  { number: '01', label: 'Internal support and order-status agents' },
  { number: '02', label: 'Autonomous classification and routing agents' },
  { number: '03', label: 'End-to-end workflow automation across intake, QC, and logistics' },
  { number: '04', label: 'Document AI for orders, customs paperwork, and QC records' },
  { number: '05', label: 'Demand and inventory forecasting' },
  { number: '06', label: 'Grounded search over specs, SOPs, and trade rules' },
]

/** Node 3614:7929. */
const STATS = [
  {
    value: '60%',
    body: 'Two ends of the spectrum, both shipped. UDM went from paper cards and Google Forms to a purpose-built ERP in eight weeks, with 40% faster order processing and 60% fewer data entry errors.',
  },
  {
    value: '70%',
    body: 'Class.fi, built with trade experts, classifies products in seconds instead of hours and cut compliance cost by 70%.',
  },
]

/** ⚠ Answers are placeholders — the artboard draws every row collapsed. */
const FAQ = [
  {
    question: 'We still run on paper and Excel. Is that a problem?',
    answer:
      'It is the starting point we see most often, and it is why the headroom is enormous. UDM went from paper cards and Google Forms to a purpose-built ERP in eight weeks. Placeholder copy pending final wording.',
  },
  {
    question: 'How long does an ERP implementation take?',
    answer:
      'Eight weeks for a purpose-built system scoped to how the work actually happens, rather than a multi-year enterprise programme you have to bend the business around. Placeholder copy pending final wording.',
  },
  {
    question: 'Can AI really help with trade compliance?',
    answer:
      'Class.fi classifies products in seconds instead of hours and cut compliance cost by 70%, built with trade experts and grounded in sources a specialist can verify. Placeholder copy pending final wording.',
  },
  {
    question: 'How do you get non-technical staff to adopt new systems?',
    answer:
      'Training and adoption are part of the engagement, and the system is designed around the existing workflow rather than replacing it wholesale. Adoption is the deliverable, not a hope. Placeholder copy pending final wording.',
  },
  {
    question: 'Do you work on the shop floor or just in software?',
    answer:
      'We map the process on the floor first, with the people who own each step in the room, then build the software around what we find. Placeholder copy pending final wording.',
  },
  SOVEREIGN_FAQ,
]

export function ManufacturingPage() {
  return (
    <ContentPage faq={FAQ} ground={{ backgroundColor: colorTokens.background.surface }}>
      <IndustryHero
        heading="AI for Manufacturing, Trade & Logistics"
        body="Type B moves manufacturers, trade businesses, and logistics operators off paper, spreadsheets, and tribal knowledge onto systems built around how the work actually happens, with AI applied where documents and decisions pile up."
        gradient={HERO_GRADIENT}
      />

      <Statement>
        Most operational businesses run on a patchwork: paper cards on the shop floor, Excel holding
        the schedule together, a veteran employee as the only documentation. It works until you try
        to grow. Meanwhile tariff volatility and cross-border complexity make compliance research a
        cost center that scales with every shipment. This is the classic profile of our priority
        segment: a $20M to $500M operational business with no enterprise ERP yet, which is exactly
        why the headroom is enormous.
      </Statement>

      <IdealCustomerProfiles profiles={PROFILES} />

      {/* ⚠ The artboard's heading here still reads "financial services". */}
      <LevelsList
        heading="How we frame manufacturing"
        image="/images/services/product.png"
        levels={LEVELS}
      />

      <EngagementSteps heading="How we work here" steps={INDUSTRY_STEPS} />

      {/* ⚠ The artboard heading reads "for a Manufacturing?" — article dropped. */}
      <SplitFeature
        reverse
        headingLevel="h2"
        heading="What can AI do for manufacturing?"
        body="Most operational AI here is standard cloud AI and should be: order extraction, QC records, scheduling, dashboards. When the data is export-controlled, customer-confidential under contract, or subject to a jurisdiction requirement, we build the sovereign version, which is our specialty."
        image="/images/services/product-featured.jpg"
      />

      <StatBand heading="Why Type B fits here" stats={STATS} />

      <Packaging tiers={TIERS} />

      {/* The artboard draws only two cards here — nodes 3614:7987 / 7992. */}
      <RelatedServices
        services={related(
          ['advisory', 'Fractional leadership and the roadmap the pod executes against.'],
          ['product', 'We build the agents, products, and governance around them.'],
        )}
      />

      {/*
        ⚠ The artboard's claim and paragraph both read "Details needed here."
        Left as drawn rather than invented — this is a copy gap for the client.
      */}
      <SplitFeature
        eyebrow="Featured"
        headingLevel="h2"
        heading="UDM"
        claim="Details needed here."
        body="Details needed here."
        image="/images/services/product-featured.jpg"
      />
    </ContentPage>
  )
}

export default ManufacturingPage
