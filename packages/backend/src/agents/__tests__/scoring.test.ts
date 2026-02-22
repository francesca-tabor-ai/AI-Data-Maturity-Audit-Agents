import { describe, it, expect, beforeEach } from 'vitest';
import { ScoringAgent } from '../agents/scoring.js';
import { store } from '../../db/client.js';

describe('ScoringAgent', () => {
  beforeEach(async () => {
    const company = await store.companies.getById('c1');
    if (!company) await store.companies.insert({ id: 'c1', name: 'Test Co', domain: 'test.com' });
    try {
      await store.analyses.insert({ id: 'test-1', company_id: 'c1', status: 'running' });
    } catch {
      // may already exist from previous run
    }
  });

  it('maps synthesis scores to classification', async () => {
    const agent = new ScoringAgent();
    const ctx = {
      analysisId: 'test-1',
      companyId: 'c1',
      companyProfile: {},
      signals: new Map([
        [
          'synthesis',
          {
            unifiedModel: { data: 4, ai: 4, alignment: 5, innovation: 4 },
            confidence: 0.8,
          },
        ],
      ]),
    };

    const result = await agent.execute('task-1', ctx);

    expect(result.scores).toEqual({ data: 4, ai: 4, alignment: 5, innovation: 4 });
    expect(result.classification).toBeDefined();
    expect(['Traditional Enterprise', 'Digital Starter', 'Data Aware', 'Intelligent Operator', 'Augmented Enterprise', 'AI-Native']).toContain(result.classification);
  });
});
