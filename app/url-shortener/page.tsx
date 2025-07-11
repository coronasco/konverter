import { Metadata } from 'next'
import UrlShortener from '@/components/UrlShortener'
import RelatedTools from '@/components/RelatedTools'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'URL Shortener - Shorten Links with TinyURL | Free Online Tool',
  description: 'Shorten any URL quickly with TinyURL. Create short, shareable links for social media, marketing campaigns, and messaging. Free online URL shortener with instant results.',
  keywords: 'url shortener, link shortener, tinyurl, shorten url, short links, url shortener free, online url shortener, link shortener tool, url shortener online, free link shortener',
  openGraph: {
    title: 'URL Shortener - Shorten Links with TinyURL',
    description: 'Shorten any URL quickly with TinyURL. Create short, shareable links for social media, marketing campaigns, and messaging.',
    type: 'website',
    url: 'https://www.konverter-online.com/url-shortener',
    images: [
      {
        url: 'https://www.konverter-online.com/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'URL Shortener Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'URL Shortener - Shorten Links with TinyURL',
    description: 'Shorten any URL quickly with TinyURL. Create short, shareable links for social media, marketing campaigns, and messaging.',
    images: ['https://www.konverter-online.com/og-image.svg'],
  },
  alternates: {
    canonical: 'https://www.konverter-online.com/url-shortener',
  },
}

export default function UrlShortenerPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        <UrlShortener />
        
        {/* SEO Content Section */}
        <section className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-bold mb-6">Why Use URL Shorteners?</h2>
            <p className="text-lg mb-6">
              URL shorteners transform long, unwieldy web addresses into short, manageable links. 
              They&apos;re essential for social media marketing, messaging platforms, and anywhere 
              where character limits matter. Short URLs are easier to share, remember, and track.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Benefits of Shortened URLs</h3>
            <ul className="space-y-3 mb-8">
              <li><strong>Social Media Friendly:</strong> Fit within character limits on Twitter, Instagram, and other platforms</li>
              <li><strong>Professional Appearance:</strong> Clean, branded links look more trustworthy</li>
              <li><strong>Easy Sharing:</strong> Short URLs are easier to copy, paste, and share</li>
              <li><strong>Better User Experience:</strong> Less intimidating than long, complex URLs</li>
              <li><strong>Tracking Capabilities:</strong> Monitor click-through rates and engagement</li>
              <li><strong>Mobile Optimization:</strong> Better for mobile messaging and apps</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4">How Our URL Shortener Works</h3>
            <p className="mb-6">
              Our URL shortener uses TinyURL&apos;s reliable service to create short, permanent links. 
              Simply paste your long URL, click shorten, and get an instant short link. The process 
              is secure, fast, and completely free with no registration required.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Key Features</h3>
            <ul className="space-y-3 mb-8">
              <li><strong>Instant Shortening:</strong> Get short URLs in seconds</li>
              <li><strong>Permanent Links:</strong> Shortened URLs don&apos;t expire</li>
              <li><strong>Copy to Clipboard:</strong> One-click copying with visual feedback</li>
              <li><strong>Direct Links:</strong> No redirect pages or ads</li>
              <li><strong>Mobile Compatible:</strong> Works perfectly on all devices</li>
              <li><strong>No Registration:</strong> Use immediately without creating an account</li>
              <li><strong>Secure Processing:</strong> Your URLs are processed securely</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4">Common Use Cases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-xl font-semibold mb-3 text-blue-600">Marketing & Social Media</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Social media posts and campaigns</li>
                  <li>• Email marketing links</li>
                  <li>• Digital advertising</li>
                  <li>• Influencer collaborations</li>
                  <li>• Content marketing</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3 text-green-600">Personal & Business</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Messaging apps and SMS</li>
                  <li>• Business presentations</li>
                  <li>• QR code generation</li>
                  <li>• Document sharing</li>
                  <li>• Event invitations</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-4">URL Shortening Best Practices</h3>
            <ul className="space-y-3 mb-8">
              <li><strong>Use Descriptive URLs:</strong> When possible, choose custom short URLs that describe the content</li>
              <li><strong>Test Your Links:</strong> Always test shortened URLs before sharing</li>
              <li><strong>Monitor Performance:</strong> Track click-through rates when possible</li>
              <li><strong>Keep Originals:</strong> Save original URLs for backup purposes</li>
              <li><strong>Use HTTPS:</strong> Ensure your original URLs use secure connections</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4">Why Choose Our URL Shortener?</h3>
            <p className="mb-6">
              Our URL shortener is powered by TinyURL, one of the most trusted and reliable URL shortening 
              services. We provide a clean, ad-free interface that makes shortening URLs quick and easy. 
              All processing happens securely, and we don&apos;t store or track your personal information.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 mt-8">
              <h4 className="text-xl font-semibold mb-3">About TinyURL</h4>
              <ul className="space-y-2 text-sm">
                <li>• One of the oldest and most reliable URL shortening services</li>
                <li>• Permanent links that don&apos;t expire</li>
                <li>• No registration or account required</li>
                <li>• High uptime and reliability</li>
                <li>• Trusted by millions of users worldwide</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Related Tools */}
        <div className="container mx-auto px-6 pb-12 max-w-4xl">
          <RelatedTools currentPath="/url-shortener" />
        </div>
      </main>
      <Footer />
    </div>
  )
} 