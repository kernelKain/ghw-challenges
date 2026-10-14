import { useState } from "react";

const ideas = [
  { id: 1, name: "ForgePlan", pitch: "Turn a hackathon brief into five fit ideas with evidence.",
    targetUser: "Solo builder", problem: "Wasted brainstorming", demo: "Five cards in 10s", primaryTrack: "AI Tools (Unknown—not checked)", buildFit: "Fits 24h", mainRisk: "Generic ideas",
    mechanism: "Brief -> questions -> 5 ideas -> gates -> export", requirementProof: "Req: structured artifacts -> capability: schema -> demo: card", sponsor: "LLM API essential", defensibility: "Approval state machine", analogue: "Chat (no gates)", productPotential: "Recurring need", naming: "Not checked", backup: "Blueprint", sources: ["prompt0"] },
  { id: 2, name: "TrackTight", pitch: "Validate track fit as requirement-to-capability claims.",
    targetUser: "Track-focused team", problem: "Track mismatch", demo: "Proof table", primaryTrack: "Track qualifier (Unknown)", buildFit: "Fits", mainRisk: "Overclaim",
    mechanism: "Requirements parsed -> capability map", requirementProof: "Req: track rule -> capability", sponsor: "LLM", defensibility: "Evidence labels", analogue: "Manual check", productPotential: "Niche", naming: "Not checked", backup: "Qualify", sources: ["prompt0"] },
  { id: 3, name: "ScopeSafe", pitch: "Propose revisions without rewriting approved gates.",
    targetUser: "Iterative builder", problem: "Silent rewrites", demo: "Side-by-side revision", primaryTrack: "Safety (Unknown)", buildFit: "Fits", mainRisk: "UX complexity",
    mechanism: "Change input -> stale marking", requirementProof: "Req: review -> capability", sponsor: "LLM", defensibility: "History snapshots", analogue: "Docs", productPotential: "Moat", naming: "Not checked", backup: "Revision", sources: ["prompt0"] },
  { id: 4, name: "DemoDeck", pitch: "Shape a 60-second demo with three beats.",
    targetUser: "Presenter", problem: "Rambling demo", demo: "10s hook", primaryTrack: "Presentation (Unknown)", buildFit: "Fits", mainRisk: "Too polished",
    mechanism: "Gate C draft", requirementProof: "Req: judge fit -> capability", sponsor: "LLM", defensibility: "Storyboard", analogue: "Slides", productPotential: "Niche", naming: "Not checked", backup: "Hook", sources: ["prompt0"] },
  { id: 5, name: "Handoff", pitch: "Export approved packet to engineering planning.",
    targetUser: "Engineer", problem: "Loose PRDs", demo: "Markdown export", primaryTrack: "Export (Unknown)", buildFit: "Fits", mainRisk: "Incomplete gates",
    mechanism: "Validated export", requirementProof: "Req: handoff -> capability", sponsor: "LLM", defensibility: "DRAFT watermark", analogue: "Notes", productPotential: "Moat", naming: "Not checked", backup: "Packet", sources: ["prompt0"] }
];

