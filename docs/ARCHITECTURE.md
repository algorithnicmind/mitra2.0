# 🏗️ System Architecture

> Complete architecture documentation for Mitra 2.0

---

## 📐 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│                                                                  │
│  ┌──────────────────────┐    ┌──────────────────────┐           │
│  │   React.js Web App   │    │  Mobile App (Future)  │           │
│  │   + Tailwind CSS     │    │  React Native/Flutter │           │
│  └──────────┬───────────┘    └──────────┬───────────┘           │
└─────────────┼────────────────────────────┼───────────────────────┘
              │ HTTPS / REST API           │
              ▼                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                       API GATEWAY LAYER                          │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Node.js + Express.js Server                  │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │  Auth      │  Routes     │  Middleware   │  Validators   │   │
│  │  (JWT)     │  (REST)     │  (CORS, etc) │  (Joi/Zod)   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                          │                                       │
│              ┌───────────┼───────────┐                          │
│              ▼           ▼           ▼                          │
│  ┌──────────────┐ ┌──────────┐ ┌──────────────┐               │
│  │  Socket.io   │ │  Multer  │ │  Rate Limiter │               │
│  │  (Real-time) │ │  (Files) │ │  (Security)   │               │
│  └──────────────┘ └──────────┘ └──────────────┘               │
└─────────────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                 │
│                                                                  │
│  ┌──────────────────────┐    ┌──────────────────────┐           │
│  │    MongoDB Atlas      │    │    Redis (Cache)     │           │
│  │    (Primary DB)       │    │    (Sessions/Cache)  │           │
│  └──────────────────────┘    └──────────────────────┘           │
└─────────────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       AI SERVICE LAYER                           │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │            Python + FastAPI Microservice                   │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │  Emotion    │  Risk       │  Chatbot    │  Toxicity     │   │
│  │  Detection  │  Scoring    │  Engine     │  Filter       │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Models: HuggingFace Transformers / LLM API (Gemini/OpenAI)    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🧩 Tech Stack

### Frontend

| Technology          | Purpose          | Version |
| ------------------- | ---------------- | ------- |
| React.js            | UI framework     | 18.x    |
| Tailwind CSS        | Styling          | 3.x     |
| React Router        | Navigation       | 6.x     |
| Axios               | HTTP client      | 1.x     |
| Socket.io Client    | Real-time chat   | 4.x     |
| Chart.js / Recharts | Dashboard charts | Latest  |
| React Hook Form     | Form handling    | 7.x     |
| Framer Motion       | Animations       | Latest  |

### Backend

| Technology         | Purpose                 | Version  |
| ------------------ | ----------------------- | -------- |
| Node.js            | Runtime                 | 20.x LTS |
| Express.js         | Web framework           | 4.x      |
| Mongoose           | MongoDB ODM             | 8.x      |
| JWT (jsonwebtoken) | Authentication          | 9.x      |
| bcryptjs           | Password hashing        | 2.x      |
| Socket.io          | Real-time communication | 4.x      |
| Joi / Zod          | Input validation        | Latest   |
| Helmet             | Security headers        | Latest   |
| cors               | Cross-origin            | Latest   |
| express-rate-limit | Rate limiting           | Latest   |
| nodemailer         | Email notifications     | Latest   |

### Database

| Technology    | Purpose                            |
| ------------- | ---------------------------------- |
| MongoDB Atlas | Primary database (cloud)           |
| Redis         | Session caching (optional for MVP) |

### AI Service

| Technology               | Purpose                   |
| ------------------------ | ------------------------- |
| Python 3.11+             | Runtime                   |
| FastAPI                  | API framework             |
| HuggingFace Transformers | NLP models                |
| DistilBERT / BERT        | Emotion classification    |
| Gemini API / OpenAI API  | LLM for chat responses    |
| TextBlob / NLTK          | Sentiment analysis backup |

### DevOps & Hosting

| Technology        | Purpose          |
| ----------------- | ---------------- |
| Vercel            | Frontend hosting |
| Render            | Backend hosting  |
| MongoDB Atlas     | Database hosting |
| GitHub Actions    | CI/CD            |
| Docker (optional) | Containerization |

