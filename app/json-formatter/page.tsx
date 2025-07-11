import { Metadata } from 'next'
import JsonFormatter from '@/components/JsonFormatter'
import RelatedTools from '@/components/RelatedTools'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'JSON Formatter Online Free | Beautify, Minify & Validate JSON Instantly',
  description: 'Free online JSON formatter, beautifier, minifier, and validator. Format JSON with proper indentation, compress JSON for production, validate JSON syntax errors, and convert JSON to YAML. No registration required, trusted by developers worldwide.',
  keywords: 'JSON formatter, JSON beautifier, JSON minifier, JSON validator, JSON to YAML, JSON converter, online JSON tools, free JSON formatter, JSON prettifier, JSON syntax checker, JSON compressor, JSON parser, JSON editor, JSON viewer, JSON linter, JSON validator online, JSON formatter online, JSON beautifier online, JSON minifier online',
  openGraph: {
    title: 'JSON Formatter Online Free | Beautify, Minify & Validate JSON',
    description: 'Free online JSON formatter, validator, and converter. Beautify JSON, minify JSON, validate JSON syntax, and convert JSON to YAML.',
    type: 'website',
    url: 'https://www.konverter-online.com/json-formatter',
    images: [
      {
        url: 'https://www.konverter-online.com/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'JSON Formatter Tool',
      },
    ],
    siteName: 'Konverter Online',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter Online Free | Beautify, Minify & Validate JSON',
    description: 'Free online JSON formatter, validator, and converter. Professional JSON tools for developers.',
    images: ['https://www.konverter-online.com/og-image.svg'],
  },
  alternates: {
    canonical: 'https://www.konverter-online.com/json-formatter',
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

export default function JsonFormatterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "JSON Formatter Online",
            "description": "Free online JSON formatter, beautifier, minifier, and validator. Format JSON with proper indentation, compress JSON for production, validate JSON syntax errors, and convert JSON to YAML.",
            "url": "https://www.konverter-online.com/json-formatter",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "JSON Beautifier",
              "JSON Minifier",
              "JSON Validator",
              "JSON to YAML Converter",
              "Syntax Error Detection",
              "Real-time Formatting"
            ],
            "author": {
              "@type": "Person",
              "name": "Daniel Zahav"
            },
            "creator": {
              "@type": "Person",
              "name": "Daniel Zahav"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Konverter Online"
            },
            "inLanguage": "en-US",
            "isAccessibleForFree": true
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is JSON formatting?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "JSON formatting is the process of adding proper indentation, spacing, and structure to JSON data to make it more readable and organized."
                }
              },
              {
                "@type": "Question",
                "name": "Why should I minify JSON?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Minifying JSON removes unnecessary whitespace and comments to reduce file size, which improves loading times and reduces bandwidth usage."
                }
              },
              {
                "@type": "Question",
                "name": "How do I validate JSON?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "JSON validation checks if your JSON data follows the correct syntax rules. Our tool automatically detects and highlights syntax errors."
                }
              },
              {
                "@type": "Question",
                "name": "Can I convert JSON to YAML?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, our tool can convert JSON data to YAML format, which is often more readable and commonly used in configuration files."
                }
              }
            ]
          })
        }}
      />
      <div className="min-h-screen flex flex-col">
      <JsonFormatter />
      {/* Personal story & SEO context in English */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20">
        <div className="container mx-auto max-w-3xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent mb-4">
            The JSON debugging tool I always wanted
          </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
              Ever spent 30 minutes debugging a JSON parsing error only to find it was a missing comma? Yeah, me too. That&apos;s why I built this JSON Formatter. It&apos;s not just another online tool—it&apos;s the debugging companion I wish I had when I was knee-deep in API integrations and microservice configs.
            </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            My daily workflow with this tool:
          </p>
          <ul className="text-left mx-auto max-w-xl text-base text-muted-foreground list-disc list-inside space-y-2">
            <li>Validating webhook payloads before processing them in production</li>
            <li>Converting API responses to YAML for Kubernetes deployments</li>
            <li>Minifying large JSON datasets for faster API responses</li>
            <li>Beautifying legacy config files that look like they were written by a cat</li>
          </ul>
                      <p className="text-lg text-muted-foreground leading-relaxed">
              <b>Pro tip:</b> Use the validator before deploying any JSON-based config. A single syntax error can bring down your entire service. And always convert to YAML for Kubernetes—it&apos;s just more readable than JSON for configs.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Built this because I was tired of context-switching between different tools. Now everything happens in one place, client-side, with zero privacy concerns. If you&apos;re dealing with JSON daily, this should save you hours.
            </p>
        </div>
      </section>
      
      {/* Related Tools */}
      <div className="container mx-auto px-6 pb-12 max-w-4xl">
        <RelatedTools currentPath="/json-formatter" />
      </div>
      <Footer />
    </div>
    </>
  )
} 