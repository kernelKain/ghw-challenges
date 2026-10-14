# Outline — Product Contract and Implementation Plan

> Status: Prompt 1 deliverable. Planning only. No implementation yet.
> Source behavior spec: latest "Product discovery prompt" (Prompt 0), ingested as source material. The application runs this workshop for its users; this conversation does not execute it.

## 1. Project and repository context

- Repo is a GHW challenge monorepo. One project folder exists and is empty: `2026-10-hacktoberfest-challenge-01-outline/`.
- Unrelated unstaged `README.md` changes exist; preserved.
- No AGENTS.md. Tooling: Node v22.14.0, npm 10.9.2, Python 3.14.4, git 2.53.0.

## 2. Product definition

**Outline** — "Find the project worth building."

A premium guided hackathon discovery workspace. A user provides an event brief, answers focused questions, explores five differentiated concepts, compares them, approves one through four decision gates, and exports a structured handoff for engineering planning. Outline runs the Prompt 0 product-discovery workshop as software.

## 3. Product contract (extracted from source)

### 3.1 Workflow steps and exact prompts

| Step | Prompt / action | Default |
|------|-----------------|---------|
| 0 Brief | "Please paste the hackathon brief or send its official link." | pasted text |
| 1 Opportunity brief | read official material; return hackathon/dates/deadline/tz; judging criteria+weights; relevant tracks/prizes with exact qualification; required tech + submission/demo constraints; eligibility/disqualification; best opportunity area for user profile; one critical uncertainty. Then backend question. | — |
| 2 Backend | "Which backend language do you prefer: Python, Java, or Go? You may say default." | Python (preference, not stack) |
| 3 Build setup | Record active hours, deadline, schedule. Ask: solo or team + manual/AI-assisted/agentic coding + editor/agent/model if known. Recommended default: solo, AI-assisted in Cursor with available model. | solo, AI-assisted, Cursor, available model |
| 4 Five ideas | (silent: jobs/pains/gains/workarounds; 10–15 concepts; evaluate product/design/engineering/judge; apply hard gates + internal ranking; check analogues; scan names; select 5) then present exact five | — |
| — Idea commands | more ideas[: reason], reject, compare [ideas], combine [ideas], idea number/name | — |
| 6 Gates A–D | one gate per turn, explicit approval | — |
| 7 Final validation + packet | silent 8-check validation, then IDEA PACKET | — |

Rules: one step/gate per turn; never skip; end turn with exactly one question; concise (five-idea turn may be longer); one question when approval/input needed; recommend a default; never repeat approved content or silently change a decision; no giant tables/scoring dumps in UI; no chain-of-thought display.

Commands (source): `approve`/`default`, `revise: ...`, `go back`, `reject`, `more ideas[: reason]`, `compare [ideas]`, `combine [ideas]`, or an idea number/name.

### 3.2 Internal ranking weights (silent; shown only as explanations, never as scorecard)

Rubric/track fit 20%, user problem/value 15%, demo strength 15%, technical/sponsor depth 15%, feasibility 15%, differentiation 10%, product potential 10%. Official published weights override when available.

### 3.3 Five-idea output fields (per idea)

Number, NAME — one-sentence pitch.

For (specific user/situation); Problem (pain + failed workaround); Product (experience, mechanism, visible outcome).

Hackathon fit: Primary track (exact qualification reason); Secondary track (only if independently defensible); Requirement proof: requirement → capability → demo evidence.

