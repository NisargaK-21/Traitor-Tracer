def evaluate_rules(data):

    score = 0
    reasons = []

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