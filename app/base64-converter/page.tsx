import { Metadata } from 'next'
import Base64Converter from '@/components/Base64Converter'
import RelatedTools from '@/components/RelatedTools'
import Footer from '@/components/Footer'
import { AdSenseNavigation, AdSenseBanner, AdSenseInArticle } from '@/components/AdSense'

export const metadata: Metadata = {
  title: 'Base64 Encoder/Decoder - Free Online Tool | Convert Text & Files to Base64',
  description: 'Free online Base64 encoder and decoder. Convert text, files, and images to Base64 format instantly. Perfect for embedding data in HTML, CSS, JSON, and API requests. No registration required.',
  keywords: 'base64 encoder, base64 decoder, base64 converter, encode base64, decode base64, file to base64, text to base64, image to base64, base64 encoding, base64 decoding, online base64 tool, free base64 converter, base64 encoder online, base64 decoder online, base64 converter online, base64 encoder decoder, base64 to text, text to base64, image to base64 converter, file to base64 converter, base64 encoder free, base64 decoder free, base64 converter free, base64 encoding tool, base64 decoding tool',
  openGraph: {
    title: 'Base64 Encoder/Decoder - Free Online Tool',
    description: 'Free online Base64 encoder and decoder. Convert text, files, and images to Base64 format instantly. Perfect for embedding data in HTML, CSS, JSON, and API requests.',
    type: 'website',
    url: 'https://www.konverter-online.com/base64-converter',
    images: [
      {
        url: 'https://www.konverter-online.com/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Base64 Encoder/Decoder Tool',
      },
    ],
    siteName: 'Konverter Online',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base64 Encoder/Decoder - Free Online Tool',
    description: 'Free online Base64 encoder and decoder. Convert text, files, and images to Base64 format instantly.',
    images: ['https://www.konverter-online.com/og-image.svg'],
  },
  alternates: {
    canonical: 'https://www.konverter-online.com/base64-converter',
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

export default function Base64ConverterPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        {/* Navigation Ad */}
        <AdSenseNavigation />
        
        <Base64Converter />
        
        {/* Banner Ad */}
        <div className="container mx-auto px-4 py-8">
          <AdSenseBanner className="max-w-4xl mx-auto" />
        </div>
        
        {/* SEO Content Section */}
        <section className="container mx-auto px-6 py-12 max-w-4xl">
          {/* In-Article Ad */}
          <AdSenseInArticle className="mb-8" />
          
          <div className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-bold mb-6">What is Base64 Encoding?</h2>
            <p className="text-lg mb-6">
              Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. 
              It&apos;s widely used in web development, email systems, and data transmission where binary data needs 
              to be stored or transferred as text.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Common Use Cases for Base64</h3>
            <ul className="space-y-3 mb-8">
              <li><strong>Embedding Images in HTML/CSS:</strong> Convert images to Base64 to embed them directly in your code, eliminating the need for separate image files.</li>
              <li><strong>API Data Transmission:</strong> Send binary data through JSON APIs that only accept text.</li>
              <li><strong>Email Attachments:</strong> Encode file attachments in email systems that only support text.</li>
              <li><strong>Data Storage:</strong> Store binary data in text-based databases or configuration files.</li>
              <li><strong>Authentication:</strong> Encode credentials and tokens in HTTP headers.</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4">How Our Base64 Tool Works</h3>
            <p className="mb-6">
              Our free Base64 encoder/decoder tool provides a simple, secure way to convert between text and Base64 format. 
              Simply paste your text or upload a file, and get instant results. The tool supports both encoding (text to Base64) 
              and decoding (Base64 to text) operations.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Key Features</h3>
            <ul className="space-y-3 mb-8">
              <li><strong>Text Encoding:</strong> Convert any text string to Base64 format</li>
              <li><strong>File Upload:</strong> Upload and encode files of any type</li>
              <li><strong>Instant Decoding:</strong> Decode Base64 strings back to original text</li>
              <li><strong>Copy to Clipboard:</strong> One-click copying of results</li>
              <li><strong>Download Results:</strong> Save encoded/decoded data as files</li>
              <li><strong>No Registration:</strong> Use immediately without creating an account</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4">Why Choose Our Base64 Tool?</h3>
            <p className="mb-6">
              Unlike other online tools that may store your data or require registration, our Base64 converter 
              processes everything locally in your browser. Your data never leaves your device, ensuring complete 
              privacy and security. Plus, it&apos;s completely free to use with no limitations.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 mt-8">
              <h4 className="text-xl font-semibold mb-3">Developer Tips</h4>
              <ul className="space-y-2 text-sm">
                <li>• Base64 encoding increases file size by approximately 33%</li>
                <li>• Use Base64 for small files and images; for larger files, consider file hosting</li>
                <li>• Always validate Base64 strings before decoding in production code</li>
                <li>• Consider using data URLs (data:image/png;base64,...) for web images</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Related Tools */}
        <div className="container mx-auto px-6 pb-12 max-w-4xl">
          <RelatedTools currentPath="/base64-converter" />
        </div>
      </main>
      <Footer />
    </div>
  )
} 