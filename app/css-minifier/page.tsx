import { Metadata } from 'next'
import CssMinifier from '@/components/CssMinifier'
import RelatedTools from '@/components/RelatedTools'
import Footer from '@/components/Footer'
import BreadcrumbSchema, { generateBreadcrumbs } from '@/components/BreadcrumbSchema'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Zap, ArrowRight, Gauge, Sparkles } from 'lucide-react'
import { AdSenseNavigation, AdSenseBanner, AdSenseInArticle } from '@/components/AdSense'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CSS Minifier Online Free | Compress & Optimize CSS for Better Performance',
  description: 'Free online CSS minifier and compressor. Reduce CSS file size by up to 80%, add vendor prefixes automatically, remove comments and whitespace, and optimize CSS for better website performance. No registration required, trusted by web developers worldwide.',
  keywords: 'CSS minifier, CSS compressor, CSS optimizer, CSS minification, vendor prefixes, CSS optimization, online CSS tools, free CSS minifier, CSS beautifier, CSS formatter, CSS cleaner, CSS optimizer online, CSS minifier online, CSS compressor online, CSS optimization tool, CSS performance, CSS file size reduction, CSS vendor prefixes, CSS autoprefixer',
  openGraph: {
    title: 'CSS Minifier Online Free | Compress & Optimize CSS',
    description: 'Free online CSS minifier and compressor. Reduce CSS file size, add vendor prefixes, and optimize CSS for better performance.',
    type: 'website',
    url: 'https://www.konverter-online.com/css-minifier',
    images: [
      {
        url: 'https://www.konverter-online.com/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'CSS Minifier Tool',
      },
    ],
    siteName: 'Konverter Online',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSS Minifier Online Free | Compress & Optimize CSS',
    description: 'Free online CSS minifier and compressor. Professional CSS optimization tools for developers.',
    images: ['https://www.konverter-online.com/og-image.svg'],
  },
  alternates: {
    canonical: 'https://www.konverter-online.com/css-minifier',
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

const cssMinifierFAQs = [
  {
    question: "How much can CSS minification reduce file size?",
    answer: "CSS minification can reduce file size by 20-80% depending on your code style. Files with lots of comments, whitespace, and verbose formatting see the biggest reductions. Our tool typically achieves 40-60% compression on average CSS files."
  },
  {
    question: "Does minifying CSS affect browser compatibility?",
    answer: "No, CSS minification only removes whitespace, comments, and redundant code without changing functionality. However, our tool also adds vendor prefixes automatically, which actually improves browser compatibility for modern CSS properties."
  },
  {
    question: "Should I minify CSS for production?",
    answer: "Absolutely! Minified CSS loads faster, reduces bandwidth usage, and improves Core Web Vitals scores. Always use minified CSS in production while keeping the original formatted version for development."
  },
  {
    question: "Can I reverse CSS minification?",
    answer: "While you can't perfectly reverse minification (comments are lost), our tool also offers CSS beautification to format minified code with proper indentation and spacing for better readability."
  }
]

export default function CssMinifierPage() {
  const breadcrumbs = generateBreadcrumbs('/css-minifier')
  
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "CSS Minifier Online",
            "description": "Free online CSS minifier and compressor. Reduce CSS file size, add vendor prefixes, and optimize CSS for better performance.",
            "url": "https://www.konverter-online.com/css-minifier",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "CSS Minification",
              "CSS Compression",
              "Vendor Prefix Addition",
              "CSS Optimization",
              "File Size Reduction",
              "CSS Beautification"
            ],
            "author": {
              "@type": "Person",
              "name": "Daniel Zaharia"
            },
            "creator": {
              "@type": "Person",
              "name": "Daniel Zaharia"
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
            "mainEntity": cssMinifierFAQs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
      
              <div className="min-h-screen flex flex-col">
        {/* Navigation Ad */}
        <AdSenseNavigation />
        
        <CssMinifier />
        
        {/* AdSense Banner */}
        <div className="container mx-auto px-4 py-8">
          <AdSenseBanner className="max-w-4xl mx-auto" />
        </div>
        
        
        <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Why Every Website Needs CSS Optimization
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Faster loading times mean better user experience and higher search rankings. 
                Our CSS minifier gives you the edge.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Gauge className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-xl">Massive Size Reduction</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Reduce CSS file size by 20-80%. Remove comments, whitespace, and redundant code 
                    while preserving all functionality. Smaller files = faster websites.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">Auto Vendor Prefixes</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Automatically adds vendor prefixes (-webkit-, -moz-, -ms-) for better 
                    browser compatibility. No more manual prefixing or outdated CSS.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-xl">Lightning Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Process large CSS files instantly. Our optimized algorithms handle 
                    complex stylesheets with thousands of rules without breaking a sweat.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Performance Impact Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-orange-950/20 dark:via-background dark:to-red-950/20">
          <div className="container mx-auto max-w-4xl">
            {/* AdSense In-Article */}
            <AdSenseInArticle className="mb-12" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-700 to-red-600 bg-clip-text text-transparent mb-6">
                  The performance boost you&apos;ve been missing
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  I learned this the hard way when my client&apos;s e-commerce site was losing customers 
                  due to slow load times. A 2MB CSS file was killing their Core Web Vitals.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  After minifying their CSS, we saw a 60% reduction in file size and a 40% 
                  improvement in First Contentful Paint. Sales went up 15% that quarter.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Real-world performance gains:
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">File Size Reduction</span>
                    <span className="font-bold text-green-600 dark:text-green-400">-60%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">Load Time Improvement</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">-40%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">Bandwidth Savings</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">-70%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">PageSpeed Score</span>
                    <span className="font-bold text-orange-600 dark:text-orange-400">+25</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <p className="text-sm text-orange-800 dark:text-orange-200">
                    <strong>Pro tip:</strong> Always minify CSS for production, but keep the 
                    original formatted version for development and maintenance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Use Cases Section */}
        <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Perfect for Every Development Workflow
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Production Deployment</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Compress CSS before pushing to production</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Reduce CDN bandwidth costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Improve Core Web Vitals scores</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Framework Integration</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Optimize CSS for React/Vue/Angular builds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Add vendor prefixes automatically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Clean up generated CSS from frameworks</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Everything you need to know about CSS minification and optimization
              </p>
            </div>
            
            <div className="space-y-6">
              {cssMinifierFAQs.map((faq, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow border-0 bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg text-left">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto text-center">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Optimize Your CSS?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Join thousands of developers who&apos;ve boosted their website performance with our CSS minifier.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                
                <Link href="/blog/css-minifier-guide" className="border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
                  Read Our Guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Tools */}
        <div className="container mx-auto px-6 pb-12 max-w-4xl">
          <RelatedTools currentPath="/css-minifier" />
        </div>
        
        <Footer />
      </div>
    </>
  )
}