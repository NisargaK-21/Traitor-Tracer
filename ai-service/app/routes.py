from fastapi import APIRouter

from app.schemas import AnalyzeRequest
from app.risk_engine import calculate_risk

router = APIRouter()


@router.post("/analyze")
def analyze(data: AnalyzeRequest):

    result = calculate_risk(data)

    return {
        "success": True,
        "data": result
    }