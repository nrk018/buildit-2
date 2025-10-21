import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    const missing = [
      !supabaseUrl ? "NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL" : null,
      !supabaseKey ? "SUPABASE_SERVICE_ROLE_KEY" : null,
    ].filter(Boolean).join(", ")
    throw new Error(`Supabase env vars are missing: ${missing}`)
  }
  return createClient(supabaseUrl, supabaseKey)
}

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase()
    
    // Check if repository_name column exists in pending_scores
    const { data: pendingScores, error: pendingError } = await supabase
      .from("pending_scores")
      .select("*")
      .limit(1)
    
    // Check teams table
    const { data: teams, error: teamsError } = await supabase
      .from("teams")
      .select("*")
      .limit(1)
    
    return NextResponse.json({
      pendingScores: pendingScores || [],
      teams: teams || [],
      pendingError: pendingError?.message || null,
      teamsError: teamsError?.message || null,
      message: "Schema check completed"
    })
  } catch (error) {
    console.error("Schema debug error:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error },
      { status: 500 }
    )
  }
}
