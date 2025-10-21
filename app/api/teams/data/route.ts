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
    const { searchParams } = new URL(request.url)
    const teamName = searchParams.get("team")

    if (!teamName) {
      return NextResponse.json(
        { error: "Team name is required" },
        { status: 400 }
      )
    }

    // Get team's current score and rank from leaderboard_teams table
    const supabase = getSupabase()
    const { data: teamScore, error: scoreError } = await supabase
      .from("leaderboard_teams")
      .select("points, rank")
      .eq("teamName", teamName)
      .single()

    if (scoreError && scoreError.code !== "PGRST116") {
      console.error("Error fetching team score:", scoreError)
      return NextResponse.json(
        { error: "Failed to fetch team score" },
        { status: 500 }
      )
    }

    // Get detailed activity breakdown
    const { data: activities, error: activitiesError } = await supabase
      .from("team_activities")
      .select("activity_type, count")
      .eq("team_name", teamName)

    if (activitiesError) {
      console.error("Activities error:", activitiesError)
    }

    // Process activity data
    const activityBreakdown = {
      commits: 0,
      pullRequests: 0,
      issues: 0,
      documentation: 0,
    }

    activities?.forEach((activity) => {
      switch (activity.activity_type) {
        case "commit":
          activityBreakdown.commits = activity.count
          break
        case "pull_request":
          activityBreakdown.pullRequests = activity.count
          break
        case "issue":
          activityBreakdown.issues = activity.count
          break
        case "documentation":
          activityBreakdown.documentation = activity.count
          break
      }
    })

    return NextResponse.json({
      teamName,
      score: teamScore?.points || 0,
      rank: teamScore?.rank || 0,
      lastActivity: new Date().toISOString(), // You can add last_activity column later
      ...activityBreakdown,
    })
  } catch (error) {
    console.error("Data fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
