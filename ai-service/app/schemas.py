from pydantic import BaseModel


class AnalyzeRequest(BaseModel):
    employeeId: str
    role: str
    eventType: str
    hour: int
    failedLogins: int
    downloads: int
    country: str
    ip: str
    device: str
    vpn: bool
    usbInserted: bool
    adminAction: bool