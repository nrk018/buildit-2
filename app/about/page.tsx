"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from 'next/image'
import { cn } from '@/lib/utils'

// Domain content (each rendered as its own section)
const domainDetails = [
  {
    title: "Artificial Intelligence & Data Science (AI & DS)",
    focus:
      "Projects should leverage machine learning, deep learning, and data-driven insights to solve real-world problems.",
    areas: [
      "Predictive modeling & forecasting",
      "Image, video, and speech recognition",
      "AI-powered chatbots or virtual assistants",
      "Data visualization dashboards & insights",
      "Automation using ML/AI pipelines",
      "Ethical AI & bias detection",
    ],
    examples: [
      "Smart campus energy optimization using AI",
      "Student attendance prediction using machine learning",
      "AI-powered mental health chatbots",
    ],
  },
  {
    title: "Robotics & Automation",
    focus:
      "Projects should center on designing, building, and programming robots or automated systems that can perform tasks efficiently.",
    areas: [
      "Autonomous navigation & path planning",
      "Industrial robotics & process automation",
      "IoT-enabled devices for smart environments",
      "Robotic arms and manipulators",
      "Human-robot interaction systems",
    ],
    examples: [
      "Automated greenhouse watering system",
      "Robot for warehouse management",
      "Gesture-controlled robotic arm",
    ],
  },
  {
    title: "Research & Innovation",
    focus:
      "Projects should involve exploratory or experimental work to push the boundaries of technology, processes, or methodologies.",
    areas: [
      "Proof-of-concept solutions for emerging tech",
      "Experimental hardware/software integrations",
      "Innovative workflows or platforms",
      "New algorithms, models, or frameworks",
      "Scientific or industrial problem-solving",
    ],
    examples: [
      "Novel drone delivery systems",
      "Experimental wearable health devices",
      "Innovative renewable energy harvesting solutions",
    ],
  },
  {
    title: "Entrepreneurship & Startups",
    focus:
      "Projects should be market-oriented solutions that can potentially scale into startups. Emphasis on business model, usability, and real-world impact.",
    areas: [
      "MVP (Minimum Viable Product) development",
      "Market research & customer validation",
      "SaaS, mobile apps, or web platforms",
      "Social entrepreneurship & impact-driven solutions",
      "Go-to-market strategy and prototyping",
    ],
    examples: [
      "Campus carpooling app",
      "Skill-sharing platform for students",
      "Eco-friendly packaging startup",
    ],
  },
  {
    title: "Web & App Development",
    focus:
      "Projects should involve designing and developing functional, user-friendly web or mobile applications.",
    areas: [
      "Full-stack applications (React, Node.js, etc.)",
      "Progressive Web Apps (PWAs)",
      "Mobile apps (iOS, Android, React Native, Flutter)",
      "API integrations & third-party services",
      "UX/UI design and accessibility",
    ],
    examples: [
      "University event management portal",
      "Multi-platform productivity app",
      "Campus social networking platform",
    ],
  },
]

interface TeamMember {
  avatar?: string;
  name: string;
  role: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  { name: 'Nirmal Rajkumar', role: 'PRESIDENT' },
  { name: 'Varun Mehrotra', role: 'VICE PRESIDENT' },
  { name: 'Krishna Goel', role: 'GENERAL SECRETARY' },
  { name: 'Shaurya Sharma', role: 'CHIEF FINANCIAL OFFICER' },
  { name: 'Ram Vignesh & S Kaushik Rao', role: 'EXECUTIVE HEAD OF PROJECTS MANAGEMENT' },
  { name: 'Nishant Bharadhwaj', role: 'EXECUTIVE HEAD OF TECHNICAL PROJECTS' },
  { name: 'Nishant Chaudhary', role: 'EXECUTIVE HEAD OF PRODUCTIONS' },
  { name: 'Nikitha Dharamveer Sheoran & Gayathri', role: 'EXECUTIVE HEAD OF TECHNICAL COMMUNICATION' },
  { name: 'Vallala Shiva Sai Danush Vardhan', role: 'EXECUTIVE HEAD OF HUMAN RESOURCES' },
  { name: 'Sidharth Mandal', role: 'EXECUTIVE HEAD OF MEDIA & DESIGN' },
  { name: 'Nikunj Khandelwal', role: 'EXECUTIVE HEAD OF LOGISTICS' },
]

const MENTORS: TeamMember[] = []

