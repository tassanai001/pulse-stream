// producer/index.js
const { createClient } = require('redis');

(async () => {
  // 1. Connect to Redis
  const publisher = createClient({
    url: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
  });
  publisher.on('error', err => console.error('Redis error', err));
  await publisher.connect();

  console.log('🔔 Producer connected to Redis, publishing every second…');

  // 2. Publish a fake stock update every second
  setInterval(() => {
    const update = {
      symbol: 'ACME',
      price: (100 + Math.random() * 10).toFixed(2),
      timestamp: Date.now()
    };
    publisher.publish('stocks', JSON.stringify(update));
    console.log('→', update);
  }, 1000);
})();
