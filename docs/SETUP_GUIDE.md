# ⚙️ Development Setup Guide

> Step-by-step environment setup for Mitra 2.0

---

## 📋 Prerequisites

| Software | Version       | Download                                                |
| -------- | ------------- | ------------------------------------------------------- |
| Node.js  | 20.x LTS      | [nodejs.org](https://nodejs.org/)                       |
| Python   | 3.11+         | [python.org](https://www.python.org/)                   |
| MongoDB  | Atlas (cloud) | [mongodb.com/atlas](https://www.mongodb.com/atlas)      |
| Git      | Latest        | [git-scm.com](https://git-scm.com/)                     |
| VS Code  | Latest        | [code.visualstudio.com](https://code.visualstudio.com/) |

### Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Python
- MongoDB for VS Code
- Thunder Client (API testing)
- Auto Rename Tag

---

## 🚀 Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mitra2.0.git
cd mitra2.0
```

### 2. Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster (M0 tier)
3. Create a database user (username + password)
4. Whitelist your IP address (or allow all: `0.0.0.0/0` for development)
5. Get the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/mitra?retryWrites=true&w=majority
   ```

### 3. Get API Keys

#### Gemini API (Recommended for AI Chat)

1. Go to [Google AI Studio](https://makersuite.google.com/)
2. Click "Get API Key"
3. Create a new API key
4. Save as `GEMINI_API_KEY`

#### OR OpenAI API

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Navigate to API Keys
3. Create a new secret key
4. Save as `OPENAI_API_KEY`

### 4. Set Up Backend (Node.js + Express)

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your values
# See below for required variables
```

#### Backend .env

```env
NODE_ENV=development
PORT=5000

# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/mitra?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_super_secret_jwt_key_at_least_32_chars_long
JWT_EXPIRE=7d

# AI Service
AI_SERVICE_URL=http://localhost:8000

# CORS
CORS_ORIGIN=http://localhost:5173

# Email (optional for MVP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

```bash
# Start the backend
npm run dev

# Should see:
# 🚀 Server running on port 5000
# 📦 MongoDB connected
```

### 5. Set Up Frontend (React + Vite + Tailwind)

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

#### Frontend .env

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

```bash
# Start the frontend
npm run dev

# Should see:
# VITE v5.x.x ready in xxx ms
# ➜ Local: http://localhost:5173/
```

### 6. Set Up AI Service (Python + FastAPI)

```bash
# Navigate to AI service directory
cd ../ai-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
```

#### AI Service .env

```env
GEMINI_API_KEY=your_gemini_api_key
# OR
OPENAI_API_KEY=your_openai_api_key

HOST=0.0.0.0
PORT=8000
```

```bash
# Start the AI service
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Should see:
# INFO: Uvicorn running on http://0.0.0.0:8000
# INFO: Started reloader process
```

---

## 🏃 Running All Services

Open 3 terminal windows:

| Terminal   | Directory     | Command                         |
| ---------- | ------------- | ------------------------------- |
| Terminal 1 | `server/`     | `npm run dev`                   |
| Terminal 2 | `client/`     | `npm run dev`                   |
| Terminal 3 | `ai-service/` | `uvicorn app.main:app --reload` |

### Quick Start Script

Create a `start-dev.bat` (Windows) or `start-dev.sh` (Mac/Linux):

**Windows (`start-dev.bat`)**:

```batch
@echo off
echo Starting Mitra 2.0 Development Environment...

start cmd /k "cd server && npm run dev"
start cmd /k "cd client && npm run dev"
start cmd /k "cd ai-service && venv\Scripts\activate && uvicorn app.main:app --reload"

echo All services started!
```

**Mac/Linux (`start-dev.sh`)**:

```bash
#!/bin/bash
echo "Starting Mitra 2.0 Development Environment..."

# Start backend
cd server && npm run dev &

# Start frontend
cd ../client && npm run dev &

# Start AI service
cd ../ai-service && source venv/bin/activate && uvicorn app.main:app --reload &

echo "All services started!"
wait
```

---

## 📁 Initial Project Creation Commands

If starting from scratch:

### Backend

```bash
mkdir server && cd server
npm init -y

# Core dependencies
npm install express mongoose dotenv cors helmet bcryptjs jsonwebtoken
npm install express-rate-limit express-mongo-sanitize joi socket.io

# Dev dependencies
npm install -D nodemon

# Add to package.json scripts:
# "dev": "nodemon server.js"
# "start": "node server.js"
```

### Frontend

```bash
# Using Vite
npx -y create-vite@latest client -- --template react
cd client
npm install

# Additional dependencies
npm install axios react-router-dom socket.io-client recharts framer-motion react-hook-form
npm install -D tailwindcss @tailwindcss/vite

# Initialize Tailwind
npx tailwindcss init -p
```

### AI Service

```bash
mkdir ai-service && cd ai-service
python -m venv venv
# Activate venv (see above)

pip install fastapi uvicorn transformers torch google-generativeai python-dotenv pydantic textblob nltk
pip freeze > requirements.txt
```

---

## 🧪 Seed Demo Data

```bash
# From server directory
node src/utils/seedData.js

# This will create:
# - 3 demo users (student, counsellor, admin)
# - 50 sample assessments
# - 30 days of mood entries
# - 10 sample appointments
```

---

## 🔍 Verify Everything Works

| Check      | URL                                 | Expected                |
| ---------- | ----------------------------------- | ----------------------- |
| Frontend   | http://localhost:5173               | React app loads         |
| Backend    | http://localhost:5000/api/health    | `{"status": "ok"}`      |
| AI Service | http://localhost:8000/api/ai/health | `{"status": "healthy"}` |
| MongoDB    | Check Atlas dashboard               | Connection active       |

---

## 🐛 Common Issues

| Issue                          | Fix                                             |
| ------------------------------ | ----------------------------------------------- |
| `ECONNREFUSED` on backend      | Check if backend is running, check port         |
| MongoDB connection timeout     | Whitelist IP in Atlas, check URI                |
| CORS error                     | Verify `CORS_ORIGIN` matches frontend URL       |
| AI service model download slow | First run downloads ~500MB model, be patient    |
| JWT error                      | Regenerate `JWT_SECRET`, clear browser storage  |
| `venv` not found               | Install Python 3.11+, use `python -m venv venv` |
| Port already in use            | Kill the process using the port or change port  |

---

## 📚 Useful Commands

```bash
# Check Node version
node --version

# Check Python version
python --version

# Check MongoDB connection
mongosh "your_connection_string"

# Kill process on port (Windows)
netstat -ano | findstr :5000
taskkill /PID <pid> /F

# Kill process on port (Mac/Linux)
lsof -i :5000
kill -9 <pid>
```

---

_Happy building! 🚀_
