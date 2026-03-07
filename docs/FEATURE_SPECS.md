# 📦 Feature Specifications

> Detailed feature specs for every module in Mitra 2.0

---

## Module 1: AI Mental Health Chat Assistant

### Description

An AI-powered conversational chatbot that provides first-level emotional support, detects mood, and suggests coping strategies.

### User Stories

| #   | As a... | I want to...                    | So that...                                     |
| --- | ------- | ------------------------------- | ---------------------------------------------- |
| 1   | Student | Chat with an AI assistant       | I can express how I'm feeling without judgment |
| 2   | Student | Get coping strategy suggestions | I can manage stress in the moment              |
| 3   | Student | Have my emotions detected       | The AI can respond empathetically              |
| 4   | Student | Be referred to a counsellor     | I get professional help when I need it         |
| 5   | System  | Detect crisis signals           | At-risk students are identified immediately    |

### Functional Requirements

- [ ] Real-time chat interface with message bubbles
- [ ] AI processes message and returns response within 3 seconds
- [ ] Emotion detection displayed as emoji/tag on each message
- [ ] Session management (new session, continue session)
- [ ] Chat history accessible from profile
- [ ] Crisis detection triggers emergency resources banner
- [ ] Typing indicator for AI responses
- [ ] "Talk to a counsellor" quick action button
- [ ] Rate AI response (helpful/not helpful)

### Technical Notes

- WebSocket for real-time chat (Socket.io)
- Fallback to REST API if WebSocket fails
- Messages stored in MongoDB
- AI processing via Python microservice
- 10-message context window for conversation

---

## Module 2: Psychological Screening System

### Description

Validated mental health screening questionnaires (PHQ-9, GAD-7, GHQ-12) with scoring, severity assessment, and personalized recommendations.

### User Stories

| #   | As a...    | I want to...                     | So that...                   |
| --- | ---------- | -------------------------------- | ---------------------------- |
| 1   | Student    | Take a depression screening test | I understand my mental state |
| 2   | Student    | See my score and severity        | I know if I need help        |
| 3   | Student    | Get personalized recommendations | I can take action            |
| 4   | Student    | View my assessment history       | I can track progress         |
| 5   | Counsellor | See student assessment results   | I can prepare for sessions   |

### Functional Requirements

- [ ] Three screening tools: PHQ-9, GAD-7, GHQ-12
- [ ] One question per screen (mobile-friendly)
- [ ] Progress bar showing completion
- [ ] Score calculation with severity mapping
- [ ] Visual result display (gauge/meter)
- [ ] Personalized recommendations list
- [ ] "Book Counsellor" CTA on moderate+ results
- [ ] Assessment history with trend charts
- [ ] Anonymous assessment option
- [ ] Question 9 (PHQ-9) crisis trigger

---

## Module 3: Confidential Counsellor Booking

### Description

Anonymous appointment scheduling system connecting students with campus counsellors.

### User Stories

| #   | As a...    | I want to...                 | So that...                 |
| --- | ---------- | ---------------------------- | -------------------------- |
| 1   | Student    | Browse available counsellors | I can find the right fit   |
| 2   | Student    | Book anonymously             | I feel safe accessing help |
| 3   | Student    | Choose a time slot           | It fits my schedule        |
| 4   | Student    | Get appointment reminders    | I don't miss my session    |
| 5   | Counsellor | Manage my schedule           | I can see my bookings      |
| 6   | Counsellor | Update appointment status    | I can track sessions       |

### Functional Requirements

- [ ] Counsellor listing with specializations and ratings
- [ ] Calendar view for available time slots
- [ ] Online/in-person appointment type selection
- [ ] Anonymous booking toggle
- [ ] Appointment confirmation with details
- [ ] Email/push notification reminders (24h and 1h before)
- [ ] Cancel/reschedule functionality
- [ ] Meeting link generation for online sessions
- [ ] Counsellor notes (private, after session)
- [ ] Follow-up appointment suggestion

### Booking Flow

```
Browse Counsellors → Select Counsellor → Choose Date → Choose Time Slot
    → Select Type (Online/In-Person) → Add Reason (Optional) → Confirm
    → Notification Sent → Counsellor Confirms → Student Notified
```

---

## Module 4: Psychoeducational Resource Hub

### Description

Curated library of mental health education content including articles, videos, guided exercises, and self-help worksheets.

