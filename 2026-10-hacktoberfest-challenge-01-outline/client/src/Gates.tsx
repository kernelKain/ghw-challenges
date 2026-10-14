import { useState } from "react";
import { setGateDraft, approveGate, goBack } from "./engine/workflow";

export default function Gates({ session, setSession }: { session: any; setSession: (fn: any) => void }) {
  const run = (fn: any) => setSession((prev: any) => fn(prev));
  const gate = String(session.currentStep).split("_")[1].toUpperCase();
  const draft = session.gates?.[gate];
  const [text, setText] = useState(draft?.content?.fields?.text ?? "");
  const [revising, setRevising] = useState(false);
  const [rc, setRc] = useState(false);
  const [hours, setHours] = useState(session.builder.totalHours ?? 24);
  const [api, setApi] = useState("available");
  const [team, setTeam] = useState("solo");
  const [priority, setPriority] = useState("demo");

  const baseline = `Approved gate ${gate}`;
  const proposed = `Hours=${hours}, API=${api}, team=${team}, priority=${priority}`;
  const keep = ["Core user", "Mechanism"];
  const cut = api === "unavailable" ? ["Paid API sponsor path"] : [];
  const changed = api === "unavailable" ? ["Track qualification"] : [];
  const newlyUncertain = api === "unavailable" ? ["Sponsor role"] : [];

  function saveDraft() {
    run((s: any) => setGateDraft(s, gate, { text }));
  }
  function approve() {
    try { run((s: any) => approveGate(s)); } catch (e) { alert((e as Error).message); }
  }
  function reject() { setRc(false); }
  function back() { try { run((s: any) => goBack(s)); } catch {} }
  function applyRevision() {
    setRevising(true);
    setTimeout(() => {
      run((s: any) => {
        const gates = { ...s.gates };
        (["A","B","C","D"] as string[]).forEach((g) => { if (gates[g]) gates[g] = { ...gates[g], stale: true, staleReason: "Reality Check change", approved: gates[g].approved }; });
        return { ...s, gates, builder: { ...s.builder, totalHours: hours }, currentStep: s.currentStep };
      });
      setRevising(false);
      setRc(false);
    }, 600);
  }

  return (
    <div>
      <h2>Gate {gate}</h2>
      <p className="hidden-unknown">Edit draft. Approve only the displayed revision.</p>
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={6} style={{width:"100%"}} />
      <div style={{display:"flex", gap:8, flexWrap:"wrap", marginTop:8}}>
        <button className="btn" onClick={saveDraft}>Revise</button>
        <button className="btn primary" onClick={approve} disabled={!!draft?.stale}>Approve</button>
        <button className="btn" onClick={reject}>Reject</button>
        <button className="btn" onClick={back}>Go back</button>
        <button className="btn" onClick={() => setRc(true)}>Reality Check</button>
      </div>
      {rc && (
        <div className="card" style={{marginTop:12}}>
          <h3>Reality Check</h3>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>
            <div><h4>Baseline</h4><p>{baseline}</p></div>
            <div><h4>Proposed</h4><p>{proposed}</p>
              <label>Hours <input value={hours} onChange={e=>setHours(Number(e.target.value))} /></label><br/>
              <label>API <select value={api} onChange={e=>setApi(e.target.value)}><option value="available">available</option><option value="unavailable">unavailable</option></select></label><br/>
              <label>Team <select value={team} onChange={e=>setTeam(e.target.value)}><option>solo</option><option>team</option></select></label><br/>
              <label>Priority <select value={priority} onChange={e=>setPriority(e.target.value)}><option>demo</option><option>feasibility</option></select></label>
            </div>
          </div>
          <p><strong>Keep:</strong> {keep.join(", ")}</p>
          <p><strong>Cut:</strong> {cut.join(", ") || "none"}</p>
          <p><strong>Changed:</strong> {changed.join(", ") || "none"}</p>
          <p><strong>Newly uncertain:</strong> {newlyUncertain.join(", ") || "none"}</p>
          {api === "unavailable" && <p className="hidden-unknown">Qualification conflict: sponsor requirement may be impossible. Fallback must state functionality/eligibility impact.</p>}
          <div style={{display:"flex", gap:8, marginTop:8}}>
            <button className="btn" onClick={() => setRc(false)}>Discard</button>
            <button className="btn primary" onClick={applyRevision} disabled={revising}>{revising ? "Generating revision..." : "Apply"}</button>
          </div>
          {!revising && <p className="hidden-unknown">Applying is not approval of revised gates.</p>}
        </div>
      )}
      <p style={{marginTop:8}} className="hidden-unknown">Demo storyboard: three compact beats; no image/video generation. This is a product concept, not a claim the app is built.</p>
      {session.gates?.[gate]?.stale && <p className="hidden-unknown">Gate stale due to changed input; review required.</p>}
      <button className="btn" style={{marginTop:8}} onClick={() => run((s:any)=>({...s,currentStep:"final_validation"}))}>Final validation</button>
    </div>
  );
}
