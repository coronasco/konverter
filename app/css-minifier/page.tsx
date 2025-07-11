import { Metadata } from 'next'
import CssMinifier from '@/components/CssMinifier'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'CSS Minifier Online Free | Compress & Optimize CSS for Better Performance',
  description: 'Free online CSS minifier and compressor. Reduce CSS file size by up to 80%, add vendor prefixes automatically, and optimize CSS for better website performance. No signup required, trusted by web developers worldwide.',
  keywords: 'CSS minifier, CSS compressor, CSS optimizer, CSS minification, vendor prefixes, CSS optimization, online CSS tools, free CSS minifier',
  openGraph: {
    title: 'CSS Minifier Online Free | Compress & Optimize CSS',
    description: 'Free online CSS minifier and compressor. Reduce CSS file size, add vendor prefixes, and optimize CSS for better performance.',
    type: 'website',
    url: 'https://www.konverter-online.com/css-minifier',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSS Minifier Online Free | Compress & Optimize CSS',
    description: 'Free online CSS minifier and compressor. Professional CSS optimization tools for developers.',
  },
  alternates: {
    canonical: 'https://www.konverter-online.com/css-minifier',
  },
}

export default function CssMinifierPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CssMinifier />
      {/* Personal story & SEO context in English */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-green-950/20 dark:via-background dark:to-blue-950/20">
        <div className="container mx-auto max-w-3xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-blue-600 bg-clip-text text-transparent mb-4">
            Performance optimization made simple
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            My Lighthouse scores were suffering because of bloated CSS files. I was tired of manually removing comments and whitespace, and even more tired of dealing with browser compatibility issues. This CSS Minifier is my solution to the performance headaches that every frontend developer faces.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Real-world scenarios where this saves the day:
          </p>
          <ul className="text-left mx-auto max-w-xl text-base text-muted-foreground list-disc list-inside space-y-2">
            <li>Optimizing CSS bundles before deployment to improve Core Web Vitals</li>
            <li>Adding vendor prefixes for older browsers without breaking modern ones</li>
            <li>Cleaning up CSS from design tools like Figma or Sketch</li>
            <li>Comparing before/after to see exactly what&apos;s being optimized</li>
          </ul>
          <p className="text-lg text-muted-foreground leading-relaxed">
            <b>Performance tip:</b> Every kilobyte counts on mobile. Minify your CSS, enable auto-prefixer for maximum compatibility, and watch your PageSpeed Insights scores improve. Your users will notice the difference.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Built this tool because I believe performance optimization shouldn&apos;t be complicated. Drop in your CSS, get optimized output, and deploy with confidence. No more excuses for slow websites.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  )
} 