"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface Team {
  id: number
  team_name: string
  is_active: boolean
  created_at: string
}

export default function AdminTeamsPage() {
  const [teams, setTeams] = useState<Team[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTeam, setNewTeam] = useState({ teamName: "", password: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if admin is already authenticated
    const adminSession = localStorage.getItem("adminSession")
    if (adminSession) {
      const sessionData = JSON.parse(adminSession)
      if (Date.now() < sessionData.expires) {
        setIsAuthenticated(true)
        fetchTeams()
      } else {
        localStorage.removeItem("adminSession")
      }
    } else {
      setIsLoading(false)
    }
  }, [])

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: adminPassword }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("adminSession", JSON.stringify({
          token: data.token,
          expires: Date.now() + 2 * 60 * 60 * 1000 // 2 hours
        }))
        setIsAuthenticated(true)
        fetchTeams()
      } else {
        setError(data.error || "Invalid admin password")
      }
    } catch (err) {
      setError("Connection error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchTeams = async () => {
    try {
      const response = await fetch("/api/admin/teams")
      const data = await response.json()

      if (response.ok) {
        setTeams(data)
      } else {
        setError(data.error || "Failed to load teams")
      }
    } catch (err) {
      setError("Connection error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTeam = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/admin/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamName: newTeam.teamName,
          password: newTeam.password
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setTeams(prev => [...prev, data])
        setNewTeam({ teamName: "", password: "" })
        setShowAddForm(false)
        setError("")
      } else {
        setError(data.error || "Failed to create team")
      }
    } catch (err) {
      setError("Connection error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggleTeamStatus = async (teamId: number, currentStatus: boolean) => {
    try {
      const response = await fetch("/api/admin/teams", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamId,
          isActive: !currentStatus
        }),
      })

      if (response.ok) {
        setTeams(prev => prev.map(team => 
          team.id === teamId ? { ...team, is_active: !currentStatus } : team
        ))
      } else {
        const data = await response.json()
        setError(data.error || "Failed to update team status")
      }
    } catch (err) {
      setError("Connection error. Please try again.")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminSession")
    setIsAuthenticated(false)
    setTeams([])
  }

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-md px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-xl border border-border/50 bg-card/70 backdrop-blur-md p-8"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label htmlFor="adminPassword" className="block text-sm font-medium mb-2">
                Admin Password
              </label>
              <input
                id="adminPassword"
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin password"
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
              {isLoading ? "Authenticating..." : "Login as Admin"}
            </button>
          </form>
        </motion.div>
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
              Team Management
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-2 text-muted-foreground"
            >
              Create and manage team credentials
            </motion.p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="rounded-lg border border-white/30 bg-white/20 backdrop-blur-md px-4 py-2 text-white hover:bg-white/30 transition-colors"
            >
              {showAddForm ? "Cancel" : "Add Team"}
            </button>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-white/30 bg-white/10 backdrop-blur-md px-4 py-2 text-white hover:bg-white/20 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Add Team Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 rounded-xl border border-border/50 bg-card/70 backdrop-blur-md p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Add New Team</h2>
          <form onSubmit={handleAddTeam} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="teamName" className="block text-sm font-medium mb-2">
                  Team Name
                </label>
                <input
                  id="teamName"
                  type="text"
                  value={newTeam.teamName}
                  onChange={(e) => setNewTeam(prev => ({ ...prev, teamName: e.target.value }))}
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
                  type="text"
                  value={newTeam.password}
                  onChange={(e) => setNewTeam(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="e.g., password123"
                  className="w-full rounded-lg border border-white/30 bg-white/10 backdrop-blur-md px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg border border-white/30 bg-white/20 backdrop-blur-md px-4 py-3 text-white font-medium hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating..." : "Create Team"}
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="rounded-lg border border-white/30 bg-white/10 backdrop-blur-md px-4 py-3 text-white hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Teams List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Teams ({teams.length})
          </h2>
          <button
            onClick={fetchTeams}
            className="rounded-lg border border-white/30 bg-white/10 backdrop-blur-md px-4 py-2 text-white hover:bg-white/20 transition-colors"
          >
            Refresh
          </button>
        </div>

        {teams.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-4xl mb-4">👥</div>
            <p className="text-muted-foreground">No teams found</p>
            <p className="text-sm text-muted-foreground mt-2">Create your first team above</p>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {teams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="rounded-xl border border-border/50 bg-card/70 backdrop-blur-md p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="font-semibold text-lg">{team.team_name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        team.is_active 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-red-500/20 text-red-400"
                      }`}>
                        {team.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Created: {new Date(team.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleToggleTeamStatus(team.id, team.is_active)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        team.is_active
                          ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                      }`}
                    >
                      {team.is_active ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-12 flex gap-4">
        <a
          href="/admin"
          className="rounded-lg border border-white/30 bg-white/10 backdrop-blur-md px-4 py-2 text-white hover:bg-white/20 transition-colors"
        >
          ← Back to Admin Dashboard
        </a>
        <a
          href="/admin/pending-scores"
          className="rounded-lg border border-white/30 bg-white/10 backdrop-blur-md px-4 py-2 text-white hover:bg-white/20 transition-colors"
        >
          View Pending Scores →
        </a>
      </div>
    </div>
  )
}
