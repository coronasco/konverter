import { Metadata } from 'next'
import DesignTokenGenerator from '@/components/DesignTokenGenerator'
import BreadcrumbSchema, { generateBreadcrumbs } from '@/components/BreadcrumbSchema'
import FAQSchema from '@/components/FAQSchema'
import ToolPageLayout from '@/components/ToolPageLayout'

export const metadata: Metadata = {
  title: 'Design Token Generator | Konverter',
  description:
    'Generate CSS variables, Tailwind-ready config output, and JSON design tokens from a simple frontend style setup.',
  alternates: {
    canonical: 'https://www.konverter-online.com/design-token-generator',
  },
}

const faqs = [
  {
    question: 'What token outputs are included?',
    answer: 'The generator produces CSS variables, a Tailwind theme extension snippet, and a JSON token object from the same input set.',
  },
  {
    question: 'Can it generate dark mode tokens?',
    answer: 'Yes. There is an option to add a second semantic color layer for dark mode so you can preview and export both themes.',
  },
  {
    question: 'What inputs does it use?',
    answer: 'You set the base brand, accent, surface, and text colors, then tune spacing, radius, typography, and shadow strength.',
  },
]

export default function DesignTokenGeneratorPage() {
  const breadcrumbs = generateBreadcrumbs('/design-token-generator')

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      <ToolPageLayout
        toolPath="/design-token-generator"
        eyebrow="Frontend tools"
        title="Build a token file from a few base style choices"
        description="Set your colors, spacing, radius, and type scale, then export CSS variables, JSON, and Tailwind-ready output."
        highlights={['CSS variables', 'Tailwind config', 'JSON tokens + dark mode']}
        toolNote="Start with a few solid styling decisions and get token files you can wire into a real frontend codebase."
        useCases={[
          {
            title: 'Starting a design system',
            description: 'Create a semantic token layer from a few core decisions before the codebase grows and naming becomes harder to untangle.',
          },
          {
            title: 'Converting a style direction into code',
            description: 'Take a palette and a spacing rhythm, then export files a frontend project can consume immediately.',
          },
          {
            title: 'Testing light and dark semantics',
            description: 'Use the built-in dark-mode option to preview how a single token structure can support both themes.',
          },
        ]}
        helpfulPoints={[
          {
            title: 'Simple enough to use quickly',
            description: 'Inputs stay small on purpose so the generator helps you get a practical base system instead of disappearing into configuration debt.',
          },
          {
            title: 'Export formats that matter',
            description: 'CSS variables, Tailwind snippets, and JSON cover the common places token files tend to land in frontend projects.',
          },
          {
            title: 'Connected to the rest of the platform',
            description: 'It pairs well with color extraction, SVG workflows, and broader asset prep rather than living as a separate design-only tool.',
          },
        ]}
        faqs={faqs}
      >
        <DesignTokenGenerator />
      </ToolPageLayout>
    </>
  )
}
