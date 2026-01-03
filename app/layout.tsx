import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { CryptoAddress } from "@/components/crypto-address"

export const metadata: Metadata = {
  title: "Creative Writing Collection",
  description: "A collection of creative writing works",
  // Add script preconnect for jQuery to improve loading performance
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add preconnect for jQuery CDN to improve loading performance */}
        <link rel="preconnect" href="https://code.jquery.com" />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <header className="border-b border-border">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <a href="/" className="text-xl font-semibold hover:text-primary transition-colors flex items-center">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-md mr-2">MR</span>
                Midnight Reliquary
              </a>
              <ThemeToggle />
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t border-border mt-12 py-6">
            <div className="container mx-auto px-4">
              {/* Support Section */}
              <div className="text-center mb-6 pb-6 border-b border-border/50">
                <p className="text-sm text-muted-foreground mb-4">
                  If you enjoy these works and would like to support my creative projects, donations are gratefully appreciated.
                </p>
                <div className="flex justify-center items-center gap-8 flex-wrap">
                  <CryptoAddress
                    address="bc1qjg7qeev4lqsq6r0gg6rtjf2hjm75lwnl3szx69"
                    currency="BTC"
                    imageUrl="/img/btc.PNG"
                  />
                  <CryptoAddress
                    address="0xb8D418882041bBfFd3155FDE57515B37429708c1"
                    currency="ETH"
                    imageUrl="/img/eth.PNG"/>
                </div>
              </div>
              
              {/* Copyright */}
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Nyx Edelstein
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
