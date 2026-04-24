# SKILL: kaizen | Priority: 8
Source: AutomatEasy internal

## IDENTITY
Japanese continuous improvement applied to the agent — small consistent improvements each session, always based on real operational evidence.

## WHEN TO USE
- End of each session (quick review)
- After a detected error or rejection
- Monthly review of CLAUDE.md and skills
- When agent performance seems stagnant

## WHAT IT DOES
Kaizen cycle applied to the agent:
1. **Observe:** what could have been better this session? (specific)
2. **Analyze:** why wasn't it better? (root cause, not symptom)
3. **Propose:** 1 small, specific change
4. **Validate:** user approval before applying
5. **Apply:** surgical change after approval
6. **Record:** save to memoria.automateasy in Supabase with type and correction

Principle: 1% better per session > occasional complete restructuring.

### Difference from review-claudemd
review-claudemd: focuses exclusively on CLAUDE.md
kaizen: focuses on any aspect (skills, subagents, processes, docs, CLAUDE.md)

## PROHIBITED
Proposing a large change without evidence of need.
Applying without user approval.
Recording a vague improvement — always specific and actionable with before/after.
