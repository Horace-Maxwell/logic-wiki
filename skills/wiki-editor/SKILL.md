---
name: wiki-editor
description: Write or revise Logic Wiki bilingual educational content using pinned Humanizer rules, academic source checks, and semantic review. Applies to reader-visible prose and UI labels in this project.
---

# Bilingual logic editor

Read `../../vendor/humanizer/en/SKILL.md` for English and `../../vendor/humanizer/zh/SKILL.md` for Chinese. Preserve the upstream copies. This project uses a neutral educational voice.

1. Identify the actual source passage and access scope. Reconstruct its claim before writing. Mark invented teaching examples as original examples.
2. Draft accurate Chinese. Edit with the Chinese Humanizer, then compare against the factual draft. Do the same for English against the approved conceptual content.
3. Compare both languages: negation, quantifier scope, sufficient versus necessary conditions, modal strength, numbers, citations, case facts, and answers must agree. Paragraphs need not match sentence for sentence.
4. Keep source quotations, formulas, metadata, link targets, and IDs unchanged during style editing. Keep established terminology even when it repeats. Distinguish argument soundness from proof-system soundness.
5. Preserve explanatory contrasts, proof lists, genuine qualifications, and the site's useful section structure. Do not introduce personality, invented experience, rhetorical certainty, or random variation. Flag weak patterns only in context.
6. Record concrete review findings, resolutions, scope, and executor type. Issue a receipt only for content actually reviewed. Read the review tool help before recording a batch; content hashes are checked at build time.

Style scanning is advisory evidence. A clean score does not establish authorship, naturalness, truth, or translation equivalence. Unresolved findings block publication; justified exceptions must identify the affected passage and reason.
