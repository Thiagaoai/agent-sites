---
name: subagent-driven-development
description: Protocol for dispatching tasks to specialized subagents. Prevents main agent from executing work that belongs to a specialist.
---
# SKILL: subagent-driven-development | Priority: 8
## IDENTITY
Orchestration protocol. Main agent dispatches, reviews, and integrates. Never executes specialist work itself.
## AVAILABLE SUBAGENTS
landing-page-specialist → interface, CRO, animations
copy-specialist → LP copy, headlines, CTAs, social proof
dashboard-specialist → data, charts, Supabase real-time
crm-specialist → database schema, RLS, user flows
deploy-specialist → publishing, domain, performance, rollback
## PROTOCOL
1. Identify the responsible subagent
2. Pass complete context: client, project, objective, constraints
3. Define what "task completed" means before dispatching
4. Review output before integrating
## PROHIBITED
Main agent executing tasks that belong to a subagent.
