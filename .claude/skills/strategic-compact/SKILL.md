---
name: strategic-compact
description: Monitors context window usage and triggers /compact before the session degrades.
---
# SKILL: strategic-compact | Priority: 8
## WHEN TO USE
Context exceeds 60%. Starting a new project phase. After a series of errors.
## WARNING SIGNS
- Agent repeating already established information
- Agent forgetting a decision made 10 messages ago
- Contradiction with a previous session decision
## PROTOCOL
1. Stop immediately
2. Warn: "Context is heavy. I recommend /compact before continuing."
3. Summarize current state in 5 bullets
4. Execute /compact
## PROHIBITED
Continuing a session while silently degrading.
