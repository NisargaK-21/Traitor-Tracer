# 🛡️ Traitor Tracer

> AI-Powered Insider Threat Detection & Privileged Access Misuse Prevention Platform

Traitor Tracer is an AI-driven security platform designed to detect insider threats and privileged account misuse in banking environments. It continuously analyzes employee activities, identifies anomalous behaviour using machine learning, generates real-time security alerts, verifies audit log integrity using cryptographic signatures, and enables risk-based access control for high-risk operations.

---

# 📌 Problem Statement

**Privileged Access Misuse & Insider Threat Detection**

Financial institutions face significant risks from malicious or compromised employees, contractors, administrators, and third-party vendors. Traditional security systems often fail to detect behavioural anomalies before sensitive data is exposed.

Traitor Tracer addresses this challenge by combining AI-powered behavioural analytics with cryptographic integrity verification to proactively detect and respond to insider threats.

---

# 🎯 Key Features

- 🤖 AI-based Behaviour Analysis
- 🚨 Real-Time Insider Threat Detection
- 📊 Dynamic Risk Score Calculation
- 🔒 Risk-Based Access Control
- 🛡️ Quantum-Safe Integrity Verification
- 📈 Privileged Access Monitoring
- 🔔 Automatic Alert Generation
- 📋 Immutable Audit Event Verification

---

# 🏗️ System Architecture

```
                    +----------------------+
                    |      Frontend        |
                    |     Next.js App      |
                    +----------+-----------+
                               |
                               |
                               ▼
                    +----------------------+
                    |   Express Backend    |
                    | Authentication       |
                    | Event Processing     |
                    | Alert Generation     |
                    | Crypto Verification  |
                    +----------+-----------+
                               |
                 +-------------+--------------+
                 |                            |
                 ▼                            ▼
        +----------------+          +------------------+
        |   AI Service   |          | MongoDB Atlas    |
        | FastAPI + ML   |          | Users            |
        | IsolationForest|          | Events           |
        | Risk Scoring   |          | Alerts           |
        +----------------+          +------------------+
```

---

# 🧠 AI Behaviour Analysis

The AI engine evaluates every incoming event using behavioural indicators such as:

- Login Time
- Failed Login Attempts
- Number of Downloads
- VPN Usage
- USB Device Detection
- Administrative Privilege Usage
- Event Type
- User Role

The model combines:

- Rule-Based Behaviour Analysis
- Isolation Forest Machine Learning Algorithm

Output includes:

- Risk Score
- Risk Level
- Behavioural Reasons
- Anomaly Detection

---

# 🔒 Cryptographic Integrity Verification

Every audit event is protected using cryptographic hashing.

When an event is created:

```
Event Data
      │
      ▼
Generate SHA-256 Signature
      │
      ▼
Store Signature Alongside Event
```

Whenever the event is retrieved:

```
Stored Event
      │
      ▼
Generate New Signature
      │
      ▼
Compare With Stored Signature
      │
      ▼
Integrity Verified ✅ / Tampered ❌
```

If anyone modifies even a single field inside MongoDB, the verification immediately fails.

---

# 🚨 Risk-Based Access Control

Based on AI-generated risk scores:

| Risk Score | Action |
|------------|---------|
| 0 – 39 | Allow Operation |
| 40 – 79 | Generate Security Alert |
| 80 – 100 | Require Administrative Approval |

This enables proactive security before sensitive operations are completed.

---

# ⚙️ Tech Stack

## Frontend

- Next.js
- React
- Tailwind CSS

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Firebase Admin SDK

## AI Service

- FastAPI
- Python
- Scikit-Learn
- Isolation Forest
- NumPy
- Pandas

## Security

- SHA-256 Cryptographic Hashing
- Integrity Verification
- Risk-Based Access Control

---

# 📂 Project Structure

```
Traitor-Tracer
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── public/
│
├── backend/
│   ├── src/
│   │
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── validations/
│   └── server.js
│
└── ai-service/
    ├── app.py
    ├── model.py
    ├── schemas.py
    └── requirements.txt
```

---

# 📊 Workflow

```
User Activity
      │
      ▼
Backend Receives Event
      │
      ▼
AI Behaviour Analysis
      │
      ▼
Risk Score Generated
      │
      ▼
Generate Cryptographic Signature
      │
      ▼
Store Event in MongoDB
      │
      ▼
Generate Alert (if required)
      │
      ▼
Return Decision
```

---

# 🔔 Alert Generation

High-risk activities automatically create alerts containing:

- Employee Information
- Risk Score
- Risk Level
- Behavioural Reasons
- Timestamp
- Event Reference

---

# 🧪 Example High Risk Event

```json
{
    "employeeId":"EMP001",
    "eventType":"EXPORT_DATA",
    "downloads":250,
    "failedLogins":8,
    "vpn":true,
    "usbInserted":true,
    "adminAction":true
}
```

AI Output

```json
{
    "riskScore":100,
    "riskLevel":"HIGH",
    "anomaly":true
}
```

---

# 🔍 API Endpoints

## Authentication

```
POST /api/auth/login
```

---

## Events

```
POST /api/events
GET  /api/events
GET  /api/events/:id
```

---

## Alerts

```
GET /api/alerts
PATCH /api/alerts/:id
```

---

# 🚀 Local Setup

## Clone Repository

```bash
git clone https://github.com/NisargaK-21/Traitor-Tracer.git
cd Traitor-Tracer
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## AI Service

```bash
cd ai-service

pip install -r requirements.txt

uvicorn app:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🌐 Deployment

## Frontend

Vercel

## Backend

Render

## AI Service

Render

## Database

MongoDB Atlas

---

# 🎯 Future Enhancements

- Multi-Factor Authentication (MFA)
- Real-Time Threat Dashboard
- Redis-Based Event Streaming
- SIEM Integration
- Role-Based Approval Workflow
- Quantum-Safe Digital Signatures
- Continuous Behaviour Learning
- Email & Slack Alert Notifications
