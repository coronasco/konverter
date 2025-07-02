import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex flex-col items-center justify-center gap-2 py-4">
        
        <p className="text-sm text-muted-foreground">
          Copyright © 2025 konverter-online.com All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link 
            href="/privacy" 
            className="hover:text-foreground transition-colors"
          >
            Privacy Policy
          </Link>
          <span>•</span>
          <p>Made with ❤️ by Daniel Zaharia</p>
        </div>
      </div>
    </footer>
  )
} 