"""Extract the CFA L1 question bank from the 2027 curriculum PDFs.

Usage:  python -P tools/extract.py [PDF_DIR]
        PDF_DIR defaults to ~/Downloads and must hold cfa-program2027L1V1.pdf ... V10.pdf

Writes:
  data/bank.json      topics, modules (LOS, overview), item sets, questions, solutions
  data/img/*.png      exhibits, tables and equations clipped from the PDF pages
  data/report.txt     extraction warnings to review by hand

The PDFs never go in the repo; only what this script derives from them.
Needs PyMuPDF (pip install pymupdf). Table detection is slow, so its results are
cached in tools/.cache/ (delete that folder to redo it).
"""
import json, re, sys, pathlib, collections
import pymupdf

ROOT = pathlib.Path(__file__).resolve().parent.parent
PDF_DIR = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path.home() / 'Downloads'
OUT = ROOT / 'data'
IMG = OUT / 'img'
CACHE = ROOT / 'tools' / '.cache'

# Exam weights are the midpoint of CFA Institute's published L1 ranges (percent).
TOPICS = [
    ('quant', 'Quantitative Methods', 1, 7.5),
    ('econ', 'Economics', 2, 7.5),
    ('corp', 'Corporate Issuers', 3, 7.5),
    ('fsa', 'Financial Statement Analysis', 4, 12.5),
    ('equity', 'Equity Investments', 5, 12.5),
    ('fi', 'Fixed Income', 6, 12.5),
    ('deriv', 'Derivatives', 7, 6.5),
    ('alts', 'Alternative Investments', 8, 8.5),
    ('pm', 'Portfolio Management', 9, 10.0),
    ('ethics', 'Ethical and Professional Standards', 10, 17.5),
]

HEAD_Y, FOOT_Y = 45, 772  # running header sits near y=56; the footer is only the copyright line, filtered by text
Q_START = re.compile(r'^(\d{1,3})\.(?:\s+(.*))?$')
OPT = re.compile(r'^([ABC])\.\s+(.*)$')
SET_MARK = re.compile(r'^The following information relates to', re.I)
SET_RANGE = re.compile(r'(\d{1,3})\s*(?:[-–—]|to|and)\s*(\d{1,3})')
ANS_LEAD = re.compile(r'^(?:The correct (?:response|answer) is\s+)?([ABC])(?:\s+is\s+(?:the\s+)?correct|[,.:]|\s)', re.I)
ANS_ANY = re.compile(r'\b([ABC]) is (?:the )?correct\b|correct (?:response|answer) is ([ABC])\b')
ZW = '​'

report = []
def warn(msg): report.append(msg)


def is_running_head(text, y0):
    """Running heads ('58 Learning Module 2 Title', 'Practice Problems 59') sit above y=66 in some volumes."""
    t = text.strip()
    return y0 < 66 and (re.fullmatch(r'\d{1,4}', t) is not None or re.match(r'^\d{1,4}\s', t) is not None or re.search(r'\s\d{1,4}$', t) is not None)


class Line:
    __slots__ = ('page', 'x0', 'y0', 'x1', 'y1', 'text', 'special')
    def __init__(self, page, bbox, text, special):
        self.page, (self.x0, self.y0, self.x1, self.y1), self.text, self.special = page, bbox, text, special


