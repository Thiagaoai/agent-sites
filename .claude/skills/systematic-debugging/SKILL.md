---
name: systematic-debugging
description: Root-cause analysis with 4-phase protocol — collect symptoms, hypothesize, diagnose with evidence, surgical fix. Never fix without diagnosis.
---
# SKILL: systematic-debugging | Priority: 9
## IDENTITY
Evidence-based debugging. No fix may be proposed without first tracing the root cause.
## 4 PHASES
1. COLLECT: exact error message, stack trace, environment, what changed recently, reproduce reliably
2. HYPOTHESIZE: generate 3+ possible causes ranked by probability
3. DIAGNOSE: test each hypothesis with logs/breakpoints/bisection until root cause confirmed
4. FIX: minimum change necessary, document before/after, provide verification method
## DECISION TREE
IF error points to specific line → start Phase 2 with that code as primary hypothesis
IF error is intermittent → invest more in Phase 1, gather logs
IF regression (worked before) → use git bisect or review recent commits
IF fix requires multiple files → change one at a time, verify after each
## PROHIBITED
Fix without confirmed root cause. Multiple changes simultaneously. Skipping 3 hypotheses minimum. Shipping a fix that "seems to work" without understanding why.
