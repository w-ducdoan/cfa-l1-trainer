---
type: project-readme
workstation: Finance Technicals HQ
last_updated: 2026-10-27
---

# CFA L1 Trainer

Private practice site for the CFA Level I exam (May 2027 window), built from the official 2027 curriculum (10 volumes). Phase 1 covers the full end-of-module question bank, daily spaced-repetition sessions, a curriculum map with learning-outcome checklists, and an error notebook.

- **Live (private):** the claude.ai artifact. Progress syncs to Duc's account. Republish to the same URL so progress carries over.
- **Repo (private):** `w-ducdoan/cfa-l1-trainer`. GitHub Pages stays off: the curriculum is "for candidate use only, not for distribution", and Pages sites are public.
- **Offline:** open `dist/index.html` in a browser. Progress saves in that browser only.

## What is in it

| Piece | Where |
| :-- | :-- |
| Question bank (questions, A/B/C options, answer key, curriculum solutions, item sets, LOS, module overviews) | `data/bank.json` |
| Exhibits, tables and equations clipped from the PDFs | `data/img/*.png` |
| Extraction warnings to check by hand | `data/report.txt` |
| App (UI, spaced repetition, sync) | `src/app.js`, `src/style.css` |
| Built site | `dist/` |

## Rebuild

1. Put the curriculum PDFs (`cfa-program2027L1V1.pdf` ... `V10.pdf`) in `~/Downloads`. They never go in the repo.
2. `python -P tools/extract.py` (needs PyMuPDF; the first run takes ~6 minutes, later runs use `tools/.cache/`).
3. `python build.py`
4. Republish `dist/page.html` to the same artifact URL, with `bank.js` and `img/*.js` as supporting files.
5. Commit and push.

## How scheduling works

Each answer is locked in with a confidence level (sure, unsure, guess). A miss comes back tomorrow and once more later in the same session. A right answer marked sure moves out fastest; a right guess is scheduled like a near miss. Module status (Learning, Solid, Mastered) comes from coverage, accuracy and review intervals. "Points at risk" on the Today screen is exam weight times the share of the topic not yet mastered.

## Roadmap

1. Question bank, Today, curriculum map, practice engine, spaced repetition, sync, error notebook (done)
2. Calculation generators, formula sheet and flashcards, BA II Plus reference, Ethics lab
3. Topic tests, full 180-question mocks, analytics dashboard
4. Module briefings, Ask Claude explanations
