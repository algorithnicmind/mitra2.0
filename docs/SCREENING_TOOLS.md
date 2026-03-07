# 📋 Psychological Screening Tools

> PHQ-9, GAD-7, and GHQ-12 implementation details for Mitra 2.0

---

## Overview

Mitra 2.0 uses clinically validated screening tools to detect mental health issues early. These are **screening tools, not diagnostic tools** — they help identify students who may need professional help.

> ⚠️ **Important**: These tools are used for screening purposes only. They do not replace professional clinical diagnosis.

---

## 1. PHQ-9 (Patient Health Questionnaire-9)

### Purpose

Screen for **depression** severity.

### Questions

| #   | Question                                                                                            |
| --- | --------------------------------------------------------------------------------------------------- |
| 1   | Little interest or pleasure in doing things                                                         |
| 2   | Feeling down, depressed, or hopeless                                                                |
| 3   | Trouble falling or staying asleep, or sleeping too much                                             |
| 4   | Feeling tired or having little energy                                                               |
| 5   | Poor appetite or overeating                                                                         |
| 6   | Feeling bad about yourself — or that you are a failure or have let yourself or your family down     |
| 7   | Trouble concentrating on things, such as reading or watching TV                                     |
| 8   | Moving or speaking so slowly that other people noticed? Or the opposite — being fidgety or restless |
| 9   | Thoughts that you would be better off dead, or of hurting yourself                                  |

### Response Options

| Value | Text                    |
| ----- | ----------------------- |
| 0     | Not at all              |
| 1     | Several days            |
| 2     | More than half the days |
| 3     | Nearly every day        |

### Scoring

**Total Score Range: 0-27**

| Score | Severity          | Action                                        |
| ----- | ----------------- | --------------------------------------------- |
| 0-4   | Minimal           | Self-care tips, general resources             |
| 5-9   | Mild              | Self-help strategies, optional counselling    |
| 10-14 | Moderate          | Actively recommend counselling                |
| 15-19 | Moderately Severe | Urgently recommend counselling, notify system |
| 20-27 | Severe            | ⚠️ Emergency protocol, immediate referral     |

### Special Rule: Question 9

> If a student scores **≥ 1** on Question 9 (thoughts of self-harm/death), the system should **always** trigger the crisis protocol regardless of total score.

### Implementation

```javascript
// server/src/data/phq9.js

const PHQ9_QUESTIONS = [
  {
    number: 1,
    text: "Little interest or pleasure in doing things",
    options: [
      { value: 0, text: "Not at all" },
      { value: 1, text: "Several days" },
      { value: 2, text: "More than half the days" },
      { value: 3, text: "Nearly every day" },
    ],
  },
  {
    number: 2,
    text: "Feeling down, depressed, or hopeless",
    options: [
      { value: 0, text: "Not at all" },
      { value: 1, text: "Several days" },
      { value: 2, text: "More than half the days" },
      { value: 3, text: "Nearly every day" },
    ],
  },
  {
    number: 3,
    text: "Trouble falling or staying asleep, or sleeping too much",
    options: [
      { value: 0, text: "Not at all" },
      { value: 1, text: "Several days" },
      { value: 2, text: "More than half the days" },
      { value: 3, text: "Nearly every day" },
    ],
  },
  {
    number: 4,
    text: "Feeling tired or having little energy",
    options: [
      { value: 0, text: "Not at all" },
      { value: 1, text: "Several days" },
      { value: 2, text: "More than half the days" },
      { value: 3, text: "Nearly every day" },
    ],
  },
  {
    number: 5,
    text: "Poor appetite or overeating",
    options: [
      { value: 0, text: "Not at all" },
      { value: 1, text: "Several days" },
      { value: 2, text: "More than half the days" },
      { value: 3, text: "Nearly every day" },
    ],
  },
  {
    number: 6,
    text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
    options: [
      { value: 0, text: "Not at all" },
      { value: 1, text: "Several days" },
      { value: 2, text: "More than half the days" },
      { value: 3, text: "Nearly every day" },
    ],
  },
  {
    number: 7,
    text: "Trouble concentrating on things, such as reading or watching TV",
    options: [
      { value: 0, text: "Not at all" },
      { value: 1, text: "Several days" },
      { value: 2, text: "More than half the days" },
      { value: 3, text: "Nearly every day" },
    ],
  },
  {
    number: 8,
    text: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless",
    options: [
      { value: 0, text: "Not at all" },
      { value: 1, text: "Several days" },
      { value: 2, text: "More than half the days" },
      { value: 3, text: "Nearly every day" },
    ],
  },
  {
    number: 9,
    text: "Thoughts that you would be better off dead, or of hurting yourself in some way",
    options: [
      { value: 0, text: "Not at all" },
      { value: 1, text: "Several days" },
      { value: 2, text: "More than half the days" },
      { value: 3, text: "Nearly every day" },
    ],
    isCritical: true, // Triggers crisis check
  },
];

function calculatePHQ9(answers) {
  const totalScore = answers.reduce((sum, a) => sum + a.selectedOption, 0);

  // Check Question 9 (self-harm)
  const q9Answer = answers.find((a) => a.questionNumber === 9);
  const selfHarmRisk = q9Answer && q9Answer.selectedOption >= 1;

  let severity, riskLevel;

  if (totalScore <= 4) {
    severity = "minimal";
    riskLevel = "low";
  } else if (totalScore <= 9) {
    severity = "mild";
    riskLevel = "low";
  } else if (totalScore <= 14) {
    severity = "moderate";
    riskLevel = "medium";
  } else if (totalScore <= 19) {
    severity = "moderately_severe";
    riskLevel = "high";
  } else {
    severity = "severe";
    riskLevel = "critical";
  }

  // Override risk level if self-harm detected
  if (selfHarmRisk) {
    riskLevel = "critical";
  }

  return {
    totalScore,
    severity,
    riskLevel,
    selfHarmRisk,
    recommendations: getRecommendations("PHQ9", severity, selfHarmRisk),
  };
}
```

