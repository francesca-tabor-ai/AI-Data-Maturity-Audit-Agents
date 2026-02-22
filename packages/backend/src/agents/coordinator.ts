import type { AgentId } from './types.js';
import { BaseAgent } from './base-agent.js';
import type { AgentContext } from './types.js';
import { enqueueTask } from './queue.js';
import { store } from '../db/client.js';

const AGENT_ORDER: AgentId[] = [
  'company_discovery',
  'data_infrastructure',
  'ai_capability',
  'product_intelligence',
  'hiring_intelligence',
  'tech_stack',
  'financial_intelligence',
  'patent_research',
  'strategic_signals',
  'validation',
  'synthesis',
  'scoring',
];

const AGENT_NAMES: Record<AgentId, string> = {
  coordinator: 'Coordinator',
  company_discovery: 'Company Discovery',
  data_infrastructure: 'Data Infrastructure',
  ai_capability: 'AI Capability',
  product_intelligence: 'Product Intelligence',
  hiring_intelligence: 'Hiring Intelligence',
  tech_stack: 'Technology Stack',
  financial_intelligence: 'Financial Intelligence',
  patent_research: 'Patent & Research',
  strategic_signals: 'Strategic Signals',
  validation: 'Validation',
  synthesis: 'Synthesis',
  scoring: 'Scoring',
};

export class CoordinatorAgent extends BaseAgent {
  readonly id = 'coordinator' as const;
  readonly name = 'Coordinator';

  constructor(
    private executeAgent: (agentId: AgentId, taskId: string, ctx: AgentContext) => Promise<Record<string, unknown>>
  ) {
    super();
  }

  async execute(taskId: string, context: AgentContext): Promise<Record<string, unknown>> {
    return this.runTask(taskId, context, async () => {
      const analysisId = context.analysisId;

      store.analyses.update(analysisId, { status: 'running' });

      const signals = new Map<string, Record<string, unknown>>();
      let companyProfile = context.companyProfile;

      for (const agentId of AGENT_ORDER) {
        const task = enqueueTask(analysisId, agentId, AGENT_NAMES[agentId], { companyProfile });
        const output = await this.executeAgent(agentId, task.id, {
          ...context,
          companyProfile,
          signals,
        });
        signals.set(agentId, output);
        if (agentId === 'company_discovery' && output.profile) {
          companyProfile = output.profile as Record<string, unknown>;
        }
      }

      store.analyses.update(analysisId, { status: 'completed', completed_at: new Date().toISOString() });

      return { success: true, signalsCompleted: AGENT_ORDER.length };
    });
  }
}