export default function AboutPage() {
  return (
    <div className="h-[calc(100dvh-64px)] overflow-y-auto snap-y snap-mandatory scroll-smooth">
      {/* About section */}
      <section className="relative flex h-[calc(100dvh-64px)] snap-start items-center">
        <div className="mx-auto max-w-5xl px-4 w-full">
          <header className="mb-8">
            <h1
              className="text-balance text-4xl font-semibold md:text-6xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              About BuildIt
            </h1>
            <p className="mt-4 max-w-3xl text-lg md:text-xl text-muted-foreground">
              We are a builder club at Manipal University Jaipur with a simple ethos: build consistently, learn deeply,
              and ship confidently.
            </p>
          </header>
          <RotatingSection />
        </div>
      </section>

      {/* Domains section */}
      <section className="relative flex h-[calc(100dvh-64px)] snap-start items-center">
        <div className="mx-auto max-w-5xl px-4 w-full">
          <h2 className="text-3xl md:text-5xl font-semibold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Domains
          </h2>
          <DomainTabs />
        </div>
      </section>

      {/* Mentors section */}
      <section className="relative flex h-[calc(100dvh-64px)] snap-start items-center">
        <div className="mx-auto max-w-5xl px-4 w-full">
          <MentorsSection />
        </div>
      </section>

      {/* Executive team section */}
      <section className="relative flex h-[calc(100dvh-64px)] snap-start items-start">
        <div className="mx-auto max-w-5xl px-4 w-full">
          <TeamSection />
        </div>
      </section>
    </div>
  )
}

function TeamCard({
  member,
  className,
  ...props
}: React.ComponentProps<'div'> & { member: TeamMember }) {
  return (
    <div className={cn('space-y-3 rounded-lg border bg-card p-4', className)} {...props}>
      <div className="aspect-square w-full rounded-lg border border-border/50 bg-muted/30 flex items-center justify-center text-xs text-muted-foreground">
        Image placeholder
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold leading-tight">{member.name}</h3>
        <p className="text-sm text-muted-foreground">{member.role}</p>
      </div>
    </div>
  );
}

type Group = "Board of Directors" | "Executive Committee" | "Core Committee" | "Junior Committee"

const teamGroups: Record<Group, { name: string; role: string; subgroup?: string }[]> = {
  "Board of Directors": [
    { name: "Nirmal Rajkumar", role: "President" },
    { name: "Varun Mehrotra", role: "Vice President" },
    { name: "Krishna Goel", role: "General Secretary" },
  ],
  "Executive Committee": [
    { name: "Shaurya Sharma", role: "Chief Financial Officer" },
    { name: "Ram Vignesh", role: "Executive Head of Projects Management" },
    { name: "S Kaushik Rao", role: "Executive Head of Projects Management" },
    { name: "Nishant Bharadhwaj", role: "Executive Head of Technical Projects" },
    { name: "Nishant Chaudhary", role: "Executive Head of Productions" },
    { name: "Nikitha D. Sheoran", role: "Executive Head of Technical Communication" },
    { name: "Gayathri", role: "Executive Head of Technical Communication" },
    { name: "Vallala S S D V Vardhan", role: "Executive Head of Human Resources" },
    { name: "Sidharth Mandal", role: "Executive Head of Media & Design" },
    { name: "Nikunj Khandelwal", role: "Executive Head of Logistics" },
  ],
  "Core Committee": [
    { name: "—", role: "", subgroup: "Finance & Sponsorship" },
    { name: "—", role: "", subgroup: "Productions" },
    { name: "—", role: "", subgroup: "Graphic Design & Media" },
    { name: "—", role: "", subgroup: "HR" },
    { name: "—", role: "", subgroup: "Technical Committee" },
    { name: "—", role: "", subgroup: "Logistics & Marketing" },
  ],
  "Junior Committee": [
    { name: "—", role: "", subgroup: "Finance & Sponsorship" },
    { name: "—", role: "", subgroup: "Productions" },
    { name: "—", role: "", subgroup: "Graphic Design & Media" },
    { name: "—", role: "", subgroup: "HR" },
    { name: "—", role: "", subgroup: "Technical Committee" },
    { name: "—", role: "", subgroup: "Logistics & Marketing" },
  ],
}

