import type { Capability, RelatedService } from '@/components/sections'
import type { PackageTier } from '@/components/sections'

/**
 * Copy that all three service pages share verbatim.
 *
 * The capability grid and the packaging table are drawn identically on the
 * Advisory (2910:15211), Product & AI Development (3141:2722), and Teams
 * (3149:7942) artboards — same six capabilities, same four tiers, same order.
 * They live here so the three page files stay pure content diffs of each other.
 *
 * Related services differ per page (each links two siblings plus an industry,
 * and writes its own one-line body), so `related()` composes the row.
 */

export const CAPABILITIES: readonly Capability[] = [
  {
    title: 'Conversational & Voice',
    body: 'We assess where agents would carry real customer or internal conversations, and what your content and data would need to be for them to be accurate. Scored on volume, sensitivity, and containment potential.',
  },
  {
    title: 'Autonomous Agents',
    body: 'We identify the workflows where an agent should take action across your tools rather than answer questions, and where a human gate belongs. Scored on decision reversibility and audit requirements.',
  },
  {
    title: 'Search & RAG',
    body: 'We scope grounded answers over your own knowledge, leveraging repositories clean enough to ground on. The output is a scored use-case roadmap, and every later phase quotes from it.',
  },
  {
    title: 'Document & Vision AI',
    body: 'We find the document queues that consume the most hours (intake, claims, compliance research, QC) and size the extraction opportunity against error tolerance.',
  },
  {
    title: 'Workflow Automation',
    body: 'We map the multi-step processes that could run end to end and the ones that should not, with the people who own each step in the room.',
  },
  {
    title: 'Analytics & Forecast',
    body: 'We assess whether your data foundations can support predictions everyone would trust, and what has to be true first in order to achieve it.',
  },
]

export const TIERS: readonly PackageTier[] = [
  {
    title: 'Type B Digital',
    note: 'Build the agent workflows.',
    items: ['Advisory', 'Product & AI Development', 'Teams'],
    lead: true,
  },
  {
    title: 'Entry',
    note: 'Find out what is true, at a fixed scope.',
    items: ['Architecture Audit & Roadmap (2w)', 'AI Assessment or Discovery', 'Pod Starter'],
  },
  {
    title: 'Core',
    note: 'The working engagement most clients run.',
    items: [
      'Diligence & 90-Day Roadmap',
      'Product Build or AI Safety Net',
      'Delivery Pod (4 to 6 people)',
    ],
  },
  {
    title: 'Expanded',
    note: 'A program we own with you.',
    items: [
      'Fractional Leadership',
      'Sovereign AI Platform',
      'Managed Delivery Squad (6+ people)',
    ],
  },
]

/* ------------------------------------------------------------------ *
 * Related services
 * ------------------------------------------------------------------ */

/**
 * Title, thumbnail, and route per card. The one-line body is NOT shared: each
 * artboard writes it from the point of view of the page it sits on (Advisory
 * reads "Fractional leadership and the roadmap the pod executes against." on
 * Teams), so a page passes its own.
 */
const SERVICE_CARDS = {
  advisory: { title: 'Advisory', image: '/images/services/advisory.png', to: '/advisory' },
  product: {
    title: 'Product & AI Development',
    image: '/images/services/product.png',
    to: '/product-development',
  },
  teams: { title: 'Teams', image: '/images/services/teams.png', to: '/teams' },
  financial: {
    title: 'Financial Services & Insurance',
    image: '/images/services/advisory.png',
    to: '/industries',
  },
  proptech: {
    title: 'Real Estate & PropTech',
    image: '/images/services/product.png',
    to: '/industries',
  },
} as const

export type ServiceCardKey = keyof typeof SERVICE_CARDS

/** `related(['advisory', 'Fractional leadership…'], …)` — three, in artboard order. */
export function related(
  ...entries: readonly (readonly [ServiceCardKey, string])[]
): readonly RelatedService[] {
  return entries.map(([key, body]) => ({ ...SERVICE_CARDS[key], body }))
}
