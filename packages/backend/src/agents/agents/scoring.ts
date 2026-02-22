import { BaseAgent } from '../base-agent.js';
import type { AgentContext } from '../types.js';
import { store } from '../../db/client.js';

const CLASSIFICATIONS = [
  'Traditional Enterprise',
  'Digital Starter',
  'Data Aware',
  'Intelligent Operator',
  'Augmented Enterprise',
  'AI-Native',
] as const;

export class ScoringAgent extends BaseAgent {
  readonly id = 'scoring' as const;
  readonly name = 'Scoring';

  async execute(taskId: string, context: AgentContext): Promise<Record<string, unknown>> {
    return this.runTask(taskId, context, async () => {
      const synthesis = context.signals.get('synthesis') as Record<string, unknown> | undefined;
      const model = (synthesis?.unifiedModel as Record<string, number>) ?? {};
      const data = Math.round((model.data ?? 3) as number);
      const ai = Math.round((model.ai ?? 3) as number);
      const alignment = Math.round((model.alignment ?? 4) as number);
      const innovation = Math.round((model.innovation ?? 3) as number);

      const avgScore = (data + ai + alignment + innovation) / 4;
      const stageIndex = Math.min(5, Math.max(0, Math.floor(avgScore)));
      const classification = CLASSIFICATIONS[stageIndex];

      const analysisId = context.analysisId;

      for (const [dim, score] of Object.entries({ data, ai, alignment, innovation })) {
        store.scores.upsert({
          id: `${analysisId}-${dim}`,
          analysis_id: analysisId,
          dimension: dim,
          score: score as number,
          confidence: 0.7,
        });
      }

      store.analyses.update(analysisId, {
        classification,
        risk_level: 'medium',
        revenue_upside: 15,
      });

      return {
        scores: { data, ai, alignment, innovation },
        classification,
        riskLevel: 'medium',
        revenueUpside: 15,
        confidence: 0.8,
      };
    });
  }
}
