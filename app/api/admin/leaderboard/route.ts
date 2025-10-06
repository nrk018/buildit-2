import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

export async function PUT(req: Request) {
  const key = req.headers.get("x-admin-key")
  if (!key || key !== process.env.ADMIN_KEY) {
    return new NextResponse("Unauthorized", { status: 401 })
  }
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return new NextResponse("Supabase admin not configured", { status: 500 })
  }

  const body = await req.json()
  const { individuals = [], teams = [], domains = [], lessAI = [] } = body || {}

  // Use a transaction-like sequence. Supabase JS doesn't provide tx in REST; do sequential clears then inserts
  const tables: Array<{ name: string; rows: any[] }> = [
    { name: "leaderboard_individuals", rows: individuals },
    { name: "leaderboard_teams", rows: teams },
    { name: "leaderboard_domains", rows: domains },
    { name: "leaderboard_less_ai", rows: lessAI },
  ]

  // Clear
  for (const t of tables) {
    const { error } = await supabase.from(t.name).delete().neq("id", -1)
    if (error) return NextResponse.json({ ok: false, step: `clear ${t.name}`, error: error.message }, { status: 500 })
  }

  // Insert
  for (const t of tables) {
    if (t.rows.length === 0) continue
    const { error } = await supabase.from(t.name).insert(t.rows)
    if (error) return NextResponse.json({ ok: false, step: `insert ${t.name}`, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}


