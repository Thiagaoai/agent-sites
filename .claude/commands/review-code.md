---
name: review-code
description: Code review protocol for deliverables. Checks quality, security, performance, and adherence to standards.
---

# /review-code — Code Review Protocol

## WHEN TO USE
- Before any delivery to client
- Before deploying to staging or production
- When reviewing code written by another model or developer
- When Raphael requests a quality check

## PROTOCOL

### Step 1 — Identify Scope
Ask or determine:
1. Which files/project to review?
2. What is the deliverable goal? (LP, dashboard, feature, etc.)

### Step 2 — Security Review
Check for:
- [ ] No API keys or secrets hardcoded in source
- [ ] No service role keys exposed on the frontend
- [ ] RLS enabled on all Supabase tables with user data
- [ ] Environment variables used for all sensitive config
- [ ] No console.log exposing sensitive data
- [ ] Input validation on all user-facing forms

### Step 3 — Code Quality Review
Check for:
- [ ] Components are reusable and descriptively named
- [ ] No duplicated logic (DRY principle)
- [ ] Proper error handling (try/catch, error boundaries)
- [ ] Loading states implemented (skeleton or spinner)
- [ ] No orphaned imports or unused variables
- [ ] TypeScript types defined where applicable

### Step 4 — Visual / UX Review
Check for:
- [ ] Mobile-first responsive design
- [ ] Consistent typography (weight, size, spacing)
- [ ] Color contrast meets WCAG AA
- [ ] Animations serve a purpose (not decorative)
- [ ] CTA is clear and prominent (for LPs)

### Step 5 — Performance Review
Check for:
- [ ] Images optimized (WebP, lazy loading)
- [ ] No blocking scripts in head
- [ ] Efficient database queries (no N+1)
- [ ] Bundle size reasonable

### Step 6 — Deliver Review Report
Format:
```
REVIEW — [Project Name]
Date: [date]

PASSED: [count]
FAILED: [count]
WARNINGS: [count]

ISSUES (must fix):
1. [severity] [file] — [description]

WARNINGS (should fix):
1. [file] — [description]

VERDICT: APPROVED / NEEDS FIXES / BLOCKED
```

## RULES
- Never approve without actually reading the code
- Never skip security checks
- Be specific: file name + line reference for every issue
- Distinguish must-fix from nice-to-have
