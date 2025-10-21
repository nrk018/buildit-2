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

export async function POST(request: NextRequest) {
  try {
    const { repositoryName, eventType = "push" } = await request.json()
    
    if (!repositoryName) {
      return NextResponse.json(
        { error: "Repository name is required" },
        { status: 400 }
      )
    }

    const supabase = getSupabase()
    
    // Check what teams exist
    const { data: allTeams, error: allTeamsError } = await supabase
      .from("teams")
      .select("team_name, repository_name")
    
    console.log("All teams in database:", allTeams)
    
    // Check if team exists for this repository
    const { data: team, error: teamError } = await supabase
      .from("teams")
      .select("team_name, repository_name")
      .eq("repository_name", repositoryName)
      .single()

    if (teamError || !team) {
      return NextResponse.json({
        success: false,
        message: `No team found for repository: ${repositoryName}`,
        allTeams: allTeams,
        error: teamError?.message
      })
    }

    // Create a test pending score
    const { error: insertError } = await supabase
      .from("pending_scores")
      .insert({
        team_name: team.team_name,
        repository_name: team.repository_name,
        activity_type: "test",
        points: 5,
        description: `Test ${eventType} event for ${repositoryName}`,
        github_url: `https://github.com/test/${repositoryName}`,
        status: "pending",
        created_at: new Date().toISOString()
      })

    if (insertError) {
      return NextResponse.json({
        success: false,
        message: "Failed to create test pending score",
        error: insertError.message
      })
    }

    return NextResponse.json({
      success: true,
      message: `Created test pending score for team: ${team.team_name}`,
      team: team
    })

  } catch (error) {
    console.error("Test webhook error:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error },
      { status: 500 }
    )
  }
}
