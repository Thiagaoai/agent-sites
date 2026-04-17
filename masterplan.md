# MASTERPLAN — agente-sites
# System Design Document (SDD)
# Last updated: 2026-04-16

---

## 1. PROJECT OVERVIEW

**Project Name:** agente-sites
**Type:** Claude Code AI Development Agent Framework
**Purpose:** Autonomous agent system for building landing pages, dashboards, and digital products for a Brazilian digital agency.
**Owner:** dockplusai@gmail.com
**Location:** `c:\Users\dockp\agente-sites\`
**Created:** 2026-04-15 (Session 01)
**Git:** Not initialized yet

---

## 2. ARCHITECTURE

```
┌─────────────────────────────────────────────────────┐
│                   CLAUDE.md                         │
│              (Master Agent Config)                   │
│         Identity, Rules, Delivery Standard           │
├─────────────────────────────────────────────────────┤
│                                                     │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│   │ SKILLS   │  │ SUB-     │  │ SLASH    │        │
│   │ (25)     │  │ AGENTS   │  │ COMMANDS │        │
│   │ .claude/ │  │ (5)      │  │ (7)      │        │
│   │ skills/  │  │ .claude/ │  │ .claude/ │        │
│   │          │  │ agents/  │  │ commands/│        │
│   └────┬─────┘  └────┬─────┘  └────┬─────┘        │
│        │             │             │               │
│        └─────────────┼─────────────┘               │
│                      ▼                              │
│   ┌──────────────────────────────────┐              │
│   │         EXECUTION LAYER          │              │
│   │  screenshot.js  │  Playwright    │              │
│   │  test-supabase  │  Node.js       │              │
│   └────────┬─────────────────────────┘              │
│            ▼                                        │
│   ┌──────────────────────────────────┐              │
│   │         SUPABASE BACKEND         │              │
│   │  Project: qmlmbjaolmmwujfrxcpa   │              │
│   │  Schema: agente_dev (state)      │              │
│   │  Schema: memoria (memory)        │              │
│   └──────────────────────────────────┘              │
│            ▼                                        │
│   ┌──────────────────────────────────┐              │
│   │         DEPLOY TARGETS           │              │
│   │  Vercel (Next.js apps)           │              │
│   │  Netlify (static LPs)            │              │
│   └──────────────────────────────────┘              │
└─────────────────────────────────────────────────────┘
```

---

## 3. TECH STACK

| Layer | Technology | Usage |
|-------|-----------|-------|
| Frontend | HTML + Tailwind CSS | Landing pages, static sites |
| Frontend | React + Next.js | Dashboards, dynamic apps |
| Backend | Supabase (PostgreSQL) | Database, auth, real-time |
| Screenshots | Playwright + Chromium | Visual QA (375px mobile, 1280px desktop) |
| Deploy | Vercel | Next.js apps |
| Deploy | Netlify | Static landing pages |
| Runtime | Node.js v24.14.1 | Scripts, tooling |
| Package Manager | npm 11.12.1 | Dependencies |

### Dependencies (package.json)
- `@supabase/supabase-js` ^2.103.2
- `dotenv` ^17.4.2
- `playwright` ^1.59.1 (dev)

---

## 4. FILE STRUCTURE

```
agente-sites/
├── .claude/
│   ├── agents/                    # Sub-agent definitions (EMPTY — pending)
│   ├── commands/                  # Slash command definitions (EMPTY — pending)
│   ├── hooks/                     # Event hooks (EMPTY — pending)
│   ├── settings.json              # Theme: dark-blue
│   ├── settings.local.json        # Local permissions
│   └── skills/                    # 25 skill directories
│       ├── auto-plan/SKILL.md             # EMPTY
│       ├── beautiful_prose/SKILL.md       # EMPTY
│       ├── cost-reducer/SKILL.md          # EMPTY
│       ├── create-skill/SKILL.md          # EMPTY
│       ├── creative-director-skill/SKILL.md  # FILLED — 5-phase creative ideation
│       ├── customer-support/SKILL.md      # FILLED — client communication templates
│       ├── deep-search/SKILL.md           # EMPTY
│       ├── frontend-design/SKILL.md       # FILLED — typography-first UI protocol
│       ├── humanizer/SKILL.md             # EMPTY
│       ├── kaizen/SKILL.md                # FILLED — continuous improvement cycle
│       ├── know-me/SKILL.md               # EMPTY
│       ├── landing-page-advanced/SKILL.md # EMPTY
│       ├── reflexion/SKILL.md             # EMPTY
│       ├── researcher/SKILL.md            # EMPTY
│       ├── review-claudemd/SKILL.md       # EMPTY
│       ├── security/SKILL.md              # EMPTY
│       ├── self-healing/SKILL.md          # EMPTY
│       ├── strategic-compact/SKILL.md     # FILLED — context window monitoring
│       ├── subagent-driven-development/SKILL.md  # FILLED — orchestration protocol
│       ├── systematic-debugging/SKILL.md  # FILLED — 4-phase debugging
│       ├── taste-skill/SKILL.md           # FILLED — design calibration (variance/motion/density)
│       ├── trigger-dev/SKILL.md           # FILLED — background jobs & workflows
│       ├── ui-ux-pro-max-skill/SKILL.md   # FILLED — UX audit (content incomplete)
│       ├── visual-workflow/SKILL.md       # EMPTY
│       └── web-design-guidelines/SKILL.md # EMPTY
├── .vscode/
│   └── settings.json              # Dark blue theme customization
├── entregas/
│   └── teste.png                  # Test screenshot (Google @ 375px)
├── node_modules/                  # Installed dependencies
├── .env                           # Supabase URL + ANON_KEY + PROJECT_ID
├── .gitignore                     # .env, node_modules/
├── CLAUDE.md                      # Master agent instructions (80 lines)
├── CONTEXT.md                     # Project context & Supabase IDs (27 lines)
├── masterplan.md                  # THIS FILE
├── MEMORY.md                      # Memory index (empty)
├── memoria.mentoria.md            # Session 01 notes
├── package.json                   # Project manifest
├── package-lock.json              # Dependency lock
├── screenshot.js                  # Playwright screenshot utility
└── test-supabase.js               # Supabase connection test
```

---

## 5. MASTER AGENT (CLAUDE.md)

### Identity
Specialist in landing pages, dashboards, and digital products. Builds at production quality — never looks AI-generated. Fully autonomous.

### Critical Rules
1. ALWAYS dispatch landing-page-specialist for LP builds
2. ALWAYS run /reflexion before ANY delivery
3. NEVER deliver without Lighthouse scores
4. NEVER deliver visual changes without screenshots (mobile 375px + desktop 1280px)
5. NEVER use generic design
6. ALL chat output in Brazilian Portuguese
7. ALL instruction files, skills, briefs in English
8. Never ask for permission — execute and show BEFORE/AFTER
9. Never invent specifications — ask if data is missing

### Delivery Standard (every output)
1. What was done
2. How to test
3. What is missing for production
4. Recommended next step

### Token Economy
- No reasoning/plans while coding — just code
- No narration — just do it
- Status updates: 1 line max
- Show results (screenshots, diffs) not process

---

## 6. SUB-AGENTS (5)

All defined in CLAUDE.md. **None created yet** in `.claude/agents/`.

| Sub-Agent | Responsibility | Skills Used |
|-----------|---------------|-------------|
| **landing-page-specialist** | Interfaces, CRO, animations, capture pages | frontend-design, landing-page-advanced, taste-skill, ui-ux-pro-max-skill |
| **copy-specialist** | LP copy: headlines, CTAs, sections | humanizer, beautiful_prose |
| **dashboard-specialist** | Data visualization, charts, Supabase real-time | frontend-design, trigger-dev |
| **crm-specialist** | Database schema, RLS, data modeling, auth | security, systematic-debugging |
| **deploy-specialist** | Publishing, domain, performance, rollback | self-healing, cost-reducer |

### Dispatch Protocol
1. Identify correct sub-agent for the task
2. Pass full context (client, brand kit, requirements)
3. Define completion criteria
4. Review output before integration

---

## 7. SKILLS (25)

### 7.1 FILLED (10 skills with content)

#### Visual Category

| Skill | Priority | Description |
|-------|----------|-------------|
| **frontend-design** | 10 | 8-step protocol: typography hierarchy first, semantic HTML+Tailwind, color/depth, purposeful animation, surprise element, responsiveness, accessibility. Hand-crafted, non-templated feel. |
| **taste-skill** | 8 | Design calibration using 3 dimensions: Variance (1-4), Motion (1-4), Density (1-4). Presets: Corporate Safe (1/1/2), Modern SaaS (2/2/2), Premium Launch (3/3/1). Outputs calibration cards. |
| **creative-director-skill** | 10 | 5-phase framework: Briefing, Divergence, Convergence, Creative Direction, Gate. Forces evaluation against emotional/originality/differentiation criteria. |
| **ui-ux-pro-max-skill** | 10 | UX audit with 4 dimensions: Visual Hierarchy, Usability, Consistency, Accessibility. Requires WCAG AA contrast, 44x44px touch targets, 4px/8px grid, semantic HTML. **Content incomplete — needs completion.** |

#### Development Category

| Skill | Priority | Description |
|-------|----------|-------------|
| **subagent-driven-development** | 8 | Orchestration protocol for 5 specialized subagents. 4-step dispatch: identify, pass context, define completion, review. |
| **trigger-dev** | 7 | Background jobs, workflows with retries, scheduled tasks. Compatible with Next.js, Node.js, Vercel, Supabase. |
| **systematic-debugging** | 9 | 4 phases: COLLECT symptoms, HYPOTHESIZE causes, DIAGNOSE with evidence, FIX surgically. Decision tree for error types. Never fix without confirmed root cause. |

#### Quality Category

| Skill | Priority | Description |
|-------|----------|-------------|
| **strategic-compact** | 8 | Context monitoring for 60% usage threshold. Detects warning signs (repetition, forgotten decisions, contradictions). Triggers /compact. |

#### Strategy Category

| Skill | Priority | Description |
|-------|----------|-------------|
| **customer-support** | 6 | Templates for client communication: positive results (data-driven), negative results (with action plans), technical questions. Personalization + approval workflow. |
| **kaizen** | 8 | 6-step continuous improvement: Observe, Analyze, Propose, Validate, Apply, Record. 1% improvement per session. Records changes to Supabase. |

### 7.2 EMPTY (15 skills — directories exist, SKILL.md files are blank)

| Skill | Category | Intended Purpose |
|-------|----------|-----------------|
| **landing-page-advanced** | Visual | Advanced LP construction techniques |
| **web-design-guidelines** | Visual | Design system rules and standards |
| **visual-workflow** | Visual | Visual workflow diagrams/processes |
| **humanizer** | Copy | Make AI text sound human |
| **beautiful_prose** | Copy | Elegant, persuasive writing |
| **self-healing** | Development | Auto-recovery from errors |
| **reflexion** | Quality | Self-review before delivery |
| **review-claudemd** | Quality | Audit CLAUDE.md for quality |
| **security** | Quality | Security review protocol |
| **cost-reducer** | Quality | Token/resource optimization |
| **auto-plan** | Quality | Automatic planning protocol |
| **researcher** | Research | Deep research methodology |
| **know-me** | Research | Client/user profiling |
| **deep-search** | Research | Comprehensive search protocol |
| **create-skill** | Meta | Template for creating new skills |

---

## 8. SLASH COMMANDS (7)

All defined in CLAUDE.md. **None created yet** in `.claude/commands/`.

| Command | Intended Purpose |
|---------|-----------------|
| `/scaffold` | Generate project boilerplate (LP, dashboard, etc.) |
| `/deploy` | Publish to Vercel/Netlify |
| `/review-code` | Code quality review |
| `/new-client` | Initialize new client project |
| `/session-report` | Generate session summary |
| `/audit` | Full project audit (Lighthouse, UX, security) |
| `/conteudo` | Content generation workflow |

---

## 9. TOOLS & UTILITIES

### screenshot.js
- **Purpose:** Captures full-page screenshots at specified viewport width
- **Usage:** `node screenshot.js <url> <filename.png> <width>`
- **Example:** `node screenshot.js https://example.com mobile.png 375`
- **Output:** Saves to `entregas/` directory
- **Engine:** Playwright + Chromium
- **Required viewports:** 375px (mobile) + 1280px (desktop)

