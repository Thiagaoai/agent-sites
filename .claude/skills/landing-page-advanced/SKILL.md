---
name: landing-page-advanced
description: Premium animated effects for landing pages — radial glow, aurora, kinetic typography, scroll reveals, floating cards. Pure HTML/CSS/JS + GSAP CDN, zero build step.
---

# SKILL: landing-page-advanced | Priority: 9
Source: AutomatEasy internal — premium visual effects catalog

## IDENTITY
Visual effects library for high-impact landing pages. Provides cinematic animations, depth, and premium aesthetics using pure HTML/CSS/JS with CDN imports — zero build step required.

## WHEN TO USE
Activate when a landing page requires effects BEYOND standard layouts:
- Animated/glowing backgrounds (radial glow, aurora, particles, noise)
- Scroll-triggered reveals and parallax depth (GSAP ScrollTrigger)
- Oversized kinetic typography (text animations, flip effects)
- Floating UI overlays (metric cards, mini-dashboards on hero)
- Dark premium aesthetics with dramatic lighting
- Wireframe/geometric decorative elements (SVG spheres, grids)
- Cinematic section transitions

## RELATIONSHIP TO OTHER SKILLS
This skill SUPPLEMENTS — never replaces:
- `creative-director-skill` → defines the creative concept first
- `taste-skill` → calibrates variance/motion/density before choosing a pattern
- `landing-page-specialist` → owns structure (sections) and CRO rules
- `frontend-design` → owns typography palette, color system, layout
- `web-design-guidelines` → compliance check before delivery

**Chain**: creative-director → taste → landing-page-specialist (structure) → **landing-page-advanced (effects)** → frontend-design (polish) → web-design-guidelines (compliance)

## CDN STACK
Load before closing `</body>` (only if using JS animations):
```html
<!-- GSAP Core + ScrollTrigger — check latest: cdnjs.com/libraries/gsap -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/ScrollTrigger.min.js"></script>
```

Premium typography in `<head>` (pick max 2 per project — per `landing-page-specialist` rules):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

## EFFECT CATALOG (10 effects)
Full code snippets in `CATALOG.md`. Reference by number:
1. Radial Glow Background (+ industry color presets)
2. Aurora Gradient Animation
3. Wireframe Geometric Decorations (SVG)
4. Oversized Kinetic Typography (GSAP)
5. Floating Metric Cards (glassmorphism)
6. Scroll-Triggered Section Reveals (GSAP ScrollTrigger)
7. Spotlight / Cursor Glow Effect
8. Glowing Border / Moving Border Button (@property)
9. Grid / Dot Pattern Backgrounds (3 variants)
10. Counter / Number Animation (GSAP + ScrollTrigger)

## COMPOSITION PATTERNS
Pick ONE pattern per landing page. Never mix patterns.

| Pattern | Hero BG | Typography | Decorative | CTA | Best For |
|---------|---------|-----------|------------|-----|----------|
| A: Dark SaaS | Radial glow | Oversized + chars anim | None (clean) | Glowing border button | SaaS, tech products |
| B: Cosmic/Tech | Plain dark | Oversized + chars anim | 3-5 wireframe SVGs w/ parallax | Standard + hover glow | AI, innovation, creative |
| C: Agency Portfolio | Aurora gradient | Oversized + spotlight cursor | 1 floating card | Glowing border button | Agencies, portfolios |
| D: Growth/Results | Radial glow | Standard | 2-3 floating metric cards | High-contrast solid | Finance, results-driven |

## DECISION TREE
1. Consult `taste-skill` for motion intensity calibration
2. If motion intensity = subtle → Pattern A or D (fewer animations)
3. If motion intensity = expressive → Pattern B or C (more visual layers)
4. If client has dashboard/metrics to showcase → Pattern D
5. If client is agency/portfolio → Pattern C
6. If client is SaaS/tech → Pattern A
7. If client is AI/innovation → Pattern B
8. Always verify chosen effects against `landing-page-specialist` performance targets (LCP < 2.5s, PageSpeed 90+)

## PERFORMANCE RULES
- All animations: `transform` and `opacity` only (GPU-composited)
- `will-change: transform` sparingly — only on actively animated elements
- `pointer-events: none` on ALL decorative layers
- Max 2 animated background effects per page
- Do NOT load GSAP if only using CSS animations
- ALWAYS include reduced motion support:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## PROHIBITED
- More than 2 animated background effects per page
- Animating with `left`/`top` — always use `transform`
- Missing `prefers-reduced-motion` media query
- Wireframe decorations AND floating cards simultaneously (visual noise)
- GSAP animations without ScrollTrigger on below-fold content
- Loading GSAP when only CSS animations are needed

## TEMPLATES
Starter templates available in `templates/` directory:
- `dark-saas.html` — Pattern A boilerplate, ready to customize
