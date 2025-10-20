import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import crypto from "crypto"

export const dynamic = "force-dynamic"

const GITHUB_SECRET = process.env.GITHUB_WEBHOOK_SECRET || ""

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase env vars are missing")
  }
  return createClient(supabaseUrl, supabaseKey)
}

function verifySignature(payload: string, signature: string): boolean {
  if (!GITHUB_SECRET) {
    console.warn("GITHUB_WEBHOOK_SECRET not set, skipping signature verification")
    return true
  }
  
  const expectedSignature = `sha256=${crypto
    .createHmac("sha256", GITHUB_SECRET)
    .update(payload)
    .digest("hex")}`
  return signature === expectedSignature
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text()
    const signature = request.headers.get("x-hub-signature-256")
    
    if (!verifySignature(payload, signature || "")) {
      console.error("Invalid webhook signature")
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const event = request.headers.get("x-github-event")
    const data = JSON.parse(payload)

    console.log(`Received GitHub event: ${event} for repository: ${data.repository?.name}`)

    await handleGitHubEvent(event, data)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}

async function handleGitHubEvent(event: string, data: any) {
  const teamName = data.repository?.name
  if (!teamName) {
    console.log("No repository name found in webhook payload")
    return
  }

  let points = 0
  let activityType = ""
  let description = ""
  let githubUrl = ""

  switch (event) {
    case "push":
      const commitCount = data.commits?.length || 0
      points = commitCount * 2
      activityType = "commit"
      description = `${commitCount} commit(s) pushed to ${data.ref}`
      githubUrl = data.compare || data.repository?.html_url
      break

    case "pull_request":
      if (data.action === "opened") {
        points = 5
        activityType = "pull_request"
        description = `Pull request opened: ${data.pull_request?.title}`
        githubUrl = data.pull_request?.html_url
      } else if (data.action === "closed" && data.pull_request?.merged) {
        points = 10
        activityType = "pull_request"
        description = `Pull request merged: ${data.pull_request?.title}`
        githubUrl = data.pull_request?.html_url
      }
      break

    case "issues":
      if (data.action === "opened") {
        points = 3
        activityType = "issue"
        description = `Issue opened: ${data.issue?.title}`
        githubUrl = data.issue?.html_url
      } else if (data.action === "closed") {
        points = 5
        activityType = "issue"
        description = `Issue closed: ${data.issue?.title}`
        githubUrl = data.issue?.html_url
      }
      break

    case "workflow_run":
      if (data.action === "completed" && data.workflow_run?.conclusion === "success") {
        points = 8
        activityType = "workflow"
        description = `Workflow completed successfully: ${data.workflow_run?.name}`
        githubUrl = data.workflow_run?.html_url
      }
      break

    default:
      console.log(`Unhandled event type: ${event}`)
      return
  }

  if (points > 0) {
    await createPendingScore(teamName, points, activityType, description, githubUrl)
  }
}

async function createPendingScore(
  teamName: string, 
  points: number, 
  activityType: string, 
  description: string, 
  githubUrl: string
) {
  try {
    const supabase = getSupabase()
    const { error } = await supabase
      .from("pending_scores")
      .insert({
        team_name: teamName,
        activity_type: activityType,
        points: points,
        description: description,
        github_url: githubUrl,
        status: "pending",
        created_at: new Date().toISOString()
      })

    if (error) {
      console.error("Error creating pending score:", error)
    } else {
      console.log(`Created pending score for ${teamName}: +${points} points (${activityType})`)
    }
  } catch (error) {
    console.error("Error in createPendingScore:", error)
  }
}
