---
name: systematic-debugging
description: Root-cause analysis with 4-phase protocol — collect symptoms, hypothesize, diagnose with evidence, surgical fix. Never fix without diagnosis.
---

# SKILL: systematic-debugging | Priority: 9
Source: AutomatEasy internal — built for AutomatEasy agent suite

## IDENTITY
Systematic Debugging is the root-cause analysis skill for the AutomatEasy agent suite. It enforces a disciplined, evidence-based approach to diagnosing and fixing bugs. No fix may be proposed without first tracing the root cause through a structured investigation process.

## WHEN TO USE
Trigger this skill when:
- Any bug, error, or unexpected behavior is encountered
- A test fails or produces unexpected results
- The user reports something "not working" or behaving incorrectly
- A previously working feature breaks after a change
- An error message or stack trace appears

Do NOT trigger for:
- Feature requests or new functionality (no bug to debug)
- Code style or formatting issues (use linting tools)
- Performance optimization without a specific malfunction

## OPERATION MODES
### /quick
- Collect the error message and immediate context; form one hypothesis; confirm or reject; apply targeted fix.
### /standard (default)
- Full 4-phase protocol: Collect evidence, generate 3+ ranked hypotheses, confirm root cause with evidence, apply surgical fix with before/after comparison.
### /deep
- Full protocol plus: review git history for the relevant code, check for related issues in other parts of the codebase, write a regression test, and document the root cause for future reference.

## WHAT IT DOES
Applies a structured 4-phase debugging methodology that prevents guesswork and shotgun fixes. Each phase builds on the previous one, ensuring that fixes are targeted, evidence-based, and verifiable.

## EMBEDDED KNOWLEDGE
- **Phase 1 — Evidence Collection**: Gather the exact error message, stack trace, environment details (OS, runtime version, browser), when the bug started, and what changed recently (commits, config, dependencies).
- **Phase 2 — Hypothesis Generation**: Produce at least 3 possible causes, ranked by probability. Consider: recent changes, environment differences, dependency updates, race conditions, edge cases, and data corruption.
- **Phase 3 — Diagnosis**: Systematically confirm or eliminate each hypothesis using evidence: logs, breakpoints, bisection, minimal reproduction, or unit tests. The root cause must be confirmed with concrete proof.
- **Phase 4 — Surgical Fix**: Apply the minimum change necessary to fix the root cause. Document the before/after state. Provide a verification method (test command, manual check, etc.) so the fix can be confirmed.
- **Isolation principle**: Never change multiple things at once. Each change must be isolated so its effect can be measured independently.
- **Bisection**: When the cause is unclear, use git bisect or manual bisection to narrow down the breaking change.

## DECISION TREE
IF error message is clear and points to a specific line/file
  → Start Phase 2 with the indicated code as primary hypothesis
IF error is vague or intermittent
  → Invest more time in Phase 1; gather logs, reproduction steps, environment details
IF all 3+ hypotheses are eliminated
  → Expand the search: check dependencies, environment, external services, data integrity
IF the bug is a regression (worked before, broken now)
  → Use git bisect or review recent commits to find the breaking change
IF the fix requires changing multiple files
  → Make changes one at a time; verify after each change
IF the fix works but the root cause is unclear
  → Do NOT ship; continue diagnosis until the root cause is confirmed

## STEP-BY-STEP PROTOCOL
1. **Collect**: Record the exact error message, stack trace, and environment details.
2. **Collect**: Determine when the bug started and what changed (recent commits, dependency updates, config changes).
3. **Collect**: Reproduce the bug reliably; note the minimal reproduction steps.
4. **Hypothesize**: Generate at least 3 possible causes, ranked by probability.
5. **Diagnose**: Test the most probable hypothesis first using logs, breakpoints, or code inspection.
6. **Diagnose**: If the first hypothesis is eliminated, move to the next; continue until root cause is confirmed.
7. **Diagnose**: Confirm the root cause with concrete evidence (specific line, specific condition, specific data).
8. **Fix**: Apply the minimum change necessary to address the confirmed root cause.
9. **Fix**: Document the before/after state clearly.
10. **Fix**: Provide a verification method (command to run, behavior to observe) so the fix can be confirmed.
11. **Verify**: Run the verification method and confirm the bug is resolved.
12. (Deep mode) Write a regression test that would catch this bug if it reappears.

## INTERDEPENDENCIES
Run BEFORE:
- security (ensure the fix does not introduce vulnerabilities)
- reflexion (verify the fix and explanation quality before delivery)
Run AFTER:
- N/A (this skill is triggered by bug occurrence, not by other skills)

## FAILURE MODES
| Failure | Detection | Fix |
|---|---|---|
| Fix proposed without root cause | No evidence confirms why the bug occurred | Go back to Phase 3; do not ship until root cause is confirmed |
| Multiple changes applied at once | Diff shows unrelated modifications in the same commit | Revert to pre-fix state; reapply changes one at a time |
| Hypothesis list too narrow | All hypotheses eliminated without finding root cause | Expand search to dependencies, environment, external services |
| Bug not reproducible | Cannot trigger the bug on demand | Gather more data (logs, user environment); check for race conditions or intermittent factors |
| Fix introduces new bug | Tests fail or new error appears after fix | Revert the fix; re-diagnose with the new information |
| Root cause is in a dependency | Internal code looks correct but bug persists | Check dependency versions, changelogs, and known issues |

## OUTPUT CHECKLIST
- [ ] Exact error message and stack trace documented
- [ ] Environment and recent changes recorded
- [ ] Bug is reproducible with clear steps
- [ ] At least 3 hypotheses generated and ranked
- [ ] Root cause confirmed with concrete evidence
- [ ] Fix is surgical (minimum necessary change)
- [ ] Before/after state documented
- [ ] Verification method provided and executed
- [ ] No unrelated changes included in the fix

## PROHIBITED
- NEVER propose a fix without confirming the root cause first
- NEVER make multiple unrelated changes simultaneously
- NEVER skip hypothesis generation (minimum 3 hypotheses)
- NEVER ship a fix that "seems to work" without understanding why
- NEVER ignore the isolation principle — one change at a time
- NEVER skip the verification step after applying a fix
