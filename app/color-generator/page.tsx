import { Metadata } from 'next'
import ColorGenerator from '@/components/ColorGenerator'
import BreadcrumbSchema, { generateBreadcrumbs } from '@/components/BreadcrumbSchema'
import FAQSchema from '@/components/FAQSchema'
import ToolPageLayout from '@/components/ToolPageLayout'

export const metadata: Metadata = {
  title: 'Color Generator | Konverter',
  description:
    'Extract frontend-friendly color palettes from images and copy them as reusable CSS variables.',
  alternates: {
    canonical: 'https://www.konverter-online.com/color-generator',
  },
}

const faqs = [
  {
    question: 'What kinds of images work best?',
    answer: 'Screenshots, mockups, illustrations, and product shots work well. The tool samples the image and groups similar colors into a more usable palette.',
  },
  {
    question: 'What do I get back?',
    answer: 'You get a palette preview and a copy-ready block of CSS variables that you can drop into a stylesheet or design system starting point.',
  },
  {
    question: 'Why is this useful on Konverter?',
    answer: 'Color extraction often sits next to SVG work, tokens, and asset prep in frontend projects, so it belongs close to the rest of the platform.',
  },
]

export default function ColorGeneratorPage() {
  const breadcrumbs = generateBreadcrumbs('/color-generator')

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      <ToolPageLayout
        toolPath="/color-generator"
        eyebrow="Frontend tools"
        title="Pull usable color palettes out of screenshots, mockups, or artwork"
        description="Use this when you need a quick palette from a reference image and want the result as copyable CSS instead of a vague inspiration board."
        highlights={['Upload or URL input', 'Palette preview', 'CSS variable export']}
        toolNote="A quick way to turn a reference image into a palette you can actually use in CSS or tokens."
        useCases={[
          {
            title: 'Building a quick style direction',
            description: 'Grab a palette from a product screenshot or mockup and turn it into a starting point for frontend variables.',
          },
          {
            title: 'Matching an existing asset',
            description: 'Extract the dominant colors from a logo or illustration before moving into SVG editing, token setup, or UI refinement.',
          },
          {
            title: 'Creating handoff snippets',
            description: 'Copy the generated CSS variables directly into a stylesheet, design token file, or notes for the next step of a project.',
          },
        ]}
        helpfulPoints={[
          {
            title: 'Better than guessing',
            description: 'The palette is sampled from a real image, which gives you a practical baseline when you need to move quickly.',
          },
          {
            title: 'Close to frontend output',
            description: 'The copied result is shaped like something you would actually paste into code rather than a purely visual color list.',
          },
          {
            title: 'Useful with the new token tool',
            description: 'Once a palette is extracted, it becomes a solid starting point for semantic color tokens and broader frontend styling work.',
          },
        ]}
        faqs={faqs}
      >
        <ColorGenerator />
      </ToolPageLayout>
    </>
  )
}