### User Stories

| #   | As a...          | I want to...                   | So that...                          |
| --- | ---------------- | ------------------------------ | ----------------------------------- |
| 1   | Student          | Browse mental health articles  | I can learn about my condition      |
| 2   | Student          | Watch guided meditation videos | I can practice relaxation           |
| 3   | Student          | Download self-help worksheets  | I can work on myself                |
| 4   | Student          | Filter by language             | I can access content in my language |
| 5   | Admin/Counsellor | Add new resources              | The library stays updated           |

### Content Categories

| Category             | Content Types                                 |
| -------------------- | --------------------------------------------- |
| Exam Stress          | Articles, breathing exercises, study planners |
| Sleep Improvement    | Sleep hygiene guides, meditation audio        |
| Depression Awareness | Info articles, self-help worksheets           |
| Anxiety Coping       | CBT worksheets, grounding techniques          |
| Time Management      | Planners, Pomodoro guides                     |
| Meditation           | Guided audio, video walkthroughs              |
| Self-Care            | Daily routines, journaling prompts            |

### Functional Requirements

- [ ] Category-based browsing with icons
- [ ] Search functionality
- [ ] Content type filter (article, video, audio, guide)
- [ ] Language filter (English, Hindi, Odia)
- [ ] Resource cards with preview/thumbnail
- [ ] View count and rating display
- [ ] Save/bookmark resources
- [ ] "Related resources" suggestions
- [ ] Admin panel for content management

---

## Module 5: Peer Support Community

### Description

Anonymous, moderated forum where students can share experiences, seek peer support, and connect with trained volunteers.

### User Stories

| #   | As a...   | I want to...                        | So that...                  |
| --- | --------- | ----------------------------------- | --------------------------- |
| 1   | Student   | Post anonymously about my struggles | I can talk without fear     |
| 2   | Student   | Read others' experiences            | I feel less alone           |
| 3   | Volunteer | Reply to students seeking help      | I can offer peer support    |
| 4   | Admin     | Monitor posts for harmful content   | Community stays safe        |
| 5   | Student   | Report inappropriate content        | Toxic behavior is addressed |

### Forum Categories

- 🎯 Exam Stress
- 💙 Loneliness
- 🏠 Homesickness
- 💼 Career Anxiety
- 😔 Depression
- 😰 Anxiety
- 😴 Sleep Issues
- ❤️ Relationships
- 🧘 Self-Care Tips
- 🌟 Success Stories
- 💬 General Discussion

### Functional Requirements

- [ ] Post creation with anonymous toggle
- [ ] Category tagging
- [ ] Like/support button
- [ ] Comment system (also anonymous)
- [ ] AI toxicity filter (auto-flag toxic content)
- [ ] Report button with reason
- [ ] Admin moderation panel
- [ ] Sort: Recent, Popular, Most Commented
- [ ] Search within posts
- [ ] Pinned posts (by admin)

### Moderation Workflow

```
Post Created → AI Toxicity Check → Score > 0.7?
    → YES: Auto-hide + Notify Admin
    → NO: Published

User Reports Post → Added to Admin Queue → Admin Reviews
    → Dismiss / Warn Author / Hide Post / Ban User
```

---

## Module 6: Admin Analytics Dashboard

### Description

Data visualization dashboard for college administration to understand campus mental health trends and plan interventions.

### User Stories

| #   | As a... | I want to...                       | So that...                       |
| --- | ------- | ---------------------------------- | -------------------------------- |
| 1   | Admin   | View overall mental health metrics | I understand campus wellness     |
| 2   | Admin   | See trends over time               | I can identify worsening periods |
| 3   | Admin   | View peak stress periods           | I can plan workshops             |
| 4   | Admin   | See counselling demand             | I can allocate resources         |
| 5   | Admin   | Generate reports                   | I can share with stakeholders    |

### Dashboard Widgets

| Widget                | Data                                   | Chart Type     |
| --------------------- | -------------------------------------- | -------------- |
| Overview Cards        | Total users, assessments, appointments | Number cards   |
| Stress Trends         | PHQ-9 average scores by month          | Line chart     |
| Anxiety Trends        | GAD-7 average scores by month          | Line chart     |
| Severity Distribution | Minimal/Mild/Moderate/Severe           | Donut chart    |
| Mood Distribution     | Happy/Neutral/Sad/Anxious              | Bar chart      |
| Peak Stress Periods   | Scores correlated with calendar        | Heatmap        |
| Counselling Demand    | Appointments by week                   | Bar chart      |
| Department Comparison | Scores by department                   | Grouped bar    |
| Top Triggers          | Most common mood triggers              | Horizontal bar |
| Active Users          | Daily/weekly active users              | Line chart     |

