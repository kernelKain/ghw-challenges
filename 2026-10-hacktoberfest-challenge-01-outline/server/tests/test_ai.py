from fastapi.testclient import TestClient
from app.main import app

def test_generate_unavailable_without_config():
    client = TestClient(app)
    r = client.post("/generate", json={"step":"brief_review","context":{},"request_id":"r1"})
    assert r.status_code == 200
    assert r.json()["status"] == "unavailable"
