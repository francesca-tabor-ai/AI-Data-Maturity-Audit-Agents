-- MATURITYOS Database Schema
-- Companies, analyses, agents, scores, and findings

CREATE TABLE IF NOT EXISTS companies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  domain TEXT,
  website_url TEXT,
  description TEXT,
  profile_json TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS analyses (
  id TEXT PRIMARY KEY,
  company_id TEXT NOT NULL REFERENCES companies(id),
  status TEXT NOT NULL DEFAULT 'queued', -- queued, running, completed, failed
  classification TEXT,
  risk_level TEXT,
  revenue_upside REAL,
  investment_priority TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  completed_at TEXT,
  FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE TABLE IF NOT EXISTS agent_tasks (
  id TEXT PRIMARY KEY,
  analysis_id TEXT NOT NULL REFERENCES analyses(id),
  agent_id TEXT NOT NULL,
  agent_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, running, completed, failed
  input_data TEXT,
  output_data TEXT,
  confidence REAL,
  error_message TEXT,
  started_at TEXT,
  completed_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (analysis_id) REFERENCES analyses(id)
);

CREATE TABLE IF NOT EXISTS scores (
  id TEXT PRIMARY KEY,
  analysis_id TEXT NOT NULL REFERENCES analyses(id),
  dimension TEXT NOT NULL, -- data, ai, alignment, innovation
  score INTEGER NOT NULL CHECK (score >= 1 AND score <= 6),
  confidence REAL,
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(analysis_id, dimension),
  FOREIGN KEY (analysis_id) REFERENCES analyses(id)
);

CREATE TABLE IF NOT EXISTS findings (
  id TEXT PRIMARY KEY,
  analysis_id TEXT NOT NULL REFERENCES analyses(id),
  agent_id TEXT NOT NULL,
  finding_type TEXT,
  title TEXT,
  description TEXT,
  evidence TEXT,
  confidence REAL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (analysis_id) REFERENCES analyses(id)
);

CREATE INDEX IF NOT EXISTS idx_analyses_company ON analyses(company_id);
CREATE INDEX IF NOT EXISTS idx_analyses_status ON analyses(status);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_analysis ON agent_tasks(analysis_id);
CREATE INDEX IF NOT EXISTS idx_scores_analysis ON scores(analysis_id);
CREATE INDEX IF NOT EXISTS idx_findings_analysis ON findings(analysis_id);
