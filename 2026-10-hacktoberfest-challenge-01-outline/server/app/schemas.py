from typing import Any, Literal, Optional
from pydantic import BaseModel, Field

ClaimLabel = Literal["Verified", "Supported", "Assumption", "Unknown"]

class SourceRecord(BaseModel):
    id: str
    kind: Literal["url", "pasted", "retrieved"]
    ref: str
    excerpt: str | None = None
    retrieved_at: str | None = None
    claims: list[str] = Field(default_factory=list)

class Claim(BaseModel):
    id: str
    text: str
    label: ClaimLabel
    evidence_ids: list[str] = Field(default_factory=list)

class BuilderProfile(BaseModel):
    backend_preference: Literal["Python", "Java", "Go"] = "Python"
    total_hours: float | None = None
    deadline: str | None = None
    timezone: str | None = None
    coding_mode: str | None = None
    interests: list[str] = Field(default_factory=list)
    resources: list[str] = Field(default_factory=list)
    excluded_directions: list[str] = Field(default_factory=list)

class ExportReadiness(BaseModel):
    gates_complete: list[str] = Field(default_factory=list)
    stale_gates: list[str] = Field(default_factory=list)
    missing_fields: list[str] = Field(default_factory=list)
    can_export: bool = False
