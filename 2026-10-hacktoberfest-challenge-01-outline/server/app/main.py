from fastapi import FastAPI
from pydantic import BaseModel
from typing import Any
from app.schemas import ExportReadiness
from app.ai import generate, available

app = FastAPI(title="Outline API", version="0.1.0")

class GenerateRequest(BaseModel):
    step: str
    context: dict[str, Any] = {}
    request_id: str

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "outline", "ai_available": str(available()).lower()}

@app.post("/generate")
def generate_route(req: GenerateRequest) -> dict[str, Any]:
    return generate(req.step, req.context, req.request_id)

@app.get("/export-readiness/sample", response_model=ExportReadiness)
def sample_readiness() -> ExportReadiness:
    return ExportReadiness(can_export=False, draft_allowed=True)
