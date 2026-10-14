# Outline

Find the project worth building.

## MVP purpose

Outline is a guided hackathon discovery workspace. It runs a structured workshop from a pasted brief through builder setup, five differentiated ideas, comparison/commands, approval gates A–D, a Reality Check scope revision flow, and a Markdown Idea Packet export for engineering planning.

It does **not** guarantee prizes, market demand, naming clearance, or independently verified eligibility from a brief alone.

## Boundaries

- In scope: pasted brief intake, sequential builder questions, five idea cards, commands/comparison, gates A–D, reviewed constraint revisions, session persistence, Markdown export, clearly separated live/sample modes.
- Out of scope: accounts, collaboration, billing, marketplace, automatic submissions, model training, general-purpose agent, full engineering planning for generated ideas, PDF export.

## Setup

Client:
```bash
cd client
npm install
npm run dev
npm test
npm run build
```

Server:
```bash
cd server
python -m pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
python -m pytest
```

Vite proxies `/generate` and `/health` to `http://localhost:8000`.

## Environment variables

Server (secret-free example in `server/.env.example`):
- `OUTLINE_LLM_BASE_URL`
- `OUTLINE_LLM_API_KEY`
- `OUTLINE_LLM_MODEL`
- `OUTLINE_MODE`
- `OUTLINE_CORS_ORIGINS`

No secrets are stored in frontend code, browser storage, fixtures, or git. Drafts stay on the user's device in localStorage; brief text and approved state needed for the current step are sent to the configured model provider only when live AI is used. Sample mode uses no provider.

## Source framework

- Version: `prompt0-2026-10` (see `docs/source/prompt0.md`).
- Gates: A user value/product thesis, B mechanism/track proof/moat, C winning demo, D feasibility/product path.
- Evidence labels: Verified, Supported, Assumption, Unknown. They are evidence categories, not numerical scores.
- Track fit is a requirement-to-capability claim with evidence, not thematic resemblance.
- Name collision checks are reported as not checked unless performed.

## Model/budget notes

- Provider-neutral OpenAI-compatible adapter by default; optional local Ollama.
- No paid provider is locked without explicit user approval.
- Each interaction requests structured output for the current step only.
- Retrieval adapter is optional/off by default; fetched content is treated as untrusted data.

## Privacy and storage

- No accounts or cloud sync in MVP.
- Drafts are stored in browser localStorage under `outline.session.v1`.
- Corrupt or incompatible sessions are ignored with a notice.
- Imported JSON is validated before use.

## Known limitations

- No guarantee of prizes, market demand, naming clearance, or independently verified eligibility without supporting research.
- Generated output depends on model availability and configuration.
- Sample data is explicitly illustrative and not real event research.
- Exported Markdown is an engineering handoff, not a full technical architecture.

## Deployment plan (not deployed)

Recommended: static client on Vercel/Netlify, FastAPI API on Fly.io/Render with server-side secrets, allowed origins, health check `/health`, environment from server secrets, rollback by redeploying previous image/commit. Verify current official host documentation before deployment. No live URL is claimed.

## Demo script (60 seconds)

1. Open Outline landing; state sample vs live clearly.
2. Paste a brief or use sample. Show Unknown fields remain Unknown.
3. Answer builder questions using recommended defaults.
4. Generate/show five ideas; select ScopeSafe.
5. Open Gate A and Reality Check: reduce hours from 24 to 8.
6. Show baseline vs proposed revision: kept core mechanism, cut optional scope, changed track fit status, newly uncertain sponsor capability.
7. Discard or apply; if applied, show dependent gates marked stale.
8. Request approval of affected gates; show export blocked until approved.
9. Export sample packet labelled illustrative.

## Cursor challenge description draft

"Outline used Cursor for [specific task] during [phase], including [files changed] and [tests run]. The AI-assisted changes were reviewed before merge. _Replace placeholders with recorded evidence; do not claim unsupported assistance._"

## Repository map

- `client/` - React/Vite/TypeScript app, design system, workflow engine, services, tests
- `server/` - FastAPI app, Pydantic schemas, generation adapter, tests
- `docs/source/prompt0.md` - source framework
- `PLAN.md` - product contract and phased plan

## Completed capabilities

- Pasted brief intake and editable facts
- Sequential builder setup
- Five idea cards, recommendations, commands, compare/combine
- Gates A–D, Reality Check, stale marking
- Persistence, import/export/reset, Markdown export
- Live/sample separation and provider adapter

## Test/build results

- Client: vitest 11 passed; tsc build passed
- Server: pytest 2 passed

## Remaining blockers

- No authorized LLM credentials configured
- Browser visual/manual accessibility audit incomplete
- Type simplification and storage test gaps

## Exact next steps

1. Assign an authorized model provider and run a real generation.
2. Complete responsive/keyboard/accessibility verification.
3. Run a manual sample journey end to end.
4. Decide on host and deploy only with approval.
EOF