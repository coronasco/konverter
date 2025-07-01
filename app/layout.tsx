import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Advanced SVG to CSS & JSX Converter | Free Online Tool",
  description: "Instantly convert SVG to optimized URL-encoded CSS, Base64, or React JSX components. Free, fast, and easy-to-use tool for developers and designers.",
  keywords: ["svg to css", "url encode svg", "svg to base64", "svg to react component", "optimize svg", "svgo", "developer tool"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
