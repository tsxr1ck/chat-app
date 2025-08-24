# Full Stack Real-Time Chat App

A modern, full stack chat application built with React (Vite, TypeScript), Socket.IO, Express, and PostgreSQL. Features a beautiful UI with shadcn/ui components, real-time messaging, persistent chat history, and responsive design for desktop and mobile.

---

## Features

- ⚡ **Real-time Messaging** (Socket.IO)
- 🗨️ **Persistent Chat History** (PostgreSQL)
- 🎨 **Modern UI** (shadcn/ui, Tailwind CSS)
- 📱 **Fully Responsive** (Mobile & Desktop)
- 🔒 **Environment-based Config** (.env for secrets/URLs)
- 🐳 **Easy Deployment** (VPS/Cloud-ready)

---

## Tech Stack

- **Frontend:** React (Vite, TypeScript), shadcn/ui, Tailwind CSS
- **Backend:** Node.js, Express, Socket.IO
- **Database:** PostgreSQL

---

## Quick Start

### 1. Clone the Repo
```sh
git clone <your-repo-url>
cd chat-app
```

### 2. Environment Variables

#### Server (`server/.env`):
```
PGUSER=postgres
PGHOST=localhost
PGDATABASE=postgres
PGPASSWORD=your_db_password
PGPORT=5432
PORT=3001
```

#### Client (`client/.env.development`):
```
VITE_SOCKET_SERVER_URL=http://localhost:3001
```

#### Client (`client/.env.production`):
```
VITE_SOCKET_SERVER_URL=https://your-production-domain-or-ip:3001
```

---

### 3. Install Dependencies
```sh
cd server && pnpm install
cd ../client && pnpm install
```

### 4. Start the App (Development)
**Backend:**
```sh
cd server
pnpm start
```
**Frontend:**
```sh
cd ../client
pnpm run dev
```

---

### 5. Build for Production
```sh
cd client
pnpm run build
```
Serve the `client/dist` folder with nginx, serve, or your preferred static server.

---

## Deployment Tips
- Use [pm2](https://pm2.keymetrics.io/) or similar to keep the backend running.
- Use nginx or Caddy as a reverse proxy for HTTPS and static file serving.
- Open required ports (e.g., 3001 for backend, 80/443 for frontend).
- Update `.env.production` with your production server URL.

---

## Screenshots

![Chat UI Screenshot](./docs/screenshot.png)

---

## Folder Structure
```
chat-app/
├── client/      # React frontend (Vite, shadcn/ui)
├── server/      # Express backend (Socket.IO, PostgreSQL)
└── README.md
```

---

## Credits
- [shadcn/ui](https://ui.shadcn.com/)
- [Socket.IO](https://socket.io/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## License
MIT
