import { Router } from 'express';
import { store, uuid } from '../db/client.js';
import { requireAdmin } from '../middleware/auth.js';
import bcrypt from 'bcrypt';

export const adminRouter = Router();
adminRouter.use(requireAdmin);

// Companies CRUD
adminRouter.get('/companies', async (_req, res) => {
  try {
    const rows = await store.companies.getAll();
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' });
  }
});

adminRouter.post('/companies', async (req, res) => {
  try {
    const { name, domain, description } = req.body ?? {};
    const id = uuid();
    await store.companies.insert({ id, name: name ?? 'Unknown', domain: domain ?? '' });
    res.status(201).json({ id, name: name ?? 'Unknown', domain: domain ?? '' });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' });
  }
});

adminRouter.get('/companies/:id', async (req, res) => {
  try {
    const row = await store.companies.getById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' });
  }
});

adminRouter.patch('/companies/:id', async (req, res) => {
  try {
    const { name, domain } = req.body ?? {};
    await store.companies.update(req.params.id, { name, domain });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' });
  }
});

adminRouter.delete('/companies/:id', async (req, res) => {
  try {
    await store.companies.delete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' });
  }
});

// Analyses CRUD
adminRouter.get('/analyses', async (_req, res) => {
  try {
    const rows = await store.analyses.getAll();
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' });
  }
});

adminRouter.get('/analyses/:id', async (req, res) => {
  try {
    const row = await store.analyses.getById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' });
  }
});

adminRouter.patch('/analyses/:id', async (req, res) => {
  try {
    const { status, classification, risk_level } = req.body ?? {};
    await store.analyses.update(req.params.id, { status, classification, risk_level });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' });
  }
});

adminRouter.delete('/analyses/:id', async (req, res) => {
  try {
    await store.analyses.delete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' });
  }
});

// Agent tasks CRUD
adminRouter.get('/agent-tasks', async (_req, res) => {
  try {
    const rows = await store.agentTasks.getAll();
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' });
  }
});

adminRouter.get('/agent-tasks/:id', async (req, res) => {
  try {
    const row = await store.agentTasks.getById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' });
  }
});

adminRouter.delete('/agent-tasks/:id', async (req, res) => {
  try {
    await store.agentTasks.delete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' });
  }
});

// Scores CRUD
adminRouter.get('/scores', async (_req, res) => {
  try {
    const rows = await store.scores.getAll();
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' });
  }
});

adminRouter.delete('/scores/:id', async (req, res) => {
  try {
    await store.scores.delete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' });
  }
});

// Findings CRUD
adminRouter.get('/findings', async (_req, res) => {
  try {
    const rows = await store.findings.getAll();
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' });
  }
});

adminRouter.post('/findings', async (req, res) => {
  try {
    const { analysis_id, agent_id, finding_type, title, description, evidence, confidence } = req.body ?? {};
    const id = uuid();
    await store.findings.insert({
      id,
      analysis_id,
      agent_id,
      finding_type,
      title,
      description,
      evidence,
      confidence,
    });
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' });
  }
});

adminRouter.delete('/findings/:id', async (req, res) => {
  try {
    await store.findings.delete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' });
  }
});

// Users CRUD
adminRouter.get('/users', async (_req, res) => {
  try {
    const rows = await store.users.getAll();
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' });
  }
});

adminRouter.patch('/users/:id', async (req, res) => {
  try {
    const { name, role, password } = req.body ?? {};
    const updates: { name?: string; role?: string; password_hash?: string } = {};
    if (name !== undefined) updates.name = name;
    if (role !== undefined) updates.role = role;
    if (password) updates.password_hash = await bcrypt.hash(password, 10);
    await store.users.update(req.params.id, updates);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' });
  }
});

adminRouter.delete('/users/:id', async (req, res) => {
  try {
    await store.users.delete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' });
  }
});
