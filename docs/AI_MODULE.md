# 🤖 AI Module Documentation

> AI chatbot, emotion detection, risk assessment, and content moderation

---

## 🧠 AI Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                     AI SERVICE (Python + FastAPI)                 │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                    PROCESSING PIPELINE                     │  │
│  │                                                            │  │
│  │  User Message                                              │  │
│  │       │                                                    │  │
│  │       ▼                                                    │  │
│  │  ┌──────────────┐                                         │  │
│  │  │ Text Preprocessing │                                    │  │
│  │  │ (clean, tokenize)  │                                    │  │
│  │  └───────┬────────────┘                                    │  │
│  │          │                                                 │  │
│  │          ├──────────────────┬───────────────────┐          │  │
│  │          ▼                  ▼                   ▼          │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │  │
│  │  │   Emotion    │  │    Risk      │  │   Crisis     │    │  │
│  │  │  Detection   │  │   Scoring    │  │  Detection   │    │  │
│  │  │  (DistilBERT)│  │  (Rule+ML)   │  │  (Keywords)  │    │  │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘    │  │
│  │         │                 │                  │            │  │
│  │         └────────┬────────┘──────────────────┘            │  │
│  │                  ▼                                        │  │
│  │         ┌──────────────┐                                  │  │
│  │         │   Response   │                                  │  │
│  │         │  Generator   │                                  │  │
│  │         │  (LLM API)   │                                  │  │
│  │         └──────┬───────┘                                  │  │
│  │                │                                          │  │
│  │                ▼                                          │  │
│  │         ┌──────────────┐                                  │  │
│  │         │  Safety      │                                  │  │
│  │         │  Filter      │                                  │  │
│  │         └──────┬───────┘                                  │  │
│  │                │                                          │  │
│  │                ▼                                          │  │
│  │         Chat Reply + Metadata                             │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 1. Emotion Detection Module

### Purpose

Detect the emotional state of the user from their text messages.

### Model Options

| Option       | Model                                             | Pros                          | Cons                |
| ------------ | ------------------------------------------------- | ----------------------------- | ------------------- |
| **Option A** | `j-hartmann/emotion-english-distilroberta-base`   | Pre-trained, 7 emotions, fast | English only        |
| **Option B** | `bhadresh-savani/distilbert-base-uncased-emotion` | Lightweight, 6 emotions       | Less nuanced        |
| **Option C** | Custom fine-tuned DistilBERT                      | Tailored to student messages  | Needs training data |
| **Option D** | Gemini/OpenAI API                                 | Most accurate, multilingual   | Cost, latency       |

### Recommended: Option A (Hackathon)

```python
from transformers import pipeline

emotion_classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    return_all_scores=True
)

def detect_emotion(text: str) -> dict:
    """
    Detect emotion from user text.

    Returns:
        {
            "detected": "sadness",
            "confidence": 0.87,
            "all_scores": {
                "anger": 0.02,
                "disgust": 0.01,
                "fear": 0.05,
                "joy": 0.03,
                "neutral": 0.02,
                "sadness": 0.87,
                "surprise": 0.00
            }
        }
    """
    results = emotion_classifier(text)[0]
    sorted_results = sorted(results, key=lambda x: x['score'], reverse=True)

    return {
        "detected": sorted_results[0]['label'],
        "confidence": round(sorted_results[0]['score'], 3),
        "all_scores": {r['label']: round(r['score'], 3) for r in results}
    }
```

### Emotion Categories

| Emotion      | Description       | Example Student Message           |
| ------------ | ----------------- | --------------------------------- |
| **joy**      | Happy, excited    | "I passed my exam!"               |
| **sadness**  | Sad, lonely       | "I miss my family so much"        |
| **anger**    | Frustrated        | "The professor is so unfair"      |
| **fear**     | Scared, worried   | "What if I fail everything?"      |
| **surprise** | Shocked           | "I can't believe I got selected!" |
| **disgust**  | Displeasure       | "I hate this hostel food"         |
| **neutral**  | No strong emotion | "I went to class today"           |

---

## 2. Risk Scoring System

### Purpose

Calculate a risk score (0-10) to identify students who may need urgent help.

### Risk Score Calculation