---

## 2. GAD-7 (Generalized Anxiety Disorder-7)

### Purpose

Screen for **anxiety** severity.

### Questions

| #   | Question                                          |
| --- | ------------------------------------------------- |
| 1   | Feeling nervous, anxious, or on edge              |
| 2   | Not being able to stop or control worrying        |
| 3   | Worrying too much about different things          |
| 4   | Trouble relaxing                                  |
| 5   | Being so restless that it's hard to sit still     |
| 6   | Becoming easily annoyed or irritable              |
| 7   | Feeling afraid as if something awful might happen |

### Response Options

Same as PHQ-9: 0 (Not at all) to 3 (Nearly every day)

### Scoring

**Total Score Range: 0-21**

| Score | Severity | Action                                    |
| ----- | -------- | ----------------------------------------- |
| 0-4   | Minimal  | General relaxation tips                   |
| 5-9   | Mild     | Self-help strategies, breathing exercises |
| 10-14 | Moderate | Recommend counselling, coping resources   |
| 15-21 | Severe   | ⚠️ Urgent counselling referral            |

### Implementation

```javascript
// server/src/data/gad7.js

const GAD7_QUESTIONS = [
  {
    number: 1,
    text: "Feeling nervous, anxious, or on edge",
    options: [
      { value: 0, text: "Not at all" },
      { value: 1, text: "Several days" },
      { value: 2, text: "More than half the days" },
      { value: 3, text: "Nearly every day" },
    ],
  },
  {
    number: 2,
    text: "Not being able to stop or control worrying",
    options: [
      { value: 0, text: "Not at all" },
      { value: 1, text: "Several days" },
      { value: 2, text: "More than half the days" },
      { value: 3, text: "Nearly every day" },
    ],
  },
  {
    number: 3,
    text: "Worrying too much about different things",
    options: [
      { value: 0, text: "Not at all" },
      { value: 1, text: "Several days" },
      { value: 2, text: "More than half the days" },
      { value: 3, text: "Nearly every day" },
    ],
  },
  {
    number: 4,
    text: "Trouble relaxing",
    options: [
      { value: 0, text: "Not at all" },
      { value: 1, text: "Several days" },
      { value: 2, text: "More than half the days" },
      { value: 3, text: "Nearly every day" },
    ],
  },
  {
    number: 5,
    text: "Being so restless that it's hard to sit still",
    options: [
      { value: 0, text: "Not at all" },
      { value: 1, text: "Several days" },
      { value: 2, text: "More than half the days" },
      { value: 3, text: "Nearly every day" },
    ],
  },
  {
    number: 6,
    text: "Becoming easily annoyed or irritable",
    options: [
      { value: 0, text: "Not at all" },
      { value: 1, text: "Several days" },
      { value: 2, text: "More than half the days" },
      { value: 3, text: "Nearly every day" },
    ],
  },
  {
    number: 7,
    text: "Feeling afraid as if something awful might happen",
    options: [
      { value: 0, text: "Not at all" },
      { value: 1, text: "Several days" },
      { value: 2, text: "More than half the days" },
      { value: 3, text: "Nearly every day" },
    ],
  },
];

function calculateGAD7(answers) {
  const totalScore = answers.reduce((sum, a) => sum + a.selectedOption, 0);

  let severity, riskLevel;

  if (totalScore <= 4) {
    severity = "minimal";
    riskLevel = "low";
  } else if (totalScore <= 9) {
    severity = "mild";
    riskLevel = "low";
  } else if (totalScore <= 14) {
    severity = "moderate";
    riskLevel = "medium";
  } else {
    severity = "severe";
    riskLevel = "high";
  }

  return {
    totalScore,
    severity,
    riskLevel,
    recommendations: getRecommendations("GAD7", severity),
  };
}
```

---

## 3. GHQ-12 (General Health Questionnaire-12)

### Purpose

Screen for **general psychological distress** and overall mental well-being.

### Questions

