---
name: visual-workflow
description: End-to-end pipeline for visual/design tasks. Enforces research → direction → tokens → execution → screenshot → validation cycle. Prevents blind coding.
---

# SKILL: visual-workflow | Priority: 9
Source: AutomatEasy internal — built for AutomatEasy agent suite

## IDENTITY
Visual execution pipeline for the AutomatEasy agent suite. Orchestrates the complete flow from research to validated output for any visual task. Ensures every design decision is informed by references, calibrated by taste, and validated by screenshots — never by guesswork.

## WHEN TO USE
Trigger this skill when:
- Building or redesigning any user-facing interface
- Creating a design system, theme, or set of visual tokens
- User says the output "looks generic", "ugly", "amateur", or "didn't change"
- Starting a new visual project after auto-plan has completed
- Any task involving CSS, component styling, layout, or visual identity

Do NOT trigger for:
- Backend-only work (APIs, database, auth logic)
- Bug fixes that don't affect visual output
- Content-only changes (text, copy, data)

## OPERATION MODES
### /quick
- Skip research phase. Use existing references or user-provided inputs. Go straight to tokens → execute → screenshot.
### /standard (default)
- Full 6-phase pipeline. Research → Direction → Tokens → Execute → Screenshot → Validate.
### /deep
- Full pipeline plus: multiple reference boards, A/B token options presented to user, screenshot at every component level, comparative before/after analysis.

## WHAT IT DOES
Orchestrates 6 phases that transform a vague visual request into validated, high-quality output. Each phase produces a concrete artifact that feeds the next phase. No phase can be skipped in /standard or /deep mode.

## THE 6 PHASES

### Phase 1: RESEARCH — Find Real-World References
**Input**: Project context, user brief, existing brand
**Tools**: deep-search skill, web search, user-provided references
**Actions**:
- Search for 3-5 real-world references matching the project's domain and quality level
- If user provided references (screenshots, links, code), analyze those FIRST — they are the primary source of truth
- Extract what makes each reference work: specific colors, spacing ratios, typography choices, interaction patterns
**Output**: Reference board with extracted patterns

### Phase 2: DIRECTION — Define Creative Concept
**Input**: Reference board from Phase 1
**Tools**: creative-director-skill, taste-skill
**Actions**:
- Run creative-director-skill to define the visual narrative and emotional direction
- Run taste-skill to calibrate: Variance (1-4), Motion (1-4), Density (1-4)
- Define the "personality" in one sentence: "This interface should feel like ___"
**Output**: Creative direction document with taste profile

### Phase 3: TOKENS — Build the Design System
**Input**: Creative direction from Phase 2
**Actions**:
- Define exact CSS variables / design tokens:
  - Colors: background, surface, text (3 levels), accent, success, error, warning
  - Spacing: base unit, scale (e.g., 4px base, 4/8/12/16/24/32/48)
  - Typography: font stack, size scale (xs through 4xl), weight scale, line-height scale
  - Borders: radius scale, border colors, border widths
  - Shadows: elevation scale (subtle, medium, strong)
  - Effects: blur values, opacity values, transition durations
- Define component patterns:
  - Card: background, border, radius, padding, shadow
  - Button: variants (primary, secondary, ghost), sizes, states
  - Input: background, border, focus state
  - Badge: variants, sizes
  - Navigation: active/inactive states, indicator style
**Output**: Token file (CSS variables or design-tokens object) ready to apply

### Phase 4: EXECUTE — Write the Code
**Input**: Token file from Phase 3
**Actions**:
- Apply tokens to globals.css / theme file first
- Update components in dependency order (layout → containers → content)
- Each component change must reference a specific token, not a magic value
- Maximum 5 files per batch; validate between batches
- If using subagents, each subagent prompt must include: the full token list, exact files to modify, exact patterns to apply
**Output**: Modified source files

### Phase 5: SCREENSHOT — See the Result
**Input**: Running dev server
**Tools**: Playwright screenshot script
**Actions**:
- Take screenshots of every modified view/state:
  - Full page (mobile width: 375px)
  - Key components in isolation if possible
  - Different states: loading, empty, populated, error
- Read each screenshot using the Read tool (multimodal)
- Compare against the creative direction from Phase 2
**Output**: Screenshot files + visual assessment

### Phase 6: VALIDATE — Self-Evaluate and Iterate
**Input**: Screenshots from Phase 5, creative direction from Phase 2
**Tools**: reflexion skill
**Actions**:
- Run reflexion skill on the visual output
- Check against taste-skill calibration: does Variance/Motion/Density match?
- Check against reference board: does quality level match?
- Score the output 1-10 on: typography hierarchy, color harmony, spacing consistency, component density, overall premium feel
- If score < 8: identify specific issues, return to Phase 4 with fixes
- If score >= 8: present to user with before/after comparison
**Output**: Score card + issues list (if any) + recommendation

## DECISION TREE
IF user provided visual references
  → Phase 1 primarily analyzes those references (not generic web search)
IF output scored < 8 in Phase 6
  → Return to Phase 4, fix identified issues, re-screenshot, re-validate
IF this is a redesign (existing UI)
  → Take "before" screenshot in Phase 1, show before/after in Phase 6
IF task involves only 1-2 components
  → Use /quick mode (skip Phase 1-2, use existing direction)
IF subagents are used in Phase 4
  → Each subagent receives: full token list + exact file list + specific patterns
  → Never "make it premium" — always "apply these exact values"

