const KEY = "outline.session.v1";

export function saveSession(session: any) {
  try { localStorage.setItem(KEY, JSON.stringify(session)); return true; } catch { return false; }
}

export function loadSession(): { session: any | null; notice: string | null } {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { session: null, notice: null };
    const parsed = JSON.parse(raw);
    if (parsed?.schemaVersion && parsed.schemaVersion !== 1) return { session: null, notice: `Incompatible session (schema ${parsed.schemaVersion}). Start a new workshop.` };
    return { session: parsed, notice: null };
  } catch {
    return { session: null, notice: "Stored session is corrupt and was ignored." };
  }
}

export function clearSession() { try { localStorage.removeItem(KEY); } catch {} }

export function validateImported(obj: any): { ok: boolean; session?: any; message: string } {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return { ok: false, message: "Invalid JSON object." };
  if (typeof obj.id !== "string" || typeof obj.currentStep !== "string") return { ok: false, message: "Missing required session fields." };
  if (obj.schemaVersion !== 1) return { ok: false, message: "Incompatible schema version." };
  return { ok: true, session: obj, message: "Imported." };
}
