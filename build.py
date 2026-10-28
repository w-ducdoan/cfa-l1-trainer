"""Build the CFA L1 Trainer from src/ and data/.

Run:  python build.py
Writes dist/:
  page.html         page body published as the claude.ai artifact (account sync). The question bank is
                    inline; the viewer blocks script files, so exhibit images are fetched from img/*.json.
  img/<topic>.json  exhibit and equation images for one topic, published alongside page.html
  index.html        standalone copy with everything inline: open it from disk to use offline
"""
import base64, io, json, pathlib
from PIL import Image

here = pathlib.Path(__file__).resolve().parent
src, data, dist = here / 'src', here / 'data', here / 'dist'
(dist / 'img').mkdir(parents=True, exist_ok=True)
for old in list(dist.glob('*.js')) + list((dist / 'img').glob('*.js')): old.unlink()

bank = json.loads((data / 'bank.json').read_text(encoding='utf-8'))

# lessons: original writing in lessons/<topic>.md, parsed into HTML here
import sys
sys.path.insert(0, str(here / 'tools'))
import lessons as lessons_md
bank['lessons'] = {}
for f in sorted((here / 'lessons').glob('*.md')):
    bank['lessons'].update(lessons_md.parse(f.read_text(encoding='utf-8')))
unknown = [k for k in bank['lessons'] if k not in {m['id'] for m in bank['modules']}]
if unknown: raise SystemExit(f'lessons for unknown modules: {unknown}')
inline_json = lambda obj: json.dumps(obj, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
bank_js = 'window.CFA_BANK=' + inline_json(bank) + ';'

# images: 16-level grayscale PNGs keep text crisp at a fraction of the size
topic_of_vol = {t['vol']: t['id'] for t in bank['topics']}
packs = {t['id']: {} for t in bank['topics']}
for f in sorted((data / 'img').glob('*.png')):
    im = Image.open(f).convert('L').quantize(colors=16)
    buf = io.BytesIO(); im.save(buf, 'PNG', optimize=True)
    vol = int(f.name[1:f.name.index('m')])
    packs[topic_of_vol[vol]][f.name] = 'data:image/png;base64,' + base64.b64encode(buf.getvalue()).decode()
for t, imgs in packs.items():
    (dist / 'img' / f'{t}.json').write_text(json.dumps(imgs, separators=(',', ':')), encoding='utf-8')
all_imgs = {k: v for imgs in packs.values() for k, v in imgs.items()}

fonts = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
         '<link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&family=Source+Serif+4:opsz,wght@8..60,300;8..60,400&display=swap" rel="stylesheet">\n')
style = '<style>\n' + (src / 'style.css').read_text(encoding='utf-8') + '\n</style>\n'
# gen.js and cards.js define window.CFA_GEN and window.CFA_FLASH, which app.js reads
app_js = '\n'.join((src / f).read_text(encoding='utf-8') for f in ('gen.js', 'cards.js', 'app.js'))
title = '<title>CFA L1 Trainer</title>\n'


def body(extra=''):
    return ('<div id="app"><p style="padding:24px">Loading the question bank…</p></div>\n'
            '<script>\n' + bank_js + '\n' + extra + '</script>\n<script>\n' + app_js + '\n</script>\n')


(dist / 'page.html').write_text(title + '<meta name="claude:viewport-fit-sides" content="cover">\n' + fonts + style + body(), encoding='utf-8')
(dist / 'index.html').write_text('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
    '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n' + title + fonts + style
    + '</head>\n<body>\n' + body('window.CFA_IMG=' + inline_json(all_imgs) + ';\n') + '</body>\n</html>\n', encoding='utf-8')

size = lambda p: f'{p.stat().st_size / 1e6:.1f} MB'
print(f'lessons: {len(bank["lessons"])} ({sum(len(l["checks"]) for l in bank["lessons"].values())} quick-check questions)')
print('built dist/: page.html', size(dist / 'page.html'), '| index.html', size(dist / 'index.html'),
      '| image packs', ', '.join(f'{t} {size(dist / "img" / (t + ".json"))}' for t in packs))
