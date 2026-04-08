import { Metadata } from 'next'
import FaviconPwaGenerator from '@/components/FaviconPwaGenerator'
import BreadcrumbSchema, { generateBreadcrumbs } from '@/components/BreadcrumbSchema'
import FAQSchema from '@/components/FAQSchema'
import ToolPageLayout from '@/components/ToolPageLayout'

export const metadata: Metadata = {
  title: 'Favicon + PWA Asset Pack Generator | Konverter',
  description:
    'Generate favicons, app icons, a web manifest, and HTML tags from one uploaded logo with a browser-based asset workflow.',
  alternates: {
    canonical: 'https://www.konverter-online.com/favicon-generator',
  },
}

const faqs = [
  {
    question: 'What files does the generator create?',
    answer: 'It generates standard favicon PNGs, Apple touch icons, Android/PWA icons, maskable icons, a web manifest, an HTML tag snippet, and a bundled ZIP export.',
  },
  {
    question: 'Can I start from SVG?',
    answer: 'Yes. SVG is the best input for clean scaling, but PNG and other common image formats are also supported.',
  },
  {
    question: 'Why include maskable icons?',
    answer: 'Maskable icons are useful for Android and PWA installs because they preserve a safer content area inside adaptive icon shapes.',
  },
]

export default function FaviconGeneratorPage() {
  const breadcrumbs = generateBreadcrumbs('/favicon-generator')

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      <ToolPageLayout
        toolPath="/favicon-generator"
        eyebrow="SVG tools"
        title="Turn one logo into the favicon and app icon files a site actually needs"
        description="Upload the logo, check the previews, and export the pack with the manifest and HTML tags."
        highlights={['ZIP export', 'Manifest + HTML snippet', 'Maskable icon support']}
        toolNote="Upload one logo, check the previews, and leave with the files most sites and PWAs actually need."
        useCases={[
          {
            title: 'Launching a new site or PWA',
            description: 'Create the basic favicon, Apple touch icon, Android icons, and manifest in one pass instead of stitching the pack together manually.',
          },
          {
            title: 'Refreshing an existing brand icon set',
            description: 'Swap in a new SVG or PNG logo, adjust padding and background, then export a fresh asset pack with matching implementation tags.',
          },
          {
            title: 'Handing assets to a frontend team',
            description: 'The ZIP package keeps file names, manifest output, and HTML tags together so the next step is clearer for implementation.',
          },
        ]}
        helpfulPoints={[
          {
            title: 'Practical previews',
            description: 'Preview how the icon set looks in a browser tab, on a home screen, and inside a maskable-safe area before you export it.',
          },
          {
            title: 'Implementation details included',
            description: 'Manifest content and HTML tags are part of the workflow, which makes the tool useful beyond simple image export.',
          },
          {
            title: 'Good fit for SVG-first work',
            description: 'This builds directly on the site’s SVG and asset-prep focus instead of expanding into unrelated product territory.',
          },
        ]}
        faqs={faqs}
      >
        <FaviconPwaGenerator />
      </ToolPageLayout>
    </>
  )
}
