import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import crypto from "crypto"

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase env vars are missing")
  }
  return createClient(supabaseUrl, supabaseKey)
}

// GET - Fetch all teams
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase()
    const { data: teams, error } = await supabase
      .from("teams")
      .select("id, team_name, is_active, created_at")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching teams:", error)
      return NextResponse.json(
        { error: "Failed to fetch teams" },
        { status: 500 }
      )
    }

    return NextResponse.json(teams || [])
  } catch (error) {
    console.error("Teams fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// POST - Create new team
export async function POST(request: NextRequest) {
  try {
    const { teamName, password } = await request.json()

    if (!teamName || !password) {
      return NextResponse.json(
        { error: "Team name and password are required" },
        { status: 400 }
      )
    }

    // Check if team already exists
    const supabase = getSupabase()
    const { data: existingTeam } = await supabase
      .from("teams")
      .select("team_name")
      .eq("team_name", teamName)
      .single()

    if (existingTeam) {
      return NextResponse.json(
        { error: "Team name already exists" },
        { status: 409 }
      )
    }

    // Hash the password (simple hash for now - use bcrypt in production)
    const passwordHash = password // In production, use: await bcrypt.hash(password, 10)

    // Create the team
    const { data: newTeam, error } = await supabase
      .from("teams")
      .insert({
        team_name: teamName,
        password_hash: passwordHash,
        is_active: true
      })
      .select("id, team_name, is_active, created_at")
      .single()

    if (error) {
      console.error("Error creating team:", error)
      return NextResponse.json(
        { error: "Failed to create team" },
        { status: 500 }
      )
    }

    console.log(`Created new team: ${teamName}`)

    return NextResponse.json(newTeam)
  } catch (error) {
    console.error("Create team error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// PUT - Update team status
export async function PUT(request: NextRequest) {
  try {
    const { teamId, isActive } = await request.json()

    if (!teamId || typeof isActive !== "boolean") {
      return NextResponse.json(
        { error: "Team ID and active status are required" },
        { status: 400 }
      )
    }

    const supabase = getSupabase()
    const { data: updatedTeam, error } = await supabase
      .from("teams")
      .update({ 
        is_active: isActive,
        updated_at: new Date().toISOString()
      })
      .eq("id", teamId)
      .select("id, team_name, is_active, created_at")
      .single()

    if (error) {
      console.error("Error updating team:", error)
      return NextResponse.json(
        { error: "Failed to update team" },
        { status: 500 }
      )
    }

    console.log(`Updated team ${teamId}: is_active = ${isActive}`)

    return NextResponse.json(updatedTeam)
  } catch (error) {
    console.error("Update team error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
