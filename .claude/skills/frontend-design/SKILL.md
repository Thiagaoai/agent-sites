---
name: frontend-design
description: Bold, typography-first UI design for landing pages, components, animations, and interface reviews. Stack HTML + Tailwind, React, Next.js.
---

# SKILL: frontend-design | Priority: 10
Source: AutomatEasy internal — built for AutomatEasy agent suite

## IDENTITY
Frontend Design is the primary visual creation skill for the AutomatEasy agent suite. It drives bold, typography-first, purposeful UI design across landing pages, visual components, animations, and interface reviews. Every output must feel hand-crafted and never look AI-generated.

## WHEN TO USE
Trigger this skill when:
- Building or editing landing pages
- Creating or refining visual components (buttons, cards, modals, navbars, etc.)
- Adding or reviewing animations and micro-interactions
- Performing UI/UX review of any interface
- Prototyping or implementing any user-facing screen

Do NOT trigger for:
- Backend-only logic with no visual component
- CLI tools or scripts with no UI
- Database schema or API-only work
- DevOps / infrastructure tasks

## OPERATION MODES
### /quick
- Rapid component scaffolding with Tailwind utility classes; minimal animation; focus on layout and typography only.
### /standard (default)
- Full-featured design implementation: bold typography, intentional color palette, smooth animations, responsive layout, and at least one delightful surprise element per interface.
### /deep
- Pixel-perfect design with advanced animations (Framer Motion / CSS keyframes), accessibility audit (WCAG AA), performance review (CLS, LCP), dark-mode support, and cross-browser testing notes.

## WHAT IT DOES
Produces bold, opinionated, high-quality frontend code that prioritizes:
1. **Typography hierarchy** — type scale, weight contrast, and whitespace drive the design.
2. **Purposeful animation** — every transition communicates meaning; no gratuitous motion.
3. **Surprise element** — each interface includes at least one detail that delights the user.
4. **Human feel** — output must never look templated or AI-generated.

## EMBEDDED KNOWLEDGE
- **Stack**: HTML + Tailwind CSS, React, Next.js (App Router preferred).
- **Typography**: Use a clear type scale (e.g., Major Third 1.25). Pair a display font with a body font. Leverage font-weight contrast (300 vs 700+).
- **Color**: Limit palette to 1 primary + 1 accent + neutrals. Use opacity and tints for depth.
- **Animation principles**: Ease-out for entrances, ease-in for exits, 200-400ms for UI transitions, spring physics for playful elements.
- **Responsive**: Mobile-first breakpoints (sm 640, md 768, lg 1024, xl 1280).
- **Accessibility**: Minimum contrast ratio 4.5:1 for text, focus-visible outlines, semantic HTML.

## DECISION TREE
IF request is a landing page
  → Use full-width sections, hero with bold headline, clear CTA, social proof block
IF request is a component
  → Build isolated, reusable component with props; include hover/focus/active states
IF request is an animation
  → Define trigger, duration, easing; prefer CSS transitions; use JS animation libraries only when CSS is insufficient
IF request is a UI review
  → Audit typography, spacing, color consistency, responsiveness, and accessibility; provide ranked list of issues

## STEP-BY-STEP PROTOCOL
1. Clarify the goal: what screen, component, or interaction is being built or reviewed.
2. Choose typography and color palette before writing any markup.
3. Scaffold the layout with semantic HTML and Tailwind utility classes.
4. Apply typography hierarchy (headings, body, captions) with clear contrast.
5. Add color, backgrounds, and depth (shadows, borders, gradients).
6. Implement animations and micro-interactions with purpose.
7. Verify the "surprise element" — at least one delightful detail must exist.
8. Test responsiveness across breakpoints (mobile, tablet, desktop).
9. Run a quick accessibility pass (contrast, focus, alt text, semantic tags).
10. Deliver clean, well-structured code with brief inline comments where intent is non-obvious.

## INTERDEPENDENCIES
Run BEFORE:
- ui-ux-pro-max-skill (UX validation gate)
- security (review before deploy)
- reflexion (self-check output quality)
Run AFTER:
- landing-page-advanced (if premium effects were applied)
- N/A otherwise (this skill is typically the starting point for UI work)

## FAILURE MODES
| Failure | Detection | Fix |
|---|---|---|
| Output looks generic / AI-generated | Visual inspection feels templated | Add asymmetry, unique typography pairing, or an unexpected layout element |
| No surprise element | Checklist review finds nothing delightful | Add a micro-interaction, illustration accent, or creative hover state |
| Poor responsiveness | Component breaks below 640px | Refactor with mobile-first Tailwind classes |
| Accessibility violation | Contrast checker or axe audit flags issues | Adjust colors to meet WCAG AA; add missing aria attributes |
| Animation feels gratuitous | Motion has no clear purpose | Remove or tie animation to a user action or state change |

## OUTPUT CHECKLIST
- [ ] Typography hierarchy is clear and intentional
- [ ] Color palette is limited and consistent
- [ ] At least one surprise / delight element exists
- [ ] Responsive across mobile, tablet, desktop
- [ ] Animations are purposeful, not decorative
- [ ] Semantic HTML used correctly
- [ ] Accessibility basics met (contrast, focus, alt text)
- [ ] Code is clean and well-structured
- [ ] Does NOT look AI-generated

## PROHIBITED
- NEVER use default/unstyled browser elements without intentional design
- NEVER add animation without a clear purpose
- NEVER deliver output that looks like a generic template
- NEVER ignore mobile responsiveness
- NEVER use inline styles when Tailwind classes are available
- NEVER skip the surprise element requirement
