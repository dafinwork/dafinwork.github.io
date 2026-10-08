---
name: anti-slop
description: Comprehensive toolkit for detecting and eliminating "AI slop" — generic, low-quality AI-generated patterns in natural language, code, and design. Combines rules from no-ai-slop, stop-slop, and anti-slop (Smithery). Use when the user wants writing clearer, more direct, more opinionated, less AI-sounding, or asks whether writing/code/design reads as AI-generated.
metadata:
  trigger: Writing prose, editing drafts, reviewing content for AI patterns, cleaning code slop, reviewing design for generic AI aesthetics
  sources:
    - https://github.com/petergyang/no-ai-slop
    - https://github.com/hardikpandya/stop-slop
    - https://smithery.ai/skills/rand/anti-slop
---

# Anti-Slop (Unified)

Detect and eliminate generic AI-generated patterns ("slop") across **natural language**, **code**, and **design**. This skill merges three authoritative sources: **no-ai-slop** (Peter Yang), **stop-slop** (Hardik Pandya), and **anti-slop** (Smithery/rand).

## What is AI Slop?

AI slop refers to telltale patterns that signal low-quality, generic AI-generated content:

- **Text:** Overused phrases like "delve into," excessive buzzwords, meta-commentary, formulaic structures
- **Code:** Generic variable names, obvious comments, unnecessary abstraction, over-engineered patterns
- **Design:** Cookie-cutter layouts, generic gradients, overused visual patterns (glassmorphism, floating 3D shapes)

---

## Two Jobs

### Edit (Default)

The user shares a draft (text, code, or design description) to fix. Make the **minimum effective edit** with the rules below and return the edited output plus a **What changed** section.

### Detect

The user asks whether something is AI slop, or asks to audit/scan/flag without rewriting. For each pattern found:

1. **Name** the pattern from this skill
2. **Quote** the exact line
3. **Give the fix** in a few words

Do NOT rewrite, score, or guess whether AI wrote it. Named patterns are evidence the user can check. Offer to edit after.

### Generate (Fun/Satire)

User asks to "draft AI slop about [topic]." Generate maximum cringe AI slop as satire.

---

## What to Ask

If the user hasn't provided content, ask them to paste it.

If audience/format is unclear, ask: **"Who is this for and where will it be published?"**

If goal is unclear, ask: **"What should the reader think, feel, or do after reading this?"**

---

# PART 1: TEXT / PROSE RULES

## Editing Principles

1. **Preserve the writer's real voice.** Notice vocabulary, cadence, bluntness, humor, uncertainty, digressions, polish level. Keep traits that feel personal. Do NOT make every paragraph equally tidy.
2. **Make the minimum effective edit.** Fix AI patterns, errors, repetition, unclear passages. Leave strong human sentences alone.
3. **Lead with the point when setup adds nothing.** Cut generic throat-clearing. Keep personal asides/stories when they create context or character.
4. **Front-load only when it improves clarity.** Don't force every section into point-detail-background shape.
5. **Keep the user's meaning.** Don't invent claims, examples, stats, opinions. If unclear, ask.
6. **Open it up, don't dumb it down.** Keep substance, nuance, precision. Strip only what hurts readability: jargon, long sentences, abstract nouns, tangled structure.
7. **Use active voice.** "The team shipped it Tuesday" beats "the decision emerged." Never let inanimate things do human verbs.
8. **Make every sentence earn its place.** Cut empty qualifiers. Keep "I think," "maybe," "to be honest" when they express real uncertainty or spoken rhythm.
9. **Untangle sentences without flattening cadence.** Split when genuinely hard to follow. Keep longer spoken sentences/fragments when clear and characteristic.
10. **Be concrete and specific.** Abstraction is where writing goes to die. Names, numbers, dates, mechanisms, examples beat abstractions.
11. **Use the portability test.** If a sentence could move unchanged to another person/company/country/product → filler. Cut or replace with fact/example/mechanism/consequence/judgment specific to THIS subject.
12. **Always show, don't tell.** Make facts, actions, examples carry emphasis. Cut commentary that labels a point important/surprising/subtle/obvious.
13. **Protect specific facts.** Don't smooth details into generic importance. "Significantly improves productivity" → "cut review time from 30 min to 8."
14. **Make verbs do the work.** "Made a decision" → "decided." "Has the ability to" → "can."
15. **Know the job.** Before structure or word choice, know what the piece is trying to do and who it's for.
16. **Preserve useful edge and character.** Keep strong opinions, blunt language, humor, profanity, self-interruptions, honest admissions.
17. **Keep structure unless it's hurting the piece.** Preserve progression and detours when they carry personality. If reorganizing, explain why in "What changed."