```python
def calculate_risk_score(
    emotion: dict,
    message: str,
    chat_history: list = None
) -> dict:
    """
    Calculate mental health risk score.

    Risk Factors:
    1. Current emotion (40% weight)
    2. Crisis keywords (30% weight)
    3. Historical pattern (20% weight)
    4. Severity indicators (10% weight)
    """
    score = 0
    factors = []

    # Factor 1: Emotion-based risk (0-4 points)
    emotion_risk = {
        'joy': 0, 'surprise': 0, 'neutral': 0.5,
        'anger': 1.5, 'disgust': 1, 'fear': 2.5,
        'sadness': 3, 'hopeless': 4
    }
    emotion_score = emotion_risk.get(emotion['detected'], 1) * emotion['confidence']
    score += emotion_score
    factors.append(f"emotion: {emotion['detected']} ({emotion_score:.1f})")

    # Factor 2: Crisis keyword detection (0-3 points)
    crisis_keywords = {
        'high': ['suicide', 'kill myself', 'end my life', 'no reason to live',
                 'want to die', 'better off dead', 'self-harm', 'cutting'],
        'medium': ['hopeless', 'worthless', 'nobody cares', 'give up',
                   'cant go on', 'no point', 'all alone', 'burden'],
        'low': ['stressed', 'overwhelmed', 'cant sleep', 'exhausted',
                'worried', 'scared', 'lost']
    }

    message_lower = message.lower()
    if any(kw in message_lower for kw in crisis_keywords['high']):
        score += 3
        factors.append("crisis: HIGH keywords detected")
    elif any(kw in message_lower for kw in crisis_keywords['medium']):
        score += 2
        factors.append("crisis: MEDIUM keywords detected")
    elif any(kw in message_lower for kw in crisis_keywords['low']):
        score += 1
        factors.append("crisis: LOW keywords detected")

    # Factor 3: Historical pattern (0-2 points)
    if chat_history:
        negative_count = sum(
            1 for msg in chat_history[-10:]
            if msg.get('emotion', {}).get('detected') in ['sadness', 'fear', 'anger']
        )
        history_score = min(negative_count * 0.4, 2)
        score += history_score
        factors.append(f"history: {negative_count} negative messages ({history_score:.1f})")

    # Factor 4: Severity indicators (0-1 point)
    severity_indicators = ['always', 'never', 'every day', 'constantly', 'cant stop']
    severity_count = sum(1 for ind in severity_indicators if ind in message_lower)
    severity_score = min(severity_count * 0.2, 1)
    score += severity_score

    # Cap at 10
    final_score = min(round(score, 1), 10)

    return {
        "risk_score": final_score,
        "risk_level": get_risk_level(final_score),
        "crisis_detected": final_score >= 7,
        "factors": factors
    }

def get_risk_level(score: float) -> str:
    if score <= 2: return "low"
    if score <= 4: return "medium"
    if score <= 6: return "high"
    return "critical"
```

### Risk Level Actions

| Risk Level  | Score | Action                                     |
| ----------- | ----- | ------------------------------------------ |
| 🟢 Low      | 0-2   | Normal chat, general tips                  |
| 🟡 Medium   | 3-4   | Offer resources, suggest assessment        |
| 🟠 High     | 5-6   | Recommend counsellor, show resources       |
| 🔴 Critical | 7-10  | ⚠️ Emergency protocol, helplines, escalate |

---

## 3. Chatbot Engine

### Purpose

Generate empathetic, helpful responses using LLM.

### System Prompt

```python
SYSTEM_PROMPT = """
You are Mitra, a compassionate and empathetic AI mental health support assistant
for college students. Your role is to:

1. LISTEN actively and validate the student's feelings
2. RESPOND with empathy, warmth, and understanding
3. SUGGEST evidence-based coping strategies when appropriate
4. DETECT signs of crisis and respond appropriately
5. ENCOURAGE professional help when needed

GUIDELINES:
- Never diagnose mental health conditions
- Never prescribe medication
- Always validate emotions before offering advice
- Use simple, relatable language (not clinical jargon)
- Be culturally sensitive (Indian college context)
- If crisis detected, ALWAYS provide emergency resources
- Keep responses concise but warm (2-4 paragraphs max)
- Ask follow-up questions to show engagement
- Reference the detected emotion naturally

EMERGENCY RESOURCES (India):
- Vandrevala Foundation: 1860-2662-345 (24/7)
- iCall: 9152987821
- AASRA: 91-22-27546669
- Campus Counsellor: [Encourage student to find their campus counsellor]

RESPONSE FORMAT:
1. Acknowledge the emotion
2. Validate the experience
3. Offer 1-2 practical suggestions
4. Ask a caring follow-up question
"""
```

### LLM Integration (Gemini API Example)

```python
import google.generativeai as genai

def generate_chat_response(
    user_message: str,
    emotion: dict,
    risk_score: float,
    chat_history: list = None
) -> str:
    """
    Generate empathetic AI response.
    """
    genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
    model = genai.GenerativeModel('gemini-pro')

    # Build context
    context = f"""
    Student's message: "{user_message}"
    Detected emotion: {emotion['detected']} (confidence: {emotion['confidence']})
    Risk score: {risk_score}/10
    """

    if risk_score >= 7:
        context += "\n⚠️ HIGH RISK DETECTED - Include emergency resources in response"

    # Build conversation history
    history = []
    if chat_history:
        for msg in chat_history[-6:]:  # Last 6 messages for context
            role = "user" if msg['sender'] == 'user' else "model"
            history.append({"role": role, "parts": [msg['message']]})

    chat = model.start_chat(history=history)

    response = chat.send_message(
        f"{SYSTEM_PROMPT}\n\n{context}\n\nRespond to the student:"
    )

    return response.text
```

