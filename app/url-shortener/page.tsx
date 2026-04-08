import { Metadata } from 'next'
import UrlShortener from '@/components/UrlShortener'
import BreadcrumbSchema, { generateBreadcrumbs } from '@/components/BreadcrumbSchema'
import FAQSchema from '@/components/FAQSchema'
import ToolPageLayout from '@/components/ToolPageLayout'

export const metadata: Metadata = {
  title: 'URL Shortener | Konverter',
  description:
    'Shorten links quickly, copy the result, and move directly into QR generation from the same workflow.',
  alternates: {
    canonical: 'https://www.konverter-online.com/url-shortener',
  },
}

const faqs = [
  {
    question: 'How does the shortener work?',
    answer: 'The tool sends the entered URL to TinyURL and returns the shortened result in the page once the request succeeds.',
  },
  {
    question: 'What happens after a link is shortened?',
    answer: 'You can copy it, open it, share it to common platforms, or send it straight into the QR code generator.',
  },
  {
    question: 'Why keep this inside Konverter?',
    answer: 'Short links often feed into QR codes, printed materials, and frontend asset work, so it makes sense to keep that step connected to the rest of the platform.',
  },
]

export default function UrlShortenerPage() {
  const breadcrumbs = generateBreadcrumbs('/url-shortener')

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      <ToolPageLayout
        toolPath="/url-shortener"
        eyebrow="Frontend tools"
        title="Shorten a link and send it straight to share or QR"
        description="Make the short link, copy it, share it, or turn it into a QR code right away."
        highlights={['TinyURL-backed', 'Share actions', 'QR generator handoff']}
        toolNote="Best when you need a shorter link quickly and want the next step, like QR generation, close by."
        useCases={[
          {
            title: 'Preparing links for printed materials',
            description: 'Create a shorter URL before turning it into a QR code for a poster, presentation, slide, or handout.',
          },
          {
            title: 'Cleaning up shared references',
            description: 'Shorten a long project or documentation link when you need something easier to send in chat or show on screen.',
          },
          {
            title: 'Keeping adjacent tools connected',
            description: 'The handoff into QR generation makes more sense now that the navigation is organized around frontend asset workflows.',
          },
        ]}
        helpfulPoints={[
          {
            title: 'Small job, clearer flow',
            description: 'Shorten the link, copy it, share it, or jump into QR generation without getting dragged into a bigger workflow than you need.',
          },
          {
            title: 'Useful for printed output',
            description: 'Short links pair naturally with QR codes and physical materials, which makes this more than a generic utility page.',
          },
          {
            title: 'Easy to scan on mobile',
            description: 'The main form and actions stay readable on smaller screens, which matters for quick one-off link work.',
          },
        ]}
        faqs={faqs}
      >
        <UrlShortener />
      </ToolPageLayout>
    </>
  )
}
