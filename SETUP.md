# Collaborative Whiteboard – Local Setup Instructions

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## 1. Clone the Repository

```sh
git clone <your-repo-url>
cd board
```

## 2. Install Dependencies

### Backend

```sh
cd backend
npm install
```

### Frontend

```sh
cd ../frontend
npm install
```

## 3. Build and Start the Backend

```sh
cd ../backend
npm run build
npm start
```

## 4. Start the Frontend (Dev Mode)

```sh
cd ../frontend
npx vite
```

- The backend runs on [http://localhost:4000](http://localhost:4000)
- The frontend runs on [http://localhost:5173](http://localhost:5173) by default

## 5. Environment Variables (Optional)

- Create a `.env` file in `backend/` for custom config (e.g., Redis URL, DB credentials)

## 6. Redis (Ephemeral Storage)

- Make sure you have a Redis server running locally or update the connection string in the backend config.

---

You're ready to develop and test the collaborative whiteboard!
