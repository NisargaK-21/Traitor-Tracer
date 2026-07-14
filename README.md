# Traitor Tracer — AI-Driven Insider Threat & Privileged Access Misuse Detection

Banking Cybersecurity Track: *Privileged Access Misuse & Insider Threat Detection*

---

## Problem Statement

Insider threats — from employees, contractors, vendors, and administrators — acting maliciously, negligently, or under compromise pose serious risks to banking security and data integrity. Traditional access control only verifies *who is allowed in*; it does not verify *whether their behavior once inside is normal*. SentinelAccess closes that gap.

## What It Does

SentinelAccess continuously monitors privileged account activity in a simulated banking environment, builds a behavioral baseline per user and role, and uses anomaly detection to assign a real-time **risk score** to every action. High-risk behavior triggers real-time alerts to the security team and can automatically enforce **risk-based access control** (step-up authentication, session restriction). All logs and alerts are protected using **post-quantum cryptography**, ensuring long-term confidentiality and tamper-evidence even against future quantum-capable attackers.

## Key Features

- 🔍 **Real-time behavioral monitoring** of privileged account activity
- 🤖 **AI-driven anomaly detection** (Isolation Forest + rule-based engine) with explainable risk scores
- ⚠️ **Live alerting** via WebSockets to a security dashboard
- 🔐 **Risk-based authentication** — step-up MFA / session action triggered by risk score
- 🛡️ **Quantum-safe cryptography** for data-at-rest encryption and tamper-evident audit logs
- 📊 **Admin dashboard** with risk leaderboard, live alert feed, and per-user behavior timelines
- 🧪 **Synthetic banking dataset generator** simulating realistic normal + malicious insider behavior

## Architecture

```
Employee Portal (Next.js) ──▶ Backend API (Express) ──▶ MongoDB (events, users, alerts)
                                     │                          │
                                     ▼                          ▼
                          AI Risk Engine (FastAPI)  ◀──── Redis (live session cache)
                                     │
                                     ▼
                     Risk Score ──▶ Alert Service ──▶ Socket.io ──▶ Admin Dashboard (Next.js)
                                     │
                                     ▼
                    Quantum-Safe Crypto Layer (PQC encrypt + sign)
```

Full architecture and design rationale: see [`PROJECT_GUIDE.md`](./PROJECT_GUIDE.md).

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Redis |
| AI/ML | Python, FastAPI, scikit-learn, pandas |
| Auth | Firebase Authentication + JWT |
| Real-time | Socket.io |
| Security | Post-Quantum Cryptography (ML-KEM / ML-DSA via liboqs) |

## Project Structure

```
.
├── frontend/         # Next.js app — employee portal + admin dashboard
├── backend/          # Express API — auth, logging, alerts, access control
├── ai-service/        # FastAPI — feature engineering, anomaly detection, risk scoring
├── PROJECT_GUIDE.md  # Full architecture, AI design, and dev plan documentation
└── README.md
```

## Getting Started

### Prerequisites
- Node.js ≥ 18
- Python ≥ 3.10
- MongoDB (local or Atlas)
- Redis (local or hosted)

### Setup

```bash
# 1. Clone the repo
git clone <repo-url>
cd sentinelaccess

# 2. Backend
cd backend
npm install
cp .env.example .env   # fill in Mongo URI, Firebase config, Redis URL
npm run dev

# 3. AI service
cd ../ai-service
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# 4. Frontend
cd ../frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Visit `http://localhost:3000` for the employee portal and `http://localhost:3000/admin/overview` for the security dashboard.

## Environment Variables

| Variable | Location | Description |
|---|---|---|
| `MONGODB_URI` | backend/.env | MongoDB connection string |
| `REDIS_URL` | backend/.env | Redis connection string |
| `FIREBASE_*` | backend/.env, frontend/.env.local | Firebase Auth config |
| `AI_SERVICE_URL` | backend/.env | URL of the FastAPI risk engine |
| `PQC_KEY_PATH` | backend/.env | Path to generated PQC keypair |

## Team

| Name | Role |
|---|---|
| — | Backend & Integration Lead |
| — | AI/ML Lead |
| — | Real-Time & Security Lead |
| — | Frontend Lead |

## Roadmap / Future Work

- Peer-group behavioral clustering for role-relative anomaly baselines
- LLM-generated natural-language alert summaries for analysts
- Full TLS-layer PQC migration (beyond data-at-rest scope)
- Integration with real SIEM/UEBA tooling (Splunk, Microsoft Sentinel) via connector


