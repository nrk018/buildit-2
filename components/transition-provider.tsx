"use client"

import type React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [active, setActive] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setActive(true)
    setProgress(0)
    // ramp to ~90%
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 20 + 10, 90))
    }, 120)
    // complete soon after
    const done = setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setActive(false)
        setProgress(0)
      }, 250)
    }, 700)

    return () => {
      clearInterval(interval)
      clearTimeout(done)
    }
  }, [pathname])

  const pageVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: 8, filter: "blur(2px)" },
      animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
      exit: { opacity: 0, y: -6, filter: "blur(2px)", transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
    }),
    [],
  )

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            key="mk-progress"
            className="fixed inset-0 z-50 grid place-items-start pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ background: "color-mix(in oklch, var(--background) 96%, black 4%)" }}
            aria-hidden
          >
            <div className="mx-auto mt-6 w-full max-w-xl px-4">
              <div className="rounded-full border border-border/80 bg-card/40 p-2 shadow-lg">
                <div className="relative h-3 overflow-hidden rounded-full bg-background">
                  <motion.div
                    className="h-full bg-[color:var(--brand-yellow)]"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                  <div className="bg-stripes absolute inset-0" />
                </div>
                <div className="mt-2 text-center text-xs text-muted-foreground">Loading…</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div key={pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
