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

    // Mark pending score as rejected
    const supabase = getSupabase()
    const { error: updateError } = await supabase
      .from("pending_scores")
      .update({ 
        status: "rejected",
        rejected_at: new Date().toISOString()
      })
      .eq("id", scoreId)

    if (updateError) {
      console.error("Error updating pending score:", updateError)
      return NextResponse.json(
        { error: "Failed to update pending score status" },
        { status: 500 }
      )
    }

    console.log(`Rejected score request ID: ${scoreId}`)

    return NextResponse.json({
      success: true,
      message: "Score request rejected"
    })
  } catch (error) {
    console.error("Reject score error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
