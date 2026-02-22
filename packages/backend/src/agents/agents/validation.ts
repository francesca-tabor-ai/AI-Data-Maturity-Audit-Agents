import { BaseAgent } from '../base-agent.js';
import type { AgentContext } from '../types.js';

export class ValidationAgent extends BaseAgent {
  readonly id = 'validation' as const;
  readonly name = 'Validation';

  async execute(taskId: string, context: AgentContext): Promise<Record<string, unknown>> {
    return this.runTask(taskId, context, async () => {
      const signals = Array.from(context.signals.entries()).map(([k, v]) =>
        ({ agent: k, ...v }) as { agent: string; confidence?: number }
      );
      const avgConfidence =
        signals.length > 0
          ? signals.reduce((a, s) => a + ((s.confidence as number) ?? 0), 0) / signals.length
          : 0.5;
      return {
        crossValidationScore: avgConfidence,
        conflictingSignals: [],
        confidence: Math.min(avgConfidence + 0.1, 1),
      };
    });
  }
}
