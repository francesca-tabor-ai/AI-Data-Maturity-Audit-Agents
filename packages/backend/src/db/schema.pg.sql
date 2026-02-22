-- MATURITYOS PostgreSQL Schema
-- Companies, analyses, agent_tasks, scores, findings, users

CREATE TABLE IF NOT EXISTS companies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  domain TEXT,
  website_url TEXT,
  description TEXT,
  profile_json TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analyses (
  id TEXT PRIMARY KEY,
  company_id TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'queued',
  classification TEXT,
  risk_level TEXT,
  revenue_upside REAL,
  investment_priority TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS agent_tasks (
  id TEXT PRIMARY KEY,
  analysis_id TEXT NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
  agent_id TEXT NOT NULL,
  agent_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  input_data TEXT,
  output_data TEXT,
  confidence REAL,
  error_message TEXT,
  started_at TEXT,
  completed_at TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS scores (
  id TEXT PRIMARY KEY,
  analysis_id TEXT NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
  dimension TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 1 AND score <= 6),
  confidence REAL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(analysis_id, dimension)
);

CREATE TABLE IF NOT EXISTS findings (
  id TEXT PRIMARY KEY,
  analysis_id TEXT NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
  agent_id TEXT NOT NULL,
  finding_type TEXT,
  title TEXT,
  description TEXT,
  evidence TEXT,
  confidence REAL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analyses_company ON analyses(company_id);
CREATE INDEX IF NOT EXISTS idx_analyses_status ON analyses(status);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_analysis ON agent_tasks(analysis_id);
CREATE INDEX IF NOT EXISTS idx_scores_analysis ON scores(analysis_id);
CREATE INDEX IF NOT EXISTS idx_findings_analysis ON findings(analysis_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
