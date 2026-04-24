---
name: ui-ux-pro-max-skill
description: UX validation and design system audit. Reviews interfaces for usability, accessibility, consistency, and visual hierarchy before delivery.
---

# SKILL: ui-ux-pro-max-skill | Priority: 10
Source: nextlevelbuilder/ui-ux-pro-max-skill — expanded for AutomatEasy agent suite

## IDENTITY
UX validation and design system auditor. While `frontend-design` creates interfaces, this skill reviews and validates them. It ensures every delivered screen meets usability, accessibility, and visual consistency standards.

## WHEN TO USE
Trigger this skill when:
- Reviewing any interface before delivery (mandatory gate)
- Validating design consistency across multiple pages/components
- Auditing usability of forms, flows, and navigation
- Checking visual hierarchy and information architecture
- Client says "something feels off" but can't articulate what

Do NOT trigger for:
- Initial creation of interfaces (→ `frontend-design`)
- Animation/effect implementation (→ `landing-page-advanced`)
- CRO structure decisions (→ `landing-page-specialist`)

## OPERATION MODES
### /quick — Pre-delivery spot check
Run the 5-point checklist below. Flag issues, no deep analysis.

### /standard (default) — Full UX audit
Run all 4 audit dimensions. Produce ranked issue list with severity.

### /deep — Design system review
Full audit + cross-page consistency check + design token validation + accessibility audit (axe-core level).

## AUDIT DIMENSIONS

### 1. Visual Hierarchy
- [ ] Clear focal point on every viewport (what should the eye see first?)
- [ ] Typography hierarchy is intentional (H1 > H2 > body clearly distinguishable)
- [ ] Color palette is limited and consistent (1 primary + 1 accent + neutrals)
- [ ] Whitespace creates breathing room, not emptiness
- [ ] Contrast ratio meets WCAG AA minimum (4.5:1 text, 3:1 large text)

### 2. Usability
- [ ] Primary action is obvious within 3 seconds
- [ ] Navigation is intuitive (user knows where they are and where to go)
- [ ] Forms have clear labels, validation feedback, and minimal fields
- [ ] Interactive elements have visible hover/focus/active states
- [ ] Touch targets are minimum 44x44px on mobile
- [ ] Loading states exist for async operations

### 3. Consistency
- [ ] Spacing follows a consistent scale (4px/8px grid)
- [ ] Same component looks the same everywhere (buttons, cards, inputs)
- [ ] Icons are from the same family/style
- [ ] Border radius is consistent across components
- [ ] Color usage is semantically consistent (same color = same meaning)

### 4. Accessibility
- [ ] Semantic HTML used correctly (headings, landmarks, lists)
- [ ] All images have meaningful alt text (or alt="" if decorative)
- [ ] Focus order is logical (tab through the page)
- [ ] Focus-visible outlines are present and styled
- [ ] Color is not the only indicator of state (add icons/text)
- [ ] `prefers-reduced-motion` respected for animations
- [ ] `prefers-color-scheme` supported if dark/light modes exist

## DECISION TREE
IF issue is visual hierarchy → fix in `frontend-design`
IF issue is usability/flow → fix in component code, coordinate with `crm-specialist` for form backends
IF issue is consistency → create or update design tokens, fix across all instances
IF issue is accessibility → fix immediately, this is non-negotiable
IF issue is "feels generic" → escalate to `taste-skill` for calibration

## SEVERITY SCALE
| Level | Label | Action |
|-------|-------|--------|
| P0 | Blocker | Cannot deliver. Fix before any review. |
| P1 | Critical | Breaks usability or accessibility. Fix before delivery. |
| P2 | Major | Noticeable quality gap. Fix in current sprint. |
| P3 | Minor | Polish item. Fix if time allows. |

## OUTPUT FORMAT
```markdown
## UX Audit — [Page/Component Name]
Date: YYYY-MM-DD | Mode: quick/standard/deep

### Issues Found
1. [P1] **Description** — dimension (visual/usability/consistency/a11y)
   Fix: specific action to resolve
2. [P2] **Description** — dimension
   Fix: specific action to resolve

### Passed
- [x] Item that passed validation

### Recommendation
Next action to take.
```

## INTERDEPENDENCIES
Run AFTER: `frontend-design`, `landing-page-advanced`
Run BEFORE: `web-design-guidelines`, `security`, delivery

## PROHIBITED
- Delivering any interface without running at least /quick mode
- Ignoring accessibility issues regardless of deadline
- Approving an interface that fails more than 2 items in any single dimension
- Subjective feedback without specific, actionable fix recommendations
