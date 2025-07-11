import { Metadata } from 'next'
import SvgConverter from '@/components/SvgConverter'
import Footer from '@/components/Footer'
import ShareButton from '@/components/ShareButton'
import { Code, Palette, CheckCircle, Droplets, FileText, Maximize2, PlayCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Konverter - Free Online Developer Tools | SVG to React Converter, JSON Formatter, CSS Minifier',
  description: 'Free online developer tools: SVG to React converter, JSON formatter, CSS minifier, password generator, URL shortener, Base64 converter, color generator, QR code generator. No registration required, trusted by developers worldwide.',
  keywords: 'developer tools, SVG converter, SVG to React, SVG to JSX, JSON formatter, JSON beautifier, CSS minifier, CSS compressor, password generator, URL shortener, Base64 converter, color generator, QR code generator, free online tools, web development tools, frontend tools, coding tools',
  openGraph: {
    title: 'Konverter - Free Online Developer Tools | SVG to React Converter',
    description: 'Free online developer tools: SVG to React converter, JSON formatter, CSS minifier, password generator, and more. No registration required.',
    type: 'website',
    url: 'https://www.konverter-online.com',
    images: [
      {
        url: 'https://www.konverter-online.com/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Konverter - Free Online Developer Tools',
      },
    ],
    siteName: 'Konverter Online',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Konverter - Free Online Developer Tools | SVG to React Converter',
    description: 'Free online developer tools: SVG to React converter, JSON formatter, CSS minifier, and more.',
    images: ['https://www.konverter-online.com/og-image.svg'],
    creator: '@konverter_online',
  },
  alternates: {
    canonical: 'https://www.konverter-online.com',
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
  }
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Konverter Online",
            "description": "Free online developer tools for SVG conversion, JSON formatting, CSS minification, password generation, URL shortening, Base64 encoding, color palette extraction, and QR code generation.",
            "url": "https://www.konverter-online.com",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "SVG to React Converter",
              "JSON Formatter and Validator",
              "CSS Minifier and Optimizer",
              "Password Generator",
              "URL Shortener",
              "Base64 Encoder/Decoder",
              "Color Palette Generator",
              "QR Code Generator"
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
            "isAccessibleForFree": true,
            "softwareVersion": "1.0.0"
          })
        }}
      />
      <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-600 bg-clip-text text-transparent">
            Transform SVGs into Whatever You Need
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                         Tired of wrestling with SVG conversions? Drop your files here and get them back as CSS backgrounds, 
             React components, or whatever format your project craves. Plus, edit colors live and export to PDF. 
             Because life&apos;s too short for manual conversions! 
          </p>
          <div className='flex items-center justify-center gap-4 flex-wrap'>
            <span className='text-xs text-black bg-amber-300 px-4 py-2 rounded-full font-bold'>Always Free</span>
            <span className='text-xs text-white bg-green-600 px-4 py-2 rounded-full font-bold'>Live Color Editor</span>
            <span className='text-xs text-white bg-purple-600 px-4 py-2 rounded-full font-bold'>PDF Export</span>
            <span className='text-xs text-white bg-blue-600 px-4 py-2 rounded-full font-bold'>Responsive Builder</span>
            <span className='text-xs text-white bg-pink-600 px-4 py-2 rounded-full font-bold'>Animation Studio</span>
            <ShareButton />
          </div>
        </div>
      </section>

      {/* Main Converter */}
      <section className="pb-16 px-2 md:px-6" id="converter">
        <div className="container mx-auto">
          <SvgConverter />
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-cyan-600 bg-clip-text text-transparent">
                  Why I built this thing
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-white to-cyan-600 rounded-full mx-auto"></div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                                 Hey! 👋 I&apos;m Daniel, and I got fed up with the SVG conversion circus. You find this perfect icon, 
                 but it&apos;s bloated with unnecessary junk, and you need it as a CSS background or React component yesterday.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The existing tools were either painfully slow, clunky as a brick, or hidden behind paywalls. 
                So I built Konverter - a lightning-fast, completely free tool that does exactly what we developers need. 
                No more jumping between different converters or dealing with interfaces from the stone age.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                                 Just drag, drop, and boom - you&apos;ve got your optimized SVG in whatever format you want. 
                 Because honestly, we have better things to do than wrestle with file conversions! 
                 I&apos;ve just added live color editing and PDF export because... why not make it even more awesome?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What makes this tool special?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built by a developer who actually uses this stuff daily
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Droplets className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  Live Color Editor
                  <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">NEW</span>
                </CardTitle>
                <CardDescription>
                  Change colors on the fly with intuitive color picker. Perfect when you need to match brand colors 
                  or just want to experiment with different looks without opening another app.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Visual picker for each element
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    See changes instantly
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Reset with one click
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-purple-200 dark:border-purple-800">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  PDF Export
                  <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">NEW</span>
                </CardTitle>
                <CardDescription>
                  Turn your SVGs into crisp PDFs for presentations, docs, or client handoffs. 
                  Because sometimes you need something more than just code.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    High-res PDF output
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    Vector quality intact
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    Perfect for docs & presentations
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Maximize2 className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  Responsive Builder
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">NEW</span>
                </CardTitle>
                <CardDescription>
                  Automatically generate responsive CSS for your graphics. Because your SVGs should look 
                  great on everything from phones to giant monitors.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    Smart viewBox detection
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    Responsive CSS magic
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    Preview on all devices
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-pink-200 dark:border-pink-800">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center mb-4">
                  <PlayCircle className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  Animation Studio
                  <span className="text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-2 py-1 rounded-full">NEW</span>
                </CardTitle>
                <CardDescription>
                  Bring your SVGs to life with our visual timeline editor. Create smooth animations 
                  without touching a single line of code.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-600" />
                    Visual timeline editor
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-600" />
                    CSS & JS export
          </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-600" />
                    Real-time preview
          </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
                         <h2 className="text-3xl font-bold mb-4">How it works (spoiler: it&apos;s super simple)</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
                             Three steps and you&apos;re done. No rocket science involved.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Drop your SVG</h3>
              <p className="text-muted-foreground">
                                 Drag and drop or paste the code. We&apos;re not picky about how you get it here.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Tweak & transform</h3>
              <p className="text-muted-foreground">
                Change colors, optimize, and pick your output format. The fun part!
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Grab & go</h3>
              <p className="text-muted-foreground">
                Copy the code, export as PDF, or download. Then get back to building awesome stuff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Built for people who build things</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
                             Whether you&apos;re crafting React apps, styling with CSS, or just trying to make things look good
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-600" />
                  React Developers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Turn SVGs into React components
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Clean, optimized JSX
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Props ready for customization
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <Link href="/#converter" className="text-blue-600 hover:underline">Try our SVG to JSX converter →</Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-purple-600" />
                  CSS Wizards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    URL-encoded CSS backgrounds
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Base64 encoded images
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Optimized for speed
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <Link href="/#converter" className="text-purple-600 hover:underline">Convert SVGs to CSS backgrounds →</Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-green-600" />
                  Design Folks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Live color experimentation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    PDF export for presentations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Brand color matching
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-orange-600" />
                  Project Coordinators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    PDF documentation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Client deliverables
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Asset organization
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-muted-foreground">Free Forever</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">3 Formats</div>
              <div className="text-muted-foreground">Output Options</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">Live Editing</div>
              <div className="text-muted-foreground">Color Picker</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">PDF Export</div>
              <div className="text-muted-foreground">High Quality</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">Responsive</div>
              <div className="text-muted-foreground">Auto CSS</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">Animations</div>
              <div className="text-muted-foreground">Timeline Editor</div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Learn More About SVG & Web Development</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tips, tricks, and guides to help you master SVG conversion and web development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">SVG to JSX: The Ultimate Guide</CardTitle>
                <CardDescription>
                  Learn how to transform your SVG icons into reusable React components with TypeScript support and color customization.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/blog/svg-to-jsx-guide" className="text-blue-600 hover:underline font-medium">
                  Read the guide →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">SVG Optimization Guide</CardTitle>
                <CardDescription>
                  Discover techniques to reduce SVG file sizes while maintaining quality and performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/blog/svg-optimization-guide" className="text-blue-600 hover:underline font-medium">
                  Read the guide →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">CSS Background Techniques</CardTitle>
                <CardDescription>
                  Master the art of using SVGs as CSS backgrounds for stunning visual effects.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/blog/css-background-techniques" className="text-blue-600 hover:underline font-medium">
                  Read the guide →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  )
}
