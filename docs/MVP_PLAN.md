# 🚀 MVP Plan — Hackathon Sprint

> Build plan for the Minimum Viable Product of Mitra 2.0

---

## 🎯 MVP Scope

Build these **5 core features** for the hackathon:

| #   | Feature                       | Priority    | Estimated Time |
| --- | ----------------------------- | ----------- | -------------- |
| 1   | Student Auth (Register/Login) | 🔴 Critical | 3-4 hours      |
| 2   | AI Chatbot                    | 🔴 Critical | 5-6 hours      |
| 3   | PHQ-9 Screening Test          | 🔴 Critical | 3-4 hours      |
| 4   | Counsellor Booking            | 🔴 Critical | 4-5 hours      |
| 5   | Admin Dashboard               | 🔴 Critical | 4-5 hours      |

**Total Estimated Time: ~20-24 hours of focused development**

---

## 📅 Sprint Plan (48-hour Hackathon)

### Phase 1: Foundation (Hours 0-6)

#### Backend Setup (3 hours)

- [ ] Initialize Node.js project with Express
- [ ] Configure MongoDB connection
- [ ] Set up environment variables
- [ ] Configure CORS, Helmet, rate limiting
- [ ] Create User model and auth routes
- [ ] Implement JWT authentication middleware
- [ ] Test auth endpoints with Postman/Thunder Client

#### Frontend Setup (3 hours)

- [ ] Initialize React project with Vite + Tailwind
- [ ] Set up project structure (pages, components, services)
- [ ] Create design system (colors, fonts, base components)
- [ ] Build Layout component (Header, Footer, Navigation)
- [ ] Create Login and Register pages
- [ ] Implement AuthContext and protected routes
- [ ] Connect to backend auth API

**Deliverable**: Working authentication system ✅

---

### Phase 2: Core Features (Hours 6-18)

#### AI Chatbot (5-6 hours)

**Backend (2 hours)**

- [ ] Create ChatMessage model
- [ ] Create chat routes and controller
- [ ] Set up AI service integration (Gemini API)
- [ ] Implement emotion detection (HuggingFace or API)
- [ ] Implement risk score calculation
- [ ] Add crisis detection logic

**Frontend (3-4 hours)**

- [ ] Build chat interface (message bubbles, input)
- [ ] Implement real-time message flow
- [ ] Show emotion tags on messages
- [ ] Build typing indicator
- [ ] Create crisis detection overlay
- [ ] Add chat history sidebar

**Deliverable**: Working AI chatbot with emotion detection ✅

#### PHQ-9 Screening (3-4 hours)

**Backend (1.5 hours)**

- [ ] Create Assessment model
- [ ] Create screening routes and controller
- [ ] Implement PHQ-9 scoring engine
- [ ] Add recommendations generator
- [ ] Store assessment results

**Frontend (2-2.5 hours)**

- [ ] Build questionnaire component (one question per screen)
- [ ] Add progress bar
- [ ] Create result display page with gauge/meter
- [ ] Show severity level and recommendations
- [ ] Add "Book Counsellor" CTA for moderate+ results
- [ ] Assessment history page

**Deliverable**: Working PHQ-9 screening with scoring ✅

---

### Phase 3: Booking & Dashboard (Hours 18-30)

#### Counsellor Booking (4-5 hours)

**Backend (2 hours)**

- [ ] Create Appointment model
- [ ] Create booking routes and controller
- [ ] Add counsellor listing with availability
- [ ] Implement time slot booking logic
- [ ] Add appointment status management

**Frontend (2-3 hours)**

- [ ] Counsellor listing page with cards
- [ ] Calendar/date picker for available slots
- [ ] Booking form with anonymous option
- [ ] Appointment confirmation page
- [ ] My Appointments page (student view)
- [ ] Manage Appointments page (counsellor view)

**Deliverable**: Working booking system ✅

#### Admin Dashboard (4-5 hours)

**Backend (2 hours)**

- [ ] Create admin routes and controller
- [ ] Implement analytics aggregation queries
- [ ] Add overview stats endpoint
- [ ] Add trends endpoint
- [ ] Add severity distribution endpoint

**Frontend (2-3 hours)**

- [ ] Dashboard layout with sidebar
- [ ] Overview stat cards (total users, assessments, etc.)
- [ ] Stress trends line chart
- [ ] Severity distribution donut chart
- [ ] Mood distribution bar chart
- [ ] Date range filter

