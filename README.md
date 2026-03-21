<div align="center">
  <img src="https://via.placeholder.com/150x150/4f46e5/ffffff?text=M2" alt="Mitra 2.0 Logo" width="120" height="120" style="border-radius: 20px;"/>
  
  # 🧠 Mitra 2.0
  **Your AI-Powered Mental Health Companion for University Students**

  <p align="center">
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react" alt="React" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" /></a>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs" alt="Node" /></a>
    <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB" /></a>
    <img src="https://img.shields.io/badge/License-MIT-gray?style=for-the-badge" alt="License MIT" />
  </p>
</div>

---

College can be overwhelming. Between academics, relationships, and future anxiety, student mental wellness often takes a backseat. **Mitra 2.0** is an accessible, 100% anonymous, and intelligent digital support platform built specifically to help students manage stress, track their mental well-being, and easily connect with professional campus counselors.

## ✨ Key Features

- **🤖 Non-judgmental AI Chatbot**: Real-time conversational AI equipped with emotion detection and crisis escalation systems.
- **🛡️ 100% Anonymity**: Users can register under true identities to verify university affiliation but navigate the app using auto-generated `Anonymous Aliases`.
- **📋 Clinical Screenings (PHQ-9 & GAD-7)**: Quick assessments to monitor depression and anxiety levels with visual dashboards.
- **📅 Frictionless Therapy Booking**: Browse campus counselors, view availability, and book online/in-person sessions instantly.
- **🤝 Peer Support Forum**: A secure, moderated community for students to share experiences, success stories, and seek advice anonymously.

## 🚀 Architecture & Tech Stack

Mitra 2.0 implements a modern, scalable MERN stack architecture integrated to Python-based Machine Learning models.

### **Frontend** (Client)
- **Framework**: React.js powered by Vite for lightning-fast HMR.
- **Styling**: Tailwind CSS & custom design system.
- **Routing**: React Router DOM.
- **State/Auth**: React Context API, JWT Interceptors via Axios.

### **Backend** (Server)
- **Environment**: Node.js & Express.js.
- **Database**: MongoDB & Mongoose.
- **Security**: Helmet, bcryptjs, express-rate-limit.

### **AI Microservice** (Future Implementation)
- **Environment**: Python & FastAPI.
- **AI Models**: HuggingFace pre-trained models for NLP emotion tagging and toxicity detection.

## 📂 Project Structure

```text
mitra2.0/
├── client/                 # React + Vite Frontend Application
│   ├── src/
│   │   ├── components/     # Reusable UI (Buttons, Cards, Modals) & Layouts
│   │   ├── context/        # AuthContext, ThemeContext
│   │   ├── pages/          # Login, Register, Home, Chat, Booking
│   │   ├── services/       # Axios API client
│   │   └── utils/          # Tailwind cn() mergers
├── server/                 # Node.js + Express Backend
│   ├── src/
│   │   ├── config/         # MongoDB and Env configs
│   │   ├── controllers/    # API Route Logic (Auth, Bookings)
│   │   ├── middleware/     # JWT Auth, Validation, Error Handling
│   │   ├── models/         # Mongoose Schemas (User, Chat, Post, Assessment)
│   │   └── routes/         # Express API Routers
├── docs/                   # Exhaustive project documentation
└── README.md
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB connection string (Local or Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/algorithnicmind/mitra2.0.git
   cd mitra2.0
   ```

2. **Setup the Backend:**
   ```bash
   cd server
   npm install
   cp .env.example .env     # Add your MONGO_URI and JWT_SECRET
   npm run dev
   ```
   *The server will run on `http://localhost:5000`*

3. **Setup the Frontend:**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```
   *The client will run on `http://localhost:5173`*

## 📚 Documentation
If you are contributing to or auditing the architecture, please explore the `/docs` directory for our comprehensive design documents:
- [API Reference](./docs/API_REFERENCE.md)
- [Database Design](./docs/DATABASE_DESIGN.md)
- [System Architecture](./docs/ARCHITECTURE.md)
- [MVP Development Plan](./docs/MVP_PLAN.md)

---

<div align="center">
  <i>Developed with ❤️ for student mental health.</i>
</div>
