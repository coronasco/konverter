import { Metadata } from 'next'
import JsonFormatter from '@/components/JsonFormatter'
import RelatedTools from '@/components/RelatedTools'
import Footer from '@/components/Footer'
import BreadcrumbSchema, { generateBreadcrumbs } from '@/components/BreadcrumbSchema'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, FileText, Zap, ArrowRight } from 'lucide-react'
import { AdSenseNavigation, AdSenseBanner, AdSenseInArticle } from '@/components/AdSense'
import Link from 'next/link'

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
  const breadcrumbs = generateBreadcrumbs('/json-formatter')
  
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
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
        {/* Navigation Ad */}
        <AdSenseNavigation />
        
        <JsonFormatter />
        
        {/* AdSense Banner */}
        <div className="container mx-auto px-4 py-8">
          <AdSenseBanner className="max-w-4xl mx-auto" />
        </div>
        
        
        <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose Our JSON Formatter?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Built by developers, for developers. Experience the difference with our advanced JSON processing engine.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-xl">Advanced Validation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Detects syntax errors, missing commas, unclosed brackets, and invalid escape sequences. 
                    Shows exact line and character position for quick debugging.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">Smart Formatting</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Intelligent indentation with customizable spacing. 
                    Preserves data structure while making it human-readable.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-xl">Lightning Fast</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Process large JSON files instantly. 
                    Optimized algorithms handle complex nested structures without breaking a sweat.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Personal Story Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20">
          <div className="container mx-auto max-w-4xl">
            {/* AdSense In-Article */}
            <AdSenseInArticle className="mb-12" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent mb-6">
                  The JSON debugging tool I always wanted
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Ever spent 30 minutes debugging a JSON parsing error only to find it was a missing comma? 
                  Yeah, me too. That&apos;s why I built this JSON Formatter.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  It&apos;s not just another online tool—it&apos;s the debugging companion I wish I had when I was 
                  knee-deep in API integrations and microservice configs.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  My daily workflow:
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Validating webhook payloads before processing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Converting API responses to YAML for Kubernetes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Minifying large datasets for faster responses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Beautifying legacy config files</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Pro tip:</strong> Always validate JSON configs before deploying. 
                    A single syntax error can bring down your entire service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Format Your JSON?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Join thousands of developers who trust our JSON formatter for their daily workflow.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                
                <Link href="/blog/json-formatter-guide" className="border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
                  Read Our Guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
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