export default function Ideas({ onSelect }: { onSelect?: (id:number)=>void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [combined, setCombined] = useState<string | null>(null);
  const [cmd, setCmd] = useState("");
  const [rejected, setRejected] = useState<string[]>([]);
  const [batchNotice, setBatchNotice] = useState("");

  function parseCommand() {
    const t = cmd.trim();
    if (!t) return;
    if (t === "select" && selected) { setBatchNotice(`Selected idea ${selected}; move to Gate A`); return; }
    const m = t.match(/^compare\s+([\d,\s]+)/);
    if (m) { setCompareIds(m[1].split(/[,\s]+/).filter(Boolean).map(Number)); return; }
    const c = t.match(/^combine\s+([\d,\s]+)/);
    if (c) {
      setCombined("Combined candidate: users and workflows must be assessed; warning against feature pile-up. Not auto-approved.");
      return;
    }
    if (t.startsWith("more ideas")) {
      setBatchNotice("New batch should avoid rejected directions: " + (rejected.join(", ") || "none"));
      return;
    }
    if (t.startsWith("reject")) {
      const reason = t.replace("reject", "").trim() || "too ordinary";
      setRejected((r) => [...r, reason]);
      setBatchNotice(`Rejected noted: ${reason}`);
      return;
    }
    setBatchNotice("Command not recognized.");
  }

  return (
    <div>
      <h2>Five differentiated ideas</h2>
      <p className="hidden-unknown">Primary track claims are Unknown/not checked unless a real review occurred. No confidence percentages or judge scores.</p>
      <p className="card"><strong>Best overall:</strong> ForgePlan - clear demo. <strong>Safest:</strong> Handoff - export. <strong>Most innovative:</strong> TrackTight - evidence proof. <strong>Strongest product potential:</strong> ScopeSafe - moat. <strong>Risk warning:</strong> DemoDeck may overrun.</p>
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap: 12, marginTop: 12}}>
        {ideas.map((i) => (
          <div key={i.id} className="card">
            <h3>{i.name}</h3>
            <p>{i.pitch}</p>
            <p style={{fontSize:14}}><strong>For:</strong> {i.targetUser}. <strong>Problem:</strong> {i.problem}</p>
            <p style={{fontSize:14}}><strong>Demo:</strong> {i.demo}</p>
            <p style={{fontSize:14}}><strong>Track:</strong> {i.primaryTrack}</p>
            <p style={{fontSize:14}}><strong>Build fit:</strong> {i.buildFit}. <strong>Risk:</strong> {i.mainRisk}</p>
            <div style={{display:"flex", gap:8, flexWrap:"wrap", marginTop:8}}>
              <button className="btn" onClick={() => { setSelected(i.id); onSelect && onSelect(i.id); }}>Select</button>
              <button className="btn" onClick={() => setExpanded(expanded === i.id ? null : i.id)}>Expand</button>
            </div>
            {expanded === i.id && (
              <div style={{marginTop:8, fontSize:14}}>
                <p><strong>Mechanism:</strong> {i.mechanism}</p>
                <p><strong>Requirement proof:</strong> {i.requirementProof}</p>
                <p><strong>Sponsor:</strong> {i.sponsor}</p>
                <p><strong>Defensibility:</strong> {i.defensibility}</p>
                <p><strong>Analogue:</strong> {i.analogue}</p>
                <p><strong>Product potential:</strong> {i.productPotential}</p>
                <p><strong>Name:</strong> {i.naming}. Backup: {i.backup}</p>
                <p><strong>Sources:</strong> {i.sources.join(", ")}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {selected && <p style={{marginTop:12}}>Selected idea {selected}. Transition to Gate A only (no later gate approved).</p>}
      {compareIds.length > 0 && (
        <div className="card" style={{marginTop:12}}>
          <h3>Comparison</h3>
          <p>Comparing: {compareIds.join(", ")}. Focus: track fit, demo advantage, product potential, feasibility, differentiation, trade-offs.</p>
          <button className="btn" onClick={() => setCompareIds([])}>Clear</button>
        </div>
      )}
      {combined && <p className="card" style={{marginTop:12}}>{combined}</p>}
      <div className="card" style={{marginTop:12}}>
        <h3>Command composer</h3>
        <input value={cmd} onChange={e=>setCmd(e.target.value)} style={{width:"100%"}} placeholder="select / compare 1,2 / combine 1,3 / more ideas: reason / reject: reason" />
        <button className="btn primary" style={{marginTop:8}} onClick={parseCommand}>Run command</button>
        <div style={{display:"flex", gap:8, flexWrap:"wrap", marginTop:8}}>
          <button className="btn" onClick={() => setSelected(selected ?? 1)}>Default selection</button>
          <button className="btn" onClick={() => setCmd("more ideas")}>More ideas</button>
          <button className="btn" onClick={() => setCmd("compare 1,2")}>Compare</button>
          <button className="btn" onClick={() => setCmd("combine 1,3")}>Combine</button>
        </div>
        {batchNotice && <p style={{marginTop:8}}>{batchNotice}</p>}
        {rejected.length > 0 && <p className="hidden-unknown">Rejected directions preserved: {rejected.join(", ")}</p>}
      </div>
    </div>
  );
}
