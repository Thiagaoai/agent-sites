# Jaboticabas Restaurante — Landing Page

Landing page estática premium, substituta do jaboticabasrestaurante.com atual.

## Stack
- HTML + Tailwind CSS (Play CDN, zero-build)
- Alpine.js (mobile menu + FAQ accordion)
- Google Fonts (Fraunces + Inter) com `display=swap`
- Imagens: Unsplash via CDN (trocar por fotos reais do restaurante antes de ir pra Ads)

## Estrutura
```
jaboticabas/
├── index.html       # LP completa
├── netlify.toml     # headers + redirects
├── robots.txt
├── sitemap.xml
├── wireframe.md     # especificação textual seção-a-seção
└── assets/
    └── favicon.svg
```

## Como testar local
```bash
cd entregas/jaboticabas
python -m http.server 8080
# abre http://localhost:8080
```

## Deploy

### Opção A — Vercel (via Composio MCP, mais rápido)
Via `VERCEL_CREATE_NEW_DEPLOYMENT` — basta conectar conta Vercel no Composio e fazer drag-deploy.

### Opção B — Netlify (via CLI)
```bash
npm i -g netlify-cli
netlify deploy --dir=. --prod --site=jaboticabas
```

## Hooks de tracking (para agente de tracking)

A LP NÃO injeta código de tracking. O agente de tracking lê os `data-track` e plugga GTM/GA4/Ads:

| Atributo | Onde | Eventos sugeridos |
|---|---|---|
| `data-track="click_whatsapp"` | todos CTAs WhatsApp (hero, header, FAB, footer, cards unidade, delivery, reserva, cardápio, CTA final) | `click_whatsapp` + param `source` |
| `data-track="click_phone"` | tel: links | `click_phone` + param `unidade` |
| `data-track="click_menu_item"` | 6 cards de prato | `view_menu_item` + param `item` |
| `data-track="view_unidade"` | cards unidades | `view_unidade` (IntersectionObserver) |
| `data-track="click_directions"` | botão "Como chegar" | `click_directions` + param `unidade` |
| `data-track="click_faq_{n}"` | cada botão FAQ | `click_faq` + param index |
| `CustomEvent('jb:scroll')` | window | `scroll_milestone` com `detail.milestone` (25/50/75/90) |

**UTM preservation**: script inline já captura `utm_*`, `gclid`, `fbclid` de `location.search`, grava em `sessionStorage['__jb_utm']` e anexa em TODOS os links WhatsApp automaticamente. Atribuição cross-channel pro agente de tracking.

**Enhanced Conversions ready**: quando o agente de tracking adicionar form de reserva, já tem data-attribute `data-track="submit_reserva"` reservado.

## Pendências (specs reais do cliente)
- [ ] Endereço real das 2 unidades (rua, nº, CEP) — substituir `[A DEFINIR]` e `[CEP]`
- [ ] Preços reais dos 6 pratos — substituir `a partir de R$ --`
- [ ] Fotos reais dos pratos + fachadas (trocar URLs Unsplash)
- [ ] Handle Instagram real (atualmente: `instagram.com/jaboticabasrestaurante` — confirmar)
- [ ] Logo oficial em SVG (atualmente: logo placeholder feito à mão em SVG inline)
- [ ] OG image 1200×630 customizada em `/assets/og-image.jpg`

## Performance alvo
- LCP < 2.0s (hero image tem `fetchpriority="high"`)
- CLS < 0.1 (todas imagens com `width/height`)
- PageSpeed mobile 95+
- Peso total < 400KB (sem fotos pesadas)
