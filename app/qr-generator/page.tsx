import { Metadata } from 'next'
import QrCodeGenerator from '@/components/QrCodeGenerator'
import BreadcrumbSchema, { generateBreadcrumbs } from '@/components/BreadcrumbSchema'
import FAQSchema from '@/components/FAQSchema'
import ToolPageLayout from '@/components/ToolPageLayout'

export const metadata: Metadata = {
  title: 'QR Code Generator | Konverter',
  description:
    'Create custom QR codes for URLs, text, email, phone numbers, and WiFi with logo and color controls.',
  alternates: {
    canonical: 'https://www.konverter-online.com/qr-generator',
  },
}

const faqs = [
  {
    question: 'What kinds of QR codes can I create?',
    answer: 'The generator supports URLs, plain text, email, phone numbers, and WiFi credentials from a single interface.',
  },
  {
    question: 'Can I add a logo and colors?',
    answer: 'Yes. The tool includes foreground and background color controls, logo upload, logo sizing, and a few presentation options.',
  },
  {
    question: 'What do I get back?',
    answer: 'You can preview the generated QR code, copy the output image, or download it as a PNG.',
  },
]

export default function QrGeneratorPage() {
  const breadcrumbs = generateBreadcrumbs('/qr-generator')

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      <ToolPageLayout
        toolPath="/qr-generator"
        eyebrow="Frontend tools"
        title="Make a QR code and export it without the usual junk"
        description="Use it for links, contact details, WiFi, and short text, then copy or download the result."
        highlights={['Multiple QR types', 'Logo support', 'Copy and download actions']}
        toolNote="Helpful when a QR code needs to look presentable enough for a client handoff, print piece, or product page."
        useCases={[
          {
            title: 'Sharing URLs or product pages',
            description: 'Generate a scannable code for a link and keep the output close to the rest of the asset prep tools.',
          },
          {
            title: 'WiFi or event handoff',
            description: 'Make a QR code for a network or contact detail when you need something practical for printouts, slides, or quick setup.',
          },
          {
            title: 'Branded marketing assets',
            description: 'Add a centered logo, tune the color palette, and export a QR code that looks more deliberate than a default generator output.',
          },
        ]}
        helpfulPoints={[
          {
            title: 'Batch-adjacent workflow',
            description: 'It sits near the favicon, icon, and frontend utility tools so QR generation feels like part of an asset workflow instead of a dead-end page.',
          },
          {
            title: 'Customization without clutter',
            description: 'You can adjust the important settings without the generator feeling crowded or confusing.',
          },
          {
            title: 'Practical export path',
            description: 'Copy and download remain available right where you need them, which matters for a tool that often feeds directly into documents or layouts.',
          },
        ]}
        faqs={faqs}
      >
        <QrCodeGenerator />
      </ToolPageLayout>
    </>
  )
}