### Example Conversations

#### Normal Stress

```
Student: "I feel stressed about exams"
Emotion: stressed (0.82)
Risk: 2 (low)

Mitra: "It sounds like you're feeling the weight of exam season — that's completely
normal and you're not alone in this. 💙

Here are a couple of things that might help:
• Try the **Pomodoro technique**: 25 minutes of focused study, then a 5-minute break
• A quick **breathing exercise**: breathe in for 4 counts, hold for 4, out for 6

How far away are your exams? I'd love to help you think through a study plan
that feels manageable. 📚"
```

#### Crisis Detection

```
Student: "I feel like nobody cares and there's no point in going on"
Emotion: sadness (0.91)
Risk: 8 (critical)

Mitra: "I hear you, and I want you to know that what you're feeling matters.
You matter. It takes courage to express these feelings, and I'm glad you're
talking about it. 💙

Please reach out to someone who can help right now:
📞 **Vandrevala Foundation**: 1860-2662-345 (24/7, free)
📞 **iCall**: 9152987821
📞 **AASRA**: 91-22-27546669

You can also visit your **campus counsellor** — they are trained to help
with exactly these feelings.

Would you like me to help you find your campus counsellor's contact information?
You don't have to go through this alone. 🤗"
```

---

## 4. Toxicity Filter (Forum Moderation)

### Purpose

Filter harmful or toxic content in the peer community forum.

```python
from transformers import pipeline

toxicity_classifier = pipeline(
    "text-classification",
    model="unitary/toxic-bert",
    return_all_scores=True
)

def check_toxicity(text: str) -> dict:
    """
    Check if forum post/comment contains toxic content.

    Returns:
        {
            "is_toxic": False,
            "toxicity_score": 0.03,
            "categories": {
                "toxic": 0.03,
                "severe_toxic": 0.01,
                "obscene": 0.02,
                "threat": 0.00,
                "insult": 0.04,
                "identity_hate": 0.01
            }
        }
    """
    results = toxicity_classifier(text[:512])[0]  # Limit input length

    toxic_score = max(r['score'] for r in results if r['label'] == 'toxic')

    return {
        "is_toxic": toxic_score > 0.7,
        "toxicity_score": round(toxic_score, 3),
        "categories": {r['label']: round(r['score'], 3) for r in results}
    }
```

---

## 5. FastAPI Service Structure

### Entry Point (`main.py`)

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Mitra 2.0 AI Service",
    description="AI microservice for mental health support",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
@app.post("/api/ai/chat")
async def chat_endpoint(request: ChatRequest):
    # 1. Detect emotion
    emotion = detect_emotion(request.message)

    # 2. Calculate risk
    risk = calculate_risk_score(emotion, request.message, request.history)

    # 3. Generate response
    response = generate_chat_response(
        request.message, emotion, risk['risk_score'], request.history
    )

    # 4. Return
    return {
        "reply": response,
        "emotion": emotion,
        "risk_score": risk['risk_score'],
        "risk_level": risk['risk_level'],
        "crisis_detected": risk['crisis_detected']
    }

@app.post("/api/ai/emotion")
async def emotion_endpoint(request: EmotionRequest):
    return detect_emotion(request.text)

@app.post("/api/ai/toxicity")
async def toxicity_endpoint(request: ToxicityRequest):
    return check_toxicity(request.text)

@app.get("/api/ai/health")
async def health_check():
    return {"status": "healthy", "models_loaded": True}
```

### Dependencies (`requirements.txt`)

```
fastapi==0.109.0
uvicorn==0.27.0
transformers==4.37.0
torch==2.1.0
google-generativeai==0.3.2
python-dotenv==1.0.0
pydantic==2.5.3
nltk==3.8.1
textblob==0.18.0
```

---

## 6. Model Loading & Caching

```python
import functools
from transformers import pipeline

@functools.lru_cache(maxsize=None)
def get_emotion_model():
    """Load emotion detection model once and cache it."""
    return pipeline(
        "text-classification",
        model="j-hartmann/emotion-english-distilroberta-base",
        return_all_scores=True
    )

@functools.lru_cache(maxsize=None)
def get_toxicity_model():
    """Load toxicity model once and cache it."""
    return pipeline(
        "text-classification",
        model="unitary/toxic-bert",
        return_all_scores=True
    )
```

---

## 7. AI Service Endpoints Summary

| Endpoint           | Method | Purpose                                    |
| ------------------ | ------ | ------------------------------------------ |
| `/api/ai/chat`     | POST   | Process chat message and generate response |
| `/api/ai/emotion`  | POST   | Detect emotion from text                   |
| `/api/ai/toxicity` | POST   | Check content toxicity                     |
| `/api/ai/health`   | GET    | Service health check                       |

---

_See [API_REFERENCE.md](./API_REFERENCE.md) for backend integration details._
