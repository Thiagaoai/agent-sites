---
name: new-client
description: Register a new client in the Supabase agente_dev schema. Collects client info and creates initial records.
---

# /new-client — Register New Client

## WHEN TO USE
- Onboarding a new client for development work
- Starting first project for an existing contact

## PROTOCOL

### Step 1 — Gather Client Information
Ask the user (do not proceed without answers):
1. **Client name**: company or individual name
2. **Contact**: primary contact name and preferred channel
3. **Vertical**: local services | education | e-commerce | SaaS | other
4. **First project**: brief description of what they need

### Step 2 — Check for Duplicates
Query Supabase to see if client already exists:
```sql
SELECT cliente, nome, status
FROM agente_dev.projetos
WHERE cliente ILIKE $1
LIMIT 5;
```
Parameters: $1=client_name_pattern

If found, show results and ask: "This client may already exist. Continue as new or use existing?"

### Step 3 — Create Project Record
```sql
INSERT INTO agente_dev.projetos (cliente, nome, status, proximo_passo, atualizado_em)
VALUES ($1, $2, 'registered', $3, NOW());
```
Parameters: $1=client_name, $2=project_name, $3=next_step

### Step 4 — Update MEMORY.md
Add the new client and project to the ACTIVE PROJECTS table.

### Step 5 — Determine Next Steps
Based on the project type, recommend:
- Which sub-agent should lead
- What information is still needed (brief, assets, brand guide)
- Suggested first milestone

### Step 6 — Deliver Confirmation
```
NEW CLIENT REGISTERED
Client: [name]
Project: [name]
Status: registered
Next step: [recommendation]
Saved to: Supabase agente_dev + MEMORY.md
```

## SUPABASE OFFLINE FALLBACK
If Supabase is unavailable:
  - Log warning: "Supabase offline — saving to MEMORY.md only"
  - Save all info to MEMORY.md
  - Flag for sync when Supabase is back

## RULES
- Never create a client record without a project name
- Never proceed without confirming no duplicate exists
- Always save to both Supabase and MEMORY.md
- Always recommend a clear next step
