import { Metadata } from 'next'
import ColorGenerator from '@/components/ColorGenerator'
import RelatedTools from '@/components/RelatedTools'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Color Generator Online Free | Extract Color Palettes from Images Instantly',
  description: 'Free online color palette generator. Extract beautiful color schemes from images, upload photos or use URLs. Generate CSS color variables, hex codes, RGB values, and HSL colors. No registration required, perfect for designers and developers.',
  keywords: 'color generator, color palette, color extractor, image color picker, CSS color variables, hex colors, color scheme generator, free color palette, color palette generator, color extractor from image, image color picker online, color scheme generator online, color palette from image, color picker from image, color extractor tool, color palette generator online, color scheme generator free, color palette extractor, image to color palette, color palette from photo, color scheme from image, color palette generator free',
  openGraph: {
    title: 'Color Generator Online Free | Extract Color Palettes from Images',
    description: 'Free online color palette generator. Extract beautiful color schemes from images, upload photos or use URLs.',
    type: 'website',
    url: 'https://www.konverter-online.com/color-generator',
    images: [
      {
        url: 'https://www.konverter-online.com/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Color Generator Tool',
      },
    ],
    siteName: 'Konverter Online',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Generator Online Free | Extract Color Palettes from Images',
    description: 'Free online color palette generator. Extract beautiful color schemes from images.',
    images: ['https://www.konverter-online.com/og-image.svg'],
  },
  alternates: {
    canonical: 'https://www.konverter-online.com/color-generator',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function ColorGeneratorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <ColorGenerator />
      {/* Personal story & SEO context in English */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-950/20 dark:via-background dark:to-pink-950/20">
        <div className="container mx-auto max-w-3xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-4">
            Turn inspiration into code instantly
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I&apos;m obsessed with beautiful design, but I&apos;m also a developer who needs to ship fast. This Color Generator bridges that gap perfectly. See a stunning photo? Drop it in and get a palette that actually works in your code. No more guessing, no more color theory headaches—just pure inspiration turned into usable CSS variables.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            How this transforms my creative process:
          </p>
          <ul className="text-left mx-auto max-w-xl text-base text-muted-foreground list-disc list-inside space-y-2">
            <li>Extracting brand colors from client logos for consistent theming</li>
            <li>Creating seasonal palettes from nature photos for marketing campaigns</li>
            <li>Building accessible color schemes that work across all devices</li>
            <li>Sharing visual inspiration with designers and stakeholders</li>
          </ul>
          <p className="text-lg text-muted-foreground leading-relaxed">
            <b>Design tip:</b> Start with high-resolution images for the best color extraction. The preview cards show you exactly how your palette will look in real UI. And remember—good color choices can make or break user experience.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Built this because I believe the gap between inspiration and implementation should be seamless. Whether you&apos;re a designer, developer, or both, this tool helps you move from vision to reality faster than ever.
          </p>
        </div>
      </section>
      
      {/* Related Tools */}
      <div className="container mx-auto px-6 pb-12 max-w-4xl">
        <RelatedTools currentPath="/color-generator" />
      </div>
      <Footer />
    </div>
  )
} 