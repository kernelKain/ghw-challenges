import { useState } from "react";
import { createEmptySession, setBrief, setBackend, applyDefault, goBack, setBuildSetup, setTimeBudget, selectIdea } from "./engine/workflow";
import Gates from "./Gates";
import Ideas from "./Ideas";
import { saveSession, clearSession, validateImported } from "./storage";
import { toMarkdown, safeFilename } from "./export";
import { useEffect, useRef, useState as useS } from "react";

export default function Workshop({ sample }: { sample: boolean }) {
  const [session, setSession] = useState<any>(() => createEmptySession(sample ? "sample" : "live"));
  const [briefText, setBriefText] = useState("");
  const [url, setUrl] = useState("");
  const [hours, setHours] = useState("24");
  const [deadline, setDeadline] = useState("");
  const [tz, setTz] = useState("");
  const s = session;
  useEffect(() => { saveSession(s); }, [s]);
  const [importNotice, setImportNotice] = useS("");
  const fileRef = useRef<HTMLInputElement>(null);
  const label = sample ? "Sample workshop — illustrative data" : null;

  function run(fn: (x: any) => any) { setSession((prev: any) => fn(prev)); }

  return (
    <div className="app-shell">
      <div className="mobile-progress">Step: {s.currentStep}</div>
      <aside className="side" aria-label="Progress">
        <div className="wordmark"><span className="motif" aria-hidden /> Outline</div>
        {label && <p className="hidden-unknown">{label}</p>}
        <p style={{fontSize:12}}>Current: {s.currentStep}</p>
        <button className="btn" onClick={() => { if (goBack) try { run(goBack); } catch {} }}>Back</button>
      </aside>
      <main className="main">
        <h1>Workshop</h1>
        {label && <p className="hidden-unknown">{label}</p>}

        {s.currentStep === "landing" && <button className="btn primary" onClick={() => setSession((x:any)=>({...x,currentStep:"brief_intake"}))}>Start</button>}

        {s.currentStep === "brief_intake" && (
          <div className="card">
            <h2>Brief intake</h2>
            <p>Paste the hackathon brief. URL is recorded as a reference only.</p>
            <textarea value={briefText} onChange={e=>setBriefText(e.target.value)} rows={6} style={{width:"100%"}} aria-label="Brief text" />
            <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Official URL (optional reference)" style={{width:"100%", marginTop:8}} />
            <div style={{marginTop:8, display:"flex", gap:8}}>
              <button className="btn primary" onClick={() => run((x:any) => setBrief(x, { rawText: briefText, source: briefText ? "pasted" : "url_ref", url: url || undefined, judging: [], tracks: [], requiredTech: [], prizes: [], constraints: [], uncertainties: [], extractedFacts: {}, missingFacts: ["Official rules not fetched"], userEdits: {} }))}>Review brief</button>
              <button className="btn" onClick={() => run(applyDefault)}>Use recommended answer</button>
            </div>
          </div>
        )}

        {s.currentStep === "brief_review" && (
          <div className="card">
            <h2>Brief review (editable)</h2>
            <p><strong>Raw:</strong> {s.brief?.rawText?.slice(0,200) || "Unknown"}</p>
            <p className="hidden-unknown">Judging weights: Unknown. Track requirements: Unknown until rules are provided.</p>
            <div style={{display:"flex",gap:8,marginTop:8}}>
              <button className="btn primary" onClick={() => run((x:any)=>({...x,currentStep:"backend_q"}))}>Continue</button>
              <button className="btn" onClick={() => run(applyDefault)}>Use recommended answer</button>
            </div>
          </div>
        )}

        {s.currentStep === "backend_q" && (
          <div className="card">
            <h2>Backend preference</h2>
            <p>Which backend language do you prefer: Python, Java, or Go?</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {["Python","Java","Go"].map((b)=>(
                <button key={b} className="btn" onClick={()=>run((x:any)=>setBackend(x,b))}>{b}</button>
              ))}
            </div>
            <button className="btn" style={{marginTop:8}} onClick={()=>run(applyDefault)}>Use recommended answer (Python)</button>
          </div>
        )}

        {s.currentStep === "build_setup_q" && (
          <div className="card">
            <h2>Time budget</h2>
            <input value={hours} onChange={e=>setHours(e.target.value)} placeholder="Total active hours" style={{width:"100%"}} />
            <input value={deadline} onChange={e=>setDeadline(e.target.value)} placeholder="Deadline (ISO)" style={{width:"100%", marginTop:8}} />
            <input value={tz} onChange={e=>setTz(e.target.value)} placeholder="Timezone" style={{width:"100%", marginTop:8}} />
            <button className="btn primary" style={{marginTop:8}} onClick={()=>run((x:any)=>setTimeBudget(x, Number(hours)||0, deadline, tz))}>Save</button>
            <button className="btn" style={{marginTop:8, marginLeft:8}} onClick={()=>run(applyDefault)}>Use recommended answer</button>
          </div>
        )}

        {(s.currentStep === "profile_secondary") && (
          <div className="card">
            <h2>Team and coding setup</h2>
            <button className="btn primary" onClick={() => run((x:any)=>setBuildSetup(x,"AI-assisted","Cursor","available model",undefined,"solo"))}>Use recommended default (solo, AI-assisted, Cursor)</button>
            <button className="btn" style={{marginLeft:8}} onClick={() => run((x:any)=>({...x,currentStep:"idea_review"}))}>Continue to ideas (sample)</button>
          </div>
        )}

        {s.currentStep === "ideation_generating" && (
          <div className="card">
            <h2>Idea generation unavailable in foundation phase</h2>
            <p className="hidden-unknown">Live AI integration is not wired yet. No ideas are fabricated.</p>
            <p className="hidden-unknown">Try sample mode for illustrative data.</p>
          </div>
        )}

        {s.currentStep === "idea_review" && <Ideas onSelect={(id:number)=>run((x:any)=>selectIdea(x,id,"batch_1"))} />}
        {String(s.currentStep).startsWith("gate_") && <Gates session={s} setSession={setSession} />}
        {s.currentStep.startsWith("gate_") && <div className="card"><h2>Gate</h2><p className="hidden-unknown">Not implemented in this phase.</p></div>}
      </main>
      <aside className="context" aria-label="Context">
        <h2>Context</h2>
        <div style={{display:"flex",flexDirection:"column",gap:6,marginTop:8}}>
          <button className="btn" onClick={() => { const md=toMarkdown(s); navigator.clipboard?.writeText(md).then(()=>alert("Copied")).catch(()=>alert("Clipboard unavailable")); }}>Copy packet</button>
          <button className="btn" onClick={() => { const md=toMarkdown(s); const blob=new Blob([md],{type:"text/markdown"}); const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=safeFilename("outline-packet"); a.click(); }}>Download MD</button>
          <button className="btn" onClick={() => { if (confirm("Reset this session?")) { clearSession(); window.location.reload(); } }}>Reset session</button>
          <input ref={fileRef} type="file" accept="application/json" style={{display:"none"}} onChange={(e)=>{ const f=e.target.files?.[0]; if(!f) return; const r=new FileReader(); r.onload=()=>{ try { const v=validateImported(JSON.parse(String(r.result))); if(!v.ok) { setImportNotice(v.message); return; } setSession(v.session); setImportNotice(v.message); } catch { setImportNotice("Invalid JSON."); } }; r.readAsText(f); }} />
          <button className="btn" onClick={()=>fileRef.current?.click()}>Import JSON</button>
          {importNotice && <p className="hidden-unknown">{importNotice}</p>}
        </div>
        <p><strong>Sources:</strong> {s.sources.length}</p>
        <p className="hidden-unknown">Constraints: {s.builder?.totalHours ?? "Unknown"} hours; deadline {s.builder?.deadline ?? "Unknown"}.</p>
        <p className="hidden-unknown">Unresolved: {s.brief?.missingFacts?.join(", ") || "Unknown"}</p>
      </aside>
    </div>
  );
}