class Volume:
    def __init__(self, num):
        self.num = num
        self.doc = pymupdf.open(PDF_DIR / f'cfa-program2027L1V{num}.pdf')
        self.raw = {}
        words = collections.Counter()
        xs = {0: collections.Counter(), 1: collections.Counter()}
        # pages that hold practice problems or solutions: from each 'Practice Problems' bookmark to the next level-2 entry
        toc, qpages = self.doc.get_toc(), set()
        for i, (lvl, title, page) in enumerate(toc):
            if title == 'Practice Problems':
                end = next((t[2] for t in toc[i + 1:] if t[0] <= 2), self.doc.page_count + 1)
                qpages.update(range(page - 1, end - 1))
        for pno in range(self.doc.page_count):
            for b in self.doc[pno].get_text('dict')['blocks']:
                for l in b.get('lines', []):
                    t = ''.join(sp['text'] for sp in l['spans'])
                    words.update(w.lower() for w in re.findall(r'[A-Za-z]{3,}', t))
                    if pno in qpages and re.match(r'^\d{1,2}\.\s', t): xs[pno % 2][round(l['bbox'][0])] += 1
        self.words = words
        # question numbers sit at a fixed left margin that alternates between odd and even pages
        self.margin = {k: (c.most_common(1)[0][0] if c else 84) for k, c in xs.items()}
        self.cache_file = CACHE / f'tables-v{num}.json'
        try:
            self.tables = {int(k): [tuple(t) for t in v] for k, v in json.loads(self.cache_file.read_text()).items()}
        except (OSError, ValueError):
            self.tables = {}

    def printed(self, pno):
        """The page number printed in the running head (what a reader finds in the book), else the PDF page."""
        for b in self.doc[pno].get_text('dict')['blocks']:
            for l in b.get('lines', []):
                t = ''.join(s['text'] for s in l['spans']).strip()
                if l['bbox'][1] < 66:
                    t = re.sub(r'Learning Module \d+', '', t).strip()
                    m = re.fullmatch(r'(\d{1,4})', t) or re.match(r'^(\d{1,4})\s', t) or re.search(r'\s(\d{1,4})$', t)
                    if m: return int(m.group(1))
        return pno + 1

    def save_cache(self):
        CACHE.mkdir(exist_ok=True)
        self.cache_file.write_text(json.dumps(self.tables))

    def page_tables(self, pno):
        if pno not in self.tables:
            found = []
            try:
                for t in self.doc[pno].find_tables():
                    x0, y0, x1, y1 = t.bbox
                    if (x1 - x0) > 120 and (y1 - y0) > 18 and y0 > HEAD_Y: found.append((x0, y0, x1, y1))
                # a "table" that contains a question number on the question margin has swallowed a question
                starts = [z for z in self.page_lines(pno) if Q_START.match(z.text) and abs(z.x0 - self.margin[pno % 2]) <= 2.5]
                found = [t for t in found if not any(t[1] + 2 <= z.y0 <= t[3] - 2 and z.x0 < t[0] + 4 for z in starts)]
            except Exception as e:  # the table finder can fail on odd pages
                warn(f'V{self.num} p{pno + 1}: table detection failed ({e})')
            self.tables[pno] = found
        return self.tables[pno]

    def page_lines(self, pno, tables=()):
        """Body lines of one page: header/footer dropped, lines inside tables dropped, fragments merged.
        A line is 'special' when it is part of an equation or an unruled table (rendered as an image)."""
        out = []
        base = self.margin[pno % 2]
        for b in self.doc[pno].get_text('dict')['blocks']:
            for l in b.get('lines', []):
                text = ''.join(s['text'] for s in l['spans']).replace('\t', ' ')
                # a soft hyphen at the end of a line marks a word split across lines; keep it as a marker for join()
                text = text.rstrip()
                text = text[:-1].replace('­', '') + '­' if text.endswith('­') else text.replace('­', '')
                x0, y0, x1, y1 = l['bbox']
                if not text.strip() or y0 < HEAD_Y or y0 > FOOT_Y or 'For candidate use only' in text: continue
                if is_running_head(text, y0): continue
                if any(t[0] - 2 <= x0 and y0 >= t[1] - 2 and y1 <= t[3] + 2 for t in tables): continue
                math = ZW in text or '√' in text or re.fullmatch(r'[_\s]+', text) is not None
                text = re.sub(r'\s+', ' ', text.replace(ZW, ' ')).strip()
                out.append(Line(pno, l['bbox'], text, math or (x0 - base) > 36))
        out.sort(key=lambda z: (round(z.y0), z.x0))
        merged = []
        for z in out:
            if merged and abs(merged[-1].y0 - z.y0) < 2.5 and z.x0 > merged[-1].x0:
                m = merged[-1]; m.text += ' ' + z.text; m.x1 = max(m.x1, z.x1); m.special = m.special or z.special
            else:
                merged.append(z)
        return merged

    def lines(self, p0, p1):
        """Lines for pages p0..p1 (0-based, inclusive) with ('TABLE', page, bbox) markers in reading order."""
        seq = []
        for pno in range(p0, p1 + 1):
            tabs = self.page_tables(pno)
            items = [(z.y0, 0, z) for z in self.page_lines(pno, tabs)] + [(t[1], 1, ('TABLE', pno, t)) for t in tabs]
            items.sort(key=lambda it: (it[0], it[1]))
            seq += [it[2] for it in items]
        return seq

    def join(self, a, b):
        """Join wrapped lines; a trailing hyphen is dropped only when the joined word exists in the volume."""
        if a.endswith('­'): return a[:-1] + b
        if a.endswith('-'):
            m, n = re.search(r'([A-Za-z]+)-$', a), re.match(r'([a-z]+)', b)
            if m and n and self.words.get((m.group(1) + n.group(1)).lower(), 0) > 0: return a[:-1] + b
            return a + b
        return a + ' ' + b

    def render(self, pno, rect, name):
        page = self.doc[pno]
        pix = page.get_pixmap(clip=pymupdf.Rect(*rect) & page.rect, dpi=150, colorspace=pymupdf.csGRAY)
        pix.save(IMG / name)
        return name


