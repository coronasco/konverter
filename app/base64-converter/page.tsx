import { Metadata } from 'next'
import Base64Converter from '@/components/Base64Converter'
import BreadcrumbSchema, { generateBreadcrumbs } from '@/components/BreadcrumbSchema'
import FAQSchema from '@/components/FAQSchema'
import ToolPageLayout from '@/components/ToolPageLayout'

export const metadata: Metadata = {
  title: 'Base64 Converter | Konverter',
  description:
    'Encode text or files to Base64, decode strings back to text, and keep the output easy to copy or download.',
  alternates: {
    canonical: 'https://www.konverter-online.com/base64-converter',
  },
}

const faqs = [
  {
    question: 'Can I encode files as well as text?',
    answer: 'Yes. You can type plain text or upload a file and the converter will read it into a Base64 output that you can copy or download.',
  },
  {
    question: 'What is this useful for in frontend work?',
    answer: 'Base64 is handy for data URIs, debugging encoded values, quick payload checks, and inspecting how small assets or strings are represented.',
  },
  {
    question: 'Can I decode Base64 back into plain text?',
    answer: 'Yes. The decode tab keeps the reverse workflow simple so you can inspect or recover string content quickly.',
  },
]

export default function Base64ConverterPage() {
  const breadcrumbs = generateBreadcrumbs('/base64-converter')

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      <ToolPageLayout
        toolPath="/base64-converter"
        eyebrow="Frontend tools"
        title="Encode and decode Base64 without leaving the browser"
        description="This is useful when you need quick text encoding, file-to-Base64 conversion, or a fast way to inspect encoded content during frontend work."
        highlights={['Text and file input', 'Download actions', 'Two-way conversion']}
        toolNote="Useful when you need a fast Base64 check, a data URI helper, or a simple way to inspect encoded text."
        useCases={[
          {
            title: 'Working with data URIs',
            description: 'Encode small assets or snippets quickly when you need a Base64 representation during prototyping or debugging.',
          },
          {
            title: 'Inspecting encoded content',
            description: 'Decode a Base64 string back into plain text when you need to see what an external tool, API, or config value actually contains.',
          },
          {
            title: 'Quick file conversion',
            description: 'Upload a file, generate the Base64 output, and copy or download the text for the next step in your workflow.',
          },
        ]}
        helpfulPoints={[
          {
            title: 'Straight to the task',
            description: 'The encode and decode views are separated cleanly so the page stays understandable on both desktop and mobile.',
          },
          {
            title: 'Built for copy-paste work',
            description: 'This is a utility page, so the important actions stay obvious: encode, decode, copy, and download.',
          },
          {
            title: 'Fits alongside SVG and assets',
            description: 'Base64 often shows up in frontend asset workflows, which makes it a natural part of the broader Konverter toolset.',
          },
        ]}
        faqs={faqs}
      >
        <Base64Converter />
      </ToolPageLayout>
    </>
  )
}
