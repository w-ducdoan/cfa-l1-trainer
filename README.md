---
type: project-readme
workstation: Finance Technicals HQ
last_updated: 2026-10-27
---

# CFA L1 Trainer

Private prep site for the CFA Level I exam (May 2027 window), built from the official 2027 curriculum (10 volumes). It uses the same visual system as the [[Academia HQ/_archive/FIN 4453 Exam 2 Trainer (built for Hanh Duc)/README|FIN 4453 trainer]]: deck-style pages, an at-a-glance band, Learn / Practice / Rehearse boxes, and a source line on every question and stat.

- **Live (private):** https://claude.ai/artifact/5UMxHRs6Pwi2Tqkj6c2c3h. Progress syncs to Duc's account. Republish to the same URL so progress carries over.
- **Repo (private):** `w-ducdoan/cfa-l1-trainer`. GitHub Pages stays off: the curriculum is "for candidate use only, not for distribution", and Pages sites are public.
- **Offline:** open `dist/index.html` in a browser. Progress saves in that browser only.

## What is in it

| Tab | What it does |
| :-- | :-- |
| Home | Greeting with this week's plan, at-a-glance band (readiness, questions answered, modules passed, level, streak), Learn / Practice / Rehearse boxes, points at risk by topic, 14-day activity, level progress, mini mastery map, recent misses, settings and backup |
| Study plan | Every module once in curriculum order, paced by page count against ~300 hours; first pass ends 8 weeks before the exam, then review, mocks and a light final week. Unpassed modules from past weeks carry into this week. |
| Lessons | One per module, in `lessons/<topic>.md` (original writing): exam takeaway, plain English, formulas, worked example, traps, 4-question quick check. All 10 topics, 102 lessons (one per study module), 408 check questions; the build shuffles each question's options so answers don't cluster on one letter. Format is documented in `tools/lessons.py`. |
| Mastery map | One block per learning outcome (339): not started, started, solid, gold. Click a block for its outcome, matched questions and a drill. |
| Module quizzes | Every module's end-of-chapter questions in practice mode (solution after each answer) or timed mode (1:30 a question, navigator, flags, results at the end). Pass mark 70%. Each module has its own page with overview, outcomes and quiz history. |
| Exams | **Full mocks**: 180 questions in two timed sessions of 90 (2h15 each) with a break; weighted by exam weight; held-back questions first, then never-answered, then longest-unseen; standalone questions first, item-set questions (with their case) fill short topics such as Derivatives. Pause any time: the run and clock are saved in the browser (`cfa-l1-mock-run`). **Topic tests**: up to 30 questions per topic at 1:30 each, spread across modules, never using the mock reserve. Results break down by topic or module against a 70% rule-of-thumb line. |
| Analytics | Projected score with a 95% sample-size range (latest mock, else exam-weighted accuracy in topics with 10+ answers), accuracy and pace by topic, confidence check (right when sure/unsure/guess), timed-score history, reasons for misses, weekly practice time. |
| Daily review | Spaced repetition: due reviews plus new questions from this week's modules. |
| Error notebook | Misses and lucky guesses, tagged concept / calculation / misread. |

| Data | Where |
| :-- | :-- |
| Question bank: questions, options, answer key, curriculum solutions, item sets, printed page, matched LOS, mock reserve flag; LOS and module overviews | `data/bank.json` |
| Exhibits, tables and equations clipped from the PDFs | `data/img/*.png` |
| Extraction warnings to check by hand | `data/report.txt` |
| App | `src/app.js`, `src/style.css` |
| Built site | `dist/` |

## Rebuild

1. Put the curriculum PDFs (`cfa-program2027L1V1.pdf` ... `V10.pdf`) in `~/Downloads`. They never go in the repo.
2. `python -P tools/extract.py` (needs PyMuPDF; the first run takes ~6 minutes, later runs use `tools/.cache/`).
3. `python build.py`
4. Republish `dist/page.html` to the same artifact URL, with `img/*.json` as supporting files. The artifact viewer blocks script files (inline scripts and a few CDNs only), so the bank is inlined and images are fetched as JSON. `python -P tools/csp_serve.py` serves `dist/` under a similar policy to catch this locally; use `index.html` there to test phone widths, since `page.html` relies on the viewer for its viewport tag.
5. Commit and push.

## How the numbers work

- **Scheduling:** each answer is locked in as sure, unsure or guess. A miss returns tomorrow (and once more in the same daily review); a sure answer spaces out fastest; a right guess is scheduled like a near miss.
- **Mastery blocks:** questions are matched to the outcome whose wording they share most (TF-IDF), because the curriculum doesn't label them. Solid = half the matched questions answered at 75%+; gold = all answered at 85%+ with reviews spaced two weeks or more. Outcomes with no matched question can be ticked off by hand.
- **Readiness:** the average block score per topic, weighted by exam weight (midpoints of CFA Institute's ranges). "At risk" = weight × the share not yet mastered.
- **Mock reserve:** 125 questions (about a quarter of any module, standalone multiple choice only) are held out of practice for the Phase C mocks. Ethics, Derivatives and Corporate Issuers can't spare more without gutting their quizzes.
- **XP:** 10 per right answer, 3 per attempt, 25 per finished module quiz, 50 more the first time a module passes.

## Roadmap

- **A. Shell, Home, study plan, mastery map, module quizzes** (done)
- **B.** Lessons for all 102 study modules (done). `tools/outline.py` dumps a module's headings, outcomes and summary to the scratchpad as a writing aid (curriculum text: keep it out of the repo).
- **C.** Topic tests, full mocks, analytics page (done). Mocks currently top up from never-answered and item-set questions; Phase D's calculation generators can add fresh questions once the bank is exhausted.
- **D.** Calculation generators, formula flashcards, Ethics casebook, Ask Claude
