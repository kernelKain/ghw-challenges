export function toMarkdown(session: any): string {
  const r = session.exportReadiness || {};
  const draft = !r.canExport;
  const lines: string[] = [];
  if (draft) lines.push("# DRAFT / NOT APPROVED", "", "Incomplete gates: " + (r.staleGates || []).join(", ") + " | missing: " + (r.missingFields || []).join(", "), "");
  lines.push("## PROMPT 0 → PROMPT 1 IDEA PACKET", "");
  lines.push("Name: " + (session.selection ? "Selected idea " + session.selection.selectedIdeaId : "Unknown"));
  lines.push("Backup name: Unknown");
  lines.push("Name status: Not checked — browsing unavailable");
  lines.push("What: " + (session.ideaBatches?.[0]?.ideas?.[0]?.pitch || "Unknown"));
  lines.push("Why: Unknown");
  lines.push("Hook: Unknown");
  lines.push("");
  lines.push("Hackathon:");
  lines.push("  Event/dates: " + (session.brief?.dates || "Unknown"));
  lines.push("  Deadline: " + (session.builder?.deadline || "Unknown") + " " + (session.builder?.timezone || ""));
  lines.push("  Judging criteria: " + (session.brief?.judging?.map((j:any)=>j.criterion).join(", ") || "Unknown"));
  lines.push("  Primary track: " + (session.brief?.tracks?.[0]?.name || "Unknown"));
  lines.push("  Qualification: " + (session.brief?.tracks?.[0]?.qualification || "Unknown"));
  lines.push("  Secondary track: NONE");
  lines.push("  Required technology: " + (session.brief?.requiredTech?.join(", ") || "Unknown"));
  lines.push("  Target prize: " + (session.brief?.prizes?.join(", ") || "Unknown"));
  lines.push("  Official sources: " + (session.sources?.length ? session.sources.map((s:any)=>s.ref).join(", ") : "Unknown"));
  lines.push("");
  lines.push("Builder:");
  lines.push("  Hours: " + (session.builder?.totalHours ?? "Unknown"));
  lines.push("  Backend preference: " + (session.builder?.backendPreference || "Unknown"));
  lines.push("  Team: " + (session.builder?.teamSize || "Unknown"));
  lines.push("  Coding mode/tool/model: " + (session.builder?.codingMode || "Unknown") + " / " + (session.builder?.editorOrAgent || "Unknown"));
  lines.push("  Frontend constraint: Basic React/Vite");
  lines.push("  API/access limit: at most 2");
  lines.push("");
  lines.push("Scope:");
  lines.push("  Essential: workshop through gates A-D");
  lines.push("  Optional: retrieval adapter");
  lines.push("  Excluded: accounts, billing, marketplace, auto-submit, training");
  lines.push("  Fallback: Unknown");
  lines.push("");
  lines.push("Boundary: Product identity approved; engineering validation owned by Prompt 1.");
  if (session.mode === "sample") lines.push("", "Sample workshop — illustrative data");
  return lines.join("\n");
}

export function safeFilename(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + ".md";
}