def is_q_start(z, expect, vol):
    if not isinstance(z, Line): return None
    m = Q_START.match(z.text)
    if not m or int(m.group(1)) != expect or abs(z.x0 - vol.margin[z.page % 2]) > 2.5: return None
    return m


def split_entries(items, vol, guard=True):
    """Split a run into sequentially numbered entries. Returns (preamble, [(n, items)]).
    A question that has started its options cannot end before option B appears; this keeps numbered
    rows of matching tables (which sit on the question margin) inside their question."""
    entries, pre, cur, n = [], [], None, 1
    has_a = has_b = in_table = False
    for z in items:
        if guard and isinstance(z, Line) and cur is not None and is_q_start(z, 1, vol):
            in_table = True  # a "1." on the margin inside a question starts a numbered matching table
        row = guard and in_table and isinstance(z, Line) and z.x1 < 420 and not z.text.rstrip().endswith(('?', ':'))
        if is_q_start(z, n, vol) and not row and not (guard and has_a and not has_b and not in_table):
            in_table = False
            z.special = False
            if cur is not None: entries.append(cur)
            cur = (n, [z]); n += 1
            has_a = has_b = False
            if re.search(r'\sA\.\s', z.text): has_a = True
            continue
        if isinstance(z, Line):
            if re.search(r'(^|\s)A\.\s', z.text): has_a = True
            if re.search(r'(^|\s)B\.\s', z.text): has_b = True
        if cur is None:
            pre.append(z)
        else:
            cur[1].append(z)
    if cur is not None: entries.append(cur)
    return pre, entries


def group_special(items):
    """Collapse runs of special lines on one page into ('CLIP', page, bbox) markers."""
    out, run = [], []
    def flush():
        if run:
            out.append(('CLIP', run[0].page, (min(z.x0 for z in run), min(z.y0 for z in run),
                                              max(z.x1 for z in run), max(z.y1 for z in run))))
            run.clear()
    for z in items:
        if isinstance(z, Line) and z.special:
            if run and (run[-1].page != z.page or z.y0 - run[-1].y1 > 14): flush()
            run.append(z)
        else:
            flush(); out.append(z)
    flush()
    return out


def text_of(vol, items, key, imgs):
    """Flatten Lines and markers into paragraphs; tables and equations become [[img:name]] tokens."""
    paras, cur, prev = [], '', None
    for z in group_special(items):
        if isinstance(z, tuple):
            if cur: paras.append(cur); cur = ''
            kind, pno, (x0, y0, x1, y1) = z
            name = f'{key}-{len(imgs) + 1}.png'
            if kind == 'TABLE':
                title = [l for l in vol.page_lines(pno) if y0 - 30 < l.y1 <= y0 + 1 and re.match(r'^Exhibit \d+', l.text)]
                if title:
                    y0 = min(l.y0 for l in title)
                    if paras and paras[-1].startswith(title[0].text[:20]): paras.pop()  # title is in the image
                vol.render(pno, (x0 - 4, y0 - 4, x1 + 4, y1 + 4), name)
            else:
                left = vol.margin[pno % 2] + 12
                vol.render(pno, (min(x0, left) - 3, y0 - 3, max(x1, 545) + 3, y1 + 3), name)
            imgs.append(name)
            paras.append(f'[[img:{name}]]')
            prev = None
            continue
        t = z.text
        gap = prev is None or (z.page == prev.page and z.y0 - prev.y1 > 7)
        if cur and not gap and not OPT.match(t) and not re.match(r'^Exhibit \d+', t):
            cur = vol.join(cur, t)
        else:
            if cur: paras.append(cur)
            cur = t
        prev = z
    if cur: paras.append(cur)
    return paras


