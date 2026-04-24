# Landing Page Advanced — Effect Catalog

Reference by number from SKILL.md. Read this file on-demand when building effects.

---

## 1. RADIAL GLOW BACKGROUND

Dark background with colored radial light source. Creates dramatic depth behind hero content.

```css
.hero-glow {
  position: relative;
  min-height: 100vh;
  background: #0a0a0a;
  overflow: hidden;
}

.hero-glow::before {
  content: '';
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 600px;
  background: radial-gradient(ellipse at center,
    rgba(255, 120, 50, 0.25) 0%,
    rgba(255, 60, 20, 0.12) 30%,
    rgba(200, 30, 10, 0.05) 50%,
    transparent 70%
  );
  filter: blur(60px);
  pointer-events: none;
  z-index: 0;
}

/* Noise texture overlay for depth */
.hero-glow::after {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1;
}
```

**Glow color presets by industry:**
- Orange/red (energy, urgency): `rgba(255, 120, 50, 0.25)` — real estate, food, urgency CTAs
- Blue/cyan (tech, trust): `rgba(50, 120, 255, 0.25)` — SaaS, fintech, healthcare
- Purple/violet (premium, AI): `rgba(140, 50, 255, 0.25)` — AI products, luxury, creative
- Green/teal (growth, money): `rgba(50, 255, 150, 0.20)` — finance, sustainability, results

---

## 2. AURORA GRADIENT ANIMATION

Slow-moving animated gradient. Creates a living, breathing atmosphere.

```css
.aurora-bg {
  position: relative;
  min-height: 100vh;
  background: #0a0a0a;
  overflow: hidden;
}

.aurora-bg::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(120, 50, 255, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(50, 200, 255, 0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, rgba(255, 50, 120, 0.10) 0%, transparent 50%);
  animation: aurora-drift 15s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes aurora-drift {
  0%   { transform: translate(0, 0) rotate(0deg); }
  33%  { transform: translate(30px, -20px) rotate(1deg); }
  66%  { transform: translate(-20px, 15px) rotate(-1deg); }
  100% { transform: translate(10px, -10px) rotate(0.5deg); }
}
```

---

## 3. WIREFRAME GEOMETRIC DECORATIONS (SVG)

Floating wireframe spheres and shapes. "Parallax Light Field" aesthetic.

```html
<div class="geo-decorations">
  <!-- Wireframe sphere -->
  <svg class="geo-sphere geo-sphere--1" width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/>
    <ellipse cx="100" cy="100" rx="80" ry="30" stroke="rgba(255,255,255,0.12)" stroke-width="0.5"/>
    <ellipse cx="100" cy="100" rx="80" ry="55" stroke="rgba(255,255,255,0.10)" stroke-width="0.5"/>
    <ellipse cx="100" cy="100" rx="30" ry="80" stroke="rgba(255,255,255,0.12)" stroke-width="0.5"/>
    <ellipse cx="100" cy="100" rx="55" ry="80" stroke="rgba(255,255,255,0.10)" stroke-width="0.5"/>
    <ellipse cx="100" cy="100" rx="80" ry="45" stroke="rgba(255,255,255,0.08)" stroke-width="0.5" transform="rotate(30 100 100)"/>
    <ellipse cx="100" cy="100" rx="80" ry="45" stroke="rgba(255,255,255,0.08)" stroke-width="0.5" transform="rotate(-30 100 100)"/>
  </svg>

  <!-- Wireframe ring -->
  <svg class="geo-ring geo-ring--1" width="150" height="150" viewBox="0 0 150 150" fill="none">
    <circle cx="75" cy="75" r="50" stroke="rgba(255,255,255,0.12)" stroke-width="0.5"/>
    <circle cx="75" cy="75" r="35" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
    <ellipse cx="75" cy="75" rx="50" ry="18" stroke="rgba(255,255,255,0.10)" stroke-width="0.5"/>
  </svg>
</div>
```

