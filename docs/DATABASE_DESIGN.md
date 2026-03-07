# 🗄️ Database Design

> MongoDB collections and schema definitions for Mitra 2.0

---

## 📊 Entity Relationship Overview

```
┌──────────────┐       ┌──────────────────┐       ┌──────────────────┐
│    Users     │       │   Assessments    │       │  ChatMessages    │
│              │       │                  │       │                  │
│  _id         │──┐    │  _id             │       │  _id             │
│  role        │  ├───→│  userId          │       │  userId ←────────┤
│  name        │  │    │  type            │       │  sessionId       │
│  email       │  │    │  score           │       │  message         │
│  password    │  │    │  severity        │       │  sender          │
│  university  │  │    │  answers         │       │  emotion         │
│  anonymous   │  │    │  recommendations │       │  riskScore       │
│  createdAt   │  │    │  createdAt       │       │  timestamp       │
└──────────────┘  │    └──────────────────┘       └──────────────────┘
                  │
                  │    ┌──────────────────┐       ┌──────────────────┐
                  │    │  Appointments    │       │   MoodEntries    │
                  │    │                  │       │                  │
                  ├───→│  _id             │       │  _id             │
                  │    │  studentId       │       │  userId ←────────┤
                  │    │  counsellorId    │       │  mood            │
                  │    │  date            │       │  note            │
                  │    │  timeSlot        │       │  activities      │
                  │    │  status          │       │  stressLevel     │
                  │    │  meetingLink     │       │  createdAt       │
                  │    │  notes           │       └──────────────────┘
                  │    └──────────────────┘
                  │
                  │    ┌──────────────────┐       ┌──────────────────┐
                  │    │   ForumPosts     │       │  ForumComments   │
                  │    │                  │       │                  │
                  ├───→│  _id             │  ┌───→│  _id             │
                  │    │  authorId        │  │    │  postId          │
                  │    │  title           │──┘    │  authorId        │
                  │    │  content         │       │  content         │
                  │    │  category        │       │  isAnonymous     │
                  │    │  isAnonymous     │       │  createdAt       │
                  │    │  likes           │       └──────────────────┘
                  │    │  reports         │
                  │    └──────────────────┘
                  │
                  │    ┌──────────────────┐
                  └───→│   Resources      │
                       │                  │
                       │  _id             │
                       │  title           │
                       │  type            │
                       │  category        │
                       │  content         │
                       │  language        │
                       │  addedBy         │
                       └──────────────────┘
```

---

## 📋 Collection Schemas

### 1. Users Collection

```javascript
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      // Stored as bcrypt hash
    },
    role: {
      type: String,
      enum: ["student", "counsellor", "admin", "volunteer"],
      default: "student",
    },
    universityId: {
      type: String,
      required: true,
      trim: true,
    },
    universityName: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      trim: true,
    },
    yearOfStudy: {
      type: Number,
      min: 1,
      max: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    anonymousAlias: {
      type: String,
      default: "",
      // Auto-generated: "HappyPanda42", "CalmOcean17", etc.
    },
    preferences: {
      language: {
        type: String,
        enum: ["en", "hi", "od"],
        default: "en",
      },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
      },
      theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },
    },
    // Counsellor-specific fields
    specialization: {
      type: [String],
      default: [],
      // ['anxiety', 'depression', 'stress', 'relationships', 'career']
    },
    availability: [
      {
        day: {
          type: String,
          enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
        },
        slots: [{ start: String, end: String }],
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ universityId: 1 });
UserSchema.index({ role: 1 });
```

---

### 2. Assessments Collection

```javascript
const AssessmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["PHQ9", "GAD7", "GHQ12"],
      required: true,
    },
    answers: [
      {
        questionNumber: Number,
        questionText: String,
        selectedOption: Number, // 0-3
        optionText: String,
      },
    ],
    totalScore: {
      type: Number,
      required: true,
    },
    severity: {
      type: String,
      required: true,
      // PHQ-9: 'minimal', 'mild', 'moderate', 'moderately_severe', 'severe'
      // GAD-7: 'minimal', 'mild', 'moderate', 'severe'
    },
    riskLevel: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      required: true,
    },
    recommendations: [
      {
        type: String,
      },
    ],
    counsellorReferred: {
      type: Boolean,
      default: false,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
AssessmentSchema.index({ userId: 1, createdAt: -1 });
AssessmentSchema.index({ type: 1, severity: 1 });
```

---

### 3. ChatMessages Collection

```javascript
const ChatMessageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
      // UUID for grouping messages in a session
    },
    message: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      enum: ["user", "ai"],
      required: true,
    },
    emotion: {
      detected: {
        type: String,
        enum: [
          "happy",
          "sad",
          "anxious",
          "angry",
          "neutral",
          "stressed",
          "hopeless",
          "confused",
        ],
        default: "neutral",
      },
      confidence: {
        type: Number,
        min: 0,
        max: 1,
        default: 0,
      },
    },
    riskScore: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    crisisDetected: {
      type: Boolean,
      default: false,
    },
    escalated: {
      type: Boolean,
      default: false,
    },
    metadata: {
      model: String, // AI model used
      responseTime: Number, // ms
      tokensUsed: Number,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
ChatMessageSchema.index({ userId: 1, sessionId: 1 });
ChatMessageSchema.index({ crisisDetected: 1 });
ChatMessageSchema.index({ createdAt: -1 });
```

---

### 4. Appointments Collection

