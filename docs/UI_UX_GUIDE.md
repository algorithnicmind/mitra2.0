# 🎨 UI/UX Design Guide

> Design system, color palette, typography, component library, and UX flows for Mitra 2.0

---

## 🎯 Design Philosophy

- **Calming & Safe**: Soft gradients, rounded corners, breathing space
- **Accessible**: High contrast, readable fonts, screen reader friendly
- **Non-Clinical**: Feels like talking to a friend, not visiting a hospital
- **Mobile-First**: Designed for students on phones
- **Dark Mode**: Support for low-light environments (late-night use)

---

## 🎨 Color Palette

### Primary Colors

| Name          | Light Mode         | Dark Mode | Usage                      |
| ------------- | ------------------ | --------- | -------------------------- |
| Primary       | `#6366F1` (Indigo) | `#818CF8` | Buttons, links, highlights |
| Primary Hover | `#4F46E5`          | `#6366F1` | Hover states               |
| Primary Light | `#EEF2FF`          | `#1E1B4B` | Backgrounds, cards         |

### Emotional Colors

| Emotion     | Color  | Hex       | Usage                  |
| ----------- | ------ | --------- | ---------------------- |
| 😊 Happy    | Green  | `#22C55E` | Positive mood, success |
| 😐 Neutral  | Blue   | `#3B82F6` | Normal state           |
| ☹️ Sad      | Indigo | `#6366F1` | Sadness indicators     |
| 😰 Anxious  | Amber  | `#F59E0B` | Anxiety, warning       |
| 😡 Angry    | Red    | `#EF4444` | Anger, crisis          |
| 😫 Stressed | Orange | `#F97316` | Stress indicators      |

### Severity Colors

| Level    | Color    | Hex       |
| -------- | -------- | --------- |
| Minimal  | Green    | `#22C55E` |
| Mild     | Blue     | `#3B82F6` |
| Moderate | Amber    | `#F59E0B` |
| Severe   | Red      | `#EF4444` |
| Critical | Dark Red | `#DC2626` |

### Neutral Colors

| Name           | Light     | Dark      |
| -------------- | --------- | --------- |
| Background     | `#F8FAFC` | `#0F172A` |
| Surface        | `#FFFFFF` | `#1E293B` |
| Surface 2      | `#F1F5F9` | `#334155` |
| Text Primary   | `#0F172A` | `#F8FAFC` |
| Text Secondary | `#64748B` | `#94A3B8` |
| Border         | `#E2E8F0` | `#334155` |

---

## 📝 Typography

### Font Stack

```css
/* Primary: Inter (Google Fonts) */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

/* Fallback */
font-family:
  "Inter",
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  Roboto,
  sans-serif;
```

### Scale

| Name       | Size            | Weight | Line Height | Usage              |
| ---------- | --------------- | ------ | ----------- | ------------------ |
| H1         | 32px / 2rem     | 700    | 1.2         | Page titles        |
| H2         | 24px / 1.5rem   | 600    | 1.3         | Section titles     |
| H3         | 20px / 1.25rem  | 600    | 1.4         | Card titles        |
| Body       | 16px / 1rem     | 400    | 1.6         | Normal text        |
| Body Small | 14px / 0.875rem | 400    | 1.5         | Secondary text     |
| Caption    | 12px / 0.75rem  | 400    | 1.4         | Labels, timestamps |
| Button     | 14px / 0.875rem | 600    | 1           | Button text        |

---

## 🧱 Component Library

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.2s;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #6366f1;
  border: 2px solid #6366f1;
  padding: 10px 22px;
  border-radius: 12px;
}

/* Crisis Button */
.btn-crisis {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  padding: 14px 28px;
  border-radius: 12px;
  animation: pulse 2s infinite;
}
```

### Cards

```css
.card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.06);
  transition: all 0.2s;
}

.card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