### Functional Requirements

- [ ] Role-based access (admin only)
- [ ] Overview cards with key metrics
- [ ] Interactive charts (Chart.js/Recharts)
- [ ] Date range filter
- [ ] Department/year filter
- [ ] Export to PDF/CSV
- [ ] All data anonymized (no PII)
- [ ] Real-time updates
- [ ] Comparison toggle (this month vs. last month)

---

## Module 7: Mood Tracker

### Description

Daily mood logging tool with trend visualization and AI-generated insights.

### User Stories

| #   | As a... | I want to...              | So that...               |
| --- | ------- | ------------------------- | ------------------------ |
| 1   | Student | Log my daily mood         | I can track patterns     |
| 2   | Student | See mood trends over time | I understand my patterns |
| 3   | Student | Get AI insights           | I discover triggers      |
| 4   | Student | Log activities and sleep  | I see correlations       |

### Mood Options

| Emoji | Mood       | Score |
| ----- | ---------- | ----- |
| 😊    | Very Happy | 5     |
| 🙂    | Happy      | 4     |
| 😐    | Neutral    | 3     |
| ☹️    | Sad        | 2     |
| 😢    | Very Sad   | 1     |
| 😰    | Anxious    | 2     |
| 😡    | Angry      | 2     |
| 😫    | Stressed   | 2     |

### Functional Requirements

- [ ] One-tap mood selection
- [ ] Optional: note, activities, sleep hours, stress level, triggers
- [ ] Calendar view showing daily moods
- [ ] Weekly and monthly trend charts
- [ ] Average mood score display
- [ ] AI-generated insights ("Your mood drops on Mondays")
- [ ] Smart notifications ("You've been stressed for 3 days")
- [ ] Streak counter for consistent logging

---

## Module 8: Emergency Crisis System

### Description

Automatic detection and response system for mental health emergencies.

### Triggers

| Trigger           | Source      | Action                        |
| ----------------- | ----------- | ----------------------------- |
| PHQ-9 Q9 ≥ 1      | Screening   | Show crisis resources         |
| Risk score ≥ 7    | AI Chat     | Show helpline banner          |
| Crisis keywords   | Chat/Forum  | Immediate intervention screen |
| Severe assessment | PHQ-9/GAD-7 | Urgent counsellor referral    |

### Emergency Resources (India)

| Resource              | Number         | Hours             |
| --------------------- | -------------- | ----------------- |
| Vandrevala Foundation | 1860-2662-345  | 24/7              |
| iCall                 | 9152987821     | Mon-Sat, 8am-10pm |
| AASRA                 | 91-22-27546669 | 24/7              |
| Snehi                 | 044-24640050   | 24/7              |
| Campus Counsellor     | Dynamic        | University hours  |

### Crisis Screen Design

When crisis is detected, show a full-screen overlay:

```
┌──────────────────────────────────┐
│                                  │
│  💙 You're Not Alone            │
│                                  │
│  We noticed you might be going   │
│  through a tough time. Help is   │
│  available right now.            │
│                                  │
│  ┌────────────────────────────┐  │
│  │ 📞 Call Vandrevala          │  │
│  │    1860-2662-345 (24/7)    │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ 📞 Call iCall              │  │
│  │    9152987821              │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ 📅 Book Campus Counsellor  │  │
│  └────────────────────────────┘  │
│                                  │
│  [Continue Chatting]  [Go Home]  │
│                                  │
└──────────────────────────────────┘
```

### Functional Requirements

- [ ] Full-screen crisis overlay component
- [ ] Clickable phone numbers (tel: links on mobile)
- [ ] Quick book counsellor action
- [ ] Do not dismiss without acknowledgment
- [ ] Log crisis events for admin dashboard
- [ ] Never block the user from accessing the app
- [ ] Show crisis resources in student's preferred language

---

_See [UI_UX_GUIDE.md](./UI_UX_GUIDE.md) for design specifications._