def strip_number(paras):
    if paras and not paras[0].startswith('[[img:'):
        paras[0] = Q_START.sub(lambda m: m.group(2) or '', paras[0], count=1)
        if not paras[0]: paras.pop(0)
    return paras


def parse_question(paras):
    """Split stem paragraphs from A/B/C options."""
    opts, stem = {}, []
    for p in paras:
        m = OPT.match(p)
        nxt = 'ABC'[len(opts)] if len(opts) < 3 else None
        if m and m.group(1) == nxt:
            opts[nxt] = m.group(2)
        elif opts:
            last = list(opts)[-1]; opts[last] += ' ' + p
        else:
            stem.append(p)
    if not opts and stem:
        # options run on in the stem's last paragraph: "... : A. x. B. y. C. z."
        m = re.match(r'^(.*?[?:.)])\s+A\.?\s+(.+?)\s+B\.?\s+(.+?)\s+C\.?\s+(.+)$', stem[-1])
        if m: stem, opts = stem[:-1] + [m.group(1)], {'A': m.group(2), 'B': m.group(3), 'C': m.group(4)}
    return stem, ([opts[k] for k in 'ABC' if k in opts] if len(opts) >= 2 else None)


def set_from(vol, items, mid, n_default):
    """Build an item set from a run that starts with 'The following information relates to questions X-Y'."""
    head = ' '.join(z.text for z in items[:3] if isinstance(z, Line))
    r = SET_RANGE.search(head)
    lo, hi = (int(r.group(1)), int(r.group(2))) if r else (n_default, n_default)
    k = next((j for j, z in enumerate(items[:4]) if isinstance(z, Line) and SET_RANGE.search(z.text)), 0)
    sid = f'{mid}set{lo}'
    imgs = []
    first = next((z for z in items if isinstance(z, Line)), None)
    s = dict(id=sid, m=mid, lo=lo, hi=hi, pg=vol.printed(first.page) if first else None, text=text_of(vol, items[k + 1:], sid, imgs))
    if imgs: s['img'] = imgs
    return s


def extract_los(vol, p0):
    """LOS bullets and module-overview bullets from the module's opening pages."""
    # Uses unmerged lines and keeps only the outcomes column: some modules put a sidebar note beside the
    # outcomes, and merging same-baseline fragments would splice the sidebar into them.
    los, ov, mode, col, prev = [], [], None, None, None
    for pno in range(p0, min(p0 + 3, vol.doc.page_count)):
        raw = []
        for b in vol.doc[pno].get_text('dict')['blocks']:
            for l in b.get('lines', []):
                t = re.sub(r'\s+', ' ', ''.join(s['text'] for s in l['spans']).replace('­', '')).strip()
                if t and HEAD_Y <= l['bbox'][1] <= FOOT_Y and 'For candidate use only' not in t and not is_running_head(t, l['bbox'][1]):
                    raw.append(Line(pno, l['bbox'], t, False))
        raw.sort(key=lambda z: (round(z.y0), z.x0))
        for z in raw:
            t = z.text
            if t.upper() == 'LEARNING OUTCOMES': mode, col = 'los', None; continue
            if t.upper() == 'LEARNING MODULE OVERVIEW': mode, col = 'ov', None; continue
            if mode is None or t in ('Mastery',) or t.lower().startswith('the candidate should be able to'): continue
            if col is not None and not (col - 4 <= z.x0 <= col + 26): continue  # sidebar or margin text
            if t.upper() == 'INTRODUCTION' or re.fullmatch(r'\d+', t) or (t.isupper() and len(t) > 6):
                if mode == "ov": return list(dict.fromkeys(x for x in los if x[:1].islower() and len(x) > 15)), [x for x in ov if x]
                mode = None; continue
            # wrapped lines overlap the line above; a new bullet starts at or below the previous line's bottom
            fresh = prev is None or prev.page != z.page or z.y0 - prev.y1 > -1 or col is None
            prev = z
            target = los if mode == 'los' else ov
            mark = '□' if mode == 'los' else '■▪•'
            if col is None: col = z.x0
            if t[:1] in mark or fresh or not target:
                target.append(t.lstrip(mark + ' ').strip())
            else:
                target[-1] = vol.join(target[-1], t)
    return list(dict.fromkeys(x for x in los if x[:1].islower() and len(x) > 15)), [x for x in ov if x]


