import { Coffee } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
          <Link href="/"> 
            <p className="text-xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              Konverter Online
            </p>
            <p className="text-xs text-cyan-500 -mt-1">
              Advanced SVG Conversion Tool
            </p>
          </Link>
        </div>
        
        <Button variant="outline" size="sm" asChild className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0">
          <a href="https://coff.ee/danielzahav" target="_blank" rel="noopener noreferrer">
            <Coffee className="h-4 w-4 mr-2" />
            Buy me a coffee
          </a>
        </Button>
      </div>
    </header>
  )
} 