### test-supabase.js
- **Purpose:** Tests Supabase connection using .env credentials
- **Usage:** `node test-supabase.js`
- **Queries:** `memoria_temporaria_claude` table
- **Status:** Connection works, but table not yet created in correct project

---

## 10. SUPABASE BACKEND

### Connection
- **Project ID:** `qmlmbjaolmmwujfrxcpa`
- **Account:** dockplusai@gmail.com
- **Config:** `.env` file with SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_PROJECT_ID

### Planned Schemas

#### Schema: `agente_dev` (agent state)
| Table | Purpose | Status |
|-------|---------|--------|
| `agente_dev.projetos` | Active client projects | NOT CREATED |
| `agente_dev.sessoes` | Session logs per agent | NOT CREATED |

#### Schema: `memoria` (agent memory)
| Table | Purpose | Status |
|-------|---------|--------|
| `memoria_temporaria_claude` | Temporary agent memory | NOT CREATED (exists in wrong project) |

### Known Issues
- Table `memoria_temporaria_claude` was created in wrong project (carousel-bot)
- Needs `service_role` key to create schemas/tables in correct project
- MCP connection via Gmail account connects to carousel-bot (wrong)
- `.env` connection connects to correct project (qmlmbjaolmmwujfrxcpa)

---

## 11. MEMORY SYSTEM

