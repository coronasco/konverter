import { ChevronDown, Coffee, Home, Layers3, Newspaper, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import Link from 'next/link'
import { getFeaturedTools, primaryNavigation } from '@/lib/tool-catalog'

const featuredTools = getFeaturedTools(6)

const navIcons = {
  '/': Home,
  '/svg-tools': Layers3,
  '/frontend-tools': Wrench,
  '/blog': Newspaper,
  '/support': Coffee,
}

export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="site-container flex h-18 items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-border/70 bg-white/80 p-1 shadow-sm">
              <Image src="/konverter_logo.svg" alt="Konverter" width={42} height={42} />
            </div>
            <Link href="/" className="hidden min-w-0 flex-col md:flex">
              <p className="font-display text-lg font-semibold tracking-tight text-foreground">
                Konverter
              </p>
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Frontend utility platform
              </p>
            </Link>
          </div>

          <nav className="hidden items-center gap-2 lg:flex">
            {primaryNavigation.map((item) => (
              <Button key={item.href} asChild variant="ghost" size="sm" className="text-foreground">
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button variant="outline" size="sm" asChild>
              <Link href="/svg-tools">Browse tools</Link>
            </Button>
            <Button size="sm" asChild>
              <a href="https://coff.ee/danielzahav" target="_blank" rel="noopener noreferrer">
                <Coffee className="h-4 w-4 mr-2" />
                Buy me a coffee
              </a>
            </Button>
          </div>

          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="min-w-[132px] justify-between">
                  Menu
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 rounded-3xl p-2">
                <DropdownMenuLabel className="px-3 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Navigation
                </DropdownMenuLabel>
                {primaryNavigation.map((item) => {
                  const Icon = navIcons[item.href as keyof typeof navIcons] ?? Home
                  return (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href} className="flex items-center gap-3 rounded-2xl px-3 py-2.5">
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="px-3 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Featured tools
                </DropdownMenuLabel>
                {featuredTools.map((tool) => (
                  <DropdownMenuItem key={tool.id} asChild>
                    <Link href={tool.href} className="rounded-2xl px-3 py-2.5">
                      {tool.shortName}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  )
}
