import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase env vars are missing")
  }
  return createClient(supabaseUrl, supabaseKey)
}

export async function POST(request: NextRequest) {
  try {
    const { scoreId } = await request.json()

    if (!scoreId) {
      return NextResponse.json(
        { error: "Score ID is required" },
        { status: 400 }
      )
    }

    // Get the pending score details
    const supabase = getSupabase()
    const { data: pendingScore, error: fetchError } = await supabase
      .from("pending_scores")
      .select("*")
      .eq("id", scoreId)
      .eq("status", "pending")
      .single()

    if (fetchError || !pendingScore) {
      return NextResponse.json(
        { error: "Pending score not found" },
        { status: 404 }
      )
    }

    // Get current team score from leaderboard_teams table
    const { data: currentScore, error: currentError } = await supabase
      .from("leaderboard_teams")
      .select("points")
      .eq("teamName", pendingScore.team_name)
      .single()

    if (currentError && currentError.code !== "PGRST116") {
      console.error("Error fetching current score:", currentError)
      return NextResponse.json(
        { error: "Failed to fetch current team score" },
        { status: 500 }
      )
    }

    const newScore = (currentScore?.points || 0) + pendingScore.points

    // Update leaderboard_teams with new score
    const { error: leaderboardError } = await supabase
      .from("leaderboard_teams")
      .upsert({
        teamName: pendingScore.team_name,
        points: newScore,
        domain: "General", // Default domain, can be updated later
        project: "Active Project" // Default project, can be updated later
      })

    if (leaderboardError) {
      console.error("Error updating leaderboard:", leaderboardError)
      return NextResponse.json(
        { error: "Failed to update leaderboard" },
        { status: 500 }
      )
    }

    // Update team activities count
    const { error: activityError } = await supabase
      .from("team_activities")
      .upsert({
        team_name: pendingScore.team_name,
        activity_type: pendingScore.activity_type,
        count: 1,
        last_updated: new Date().toISOString()
      }, {
        onConflict: "team_name,activity_type",
        ignoreDuplicates: false
      })

    if (activityError) {
      console.error("Error updating team activities:", activityError)
      // Don't fail the request, just log the error
    }

    // Mark pending score as approved
    const { error: updateError } = await supabase
      .from("pending_scores")
      .update({ 
        status: "approved",
        approved_at: new Date().toISOString()
      })
      .eq("id", scoreId)

    if (updateError) {
      console.error("Error updating pending score:", updateError)
      return NextResponse.json(
        { error: "Failed to update pending score status" },
        { status: 500 }
      )
    }

    console.log(`Approved score for ${pendingScore.team_name}: +${pendingScore.points} points`)

    return NextResponse.json({
      success: true,
      message: `Approved ${pendingScore.points} points for ${pendingScore.team_name}`
    })
  } catch (error) {
    console.error("Approve score error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
