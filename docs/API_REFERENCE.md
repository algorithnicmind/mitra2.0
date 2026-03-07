# 🔌 API Reference

> Complete REST API documentation for Mitra 2.0 Backend

**Base URL**: `http://localhost:5000/api`

---

## 📑 Table of Contents

1. [Authentication](#1-authentication)
2. [AI Chat](#2-ai-chat)
3. [Screening / Assessments](#3-screening--assessments)
4. [Counsellor Booking](#4-counsellor-booking)
5. [Resources](#5-resources)
6. [Community / Forum](#6-community--forum)
7. [Mood Tracker](#7-mood-tracker)
8. [Admin Dashboard](#8-admin-dashboard)

---

## 🔑 Authentication Header

All protected routes require:

```
Authorization: Bearer <jwt_token>
```

---

## 1. Authentication

### `POST /api/auth/register`

Register a new user.

**Body:**

```json
{
  "name": "Ankit Sharma",
  "email": "ankit@college.edu",
  "password": "secure123",
  "role": "student",
  "universityId": "COL2024001",
  "universityName": "XYZ University",
  "department": "Computer Science",
  "yearOfStudy": 3
}
```

**Response (201):**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "65f...",
    "name": "Ankit Sharma",
    "email": "ankit@college.edu",
    "role": "student",
    "anonymousAlias": "CalmOcean42"
  }
}
```

---

### `POST /api/auth/login`

Login with credentials.

**Body:**

```json
{
  "email": "ankit@college.edu",
  "password": "secure123"
}
```

**Response (200):**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "65f...",
    "name": "Ankit Sharma",
    "role": "student"
  }
}
```

---

### `GET /api/auth/me` 🔒

Get current user profile.

**Response (200):**

```json
{
  "success": true,
  "user": {
    "_id": "65f...",
    "name": "Ankit Sharma",
    "email": "ankit@college.edu",
    "role": "student",
    "universityName": "XYZ University",
    "preferences": {
      "language": "en",
      "theme": "dark"
    }
  }
}
```

---

### `PUT /api/auth/profile` 🔒

Update user profile.

**Body:**

```json
{
  "name": "Ankit K Sharma",
  "preferences": {
    "language": "hi",
    "theme": "dark"
  }
}
```

---

### `PUT /api/auth/password` 🔒

Change password.

**Body:**

```json
{
  "currentPassword": "old123",
  "newPassword": "newsecure456"
}
```

---

## 2. AI Chat

### `POST /api/chat/message` 🔒

Send a message to AI chatbot.

**Body:**

```json
{
  "message": "I feel really stressed about my upcoming exams",
  "sessionId": "sess_abc123"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "reply": "I understand exam stress can feel overwhelming. Here are some strategies that might help...",
    "emotion": {
      "detected": "stressed",
      "confidence": 0.87
    },
    "riskScore": 3,
    "crisisDetected": false,
    "suggestions": [
      "Try a 5-minute breathing exercise",
      "Break study sessions into 25-min blocks",
      "Consider talking to a peer volunteer"
    ]
  }
}
```

---

### `GET /api/chat/history` 🔒

Get chat history for current user.

**Query Params:**

- `sessionId` (optional) — Filter by session
- `page` (default: 1)
- `limit` (default: 50)

**Response (200):**

```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "_id": "65f...",
        "message": "I feel stressed",
        "sender": "user",
        "emotion": { "detected": "stressed", "confidence": 0.87 },
        "createdAt": "2026-03-07T10:00:00Z"
      },
      {
        "_id": "65f...",
        "message": "I understand...",
        "sender": "ai",
        "createdAt": "2026-03-07T10:00:02Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 120
    }
  }
}
```

---

### `GET /api/chat/sessions` 🔒

Get all chat sessions for current user.

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "sessionId": "sess_abc123",
      "startedAt": "2026-03-07T10:00:00Z",
      "messageCount": 12,
      "lastMessage": "Thank you, I feel better now"
    }
  ]
}
```

---

## 3. Screening / Assessments

### `GET /api/screening/questions/:type`

Get questions for a screening tool.

**Params:** `type` = `PHQ9` | `GAD7` | `GHQ12`

**Response (200):**

```json
{
  "success": true,
  "data": {
    "type": "PHQ9",
    "title": "Patient Health Questionnaire (PHQ-9)",
    "description": "Over the last 2 weeks, how often have you been bothered by the following?",
    "questions": [
      {
        "number": 1,
        "text": "Little interest or pleasure in doing things",
        "options": [
          { "value": 0, "text": "Not at all" },
          { "value": 1, "text": "Several days" },
          { "value": 2, "text": "More than half the days" },
          { "value": 3, "text": "Nearly every day" }
        ]
      }
    ]
  }
}
```

---

### `POST /api/screening/submit` 🔒

Submit a completed assessment.

**Body:**

```json
{
  "type": "PHQ9",
  "answers": [
    { "questionNumber": 1, "selectedOption": 2 },
    { "questionNumber": 2, "selectedOption": 1 },
    { "questionNumber": 3, "selectedOption": 3 }
  ],
  "isAnonymous": false
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "assessmentId": "65f...",
    "totalScore": 14,
    "severity": "moderate",
    "riskLevel": "medium",
    "recommendations": [
      "Consider speaking with a counsellor",
      "Try daily mindfulness exercises",
      "Maintain a regular sleep schedule"
    ],
    "counsellorReferred": true
  }
}
```

---

### `GET /api/screening/history` 🔒

Get user's assessment history.

**Query Params:**

- `type` (optional) — Filter by test type
- `page` (default: 1)

**Response (200):**

```json
{
  "success": true,
  "data": {
    "assessments": [
      {
        "_id": "65f...",
        "type": "PHQ9",
        "totalScore": 14,
        "severity": "moderate",
        "riskLevel": "medium",
        "createdAt": "2026-03-07T10:00:00Z"
      }
    ]
  }
}
```

---

## 4. Counsellor Booking

### `GET /api/booking/counsellors`

Get list of available counsellors.

**Query Params:**

- `specialization` (optional) — e.g., `anxiety`, `depression`
- `date` (optional) — Filter by available date

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "_id": "65f...",
      "name": "Dr. Priya Mehta",
      "specialization": ["anxiety", "depression", "stress"],
      "availability": [
        {
          "day": "mon",
          "slots": [
            { "start": "10:00", "end": "11:00" },
            { "start": "14:00", "end": "15:00" }
          ]
        },
        { "day": "wed", "slots": [{ "start": "10:00", "end": "11:00" }] }
      ],
      "rating": 4.8
    }
  ]
}
```

---

### `POST /api/booking/appointments` 🔒

Book an appointment.

**Body:**

```json
{
  "counsellorId": "65f...",
  "date": "2026-03-15",
  "timeSlot": { "start": "14:00", "end": "15:00" },
  "type": "online",
  "reason": "Feeling anxious about career choices",
  "isAnonymous": true
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "appointmentId": "65f...",
    "status": "pending",
    "date": "2026-03-15",
    "timeSlot": { "start": "14:00", "end": "15:00" },
    "counsellor": "Dr. Priya Mehta",
    "type": "online",
    "message": "Your appointment request has been sent. You will be notified once confirmed."
  }
}
```

---

### `GET /api/booking/appointments` 🔒

Get user's appointments.

**Query Params:**

- `status` (optional) — `pending`, `confirmed`, `completed`, `cancelled`

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "_id": "65f...",
      "counsellor": { "name": "Dr. Priya Mehta" },
      "date": "2026-03-15",
      "timeSlot": { "start": "14:00", "end": "15:00" },
      "status": "confirmed",
      "type": "online",
      "meetingLink": "https://meet.google.com/abc-def"
    }
  ]
}
```

---

### `PUT /api/booking/appointments/:id` 🔒

Update appointment status (counsellor/admin).

**Body:**

```json
{
  "status": "confirmed",
  "meetingLink": "https://meet.google.com/abc-def"
}
```

---

### `DELETE /api/booking/appointments/:id` 🔒

Cancel an appointment.

---

## 5. Resources

### `GET /api/resources`

Get educational resources.

**Query Params:**

- `category` — e.g., `exam_stress`, `meditation`
- `type` — `article`, `video`, `audio`, `guide`
- `language` — `en`, `hi`, `od`
- `page` (default: 1)
- `limit` (default: 20)

**Response (200):**

```json
{
  "success": true,
  "data": {
    "resources": [
      {
        "_id": "65f...",
        "title": "5-Minute Breathing Exercise for Exam Stress",
        "description": "A guided breathing exercise...",
        "type": "audio",
        "category": "exam_stress",
        "content": { "url": "https://...", "duration": 5 },
        "language": "en",
        "rating": { "average": 4.5, "count": 120 }
      }
    ],
    "pagination": { "page": 1, "total": 45 }
  }
}
```

---

### `POST /api/resources` 🔒 (Admin/Counsellor)

Add a new resource.

---

### `POST /api/resources/:id/rate` 🔒

Rate a resource.

**Body:**

```json
{
  "rating": 5
}
```

---

## 6. Community / Forum

### `GET /api/community/posts`

Get forum posts.

**Query Params:**

- `category` (optional)
- `sort` — `recent`, `popular`
- `page` (default: 1)

---

### `POST /api/community/posts` 🔒

Create a forum post.

**Body:**

```json
{
  "title": "How do you deal with homesickness?",
  "content": "I moved to college last month and I really miss home...",
  "category": "homesickness",
  "isAnonymous": true
}
```

---

### `POST /api/community/posts/:id/comments` 🔒

Comment on a post.

**Body:**

```json
{
  "content": "I felt the same way. What helped me was...",
  "isAnonymous": true
}
```

---

### `POST /api/community/posts/:id/like` 🔒

Like/unlike a post.

---

### `POST /api/community/posts/:id/report` 🔒

Report a post.

**Body:**

```json
{
  "reason": "Contains harmful content"
}
```

---

## 7. Mood Tracker

### `POST /api/mood` 🔒

Log a mood entry.

**Body:**

```json
{
  "mood": "anxious",
  "moodScore": 2,
  "note": "Worried about project deadline",
  "activities": ["study", "gaming"],
  "stressLevel": 7,
  "sleepHours": 5,
  "triggers": ["academic", "social"]
}
```

---

### `GET /api/mood/history` 🔒

Get mood history.

**Query Params:**

- `days` (default: 30) — Past N days
- `page` (default: 1)

---

### `GET /api/mood/trends` 🔒

Get mood trends and analytics.

**Response (200):**

```json
{
  "success": true,
  "data": {
    "averageMoodScore": 3.2,
    "averageStressLevel": 6.1,
    "averageSleepHours": 6.5,
    "moodDistribution": {
      "happy": 5,
      "neutral": 12,
      "sad": 3,
      "anxious": 8,
      "stressed": 2
    },
    "weeklyTrend": [
      { "week": 1, "avgMood": 3.5, "avgStress": 5.8 },
      { "week": 2, "avgMood": 3.0, "avgStress": 6.5 }
    ],
    "topTriggers": ["academic", "social", "exams"],
    "insights": [
      "Your stress levels tend to be higher on weekdays",
      "You sleep less on days with high stress"
    ]
  }
}
```

---

## 8. Admin Dashboard

### `GET /api/admin/analytics/overview` 🔒 (Admin only)

Get platform overview stats.

**Response (200):**

```json
{
  "success": true,
  "data": {
    "totalUsers": 1500,
    "activeUsers": 890,
    "totalAssessments": 3200,
    "totalAppointments": 450,
    "totalChatSessions": 5600,
    "activeForumPosts": 320,
    "averagePHQ9Score": 8.3,
    "averageGAD7Score": 7.1,
    "crisisAlerts": 12
  }
}
```

---

### `GET /api/admin/analytics/trends` 🔒 (Admin only)

Get mental health trends.

**Query Params:**

- `period` — `week`, `month`, `semester`, `year`

**Response (200):**

```json
{
  "success": true,
  "data": {
    "stressTrends": [
      { "month": "Jan", "avgScore": 7.2, "assessmentCount": 120 },
      { "month": "Feb", "avgScore": 8.1, "assessmentCount": 180 }
    ],
    "severityDistribution": {
      "minimal": 30,
      "mild": 25,
      "moderate": 28,
      "moderately_severe": 12,
      "severe": 5
    },
    "peakStressPeriods": [
      { "period": "Mid-term exams", "avgScore": 14.2 },
      { "period": "Final exams", "avgScore": 16.8 }
    ],
    "counsellingDemand": {
      "totalRequests": 450,
      "fulfilled": 380,
      "waitlisted": 70
    }
  }
}
```

---

### `GET /api/admin/analytics/departments` 🔒 (Admin only)

Get department-wise breakdown.

---

### `GET /api/admin/reports` 🔒 (Admin only)

Get reported posts/comments for moderation.

---

### `PUT /api/admin/reports/:id` 🔒 (Admin only)

Take action on a report (hide, warn, dismiss).

---

## 📝 Common Response Formats

### Success

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": [...]
  }
}
```

### Error Codes

| Code               | HTTP Status | Description              |
| ------------------ | ----------- | ------------------------ |
| `VALIDATION_ERROR` | 400         | Invalid input data       |
| `UNAUTHORIZED`     | 401         | Missing or invalid token |
| `FORBIDDEN`        | 403         | Insufficient permissions |
| `NOT_FOUND`        | 404         | Resource not found       |
| `CONFLICT`         | 409         | Duplicate resource       |
| `RATE_LIMIT`       | 429         | Too many requests        |
| `SERVER_ERROR`     | 500         | Internal server error    |

---

_See [ARCHITECTURE.md](./ARCHITECTURE.md) for system architecture details._
