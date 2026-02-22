import { pool } from './pool.js';
import { randomUUID } from 'crypto';

export function uuid(): string {
  return randomUUID();
}

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

function toIso(row: { created_at?: Date; updated_at?: Date; completed_at?: Date; started_at?: Date }) {
  return {
    ...row,
    created_at: row.created_at?.toISOString?.() ?? row.created_at,
    updated_at: row.updated_at?.toISOString?.() ?? row.updated_at,
    completed_at: row.completed_at?.toISOString?.() ?? row.completed_at,
    started_at: row.started_at?.toISOString?.() ?? row.started_at,
  };
}

export const store = {
  companies: {
    insert: async (row: Omit<Company, 'created_at' | 'updated_at'>) => {
      const client = await pool.connect();
      try {
        await client.query(
          `INSERT INTO companies (id, name, domain, profile_json, created_at, updated_at)
           VALUES ($1, $2, $3, $4, NOW(), NOW())`,
          [row.id, row.name, row.domain ?? '', row.profile_json ?? null]
        );
      } finally {
        client.release();
      }
    },
    getById: async (id: string): Promise<Company | undefined> => {
      const r = await pool.query(
        'SELECT * FROM companies WHERE id = $1',
        [id]
      );
      const row = r.rows[0];
      if (!row) return undefined;
      return toIso(row) as Company;
    },
    getAll: async (): Promise<Company[]> => {
      const r = await pool.query('SELECT * FROM companies ORDER BY created_at DESC');
      return r.rows.map((row) => toIso(row) as Company);
    },
    update: async (id: string, updates: Partial<Company>) => {
      const client = await pool.connect();
      try {
        const set: string[] = [];
        const vals: unknown[] = [];
        let i = 1;
        if (updates.name !== undefined) { set.push(`name = $${i++}`); vals.push(updates.name); }
        if (updates.domain !== undefined) { set.push(`domain = $${i++}`); vals.push(updates.domain); }
        if (updates.profile_json !== undefined) { set.push(`profile_json = $${i++}`); vals.push(updates.profile_json); }
        if (set.length) { set.push('updated_at = NOW()'); vals.push(id); await client.query(`UPDATE companies SET ${set.join(', ')} WHERE id = $${i}`, vals); }
      } finally {
        client.release();
      }
    },
    delete: async (id: string) => {
      await pool.query('DELETE FROM companies WHERE id = $1', [id]);
    },
  },
  analyses: {
    insert: async (row: Omit<Analysis, 'created_at'>) => {
      await pool.query(
        `INSERT INTO analyses (id, company_id, status, classification, risk_level, revenue_upside, investment_priority, created_at, completed_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), $8)`,
        [
          row.id,
          row.company_id,
          row.status ?? 'queued',
          row.classification ?? null,
          row.risk_level ?? null,
          row.revenue_upside ?? null,
          row.investment_priority ?? null,
          row.completed_at ?? null,
        ]
      );
    },
    getById: async (id: string): Promise<Analysis | undefined> => {
      const r = await pool.query('SELECT * FROM analyses WHERE id = $1', [id]);
      const row = r.rows[0];
      if (!row) return undefined;
      return toIso(row) as Analysis;
    },
    getAll: async (): Promise<Analysis[]> => {
      const r = await pool.query('SELECT * FROM analyses ORDER BY created_at DESC');
      return r.rows.map((row) => toIso(row) as Analysis);
    },
    update: async (id: string, updates: Partial<Analysis>) => {
      const client = await pool.connect();
      try {
        const set: string[] = [];
        const vals: unknown[] = [];
        let i = 1;
        if (updates.status !== undefined) { set.push(`status = $${i++}`); vals.push(updates.status); }
        if (updates.classification !== undefined) { set.push(`classification = $${i++}`); vals.push(updates.classification); }
        if (updates.risk_level !== undefined) { set.push(`risk_level = $${i++}`); vals.push(updates.risk_level); }
        if (updates.revenue_upside !== undefined) { set.push(`revenue_upside = $${i++}`); vals.push(updates.revenue_upside); }
        if (updates.investment_priority !== undefined) { set.push(`investment_priority = $${i++}`); vals.push(updates.investment_priority); }
        if (updates.completed_at !== undefined) { set.push(`completed_at = $${i++}`); vals.push(updates.completed_at); }
        if (set.length) { vals.push(id); await client.query(`UPDATE analyses SET ${set.join(', ')} WHERE id = $${i}`, vals); }
      } finally {
        client.release();
      }
    },
    delete: async (id: string) => {
      await pool.query('DELETE FROM analyses WHERE id = $1', [id]);
    },
  },
  agentTasks: {
    insert: async (row: Omit<AgentTask, 'created_at'>) => {
      await pool.query(
        `INSERT INTO agent_tasks (id, analysis_id, agent_id, agent_name, status, input_data, output_data, confidence, error_message, started_at, completed_at, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())`,
        [
          row.id,
          row.analysis_id,
          row.agent_id,
          row.agent_name,
          row.status ?? 'pending',
          row.input_data ?? null,
          row.output_data ?? null,
          row.confidence ?? null,
          row.error_message ?? null,
          row.started_at ?? null,
          row.completed_at ?? null,
        ]
      );
    },
    getById: async (id: string): Promise<AgentTask | undefined> => {
      const r = await pool.query('SELECT * FROM agent_tasks WHERE id = $1', [id]);
      const row = r.rows[0];
      if (!row) return undefined;
      return toIso(row) as AgentTask;
    },
    getByAnalysisId: async (analysisId: string): Promise<AgentTask[]> => {
      const r = await pool.query(
        'SELECT * FROM agent_tasks WHERE analysis_id = $1 ORDER BY created_at',
        [analysisId]
      );
      return r.rows.map((row) => toIso(row) as AgentTask);
    },
    getPending: async (analysisId: string): Promise<AgentTask[]> => {
      const r = await pool.query(
        'SELECT * FROM agent_tasks WHERE analysis_id = $1 AND status = $2 ORDER BY created_at',
        [analysisId, 'pending']
      );
      return r.rows.map((row) => toIso(row) as AgentTask);
    },
    update: async (id: string, updates: Partial<AgentTask>) => {
      const client = await pool.connect();
      try {
        const set: string[] = [];
        const vals: unknown[] = [];
        let i = 1;
        if (updates.status !== undefined) { set.push(`status = $${i++}`); vals.push(updates.status); }
        if (updates.input_data !== undefined) { set.push(`input_data = $${i++}`); vals.push(updates.input_data); }
        if (updates.output_data !== undefined) { set.push(`output_data = $${i++}`); vals.push(updates.output_data); }
        if (updates.confidence !== undefined) { set.push(`confidence = $${i++}`); vals.push(updates.confidence); }
        if (updates.error_message !== undefined) { set.push(`error_message = $${i++}`); vals.push(updates.error_message); }
        if (updates.started_at !== undefined) { set.push(`started_at = $${i++}`); vals.push(updates.started_at); }
        if (updates.completed_at !== undefined) { set.push(`completed_at = $${i++}`); vals.push(updates.completed_at); }
        if (set.length) { vals.push(id); await client.query(`UPDATE agent_tasks SET ${set.join(', ')} WHERE id = $${i}`, vals); }
      } finally {
        client.release();
      }
    },
    getAll: async (): Promise<AgentTask[]> => {
      const r = await pool.query('SELECT * FROM agent_tasks ORDER BY created_at DESC');
      return r.rows.map((row) => toIso(row) as AgentTask);
    },
    delete: async (id: string) => {
      await pool.query('DELETE FROM agent_tasks WHERE id = $1', [id]);
    },
  },
  scores: {
    upsert: async (row: Omit<Score, 'id' | 'created_at'>) => {
      const id = uuid();
      await pool.query(
        `INSERT INTO scores (id, analysis_id, dimension, score, confidence, created_at)
         VALUES ($1, $2, $3, $4, $5, NOW())
         ON CONFLICT (analysis_id, dimension) DO UPDATE SET
           score = EXCLUDED.score,
           confidence = EXCLUDED.confidence`,
        [id, row.analysis_id, row.dimension, row.score, row.confidence ?? null]
      );
    },
    getByAnalysisId: async (analysisId: string): Promise<Score[]> => {
      const r = await pool.query('SELECT * FROM scores WHERE analysis_id = $1', [analysisId]);
      return r.rows.map((row) => toIso(row) as Score);
    },
    getAll: async (): Promise<Score[]> => {
      const r = await pool.query('SELECT * FROM scores ORDER BY created_at DESC');
      return r.rows.map((row) => toIso(row) as Score);
    },
    delete: async (id: string) => {
      await pool.query('DELETE FROM scores WHERE id = $1', [id]);
    },
  },
  findings: {
    insert: async (row: {
      id: string;
      analysis_id: string;
      agent_id: string;
      finding_type?: string;
      title?: string;
      description?: string;
      evidence?: string;
      confidence?: number;
    }) => {
      await pool.query(
        `INSERT INTO findings (id, analysis_id, agent_id, finding_type, title, description, evidence, confidence, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
        [
          row.id,
          row.analysis_id,
          row.agent_id,
          row.finding_type ?? null,
          row.title ?? null,
          row.description ?? null,
          row.evidence ?? null,
          row.confidence ?? null,
        ]
      );
    },
    getByAnalysisId: async (analysisId: string) => {
      const r = await pool.query('SELECT * FROM findings WHERE analysis_id = $1', [analysisId]);
      return r.rows.map((row) => toIso(row));
    },
    getAll: async () => {
      const r = await pool.query('SELECT * FROM findings ORDER BY created_at DESC');
      return r.rows.map((row) => toIso(row));
    },
    delete: async (id: string) => {
      await pool.query('DELETE FROM findings WHERE id = $1', [id]);
    },
  },
  users: {
    insert: async (row: {
      id: string;
      email: string;
      password_hash: string;
      name?: string;
      role?: string;
    }) => {
      await pool.query(
        `INSERT INTO users (id, email, password_hash, name, role, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
        [row.id, row.email, row.password_hash, row.name ?? null, row.role ?? 'user']
      );
    },
    getById: async (id: string) => {
      const r = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      const row = r.rows[0];
      if (!row) return undefined;
      return toIso(row);
    },
    getByEmail: async (email: string) => {
      const r = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const row = r.rows[0];
      if (!row) return undefined;
      return toIso(row);
    },
    getAll: async () => {
      const r = await pool.query('SELECT id, email, name, role, created_at FROM users ORDER BY created_at DESC');
      return r.rows.map((row) => toIso(row));
    },
    update: async (id: string, updates: { name?: string; password_hash?: string; role?: string }) => {
      const client = await pool.connect();
      try {
        const set: string[] = [];
        const vals: unknown[] = [];
        let i = 1;
        if (updates.name !== undefined) { set.push(`name = $${i++}`); vals.push(updates.name); }
        if (updates.password_hash !== undefined) { set.push(`password_hash = $${i++}`); vals.push(updates.password_hash); }
        if (updates.role !== undefined) { set.push(`role = $${i++}`); vals.push(updates.role); }
        if (set.length) { set.push('updated_at = NOW()'); vals.push(id); await client.query(`UPDATE users SET ${set.join(', ')} WHERE id = $${i}`, vals); }
      } finally {
        client.release();
      }
    },
    delete: async (id: string) => {
      await pool.query('DELETE FROM users WHERE id = $1', [id]);
    },
  },
};
