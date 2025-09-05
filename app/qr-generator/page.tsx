import { Metadata } from 'next'
import QrCodeGenerator from '@/components/QrCodeGenerator'
import RelatedTools from '@/components/RelatedTools'
import Footer from '@/components/Footer'
import BreadcrumbSchema, { generateBreadcrumbs } from '@/components/BreadcrumbSchema'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, QrCode, Smartphone, Wifi, Mail, ArrowRight, Download, Palette, Zap } from 'lucide-react'
import { AdSenseNavigation, AdSenseBanner, AdSenseInArticle } from '@/components/AdSense'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'QR Code Generator - Create Custom QR Codes Online | Free Tool',
  description: '📱 Create custom QR codes in seconds! URLs, WiFi, email, phone numbers. Add logos, colors & download PNG/SVG. Free & unlimited!',
  keywords: 'qr code generator, qr code creator, custom qr codes, wifi qr code, email qr code, phone qr code, qr code download, online qr generator, free qr code maker, qr code customizer, qr code generator online, qr code maker, qr code creator online, qr code with logo, custom qr code generator, qr code for wifi, qr code for email, qr code for phone, qr code for url, qr code generator free, qr code maker online, qr code customizer online',
  openGraph: {
    title: 'QR Code Generator - Create Custom QR Codes Online',
    description: 'Generate custom QR codes for URLs, text, email, phone numbers, and WiFi networks. Add custom logos, choose colors, and download as PNG.',
    type: 'website',
    url: 'https://www.konverter-online.com/qr-generator',
    images: [
      {
        url: 'https://www.konverter-online.com/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'QR Code Generator Tool',
      },
    ],
    siteName: 'Konverter Online',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Code Generator - Create Custom QR Codes Online',
    description: 'Generate custom QR codes for URLs, WiFi, email, and more. Free online QR code generator.',
    images: ['https://www.konverter-online.com/og-image.svg'],
  },
  alternates: {
    canonical: 'https://www.konverter-online.com/qr-generator',
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

const qrGeneratorFAQs = [
  {
    question: "What types of QR codes can I create?",
    answer: "Our generator supports URLs, plain text, email addresses, phone numbers, SMS messages, WiFi credentials, and vCard contact information. Each type is optimized for the best scanning experience across all devices."
  },
  {
    question: "Can I customize the appearance of my QR code?",
    answer: "Yes! You can customize colors, add your logo or image, adjust the size, and choose different error correction levels. Our generator maintains scannability while allowing extensive visual customization."
  },
  {
    question: "What formats can I download QR codes in?",
    answer: "You can download QR codes as PNG (for web/print), SVG (for scalable graphics), PDF (for documents), and JPEG. All formats support high resolution up to 2000x2000 pixels for crisp printing."
  },
  {
    question: "Do QR codes expire or have limits?",
    answer: "Static QR codes (like the ones we generate) never expire and have no scan limits. They contain the data directly, so they work forever without requiring our service. However, if you change the destination URL, you'll need a new QR code."
  },
  {
    question: "How do I create a WiFi QR code?",
    answer: "Select 'WiFi' as the type, enter your network name (SSID), password, and security type (WPA, WEP, or none). The generated QR code allows users to connect to your WiFi network instantly by scanning - no manual password entry needed!"
  }
]

export default function QrGeneratorPage() {
  const breadcrumbs = generateBreadcrumbs('/qr-generator')
  
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "QR Code Generator",
            "description": "Generate custom QR codes for URLs, text, email, phone numbers, and WiFi networks. Add custom logos, choose colors, and download as PNG.",
            "url": "https://www.konverter-online.com/qr-generator",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "URL QR codes",
              "WiFi QR codes",
              "Email QR codes",
              "Phone number QR codes",
              "Text QR codes",
              "vCard QR codes",
              "Custom colors and logos",
              "Multiple download formats (PNG, SVG, PDF)",
              "High resolution output",
              "Error correction levels"
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
            "mainEntity": qrGeneratorFAQs.map(faq => ({
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
        
        <QrCodeGenerator />
        
        {/* AdSense Banner */}
        <div className="container mx-auto px-4 py-8">
          <AdSenseBanner className="max-w-4xl mx-auto" />
        </div>
        
        <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Everything You Need in a QR Code Generator
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                From simple URL codes to complex WiFi sharing - our generator handles it all 
                with professional customization options.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                    <QrCode className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">Multiple QR Code Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Generate QR codes for URLs, WiFi credentials, email addresses, phone numbers, 
                    SMS messages, plain text, and vCard contact information.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Palette className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-xl">Full Customization</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Customize colors, add your logo or image, adjust size, and choose error 
                    correction levels. Make your QR codes match your brand perfectly.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Download className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-xl">Multiple Formats</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Download as PNG, SVG, PDF, or JPEG in high resolution (up to 2000x2000px). 
                    Perfect for web, print, or any other use case.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Wifi className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle className="text-xl">WiFi QR Codes</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Create WiFi QR codes that allow guests to connect instantly without 
                    typing passwords. Supports WPA, WEP, and open networks.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <CardTitle className="text-xl">Instant Generation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Generate QR codes instantly as you type. Real-time preview shows 
                    exactly how your QR code will look before downloading.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <CardTitle className="text-xl">Error Correction</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Choose from Low, Medium, Quartile, or High error correction levels. 
                    Higher levels allow QR codes to work even when partially damaged.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Use Cases Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-950/20 dark:via-background dark:to-blue-950/20">
          <div className="container mx-auto max-w-4xl">
            {/* AdSense In-Article */}
            <AdSenseInArticle className="mb-12" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent mb-6">
                  From restaurants to conferences - QR codes everywhere
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  I started using QR codes for my restaurant client&apos;s contactless menus during COVID. 
                  What began as a necessity became a game-changer for customer experience.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Now we use them for everything: WiFi sharing, digital business cards, 
                  event check-ins, and social media links. They&apos;re the bridge between 
                  physical and digital worlds.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Popular QR code uses:
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Smartphone className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Restaurant Menus</span>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Contactless dining experience</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Wifi className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">WiFi Sharing</span>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Instant network access for guests</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Business Cards</span>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Digital contact information</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <QrCode className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Event Check-ins</span>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Streamlined registration process</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-sm text-purple-800 dark:text-purple-200">
                    <strong>Pro tip:</strong> Use high error correction for QR codes that might get 
                    damaged (outdoor use, printed materials). Use low correction for digital-only codes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Business Benefits Section */}
        <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Perfect for Every Business Need
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Marketing & Events
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Link to social media profiles and websites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Event registration and check-in systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Promotional campaigns and contests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Digital business cards and networking</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                  Hospitality & Retail
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Contactless menus and ordering systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Guest WiFi access without passwords</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Product information and reviews</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Loyalty programs and special offers</span>
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
                Everything you need to know about QR code generation and usage
              </p>
            </div>
            
            <div className="space-y-6">
              {qrGeneratorFAQs.map((faq, index) => (
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
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Create Your QR Code?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Join millions of businesses using QR codes to bridge the gap between physical and digital experiences.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                
                <Link href="/blog/qr-code-generator-guide" className="border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
                  Read Our Guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Tools */}
        <div className="container mx-auto px-6 pb-12 max-w-4xl">
          <RelatedTools currentPath="/qr-generator" />
        </div>
        
        <Footer />
      </div>
    </>
  )
}