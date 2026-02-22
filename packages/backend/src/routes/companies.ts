import { Router } from 'express';
import { store, uuid } from '../db/client.js';

export const companiesRouter = Router();

companiesRouter.get('/', async (_req, res) => {
  try {
    const rows = (await store.companies.getAll()).map((c) => ({
      id: c.id,
      name: c.name,
      domain: c.domain,
      created_at: c.created_at,
    }));
    res.json({ companies: rows, total: rows.length });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Database error' });
  }
});

companiesRouter.post('/', async (req, res) => {
  try {
    const { name, domain } = req.body ?? {};
    const id = uuid();
    await store.companies.insert({ id, name: name ?? 'Unknown', domain: domain ?? '' });
    res.status(201).json({ id, name: name ?? 'Unknown', domain: domain ?? '' });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Database error' });
  }
});

companiesRouter.get('/:id', async (req, res) => {
  try {
    const row = await store.companies.getById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Company not found' });
    res.json({
      ...row,
      profile: row.profile_json ? JSON.parse(row.profile_json) : null,
    });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Database error' });
  }
});
