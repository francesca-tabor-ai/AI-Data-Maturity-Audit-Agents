import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { analysisRouter } from './routes/analysis.js';
import { agentRouter } from './routes/agents.js';
import { authRouter } from './routes/auth.js';
import { adminRouter } from './routes/admin.js';
import { companiesRouter } from './routes/companies.js';
import { orchestrator } from './orchestrator-instance.js';

const app = express();
const PORT = process.env.PORT ?? 3001;
const server = createServer(app);

const wss = new WebSocketServer({ server, path: '/ws' });
wss.on('connection', (ws) => {
  const unsubscribe = orchestrator.onMessage((msg) => {
    if (ws.readyState === 1) ws.send(JSON.stringify(msg));
  });
  ws.on('close', unsubscribe);
});

app.use(cors({ origin: process.env.FRONTEND_URL ?? 'http://localhost:3000' }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRouter);
app.use('/api/companies', companiesRouter);
app.use('/api/analyses', analysisRouter);
app.use('/api/agents', agentRouter);
app.use('/api/admin', adminRouter);

export { server };
