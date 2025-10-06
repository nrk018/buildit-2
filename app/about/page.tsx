"use client"

import type React from "react"

import { motion } from "framer-motion"
import Image from 'next/image'
import { cn } from '@/lib/utils'

const domains = [
  "AI & DS",
  "Robotics & Automation",
  "Research & Innovation",
  "Entrepreneurship & Startups",
  "Web & App Development",
  "Mechatronics",
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

const MENTORS: TeamMember[] = [
  {
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
    name: 'Dr. Sarah Chen',
    role: 'Senior Software Engineer at Google',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVvcGxlfGVufDB8fDB8fHww',
    name: 'Alex Rodriguez',
    role: 'AI Research Lead at Microsoft',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
    name: 'Priya Sharma',
    role: 'Product Manager at Meta',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
    name: 'Michael Johnson',
    role: 'Robotics Engineer at Tesla',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
    name: 'Dr. Emily Watson',
    role: 'Data Science Director at Amazon',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
    name: 'David Kim',
    role: 'Startup Founder & GSoC Mentor',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
    name: 'Lisa Thompson',
    role: 'UX Design Lead at Apple',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww',
    name: 'Dr. Raj Patel',
    role: 'Blockchain Expert at JPMC',
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-8">
        <h1
          className="text-balance text-3xl font-semibold md:text-4xl"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          About BuildIt
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          We are a builder club at Manipal University Jaipur with a simple ethos: build consistently, learn deeply, and
          ship confidently.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <Card title="Mission">
          Empower students to become consistent builders, turning ideas into shipped products.
        </Card>
        <Card title="Vision">
          A thriving ecosystem where student teams iterate, get mentored, and showcase their work to grow careers and
          community.
        </Card>
        <Card title="Philosophy">Minimalism, focus, and craftsmanship. Every interaction and pixel has a purpose.</Card>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          Domains
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {domains.map((d) => (
            <div
              key={d}
              className="rounded-lg border border-border/50 bg-card p-4 text-sm hover:shadow-lg hover:shadow-primary/10"
            >
              {d}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <TeamSection />
      </section>

      <section className="mt-16">
        <MentorsSection />
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
        <h3 className="text-base font-semibold leading-tight">{member.role}</h3>
        <p className="text-sm text-muted-foreground">{member.name}</p>
      </div>
    </div>
  );
}

function TeamSection() {
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Meet our <span className="text-primary">core team</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Passionate students leading BuildIt's mission to empower builders and create innovative projects.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {TEAM_MEMBERS.map((member, index) => (
          <div key={index}>
            <TeamCard
              className="bg-card border rounded-lg"
              member={member}
            />
          </div>
        ))}
      </div>
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
