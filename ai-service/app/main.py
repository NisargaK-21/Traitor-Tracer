from fastapi import FastAPI

from app.routes import router

app = FastAPI(
    title="Traitor Tracer AI Service",
    version="1.0.0"
)

app.include_router(router)


@app.get("/")
def home():
    return {
        "message": "AI Service Running"
    }