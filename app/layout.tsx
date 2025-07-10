import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
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
    url: 'https://konverter.online',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Konverter - Advanced SVG to CSS/JSX Converter',
    description: 'Free online SVG converter. Transform SVGs into CSS backgrounds, React components, and more.',
  },
  alternates: {
    canonical: 'https://konverter.online',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Konverter Online",
              "url": "https://konverter.online/",
              "description": "Free online developer tools for SVG conversion, JSON formatting, CSS minification, and color palette generation.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://konverter.online/?q={search_term}",
                "query-input": "required name=search_term"
              },
              "sameAs": [
                "https://github.com/coronasco/konverter"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
