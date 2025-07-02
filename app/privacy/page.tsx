import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Eye, Lock, Database, Cookie, Users } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Konverter - SVG to CSS/JSX Converter',
  description: 'Learn how Konverter protects your privacy and handles your data. I am committed to transparency and data protection.',
  keywords: ['privacy policy', 'data protection', 'svg converter privacy', 'user data'],
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-background">
        <div className="container mx-auto py-12 px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Shield className="h-12 w-12 text-blue-600" />
                <h1 className="text-4xl font-bold">Privacy Policy</h1>
              </div>
              <p className="text-xl text-muted-foreground">
                Your privacy is important to me. Learn how I protect your data.
              </p>
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
              {/* Data Collection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-600" />
                    Data Collection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Konverter is designed with privacy in mind. I collect minimal data to provide you with the best service.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>SVG Files:</strong> Your SVG files are processed locally in your browser. I do not store, transmit, or access your SVG content.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Analytics:</strong> I use Google Analytics to understand how my service is used. This helps me improve the tool.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>No Registration:</strong> I don&apos;t require accounts or personal information to use my service.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Processing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-green-600" />
                    Data Processing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    All SVG processing happens locally in your browser using client-side JavaScript.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Local Processing:</strong> Your SVG files never leave your device during conversion.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>No Server Storage:</strong> I don&apos;t store your files on my servers.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Real-time Conversion:</strong> All conversions happen instantly in your browser.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cookies */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cookie className="h-5 w-5 text-orange-600" />
                    Cookies & Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    I use minimal cookies and tracking to improve your experience.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Google Analytics:</strong> Tracks usage patterns to help me improve the service.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Local Storage:</strong> Stores your preferences (like optimization settings) locally.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>No Third-party Tracking:</strong> I don&apos;t use advertising or third-party tracking cookies.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Security */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-red-600" />
                    Data Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    I implement security measures to protect your data and privacy.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>HTTPS Encryption:</strong> All data transmission is encrypted using SSL/TLS.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>No Data Storage:</strong> Since I don&apos;t store your files, there&apos;s no risk of data breaches.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Regular Updates:</strong> I keep my security practices up to date with industry standards.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Your Rights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Your Rights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    You have full control over your data and privacy.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>No Data Collection:</strong> Since I don&apos;t collect personal data, there&apos;s nothing to request or delete.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Clear Local Storage:</strong> You can clear your browser&apos;s local storage to remove any saved preferences.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Contact Me:</strong> If you have any privacy concerns, feel free to reach out.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about this Privacy Policy, please contact me:
                  </p>
                  <div className="space-y-2">
                    <p><strong>Developer:</strong> Daniel Zaharia</p>
                    <p><strong>Website:</strong> <a href="https://www.konverter-online.com" className="text-blue-600 hover:underline">konverter-online.com</a></p>
                    <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/rolax" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">linkedin.com/in/rolax</a></p>
                    
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 