Why it could win (judging-criteria connection); Product potential (recurring need, likely user/buyer, return reason, expansion path; assumptions labeled); 10-second demo; Required-technology role (essential, visible); Defensibility (state/data/automation/verification/integration/computation a normal chat can't reproduce); Closest analogue + meaningful difference; Name check (meaning, product feeling, backup name, collision status); Main risk; Build fit.

Then: Best overall, Safest to ship, Most innovative, Strongest product potential, Risk warning (most tempting likely to overrun/fail). Selection question: "Which idea should we take forward? Reply with 1–5, the name, default, `compare 2 and 4`, or `more ideas`."

### 3.4 Gate A — User value and thesis

Refined name + backup; deeper collision status; one-line pitch; specific user/situation; job/pain/gain; failed workaround; input/outcome; 10-second value; judge relevance; recurring use; early adopter; buyer if known; distribution wedge; expansion/monetization path; largest product assumption. Never claim product-market fit proven.

### 3.5 Gate B — Mechanism, track proof, moat

Trigger; input; mechanism 5–7 steps; output; technically interesting behavior; requirement → capability → demo proof for every claimed track; essential+visible technology role; effect of removing it; non-wrapper moat; closest analogue + difference; minimum technical constraints; one technical assumption for Prompt 1; dependency fallback. Non-mandatory technical suggestions labeled provisional.

### 3.6 Gate C — Winning demo

Visual signature; starting state; exact 10-second wow; 60-second story (setup/action/reaction/result/technology proof/closing claim); criterion supported per beat; visible backend depth; at most three screens/states; live + fixture paths; one likely judge confusion + simplification.

### 3.7 Gate D — Feasibility and product path

Essential/optional capabilities; exclusions; must-be-true claim "Given [input], product produces [output] under [condition]"; product/API/data/access assumptions; largest feasibility risk; Hook-preserving fallback; fit with available hours; post-hackathon continuation; questions Prompt 1 must resolve.

### 3.8 Final validation (8 checks, silent)

One clear user/problem/sentence/10-sec Hook; proves every track claim against official requirement; required tech essential+visible; does more than generate text + demonstrable moat; concrete but honestly labeled product potential; no obvious popular-project collision from performed checks; testable must-be-true claim + Hook-preserving fallback; fits available hours + labels every uncertainty. If any fails, identify most serious failure, recommend one correction, ask approval (do not produce packet).

### 3.9 Handoff packet fields (Prompt 0 → Prompt 1)

Name; Backup name; Name status (checks, date, collision); What (mechanism); Why (problem); Hook (10-sec moment).

Hackathon: Event/dates; Deadline (+tz); Judging criteria (ordered + weights); Primary track; Qualification (requirement → capability → demo); Secondary track (independently proven or NONE); Required technology (tech + essential role); Target prize; Official sources.

Builder: Hours; Backend preference; Team; Coding mode/tool/model; Frontend constraint; API/access limit.

Product: Target user/situation; User job/problem; Failed workaround; Input; Mechanism; Visible output; Required-technology role; Non-wrapper moat; Closest analogue/difference; Visual signature; Judge fit; 60-second story; Must-be-true claim.

Product potential: Recurring need; Early adopter/buyer; Distribution wedge; Expansion/monetization; Evidence level (Verified/Supported/Assumption/Unknown — all claims labeled).

Scope: Essential; Optional; Excluded; Fallback.

Prompt 1 must investigate: Product assumptions; Technical assumptions; Access risks; Claims to validate; Open engineering decisions.

History: Rejected directions (ideas + reasons); Selection reason (why this won).

Boundary note: product identity/user/problem/Hook/track proof/required-tech role approved; Prompt 1 owns engineering validation, architecture, stack, UX, deployment, scope, risks, acceptance criteria, phases.

### 3.10 Source-handling and evidence rules

- Research only selection-helping items: existing solutions, similar projects, sponsor limits, evidence problem/workaround exists.
- For supplied brief/link: read official event/rules/track/prize/sponsor pages first; use official sponsor docs for capability claims; don't guess eligibility/weights/deadlines/access/hidden rules; label important claims Verified/Supported/Assumption/Unknown; cite sources when browsing permits.
- Track fit = requirement → capability → demo evidence, not thematic resemblance.
- Pasted brief is user-provided, not independently verified.

### 3.11 Claim/evidence labels

`Verified`, `Supported`, `Assumption`, `Unknown` — evidence categories, never numeric scores. No confidence percentages, no "judge scores," no verified-eligibility promises, no winning-odds claims.

### 3.12 Hard constraints / corrections

- Never promise verified eligibility or winning odds from a pasted brief alone.
- No made-up confidence percentages or "judge scores."
- A constraint edit proposes a revision; never silently rewrites approved content.
- No instant live-research claim unless a real retrieval operation completed.

### 3.13 Naming (Section 7 of source)

Name only after defining concept. Internally generate descriptive/evocative/metaphorical options; present one primary + one backup. Prefer short, confident, easy names suggesting value/mechanism/feeling; avoid forced spelling, meaningless portmanteaus, random capitalization, generic `AI`, `GPT`, `smart`, `-ly`, `-ify`, `-verse`. Collision check (when browsing available): exact-name + "[name] software/app" searches, GitHub repos/orgs, Product Hunt, relevant app store/package registry. Reject obvious popular-product conflicts. Report only: `No prominent collision found on [date]`, `Similar small uses found — review needed`, `Not checked — browsing unavailable`. Never claim complete availability/legal clearance. Deeper check + trademark DB flag for manual review if project continues past hackathon.

## 4. MVP scope

**In MVP:**
- Pasted brief intake + source record (URL recorded as reference; never implied fetched)
- Editable event-facts review card with Unknowns preserved
- Sequential builder questions (backend, active hours/deadline/tz incl. continuous vs spread, coding: solo/team + mode + tool/model), quick choices + free text + "Use recommended answer" + Back/Edit
- Grouped secondary profile (interests, resources, excluded directions)
- Five idea cards with progressive disclosure; commands via composer + contextual buttons (select, default selection, more ideas + reason, reject + reason, compare, combine, focused variants); rejected-directions memory; new batches genuinely different; at most 10–15 silent concepts
- Comparison of requested ideas on track fit, demo advantage, product potential, feasibility, differentiation, trade-offs (and winning advantage, risk)
- Gates A–D as editable drafts with explicit Approve/Revise/Reject/Go back; Reality Check constraint-revision proposal (keep/cut/change/newly-uncertain) side-by-side; stale-gate marking
- Final validation (8 checks) + kill test before export
- Session persistence + resume + JSON import/export + confirmed reset
- Markdown export (copy + download) in idea-packet structure; DRAFT watermark + incomplete-gate list if not ready
- Live vs sample modes clearly separated; persistent "Sample workshop — illustrative data" label; synthetic fixtures not implying real event/prize/research
- Source/evidence/confidence labels throughout; name-check statuses
- Optional retrieval adapter off by default (SSRF-protected) + evidence records

**Explicitly excluded:** accounts, collaboration, billing, hackathon marketplace, automatic submissions, model training, general-purpose agent, full engineering planning for generated ideas, PDF export, arbitrary URL fetching without protections, multi-user.

## 5. Visual direction and screen structure

**Direction:** editorial product studio — warm off-white surfaces, deep ink typography, one restrained cobalt accent, precise borders, generous whitespace, readable type scale. Typographic wordmark + original outline/selection motif (thin selection brackets / nested outline). No emoji logo, gradient blobs, heavy glassmorphism, glowing dashboards, excessive animation.

**Tokens:** spacing, type (incl. mono for evidence), color, minimal elevation (borders over shadows), visible cobalt focus ring, small precise radii, short opacity/translate motion, `prefers-reduced-motion`.

**Screens:** `/` landing (hero "Find the project worth building.", subhead "Turn a hackathon brief into ideas that fit your time, skills, and challenge.", primary CTA Start a workshop, secondary Try a sample workshop, product preview of idea card + requirement proof + reviewed scope revision, three-step explanation, honest boundary — supports decisions, cannot guarantee prizes/market success; no fabricated testimonials/metrics/logos/customer claims). `/workshop/:id`: app shell = compact progress rail + focused central workspace + collapsible context panel; Unknown shown as Unknown; mobile single column + compact progress, no essential horizontal scroll.

**States:** loading, empty, error, hover, focus, disabled, live-AI unavailable, stale-gate, DRAFT export, sample label.

## 6. Minimal model / research boundary

- Provider-neutral adapter, server-side only. Default: OpenAI-compatible chat completions via env (`OUTLINE_LLM_BASE_URL`, `OUTLINE_LLM_API_KEY`, `OUTLINE_LLM_MODEL`), optional Ollama. No paid provider locked without explicit user approval. Credentials never in frontend/storage/logs/fixtures/git.
- One structured call per step (not whole-prompt rerun); structured JSON for current step. Model proposes; app code controls transitions. Response may be content / recommended next action / one focused follow-up; never controls transitions.
- Timeouts, cancellation, bounded retries, duplicate-submit protection via session+revision ids, stale-response rejection. On failure: no invented result; preserve draft; offer retry or separate sample workshop; plain-language errors (rate limits, invalid output, missing config, network).
- Evidence policy: model memory is not a retrieved source; Verified claims require supporting evidence records; names/sponsors "Unknown/not checked" unless actually checked; if no retrieval adapter → brief-grounded mode with clearly stated limits; if retrieval enabled → official sources first, store excerpts + retrieval metadata, cite claims, treat fetched content as untrusted data (ignore embedded instructions), SSRF protections (block private/internal, unsafe schemes, safe redirects, size/time caps). Abuse protection before any public paid endpoint.
- Cost: request-size limits, context trimming to approved state + profile + excerpts + current command; no full-brief logging by default; sanitize model-rendered content/unsafe links.

## 7. Data contracts (target types)

```
WorkshopSession { id, schemaVersion, sourceFrameworkVersion (Prompt 0 version), mode:'live'|'sample', createdAt, updatedAt, currentStep, status, brief:EventBrief, builder:BuilderProfile, ideaBatches:IdeaBatch[], selection:Selection|null, gates:{A,B,C,D:GateDraft}, approvals:Approval[], revisions:RevisionHistory, sources:SourceRecord[], exportReadiness:ExportReadiness }
EventBrief { rawText, source:'pasted'|'url_ref', url?, title?, organizer?, dates?, judging:[{criterion,weight?}], tracks:[{name,qualification}], requiredTech[], prizes[], constraints[], uncertainties[], extractedFacts, missingFacts[], userEdits, ...Other official facts }
SourceRecord { id, kind:'url'|'pasted'|'retrieved', ref, excerpt?, retrievedAt?, claims:claimId[] }
Claim { id, text, label:'Verified'|'Supported'|'Assumption'|'Unknown', evidenceIds[] }
BuilderProfile { backendPreference, totalHours, deadline, timezone, timeShape?, teamSize?, codingMode, editorOrAgent?, model?, toolLimits?, interests[], resources[], excludedDirections[] }
IdeaBatch { id, parentBatchId?, reasonForBatch?, ideas:Idea[], recommended:{bestOverall,safest,mostInnovative,strongestProductPotential}, riskWarning?, createdAt }
Idea { number, name, pitch, targetUser, problem, product, flow, demo10s, hackathonFit:{primaryTrack,primaryQualification,secondaryTrack?,secondaryQualification?,requirementProof:{requirement,capability,demoEvidence}}, whyItCouldWin, productPotential:{recurringNeed?,earlyAdopter?,buyer?,expansion?}, productPotentialAssumptions[], demo10s, requiredTechRole, defensibility, closestAnalogue, difference, nameCheck:{meaning,feeling,backup,collisionStatus}, mainRisk, buildFit, expanded:{mechanism,requirementProofDetail,sponsorRoleDetail,moat,closestAnalogue2,productPotentialDetail,namingCheckDetail,backupName,sources[]} }
Selection { selectedIdeaId, selectedAt, batchId }
GateDraft { gate:'A'|'B'|'C'|'D', revision, content (typed per gate), approved:bool, approvedAt?, approvedRevision?, stale:bool, staleReason? }
Approval { gate, revisionId, contentSnapshot, approvedAt }
RevisionProposal { baseRevisionIds, changedInputs, changes:{kept[],cut[],changed[],newlyUncertain[]}, proposedGates, status:'proposed'|'applied'|'discarded' }
RevisionHistory { approvedSnapshots[], rejectedDirections[], batches[] }
FinalPacket { ...packet..., exportStatus, warnings[] }
ExportReadiness { gatesComplete, staleGates[], missingFields[], canExport, draftAllowed }
```

## 8. Workflow state machine

States: `landing → brief_intake → brief_review → backend_q → build_setup_q → profile_secondary → ideation_generating → idea_review → (compare/combine/more_ideas) → selection → gate_a → gate_b → gate_c → gate_d → final_validation → final_packet → export`. Revisions may branch from any post-selection state into `revision_proposed` then back, marking dependent approvals stale while retaining history. App code (not model) controls transitions; reject/combine/compare/more-ideas never approve a gate; changed inputs mark downstream results/approvals stale; export blocked until reviewed.

## 9. Risks and mitigations

- Overclaiming research → evidence labels + brief-grounded honesty + no verified-eligibility promises.
- Hallucination → schema validation, stale-response rejection, retry without fabrication.
- Secret leakage → server-side only, env, no logs of secrets.
- SSRF (if retrieval) → protections listed.
- Scope creep → exclusions enforced.
- Sample/live confusion → persistent label + synthetic fixtures.
- Storage corruption → schema version + migration or safe incompatibility notice + graceful failure.
- Cost → per-step single calls, trimming, cancellation.

## 10. Phased implementation plan

One branch per phase, one focused commit per logical step. Commit messages describe the change only, no phase names/numbers. No push/merge/deploy without permission.

- Phase 1 — Foundation, contracts, workflow engine. ~2–3 days.
- Phase 2 — Design system + landing. ~1.5–2 days.
- Phase 3 — Guided brief + builder interview. ~2 days.
- Phase 4 — Live model integration + evidence boundary. ~2–3 days.
- Phase 5 — Five-idea gallery, commands, comparison. ~2.5–3 days.
- Phase 6 — Gates A–D + Reality Check. ~3 days.
- Phase 7 — Persistence + history + final packet export. ~1.5–2 days.

Total ~14–18 engineering days. Smallest complete version if tight: ~8–10 days by trimming combine/variant generation, retrieval adapter, JSON import/export (keep clipboard markdown), and secondary profile details; core path remains brief → questions → 5 ideas → select → 4 gates → validated markdown export.

## 11. Provisional tech stack

- Client: React 18 + Vite + TypeScript, React Router, Tailwind CSS, headless patterns only, Zod, Vitest + Testing Library.
- Backend: Python 3.12+ (available 3.14), FastAPI + Pydantic v2 + uvicorn; server-side key proxy; no database required for MVP (local-first).
- Tooling: eslint/prettier, ruff, pytest. Confirm all versions against official docs at implementation.

## 12. Recommended defaults for unresolved choices

- Model provider: provider-neutral OpenAI-compatible via env, Ollama fallback; no paid provider without explicit approval.
- Storage: localStorage/IndexedDB session JSON; schema-versioned; optimistic.
- Name checks: "not checked/Unknown" by default; real check only when performed.
- Brief parsing: structured extraction with explicit Unknowns; no fabricated intelligence when live unavailable.
- Export filename: `outline-idea-packet-<slug>-<date>.md`.

## 13. Approval request

No code written. Requesting approval of this updated product contract/plan (which now also ingests the latest Prompt 0 variant including backup name, track qualification proof, product-potential thesis, naming checks, and expanded Gate D/packet fields). If approved, proceed to Phase 1 implementation on a new branch and stop after it for review.