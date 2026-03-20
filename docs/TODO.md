# ✅ Mitra 2.0 — Project TODO & Progress Tracker

> Last Updated: 2026-03-07 11:18 AM | Status: 🚧 In Progress

---

## 📊 Overall Progress

| Section                  | Status         | Progress |
| ------------------------ | -------------- | -------- |
| 📄 Documentation         | ✅ Done        | 100%     |
| 🏗️ Backend Foundation    | ✅ Done        | 100%     |
| 🎨 Frontend Foundation   | ⬜ Not Started | 0%       |
| 🤖 AI Service            | ⬜ Not Started | 0%       |
| 🔐 Auth System (Backend) | ✅ Done        | 100%     |
| 💬 AI Chatbot            | ⬜ Not Started | 0%       |
| 📋 PHQ-9 Screening       | ⬜ Not Started | 0%       |
| 📅 Counsellor Booking    | ⬜ Not Started | 0%       |
| 📊 Admin Dashboard       | ⬜ Not Started | 0%       |
| ✨ Polish & Deploy       | ⬜ Not Started | 0%       |

---

## 📝 Detailed Task Breakdown

### Section 1: Backend Foundation 🏗️

> Express.js server, MongoDB connection, middleware, project structure

- [x] Initialize Node.js project (`npm init`)
- [x] Install core dependencies (express, mongoose, dotenv, cors, helmet, etc.)
- [x] Create folder structure (`src/config`, `src/models`, `src/routes`, `src/controllers`, `src/middleware`, `src/utils`)
- [x] Create `server.js` entry point
- [x] Create MongoDB connection config (`src/config/db.js`)
- [x] Create environment config (`src/config/env.js`)
- [x] Create `.env.example` file
- [x] Set up global error handler middleware
- [x] Set up rate limiter middleware
- [x] Set up CORS, Helmet, JSON parser
- [x] Create health check endpoint
- [x] Test server starts successfully
- [x] Create User model (with bcrypt + JWT)
- [x] Create auth controller (register, login, getMe, updateProfile, changePassword)
- [x] Create auth routes with validation
- [x] Create Joi validation schemas (all modules)
- [x] Create utility helpers (asyncHandler, AppError, anonymousAlias)
- [x] Create app-wide constants
- [x] Create `.gitignore`

**🔍 Review Point**: Server runs, auth system complete ✅ DONE

---

### Section 2: Database Models 🗄️

> All Mongoose schemas

- [x] User model
- [x] Assessment model
- [x] ChatMessage model
- [x] Appointment model
- [x] MoodEntry model
- [x] ForumPost model
- [ ] ForumComment model
- [ ] Resource model

**🔍 Review Point**: All models validate correctly ✅

---

### Section 3: Authentication System 🔐

> Register, Login, JWT, Role-based access

**Backend:**

- [ ] Auth controller (register, login, getMe, updateProfile)
- [ ] Auth routes
- [ ] JWT middleware (`auth.js`)
- [ ] Role check middleware (`roleCheck.js`)
- [ ] Input validation (Joi schemas)
- [ ] Password hashing (bcrypt)
- [ ] Anonymous alias generator

**Frontend:**

- [ ] Login page
- [ ] Register page
- [ ] AuthContext provider
- [ ] Protected route component
- [ ] API service setup (axios)
- [ ] Auth service (login, register, getMe)

**🔍 Review Point**: Can register, login, and access protected routes ✅

---

### Section 4: Frontend Foundation 🎨

> React + Vite + Tailwind setup, layout, design system

- [ ] Initialize React project with Vite
- [ ] Configure Tailwind CSS
- [ ] Set up project structure (components, pages, services, hooks, context)
- [ ] Create design system (CSS variables, global styles)
- [ ] Build Layout component (Header + navigation)
- [ ] Build common components (Button, Card, Input, Modal)
- [ ] Set up React Router with all routes
- [ ] Create Home page
- [ ] Dark mode toggle
- [ ] Responsive navigation

**🔍 Review Point**: App loads with beautiful layout and navigation ✅

---

