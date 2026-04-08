import { Metadata } from 'next'
import SvgIconPackGenerator from '@/components/SvgIconPackGenerator'
import BreadcrumbSchema, { generateBreadcrumbs } from '@/components/BreadcrumbSchema'
import FAQSchema from '@/components/FAQSchema'
import ToolPageLayout from '@/components/ToolPageLayout'

export const metadata: Metadata = {
  title: 'SVG Icon Pack Generator | Konverter',
  description:
    'Batch convert SVG icons into React components, Vue components, or a sprite sheet with normalized file names and ZIP export.',
  alternates: {
    canonical: 'https://www.konverter-online.com/svg-icon-pack-generator',
  },
}

const faqs = [
  {
    question: 'What output formats are available?',
    answer: 'You can export React components, Vue components, an SVG sprite sheet, and optional index files for cleaner imports.',
  },
  {
    question: 'How are duplicate names handled?',
    answer: 'The generator normalizes file names and adds numeric suffixes when uploaded icons would otherwise collide.',
  },
  {
    question: 'What does the currentColor option do?',
    answer: 'It rewrites fills and strokes to currentColor where possible so the resulting icon components are easier to theme in a UI.',
  },
]

export default function SvgIconPackGeneratorPage() {
  const breadcrumbs = generateBreadcrumbs('/svg-icon-pack-generator')

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      <ToolPageLayout
        toolPath="/svg-icon-pack-generator"
        eyebrow="SVG tools"
        title="Turn a folder of SVGs into React components, Vue components, or a sprite"
        description="Upload the set, clean up the names, keep the viewBox, and export something a frontend project can actually use."
        highlights={['Batch upload', 'React / Vue / sprite output', 'Normalized naming']}
        toolNote="Useful when a folder of raw icons needs to become something a frontend project can import without a cleanup sprint."
        useCases={[
          {
            title: 'Shipping a design-system icon set',
            description: 'Convert raw SVG files into component files and index exports that slot into a React or Vue codebase with less cleanup.',
          },
          {
            title: 'Preparing a lightweight sprite workflow',
            description: 'Generate a single sprite file when you want a simpler asset delivery path instead of many individual component files.',
          },
          {
            title: 'Normalizing inconsistent source files',
            description: 'The file-name normalization and currentColor option help tame icon sets that came from several designers or export tools.',
          },
        ]}
        helpfulPoints={[
          {
            title: 'Batch-oriented UI',
            description: 'The layout focuses on upload, naming, preview, and export so you can understand what the generator is doing to the set.',
          },
          {
            title: 'Real file structure output',
            description: 'ZIP export includes folders and optional index files, which is more useful than a one-off code preview.',
          },
          {
            title: 'Built for frontend teams',
            description: 'The tool preserves viewBox data, shows the normalized result, and keeps the final artifacts close to how a team would actually consume them.',
          },
        ]}
        faqs={faqs}
      >
        <SvgIconPackGenerator />
      </ToolPageLayout>
    </>
  )
}
