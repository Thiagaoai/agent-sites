---
name: Obsidian vaults do usuário
description: Dois vaults em OneDrive — memoria.claude (comercial) e dev.claude (técnico). Acessar direto via filesystem, sem MCP.
type: reference
originSessionId: 462ba502-8ef5-4c9e-888b-d63bd38b77cf
---
Dois vaults Obsidian em `c:\Users\dockp\OneDrive\Documents\obsidian.claude\`:

**`memoria.claude/`** — vault operacional do `agent-creator`. Lado comercial/operacional.
- Estrutura: `00-Dashboard`, `01-Clientes`, `02-Campanhas`, `03-Entregas`, `04-Templates`, `05-Pesquisa`, `06-Sessoes`, `07-Ideias`, `99-Arquivo`
- Usar pra: clientes, campanhas, entregas finalizadas, briefings, pesquisa de mercado.

**`dev.claude/`** — vault técnico do agente `dev` (agente-sites). Criado 2026-04-23. Lado código.
- Estrutura: `00-Dashboard`, `01-Projetos`, `02-Sessoes`, `03-Decisoes` (ADRs), `04-Templates`, `05-Debugging`, `06-Snippets`, `07-Stack`, `08-Ideias`, `99-Arquivo`
- Templates em `04-Templates/`: `projeto.md`, `sessao.md`, `decisao.md`, `debug.md`
- Usar pra: projetos técnicos, ADRs, bugs investigados, snippets reutilizáveis, docs de stack.

**Acesso:** direto via `Read`/`Write`/`Grep` — vault está em OneDrive local, não precisa de MCP.

**Regra de divisão:**
- Código/stack/decisão técnica → `dev.claude`
- Cliente/campanha/entrega → `memoria.claude`
- Preferência pessoal do usuário → memória interna (este sistema)
