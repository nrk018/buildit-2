import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request: NextRequest) {
  try {
    // Get all pending score requests
    const { data: pendingScores, error } = await supabase
      .from("pending_scores")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching pending scores:", error)
      return NextResponse.json(
        { error: "Failed to fetch pending scores" },
        { status: 500 }
      )
    }

    return NextResponse.json(pendingScores || [])
  } catch (error) {
    console.error("Pending scores error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
