---
name: deep-search
description: Structured web research protocol that retrieves, cross-references, and validates information from authoritative sources before any claim reaches the user. Use when verifying technical claims about platforms (Meta, Google, Supabase), API changes, benchmark values, or any post-2024 platform behavior.
---

# SKILL: deep-search | Priority: 1
Source: AutomatEasy internal — built for AutomatEasy agent suite

## IDENTITY
A structured web research protocol that retrieves, cross-references, and validates information from authoritative sources before any claim reaches the user.

## WHEN TO USE
Trigger this skill when:
- Any technical claim about a platform (Meta, Google, TikTok, GTM, N8n, Supabase) needs verification
- User asks about algorithm behavior, API changes, benchmark values, or platform policies
- Agent is about to write a number, percentage, or metric into a deliverable
- A feature or system the agent does not recognize with 100% certainty is mentioned
- User explicitly calls /quick, /standard, or /deep
- Agent detects its training data may be stale on the topic (post-2024 platform changes especially)

Do NOT trigger for:
- Stable fundamentals (HTML, CSS, SQL syntax, basic JS)
- Information already verified and cited within the same session
- Simple arithmetic or logic with no external dependency

## OPERATION MODES

### /quick
- 1-2 sources minimum
- Scan headlines and summaries only
- Acceptable for: confirming a fact already known, quick date/version check
- Time budget: under 60 seconds of research
- Output: single-sentence answer + 1 citation

### /standard (default)
- 2-3 sources minimum, at least 1 official
- Read key sections of each source
- Acceptable for: platform behavior, algorithm descriptions, benchmark ranges
- Time budget: 3-5 minutes of research
- Output: structured answer with source list and confidence level

### /deep
- 4+ sources minimum, 2+ must be official (engineering blogs, API docs, release notes)
- Cross-reference all claims across sources
- Flag any contradictions found between sources
- Acceptable for: writing knowledge base content, auditing agent files, producing reference docs
- Time budget: 10-20 minutes of research
- Output: full report with source table, confidence per claim, contradiction log

## WHAT IT DOES

### Source hierarchy (always follow this order)
1. Official engineering blogs (engineering.fb.com, developers.google.com, developer.tiktok.com)
2. Official API documentation and release notes
3. Official help centers (support.google.com, business.facebook.com/help)
4. Specialized industry publications (Search Engine Land, Social Media Examiner, MarTech)
5. Independent researchers with cited primary sources
6. General tech blogs (use only when 1-4 unavailable; flag explicitly)

### Per mode behavior
- /quick → fetch top result from tier 1-2, extract relevant sentence, cite
- /standard → fetch 2-3 results from tier 1-3, synthesize, flag if only tier 4-5 available
- /deep → fetch 4+ results spanning tier 1-3, cross-reference, produce contradiction log

## EMBEDDED KNOWLEDGE

### High-churn domains (always use /standard minimum, prefer /deep)
- Meta Ads algorithm (Andromeda, GEM — changed Nov/2025)
- Meta Graph API targeting rules (changed Feb/2026 — detailed targeting now suggestion only)
- Google Ads Smart Bidding signals and auction mechanics
- TikTok discovery algorithm and search ranking (growing rapidly)
- GTM Server-Side container behavior
- N8n node API (breaking changes between minor versions)

### Known critical facts to validate if cited
- Meta Andromeda = retrieval system (pre-auction filter), NOT the auction formula
- GEM = scoring model after Andromeda (launched Nov/2025)
- Entity ID = unique per creative concept, not per ad variation
- Creative Similarity + Creative Fatigue flags = available in Meta Ads Manager 2026
- CPMr = most accurate fatigue metric (not just frequency > 4)
- Meta Graph API v25.0 (Feb/2026): detailed targeting = suggestion, not restriction
- Cialdini = 7 principles (Unity added 2016, not 6)
- TikTok completion rate benchmark 2026: >50% excellent, <25% critical
- TikTok CPM Brazil: <R$35 excellent (NOT <R$25)

## DECISION TREE

IF claim involves platform algorithm or auction mechanics
  → use /deep, prioritize official engineering blog

IF claim involves a benchmark (CPM, CTR, ROAS, completion rate, EMQ)
  → use /standard minimum, cross-reference 2+ sources, declare date of data

IF claim involves a recent API change or new feature (post-Aug/2025)
  → use /deep, check official release notes first

IF source found is tier 4-5 only
  → flag explicitly: "Only secondary sources available — treat as unconfirmed"

IF sources contradict each other
  → flag contradiction, show both versions, recommend which to trust and why

IF topic is stable (syntax, fundamentals, math)
  → skip skill entirely

## STEP-BY-STEP PROTOCOL

1. Identify the claim to be validated
2. Classify domain (platform, benchmark, algorithm, API, general)
3. Select mode based on domain churn level and stakes
4. Query source tier 1 first — if sufficient, stop there
5. If tier 1 unavailable or insufficient, descend to tier 2, then 3
6. Extract relevant sentence/passage from each source
7. Cross-reference: do all sources agree? If not → log contradiction
8. Assign confidence level: HIGH (2+ tier-1 sources agree) / MEDIUM (tier-2 corroborates tier-1) / LOW (tier 3-5 only)
9. Format output per mode specification
10. NEVER update agent files with LOW-confidence claims without explicit approval from Raphael

## INTERDEPENDENCIES

Run BEFORE:
- Any write to CONTEXT.md, CLAUDE.md, or docs/ with factual claims
- Any benchmark value inserted into a client report
- Any platform algorithm description in a subagent knowledge base

Run AFTER:
- sql-expert (when validating Supabase query behavior)
- analytics-tracking (when verifying GTM/GA4 specs)

## FAILURE MODES

| Failure | Detection | Fix |
|---|---|---|
| Source returns 404 or paywalled | No content extracted | Descend one tier, log unavailability |
| Sources contradict each other | Conflicting numbers/descriptions | Show both, flag, ask Raphael for decision |
| Training data used instead of search | No citation in output | Always require citation — if none found, say so explicitly |
| Stale data (pre-2025) used for high-churn domain | Source date > 12 months | Flag as potentially outdated, search for newer |
| Tier-5 blog used as primary | Source without citations | Flag as "unverified — secondary source only" |

## OUTPUT CHECKLIST

- [ ] Mode declared (/quick, /standard, /deep)
- [ ] Minimum source count met for selected mode
- [ ] At least 1 official source (tier 1-2) used or absence flagged
- [ ] Each claim has a citation (source name + URL + date accessed)
- [ ] Confidence level declared (HIGH / MEDIUM / LOW)
- [ ] Contradictions logged if any
- [ ] No LOW-confidence claim written to any file without Raphael approval

## PROHIBITED

- NEVER cite a source without having read it
- NEVER use training memory alone for platform algorithm descriptions — always search
- NEVER write benchmark values without a source and date
- NEVER update agent knowledge base files with unverified claims
- NEVER suppress a contradiction to simplify the output — always surface it
- NEVER treat a tier-4/5 source as confirmed — always flag
- NEVER execute a file write based on research findings without Raphael explicit approval
