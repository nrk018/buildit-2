"use client"

import type React from "react"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  async function onSubmit(formData: FormData) {
    setLoading(true)
    // Simulate submit – wire to your backend/automation later
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Thanks for reaching out!",
        description: "We’ll get back to you shortly.",
      })
    }, 600)
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <header className="mb-6">
        <h1
          className="text-balance text-3xl font-semibold md:text-4xl"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Contact / Join
        </h1>
        <p className="mt-2 text-muted-foreground">Tell us about you and your interests.</p>
      </header>

      <form action={async (fd) => onSubmit(fd)} className="grid gap-4 rounded-lg border border-border/50 bg-card p-5">
        <Field label="Name">
          <input
            required
            name="name"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-0 focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Your name"
          />
        </Field>
        <Field label="Email">
          <input
            required
            name="email"
            type="email"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-0 focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="you@university.edu"
          />
        </Field>
        <Field label="Domain of Interest">
          <select
            name="domain"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-0 focus-visible:ring-2 focus-visible:ring-ring"
            defaultValue=""
            aria-label="Domain of Interest"
          >
            <option value="" disabled>
              Select a domain
            </option>
            <option>AI & DS</option>
            <option>Robotics & Automation</option>
            <option>Research & Innovation</option>
            <option>Entrepreneurship & Startups</option>
            <option>Web & App Development</option>
            <option>Mechatronics</option>
          </select>
        </Field>
        <Field label="Message">
          <textarea
            name="message"
            rows={4}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-0 focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Tell us about your goals..."
          />
        </Field>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          <a
            href="#"
            className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Join Discord
          </a>
        </div>
      </form>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  const id = label.toLowerCase().replace(/\s+/g, "-")
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs text-muted-foreground">
        {label}
      </label>
      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
      <div role="group" id={id} className="contents">
        {children}
      </div>
    </div>
  )
}
