import { BaseAgent } from '../base-agent.js';
import type { AgentContext } from '../types.js';

export class TechStackAgent extends BaseAgent {
  readonly id = 'tech_stack' as const;
  readonly name = 'Technology Stack';

  async execute(taskId: string, context: AgentContext): Promise<Record<string, unknown>> {
    return this.runTask(taskId, context, async () => {
      return {
        cloudProviders: [],
        dataTools: [],
        aiTools: [],
        confidence: 0.5,
      };
    });
  }
}
