from fastapi import FastAPI
from app.schemas import ExportReadiness

app = FastAPI(title="Outline API", version="0.1.0")

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "outline"}

@app.get("/export-readiness/sample", response_model=ExportReadiness)
def sample_readiness() -> ExportReadiness:
    return ExportReadiness(can_export=False, draft_allowed=True)
