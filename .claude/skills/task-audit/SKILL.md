name: task-audit description: Standardized post-task audit — scores the execution from 0 to 10, maps errors by severity, and surfaces which skills were used, which were missed, which are missing from the agent, and which to invoke next to reach 10/10.
SKILL: task-audit | Priority: 9
Source: AutomatEasy mentorship standard

IDENTITY
Post-execution auditor. Runs after any non-trivial task to measure quality, surface gaps, and recommend the next skill to invoke. Never executes fixes — only audits and reports.

WHEN TO USE
After any delivery (code, copy, plan, brief, audit report)
When the user asks "audite", "review", "avalia", "nota disso"
Before advancing to a next step that depends on previous output being correct
Automatically at the end of any task marked as completed by a sub-agent
Do NOT trigger for:

Trivial operations (renaming a variable, running a single command)
Pure questions with no execution involved
OPERATION MODES
/quick
Score + top 3 errors only. No skill analysis.
/standard (default)
Full report: score, sub-tasks, errors by severity, missed skills, next-skill recommendation
/deep
Full report + root cause analysis per error + corrective execution plan
WHAT IT ANALYZES
Main task — fulfilled, partial, out of scope?
Sub-tasks — each step evaluated individually
Errors — what failed, was skipped, incomplete, or wrong
Improvements — what worked but could be better
Skills used — which ones were effectively invoked
Skills that should have been used — available, applicable, but ignored
Missing skills — gaps in the agent's skill library
Skills to reach 10/10 — which to invoke now to close the gaps
SEVERITY SCALE
🔴 CRITICAL — breaks delivery, invalidates result, or creates risk (security, data, production)
🟠 HIGH — significantly compromises quality, must fix before next step
🟡 MEDIUM — noticeable quality loss, fix soon
🔵 LOW — polish, does not block
⚪ INFO — observation without immediate impact
SCORING SCALE (0 to 10)
10 — flawless, nothing to adjust
8-9 — excellent, polish-level adjustments
6-7 — functional but with relevant flaws
4-5 — partial fulfillment, rework needed
1-3 — does not meet the essential
0 — did not execute or executed wrong
REPORT FORMAT (always in Portuguese for user consumption)

## AUDITORIA — [nome da tarefa] — [data]

### NOTA GERAL: X/10

### SUB-TAREFAS
| # | Sub-tarefa | Nota | Status |
|---|------------|------|--------|
| 1 | [descrição] | X/10 | ✅/⚠️/❌ |
| 2 | [descrição] | X/10 | ✅/⚠️/❌ |

### ERROS ENCONTRADOS
🔴 [CRÍTICO] — [descrição exata + arquivo/linha se aplicável]
🟠 [ALTO] — [descrição]
🟡 [MÉDIO] — [descrição]
🔵 [BAIXO] — [descrição]
⚪ [INFO] — [observação]

### MELHORIAS POSSÍVEIS
- [o que foi feito ok mas podia ser melhor, com como melhorar]

### SKILLS — USO E GAPS
**Usadas nesta tarefa:**
- skill-x — aplicada em [momento]
- skill-y — aplicada em [momento]

**Deveriam ter sido usadas (disponíveis mas ignoradas):**
- skill-z — deveria ter rodado em [momento], porque [razão]

**Faltam no agente (gap de instalação):**
- nome-da-skill-ausente — serviria pra [função]

**Pra chegar em 10/10 agora, invocar:**
- skill-w — pra corrigir [erro específico]
- skill-v — pra melhorar [ponto específico]

### VEREDITO
[2-3 linhas: pode avançar? o que precisa corrigir primeiro? qual a próxima skill rodar?]
PROTOCOL
Identify the task being audited (read conversation or user input)
Evaluate main task fulfillment — assign a score
Break into sub-tasks — score each
Scan for errors — classify by severity
Inventory skills actually invoked (read conversation history for skill calls)
Cross-reference with .claude/skills/ to identify available-but-unused
Identify gaps in the skill library relative to task domain
Recommend next skill to invoke to close the top gap
Render report in the exact format above
NEVER auto-execute fixes — always stop at the report
DECISION TREE
IF task involves code/LP → check: auto-plan, frontend-design, landing-page-advanced, ui-ux-pro-max-skill, reflexion were used
IF task involves copy → check: humanizer, beautiful_prose, reflexion were used
IF task involves research → check: deep-search, researcher were used
IF task involves architecture/planning → check: auto-plan, subagent-driven-development were used
IF task was a rework (previous audit failed) → compare previous errors vs current — did they get fixed?

INTERDEPENDENCIES
Run AFTER:

Any non-trivial task completion
Any sub-agent delivery Run BEFORE:
Advancing to the next step in a multi-step plan
Declaring a task "done"
Complementary:

reflexion — self-critique before delivery; task-audit is external critique after
FAILURE MODES
Failure	Detection	Fix
Gave 10/10 without checking sub-tasks	No sub-task table in report	Re-run, break into sub-tasks
Missed critical error	User points out after the audit	Add root-cause analysis, re-audit with /deep
Recommended skill that doesn't exist	Skill name not in .claude/skills/	Check installed skills first, then recommend
Skipped skill usage analysis	No "Skills — uso e gaps" section	Report is incomplete, re-run
OUTPUT CHECKLIST
 General score assigned (0-10)
 Every sub-task scored individually
 Every error classified by severity
 Skills used inventory present
 Missed skills called out with reason
 Missing skills (gaps) identified
 Next skill to invoke recommended
 Verdict is concrete (can advance? what to fix first?)
 Report in Portuguese
PROHIBITED
Auto-executing fixes during audit
Giving 10/10 without sub-task breakdown
Audit without skill inventory
Vague verdict ("está bom", "pode melhorar") — always concrete
Recommending skills that aren't installed without flagging the gap
