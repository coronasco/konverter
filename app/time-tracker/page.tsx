import { Metadata } from 'next'
import TimeTracker from '@/components/TimeTracker'
import BreadcrumbSchema, { generateBreadcrumbs } from '@/components/BreadcrumbSchema'
import FAQSchema from '@/components/FAQSchema'
import ToolPageLayout from '@/components/ToolPageLayout'

export const metadata: Metadata = {
  title: 'Time Tracker | Konverter',
  description:
    'Track work sessions, rates, and totals locally in the browser with a lightweight frontend-friendly time tracker.',
  alternates: {
    canonical: 'https://www.konverter-online.com/time-tracker',
  },
}

const faqs = [
  {
    question: 'Where is the session data stored?',
    answer: 'The tracker saves sessions in local browser storage, which keeps the workflow lightweight and does not require an account.',
  },
  {
    question: 'Can I track rates and categories?',
    answer: 'Yes. Sessions include project names, categories, rates, currencies, durations, and calculated earnings.',
  },
  {
    question: 'Why keep a time tracker on Konverter?',
    answer: 'It supports freelancers and solo frontend work without turning the site into a generic SaaS product or a separate back-office app.',
  },
]

export default function TimeTrackerPage() {
  const breadcrumbs = generateBreadcrumbs('/time-tracker')

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      <ToolPageLayout
        toolPath="/time-tracker"
        eyebrow="Frontend tools"
        title="Track time and rates without signing into anything"
        description="A simple browser tracker for freelance work, quick sessions, and rough earnings checks."
        highlights={['Local browser storage', 'Rates and categories', 'Quick session history']}
        toolNote="A simple browser tracker for focused work sessions when a full billing app would be overkill."
        useCases={[
          {
            title: 'Freelance or contract work',
            description: 'Log time against a project and keep the hourly rate visible while you work, without setting up a full billing system.',
          },
          {
            title: 'Quick session logging',
            description: 'Track short blocks of work in the browser when you need something simpler than a dedicated desktop app.',
          },
          {
            title: 'Estimating earnings during the day',
            description: 'Because duration and rate stay together, the page works well when you want a rough live sense of the value of the current session.',
          },
        ]}
        helpfulPoints={[
          {
            title: 'Local and direct',
            description: 'The tracker keeps its lightweight feel by storing session data in the browser instead of forcing account creation.',
          },
          {
            title: 'Still aligned with the site',
            description: 'It remains part of the broader frontend workflow toolkit without dragging the product into a generic productivity template.',
          },
          {
            title: 'Better page hierarchy',
            description: 'The timer, setup form, and session list are easier to follow, so you can start tracking without hunting around.',
          },
        ]}
        faqs={faqs}
      >
        <TimeTracker />
      </ToolPageLayout>
    </>
  )
}
