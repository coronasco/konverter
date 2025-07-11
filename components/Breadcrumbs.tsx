'use client'

import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface BreadcrumbItem {
  label: string
  href: string
  current?: boolean
}

const toolPaths: Record<string, string> = {
  '/json-formatter': 'JSON Formatter',
  '/css-minifier': 'CSS Minifier',
  '/color-generator': 'Color Generator',
  '/base64-converter': 'Base64 Converter',
  '/password-generator': 'Password Generator',
  '/qr-generator': 'QR Code Generator',
  '/url-shortener': 'URL Shortener',
  '/blog': 'Blog',
  '/privacy': 'Privacy Policy',
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  
  // Don't show breadcrumbs on homepage
  if (pathname === '/') return null

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [
      {
        label: 'Home',
        href: '/',
      }
    ]

    // Add current page
    const currentPageLabel = toolPaths[pathname]
    if (currentPageLabel) {
      breadcrumbs.push({
        label: currentPageLabel,
        href: pathname,
        current: true
      })
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-4">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
          {breadcrumb.current ? (
            <span className="font-medium text-foreground">
              {breadcrumb.label}
            </span>
          ) : (
            <Link
              href={breadcrumb.href}
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              {breadcrumb.href === '/' ? (
                <Home className="h-4 w-4" />
              ) : null}
              {breadcrumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
} 