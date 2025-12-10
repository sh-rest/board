import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
// @ts-ignore
import { setupWSConnection } from "y-websocket/bin/utils";
import Redis from "redis";

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: "*" },
});

// Redis client for ephemeral board storage
const redisClient = Redis.createClient();
redisClient.connect();

app.use(express.json());

// Basic health check
app.get("/health", (_, res) => res.send("OK"));

// Helper: Generate short random board ID
function generateBoardId(length = 6) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

// POST /api/board - Create a new ephemeral board
app.post("/api/board", async (req, res) => {
  const boardId = generateBoardId();
  // Store minimal metadata in Redis (ephemeral)
  await redisClient.set(
    `board:${boardId}`,
    JSON.stringify({ created: Date.now() }),
    {
      EX: 60 * 60 * 6, // 6 hours expiry
    }
  );
  res.json({ boardId });
});

// Socket.io connection for Yjs sync
io.on("connection", (socket) => {
  // Use Yjs WebSocket utils for collaborative sync
  setupWSConnection(socket, null);
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
