# 🔒 Security & Privacy

> Data protection, encryption, anonymization, and compliance for Mitra 2.0

---

## ⚠️ Why Security Matters

Mitra 2.0 handles **sensitive mental health data**. A single breach could:

- Expose students' mental health status
- Cause social stigma and discrimination
- Break trust in the platform
- Have legal consequences

> **Principle**: Security is not optional. It's foundational.

---

## 🏗️ Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Layer 1: Transport Security                            │
│  ├── HTTPS everywhere (TLS 1.3)                         │
│  ├── HSTS headers                                       │
│  └── Certificate pinning (mobile)                       │
│                                                         │
│  Layer 2: Authentication & Authorization                │
│  ├── JWT with short expiry                              │
│  ├── bcrypt password hashing (salt rounds: 12)          │
│  ├── Role-based access control (RBAC)                   │
│  └── Session management                                │
│                                                         │
│  Layer 3: Input Validation & Sanitization               │
│  ├── Joi/Zod schema validation                          │
│  ├── SQL injection prevention (N/A - MongoDB)           │
│  ├── NoSQL injection prevention                         │
│  └── XSS prevention                                    │
│                                                         │
│  Layer 4: Data Protection                               │
│  ├── Encryption at rest (MongoDB Atlas)                 │
│  ├── Field-level encryption for chat messages           │
│  ├── Anonymized analytics                               │
│  └── Data minimization                                  │
│                                                         │
│  Layer 5: API Security                                  │
│  ├── Rate limiting                                      │
│  ├── CORS configuration                                 │
│  ├── Helmet security headers                            │
│  └── Request size limits                                │
│                                                         │
│  Layer 6: Monitoring & Incident Response                │
│  ├── Activity logging                                   │
│  ├── Anomaly detection                                  │
│  └── Incident response plan                             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 1. Authentication

### Password Security

```javascript
// Hashing (registration)
const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 12;

const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);

// Verification (login)
const isValid = await bcrypt.compare(plainPassword, hashedPassword);
```

### JWT Configuration

```javascript
const jwt = require("jsonwebtoken");

// Token generation
const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role: role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }, // 7 days for regular tokens
  );
};

// Token verification middleware
const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      success: false,
      error: { code: "UNAUTHORIZED", message: "No token provided" },
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: { code: "UNAUTHORIZED", message: "Invalid token" },
    });
  }
};
```

### Role-Based Access Control

```javascript
const roleCheck = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: { code: "FORBIDDEN", message: "Insufficient permissions" },
      });
    }
    next();
  };
};

// Usage
router.get(
  "/admin/analytics",
  auth,
  roleCheck("admin"),
  adminController.getAnalytics,
);
router.put(
  "/booking/:id",
  auth,
  roleCheck("counsellor", "admin"),
  bookingController.update,
);
```

---

## 2. API Security

### Rate Limiting

```javascript
const rateLimit = require("express-rate-limit");

// General API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: {
    success: false,
    error: { code: "RATE_LIMIT", message: "Too many requests" },
  },
});

// Auth limiter (stricter)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // Only 10 login attempts per 15 min
  message: {
    success: false,
    error: { code: "RATE_LIMIT", message: "Too many login attempts" },
  },
});

// Chat limiter
const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // 20 messages per minute
});

app.use("/api/", apiLimiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/chat/", chatLimiter);
```

### Security Headers (Helmet)

```javascript
const helmet = require("helmet");

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", process.env.AI_SERVICE_URL],
    },
  }),
);
```

### CORS Configuration

```javascript
const cors = require("cors");

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Frontend URL only
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
```

### Input Validation

```javascript
const Joi = require("joi");

// Registration validation
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
  role: Joi.string().valid("student", "counsellor").default("student"),
  universityId: Joi.string().required(),
  universityName: Joi.string().required(),
});

// Chat message validation
const chatSchema = Joi.object({
  message: Joi.string().min(1).max(2000).required(),
  sessionId: Joi.string().required(),
});

// Validation middleware
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: error.details[0].message,
      },
    });
  }
  next();
};
```

### NoSQL Injection Prevention

```javascript
// Use express-mongo-sanitize
const mongoSanitize = require("express-mongo-sanitize");
app.use(mongoSanitize()); // Removes $ and . from req.body, req.query, req.params

// Manual check example
const sanitizeInput = (input) => {
  if (typeof input === "string") {
    return input.replace(/[\$\.]/g, "");
  }
  return input;
};
```