### Claude Code Memory (`.claude/` based)
- **MEMORY.md:** Index file — currently empty
- **Memory directory:** `~/.claude/projects/c--Users-dockp-agente-sites/memory/`
- **Status:** No memories saved yet

### Supabase Memory (planned)
- Agent signature: `agente = 'dev'`
- Write triggers: technical decision made, site delivered, recurring pattern/error
- **Status:** Not operational — schema not created yet

### Session Notes
- **memoria.mentoria.md:** Manual session log (Session 01 documented)

---

## 12. CONFIGURATION

### .claude/settings.json
```json
{ "theme": "dark-blue" }
```

### .claude/settings.local.json
```json
{
  "permissions": {
    "allow": ["Edit(/.claude/skills/strategic-compact/**)"]
  }
}
```

### .vscode/settings.json
Dark blue color scheme for VS Code (title bar, activity bar, sidebar, status bar, editor, tabs, panel, terminal).

### .env
```
SUPABASE_URL=https://qmlmbjaolmmwujfrxcpa.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_PROJECT_ID=qmlmbjaolmmwujfrxcpa
```

---

## 13. WORKFLOW — HOW IT ALL CONNECTS

```
User Request
    │
    ▼
CLAUDE.md (Master Agent)
    │
    ├── Identify task type
    │
    ├── Dispatch sub-agent (if applicable)
    │   ├── landing-page-specialist → LP builds
    │   ├── copy-specialist → text/copy
    │   ├── dashboard-specialist → data viz
    │   ├── crm-specialist → database
    │   └── deploy-specialist → publish
    │
    ├── Apply skills
    │   ├── taste-skill → calibrate design
    │   ├── frontend-design → build UI
    │   ├── systematic-debugging → fix bugs
    │   └── ... (25 skills available)
    │
    ├── Execute
    │   ├── Code generation (HTML/Tailwind/React/Next.js)
    │   ├── Screenshots (screenshot.js @ 375px + 1280px)
    │   └── Lighthouse audit
    │
    ├── Quality gate
    │   ├── /reflexion → self-review
    │   ├── ui-ux-pro-max-skill → UX audit
    │   └── BEFORE/AFTER comparison
    │
    ├── Deliver
    │   ├── What was done
    │   ├── How to test
    │   ├── What's missing
    │   └── Next step
    │
    └── Save state → Supabase (agente_dev schema)
```

