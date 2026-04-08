import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
import Header from '@/components/Header'
import Breadcrumbs from '@/components/Breadcrumbs'
import Footer from '@/components/Footer'
import { ToastContainer } from '@/components/Toast'
import './globals.css'

export const metadata: Metadata = {
  title: 'Konverter | Frontend Tools for SVG, Assets, and Browser-Based Workflows',
  description: 'Konverter is a browser-based frontend tools platform built around SVG workflows, asset prep, and code-ready utilities for developers and creators.',
  keywords: 'frontend tools, svg tools, asset workflow tools, browser-based developer tools, svg converter, design token generator, favicon generator',
  other: {
    'google-adsense-account': 'ca-pub-7278381785440044'
  },
  openGraph: {
    title: 'Konverter | Frontend Tools for SVG, Assets, and Browser-Based Workflows',
    description: 'Work faster with practical SVG utilities, frontend asset tools, and browser-based developer workflows.',
    type: 'website',
    url: 'https://www.konverter-online.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Konverter | Frontend Tools',
    description: 'Browser-based SVG and frontend asset tools for developers.',
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
        {/* Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-7278381785440044" />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7278381785440044"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script id="adsense-init" strategy="afterInteractive">
          {`
            if (typeof window !== 'undefined' && !window.adsbygoogle) {
              window.adsbygoogle = [];
            }
          `}
        </Script>
        
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
      <body>
        <Header />
        <main className="min-h-screen pt-6">
          <div className="space-y-8 pb-10">
            <Breadcrumbs />
            <div className="site-container">{children}</div>
          </div>
        </main>
        <Footer />
        <ToastContainer />
        <Analytics />
      </body>
    </html>
  )
}
