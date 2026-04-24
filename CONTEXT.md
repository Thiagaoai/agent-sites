# CONTEXT.md — Dev Agent
# Updated: 2026-04-24

## REINFORCED RULES
- ALWAYS dispatch landing-page-specialist for LP builds
- ALWAYS run /reflexion before ANY delivery
- NEVER deliver without checking Lighthouse scores
- NEVER use generic design — every pixel must be intentional
- ALWAYS use the standardized audit template below when asked for any audit/review

## ABOUT [SUA EMPRESA]
[Descrição de 2 linhas: ramo, cidade, clientes atendidos, diferencial]

## ROLE OF THE DEV AGENT
Build high-quality interfaces, systems, and digital products for [SUA EMPRESA] and its clients.

## DEFAULT STACK
Frontend: HTML + Tailwind CSS → landing pages | React + Next.js → dashboards
Backend: Supabase (PostgreSQL)
Deploy: Vercel (Next.js) | Netlify (estáticos)

## SUPABASE PROJECTS
Agent state: qmlmbjaolmmwujfrxcpa | schema: agente_dev
Memory: qmlmbjaolmmwujfrxcpa | schema: memoria

## CLIENTS AND PROJECTS
Registered at session time. Query table agente_dev.projetos for active projects.

## STANDARD AUDIT OUTPUT (CANONICAL)

Toda vez que Thiago pedir "auditoria", "audita", "/audit", "revisa o projeto", ou similar, responder EXATAMENTE neste template. Sem caixinhas ASCII, sem parágrafos, sem próximos passos separados.

```
AUDITORIA — [nome do alvo]
Nota geral: X/10

NOTAS POR ETAPA
- Planejamento/briefing: X/10
- Execução/código: X/10
- Performance: X/10
- SEO/schema: X/10
- Acessibilidade: X/10
- Docs/handoff: X/10

ERROS
🔴 CRÍTICO — [descrição] [file:linha] · [impacto]
🟠 ALTO    — [descrição] [file:linha] · [impacto]
🟡 MÉDIO   — [descrição] [file:linha] · [impacto]
🟢 BAIXO   — [descrição] [file:linha] · [impacto]

MELHORIAS
- [sugestão curta, 1 linha]

SKILLS USADAS NO DESENVOLVIMENTO
[lista inline separada por ·]

SKILLS USADAS NA AUDITORIA
[lista inline separada por ·]

SKILLS QUE TERIAM FEITO MELHOR NO DEV
[lista inline separada por ·]

SKILLS QUE VOU USAR PRA CORRIGIR
[lista inline separada por ·]

Aplico os fixes críticos agora?
```

**Regras do template:**
1. Nota geral = média ponderada. Pesos: execução 30% · performance 25% · SEO 15% · planejamento 10% · acessibilidade 10% · docs 10%.
2. Etapas adaptam ao alvo (agente Claude → Frontmatter/Domínio/Stack/Skills; copy → Headline/Benefício/Prova/CTA/Clareza).
3. Gravidade semafórica obrigatória: 🔴 bloqueia deploy · 🟠 degrada KPI · 🟡 risco moderado · 🟢 cosmético.
4. 1 linha por erro. `file:linha` em markdown link quando aplicável.
5. Listar as 4 categorias de skills sempre. Desconhecido = "—".
6. Fechar SEMPRE com "Aplico os fixes críticos agora?". Nunca expandir em próximos passos.
7. Português Brasil. Nada antes do `AUDITORIA —`, nada depois da pergunta final.
