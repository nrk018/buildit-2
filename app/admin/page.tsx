"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check if admin is already authenticated
    const adminSession = localStorage.getItem("adminSession")
    if (adminSession) {
      const sessionData = JSON.parse(adminSession)
      if (Date.now() < sessionData.expires) {
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem("adminSession")
      }
    }
    setIsLoading(false)
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
      } else {
        setError(data.error || "Invalid admin password")
      }
    } catch (err) {
      setError("Connection error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminSession")
    setIsAuthenticated(false)
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

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
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
              Admin Dashboard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-2 text-muted-foreground"
            >
              Manage BuildIt platform and teams
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.a
          href="/admin/teams"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="rounded-xl border border-border/50 bg-card/70 backdrop-blur-md p-6 hover:bg-card/80 transition-colors group"
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">👥</div>
          <h3 className="text-xl font-semibold mb-2">Manage Teams</h3>
          <p className="text-muted-foreground">Create teams, assign repositories, and manage team accounts</p>
        </motion.a>

        <motion.a
          href="/admin/pending-scores"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="rounded-xl border border-border/50 bg-card/70 backdrop-blur-md p-6 hover:bg-card/80 transition-colors group"
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">⏳</div>
          <h3 className="text-xl font-semibold mb-2">Pending Scores</h3>
          <p className="text-muted-foreground">Review and approve team activities and contributions</p>
        </motion.a>

            <motion.a
              href="/admin/leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="rounded-xl border border-border/50 bg-card/70 backdrop-blur-md p-6 hover:bg-card/80 transition-colors group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🏆</div>
              <h3 className="text-xl font-semibold mb-2">Leaderboard</h3>
              <p className="text-muted-foreground">View team rankings, scores, and performance metrics</p>
            </motion.a>

            <motion.a
              href="/admin/test-webhook"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="rounded-xl border border-border/50 bg-card/70 backdrop-blur-md p-6 hover:bg-card/80 transition-colors group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🔧</div>
              <h3 className="text-xl font-semibold mb-2">Test Webhook</h3>
              <p className="text-muted-foreground">Debug webhook integration and repository events</p>
            </motion.a>

            <motion.a
              href="/admin/fix-realtime"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="rounded-xl border border-border/50 bg-card/70 backdrop-blur-md p-6 hover:bg-card/80 transition-colors group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🔧</div>
              <h3 className="text-xl font-semibold mb-2">Fix Realtime</h3>
              <p className="text-muted-foreground">Fix Supabase realtime errors and database issues</p>
            </motion.a>

            <motion.a
              href="/admin/debug-leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="rounded-xl border border-border/50 bg-card/70 backdrop-blur-md p-6 hover:bg-card/80 transition-colors group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🏆</div>
              <h3 className="text-xl font-semibold mb-2">Debug Leaderboard</h3>
              <p className="text-muted-foreground">Fix leaderboard table and approve score issues</p>
            </motion.a>
      </div>
    </div>
  )
}
