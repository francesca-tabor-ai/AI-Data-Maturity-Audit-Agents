import { server } from './server.js';

const PORT = process.env.PORT ?? 3001;

server.listen(PORT, () => {
  console.log(`MATURITYOS API running on http://localhost:${PORT}`);
  console.log(`WebSocket available at ws://localhost:${PORT}/ws`);
});