function TeamTabs() {
  const groups: Group[] = [
    "Board of Directors",
    "Executive Committee",
    "Core Committee",
    "Junior Committee",
  ]
  const [active, setActive] = useState<Group>(groups[0])
  const [sub, setSub] = useState<string | null>(null)
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  useEffect(() => {
    // reset sub when switching groups
    setSub(null)
    setCurrentPage(1)
  }, [active])

  const showMembers = teamGroups[active].filter((m) => !sub || m.subgroup === sub)
  const totalPages = Math.max(1, Math.ceil(showMembers.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const pageMembers = showMembers.slice(startIndex, endIndex)
  const subgroups = Array.from(new Set(teamGroups[active].map((m) => m.subgroup).filter(Boolean))) as string[]

  useEffect(() => {
    setCurrentPage(1)
  }, [sub])

  useEffect(() => {
    if (totalPages <= 1) return
    const id = setInterval(() => {
      setCurrentPage((p) => (p % totalPages) + 1)
    }, 5000)
    return () => clearInterval(id)
  }, [totalPages, active, sub])

  return (
    <div>
      {/* Sticky controls: group + subgroup bars */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-2 pb-2">
        <div className="flex justify-center">
          <div className="inline-flex rounded-full border border-border bg-card p-1">
            {groups.map((g) => (
              <button
                key={g}
                onClick={() => setActive(g)}
                className={cn(
                  "px-3 py-1 text-sm rounded-full transition-all",
                  active === g ? "bg-white/30 backdrop-blur-md border border-white/50 text-white shadow-lg" : "text-muted-foreground hover:text-foreground hover:bg-white/10"
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {subgroups.length > 0 && (
          <>
            {/* Desktop subgroup chips */}
            <div className="mt-2 hidden md:flex justify-center">
              <div className="inline-flex rounded-full border border-border bg-card p-1">
                {subgroups.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSub(s)}
                    className={cn(
                      "px-3 py-1 text-sm rounded-full",
                      sub === s ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {s}
                  </button>
                ))}
                <button
                  onClick={() => setSub(null)}
                  className={cn(
                    "px-3 py-1 text-sm rounded-full",
                    sub === null ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  All
                </button>
              </div>
            </div>

            {/* Mobile subgroup hamburger */}
            <div className="mt-2 flex md:hidden justify-center">
              <button
                onClick={() => setIsSubMenuOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm"
                aria-label="Open subgroup menu"
              >
                <span>Roles</span>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              </button>
            </div>

            <AnimatePresence>
              {isSubMenuOpen && (
                <>
                  <motion.button
                    aria-label="Close submenu backdrop"
                    onClick={() => setIsSubMenuOpen(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="fixed inset-0 z-40 bg-black/40"
                  />
                  <motion.div
                    role="dialog"
                    aria-modal="true"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                    className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border border-border bg-card p-4 shadow-lg"
                  >
                    <div className="mx-auto max-w-5xl">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">Choose role</span>
                        <button onClick={() => setIsSubMenuOpen(false)} className="rounded-md p-2 hover:bg-background/60" aria-label="Close">
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto">
                        <button
                          onClick={() => { setSub(null); setIsSubMenuOpen(false); setCurrentPage(1) }}
                          className={cn(
                            "w-full rounded-md border border-border px-3 py-2 text-sm text-left",
                            sub === null ? "bg-secondary text-secondary-foreground" : "bg-card hover:bg-background/60"
                          )}
                        >
                          All
                        </button>
                        {subgroups.map((s) => (
                          <button
                            key={s}
                            onClick={() => { setSub(s); setIsSubMenuOpen(false); setCurrentPage(1) }}
                            className={cn(
                              "w-full rounded-md border border-border px-3 py-2 text-sm text-left",
                              sub === s ? "bg-secondary text-secondary-foreground" : "bg-card hover:bg-background/60"
                            )}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      <div className="mt-3 max-h-[calc(100dvh-64px-260px)] md:max-h-[calc(100dvh-64px-220px)] overflow-y-auto overscroll-contain pr-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${active}-${sub ?? 'all'}-${currentPage}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 will-change-[opacity,transform]"
          >
            {showMembers.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground">Updating soon</div>
            ) : (
              pageMembers.map((m, idx) => (
                <TeamCard key={`${m.name}-${startIndex + idx}`} member={{ name: m.name, role: m.subgroup ? `${m.subgroup}` : m.role, avatar: "" }} />
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <div className="mt-3 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="rounded-md px-3 py-1 text-sm hover:bg-accent/40"
              aria-label="Previous page"
            >
              Previous
            </button>
            <span className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-md px-3 py-1 text-sm hover:bg-accent/40"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )}

function TeamSection() {
  return (
    <div className="pt-4">
      <div className="sticky top-0 z-10 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70 pt-2 pb-3">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold">
            Meet our <span className="text-primary">executive team</span>
          </h2>
          <p className="mt-1 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Passionate students leading BuildIt's mission to empower builders and create innovative projects.
          </p>
        </div>
      </div>
      <TeamTabs />
    </div>
  )
}

function MentorCard({
  member,
  className,
  ...props
}: React.ComponentProps<'div'> & { member: TeamMember }) {
  return (
    <div className={cn('space-y-3 rounded-lg border bg-card p-4', className)} {...props}>
      <div className="aspect-square w-full rounded-lg border border-border/50 bg-muted/30 flex items-center justify-center text-xs text-muted-foreground">
        Image placeholder
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold leading-tight">{member.name}</h3>
        <p className="text-sm text-muted-foreground">{member.role}</p>
      </div>
    </div>
  );
}

function MentorsSection() {
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Our <span className="text-primary">industry mentors</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Experienced professionals from top tech companies guiding our students with real-world expertise and industry insights.
        </p>
      </div>
      {MENTORS.length === 0 ? (
        <div className="mx-auto max-w-md rounded-lg border border-dashed border-border/60 bg-card p-6 text-center text-muted-foreground">
          Updating soon
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {MENTORS.map((mentor, index) => (
            <div key={index}>
              <MentorCard
                className="bg-card border rounded-lg hover:shadow-lg hover:shadow-primary/10 transition-shadow"
                member={mentor}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="rounded-lg border border-border/50 bg-card p-5"
    >
      <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
        {title}
      </h3>
      <p className="mt-2 text-muted-foreground">{children}</p>
    </motion.div>
  )
}

function RotatingSection() {
  const items = [
    {
      title: "Mission",
      body: "Empower students to become consistent builders, turning ideas into shipped products.",
    },
    {
      title: "Vision",
      body: "A thriving ecosystem where student teams iterate, get mentored, and showcase their work to grow careers and community.",
    },
    {
      title: "Philosophy",
      body: "Minimalism, focus, and craftsmanship. Every interaction and pixel has a purpose.",
    },
  ]

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative mx-auto mt-2 min-h-[180px] w-full max-w-3xl overflow-hidden rounded-xl border border-border/50 bg-card p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={items[index].title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 will-change-[opacity,transform]"
        >
          <h3 className="text-xl font-semibold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            {items[index].title}
          </h3>
          <p className="mt-2 text-muted-foreground max-w-2xl">{items[index].body}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function RotatingDomains() {
  const items = [
    "AI & DS",
    "Robotics & Automation",
    "Research & Innovation",
    "Entrepreneurship & Startups",
    "Web & App Development",
    "Mechatronics",
  ]
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 2500)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="relative mx-auto mt-4 min-h-[120px] w-full max-w-2xl overflow-hidden rounded-xl border border-border/50 bg-card p-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={items[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center text-center text-base font-medium will-change-[opacity,transform]"
        >
          {items[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function DomainCard({ title, focus, areas }: { title: string; focus: string; areas: string[] }) {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-4 md:p-6">
      <div>
        <h3 className="text-lg md:text-2xl font-semibold" style={{ fontFamily: "var(--font-space-grotesk)" }}>{title}</h3>
        <p className="mt-1 md:mt-2 text-sm md:text-lg text-muted-foreground">{focus}</p>
      </div>
      <div className="mt-3">
        <h4 className="text-sm md:text-base font-medium">Key Areas</h4>
        <ul className="mt-1 list-disc pl-4 md:pl-5 text-sm md:text-base text-muted-foreground space-y-1">
          {areas.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function DomainTabs() {
  const [active, setActive] = useState(0)
  const items = domainDetails
  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-2">
        {items.map((d, i) => (
          <button
            key={d.title}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full px-3 py-1 text-sm border transition-all",
              active === i ? "bg-white/30 backdrop-blur-md border-white/50 text-white shadow-lg" : "bg-white/10 text-muted-foreground border-white/20 hover:text-foreground hover:bg-white/20"
            )}
          >
            {d.title}
          </button>
        ))}
      </div>
      <div className="mt-4 max-h-[calc(100dvh-64px-260px)] md:max-h-[calc(100dvh-64px-200px)] overflow-y-auto overscroll-contain pr-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={items[active].title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <DomainCard {...items[active]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