```css
.geo-decorations {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.geo-sphere {
  position: absolute;
  animation: geo-float 20s ease-in-out infinite;
}

.geo-sphere--1 {
  top: 10%;
  right: 5%;
  opacity: 0.6;
}

.geo-ring {
  position: absolute;
  animation: geo-float 25s ease-in-out infinite reverse;
}

.geo-ring--1 {
  bottom: 15%;
  left: 8%;
  opacity: 0.4;
}

@keyframes geo-float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25%      { transform: translateY(-20px) rotate(5deg); }
  50%      { transform: translateY(10px) rotate(-3deg); }
  75%      { transform: translateY(-15px) rotate(4deg); }
}
```

---

## 4. OVERSIZED KINETIC TYPOGRAPHY

Massive headlines with staggered character animation on load.

```html
<h1 class="hero-title" data-animate="chars">
  SOCIAL REACH<br>AUTOMATED GROWTH
</h1>
```

```css
.hero-title {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: clamp(3rem, 8vw, 7rem);
  line-height: 0.95;
  letter-spacing: -0.03em;
  color: #fff;
  text-transform: uppercase;
}
```

```javascript
// Staggered character reveal with GSAP
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('[data-animate="chars"]').forEach(el => {
  const text = el.textContent;
  el.innerHTML = text.split('').map(char =>
    char === ' ' ? ' ' :
    char === '\n' ? '<br>' :
    `<span class="char" style="display:inline-block;opacity:0;transform:translateY(40px)">${char}</span>`
  ).join('');

  gsap.to(el.querySelectorAll('.char'), {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.03,
    ease: 'power3.out',
    delay: 0.3
  });
});
```

**Typography scale for oversized headlines:**
- Hero H1: `clamp(3rem, 8vw, 7rem)` — line-height 0.95, letter-spacing -0.03em
- Section H2: `clamp(2rem, 5vw, 4rem)` — line-height 1.05
- Body: `clamp(1rem, 1.2vw, 1.125rem)` — line-height 1.6, `rgba(255,255,255,0.7)`

---

## 5. FLOATING METRIC CARDS

Dashboard-like overlays on hero section. Shows product metrics, creates "live product" feel.

```html
<div class="floating-card floating-card--metrics">
  <div class="floating-card__badge">VIRAL RESULT</div>
  <h3 class="floating-card__title">Growth Velocity</h3>
  <p class="floating-card__desc">Automated engagement hitting viral peaks.</p>
  <div class="floating-card__number">+842%</div>
  <span class="floating-card__trend">↑ vs last week</span>
  <button class="floating-card__cta">Analyze Trends</button>
</div>
```

```css
.floating-card {
  position: absolute;
  background: rgba(20, 20, 25, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
  max-width: 300px;
  z-index: 10;
  animation: card-float 6s ease-in-out infinite;
}

.floating-card--metrics {
  top: 15%;
  right: 8%;
}

.floating-card__badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  background: rgba(255, 120, 50, 0.15);
  color: #ff7832;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.floating-card__number {
  font-family: 'Outfit', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin: 8px 0;
}

.floating-card__trend {
  color: #4ade80;
  font-size: 0.85rem;
  font-weight: 500;
}

.floating-card__cta {
  display: block;
  width: 100%;
  margin-top: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: #ff7832;
  color: #fff;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.floating-card__cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(255, 120, 50, 0.3);
}

@keyframes card-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-12px); }
}
```

---

## 6. SCROLL-TRIGGERED SECTION REVEALS (GSAP)

Staggered fade-in + slide-up for any section content.

```javascript
gsap.registerPlugin(ScrollTrigger);

// Universal reveal for sections
gsap.utils.toArray('[data-reveal]').forEach(section => {
  const children = section.querySelectorAll('[data-reveal-child]');

  gsap.from(children, {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none none'
    }
  });
});

// Parallax depth for background elements
gsap.utils.toArray('[data-parallax]').forEach(el => {
  const speed = parseFloat(el.dataset.parallax) || 0.5;

  gsap.to(el, {
    yPercent: -30 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: el.parentElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  });
});
```

