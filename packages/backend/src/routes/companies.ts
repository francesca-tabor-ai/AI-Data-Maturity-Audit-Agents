import { Router } from 'express';
import { store, uuid } from '../db/client.js';

export const companiesRouter = Router();

companiesRouter.get('/', (_req, res) => {
  const rows = store.companies.getAll().map((c) => ({
    id: c.id,
    name: c.name,
    domain: c.domain,
    created_at: c.created_at,
  }));
  res.json({ companies: rows, total: rows.length });
});

companiesRouter.post('/', (req, res) => {
  const { name, domain } = req.body ?? {};
  const id = uuid();
  store.companies.insert({ id, name: name ?? 'Unknown', domain: domain ?? '' });
  res.status(201).json({ id, name: name ?? 'Unknown', domain: domain ?? '' });
});

companiesRouter.get('/:id', (req, res) => {
  const row = store.companies.getById(req.params.id);
  if (!row) return res.status(404).json({ error: 'Company not found' });
  res.json({
    ...row,
    profile: row.profile_json ? JSON.parse(row.profile_json) : null,
  });
});
