import Header from '@/components/Header'
import SvgConverter from '@/components/SvgConverter'
import Footer from '@/components/Footer'
import ShareButton from '@/components/ShareButton'
import { Zap, Code, Palette, Download, CheckCircle, Star, Droplets, FileText, Sparkles, Layers } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-600 bg-clip-text text-transparent">
            Advanced SVG to CSS & JSX Converter
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Instantly convert SVG files to optimized URL-encoded CSS, Base64, or React JSX components. 
            Now with live color editing and PDF export! Free, fast, and developer-friendly tool for modern web development.
          </p>
          <div className='flex items-center justify-center gap-4 flex-wrap'>
            <span className='text-xs text-black bg-amber-300 px-4 py-2 rounded-full font-bold'>Free Forever</span>
            <span className='text-xs text-white bg-green-600 px-4 py-2 rounded-full font-bold'>New: Live Color Editor</span>
            <span className='text-xs text-white bg-purple-600 px-4 py-2 rounded-full font-bold'>New: PDF Export</span>
            <ShareButton />
          </div>
        </div>
      </section>

      {/* Main Converter */}
      <section className="pb-16 px-2 md:px-6" id="converter">
        <div className="container mx-auto">
          <SvgConverter />
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-cyan-600 bg-clip-text text-transparent">
                  Why I built this?
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-white to-cyan-600 rounded-full mx-auto"></div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hey there! 👋 I&apos;m Daniel, a developer who got tired of manually converting SVGs for every project. 
                You know the drill, you find a perfect icon, but it&apos;s bloated with unnecessary metadata, and you need it as a CSS background or React component ASAP.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The existing tools were either slow, clunky, or hidden behind paywalls. So I built Konverter - a fast, free tool that does exactly what developers need. 
                No more copy-pasting between different converters or dealing with outdated interfaces.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Just drag, drop, and get your optimized SVG in any format you want. Because honestly, we have better things to do than wrestle with file conversions! 
                I&apos;ve just added live color editing and PDF export - because why not make it even more awesome? 🚀
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* New Features Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">✨ Fresh New Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Just dropped these game-changers to make your SVG workflow even smoother
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Droplets className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  Live Color Editor
                  <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">NEW</span>
                </CardTitle>
                <CardDescription>
                  Edit SVG colors in real-time with our intuitive color picker. Perfect for designers who need to match brand colors or experiment with different palettes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Visual color picker for each SVG element
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Live preview as you edit
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    One-click color reset
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-purple-200 dark:border-purple-800">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  PDF Export
                  <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">NEW</span>
                </CardTitle>
                <CardDescription>
                  Export your SVGs as high-quality PDFs for presentations, documentation, or client deliverables. Perfect for designers and project managers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    High-resolution PDF output
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    Vector quality preserved
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    Perfect for documentation
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
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
                  <Sparkles className="h-6 w-6 text-purple-600" />
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
                  <Layers className="h-6 w-6 text-red-600" />
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
              <h3 className="text-xl font-semibold mb-2">Edit & Convert</h3>
              <p className="text-muted-foreground">
                Customize colors live, optimize your SVG, and convert to multiple formats
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Export & Use</h3>
              <p className="text-muted-foreground">
                Copy the code, export as PDF, or download in your preferred format
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-green-600" />
                  UI/UX Designers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Live color editing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    PDF export for presentations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Brand color matching
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-orange-600" />
                  Project Managers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    PDF documentation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Client deliverables
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Asset management
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-muted-foreground">Free to Use</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">3 Formats</div>
              <div className="text-muted-foreground">Output Options</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">Live Editing</div>
              <div className="text-muted-foreground">Color Picker</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">PDF Export</div>
              <div className="text-muted-foreground">High Quality</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
