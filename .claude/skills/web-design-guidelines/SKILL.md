---
name: web-design-guidelines
description: Pre-delivery compliance gate. Validates HTML semantics, performance (Core Web Vitals), accessibility (WCAG AA), and production readiness before deploy.
---

# SKILL: web-design-guidelines | Priority: 9
Source: vercel-labs/agent-skills — expanded for AutomatEasy agent suite

## IDENTITY
Production compliance validator. The final quality gate before any frontend code is delivered or deployed. Checks that code meets web standards, accessibility requirements, and performance targets. This is a pass/fail gate — no partial credits.

## WHEN TO USE
Trigger this skill when:
- Any frontend deliverable is ready for review (before `/deploy`)
- After `frontend-design` and `ui-ux-pro-max-skill` have completed their work
- Before handing code to `deploy-specialist`
- Client reports rendering issues, slow loading, or accessibility complaints
- Migrating existing site to new hosting

Do NOT trigger for:
- Early prototyping or wireframe phase (too early)
- Backend-only changes with no frontend impact
- Design direction decisions (→ `taste-skill`, `creative-director-skill`)

## COMPLIANCE CHECKLIST

### 1. HTML Semantics
- [ ] Single `<h1>` per page, heading hierarchy (h1 → h2 → h3, no skips)
- [ ] Landmark elements used (`<header>`, `<main>`, `<nav>`, `<footer>`, `<section>`)
- [ ] Lists use `<ul>`/`<ol>`, not styled `<div>` stacks
- [ ] Links (`<a>`) for navigation, buttons (`<button>`) for actions — never reversed
- [ ] `lang` attribute set on `<html>` tag (e.g., `lang="pt-BR"`)
- [ ] `<meta charset="UTF-8">` and `<meta name="viewport">` present

### 2. Images & Media
- [ ] All `<img>` have explicit `width` and `height` attributes (prevents CLS)
- [ ] All `<img>` have meaningful `alt` text (or `alt=""` if purely decorative)
- [ ] Images in WebP format (with fallback for legacy browsers if needed)
- [ ] Lazy loading on below-fold images (`loading="lazy"`)
- [ ] No images larger than 200KB (compress or resize)
- [ ] `<video>` and `<iframe>` have `title` attribute

### 3. Typography & Fonts
- [ ] Max 2 font families loaded per page
- [ ] `font-display: swap` on all custom fonts (prevents FOIT)
- [ ] System font fallback defined in font stack
- [ ] `<link rel="preconnect">` for font provider domains
- [ ] No font files larger than 100KB (subset if needed)

### 4. Performance (Core Web Vitals)
- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] CLS (Cumulative Layout Shift): < 0.1
- [ ] FID/INP (Interaction to Next Paint): < 200ms
- [ ] Total page weight: < 500KB (including images)
- [ ] Google PageSpeed Mobile: 90+
- [ ] No render-blocking resources in `<head>` (defer/async JS)
- [ ] CSS critical path inlined or loaded efficiently

### 5. Accessibility (WCAG AA)
- [ ] Color contrast ratio: 4.5:1 for normal text, 3:1 for large text
- [ ] Focus-visible outlines on all interactive elements
- [ ] Tab order is logical (follows visual reading order)
- [ ] Touch targets: minimum 44x44px on mobile
- [ ] `prefers-reduced-motion` media query present (if animations exist)
- [ ] `prefers-color-scheme` respected (if dark/light modes exist)
- [ ] No information conveyed by color alone (add icons/text)

### 6. SEO & Meta
- [ ] `<title>` tag present and under 60 characters
- [ ] `<meta name="description">` present and under 160 characters
- [ ] Open Graph tags: `og:title`, `og:description`, `og:image`
- [ ] `<link rel="canonical">` set if content exists on multiple URLs
- [ ] Structured data (JSON-LD) for business pages where applicable

### 7. Security & Production
- [ ] No `console.log` with sensitive data in production code
- [ ] All external resources loaded via HTTPS
- [ ] No inline `onclick`/`onsubmit` handlers (use event listeners)
- [ ] Forms have CSRF protection if submitting to a backend
- [ ] No API keys or secrets in client-side code

## OPERATION MODES

### /quick — Pre-commit spot check
Run sections 1, 2, 4 only. Fast pass for iterative development.

### /standard (default) — Pre-delivery review
Run all 7 sections. Produce pass/fail report.

### /deep — Pre-launch audit
All 7 sections + cross-browser testing notes (Chrome, Safari, Firefox) + real Lighthouse run + mobile device testing (375px, 768px, 1024px).

## OUTPUT FORMAT
```markdown
## Compliance Report — [Page/Project Name]
Date: YYYY-MM-DD | Mode: quick/standard/deep

### Results
| Section | Pass | Fail | Items |
|---------|------|------|-------|
| HTML Semantics | X/6 | Y/6 | ... |
| Images & Media | X/6 | Y/6 | ... |
| ... | ... | ... | ... |

### Failures (must fix)
1. **[Section]** Item — specific issue and fix

### Warnings (should fix)
1. **[Section]** Item — recommendation

### Verdict: PASS / FAIL
```

## DECISION TREE
IF any section 4 (Performance) item fails → FAIL, fix before delivery
IF any section 5 (Accessibility) item fails → FAIL, fix before delivery
IF sections 1-3 have >2 failures each → FAIL, fix before delivery
IF sections 6-7 have any failure → WARN, fix before deploy to production
IF all sections pass → PASS, clear for `deploy-specialist`

## INTERDEPENDENCIES
Run AFTER: `frontend-design`, `ui-ux-pro-max-skill`, `landing-page-advanced`
Run BEFORE: `security`, `deploy-specialist`

## PROHIBITED
- Marking a page as PASS with any Performance or Accessibility failure
- Skipping this check before any production deploy
- Delivering without `alt` text on images
- Delivering without `font-display: swap` on custom fonts
- Approving pages with PageSpeed Mobile score below 90
