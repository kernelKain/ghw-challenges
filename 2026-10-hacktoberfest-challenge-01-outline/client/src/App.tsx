import { useState } from "react";
import Workshop from "./Workshop";

export default function App() {
  const [sample, setSample] = useState<boolean | null>(null);
  if (sample !== null) return <Workshop sample={sample} />;
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
        <button className="btn primary" onClick={() => setSample(false)}>Start a workshop</button>
        <button className="btn" onClick={() => setSample(true)}>Try a sample workshop</button>
      </div>
      <section className="preview-grid" style={{ marginTop: 40 }}>
        <div className="card"><h3>Idea card preview</h3><p><strong>ForgePlan</strong> - Turn a brief into five ranked ideas.</p><p className="hidden-unknown">Name check: Not checked - browsing unavailable</p></div>
        <div className="card"><h3>Requirement proof</h3><p>Requirement - capability - demo evidence</p><p className="hidden-unknown">Track: Unknown until event rules are reviewed</p></div>
        <div className="card"><h3>Reviewed scope revision</h3><p>Keep / cut / change / newly uncertain (proposal, not approval)</p></div>
      </section>
      <section className="steps">
        <div className="card"><strong>1. Brief</strong><p>Paste and review.</p></div>
        <div className="card"><strong>2. Ideas</strong><p>Compare five options.</p></div>
        <div className="card"><strong>3. Gates</strong><p>Approve A-D.</p></div>
      </section>
      <p style={{ marginTop: 40, color: "var(--color-muted)" }}>
        Outline supports decisions; it cannot guarantee prizes or market success.
      </p>
    </div>
  );
}
