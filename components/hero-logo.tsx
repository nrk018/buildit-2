"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"

// Typewriter effect component
function TypewriterCommand() {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentCommand, setCurrentCommand] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [isFading, setIsFading] = useState(false)

  const commands = [
    '> join buildit --team "AI & Data Science" --mentor "GSoC Expert" --project "Smart Campus Analytics"',
    '> explore domains --ai --robotics --webdev --research --entrepreneurship',
    '> connect mentors --industry-experts --alumni --gsoc-mentors --startup-founders',
    '> start project --team-size 4 --duration "3 months" --domain "AI & ML"',
    '> view leaderboard --individuals --teams --domains --less-ai',
    '> attend workshop --topic "React Native" --mentor "Tech Lead" --date "2024-02-15"',
    '> submit project --name "Smart Campus" --demo-url "github.com/buildit/smart-campus"',
    '> join discord --community "1000+ builders" --channels "general,projects,help"'
  ]

  const results = [
    '// Result: Team formed, mentor assigned, project scope defined, 3-month sprint begins.',
    '// Available domains: AI & Data Science, Robotics & Automation, Web Development, Research & Innovation, Entrepreneurship',
    '// Mentor network: 50+ industry experts, 20+ GSoC alumni, 15+ startup founders',
    '// Project initialized: 4-member team, 3-month timeline, AI/ML focus area',
    '// Leaderboard: Top performers across individuals, teams, domains, and Less-AI categories',
    '// Workshop registered: React Native development with industry tech lead',
    '// Project submitted: Smart Campus analytics platform with live demo',
    '// Discord joined: 1000+ active builders, multiple channels for collaboration'
  ]

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentCommandText = commands[currentCommand]

      if (!isDeleting) {
        if (currentIndex < currentCommandText.length) {
          setCurrentText(currentCommandText.substring(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        } else {
          // Show result after command is complete
          setShowResult(true)
          // Start deleting after 4 seconds delay
          setTimeout(() => {
            setIsFading(true)
            setTimeout(() => {
              setIsDeleting(true)
              setShowResult(false)
              setIsFading(false)
            }, 1000) // Fade duration
          }, 4000) // 4 seconds delay
        }
      } else {
        if (currentIndex > 0) {
          setCurrentText(currentCommandText.substring(0, currentIndex - 1))
          setCurrentIndex(currentIndex - 1)
        } else {
          setIsDeleting(false)
          setCurrentCommand((prev) => (prev + 1) % commands.length)
          setCurrentIndex(0)
        }
      }
    }, isDeleting ? 30 : 40) // Faster typing: 40ms per character, 30ms for deletion

    return () => clearTimeout(timeout)
  }, [currentIndex, isDeleting, currentCommand, commands])

  return (
    <div className="px-2 py-2 font-mono text-sm leading-6 text-foreground max-h-48 overflow-y-auto">
      <div className="rounded-md bg-background/60 px-3 py-3 text-muted-foreground min-h-[3rem]">
        <div className="whitespace-pre-wrap break-words">
          {currentText}
          <span className="animate-pulse">|</span>
        </div>
      </div>
      {showResult && (
        <div className={`mt-3 text-muted-foreground whitespace-pre-wrap break-words transition-opacity duration-1000 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
          {results[currentCommand]}
        </div>
      )}
    </div>
  )
}

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

      <div className="relative z-10 mx-auto flex flex-col md:flex-row max-w-7xl items-center px-4">
        {/* Logo - Full width on mobile, half width on desktop */}
        <div className="w-full md:w-1/2 flex justify-center items-center min-h-[40vh] md:min-h-[calc(100dvh-64px)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center items-center w-full h-full"
          >
            <Image
              alt="BuildIt logo with paper plane"
              src="/images/builditlogo.png"
              width={600}
              height={600}
              className="w-full h-full max-w-[80%] md:max-w-[90%] max-h-[80%] md:max-h-[90%] object-contain rounded-2xl shadow-2xl"
              priority
            />
          </motion.div>
        </div>

        {/* Text Content - Full width on mobile, half width on desktop */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start pl-0 md:pl-8">
          <div className="text-4xl font-bold md:text-6xl lg:text-7xl text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
              className="block md:block"
            >
              BUILD.
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3, ease: "easeOut" }}
              className="inline md:block"
            >
              {" "}LEARN.
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3, ease: "easeOut" }}
              className="inline md:block"
            >
              {" "}SHIP.
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
            className="mt-6 text-lg text-muted-foreground md:text-xl max-w-lg text-center md:text-left"
          >
            A builder club at Manipal University Jaipur — where students build real-world projects, learn from industry experts, and ship innovative solutions.
          </motion.p>

          {/* Cursor-like command panel */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="mt-8 w-full max-w-2xl rounded-lg border border-border bg-card p-3 mx-auto"
            aria-label="Command panel demo"
          >
            <div className="flex items-center gap-2 border-b border-border/60 px-2 pb-2 text-xs text-muted-foreground">
              <span className="inline-flex h-2 w-2 rounded-full bg-primary/60"></span>
              <span className="inline-flex h-2 w-2 rounded-full bg-secondary/60"></span>
              <span className="inline-flex h-2 w-2 rounded-full bg-muted-foreground/40"></span>
              <span className="ml-auto">command.ts</span>
            </div>
            <TypewriterCommand />
          </motion.div>
        </div>
      </div>

      {/* Floating Arrow Down Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          const nextSection = document.querySelector('[data-section="1"]')
          nextSection?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 hover:bg-card/90 transition-all duration-300 shadow-lg"
        aria-label="Scroll to next section"
      >
        <ChevronDown className="w-6 h-6 text-foreground animate-bounce" />
      </motion.button>
    </section>
  )
}