---

## 14. COMPLETION STATUS

### DONE
- [x] Project directory structure
- [x] CLAUDE.md — master agent instructions (80 lines)
- [x] CONTEXT.md — project context & Supabase IDs
- [x] screenshot.js — Playwright screenshot utility (tested)
- [x] test-supabase.js — Supabase connection test
- [x] package.json with dependencies
- [x] .env with Supabase credentials
- [x] VS Code dark blue theme
- [x] 25 skill directories created
- [x] 10 skills filled with content
- [x] memoria.mentoria.md — Session 01 documented

### PENDING
- [ ] Complete ui-ux-pro-max-skill content (was cut off)
- [ ] Fill 15 remaining empty skills
- [ ] Create 5 sub-agents in `.claude/agents/`
- [ ] Create 7 slash commands in `.claude/commands/`
- [ ] Obtain Supabase `service_role` key
- [ ] Create `agente_dev` schema + tables in Supabase
- [ ] Create `memoria` schema + tables in Supabase
- [ ] Configure hooks in `.claude/hooks/`
- [ ] Expand `.claude/settings.json` (permissions, env)
- [ ] Initialize git repository
- [ ] Test full workflow: skill → sub-agent → delivery → screenshot
- [ ] Replace placeholders: [NOME DA SUA EMPRESA], [SUA EMPRESA], [SEU_PROJECT_ID]

---

## 15. PRIORITY ROADMAP

### Phase 1 — Foundation (next session)
1. Replace all placeholders with actual company info
2. Get Supabase `service_role` key
3. Create schemas + tables in Supabase
4. Initialize git repo + first commit

### Phase 2 — Skills (1-2 sessions)
5. Fill 15 empty skills (priority: reflexion, landing-page-advanced, humanizer, beautiful_prose, security)
6. Complete ui-ux-pro-max-skill

### Phase 3 — Agents & Commands (1-2 sessions)
7. Create 5 sub-agent files in `.claude/agents/`
8. Create 7 slash command files in `.claude/commands/`
9. Configure hooks

### Phase 4 — Integration (1 session)
10. Test full workflow end-to-end
11. First real client LP build
12. Validate delivery standard

---

## 16. QUICK REFERENCE

| What | Where |
|------|-------|
| Master config | `CLAUDE.md` |
| Project context | `CONTEXT.md` |
| Skills | `.claude/skills/<name>/SKILL.md` |
| Sub-agents | `.claude/agents/` (pending) |
| Slash commands | `.claude/commands/` (pending) |
| Screenshots tool | `screenshot.js` |
| Screenshot output | `entregas/` |
| Supabase test | `test-supabase.js` |
| Environment vars | `.env` |
| Session notes | `memoria.mentoria.md` |
| Memory index | `MEMORY.md` |
| Theme config | `.vscode/settings.json` |
| Claude settings | `.claude/settings.json` |

---

*Generated: 2026-04-16 | Agent: dev | Project: agente-sites*
