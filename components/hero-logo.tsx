"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

export default function HeroLogo() {
  return (
    <section
      className="relative flex h-[calc(100dvh-64px)] snap-start items-center justify-center overflow-hidden bg-background"
      aria-label="BuildIt hero"
    >
      {/* Ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-16 left-1/4 h-52 w-52 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: "var(--brand-yellow)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: "var(--brand-yellow)" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
        {/* Larger logo + one-time zoom-in on mount (no levitation) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-2xl p-4"
        >
          <Image
            alt="BuildIt logo with paper plane"
            src="/images/builditlogo.png"
            width={400}
            height={400}
            className="h-72 w-72 md:h-96 md:w-96 rounded-2xl shadow-2xl"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
          className="mt-6 text-balance text-3xl font-semibold md:text-5xl"
        >
          Build. Learn. Ship.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
          className="mt-3 max-w-xl text-pretty text-base text-muted-foreground md:text-lg"
        >
          A builder club at Manipal University Jaipur — where students build real-world projects, learn from industry experts, and ship innovative solutions.
        </motion.p>

        {/* Cursor-like command panel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-8 w-full max-w-2xl rounded-lg border border-border bg-card p-3 text-left"
          aria-label="Command panel demo"
        >
          <div className="flex items-center gap-2 border-b border-border/60 px-2 pb-2 text-xs text-muted-foreground">
            <span className="inline-flex h-2 w-2 rounded-full bg-primary/60"></span>
            <span className="inline-flex h-2 w-2 rounded-full bg-secondary/60"></span>
            <span className="inline-flex h-2 w-2 rounded-full bg-muted-foreground/40"></span>
            <span className="ml-auto">command.ts</span>
          </div>
          <div className="px-2 py-2 font-mono text-sm leading-6 text-foreground">
            <div className="rounded-md bg-background/60 px-3 py-2 text-muted-foreground">
              {'> join buildit --team "AI & Data Science" --mentor "GSoC Expert" --project "Smart Campus Analytics"'}
            </div>
            <div className="mt-2 text-muted-foreground">
              {"// Result: Team formed, mentor assigned, project scope defined, 3-month sprint begins."}
            </div>
          </div>
        </motion.div>

        <div className="mt-8 flex items-center gap-3">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
            <Link
              href="/build-cycle"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Explore Build Cycle
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
            <Link
              href="/leaderboard"
              className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              View Leaderboard
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
