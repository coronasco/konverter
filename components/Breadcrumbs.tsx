'use client'

import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getRouteLabel } from '@/lib/tool-catalog'

export default function Breadcrumbs() {
  const pathname = usePathname()
  
  // Don't show breadcrumbs on homepage
  if (pathname === '/') return null

  const generateBreadcrumbs = () => {
    const breadcrumbs: { label: string; href: string; current?: boolean }[] = [
      {
        label: 'Home',
        href: '/',
      }
    ]

    const segments = pathname.split('/').filter(Boolean)
    let currentPath = ''

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const label =
        getRouteLabel(currentPath) ??
        segment
          .split('-')
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' ')

      breadcrumbs.push({
        label,
        href: currentPath,
        current: index === segments.length - 1,
      })
    })

    if (breadcrumbs.length === 1) {
      return null
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  if (!breadcrumbs) return null

  return (
    <nav className="site-container mb-6 flex items-center space-x-1 text-sm text-muted-foreground">
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
