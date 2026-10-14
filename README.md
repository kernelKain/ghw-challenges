# ghw-challenges

A monorepo-style collection of projects built for **Global Hack Week (GHW)** challenges. Each folder holds one challenge project so completed work is preserved, reviewable, and easy to find later.

## Purpose

- Keep all challenge projects from Global Hack Week challenges in one place.
- Preserve submissions, experiments, and prototypes so they aren't lost after the event.
- Make it easy to browse past projects by year, event, challenge, and project name.
- Provide a consistent structure so anyone can jump into a project quickly.

## Project Naming Convention

Every project folder must follow the naming convention:

```
YYYY-MM-event-challenge-NN-project-name
```

| Segment | Meaning | Example |
| --- | --- | --- |
| `YYYY` | 4-digit year the challenge took place | `2026` |
| `MM` | 2-digit month of the challenge | `10` |
| `event` | Short slug for the event | `ghw` |
| `challenge` | Challenge or track name in kebab-case | `ai-ml` |
| `NN` | Zero-padded 2-digit project number | `01` |
| `project-name` | Kebab-case name of the project | `study-buddy` |

Full example: `2026-10-ghw-ai-ml-01-study-buddy`

### Rules

- All segments are lowercase.
- Use hyphens (`-`) to separate segments; never spaces or underscores.
- `YYYY` and `MM` are always numeric and zero-padded.
- `NN` is a 2-digit counter starting at `01` for the first project in that challenge.
- Slugs (`event`, `challenge`, `project-name`) use kebab-case (lowercase letters, digits, and hyphens only).
- Each project lives in its own top-level folder with exactly this name.

## Adding a New Project

1. Create a new folder at the repository root using the naming convention above.
2. Put all project files inside that folder.
3. Keep project-specific dependencies and configuration scoped to the folder.
4. Update any project-level documentation as needed.

## Layout

```
ghw-challenges/
├── YYYY-MM-event-challenge-NN-project-name/
│   ├── ... (project files)
├── README.md
└── LICENSE
```