---

## Words to Cut — Banned Outright

| Banned Word | Replace With |
|---|---|
| delve | examine, analyze |
| foster | build, grow, support |
| leverage | use |
| utilize | use |
| facilitate | enable, help, do |
| empower | let, allow, give |
| streamline | simplify, speed up |
| robust | solid, strong, reliable |
| cutting-edge | new, current |
| paradigm shift | major change |
| game changer | important, significant |
| tapestry | mix, combination |
| realm | area, field |
| beacon | signal, example |
| multifaceted | complex, varied |
| meticulous | careful, thorough |
| intricate | complex, detailed |
| paramount | critical, key |
| transformative | major, big |
| elevate | raise, improve |
| embark | start, begin |
| supercharge | speed up, boost |
| harness | use, apply |
| ever-evolving | changing |

### Business Jargon Replacements

| Avoid | Use Instead |
|---|---|
| Navigate (challenges) | Handle, address |
| Unpack (analysis) | Explain, examine |
| Lean into | Accept, embrace |
| Landscape (context) | Situation, field |
| Double down | Commit, increase |
| Deep dive | Analysis, examination |
| Take a step back | Reconsider |
| Moving forward | Next, from now |
| Circle back | Return to, revisit |
| On the same page | Aligned, agreed |
| Synergistic | Cooperative |

### Wordy Phrase Simplifications

| Wordy | Simple |
|---|---|
| in order to | to |
| due to the fact that | because |
| has the ability to | can |
| is able to | can |
| it is worth noting that | (delete) |
| at the end of the day | (delete) |
| when it comes to | (delete / restructure) |
| in today's world | (delete) |
| in the age of | (delete) |
| in terms of | (delete / use "for" or restructure) |
| with regard to | about, for |
| going forward | (delete) |
| in this article/post | (delete) |
| let's dive in | (delete) |

---

## Adverbs — Kill Aggressively

**Kill ALL adverbs as default.** No -ly words. No softeners, no intensifiers, no hedges.

### Primary Offenders (always cut unless carrying real emphasis)

really, just, literally, genuinely, honestly, simply, actually, deeply, truly, fundamentally, inherently, inevitably, interestingly, importantly, crucially, significantly, extremely, incredibly, remarkably, particularly, essentially, basically, totally, completely, absolutely, highly, rather, quite, fairly, somewhat, slightly, merely, purely, solely, arguably, reportedly, allegedly, supposedly, apparently, obviously, clearly, certainly, definitely, undoubtedly, naturally, of course

### Keep adverbs ONLY when they carry:
- Genuine uncertainty or contrast
- The writer's natural spoken rhythm
- Necessary technical precision (e.g., "electronically signed")

---

## Patterns to Cut — Structural Slop

### 1. Binary Contrasts ❌

**Pattern:** "This is not X. It's Y." / "The question isn't X, it's Y." / "It's not just X but Y."

**Fix:** State Y directly.

| Before | After |
|---|---|
| The question isn't the model. It's the eval. | The eval matters more than the model. |
| It's not a tool. It's a partner. | This tool works best as a partner. |
| Not because the tech is complex. Because people are complex. | Technology is manageable. People aren't. |

**All variants to catch:**
- "Not because X. Because Y."
- "[X] isn't the problem. [Y] is."
- "The answer isn't X. It's Y."
- "It feels like X. It's actually Y."
- "stops being X and starts being Y"
- "doesn't mean X, but actually Y"
- "is about X but not Y"
- "not just X but also Y"

### 2. Throat-Clearing Openers ❌

**Pattern:** Announcement phrases before the actual point.

**Cut these entirely:**
- "Here's the thing:"
- "Here's what [X]"
- "Here's why [X]"
- "The uncomfortable truth is"
- "It turns out"
- "The real [X] is"
- "Let me be clear"
- "The truth is,"
- "I'll say it again:"
- "I'm going to be honest"
- "Can we talk about"
- "Here's what I find interesting"

**Fix:** State the content directly. Delete the announcement.

### 3. Faux-Insight Setups ❌

**Pattern:** Flatters writer as lone expert before making claim.

**Cut these:**
- "This is the part most people skip"
- "What most people get wrong"
- "Here's what nobody tells you"
- "The part everyone misses"
- "What nobody tells you"

**Fix:** Make the claim stand on its own. "The part everyone misses: distribution is the real moat" → "Distribution is the moat."

### 4. Colon Reveals ❌

**Pattern:** Noun phrase + colon + lowercase dramatic reveal.

**Examples:**
- "The detail that makes it work: a separate agent grades it."
- "The best part: it learns."

