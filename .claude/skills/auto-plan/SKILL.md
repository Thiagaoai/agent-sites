---
name: auto-plan
description: Mandatory planning protocol before any non-trivial execution. Forces understanding inputs, analyzing references, defining approach, and aligning with user before writing code.
---

# SKILL: auto-plan | Priority: 10
Source: AutomatEasy internal — built for AutomatEasy agent suite

## IDENTITY
Mandatory planning gate for the AutomatEasy agent suite. Prevents premature execution by forcing a structured analysis-plan-align cycle before any code is written. Acts as a circuit breaker against the most common failure mode: jumping to code before understanding the problem.

## WHEN TO USE
Trigger this skill when:
- Starting ANY non-trivial task (3+ files, visual work, architecture changes)
- User provides references, screenshots, links, or source code as context
- Task involves redesign, refactoring, or building something new
- Multiple approaches are possible and the wrong choice wastes significant time
- Previous attempt at the same task failed or received negative feedback

Do NOT trigger for:
- Single-file bug fixes with obvious cause
- Adding a comment or renaming a variable
- Running a command the user explicitly requested
- Answering a question (no execution involved)

## OPERATION MODES
### /quick
- 30-second mental check: what was asked → what do I know → what's my plan. No output to user unless uncertain.
### /standard (default)
- Full 4-phase protocol. Present plan to user before executing.
### /deep
- Full protocol plus: research phase (deep-search for references), risk analysis, fallback strategies, and explicit success criteria.

## WHAT IT DOES
Enforces a 4-phase cycle (Absorb → Analyze → Plan → Align) before any execution begins. The output is a concrete execution plan that the user can approve, modify, or reject. This prevents wasted cycles, misunderstood requirements, and generic output.

## EMBEDDED KNOWLEDGE

### Phase 1: ABSORB — Consume Every Input
Before anything else, fully process ALL inputs the user has provided:
- **Screenshots**: Describe what you see in detail. Colors, spacing, typography, layout, mood.
- **Links/URLs**: Fetch and read the content. Extract relevant patterns.
- **Source code**: Read every line. Extract design tokens, component patterns, class names, structure.
- **Text instructions**: Parse for explicit requirements AND implicit expectations.
- **Conversation history**: What feedback has the user given before? What was rejected?

**Rule**: If the user provided it, you MUST acknowledge and use it. Ignoring user inputs is the #1 cause of failed tasks.

### Phase 2: ANALYZE — Extract Actionable Patterns
Transform raw inputs into concrete, reusable patterns:
- **Design tokens**: exact colors (hex), spacing values (px/rem), border-radius, opacity, shadows
- **Typography**: font families, sizes, weights, line-heights, letter-spacing
- **Component patterns**: card styles, button styles, layout grids, navigation patterns
- **Interaction patterns**: hover states, transitions, animations
- **Content patterns**: copy tone, label format, hierarchy

**Output format**: A structured list of extracted patterns, not prose.

### Phase 3: PLAN — Define Execution Steps
Create a concrete plan with:
- **Files to modify**: exact paths, in execution order
- **What changes in each file**: specific, not vague ("change glass opacity from 0.03 to 0.06", not "improve glass effect")
- **Dependencies**: which files must be changed before others
- **Risk areas**: what could break, what needs testing
- **Success criteria**: how to know the task is done correctly

### Phase 4: ALIGN — Get User Approval
Present the plan to the user in a clear, scannable format:
```
PLAN — [Task Name]
Based on: [list of inputs analyzed]

TOKENS EXTRACTED:
- [token]: [value]

FILES (in order):
1. [path] — [what changes]
2. [path] — [what changes]

RISKS:
- [risk and mitigation]

READY TO EXECUTE?
```

Only proceed after user says yes. If user modifies the plan, update and re-present.

## DECISION TREE
IF user provides references (screenshots, code, links)
  → Phase 1 is MANDATORY and must explicitly reference each input
IF task is purely visual
  → Combine with visual-workflow skill after planning
IF task is a repeat attempt (previous try failed)
  → Phase 2 must include: "what went wrong last time and why"
IF user says "just do it" or "execute without asking"
  → Run /quick mode: plan internally, execute, but still follow the phases mentally
IF plan has more than 10 files
  → Break into batches of 3-5 files, execute and validate each batch