```javascript
const AppointmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    counsellorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    timeSlot: {
      start: { type: String, required: true }, // "14:00"
      end: { type: String, required: true }, // "15:00"
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled", "no_show"],
      default: "pending",
    },
    type: {
      type: String,
      enum: ["online", "in_person"],
      default: "online",
    },
    meetingLink: {
      type: String,
      default: "",
    },
    reason: {
      type: String,
      maxlength: 500,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    notes: {
      // Only counsellor can add notes
      counsellorNotes: { type: String, default: "" },
      followUpRequired: { type: Boolean, default: false },
    },
    reminder: {
      sent: { type: Boolean, default: false },
      sentAt: { type: Date },
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
AppointmentSchema.index({ studentId: 1, date: -1 });
AppointmentSchema.index({ counsellorId: 1, date: 1 });
AppointmentSchema.index({ status: 1 });
```

---

### 5. MoodEntries Collection

```javascript
const MoodEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mood: {
      type: String,
      enum: [
        "very_happy",
        "happy",
        "neutral",
        "sad",
        "very_sad",
        "anxious",
        "angry",
        "stressed",
      ],
      required: true,
    },
    moodScore: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
      // 1 = very_sad, 2 = sad, 3 = neutral, 4 = happy, 5 = very_happy
    },
    note: {
      type: String,
      maxlength: 500,
    },
    activities: [
      {
        type: String,
        enum: [
          "exercise",
          "study",
          "social",
          "sleep",
          "meditation",
          "hobbies",
          "eating",
          "gaming",
          "music",
          "other",
        ],
      },
    ],
    stressLevel: {
      type: Number,
      min: 1,
      max: 10,
      default: 5,
    },
    sleepHours: {
      type: Number,
      min: 0,
      max: 24,
    },
    triggers: [
      {
        type: String,
        // 'exams', 'social', 'family', 'academic', 'financial', 'relationship'
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Indexes
MoodEntrySchema.index({ userId: 1, createdAt: -1 });
// Ensure one entry per day per user
MoodEntrySchema.index({ userId: 1, createdAt: 1 }, { unique: false });
```

---

### 6. ForumPosts Collection

```javascript
const ForumPostSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    category: {
      type: String,
      enum: [
        "exam_stress",
        "loneliness",
        "homesickness",
        "career_anxiety",
        "depression",
        "anxiety",
        "sleep",
        "relationships",
        "self_care",
        "success_stories",
        "general",
      ],
      required: true,
    },
    isAnonymous: {
      type: Boolean,
      default: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    commentCount: {
      type: Number,
      default: 0,
    },
    reports: [
      {
        reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reason: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    isModerated: {
      type: Boolean,
      default: false,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
    toxicityScore: {
      type: Number,
      min: 0,
      max: 1,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
ForumPostSchema.index({ category: 1, createdAt: -1 });
ForumPostSchema.index({ authorId: 1 });
ForumPostSchema.index({ isHidden: 1 });
```

---

### 7. ForumComments Collection

```javascript
const ForumCommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ForumPost",
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    isAnonymous: {
      type: Boolean,
      default: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    reports: [
      {
        reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reason: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    isHidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
ForumCommentSchema.index({ postId: 1, createdAt: 1 });
```

---

### 8. Resources Collection

```javascript
const ResourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    type: {
      type: String,
      enum: ["article", "video", "audio", "guide", "exercise", "worksheet"],
      required: true,
    },
    category: {
      type: String,
      enum: [
        "exam_stress",
        "sleep_improvement",
        "depression_awareness",
        "anxiety_coping",
        "time_management",
        "meditation",
        "breathing_exercises",
        "self_care",
        "relationships",
        "career_planning",
      ],
      required: true,
    },
    content: {
      // For articles: markdown text
      // For videos/audio: URL
      body: { type: String },
      url: { type: String },
      duration: { type: Number }, // minutes
    },
    language: {
      type: String,
      enum: ["en", "hi", "od"],
      default: "en",
    },
    tags: [{ type: String }],
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
ResourceSchema.index({ category: 1, type: 1 });
ResourceSchema.index({ language: 1 });
ResourceSchema.index({ tags: 1 });
```

---

## 📈 Analytics Aggregation Views

For the admin dashboard, use MongoDB aggregation pipelines:

```javascript
// Example: Stress levels by semester
db.assessments.aggregate([
  { $match: { type: "PHQ9" } },
  {
    $group: {
      _id: { $month: "$createdAt" },
      avgScore: { $avg: "$totalScore" },
      count: { $sum: 1 },
      severityDistribution: {
        $push: "$severity",
      },
    },
  },
  { $sort: { _id: 1 } },
]);

// Example: Mood trends over time
db.moodentries.aggregate([
  { $match: { createdAt: { $gte: new Date("2026-01-01") } } },
  {
    $group: {
      _id: {
        week: { $week: "$createdAt" },
        mood: "$mood",
      },
      count: { $sum: 1 },
    },
  },
]);

// Example: Counselling demand
db.appointments.aggregate([
  {
    $group: {
      _id: {
        month: { $month: "$date" },
        status: "$status",
      },
      count: { $sum: 1 },
    },
  },
]);
```

---

## 🔒 Data Security Notes

- **Passwords**: Never stored in plaintext. Always bcrypt hashed with salt rounds ≥ 10
- **Chat messages**: Consider encryption at rest for sensitive conversations
- **Anonymous data**: Analytics use aggregated data only, no PII exposed
- **Assessments**: Linked to userId but can be anonymized for reports
- **Soft deletes**: Use `isHidden` / `isActive` flags instead of `delete()`

---

_See [SECURITY_PRIVACY.md](./SECURITY_PRIVACY.md) for complete security implementation details._
