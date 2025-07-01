import Header from '@/components/Header'
import SvgConverter from '@/components/SvgConverter'
import Footer from '@/components/Footer'
import { Zap, Code, Palette, Download, CheckCircle, Star } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Advanced SVG to CSS & JSX Converter
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Instantly convert SVG files to optimized URL-encoded CSS, Base64, or React JSX components. 
            Free, fast, and developer-friendly tool for modern web development.
          </p>
        </div>
      </section>

      {/* Main Converter */}
      <section className="pb-16 px-6" id="converter">
        <div className="container mx-auto">
          <SvgConverter />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Konverter Online?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional-grade SVG conversion with advanced optimization and multiple output formats
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Convert SVGs instantly with our optimized processing engine
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Multiple Formats</CardTitle>
                <CardDescription>
                  Get URL-encoded CSS, Base64, and React JSX components
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Palette className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>SVG Optimization</CardTitle>
                <CardDescription>
                  Automatic optimization using SVGO for smaller file sizes
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Download className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Drag & Drop</CardTitle>
                <CardDescription>
                  Easy file upload with drag and drop functionality
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>
                  See your SVG rendered in real-time before conversion
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Free Forever</CardTitle>
                <CardDescription>
                  No registration required, completely free to use
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple 3-step process to convert your SVG files
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload SVG</h3>
              <p className="text-muted-foreground">
                Drag and drop your SVG file or paste the code directly
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Optimize & Convert</h3>
              <p className="text-muted-foreground">
                Konverter optimizes your SVG and converts it to multiple formats
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Copy & Use</h3>
              <p className="text-muted-foreground">
                Copy the generated code and use it in your projects
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Perfect For Developers & Designers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
                             Whether you&apos;re building React apps, CSS backgrounds, or optimizing web performance
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
                    Convert SVGs to React components
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Optimized JSX output
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Props support for customization
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-purple-600" />
                  CSS Developers
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
                    Optimized for performance
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-muted-foreground">Free to Use</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">3 Formats</div>
              <div className="text-muted-foreground">Output Options</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">Instant</div>
              <div className="text-muted-foreground">Conversion Speed</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
