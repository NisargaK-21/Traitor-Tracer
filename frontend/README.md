# Traitor Tracer Frontend

Frontend application for **Traitor Tracer**, an AI-powered Insider Threat Detection system developed for the **FinSpark 2026 Banking Cybersecurity Hackathon**.

The frontend provides an intuitive interface for employees and security analysts to monitor privileged activities, visualize AI-generated risk insights, and respond to potential insider threats in real time.

### Core Responsibilities

- Secure User Authentication
- Employee Dashboard
- Security Analyst Dashboard
- User Activity Monitoring
- Risk Score Visualization
- Alert Management
- AI Explanation Display
- Timeline & Audit View
- Responsive User Interface

---

# Tech Stack

| Layer | Technology |
|--------|------------|
| Framework | Next.js |
| Library | React.js |
| Styling | Tailwind CSS |
| State Management | React Context API |
| Authentication | Firebase Authentication |
| API Communication | Axios |
| Icons | Lucide React |
| Routing | Next.js App Router |

---

# Project Structure

```text
frontend/
│
├── app/
│
├── components/
│   ├── common/
│   ├── dashboard/
│   ├── alerts/
│   ├── timeline/
│   ├── charts/
│   └── ui/
│
├── context/
│
├── hooks/
│
├── services/
│   ├── api.js
│   ├── auth.js
│   └── activity.js
│
├── utils/
│
├── public/
│
├── styles/
│
├── .env.local
├── package.json
└── README.md
```

---

# Frontend Architecture

```text
Employee / Security Analyst
            │
            ▼
      Next.js Frontend
            │
            ▼
 Firebase Authentication
            │
            ▼
       Axios API Calls
            │
            ▼
     Express.js Backend
            │
      ┌─────┴─────────┐
      ▼               ▼
 MongoDB Atlas   FastAPI AI Engine
```

---

# Authentication Flow

```text
User Login
      │
      ▼
Firebase Authentication
      │
      ▼
Firebase ID Token
      │
      ▼
Backend Verification
      │
      ▼
Receive User Details
      │
      ▼
Load Dashboard
```

---

# User Flow

```text
User Login
      │
      ▼
Employee / Analyst Dashboard
      │
      ▼
View Activities
      │
      ▼
Receive Risk Scores
      │
      ▼
View Alerts
      │
      ▼
Investigate Events
```

---

# Main Pages

- Login
- Employee Dashboard
- Security Analyst Dashboard
- Activity Timeline
- Alerts
- User Profile
- Audit History

---

# Features

- Firebase Authentication
- Responsive UI
- Employee Dashboard
- Analyst Dashboard
- Activity Timeline
- AI Risk Score Display
- Alert Management
- Audit Log Viewer
- REST API Integration

---

# Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000

NEXT_PUBLIC_FIREBASE_API_KEY=

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=

NEXT_PUBLIC_FIREBASE_PROJECT_ID=

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=

NEXT_PUBLIC_FIREBASE_APP_ID=
```

---

# Running the Frontend

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

---

# UI Modules

- Authentication
- Employee Portal
- Security Dashboard
- Alerts
- Risk Analysis
- Activity Timeline
- Profile
- Settings

---

# Coding Standards

- Next.js App Router
- Component-Based Architecture
- Reusable UI Components
- React Hooks
- Context API
- Axios Service Layer
- Tailwind CSS Utility Classes
- Clean Folder Structure
- Responsive Design
- Environment-Based Configuration
