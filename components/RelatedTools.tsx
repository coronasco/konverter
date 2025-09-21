'use client'

import { QrCode, Lock, FileText, PaintBucket, Link2, Code2, KeyRound, Palette, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

interface Tool {
  href: string
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  category: string
}

const allTools: Tool[] = [
  { 
    href: '/', 
    label: 'SVG Converter', 
    description: 'Convert SVGs to CSS, React components, and more',
    icon: Code2,
    category: 'converter'
  },
  { 
    href: '/json-formatter', 
    label: 'JSON Formatter', 
    description: 'Format, validate, and beautify JSON data',
    icon: FileText,
    category: 'formatter'
  },
  { 
    href: '/css-minifier', 
    label: 'CSS Minifier', 
    description: 'Minify CSS code for better performance',
    icon: PaintBucket,
    category: 'optimizer'
  },
  { 
    href: '/color-generator', 
    label: 'Color Generator', 
    description: 'Extract color palettes from images',
    icon: Palette,
    category: 'design'
  },
  { 
    href: '/base64-converter', 
    label: 'Base64 Converter', 
    description: 'Convert text, images, and files to Base64',
    icon: KeyRound,
    category: 'converter'
  },
  { 
    href: '/password-generator', 
    label: 'Password Generator', 
    description: 'Generate secure passwords with advanced analysis',
    icon: Lock,
    category: 'security'
  },
  { 
    href: '/qr-generator', 
    label: 'QR Code Generator', 
    description: 'Create QR codes with custom logos and colors',
    icon: QrCode,
    category: 'generator'
  },
  { 
    href: '/url-shortener', 
    label: 'URL Shortener', 
    description: 'Shorten URLs and generate QR codes',
    icon: Link2,
    category: 'utility'
  },
  { 
    href: '/time-tracker', 
    label: 'TimeTracker Pro', 
    description: 'Free time tracking for freelancers and professionals',
    icon: Clock,
    category: 'productivity'
  },
]

interface RelatedToolsProps {
  currentPath: string
  maxTools?: number
}

export default function RelatedTools({ currentPath, maxTools = 4 }: RelatedToolsProps) {
  // Filter out current tool and get related tools
  const relatedTools = allTools
    .filter(tool => tool.href !== currentPath)
    .slice(0, maxTools)

  if (relatedTools.length === 0) return null

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-lg">Related Tools</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedTools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group block p-4 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {tool.label}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all tools →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
} 