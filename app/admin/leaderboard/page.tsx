"use client"

import { useState } from "react"

export default function AdminLeaderboardPage() {
  const [json, setJson] = useState("{\n  \"individuals\": [],\n  \"teams\": [],\n  \"domains\": [],\n  \"lessAI\": []\n}")
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setLoading(true)
    setStatus(null)
    try {
      const parsed = JSON.parse(json)
      const res = await fetch("/api/admin/leaderboard", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": process.env.NEXT_PUBLIC_DUMMY ?? "", 
        },
        body: JSON.stringify(parsed),
      })
      if (!res.ok) {
        const txt = await res.text()
        setStatus(`Error: ${txt}`)
      } else {
        setStatus("Updated successfully")
      }
    } catch (e: any) {
      setStatus(`Invalid JSON: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Admin: Update Leaderboard</h1>
      <p className="text-sm text-muted-foreground mb-4">Paste full JSON with individuals, teams, domains and lessAI. This replaces existing data.</p>
      <textarea
        className="w-full h-[320px] rounded-md border border-border bg-background p-3 font-mono text-sm"
        value={json}
        onChange={(e) => setJson(e.target.value)}
      />
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={submit}
          disabled={loading}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update"}
        </button>
        {status && <span className="text-sm">{status}</span>}
      </div>
      <div className="mt-6 text-sm text-muted-foreground">
        For security, this client cannot send ADMIN_KEY. Call this endpoint from a secure server or use a development proxy. In production, prefer running updates via a server-side script/cron with ADMIN_KEY.
      </div>
    </div>
  )
}


