import os
import json
import urllib.request
import urllib.error
from typing import Any


def config():
    return {
        "base_url": os.getenv("OUTLINE_LLM_BASE_URL", "").rstrip("/"),
        "api_key": os.getenv("OUTLINE_LLM_API_KEY", ""),
        "model": os.getenv("OUTLINE_LLM_MODEL", ""),
    }

def available() -> bool:
    c = config()
    return bool(c["base_url"] and c["model"])

def generate(step: str, context: dict[str, Any], request_id: str) -> dict[str, Any]:
    if not available():
        return {"status": "unavailable", "message": "Live AI is not configured. Use sample workshop or configure server environment.", "request_id": request_id}
    c = config()
    payload = {
        "model": c["model"],
        "messages": [
            {"role": "system", "content": "Return strict JSON for the requested step only. Do not control workflow transitions."},
            {"role": "user", "content": json.dumps({"step": step, "context": context})},
        ],
    }
    req = urllib.request.Request(
        f"{c['base_url']}/chat/completions",
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json", **({"Authorization": f"Bearer {c['api_key']}" } if c["api_key"] else {})},
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            raw = resp.read().decode()
    except urllib.error.HTTPError as e:
        if e.code == 429:
            return {"status": "rate_limited", "message": "Rate limit reached. Try again later.", "request_id": request_id}
        return {"status": "error", "message": "Provider error. Draft preserved; retry or use sample workshop.", "request_id": request_id}
    except Exception:
        return {"status": "error", "message": "Network or provider error. Draft preserved; retry or use sample workshop.", "request_id": request_id}
    try:
        data = json.loads(raw)
        content = data.get("choices", [{}])[0].get("message", {}).get("content", "")
        parsed = json.loads(content)
    except (json.JSONDecodeError, ValueError):
        return {"status": "invalid_output", "message": "Model returned invalid structured output.", "request_id": request_id}
    return {"status": "ok", "content": parsed, "request_id": request_id}
