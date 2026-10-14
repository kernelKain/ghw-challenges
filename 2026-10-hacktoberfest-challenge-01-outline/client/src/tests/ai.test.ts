import { describe, it, expect, vi, beforeEach } from "vitest";
import { requestGeneration, rejectStale } from "../services/ai";

beforeEach(() => { vi.restoreAllMocks(); });

describe("ai adapter", () => {
  it("handles valid response", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ json: async () => ({ status: "ok", content: { x: 1 }, request_id: "r1" }) }) as any;
    const r = await requestGeneration("brief_review", {}, "r1");
    expect(r.status).toBe("ok");
  });
  it("handles malformed response", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ json: async () => ({ status: "invalid_output", message: "bad", request_id: "r2" }) }) as any;
    const r = await requestGeneration("brief_review", {}, "r2");
    expect(r.status).toBe("invalid_output");
  });
  it("handles failed fetch", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("net")) as any;
    const r = await requestGeneration("brief_review", {}, "r3");
    expect(r.status).toBe("error");
  });
  it("handles cancelled", async () => {
    const ctrl = new AbortController();
    ctrl.abort();
    globalThis.fetch = vi.fn().mockRejectedValue(Object.assign(new Error("aborted"), { name: "AbortError" })) as any;
    const r = await requestGeneration("brief_review", {}, "r4", ctrl.signal);
    expect(r.status).toBe("cancelled");
  });
  it("handles duplicate", async () => {
    // simulate in-flight by monkey: first never resolves
    let resolve: any;
    globalThis.fetch = vi.fn().mockReturnValue(new Promise(res => { resolve = res; })) as any;
    const p1 = requestGeneration("s", {}, "dup");
    const r2 = await requestGeneration("s", {}, "dup");
    expect(r2.status).toBe("duplicate");
    resolve({ json: async () => ({ status: "ok", content: {}, request_id: "dup" }) });
    await p1;
  });
  it("stale rejection", () => {
    expect(rejectStale("current", "incoming")).toBe(true);
    expect(rejectStale("same", "same")).toBe(false);
  });
});
