export type AgentId =
  | 'coordinator'
  | 'company_discovery'
  | 'data_infrastructure'
  | 'ai_capability'
  | 'product_intelligence'
  | 'hiring_intelligence'
  | 'tech_stack'
  | 'financial_intelligence'
  | 'patent_research'
  | 'strategic_signals'
  | 'validation'
  | 'synthesis'
  | 'scoring';

export type TaskStatus = 'pending' | 'running' | 'completed' | 'failed';
export type AnalysisStatus = 'queued' | 'running' | 'completed' | 'failed';

export interface AgentMessage {
  from: AgentId;
  to?: AgentId;
  type: 'task_start' | 'task_complete' | 'task_failed' | 'signal' | 'progress';
  payload: Record<string, unknown>;
  timestamp: string;
}

export interface AgentContext {
  analysisId: string;
  companyId: string;
  companyProfile: Record<string, unknown>;
  signals: Map<string, Record<string, unknown>>;
}

export interface AgentTask {
  id: string;
  analysisId: string;
  agentId: AgentId;
  agentName: string;
  status: TaskStatus;
  inputData?: Record<string, unknown>;
  outputData?: Record<string, unknown>;
  confidence?: number;
  errorMessage?: string;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
}