### Section 5: AI Chat System 💬

> AI-powered mental health chatbot

**Backend:**

- [ ] Chat routes and controller
- [ ] AI service bridge (connect to Python service OR Gemini API)
- [ ] Emotion detection integration
- [ ] Risk score calculation
- [ ] Crisis detection logic
- [ ] Chat session management
- [ ] Save messages to MongoDB

**AI Service (Python):**

- [ ] FastAPI project setup
- [ ] Emotion detection endpoint
- [ ] Risk scoring endpoint
- [ ] Chatbot response generation
- [ ] Toxicity filter endpoint

**Frontend:**

- [ ] Chat page layout
- [ ] Message bubbles (user + AI)
- [ ] Chat input with send button
- [ ] Emotion tag display
- [ ] Typing indicator
- [ ] Chat history
- [ ] Crisis detection overlay

**🔍 Review Point**: Can chat with AI and see emotion tags ✅

---

### Section 6: PHQ-9 Screening 📋

> Depression screening with scoring and recommendations

**Backend:**

- [ ] Screening routes and controller
- [ ] PHQ-9 questions data
- [ ] Score calculation engine
- [ ] Severity mapping
- [ ] Recommendations generator
- [ ] Assessment history endpoint

**Frontend:**

- [ ] Screening selection page (PHQ-9, GAD-7)
- [ ] Question-by-question UI with progress bar
- [ ] Results page with gauge/meter
- [ ] Severity display with color coding
- [ ] Recommendations list
- [ ] "Book Counsellor" CTA
- [ ] Assessment history page

**🔍 Review Point**: Complete PHQ-9 flow with scoring ✅

---

### Section 7: Counsellor Booking 📅

> Appointment scheduling system

**Backend:**

- [ ] Booking routes and controller
- [ ] Counsellor listing with availability
- [ ] Time slot booking logic
- [ ] Appointment status management (pending → confirmed → completed)
- [ ] Cancel/reschedule logic

**Frontend:**

- [ ] Counsellor listing page with cards
- [ ] Available time slot selector
- [ ] Booking form with anonymous option
- [ ] Appointment confirmation
- [ ] My Appointments page (student)
- [ ] Manage Appointments page (counsellor)

**🔍 Review Point**: Can browse counsellors and book appointment ✅

---

### Section 8: Admin Dashboard 📊

> Analytics and insights for administration

**Backend:**

- [ ] Admin routes and controller
- [ ] Overview stats aggregation
- [ ] Stress trends aggregation
- [ ] Severity distribution aggregation
- [ ] Counselling demand metrics

**Frontend:**

- [ ] Dashboard layout with sidebar
- [ ] Overview stat cards
- [ ] Stress trends line chart
- [ ] Severity distribution donut chart
- [ ] Mood distribution chart
- [ ] Date range filter
- [ ] Department filter

**🔍 Review Point**: Dashboard shows meaningful analytics ✅

---

### Section 9: Polish & Extras ✨

> UI polish, bonus features, deployment

- [ ] Mood tracker (basic version)
- [ ] Resource hub (pre-loaded content)
- [ ] Mobile responsiveness
- [ ] Dark mode support
- [ ] Animations and transitions
- [ ] Loading states and error handling
- [ ] Favicon and meta tags
- [ ] Seed demo data script
- [ ] Deploy frontend (Vercel)
- [ ] Deploy backend (Render)
- [ ] Deploy AI service (Render)
- [ ] End-to-end testing
- [ ] README.md for root project

**🔍 Review Point**: Polished, deployed, demo-ready ✅

---

## 📌 Current Focus

> **🏗️ Section 1: Backend Foundation** — ✅ COMPLETE — Awaiting Review

---

## 📝 Review History

| Date       | Section            | Status      | Notes                                           |
| ---------- | ------------------ | ----------- | ----------------------------------------------- |
| 2026-03-07 | Documentation      | ✅ Approved | 14 docs created                                 |
| 2026-03-07 | Backend Foundation | 🔍 Review   | Server + Auth backend complete, awaiting review |

---

_Updated as the project progresses._
