---
name: session-report
description: End-of-session compilation. Generates a structured summary of everything done, decided, and pending.
---

# /session-report — Session Summary Compilation

## WHEN TO USE
- At the end of any work session
- When the user wants a summary of progress
- Before handing off to another developer or agent

## PROTOCOL

### Step 1 — Collect Session Data
Review the full conversation and extract:
1. **Tasks completed**: list each deliverable finished
2. **Decisions made**: any architectural, design, or scope decisions
3. **Deploys executed**: URLs, environments, status
4. **Issues found**: bugs, blockers, technical debt
5. **Pending items**: unfinished work, waiting on input

### Step 2 — Compile Report
Format:
```
SESSION REPORT — [Date]
Client: [name]
Project: [name]

COMPLETED
- [item 1]
- [item 2]

DECISIONS
- [decision + rationale]

DEPLOYS
| Environment | URL | Status |
|-------------|-----|--------|

PENDING
- [item + who/what is blocking]

NEXT STEP
[Single clear action to take in the next session]
```

### Step 3 — Save to Supabase
```sql
INSERT INTO agente_dev.sessoes (cliente, projeto, resumo, tarefas_pendentes, proximo_passo)
VALUES ($1, $2, $3, $4, $5);
```
Parameters: $1=client, $2=project, $3=summary, $4=pending_items, $5=next_step

### Step 4 — Update MEMORY.md
Update the LAST SESSION section and ACTIVE PROJECTS table.

### Step 5 — Present to User
Display the compiled report and confirm:
"Session report saved. Anything to add or correct before closing?"

## SUPABASE OFFLINE FALLBACK
If Supabase is unavailable:
  - Log warning: "Supabase offline — saving to MEMORY.md only"
  - Save full report to MEMORY.md
  - Flag for sync when Supabase is back

## RULES
- Never generate a report without reviewing the full conversation
- Never omit pending items — they are critical for continuity
- Always save to both Supabase and MEMORY.md
- Always end with a single, clear next step
