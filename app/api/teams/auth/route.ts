import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import crypto from "crypto"

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
    const { teamName, password } = await request.json()

    if (!teamName || !password) {
      return NextResponse.json(
        { error: "Team name and password are required" },
        { status: 400 }
      )
    }

    // Query the teams table to verify credentials
    const supabase = getSupabase()
    const { data: team, error } = await supabase
      .from("teams")
      .select("team_name, password_hash, is_active")
      .eq("team_name", teamName)
      .single()

    if (error || !team) {
      return NextResponse.json(
        { error: "Invalid team credentials" },
        { status: 401 }
      )
    }

    if (!team.is_active) {
      return NextResponse.json(
        { error: "Team account is inactive" },
        { status: 403 }
      )
    }

    // Verify password (assuming you're using bcrypt or similar)
    // For now, we'll do a simple comparison - you should hash passwords properly
    const isValidPassword = await verifyPassword(password, team.password_hash)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid team credentials" },
        { status: 401 }
      )
    }

    // Generate a simple token for session management
    const token = crypto.randomBytes(32).toString("hex")

    return NextResponse.json({
      success: true,
      teamName: team.team_name,
      token,
    })
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Simple password verification - replace with proper bcrypt in production
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // This is a placeholder - you should use bcrypt.compare() in production
  // For now, we'll assume the password is stored as plain text (NOT RECOMMENDED)
  return password === hash
}