HTML usage:
```html
<section data-reveal>
  <h2 data-reveal-child>Why Choose Us</h2>
  <p data-reveal-child>Description text here.</p>
  <div data-reveal-child class="features-grid">...</div>
</section>

<!-- Parallax on decorative elements -->
<div data-parallax="0.3" class="geo-sphere">...</div>
<div data-parallax="0.7" class="geo-ring">...</div>
```

---

## 7. SPOTLIGHT / CURSOR GLOW EFFECT

Mouse-following light effect on hero sections.

```javascript
function initSpotlight(container) {
  const spotlight = document.createElement('div');
  spotlight.classList.add('spotlight');
  container.appendChild(spotlight);

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    spotlight.style.left = `${e.clientX - rect.left}px`;
    spotlight.style.top = `${e.clientY - rect.top}px`;
  });
}

// Apply to hero section
initSpotlight(document.querySelector('.hero-glow'));
```

```css
.spotlight {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle,
    rgba(255, 255, 255, 0.06) 0%,
    transparent 70%
  );
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 2;
  transition: left 0.1s ease-out, top 0.1s ease-out;
}
```

---

## 8. GLOWING BORDER / MOVING BORDER BUTTON

Animated gradient border that rotates around a CTA button.

```html
<a href="#cta" class="glow-button">
  <span>Explore Design</span>
</a>
```

```css
.glow-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  border-radius: 50px;
  background: #0a0a0a;
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  overflow: hidden;
  isolation: isolate;
}

.glow-button::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 52px;
  background: conic-gradient(
    from var(--angle, 0deg),
    #ff7832, #ff3d6b, #a855f7, #3b82f6, #ff7832
  );
  z-index: -2;
  animation: glow-rotate 3s linear infinite;
}

.glow-button::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 48px;
  background: #0a0a0a;
  z-index: -1;
}

@keyframes glow-rotate {
  to { --angle: 360deg; }
}

/* Register custom property for animation */
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

/* Fallback for browsers without @property */
@supports not (background: conic-gradient(from 0deg, red, blue)) {
  .glow-button::before {
    background: linear-gradient(135deg, #ff7832, #a855f7);
  }
}
```

---

## 9. GRID / DOT PATTERN BACKGROUNDS

Subtle grid or dot patterns for section depth.

```css
/* Dot grid */
.dot-grid-bg {
  background-image: radial-gradient(
    rgba(255, 255, 255, 0.08) 1px,
    transparent 1px
  );
  background-size: 30px 30px;
}

/* Line grid */
.line-grid-bg {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* Fading grid (fades out at edges) */
.fade-grid-bg {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
}
```

---

## 10. COUNTER / NUMBER ANIMATION

Animated number counting for stats sections.

```javascript
function animateCounters() {
  gsap.utils.toArray('[data-counter]').forEach(el => {
    const target = parseInt(el.dataset.counter, 10);
    const suffix = el.dataset.counterSuffix || '';
    const prefix = el.dataset.counterPrefix || '';

    gsap.fromTo(el,
      { innerText: 0 },
      {
        innerText: target,
        duration: 2,
        ease: 'power2.out',
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        onUpdate: function() {
          el.textContent = prefix + Math.round(this.targets()[0].innerText).toLocaleString('pt-BR') + suffix;
        }
      }
    );
  });
}

animateCounters();
```

HTML:
```html
<div data-counter="842" data-counter-prefix="+" data-counter-suffix="%">0</div>
<div data-counter="42" data-counter-suffix=" Projects">0</div>
<div data-counter="1500" data-counter-prefix="R$" data-counter-suffix="/mo">0</div>
```
