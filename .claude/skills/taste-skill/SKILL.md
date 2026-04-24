---
name: taste-skill
description: Design calibration skill. Tunes variance, motion intensity, and visual density per project/client. Prevents generic "middle-of-the-road" output.
---

# SKILL: taste-skill | Priority: 8
Source: Leonxlnx/taste-skill — expanded for AutomatEasy agent suite

## IDENTITY
Design taste calibrator. Ensures every project has a deliberate visual personality instead of defaulting to safe, generic output. Reads the client/project context and outputs a calibration profile that guides all downstream visual skills.

## WHEN TO USE
Trigger this skill when:
- Starting any new visual project (before `frontend-design` or `landing-page-advanced`)
- Client asks for something "premium", "modern", "bold", "clean", or "different"
- Output looks correct but feels soulless — technically right, emotionally flat
- Choosing between composition patterns in `landing-page-advanced`
- Multiple visual skills disagree on direction

Do NOT trigger for:
- Backend-only work with no visual output
- Bug fixes on existing interfaces (preserve existing calibration)
- Data-heavy dashboards where function > form

## 3 CALIBRATION DIMENSIONS

### 1. Design Variance
How far from conventional the design should go.

| Level | Value | Characteristics | When to use |
|-------|-------|----------------|-------------|
| 1 | Conservative | Standard layouts, expected patterns, safe typography | Corporate, healthcare, government, traditional industries |
| 2 | Moderate | Slight asymmetry, one unexpected element, refined palette | Most B2B SaaS, professional services, e-commerce |
| 3 | Bold | Oversized typography, unconventional layout, strong visual identity | Agencies, tech startups, creative brands |
| 4 | Experimental | Breaking grid, mixed media, artistic expression | Art, fashion, portfolio, brand statement pages |

### 2. Motion Intensity
How much animation and movement the interface should have.

| Level | Value | Characteristics | When to use |
|-------|-------|----------------|-------------|
| 1 | Minimal | Hover states only, no scroll animations | Content-heavy sites, accessibility-first, slow connections |
| 2 | Subtle | Fade-in on scroll, smooth transitions, micro-interactions on CTA | Most projects — safe default |
| 3 | Expressive | Scroll-triggered reveals, parallax, kinetic typography | Premium landing pages, product launches, portfolios |
| 4 | Cinematic | Full GSAP sequences, cursor effects, animated backgrounds | Hero-only on high-impact pages, never full-site |

### 3. Visual Density
How much content and visual elements per viewport.

| Level | Value | Characteristics | When to use |
|-------|-------|----------------|-------------|
| 1 | Spacious | Large whitespace, one element per viewport, breathing room | Luxury, premium, minimal brands |
| 2 | Balanced | Clear sections, comfortable spacing, 2-3 elements per viewport | Most projects — safe default |
| 3 | Rich | Multiple elements visible, cards, grids, supporting visuals | Dashboards, feature-heavy pages, comparisons |
| 4 | Dense | Data-heavy, compact, maximum information per viewport | Admin panels, analytics, power-user tools |

## CALIBRATION PROTOCOL
1. **Read context**: client industry, target audience, brand personality, project type
2. **Set dimensions**: assign a 1-4 value for each dimension
3. **Output profile**: produce a calibration card (see format below)
4. **Validate**: does the profile match the client's actual needs, not our assumptions?
5. **Pass downstream**: all visual skills read this profile before executing

## CALIBRATION CARD FORMAT
```
TASTE PROFILE — [Project Name]
Variance: [1-4] — [label]
Motion:   [1-4] — [label]
Density:  [1-4] — [label]
Rationale: [1-2 sentences explaining why these values]
```

## PRESETS (Common Combinations)

| Preset | Variance | Motion | Density | Use Case |
|--------|----------|--------|---------|----------|
| Corporate Safe | 1 | 1 | 2 | B2B, institutional, healthcare |
| Modern SaaS | 2 | 2 | 2 | Standard SaaS landing page |
| Premium Launch | 3 | 3 | 1 | Product launch, brand reveal |
| Agency Showcase | 3 | 3 | 2 | Agency portfolio, creative services |
| Growth Dashboard | 2 | 2 | 3 | Client dashboards, analytics |
| High Impact LP | 3 | 4 | 1 | Hero-heavy conversion pages |

## DECISION TREE
IF client is corporate/traditional → start at Variance 1, adjust up only with explicit request
IF client is startup/tech → start at Variance 2-3
IF client is creative/agency → start at Variance 3-4
IF target audience is 50+ → Motion max 2 (accessibility)
IF target audience is gen-Z/creative → Motion 3-4 is expected
IF page is content-heavy (blog, docs) → Density 2 max, Motion 1-2
IF page is single CTA conversion → Density 1, Motion 2-3

## INTERDEPENDENCIES
Run BEFORE: `frontend-design`, `landing-page-advanced`, `creative-director-skill`
Run AFTER: project briefing is complete

## PROHIBITED
- Defaulting to middle values (2/2/2) without explicit rationale
- Setting Motion 4 on full pages (cinematic is hero-only)
- Ignoring client industry when calibrating
- Changing calibration mid-project without re-validating downstream output
- Applying the same profile to every project — each client is unique
