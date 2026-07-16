# Traitor Tracer AI Service

AI Risk Engine for **Traitor Tracer**, an AI-powered Insider Threat Detection system developed for the **FinSpark 2026 Banking Cybersecurity Hackathon**.

The AI service analyzes employee behavior, detects anomalies, calculates risk scores, and provides explanations for suspicious activities to help identify potential insider threats in real time.

### Core Responsibilities

- Behavioral Analysis
- Insider Threat Detection
- Risk Score Generation
- Anomaly Detection
- Rule-Based Risk Evaluation
- AI Explanation Generation
- REST API Endpoints
- Prediction Logging

---

# Tech Stack

| Layer | Technology |
|--------|------------|
| Language | Python |
| Framework | FastAPI |
| Machine Learning | Scikit-learn |
| Data Processing | Pandas |
| Numerical Computing | NumPy |
| Model Storage | Joblib |
| ML Algorithm | Isolation Forest |
| API Server | Uvicorn |

---

# Project Structure

```text
ai-service/
│
├── app/
│   ├── api/
│   ├── models/
│   ├── services/
│   ├── utils/
│   └── schemas/
│
├── datasets/
│
├── trained_models/
│   ├── isolation_forest.pkl
│   └── scaler.pkl
│
├── training/
│   ├── train_model.py
│   └── preprocess.py
│
├── main.py
├── requirements.txt
├── .env
└── README.md
```

---

# AI Service Architecture

```text
Express.js Backend
        │
        ▼
 FastAPI AI Service
        │
        ▼
Data Preprocessing
        │
        ▼
Isolation Forest
        │
        ▼
Rule-Based Risk Engine
        │
        ▼
Risk Score Generation
        │
        ▼
Prediction Response
```

---

# Prediction Flow

```text
Receive User Activity
        │
        ▼
Validate Request
        │
        ▼
Preprocess Features
        │
        ▼
Isolation Forest Prediction
        │
        ▼
Rule-Based Risk Evaluation
        │
        ▼
Generate Risk Score
        │
        ▼
Return Prediction & Explanation
```

---

# AI Modules

## Data Preprocessing

Prepares incoming activity data before inference.

- Feature Extraction
- Data Cleaning
- Feature Scaling
- Input Validation

---

## Isolation Forest

Detects anomalous user behavior.

- Behavioral Analysis
- Outlier Detection
- Anomaly Prediction

---

## Rule-Based Risk Engine

Enhances prediction accuracy using predefined banking security rules.

- Privileged Action Checks
- High-Risk Activity Detection
- Policy Violation Detection
- Risk Adjustment

---

## Prediction Response

Returns:

- Risk Score
- Risk Level
- Prediction Result
- AI Explanation

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/predict` | Analyze user activity |
| GET | `/health` | Service health status |

---

# Environment Variables

```env
MODEL_PATH=trained_models/isolation_forest.pkl

SCALER_PATH=trained_models/scaler.pkl

LOG_LEVEL=INFO
```

---

# Running the AI Service

Install dependencies

```bash
pip install -r requirements.txt
```

Start the FastAPI server

```bash
uvicorn main:app --reload
```

Health Check

```http
GET /health
```

Prediction

```http
POST /predict
```

---

# Features

- FastAPI REST APIs
- Isolation Forest Detection
- Rule-Based Risk Engine
- Risk Score Generation
- AI Explanations
- Data Preprocessing
- Prediction Logging
- Modular Architecture

---

# Coding Standards

- Modular Project Structure
- Service-Oriented Design
- Type Hints
- Pydantic Validation
- RESTful APIs
- Scikit-learn Best Practices
- Clean Code Principles
- Environment-Based Configuration
- Reusable Components
