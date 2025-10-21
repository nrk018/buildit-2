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
    
    // Check if leaderboard_teams table exists and get its structure
    const { data: tableInfo, error: tableError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable, column_default')
      .eq('table_name', 'leaderboard_teams')
      .eq('table_schema', 'public')
    
    if (tableError) {
      return NextResponse.json({
        success: false,
        error: "Failed to get table structure",
        details: tableError.message
      })
    }
    
    // Try to get some sample data from the table
    const { data: sampleData, error: dataError } = await supabase
      .from("leaderboard_teams")
      .select("*")
      .limit(5)
    
    // Check if we can insert a test record
    const testTeamName = `test_team_${Date.now()}`
    const { error: insertError } = await supabase
      .from("leaderboard_teams")
      .insert({
        teamName: testTeamName,
        points: 0,
        domain: "Test",
        project: "Test Project"
      })
    
    // Clean up test record
    if (!insertError) {
      await supabase
        .from("leaderboard_teams")
        .delete()
        .eq("teamName", testTeamName)
    }
    
    return NextResponse.json({
      success: true,
      tableExists: tableInfo && tableInfo.length > 0,
      tableStructure: tableInfo || [],
      sampleData: sampleData || [],
      canInsert: !insertError,
      insertError: insertError?.message || null,
      dataError: dataError?.message || null
    })
    
  } catch (error) {
    console.error("Leaderboard debug error:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error },
      { status: 500 }
    )
  }
}
