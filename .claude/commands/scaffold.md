---
name: scaffold
description: Scaffold a new project from scratch. Asks for type, client, and stack before generating any code.
---

# /scaffold — New Project Scaffolding

## WHEN TO USE
- Starting a brand new project for a client or internal use
- Need a clean, standardized folder structure

## PROTOCOL

### Step 1 — Gather Requirements
Ask the user (do not proceed without answers):
1. **Project type**: landing page | dashboard | full app | API/backend only
2. **Client name**: (or "internal" for agency projects)
3. **Stack override**: use default stack or custom? (default from CONTEXT.md)

### Step 2 — Determine Stack
Based on project type, select defaults:
- **Landing page**: HTML + Tailwind CSS, deploy Netlify
- **Dashboard**: React + Next.js + Tailwind, Supabase, deploy Vercel
- **Full app**: React + Next.js + Tailwind, Supabase (auth + DB), deploy Vercel
- **API/backend only**: Supabase Edge Functions or Next.js API routes

### Step 3 — Generate Structure
Create the project folder with:
```
project-root/
  src/
    components/
    pages/ (or app/ for Next.js App Router)
    lib/
    styles/
  public/
  .env.example
  README.md (minimal — project name + stack + setup instructions)
```

### Step 4 — Initialize Configuration
- Create `.env.example` with required variables (no real values)
- Set up Tailwind config with brand-safe defaults
- Add base layout component if React/Next.js

### Step 5 — Register in Supabase
```sql
INSERT INTO agente_dev.projetos (cliente, nome, status, proximo_passo, atualizado_em)
VALUES ($1, $2, 'scaffolded', $3, NOW());
```
Parameters: $1=client, $2=project_name, $3=next_step

### Step 6 — Update MEMORY.md
Add the new project to the ACTIVE PROJECTS table.

### Step 7 — Deliver Summary
Report:
1. What was created
2. How to run locally
3. What is missing for first milestone
4. Recommended next step

## RULES
- Never scaffold without knowing the client and project type
- Never include real credentials in any generated file
- Always create .env.example, never .env with real values
- Dispatch to the appropriate sub-agent after scaffolding
