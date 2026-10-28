"""Dump a study outline per module (headings, LOS, overview, summary text) to help write lessons.

Usage:  python -P tools/outline.py VOL OUT_DIR [--full MODULE_NUM ...]
Writes OUT_DIR/v<VOL>.txt. The output is curriculum text: keep it out of the repo.
--full dumps the whole text of the listed modules (used for the Code and Standards).
"""
import json, pathlib, re, sys
import pymupdf

ROOT = pathlib.Path(__file__).resolve().parent.parent
vol, out = int(sys.argv[1]), pathlib.Path(sys.argv[2])
full = set(int(x) for x in sys.argv[sys.argv.index('--full') + 1:]) if '--full' in sys.argv else set()
doc = pymupdf.open(pathlib.Path.home() / 'Downloads' / f'cfa-program2027L1V{vol}.pdf')
bank = json.loads((ROOT / 'data' / 'bank.json').read_text(encoding='utf-8'))
mods = {m['num']: m for m in bank['modules'] if m['id'].startswith(f'v{vol}m')}
toc = doc.get_toc()


def text(p0, p1):
    t = '\n'.join(doc[p].get_text() for p in range(p0 - 1, p1))
    t = re.sub(r'.*For candidate use only.*\n', '', t)
    return re.sub(r'\n{3,}', '\n\n', t)


lines = []
for i, (lvl, title, page) in enumerate(toc):
    if lvl != 2 or not title.startswith('Learning Module'): continue
    num = int(re.match(r'Learning Module (\d+)', title).group(1))
    end = next((t[2] for t in toc[i + 1:] if t[0] <= 2), doc.page_count + 1) - 1
    sub = [t for t in toc[i + 1:] if t[2] <= end]
    m = mods.get(num, {})
    lines += [f'\n=== LM {num}: {title.split(chr(9))[-1]} (pp. {page}-{end})', 'LOS:'] + [f'  - {l}' for l in m.get('los', [])]
    lines += ['OVERVIEW:'] + [f'  * {o}' for o in m.get('overview', [])] + ['HEADINGS:']
    lines += ['  ' * (l - 3) + f'  {t}' for l, t, p in sub if l <= 4 and not t.startswith('Example') and t not in ('Practice Problems', 'Solutions')]
    pp = next((t[2] for t in sub if t[1] == 'Practice Problems'), end + 1)
    summ = [(k, t) for k, t in enumerate(sub) if re.search(r'summary', t[1], re.I) and t[0] == 3]
    if summ:
        k, t = summ[-1]
        nxt = next((x[2] for x in sub[k + 1:] if x[0] <= 3), pp)
        lines += ['SUMMARY TEXT:', text(t[2], max(t[2], nxt - 1 if nxt > t[2] else t[2]))]
    if num in full:
        lines += ['FULL TEXT:', text(page, pp - 1)]
out.mkdir(parents=True, exist_ok=True)
(out / f'v{vol}.txt').write_text('\n'.join(lines), encoding='utf-8')
print(f'v{vol}: {len(lines)} lines -> {out / f"v{vol}.txt"}')
