import { Metadata } from 'next'
import { getSEOConfig } from '@/lib/seo-config'

export function generateMetadata(path: string): Metadata {
  const seo = getSEOConfig(path)
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
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
    alternates: {
      canonical: seo.canonical,
    },
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      url: seo.canonical,
      siteName: 'Konverter Online',
      locale: 'en_US',
      images: [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: seo.ogImageAlt,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.twitterTitle,
      description: seo.twitterDescription,
      images: [seo.ogImage],
    },
  }
}

export function generateStructuredData(path: string) {
  const seo = getSEOConfig(path)
  return seo.structuredData
} 