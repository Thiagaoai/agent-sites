# HOOK: Session Start
Execute at the beginning of every agente-sites session.

## MANDATORY SEQUENCE

### Step 1 — Load memory from Supabase
Query schema agente_sites via Supabase MCP (project and schema defined in CONTEXT.md):

```sql
SELECT cliente, nome, status, proximo_passo, atualizado_em
FROM agente_sites.projetos
WHERE status != 'arquivado'
ORDER BY atualizado_em DESC
LIMIT 10;

SELECT resumo, tarefas_pendentes, created_at
FROM agente_sites.sessoes
ORDER BY created_at DESC
LIMIT 1;
```

#### Supabase Offline Fallback
If Supabase is unavailable:
  - Log warning: "Supabase offline — working from MEMORY.md only"
  - Continue with local state (DO NOT block session)
  - Flag for sync when Supabase is back

### Step 2 — Load local MEMORY.md
Read MEMORY.md at the project root.

### Step 3 — Ask the user
"Which client and project are we working on today? Or is this an internal project?"

### Step 4 — Confirm active context
- Active project
- Last known state
- Pending next step
