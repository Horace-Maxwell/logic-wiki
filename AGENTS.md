# Logic Wiki editorial requirements

For any reader-visible copy change, read `skills/wiki-editor/SKILL.md` and the appropriate pinned Humanizer skill before editing. These rules apply to Chinese, English, diagrams, exercises, and UI copy.

- Preserve negation, quantifiers, conditions, uncertainty, facts, citations, and technical terminology. Academic meaning overrides generic style advice.
- Every knowledge unit must have complete Chinese and English text. Use the same stable IDs for sections, facts, sources, and answers.
- Research and original teaching examples must be distinguished. Never invent a real quotation, source, reviewer, or claim of expert approval.
- Execute a language editing pass and a separate semantic comparison. Only record work actually performed. Agent review is not human or expert review.
- Review receipts bind the complete bilingual unit, sources, glossary, and Humanizer rules by hash. Changes invalidate receipts. Record findings and resolutions before issuing new receipts.
- Run `npm run content:check`, `npm test`, `npm run check`, and `npm run build`; verify reader flows in the actual browser preview.
- Keep publication local unless a remote destination is explicitly authorized.
