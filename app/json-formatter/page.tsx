import { Metadata } from 'next'
import JsonFormatter from '@/components/JsonFormatter'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'JSON Formatter Online Free | Beautify, Minify & Validate JSON Instantly',
  description: 'Free online JSON formatter, validator, and converter. Beautify JSON with proper indentation, minify JSON for production, validate JSON syntax errors, and convert JSON to YAML. No signup required, trusted by developers worldwide.',
  keywords: 'JSON formatter, JSON beautifier, JSON minifier, JSON validator, JSON to YAML, JSON converter, online JSON tools, free JSON formatter',
  openGraph: {
    title: 'JSON Formatter Online Free | Beautify, Minify & Validate JSON',
    description: 'Free online JSON formatter, validator, and converter. Beautify JSON, minify JSON, validate JSON syntax, and convert JSON to YAML.',
    type: 'website',
    url: 'https://www.konverter-online.com/json-formatter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter Online Free | Beautify, Minify & Validate JSON',
    description: 'Free online JSON formatter, validator, and converter. Professional JSON tools for developers.',
  },
  alternates: {
    canonical: 'https://www.konverter-online.com/json-formatter',
  },
}

export default function JsonFormatterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonFormatter />
      {/* Personal story & SEO context in English */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20">
        <div className="container mx-auto max-w-3xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent mb-4">
            The JSON debugging tool I always wanted
          </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
              Ever spent 30 minutes debugging a JSON parsing error only to find it was a missing comma? Yeah, me too. That&apos;s why I built this JSON Formatter. It&apos;s not just another online tool—it&apos;s the debugging companion I wish I had when I was knee-deep in API integrations and microservice configs.
            </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            My daily workflow with this tool:
          </p>
          <ul className="text-left mx-auto max-w-xl text-base text-muted-foreground list-disc list-inside space-y-2">
            <li>Validating webhook payloads before processing them in production</li>
            <li>Converting API responses to YAML for Kubernetes deployments</li>
            <li>Minifying large JSON datasets for faster API responses</li>
            <li>Beautifying legacy config files that look like they were written by a cat</li>
          </ul>
                      <p className="text-lg text-muted-foreground leading-relaxed">
              <b>Pro tip:</b> Use the validator before deploying any JSON-based config. A single syntax error can bring down your entire service. And always convert to YAML for Kubernetes—it&apos;s just more readable than JSON for configs.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Built this because I was tired of context-switching between different tools. Now everything happens in one place, client-side, with zero privacy concerns. If you&apos;re dealing with JSON daily, this should save you hours.
            </p>
        </div>
      </section>
      <Footer />
    </div>
  )
} 