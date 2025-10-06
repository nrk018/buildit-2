import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const DATA_PATH = path.join(process.cwd(), "data", "leaderboard.json")

export async function GET() {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    const json = JSON.parse(raw)
    return NextResponse.json(json)
  } catch (e) {
    return NextResponse.json({ data: { individuals: [], teams: [], domains: [], lessAI: [] } })
  }
}

export async function PUT(req: Request) {
  // Simple admin key header for minimal auth; replace with proper auth later
  const key = req.headers.get("x-admin-key")
  if (key !== process.env.ADMIN_KEY) {
    return new NextResponse("Unauthorized", { status: 401 })
  }
  const body = await req.json()
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true })
  await fs.writeFile(DATA_PATH, JSON.stringify(body, null, 2), "utf8")
  return NextResponse.json({ ok: true })
}