def extract_volume(num, tkey):
    vol = Volume(num)
    toc = vol.doc.get_toc()
    mods = []
    for i, (lvl, title, page) in enumerate(toc):
        if lvl != 2 or not title.startswith('Learning Module'): continue
        mnum, mtitle = re.match(r'Learning Module (\d+)\s*(.*)', title).groups()
        end = next((t[2] for t in toc[i + 1:] if t[0] <= 2), vol.doc.page_count + 1) - 1  # last page, 1-based
        sub = [t for t in toc[i + 1:] if t[2] <= end and t[0] == 3]
        pp = next((t[2] for t in sub if t[1] == 'Practice Problems'), None)
        sol = next((t[2] for t in sub if t[1] == 'Solutions'), None)
        mods.append(dict(num=int(mnum), title=mtitle.strip(), start=page, end=end, pp=pp, sol=sol))

    out_mods, out_sets, out_qs = [], [], []
    for M in mods:
        mid = f'v{num}m{M["num"]}'
        los, overview = extract_los(vol, M['start'] - 1)
        mod = dict(id=mid, topic=tkey, num=M['num'], title=M['title'], los=los, overview=overview, pages=[M['start'], M['end']], q=[])
        out_mods.append(mod)
        if not M['pp'] or not M['sol']: continue
        if not los: warn(f'{mid}: no LOS found')

        pitems = vol.lines(M['pp'] - 1, M['sol'] - 2)
        k = next((j for j, z in enumerate(pitems) if isinstance(z, Line) and z.text.upper() == 'PRACTICE PROBLEMS'), -1)
        pitems = pitems[k + 1:]
        sitems = vol.lines(M['sol'] - 1, M['end'] - 1)
        k = next((j for j, z in enumerate(sitems) if isinstance(z, Line) and z.text.upper() == 'SOLUTIONS'), -1)
        sitems = sitems[k + 1:]

        pre, qents = split_entries(pitems, vol)
        _, sents = split_entries(sitems, vol, guard=False)
        sol_by_n = dict(sents)
        if len(sents) != len(qents): warn(f'{mid}: {len(qents)} questions but {len(sents)} solutions')

        sets = []
        if any(isinstance(z, Line) and SET_MARK.match(z.text) for z in pre):
            j = next(j for j, z in enumerate(pre) if isinstance(z, Line) and SET_MARK.match(z.text))
            sets.append(set_from(vol, pre[j:], mid, 1))
        mqs = []
        for n, its in qents:
            # a later set's vignette sits at the end of the previous question's run
            cut = next((j for j, z in enumerate(its) if isinstance(z, Line) and SET_MARK.match(z.text)), None)
            body = its if cut is None else its[:cut]
            if cut is not None: sets.append(set_from(vol, its[cut:], mid, n + 1))
            imgs = []
            stem, opts = parse_question(strip_number(text_of(vol, body, f'{mid}q{n}', imgs)))
            sol = strip_number(text_of(vol, sol_by_n.get(n, []), f'{mid}s{n}', imgs))
            q = dict(id=f'{mid}q{n}', m=mid, n=n, pg=vol.printed(body[0].page), stem=stem, opts=opts, sol=sol)
            if opts:
                a = ANS_LEAD.match(sol[0]) if sol else None
                a = a.group(1) if a else None
                if not a:
                    a2 = ANS_ANY.search(' '.join(sol))
                    a = a2 and (a2.group(1) or a2.group(2))
                if a: q['ans'] = 'ABC'.index(a.upper())
                else: warn(f'{q["id"]}: multiple choice but no answer letter found')
            elif re.search(r'\bA\.\s.*\bB\.\s.*\bC\.\s', ' '.join(stem)):
                warn(f'{q["id"]}: looks like multiple choice but options did not parse')
            if n not in sol_by_n: warn(f'{q["id"]}: no solution found')
            if imgs: q['img'] = imgs
            mqs.append(q)
        for s in sets:
            for q in mqs:
                if s['lo'] <= q['n'] <= s['hi']: q['set'] = s['id']
        out_sets += sets; out_qs += mqs; mod['q'] = [q['id'] for q in mqs]
    vol.save_cache()
    return out_mods, out_sets, out_qs


