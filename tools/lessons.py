"""Parse lessons/<topic>.md into lesson objects for the app.

Format (one file per topic, any number of lessons):

    # v10m1                      module id
    take: one-line exam takeaway
    mins: 20                     reading time

    ## Section title             any number of sections
    Paragraphs (blank-line separated) with **bold**, *italic*, `code`.
    - bullet lines
    term :: definition          rows of a definitions list
    | a | b |                   table rows (first row is the header; |---| rows are skipped)
    ! a trap or warning         amber callout
    > a tip                     steel callout
    ```                         formula block (line breaks kept)
    PV = FV / (1 + r)^N
    ```

    ## Quick check              special section: questions written for the trainer
    ? Question text
    a) option   b) option   c) option   (one per line)
    = b
    why: explanation

Lessons are original writing based on the 2027 curriculum, so they are safe to keep in the repo.
"""
import html, re


def inline(t):
    t = html.escape(t, quote=False)
    t = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', t)
    t = re.sub(r'(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])', r'<i>\1</i>', t)
    t = re.sub(r'`([^`]+)`', r'<code>\1</code>', t)
    return t


def render_blocks(lines):
    out, para, i = [], [], 0
    def flush():
        if para: out.append('<p>' + inline(' '.join(para)) + '</p>'); para.clear()
    while i < len(lines):
        ln = lines[i].rstrip()
        s = ln.strip()
        if not s: flush(); i += 1; continue
        if s.startswith('```'):
            flush(); j = i + 1; body = []
            while j < len(lines) and not lines[j].strip().startswith('```'): body.append(lines[j].rstrip()); j += 1
            out.append('<div class="formula">' + '<br>'.join(inline(b) for b in body) + '</div>'); i = j + 1; continue
        if s.startswith('- '):
            flush(); items = []
            while i < len(lines) and lines[i].strip().startswith('- '): items.append(inline(lines[i].strip()[2:])); i += 1
            out.append('<ul>' + ''.join(f'<li>{x}</li>' for x in items) + '</ul>'); continue
        if s.startswith('|'):
            flush(); rows = []
            while i < len(lines) and lines[i].strip().startswith('|'):
                r = lines[i].strip()
                if not re.fullmatch(r'\|[\s:|-]+\|', r): rows.append([c.strip() for c in r.strip('|').split('|')])
                i += 1
            head, body = rows[0], rows[1:]
            num = lambda c: ' class="n"' if re.fullmatch(r'[-−(]?[$€£¥]?[\d,.]+%?\)?[a-zA-Z%]*', c.replace(' ', '')) else ''
            out.append('<div class="tw"><table class="fin"><thead><tr>' + ''.join(f'<th>{inline(c)}</th>' for c in head) + '</tr></thead><tbody>'
                       + ''.join('<tr>' + ''.join(f'<td{num(c)}>{inline(c)}</td>' for c in r) + '</tr>' for r in body) + '</tbody></table></div>')
            continue
        if ' :: ' in s:
            flush(); rows = []
            while i < len(lines) and ' :: ' in lines[i]:
                k, v = lines[i].strip().split(' :: ', 1); rows.append(f'<dt>{inline(k)}</dt><dd>{inline(v)}</dd>'); i += 1
            out.append('<dl class="terms">' + ''.join(rows) + '</dl>'); continue
        if s.startswith('! ') or s.startswith('> '):
            flush(); kind = 'warn' if s[0] == '!' else 'tip'; body = []
            while i < len(lines) and lines[i].strip()[:2] == s[:2]: body.append(lines[i].strip()[2:]); i += 1
            inner = inline(body[0]) if len(body) == 1 else '<ul>' + ''.join(f'<li>{inline(b)}</li>' for b in body) + '</ul>'
            out.append(f'<div class="{kind}">{inner}</div>'); continue
        para.append(s); i += 1
    flush()
    return ''.join(out)


def parse_checks(lines):
    checks, cur = [], None
    for ln in lines:
        s = ln.strip()
        if s.startswith('? '):
            cur = dict(q=s[2:], o=[], a=None, why=''); checks.append(cur)
        elif cur is not None and re.match(r'^[abc]\)\s', s):
            cur['o'].append(s[3:].strip())
        elif cur is not None and s.startswith('= '):
            cur['a'] = 'abc'.index(s[2:].strip().lower())
        elif cur is not None and s.startswith('why:'):
            cur['why'] = s[4:].strip()
        elif cur is not None and s and cur['why']:
            cur['why'] += ' ' + s
    for c in checks:
        if len(c['o']) < 2 or c['a'] is None or c['a'] >= len(c['o']):
            raise ValueError(f'bad quick-check question: {c["q"][:60]}')
        # Shuffle the options so the right answer isn't predictable by letter. The order is seeded by
        # the question text, so it's stable between builds; explanations never refer to option letters.
        import hashlib, random
        rnd = random.Random(hashlib.md5(c['q'].encode()).hexdigest())
        order = list(range(len(c['o'])))
        rnd.shuffle(order)
        c['o'] = [c['o'][k] for k in order]
        c['a'] = order.index(c['a'])
        c['q'], c['o'], c['why'] = inline(c['q']), [inline(o) for o in c['o']], inline(c['why'])
    return checks


def parse(text):
    lessons = {}
    for chunk in re.split(r'(?m)^# ', text)[1:]:
        lines = chunk.split('\n')
        mid = lines[0].strip()
        take, mins, sections, cur = '', 20, [], None
        for ln in lines[1:]:
            if cur is None and ln.startswith('take:'): take = ln[5:].strip(); continue
            if cur is None and ln.startswith('mins:'): mins = int(ln[5:].strip()); continue
            if ln.startswith('## '): cur = [ln[3:].strip(), []]; sections.append(cur); continue
            if cur is not None: cur[1].append(ln)
        body, checks = '', []
        for title, ls in sections:
            if title.lower() == 'quick check': checks = parse_checks(ls)
            else: body += f'<h3 class="sh">{inline(title)}</h3>' + render_blocks(ls)
        if not take or not checks: raise ValueError(f'{mid}: a lesson needs a take: line and a Quick check')
        lessons[mid] = dict(take=inline(take), mins=mins, html=body, checks=checks)
    return lessons
