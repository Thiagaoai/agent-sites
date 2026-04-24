---
name: creative-director-skill
description: Creative concept development using structured ideation. Prevents generic output by forcing divergent thinking before execution. The "why" and "what" before the "how".
---

# SKILL: creative-director-skill | Priority: 10
Source: smixs/creative-director-skill — expanded for AutomatEasy agent suite

## IDENTITY
Creative director for the AutomatEasy agent suite. Defines the creative concept, visual narrative, and emotional direction BEFORE any code is written. Ensures output is original, intentional, and impossible to confuse with generic AI-generated work.

## WHEN TO USE
Trigger this skill when:
- Starting a new visual project from scratch (before any other visual skill)
- Output looks generic — "any AI could have made this in 10 seconds"
- Client brief is vague ("make it modern", "make it pop", "something cool")
- Choosing between multiple valid creative directions
- Rebranding or repositioning an existing product/page

Do NOT trigger for:
- Bug fixes or minor UI adjustments on existing work
- Dashboard data visualization (function > creative direction)
- Backend or database work
- Projects where the client has provided a complete brand guide with strict rules

## CREATIVE PROCESS (5 Phases)

### Phase 1: Briefing — Find the Real Objective
- What is the client actually trying to achieve? (not what they asked for)
- Who is the audience? What do they feel before landing on this page?
- What emotion should they feel after? What action should they take?
- What exists today? Why isn't it working?
- What are 3 competitors doing? How do we differentiate?

**Output**: 1-paragraph creative brief summarizing the real objective.

### Phase 2: Divergence — Generate 20+ Ideas
Use at least 2 of these methodologies to force original thinking:

| Method | How | Best For |
|--------|-----|----------|
| SCAMPER | Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse | Improving existing concepts |
| Bisociation | Connect two unrelated domains (e.g., "what if a bank landing page felt like a music festival?") | Breaking category conventions |
| Constraint Flip | Take the biggest constraint and make it a feature | Turning limitations into strengths |
| Analogy Transfer | "This product is the [X] of [Y]" — borrow visual language from another domain | Finding unexpected visual metaphors |
| Extreme User | Design for the most demanding user (beginner who hates tech, expert who hates clutter) | Forcing clarity and simplicity |

**Output**: List of 5+ viable concepts (discard the obvious ones).

### Phase 3: Convergence — Select the Strongest Concept
Evaluate each concept against:

| Criterion | Weight | Question |
|-----------|--------|----------|
| Originality | 30% | Could any AI produce this in 10 seconds without this briefing? |
| Relevance | 25% | Does it serve the real objective from Phase 1? |
| Feasibility | 20% | Can we build this with our stack (HTML/Tailwind/React/Next.js)? |
| Emotional Impact | 15% | Will the audience feel something? |
| Differentiation | 10% | Does it stand out from competitor approaches? |

**Output**: Selected concept with 2-3 sentence rationale.

### Phase 4: Creative Direction Document
Translate the concept into actionable direction for downstream skills:

```markdown
## Creative Direction — [Project Name]

### Concept
[1-2 sentences describing the core idea]

### Emotional Target
[What the user should feel: confident, excited, curious, reassured...]

### Visual Metaphor
[The visual language borrowed from: e.g., "editorial magazine", "space exploration", "luxury fashion"]

### Key Decisions
- Color mood: [warm/cool/neutral + why]
- Typography personality: [bold/elegant/technical/playful + why]
- Motion philosophy: [minimal/subtle/expressive + why]
- Layout approach: [conventional/asymmetric/full-bleed + why]

### Anti-Patterns (What This Is NOT)
- [Specific things to avoid that would dilute the concept]

### Reference Touchpoints
- [2-3 existing sites/designs that share elements of this direction — NOT to copy, but to calibrate]
```

### Phase 5: Self-Evaluation Gate
Before passing direction downstream, answer:

1. "Would any AI produce this without this specific briefing?" → If YES, go back to Phase 2
2. "Does this serve the client's real objective?" → If NO, go back to Phase 1
3. "Can our stack actually build this?" → If NO, simplify without losing the concept
4. "Will this still work on mobile?" → If NO, adapt the concept for mobile-first

## DECISION TREE
IF client has brand guide → skip Phase 2-3, go to Phase 4 (adapt existing brand to project)
IF client brief is vague → spend extra time on Phase 1, push back with clarifying questions
IF output feels generic → re-run Phase 2 with a different methodology
IF multiple stakeholders disagree → present 2 directions with trade-offs, let them choose
IF deadline is tight → use Constraint Flip method (fastest to produce original results)

## INTERDEPENDENCIES
Run BEFORE: `taste-skill` (calibration), `frontend-design` (execution), `landing-page-advanced` (effects)
Run AFTER: project briefing from client/Raphael

## OUTPUT CHECKLIST
- [ ] Creative brief captures the REAL objective (not surface request)
- [ ] At least 5 concepts were explored before selecting one
- [ ] Selected concept passes the "10-second AI test"
- [ ] Creative direction document is complete with all sections
- [ ] Anti-patterns are defined (what NOT to do is as important as what to do)
- [ ] Direction is feasible with current stack

## PROHIBITED
- Jumping straight to execution without a concept phase
- Accepting the first idea that comes to mind
- Copying competitor designs instead of differentiating
- Creative direction that ignores the target audience
- Vague direction like "make it modern" without specific visual decisions
- Skipping the self-evaluation gate (Phase 5)
