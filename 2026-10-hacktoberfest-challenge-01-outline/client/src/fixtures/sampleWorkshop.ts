import type { WorkshopSession, EventBrief, Idea, IdeaBatch } from "../contracts/schema";
import { createEmptySession } from "../engine/workflow";

const brief: EventBrief = {
  rawText: "Sample hackathon brief (illustrative only). Build a tool that helps participants choose a project.",
  source: "pasted",
  judging: [{criterion:"Innovation", weight:"50%"},{criterion:"Execution", weight:"50%"}],
  tracks: [{name:"AI Tools", qualification:"Uses an LLM API to generate structured artifacts"}],
  requiredTech: ["LLM API"],
  prizes: ["Demo day recognition (illustrative)"],
  constraints: ["24-hour build", "Team of 1-4"],
  uncertainties: ["Exact prize amounts not stated"],
  extractedFacts: {},
  missingFacts: ["Official rules URL not provided"],
  userEdits: {}
};

const idea: Idea = {
  number: 1,
  name: "ForgePlan",
  pitch: "A guided workspace that turns a hackathon brief into five ranked project ideas with evidence.",
  targetUser: "A solo hackathon participant with 24 hours",
  problem: "Participants waste hours brainstorming without track fit evidence.",
  product: "Brief intake, five differentiated ideas, comparison, approval gates, markdown export.",
  flow: "Brief -> questions -> 5 ideas -> select -> gates A-D -> export",
  demo10s: "Brief pasted, five idea cards appear, one selected, gate A approved.",
  primaryTrack: "AI Tools",
  primaryQualification: "Uses LLM API to generate structured artifacts",
  whyItCouldWin: "Visible structured output and clear demo.",
  productPotential: "Recurring need for hackathon tooling; Unknown revenue",
  productPotentialAssumptions: ["Hackathon organizers would pay"],
  requiredTechRole: "LLM generates and structures idea content",
  defensibility: "Deterministic approval state machine + evidence labels",
  closestAnalogue: "Generic chat",
  difference: "Approval gates and evidence labels",
  nameMeaning: "Forge + plan",
  nameFeeling: "Crafted",
  backupName: "Blueprint",
  nameCollisionStatus: "Not checked - browsing unavailable",
  mainRisk: "Generated ideas may be generic",
  buildFit: "Fits 24 hours due to scoped MVP",
  whyItCouldWin: "Visible structured output and clear demo."
};

const badIdea: any = idea;

const batch: IdeaBatch = {
  id: "batch_1",
  ideas: [idea],
  bestOverall: "ForgePlan",
  safestToShip: "ForgePlan",
  mostInnovative: "ForgePlan",
  strongestProductPotential: "ForgePlan",
  riskWarning: "Single concept risk; needs more variety in live generation.",
  createdAt: new Date().toISOString()
};

export function createSampleSession(): WorkshopSession {
  const s = createEmptySession("sample");
  s.brief = brief;
  s.builder = { backendPreference:"Python", totalHours:24, deadline:"2026-10-11T23:59:00", timezone:"PDT", interests:[], resources:[], excludedDirections:[] };
  s.ideaBatches = [batch];
  s.selection = { selectedIdeaId: 1, selectedAt: new Date().toISOString(), batchId: batch.id };
  // gates minimal approved
  const mkGate = (g:"A"|"B"|"C"|"D", fields:any) => ({ gate:g, revision:0, content:{gate:g,revision:0,fields}, approved:true, approvedAt:new Date().toISOString(), approvedRevision:0, stale:false });
  (["A","B","C","D"] as const).forEach(g => { s.gates[g] = mkGate(g,{title:"synthetic approved gate"}) as any; });
  s.exportReadiness = { gatesComplete:["A","B","C","D"], staleGates:[], missingFields:[], canExport:true, draftAllowed:false };
  s.currentStep = "final_packet";
  return s;
}
```<|end|><|start|>write to=assistant<|channel|>analysis<|message|>I accidentally duplicated whyItCouldWin. Remove duplicate. Let me edit.<|end|><|start|>Assistant to=tool<|channel|>analysis <|constrain|>xml<|message|><rfl:parameter name="path">
/home/kernel-kain/Documents/Github/ghw-challenges/2026-10-hacktoberfest-challenge-01-outline/client/src/fixtures/sampleWorkshop.ts