| #   | Question                                              |
| --- | ----------------------------------------------------- |
| 1   | Been able to concentrate on what you're doing?        |
| 2   | Lost much sleep over worry?                           |
| 3   | Felt you were playing a useful part in things?        |
| 4   | Felt capable of making decisions about things?        |
| 5   | Felt constantly under strain?                         |
| 6   | Felt you couldn't overcome your difficulties?         |
| 7   | Been able to enjoy your normal day-to-day activities? |
| 8   | Been able to face up to your problems?                |
| 9   | Been feeling unhappy and depressed?                   |
| 10  | Been losing confidence in yourself?                   |
| 11  | Been thinking of yourself as a worthless person?      |
| 12  | Been feeling reasonably happy, all things considered? |

### Scoring Methods

**GHQ Scoring (Binary)**: 0-0-1-1 method

| Response Option      | GHQ Score |
| -------------------- | --------- |
| Better than usual    | 0         |
| Same as usual        | 0         |
| Less than usual      | 1         |
| Much less than usual | 1         |

**Total Score Range: 0-12** (using GHQ scoring)

| Score | Interpretation                  |
| ----- | ------------------------------- |
| 0-3   | No significant distress         |
| 4-6   | Mild psychological distress     |
| 7-9   | Moderate psychological distress |
| 10-12 | Severe psychological distress   |

---

## 4. Recommendations Engine

```javascript
function getRecommendations(type, severity, selfHarmRisk = false) {
  const recommendations = [];

  // Universal recommendations
  recommendations.push("Remember to take breaks and practice self-care");

  if (selfHarmRisk) {
    return [
      "⚠️ Please reach out to a crisis helpline immediately",
      "📞 Vandrevala Foundation: 1860-2662-345 (24/7)",
      "📞 iCall: 9152987821",
      "📞 AASRA: 91-22-27546669",
      "Please talk to your campus counsellor as soon as possible",
      "You are not alone — help is available right now",
    ];
  }

  switch (severity) {
    case "minimal":
      recommendations.push(
        "Continue maintaining your current well-being practices",
        "Explore our self-care resources in the Resource Hub",
        "Consider daily mood tracking to stay aware",
      );
      break;

    case "mild":
      recommendations.push(
        "Try guided breathing exercises (available in Resource Hub)",
        "Maintain a regular sleep schedule",
        "Consider talking to a peer volunteer",
        "Practice the 5-4-3-2-1 grounding technique when stressed",
      );
      break;

    case "moderate":
      recommendations.push(
        "We recommend speaking with a counsellor",
        "Click here to book a confidential session",
        "Try daily journaling to process your thoughts",
        "Physical exercise can significantly help — even a 15-min walk",
        "Reduce caffeine and screen time before bed",
      );
      break;

    case "moderately_severe":
    case "severe":
      recommendations.push(
        "⚠️ We strongly recommend scheduling a counsellor session",
        "Professional support can make a big difference",
        "📞 If you need immediate help: Vandrevala Foundation 1860-2662-345",
        "You've taken a brave step by completing this assessment",
        "Book an appointment now — your well-being matters",
      );
      break;
  }

  return recommendations;
}
```

---

## 5. UI/UX Considerations for Screening

### Design Principles

1. **Non-clinical language**: Frame questions gently, add context
2. **Progress indicator**: Show progress bar (e.g., "Question 3 of 9")
3. **One question per screen**: Reduce overwhelm on mobile
4. **Warm colors**: Use calming blue/green tones
5. **Privacy reassurance**: Show "Your responses are confidential" badge
6. **Skip option**: Allow skipping assessments without judgment
7. **Result presentation**: Use visual gauges, not just numbers

### Result Display

```
┌──────────────────────────────────┐
│  Your Assessment Results         │
│                                  │
│  ┌────────────────────────────┐  │
│  │ PHQ-9 Score: 12             │  │
│  │                             │  │
│  │ ■■■■■■■■■■░░░░░  12/27     │  │
│  │                             │  │
│  │ Severity: Moderate          │  │
│  │ 🟡 medium risk              │  │
│  └────────────────────────────┘  │
│                                  │
│  📌 Recommendations:             │
│  • Speak with a counsellor       │
│  • Try daily breathing exercises │
│  • Maintain sleep hygiene       │
│                                  │
│  [📅 Book Counsellor]  [📚 Resources]  │
└──────────────────────────────────┘
```

---

## 6. Assessment Frequency Guidelines

| Assessment | Recommended Frequency | Rationale                       |
| ---------- | --------------------- | ------------------------------- |
| PHQ-9      | Every 2 weeks         | Matches clinical recommendation |
| GAD-7      | Every 2 weeks         | Track anxiety over time         |
| GHQ-12     | Monthly               | General well-being check        |

The system should:

- Remind students when an assessment is due
- Never force assessments
- Show trend charts over time
- Allow comparison between past results

---

_See [FEATURE_SPECS.md](./FEATURE_SPECS.md) for detailed feature specifications._