## STEP-BY-STEP PROTOCOL
1. Confirm auto-plan has run (if not, run it first).
2. Phase 1: Research references (or analyze user-provided ones).
3. Phase 2: Define creative direction + taste profile.
4. Phase 3: Build design tokens (concrete values, not descriptions).
5. Phase 4: Apply tokens to code, max 5 files per batch.
6. Phase 5: Take screenshots with Playwright.
7. Phase 6: Score and validate against direction.
8. If score < 8, iterate from Phase 4.
9. Present final result to user.

## INTERDEPENDENCIES
Run BEFORE:
- frontend-design, landing-page-advanced (this orchestrates them)
Run AFTER:
- auto-plan (always plan first)
Integrates:
- deep-search (Phase 1)
- creative-director-skill (Phase 2)
- taste-skill (Phase 2)
- reflexion (Phase 6)

## FAILURE MODES
| Failure | Detection | Fix |
|---|---|---|
| Skipped research, went straight to code | No reference board exists | Stop. Run Phase 1 before continuing |
| Tokens are vague ("subtle", "premium") | Token file has adjectives instead of values | Replace every adjective with a hex/px/rem value |
| Subagents produced generic output | Visual result unchanged or looks AI-generated | Re-dispatch with exact token values, not descriptions |
| No screenshot taken | Can't verify visual result | Take screenshot before presenting to user |
| Score < 8 but presented anyway | User rejects the output | Return to Phase 4, fix issues, iterate |
| Tokens not applied consistently | Component A uses one style, Component B uses another | Audit all components against token file |

## OUTPUT CHECKLIST
- [ ] Reference board created (Phase 1)
- [ ] Creative direction defined with taste profile (Phase 2)
- [ ] Token file with concrete values created (Phase 3)
- [ ] All components use tokens, not magic values (Phase 4)
- [ ] Screenshots taken of all modified views (Phase 5)
- [ ] Score >= 8 on visual assessment (Phase 6)
- [ ] Before/after comparison available (if redesign)

## SCREENSHOT INTEGRATION
The screenshot tool lives at `c:/Claude/dev/screenshot.js`.

### Commands
```bash
# Basic screenshot (mobile, auth screen)
node c:/Claude/dev/screenshot.js http://localhost:3000 screenshot.png 375

# With auth bypass (set localStorage before navigating)
node c:/Claude/dev/screenshot.js http://localhost:3000 screenshot.png 375 --bypass-auth

# Desktop width
node c:/Claude/dev/screenshot.js http://localhost:3000 screenshot-desktop.png 1280
```

### Reading screenshots
After taking a screenshot, ALWAYS read it with the Read tool:
```
Read tool → file_path: "c:/Claude/dev/screenshot.png"
```
This gives the agent visual feedback on the result.

### When to screenshot
- After completing each batch of 3-5 files in Phase 4
- Before presenting final result in Phase 6
- When comparing before/after in a redesign

## EXAMPLE TOKEN OUTPUT (Phase 3)

```css
/* === DESIGN TOKENS — Life OS Dashboard === */
/* Extracted from: Dev de Oferta reference */

/* Surfaces */
--surface-base: #0a0b14;
--surface-card: rgba(255, 255, 255, 0.03);
--surface-card-hover: rgba(255, 255, 255, 0.05);
--surface-elevated: rgba(255, 255, 255, 0.07);

/* Borders */
--border-subtle: rgba(255, 255, 255, 0.06);
--border-visible: rgba(255, 255, 255, 0.10);
--border-strong: rgba(255, 255, 255, 0.15);

/* Text */
--text-primary: #f0f0f5;
--text-secondary: rgba(255, 255, 255, 0.60);
--text-muted: rgba(255, 255, 255, 0.30);
--text-label: rgba(255, 255, 255, 0.40);

/* Accent */
--accent-primary: #6366f1;
--accent-glow: rgba(99, 102, 241, 0.25);
--accent-surface: rgba(99, 102, 241, 0.08);

/* Semantic */
--color-success: #22c55e;
--color-error: #ef4444;
--color-warning: #f59e0b;

/* Spacing */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;

/* Radius */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-2xl: 32px;

/* Typography */
--font-heading: var(--font-sans); /* or Space Grotesk if available */
--font-body: var(--font-sans);
--font-mono: var(--font-geist-mono);
--text-xs: 10px;
--text-sm: 13px;
--text-base: 15px;
--text-lg: 18px;
--text-xl: 24px;
--text-2xl: 32px;

/* Effects */
--blur-sm: 8px;
--blur-md: 12px;
--blur-lg: 20px;
--shadow-glow-sm: 0 0 15px -3px var(--accent-glow);
--shadow-glow-lg: 0 0 30px -5px var(--accent-glow);
```

### Example Component Pattern (Card)
```css
.card-premium {
  background: var(--surface-card);
  backdrop-filter: blur(var(--blur-md));
  border: 1px solid var(--border-visible);
  border-radius: var(--radius-xl);
  padding: var(--space-lg);
  position: relative;
  overflow: hidden;
}

/* Noise texture overlay */
.card-premium::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.015;
  background-image: url("data:image/svg+xml,...noise-svg...");
  pointer-events: none;
}
```

### Example Label Pattern
```html
<span class="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
  Receitas
</span>
```

## PROHIBITED
- NEVER skip directly to code without at least defining tokens
- NEVER use adjectives as design values ("make it subtle", "add some glow")
- NEVER dispatch subagents without the complete token list
- NEVER present visual output without taking a screenshot first
- NEVER accept a score < 8 as final output
- NEVER reuse tokens from a previous project without re-calibrating for the current one
