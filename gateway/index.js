// gateway/index.js
const WebSocket = require('ws');
const { createClient } = require('redis');

(async () => {
  // ——— 1. Redis subscriber setup ———
  const subscriber = createClient({
    url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
    // legacyMode is NOT needed if you use .subscribe(...) callback style
  });

  subscriber.on('error', err => console.error('Redis error', err));
  await subscriber.connect();

  // subscribe with callback-style API
  await subscriber.subscribe('stocks', (message, channel) => {
    // Broadcast to all WebSocket clients
    wss.clients.forEach(ws => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
    });
  });

  // ——— 2. WebSocket server setup ———
  const PORT = process.env.PORT || 8080;
  const wss = new WebSocket.Server({ port: PORT });

  wss.on('connection', ws => {
    console.log('🌐 Client connected');
    ws.on('close', () => console.log('❌ Client disconnected'));
  });

  console.log(`🚀 Gateway listening on ws://localhost:${PORT}`);
})();
