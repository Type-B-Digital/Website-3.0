import { Eyebrow, HeroIntro, Reveal, Section, Typography } from '@/components'
import { PageShell } from '@/components/layout'

/**
 * Privacy Policy — the copy from https://www.typeb.digital/privacy-policy,
 * reproduced verbatim and set in this site's type scale.
 *
 * ⚠ NOT IN FIGMA. There is no legal-page artboard anywhere in the file, the
 * same gap the 404 records, so the layout is authored from the system rather
 * than reproduced. Three decisions worth naming:
 *
 * - **Cream, not a gradient.** Every other page carries one, but this is a
 *   document to read rather than a page to sell from, and `bg-surface` is the
 *   site's own light reading ground — the body of Our Work, What We Do and
 *   Culture's tail all sit on it. Nothing invented.
 * - **A 720px measure, not the 845 the article template uses.** That column
 *   was built for 20px copy; this is 16px, the default body step, and at 845
 *   a 16px line runs past 110 characters.
 * - **The contents list is the source's own.** "What this privacy policy
 *   discloses" is already a table of contents in the copy, so its rows are
 *   jump links rather than a navigation device invented for the page.
 *
 * ⚠ Two inconsistencies in the source, reproduced as written:
 *   - The contents row reads "GDPR Data Protection Rights" while the section
 *     it points at is headed "GDPR - General Data Protection Regulation".
 *   - That section says "includes 7 regulations" and then lists six.
 */

type Section = {
  /** The heading, and the anchor id is derived from it. */
  heading: string
  /** The label the contents list uses, where the source differs from the heading. */
  contentsLabel?: string
  body?: readonly string[]
  subsections?: readonly { heading: string; body: readonly string[] }[]
  /** Rendered as a bulleted list under `body`. */
  points?: readonly string[]
  /** Trailing paragraphs, after `points`. */
  after?: readonly string[]
}

const INTRO = [
  'At Type B Digital, which is accessible from https://www.typeb.digital/, we always ensure that the information collected from you is protected at all costs. This privacy policy document that we present to you is relevant to this website and we mention the various information that is collected and all the relevant steps that are taken to safeguard them.',
  'If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.',
  'By providing us information through our forums, you signify your acceptance of our Privacy Policy. Type B Digital is the sole owner of this website including all the information that you submit through it.',
]

const SECTIONS: readonly Section[] = [
  {
    heading: 'Information that we collect and how we manage them',
    body: [
      'All information that is collected depends on your actions within the website. Your personal details such as your name, email, and contact number are retrieved for any future purposes when we need to contact you. In addition to this, any other analytical information required to improve Type B Digital will be collected.',
      'We do not retain information more than it is necessary. We only store all information only until it is needed for the specific purposes it was collected for. This retention period may vary from different situations and requirements. Once the information passes the specific retention period, it will be securely disposed of.',
      'We respect each and every one of your rights and privacy. You have the right to update your information and ensure that your personal data is accurate and up to date to avoid any misunderstandings. Furthermore, if any individual requests for their personal information to be removed we hereby follow the request as any website is bound by law to delete any user information if requested according to the GDPR (General Data Protection Regulation). By contacting Type B Digital through hello@typeb.digital you have every right to request your information to be updated or removed.',
    ],
  },
  {
    heading: 'How do we collect your information?',
    body: [
      'We collect personal information such as your Name, Contact number and Email Address which is collected through the Contact Form that is provided on the website.',
      'As analytics is an important part of a website, Type B Digital uses external third-party plugins from Google such as Google Analytics to collect, measure and analyze user information.',
    ],
  },
  {
    heading: 'What do we do with your information?',
    subsections: [
      {
        heading: 'Log files',
        body: [
          "The information collected for Analytics through the website is known as 'Log Files'. These files log user information when you visit Type B Digital and track all actions done within the website. All hosting companies do this as a part of their hosting services' analytics.",
          'These log files include information such as demographic information of the user, the browser type, number of clicks, Internet Service Provider (ISP), and date with a timestamp of when the website was accessed. We follow a standard procedure when all this information is collected and it will only be used for the required purposes. The main purpose this information is collected is to analyze what the user does to improve the user experience of the website for future visitors.',
        ],
      },
      {
        heading: 'Analytics',
        body: [
          "To measure Type B Digital's Analytics we use Google Analytics. The log files that are collected are used by these tools to give us an idea about how well the website is doing and what areas could improve for future visitors. Such information is valuable for Type B Digital to make sure all our visitors have a seamless experience within the website. The information collected is always protected in a standardized manner as both the third-party integrations and Type B Digital follow all policies to protect them.",
        ],
      },
      {
        heading: 'Cookies',
        body: [
          "Cookies, also known as browser cookies, are small encrypted text files located in the browser directories. These files help web developers to navigate within a website efficiently to help perform certain functions. Type B Digital does not use any cookies to get information from our users but as we use third-party integrations there can be instances where you would have to accept any cookies. Cookies are created when a user's browser loads a particular website and the user information is stored in these to identify regular visitors to provide a customized experience. In addition to this, cookies regulate how ads, widgets, and other elements function on a website.",
        ],
      },
    ],
  },
  {
    heading: 'Third-party privacy policies',
    body: [
      'Type B Digital does not have any access or control over the cookies that are used by the third-party integrations. As we do not have any control, we kindly request you to refer to the respective policies of these third-party sources as it may include you about how their procedures take place. In addition to this, if needed, they too will provide instructions on how to opt-out from certain options.',
    ],
  },
  {
    heading: 'GDPR - General Data Protection Regulation',
    contentsLabel: 'GDPR Data Protection Rights',
    body: [
      'These data protection regulations allow any individual to have easier access to the data that is collected and helps to manage their own information. According to these regulations, any user has the right to request to access, update and remove their personal information when needed. The full GDPR rights for individuals includes 7 regulations about the information that is collected,',
    ],
    points: [
      'Must be processed lawfully, fairly, and in a transparent manner.',
      'Must be collected for only specified, explicit, and legitimate purposes.',
      'Must always be the adequate amount that is needed.',
      'Must be accurate and up to date.',
      'Must not be kept any longer than necessary.',
      'Must be processed in a manner that ensures the security of personal data.',
    ],
    after: [
      'If you have a request to make to Type B Digital regarding any of these regulations, please contact us at hello@typeb.digital. We will respond to you within one month of clarification of your matter. More information about the GDPR Rights can be accessible through https://gdpr-info.eu/',
    ],
  },
  {
    heading: "Children's information",
    body: [
      "One of the main concerns at Type B Digital is protection for children while using the internet. While we encourage parents to acknowledge and guide childrens' activities on the internet, Type B Digital do not knowingly collect any personally identifiable information from anyone under the age of 13. If we become aware that we have collected Personal Data from anyone under the age of 13 without verification of parental consent, we take steps to remove that information from our servers.",
      "As we need to rely on consent as a legal basis for processing your information, a child would require consent from a parent. Therefore we may require parent's consent before we collect and use children's information.",
    ],
  },
  {
    heading: 'Contact us',
    body: [
      "If you have any questions about Type B Digital's privacy policy, please do not hesitate to contact us through hello@typeb.digital. We are open to any suggestions that you have!",
    ],
  },
]

