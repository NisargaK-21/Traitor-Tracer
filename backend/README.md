# Traitor Tracer Backend

Backend API for **Traitor Tracer**, an AI-driven Insider Threat Detection platform built for the Banking Cybersecurity Track.

The backend is responsible for:

- Authentication & Authorization
- User Management
- Privileged Event Logging
- AI Service Integration
- Alert Generation
- Real-Time Notifications
- Session Management
- Audit Logging

---

# Tech Stack

| Layer | Technology |
|--------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Authentication | Firebase Admin SDK |
| Real-time | Socket.io |
| Cache | Redis |
| AI Communication | Axios |
| Logging | Morgan + Winston |
| Security | Helmet, CORS, Express Rate Limit |

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
│   ├── firebase.js
│   ├── redis.js
│   └── socket.js
│
├── constants/
│   ├── roles.js
│   ├── permissions.js
│   ├── rolePermissions.js
│   ├── riskLevels.js
│   ├── eventTypes.js
│   ├── alertStatus.js
│   └── httpStatus.js
│
├── controllers/
│
├── middleware/
│   ├── authenticate.js
│   ├── authorize.js
│   ├── errorHandler.js
│   ├── notFound.js
│   ├── requestLogger.js
│   ├── validate.js
│   └── rateLimiter.js
│
├── models/
│   ├── User.js
│   ├── Event.js
│   ├── Alert.js
│   ├── Session.js
│   └── AuditLog.js
│
├── routes/
│
├── services/
│   ├── auth.service.js
│   ├── user.service.js
│   ├── event.service.js
│   ├── alert.service.js
│   ├── ai.service.js
│   ├── socket.service.js
│   └── pqc.service.js
│
├── sockets/
│
├── utils/
│   ├── ApiError.js
│   ├── ApiResponse.js
│   ├── asyncHandler.js
│   ├── logger.js
│   └── helpers.js
│
├── validations/
│
├── tests/
│
├── .env
├── .env.example
├── package.json
└── README.md
```

---

# Backend Architecture

```
Frontend
     │
     ▼
Express Routes
     │
     ▼
Controllers
     │
     ▼
Services
     │
     ├────────► MongoDB
     │
     ├────────► AI Service
     │
     ├────────► Redis
     │
     └────────► Socket.io
```

---

# Authentication Flow

```
Frontend Login
        │
Firebase Authentication
        │
Firebase ID Token
        │
POST /api/auth/login
        │
Authenticate Middleware
        │
Find/Create User
        │
Update Login Metadata
        │
Return User Profile
```

---

# Event Processing Pipeline

```
Employee Action
        │
        ▼
Create Event
        │
        ▼
Store in MongoDB
        │
        ▼
Send Event to AI Service
        │
        ▼
Receive Risk Score
        │
        ▼
Update Event
        │
        ▼
Generate Alert
        │
        ▼
Socket.io Notification
```

---

# Current Models

## User

Stores employee information.

- Firebase UID
- Employee ID
- Name
- Email
- Role
- Department
- Designation
- Login Metadata

---

## Event

Stores every privileged action.

- User
- Event Type
- Resource
- Device
- IP Address
- Location
- Metadata
- Risk Score
- Risk Level

---

## Alert

Generated when suspicious behavior is detected.

- Event
- User
- Risk Score
- Risk Level
- Reason
- Status

---

## Session

Tracks authenticated user sessions.

---

# Security Features

- Firebase Authentication
- Role-Based Access Control (RBAC)
- Permission-Based Authorization
- Rate Limiting
- Helmet Security Headers
- Request Logging
- Global Error Handling
- Secure Environment Variables

---

# Environment Variables

```env
PORT=5000

CLIENT_URL=http://localhost:3000

MONGODB_URI=

JWT_SECRET=

REDIS_URL=

AI_SERVICE_URL=http://localhost:8000

FIREBASE_SERVICE_ACCOUNT=./firebase-service-account.json
```

---

# Running the Backend

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Health Check

```
GET /api/health
```

---

# Development Progress

## Completed

- Project Structure
- Express Server
- MongoDB Connection
- Security Middleware
- Global Error Handling
- Logger
- Firebase Authentication Middleware
- RBAC (Roles & Permissions)
- User Model
- Event Model
- Alert Model
- Authentication Service
- Event Service
- Alert Service
- AI Service Communication Layer

---

## In Progress

- FastAPI AI Integration
- Event Controller
- Alert Controller
- Dashboard APIs
- Socket.io Notifications
- Redis Session Management

---

## Upcoming

- Isolation Forest Integration
- Rule-Based Risk Engine
- Risk-Based Authentication
- PQC Integration
- Audit Log Signing
- SIEM Connectors
- Analytics Dashboard

---

# Coding Standards

- ES Modules
- Layered Architecture
- Service Layer Pattern
- Centralized Error Handling
- Async Handler
- Consistent API Responses
- Enterprise Folder Structure
- Environment-Based Configuration
- Clean Separation of Concerns