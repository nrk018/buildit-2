"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter, useParams } from "next/navigation"

interface Team {
  id: number
  team_name: string
  repository_name?: string
  repository_url?: string
  is_active: boolean
  created_at: string
}

interface PendingScore {
  id: number
  team_name: string
  repository_name?: string
  activity_type: string
  points: number
  description: string
  github_url: string
  created_at: string
  status: "pending" | "approved" | "rejected"
}

export default function TeamDetailsPage() {
  const [team, setTeam] = useState<Team | null>(null)
  const [pendingScores, setPendingScores] = useState<PendingScore[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const params = useParams()
  const teamId = params.teamId

  useEffect(() => {
    // Check if admin is already authenticated
    const adminSession = localStorage.getItem("adminSession")
    if (adminSession) {
      const sessionData = JSON.parse(adminSession)
      if (Date.now() < sessionData.expires) {
        setIsAuthenticated(true)
        fetchTeamDetails()
      } else {
        localStorage.removeItem("adminSession")
        router.push("/admin")
      }
    } else {
      router.push("/admin")
    }
  }, [teamId, router])

  const fetchTeamDetails = async () => {
    try {
      // Fetch team details
      const teamResponse = await fetch("/api/admin/teams")
      const teamsData = await teamResponse.json()
      
      if (teamResponse.ok) {
        const currentTeam = teamsData.find((t: Team) => t.id === parseInt(teamId as string))
        if (currentTeam) {
          setTeam(currentTeam)
        } else {
          setError("Team not found")
        }
      }

      // Fetch pending scores for this team
      const scoresResponse = await fetch("/api/admin/pending-scores")
      const scoresData = await scoresResponse.json()
      
      if (scoresResponse.ok) {
        const teamScores = scoresData.filter((score: PendingScore) => 
          score.team_name === currentTeam?.team_name
        )
        setPendingScores(teamScores)
      }
    } catch (err) {
      setError("Connection error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleApproveScore = async (scoreId: number) => {
    try {
      const response = await fetch("/api/admin/approve-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scoreId }),
      })

      if (response.ok) {
        setPendingScores(prev => prev.filter(score => score.id !== scoreId))
      } else {
        const data = await response.json()
        setError(data.error || "Failed to approve score")
      }
    } catch (err) {
      setError("Connection error. Please try again.")
    }
  }

  const handleRejectScore = async (scoreId: number) => {
    try {
      const response = await fetch("/api/admin/reject-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scoreId }),
      })

      if (response.ok) {
        setPendingScores(prev => prev.filter(score => score.id !== scoreId))
      } else {
        const data = await response.json()
        setError(data.error || "Failed to reject score")
      }
    } catch (err) {
      setError("Connection error. Please try again.")
    }
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading team details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect
  }

  if (!team) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <h1 className="text-2xl font-bold mb-2">Team Not Found</h1>
          <p className="text-muted-foreground mb-6">The team you're looking for doesn't exist.</p>
          <a
            href="/admin/teams"
            className="rounded-lg border border-white/30 bg-white/20 backdrop-blur-md px-4 py-2 text-white hover:bg-white/30 transition-colors"
          >
            Back to Teams
          </a>
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
              {team.team_name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-2 text-muted-foreground"
            >
              Team Details & Pending Scores
            </motion.p>
          </div>
          <a
            href="/admin/teams"
            className="rounded-lg border border-white/30 bg-white/10 backdrop-blur-md px-4 py-2 text-white hover:bg-white/20 transition-colors"
          >
            ← Back to Teams
          </a>
        </div>
      </header>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Team Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-8 rounded-xl border border-border/50 bg-card/70 backdrop-blur-md p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Team Information</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Team Name
            </label>
            <p className="text-lg font-medium">{team.team_name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Status
            </label>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              team.is_active 
                ? "bg-green-500/20 text-green-400" 
                : "bg-red-500/20 text-red-400"
            }`}>
              {team.is_active ? "Active" : "Inactive"}
            </span>
          </div>
          {team.repository_name && (
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Repository
              </label>
              <p className="text-lg font-medium">{team.repository_name}</p>
              {team.repository_url && (
                <a 
                  href={team.repository_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:underline"
                >
                  View Repository →
                </a>
              )}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Created
            </label>
            <p className="text-lg font-medium">
              {new Date(team.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Pending Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="rounded-xl border border-border/50 bg-card/70 backdrop-blur-md p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            Pending Scores ({pendingScores.length})
          </h2>
          <button
            onClick={fetchTeamDetails}
            className="rounded-lg border border-white/30 bg-white/10 backdrop-blur-md px-4 py-2 text-white hover:bg-white/20 transition-colors"
          >
            Refresh
          </button>
        </div>

        {pendingScores.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">✅</div>
            <p className="text-muted-foreground">No pending scores for this team</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingScores.map((score, index) => (
              <motion.div
                key={score.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="rounded-lg border border-border/30 bg-white/5 p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
                        {score.activity_type}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                        +{score.points} points
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(score.created_at).toLocaleString()}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{score.description}</p>
                    
                    {score.github_url && (
                      <a
                        href={score.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        View on GitHub
                      </a>
                    )}
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleApproveScore(score.id)}
                      className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectScore(score.id)}
                      className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
