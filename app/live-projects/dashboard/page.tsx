"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface TeamData {
  teamName: string
  score: number
  rank: number
  lastActivity: string
  commits: number
  pullRequests: number
  issues: number
  documentation: number
}

function TeamDashboardContent() {
  const [teamData, setTeamData] = useState<TeamData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const searchParams = useSearchParams()
  const router = useRouter()
  const teamName = searchParams.get("team")

  useEffect(() => {
    // Check if user is authenticated
    const session = localStorage.getItem("teamSession")
    if (!session) {
      router.push("/live-projects")
      return
    }

    const sessionData = JSON.parse(session)
    if (Date.now() > sessionData.expires) {
      localStorage.removeItem("teamSession")
      router.push("/live-projects")
      return
    }

    if (teamName) {
      fetchTeamData(teamName)
    }
  }, [teamName, router])

  const fetchTeamData = async (team: string) => {
    try {
      const response = await fetch(`/api/teams/data?team=${encodeURIComponent(team)}`)
      const data = await response.json()

      if (response.ok) {
        setTeamData(data)
      } else {
        setError(data.error || "Failed to load team data")
      }
    } catch (err) {
      setError("Connection error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("teamSession")
    router.push("/live-projects")
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading team data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-center">
          <div className="text-red-400 mb-4">{error}</div>
          <button
            onClick={() => router.push("/live-projects")}
            className="rounded-lg border border-white/30 bg-white/20 backdrop-blur-md px-4 py-2 text-white hover:bg-white/30 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold"
            >
              {teamData?.teamName}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-2 text-muted-foreground"
            >
              Team Dashboard
            </motion.p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-white/30 bg-white/10 backdrop-blur-md px-4 py-2 text-white hover:bg-white/20 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="rounded-xl border border-border/50 bg-card/70 backdrop-blur-md p-6"
        >
          <div className="text-2xl font-bold text-white">{teamData?.score || 0}</div>
          <div className="text-sm text-muted-foreground">Total Score</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="rounded-xl border border-border/50 bg-card/70 backdrop-blur-md p-6"
        >
          <div className="text-2xl font-bold text-white">#{teamData?.rank || 0}</div>
          <div className="text-sm text-muted-foreground">Team Rank</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="rounded-xl border border-border/50 bg-card/70 backdrop-blur-md p-6"
        >
          <div className="text-2xl font-bold text-white">{teamData?.commits || 0}</div>
          <div className="text-sm text-muted-foreground">Commits</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="rounded-xl border border-border/50 bg-card/70 backdrop-blur-md p-6"
        >
          <div className="text-2xl font-bold text-white">{teamData?.pullRequests || 0}</div>
          <div className="text-sm text-muted-foreground">Pull Requests</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="rounded-xl border border-border/50 bg-card/70 backdrop-blur-md p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Activity Breakdown</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Issues Closed</span>
              <span className="font-semibold">{teamData?.issues || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Documentation Updates</span>
              <span className="font-semibold">{teamData?.documentation || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Last Activity</span>
              <span className="font-semibold">
                {teamData?.lastActivity ? new Date(teamData.lastActivity).toLocaleDateString() : "Never"}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="rounded-xl border border-border/50 bg-card/70 backdrop-blur-md p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <a
              href="/leaderboard"
              className="block w-full rounded-lg border border-white/30 bg-white/10 backdrop-blur-md px-4 py-3 text-center text-white hover:bg-white/20 transition-colors"
            >
              View Full Leaderboard
            </a>
            <a
              href="/build-cycle"
              className="block w-full rounded-lg border border-white/30 bg-white/10 backdrop-blur-md px-4 py-3 text-center text-white hover:bg-white/20 transition-colors"
            >
              Build Cycle Guidelines
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function TeamDashboard() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <TeamDashboardContent />
    </Suspense>
  )
}
