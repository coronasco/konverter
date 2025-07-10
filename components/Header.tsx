import { Coffee, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
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
              Advanced SVG Conversion Tool
            </p>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Desktop: Tool buttons in row */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                SVG Converter
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/json-formatter" className="text-muted-foreground hover:text-foreground">
                JSON Formatter
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/css-minifier" className="text-muted-foreground hover:text-foreground">
                CSS Minifier
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/color-generator" className="text-muted-foreground hover:text-foreground">
                Color Generator
              </Link>
            </Button>
          </div>

          {/* Mobile: Dropdown menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  Tools
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/">SVG Converter</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/json-formatter">JSON Formatter</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/css-minifier">CSS Minifier</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/color-generator">Color Generator</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
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
  )
} 