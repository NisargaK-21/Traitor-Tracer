# Traitor Tracer Backend

Backend API for **Traitor Tracer**, an AI-powered Insider Threat Detection system developed for the **FinSpark 2026 Banking Cybersecurity Hackathon**.

The backend serves as the core of the application by managing user authentication, activity monitoring, AI integration, and secure data processing for continuous insider threat detection.

### Core Responsibilities

- Authentication & Authorization
- Role-Based Access Control (RBAC)
- User Management
- Activity Logging
- AI Risk Engine Integration
- Risk Score Generation
- Alert Management
- Audit Logging
- Secure REST APIs

---

# Tech Stack

| Layer | Technology |
|--------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Authentication | Firebase Admin SDK |
| AI Integration | Axios |
| Security | JWT, Helmet, Express Rate Limit, CORS |
| Logging | Morgan |

---

# Project Structure

```text
backend/
│
├── src/
│
├── app.js
├── server.js
│
├── config/
│   ├── db.js
│   └── firebase.js
│
├── constants/
│   ├── roles.js
│   ├── permissions.js
│   ├── riskLevels.js
│   ├── eventTypes.js
│   └── httpStatus.js
│
├── controllers/
│
├── middleware/
│   ├── authenticate.js
│   ├── authorize.js
│   ├── errorHandler.js
│   ├── validate.js
│   ├── rateLimiter.js
│   └── requestLogger.js
│
├── models/
│   ├── User.js
│   ├── Activity.js
│   ├── Alert.js
│   └── AuditLog.js
│
├── routes/
│
├── services/
│   ├── auth.service.js
│   ├── user.service.js
│   ├── activity.service.js
│   ├── alert.service.js
│   └── ai.service.js
│
├── utils/
│   ├── ApiError.js
│   ├── ApiResponse.js
│   ├── asyncHandler.js
│   └── logger.js
│
├── validations/
│
├── .env
├── package.json
└── README.md
```

---

# Backend Architecture

```text
Employee Portal
        │
        ▼
Express.js Routes
        │
        ▼
Controllers
        │
        ▼
Service Layer
        │
   ┌────┴──────────────┐
   ▼                   ▼
MongoDB Atlas     FastAPI AI Engine
                        │
                        ▼
              Isolation Forest +
            Rule-Based Risk Engine
                        │
                        ▼
             Risk Score & Alerts
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
POST /api/auth/login
      │
      ▼
Authentication Middleware
      │
      ▼
Create / Fetch User
      │
      ▼
Return JWT & User Details
```

---

# Activity Processing Pipeline

```text
Employee Activity
        │
        ▼
Log Activity
        │
        ▼
Store in MongoDB
        │
        ▼
Send to AI Service
        │
        ▼
Behavior Analysis
        │
        ▼
Risk Score Generated
        │
        ▼
Update Database
        │
        ▼
Generate Alert (if required)
```

---

# Database Models

## User

Stores employee and analyst information.

- Firebase UID
- Employee ID
- Name
- Email
- Role
- Department
- Login Metadata

---

## Activity

Stores every monitored user activity.

- User
- Event Type
- Resource
- Device
- IP Address
- Timestamp
- Risk Score
- Risk Level

---

## Alert

Generated for suspicious activities.

- User
- Activity
- Risk Score
- Risk Level
- Reason
- Status

---

## Audit Log

Maintains a secure history of system actions.

- User
- Action
- Timestamp
- Integrity Hash

---

# Security Features

- Firebase Authentication
- JWT Authentication
- Role-Based Access Control
- Helmet Security Headers
- Express Rate Limiting
- Request Validation
- Centralized Error Handling
- SHA-256 Audit Integrity

---

# Environment Variables

```env
PORT=5000

CLIENT_URL=http://localhost:3000

MONGODB_URI=

JWT_SECRET=

AI_SERVICE_URL=http://localhost:8000

FIREBASE_SERVICE_ACCOUNT=./firebase-service-account.json
```

---

# Running the Backend

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Health Check

```http
GET /api/health
```

---

# Features

- Firebase Authentication
- RBAC Authorization
- Activity Monitoring
- AI Risk Analysis
- Alert Generation
- Audit Logging
- REST APIs
- MongoDB Integration
- Secure Middleware

---

# Coding Standards

- ES Modules
- Layered Architecture
- MVC Pattern
- Service Layer Design
- Centralized Error Handling
- Async/Await
- Modular Code Structure
- Environment-Based Configuration
- Clean Code Principles
