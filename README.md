# Push Design Pattern Implementation

A demonstration of the push design pattern using WebSockets, Redis, and Node.js for real-time data delivery.

## Architecture

This project implements a push-based architecture with three main components:

1. **Producer**: Generates simulated stock price updates and publishes them to Redis
2. **Gateway**: Acts as a middleware that subscribes to Redis and forwards messages to WebSocket clients
3. **Client**: Web application that connects to the WebSocket server and displays real-time updates

```
┌──────────┐     ┌─────────┐     ┌──────────┐
│ Producer │────►│  Redis  │────►│  Gateway │
└──────────┘     └─────────┘     └──────────┘
                                      │
                                      ▼
                                 ┌──────────┐
                                 │  Client  │
                                 └──────────┘
```

## Prerequisites

- Node.js (v14+ recommended)
- Redis server running locally or accessible via URL
- Web browser with WebSocket support

## Setup

1. Clone this repository
2. Install dependencies for both services

```bash
# Install gateway dependencies
cd gateway
npm install

# Install producer dependencies
cd ../producer
npm install
```

3. Make sure Redis is running

## Running the Application

1. Start the gateway service:

```bash
cd gateway
node index.js
```

2. Start the producer service:

```bash
cd producer
node index.js
```

3. Open the client in a web browser:
   - Simply open the `client/index.html` file in your browser

## How It Works

### Producer

The producer simulates a stock data source that generates updates every second. It connects to Redis and publishes these updates to a channel called "stocks".

### Gateway

The gateway performs two key functions:
- Subscribes to the Redis "stocks" channel to receive updates
- Maintains WebSocket connections with clients and forwards any updates received from Redis

### Client

The client is a simple web page that:
- Establishes a WebSocket connection to the gateway
- Listens for messages and displays them in real-time
- Limits the display to the 20 most recent updates

## Environment Variables

Both services support configuration via environment variables:

- `REDIS_URL`: Redis connection string (default: 'redis://127.0.0.1:6379')
- `PORT`: Port for the WebSocket server in the gateway (default: 8080)

## Push Design Pattern Benefits

This implementation demonstrates the advantages of the push design pattern:

- Real-time updates without polling
- Reduced server load compared to polling-based implementations
- Efficient delivery of data only when changes occur
- Scalable architecture with Redis as a message broker

## License

[MIT](LICENSE)