---
name: self-healing
description: Self-correction protocol when the agent detects an error or fails the reflexion check. Acknowledges the error, identifies the root cause, corrects the output, and logs the pattern to avoid repetition.
---

# SKILL: self-healing | Priority: 9
Source: AutomatEasy internal

## WHEN TO USE
When the agent detects it made an error. Output failed reflexion check.

## SELF-CORRECTION PROTOCOL
1. Acknowledge the error explicitly (do not minimize)
2. Identify the root cause
3. Correct the output
4. Log the pattern to avoid repetition
5. If recurring: propose improvement to CLAUDE.md

## PROHIBITED
Denying an obvious error. Repeating the same error in the same session.
