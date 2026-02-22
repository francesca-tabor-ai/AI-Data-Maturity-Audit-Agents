import { store, uuid } from '../db/client.js';
import type { AgentId, AgentTask, TaskStatus } from './types.js';

export function enqueueTask(
  analysisId: string,
  agentId: AgentId,
  agentName: string,
  inputData?: Record<string, unknown>
): AgentTask {
  const id = uuid();
  store.agentTasks.insert({
    id,
    analysis_id: analysisId,
    agent_id: agentId,
    agent_name: agentName,
    status: 'pending',
    input_data: inputData ? JSON.stringify(inputData) : undefined,
  });

  return {
    id,
    analysisId,
    agentId,
    agentName,
    status: 'pending',
    inputData,
    createdAt: new Date().toISOString(),
  };
}

export function getPendingTasks(analysisId: string): AgentTask[] {
  const rows = store.agentTasks.getPending(analysisId);
  return rows.map(rowToTask);
}

export function updateTaskStatus(
  taskId: string,
  status: TaskStatus,
  outputData?: Record<string, unknown>,
  confidence?: number,
  errorMessage?: string
): void {
  const now = new Date().toISOString();
  if (status === 'running') {
    store.agentTasks.update(taskId, {
      status,
      output_data: outputData ? JSON.stringify(outputData) : undefined,
      started_at: now,
    });
  } else {
    store.agentTasks.update(taskId, {
      status,
      output_data: outputData ? JSON.stringify(outputData) : undefined,
      confidence,
      error_message: errorMessage,
      completed_at: now,
    });
  }
}

export function getTasksForAnalysis(analysisId: string): AgentTask[] {
  const rows = store.agentTasks.getByAnalysisId(analysisId);
  return rows.map(rowToTask);
}

function rowToTask(row: { id: string; analysis_id: string; agent_id: string; agent_name: string; status: string; input_data?: string; output_data?: string; confidence?: number; error_message?: string; started_at?: string; completed_at?: string; created_at: string }): AgentTask {
  return {
    id: row.id,
    analysisId: row.analysis_id,
    agentId: row.agent_id as AgentId,
    agentName: row.agent_name,
    status: row.status as TaskStatus,
    inputData: row.input_data ? JSON.parse(row.input_data) : undefined,
    outputData: row.output_data ? JSON.parse(row.output_data) : undefined,
    confidence: row.confidence,
    errorMessage: row.error_message,
    startedAt: row.started_at,
    completedAt: row.completed_at,
    createdAt: row.created_at,
  };
}
