import { Coffee, ChevronDown, QrCode, Lock, FileText, PaintBucket, Link2, Code2, KeyRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import Link from 'next/link'

const tools = [
  { href: '/', label: 'SVG Converter', icon: Code2 },
  { href: '/json-formatter', label: 'JSON Formatter', icon: FileText },
  { href: '/css-minifier', label: 'CSS Minifier', icon: PaintBucket },
  { href: '/color-generator', label: 'Color Generator', icon: PaintBucket },
  { href: '/base64-converter', label: 'Base64', icon: KeyRound },
  { href: '/password-generator', label: 'Password', icon: Lock },
  { href: '/qr-generator', label: 'QR Code', icon: QrCode },
  { href: '/url-shortener', label: 'URL Shortener', icon: Link2 },
]

export default function Header() {
  return (
    <>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-3">
            <div className='border border-slate-700'>
              <Image src="/konverter_logo.svg" alt="Konverter Online" width={42} height={42} />
            </div>
            <Link href="/" className='hidden md:flex flex-col'> 
              <p className="text-xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Konverter Online
              </p>
              <p className="text-xs text-cyan-500 -mt-1">
                Advanced Tools for Developers
              </p>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 font-medium">
              <Link href="/blog" className="hover:text-white">
                Tips & Tricks
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0">
              <a href="https://coff.ee/danielzahav" target="_blank" rel="noopener noreferrer">
                <Coffee className="h-4 w-4 mr-2" />
                Buy me a coffee
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Tools Subheader */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          {/* Desktop: Horizontal scrollable tools */}
          <div className="hidden md:flex items-center gap-1 py-3 overflow-x-auto scrollbar-hide">
            {tools.map((tool) => {
              const Icon = tool.icon
              return (
                <Button
                  key={tool.href}
                  variant="ghost"
                  size="sm"
                  asChild
                  className="flex items-center gap-2 whitespace-nowrap text-muted-foreground hover:text-foreground hover:bg-background/50"
                >
                  <Link href={tool.href}>
                    <Icon className="h-4 w-4" />
                    {tool.label}
                  </Link>
                </Button>
              )
            })}
          </div>

          {/* Mobile: Dropdown menu */}
          <div className="md:hidden py-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="w-full justify-between text-muted-foreground hover:text-foreground">
                  <span>All Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {tools.map((tool) => {
                  const Icon = tool.icon
                  return (
                    <DropdownMenuItem key={tool.href} asChild>
                      <Link href={tool.href} className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {tool.label}
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  )
} 