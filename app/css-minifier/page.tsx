import { Metadata } from 'next'
import CssMinifier from '@/components/CssMinifier'
import BreadcrumbSchema, { generateBreadcrumbs } from '@/components/BreadcrumbSchema'
import FAQSchema from '@/components/FAQSchema'
import ToolPageLayout from '@/components/ToolPageLayout'

export const metadata: Metadata = {
  title: 'CSS Minifier | Konverter',
  description:
    'Minify CSS, estimate savings, and download cleaner stylesheet output with a browser-based frontend workflow.',
  alternates: {
    canonical: 'https://www.konverter-online.com/css-minifier',
  },
}

const faqs = [
  {
    question: 'What does this minifier remove?',
    answer: 'It strips comments, trims unnecessary whitespace, tightens declarations, and removes redundant semicolons before closing braces.',
  },
  {
    question: 'What is the auto-prefixer toggle for?',
    answer: 'It adds a small set of vendor-prefixed properties before minification so you can generate a more compatibility-friendly output quickly.',
  },
  {
    question: 'Can I keep the minified file?',
    answer: 'Yes. The tool keeps copy and download actions in place so you can grab the result as text or as a ready-to-save CSS file.',
  },
]

export default function CssMinifierPage() {
  const breadcrumbs = generateBreadcrumbs('/css-minifier')

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      <ToolPageLayout
        toolPath="/css-minifier"
        eyebrow="Frontend tools"
        title="Trim CSS output before it goes into production"
        description="Use the minifier when you need lighter stylesheets, quick size checks, and a straightforward way to copy or download the result."
        highlights={['Copy and download', 'Before and after preview', 'Optional vendor prefixes']}
        toolNote="Good for the last quick pass before a stylesheet goes into production, a snippet gets shared, or a file gets handed off."
        useCases={[
          {
            title: 'Prepping a stylesheet for deployment',
            description: 'Paste a block of CSS, compress it, and download a smaller version without opening another local tool or build step.',
          },
          {
            title: 'Comparing output quickly',
            description: 'The side-by-side preview makes it easier to inspect how much noise was removed before you move the code back into a project.',
          },
          {
            title: 'Light compatibility cleanup',
            description: 'Toggle vendor prefixes when you need a quick pass for older syntax coverage without a larger pipeline.',
          },
        ]}
        helpfulPoints={[
          {
            title: 'Focused on the core job',
            description: 'Paste CSS, minify it, check the savings, and grab the output without extra noise around the task.',
          },
          {
            title: 'Readable at a glance',
            description: 'Statistics, copy, and download actions stay close to the minified output so the workflow is easy to scan.',
          },
          {
            title: 'Useful in handoff moments',
            description: 'It works well when you need a quick minify pass for demos, snippets, or fixes outside the main build pipeline.',
          },
        ]}
        faqs={faqs}
      >
        <CssMinifier />
      </ToolPageLayout>
    </>
  )
}
