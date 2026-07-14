# High-risk event types — these actions are outside normal employee workflow
HIGH_RISK_EVENTS = {
    "EXPORT_DATA": (40, "Bulk customer data export"),
    "VIEW_ACCOUNT": (30, "Document/account access outside approval workflow"),
    "VIEW_CUSTOMER": (15, "Customer profile lookup"),
    "DELETE_CUSTOMER": (35, "Customer record deletion"),
    "CHANGE_ROLE": (35, "Role/permission change"),
    "SYSTEM_CONFIGURATION": (30, "System configuration change"),
}


def evaluate_rules(data):

    score = 0
    reasons = []

    # Event-type inherent risk
    if data.eventType in HIGH_RISK_EVENTS:
        pts, label = HIGH_RISK_EVENTS[data.eventType]
        score += pts
        reasons.append(label)

    if data.hour < 6 or data.hour > 22:
        score += 25
        reasons.append("Login outside business hours")

    if data.failedLogins >= 5:
        score += 20
        reasons.append("Too many failed logins")

    if data.downloads > 100:
        score += 25
        reasons.append("Excessive file downloads")

    if data.vpn:
        score += 10
        reasons.append("VPN detected")

    if data.usbInserted:
        score += 10
        reasons.append("USB device connected")

    if data.adminAction:
        score += 15
        reasons.append("Privileged administrative action")

    return score, reasons