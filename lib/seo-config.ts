export interface SEOConfig {
  title: string
  description: string
  keywords: string
  canonical: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogImageAlt: string
  twitterTitle: string
  twitterDescription: string
  structuredData: Record<string, unknown>
}

export const seoConfig: Record<string, SEOConfig> = {
  home: {
    title: "Konverter Online - Free Developer Tools for SVG, JSON, CSS & More",
    description: "Free online developer tools for SVG conversion, JSON formatting, CSS minification, color palette generation, password generation, QR codes, and more. Professional tools for developers.",
    keywords: "developer tools, svg converter, json formatter, css minifier, color generator, password generator, qr code generator, url shortener, base64 converter, online tools, free tools, web development tools, coding tools, programming utilities",
    canonical: "https://www.konverter-online.com/",
    ogTitle: "Konverter Online - Free Developer Tools",
    ogDescription: "Professional developer tools for SVG, JSON, CSS, and more. Free online utilities for web developers.",
    ogImage: "https://www.konverter-online.com/og-image.svg",
    ogImageAlt: "Konverter Online Developer Tools",
    twitterTitle: "Konverter Online - Free Developer Tools",
    twitterDescription: "Professional developer tools for SVG, JSON, CSS, and more.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Konverter Online",
      "url": "https://www.konverter-online.com/",
      "description": "Free online developer tools for SVG conversion, JSON formatting, CSS minification, and color palette generation.",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "SVG to React/JSX Converter",
        "JSON Formatter and Validator",
        "CSS Minifier",
        "Color Palette Generator",
        "Password Generator",
        "QR Code Generator",
        "URL Shortener",
        "Base64 Converter"
      ],
      "author": {
        "@type": "Person",
        "name": "Daniel Zaharia"
      }
    }
  },
  "password-generator": {
    title: "Password Generator - Create Strong Secure Passwords | Free Online Tool",
    description: "Generate strong, secure passwords with our free online password generator. Customize length, character types, exclude similar characters, and get real-time strength analysis. Perfect for developers, security professionals, and anyone who needs secure passwords.",
    keywords: "password generator, strong password, secure password, random password, password creator, password maker, online password generator, free password generator, secure password generator, password strength checker, password generator online, random password generator, strong password generator, secure password creator, password maker online, password strength analyzer, password entropy calculator, password security tool, password generator free, password strength meter",
    canonical: "https://www.konverter-online.com/password-generator",
    ogTitle: "Password Generator - Create Strong Secure Passwords",
    ogDescription: "Generate strong, secure passwords with our free online password generator. Customize length, character types, and strength.",
    ogImage: "https://www.konverter-online.com/og-image.svg",
    ogImageAlt: "Password Generator Tool",
    twitterTitle: "Password Generator - Create Strong Secure Passwords",
    twitterDescription: "Generate strong, secure passwords with our free online password generator.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Password Generator",
      "url": "https://www.konverter-online.com/password-generator",
      "description": "Generate strong, secure passwords with customizable options and real-time strength analysis.",
      "applicationCategory": "SecurityApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Customizable password length (4-64 characters)",
        "Character type selection (uppercase, lowercase, numbers, symbols)",
        "Exclude similar characters",
        "Exclude ambiguous characters",
        "Real-time password strength analysis",
        "Entropy calculation",
        "Crack time estimation",
        "Copy to clipboard functionality"
      ],
      "author": {
        "@type": "Person",
        "name": "Daniel Zaharia"
      }
    }
  },
  "qr-generator": {
    title: "QR Code Generator - Create Custom QR Codes Online | Free Tool",
    description: "Generate custom QR codes for URLs, text, email, phone numbers, and WiFi networks. Add custom logos, choose colors, and download as PNG. Free online QR code generator with advanced customization options.",
    keywords: "qr code generator, qr code creator, custom qr codes, wifi qr code, email qr code, phone qr code, qr code download, online qr generator, free qr code maker, qr code customizer, qr code generator online, qr code maker, qr code creator online, qr code with logo, custom qr code generator, qr code for wifi, qr code for email, qr code for phone, qr code for url, qr code generator free, qr code maker online, qr code customizer online",
    canonical: "https://www.konverter-online.com/qr-generator",
    ogTitle: "QR Code Generator - Create Custom QR Codes Online",
    ogDescription: "Generate custom QR codes for URLs, text, email, phone numbers, and WiFi networks. Download as PNG or copy to clipboard.",
    ogImage: "https://www.konverter-online.com/og-image.svg",
    ogImageAlt: "QR Code Generator Tool",
    twitterTitle: "QR Code Generator - Create Custom QR Codes Online",
    twitterDescription: "Generate custom QR codes for URLs, text, email, phone numbers, and WiFi networks.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "QR Code Generator",
      "url": "https://www.konverter-online.com/qr-generator",
      "description": "Generate custom QR codes for URLs, text, email, phone numbers, and WiFi networks with advanced customization options.",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Multiple QR code types (URL, text, email, phone, WiFi)",
        "Custom colors and styling",
        "Logo integration in center",
        "Adjustable size and margins",
        "High-resolution PNG download",
        "Copy to clipboard functionality",
        "Real-time preview",
        "Error correction support"
      ],
      "author": {
        "@type": "Person",
        "name": "Daniel Zaharia"
      }
    }
  },
  "color-generator": {
    title: "Color Generator - Extract Color Palettes from Images | Free Online Tool",
    description: "Extract beautiful color palettes from images with our free online color generator. Get hex codes, RGB values, and create stunning color schemes. Perfect for designers, developers, and anyone who works with colors.",
    keywords: "color generator, color palette, color extractor, image color picker, color scheme generator, hex color codes, rgb color values, color palette from image, online color tool, free color generator, color picker tool, color scheme creator, color palette generator, image color analysis, color extraction tool, color palette maker, color scheme builder, color tool online, color generator free",
    canonical: "https://www.konverter-online.com/color-generator",
    ogTitle: "Color Generator - Extract Color Palettes from Images",
    ogDescription: "Extract beautiful color palettes from images. Get hex codes, RGB values, and create stunning color schemes.",
    ogImage: "https://www.konverter-online.com/og-image.svg",
    ogImageAlt: "Color Generator Tool",
    twitterTitle: "Color Generator - Extract Color Palettes from Images",
    twitterDescription: "Extract beautiful color palettes from images with hex codes and RGB values.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Color Generator",
      "url": "https://www.konverter-online.com/color-generator",
      "description": "Extract beautiful color palettes from images with hex codes, RGB values, and color scheme generation.",
      "applicationCategory": "DesignApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Image color extraction",
        "Multiple color formats (HEX, RGB, HSL)",
        "Color palette generation",
        "Color scheme suggestions",
        "Color contrast analysis",
        "Export color codes",
        "Image upload support",
        "Real-time color preview"
      ],
      "author": {
        "@type": "Person",
        "name": "Daniel Zaharia"
      }
    }
  },
  "json-formatter": {
    title: "JSON Formatter - Format, Validate & Beautify JSON Online | Free Tool",
    description: "Format, validate, and beautify JSON data with our free online JSON formatter. Syntax highlighting, error detection, and multiple output formats. Perfect for developers working with JSON APIs and data.",
    keywords: "json formatter, json beautifier, json validator, json prettifier, json syntax checker, json formatter online, free json tool, json beautifier online, json validator online, json syntax highlighter, json formatter tool, json beautifier tool, json validator tool, json prettifier online, json syntax checker online, json formatter free, json beautifier free, json validator free",
    canonical: "https://www.konverter-online.com/json-formatter",
    ogTitle: "JSON Formatter - Format, Validate & Beautify JSON Online",
    ogDescription: "Format, validate, and beautify JSON data with syntax highlighting and error detection.",
    ogImage: "https://www.konverter-online.com/og-image.svg",
    ogImageAlt: "JSON Formatter Tool",
    twitterTitle: "JSON Formatter - Format, Validate & Beautify JSON Online",
    twitterDescription: "Format, validate, and beautify JSON data with syntax highlighting.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "JSON Formatter",
      "url": "https://www.konverter-online.com/json-formatter",
      "description": "Format, validate, and beautify JSON data with syntax highlighting and error detection.",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "JSON formatting and beautification",
        "Syntax validation",
        "Error detection and highlighting",
        "Multiple indentation options",
        "Syntax highlighting",
        "Copy to clipboard",
        "Minify JSON",
        "Export formatted JSON"
      ],
      "author": {
        "@type": "Person",
        "name": "Daniel Zaharia"
      }
    }
  },
  "css-minifier": {
    title: "CSS Minifier - Compress CSS Code Online | Free Tool",
    description: "Minify and compress CSS code with our free online CSS minifier. Reduce file size, improve loading speed, and optimize your stylesheets. Perfect for web developers and performance optimization.",
    keywords: "css minifier, css compressor, css optimizer, css minification, css compression tool, css minifier online, free css tool, css optimizer online, css compression online, css minification tool, css compressor tool, css optimizer tool, css minifier free, css compressor free, css optimizer free, css minification online, css compression online",
    canonical: "https://www.konverter-online.com/css-minifier",
    ogTitle: "CSS Minifier - Compress CSS Code Online",
    ogDescription: "Minify and compress CSS code to reduce file size and improve loading speed.",
    ogImage: "https://www.konverter-online.com/og-image.svg",
    ogImageAlt: "CSS Minifier Tool",
    twitterTitle: "CSS Minifier - Compress CSS Code Online",
    twitterDescription: "Minify and compress CSS code to reduce file size and improve performance.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "CSS Minifier",
      "url": "https://www.konverter-online.com/css-minifier",
      "description": "Minify and compress CSS code to reduce file size and improve loading speed.",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "CSS minification",
        "Comment removal",
        "Whitespace optimization",
        "File size reduction",
        "Performance optimization",
        "Copy to clipboard",
        "Download minified CSS",
        "Original vs minified comparison"
      ],
      "author": {
        "@type": "Person",
        "name": "Daniel Zaharia"
      }
    }
  },
  "url-shortener": {
    title: "URL Shortener - Create Short Links Online | Free Tool",
    description: "Create short, shareable URLs with our free online URL shortener. Track clicks, generate QR codes, and share links easily. Perfect for social media, marketing campaigns, and link sharing.",
    keywords: "url shortener, link shortener, short url generator, url shortener online, free url shortener, link shortener online, short url creator, url shortener tool, link shortener tool, short url maker, url shortener free, link shortener free, short url generator online, url shortener tool online, link shortener tool online",
    canonical: "https://www.konverter-online.com/url-shortener",
    ogTitle: "URL Shortener - Create Short Links Online",
    ogDescription: "Create short, shareable URLs with click tracking and QR code generation.",
    ogImage: "https://www.konverter-online.com/og-image.svg",
    ogImageAlt: "URL Shortener Tool",
    twitterTitle: "URL Shortener - Create Short Links Online",
    twitterDescription: "Create short, shareable URLs with click tracking and QR codes.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "URL Shortener",
      "url": "https://www.konverter-online.com/url-shortener",
      "description": "Create short, shareable URLs with click tracking and QR code generation.",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "URL shortening",
        "Click tracking",
        "QR code generation",
        "Link sharing",
        "Custom short URLs",
        "Analytics dashboard",
        "Bulk URL shortening",
        "API access"
      ],
      "author": {
        "@type": "Person",
        "name": "Daniel Zaharia"
      }
    }
  },
  "base64-converter": {
    title: "Base64 Converter - Encode/Decode Base64 Online | Free Tool",
    description: "Convert text, images, and files to Base64 encoding with our free online Base64 converter. Encode and decode Base64 strings easily. Perfect for developers working with data encoding and file transfers.",
    keywords: "base64 converter, base64 encoder, base64 decoder, base64 converter online, free base64 tool, base64 encoder online, base64 decoder online, base64 converter tool, base64 encoder tool, base64 decoder tool, base64 converter free, base64 encoder free, base64 decoder free, base64 encoding tool, base64 decoding tool",
    canonical: "https://www.konverter-online.com/base64-converter",
    ogTitle: "Base64 Converter - Encode/Decode Base64 Online",
    ogDescription: "Convert text, images, and files to Base64 encoding. Encode and decode Base64 strings easily.",
    ogImage: "https://www.konverter-online.com/og-image.svg",
    ogImageAlt: "Base64 Converter Tool",
    twitterTitle: "Base64 Converter - Encode/Decode Base64 Online",
    twitterDescription: "Convert text, images, and files to Base64 encoding with our free tool.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Base64 Converter",
      "url": "https://www.konverter-online.com/base64-converter",
      "description": "Convert text, images, and files to Base64 encoding. Encode and decode Base64 strings easily.",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Text to Base64 encoding",
        "Base64 to text decoding",
        "File to Base64 conversion",
        "Image to Base64 encoding",
        "Copy to clipboard",
        "Download encoded files",
        "Batch processing",
        "URL-safe encoding"
      ],
      "author": {
        "@type": "Person",
        "name": "Daniel Zaharia"
      }
    }
  }
}

export function getSEOConfig(path: string): SEOConfig {
  const key = path === '/' ? 'home' : path.slice(1)
  return seoConfig[key] || seoConfig.home
} 