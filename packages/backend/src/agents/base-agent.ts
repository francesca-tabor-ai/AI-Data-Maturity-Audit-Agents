import type { AgentId, AgentContext, AgentMessage } from './types.js';
import { updateTaskStatus } from './queue.js';

export type MessageHandler = (msg: AgentMessage) => void;

export abstract class BaseAgent {
  abstract readonly id: AgentId;
  abstract readonly name: string;
  protected onMessage?: MessageHandler;

  setMessageHandler(handler: MessageHandler): void {
    this.onMessage = handler;
  }

  protected emit(msg: Omit<AgentMessage, 'from' | 'timestamp'>): void {
    if (this.onMessage) {
      this.onMessage({
        ...msg,
        from: this.id,
        timestamp: new Date().toISOString(),
      });
    }
  }

  abstract execute(taskId: string, context: AgentContext): Promise<Record<string, unknown>>;

  protected async runTask(
    taskId: string,
    context: AgentContext,
    fn: () => Promise<Record<string, unknown>>
  ): Promise<Record<string, unknown>> {
    this.emit({ type: 'task_start', payload: { taskId } });
    await updateTaskStatus(taskId, 'running');

    try {
      const output = await fn();
      await updateTaskStatus(taskId, 'completed', output, output.confidence as number);
      this.emit({ type: 'task_complete', payload: { taskId, output } });
      return output;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      await updateTaskStatus(taskId, 'failed', undefined, undefined, message);
      this.emit({ type: 'task_failed', payload: { taskId, error: message } });
      throw err;
    }
  }
}
