---
name: humanizer
description: Removes AI-generated evidence from any text before delivery to the user. Mandatory last step for all copy, scripts, captions, and emails in Brazilian Portuguese.
---

# SKILL: humanizer | Priority: 9
Source: AutomatEasy internal

## IDENTITY
The mandatory quality filter — removes all evidence of AI generation before any delivery. Last step of all text produced by the agent.

## WHEN TO USE
ALWAYS — before delivering any copy, script, caption, or text to the user.
No exception. No shortcut. Last step before every text delivery.

## OPERATION MODES
- /quick → review most obvious AI tells, structure preserved (triage)
- /standard → full rewrite preserving structure and message (default for ads)
- /deep → deep rewrite with tone, rhythm, and voice adjustment (mandatory for UGC scripts)

## WHAT IT DOES
Removes signals that give away AI-generated text.

### Banned words in Brazilian Portuguese
"vale ressaltar" | "no que tange" | "sendo assim" | "diante do exposto" | "cabe destacar"
"em suma" | "outrossim" | "à medida que" (instead of "conforme") | "sobretudo" (overused)
"proporcionar" (overused) | "potencializar" | "otimizar" (overused)

### Universal banned words (English present in BR copy)
"mergulhar" | "navegar" | "crucial" | "fundamental" | "abrangente" | "robusto"
"alavancar" | "ecossistema" | "holístico" | "transformador" | "inovador" (generic)
"em conclusão" | "por fim" | "além disso" (overused) | "desta forma"

### Mechanical AI structures to eliminate
Lists where prose would flow better
Obvious and predictable transitions
Paragraphs of identical length
Overly formal tone for informal context
Complex subordinate clauses where the client would use simple, direct sentences

### What to replace with
Natural language with strategic imperfections
Varied rhythm: short and long sentences mixed
Tone calibrated to client profile (check memory/)
Slang and segment expressions when appropriate for the audience
Natural contractions: "não tem" instead of "não possui", "a gente" instead of "nós"

## EMBEDDED KNOWLEDGE
Detection tools (GPTZero, Originality.ai) identify statistical AI patterns.
Humanized texts pass these tools AND sound more authentic to humans.
Tone of voice is the main differentiator between good copy and generic copy — check memory/.
In Brazilian Portuguese: strategic informality is a differentiator, not an error.

## DECISION TREE
IF text < 100 words → /quick usually sufficient
IF ad copy for feed → /standard mandatory
IF UGC script → /deep (needs to sound like a real person talking on video)
IF email marketing → /standard + check voice consistency throughout the email
IF client has documented tone of voice → apply strictly from memory/[client]/tom-de-voz.md
IF client without documented tone → use neutral conversational + register detected preferences

## STEP-BY-STEP PROTOCOL
1. Receive text to humanize
2. Check memory/[client]/tom-de-voz.md (if exists)
3. Identify: flag words, mechanical structures, inadequate tone
4. Select mode: quick | standard | deep
5. Completely rewrite in the selected mode
6. Voice test: read aloud — does it sound like a real person?
7. IF it doesn't sound natural → iterate one more time before delivering
8. Deliver humanized version with note of applied mode

## INTERDEPENDENCIES
Always AFTER any copy generation skill
beautiful_prose: use together when text needs persuasive force beyond humanization

## OUTPUT CHECKLIST
- [ ] Zero AI flag words (PT-BR + universal)
- [ ] Structure varies between list and prose as natural context demands
- [ ] Tone consistent with client history
- [ ] Read aloud: sounds like a real person?
- [ ] Sentences of varying length (not all the same size)
- [ ] No obvious mechanical transitions

## FAILURE MODES
Overly technical/legal text → humanize without losing necessary precision
Undocumented tone of voice → register detected preferences after user approval
Very short text (< 20 words) → apply /quick and check context

## PROHIBITED
Delivering any text without applying this skill.
Using words listed in the "banned words" sections in any delivery.
Humanizing while preserving AI mechanical structure by only swapping synonyms.
