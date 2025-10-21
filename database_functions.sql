-- Database functions for BuildIt application

-- Function to update team ranks based on points
CREATE OR REPLACE FUNCTION update_team_ranks()
RETURNS void AS $$
BEGIN
  -- Update ranks for leaderboard_teams
  UPDATE leaderboard_teams 
  SET rank = ranked.rank
  FROM (
    SELECT teamName, 
           ROW_NUMBER() OVER (ORDER BY points DESC) as rank
    FROM leaderboard_teams
  ) ranked
  WHERE leaderboard_teams.teamName = ranked.teamName;
END;
$$ LANGUAGE plpgsql;

-- Function to create weekly score entry
CREATE OR REPLACE FUNCTION create_weekly_score(
  p_team_name TEXT,
  p_repository_name TEXT,
  p_week_start DATE,
  p_week_end DATE,
  p_points INTEGER,
  p_activities INTEGER
)
RETURNS void AS $$
BEGIN
  INSERT INTO weekly_scores (
    team_name,
    repository_name,
    week_start,
    week_end,
    points,
    activities
  ) VALUES (
    p_team_name,
    p_repository_name,
    p_week_start,
    p_week_end,
    p_points,
    p_activities
  )
  ON CONFLICT (team_name, repository_name, week_start) 
  DO UPDATE SET
    points = weekly_scores.points + p_points,
    activities = weekly_scores.activities + p_activities,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Add missing columns if they don't exist
ALTER TABLE pending_scores ADD COLUMN IF NOT EXISTS repository_name TEXT;
ALTER TABLE team_activities ADD COLUMN IF NOT EXISTS repository_name TEXT;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pending_scores_repo ON pending_scores(repository_name);
CREATE INDEX IF NOT EXISTS idx_team_activities_repo ON team_activities(repository_name);
CREATE INDEX IF NOT EXISTS idx_team_activities_composite ON team_activities(team_name, activity_type, repository_name);

-- Create weekly_scores table if it doesn't exist
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

-- Create indexes for weekly_scores
CREATE INDEX IF NOT EXISTS idx_weekly_scores_team ON weekly_scores(team_name);
CREATE INDEX IF NOT EXISTS idx_weekly_scores_repo ON weekly_scores(repository_name);
CREATE INDEX IF NOT EXISTS idx_weekly_scores_week ON weekly_scores(week_start);
