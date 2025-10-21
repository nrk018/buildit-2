"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function TestWebhookPage() {
  const [repositoryName, setRepositoryName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")

  const testWebhook = async () => {
    if (!repositoryName.trim()) {
      setError("Please enter a repository name")
      return
    }

    setIsLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch("/api/test/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          repositoryName: repositoryName.trim(),
          eventType: "push"
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        setResult(data)
      } else {
        setError(data.error || "Test failed")
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
        <h1 className="text-2xl font-bold mb-6">Test Webhook Integration</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Repository Name
            </label>
            <input
              type="text"
              value={repositoryName}
              onChange={(e) => setRepositoryName(e.target.value)}
              placeholder="Enter repository name (e.g., my-repo)"
              className="w-full rounded-lg border border-white/30 bg-white/10 backdrop-blur-md px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

          <button
            onClick={testWebhook}
            disabled={isLoading}
            className="w-full rounded-lg border border-white/30 bg-white/20 backdrop-blur-md px-4 py-3 text-white font-medium hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Testing..." : "Test Webhook"}
          </button>

          {error && (
            <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-red-400">
              {error}
            </div>
          )}

          {result && (
            <div className="rounded-lg border border-green-500/50 bg-green-500/10 p-4">
              <h3 className="font-semibold text-green-400 mb-2">Test Result:</h3>
              <pre className="text-sm text-green-300 whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/50 rounded-lg">
          <h3 className="font-semibold text-blue-400 mb-2">Instructions:</h3>
          <ol className="text-sm text-blue-300 space-y-1">
            <li>1. Enter the repository name that should be assigned to a team</li>
            <li>2. Click "Test Webhook" to create a test pending score</li>
            <li>3. Check if the team is found in the database</li>
            <li>4. If successful, go to the team's pending scores to approve it</li>
          </ol>
        </div>

        <div className="mt-6">
          <a
            href="/admin/teams"
            className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors"
          >
            ← Back to Manage Teams
          </a>
        </div>
      </motion.div>
    </div>
  )
}