STOP = set('the and for with that this from are which most likely following its their than into will would should be is of to in on as by an or at it not can has have was were been when what how does do using based given both each other such'.split())


def map_los(bank):
    """Tag each question with the learning outcome it most likely tests (TF-IDF cosine within its module).
    The curriculum does not label questions by LOS, so this is an estimate used only for the mastery map."""
    import math
    words = lambda t: [w for w in re.findall(r'[a-z]{3,}', t.lower()) if w not in STOP]
    docs = [m_los for m in bank['modules'] for m_los in m['los']] + [' '.join(q['stem'] + (q['opts'] or []) + q['sol'][:2]) for q in bank['questions']]
    df = collections.Counter(w for d in docs for w in set(words(d)))
    N = len(docs)
    def vec(t):
        c = collections.Counter(words(t))
        v = {w: (1 + math.log(n)) * math.log(N / (1 + df[w])) for w, n in c.items()}
        norm = math.sqrt(sum(x * x for x in v.values())) or 1
        return {w: x / norm for w, x in v.items()}
    mods = {m['id']: m for m in bank['modules']}
    for q in bank['questions']:
        los = mods[q['m']]['los']
        if not los: continue
        if len(los) == 1: q['los'] = 0; continue
        qv = vec(' '.join(q['stem'] + (q['opts'] or []) + q['sol'][:2]))
        scores = [sum(qv.get(w, 0) * x for w, x in vec(l).items()) for l in los]
        q['los'] = max(range(len(los)), key=lambda i: scores[i])


def reserve_mock_pool(bank, size=180):
    """Hold back about `size` standalone multiple-choice questions, weighted by exam weight, for the mocks.
    Selection is deterministic (hash of the id), at most a quarter of any module (min 1), from modules
    with 4+ questions, so every module keeps most of its questions for its quiz."""
    import hashlib
    h = lambda s: hashlib.md5(s.encode()).hexdigest()
    by_mod = collections.defaultdict(list)
    for q in bank['questions']:
        if q['opts'] and len(q['opts']) == 3 and 'ans' in q and 'set' not in q: by_mod[q['m']].append(q)
    total_w = sum(t['w'] for t in bank['topics'])
    for t in bank['topics']:
        want = round(size * t['w'] / total_w)
        pool = []
        for mid in t['modules']:
            n_mod = sum(1 for q in bank['questions'] if q['m'] == mid)
            if n_mod >= 4: pool += sorted(by_mod[mid], key=lambda q: h(q['id']))[:max(1, n_mod // 4)]
        for q in sorted(pool, key=lambda q: h('r' + q['id']))[:want]: q['res'] = 1


def main():
    IMG.mkdir(parents=True, exist_ok=True)
    for f in IMG.glob('*.png'): f.unlink()
    bank = dict(topics=[], modules=[], sets=[], questions=[])
    for key, name, num, w in TOPICS:
        mods, sets, qs = extract_volume(num, key)
        bank['topics'].append(dict(id=key, name=name, vol=num, w=w, modules=[m['id'] for m in mods]))
        bank['modules'] += mods; bank['sets'] += sets; bank['questions'] += qs
        mc = sum(1 for q in qs if q['opts']); ans = sum(1 for q in qs if 'ans' in q)
        print(f'V{num:<2} {name:<36} modules {len(mods):>2}  questions {len(qs):>4}  multiple choice {mc:>4}  keyed {ans:>4}  sets {len(sets):>3}', flush=True)
    map_los(bank)
    reserve_mock_pool(bank)
    print(f'mock reserve {sum(1 for q in bank["questions"] if q.get("res"))} questions; LOS-tagged {sum(1 for q in bank["questions"] if "los" in q)}')
    (OUT / 'bank.json').write_text(json.dumps(bank, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    (OUT / 'report.txt').write_text('\n'.join(report) + '\n', encoding='utf-8')
    print(f'total questions {len(bank["questions"])}, images {len(list(IMG.glob("*.png")))}, warnings {len(report)}')


if __name__ == '__main__':
    main()
