import { Router } from 'express';
import { getTasksForAnalysis } from '../agents/queue.js';

export const agentRouter = Router();

agentRouter.get('/status', (_req, res) => {
  res.json({ agents: [], activeTasks: 0 });
});

agentRouter.get('/tasks', async (req, res) => {
  try {
    const { analysisId } = req.query;
    if (!analysisId || typeof analysisId !== 'string') {
      return res.json({ tasks: [] });
    }
    const tasks = await getTasksForAnalysis(analysisId);
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Database error' });
  }
});
