import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Use pre-configured BuildIt organization
    const organization = process.env.BUILDIT_GITHUB_ORG || "buildit-muj"

    const githubToken = process.env.GITHUB_TOKEN
    if (!githubToken) {
      return NextResponse.json(
        { error: "GitHub token not configured" },
        { status: 500 }
      )
    }

    // Fetch repositories from pre-configured BuildIt organization
    const response = await fetch(
      `https://api.github.com/orgs/${organization}/repos?per_page=100&sort=updated`,
      {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'BuildIt-App'
        }
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: `Organization '${organization}' not found or not accessible. Make sure the organization name is correct and you have access to it.` },
          { status: 404 }
        )
      }
      if (response.status === 403) {
        return NextResponse.json(
          { error: "GitHub API rate limit exceeded or insufficient permissions. Check your GITHUB_TOKEN has 'repo' and 'read:org' scopes." },
          { status: 403 }
        )
      }
      if (response.status === 401) {
        return NextResponse.json(
          { error: "GitHub authentication failed. Check your GITHUB_TOKEN." },
          { status: 401 }
        )
      }
      return NextResponse.json(
        { error: `Failed to fetch repositories from GitHub organization '${organization}'. Status: ${response.status}` },
        { status: response.status }
      )
    }

    const repositories = await response.json()
    
    // Filter and format repository data
    const formattedRepos = repositories
      .filter((repo: any) => !repo.archived && !repo.disabled) // Only active repos
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language,
        updated_at: repo.updated_at,
        private: repo.private,
        fork: repo.fork
      }))
      .sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())

    return NextResponse.json({
      repositories: formattedRepos,
      total: formattedRepos.length
    })

  } catch (error) {
    console.error("GitHub API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
