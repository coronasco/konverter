import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Advanced SVG to CSS & JSX Converter | Free Online Tool",
  description: "Instantly convert SVG to optimized URL-encoded CSS, Base64, or React JSX components. Free, fast, and easy-to-use tool for developers and designers.",
  keywords: ["svg to css", "url encode svg", "svg to base64", "svg to react component", "optimize svg", "svgo", "developer tool", "svg converter", "svg optimizer", "react svg component"],
  authors: [{ name: "Daniel Zaharia" }],
  creator: "Daniel Zaharia",
  publisher: "Daniel Zaharia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.konverter-online.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Advanced SVG to CSS & JSX Converter | Free Online Tool",
    description: "Instantly convert SVG to optimized URL-encoded CSS, Base64, or React JSX components. Free, fast, and easy-to-use tool for developers and designers.",
    url: "https://www.konverter-online.com",
    siteName: "Konverter",
    images: [
      {
        url: "https://www.konverter-online.com/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Konverter - SVG to CSS/JSX Converter",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Advanced SVG to CSS & JSX Converter | Free Online Tool",
    description: "Instantly convert SVG to optimized URL-encoded CSS, Base64, or React JSX components.",
    images: ["https://www.konverter-online.com/og-image.svg"],
    creator: "@coronasco",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <StructuredData />
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
