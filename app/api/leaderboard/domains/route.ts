import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { createClient } from "@supabase/supabase-js"

const DATA_PATH = path.join(process.cwd(), "data", "leaderboard.json")

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (url && key) {
    try {
      const supabase = createClient(url, key)
      const { data, error } = await supabase.from("leaderboard_domains").select("rank,domain,totalPoints").order("rank", { ascending: true })
      if (error) throw error
      return NextResponse.json({ data: data || [] })
    } catch (e) {}
  }
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8")
    const json = JSON.parse(raw)
    return NextResponse.json({ data: json.domains || [] })
  } catch {
    return NextResponse.json({ data: [] })
  }
}

// removed duplicate mock handler
