---
name: formato padrão de auditoria (canônico)
description: Template OBRIGATÓRIO e único para qualquer pedido de auditoria. Sobrescreve o OUTPUT FORMAT do /audit command. Curto, semafórico, com notas e mapa de skills.
type: feedback
originSessionId: 8b3fb2fe-20b9-4c73-995e-9c1b8e86d729
---
**REGRA ABSOLUTA:** toda vez que Thiago pedir "auditoria", "audita", "/audit", "revisa o projeto", ou similar, respondo EXATAMENTE neste formato. Não uso caixinhas ASCII. Não escrevo parágrafos. Não listo próximos passos separados. Não extrapolo o template.

**Why:** Thiago rejeitou duas vezes (2026-04-24) o formato extenso — primeiro o template ASCII do /audit command, depois uma versão intermediária. O único formato aceito é este abaixo. É inegociável.

**How to apply:** assim que identificar intent de auditoria, produzir APENAS este bloco, nada antes, nada depois (exceto tool calls de investigação). Funciona pra qualquer alvo: agente Claude, entrega de LP, dashboard, código, brief, campanha.

---

## TEMPLATE (copiar estrutura exata)

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
🔴 CRÍTICO — [descrição curta] [file:linha] · [impacto 1 linha]
🟠 ALTO    — [descrição curta] [file:linha] · [impacto 1 linha]
🟡 MÉDIO   — [descrição curta] [file:linha] · [impacto 1 linha]
🟢 BAIXO   — [descrição curta] [file:linha] · [impacto 1 linha]

MELHORIAS
- [sugestão curta, 1 linha, sem file:linha obrigatório]

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

---

## REGRAS DO TEMPLATE

1. **Nota geral** = média ponderada. Pesos: execução 30%, performance 25%, SEO 15%, planejamento 10%, acessibilidade 10%, docs 10%.
2. **Notas por etapa** — adaptar as etapas ao tipo de alvo. Se auditando um agente Claude, trocar "Performance/SEO/Acessibilidade" por "Frontmatter/Domínio/Stack/Skills referenciadas". Se auditando copy, trocar por "Headline/Benefício/Prova/CTA/Clareza".
3. **Gravidade semafórica OBRIGATÓRIA** — 🔴 CRÍTICO bloqueia deploy, 🟠 ALTO degrada KPI, 🟡 MÉDIO risco moderado, 🟢 BAIXO cosmético.
4. **1 linha por erro.** Se precisar de mais contexto, omitir.
5. **file:linha em markdown link** quando aplicável: `[index.html:57](entregas/xxx/index.html#L57)`.
6. **Skills** — sempre listar as 4 categorias. Se não souber, escrever "—" (travessão).
7. **Fechar SEMPRE com a pergunta** "Aplico os fixes críticos agora?" — nunca expandir em "próximos passos".
8. **Nada antes do `AUDITORIA —`** (exceto uma frase de 1 linha se precisar avisar algo tipo "relatório Lighthouse ausente, medi manualmente").
9. **Nada depois da pergunta final.**
10. **Português Brasil** (regra global do CLAUDE.md).

---

## SKILLS CATALOGADAS DO PROJETO agente-sites (pra preencher o mapa)

Visuais/UX: frontend-design · landing-page-advanced · ui-ux-pro-max-skill · taste-skill · web-design-guidelines · creative-director-skill · visual-workflow
Copy: humanizer · beautiful_prose · customer-support
Dev: subagent-driven-development · trigger-dev · systematic-debugging · self-healing · auto-plan
Qualidade: reflexion · review-claudemd · security · cost-reducer · task-audit
Research: researcher · know-me · deep-search
Estratégia: strategic-compact · kaizen
Meta: create-skill

Subagents: landing-page-specialist · copy-specialist · dashboard-specialist · crm-specialist · deploy-specialist · motion-3d-specialist
