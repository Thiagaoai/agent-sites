---
name: create-skill
description: Meta-skill that creates new skills in v2 format when a recurring pattern (3+ occurrences) is not covered by existing skills. Requires approval.
---

# SKILL: create-skill | Priority: 7
Source: AutomatEasy internal — built for AutomatEasy agent suite

## IDENTITY
Create-Skill is the meta-skill for the AutomatEasy agent suite responsible for authoring new skills. It provides a standardized process for identifying when a new skill is needed, scaffolding it in the correct v2 format, and ensuring it is reviewed and approved before being added to the skill library.

## WHEN TO USE
Trigger this skill when:
- No existing skill adequately addresses a recurring problem or workflow
- A pattern has been observed across 3 or more sessions that would benefit from formalization
- The user explicitly requests creation of a new skill
- An existing skill needs to be split into more focused sub-skills

Do NOT trigger for:
- One-off tasks that are unlikely to recur
- Problems already covered by an existing skill (use or update that skill instead)
- Minor variations of existing skills (extend the existing skill rather than creating a new one)

## OPERATION MODES
### /quick
- Scaffold a minimal skill file with IDENTITY, WHEN TO USE, WHAT IT DOES, PROTOCOL, and PROHIBITED sections only. Mark it as draft.
### /standard (default)
- Create a complete v2-format skill file with all sections filled out. Present for approval before writing to disk.
### /deep
- Full v2 skill creation plus: research similar patterns in existing skills to avoid overlap, define integration points with all related skills, and include comprehensive failure modes and edge cases.

## WHAT IT DOES
Guides the creation of new skills following the v2 format standard. Ensures consistency across the skill library, prevents duplication, and enforces the approval gate so no unapproved skill enters the active skill directory.

## EMBEDDED KNOWLEDGE
- **V2 format**: Every skill must follow the standardized v2 template with these sections: IDENTITY, WHEN TO USE, OPERATION MODES (/quick, /standard, /deep), WHAT IT DOES, EMBEDDED KNOWLEDGE, DECISION TREE, STEP-BY-STEP PROTOCOL, INTERDEPENDENCIES, FAILURE MODES, OUTPUT CHECKLIST, PROHIBITED.
- **Priority scale**: 1 (low, rarely triggered) to 10 (critical, always active). Most skills fall between 5-8. Only universal skills (reflexion) or core domain skills (frontend-design) should be 9-10.
- **Naming convention**: Lowercase, hyphen-separated (e.g., `systematic-debugging`, `create-skill`). Name should clearly describe the skill's domain.
- **File location**: All skills live in `.claude/skills/[skill-name]/SKILL.md`.
- **Source attribution**: Use `AutomatEasy internal — built for AutomatEasy agent suite` for internally created skills.
- **Approval gate**: No skill may be added to the active directory without explicit user approval.

## DECISION TREE
IF no existing skill covers the identified pattern
  → Proceed with new skill creation
IF an existing skill partially covers it
  → Evaluate whether to extend the existing skill or create a new one; prefer extension
IF the pattern has occurred fewer than 3 times
  → Do NOT create a skill; note the pattern for future observation
IF the user explicitly requests a new skill
  → Proceed regardless of recurrence count, but note if the pattern is unproven
IF the proposed skill overlaps significantly with an existing skill
  → Merge into the existing skill or refactor both to eliminate overlap

## STEP-BY-STEP PROTOCOL
1. Identify the recurring pattern or unmet need that justifies a new skill.
2. Check all existing skills to confirm no overlap or duplication.
3. Define the skill name, priority, and core purpose in one sentence.
4. Draft the full v2-format SKILL.md with all required sections.
5. Map interdependencies: which skills should run before/after the new one.
6. Review the draft for completeness and consistency with existing skills.
7. Present the draft to the user for approval.
8. Only after explicit approval, write the file to `.claude/skills/[skill-name]/SKILL.md`.
9. Verify the file was written correctly and is discoverable by the agent.

## INTERDEPENDENCIES
Run BEFORE:
- N/A (this skill produces artifacts, not code)
Run AFTER:
- reflexion (verify the skill draft quality before presenting to user)

## FAILURE MODES
| Failure | Detection | Fix |
|---|---|---|
| New skill duplicates existing one | Review reveals significant overlap with another skill | Merge into existing skill or refactor to eliminate overlap |
| Skill created for one-off pattern | Pattern has not recurred across 3+ sessions | Archive or delete the skill; note the pattern for future monitoring |
| Missing v2 sections | Skill file does not include all required template sections | Add missing sections before approval |
| Skill added without approval | File written to skills directory without user confirmation | Remove the file; re-present for approval |
| Priority incorrectly assigned | Skill triggers too often or too rarely relative to its importance | Adjust priority based on observed usage |

## OUTPUT CHECKLIST
- [ ] Skill name follows lowercase-hyphen convention
- [ ] Priority is justified (1-10 scale)
- [ ] All v2 template sections are present and filled
- [ ] No significant overlap with existing skills
- [ ] Interdependencies are mapped
- [ ] User has explicitly approved the skill
- [ ] File is written to correct location: `.claude/skills/[name]/SKILL.md`

## PROHIBITED
- NEVER add a skill to the active directory without explicit user approval
- NEVER create a skill for a pattern observed fewer than 3 times (unless user explicitly requests it)
- NEVER duplicate functionality already covered by an existing skill
- NEVER deviate from the v2 format template
- NEVER assign Priority 10 without strong justification