/* Dark Mode */
.dark .card {
  background: #1e293b;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
```

### Chat Bubbles

```css
.chat-bubble-user {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border-radius: 20px 20px 4px 20px;
  padding: 12px 18px;
  max-width: 75%;
  align-self: flex-end;
}

.chat-bubble-ai {
  background: #f1f5f9;
  color: #0f172a;
  border-radius: 20px 20px 20px 4px;
  padding: 12px 18px;
  max-width: 75%;
  align-self: flex-start;
}

.dark .chat-bubble-ai {
  background: #334155;
  color: #f8fafc;
}
```

### Mood Selector

```css
.mood-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.mood-option:hover {
  background: #eef2ff;
  transform: scale(1.1);
}

.mood-option.selected {
  background: #6366f1;
  color: white;
  transform: scale(1.15);
}

.mood-emoji {
  font-size: 36px;
  margin-bottom: 4px;
}
```

---

## 📱 Page Layouts

### Navigation Structure

```
┌─────────────────────────────────────────────┐
│  🧠 Mitra                    👤  🌙  🔔    │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ │
│  │ 🏠  │ │ 💬  │ │ 📋  │ │ 📅  │ │ 👥  │ │
│  │ Home│ │ Chat│ │ Test│ │ Book│ │Forum│ │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ │
└─────────────────────────────────────────────┘
```

### Home Page Layout

```
┌─────────────────────────────────────────────┐
│  Header: Logo + Navigation                   │
├─────────────────────────────────────────────┤
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │  Welcome back, Ankit! 👋               │  │
│  │  How are you feeling today?            │  │
│  │                                        │  │
│  │  [😊] [🙂] [😐] [☹️] [😢]            │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌──────────────┐  ┌──────────────┐         │
│  │  💬 Chat      │  │  📋 Take     │         │
│  │  with AI     │  │  Assessment  │         │
│  │              │  │              │         │
│  │  Talk to     │  │  PHQ-9, GAD-7│         │
│  │  Mitra       │  │  screenings  │         │
│  └──────────────┘  └──────────────┘         │
│                                              │
│  ┌──────────────┐  ┌──────────────┐         │
│  │  📅 Book      │  │  📚 Browse   │         │
│  │  Counsellor  │  │  Resources  │         │
│  └──────────────┘  └──────────────┘         │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │  📊 Your Mood This Week               │  │
│  │  [Chart showing 7-day mood trend]     │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │  💡 Daily Tip                          │  │
│  │  "Take a 5-minute walk between        │  │
│  │   study sessions for better focus."   │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  Bottom Navigation Bar                       │
└─────────────────────────────────────────────┘
```

### Chat Page Layout

```
┌─────────────────────────────────────────────┐
│  ← Back    AI Chat Assistant    📋 History   │
├─────────────────────────────────────────────┤
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ 🤖 Hi! I'm Mitra, your mental health │  │
│  │ companion. How are you feeling today? │  │
│  └────────────────────────────────────────┘  │
│                                              │
│                     ┌──────────────────────┐ │
│                     │ I feel stressed about│ │
│                     │ my exams             │ │
│                     └──────────────────────┘ │
│                                     😫 0.82  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ I understand exam stress can feel      │  │
│  │ overwhelming. Here are some strategies:│  │
│  │                                        │  │
│  │ • Try the Pomodoro technique           │  │
│  │ • 5-minute breathing exercise          │  │
│  │                                        │  │
│  │ How far away are your exams?           │  │
│  └────────────────────────────────────────┘  │
│                                              │
│ ┌──────────────────────────────┐  ┌──────┐  │
│ │ Type your message...         │  │ Send │  │
│ └──────────────────────────────┘  └──────┘  │
└─────────────────────────────────────────────┘
```

---

## 🎭 Animation Guidelines

### Micro-Animations

| Element            | Animation       | Duration | Easing   |
| ------------------ | --------------- | -------- | -------- |
| Page transitions   | Fade + slide up | 300ms    | ease-out |
| Card hover         | Lift + shadow   | 200ms    | ease     |
| Button press       | Scale down      | 100ms    | ease-in  |
| Chat bubble appear | Fade + slide    | 250ms    | ease-out |
| Mood emoji select  | Scale bounce    | 300ms    | spring   |
| Score reveal       | Count up        | 1000ms   | ease-out |
| Crisis overlay     | Fade in         | 400ms    | ease     |
| Loading spinner    | Rotate          | infinite | linear   |

### CSS Animations

```css
@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes bounceIn {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-fade-up {
  animation: fadeSlideUp 0.3s ease-out;
}

.animate-bounce-in {
  animation: bounceIn 0.5s ease-out;
}
```

---

## ♿ Accessibility Requirements

| Requirement         | Implementation                     |
| ------------------- | ---------------------------------- |
| Color Contrast      | WCAG AA minimum (4.5:1 for text)   |
| Keyboard Navigation | All interactive elements focusable |
| Screen Reader       | ARIA labels on all elements        |
| Focus Indicators    | Visible focus rings                |
| Font Sizing         | Minimum 14px, scalable             |
| Touch Targets       | Minimum 44x44px                    |
| Motion              | Respect `prefers-reduced-motion`   |
| Language            | Support RTL languages (future)     |

---

## 📱 Responsive Breakpoints

| Breakpoint | Width      | Layout                    |
| ---------- | ---------- | ------------------------- |
| Mobile     | < 640px    | Single column, bottom nav |
| Tablet     | 640-1024px | Two columns, side nav     |
| Desktop    | > 1024px   | Full layout, sidebar      |

```css
/* Tailwind Breakpoints */
/* sm: 640px */
/* md: 768px */
/* lg: 1024px */
/* xl: 1280px */
```

---

## 🌙 Dark Mode Strategy

Use Tailwind's `dark:` variant with system preference detection:

```javascript
// Detect system preference
const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Toggle class on html element
document.documentElement.classList.toggle("dark", isDark);
```

```css
/* Example: Card in dark mode */
.card {
  @apply bg-white dark:bg-slate-800;
  @apply text-slate-900 dark:text-slate-100;
  @apply border-slate-200 dark:border-slate-700;
}
```

---

_See [FEATURE_SPECS.md](./FEATURE_SPECS.md) for detailed feature requirements._
