"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function DebugLeaderboardPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")

  const checkLeaderboard = async () => {
    setIsLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch("/api/debug/leaderboard")
      const data = await response.json()
      
      if (response.ok) {
        setResult(data)
      } else {
        setError(data.error || "Failed to check leaderboard")
      }
    } catch (err) {
      setError("Connection error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const fixLeaderboard = async () => {
    setIsLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch("/api/fix-leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      })

      const data = await response.json()
      
      if (response.ok) {
        setResult(data)
      } else {
        setError(data.error || "Fix failed")
      }
    } catch (err) {
      setError("Connection error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-xl border border-border/50 bg-card/70 backdrop-blur-md p-8"
      >
        <h1 className="text-2xl font-bold mb-6">Debug Leaderboard Issues</h1>
        
        <div className="space-y-6">
          <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
            <h3 className="font-semibold text-red-400 mb-2">Error:</h3>
            <p className="text-red-300 text-sm">
              "Failed to update leaderboard" when approving pending scores
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={checkLeaderboard}
              disabled={isLoading}
              className="w-full rounded-lg border border-blue-500/30 bg-blue-500/10 backdrop-blur-md px-4 py-3 text-blue-400 font-medium hover:bg-blue-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Checking..." : "Check Leaderboard Table"}
            </button>

            <button
              onClick={fixLeaderboard}
              disabled={isLoading}
              className="w-full rounded-lg border border-green-500/30 bg-green-500/10 backdrop-blur-md px-4 py-3 text-green-400 font-medium hover:bg-green-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Fixing..." : "Fix Leaderboard Table"}
            </button>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-red-400">
              {error}
            </div>
          )}

          {result && (
            <div className="rounded-lg border border-green-500/50 bg-green-500/10 p-4">
              <h3 className="font-semibold text-green-400 mb-2">Result:</h3>
              <pre className="text-sm text-green-300 whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
          <h3 className="font-semibold text-yellow-400 mb-2">What this does:</h3>
          <ol className="text-sm text-yellow-300 space-y-1">
            <li>1. Creates the missing `leaderboard_teams` table</li>
            <li>2. Adds proper columns: teamName, points, domain, project, rank</li>
            <li>3. Creates indexes for better performance</li>
            <li>4. Creates the `update_team_ranks()` function</li>
            <li>5. Tests the table with a sample insert</li>
          </ol>
        </div>

        <div className="mt-6">
          <a
            href="/admin"
            className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors"
          >
            ← Back to Admin Dashboard
          </a>
        </div>
      </motion.div>
    </div>
  )
}
