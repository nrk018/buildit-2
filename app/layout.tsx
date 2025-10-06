import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import SiteNav from "@/components/site-nav" // fix SiteNav import path to point to the actual component with default export
import { TransitionProvider } from "@/components/transition-provider" // new
import MarioSoundProvider from "@/components/mario-sound-provider"

const bitcount = localFont({
  src: "./fonts/BitcountPropSingleInk.ttf",
  variable: "--font-bitcount",
  display: "swap",
})

export const metadata: Metadata = {
  title: "BuildIt — MUJ Builder Club",
  description: "Build. Learn. Ship. A builder club at Manipal University Jaipur.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${bitcount.variable} dark antialiased`}>
      <body className="min-h-dvh bg-background text-foreground font-sans">
        <TransitionProvider>
          <MarioSoundProvider>
            <div className="relative flex min-h-dvh flex-col">
              <Suspense fallback={<div>Loading...</div>}>
                <SiteNav />
              </Suspense>
              <main className="flex-1">{children}</main>
              <footer className="border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
                <p className="px-4">© {new Date().getFullYear()} BuildIt — Manipal University Jaipur</p>
              </footer>
            </div>
          </MarioSoundProvider>
        </TransitionProvider>
        <Analytics />
      </body>
    </html>
  )
}