**Deliverable**: Working admin dashboard ✅

---

### Phase 4: Polish & Demo (Hours 30-48)

#### Integration & Bug Fixes (6 hours)

- [ ] End-to-end testing of all features
- [ ] Fix bugs and edge cases
- [ ] Handle loading and error states
- [ ] Add empty states for no data
- [ ] Mobile responsiveness check
- [ ] Dark mode support

#### UI Polish (4 hours)

- [ ] Add animations and transitions
- [ ] Improve typography and spacing
- [ ] Add hover effects
- [ ] Polish chat interface
- [ ] Add favicon and meta tags
- [ ] Create landing page / onboarding

#### Demo Preparation (4 hours)

- [ ] Seed demo data
- [ ] Create demo user accounts (student, counsellor, admin)
- [ ] Prepare demo flow script
- [ ] Deploy to Vercel + Render
- [ ] Test deployed version
- [ ] Prepare presentation slides

#### Bonus Features (if time permits)

- [ ] Mood tracker (simple version)
- [ ] Resource hub (pre-loaded articles)
- [ ] Peer forum (basic version)
- [ ] GAD-7 screening
- [ ] Smart notifications

**Deliverable**: Polished, deployed MVP ready for demo 🎉

---

## 👥 Team Task Division (4-person team)

| Person       | Role              | Responsibilities                                            |
| ------------ | ----------------- | ----------------------------------------------------------- |
| **Person 1** | Backend Lead      | Express setup, auth, models, API routes, database           |
| **Person 2** | Frontend Lead     | React setup, pages, components, routing, design system      |
| **Person 3** | AI Engineer       | Python AI service, chatbot, emotion detection, risk scoring |
| **Person 4** | Full Stack + Demo | Booking system, admin dashboard, deployment, demo prep      |

### Parallel Work Plan

```
Hour 0-6:
  P1: Backend setup + auth
  P2: Frontend setup + auth pages
  P3: AI service setup + emotion model
  P4: Database design + seed data

Hour 6-18:
  P1: Chat + Screening APIs
  P2: Chat + Screening UI
  P3: Chatbot engine + risk scoring
  P4: Booking API + counsellor UI

Hour 18-30:
  P1: Admin dashboard API
  P2: Admin dashboard UI
  P3: Toxicity filter + AI polish
  P4: Booking UI + integration

Hour 30-48:
  ALL: Integration, testing, polish, deployment, demo
```

---

## 📦 Demo Data Seeds

Create a seeding script with:

### Users

```javascript
const demoUsers = [
  {
    name: "Demo Student",
    email: "student@demo.com",
    role: "student",
    password: "demo123",
  },
  {
    name: "Dr. Priya Mehta",
    email: "counsellor@demo.com",
    role: "counsellor",
    password: "demo123",
  },
  {
    name: "Admin User",
    email: "admin@demo.com",
    role: "admin",
    password: "demo123",
  },
];
```

### Sample Assessments

```javascript
// Pre-populate 50+ assessment results across different severities
// To show meaningful analytics in the dashboard
```

### Sample Mood Entries

```javascript
// Pre-populate 30 days of mood data for 10+ users
// To show mood trends in the dashboard
```

---

## ✅ MVP Acceptance Criteria

| Feature   | Must Work                                                    |
| --------- | ------------------------------------------------------------ |
| Auth      | Register, login, JWT, role-based access                      |
| Chat      | Send message, get AI response, emotion tag, crisis detection |
| Screening | PHQ-9 questions, scoring, severity, recommendations          |
| Booking   | View counsellors, book appointment, view appointments        |
| Dashboard | Overview stats, at least 2 charts, date filter               |

---

## 🏆 Demo Script (5-minute pitch)

1. **Problem Statement** (30 sec) — Stats on student mental health crisis
2. **Solution Overview** (30 sec) — Introduce Mitra 2.0
3. **Live Demo** (3 min):
   - Register as student
   - Chat with AI → show emotion detection
   - Take PHQ-9 → show scoring
   - Book counsellor
   - Switch to admin → show dashboard
4. **Tech Stack** (30 sec)
5. **Impact & Future** (30 sec)

---

_Let's build something that matters! 💙_
