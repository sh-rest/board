# Collaborative Whiteboard Project Overview

## Vision

Build a real-time collaborative whiteboard (like Figma/Miro) where multiple users can draw simultaneously and see updates instantly. The project demonstrates concurrency, state synchronization, and real-time engineering challenges.

---

## Roadmap & Flow

### 1. Ephemeral Phase

- No accounts, no DB — just ephemeral boards stored in memory or Redis.
- Users visit the app, create a board (short random code), and collaborate in real-time.
- Board state is managed with Yjs (CRDT) and synced via WebSockets (Socket.io/y-websocket).
- Board metadata is stored in Redis with expiry (e.g., 6 hours).

### 2. Persistent Phase

- Users can "Save Board" (conversion point from casual to committed user).
- Prompt for sign up/log in (JWT + OAuth).
- Persist board state (Yjs snapshot) in SQL DB (PostgreSQL).
- Link board to user account and set visibility (public/private).
- On future visits, users can load their saved boards from DB.

---

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express, TypeScript, Socket.io, y-websocket, Yjs, Redis
- **Persistence:** PostgreSQL (for saved boards)
- **Auth:** JWT, OAuth (Google, GitHub)

---

## Implementation Steps

1. **Frontend:**
   - Canvas component for drawing
   - UI for creating/joining boards
   - Connect to backend via y-websocket for real-time sync
2. **Backend:**
   - Board creation endpoint (short random ID)
   - Store ephemeral board metadata in Redis
   - Yjs WebSocket server for board rooms
   - Board join logic
3. **Collaboration:**
   - Integrate Yjs for CRDT-based sync
   - Test multi-user drawing
4. **Persistence & Auth:**
   - "Save Board" button
   - Auth flow (JWT/OAuth)
   - Persist Yjs snapshot to DB
   - Link board to user and set visibility
5. **Load & Share:**
   - Load saved boards after login
   - Enforce visibility rules

---

## Key Decisions

- **CRDT:** Using Yjs for real-time sync
- **Ephemeral → Persistent:** Boards start in memory/Redis, can be saved to DB
- **Visibility:** Saved boards require login; user can choose public/private
- **Snapshots:** Only snapshots for now; undo/redo history can be added later
- **Node.js vs Java:** Node.js chosen for real-time, event-driven architecture and rapid prototyping. Java is more verbose and less suited for this use case unless enterprise features are needed.

---

## Setup Instructions

See `SETUP.md` for step-by-step local setup (Node.js, npm, backend, frontend, Redis).

---

## User Prompts & Decisions (History)

- Real-time collaborative whiteboard with concurrency/state sync
- Tech: WebSockets (Socket.io), Redis, React, CRDT (Yjs)
- Hybrid flow: ephemeral → persistent, SQL DB, user auth, board visibility
- No anonymous access for saved boards
- Use TypeScript for both backend and frontend
- Node.js preferred over Java for backend
- Implementation started with backend board creation and ephemeral storage
