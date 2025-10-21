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
    
    // Add repository_name column to pending_scores if it doesn't exist
    const { error: pendingError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE pending_scores ADD COLUMN IF NOT EXISTS repository_name TEXT;'
    })
    
    // Add repository_name column to team_activities if it doesn't exist
    const { error: activitiesError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE team_activities ADD COLUMN IF NOT EXISTS repository_name TEXT;'
    })
    
    // Create weekly_scores table if it doesn't exist
    const { error: weeklyError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS weekly_scores (
          id SERIAL PRIMARY KEY,
          team_name TEXT NOT NULL,
          repository_name TEXT NOT NULL,
          week_start DATE NOT NULL,
          week_end DATE NOT NULL,
          points INTEGER DEFAULT 0,
          activities INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          UNIQUE(team_name, repository_name, week_start)
        );
      `
    })
    
    // Create indexes
    const { error: indexError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE INDEX IF NOT EXISTS idx_weekly_scores_team ON weekly_scores(team_name);
        CREATE INDEX IF NOT EXISTS idx_weekly_scores_repo ON weekly_scores(repository_name);
        CREATE INDEX IF NOT EXISTS idx_weekly_scores_week ON weekly_scores(week_start);
        CREATE INDEX IF NOT EXISTS idx_team_activities_repo ON team_activities(repository_name);
        CREATE INDEX IF NOT EXISTS idx_pending_scores_repo ON pending_scores(repository_name);
      `
    })
    
    return NextResponse.json({
      success: true,
      message: "Database schema updated successfully",
      errors: {
        pending: pendingError?.message || null,
        activities: activitiesError?.message || null,
        weekly: weeklyError?.message || null,
        indexes: indexError?.message || null
      }
    })
  } catch (error) {
    console.error("Database setup error:", error)
    return NextResponse.json(
      { error: "Failed to setup database", details: error },
      { status: 500 }
    )
  }
}
