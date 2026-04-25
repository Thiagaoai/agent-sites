---
name: strategic-compact
description: Suggests running /compact when context exceeds 60% of the window, before a new project phase, or after a series of errors that signal context degradation.
---

# SKILL: strategic-compact | Priority: 8
Source: AutomatEasy internal

## WHEN TO USE
Suggest /compact when:
- Context exceeds 60% of window
- Starting a new project phase
- After a series of errors (signal of degradation)

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
