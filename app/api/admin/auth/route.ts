import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      )
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid admin password" },
        { status: 401 }
      )
    }

    // Generate a simple token for session management
    const token = crypto.randomBytes(32).toString("hex")

    return NextResponse.json({
      success: true,
      token,
    })
  } catch (error) {
    console.error("Admin auth error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
