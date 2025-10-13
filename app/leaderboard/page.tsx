"use client"

import type React from "react"

import useSWR from "swr"
import { useState, useEffect } from "react"
import { useMarioSoundEffect } from "@/components/mario-sounds"
import { fetcher } from "@/lib/fetcher"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

type Individual = { rank: number; name: string; team: string; domain: string; points: number }
type Team = { rank: number; teamName: string; domain: string; project: string; points: number }
type Domain = { rank: number; domain: string; totalPoints: number }
type LessAI = { rank: number; name: string; points: number }

const tabs = [
  { key: "individuals", label: "Individual" },
  { key: "teams", label: "Team" },
  { key: "domains", label: "Domain" },
  { key: "less-ai", label: "Less-AI" },
] as const

const codingFacts = [
  "The first computer bug was an actual bug - a moth found trapped in a Harvard Mark II computer in 1947.",
  "The term 'debugging' comes from Admiral Grace Hopper, who literally removed a moth from a computer.",
  "The first programming language was called 'Plankalkül' and was created by Konrad Zuse in 1945.",
  "JavaScript was created in just 10 days by Brendan Eich in 1995.",
  "The first computer virus was created in 1983 and was called 'Elk Cloner'.",
  "Git was created by Linus Torvalds in just 2 weeks in 2005.",
  "The first website ever created is still online at info.cern.ch.",
  "The term 'software' was first used by John Tukey in 1958.",
  "The first computer game was 'Spacewar!' created in 1962.",
  "The first email was sent in 1971 by Ray Tomlinson to himself.",
  "The first domain name ever registered was symbolics.com in 1985.",
  "The first web browser was called 'WorldWideWeb' and was created by Tim Berners-Lee in 1990.",
  "The first search engine was called 'Archie' and was created in 1990.",
  "The first social media platform was 'Six Degrees' created in 1997.",
  "The first iPhone app was created in 2008 and was called 'iTunes Remote'.",
  "The first programming language to use object-oriented programming was Simula in 1967.",
  "The first computer mouse was made of wood and was created in 1964.",
  "The first computer keyboard was the QWERTY layout, designed in 1873.",
  "The first computer monitor was a cathode ray tube (CRT) display.",
  "The first computer memory was called 'core memory' and used magnetic cores."
]

