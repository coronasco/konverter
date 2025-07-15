import { Metadata } from 'next'
import QrCodeGenerator from '@/components/QrCodeGenerator'
import RelatedTools from '@/components/RelatedTools'
import Footer from '@/components/Footer'
import { generateMetadata, generateStructuredData } from '@/components/SEOHead'

export const metadata: Metadata = generateMetadata('/qr-generator')

export default function QrGeneratorPage() {
  const structuredData = generateStructuredData('/qr-generator')
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-background">
      <main className="pt-16">
        <QrCodeGenerator />
        
        {/* SEO Content Section */}
        <section className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-bold mb-6">What are QR Codes?</h2>
            <p className="text-lg mb-6">
              QR (Quick Response) codes are two-dimensional barcodes that can store various types of data. 
              They&apos;re widely used for sharing information quickly and efficiently, from website URLs to 
              contact details and WiFi credentials. QR codes can be scanned by any smartphone camera, making 
              them incredibly convenient for modern communication.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Types of QR Codes You Can Create</h3>
            <ul className="space-y-3 mb-8">
              <li><strong>URL QR Codes:</strong> Link directly to websites, perfect for marketing and sharing</li>
              <li><strong>Text QR Codes:</strong> Display any text message when scanned</li>
              <li><strong>Email QR Codes:</strong> Pre-fill email addresses and subjects</li>
              <li><strong>Phone QR Codes:</strong> Initiate phone calls with pre-filled numbers</li>
              <li><strong>WiFi QR Codes:</strong> Share WiFi network credentials instantly</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4">How Our QR Code Generator Works</h3>
            <p className="mb-6">
              Our QR code generator creates high-quality, scannable QR codes instantly. Simply choose the type 
              of data you want to encode, enter the information, and customize the appearance. The tool supports 
              multiple formats and provides real-time preview of your QR code.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Key Features</h3>
            <ul className="space-y-3 mb-8">
              <li><strong>Multiple QR Types:</strong> URL, text, email, phone, and WiFi QR codes</li>
              <li><strong>Customization Options:</strong> Choose colors, size, and margins</li>
              <li><strong>Instant Preview:</strong> See your QR code as you create it</li>
              <li><strong>High Quality Output:</strong> Download as high-resolution PNG files</li>
              <li><strong>Copy to Clipboard:</strong> Copy QR code data URL instantly</li>
              <li><strong>WiFi QR Support:</strong> Generate QR codes for WiFi networks with encryption</li>
              <li><strong>No Registration Required:</strong> Use immediately without creating an account</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4">Common Use Cases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-xl font-semibold mb-3 text-blue-600">Business & Marketing</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Business cards with contact info</li>
                  <li>• Product packaging with links</li>
                  <li>• Restaurant menus with online ordering</li>
                  <li>• Event tickets and registration</li>
                  <li>• Social media profile links</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3 text-green-600">Personal Use</h4>
                <ul className="space-y-2 text-sm">
                  <li>• WiFi network sharing</li>
                  <li>• Contact information sharing</li>
                  <li>• Personal website links</li>
                  <li>• Gift cards and vouchers</li>
                  <li>• Event invitations</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-4">QR Code Best Practices</h3>
            <ul className="space-y-3 mb-8">
              <li><strong>Size Matters:</strong> Larger QR codes are easier to scan from a distance</li>
              <li><strong>Contrast is Key:</strong> Use high contrast colors for better scanning</li>
              <li><strong>Test Your Codes:</strong> Always test QR codes before printing or sharing</li>
              <li><strong>Error Correction:</strong> Our tool includes error correction for damaged codes</li>
              <li><strong>Mobile Optimization:</strong> Ensure linked websites work well on mobile</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4">Why Choose Our QR Code Generator?</h3>
            <p className="mb-6">
              Our QR code generator is completely free and doesn&apos;t require registration. All processing 
              happens locally in your browser, ensuring your data remains private. The tool supports all major 
              QR code formats and provides professional-quality output suitable for both digital and print use.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 mt-8">
              <h4 className="text-xl font-semibold mb-3">Technical Details</h4>
              <ul className="space-y-2 text-sm">
                <li>• Uses QRCode.js library for reliable QR code generation</li>
                <li>• Supports all standard QR code formats and versions</li>
                <li>• Includes error correction for damaged codes</li>
                <li>• Generates high-resolution PNG output</li>
                <li>• Compatible with all modern QR code scanners</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Related Tools */}
        <div className="container mx-auto px-6 pb-12 max-w-4xl">
          <RelatedTools currentPath="/qr-generator" />
        </div>
      </main>
      <Footer />
    </div>
    </>
  )
} 