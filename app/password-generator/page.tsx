import { Metadata } from 'next'
import PasswordGenerator from '@/components/PasswordGenerator'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Password Generator - Create Strong Secure Passwords | Free Online Tool',
  description: 'Generate strong, secure passwords with our free online password generator. Customize length, character types, and strength. Perfect for developers, security professionals, and anyone who needs secure passwords.',
  keywords: 'password generator, strong password, secure password, random password, password creator, password maker, online password generator, free password generator, secure password generator, password strength checker',
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
}

export default function PasswordGeneratorPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        <PasswordGenerator />
        
        {/* SEO Content Section */}
        <section className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-bold mb-6">Why Strong Passwords Matter</h2>
            <p className="text-lg mb-6">
              In today&apos;s digital world, strong passwords are your first line of defense against cyber attacks. 
              Weak passwords are responsible for over 80% of data breaches, making password security crucial for 
              protecting your personal and professional accounts.
            </p>

            <h3 className="text-2xl font-semibold mb-4">What Makes a Password Strong?</h3>
            <ul className="space-y-3 mb-8">
              <li><strong>Length:</strong> At least 12 characters long (16+ is even better)</li>
              <li><strong>Complexity:</strong> Mix of uppercase, lowercase, numbers, and symbols</li>
              <li><strong>Uniqueness:</strong> Different password for each account</li>
              <li><strong>Randomness:</strong> Avoid predictable patterns and personal information</li>
              <li><strong>No Common Words:</strong> Avoid dictionary words and common phrases</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4">How Our Password Generator Works</h3>
            <p className="mb-6">
              Our password generator uses cryptographically secure random number generation to create truly random 
              passwords. You can customize the length, character types, and exclude similar or ambiguous characters 
              for better readability. The tool also provides real-time password strength analysis.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Key Features</h3>
            <ul className="space-y-3 mb-8">
              <li><strong>Customizable Length:</strong> Generate passwords from 4 to 64 characters</li>
              <li><strong>Character Options:</strong> Choose uppercase, lowercase, numbers, and symbols</li>
              <li><strong>Exclude Similar Characters:</strong> Remove confusing characters like 0, O, 1, l</li>
              <li><strong>Exclude Ambiguous Characters:</strong> Remove characters that might cause issues</li>
              <li><strong>Strength Indicator:</strong> Real-time password strength analysis</li>
              <li><strong>Copy to Clipboard:</strong> One-click copying with visual feedback</li>
              <li><strong>Show/Hide Password:</strong> Toggle password visibility</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4">Password Security Best Practices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-xl font-semibold mb-3 text-green-600">Do&apos;s</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Use unique passwords for each account</li>
                  <li>• Enable two-factor authentication</li>
                  <li>• Use a password manager</li>
                  <li>• Regularly update passwords</li>
                  <li>• Use passphrases for important accounts</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3 text-red-600">Don&apos;ts</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Don&apos;t reuse passwords</li>
                  <li>• Don&apos;t use personal information</li>
                  <li>• Don&apos;t share passwords</li>
                  <li>• Don&apos;t store passwords in plain text</li>
                  <li>• Don&apos;t use common patterns</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-4">Why Choose Our Password Generator?</h3>
            <p className="mb-6">
              Our password generator is completely client-side, meaning your passwords are generated locally in 
              your browser and never transmitted to our servers. This ensures maximum privacy and security. 
              Plus, it&apos;s completely free with no limitations or registration required.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 mt-8">
              <h4 className="text-xl font-semibold mb-3">Developer Notes</h4>
              <ul className="space-y-2 text-sm">
                <li>• Uses browser&apos;s built-in crypto.getRandomValues() for secure randomness</li>
                <li>• All processing happens locally - no server communication</li>
                <li>• Password strength algorithm considers multiple factors</li>
                <li>• Compatible with all modern browsers</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 