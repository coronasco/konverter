import { Metadata } from 'next'
import TimeTracker from '@/components/TimeTracker'
import RelatedTools from '@/components/RelatedTools'
import Footer from '@/components/Footer'
import BreadcrumbSchema, { generateBreadcrumbs } from '@/components/BreadcrumbSchema'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, DollarSign, Shield, Zap, Target, BarChart3, CheckCircle, Users, Globe, Lock, TrendingUp, Calendar, PieChart } from 'lucide-react'
import { AdSenseNavigation, AdSenseBanner, AdSenseInArticle } from '@/components/AdSense'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'TimeTracker Pro - Free Online Time Tracking Tool for Freelancers | Konverter',
  description: 'Professional time tracking software for freelancers and remote workers. Track billable hours, calculate project costs, and boost productivity with our free online time tracker. No registration required.',
  keywords: 'time tracking software, freelancer time tracker, billable hours calculator, project time tracking, remote work tools, productivity tracker, hourly rate calculator, time management app, free time tracking, professional time tracker, work hours tracker, client billing tool, project cost calculator, time tracking for freelancers, remote work time tracker',
  openGraph: {
    title: 'TimeTracker Pro - Free Online Time Tracking Tool for Freelancers',
    description: 'Professional time tracking software for freelancers and remote workers. Track billable hours, calculate project costs, and boost productivity.',
    type: 'website',
    url: 'https://www.konverter-online.com/time-tracker',
    images: [
      {
        url: 'https://www.konverter-online.com/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'TimeTracker Pro - Free Online Time Tracking Tool for Freelancers',
      },
    ],
    siteName: 'Konverter Online',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TimeTracker Pro - Free Online Time Tracking Tool for Freelancers',
    description: 'Professional time tracking software for freelancers and remote workers. Track billable hours, calculate project costs.',
    images: ['https://www.konverter-online.com/og-image.svg'],
  },
  alternates: {
    canonical: 'https://www.konverter-online.com/time-tracker',
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

export default function TimeTrackerPage() {
  const breadcrumbs = generateBreadcrumbs('/time-tracker')
  
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "TimeTracker Pro",
            "description": "Professional time tracking software for freelancers and remote workers. Track billable hours, calculate project costs, and boost productivity with our free online time tracker.",
            "url": "https://www.konverter-online.com/time-tracker",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Real-time Time Tracking",
              "Billable Hours Calculator",
              "Project Time Management",
              "Client Billing Integration",
              "Multiple Currency Support",
              "Session History & Reports",
              "Local Data Storage",
              "No Registration Required"
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
                "name": "What is the best free time tracking software for freelancers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "TimeTracker Pro is one of the best free time tracking tools for freelancers. It offers real-time tracking, billable hours calculation, project management, and client billing features without requiring registration or payment."
                }
              },
              {
                "@type": "Question",
                "name": "How do I track billable hours for clients?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "With TimeTracker Pro, simply enter your project name, set your hourly rate, choose your currency, and start tracking. The tool automatically calculates your billable hours and earnings in real-time, making client billing effortless."
                }
              },
              {
                "@type": "Question",
                "name": "Is my time tracking data secure?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, all your time tracking data is stored locally in your browser. We don't send any information to external servers, ensuring complete privacy and data security for your sensitive client work."
                }
              },
              {
                "@type": "Question",
                "name": "Can I track multiple projects simultaneously?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, you can track multiple projects with different categories, hourly rates, and currencies. Each session is saved with complete details, allowing you to manage multiple client projects efficiently."
                }
              },
              {
                "@type": "Question",
                "name": "What currencies are supported for billing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "TimeTracker Pro supports multiple currencies including USD, EUR, GBP, RON, CAD, AUD, CHF, and JPY with proper currency symbols and formatting for international freelancers."
                }
              }
            ]
          })
        }}
      />
      <div className="min-h-screen flex flex-col">
        {/* Navigation Ad */}
        <AdSenseNavigation />
        
        <TimeTracker />
        
        {/* AdSense Banner */}
        <div className="container mx-auto px-4 py-8">
          <AdSenseBanner className="max-w-4xl mx-auto" />
        </div>
        
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                The Ultimate Free Time Tracking Solution for Freelancers and Remote Workers
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Transform your productivity with TimeTracker Pro, the most comprehensive free time tracking software designed specifically for freelancers, consultants, and remote workers. Track billable hours, calculate project costs, and boost your earning potential with our intuitive, feature-rich platform.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  ✓ 100% Free Forever
                </span>
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  ✓ No Registration Required
                </span>
                <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  ✓ Client Billing Ready
                </span>
                <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                  ✓ Multi-Currency Support
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose TimeTracker Pro */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Freelancers Choose TimeTracker Pro Over Expensive Alternatives
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Stop paying monthly fees for complex time tracking software. Our free solution provides everything you need to manage your freelance business efficiently and professionally.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">Real-Time Billable Hours Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Monitor your work time with precision and see your earnings grow in real-time. Perfect for freelancers who need accurate client billing and project cost tracking.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                    <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-xl">Advanced Client Billing Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Automatically calculate project costs, client invoices, and hourly earnings. Support for multiple currencies makes international freelancing effortless.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-xl">Complete Data Privacy & Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    All your sensitive client data stays on your device. No cloud storage, no data breaches, no privacy concerns. Your freelance business information remains completely secure.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle className="text-xl">Instant Setup, Zero Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Start tracking time immediately without registration, downloads, or complex setup. Perfect for busy freelancers who need productivity tools that work right away.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <CardTitle className="text-xl">Project Management Made Simple</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Organize multiple client projects with custom categories and detailed session tracking. Perfect for freelancers juggling multiple clients and deadlines.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <CardTitle className="text-xl">Comprehensive Productivity Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Track your productivity patterns, analyze project profitability, and optimize your freelance business with detailed time tracking reports and insights.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* AdSense In-Article */}
        <AdSenseInArticle className="my-8" />

        {/* How It Works */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                How to Start Tracking Time and Boosting Your Freelance Income
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Get started with professional time tracking in under 60 seconds. Our streamlined process makes it easy to track billable hours and maximize your earning potential.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Enter Project Details</h3>
                <p className="text-muted-foreground">
                  Add your client project name, select a category, and set your hourly rate. Only the project name is required to start tracking.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Choose Your Currency</h3>
                <p className="text-muted-foreground">
                  Select from USD, EUR, GBP, RON, CAD, AUD, CHF, JPY, and more. Perfect for international freelancers working with global clients.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Start Professional Tracking</h3>
                <p className="text-muted-foreground">
                  Click start to begin tracking your billable hours. Watch your earnings calculate in real-time as you work on client projects.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Generate Client Invoices</h3>
                <p className="text-muted-foreground">
                  Stop tracking when done. Your session is automatically saved with all details needed for accurate client billing and invoicing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Deep Dive */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Advanced Features That Set TimeTracker Pro Apart
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Discover the powerful features that make TimeTracker Pro the preferred choice for professional freelancers and remote workers worldwide.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Real-Time Earnings Calculation</h3>
                    <p className="text-muted-foreground">
                      Watch your billable hours and earnings update in real-time as you work. No more guessing or manual calculations - see exactly how much you&apos;re earning per hour, per project, and per client.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Multi-Client Project Management</h3>
                    <p className="text-muted-foreground">
                      Effortlessly manage multiple client projects with custom categories, different hourly rates, and separate billing cycles. Perfect for freelancers with diverse client portfolios.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">International Currency Support</h3>
                    <p className="text-muted-foreground">
                      Work with clients worldwide using their preferred currency. Support for major currencies including USD, EUR, GBP, and many more with accurate exchange rate calculations.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                      <Lock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Complete Data Privacy</h3>
                    <p className="text-muted-foreground">
                      Your sensitive client data never leaves your device. All time tracking information is stored locally, ensuring complete privacy and security for your freelance business.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                      <PieChart className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Detailed Session Analytics</h3>
                    <p className="text-muted-foreground">
                      Analyze your productivity patterns, track project profitability, and identify your most valuable clients with comprehensive time tracking reports and insights.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Session History & Reporting</h3>
                    <p className="text-muted-foreground">
                      Maintain detailed records of all your work sessions with timestamps, durations, and earnings. Perfect for tax purposes, client reporting, and business analysis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits for Different User Types */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Perfect for Every Type of Freelancer and Remote Worker
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Whether you&apos;re a seasoned freelancer or just starting your remote work journey, TimeTracker Pro adapts to your needs and helps you succeed.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">Web Developers & Designers</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Track development time, design iterations, and client revisions. Perfect for calculating project costs and ensuring profitable web development contracts.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-xl">Content Writers & Copywriters</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Monitor writing time, research hours, and revision cycles. Essential for per-hour billing and understanding your true writing productivity.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-xl">Consultants & Advisors</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Track consultation time, research hours, and client meetings. Perfect for professional services billing and maintaining accurate client records.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle className="text-xl">Digital Marketers</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Monitor campaign management time, strategy development, and client communication. Essential for agency billing and project profitability analysis.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <CardTitle className="text-xl">Virtual Assistants</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Track administrative tasks, client support time, and project management hours. Perfect for hourly billing and demonstrating value to clients.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <CardTitle className="text-xl">Remote Workers</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Monitor work-from-home productivity, track project completion times, and maintain professional time records for remote work reporting.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* AdSense Banner */}
        <div className="container mx-auto px-4 py-8">
          <AdSenseBanner className="max-w-4xl mx-auto" />
        </div>

        {/* FAQ Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Frequently Asked Questions About Time Tracking for Freelancers
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Get answers to common questions about time tracking, billing, and productivity for freelancers and remote workers.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">What makes TimeTracker Pro better than other free time tracking tools?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    TimeTracker Pro is specifically designed for freelancers and remote workers. Unlike generic time tracking apps, it focuses on billable hours calculation, client project management, and professional invoicing. Our tool offers real-time earnings tracking, multiple currency support, and complete data privacy - all without requiring registration or payment.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">How accurate is the billable hours calculation?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our time tracking is accurate to the second, providing precise billable hours calculation for client invoicing. The real-time earnings display updates every second, ensuring you always know exactly how much you&apos;ve earned. This level of accuracy is essential for professional freelancers who need to maintain client trust and ensure fair billing.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Can I use this tool for multiple clients and projects?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Absolutely! TimeTracker Pro is designed for freelancers managing multiple clients. You can create separate projects for each client, set different hourly rates, use various currencies, and organize work with custom categories. Each session is saved with complete details, making it easy to generate accurate invoices for different clients.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Is my client data secure and private?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, complete privacy and security are our top priorities. All your time tracking data, client information, and project details are stored locally in your browser. We never send any information to external servers, ensuring your sensitive freelance business data remains completely private and secure.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Do I need to create an account or provide personal information?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    No registration or personal information required! TimeTracker Pro works immediately in your browser without any signup process. This makes it perfect for freelancers who value privacy and want to start tracking time instantly without barriers or commitments.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">How can I export my time tracking data for invoicing?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All your session data is saved locally and can be easily accessed through the session history. Each session includes project name, duration, hourly rate, earnings, and timestamps - everything you need for professional client invoicing. The data is organized chronologically and can be used to create detailed invoices for your clients.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Tracking Your Time and Boosting Your Freelance Income Today
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful freelancers who use TimeTracker Pro to maximize their productivity and earnings. No registration, no fees, no limits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#time-tracker" className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                Start Free Time Tracking
              </Link>
              <Link href="/" className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                Explore More Tools
              </Link>
            </div>
          </div>
        </section>

        <RelatedTools currentPath="/time-tracker" />
        <Footer />
      </div>
    </>
  )
}