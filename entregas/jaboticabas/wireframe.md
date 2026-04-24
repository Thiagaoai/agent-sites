# Jaboticabas Restaurante — Landing Page Wireframe

**Objetivo:** substituir jaboticabasrestaurante.com por LP premium, pronta para Google Ads + GA4 (wiring feito por agente separado de tracking).

**Stack:** HTML estático + Tailwind CSS (via Play CDN, zero-build) + Alpine.js (micro-interações).

**Performance target:** LCP < 2.0s · PageSpeed mobile 95+ · peso total < 400KB.

**Paleta:**
- `--jaboticaba`: `#2A0E1C` (fundo escuro, cor de fruta madura)
- `--brasa`: `#E85D2E` (CTA, ember laranja)
- `--creme`: `#FAF3E7` (fundo seções claras)
- `--carvao`: `#1A1210` (texto primário)
- `--ouro`: `#D4A44B` (detalhes, divisores)

**Typography:** Fraunces (display serif) + Inter (corpo) — via Google Fonts `display=swap`.

---

## Seções (ordem CRO validada)

### 1. Hero (above-the-fold)
- Logo + menu âncoras (Cardápio · Unidades · Delivery · Contato)
- Badge topo: "🔥 Fogão a lenha · Hidrolândia/GO"
- Headline H1: **Da brasa pra sua mesa.**
- Sub: "Carnes no carvão, fogão a lenha e sabor caseiro que você não esquece."
- CTA primário: **[Pedir pelo WhatsApp]** (verde WhatsApp, alto contraste)
- CTA secundário: [Ver Cardápio] (link texto)
- Prova social snippet: "★★★★★ · centenas de famílias servidas"
- Imagem LCP: costela na brasa close-up (hero right)
- Scroll hint animado

### 2. Faixa de confiança (abaixo do hero)
- 4 selos horizontais: Fogão a lenha · Carnes premium · Delivery região · Reserva grupos

### 3. Cardápio destaque
- Título: "Os pratos que viraram tradição"
- Grid 2×3 (mobile 1×6) — 6 pratos:
  1. Costela no Bafo · 8h no fogão a lenha
  2. Frango Assado na Brasa · temperado na casa
  3. Peixe na Brasa · pintado fresco do dia
  4. Galinhada Caipira · receita da vovó
  5. Tutu de Feijão · acompanhamento goiano clássico
  6. Arroz com Pequi · o sabor de Goiás
- Cada card: foto · nome · descrição 1 linha · preço (ou "a partir de R$")
- CTA: [Ver cardápio completo] → WhatsApp

### 4. Nossas duas unidades
- Título: "Dois endereços, um só sabor"
- Grid 2 cols (mobile stack):
  - Unidade Centro Hidrolândia — endereço · horário · mapa embed · [Como chegar]
  - Unidade BR-153 — endereço · horário · mapa embed · [Como chegar]
- Horário unificado exibido: Seg–Sáb 11h–14h · 18h–22h · Dom 11h–15h

### 5. Delivery + Reservas
- Split 2 cols:
  - Esquerda: "Delivery em Hidrolândia e região" + lista de bairros + [Pedir delivery no WhatsApp]
  - Direita: "Reserve para grupos" + "4+ pessoas · 24h de antecedência" + [Reservar agora]

### 6. Prova social (depoimentos)
- Título: "Quem provou, volta."
- 3 cards: foto · nome · cidade · ★★★★★ · depoimento 2–3 linhas
- Depoimentos reais do site atual (preservados verbatim) + 1 espaço pra novo

### 7. FAQ
- Accordion Alpine.js com 6 perguntas:
  1. Vocês aceitam cartão e PIX?
  2. Tem estacionamento nas duas unidades?
  3. Fazem delivery pra quais bairros?
  4. Como reservar para grupos?
  5. Tem opção sem pequi?
  6. Qual o prato mais pedido?

### 8. CTA final
- Full-width banner escuro (jaboticaba bg)
- Título: "Bora marcar aquela costela?"
- Sub: "Chama no zap — a gente já anota seu horário."
- CTA único: [Falar no WhatsApp] (brasa)

### 9. Footer
- 3 colunas:
  - Marca + tagline + redes sociais
  - Endereços (2 unidades) + fone
  - Horários + formas de pagamento
- Bottom: © 2026 Jaboticabas · [política privacidade] · [termos]

---

## Elementos globais

- **Sticky WhatsApp FAB** (mobile + desktop) — sempre visível, bottom-right
- **Header** sticky com blur — recolhe no scroll pra liberar viewport
- **Smooth scroll** em anchors
- **Schema.org JSON-LD**: Restaurant × 2 unidades (LocalBusiness) + Menu + OpeningHoursSpecification + PostalAddress
- **Open Graph** + Twitter Card + favicon completo (32/180/192/512)
- **robots.txt** + **sitemap.xml**
- **Hooks de tracking** (data-attributes, sem código de tracking — agente de tracking injeta depois):
  - `data-track="click_whatsapp"` em todos CTAs WhatsApp
  - `data-track="click_phone"` no telefone tel:
  - `data-track="click_menu_item"` nos cards de prato
  - `data-track="view_unidade"` nos cards de unidade
  - `data-track="submit_reserva"` no form (se houver)
  - `data-track="click_faq_{n}"` em cada FAQ
  - `data-unidade="centro|br153"` pra segmentação

---

## Prontidão Ads (sem inserir tags)

- **Landing pages separadas por ad group** (próxima iteração): `/costela`, `/delivery`, `/almoco` — todas com H1/CTA customizado pra QS alto
- **UTM-ready**: template de WhatsApp link preserva `?utm_source={source}&utm_campaign={campaign}` via JS que lê `location.search` e anexa na URL do WA
- **Mobile-first** (70%+ do tráfego brasileiro é mobile)
- **Velocidade**: LCP image com `fetchpriority="high"` + `width/height` explícitos → CLS zero
- **Acessibilidade**: contraste WCAG AA validado em todos CTAs · aria-labels em ícones · focus states visíveis
