import { useState } from "react";

type View = "landing" | "loading" | "empty" | "error" | "workspace";

export default function App() {
  const [view, setView] = useState<View>("landing");
  const [sample, setSample] = useState(false);
  if (view !== "landing") {
    return (
      <div className="app-shell">
        <div className="mobile-progress">Progress: 1/12</div>
        <aside className="side" aria-label="Progress">
          <div className="wordmark"><span className="motif" aria-hidden /> Outline</div>
          <p className="hidden-unknown">Unknown items stay labelled Unknown.</p>
          <nav style={{ marginTop: 16 }}>
            <button className="btn" onClick={() => setView("landing")}>Back to landing</button>
          </nav>
        </aside>
        <main className="main">
          <h1>Workshop workspace</h1>
          {sample && <p className="hidden-unknown">Sample workshop — illustrative data</p>}
          {view === "loading" && <div className="loading">Loading workshop…</div>}
          {view === "empty" && <div className="empty">No workshop selected yet.</div>}
          {view === "error" && <div className="error">Could not load workshop. Retry or open sample.</div>}
          {view === "workspace" && <p className="hidden-unknown">Context panel keeps unknown facts visible. Unknown</p>}
          <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="btn" onClick={() => setView("loading")}>Show loading</button>
            <button className="btn" onClick={() => setView("empty")}>Show empty</button>
            <button className="btn" onClick={() => setView("error")}>Show error</button>
            <button className="btn primary" onClick={() => setView("workspace")}>Show workspace</button>
          </div>
        </main>
        <aside className="context" aria-label="Context">
          <h2>Context</h2>
          <p className="hidden-unknown">Track fit: Unknown/not checked</p>
        </aside>
      </div>
    );
  }
  return (
    <div className="landing">
      <header style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
        <span className="motif" aria-hidden />
        <span className="wordmark">Outline</span>
      </header>
      <h1 className="hero">Find the project worth building.</h1>
      <p style={{ fontSize: 20, color: "var(--color-muted)", maxWidth: 640 }}>
        Turn a hackathon brief into ideas that fit your time, skills, and challenge.
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
        <button className="btn primary" onClick={() => { setSample(false); setView("workspace"); }}>Start a workshop</button>
        <button className="btn" onClick={() => { setSample(true); setView("workspace"); }}>Try a sample workshop</button>
      </div>
      <section className="preview-grid" style={{ marginTop: 40 }}>
        <div className="card">
          <h3>Idea card preview</h3>
          <p><strong>ForgePlan</strong> — Turn a brief into five ranked ideas.</p>
          <p className="hidden-unknown">Name check: Not checked — browsing unavailable</p>
        </div>
        <div className="card">
          <h3>Requirement proof</h3>
          <p>Requirement → capability → demo evidence (placeholder)</p>
          <p className="hidden-unknown">Track: Unknown until event rules are reviewed</p>
        </div>
        <div className="card">
          <h3>Reviewed scope revision</h3>
          <p>Keep / cut / change / newly uncertain (proposal, not approval)</p>
        </div>
      </section>
      <section className="steps">
        <div className="card"><strong>1. Brief</strong><p>Paste and review.</p></div>
        <div className="card"><strong>2. Ideas</strong><p>Compare five options.</p></div>
        <div className="card"><strong>3. Gates</strong><p>Approve A–D.</p></div>
      </section>
      <p style={{ marginTop: 40, color: "var(--color-muted)" }}>
        Outline supports decisions; it cannot guarantee prizes or market success. No fabricated testimonials, metrics, or verified research claims are shown.
      </p>
    </div>
  );
}