export default function LeaderboardPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("individuals")
  const [query, setQuery] = useState("")
  const [isTabsMenuOpen, setIsTabsMenuOpen] = useState(false)
  const { playSound } = useMarioSoundEffect()

  useEffect(() => {
    // play a short "lottery" jingle when leaderboard mounts
    playSound('lottery')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-6">
        <h1
          className="text-balance text-3xl font-semibold md:text-4xl"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Leaderboard
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Track performance by individuals, teams, domains, and our Less-AI category.
        </p>
      </header>

      <div className="flex flex-col gap-3 md:gap-4">
        {/* Search on top */}
        <div className="relative w-full md:w-auto">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or team..."
            className="h-9 w-full md:w-72 rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            aria-label="Search leaderboard"
          />
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
            {/* magnifier icon */}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"/></svg>
          </span>
        </div>

        {/* Tabs: hamburger on mobile, inline on desktop */}
        <div className="flex items-center justify-between md:justify-start">
          <div className="hidden md:flex" role="tablist" aria-label="Leaderboard tabs">
            <div className="flex items-center gap-2">
              {tabs.map((t) => {
                const active = tab === t.key
                return (
                  <button
                    key={t.key}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(t.key)}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      active ? "bg-white/30 backdrop-blur-md border border-white/50 text-white shadow-lg" : "bg-white/10 text-muted-foreground hover:text-foreground hover:bg-white/20",
                    )}
                  >
                    {t.label}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="md:hidden w-full">
            <button
              onClick={() => setIsTabsMenuOpen(true)}
              className="inline-flex w-full items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-sm"
              aria-label="Open sections menu"
            >
              <span>{tabs.find((t) => t.key === tab)?.label ?? "Sections"}</span>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile tabs bottom sheet */}
      <AnimatePresence>
        {isTabsMenuOpen && (
          <>
            <motion.button
              aria-label="Close sections backdrop"
              onClick={() => setIsTabsMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border border-border bg-card p-4 shadow-lg md:hidden"
            >
              <div className="mx-auto max-w-6xl">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">Sections</span>
                  <button onClick={() => setIsTabsMenuOpen(false)} className="rounded-md p-2 hover:bg-background/60" aria-label="Close">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {tabs.map((t) => {
                    const active = tab === t.key
                    return (
                      <button
                        key={t.key}
                        onClick={() => { setTab(t.key); setIsTabsMenuOpen(false) }}
                        className={cn(
                          "w-full rounded-md border border-border px-3 py-2 text-sm text-left transition-all",
                          active ? "bg-white/30 backdrop-blur-md border-white/50 text-white shadow-lg" : "bg-white/10 hover:bg-white/20"
                        )}
                      >
                        {t.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="relative mt-6">
        <AnimatePresence mode="wait">
          {tab === "individuals" && (
            <motion.div
              key="individuals"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <IndividualsTable query={query} />
            </motion.div>
          )}
          {tab === "teams" && (
            <motion.div
              key="teams"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <TeamsTable query={query} />
            </motion.div>
          )}
          {tab === "domains" && (
            <motion.div
              key="domains"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <DomainsTable />
            </motion.div>
          )}
          {tab === "less-ai" && (
            <motion.div
              key="less-ai"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <LessAITable />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      {children}
    </div>
  )
}

function LoadingWithFacts() {
  const [currentFact, setCurrentFact] = useState("")
  const [factIndex, setFactIndex] = useState(0)

  useEffect(() => {
    // Set initial random fact
    const randomIndex = Math.floor(Math.random() * codingFacts.length)
    setFactIndex(randomIndex)
    setCurrentFact(codingFacts[randomIndex])
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8">
      {/* Coding Fact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl text-center"
      >
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Did you know?
          </div>
        </div>
        <motion.p
          key={currentFact}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-lg text-muted-foreground leading-relaxed"
        >
          {currentFact}
        </motion.p>
      </motion.div>

      {/* Loading Animation */}
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          className="relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Outer ring */}
          <motion.div
            className="w-16 h-16 border-4 border-primary/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          {/* Inner ring */}
          <motion.div
            className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-primary rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          {/* Center dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-sm text-muted-foreground"
        >
          Loading leaderboard...
        </motion.p>
      </div>
    </div>
  )
}

function IndividualsTable({ query = "" }: { query?: string }) {
  const { data, isLoading } = useSWR<{ data: Individual[] }>("/api/leaderboard/individuals", fetcher)
  const [currentPage, setCurrentPage] = useState(1)
  const [showLoading, setShowLoading] = useState(true)
  const itemsPerPage = 8
  
  useEffect(() => {
    if (!isLoading && data) {
      // Add artificial delay for smoother experience
      const timer = setTimeout(() => {
        setShowLoading(false)
      }, 2000) // 2 second delay
      
      return () => clearTimeout(timer)
    }
  }, [isLoading, data])
  
  if (isLoading || showLoading) {
    return <LoadingWithFacts />
  }

  const filtered = (data?.data || []).filter((row) => {
    if (!query) return true
    const q = query.toLowerCase()
    return (
      row.name.toLowerCase().includes(q) ||
      row.team.toLowerCase().includes(q)
    )
  })
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filtered.slice(startIndex, endIndex)

  return (
    <div className="space-y-4">
      <CardShell>
        {currentData.map((row, index) => (
          <motion.div
            key={`${row.rank}-${row.name}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="rounded-lg border border-border/50 bg-card p-4 hover:bg-accent/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {row.rank}
                </div>
                <div>
                  <h3 className="font-medium">{row.name}</h3>
                  <p className="text-sm text-muted-foreground">{row.team} • {row.domain}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{row.points}</div>
                <div className="text-xs text-muted-foreground">points</div>
              </div>
            </div>
          </motion.div>
        ))}
      </CardShell>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="rounded-md px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/40 transition-colors"
          >
            Previous
          </button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="rounded-md px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/40 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

function TeamsTable({ query = "" }: { query?: string }) {
  const { data, isLoading } = useSWR<{ data: Team[] }>("/api/leaderboard/teams", fetcher)
  const [currentPage, setCurrentPage] = useState(1)
  const [showLoading, setShowLoading] = useState(true)
  const itemsPerPage = 8
  
  useEffect(() => {
    if (!isLoading && data) {
      const timer = setTimeout(() => {
        setShowLoading(false)
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [isLoading, data])
  
  if (isLoading || showLoading) {
    return <LoadingWithFacts />
  }

  const filtered = (data?.data || []).filter((row) => {
    if (!query) return true
    const q = query.toLowerCase()
    return (
      row.teamName.toLowerCase().includes(q)
    )
  })
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filtered.slice(startIndex, endIndex)

  return (
    <div className="space-y-4">
      <CardShell>
        {currentData.map((row, index) => (
          <motion.div
            key={`${row.rank}-${row.teamName}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="rounded-lg border border-border/50 bg-card p-4 hover:bg-accent/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {row.rank}
                </div>
                <div>
                  <h3 className="font-medium">{row.teamName}</h3>
                  <p className="text-sm text-muted-foreground">{row.domain} • {row.project}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{row.points}</div>
                <div className="text-xs text-muted-foreground">points</div>
              </div>
            </div>
          </motion.div>
        ))}
      </CardShell>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="rounded-md px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/40 transition-colors"
          >
            Previous
          </button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="rounded-md px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/40 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

function DomainsTable() {
  const { data, isLoading } = useSWR<{ data: Domain[] }>("/api/leaderboard/domains", fetcher)
  const [showLoading, setShowLoading] = useState(true)
  
  useEffect(() => {
    if (!isLoading && data) {
      const timer = setTimeout(() => {
        setShowLoading(false)
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [isLoading, data])
  
  if (isLoading || showLoading) {
    return <LoadingWithFacts />
  }

  return (
    <CardShell>
      {data?.data?.map((row, index) => (
        <motion.div
            key={`${row.rank}-${row.domain}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.05 }}
          className="rounded-lg border border-border/50 bg-card p-4 hover:bg-accent/40 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {row.rank}
              </div>
              <div>
                <h3 className="font-medium">{row.domain}</h3>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">{row.totalPoints}</div>
              <div className="text-xs text-muted-foreground">total points</div>
            </div>
          </div>
        </motion.div>
      ))}
    </CardShell>
  )
}

function LessAITable() {
  const { data, isLoading } = useSWR<{ data: LessAI[] }>("/api/leaderboard/less-ai", fetcher)
  const [showLoading, setShowLoading] = useState(true)
  
  useEffect(() => {
    if (!isLoading && data) {
      const timer = setTimeout(() => {
        setShowLoading(false)
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [isLoading, data])
  
  if (isLoading || showLoading) {
    return <LoadingWithFacts />
  }

  return (
    <CardShell>
      {data?.data?.map((row, index) => (
        <motion.div
          key={`${row.rank}-${row.name}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.05 }}
          className="rounded-lg border border-border/50 bg-card p-4 hover:bg-accent/40 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {row.rank}
              </div>
              <div>
                <h3 className="font-medium">{row.name}</h3>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">{row.points}</div>
              <div className="text-xs text-muted-foreground">points</div>
            </div>
          </div>
        </motion.div>
      ))}
    </CardShell>
  )
}

