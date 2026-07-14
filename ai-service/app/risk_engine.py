from app.detector import detect_anomaly
from app.rules import evaluate_rules


def calculate_risk(data):

    rule_score, reasons = evaluate_rules(data)
    
    anomaly = bool(detect_anomaly(data))

    if anomaly:
        rule_score += 30
        reasons.append("Isolation Forest detected anomalous behaviour")

    rule_score = min(rule_score, 100)

    if rule_score >= 80:
        level = "HIGH"
    elif rule_score >= 50:
        level = "MEDIUM"
    else:
        level = "LOW"

    return {
        "riskScore": rule_score,
        "riskLevel": level,
        "anomaly": anomaly,
        "reasons": reasons
    }