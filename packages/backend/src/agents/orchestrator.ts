import { store, uuid } from '../db/client.js';
import { CoordinatorAgent } from './coordinator.js';
import { createAllAgents } from './registry.js';
import type { AgentContext } from './types.js';
import type { AgentId } from './types.js';
import type { AgentMessage } from './types.js';

type MessageListener = (msg: AgentMessage) => void;

export class Orchestrator {
  private agents = createAllAgents();
  private messageListeners: Set<MessageListener> = new Set();
  private coordinator: CoordinatorAgent;

  constructor() {
    this.coordinator = new CoordinatorAgent((agentId, taskId, ctx) => this.runAgent(agentId, taskId, ctx));
    this.agents.coordinator = this.coordinator;

    for (const agent of Object.values(this.agents)) {
      agent.setMessageHandler((msg) => this.broadcast(msg));
    }
  }

  onMessage(listener: MessageListener): () => void {
    this.messageListeners.add(listener);
    return () => this.messageListeners.delete(listener);
  }

  private broadcast(msg: AgentMessage): void {
    for (const listener of this.messageListeners) {
      try {
        listener(msg);
      } catch {
        // ignore listener errors
      }
    }
  }

  private async runAgent(
    agentId: AgentId,
    taskId: string,
    context: AgentContext
  ): Promise<Record<string, unknown>> {
    const agent = this.agents[agentId];
    if (!agent) throw new Error(`Unknown agent: ${agentId}`);
    return agent.execute(taskId, context);
  }

  async startAnalysis(companyId: string, companyName: string, domain?: string): Promise<string> {
    const company = store.companies.getById(companyId);
    const profile = company?.profile_json ? JSON.parse(company.profile_json) : { name: companyName, domain };

    const analysisId = uuid();
    store.analyses.insert({ id: analysisId, company_id: companyId, status: 'queued' });

    const coordTask = uuid();
    store.agentTasks.insert({
      id: coordTask,
      analysis_id: analysisId,
      agent_id: 'coordinator',
      agent_name: 'Coordinator',
      status: 'pending',
    });

    const ctx: AgentContext = {
      analysisId,
      companyId,
      companyProfile: profile,
      signals: new Map(),
    };

    setImmediate(() => {
      this.coordinator.execute(coordTask, ctx).catch((err) => {
        console.error('Orchestrator error:', err);
        store.analyses.update(analysisId, { status: 'failed' });
      });
    });

    return analysisId;
  }
}
