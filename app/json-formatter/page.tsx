import { Metadata } from 'next'
import JsonFormatter from '@/components/JsonFormatter'
import BreadcrumbSchema, { generateBreadcrumbs } from '@/components/BreadcrumbSchema'
import FAQSchema from '@/components/FAQSchema'
import ToolPageLayout from '@/components/ToolPageLayout'

export const metadata: Metadata = {
  title: 'JSON Formatter | Konverter',
  description:
    'Format, validate, minify, and convert JSON in the browser with a cleaner frontend-focused workflow.',
  alternates: {
    canonical: 'https://www.konverter-online.com/json-formatter',
  },
}

const faqs = [
  {
    question: 'What can I do with the formatter?',
    answer: 'You can beautify JSON, minify it, check whether it is valid, and convert the parsed structure into YAML.',
  },
  {
    question: 'Does it send my JSON anywhere?',
    answer: 'The formatter itself runs in the browser. For routine payload inspection and cleanup, you can work directly in the page without a separate upload flow.',
  },
  {
    question: 'Why keep this on a frontend tools site?',
    answer: 'JSON formatting is a constant part of frontend debugging, API work, and configuration review, so it fits naturally alongside the rest of the code-facing utilities.',
  },
]

export default function JsonFormatterPage() {
  const breadcrumbs = generateBreadcrumbs('/json-formatter')

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      <ToolPageLayout
        toolPath="/json-formatter"
        eyebrow="Frontend tools"
        title="Format, validate, minify, or convert JSON in one place"
        description="Paste a payload, make it readable, check it, or turn it into YAML."
        highlights={['Beautify and minify', 'Validation feedback', 'YAML conversion']}
        toolNote="Paste a payload, clean it up, validate it, and copy the result without opening a heavier editor."
        useCases={[
          {
            title: 'Debugging API payloads',
            description: 'Paste in a response body, check whether the structure is valid, and make it readable before continuing with implementation or troubleshooting.',
          },
          {
            title: 'Preparing docs or configs',
            description: 'Format a payload cleanly, then convert it into YAML when you need a config-friendly version for a project or deployment file.',
          },
          {
            title: 'Reducing noise in production output',
            description: 'Switch to minified JSON when you need compact output for transport, test fixtures, or embedding in other files.',
          },
        ]}
        helpfulPoints={[
          {
            title: 'Readable by default',
            description: 'Input, output, and actions are easy to spot, so you can paste a payload and get to work right away.',
          },
          {
            title: 'Useful beyond prettifying',
            description: 'Validation and YAML conversion make it practical for real frontend and configuration work, not just quick formatting.',
          },
          {
            title: 'Easy to chain',
            description: 'It sits closer to the rest of the frontend tools so you can move into minification, encoding, or asset work from here.',
          },
        ]}
        faqs={faqs}
      >
        <JsonFormatter />
      </ToolPageLayout>
    </>
  )
}
