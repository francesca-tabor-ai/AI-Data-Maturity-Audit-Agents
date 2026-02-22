import { BaseAgent } from '../base-agent.js';
import type { AgentContext } from '../types.js';

export class CompanyDiscoveryAgent extends BaseAgent {
  readonly id = 'company_discovery' as const;
  readonly name = 'Company Discovery';

  async execute(taskId: string, context: AgentContext): Promise<Record<string, unknown>> {
    return this.runTask(taskId, context, async () => {
      const { companyProfile } = context;
      const name = (companyProfile?.name as string) ?? 'Unknown';
      const domain = (companyProfile?.domain as string) ?? '';

      const profile = {
        name,
        domain,
        website: domain ? `https://${domain}` : null,
        description: `Profile for ${name}`,
        industry: 'Technology',
        founded: null,
        headquarters: null,
        employeeCount: null,
      };

      return { profile, confidence: 0.7 };
    });
  }
}