## STEP-BY-STEP PROTOCOL
1. STOP before writing any code.
2. List all inputs the user has provided (screenshots, code, links, text).
3. Read/fetch/analyze every single input.
4. Extract concrete patterns and tokens from the analysis.
5. Draft execution plan with files, changes, order, and risks.
6. Present plan to user for approval.
7. Only after approval, begin execution.
8. If user rejects or modifies, update plan and re-present.

## INTERDEPENDENCIES
Run BEFORE:
- ALL other skills (this is the universal entry point)
- visual-workflow, frontend-design, landing-page-advanced, creative-director-skill
Run AFTER:
- Nothing (this is always first)

## FAILURE MODES
| Failure | Detection | Fix |
|---|---|---|
| Skipped planning, jumped to code | First action is Edit/Write without a plan | Stop. Rewind. Run auto-plan from Phase 1 |
| Ignored user inputs | User provided references that weren't mentioned in the plan | Re-read all inputs, extract patterns, update plan |
| Plan too vague | Plan says "improve" or "make better" without specifics | Replace every vague term with a concrete value or action |
| Plan too large | More than 10 files in a single batch | Split into batches of 3-5 files with validation between |
| User feedback ignored | User corrected something and agent repeated the mistake | Check conversation history for ALL corrections before planning |
| Subagent delegation without direction | Dispatched subagents with vague instructions | Subagent prompts must include: exact files, exact tokens, exact patterns |

## OUTPUT CHECKLIST
- [ ] Every user input (screenshot, code, link, text) was explicitly analyzed
- [ ] Concrete tokens/patterns were extracted (not vague descriptions)
- [ ] Execution plan lists specific files with specific changes
- [ ] Files are ordered by dependency
- [ ] Risks are identified
- [ ] Plan was presented to user before execution
- [ ] User approved (or plan was modified per feedback)

## AUTOMATIC TRIGGER
This skill is NOT optional. It must be treated as an automatic behavior:
- Before ANY Edit/Write tool call on a non-trivial task, mentally run at least /quick
- If the user provided ANY visual reference (screenshot, link, HTML), /standard is MANDATORY
- If a previous attempt was rejected, /deep is MANDATORY
- The agent's FIRST response to a non-trivial task must NEVER be a tool call — it must be analysis

### How to enforce without hooks
The agent must self-check: "Am I about to write code? Have I completed auto-plan?" If the answer is no, STOP and run auto-plan first. This check happens before every Edit, Write, or Agent tool call.

## EXAMPLE OUTPUT

```
PLAN — Life OS Dashboard Redesign
Based on: Dev de Oferta HTML (user-provided), Adsly screenshot, user feedback ("design é amador")

TOKENS EXTRACTED FROM REFERENCES:
- Card bg: bg-white/[0.03] + noise-overlay texture
- Card border: border border-white/10 (NOT border-white/6 — more visible)
- Card radius: rounded-[2rem] to rounded-[2.5rem]
- Label pattern: font-mono text-[10px] uppercase tracking-[0.2em] text-white/40
- Accent: indigo-500 (#6366f1) as primary, with glow-sphere bg effects
- Typography: heading font-light tracking-[-0.06em] for large text
- Spacing: px-6 py-5 (mobile), px-10 (desktop)

FILES (in order):
1. globals.css — update .glass border to white/10, add .noise-overlay, add .mono-label
2. page.tsx — add glow-sphere backgrounds, update header typography
3. kpi-cards.tsx — apply card tokens: rounded-2xl, border-white/10, mono-label for labels
4. category-chart.tsx — same card tokens, noise-overlay
5. monthly-chart.tsx — same card tokens
6. transaction-list.tsx — apply row styling from reference
7. tab-navigation.tsx — glass-strong with rounded-2xl

RISKS:
- Noise overlay SVG might impact performance on low-end mobile
- Glass backdrop-filter can be laggy on older Android

READY TO EXECUTE?
```

## PROHIBITED
- NEVER write code before completing at least /quick planning
- NEVER ignore user-provided references, screenshots, or source code
- NEVER dispatch subagents with vague instructions like "make it premium" or "redesign to look good"
- NEVER present a plan with vague actions ("improve X", "enhance Y") — every action must be concrete
- NEVER skip Phase 1 (Absorb) — this is the most critical phase
- NEVER continue after user rejection without modifying the plan