**Fix:** Rewrite as plain sentence. Use colons only for lists, labels, quotes — not fake drama.

### 5. Superficial Analysis (-ing trailing clauses) ❌

**Pattern:** Trailing participle pretending to explain meaning.

**Offenders:** highlighting, underscoring, reflecting, showcasing, demonstrating, emphasizing, reinforcing, illustrating, signaling, suggesting, indicating

**Before:** "The launch adds file search, highlighting the team's commitment to better workflows"
**After:** "The launch adds file search, so users can find old drafts without leaving the editor."

### 6. Importance Puffery ❌

**Pattern:** Telling reader something is important instead of showing why.

**Cut these:**
- "Stands as a testament"
- "Marks a pivotal moment"
- "Plays a vital role"
- "Solidifies its position"
- "Underscores its significance"
- "Cannot be overstated"

**Fix:** State the fact. Let reader judge importance.

### 7. Interpretive Metadiscourse ❌

**Pattern:** Stepping outside subject to tell reader how to interpret.

**Cut these:**
- "That last part matters more than it sounds"
- "The key point is"
- "As you can see"
- "This distinction matters"
- "In other words" (when redundant)
- "Hint:"
- "Plot twist:" / "Spoiler:"

**Fix:** If point is clear, delete. Otherwise replace with facts/support already in content.

### 8. Weasel Attribution ❌

**Pattern:** Vague sourcing without naming.

**Cut these:**
- "Experts agree"
- "Industry reports suggest"
- "Many argue"
- "Widely regarded as"
- "Studies show"

**Fix:** Name the source or cut the claim. If user has no source, ask — don't invent one.

### 9. Fake-Strong Verbs ❌

**Pattern:** Fancy verb where simple "is"/"has"/"does" is clearer.

**Before:** "The app serves as a centralized hub for sponsor management"
**After:** "The app tracks sponsors, drafts, due dates, and approvals in one place."

### 10. Synonym Cycling ❌

**Pattern:** Rotating terms for style when one clear word works.

**Before:** "The agent reviews the draft. The assistant scores the piece. The tool suggests fixes."
**After:** "The agent reviews the draft, scores it, and suggests fixes."

**Rule:** If the clear word is right, repeat it.

### 11. Negative Listing ❌

**Pattern:** "Not a X. Not a Y. A Z."

**Fix:** Just say Z. Reader doesn't need the runway.

### 12. Dramatic Fragmentation ❌

**Patterns:**
- "[Noun]. That's it. That's the [thing]."
- "X. And Y. And Z."
- "Speed. Quality. Cost."

**Fix:** Complete sentences. Trust content over presentation.

### 13. Rhetorical Setups ❌

**Cut these:**
- "What if I told you..."
- "Think about it:"
- "Plot twist:"
- Self-answered "Question? Answer." pairs
- "And that's okay." (unnecessary permission)

**Fix:** Make the point directly.

### 14. Fake-Profound Kickers (Endings) ❌

**Pattern:** Final "deep" line that turns point into cute metaphor/aphorism/mic-drop.

**Fix:** DELETE it. End on clearest concrete sentence already in draft. If needing closure, add plain takeaway or next action. Do NOT rewrite into better metaphor.

### 15. Summary-Recap Endings ❌

**Cut these:**
- "In conclusion,"
- "Ultimately,"
- "Overall,"
- Final paragraph restating the piece

**Fix:** Reader was just there. End on last concrete point, takeaway, or next action.

### 16. Em Dashes ❌

**Rule:** Do NOT use as default rhythm crutch.
- Short copy: use NONE
- Longer drafts: 1–2 max if clearly beating commas/periods/parentheses
- Remove clusters and decorative dashes entirely

### 17. False Agency (Inanimate Things Doing Human Verbs) ❌

| Bad (inanimate = actor) | Good (human = actor) |
|---|---|
| A complaint becomes a fix | Someone fixed it |
| A bet lives or dies in days | Someone kills the project or ships it |
| The decision emerges | Someone decides |
| The culture shifts | People change behavior |
| The conversation moves toward | Someone steers it |
| The data tells us | Someone reads data and concludes |
| The market rewards | Buyers pay for things |

**Fix:** Name the human. If no specific person fits, use "you" to put reader in the seat.

### 18. Narrator-from-a-Distance ❌

**Pattern:** Floating above scene instead of putting reader in it.

| Bad | Good |
|---|---|
| Nobody designed this. | You don't sit down one day and decide to... |
| This happens because... | (Put reader in the scene) |
| People tend to... | You... |

### 19. Passive Voice ❌

**Rule:** Every sentence needs a subject doing something.

