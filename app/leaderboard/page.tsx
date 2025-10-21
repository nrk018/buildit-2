import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Leaderboard — BuildIt Student Rankings",
  description: "View the BuildIt leaderboard showcasing top-performing students and teams at Manipal University Jaipur. Track progress, achievements, and project contributions.",
  keywords: [
    "BuildIt Leaderboard",
    "Student Rankings",
    "MUJ Builder Club",
    "Student Achievements",
    "Project Rankings",
    "Student Performance",
    "Tech Leaderboard"
  ],
  openGraph: {
    title: "Leaderboard — BuildIt Student Rankings",
    description: "View the BuildIt leaderboard showcasing top-performing students and teams at Manipal University Jaipur.",
    type: "website",
  },
  twitter: {
    title: "BuildIt Leaderboard — Student Rankings",
    description: "View the BuildIt leaderboard showcasing top-performing students and teams at Manipal University Jaipur.",
  },
}

export default function LeaderboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">BuildIt Leaderboard</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Track student progress and achievements across all BuildIt projects and activities.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-border/50 bg-card/70 backdrop-blur-md p-6">
          <h2 className="text-xl font-semibold mb-4">Individual Rankings</h2>
          <p className="text-muted-foreground">
            See how individual students are performing across all projects and activities.
          </p>
        </div>
        
        <div className="rounded-xl border border-border/50 bg-card/70 backdrop-blur-md p-6">
          <h2 className="text-xl font-semibold mb-4">Team Rankings</h2>
          <p className="text-muted-foreground">
            Track team performance and collaborative achievements in project development.
          </p>
        </div>
        
        <div className="rounded-xl border border-border/50 bg-card/70 backdrop-blur-md p-6">
          <h2 className="text-xl font-semibold mb-4">Domain Rankings</h2>
          <p className="text-muted-foreground">
            View rankings by technology domains: AI, Robotics, Web Development, and more.
          </p>
        </div>
      </div>
    </div>
  )
}