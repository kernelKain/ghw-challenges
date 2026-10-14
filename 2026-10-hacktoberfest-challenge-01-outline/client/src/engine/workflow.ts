import { SCHEMA_VERSION, SOURCE_FRAMEWORK_VERSION } from "../contracts/schema";

type Step = any; type GateKey = "A"|"B"|"C"|"D"; // simplified for foundation

const orderedSteps = ["landing","brief_intake","brief_review","backend_q","build_setup_q","profile_secondary","ideation_generating","idea_review","selection","gate_a","gate_b","gate_c","gate_d","final_validation","final_packet","export"];

function now() { return new Date().toISOString(); }
function uid() { return "ws_" + Math.random().toString(36).slice(2, 10); }

export function createEmptySession(mode: "live" | "sample" = "live"): any {
  const builder = { backendPreference: "Python", totalHours: null, deadline: null, timezone: null, interests: [], resources: [], excludedDirections: [] };
  const gates = { A: null, B: null, C: null, D: null };
  const session: any = {
    id: uid(),
    schemaVersion: SCHEMA_VERSION,
    sourceFrameworkVersion: SOURCE_FRAMEWORK_VERSION,
    mode,
    createdAt: now(),
    updatedAt: now(),
    currentStep: "landing",
    status: "active",
    brief: null,
    builder,
    ideaBatches: [],
    selection: null,
    gates,
    approvals: [],
    revisions: { approvedSnapshots: [], rejectedDirections: [], batches: [] },
    sources: [],
    revisionProposals: [],
    exportReadiness: { gatesComplete: [], staleGates: [], missingFields: ["brief"], canExport: false, draftAllowed: true }
  };
  session.exportReadiness = computeExportReadiness(session);
  return session;
}

function computeExportReadiness(s: any) {
  const complete: string[] = [];
  const stale: string[] = [];
  const missing: string[] = [];
  (["A","B","C","D"] as string[]).forEach(g => {
    const d = s.gates[g];
    if (d && d.approved && !d.stale) complete.push(g);
    if (d && d.stale) stale.push(g);
  });
  if (!s.brief) missing.push("brief");
  if (s.builder.totalHours == null) missing.push("totalHours");
  if (s.builder.deadline == null) missing.push("deadline");
  if (s.builder.timezone == null) missing.push("timezone");
  if (!s.ideaBatches.length) missing.push("ideas");
  if (!s.selection) missing.push("selection");
  const canExport = complete.length === 4 && stale.length === 0 && missing.length === 0;
  return { gatesComplete: complete, staleGates: stale, missingFields: missing, canExport, draftAllowed: !canExport };
}

function touch(s: any) { return { ...s, updatedAt: now() }; }
function stepIndex(step: string) { return orderedSteps.indexOf(step); }

export function canGoBack(s: any): boolean { return stepIndex(s.currentStep) > 0; }
export function goBack(s: any): any {
  if (!canGoBack(s)) throw new Error("Cannot go back from current step.");
  const idx = stepIndex(s.currentStep);
  return touch({ ...s, currentStep: orderedSteps[idx - 1] });
}

export function setBrief(s: any, brief: any): any {
  return touch({ ...s, brief, currentStep: "brief_review" });
}

export function setBackend(s: any, backend: any): any {
  return touch({ ...s, builder: { ...s.builder, backendPreference: backend }, currentStep: "build_setup_q" });
}

export function setTimeBudget(s: any, totalHours: number, deadline: string, timezone: string, timeShape?: string): any {
  const builder = { ...s.builder, totalHours, deadline, timezone, timeShape: timeShape ?? s.builder.timeShape };
  const next = touch({ ...s, builder, currentStep: "profile_secondary" });
  const gates = { ...next.gates };
  (["A","B","C","D"] as string[]).forEach(g => { if (gates[g]) gates[g] = { ...gates[g], stale: true, staleReason: "hours/deadline changed", approved: gates[g].approved }; });
  const out = touch({ ...next, gates });
  out.exportReadiness = computeExportReadiness(out);
  return out;
}

export function setBuildSetup(s: any, codingMode: string, editorOrAgent?: string, model?: string, toolLimits?: string, teamSize?: string): any {
  const builder = { ...s.builder, codingMode, editorOrAgent, model, toolLimits, teamSize };
  return touch({ ...s, builder, currentStep: "profile_secondary" });
}

export function applyDefault(s: any): any {
  switch (s.currentStep) {
    case "backend_q":
      return setBackend(s, "Python");
    case "build_setup_q":
      return setBuildSetup(s, "AI-assisted", "Cursor", "available model", undefined, "solo");
    case "brief_review":
      return touch({ ...s, currentStep: "backend_q" });
    default:
      throw new Error("Default is not available for the current step.");
  }
}

export function approveGate(s: any): any {
  if (!String(s.currentStep).startsWith("gate_")) throw new Error("Approve is only valid on a gate screen.");
  const gate = String(s.currentStep).split("_")[1].toUpperCase();
  const d = s.gates[gate];
  if (!d) throw new Error("No gate draft to approve.");
  if (d.stale) throw new Error("Gate is stale; review before approving.");
  const approved = touch({ ...s, gates: { ...s.gates, [gate]: { ...d, approved: true, approvedAt: now(), approvedRevision: d.revision, stale: false, staleReason: undefined } }, approvals: [...s.approvals, { gate, revisionId: d.revision, contentSnapshot: d.content, approvedAt: now() }] });
  const nextStep = gate === "A" ? "gate_b" : gate === "B" ? "gate_c" : gate === "C" ? "gate_d" : "final_validation";
  const advanced = touch({ ...approved, currentStep: nextStep });
  advanced.exportReadiness = computeExportReadiness(advanced);
  return advanced;
}

export function setIdeas(s: any, batch: any): any {
  return touch({ ...s, ideaBatches: [...s.ideaBatches, batch], currentStep: "idea_review" });
}

export function selectIdea(s: any, ideaNumber: number, batchId: string): any {
  if (!s.ideaBatches.length) throw new Error("No ideas available.");
  return touch({ ...s, selection: { selectedIdeaId: ideaNumber, selectedAt: now(), batchId }, currentStep: "gate_a" });
}

export function setGateDraft(s: any, gate: string, contentFields: Record<string, unknown>): any {
  const existing = s.gates[gate];
  const actualRevision = existing ? existing.revision + 1 : 0;
  const draft = { gate, revision: actualRevision, content: { gate, revision: actualRevision, fields: contentFields }, approved: false, stale: false };
  return touch({ ...s, gates: { ...s.gates, [gate]: draft } });
}

export function markExportReadyCheck(s: any): any {
  const readiness = computeExportReadiness(s);
  return touch({ ...s, exportReadiness: readiness, currentStep: readiness.canExport ? "export" : s.currentStep });
}

export { computeExportReadiness };
