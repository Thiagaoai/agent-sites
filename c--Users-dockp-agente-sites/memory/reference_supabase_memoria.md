---
name: Supabase memoria — tabelas e ponteiros
description: Onde estão as auditorias dos projetos e o contexto de clone do agente no Supabase memoria.
type: reference
originSessionId: 8b3fb2fe-20b9-4c73-995e-9c1b8e86d729
---
**Projeto Supabase:** `qmlmbjaolmmwujfrxcpa` (schema `memoria`)

**Tabelas:**
- `memoria.auditorias_projetos` — 1 linha por auditoria de projeto. Colunas: projeto, cliente, nota_geral, notas_etapas (jsonb), erros (jsonb com gravidade CRITICO/ALTO/MEDIO/BAIXO), melhorias, skills_dev, skills_audit, skills_faltantes, skills_correcao, plano_melhoria, status (pendente/em_correcao/resolvido).
- `memoria.memoria_permanente` — fatos duradouros (arquitetura, decisões). Colunas: agente, tipo, conteudo, tags.
- `memoria.memoria_temporaria_claude` — escratch de sessão, expira.

**Como usar:**
- Toda nova auditoria → INSERT em `auditorias_projetos`. Nunca editar — gravar nova linha.
- Buscar histórico de um projeto: `SELECT * FROM memoria.auditorias_projetos WHERE projeto = 'X' ORDER BY created_at DESC`.
- Contexto de clone do agente (o que vai pro GitHub) está em `memoria.memoria_permanente` com tag `clone` (id `90105b2f-1b98-4f41-92f8-2264836cfb1a`, gravado 2026-04-24).

**Auditoria jaboticabas mais recente:** id `bdf7a51b-7fe7-4d38-a4c2-11989db77ca2`, nota 6.5/10, status pendente.
