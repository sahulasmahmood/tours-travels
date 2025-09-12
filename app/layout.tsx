import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

import { ThemeProvider } from "@/components/providers/theme"
import { DynamicFavicon } from "@/components/dynamic-favicon"
import { GoogleAuthProvider } from '@/components/providers/google-auth-provider'
import { SEOProvider } from '@/components/providers/seo-provider'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vinushree Tours & Travels - Premium Travel Services in Tamil Nadu",
  description: "Experience Tamil Nadu with Vinushree Tours & Travels. Premium travel services including tour packages, airport taxi, day rentals, and more.",
  keywords: "Tamil Nadu travel, tour packages, airport taxi, day rental, travel services, Vinushree Tours",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider>
          <SEOProvider>
            <DynamicFavicon />
            <GoogleAuthProvider>
              {children}
            </GoogleAuthProvider>
          </SEOProvider>
        </ThemeProvider>
        <Toaster  />
      </body>
    </html>
  )
}