| Passive | Active |
|---|---|
| X was created | [Who] created X |
| It is believed that | [Who] believes that |
| Mistakes were made | [Who] made mistakes |
| The decision was reached | [Who] decided |

### 20. Sentence Starters to Avoid ❌

| Pattern | Fix |
|---|---|
| Sentences starting with What, When, Where, Which, Who, Why, How | Restructure — lead with subject or verb |
| Paragraphs starting with "So" | Start with content |
| Sentences starting with "Look," | Remove |

### 21. Robotic Rhythm ❌

**Avoid:**
- Repeated sentence shapes
- Identical paragraph structures
- Stacked punchy fragments
- Three-item lists (prefer two)
- Every paragraph ending punchily
- Metronomic sentence lengths

**Fix:** Vary shape and length — but only when it helps the point.

### 22. Formatting Slop ❌

- Emoji in headings → remove
- Bold sprinkled mid-sentence for emphasis → remove
- Bullet lists where two sentences of prose read better → convert
- Headers over two-sentence sections → remove header

### 23. Meta-Commentary (Self-Referential) ❌

**Cut these:**
- "The rest of this essay explains..."
- "Let me walk you through..."
- "In this section, we'll..."
- "As we'll see..."
- "I want to explore..."
- "But that's another post"
- "X is a feature, not a bug"
- "Dressed up as..."

### 24. Performative Emphasis ❌

**Cut these:**
- "Full stop." / "Period."
- "Let that sink in."
- "This matters because"
- "Make no mistake"
- "Here's why that matters"
- "creeps in"
- "I promise"
- "They exist, I promise"

### 25. Vague Declaratives ❌

**Pattern:** Announcing importance/deepness without specifics.

**Cut these:**
- "The reasons are structural"
- "The implications are significant"
- "This is the deepest problem"
- "The stakes are high"
- "The consequences are real"
- "This is genuinely hard"
- "This is what leadership actually looks like"

**Fix:** Name the specific thing, or cut.

### 26. Telling Instead of Showing ❌

**Pattern:** Announcing difficulty/significance rather than demonstrating it.

**Fix:** Show through facts, actions, examples, consequences.

---

## Quick Checks (Before Delivering Prose)

Run through this checklist every time:

- [ ] Any adverbs? Kill them.
- [ ] Any passive voice? Find actor, make them subject.
- [ ] Inanimate thing doing human verb? Name the person.
- [ ] Sentence starts with Wh- word? Restructure.
- [ ] Throat-clearing opener ("here's what/this/that")? Cut to point.
- [ ] Binary contrast ("not X, it's Y")? State Y directly.
- [ ] Three consecutive sentences same length? Break one.
- [ ] Paragraph ends with punchy one-liner? Vary it.
- [ ] Em-dash anywhere? Remove.
- [ ] Vague declarative? Name specific implication.
- [ ] Narrator-from-a-distance? Put reader in scene.
- [ ] Meta-joiner? Delete. Let piece move.
- [ ] Banned word present? Replace.
- [ ] Faux-insight setup? Cut. Let claim stand alone.
- [ ] Fake-profound ending? Delete. End on concrete point.
- [ ] Summary recap? Delete. Reader was there.

---

## Scoring System

Rate each dimension **1–10**:

| Dimension | Question |
|---|---|
| **Directness** | Statements or announcements? |
| **Rhythm** | Varied or metronomic? |
| **Trust** | Respects reader intelligence? |
| **Authenticity** Sounds human? |
| **Density** | Anything cuttable? |

**Total /50. Below 35: revise.**

---

## Workflow (Text)

1. Read the **full draft** before editing anything.
2. Identify **core point** and **voice traits** to preserve (vocabulary, cadence, bluntness, humor, uncertainty, digressions). If can't identify core point, ask user.
3. For **detect** request: return findings report (name pattern, quote line, give fix). Stop. Offer to edit.
4. For **edit**: make minimum effective changes.
5. Check edited draft against all quick checks above.
6. If any check fails, fix and re-check.
7. Output full edited draft + short **What changed** section.

---

# PART 2: CODE SLOP RULES

## High-Priority Targets

### Generic Variable Names → Rename

| Bad | Good |
|---|---|
| data | (name what data: users, requests, config) |
| result | (name what it contains: parsedOutput, matchedUsers) |
| temp | (name purpose: buffer, holdValue, swap) |
| item | (name type: user, row, product) |
| handleData() | (name action: validateInput, parseResponse) |
| processItems() | (name action: filterUsers, sortRows) |
| manageUsers() | (name action: approveUsers, banUsers) |

### Obvious Comments → Remove

