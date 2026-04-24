---
name: deploy
description: Deploy checklist and execution. Asks for project and environment before proceeding.
---

# /deploy — Deploy Checklist and Execution

## WHEN TO USE
- Deploying any project to staging or production
- Running pre-deploy validation

## PROTOCOL

### Step 1 — Gather Requirements
Ask the user (do not proceed without answers):
1. **Project**: which project are we deploying?
2. **Environment**: staging or production?

### Step 2 — Pre-Deploy Checklist
Run through each item and report pass/fail:
- [ ] Local build completes without errors
- [ ] No console.log with sensitive data in codebase
- [ ] Environment variables set in hosting dashboard (not in code)
- [ ] Images optimized (WebP preferred, max 200KB per image)
- [ ] Meta tags configured (title, description, og:image)
- [ ] Custom 404 page exists
- [ ] Forms tested and submitting correctly
- [ ] Mobile responsiveness verified
- [ ] HTTPS confirmed on domain

### Step 3 — Execute Deploy (autonomous)
Based on platform:
- **Vercel**: verify project is linked, trigger deploy
- **Netlify**: verify site is linked, trigger deploy
- **Manual**: provide step-by-step CLI commands

### Step 5 — Post-Deploy Validation
After deploy completes:
1. Visit the live URL and confirm it loads
2. Test primary CTA / main functionality
3. Check browser console for errors
4. Verify analytics/tracking is firing

### Step 6 — Record Deploy
Update MEMORY.md deploy history table.
Save to Supabase:
```sql
UPDATE agente_dev.projetos
SET status = $1, proximo_passo = $2, atualizado_em = NOW()
WHERE cliente = $3 AND nome = $4;
```
Parameters: $1=new_status, $2=next_step, $3=client, $4=project

### Step 7 — Deliver Report
1. Deploy URL
2. Environment (staging/production)
3. What was validated
4. Any issues found
5. Recommended next step

## RULES
- NEVER deploy without explicit user approval
- NEVER deploy directly to production without staging first
- NEVER skip the checklist
- Always record the deploy in MEMORY.md and Supabase
