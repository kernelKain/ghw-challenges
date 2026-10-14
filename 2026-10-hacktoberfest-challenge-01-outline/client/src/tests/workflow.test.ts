import { describe, it, expect } from "vitest";
import { createEmptySession, setTimeBudget, applyDefault, approveGate, setGateDraft, computeExportReadiness } from "../engine/workflow";

describe("workflow", () => {
  it("blocks approve outside gate", () => {
    const s = createEmptySession();
    expect(() => approveGate(s)).toThrow();
  });
  it("default accepts backend answer only", () => {
    const s = createEmptySession();
    const s2 = { ...s, currentStep: "backend_q" as any };
    const out = applyDefault(s2);
    expect(out.builder.backendPreference).toBe("Python");
    expect(out.currentStep).toBe("build_setup_q");
  });
  it("approve applies only current draft and revision", () => {
    let s = createEmptySession();
    s = { ...s, currentStep: "gate_a" as any };
    s = setGateDraft(s, "A", { title: "draft" });
    const beforeRev = s.gates.A.revision;
    const out = approveGate(s);
    expect(out.gates.A.approved).toBe(true);
    expect(out.gates.A.approvedRevision).toBe(beforeRev);
    expect(out.currentStep).toBe("gate_b");
  });
  it("changed constraint marks gate stale and blocks export", () => {
    let s = createEmptySession();
    s = { ...s, currentStep: "gate_a" as any };
    s = setGateDraft(s, "A", { title: "draft" });
    s = approveGate(s);
    s = setTimeBudget(s, 10, "2026-10-11", "PDT");
    expect(s.gates.A.stale).toBe(true);
    expect(s.exportReadiness.canExport).toBe(false);
  });
  it("final packet readiness requires all gates", () => {
    const s = createEmptySession();
    const r = computeExportReadiness({ gates: s.gates, selection: null, brief: null, builder: s.builder, ideaBatches: [] } as any);
    expect(r.canExport).toBe(false);
    expect(r.missingFields).toContain("brief");
  });
});
