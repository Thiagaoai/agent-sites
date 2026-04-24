# HOOK: Session End
Trigger: user types "end session", "bye", "see you later", or similar.

## MANDATORY SEQUENCE

### Step 1 — Summarize session in 5 bullets
- What was done
- What was decided
- What was deployed
- What is still pending
- Recommended next step

### Step 2 — Save to Supabase (via Supabase MCP — project and schema defined in CONTEXT.md)

```sql
INSERT INTO agente_sites.sessoes (cliente, projeto, resumo, tarefas_pendentes, proximo_passo)
VALUES ($1, $2, $3, $4, $5);

UPDATE agente_sites.projetos
SET status = $1, proximo_passo = $2, atualizado_em = NOW()
WHERE cliente = $3 AND nome = $4;
```

Parameters:
- INSERT: $1=client, $2=project, $3=summary, $4=pending_items, $5=next_step
- UPDATE: $1=new_status, $2=next_step, $3=client, $4=project

#### Supabase Offline Fallback
If Supabase is unavailable:
  - Log warning: "Supabase offline — working from MEMORY.md only"
  - Continue with local state (DO NOT block session)
  - Flag for sync when Supabase is back

### Step 3 — Update MEMORY.md
Sections: "LAST SESSION" and "ACTIVE PROJECTS".

### Step 4 — Confirm to user
"Session saved. [2-line summary]. See you next time!"

## PROHIBITED
Ending without saving state. If Supabase is unavailable: save to MEMORY.md and flag for sync.
