---
name: audit
description: Audits all agent files looking for errors, contradictions, stubs, incorrect counts and inconsistencies across files. Run after creating or modifying agent files. Run before declaring an agent as "ready".
---

# /audit — Rigorous Agent Audit

## WHEN TO USE
- After any session where files were created or modified
- Before declaring an agent as "ready"
- When Raphael requests a review
- As code review after another model wrote the files

## PROTOCOL

### Phase 1 — Inventory
```
1. List ALL .md files recursively in .claude/ and root
2. Count actual SKILL.md files vs number declared in CLAUDE.md
3. Verify each skill directory has SKILL.md with content (> 10 lines)
4. List empty directories
5. List stub skills (< 10 lines of real content)
```

### Phase 2 — Cross-Consistency
```
For each claim in CLAUDE.md, verify it's true:
  - Declared skill count = actual SKILL.md count
  - Declared subagent count = actual files in .claude/agents/
  - Each skill referenced in subagents exists as directory in .claude/skills/
  - Each subagent referenced in CLAUDE.md exists in .claude/agents/
  - Supabase schema mentioned matches real schema (execute query if MCP available)
  - Tables referenced in hooks exist in schema
  - Skills listed in any command or mapping files actually exist on disk
```

### Phase 3 — Contradictions
```
Search for contradictions between files:
  - CONTEXT.md vs subagents (consistent technical data?)
  - MEMORY.md vs hooks (source of truth aligned?)
  - session-start vs session-end (compatible fallbacks?)
  - Subagents between each other (circular escalation? overlapping domains?)
  - Stated table existence vs actual schema
  - Language consistency across all files
```

### Phase 4 — Content Quality
```
For each SKILL.md:
  - Has more than 10 lines? (if not = stub, report)
  - Has minimum sections? (WHEN TO USE, PROTOCOL, PROHIBITED minimum)
  - Language consistent with agent standard?

For each subagent:
  - Has frontmatter (name, description)?
  - Has IDENTITY, EXCLUSIVE DOMAIN, KNOWLEDGE BASE?
  - Has DECISION TREE, PROTOCOL, PROHIBITED?
```

### Phase 5 — Risky Technical Claims
```
List all numbers/metrics/versions declared in files:
  - Node/skill/template counts
  - API rate limits
  - Benchmarks
  - API versions
Mark each as: VERIFIED | UNVERIFIED | SUSPECT
```

## OUTPUT FORMAT
```
┌─────────────────────────────────────────────┐
│ AUDIT — [agent name]                        │
│ Date: [date]                                │
│                                             │
│ INVENTORY                                   │
│ Declared skills: X | Actual: Y              │
│ Declared subagents: X | Actual: Y           │
│ Empty directories: [list]                   │
│ Stub skills (< 10 lines): [list]            │
│                                             │
│ ERRORS (must fix)                           │
│ 1. [error + file + line]                    │
│                                             │
│ CONTRADICTIONS (must resolve)               │
│ 1. [file A says X, file B says Y]           │
│                                             │
│ IMPROVEMENTS (optional)                     │
│ 1. [suggestion]                             │
│                                             │
│ RATING: X/5                                 │
└─────────────────────────────────────────────┘
```

## RULES
- Never approve audit without reading ALL files
- Never declare "no errors" without verifying real counts
- Report stubs even if they have nice frontmatter — content < 10 lines = stub
- Cross-check AT LEAST: CLAUDE.md ↔ actual skills, hooks ↔ Supabase schema, subagents ↔ referenced skills
- If this agent was built by a different model/session, be EXTRA rigorous — author bias is real
