import { randomUUID } from 'crypto';
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';

const DB_PATH = process.env.DATABASE_URL ?? './data/maturityos.json';

interface Company {
  id: string;
  name: string;
  domain: string;
  profile_json?: string;
  created_at: string;
  updated_at: string;
}

interface Analysis {
  id: string;
  company_id: string;
  status: string;
  classification?: string;
  risk_level?: string;
  revenue_upside?: number;
  investment_priority?: string;
  created_at: string;
  completed_at?: string;
}

interface AgentTask {
  id: string;
  analysis_id: string;
  agent_id: string;
  agent_name: string;
  status: string;
  input_data?: string;
  output_data?: string;
  confidence?: number;
  error_message?: string;
  started_at?: string;
  completed_at?: string;
  created_at: string;
}

interface Score {
  id: string;
  analysis_id: string;
  dimension: string;
  score: number;
  confidence?: number;
  created_at: string;
}

interface DbData {
  companies: Company[];
  analyses: Analysis[];
  agentTasks: AgentTask[];
  scores: Score[];
}

let data: DbData = {
  companies: [],
  analyses: [],
  agentTasks: [],
  scores: [],
};

function load(): void {
  const dir = dirname(DB_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  if (existsSync(DB_PATH)) {
    try {
      data = JSON.parse(readFileSync(DB_PATH, 'utf-8'));
    } catch {}
  }
}

function save(): void {
  const dir = dirname(DB_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(DB_PATH, JSON.stringify(data));
}

load();

export const store = {
  companies: {
    insert: (row: Omit<Company, 'created_at' | 'updated_at'>) => {
      const now = new Date().toISOString();
      const company: Company = { ...row, created_at: now, updated_at: now };
      data.companies.push(company);
      save();
    },
    getById: (id: string) => data.companies.find((c) => c.id === id),
    getAll: () => data.companies,
  },
  analyses: {
    insert: (row: Omit<Analysis, 'created_at'>) => {
      const analysis: Analysis = { ...row, created_at: new Date().toISOString() };
      data.analyses.push(analysis);
      save();
    },
    getById: (id: string) => data.analyses.find((a) => a.id === id),
    update: (id: string, updates: Partial<Analysis>) => {
      const idx = data.analyses.findIndex((a) => a.id === id);
      if (idx >= 0) {
        Object.assign(data.analyses[idx], updates);
        save();
      }
    },
  },
  agentTasks: {
    insert: (row: Omit<AgentTask, 'created_at'>) => {
      const task: AgentTask = { ...row, created_at: new Date().toISOString() };
      data.agentTasks.push(task);
      save();
    },
    getByAnalysisId: (analysisId: string) =>
      data.agentTasks.filter((t) => t.analysis_id === analysisId).sort((a, b) => a.created_at.localeCompare(b.created_at)),
    getPending: (analysisId: string) =>
      data.agentTasks.filter((t) => t.analysis_id === analysisId && t.status === 'pending'),
    update: (id: string, updates: Partial<AgentTask>) => {
      const idx = data.agentTasks.findIndex((t) => t.id === id);
      if (idx >= 0) {
        Object.assign(data.agentTasks[idx], updates);
        save();
      }
    },
  },
  scores: {
    upsert: (row: Omit<Score, 'created_at'>) => {
      const existing = data.scores.findIndex((s) => s.analysis_id === row.analysis_id && s.dimension === row.dimension);
      const score: Score = { ...row, created_at: new Date().toISOString() };
      if (existing >= 0) data.scores[existing] = score;
      else data.scores.push(score);
      save();
    },
    getByAnalysisId: (analysisId: string) => data.scores.filter((s) => s.analysis_id === analysisId),
  },
};

export function uuid(): string {
  return randomUUID();
}