/** Heading text to an anchor id — the contents list and the headings must agree. */
function slugify(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * The copy carries an email address and two URLs as bare text. Left as prose
 * they are unclickable, and rewriting the sentences around them would be
 * editing the client's legal copy — so the text stays exactly as written and
 * only the spans that ARE addresses become links.
 */
const LINKABLE =
  /(hello@typeb\.digital|https:\/\/gdpr-info\.eu\/?|https:\/\/www\.typeb\.digital\/?)/g

function Prose({ text }: { text: string }) {
  return (
    <>
      {text.split(LINKABLE).map((part, i) =>
        // `split` with one capture group puts the matches at the odd indices.
        // Testing the regex instead would be wrong: it carries `g`, so `test`
        // advances `lastIndex` and alternates true/false on identical input.
        i % 2 === 1 ? (
          <a
            key={`${part}-${i}`}
            href={part.startsWith('http') ? part : `mailto:${part}`}
            {...(part.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="underline decoration-from-font underline-offset-2 hover:opacity-muted"
          >
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </>
  )
}

function Paragraph({ text }: { text: string }) {
  return (
    <Typography variant="copyMedium" muted>
      <Prose text={text} />
    </Typography>
  )
}

export function PrivacyPolicyPage() {
  return (
    <PageShell headerTone="onLight">
      <div className="bg-surface">
        <Section tone="none" spacing="none" className="pb-5xl pt-[232px] text-on-light">
          <div className="flex max-w-[720px] flex-col gap-4xl">
            <HeroIntro>
              <div className="flex flex-col items-start gap-md">
                <Eyebrow tone="ink">Legal</Eyebrow>
                <Typography variant="h1" className="text-h2 md:text-h1">
                  Privacy Policy
                </Typography>
                {/* The source's own date line. */}
                <Typography variant="button" as="p" muted>
                  Updated August 2022
                </Typography>
              </div>
            </HeroIntro>

            <Reveal>
              <div className="flex flex-col gap-lg">
                {INTRO.map((text) => (
                  <Paragraph key={text.slice(0, 40)} text={text} />
                ))}
              </div>
            </Reveal>

            {/* The source's own contents list, made navigable. */}
            <Reveal>
              <nav aria-label="On this page" className="flex flex-col gap-lg">
                <Typography variant="subHeaderLarge" as="h2" className="leading-[1.2]">
                  What this privacy policy discloses
                </Typography>
                <ul className="flex list-disc flex-col gap-sm pl-lg">
                  {SECTIONS.map((section) => (
                    <li key={section.heading}>
                      <Typography variant="copyMedium" as="span">
                        <a
                          href={`#${slugify(section.heading)}`}
                          className="underline decoration-from-font underline-offset-2 hover:opacity-muted"
                        >
                          {section.contentsLabel ?? section.heading}
                        </a>
                      </Typography>
                    </li>
                  ))}
                </ul>
              </nav>
            </Reveal>

            {SECTIONS.map((section) => (
              <Reveal key={section.heading}>
                <div className="flex scroll-mt-4xl flex-col gap-lg" id={slugify(section.heading)}>
                  <Typography variant="subHeaderLarge" as="h2" className="leading-[1.2]">
                    {section.heading}
                  </Typography>

                  {section.body?.map((text) => (
                    <Paragraph key={text.slice(0, 40)} text={text} />
                  ))}

                  {section.points && (
                    <ul className="flex list-disc flex-col gap-sm pl-lg">
                      {section.points.map((point) => (
                        <li key={point}>
                          <Typography variant="copyMedium" as="span" muted>
                            {point}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.after?.map((text) => (
                    <Paragraph key={text.slice(0, 40)} text={text} />
                  ))}

                  {section.subsections?.map((sub) => (
                    <div key={sub.heading} className="flex flex-col gap-lg pt-md">
                      {/* 16/600 on 1.2 — the `button` token's metrics, as the
                          article template uses for its own sub-headings. */}
                      <Typography variant="button" as="h3">
                        {sub.heading}
                      </Typography>
                      {sub.body.map((text) => (
                        <Paragraph key={text.slice(0, 40)} text={text} />
                      ))}
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      </div>
    </PageShell>
  )
}

export default PrivacyPolicyPage