```python
# BAD
# Create a user
user = User()

# GOOD - let code speak
user = User()
```

### Over-Engineered Code → Simplify

- Remove unnecessary abstraction layers
- Replace design patterns used without purpose
- Simplify complex implementations of simple tasks
- Remove factory/facade/builder when a function suffices

## Code Quality Principles

1. **Clarity over cleverness.** Write code easy to understand. Optimize only when profiling shows need.
2. **Meaningful names.** Variables describe content. Functions describe action + object. Classes describe responsibility.
3. **Appropriate documentation.** Document **why**, not **what**. Skip self-evident code. Focus on public APIs and complex logic.
4. **No generic abstractions.** Don't create interfaces/base classes "for future extensibility" that nobody needs yet.
5. **Concrete types.** Prefer specific types over generic `any`, `object`, `dict` when the shape is known.

## Code Slop Detection Checklist

- [ ] Variables named `data`, `result`, `temp`, `item`, `info`, `stuff`?
- [ ] Functions named `handle*`, `process*`, `manage*`, `do*`?
- [ ] Comments stating what code obviously does?
- [ ] Unnecessary abstraction layers (interfaces with one impl, factories creating one thing)?
- [ ] Design patterns used because they sound smart, not because they solve a problem?
- [ ] Overly generic error messages (`"An error occurred"`)?
- [ ] Magic numbers/strings without named constants?
- [ ] Dead code or commented-out blocks?

---

# PART 3: DESIGN SLOP RULES

## High-Priority Targets

### Visual Slop

| Pattern | Fix |
|---|---|
| Generic gradient backgrounds (purple/pink/cyan) | Use brand colors, flat, or intentional choice |
| Glassmorphism / neumorphism overuse | Use sparingly or not at all |
| Floating 3D shapes without purpose | Remove or tie to meaning |
| Every element using same design treatment | Vary by hierarchy/importance |

### Layout Slop

| Pattern | Fix |
|---|---|
| Template-driven layouts ignoring content | Design around actual content |
| Everything in cards regardless of type | Match container to content |
| Excessive whitespace without hierarchy | Create intentional visual rhythm |
| Center-alignment of all elements | Vary alignment by content type |

### Copy Slop

| Pattern | Fix |
|---|---|
| "Empower your business" headlines | Say what it actually does |
| Generic CTAs like "Get Started" | Be specific: "Start free trial", "See demo" |
| Buzzword-heavy descriptions | Use plain language |
| Stock photo aesthetics | Use real imagery or none |

## Design Quality Principles

1. **Content-first design.** Design around actual content needs. Create hierarchy based on importance.
2. **Intentional choices.** Every design decision should be justifiable. Use patterns because they serve users, not because they're trendy.
3. **Authentic voice.** Copy reflects brand personality. Avoid generic marketing speak. Be specific about value proposition.

## Design Slop Detection Checklist

- [ ] Generic gradient backgrounds?
- [ ] Glassmorphism/neumorphism without purpose?
- [ ] Floating decorative 3D shapes?
- - All elements styled identically?
- [ ] Content forced into card layout inappropriately?
- [ ] Excessive whitespace without hierarchy?
- [ ] Everything center-aligned?
- [ ] Generic marketing copy ("empower", "unlock", "leverage")?
- [ ] Non-specific CTAs?
- [ ] Stock photo aesthetic?

---

# PART 4: GENERAL PRINCIPLES (ALL DOMAINS)

## Prevention Over Cure

When creating content:
- Write with specific audience in mind
- Use concrete examples over abstractions
- Lead with the point, skip preambles
- Choose words for precision, not impression
- Review before considering complete

## Context-Aware Cleanup

Not all patterns are always slop. Acceptable exceptions:
- **Academic writing** may need hedging
- **Legal documents** require specific phrasing
- **Internal documentation** can use shortcuts
- **Technical docs** have domain conventions

Always consider: Who is the audience? What is the purpose? Does this pattern serve a function?

## Iterative Improvement Cycle

```
Detect → Analyze → Clean → Review → Refine
```

1. **Detect** — Run through pattern checklists or detection analysis
2. **Analyze** — Understand which patterns are truly problems in context
3. **Clean** — Apply fixes based on rules above
4. **Review** — Verify changes maintain meaning and voice
5. **Refine** — Fix remaining issues by hand

## Core Mantras

> **Quality > uniformity**
> **Context > rules**
> **Clarity > cleverness**
> **Specificity > generality**

---

## License

MIT — Derived from no-ai-slop (Peter Yang, MIT), stop-slop (Hardik Pandya, MIT), and anti-slop (rand/Smithery).
