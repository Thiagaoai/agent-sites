---
name: reflexion
description: Mandatory self-evaluation loop before any output delivery. Validates accuracy, completeness, and actionability.
---

# SKILL: reflexion | Priority: 9
Source: AutomatEasy internal — built for AutomatEasy agent suite

## IDENTITY
Reflexion is the mandatory self-evaluation skill for the AutomatEasy agent suite. It acts as a final quality gate before any output is delivered to the user, ensuring that every response is accurate, complete, and actionable. No output may bypass this check.

## WHEN TO USE
Trigger this skill when:
- About to deliver ANY output to the user (always, without exception)
- Completing a code generation, review, or debugging task
- Answering a question or providing recommendations
- Finishing a multi-step workflow before presenting results

Do NOT trigger for:
- Internal intermediate steps that are not user-facing
- Clarifying questions directed at the user (these are inputs, not outputs)

## OPERATION MODES
### /quick
- Run the 3-question self-check silently; only pause delivery if a question fails.
### /standard (default)
- Run the 3-question self-check plus verify completeness (no missing steps, no dangling TODOs) and clarity (next steps are explicit).
### /deep
- Full self-check plus: re-read the original request from scratch, compare output against every stated requirement, check for edge cases, and verify that the output would be useful to someone with no prior context.

## WHAT IT DOES
Before delivering any output, the agent pauses and runs a structured self-evaluation consisting of three mandatory questions. If any answer is "no" or "uncertain," the output is revised before delivery. This prevents common failure modes: partial answers, obvious errors, and unclear next steps.

## EMBEDDED KNOWLEDGE
- **Question 1 — Accuracy**: "Does this exactly address what was asked?" — Checks that the output matches the user's intent, not a reinterpretation of it.
- **Question 2 — Correctness**: "Is there an obvious error I would be delivering?" — Catches syntax errors, logical mistakes, wrong file paths, outdated information, or hallucinated facts.
- **Question 3 — Clarity**: "Is the next step clear?" — Ensures the user knows what to do after receiving the output; no dead ends.
- **Revision rule**: If any question scores "no" or "uncertain," the output MUST be corrected before delivery. There is no exception.
- **Silent operation**: This skill runs internally. The user should not see the self-check questions in the output unless they explicitly ask for the evaluation.

## DECISION TREE
IF all 3 questions pass
  → Deliver the output as-is
IF Question 1 fails (does not address the request)
  → Re-read the original request; rewrite the output to match the actual ask
IF Question 2 fails (contains obvious error)
  → Identify and fix the error; re-run the check
IF Question 3 fails (next step unclear)
  → Add an explicit "Next steps" section or clarify the action the user should take
IF multiple questions fail
  → Rewrite the output from scratch rather than patching

## STEP-BY-STEP PROTOCOL
1. Pause before delivering the output.
2. Re-read the user's original request or task description.
3. Ask: "Does this exactly address what was asked?" — If no, revise.
4. Ask: "Is there an obvious error I would be delivering?" — If yes, fix it.
5. Ask: "Is the next step clear?" — If no, add explicit guidance.
6. If any revision was made, re-run the 3-question check on the revised output.
7. Only deliver the output once all three questions pass.

## INTERDEPENDENCIES
Run BEFORE:
- Final output delivery (this is always the last skill before the user sees anything)
Run AFTER:
- All other skills (frontend-design, security, systematic-debugging, etc.)

## FAILURE MODES
| Failure | Detection | Fix |
|---|---|---|
| Output does not match the request | Question 1 fails; output addresses a different problem | Re-read original request; rewrite to match actual intent |
| Obvious error in output | Question 2 fails; syntax, logic, or factual mistake found | Fix the specific error; re-run the full check |
| No clear next step | Question 3 fails; user would not know what to do next | Add explicit next-step instructions or action items |
| Self-check skipped | Output delivered without running the 3 questions | Retroactively run the check; issue correction if needed |
| Patch-on-patch degradation | Multiple revisions make output incoherent | Discard and rewrite from scratch |

## OUTPUT CHECKLIST
- [ ] Question 1 passed: output addresses exactly what was asked
- [ ] Question 2 passed: no obvious errors present
- [ ] Question 3 passed: next step is clear to the user
- [ ] If any revision was made, the revised output was re-checked
- [ ] Output is coherent and well-structured

## PROHIBITED
- NEVER deliver output that failed the self-evaluation
- NEVER skip the 3-question check, regardless of time pressure or simplicity of the task
- NEVER show the self-check questions to the user unless explicitly requested
- NEVER deliver a "patched" output that has been revised more than twice without a full rewrite
