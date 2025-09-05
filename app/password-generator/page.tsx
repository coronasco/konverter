import { Metadata } from 'next'
import PasswordGenerator from '@/components/PasswordGenerator'
import RelatedTools from '@/components/RelatedTools'
import Footer from '@/components/Footer'
import BreadcrumbSchema, { generateBreadcrumbs } from '@/components/BreadcrumbSchema'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Lock, Eye, AlertTriangle, ArrowRight, KeyRound, Zap } from 'lucide-react'
import { AdSenseNavigation, AdSenseBanner, AdSenseInArticle } from '@/components/AdSense'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Password Generator - Create Strong Secure Passwords | Free Online Tool',
  description: '🔒 Generate unbreakable passwords instantly! Customizable length, symbols & strength analysis. Military-grade security. Copy with one click!',
  keywords: 'password generator, strong password, secure password, random password, password creator, password maker, online password generator, free password generator, secure password generator, password strength checker, password generator online, random password generator, strong password generator, secure password creator, password maker online, password strength analyzer, password entropy calculator, password security tool, password generator free, password strength meter',
  openGraph: {
    title: 'Password Generator - Create Strong Secure Passwords',
    description: 'Generate strong, secure passwords with our free online password generator. Customize length, character types, and strength.',
    type: 'website',
    url: 'https://www.konverter-online.com/password-generator',
    images: [
      {
        url: 'https://www.konverter-online.com/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Password Generator Tool',
      },
    ],
    siteName: 'Konverter Online',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Generator - Create Strong Secure Passwords',
    description: 'Generate strong, secure passwords with our free online password generator.',
    images: ['https://www.konverter-online.com/og-image.svg'],
  },
  alternates: {
    canonical: 'https://www.konverter-online.com/password-generator',
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

const passwordGeneratorFAQs = [
  {
    question: "How do I create a strong password?",
    answer: "A strong password should be at least 12 characters long and include a mix of uppercase letters, lowercase letters, numbers, and symbols. Avoid dictionary words, personal information, and predictable patterns. Our generator creates truly random passwords that meet all security best practices."
  },
  {
    question: "What makes a password secure?",
    answer: "Password security depends on length, complexity, and randomness. Longer passwords with diverse character types are exponentially harder to crack. Our generator uses cryptographically secure random number generation to ensure maximum unpredictability."
  },
  {
    question: "How long should my password be?",
    answer: "We recommend at least 12 characters for personal accounts and 16+ characters for business or sensitive accounts. Each additional character exponentially increases security. Our generator supports passwords up to 64 characters for maximum protection."
  },
  {
    question: "Is it safe to use an online password generator?",
    answer: "Yes, when done correctly. Our password generator runs entirely in your browser - no data is sent to our servers. The passwords are generated using your device's secure random number generator, ensuring complete privacy and security."
  },
  {
    question: "Should I use the same password for multiple accounts?",
    answer: "Never! Each account should have a unique password. If one account is compromised, unique passwords prevent hackers from accessing your other accounts. Use our generator to create different passwords for each service, then store them in a password manager."
  }
]

export default function PasswordGeneratorPage() {
  const breadcrumbs = generateBreadcrumbs('/password-generator')
  
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Password Generator",
            "description": "Generate strong, secure passwords with customizable options and real-time strength analysis.",
            "url": "https://www.konverter-online.com/password-generator",
            "applicationCategory": "SecurityApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Customizable password length (4-64 characters)",
              "Character type selection (uppercase, lowercase, numbers, symbols)",
              "Exclude similar characters",
              "Exclude ambiguous characters",
              "Real-time password strength analysis",
              "Entropy calculation",
              "Crack time estimation",
              "Copy to clipboard functionality"
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
            "mainEntity": passwordGeneratorFAQs.map(faq => ({
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
        
        <PasswordGenerator />
        
        {/* AdSense Banner */}
        <div className="container mx-auto px-4 py-8">
          <AdSenseBanner className="max-w-4xl mx-auto" />
        </div>
        
        <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Enterprise-Grade Password Security
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Built with the same security standards used by banks and government agencies. 
                Your passwords are generated using cryptographically secure methods.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                    <KeyRound className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <CardTitle className="text-xl">Cryptographic Randomness</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Uses your browser&apos;s crypto.getRandomValues() API for true randomness. 
                    No predictable patterns or pseudo-random sequences - just pure entropy.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-xl">Real-time Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Instant password strength assessment with entropy calculation and 
                    crack time estimation. See exactly how secure your password is.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">Complete Privacy</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    All generation happens in your browser. No passwords are sent to our servers, 
                    logged, or stored anywhere. Your security is completely private.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-xl">Customizable Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Fine-tune your passwords with length control (4-64 chars), character type selection, 
                    and options to exclude similar or ambiguous characters.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle className="text-xl">Security Warnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Smart detection of weak patterns, dictionary words, and common passwords. 
                    Get warned about potential security vulnerabilities before you use them.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <CardTitle className="text-xl">One-Click Copy</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Secure clipboard integration with automatic clearing after 60 seconds. 
                    Copy your password safely without leaving traces in clipboard history.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Security Education Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-red-950/20 dark:via-background dark:to-pink-950/20">
          <div className="container mx-auto max-w-4xl">
            {/* AdSense In-Article */}
            <AdSenseInArticle className="mb-12" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-700 to-pink-600 bg-clip-text text-transparent mb-6">
                  Why password security matters more than ever
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  In 2023, there were over 2,000 cyberattacks per day. Most successful breaches 
                  start with compromised passwords. Don&apos;t become a statistic.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  I&apos;ve seen too many developers use &quot;password123&quot; or their pet&apos;s name. 
                  It takes hackers less than a second to crack these. A strong, unique password 
                  is your first line of defense.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Password crack times:
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">&quot;password123&quot;</span>
                    <span className="font-bold text-red-600 dark:text-red-400">0.001 seconds</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">8 chars, mixed</span>
                    <span className="font-bold text-orange-600 dark:text-orange-400">7 hours</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">12 chars, mixed</span>
                    <span className="font-bold text-yellow-600 dark:text-yellow-400">34,000 years</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">16 chars, symbols</span>
                    <span className="font-bold text-green-600 dark:text-green-400">1 trillion years</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    <strong>Remember:</strong> Use unique passwords for every account. 
                    A password manager is essential for managing multiple strong passwords.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Best Practices Section */}
        <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Password Security Best Practices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Do This
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Use at least 12 characters (16+ for sensitive accounts)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Include uppercase, lowercase, numbers, and symbols</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Use a unique password for every account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Enable two-factor authentication when available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Use a reputable password manager</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Avoid This
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Dictionary words, names, or personal information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Sequential patterns (123456, abcdef)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Reusing passwords across multiple accounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Sharing passwords via email or text</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Storing passwords in browsers on shared computers</span>
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
                Everything you need to know about password security and generation
              </p>
            </div>
            
            <div className="space-y-6">
              {passwordGeneratorFAQs.map((faq, index) => (
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
            <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">
                Secure Your Accounts Today
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Don&apos;t wait for a security breach. Generate strong passwords now and protect your digital life.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                
                <Link href="/blog/secure-password-generation-guide" className="border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
                  Security Guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Tools */}
        <div className="container mx-auto px-6 pb-12 max-w-4xl">
          <RelatedTools currentPath="/password-generator" />
        </div>
        
        <Footer />
      </div>
    </>
  )
}