---

## 📁 Project Folder Structure

```
mitra2.0/
├── docs/                          # Documentation (this folder)
│
├── client/                        # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   └── assets/
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   │   ├── common/            # Button, Input, Modal, Card
│   │   │   ├── chat/              # AI Chat components
│   │   │   ├── screening/         # Assessment components
│   │   │   ├── booking/           # Counsellor booking components
│   │   │   ├── resources/         # Resource hub components
│   │   │   ├── community/         # Forum components
│   │   │   ├── dashboard/         # Admin dashboard components
│   │   │   ├── mood/              # Mood tracker components
│   │   │   └── layout/            # Header, Footer, Sidebar
│   │   ├── pages/                 # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   ├── ScreeningPage.jsx
│   │   │   ├── BookingPage.jsx
│   │   │   ├── ResourcesPage.jsx
│   │   │   ├── CommunityPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── MoodTrackerPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── context/               # React Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks/                 # Custom hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useChat.js
│   │   │   └── useScreening.js
│   │   ├── services/              # API service functions
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── chatService.js
│   │   │   ├── screeningService.js
│   │   │   ├── bookingService.js
│   │   │   └── adminService.js
│   │   ├── utils/                 # Utility functions
│   │   │   ├── constants.js
│   │   │   ├── helpers.js
│   │   │   └── validators.js
│   │   ├── styles/                # Global styles
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                        # Node.js Backend
│   ├── src/
│   │   ├── config/                # Configuration
│   │   │   ├── db.js              # MongoDB connection
│   │   │   ├── env.js             # Environment variables
│   │   │   └── socket.js          # Socket.io setup
│   │   ├── models/                # Mongoose schemas
│   │   │   ├── User.js
│   │   │   ├── Assessment.js
│   │   │   ├── ChatMessage.js
│   │   │   ├── Appointment.js
│   │   │   ├── Resource.js
│   │   │   ├── ForumPost.js
│   │   │   ├── ForumComment.js
│   │   │   └── MoodEntry.js
│   │   ├── routes/                # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── chatRoutes.js
│   │   │   ├── screeningRoutes.js
│   │   │   ├── bookingRoutes.js
│   │   │   ├── resourceRoutes.js
│   │   │   ├── communityRoutes.js
│   │   │   ├── moodRoutes.js
│   │   │   └── adminRoutes.js
│   │   ├── controllers/           # Route handlers
│   │   │   ├── authController.js
│   │   │   ├── chatController.js
│   │   │   ├── screeningController.js
│   │   │   ├── bookingController.js
│   │   │   ├── resourceController.js
│   │   │   ├── communityController.js
│   │   │   ├── moodController.js
│   │   │   └── adminController.js
│   │   ├── middleware/            # Express middleware
│   │   │   ├── auth.js            # JWT verification
│   │   │   ├── roleCheck.js       # Role-based access
│   │   │   ├── errorHandler.js    # Global error handler
│   │   │   ├── rateLimiter.js     # Rate limiting
│   │   │   └── validator.js       # Input validation
│   │   ├── services/              # Business logic
│   │   │   ├── aiService.js       # AI microservice bridge
│   │   │   ├── emailService.js    # Email notifications
│   │   │   └── analyticsService.js # Dashboard analytics
│   │   └── utils/                 # Utilities
│   │       ├── logger.js
│   │       ├── constants.js
│   │       └── helpers.js
│   ├── server.js                  # Entry point
│   ├── .env.example
│   └── package.json
│
├── ai-service/                    # Python AI Microservice
│   ├── app/
│   │   ├── main.py                # FastAPI entry point
│   │   ├── models/                # AI model definitions
│   │   │   ├── emotion_detector.py
│   │   │   ├── risk_scorer.py
│   │   │   ├── chatbot_engine.py
│   │   │   └── toxicity_filter.py
│   │   ├── routes/                # API routes
│   │   │   ├── chat_routes.py
│   │   │   ├── emotion_routes.py
│   │   │   └── moderation_routes.py
│   │   ├── services/              # Service logic
│   │   │   ├── llm_service.py
│   │   │   └── model_service.py
│   │   └── utils/
│   │       ├── config.py
│   │       └── prompts.py         # LLM prompt templates
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
├── .gitignore
├── LICENSE
└── README.md                      # Project root README
```

