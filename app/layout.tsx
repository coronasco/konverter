import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
import Header from '@/components/Header'
import Breadcrumbs from '@/components/Breadcrumbs'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Konverter - Advanced SVG to CSS/JSX Converter | Free Online Tool',
  description: 'Free online SVG converter. Transform SVGs into CSS backgrounds, React components, and more. Live color editor, PDF export, responsive builder, and animation studio. Professional SVG tools for developers.',
  keywords: 'SVG converter, SVG to CSS, SVG to React, SVG to JSX, SVG optimizer, CSS background generator, React component generator, SVG tools, online converter',
  openGraph: {
    title: 'Konverter - Advanced SVG to CSS/JSX Converter',
    description: 'Free online SVG converter. Transform SVGs into CSS backgrounds, React components, and more. Live color editor, PDF export, responsive builder, and animation studio.',
    type: 'website',
    url: 'https://www.konverter-online.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Konverter - Advanced SVG to CSS/JSX Converter',
    description: 'Free online SVG converter. Transform SVGs into CSS backgrounds, React components, and more.',
  },
  alternates: {
    canonical: 'https://www.konverter-online.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-X53DYH5BFR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X53DYH5BFR');
          `}
        </Script>
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Konverter Online",
              "url": "https://www.konverter-online.com/",
              "description": "Free online developer tools for SVG conversion, JSON formatting, CSS minification, and color palette generation.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.konverter-online.com/?q={search_term}",
                "query-input": "required name=search_term"
              },
              "sameAs": [
                "https://github.com/coronasco/konverter"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          <div className="container mx-auto px-4 md:px-6 py-4">
            <Breadcrumbs />
            {children}
          </div>
        </main>
        <Analytics />
      </body>
    </html>
  )
}
