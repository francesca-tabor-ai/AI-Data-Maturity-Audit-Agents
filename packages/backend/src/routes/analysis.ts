import { Router } from 'express';
import { store, uuid } from '../db/client.js';
import { orchestrator } from '../orchestrator-instance.js';

export const analysisRouter = Router();

analysisRouter.post('/', (req, res) => {
  const { companyId, companyName, domain } = req.body ?? {};

  let cid = companyId;
  if (!cid) {
    cid = uuid();
    store.companies.insert({ id: cid, name: companyName ?? 'Unknown', domain: domain ?? '' });
  }

  orchestrator
    .startAnalysis(cid, companyName ?? 'Unknown', domain)
    .then((analysisId) => {
      const row = store.analyses.getById(analysisId);
      res.status(201).json({
        id: row?.id,
        companyId: cid,
        status: 'queued',
        createdAt: row?.created_at,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

analysisRouter.get('/:id', (req, res) => {
  const row = store.analyses.getById(req.params.id);
  if (!row) return res.status(404).json({ error: 'Analysis not found' });

  const scores = store.scores.getByAnalysisId(req.params.id);
  const scoreMap: Record<string, number> = {};
  for (const s of scores) {
    scoreMap[s.dimension] = s.score;
  }

  res.json({
    id: row.id,
    companyId: row.company_id,
    status: row.status,
    classification: row.classification,
    riskLevel: row.risk_level,
    revenueUpside: row.revenue_upside,
    investmentPriority: row.investment_priority,
    scores: scoreMap,
    createdAt: row.created_at,
    completedAt: row.completed_at,
  });
});
