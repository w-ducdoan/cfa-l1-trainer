"""Build the CFA L1 Trainer from src/ and data/.

Run:  python build.py
Writes dist/:
  page.html       page body published as the claude.ai artifact (account sync)
  index.html      standalone copy: open it from disk to use offline (progress stays in that browser)
  bank.js         the question bank (window.CFA_BANK)
  img/<topic>.js  exhibit and equation images, one pack per topic (window.CFA_IMG)
"""
import base64, io, json, pathlib
from PIL import Image

here = pathlib.Path(__file__).resolve().parent
src, data, dist = here / 'src', here / 'data', here / 'dist'
(dist / 'img').mkdir(parents=True, exist_ok=True)

bank = json.loads((data / 'bank.json').read_text(encoding='utf-8'))
(dist / 'bank.js').write_text('window.CFA_BANK=' + json.dumps(bank, ensure_ascii=False, separators=(',', ':')) + ';\n', encoding='utf-8')

# images: 16-level grayscale PNGs keep text crisp at a fraction of the size
topic_of_vol = {t['vol']: t['id'] for t in bank['topics']}
packs = {t['id']: {} for t in bank['topics']}
for f in sorted((data / 'img').glob('*.png')):
    im = Image.open(f).convert('L').quantize(colors=16)
    buf = io.BytesIO(); im.save(buf, 'PNG', optimize=True)
    vol = int(f.name[1:f.name.index('m')])
    packs[topic_of_vol[vol]][f.name] = 'data:image/png;base64,' + base64.b64encode(buf.getvalue()).decode()
for t, imgs in packs.items():
    (dist / 'img' / f'{t}.js').write_text('Object.assign(window.CFA_IMG=window.CFA_IMG||{},' + json.dumps(imgs, separators=(',', ':')) + ');\n', encoding='utf-8')

fonts = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
         '<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Newsreader:opsz,wght@6..72,500;6..72,600&family=Public+Sans:wght@400;600;700&display=swap" rel="stylesheet">\n')
style = '<style>\n' + (src / 'style.css').read_text(encoding='utf-8') + '\n</style>\n'
app = ('<div id="app"><p style="padding:24px">Loading the question bank…</p></div>\n<script src="bank.js"></script>\n<script>\n'
       + (src / 'app.js').read_text(encoding='utf-8') + '\n</script>\n')
title = '<title>CFA L1 Trainer</title>\n'
(dist / 'page.html').write_text(title + '<meta name="claude:viewport-fit-sides" content="cover">\n' + fonts + style + app, encoding='utf-8')
(dist / 'index.html').write_text('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
    '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n' + title + fonts + style
    + '</head>\n<body>\n' + app + '</body>\n</html>\n', encoding='utf-8')

size = lambda p: f'{p.stat().st_size / 1e6:.1f} MB'
print('built dist/: page.html', size(dist / 'page.html'), '| bank.js', size(dist / 'bank.js'),
      '| images', ', '.join(f'{t} {size(dist / "img" / (t + ".js"))}' for t in packs))
