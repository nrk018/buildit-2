"use client"

import { motion } from "framer-motion"

const steps = [
  {
    title: "Hackathon & Team Formation",
    desc: "Kickstart the cycle with a hackathon to form teams and choose projects.",
  },
  {
    title: "3–4 Month Project Build",
    desc: "Sprint in cycles, iterate weekly, and keep scope tight.",
  },
  {
    title: "Mentorship & Review",
    desc: "Receive regular feedback from mentors to unblock and refine.",
  },
  {
    title: "Showcase & Leaderboard",
    desc: "Demo your work, reflect, and climb the leaderboard.",
  },
]

export default function BuildCyclePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-10">
        <h1
          className="text-balance text-3xl font-semibold md:text-4xl"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          The Build Cycle
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Four phases designed to help you move from idea to shipped product with clarity and momentum.
        </p>
      </header>

      <ol className="relative grid gap-6 md:grid-cols-2">
        {steps.map((s, i) => (
          <motion.li
            key={s.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
            className="rounded-lg border border-border/50 bg-card p-5"
          >
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {s.title}
                </h3>
                <p className="mt-1 text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          </motion.li>
        ))}
      </ol>

      <div className="mt-10">
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Join the Next Cycle
        </a>
      </div>
    </div>
  )
}
