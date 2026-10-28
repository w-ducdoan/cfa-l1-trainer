/* CFA L1 Trainer: state, sync, spaced repetition, study plan, mastery map, quizzes.
   Reads window.CFA_BANK (inlined by build.py); exhibit images come from window.CFA_IMG or img/<topic>.json. */
(() => {
  const B = window.CFA_BANK;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const DAY = 864e5, PASS = 0.7, PACE = 90, HOURS = 300, NAME = 'Duc';
  const DEFAULT_EXAM = '2027-05-17';
  const LS_KEY = 'cfa-l1-trainer-v1', LS_MOCK = 'cfa-l1-mock-run';
  const lsDel = k => { try { localStorage.removeItem(k); } catch (e) { /* storage unavailable */ } };
  const lsGet = k => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } };

  // ---------- bank indexes ----------
  const Q = new Map(B.questions.map(q => [q.id, q]));
  const MOD = new Map(B.modules.map(m => [m.id, m]));
  const SET = new Map(B.sets.map(s => [s.id, s]));
  const TOP = new Map(B.topics.map(t => [t.id, t]));
  const topicOfVol = Object.fromEntries(B.topics.map(t => [t.vol, t.id]));
  const topicOfQ = id => topicOfVol[+id.match(/^v(\d+)/)[1]];
  const usable = q => (q.opts ? q.ans != null : q.sol.length > 0);
  B.modules.forEach(m => { m.all = m.q.filter(id => usable(Q.get(id))); });
  // modules that carry content (the Quant appendix has neither questions nor outcomes)
  const STUDY = B.modules.filter(m => m.los.length || m.all.length);
  const isBank = id => /^v\d+m/.test(id);

  // ---------- generated calculation questions ----------
  // One spaced-repetition card per template (id v<vol>g-<key>, from src/gen.js); every showing draws new numbers
  // from a seed kept on the run, so a saved mock shows the same numbers when resumed.
  const GEN = new Map((window.CFA_GEN || []).map(t => [`v${TOP.get(MOD.get(t.m).topic).vol}g-${t.key}`, t]));
  const isGen = id => GEN.has(id);
  const GEN_BY_TOPIC = Object.fromEntries(B.topics.map(t => [t.id, [...GEN.keys()].filter(id => MOD.get(GEN.get(id).m).topic === t.id)]));
  function seeded(seed) {
    let a = seed >>> 0;
    return () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  function genQ(id, seed) {
    const t = GEN.get(id);
    for (let k = 0; ; k++) {
      const f = seeded(seed + k * 7919);
      const r = { u: (lo, hi, st) => +(lo + st * Math.floor(f() * (Math.round((hi - lo) / st) + 1))).toFixed(10), pick: a => a[Math.floor(f() * a.length)] };
      const x = t.make(r), opts = [x.ans, ...x.wrong];
      if (new Set(opts).size < 3 && k < 30) continue; // two options would read the same: redraw
      const order = shuffle([0, 1, 2], f);
      return { id, m: t.m, n: 0, gen: t.key, title: t.title, stem: x.stem, opts: order.map(i => opts[i]), ans: order.indexOf(0), sol: x.sol, los: null };
    }
  }
  // Formula flashcards (src/cards.js): self-graded cards (id v<vol>f-<key>) on the same schedule as questions.
  const FLASH = new Map((window.CFA_FLASH || []).map(([m, key, front, fx, note]) => {
    const id = `v${TOP.get(MOD.get(m).topic).vol}f-${key}`;
    return [id, { id, m, n: 0, flash: true, title: front, stem: [front], sol: [fx, note], los: null }];
  }));
  const FLASH_BY_TOPIC = Object.fromEntries(B.topics.map(t => [t.id, [...FLASH.keys()].filter(id => MOD.get(FLASH.get(id).m).topic === t.id)]));
  FLASH.forEach((q, id) => Q.set(id, q));
  const newSeed = () => 1 + Math.floor(Math.random() * 1e9);
  const reseed = (ids, seeds) => ids.forEach(id => { if (isGen(id)) { if (seeds[id] == null) seeds[id] = newSeed(); Q.set(id, genQ(id, seeds[id])); } });

  // ---------- progress ----------
  // cards[qid] = { due, ivl, ease, reps, lapses, last, ok, conf, h: [[t, ok, conf, secs]] }
  const blank = () => ({ v: 2, updated: 0, cards: {}, notes: {}, daily: {}, los: {}, quizzes: {}, lessons: {}, tests: {}, mocks: [], xp: 0, settings: { exam: '', newPerDay: 15, planStart: '' } });
  const S = { view: 'home', prog: Object.assign(blank(), lsGet(LS_KEY) || {}), sync: 'local', refs: null, run: null, result: null, mod: null, sel: null, nb: { topic: '', tag: '' } };
  S.prog.settings = Object.assign(blank().settings, S.prog.settings);
  if (!S.prog.quizzes) S.prog.quizzes = {};
  if (!S.prog.lessons) S.prog.lessons = {};
  if (!S.prog.tests) S.prog.tests = {};
  if (!S.prog.mocks) S.prog.mocks = [];
  GEN.forEach((_, id) => Q.set(id, genQ(id, 1)));
  const LES = B.lessons || {};
  const hasLesson = mid => !!LES[mid];
  if (!S.prog.settings.planStart) { S.prog.settings.planStart = dayKey(); lsSet(LS_KEY, S.prog); }

  // A reserved question stays out of practice until Phase C mocks use it, unless it was already answered.
  const inPractice = id => { const q = Q.get(id); return usable(q) && (!q.res || S.prog.cards[id]); };
  const modQs = m => m.all.filter(inPractice);

  function mergeProg(a, b) {
    const out = blank();
    out.settings = Object.assign({}, blank().settings, (b.updated || 0) > (a.updated || 0) ? Object.assign({}, a.settings, b.settings) : Object.assign({}, b.settings, a.settings));
    const sa = (a.settings || {}).planStart, sb = (b.settings || {}).planStart;
    if (sa && sb) out.settings.planStart = sa < sb ? sa : sb;
    for (const src of [a.cards || {}, b.cards || {}]) for (const [k, c] of Object.entries(src)) if (!out.cards[k] || (c.last || 0) > (out.cards[k].last || 0)) out.cards[k] = c;
    for (const src of [a.notes || {}, b.notes || {}]) for (const [k, n] of Object.entries(src)) if (!out.notes[k] || (n.t || 0) > (out.notes[k].t || 0)) out.notes[k] = n;
    for (const src of [a.daily || {}, b.daily || {}]) for (const [k, d] of Object.entries(src)) if (!out.daily[k] || d.n > out.daily[k].n) out.daily[k] = d;
    for (const src of [a.los || {}, b.los || {}]) for (const [k, v] of Object.entries(src)) out.los[k] = Object.assign({}, out.los[k], v);
    for (const src of [a.quizzes || {}, b.quizzes || {}]) for (const [k, list] of Object.entries(src)) {
      const seen = new Map((out.quizzes[k] || []).map(x => [x.t, x])); list.forEach(x => seen.set(x.t, x));
      out.quizzes[k] = [...seen.values()].sort((x, y) => x.t - y.t).slice(-12);
    }
    for (const src of [a.lessons || {}, b.lessons || {}]) for (const [k, l] of Object.entries(src)) if (!out.lessons[k] || (l.ok || 0) > (out.lessons[k].ok || 0) || ((l.ok || 0) === (out.lessons[k].ok || 0) && l.t > out.lessons[k].t)) out.lessons[k] = l;
    for (const src of [a.tests || {}, b.tests || {}]) for (const [k, list] of Object.entries(src)) {
      const seen = new Map((out.tests[k] || []).map(x => [x.t, x])); list.forEach(x => seen.set(x.t, x));
      out.tests[k] = [...seen.values()].sort((x, y) => x.t - y.t).slice(-12);
    }
    { const seen = new Map(); [...(a.mocks || []), ...(b.mocks || [])].forEach(x => seen.set(x.t, x)); out.mocks = [...seen.values()].sort((x, y) => x.t - y.t).slice(-20); }
    out.xp = Math.max(a.xp || 0, b.xp || 0);
    out.updated = Math.max(a.updated || 0, b.updated || 0);
    return out;
  }

  // Synced storage: one doc for everything but cards, one doc per topic for cards (keeps each doc small).
  const dirty = new Set();
  let saveTimer = null, writing = false, again = false;
  function save(topics) {
    S.prog.updated = Date.now();
    lsSet(LS_KEY, S.prog);
    (topics || []).forEach(t => dirty.add(t)); dirty.add('_meta');
    if (!S.refs) return;
    clearTimeout(saveTimer); saveTimer = setTimeout(flush, 1500);
  }
  function cardsOf(topic) { const o = {}; for (const [k, c] of Object.entries(S.prog.cards)) if (topicOfQ(k) === topic) o[k] = c; return o; }
  async function flush() {
    if (!S.refs) return;
    if (writing) { again = true; return; }
    writing = true; setSync('saving');
    try {
      const todo = [...dirty]; dirty.clear();
      for (const t of todo) {
        if (t === '_meta') await S.refs.meta.set({ settings: S.prog.settings, daily: S.prog.daily, notes: S.prog.notes, los: S.prog.los, quizzes: S.prog.quizzes, lessons: S.prog.lessons, tests: S.prog.tests, mocks: S.prog.mocks, xp: S.prog.xp, updated: S.prog.updated });
        else await S.refs.col.doc('cards-' + t).set({ cards: cardsOf(t) });
      }
      setSync('synced');
    } catch (e) { setSync('local'); }
    writing = false; if (again) { again = false; flush(); }
  }
  const SYNC_TXT = { local: 'Saved on this device', saving: 'Saving…', synced: 'Synced to your account' };
  function setSync(s) { S.sync = s; const el = $('#sync'); if (el) { el.dataset.state = s; el.textContent = SYNC_TXT[s]; } }

  async function connect() {
    if (!window.claude || typeof window.claude.use !== 'function') return;
    try {
      const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
      const uid = user ? await user.id() : null;
      if (!db || !uid) return;
      const col = db.collection('data/users/' + uid);
      const refs = { col, meta: col.doc('meta') };
      const remote = blank();
      const m = await refs.meta.get();
      if (m.exists && m.data()) { const d = m.data(); Object.assign(remote, { settings: d.settings || remote.settings, daily: d.daily || {}, notes: d.notes || {}, los: d.los || {}, quizzes: d.quizzes || {}, lessons: d.lessons || {}, tests: d.tests || {}, mocks: d.mocks || [], xp: d.xp || 0, updated: d.updated || 0 }); }
      for (const t of B.topics) {
        const d = await col.doc('cards-' + t.id).get();
        if (d.exists && d.data() && d.data().cards) Object.assign(remote.cards, d.data().cards);
      }
      S.prog = mergeProg(S.prog, remote); lsSet(LS_KEY, S.prog);
      S.refs = refs; setSync('synced');
      B.topics.forEach(t => dirty.add(t.id)); dirty.add('_meta'); flush();
      if (!S.run) render();
    } catch (e) { setSync('local'); }
  }

  // ---------- helpers ----------
  function dayKey(t = Date.now()) { const d = new Date(t); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  const parseDay = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d).getTime(); };
  const today0 = () => parseDay(dayKey());
  const pct = v => Math.round(v * 100) + '%';
  const fmtDate = (t, o = { month: 'short', day: 'numeric' }) => new Date(t).toLocaleDateString(undefined, o);
  const fmtSecs = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  function shuffle(a, rnd = Math.random) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const comma = n => n.toLocaleString();
  function toast(msg) { const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 2400); }
  const examDay = () => parseDay(S.prog.settings.exam || DEFAULT_EXAM);
  const daysLeft = () => Math.max(0, Math.round((examDay() - today0()) / DAY));
  const topicName = m => TOP.get(m.topic).name;
  const qtag = q => (q.gen || q.flash ? esc(q.title) : 'Q' + q.n);
  const src = q => { const m = MOD.get(q.m), t = TOP.get(m.topic); if (q.flash) return `Formula summary written for this trainer from ${t.name}, Learning Module ${m.num}. The curriculum's own wording is the final word.`;
    if (q.gen) return `Generated by the trainer from the formulas in ${t.name}, Learning Module ${m.num}. The numbers change every time; this is not a curriculum question.`; return `CFA Program Curriculum 2027, Level I, Vol. ${t.vol} ${t.name}, Learning Module ${m.num}, Practice Problem ${q.n}${q.pg ? ', p. ' + q.pg : ''}. Solution from the curriculum's end-of-module solutions.`; };

  // Images: the offline page inlines them all in window.CFA_IMG; the artifact fetches per-topic packs
  // (img/<topic>.json) on demand, since its viewer allows fetch() of published files but not script files.
  window.CFA_IMG = window.CFA_IMG || {};
  const packs = {};
  function loadPack(topic) {
    if (!packs[topic]) packs[topic] = fetch('img/' + topic + '.json')
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(imgs => { Object.assign(window.CFA_IMG, imgs); return true; })
      .catch(() => { delete packs[topic]; return false; });
    return packs[topic];
  }
  function fillImages(root) {
    root.querySelectorAll('img[data-img]').forEach(img => {
      const name = img.dataset.img, topic = topicOfVol[+name.match(/^v(\d+)/)[1]];
      if (window.CFA_IMG[name]) { img.src = window.CFA_IMG[name]; return; }
      loadPack(topic).then(ok => { const s = window.CFA_IMG[name]; if (s) img.src = s; else if (!ok) img.alt = 'Exhibit could not load. The source line below gives its page in the curriculum.'; });
    });
  }
  const inl = t => esc(t).replace(/\[\[img:([^\]]+)\]\]/g, (_, n) => `<span class="imgbox"><img data-img="${n}" alt="Exhibit or equation from the curriculum"></span>`);
  const paras = list => list.map(p => { const m = p.match(/^\[\[img:(.+)\]\]$/); return m ? `<div class="imgbox"><img data-img="${esc(m[1])}" alt="Exhibit or equation from the curriculum"></div>` : `<p>${inl(p)}</p>`; }).join('');
  const snippet = q => esc((q.stem.find(p => !p.startsWith('[[img:')) || 'Exhibit question').slice(0, 160));

  // ---------- spaced repetition + XP ----------
  // Confidence: 0 sure, 1 unsure, 2 guess. A right guess is scheduled like a near miss.
  function grade(qid, ok, conf, secs) {
    const now = Date.now();
    const c = S.prog.cards[qid] || { ivl: 0, ease: 2.4, reps: 0, lapses: 0, h: [] };
    if (!ok) { c.lapses++; c.reps = 0; c.ivl = 1; c.ease = Math.max(1.3, c.ease - 0.2); }
    else {
      const q = conf === 0 ? 5 : conf === 1 ? 4 : 3;
      if (c.reps === 0) c.ivl = q === 5 ? 3 : q === 4 ? 2 : 1;
      else if (c.reps === 1) c.ivl = q === 5 ? 7 : q === 4 ? 4 : 2;
      else c.ivl = Math.max(c.ivl + 1, Math.round(c.ivl * c.ease * (q === 5 ? 1 : q === 4 ? 0.8 : 0.5)));
      c.ease = Math.min(3, Math.max(1.3, c.ease + (q === 5 ? 0.05 : q === 3 ? -0.15 : 0)));
      c.reps++;
    }
    c.due = today0() + c.ivl * DAY; c.last = now; c.ok = ok ? 1 : 0; c.conf = conf;
    c.h = (c.h || []).concat([[now, c.ok, conf, Math.round(secs)]]).slice(-6);
    S.prog.cards[qid] = c;
    const d = S.prog.daily[dayKey()] || { n: 0, ok: 0, secs: 0 };
    d.n++; d.ok += c.ok; d.secs += Math.min(secs, 600); S.prog.daily[dayKey()] = d;
    S.prog.xp = (S.prog.xp || 0) + (ok ? 10 : 3);
    save([topicOfQ(qid)]);
  }
  const lvlAt = L => 50 * L * (L - 1);
  function level() { const xp = S.prog.xp || 0; let L = 1; while (xp >= lvlAt(L + 1)) L++; return { L, xp, lo: lvlAt(L), hi: lvlAt(L + 1) }; }

  // ---------- mastery ----------
  const LOS_SCORE = [0, 0.35, 0.75, 1];
  function losState(m, i) {
    const ids = modQs(m).filter(id => Q.get(id).los === i);
    const ck = !!(S.prog.los[m.id] || {})[i];
    if (!ids.length) return { s: ck ? 2 : 0, nq: true, ck, n: 0, seen: 0, acc: 0 };
    let seen = 0, ok = 0, ivl = 0;
    ids.forEach(id => { const c = S.prog.cards[id]; if (c) { seen++; ok += c.ok; ivl += c.ivl; } });
    const acc = seen ? ok / seen : 0;
    let s = 0;
    if (seen) s = 1;
    if (seen >= Math.ceil(ids.length / 2) && acc >= 0.75) s = 2;
    if (seen === ids.length && acc >= 0.85 && ivl / seen >= 14) s = 3;
    return { s, nq: false, ck, n: ids.length, seen, acc, ids };
  }
  function modStats(m) {
    const ids = modQs(m); let seen = 0, ok = 0, weak = 0;
    ids.forEach(id => { const c = S.prog.cards[id]; if (!c) return; seen++; ok += c.ok; if (!c.ok || c.conf === 2) weak++; });
    const quiz = S.prog.quizzes[m.id] || [], best = quiz.length ? Math.max(...quiz.map(x => x.ok / x.n)) : null;
    const losS = m.los.map((_, i) => losState(m, i));
    const score = losS.length ? losS.reduce((a, x) => a + LOS_SCORE[x.s], 0) / losS.length : (ids.length ? (seen / ids.length) * (seen ? ok / seen : 0) : 0);
    return { n: ids.length, seen, acc: seen ? ok / seen : 0, weak, quiz, best, passed: best != null && best >= PASS, losS, score };
  }
  function topicStats(t) {
    const ms = t.modules.map(id => MOD.get(id)).filter(m => STUDY.includes(m)).map(m => ({ m, s: modStats(m) }));
    const losAll = ms.flatMap(x => x.s.losS);
    const score = losAll.length ? losAll.reduce((a, x) => a + LOS_SCORE[x.s], 0) / losAll.length : 0;
    const n = ms.reduce((a, x) => a + x.s.n, 0), seen = ms.reduce((a, x) => a + x.s.seen, 0), ok = ms.reduce((a, x) => a + x.s.acc * x.s.seen, 0);
    return { ms, score, n, seen, acc: seen ? ok / seen : 0, passed: ms.filter(x => x.s.passed).length, mods: ms.length, risk: t.w * (1 - score) };
  }
  function readiness() { let a = 0, b = 0; B.topics.forEach(t => { a += t.w * topicStats(t).score; b += t.w; }); return a / b; }
  function streak() { let n = 0; for (let i = 0; i < 1000; i++) { const d = S.prog.daily[dayKey(Date.now() - i * DAY)]; if (d && d.n) n++; else if (i > 0) break; } return n; }
  const dueIds = () => { const t = today0() + DAY - 1; return Object.entries(S.prog.cards).filter(([id, c]) => Q.has(id) && usable(Q.get(id)) && c.due <= t).sort((a, b) => a[1].due - b[1].due).map(([id]) => id); };
  const newToday = () => { const t0 = today0(); return Object.entries(S.prog.cards).filter(([id]) => isBank(id)).map(([, c]) => c).filter(c => c.h && c.h[0] && c.h[0][0] >= t0).length; };

  // ---------- study plan ----------
  // First pass through every module in curriculum order, paced by page count, ends 8 weeks before the exam.
  // Then 4 weeks of review, 3 of mocks, and a light final week.
  function plan() {
    const start = parseDay(S.prog.settings.planStart), exam = examDay();
    const monday = t => { const d = new Date(t); const k = (d.getDay() + 6) % 7; return parseDay(dayKey(t - k * DAY)); };
    const w0 = monday(start), wExam = monday(exam);
    const nWeeks = Math.max(1, Math.round((wExam - w0) / (7 * DAY)) + 1);
    const passWeeks = Math.max(3, nWeeks - 8);
    const pages = STUDY.map(m => Math.max(4, m.pages[1] - m.pages[0] + 1)), total = pages.reduce((a, b) => a + b, 0);
    const weeks = Array.from({ length: nWeeks }, (_, i) => ({ i, t: w0 + i * 7 * DAY, mods: [], pages: 0, phase: i < passWeeks ? 'pass' : i < passWeeks + 4 ? 'review' : i < nWeeks - 1 ? 'mock' : 'final' }));
    let cum = 0;
    STUDY.forEach((m, k) => { const mid = cum + pages[k] / 2; cum += pages[k]; const w = Math.min(passWeeks - 1, Math.floor(mid / total * passWeeks)); weeks[w].mods.push(m); weeks[w].pages += pages[k]; });
    const now = monday(today0()), cur = Math.max(0, Math.min(nWeeks - 1, Math.round((now - w0) / (7 * DAY))));
    const due = weeks.slice(0, cur).flatMap(w => w.mods);
    const late = due.filter(m => !modStats(m).passed);
    const passed = STUDY.filter(m => modStats(m).passed).length;
    return { weeks, cur, late, passed, passWeeks, total, nWeeks, expected: due.length, exam };
  }

  // ---------- runs (quizzes, reviews, drills) ----------
  // kind: quiz | review | drill. mode: practice (feedback after each) | exam (timed, results at the end)
  function orderGroups(ids, keep) {
    const groups = new Map();
    ids.forEach(id => { const q = Q.get(id), k = q.set || id; if (!groups.has(k)) groups.set(k, []); groups.get(k).push(id); });
    const g = [...groups.values()]; if (!keep) shuffle(g);
    g.forEach(a => a.sort((x, y) => Q.get(x).n - Q.get(y).n));
    return g.flat();
  }
  function startRun(ids, label, o = {}) {
    const seeds = o.seeds || {}; reseed(ids, seeds);
    if (o.mode === 'exam') ids = ids.filter(id => Q.get(id).opts);
    if (!ids.length) { toast('Nothing to practice here yet'); return; }
    ids = o.keep ? ids : orderGroups(ids, o.kind === 'quiz');
    S.run = { kind: o.kind || 'drill', mode: o.mode || 'practice', mid: o.mid || null, tid: o.tid || null, mix: o.mix || null, label, ids, i: 0, ans: {}, flags: {}, t0: Date.now(), qt: Date.now(), revealed: false, requeued: {}, xp0: S.prog.xp || 0, prior: {},
      seeds, bounds: o.bounds || [0, ids.length], session: 0, sessionSecs: o.sessionSecs || ids.length * PACE, deadline: 0 };
    if (S.run.mode === 'exam') S.run.deadline = Date.now() + S.run.sessionSecs * 1000;
    ids.forEach(id => { S.run.prior[id] = S.prog.cards[id] ? S.prog.cards[id].ok : null; });
    S.result = null; setView('run');
  }
  function startQuiz(mid, mode) { const m = MOD.get(mid); startRun(modQs(m), `Module quiz · LM ${m.num} ${m.title}`, { kind: 'quiz', mode, mid }); }
  function startReview() {
    const due = dueIds().slice(0, 80);
    const left = Math.max(0, (+S.prog.settings.newPerDay || 15) - newToday());
    const p = plan(), focus = [...p.late, ...(p.weeks[p.cur] ? p.weeks[p.cur].mods : []), ...STUDY];
    const fresh = []; for (const m of focus) { for (const id of modQs(m)) { if (fresh.length >= left) break; if (!S.prog.cards[id] && !fresh.includes(id)) fresh.push(id); } if (fresh.length >= left) break; }
    startRun([...new Set([...due, ...fresh])], 'Daily review', { kind: 'review' });
  }
  function finishRun() {
    const R = S.run;
    if (R.mode === 'exam') R.ids.forEach(id => { const a = R.ans[id]; const q = Q.get(id); const ok = !!a && a.pick === q.ans; R.ans[id] = Object.assign({ pick: null, secs: 0 }, a, { ok }); grade(id, ok, a && a.pick != null ? 1 : 2, (a && a.secs) || 0); });
    const items = R.ids.filter((id, k) => R.ids.indexOf(id) === k && R.ans[id] && R.ans[id].ok != null).map(id => ({ id, ok: R.ans[id].ok, pick: R.ans[id].pick, secs: R.ans[id].secs || 0 }));
    const n = items.length, ok = items.filter(x => x.ok).length;
    const secs = R.mode === 'exam' ? items.reduce((a, x) => a + x.secs, 0) : (Date.now() - R.t0) / 1000;
    let bonus = 0;
    const byTopic = {};
    items.forEach(x => { const t = MOD.get(Q.get(x.id).m).topic; const o = byTopic[t] = byTopic[t] || [0, 0]; o[0] += x.ok ? 1 : 0; o[1]++; });
    if (R.kind === 'test' && n) { S.prog.tests[R.tid] = (S.prog.tests[R.tid] || []).concat([{ t: Date.now(), n, ok, secs: Math.round(secs) }]).slice(-12); bonus = 40; S.prog.xp += bonus; save(); }
    if (R.kind === 'mock' && n) { S.prog.mocks = S.prog.mocks.concat([{ t: Date.now(), n, ok, secs: Math.round(secs), byTopic, mix: R.mix }]).slice(-20); bonus = 100; S.prog.xp += bonus; save(); lsDel(LS_MOCK); }
    if (R.kind === 'quiz' && n) {
      const m = MOD.get(R.mid), wasPassed = modStats(m).passed;
      const list = S.prog.quizzes[R.mid] = (S.prog.quizzes[R.mid] || []).concat([{ t: Date.now(), n, ok, secs: Math.round(secs), mode: R.mode }]).slice(-12);
      bonus = 25 + (!wasPassed && ok / n >= PASS ? 50 : 0);
      S.prog.xp += bonus; save();
      void list;
    }
    S.result = { label: R.label, kind: R.kind, mode: R.mode, mid: R.mid, tid: R.tid, items, n, ok, secs, byTopic, xp: (S.prog.xp || 0) - R.xp0, bonus };
    S.run = null; setView('results');
  }

  // ---------- exams: topic tests and full mocks ----------
  // Mocks follow the Level I format: 180 standalone three-option questions in two sessions of 90, 2h15 each.
  const MOCK_N = 180, SESSION_N = 90, SESSION_SECS = 135 * 60, TEST_N = 30, MOCK_TARGET = 0.7;
  const segA = R => R.bounds[R.session], segB = R => R.bounds[R.session + 1];
  // Three-option questions with a key. The exam itself is all standalone questions, so those come first;
  // item-set questions (shown with their case) fill topics such as Derivatives where most questions sit in sets.
  const examQ = q => q.opts && q.opts.length === 3 && q.ans != null;
  const topicPool = tid => TOP.get(tid).modules.flatMap(id => MOD.get(id).all).map(id => Q.get(id)).filter(examQ);
  function allocate(total) {
    // largest-remainder split of the questions by exam weight
    const W = B.topics.reduce((a, t) => a + t.w, 0);
    const rows = B.topics.map(t => { const x = total * t.w / W; return { id: t.id, x, n: Math.floor(x) }; });
    let left = total - rows.reduce((a, r) => a + r.n, 0);
    [...rows].sort((a, b) => (b.x - b.n) - (a.x - a.n)).slice(0, left).forEach(r => r.n++);
    return Object.fromEntries(rows.map(r => [r.id, r.n]));
  }
  // Mock questions: held-back (reserve) questions first, then never-answered ones, then the longest-unseen.
  function buildMock() {
    const alloc = allocate(MOCK_N), card = q => S.prog.cards[q.id], queues = {}, counts = {};
    for (const t of B.topics) {
      const all = topicPool(t.id), pool = all.filter(q => !q.set), sets = all.filter(q => q.set);
      const held = shuffle(pool.filter(q => q.res && !card(q))), fresh = shuffle(pool.filter(q => !q.res && !card(q)));
      const seen = pool.filter(card).sort((a, b) => card(a).last - card(b).last);
      const setQs = [...shuffle(sets.filter(q => !card(q))), ...sets.filter(card).sort((a, b) => card(a).last - card(b).last)];
      // generated calculations (new numbers each time) come before repeats, so a long-practiced bank stays fresh
      const gens = shuffle(GEN_BY_TOPIC[t.id].map(id => Q.get(id)));
      queues[t.id] = [...held, ...fresh, ...gens, ...seen, ...setQs];
      counts[t.id] = Math.min(alloc[t.id], queues[t.id].length);
    }
    // Some topics have too few standalone questions for their share; give the shortfall to topics with
    // spare questions, one at a time in order of exam weight.
    let short = MOCK_N - Object.values(counts).reduce((a, n) => a + n, 0);
    const byWeight = [...B.topics].sort((a, b) => b.w - a.w);
    while (short > 0 && byWeight.some(t => counts[t.id] < queues[t.id].length)) {
      for (const t of byWeight) if (short > 0 && counts[t.id] < queues[t.id].length) { counts[t.id]++; short--; }
    }
    const ids = [], mix = { held: 0, fresh: 0, gen: 0, repeat: 0 };
    for (const t of B.topics) queues[t.id].slice(0, counts[t.id]).forEach(q => { ids.push(q.id); if (q.gen) mix.gen++; else if (card(q)) mix.repeat++; else if (q.res) mix.held++; else mix.fresh++; });
    return { ids: shuffle(ids), mix, counts };
  }
  // Topic tests: spread across the topic's modules, unseen and weak questions first; never uses the mock reserve.
  function buildTest(tid) {
    const groups = TOP.get(tid).modules.map(id => MOD.get(id)).map(m => {
      const rank = q => { const c = S.prog.cards[q.id]; return !c ? 0 : !c.ok ? 1 : 2 + Math.random(); };
      return shuffle(m.all.map(id => Q.get(id)).filter(q => examQ(q) && inPractice(q.id))).sort((a, b) => rank(a) - rank(b));
    }).filter(g => g.length);
    const out = [];
    for (let k = 0; out.length < TEST_N && groups.some(g => g.length > k); k++) shuffle(groups.slice()).forEach(g => { if (g[k] && out.length < TEST_N) out.push(g[k].id); });
    return shuffle(out);
  }
  function startTest(tid) {
    const ids = buildTest(tid), t = TOP.get(tid);
    if (ids.length < 5) { toast('Not enough questions for a test yet'); return; }
    startRun(ids, `Topic test · ${t.name}`, { kind: 'test', mode: 'exam', tid, keep: true, sessionSecs: ids.length * PACE });
  }
  function startMock() {
    if (lsGet(LS_MOCK)) { toast('Finish or discard the saved mock first'); return; }
    const { ids, mix } = buildMock();
    const bounds = [0, Math.min(SESSION_N, ids.length), ids.length];
    startRun(ids, `Full mock ${S.prog.mocks.length + 1}`, { kind: 'mock', mode: 'exam', keep: true, bounds, sessionSecs: SESSION_SECS, mix });
  }
  // Ending a session either moves a mock to its break or finishes the run.
  function endSession() {
    const R = S.run;
    if (R.session < R.bounds.length - 2) {
      const id = R.ids[R.i], a = R.ans[id] = R.ans[id] || { pick: null }; a.secs = (a.secs || 0) + (Date.now() - R.qt) / 1000;
      R.session++; R.i = segA(R); R.onBreak = true; R.deadline = 0; R.confirmSubmit = null;
      render(); window.scrollTo(0, 0); return;
    }
    finishRun();
  }
  function pauseMock(go) {
    const R = S.run; if (!R || R.kind !== 'mock') return;
    if (R.deadline) R.pausedLeft = Math.max(0, R.deadline - Date.now());
    const id = R.ids[R.i], a = R.ans[id] = R.ans[id] || { pick: null }; a.secs = (a.secs || 0) + (Date.now() - R.qt) / 1000;
    R.deadline = 0; lsSet(LS_MOCK, R); S.run = null;
    toast('Mock paused and saved on this device');
    if (go) setView('exams');
  }
  function resumeMock() {
    const R = lsGet(LS_MOCK); if (!R) { toast('No saved mock'); return; }
    R.qt = Date.now();
    // paused: use the time left at pause; closed without pausing: the time left when last seen
    if (R.pausedLeft == null && R.deadline) R.pausedLeft = Math.max(0, R.deadline - (R.lastSeen || Date.now()));
    if (!R.onBreak) R.deadline = Date.now() + (R.pausedLeft != null ? R.pausedLeft : R.sessionSecs * 1000);
    delete R.pausedLeft;
    reseed(R.ids, R.seeds || (R.seeds = {}));
    S.run = R; S.result = null; setView('run');
  }
  function vBreak() {
    const R = S.run, done = R.ids.slice(0, segA(R)).filter(x => R.ans[x] && R.ans[x].pick != null).length;
    return `<section class="page"><div class="lbl">${esc(R.label)}</div><h2>Session ${R.session} submitted</h2>
      <p class="sub">${done} of ${segA(R)} answered. Take a break before session ${R.session + 1}: stand up, drink some water, eat something light. The real exam offers an optional break between sessions.</p>
      <div class="qfoot"><button class="btn big" data-act="start-session">Start session ${R.session + 1} · ${segB(R) - segA(R)} questions · ${fmtSecs(R.sessionSecs)}</button><button class="btn ghost" data-act="pause">Save and finish later</button></div>
      <p class="src">The timer for session ${R.session + 1} starts when you press the button. Your session ${R.session} answers are locked and won't be shown until the end.</p></section>`;
  }

  function vExams() {
    const saved = lsGet(LS_MOCK), preview = buildMock(), alloc = allocate(MOCK_N);
    const mocks = S.prog.mocks;
    const savedLine = saved ? (() => { const ans = Object.values(saved.ans || {}).filter(x => x.pick != null).length; const left = saved.onBreak ? 'on the break' : fmtSecs((saved.pausedLeft != null ? saved.pausedLeft : Math.max(0, (saved.deadline || 0) - Date.now())) / 1000) + ' left'; return `${esc(saved.label)}: session ${saved.session + 1} of ${saved.bounds.length - 1}, ${ans} of ${saved.ids.length} answered, ${left}`; })() : '';
    return `<section class="page"><h2>Full mock exams</h2><p class="sub">180 questions in two timed sessions of 90, 2h15 each, weighted like the real exam. Pause any time; your place and the clock are saved on this device.</p>
      ${saved ? `<div class="status no"><b>Mock in progress.</b> ${savedLine}.</div><div class="qfoot"><button class="btn big" data-act="resume-mock">Resume</button><button class="btn ghost" data-act="discard-mock">Discard</button></div>`
        : `<div class="glance"><div class="glh">Next mock: ${preview.ids.length} questions</div><div class="glrow" style="grid-template-columns:repeat(4,minmax(0,1fr))">
          <div><b>${preview.mix.held}</b><span>Held back for mocks, never practiced</span></div><div><b>${preview.mix.fresh}</b><span>Never answered yet</span></div><div><b>${preview.mix.gen}</b><span>Generated calculations, new numbers</span></div><div><b>${preview.mix.repeat}</b><span>Repeats (longest-unseen first)</span></div></div></div>
          <div class="qfoot"><button class="btn big" data-act="mock">Start mock ${mocks.length + 1}</button><span class="small muted">Plan for about 5 hours including the break.</span></div>`}
      <h3 class="sh">Questions per topic</h3>
      <div class="tw"><table class="fin"><thead><tr><th>Topic</th><th>Exam weight</th><th>Target</th><th>In the next mock</th></tr></thead><tbody>${B.topics.map(t => `<tr><td>${esc(t.name)}</td><td class="n">${t.w}%</td><td class="n">${alloc[t.id]}</td><td class="n">${preview.counts[t.id]}</td></tr>`).join('')}</tbody></table></div>
      <p class="small muted">Standalone questions come first, as on the real exam. Where a topic runs short (most Derivatives questions sit in case-based item sets), its item-set questions fill in, shown with their case; any remaining shortfall goes to the highest-weight topics with questions to spare.</p>
      ${mocks.length ? `<h3 class="sh">Your mocks</h3><ul class="list">${mocks.slice().reverse().map((m, k) => `<li><span class="chip ${m.ok / m.n >= MOCK_TARGET ? 'good' : 'mid'}">${pct(m.ok / m.n)}</span><span class="grow">Mock ${mocks.length - k} · ${m.ok} of ${m.n} · ${fmtSecs(m.secs)} answering${m.mix ? ` · ${m.mix.held} held-back, ${m.mix.fresh} new, ${m.mix.gen ? m.mix.gen + ' generated, ' : ''}${m.mix.repeat} repeats` : ''}</span><span class="small muted">${fmtDate(m.t)}</span></li>`).join('')}</ul>` : ''}
      <p class="src">Source: end-of-module practice problems from the CFA Program Curriculum 2027, Level I, standalone multiple-choice only. CFA Institute doesn't publish a passing score; a common rule of thumb is to aim for 70% or better on practice mocks. The official CFA Institute mocks in your Learning Ecosystem account remain the best final check.</p></section>
    <section class="page"><h2>Topic tests</h2><p class="sub">Up to 30 questions from one topic, spread across its modules, unseen and weak questions first. Timed at 1:30 a question.</p>
      ${B.topics.map(t => { const list = S.prog.tests[t.id] || [], best = list.length ? Math.max(...list.map(x => x.ok / x.n)) : null, last = list[list.length - 1], n = Math.min(TEST_N, topicPool(t.id).filter(q => inPractice(q.id)).length);
        return `<div class="qlrow" style="grid-template-columns:minmax(0,1fr) 70px 120px auto"><span class="mt" style="cursor:default">${esc(t.name)}<small>${t.w}% of the exam · ${n} questions · ${fmtSecs(n * PACE)}</small></span>
          <span class="sc ${best == null ? 'lv-new' : best >= MOCK_TARGET ? 'lv-solid' : 'lv-weak'}">${best == null ? '–' : pct(best)}</span>
          <span class="small muted st">${last ? `last ${pct(last.ok / last.n)} · ${fmtDate(last.t)}` : 'not taken'}</span>
          <span class="acts"><button class="btn sm" data-act="test" data-id="${t.id}" ${n < 5 ? 'disabled' : ''}>Start test</button></span></div>`; }).join('')}
      <p class="src">Topic tests never use the questions held back for mocks.</p></section>`;
  }

  // ---------- drills: generated calculations ----------
  const GEN_N = 15;
  // weakest first: missed or guessed, then never tried, then the longest-unseen
  function genOrder(ids) {
    const rank = id => { const c = S.prog.cards[id]; return !c ? 1 : !c.ok || c.conf === 2 ? 0 : 2 + c.last / 1e13; };
    return shuffle(ids.slice()).sort((a, b) => rank(a) - rank(b));
  }
  function genStats(ids) {
    let seen = 0, ok = 0, due = 0; const t = today0() + DAY - 1;
    ids.forEach(id => { const c = S.prog.cards[id]; if (!c) return; seen++; ok += c.ok; if (c.due <= t) due++; });
    return { n: ids.length, seen, ok, due, acc: seen ? ok / seen : null };
  }
  function vDrills() {
    const all = [...GEN.keys()], g = genStats(all);
    const chip = id => { const c = S.prog.cards[id]; return !c ? '<span class="chip">New</span>' : c.ok && c.conf !== 2 ? '<span class="chip good">Right</span>' : c.ok ? '<span class="chip mid">Guessed</span>' : '<span class="chip bad">Missed</span>'; };
    return `<section class="page"><h2>Calculation drills</h2><p class="sub">${all.length} exam formulas that turn into fresh questions with new numbers every time, so you practice the method, not the answer.</p>
      <div class="glance"><div class="glh">Your formulas</div><div class="glrow" style="grid-template-columns:repeat(4,minmax(0,1fr))">
        <div><b>${g.seen}<small>/${g.n}</small></b><span>Tried at least once</span></div><div><b>${g.acc == null ? '–' : pct(g.acc)}</b><span>Right on the latest try</span></div>
        <div><b>${g.due}</b><span>Due for review today</span></div><div><b>${Object.keys(GEN_BY_TOPIC).filter(t => GEN_BY_TOPIC[t].length).length}</b><span>Topics covered</span></div></div></div>
      <div class="qfoot"><button class="btn big" data-act="gen-mix">Mixed set · ${GEN_N} calculations</button><button class="btn ghost" data-act="gen-timed">Timed set at 1:30 each</button><span class="small muted">Weakest formulas first.</span></div>
      ${B.topics.filter(t => GEN_BY_TOPIC[t.id].length).map(t => { const ids = GEN_BY_TOPIC[t.id], s = genStats(ids);
        return `<details class="gx"><summary><span class="grow"><b>${esc(t.name)}</b> <span class="small muted">· ${ids.length} formulas · ${s.seen ? `${s.ok} of ${s.seen} right` : 'not started'}</span></span><button class="btn sm" data-act="gen-topic" data-id="${t.id}">Drill</button></summary>
          <ul class="list">${ids.map(id => { const q = GEN.get(id), m = MOD.get(q.m), c = S.prog.cards[id]; return `<li>${chip(id)}<div class="grow"><b>${esc(q.title)}</b><div class="small muted">LM ${m.num} ${esc(m.title)}${c ? ` · next review ${fmtDate(c.due)}` : ''}</div></div></li>`; }).join('')}</ul></details>`; }).join('')}
      <p class="src">Each formula is one card in your daily review: a miss brings it back tomorrow with new numbers. Wrong options are built from the usual slips (missing a compounding step, the wrong base, a forgotten tax shield). Mocks add generated calculations once a topic's unseen curriculum questions run out.</p></section>
    ${vFlash()}`;
  }
  const FC_N = 10;
  const dueOf = ids => { const t = today0() + DAY - 1; return ids.filter(id => S.prog.cards[id] && S.prog.cards[id].due <= t); };
  function vFlash() {
    const all = [...FLASH.keys()], f = genStats(all), fresh = all.filter(id => !S.prog.cards[id]).length;
    return `<section class="page"><h2>Formula flashcards</h2><p class="sub">${all.length} formulas to know cold. Write each from memory, flip the card, and grade yourself; misses come back tomorrow.</p>
      <div class="glance"><div class="glh">Your deck</div><div class="glrow" style="grid-template-columns:repeat(4,minmax(0,1fr))">
        <div><b>${f.seen}<small>/${f.n}</small></b><span>Cards studied</span></div><div><b>${f.acc == null ? '–' : pct(f.acc)}</b><span>Recalled on the latest try</span></div>
        <div><b>${f.due}</b><span>Due today</span></div><div><b>${fresh}</b><span>Not seen yet</span></div></div></div>
      <div class="qfoot"><button class="btn big" data-act="fc-new" ${fresh ? '' : 'disabled'}>Learn ${Math.min(FC_N, fresh)} new cards</button><button class="btn ghost" data-act="fc-due" ${f.due ? '' : 'disabled'}>Review ${f.due} due</button><span class="small muted">New cards follow your study plan's order.</span></div>
      ${B.topics.filter(t => FLASH_BY_TOPIC[t.id].length).map(t => { const ids = FLASH_BY_TOPIC[t.id], s = genStats(ids);
        return `<details class="gx"><summary><span class="grow"><b>${esc(t.name)}</b> <span class="small muted">· ${ids.length} cards · ${s.seen ? `${s.ok} of ${s.seen} recalled` : 'not started'}</span></span><button class="btn sm" data-act="fc-topic" data-id="${t.id}">Study</button></summary>
          <div class="tw"><table class="fin fsheet"><tbody>${ids.map(id => { const q = FLASH.get(id); return `<tr><td><b>${esc(q.title)}</b><div class="small muted">LM ${MOD.get(q.m).num}</div></td><td><span class="fx">${esc(q.sol[0])}</span><div class="small muted">${esc(q.sol[1])}</div></td></tr>`; }).join('')}</tbody></table></div></details>`; }).join('')}
      <p class="src">Open a topic for its formula sheet. Cards are summaries written for this trainer; when wording differs, the curriculum wins.</p></section>`;
  }

  // ---------- analytics ----------
  function hbars(rows, o = {}) {
    // horizontal bars as HTML: label | track (with optional reference line) | value text
    const max = o.max || Math.max(1e-9, ...rows.map(r => r.v));
    return `<div class="hbars">${rows.map(r => `<div class="hb" title="${esc(r.title || '')}"><span class="hl">${esc(r.label)}</span><span class="ht">${r.v == null ? '' : `<i style="width:${Math.min(100, r.v / max * 100)}%"></i>`}${o.ref != null ? `<b style="left:${Math.min(100, o.ref / max * 100)}%"></b>` : ''}</span><span class="hv">${r.text}</span></div>`).join('')}
      ${o.ref != null ? `<div class="hb hbkey"><span></span><span class="small muted">${esc(o.refLabel)}</span><span></span></div>` : ''}</div>`;
  }
  function scoreLine(pts) {
    // one series: timed scores over time, with a dashed 70% reference
    const W = 640, H = 230, L = 44, Rr = 16, T = 14, Bm = 34, n = pts.length;
    const x = i => n === 1 ? (L + W - Rr) / 2 : L + i * (W - L - Rr) / (n - 1), y = v => T + (1 - v) * (H - T - Bm);
    const ticks = [0, 0.25, 0.5, 0.75, 1];
    let s = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Timed scores over time">`;
    ticks.forEach(v => { s += `<line class="grid" x1="${L}" x2="${W - Rr}" y1="${y(v)}" y2="${y(v)}"/><text class="tick" x="${L - 8}" y="${y(v) + 4}" text-anchor="end">${v * 100}%</text>`; });
    s += `<line class="mark" x1="${L}" x2="${W - Rr}" y1="${y(MOCK_TARGET)}" y2="${y(MOCK_TARGET)}"/><text class="anno" x="${W - Rr}" y="${y(MOCK_TARGET) - 6}" text-anchor="end">70% rule of thumb</text>`;
    if (n > 1) s += `<polyline class="p1" points="${pts.map((p, i) => `${x(i)},${y(p.v)}`).join(' ')}"/>`;
    pts.forEach((p, i) => { s += `<circle class="${p.kind === 'mock' ? 'dx' : 'd1'}" cx="${x(i)}" cy="${y(p.v)}" r="${p.kind === 'mock' ? 6 : 4.5}"><title>${esc(p.label)}: ${pct(p.v)} on ${fmtDate(p.t)}</title></circle>`; });
    const step = Math.max(1, Math.ceil(n / 8));
    pts.forEach((p, i) => { if (i % step === 0 || i === n - 1) s += `<text class="tick" x="${x(i)}" y="${H - 12}" text-anchor="middle">${fmtDate(p.t)}</text>`; });
    return s + '</svg>';
  }
  function vAnalytics() {
    const hist = Object.entries(S.prog.cards).filter(([id]) => Q.has(id)).flatMap(([id, c]) => (c.h || []).map(h => ({ id, t: h[0], ok: h[1], conf: h[2], secs: h[3], topic: topicOfQ(id) })));
    const byTopic = B.topics.map(t => { const xs = hist.filter(h => h.topic === t.id), last = Object.entries(S.prog.cards).filter(([id]) => Q.has(id) && topicOfQ(id) === t.id);
      return { t, n: xs.length, acc: last.length ? last.filter(([, c]) => c.ok).length / last.length : null, cards: last.length, pace: xs.filter(h => h.secs > 0).length ? xs.filter(h => h.secs > 0).reduce((a, h) => a + Math.min(h.secs, 600), 0) / xs.filter(h => h.secs > 0).length : null }; });
    const conf = [0, 1, 2].map(k => { const xs = hist.filter(h => h.conf === k); return { k, n: xs.length, acc: xs.length ? xs.filter(h => h.ok).length / xs.length : null }; });
    const tags = { concept: 0, calc: 0, misread: 0 }; Object.values(S.prog.notes).forEach(n => { if (tags[n.tag] != null) tags[n.tag]++; });
    const timed = [
      ...Object.entries(S.prog.quizzes).flatMap(([mid, l]) => l.filter(x => x.mode === 'exam').map(x => ({ t: x.t, v: x.ok / x.n, kind: 'quiz', label: `Timed quiz LM ${MOD.get(mid) ? MOD.get(mid).num : ''}` }))),
      ...Object.entries(S.prog.tests).flatMap(([tid, l]) => l.map(x => ({ t: x.t, v: x.ok / x.n, kind: 'test', label: `Topic test ${TOP.get(tid).name}` }))),
      ...S.prog.mocks.map((x, i) => ({ t: x.t, v: x.ok / x.n, kind: 'mock', label: `Mock ${i + 1}` }))
    ].sort((a, b) => a.t - b.t).slice(-30);
    // projected score: latest mock if any, else exam-weighted accuracy over topics with 10+ answered questions
    const lastMock = S.prog.mocks[S.prog.mocks.length - 1];
    let proj = null;
    if (lastMock) { const p = lastMock.ok / lastMock.n; proj = { p, se: Math.sqrt(p * (1 - p) / lastMock.n), basis: `your latest mock (${fmtDate(lastMock.t)})` }; }
    else { const used = byTopic.filter(x => x.cards >= 10); if (used.length) { const W = used.reduce((a, x) => a + x.t.w, 0), p = used.reduce((a, x) => a + x.t.w * x.acc, 0) / W, n = used.reduce((a, x) => a + x.cards, 0); proj = { p, se: Math.sqrt(p * (1 - p) / n), basis: `exam-weighted accuracy in ${used.length} of 10 topics (10+ questions answered each)` }; } }
    const weeks = [...Array(8)].map((_, i) => { const end = today0() - (7 - i) * 7 * DAY + 7 * DAY; let secs = 0, n = 0; for (let d = 0; d < 7; d++) { const x = S.prog.daily[dayKey(end - (7 - d) * DAY)]; if (x) { secs += x.secs; n += x.n; } } return { t: end - 7 * DAY, min: Math.round(secs / 60), n }; });
    const allPace = hist.filter(h => h.secs > 0), pace = allPace.length ? allPace.reduce((a, h) => a + Math.min(h.secs, 600), 0) / allPace.length : null;
    const wmax = Math.max(60, ...weeks.map(w => w.min));
    return `<section class="page"><h2>Analytics</h2><p class="sub">Where your score stands, where the points are, and how you work.</p>
      <div class="glance"><div class="glh">At a glance</div><div class="glrow">
        <div><b>${proj ? pct(proj.p) : '–'}</b><span>${proj ? `Projected score, range ${pct(Math.max(0, proj.p - 1.96 * proj.se))}–${pct(Math.min(1, proj.p + 1.96 * proj.se))}` : 'Projected score: answer 10+ questions in a topic, or take a mock'}</span></div>
        <div><b>${comma(hist.length)}</b><span>Answers logged</span></div>
        <div><b>${pace == null ? '–' : fmtSecs(pace)}</b><span>Average time a question (target 1:30)</span></div>
        <div><b>${conf[0].acc == null ? '–' : pct(conf[0].acc)}</b><span>Right when you were sure</span></div>
        <div><b>${Math.round(weeks.slice(-4).reduce((a, w) => a + w.min, 0) / 60 * 10) / 10}</b><span>Hours practiced, last 4 weeks</span></div></div></div>
      <p class="src">${proj ? `Projection basis: ${proj.basis}. The range is a 95% interval from sample size alone; real exam questions differ, so treat it as a rough guide.` : 'The projection needs either a mock or at least 10 answered questions in a topic.'}</p></section>
    <section class="page"><h2>Accuracy by topic</h2><p class="sub">Share right on the latest attempt of each question, topics in order of exam weight</p>
      ${hbars([...byTopic].sort((a, b) => b.t.w - a.t.w).map(x => ({ label: `${x.t.name} (${x.t.w}%)`, v: x.acc, text: x.acc == null ? 'no data' : `${pct(x.acc)} · ${x.cards}`, title: `${x.t.name}: ${x.acc == null ? 'no answers yet' : pct(x.acc) + ' right on ' + x.cards + ' questions'}` })), { max: 1, ref: MOCK_TARGET, refLabel: 'Line: 70% rule-of-thumb target' })}
      <p class="src">Number after the percentage: questions answered at least once.</p></section>
    <section class="page"><div class="two">
      <div><h2>Pace by topic</h2>${hbars(byTopic.map(x => ({ label: x.t.name, v: x.pace, text: x.pace == null ? 'no data' : fmtSecs(x.pace), title: `${x.t.name}: ${x.pace == null ? 'no timed answers' : fmtSecs(x.pace) + ' a question'}` })), { max: Math.max(180, ...byTopic.map(x => x.pace || 0)), ref: PACE, refLabel: 'Line: exam pace of 1:30' })}</div>
      <div><h2>Confidence check</h2><p class="small muted">How often you're right, by how sure you said you were</p>
        ${hbars(conf.map(c => ({ label: ['Sure', 'Unsure', 'Guess'][c.k], v: c.acc, text: c.acc == null ? 'no data' : `${pct(c.acc)} · ${c.n}`, title: `${['Sure', 'Unsure', 'Guess'][c.k]}: ${c.n} answers` })), { max: 1 })}
        <p class="small">${conf[0].n >= 20 && conf[0].acc < 0.85 ? `<b>Overconfidence flag:</b> you're right ${pct(conf[0].acc)} of the time when sure. Slow down on questions that feel easy.` : conf[0].n >= 20 ? 'Your "sure" answers are reliable.' : 'Needs 20+ "sure" answers to judge.'} Timed exams log answers as unsure.</p></div></div></section>
    <section class="page"><h2>Timed scores</h2><p class="sub">Timed module quizzes, topic tests and mocks (larger orange dots)</p>
      ${timed.length ? scoreLine(timed) : '<p class="empty">No timed results yet. Take a timed quiz, a topic test or a mock.</p>'}</section>
    <section class="page"><div class="two">
      <div><h2>Why you miss</h2>${hbars([['concept', 'Concept gaps'], ['calc', 'Calculation slips'], ['misread', 'Misreads']].map(([k, l]) => ({ label: l, v: tags[k], text: String(tags[k]) })), { max: Math.max(1, ...Object.values(tags)) })}
        <p class="small muted">From the reasons you tag on missed questions.</p></div>
      <div><h2>Practice time</h2><div class="weeks">${weeks.map(w => `<div title="Week of ${fmtDate(w.t)}: ${w.min} min, ${w.n} questions"><span style="height:${Math.round(w.min / wmax * 90)}px"></span><small>${fmtDate(w.t)}</small></div>`).join('')}</div>
        <p class="small muted">Minutes a week from timed answers, last 8 weeks.</p></div></div></section>`;
  }

  // ---------- views ----------
  const TABS = { home: 'Home', plan: 'Study plan', lessons: 'Lessons', map: 'Mastery map', quizzes: 'Module quizzes', exams: 'Exams', drills: 'Drills', review: 'Daily review', notebook: 'Error notebook', analytics: 'Analytics' };
  function setView(v) { S.view = v; if (TABS[v]) { try { history.replaceState(null, '', '#' + v); } catch (e) { /* sandboxed */ } } render(); window.scrollTo(0, 0); }

  function masthead() {
    const lv = level(), due = dueIds().length;
    const ex = S.prog.settings.exam;
    return `<header class="top"><div class="brand"><div class="eyebrow">CFA Program · Level I · 2027 curriculum</div>
        <div class="bt">Level I Preparation</div><div class="bs">Practice from the official curriculum, paced to your exam</div></div>
      <div class="topr"><div class="eyebrow">${ex ? fmtDate(examDay(), { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : 'May 2027 window · date assumed'}</div>
        <div class="cdbig">${daysLeft()} days to go</div>
        <div class="row" style="display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end"><span class="lvl">Level ${lv.L} · ${comma(lv.xp)} XP</span><span class="sync" id="sync" data-state="${S.sync}">${SYNC_TXT[S.sync]}</span></div></div></header>
      <nav class="tabs">${Object.entries(TABS).map(([k, l]) => `<button class="tab ${S.view === k || (k === 'quizzes' && S.view === 'module') || (k === 'lessons' && S.view === 'lesson') ? 'on' : ''}" data-view="${k}">${l}${k === 'review' && due ? `<span class="n">${due}</span>` : ''}</button>`).join('')}</nav>`;
  }

  function ring(v, label) {
    const r = 56, c = 2 * Math.PI * r;
    return `<svg class="ring" viewBox="0 0 132 132" role="img" aria-label="${label} ${pct(v)}"><circle class="rbg" cx="66" cy="66" r="${r}"/><circle class="rfg" cx="66" cy="66" r="${r}" stroke-dasharray="${c * v} ${c}" transform="rotate(-90 66 66)"/><text class="rv" x="66" y="68" text-anchor="middle">${pct(v)}</text><text class="rl" x="66" y="88" text-anchor="middle">${label}</text></svg>`;
  }

  function vHome() {
    const p = plan(), lv = level(), r = readiness(), due = dueIds().length;
    const answered = Object.keys(S.prog.cards).filter(isBank).length;
    const week = p.weeks[p.cur] || { mods: [], phase: 'pass' };
    const ranked = B.topics.map(t => ({ t, s: topicStats(t) })).sort((a, b) => b.s.risk - a.s.risk);
    const hr = new Date().getHours(), hello = hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening';
    const leftNew = Math.max(0, (+S.prog.settings.newPerDay || 15) - newToday());
    const nextQuiz = [...p.late, ...week.mods].find(m => !modStats(m).passed && modQs(m).length);
    const weakest = ranked[0];
    const misses = Object.entries(S.prog.cards).filter(([id, c]) => Q.has(id) && !c.ok).sort((a, b) => b[1].last - a[1].last).slice(0, 6);
    const line = p.late.length ? `You're ${p.late.length} module${p.late.length > 1 ? 's' : ''} behind the plan. Start with LM ${p.late[0].num}, ${esc(p.late[0].title)}.`
      : week.phase === 'pass' ? `This week: ${week.mods.length ? week.mods.map(m => `${esc(topicName(m))} LM ${m.num}`).join(', ') : 'catch-up and review'}.` : `This week is for ${{ review: 'review and weak spots', mock: 'mock exams', final: 'a light final review' }[week.phase]}.`;
    const days = [...Array(14)].map((_, i) => { const t = Date.now() - (13 - i) * DAY, d = S.prog.daily[dayKey(t)]; return { t, n: d ? d.n : 0, min: d ? Math.round(d.secs / 60) : 0 }; });
    const dmax = Math.max(20, ...days.map(d => d.n));
    const W = 420, H = 120, bw = (W - 30) / 14;
    const chart = `<svg class="act" viewBox="0 0 ${W} ${H}" role="img" aria-label="Questions answered per day, last 14 days"><line class="grid" x1="24" x2="${W}" y1="${H - 20}" y2="${H - 20}"/><text class="tick" x="0" y="14">${dmax}</text><text class="tick" x="0" y="${H - 22}">0</text>
      ${days.map((d, i) => { const h = d.n / dmax * (H - 34); return `<rect class="b ${i === 13 ? 'today' : ''}" x="${28 + i * bw}" y="${H - 20 - h}" width="${bw - 4}" height="${Math.max(h, d.n ? 2 : 0)}"><title>${fmtDate(d.t)}: ${d.n} questions, ${d.min} min</title></rect>${i % 2 === 1 ? `<text class="tick" x="${28 + i * bw + (bw - 4) / 2}" y="${H - 6}" text-anchor="middle">${new Date(d.t).getDate()}</text>` : ''}`; }).join('')}</svg>`;
    return `<section class="page">
      <h2>${hello}, ${NAME}.</h2>
      <p class="greet">${line} ${due ? `${due} review${due > 1 ? 's are' : ' is'} due today.` : ''}</p>
      <div class="glance"><div class="glh">Progress at a glance</div><div class="glrow">
        <div><b>${pct(r)}</b><span>Readiness, weighted by exam weight</span></div>
        <div><b>${comma(answered)}<small>/${comma(B.questions.filter(q => usable(q)).length)}</small></b><span>Curriculum questions answered</span></div>
        <div><b>${p.passed}<small>/${STUDY.length}</small></b><span>Modules passed (quiz ≥ 70%)</span></div>
        <div><b>${lv.L}</b><span>Level · ${comma(lv.xp - lv.lo)} of ${comma(lv.hi - lv.lo)} XP to next</span></div>
        <div><b>${streak()}</b><span>Day streak</span></div></div></div>
      <h3>How to stay on plan</h3>
      <div class="flow">
        <div class="fcol"><div class="fh"><b>Learn:</b> this week's modules</div>
          ${(p.late.length ? p.late.slice(0, 2) : []).concat(week.mods).slice(0, 4).map(m => `<button class="fbox f-navy ${modStats(m).passed ? 'done' : ''}" ${hasLesson(m.id) ? `data-lesson="${m.id}"` : `data-mod="${m.id}"`}>LM ${m.num} · ${esc(m.title)}<small>${esc(topicName(m))}${hasLesson(m.id) ? (S.prog.lessons[m.id] ? ' · lesson read' : ' · lesson + quiz') : ''}${p.late.includes(m) ? ' · carried over' : ''}${modStats(m).passed ? ' · passed' : ''}</small></button>`).join('') || `<button class="fbox f-navy" data-view="plan">Open the study plan<small>${week.phase === 'pass' ? 'No modules scheduled this week' : 'First pass is finished'}</small></button>`}
          ${week.mods.length > 4 ? `<button class="link" data-view="plan">+ ${week.mods.length - 4} more this week</button>` : ''}</div>
        <div class="fcol"><div class="fh"><b>Practice:</b> keep it fresh</div>
          <button class="fbox f-steel" data-act="review">Daily review<small>${due} due · ${leftNew} new today</small></button>
          <button class="fbox f-steel" data-act="topic" data-id="${weakest.t.id}">Drill your biggest gap: ${esc(weakest.t.name)}<small>${weakest.s.risk.toFixed(1)} exam points at risk</small></button>
          <button class="fbox f-steel" data-view="drills">Calculation drills and formula cards<small>${GEN.size} generated calculations · ${FLASH.size} formula cards${dueOf([...FLASH.keys()]).length ? ` · ${dueOf([...FLASH.keys()]).length} due` : ''}</small></button>
          <button class="fbox f-steel" data-view="notebook">Error notebook<small>${Object.values(S.prog.cards).filter(c => !c.ok).length} misses to revisit</small></button></div>
        <div class="fcol"><div class="fh"><b>Rehearse:</b> exam conditions</div>
          ${nextQuiz ? `<button class="fbox f-line" data-quiz="${nextQuiz.id}" data-mode="exam">Timed quiz · LM ${nextQuiz.num}<small>${modQs(nextQuiz).filter(id => Q.get(id).opts).length} questions at 1:30 each</small></button>` : ''}
          <button class="fbox f-line" data-act="test" data-id="${weakest.t.id}">Topic test · ${esc(weakest.t.name)}<small>30 questions at exam pace</small></button>
          <button class="fbox f-line" ${lsGet(LS_MOCK) ? 'data-act="resume-mock"' : 'data-view="exams"'}>${lsGet(LS_MOCK) ? 'Resume your mock' : 'Full mock exam'}<small>${S.prog.mocks.length ? `Last: ${pct(S.prog.mocks[S.prog.mocks.length - 1].ok / S.prog.mocks[S.prog.mocks.length - 1].n)} · ` : ''}180 questions, two sessions</small></button></div>
      </div>
      <p class="src">Readiness averages your learning-outcome blocks on the Mastery map, weighted by each topic's exam weight. A block counts fully when its questions are answered right at 85% or better and have held up over spaced reviews.</p>
    </section>
    <section class="page"><h2>Where you're losing points</h2><p class="sub">Topics ranked by exam weight times the share not yet mastered</p>
      <div class="hero">${ring(r, 'Readiness')}<div style="flex:1;min-width:0">
        <div class="skrow skhead"><span>Topic</span><span class="skp">Weight</span><span class="hm">Mastery</span><span class="skp">Right</span><span class="skp">At risk</span><span></span></div>
        ${ranked.map(({ t, s }) => `<div class="skrow"><span class="skn">${esc(t.name)}<br><span class="small muted">${s.passed}/${s.mods} modules passed</span></span><span class="skp">${t.w}%</span><span class="bar"><span style="width:${pct(s.score)}"></span></span><span class="skp">${s.seen ? pct(s.acc) : '–'}</span><span class="skp">${s.risk.toFixed(1)}</span><button class="btn sm ghost" data-act="topic" data-id="${t.id}">Drill</button></div>`).join('')}
      </div></div>
      <p class="src">Source: exam weights are the midpoints of CFA Institute's Level I topic weight ranges. "At risk" is in exam percentage points.</p></section>
    <section class="page"><div class="two">
      <div><h2>Last 14 days</h2>${chart}<p class="small muted">${days.reduce((a, d) => a + d.n, 0)} questions · ${days.reduce((a, d) => a + d.min, 0)} minutes of practice</p></div>
      <div><h2>Level ${lv.L}</h2><div class="bar" style="height:10px;margin:10px 0 6px"><span style="width:${pct((lv.xp - lv.lo) / (lv.hi - lv.lo))};background:var(--gold)"></span></div>
        <p class="small">${comma(lv.xp)} XP · ${comma(lv.hi - lv.xp)} to Level ${lv.L + 1}</p>
        <p class="small muted">10 XP for each right answer, 3 for each attempt, 25 for finishing a module quiz and 50 more the first time you pass one.</p></div></div></section>
    <section class="page"><h2>Mastery map</h2><p class="sub">${STUDY.reduce((a, m) => a + m.los.length, 0)} learning outcomes, one block each</p>${mapGrid(true)}<button class="link" data-view="map">Open the full map</button></section>
    <section class="page"><h2>Recent misses</h2>
      ${misses.length ? `<ul class="list">${misses.map(([id, c]) => { const q = Q.get(id), m = MOD.get(q.m); return `<li><span class="chip bad">Missed</span><div class="grow"><b>${esc(topicName(m))} · LM ${m.num} · ${qtag(q)}</b><div class="clip">${snippet(q)}</div></div><span class="small muted">${fmtDate(c.last)}</span></li>`; }).join('')}</ul>
        <button class="btn" data-act="redo-misses">Retry these ${misses.length}</button>` : `<p class="empty">No misses yet. They'll show up here after your first session.</p>`}
    </section>
    ${vSettings()}`;
  }

  function vSettings() {
    return `<section class="page"><h2>Settings and backup</h2>
      <div class="planbar"><label for="set-exam">Exam date<input id="set-exam" type="date" value="${esc(S.prog.settings.exam || '')}"></label>
        <label for="set-new">New questions per day<input id="set-new" type="number" min="0" max="80" value="${+S.prog.settings.newPerDay || 15}" style="width:6em"></label>
        <button class="btn sm" data-act="save-settings">Save</button></div>
      <details><summary class="link">Back up or restore progress</summary>
        <div class="qfoot"><button class="btn sm ghost" data-act="export">Copy progress as text</button><button class="btn sm ghost" data-act="import">Restore from pasted text</button></div>
        <textarea id="backup" class="txt" placeholder="Copied progress appears here. To restore, paste a backup and press Restore."></textarea></details>
      <p class="src">Progress syncs to your Claude account when this page runs on claude.ai, and is also kept in this browser. A restore merges with what's here, keeping the newer record of each question.</p></section>`;
  }

  // ---------- study plan view ----------
  function vPlan() {
    const p = plan(), ex = S.prog.settings.exam;
    const phaseName = { pass: 'First pass through the curriculum', review: 'Review and weak spots', mock: 'Mock exams', final: 'Final week' };
    const notes = {
      review: i => ['Re-take every module quiz under 70%, weakest topic first.', 'Drill the two topics with the most points at risk on Home.', 'Clear the error notebook; second pass through Ethics standards.', 'Mixed daily reviews; re-take quizzes of modules that slipped below Solid.'][i % 4],
      mock: i => ['Full mock (Exams tab) under exam timing: 2 sessions of 2h15 with a break. Review every miss the next day.', 'CFA Institute official mock exam (Learning Ecosystem). Log weak topics here and drill them.', 'Second official mock. Final weak-spot drills.'][i % 3],
      final: () => 'Keep it light: Ethics standards, daily review only, rest the day before.'
    };
    let html = '', lastPhase = '', pi = 0;
    p.weeks.forEach((w, i) => {
      if (w.phase !== lastPhase) {
        const span = p.weeks.filter(x => x.phase === w.phase);
        html += `<div class="phase">${phaseName[w.phase]}<small>${fmtDate(span[0].t)} to ${fmtDate(span[span.length - 1].t + 6 * DAY)} · ${span.length} week${span.length > 1 ? 's' : ''}</small></div>`;
        lastPhase = w.phase; pi = 0;
      }
      const isNow = i === p.cur, past = i < p.cur;
      const mods = isNow ? [...p.late, ...w.mods] : w.mods;
      const hrs = Math.round(mods.reduce((a, m) => a + Math.max(4, m.pages[1] - m.pages[0] + 1), 0) / p.total * HOURS);
      html += `<div class="week ${isNow ? 'now' : ''} ${past ? 'past' : ''}"><div class="wd"><b>${isNow ? 'This week' : 'Week ' + (i + 1)}</b>${fmtDate(w.t)} – ${fmtDate(w.t + 6 * DAY)}</div><div>`;
      if (w.phase === 'pass') html += mods.length ? `<div class="wmods">${mods.map(m => { const s = modStats(m), late = isNow && p.late.includes(m); return `<button class="wmod ${s.passed ? 'pass' : s.quiz.length ? 'tried' : ''} ${late ? 'late' : ''}" ${hasLesson(m.id) ? `data-lesson="${m.id}"` : `data-mod="${m.id}"`}><i>${esc(TOP.get(m.topic).id.toUpperCase())} ${m.num}</i>${esc(m.title)}${s.passed ? ' ✓' : ''}</button>`; }).join('')}</div>` : '<span class="wnote muted">Catch-up week</span>';
      else html += `<span class="wnote">${notes[w.phase](pi)}</span>`;
      html += `</div><div class="wh">${w.phase === 'pass' ? `≈ ${hrs} h${isNow && p.late.length ? '<br>incl. carry-over' : ''}` : ''}</div></div>`;
      pi++;
    });
    const behind = p.late.length;
    return `<section class="page"><h2>Study plan</h2><p class="sub">Every module once, in curriculum order, paced by page count. The first pass ends eight weeks before the exam to leave room for review and mocks.</p>
      <div class="planbar"><label for="plan-exam">Exam date${ex ? '' : ' (assumed)'}<input id="plan-exam" type="date" value="${esc(ex || DEFAULT_EXAM)}"></label>
        <label for="plan-start">Plan started<input id="plan-start" type="date" value="${esc(S.prog.settings.planStart)}"></label>
        <button class="btn sm" data-act="save-plan">Update plan</button>
        <span class="small muted">${STUDY.length} modules · ${comma(p.total)} pages · ${p.passWeeks} weeks for the first pass</span></div>
      <div class="status ${behind ? 'no' : 'ok'}">${behind ? `<b>${behind} module${behind > 1 ? 's' : ''} behind.</b> They're carried into this week, highlighted in orange. A module counts as done once you pass its quiz at 70% or better.` : `<b>On track.</b> ${p.passed} of ${STUDY.length} modules passed${p.expected ? `; ${p.expected} were scheduled before this week` : ''}.`}${ex ? '' : ' Set your real exam date above; the plan assumes May 17, 2027.'}</div>
      ${html}
      <p class="src">Hours split CFA Institute's guideline of about 300 study hours for Level I across modules by page count, including each module's practice questions. Weekly load follows the page count of each module in the 2027 Level I curriculum; weekends aren't scheduled separately.</p></section>`;
  }

  // ---------- mastery map ----------
  const STATE_TXT = ['Not started', 'Started', 'Solid', 'Gold'];
  function mapGrid(mini) {
    return `<div class="${mini ? 'mini' : ''}">${B.topics.map(t => {
      const s = topicStats(t);
      return `<div class="mtopic"><div class="tn"><b>${esc(t.name)}</b><span>${t.w}% of the exam · ${pct(s.score)} built</span></div><div class="mmods">${s.ms.map(({ m, s: ms }) => `<div class="mmod">${mini ? '' : `<span class="ml">LM ${m.num}</span>`}<div class="mblocks">${ms.losS.map((x, i) => mini ? `<span class="blk s${x.s} ${x.nq ? 'nq' : ''} ${x.ck ? 'ck' : ''}"></span>` : `<button class="blk s${x.s} ${x.nq ? 'nq' : ''} ${x.ck ? 'ck' : ''} ${S.sel === m.id + ':' + i ? 'sel' : ''}" data-los="${m.id}:${i}" aria-label="LM ${m.num} outcome ${i + 1}: ${STATE_TXT[x.s]}" title="${esc(m.los[i])}"></button>`).join('') || (mini ? '' : '<span class="small muted">No outcomes listed</span>')}</div></div>`).join('')}</div></div>`;
    }).join('')}</div>`;
  }
  function vMap() {
    const all = STUDY.flatMap(m => modStats(m).losS);
    const cnt = [0, 1, 2, 3].map(k => all.filter(x => x.s === k).length);
    let detail = '';
    if (S.sel) {
      const [mid, i] = S.sel.split(':'), m = MOD.get(mid), x = losState(m, +i);
      detail = `<div class="detail"><div class="lbl">${esc(topicName(m))} · LM ${m.num} ${esc(m.title)} · outcome ${+i + 1}</div><p><b>${esc(m.los[i])}</b></p>
        <p class="small">${x.nq ? 'No end-of-module question was matched to this outcome. Tick it off once you can do it.' : `${x.seen} of ${x.n} matched questions answered · ${x.seen ? pct(x.acc) + ' right' : 'not started'} · ${STATE_TXT[x.s]}`}</p>
        <div class="qfoot">${x.nq ? '' : `<button class="btn sm" data-act="los-drill" data-id="${S.sel}">Practice this outcome</button>`}<label class="small"><input type="checkbox" data-losck="${S.sel}" ${x.ck ? 'checked' : ''}> I can do this</label><button class="link" data-mod="${m.id}">Open the module</button></div></div>`;
    }
    return `<section class="page"><h2>Mastery map</h2><p class="sub">One block for each of the ${all.length} learning outcomes. Answer the questions behind a block correctly, and keep them right over spaced reviews, to turn it gold.</p>
      <div class="built"><div><b>${cnt[3]}</b><span>Gold</span></div><div><b>${cnt[2]}</b><span>Solid</span></div><div><b>${cnt[1]}</b><span>Started</span></div><div><b>${cnt[0]}</b><span>Not started</span></div></div>
      <div class="legend"><span><i class="blk"></i>Not started</span><span><i class="blk s1"></i>Started</span><span><i class="blk s2"></i>Solid: half answered, 75%+ right</span><span><i class="blk s3"></i>Gold: all answered, 85%+ right, held two weeks</span><span><i class="blk nq"></i>No matched question (tick it off yourself)</span></div>
      ${detail}${mapGrid(false)}
      <p class="src">Source: learning outcome statements from the CFA Program Curriculum 2027, Level I. The curriculum doesn't label questions by outcome; each question is matched to the outcome whose wording it shares most, so treat a block as an estimate.</p></section>`;
  }

  // ---------- quizzes list + module page ----------
  function vQuizzes() {
    return `<section class="page"><h2>Module quizzes</h2><p class="sub">Each module's end-of-chapter questions. Practice mode shows the solution after every answer; exam mode is timed at 1:30 a question and scores at the end. Pass at 70%.</p>
      ${B.topics.map(t => { const ts = topicStats(t); return `<div class="tpart">${esc(t.name)}<small>${t.w}% of the exam · ${ts.passed}/${ts.mods} passed</small></div>
        ${ts.ms.map(({ m, s }) => `<div class="qlrow"><span class="mn">${m.num}</span><button class="mt" data-mod="${m.id}">${esc(m.title)}<small>${s.n} questions${s.quiz.length ? ` · ${s.quiz.length} attempt${s.quiz.length > 1 ? 's' : ''}` : ''}</small></button>
          <span class="sc ${s.best == null ? 'lv-new' : s.passed ? 'lv-solid' : 'lv-weak'}">${s.best == null ? '–' : pct(s.best)}</span>
          <span class="st">${s.passed ? '<span class="chip good">Passed</span>' : s.quiz.length ? '<span class="chip mid">Not yet</span>' : '<span class="chip">New</span>'}</span>
          <span class="acts">${s.n ? `<button class="btn sm ghost" data-quiz="${m.id}" data-mode="practice">Practice</button><button class="btn sm" data-quiz="${m.id}" data-mode="exam">Timed</button>` : '<span class="small muted">No questions</span>'}</span></div>`).join('')}`; }).join('')}
      <p class="src">Source: end-of-module practice problems and solutions, CFA Program Curriculum 2027, Level I (10 volumes). About one in eight questions is held back for the full mock exams.</p></section>`;
  }
  function vModule() {
    const m = MOD.get(S.mod), t = TOP.get(m.topic), s = modStats(m);
    return `<section class="page"><div class="crumbs"><button class="link" data-view="quizzes">← All modules</button><span class="muted">${esc(t.name)} · Vol. ${t.vol}</span></div>
      <div class="lbl">Learning Module ${m.num}</div><h2>${esc(m.title)}</h2>
      <p class="take">${s.passed ? `Passed with a best of ${pct(s.best)}.` : s.quiz.length ? `Best so far ${pct(s.best)}. Pass mark is 70%.` : `${s.n} questions. Read the module, then take the quiz.`}</p>
      <div class="qfoot">${hasLesson(m.id) ? `<button class="btn big" data-lesson="${m.id}">${S.prog.lessons[m.id] ? 'Review the lesson' : 'Read the lesson'}</button>` : ''}${s.n ? `<button class="btn big ${hasLesson(m.id) ? 'ghost' : ''}" data-quiz="${m.id}" data-mode="practice">Practice quiz</button><button class="btn big ghost" data-quiz="${m.id}" data-mode="exam">Timed quiz · ${fmtSecs(modQs(m).filter(id => Q.get(id).opts).length * PACE)}</button>` : ''}${s.weak ? `<button class="btn ghost" data-act="mod-weak" data-id="${m.id}">Weak spots only (${s.weak})</button>` : ''}</div>
      ${m.overview.length ? `<h3 class="sh">Module overview</h3><ul class="ovw">${m.overview.map(o => `<li>${esc(o)}</li>`).join('')}</ul>` : ''}
      <h3 class="sh">Learning outcomes</h3>
      <ul class="loslist">${m.los.map((l, i) => { const x = s.losS[i]; return `<li><span class="blk s${x.s} ${x.nq ? 'nq' : ''} ${x.ck ? 'ck' : ''}"></span><span>${esc(l)}</span><label class="small"><input type="checkbox" data-losck="${m.id}:${i}" ${x.ck ? 'checked' : ''}> Can do</label></li>`; }).join('') || '<li><span></span><span class="muted">The curriculum lists no outcomes for this module.</span><span></span></li>'}</ul>
      ${s.quiz.length ? `<h3 class="sh">Quiz history</h3><ul class="list">${s.quiz.slice().reverse().map(x => `<li><span class="chip ${x.ok / x.n >= PASS ? 'good' : 'mid'}">${pct(x.ok / x.n)}</span><span class="grow">${x.ok} of ${x.n} · ${x.mode === 'exam' ? 'timed' : 'practice'} · ${fmtSecs(x.secs)}</span><span class="small muted">${fmtDate(x.t)}</span></li>`).join('')}</ul>` : ''}
      <p class="src">Source: CFA Program Curriculum 2027, Level I, Vol. ${t.vol} ${esc(t.name)}, Learning Module ${m.num}, pp. ${m.pages[0]}–${m.pages[1]} of the volume PDF. Overview and outcomes quoted from the module's opening pages.</p></section>`;
  }

  // ---------- lessons ----------
  function vLessons() {
    const total = Object.keys(LES).length, read = Object.keys(S.prog.lessons).filter(k => LES[k]).length;
    return `<section class="page"><h2>Lessons</h2><p class="sub">One lesson per module: the exam takeaway, the idea in plain English, the formulas, a worked example, the traps, and a quick check. ${total >= STUDY.length ? `All ${total} modules covered.` : `${total} written so far; the rest are on the way.`}</p>
      <div class="glance"><div class="glh">Lessons</div><div class="glrow" style="grid-template-columns:repeat(3,minmax(0,1fr))"><div><b>${read}<small>/${total}</small></b><span>Lessons read</span></div>
        <div><b>${Object.values(S.prog.lessons).reduce((a, l) => a + l.ok, 0)}<small>/${Object.values(S.prog.lessons).reduce((a, l) => a + l.n, 0)}</small></b><span>Quick-check answers right</span></div>
        <div><b>${B.topics.filter(t => t.modules.some(hasLesson)).length}<small>/10</small></b><span>Topics with lessons</span></div></div></div>
      ${[...B.topics].sort((a, b) => (b.modules.some(hasLesson) - a.modules.some(hasLesson)) || (b.w - a.w)).map(t => {
        const ms = t.modules.map(id => MOD.get(id)).filter(m => STUDY.includes(m)), n = ms.filter(m => hasLesson(m.id)).length;
        return `<div class="tpart">${esc(t.name)}<small>${n ? `${ms.filter(m => S.prog.lessons[m.id]).length} of ${n} read` : 'Lessons coming in a later update'}</small></div>
          ${n ? ms.map(m => { const l = LES[m.id], done = S.prog.lessons[m.id]; return `<div class="qlrow" style="grid-template-columns:34px minmax(0,1fr) 90px auto"><span class="mn">${m.num}</span>
            <button class="mt" ${l ? `data-lesson="${m.id}"` : 'disabled'}>${esc(m.title)}<small>${l ? `${l.mins} min · ${l.checks.length} check questions` : 'Lesson coming'}</small></button>
            <span class="sc">${done ? `<span class="chip good">${done.ok}/${done.n}</span>` : l ? '<span class="chip">New</span>' : ''}</span>
            <span class="acts">${l ? `<button class="btn sm ${done ? 'ghost' : ''}" data-lesson="${m.id}">${done ? 'Review' : 'Read'}</button>` : ''}</span></div>`; }).join('') : ''}`;
      }).join('')}
      <p class="src">Lessons are written for this trainer from the CFA Program Curriculum 2027, Level I, in plain language. Quick-check questions are original, not from the curriculum; the module quizzes use the curriculum's own questions.</p></section>`;
  }
  function openLesson(mid) { S.les = mid; S.lc = { mid, picks: {} }; setView('lesson'); }
  function lessonPick(v) {
    const [i, k] = v.split(':').map(Number), L = LES[S.les];
    if (S.lc.picks[i] != null) return;
    S.lc.picks[i] = k;
    if (Object.keys(S.lc.picks).length === L.checks.length) {
      const ok = L.checks.filter((c, j) => S.lc.picks[j] === c.a).length, first = !S.prog.lessons[S.les];
      S.prog.lessons[S.les] = { t: Date.now(), ok, n: L.checks.length };
      if (first) { S.prog.xp = (S.prog.xp || 0) + 15; toast(`Lesson done: ${ok} of ${L.checks.length} right · +15 XP`); }
      save();
    }
    render();
    const el = document.getElementById('chk-' + i); if (el) el.scrollIntoView({ block: 'nearest' });
  }
  function vLesson() {
    const m = MOD.get(S.les), t = TOP.get(m.topic), L = LES[S.les], s = modStats(m), done = S.prog.lessons[S.les];
    const idx = t.modules.indexOf(m.id), next = t.modules.slice(idx + 1).map(id => MOD.get(id)).find(x => STUDY.includes(x));
    const all = Object.keys(S.lc.picks).length === L.checks.length;
    return `<section class="page lesson"><div class="crumbs"><button class="link" data-view="lessons">← All lessons</button><span class="muted">${esc(t.name)} · Vol. ${t.vol} · ${L.mins} min</span></div>
      <div class="lbl">Lesson · Learning Module ${m.num}</div><h2>${esc(m.title)}</h2>
      <div class="take"><span>Exam takeaway</span>${L.take}</div>
      ${m.los.length ? `<details class="losbox"><summary class="link">What the curriculum says you must be able to do (${m.los.length})</summary><ul>${m.los.map(l => `<li>${esc(l)}</li>`).join('')}</ul></details>` : ''}
      ${L.html}
      <h3 class="sh">Quick check</h3><p class="small muted">Pick an answer to see whether it's right and why. These are written for the trainer.</p>
      ${L.checks.map((c, i) => { const p = S.lc.picks[i]; return `<div class="check" id="chk-${i}"><p><b>${i + 1}.</b> ${c.q}</p><div class="opts">${c.o.map((o, k) => `<button class="opt ${p == null ? '' : k === c.a ? 'right' : p === k ? 'wrong' : ''}" data-lc="${i}:${k}" ${p == null ? '' : 'disabled'}><span class="dotsel"></span><span class="ol">${'ABC'[k]}</span><span>${o}</span></button>`).join('')}</div>
        ${p == null ? '' : `<div class="fb ${p === c.a ? 'ok' : 'no'}"><b>${p === c.a ? 'Right.' : `Not quite: it's ${'ABC'[c.a]}.`}</b> ${c.why}</div>`}</div>`; }).join('')}
      ${all || done ? `<div class="status ok"><b>${all ? `${L.checks.filter((c, j) => S.lc.picks[j] === c.a).length} of ${L.checks.length} right.` : `Read before: ${done.ok} of ${done.n} right.`}</b> Next, test it on the curriculum's own questions.</div>` : ''}
      <div class="qfoot">${s.n ? `<button class="btn big" data-quiz="${m.id}" data-mode="practice">Module quiz · ${s.n} questions</button><button class="btn ghost" data-quiz="${m.id}" data-mode="exam">Timed</button>` : ''}${next ? `<button class="btn ghost" ${hasLesson(next.id) ? `data-lesson="${next.id}"` : `data-mod="${next.id}"`}>Next: LM ${next.num}</button>` : ''}</div>
      <p class="src">Written for this trainer from the CFA Program Curriculum 2027, Level I, Vol. ${t.vol} ${esc(t.name)}, Learning Module ${m.num} (PDF pp. ${m.pages[0]}–${m.pages[1]}), in plain language. Worked examples and quick-check questions are original.</p></section>`;
  }

  // ---------- question runner ----------
  function vRun() {
    if (S.run.onBreak) return vBreak();
    const R = S.run, id = R.ids[R.i], q = Q.get(id), m = MOD.get(q.m), set = q.set && SET.get(q.set);
    const a = R.ans[id] || {}, exam = R.mode === 'exam', shown = !exam && R.revealed;
    const opts = q.opts ? q.opts.map((o, k) => {
      let cls = a.pick === k ? 'sel' : '';
      if (shown) cls = k === q.ans ? 'right' : a.pick === k ? 'wrong' : '';
      return `<button class="opt ${cls}" data-pick="${k}" ${shown ? 'disabled' : ''}><span class="dotsel"></span><span class="ol">${'ABC'[k]}</span><span>${inl(o)}</span></button>`;
    }).join('') : '';
    const prior = R.prior[id];
    let foot = '';
    if (exam) {
      foot = `<div class="qfoot"><button class="btn ghost" data-act="prev" ${R.i > segA(R) ? '' : 'disabled'}>Previous</button><button class="btn" data-act="next">${R.i + 1 < segB(R) ? 'Next' : 'Review answers'} <kbd>Enter</kbd></button><button class="btn sm ghost" data-act="flag">${R.flags[id] ? 'Unflag' : 'Flag for review'} <kbd>F</kbd></button></div>
        <div class="navgrid">${R.ids.map((x, k) => k < segA(R) || k >= segB(R) ? '' : `<button class="nv ${R.ans[x] && R.ans[x].pick != null ? 'ans' : ''} ${k === R.i ? 'cur' : ''} ${R.flags[x] ? 'flag' : ''}" data-go="${k}">${k + 1}</button>`).join('')}</div>`;
    } else if (!R.revealed) {
      foot = q.opts ? `<div class="lock"><span class="lbl">Lock in</span><button class="btn sm" data-conf="0" ${a.pick == null ? 'disabled' : ''}>Sure <kbd>1</kbd></button><button class="btn sm" data-conf="1" ${a.pick == null ? 'disabled' : ''}>Unsure <kbd>2</kbd></button><button class="btn sm" data-conf="2" ${a.pick == null ? 'disabled' : ''}>Guess <kbd>3</kbd></button></div>`
        : q.flash ? `<p class="small muted">Write the formula from memory, then flip the card and grade yourself.</p><div class="qfoot"><button class="btn" data-act="reveal">Flip card <kbd>Enter</kbd></button></div>`
        : `<p class="small muted">Open-ended: work it out on paper, then check the curriculum's solution and grade yourself.</p><div class="qfoot"><button class="btn" data-act="reveal">Show solution <kbd>Enter</kbd></button></div>`;
    } else {
      const note = S.prog.notes[id] || {}, missed = q.opts ? !a.ok : a.self > 0;
      foot = `${q.opts ? `<div class="fb ${a.ok ? 'ok' : 'no'}"><b>${a.ok ? 'Correct.' : `Not quite. The answer is ${'ABC'[q.ans]}.`}</b></div>` : a.self == null ? '' : `<div class="fb ${a.self === 0 ? 'ok' : 'no'}"><b>${['Got it', 'Partly', 'Missed it'][a.self]}</b></div>`}
        <div class="sol">${q.flash ? `<p class="fx">${esc(q.sol[0])}</p><p>${esc(q.sol[1])}</p>` : paras(q.sol)}</div>
        ${!q.opts && a.self == null ? `<div class="lock"><span class="lbl">How did you do?</span><button class="btn sm" data-self="0">Got it <kbd>1</kbd></button><button class="btn sm" data-self="1">Partly <kbd>2</kbd></button><button class="btn sm" data-self="2">Missed it <kbd>3</kbd></button></div>` : ''}
        ${missed ? `<div class="tags"><span class="lbl">Why I missed it</span>${['concept', 'calc', 'misread'].map(t => `<button class="tagbtn" data-tag="${t}" aria-pressed="${note.tag === t}">${{ concept: 'Concept', calc: 'Calculation', misread: 'Misread' }[t]}</button>`).join('')}</div><textarea id="note" class="txt" placeholder="Note to future you (optional)" style="margin-top:8px">${esc(note.text || '')}</textarea>` : ''}
        ${q.opts || a.self != null ? `<div class="qfoot"><button class="btn" data-act="next">${R.i + 1 < R.ids.length ? 'Next question' : 'See results'} <kbd>Enter</kbd></button></div>` : ''}`;
    }
    const card = `<section class="qcard"><div class="qref">${esc(topicName(m))} · LM ${m.num} · ${q.gen ? 'Calculation: ' + esc(q.title) : q.flash ? 'Formula card' : 'Question ' + q.n}${prior === null ? ' · new' : prior === 0 ? ' · missed before' : ' · seen before'}</div>
      <div class="stem">${paras(q.stem)}</div>${q.opts ? `<div class="opts">${opts}</div>` : ''}${foot}
      <p class="src">Source: ${esc(src(q))}</p></section>`;
    const multi = R.bounds.length > 2, segAns = R.ids.slice(segA(R), segB(R)).filter(x => R.ans[x] && R.ans[x].pick != null).length;
    const head = exam ? `<div class="exambar"><b>${esc(R.label)}</b><span class="muted">${multi ? `Session ${R.session + 1} of ${R.bounds.length - 1} · ` : ''}Question ${R.i + 1} of ${R.ids.length} · ${segAns} of ${segB(R) - segA(R)} answered</span><span id="timer">${fmtSecs(Math.max(0, (R.deadline - Date.now()) / 1000))}</span>${R.kind === 'mock' ? '<button class="btn sm pausebtn" data-act="pause">Pause and save</button>' : ''}<button class="btn sm" data-act="submit" ${R.kind === 'mock' ? 'style="margin-left:0"' : ''}>${multi && R.session < R.bounds.length - 2 ? `Submit session ${R.session + 1}` : 'Submit'}</button></div>`
      : `<section class="page slim" style="padding-bottom:18px"><div class="crumbs" style="margin:0"><div><div class="lbl">${esc(R.label)}</div><b>${R.i + 1} of ${R.ids.length}</b> <span class="pace" id="pace">${R.revealed ? '' : '0:00'}</span></div><button class="btn sm ghost" data-act="end">End and see results</button></div><div class="progress"><span style="width:${R.i / R.ids.length * 100}%"></span></div></section>`;
    return head + (set ? `<div class="qwrap split"><section class="qcard vign"><div class="qref">Case for questions ${set.lo}–${set.hi}<span class="small muted" style="text-transform:none;letter-spacing:0;font-weight:400"> · scrolls on its own</span></div><div class="stem">${paras(set.text)}</div><p class="src">Source: ${esc(TOP.get(m.topic).name)}, LM ${m.num}${set.pg ? ', p. ' + set.pg : ''}</p></section>${card}</div>` : card);
  }

  function vResults() {
    const r = S.result;
    if (!r) return `<section class="page"><p class="empty">No results to show.</p></section>`;
    const sc = r.n ? r.ok / r.n : 0;
    const byLos = new Map();
    r.items.forEach(x => { const q = Q.get(x.id), m = MOD.get(q.m); if (q.los == null || !m.los.length) return; const k = q.m + ':' + q.los; const o = byLos.get(k) || { m, i: q.los, n: 0, ok: 0 }; o.n++; o.ok += x.ok ? 1 : 0; byLos.set(k, o); });
    return `<section class="page"><div class="lbl">${esc(r.label)} · ${r.mode === 'exam' ? 'timed' : 'practice'}</div>
      <div class="hero" style="margin:10px 0 6px"><div><div class="score">${r.n ? pct(sc) : '–'}</div><div class="small muted">${r.ok} of ${r.n} right</div></div>
        <div>${r.kind === 'quiz' ? `<span class="chip ${sc >= PASS ? 'good' : 'mid'}">${sc >= PASS ? 'Passed' : 'Below the 70% pass mark'}</span>` : r.kind === 'mock' || r.kind === 'test' ? `<span class="chip ${sc >= MOCK_TARGET ? 'good' : 'mid'}">${sc >= MOCK_TARGET ? 'At or above the 70% rule of thumb' : 'Below the 70% rule of thumb'}</span>` : ''}
          <p class="small" style="margin:.6em 0 .3em">${fmtSecs(r.secs)} total · ${r.n ? fmtSecs(r.items.reduce((a, x) => a + x.secs, 0) / r.n) : '–'} a question (exam pace is 1:30)</p>
          <span class="xp">+${r.xp} XP${r.kind === 'quiz' && r.bonus >= 75 ? ' · module passed' : ''}</span></div></div>
      ${r.kind === 'mock' || r.kind === 'test' ? (() => {
        const rows = r.kind === 'mock' ? B.topics.filter(t => r.byTopic[t.id]).map(t => ({ label: `${t.name} (${t.w}%)`, ok: r.byTopic[t.id][0], n: r.byTopic[t.id][1] }))
          : [...new Set(r.items.map(x => Q.get(x.id).m))].map(mid => { const xs = r.items.filter(x => Q.get(x.id).m === mid); return { label: `LM ${MOD.get(mid).num} ${MOD.get(mid).title}`, ok: xs.filter(x => x.ok).length, n: xs.length }; });
        return `<h3 class="sh">By ${r.kind === 'mock' ? 'topic' : 'module'}</h3>${hbars(rows.map(o => ({ label: o.label, v: o.ok / o.n, text: `${o.ok}/${o.n}` })), { max: 1, ref: MOCK_TARGET, refLabel: 'Line: 70%' })}`;
      })() : ''}
      ${r.kind === 'quiz' && byLos.size ? `<h3 class="sh">By learning outcome</h3>${[...byLos.values()].map(o => `<div class="skrow" style="grid-template-columns:minmax(0,1fr) 70px"><span class="skn small">${esc(o.m.los[o.i])}</span><span class="skp ${o.ok / o.n >= .75 ? 'lv-solid' : o.ok / o.n >= .5 ? 'lv-mid' : 'lv-weak'}">${o.ok}/${o.n}</span></div>`).join('')}` : ''}
      <h3 class="sh">Every question</h3>
      ${r.items.map(x => { const q = Q.get(x.id); return `<details class="rv"><summary><span class="chip ${x.ok ? 'good' : 'bad'}">${x.ok ? 'Right' : 'Missed'}</span><span class="grow small">${qtag(q)} · ${snippet(q)}</span></summary>
        <div class="stem">${paras(q.stem)}</div>${q.opts ? `<div class="opts">${q.opts.map((o, k) => `<div class="opt ${k === q.ans ? 'right' : x.pick === k ? 'wrong' : ''}"><span class="ol">${'ABC'[k]}</span><span>${inl(o)}</span></div>`).join('')}</div>` : ''}<div class="sol">${paras(q.sol)}</div><p class="src">Source: ${esc(src(q))}</p></details>`; }).join('')}
      <div class="qfoot">${r.items.some(x => !x.ok) ? `<button class="btn" data-act="redo-result">Retry the ${r.items.filter(x => !x.ok).length} missed</button>` : ''}${r.mid ? `<button class="btn ghost" data-quiz="${r.mid}" data-mode="${r.mode}">Retake</button><button class="btn ghost" data-mod="${r.mid}">Back to the module</button>` : ''}<button class="btn ghost" data-view="home">Home</button></div></section>`;
  }

  function vReview() {
    const due = dueIds().length, left = Math.max(0, (+S.prog.settings.newPerDay || 15) - newToday());
    const td = S.prog.daily[dayKey()] || { n: 0, ok: 0, secs: 0 };
    const sched = [1, 2, 3, 4, 5, 6, 7].map(k => { const t = today0() + k * DAY; return { t, n: Object.values(S.prog.cards).filter(c => c.due >= t && c.due < t + DAY).length }; });
    return `<section class="page"><h2>Daily review</h2><p class="sub">Questions come back just before you'd forget them. Misses return tomorrow; answers you were sure of space out fastest.</p>
      <div class="glance"><div class="glh">Today</div><div class="glrow"><div><b>${due}</b><span>Reviews due</span></div><div><b>${left}</b><span>New questions left today</span></div><div><b>${td.n}</b><span>Answered today</span></div><div><b>${td.n ? pct(td.ok / td.n) : '–'}</b><span>Right today</span></div><div><b>${Math.round(td.secs / 60)}</b><span>Minutes today</span></div></div></div>
      <div class="qfoot"><button class="btn big" data-act="review" ${due + left ? '' : 'disabled'}>Start today's review</button><span class="small muted">New questions come from this week's modules in the study plan.</span></div>
      <h3 class="sh">Coming up</h3><div class="skrow skhead" style="grid-template-columns:1fr 80px"><span>Day</span><span class="skp">Due</span></div>
      ${sched.map(d => `<div class="skrow" style="grid-template-columns:1fr 80px"><span>${fmtDate(d.t, { weekday: 'long', month: 'short', day: 'numeric' })}</span><span class="skp">${d.n}</span></div>`).join('')}
      <p class="src">Keys: A, B, C to pick · 1 sure, 2 unsure, 3 guess to lock in · Enter for the next question.</p></section>`;
  }

  function nbItems() {
    return Object.entries(S.prog.cards).filter(([id, c]) => Q.has(id) && (!c.ok || c.conf === 2 || (S.prog.notes[id] && S.prog.notes[id].tag)))
      .filter(([id]) => !S.nb.topic || topicOfQ(id) === S.nb.topic).filter(([id]) => !S.nb.tag || (S.prog.notes[id] || {}).tag === S.nb.tag)
      .sort((a, b) => b[1].last - a[1].last);
  }
  function vNotebook() {
    const items = nbItems(), counts = { concept: 0, calc: 0, misread: 0 };
    Object.values(S.prog.notes).forEach(n => { if (counts[n.tag] != null) counts[n.tag]++; });
    const T = { concept: 'Concept', calc: 'Calculation', misread: 'Misread' };
    return `<section class="page"><h2>Error notebook</h2><p class="sub">Every miss and lucky guess, with why you missed it. The pattern tells you what to fix.</p>
      <div class="glance"><div class="glh">Why you miss</div><div class="glrow" style="grid-template-columns:repeat(3,minmax(0,1fr))"><div><b>${counts.concept}</b><span>Concept gaps</span></div><div><b>${counts.calc}</b><span>Calculation slips</span></div><div><b>${counts.misread}</b><span>Misreads</span></div></div></div>
      <div class="planbar"><label for="nb-topic">Topic<select id="nb-topic"><option value="">All topics</option>${B.topics.map(t => `<option value="${t.id}" ${S.nb.topic === t.id ? 'selected' : ''}>${esc(t.name)}</option>`).join('')}</select></label>
        <label for="nb-tag">Reason<select id="nb-tag"><option value="">Any reason</option>${Object.entries(T).map(([k, l]) => `<option value="${k}" ${S.nb.tag === k ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
        <button class="btn sm" data-act="nb-drill" ${items.length ? '' : 'disabled'}>Drill these ${items.length}</button></div>
      ${items.length ? `<ul class="list">${items.slice(0, 150).map(([id, c]) => { const q = Q.get(id), m = MOD.get(q.m), n = S.prog.notes[id] || {};
        return `<li>${n.tag ? `<span class="chip bad">${T[n.tag]}</span>` : c.ok ? '<span class="chip mid">Guessed</span>' : '<span class="chip">Untagged</span>'}<div class="grow"><b>${esc(topicName(m))} · LM ${m.num} · ${qtag(q)}</b><div class="clip">${n.text ? esc(n.text) : snippet(q)}</div></div><span class="small muted">${fmtDate(c.last)}</span></li>`; }).join('')}</ul>`
        : `<p class="empty">No misses logged${S.nb.topic || S.nb.tag ? ' for this filter' : ' yet'}. Misses and guesses land here after each session.</p>`}</section>`;
  }

  // ---------- render ----------
  let ticker = null;
  function render() {
    const root = $('#app');
    let body;
    if (S.view === 'run' && S.run) body = vRun();
    else if (S.view === 'results') body = vResults();
    else if (S.view === 'module' && S.mod) body = vModule();
    else if (S.view === 'lesson' && S.les) body = vLesson();
    else body = ({ plan: vPlan, lessons: vLessons, map: vMap, quizzes: vQuizzes, exams: vExams, review: vReview, drills: vDrills, notebook: vNotebook, analytics: vAnalytics }[S.view] || vHome)();
    root.innerHTML = masthead() + `<main id="main">${body}</main>`;
    fillImages(root);
    clearInterval(ticker);
    if (S.view === 'run' && S.run) ticker = setInterval(tick, 1000);
    if (S.run && S.run.kind === 'mock') { S.run.lastSeen = Date.now(); lsSet(LS_MOCK, S.run); }
  }
  function tick() {
    const R = S.run; if (!R) return;
    if (R.mode === 'exam') {
      if (R.onBreak || !R.deadline) return;
      // keep the saved copy fresh, so closing the tab without pausing loses at most a few seconds
      if (R.kind === 'mock' && Date.now() - (R.lastSeen || 0) > 15000) { R.lastSeen = Date.now(); lsSet(LS_MOCK, R); }
      const left = (R.deadline - Date.now()) / 1000, el = $('#timer');
      if (el) { el.textContent = fmtSecs(Math.max(0, left)); el.classList.toggle('low', left < 120); }
      if (left <= 0) { toast('Time is up. This session was submitted.'); endSession(); }
    } else if (!R.revealed) {
      const s = (Date.now() - R.qt) / 1000, el = $('#pace');
      if (el) { el.textContent = fmtSecs(s); el.classList.toggle('over', s > PACE); }
    }
  }

  // ---------- actions ----------
  function lockIn(conf) {
    const R = S.run, id = R.ids[R.i], q = Q.get(id), a = R.ans[id] || {};
    if (R.revealed || a.pick == null) return;
    const secs = (Date.now() - R.qt) / 1000;
    a.ok = a.pick === q.ans; a.conf = conf; a.secs = secs; R.ans[id] = a; R.revealed = true;
    grade(id, a.ok, conf, secs);
    if (!a.ok && R.kind === 'review' && !q.set && !R.requeued[id]) { R.requeued[id] = 1; R.ids.splice(Math.min(R.ids.length, R.i + 6), 0, id); }
    render();
  }
  function selfGrade(v) {
    const R = S.run, id = R.ids[R.i], secs = (Date.now() - R.qt) / 1000;
    R.ans[id] = { self: v, ok: v === 0, secs, pick: null };
    grade(id, v < 2, v === 0 ? 0 : 2, secs);
    render();
  }
  function next() {
    const R = S.run, ta = $('#note');
    if (ta) saveNote(R.ids[R.i], { text: ta.value.trim() });
    if (R.mode === 'exam') { const id = R.ids[R.i]; const a = R.ans[id] = R.ans[id] || { pick: null }; a.secs = (a.secs || 0) + (Date.now() - R.qt) / 1000; }
    if (R.mode === 'exam' && R.i + 1 >= segB(R)) { toast('Last question of this session. Submit when you are ready.'); render(); return; }
    if (R.i + 1 >= R.ids.length) { finishRun(); return; }
    R.i++; R.revealed = false; R.qt = Date.now();
    render(); window.scrollTo(0, 0);
  }
  function go(k) { const R = S.run; const id = R.ids[R.i]; const a = R.ans[id] = R.ans[id] || { pick: null }; a.secs = (a.secs || 0) + (Date.now() - R.qt) / 1000; R.i = Math.max(segA(R), Math.min(segB(R) - 1, k)); R.qt = Date.now(); render(); window.scrollTo(0, 0); }
  function saveNote(id, patch) {
    const n = Object.assign({}, S.prog.notes[id], patch, { t: Date.now() });
    if (!n.tag && !n.text) delete S.prog.notes[id]; else S.prog.notes[id] = n;
    save();
  }
  const weakIds = ids => ids.filter(i => S.prog.cards[i] && (!S.prog.cards[i].ok || S.prog.cards[i].conf === 2));

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-view],[data-act],[data-pick],[data-conf],[data-self],[data-tag],[data-mod],[data-quiz],[data-los],[data-go],[data-lesson],[data-lc]');
    if (!el) return;
    const d = el.dataset;
    if (d.view) { if (S.run && !confirmLeave()) return; S.run = null; setView(d.view); return; }
    if (d.quiz) { startQuiz(d.quiz, d.mode); return; }
    if (d.mod) { if (S.run && !confirmLeave()) return; S.run = null; S.mod = d.mod; setView('module'); return; }
    if (d.los) { S.sel = S.sel === d.los ? null : d.los; render(); return; }
    if (d.lesson) { if (S.run && !confirmLeave()) return; S.run = null; openLesson(d.lesson); return; }
    if (d.lc) { lessonPick(d.lc); return; }
    if (d.go != null) { go(+d.go); return; }
    if (d.pick != null && S.run) { const id = S.run.ids[S.run.i]; if (S.run.mode === 'practice' && S.run.revealed) return; S.run.ans[id] = Object.assign(S.run.ans[id] || {}, { pick: +d.pick }); render(); return; }
    if (d.conf != null) { lockIn(+d.conf); return; }
    if (d.self != null) { selfGrade(+d.self); return; }
    if (d.tag) { const id = S.run.ids[S.run.i], cur = (S.prog.notes[id] || {}).tag; saveNote(id, { tag: cur === d.tag ? '' : d.tag }); render(); return; }
    const a = d.act;
    if (a === 'review') startReview();
    else if (a === 'topic') { const t = TOP.get(d.id); const ids = t.modules.flatMap(id => modQs(MOD.get(id))); const unseen = shuffle(ids.filter(i => !S.prog.cards[i])); const weak = weakIds(ids); const pick = [...weak, ...unseen].slice(0, 20); startRun(pick.length ? pick : shuffle(ids).slice(0, 20), t.name + ' drill'); }
    else if (a === 'mod-weak') { const m = MOD.get(d.id); startRun(weakIds(modQs(m)), 'Weak spots · LM ' + m.num); }
    else if (a === 'los-drill') { const [mid, i] = d.id.split(':'); const x = losState(MOD.get(mid), +i); startRun(x.ids || [], 'Outcome drill · LM ' + MOD.get(mid).num); }
    else if (a === 'redo-misses') { startRun(Object.entries(S.prog.cards).filter(([id, c]) => Q.has(id) && !c.ok).sort((x, y) => y[1].last - x[1].last).slice(0, 6).map(([id]) => id), 'Retry recent misses', { keep: true }); }
    else if (a === 'redo-result') { startRun(S.result.items.filter(x => !x.ok).map(x => x.id), 'Retry misses', { keep: true }); }
    else if (a === 'gen-mix') startRun(genOrder([...GEN.keys()]).slice(0, GEN_N), 'Calculation drill · mixed', { keep: true });
    else if (a === 'gen-timed') startRun(genOrder([...GEN.keys()]).slice(0, GEN_N), 'Timed calculation set', { keep: true, mode: 'exam' });
    else if (a === 'gen-topic') startRun(genOrder(GEN_BY_TOPIC[d.id]), 'Calculation drill · ' + TOP.get(d.id).name, { keep: true });
    else if (a === 'fc-new') { const order = new Map(plan().weeks.flatMap(w => w.mods).map((m, i) => [m.id, i])); startRun([...FLASH.keys()].filter(id => !S.prog.cards[id]).sort((x, y) => (order.get(FLASH.get(x).m) ?? 999) - (order.get(FLASH.get(y).m) ?? 999)).slice(0, FC_N), 'Formula cards · new', { keep: true }); }
    else if (a === 'fc-due') startRun(dueOf([...FLASH.keys()]), 'Formula cards · due', { keep: true });
    else if (a === 'fc-topic') startRun(genOrder(FLASH_BY_TOPIC[d.id]), 'Formula cards · ' + TOP.get(d.id).name, { keep: true });
    else if (a === 'nb-drill') startRun(nbItems().map(([id]) => id), 'Error notebook drill');
    else if (a === 'reveal') { S.run.revealed = true; render(); }
    else if (a === 'next') next();
    else if (a === 'prev') go(S.run.i - 1);
    else if (a === 'flag') { const id = S.run.ids[S.run.i]; S.run.flags[id] = !S.run.flags[id]; render(); }
    else if (a === 'submit') { const R = S.run, open = R.ids.slice(segA(R), segB(R)).filter(id => !R.ans[id] || R.ans[id].pick == null).length; if (open && R.confirmSubmit !== R.session) { R.confirmSubmit = R.session; toast(`${open} unanswered. Press Submit again to finish this session.`); return; } endSession(); }
    else if (a === 'pause') pauseMock(true);
    else if (a === 'start-session') { const R = S.run; R.onBreak = false; R.deadline = Date.now() + R.sessionSecs * 1000; R.qt = Date.now(); render(); window.scrollTo(0, 0); }
    else if (a === 'mock') startMock();
    else if (a === 'resume-mock') resumeMock();
    else if (a === 'discard-mock') { if (S.confirmDiscard) { lsDel(LS_MOCK); S.confirmDiscard = false; render(); toast('Saved mock discarded'); } else { S.confirmDiscard = true; toast('Press Discard again to throw away the saved mock.'); } }
    else if (a === 'test') startTest(d.id);
    else if (a === 'end') finishRun();
    else if (a === 'save-settings') { S.prog.settings.exam = $('#set-exam').value; S.prog.settings.newPerDay = Math.max(0, Math.min(80, +$('#set-new').value || 15)); save(); render(); toast('Settings saved'); }
    else if (a === 'save-plan') { const ex = $('#plan-exam').value, st = $('#plan-start').value; if (ex) S.prog.settings.exam = ex; if (st) S.prog.settings.planStart = st; save(); render(); toast('Plan updated'); }
    else if (a === 'export') { const ta = $('#backup'); ta.value = JSON.stringify(S.prog); ta.select(); if (navigator.clipboard) navigator.clipboard.writeText(ta.value).then(() => toast('Progress copied'), () => toast('Select the text and copy it')); }
    else if (a === 'import') { try { const p = JSON.parse($('#backup').value); if (!p || typeof p.cards !== 'object') throw 0; S.prog = mergeProg(S.prog, p); B.topics.forEach(t => dirty.add(t.id)); save(); render(); toast('Progress restored and merged'); } catch (err) { toast('That text is not a progress backup'); } }
  });
  // leaving a run mid-way: answers already locked in are kept; a timed quiz is abandoned without a score
  function confirmLeave() { if (S.run.kind === 'mock') { pauseMock(false); return true; } if (S.run.leaveOk) return true; S.run.leaveOk = true; toast('Click again to leave. Locked-in answers are kept.'); return false; }

  document.addEventListener('change', e => {
    const t = e.target;
    if (t.dataset.losck) { const [mid, i] = t.dataset.losck.split(':'); const o = S.prog.los[mid] = S.prog.los[mid] || {}; o[i] = t.checked ? 1 : 0; save(); render(); }
    if (t.id === 'nb-topic') { S.nb.topic = t.value; render(); }
    if (t.id === 'nb-tag') { S.nb.tag = t.value; render(); }
  });
  document.addEventListener('keydown', e => {
    if (S.view !== 'run' || !S.run || (e.target.matches && e.target.matches('textarea,input,select')) || e.ctrlKey || e.metaKey || e.altKey) return;
    const R = S.run, q = Q.get(R.ids[R.i]), k = e.key.toLowerCase(), a = R.ans[R.ids[R.i]] || {};
    const pick = i => { R.ans[R.ids[R.i]] = Object.assign(a, { pick: i }); render(); };
    if (R.mode === 'exam') {
      if (q.opts && 'abc'.includes(k) && k.length === 1) pick('abc'.indexOf(k));
      else if (k === 'enter') next(); else if (k === 'f') { R.flags[R.ids[R.i]] = !R.flags[R.ids[R.i]]; render(); }
      else if (k === 'arrowright') go(R.i + 1); else if (k === 'arrowleft') go(R.i - 1);
      return;
    }
    if (!R.revealed && q.opts && 'abc'.includes(k) && k.length === 1) pick('abc'.indexOf(k));
    else if (!R.revealed && q.opts && '123'.includes(k) && k.length === 1) lockIn(+k - 1);
    else if (!R.revealed && !q.opts && k === 'enter') { R.revealed = true; render(); }
    else if (R.revealed && !q.opts && a.self == null && '123'.includes(k) && k.length === 1) selfGrade(+k - 1);
    else if (R.revealed && k === 'enter' && (q.opts || a.self != null)) next();
  });
  window.addEventListener('hashchange', () => { const v = location.hash.slice(1); if (TABS[v] && v !== S.view && !S.run) setView(v); });

  const h = (location.hash || '').slice(1);
  if (TABS[h]) S.view = h;
  render();
  connect();
})();
