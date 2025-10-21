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
    const supabase = getSupabase()
    
    // Create the team_dashboard table if it doesn't exist
    const { error: createError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS team_dashboard (
          id SERIAL PRIMARY KEY,
          team_name TEXT NOT NULL,
          repository_name TEXT,
          score INTEGER DEFAULT 0,
          rank INTEGER DEFAULT 0,
          last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })
    
    if (createError) {
      console.error("Error creating team_dashboard table:", createError)
      return NextResponse.json({
        success: false,
        error: "Failed to create team_dashboard table",
        details: createError.message
      })
    }
    
    // Create indexes for better performance
    const { error: indexError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE INDEX IF NOT EXISTS idx_team_dashboard_team ON team_dashboard(team_name);
        CREATE INDEX IF NOT EXISTS idx_team_dashboard_repo ON team_dashboard(repository_name);
        CREATE INDEX IF NOT EXISTS idx_team_dashboard_rank ON team_dashboard(rank);
      `
    })
    
    if (indexError) {
      console.error("Error creating indexes:", indexError)
      // Don't fail the request, just log the error
    }
    
    return NextResponse.json({
      success: true,
      message: "team_dashboard table created successfully",
      note: "This should resolve the realtime error. You can now disable realtime for this table in Supabase dashboard if needed."
    })
    
  } catch (error) {
    console.error("Fix realtime error:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error },
      { status: 500 }
    )
  }
}