---

## 3. Data Privacy

### Anonymization Strategy

| Data              | Analytics Use     | How Anonymized           |
| ----------------- | ----------------- | ------------------------ |
| User name         | Never exposed     | Not included in reports  |
| Email             | Never exposed     | Not included in reports  |
| University ID     | Never exposed     | Replaced with random ID  |
| Assessment scores | Aggregated only   | No individual data shown |
| Chat messages     | Never exposed     | Only emotion/risk stats  |
| Mood data         | Aggregated trends | No individual entries    |
| Forum posts       | Already anonymous | Anonymous alias used     |

### Data Minimization Principles

1. **Collect only what's needed**: Don't ask for data you won't use
2. **Anonymize by default**: Forum posts default to anonymous
3. **Aggregate for analytics**: Admin sees trends, not individuals
4. **Right to delete**: Students can delete their data
5. **Auto-expire**: Old chat sessions auto-archive after 90 days

### GDPR-Style Compliance

```javascript
// Data export endpoint
router.get("/api/user/data-export", auth, async (req, res) => {
  const userId = req.user.id;

  const userData = {
    profile: await User.findById(userId).select("-password"),
    assessments: await Assessment.find({ userId }),
    moodEntries: await MoodEntry.find({ userId }),
    appointments: await Appointment.find({ studentId: userId }),
    // Chat messages included with consent
  };

  res.json({ success: true, data: userData });
});

// Account deletion endpoint
router.delete("/api/user/account", auth, async (req, res) => {
  const userId = req.user.id;

  // Anonymize rather than delete (for analytics integrity)
  await User.findByIdAndUpdate(userId, {
    name: "Deleted User",
    email: `deleted_${userId}@removed.com`,
    isActive: false,
    // Keep anonymous assessment/mood data for trends
  });

  // Delete personal messages
  await ChatMessage.deleteMany({ userId });

  res.json({ success: true, message: "Account deleted" });
});
```

---

## 4. Consent Framework

### Data Consent Checklist

When a student registers, require consent for:

- [ ] **Required**: Basic data processing (name, email, university)
- [ ] **Required**: Assessment data storage
- [ ] **Optional**: Chat message storage for history
- [ ] **Optional**: Anonymous data contribution to campus analytics
- [ ] **Optional**: Email notifications for reminders

### Consent UI

```
┌──────────────────────────────────────────────┐
│  📋 Privacy & Data Consent                    │
│                                              │
│  We take your privacy seriously. Your data   │
│  is encrypted and never shared without       │
│  your consent.                               │
│                                              │
│  ☑️ I agree to the Privacy Policy            │
│  ☑️ I consent to anonymous data analytics    │
│  ☐ I consent to chat history storage        │
│  ☐ I want email reminders                   │
│                                              │
│  [Continue]                                  │
└──────────────────────────────────────────────┘
```

---

## 5. Security Checklist for Development

### Must-Have (MVP)

- [ ] HTTPS in production
- [ ] bcrypt password hashing
- [ ] JWT authentication
- [ ] Role-based access control
- [ ] Input validation (Joi/Zod)
- [ ] Rate limiting
- [ ] CORS configuration
- [ ] Helmet security headers
- [ ] NoSQL injection prevention
- [ ] Environment variables for secrets
- [ ] `.env` not in git (`.gitignore`)

### Should-Have (Post-MVP)

- [ ] Field-level encryption for chat messages
- [ ] Two-factor authentication
- [ ] Session fingerprinting
- [ ] Audit logging
- [ ] Content Security Policy
- [ ] Automated vulnerability scanning
- [ ] Data export/delete endpoints
- [ ] Cookie security (httpOnly, secure, sameSite)

---

## 6. Environment Variable Security

```bash
# .gitignore - MUST include these
.env
.env.local
.env.production
node_modules/
*.log
```

```bash
# .env.example - Safe to commit (template)
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mitra
JWT_SECRET=CHANGE_THIS_TO_A_LONG_RANDOM_STRING
AI_SERVICE_URL=http://localhost:8000
GEMINI_API_KEY=your_api_key_here
```

---

_Security is everyone's responsibility. Review this checklist before every deployment._