---

## 🔄 Data Flow Diagrams

### Authentication Flow

```
┌──────────┐     POST /api/auth/register      ┌──────────┐
│  Client   │ ──────────────────────────────→  │  Server   │
│  (React)  │                                  │ (Express) │
│           │  ← ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │           │
│           │     { token, user }               │           │
└──────────┘                                   └─────┬─────┘
                                                     │
                                                     ▼
                                               ┌──────────┐
                                               │  MongoDB  │
                                               │  (Users)  │
                                               └──────────┘
```

### AI Chat Flow

```
┌──────────┐  User Message   ┌──────────┐  Forward msg    ┌──────────┐
│  Client   │ ─────────────→ │  Backend  │ ─────────────→ │ AI Svc   │
│  (React)  │                │ (Node.js) │                │ (Python) │
│           │                │           │                │          │
│           │ ← ─ ─ ─ ─ ─ ─ │           │ ← ─ ─ ─ ─ ─  │          │
│           │  AI Response   │           │  {emotion,     │          │
│           │  + Emotion     │           │   risk_score,  │          │
│           │                │           │   response}    │          │
└──────────┘                └─────┬─────┘                └──────────┘
                                  │
                                  ▼
                            ┌──────────┐
                            │  MongoDB  │
                            │  (Chats)  │
                            └──────────┘
```

### Screening Flow

```
Student takes PHQ-9
        │
        ▼
Answers submitted to backend
        │
        ▼
Backend calculates score
        │
        ├── Score 0-4:   Minimal    → Self-help resources
        ├── Score 5-9:   Mild       → Tips + optional counselling
        ├── Score 10-14: Moderate   → Recommend counselling
        ├── Score 15-19: Mod.Severe → Urge counselling + notify
        └── Score 20-27: Severe     → ⚠️ Emergency protocol
```

---

## 🔐 Authentication Architecture

```
┌─────────────────────────────────────────┐
│           JWT Authentication            │
├─────────────────────────────────────────┤
│                                         │
│  Register → Hash Password (bcrypt)      │
│          → Save to MongoDB              │
│          → Generate JWT                 │
│          → Return token                 │
│                                         │
│  Login   → Validate credentials         │
│          → Compare hash                 │
│          → Generate JWT                 │
│          → Return token                 │
│                                         │
│  Protected Routes:                      │
│     Request → JWT in header             │
│            → Verify token               │
│            → Extract user               │
│            → Check role                 │
│            → Process request            │
│                                         │
│  Roles: student | counsellor | admin    │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🔌 Inter-Service Communication

| From       | To            | Protocol   | Purpose                    |
| ---------- | ------------- | ---------- | -------------------------- |
| Client     | Backend       | HTTPS REST | All API calls              |
| Client     | Backend       | WebSocket  | Real-time chat             |
| Backend    | MongoDB       | Mongoose   | Data persistence           |
| Backend    | AI Service    | HTTP REST  | Emotion detection, chatbot |
| Backend    | Email Service | SMTP       | Notification emails        |
| AI Service | LLM API       | HTTPS      | Chat generation            |
| AI Service | HuggingFace   | Local/API  | Model inference            |

---

## ⚡ Environment Variables

### Backend (.env)

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
AI_SERVICE_URL=http://localhost:8000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASS=your_password
CORS_ORIGIN=http://localhost:5173
```

### AI Service (.env)

```env
GEMINI_API_KEY=your_key
OPENAI_API_KEY=your_key
MODEL_NAME=distilbert-base-uncased
HOST=0.0.0.0
PORT=8000
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

---

_See [API_REFERENCE.md](./API_REFERENCE.md) for complete endpoint documentation._
