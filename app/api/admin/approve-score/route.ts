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
    console.log(`Updating leaderboard for team: ${pendingScore.team_name} with score: ${newScore}`)
    
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
      console.error("Leaderboard error details:", {
        code: leaderboardError.code,
        message: leaderboardError.message,
        details: leaderboardError.details,
        hint: leaderboardError.hint
      })
      return NextResponse.json(
        { 
          error: "Failed to update leaderboard",
          details: leaderboardError.message,
          code: leaderboardError.code
        },
        { status: 500 }
      )
    }

    // Update ranks for all teams after score change
    try {
      const { error: rankError } = await supabase.rpc('update_team_ranks')
      if (rankError) {
        console.error("Error updating ranks:", rankError)
        // Try manual rank update if function doesn't exist
        await updateRanksManually(supabase)
      }
    } catch (err) {
      console.error("RPC function not available, using manual rank update")
      await updateRanksManually(supabase)
    }

    // Update team activities count
    try {
      const { data: existingActivity, error: fetchActivityError } = await supabase
        .from("team_activities")
        .select("count")
        .eq("team_name", pendingScore.team_name)
        .eq("activity_type", pendingScore.activity_type)
        .eq("repository_name", pendingScore.repository_name || "")

      const newCount = (existingActivity?.[0]?.count || 0) + 1

      const { error: activityError } = await supabase
        .from("team_activities")
        .upsert({
          team_name: pendingScore.team_name,
          repository_name: pendingScore.repository_name || "",
          activity_type: pendingScore.activity_type,
          count: newCount,
          last_updated: new Date().toISOString()
        }, {
          onConflict: "team_name,activity_type,repository_name",
          ignoreDuplicates: false
        })

      if (activityError) {
        console.error("Error updating team activities:", activityError)
        // Don't fail the request, just log the error
      }
    } catch (err) {
      console.error("Team activities update failed:", err)
      // Don't fail the request, just log the error
    }

    // Create weekly score entry
    try {
      const now = new Date()
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay())) // Start of current week
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekEnd.getDate() + 6) // End of current week

      const { error: weeklyError } = await supabase.rpc('create_weekly_score', {
        p_team_name: pendingScore.team_name,
        p_repository_name: pendingScore.repository_name,
        p_week_start: weekStart.toISOString().split('T')[0],
        p_week_end: weekEnd.toISOString().split('T')[0],
        p_points: pendingScore.points,
        p_activities: 1
      })

      if (weeklyError) {
        console.error("Error creating weekly score:", weeklyError)
        // Try manual weekly score creation if function doesn't exist
        await createWeeklyScoreManually(supabase, pendingScore)
      }
    } catch (err) {
      console.error("Weekly score RPC function not available, using manual creation")
      await createWeeklyScoreManually(supabase, pendingScore)
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

// Helper function to manually update ranks
async function updateRanksManually(supabase: any) {
  try {
    // Get all teams ordered by points
    const { data: teams, error } = await supabase
      .from("leaderboard_teams")
      .select("teamName, points")
      .order("points", { ascending: false })

    if (error) {
      console.error("Error fetching teams for rank update:", error)
      return
    }

    // Update ranks
    for (let i = 0; i < teams.length; i++) {
      const { error: updateError } = await supabase
        .from("leaderboard_teams")
        .update({ rank: i + 1 })
        .eq("teamName", teams[i].teamName)

      if (updateError) {
        console.error(`Error updating rank for ${teams[i].teamName}:`, updateError)
      }
    }
  } catch (err) {
    console.error("Manual rank update failed:", err)
  }
}

// Helper function to manually create weekly score
async function createWeeklyScoreManually(supabase: any, pendingScore: any) {
  try {
    const now = new Date()
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()))
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 6)

    // Check if weekly_scores table exists, if not skip
    const { error: insertError } = await supabase
      .from("weekly_scores")
      .upsert({
        team_name: pendingScore.team_name,
        repository_name: pendingScore.repository_name,
        week_start: weekStart.toISOString().split('T')[0],
        week_end: weekEnd.toISOString().split('T')[0],
        points: pendingScore.points,
        activities: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, {
        onConflict: "team_name,repository_name,week_start",
        ignoreDuplicates: false
      })

    if (insertError) {
      console.error("Error creating weekly score manually:", insertError)
    }
  } catch (err) {
    console.error("Manual weekly score creation failed:", err)
  }
}
