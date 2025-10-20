"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
// sound effects removed

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/build-cycle", label: "Build Cycle" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/live-projects", label: "Live Projects" },
  { href: "/social", label: "Social" },
]

export default function SiteNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  // sounds removed

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  
  const closeMenu = () => {
    setIsOpen(false)
  }
  
  const handleNavClick = (_href: string) => {}

  return (
    <>
      <header className="sticky top-0 z-50 bg-transparent px-3 py-2">
        <nav className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between gap-4 rounded-full border border-[color:var(--border)] bg-card/60 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-card/50">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <span className="font-semibold tracking-tight text-white">BUILDIT | MUJ</span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-1 flex-1 justify-end">
              {nav.map((item) => {
                const active = pathname === item.href
                return (
                  <li key={item.href} className="flex flex-shrink-0">
                      <Link
                        href={item.href}
                        onClick={() => handleNavClick(item.href)}
                        className={cn(
                          "inline-flex h-9 items-center rounded-full px-3 text-sm leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap",
                          active
                            ? "bg-background text-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-background/60",
                        )}
                        aria-current={active ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                  </li>
                )
              })}
              <li className="ml-1 flex flex-shrink-0">
                <Link
                  href="/start-building"
                  onClick={() => handleNavClick('/start-building')}
                  className="inline-flex h-9 items-center rounded-full bg-black px-3 text-sm font-medium text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap"
                >
                  Register Now!
                </Link>
              </li>
            </ul>

            {/* Mobile Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1 focus:outline-none focus:ring-2 focus:ring-ring rounded-md"
              aria-label="Toggle menu"
            >
              <motion.span
                className="w-6 h-0.5 bg-foreground block"
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 6 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-foreground block"
                animate={{
                  opacity: isOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-foreground block"
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -6 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Slide Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={closeMenu}
            />
            
            {/* Slide Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-card border-l border-[color:var(--border)] md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-6 border-b border-[color:var(--border)]">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold tracking-tight text-white">BUILDIT | MUJ</span>
                  </div>
                  <button
                    onClick={closeMenu}
                    className="p-2 rounded-md hover:bg-background/60 transition-colors"
                    aria-label="Close menu"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Sticky CTA at top for quick access */}
                <div className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-[color:var(--border)] p-4">
                  <Link
                    href="/start-building"
                    onClick={() => {
                      handleNavClick('/start-building')
                      closeMenu()
                    }}
                    className="w-full inline-flex items-center justify-center rounded-lg bg-black px-4 py-3 text-base font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  >
                    Register Now!
                  </Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-6">
                  <ul className="space-y-2">
                    {nav.map((item, index) => {
                      const active = pathname === item.href
                      return (
                        <motion.li
                          key={item.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                              <Link
                                href={item.href}
                                onClick={() => {
                                  handleNavClick(item.href)
                                  closeMenu()
                                }}
                                className={cn(
                                  "flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
                                  active
                                    ? "bg-background text-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-background/60",
                                )}
                                aria-current={active ? "page" : undefined}
                              >
                                {item.label}
                              </Link>
                        </motion.li>
                      )
                    })}
                  </ul>
                </nav>

                {/* Removed bottom CTA to avoid scrolling for access */}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
