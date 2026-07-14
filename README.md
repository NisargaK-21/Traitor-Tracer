# Traitor Tracer

Traitor Tracer is a full-stack insider-threat monitoring prototype that combines a modern web frontend, an Express backend, and a Python AI service to analyze suspicious behavior and assign risk scores.

## Overview

The project is designed to simulate an insider-threat detection workflow for a security-oriented application. It collects user activity/event data, sends that data to an AI-based risk engine, stores the result, and presents alerts and insights through a dashboard.

This is best understood as an integrated MVP/prototype rather than a production-ready security platform. The core flow is implemented in code, but runtime success still depends on proper environment setup and external services such as MongoDB, Redis, Firebase, and the AI service.

## Project flow

1. A user interacts with the frontend portal or dashboard.
2. The frontend sends requests to the backend API.
3. The backend validates the request and looks up related user information.
4. The backend calls the AI service to analyze the event and calculate risk.
5. The AI service returns a risk score, risk level, and reasons.
6. The backend stores the event and, when appropriate, creates an alert.
7. The frontend displays the updated data through the dashboard and alert views.

## Architecture

The project is organized into three main layers:

- Frontend: Next.js-based UI for portal and admin/dashboard views
- Backend: Express API for auth, event handling, alerts, and service integration
- AI service: FastAPI-based risk engine for scoring and reasoning

The backend connects to MongoDB for persistent records and also includes Redis-related configuration as part of the stack.

## What is implemented

The codebase currently supports the following core pieces:

- user-facing web UI in the frontend
- backend routes and controllers for events, alerts, sessions, and auth-related flows
- AI service endpoint for analyzing incoming event data
- event creation flow that sends data to the AI service and stores the result
- dashboard-style views for monitoring activity and alerts

## Repository structure

```text
.
├── frontend/        # Next.js UI and pages
├── backend/         # Express API and business logic
├── ai-service/      # FastAPI risk engine
└── README.md        # Project overview
```

## Tech stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js, React, Tailwind CSS, Recharts, Framer Motion |
| Backend | Node.js, Express.js, Mongoose, JWT, Firebase Admin |
| AI Service | Python, FastAPI |
| Data | MongoDB, Redis |
| Real-time | Socket.io |
| Auth | Firebase Authentication + backend token handling |

## How to run locally

### Prerequisites

- Node.js 18+
- Python 3.10+
- MongoDB running locally or reachable remotely
- Redis available if you want to use the configured Redis layer

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

The backend starts with the Express server and listens on port 5000 by default.

### 2. AI service

```bash
cd ai-service
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on port 3000 by default.

## Environment variables

Before running the app, configure the required variables in the backend and frontend environment files.

Typical backend values include:

- MONGODB_URI
- AI_SERVICE_URL
- PORT
- Firebase-related settings if authentication is enabled in your local setup

Typical frontend values include:

- NEXT_PUBLIC_API_URL

## Notes on maturity

This project is a solid full-stack prototype with a clear structure and working integration paths. It is suitable for learning, demoing, and further development.

For a fully working end-to-end run in practice, the remaining focus should be:

- validating the local environment setup,
- confirming MongoDB, Redis, and Firebase connectivity,
- testing the AI service integration with real event payloads,
- and adding more robust deployment and testing coverage.

## Summary

Traitor Tracer demonstrates a realistic full-stack approach to insider-threat detection by combining:

- a web-based frontend,
- a backend API,
- AI-based risk scoring,
- and data persistence for alerts and events.


