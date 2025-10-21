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
    
    // Create leaderboard_teams table if it doesn't exist
    const { error: createError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS leaderboard_teams (
          id SERIAL PRIMARY KEY,
          "teamName" TEXT NOT NULL UNIQUE,
          points INTEGER DEFAULT 0,
          domain TEXT DEFAULT 'General',
          project TEXT DEFAULT 'Active Project',
          rank INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })
    
    if (createError) {
      console.error("Error creating leaderboard_teams table:", createError)
      return NextResponse.json({
        success: false,
        error: "Failed to create leaderboard_teams table",
        details: createError.message
      })
    }
    
    // Create indexes for better performance
    const { error: indexError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE INDEX IF NOT EXISTS idx_leaderboard_teams_team ON leaderboard_teams("teamName");
        CREATE INDEX IF NOT EXISTS idx_leaderboard_teams_points ON leaderboard_teams(points);
        CREATE INDEX IF NOT EXISTS idx_leaderboard_teams_rank ON leaderboard_teams(rank);
      `
    })
    
    if (indexError) {
      console.error("Error creating indexes:", indexError)
      // Don't fail the request, just log the error
    }
    
    // Create the update_team_ranks function if it doesn't exist
    const { error: functionError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE OR REPLACE FUNCTION update_team_ranks()
        RETURNS void AS $$
        BEGIN
          UPDATE leaderboard_teams 
          SET rank = ranked.rank
          FROM (
            SELECT "teamName", 
                   ROW_NUMBER() OVER (ORDER BY points DESC) as rank
            FROM leaderboard_teams
          ) ranked
          WHERE leaderboard_teams."teamName" = ranked."teamName";
        END;
        $$ LANGUAGE plpgsql;
      `
    })
    
    if (functionError) {
      console.error("Error creating update_team_ranks function:", functionError)
      // Don't fail the request, just log the error
    }
    
    // Test the table by inserting a test record
    const testTeamName = `test_team_${Date.now()}`
    const { error: testInsertError } = await supabase
      .from("leaderboard_teams")
      .insert({
        teamName: testTeamName,
        points: 100,
        domain: "Test",
        project: "Test Project"
      })
    
    if (testInsertError) {
      return NextResponse.json({
        success: false,
        error: "Failed to test insert into leaderboard_teams",
        details: testInsertError.message
      })
    }
    
    // Clean up test record
    await supabase
      .from("leaderboard_teams")
      .delete()
      .eq("teamName", testTeamName)
    
    return NextResponse.json({
      success: true,
      message: "leaderboard_teams table created and tested successfully",
      note: "The approve score functionality should now work properly"
    })
    
  } catch (error) {
    console.error("Fix leaderboard error:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error },
      { status: 500 }
    )
  }
}
