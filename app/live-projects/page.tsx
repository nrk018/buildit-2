"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function LiveProjectsPage() {
  const [teamName, setTeamName] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/teams/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teamName, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store team session and redirect to dashboard
        localStorage.setItem("teamSession", JSON.stringify({
          teamName: data.teamName,
          token: data.token,
          expires: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        }))
        router.push(`/live-projects/dashboard?team=${encodeURIComponent(data.teamName)}`)
      } else {
        setError(data.error || "Invalid credentials")
      }
    } catch (err) {
      setError("Connection error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-12 text-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Live Projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Track your team's progress and scores in real-time. Enter your team credentials to access your dashboard.
        </motion.p>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="rounded-xl border border-border/50 bg-card/70 backdrop-blur-md p-8 max-w-md mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Team Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="teamName" className="block text-sm font-medium mb-2">
              Team Name
            </label>
            <input
              id="teamName"
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="e.g., team-alpha-health-app"
              className="w-full rounded-lg border border-white/30 bg-white/10 backdrop-blur-md px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Team Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your team password"
              className="w-full rounded-lg border border-white/30 bg-white/10 backdrop-blur-md px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg border border-white/30 bg-white/20 backdrop-blur-md px-4 py-3 text-white font-medium hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Accessing..." : "View Dashboard"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have team credentials?{" "}
            <span className="text-white">Contact your mentor for access.</span>
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-12 text-center"
      >
        <h3 className="text-xl font-semibold mb-4">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="rounded-lg border border-white/30 bg-white/10 p-4">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium mb-2">Real-time Tracking</h4>
            <p className="text-sm text-muted-foreground">
              Your GitHub activity automatically updates your team score
            </p>
          </div>
          <div className="rounded-lg border border-white/30 bg-white/10 p-4">
            <div className="text-2xl mb-2">🏆</div>
            <h4 className="font-medium mb-2">Live Leaderboard</h4>
            <p className="text-sm text-muted-foreground">
              See how your team ranks against others in real-time
            </p>
          </div>
          <div className="rounded-lg border border-white/30 bg-white/10 p-4">
            <div className="text-2xl mb-2">📈</div>
            <h4 className="font-medium mb-2">Progress Analytics</h4>
            <p className="text-sm text-muted-foreground">
              Track commits, PRs, issues, and documentation progress
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
