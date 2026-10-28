/* Calculation generators: each template makes a fresh three-option question from random inputs.
   make(r) returns { stem: [paragraphs], ans: 'right option', wrong: ['common mistake', 'common mistake'], sol: [paragraphs] }.
   r.u(lo, hi, step) draws a value on a grid; r.pick(list) picks one. The app seeds r, shuffles the options and
   redraws if two options would read the same. Formulas follow the 2027 Level I curriculum's conventions. */
window.CFA_GEN = (() => {
  const num = (x, d = 2) => x.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
  const usd = (x, d = 2) => (x < 0 ? '−$' : '$') + num(Math.abs(x), d);
  const pc = (x, d = 2) => (x < 0 ? '−' : '') + num(Math.abs(x) * 100, d) + '%';
  const sgn = (x, f) => (x < 0 ? '−' : '') + f(Math.abs(x));
  const pv = (cfs, y) => cfs.reduce((a, c, t) => a + c / Math.pow(1 + y, t + 1), 0);
  const bond = (c, y, n, par = 100) => pv(Array.from({ length: n }, (_, t) => c + (t === n - 1 ? par : 0)), y);

  return [
    // ---------- Quantitative Methods ----------
    { key: 'fv', m: 'v1m4', title: 'Future value with compounding', make: r => {
      const P = r.u(2000, 50000, 500), y = r.u(0.03, 0.09, 0.0025), n = r.u(2, 10, 1), m = r.pick([2, 4, 12]);
      const name = { 2: 'semiannually', 4: 'quarterly', 12: 'monthly' }[m];
      const fv = P * Math.pow(1 + y / m, m * n);
      return { stem: [`An investor deposits ${usd(P)} in an account paying a stated annual rate of ${pc(y)}, compounded ${name}. What is the balance after ${n} years?`],
        ans: usd(fv), wrong: [usd(P * Math.pow(1 + y, n)), usd(P * (1 + y * n))],
        sol: [`FV = PV × (1 + r/m)^(m×N) = ${usd(P)} × (1 + ${pc(y)}/${m})^(${m}×${n}) = ${usd(fv)}.`, `Compounding once a year gives ${usd(P * Math.pow(1 + y, n))}, which ignores the ${name} compounding; simple interest gives ${usd(P * (1 + y * n))}.`] };
    } },
    { key: 'pva', m: 'v1m4', title: 'Present value of an annuity', make: r => {
      const A = r.u(500, 5000, 100), y = r.u(0.04, 0.1, 0.005), n = r.u(5, 20, 1);
      const v = A * (1 - Math.pow(1 + y, -n)) / y;
      return { stem: [`An ordinary annuity pays ${usd(A, 0)} at the end of each year for ${n} years. At a discount rate of ${pc(y, 1)}, what is it worth today?`],
        ans: usd(v), wrong: [usd(v * (1 + y)), usd(A * (Math.pow(1 + y, n) - 1) / y)],
        sol: [`PV = A × [1 − (1 + r)^−N] / r = ${usd(A, 0)} × [1 − ${num(1 + y, 3)}^−${n}] / ${num(y, 3)} = ${usd(v)}.`, `${usd(v * (1 + y))} treats the payments as an annuity due (start of each year); ${usd(A * (Math.pow(1 + y, n) - 1) / y)} is the future value, not the present value.`] };
    } },
    { key: 'ear', m: 'v1m4', title: 'Effective annual rate', make: r => {
      const y = r.u(0.04, 0.12, 0.0025), m = r.pick([2, 4, 12]);
      const name = { 2: 'semiannual', 4: 'quarterly', 12: 'monthly' }[m];
      const ear = Math.pow(1 + y / m, m) - 1;
      return { stem: [`A loan quotes a stated annual rate of ${pc(y)} with ${name} compounding. What is the effective annual rate?`],
        ans: pc(ear, 3), wrong: [pc(Math.exp(y) - 1, 3), pc(y * (1 + y / m), 3)],
        sol: [`EAR = (1 + r/m)^m − 1 = (1 + ${pc(y)}/${m})^${m} − 1 = ${pc(ear, 3)}.`, `${pc(Math.exp(y) - 1, 3)} is continuous compounding (e^r − 1), which is always a little higher than any discrete compounding.`] };
    } },
    { key: 'hpr', m: 'v1m1', title: 'Holding period return', make: r => {
      const p0 = r.u(20, 120, 0.5), p1 = Math.round(p0 * (1 + r.u(-0.15, 0.3, 0.01)) * 2) / 2, d = r.u(0.4, 3, 0.1);
      const h = (p1 - p0 + d) / p0;
      return { stem: [`A share bought at ${usd(p0)} paid a dividend of ${usd(d)} and was sold one year later at ${usd(p1)}. What is the holding period return?`],
        ans: pc(h), wrong: [pc((p1 - p0) / p0), pc((p1 - p0 + d) / p1)],
        sol: [`HPR = (P1 − P0 + D1) / P0 = (${usd(p1)} − ${usd(p0)} + ${usd(d)}) / ${usd(p0)} = ${pc(h)}.`, `Leaving out the dividend gives the price return only, ${pc((p1 - p0) / p0)}. The denominator is the starting price, not the ending price.`] };
    } },
    { key: 'geo', m: 'v1m1', title: 'Geometric mean return', make: r => {
      const rs = [r.u(-0.2, 0.3, 0.01), r.u(-0.2, 0.3, 0.01), r.u(-0.2, 0.3, 0.01)];
      const g = Math.pow(rs.reduce((a, x) => a * (1 + x), 1), 1 / 3) - 1, a = (rs[0] + rs[1] + rs[2]) / 3;
      return { stem: [`A fund returned ${rs.map(x => pc(x, 0)).join(', ')} in three consecutive years. What is its geometric mean annual return?`],
        ans: pc(g), wrong: [pc(a), pc(rs.reduce((p, x) => p * (1 + x), 1) - 1)],
        sol: [`Geometric mean = [(1 + R1)(1 + R2)(1 + R3)]^(1/3) − 1 = (${rs.map(x => num(1 + x)).join(' × ')})^(1/3) − 1 = ${pc(g)}.`, `The arithmetic mean, ${pc(a)}, is never below the geometric mean; ${pc(rs.reduce((p, x) => p * (1 + x), 1) - 1)} is the cumulative three-year return.`] };
    } },
    { key: 'ccr', m: 'v1m1', title: 'Continuously compounded return', make: r => {
      const p0 = r.u(20, 100, 1), p1 = Math.round(p0 * (1 + r.u(0.1, 0.8, 0.01))), T = r.u(2, 5, 1);
      const c = Math.log(p1 / p0) / T;
      return { stem: [`A stock rose from ${usd(p0)} to ${usd(p1)} over ${T} years with no dividends. What is its annualized continuously compounded return?`],
        ans: pc(c), wrong: [pc(Math.log(p1 / p0)), pc((p1 / p0 - 1) / T)],
        sol: [`r = ln(P_T / P_0) / T = ln(${num(p1 / p0, 4)}) / ${T} = ${pc(c)}.`, `${pc(Math.log(p1 / p0))} is the total continuously compounded return over all ${T} years; continuously compounded returns add across periods, so divide by T.`] };
    } },
    { key: 'ci', m: 'v1m7', title: 'Confidence interval for a mean', make: r => {
      const x = r.u(0.04, 0.12, 0.001), s = r.u(0.1, 0.3, 0.01), n = r.pick([36, 49, 64, 81, 100, 144]);
      const e = 1.96 * s / Math.sqrt(n), e2 = 1.645 * s / Math.sqrt(n);
      const iv = (lo, hi) => `${pc(lo)} to ${pc(hi)}`;
      return { stem: [`A sample of ${n} monthly observations has a mean return of ${pc(x, 1)} and a sample standard deviation of ${pc(s, 0)}. Using a reliability factor of 1.96, what is the 95% confidence interval for the population mean?`],
        ans: iv(x - e, x + e), wrong: [iv(x - e2, x + e2), iv(x - 1.96 * s / n, x + 1.96 * s / n)],
        sol: [`Standard error = s / √n = ${pc(s, 0)} / ${Math.sqrt(n)} = ${pc(s / Math.sqrt(n))}.`, `Interval = mean ± 1.96 × SE = ${pc(x, 1)} ± ${pc(e)} = ${iv(x - e, x + e)}.`, `1.645 gives a 90% interval; dividing by n instead of √n understates the standard error.`] };
    } },
    { key: 'bayes', m: 'v1m5', title: "Bayes' formula", make: r => {
      const pA = r.u(0.2, 0.6, 0.05), pBA = r.u(0.6, 0.9, 0.05), pBn = r.u(0.1, 0.4, 0.05);
      const pB = pBA * pA + pBn * (1 - pA), post = pBA * pA / pB;
      return { stem: [`An analyst puts a ${pc(pA, 0)} prior probability on a company beating earnings. When a company beats, management raises guidance beforehand ${pc(pBA, 0)} of the time; when it doesn't beat, ${pc(pBn, 0)} of the time. Management has just raised guidance. What is the updated probability of a beat?`],
        ans: pc(post, 1), wrong: [pc(pBA, 1), pc(pBA * pA, 1)],
        sol: [`P(raise) = ${num(pBA)} × ${num(pA)} + ${num(pBn)} × ${num(1 - pA)} = ${num(pB, 4)}.`, `P(beat | raise) = P(raise | beat) × P(beat) / P(raise) = ${num(pBA * pA, 4)} / ${num(pB, 4)} = ${pc(post, 1)}.`, `${pc(pBA * pA, 1)} is the joint probability of a raise and a beat, before dividing by the chance of a raise.`] };
    } },
    { key: 'pstd', m: 'v1m8', title: 'Two-asset portfolio risk', make: r => {
      const w = r.u(0.3, 0.7, 0.05), s1 = r.u(0.12, 0.3, 0.01), s2 = r.u(0.05, 0.2, 0.01), rho = r.u(-0.3, 0.6, 0.05);
      const v = w * w * s1 * s1 + (1 - w) * (1 - w) * s2 * s2 + 2 * w * (1 - w) * rho * s1 * s2;
      return { stem: [`A portfolio holds ${pc(w, 0)} in an equity fund (standard deviation ${pc(s1, 0)}) and the rest in a bond fund (standard deviation ${pc(s2, 0)}). The correlation between them is ${num(rho)}. What is the portfolio's standard deviation?`],
        ans: pc(Math.sqrt(v)), wrong: [pc(w * s1 + (1 - w) * s2), pc(Math.sqrt(w * w * s1 * s1 + (1 - w) * (1 - w) * s2 * s2))],
        sol: [`σp² = w1²σ1² + w2²σ2² + 2w1w2ρσ1σ2 = ${num(w * w * s1 * s1, 5)} + ${num((1 - w) * (1 - w) * s2 * s2, 5)} + ${sgn(2 * w * (1 - w) * rho * s1 * s2, z => num(z, 5))} = ${num(v, 5)}, so σp = ${pc(Math.sqrt(v))}.`, `The weighted average of the two standard deviations, ${pc(w * s1 + (1 - w) * s2)}, holds only when the correlation is +1.`] };
    } },

    // ---------- Economics ----------
    { key: 'elas', m: 'v2m1', title: 'Arc price elasticity of demand', make: r => {
      const p1 = r.u(10, 40, 1), p2 = Math.round(p1 * (1 + r.u(0.08, 0.3, 0.01))), q1 = r.u(800, 2000, 50), q2 = Math.round(q1 * (1 - r.u(0.03, 0.2, 0.01)) / 5) * 5;
      const e = ((q2 - q1) / ((q1 + q2) / 2)) / ((p2 - p1) / ((p1 + p2) / 2));
      const eInit = ((q2 - q1) / q1) / ((p2 - p1) / p1);
      return { stem: [`When a product's price rises from ${usd(p1, 0)} to ${usd(p2, 0)}, quantity demanded falls from ${comma(q1)} to ${comma(q2)} units. Using the midpoint (arc) method, what is the price elasticity of demand?`],
        ans: sgn(e, num), wrong: [sgn(eInit, num), sgn(1 / e, num)],
        sol: [`%ΔQ = (${comma(q2)} − ${comma(q1)}) / ${comma((q1 + q2) / 2)} = ${pc((q2 - q1) / ((q1 + q2) / 2))}; %ΔP = ${p2 - p1} / ${num((p1 + p2) / 2, 1)} = ${pc((p2 - p1) / ((p1 + p2) / 2))}.`, `Elasticity = %ΔQ / %ΔP = ${sgn(e, num)}. ${Math.abs(e) > 1 ? 'Demand is elastic over this range.' : 'Demand is inelastic over this range.'}`, `${sgn(eInit, num)} uses the starting price and quantity as bases instead of the midpoints.`] };
    } },
    { key: 'fwdfx', m: 'v2m8', title: 'Forward exchange rate (covered interest parity)', make: r => {
      const S = r.u(1.05, 1.35, 0.0025), ip = r.u(0.01, 0.06, 0.0025), ib = r.u(0.01, 0.06, 0.0025);
      const F = S * (1 + ip) / (1 + ib);
      return { stem: [`The spot USD/EUR rate is ${num(S, 4)} (US dollars per euro). One-year rates are ${pc(ip)} in USD and ${pc(ib)} in EUR. What is the one-year forward USD/EUR rate?`],
        ans: num(F, 4), wrong: [num(S * (1 + ib) / (1 + ip), 4), num(S * (1 + ip - ib), 4)],
        sol: [`F(price/base) = S × (1 + i_price) / (1 + i_base). USD is the price currency, EUR the base.`, `F = ${num(S, 4)} × ${num(1 + ip, 4)} / ${num(1 + ib, 4)} = ${num(F, 4)}.`, `The currency with the higher interest rate trades at a forward discount.`] };
    } },
    { key: 'cross', m: 'v2m8', title: 'Cross exchange rate', make: r => {
      const a = r.u(1.05, 1.35, 0.0025), b = r.u(110, 160, 0.25);
      return { stem: [`USD/EUR is ${num(a, 4)} and JPY/USD is ${num(b)}. What is the JPY/EUR cross rate?`],
        ans: num(a * b), wrong: [num(b / a), num(1 / (a * b), 6)],
        sol: [`JPY/EUR = JPY/USD × USD/EUR = ${num(b)} × ${num(a, 4)} = ${num(a * b)} yen per euro. The USD terms cancel.`] };
    } },

    // ---------- Corporate Issuers ----------
    { key: 'wacc', m: 'v3m6', title: 'Weighted average cost of capital', make: r => {
      const wd = r.u(0.2, 0.5, 0.05), rd = r.u(0.04, 0.08, 0.0025), t = r.pick([0.21, 0.25, 0.3]), re = r.u(0.08, 0.14, 0.0025);
      const w = wd * rd * (1 - t) + (1 - wd) * re;
      return { stem: [`A company targets ${pc(wd, 0)} debt and ${pc(1 - wd, 0)} equity. Its pre-tax cost of debt is ${pc(rd)}, cost of equity ${pc(re)}, and marginal tax rate ${pc(t, 0)}. What is its WACC?`],
        ans: pc(w), wrong: [pc(wd * rd + (1 - wd) * re), pc((1 - wd) * rd * (1 - t) + wd * re)],
        sol: [`WACC = wd × rd × (1 − t) + we × re = ${num(wd)} × ${pc(rd)} × ${num(1 - t)} + ${num(1 - wd)} × ${pc(re)} = ${pc(w)}.`, `${pc(wd * rd + (1 - wd) * re)} forgets the interest tax shield.`] };
    } },
    { key: 'npv', m: 'v3m5', title: 'Net present value', make: r => {
      const I = r.u(500, 2000, 50) * 1000, y = r.u(0.07, 0.13, 0.005), cfs = [0, 1, 2, 3].map(() => Math.round(I * r.u(0.22, 0.4, 0.01) / 1000) * 1000);
      const npv = pv(cfs, y) - I, late = pv(cfs, y) / (1 + y) - I;
      return { stem: [`A project costs ${usd(I, 0)} today and returns ${cfs.map(c => usd(c, 0)).join(', ')} at the end of years 1 to 4. The cost of capital is ${pc(y, 1)}. What is its NPV?`],
        ans: usd(npv, 0), wrong: [usd(cfs.reduce((a, b) => a + b, 0) - I, 0), usd(late, 0)],
        sol: [`NPV = −${usd(I, 0)} + ${cfs.map((c, k) => `${usd(c, 0)}/${num(1 + y, 3)}^${k + 1}`).join(' + ')} = ${usd(npv, 0)}.`, `${npv >= 0 ? 'Positive NPV: accept.' : 'Negative NPV: reject.'} ${usd(cfs.reduce((a, b) => a + b, 0) - I, 0)} ignores discounting; ${usd(late, 0)} discounts each flow one year too many.`] };
    } },
    { key: 'dol', m: 'v3m6', title: 'Degree of operating leverage', make: r => {
      const Q = r.u(20, 80, 5) * 1000, P = r.u(20, 60, 1), V = Math.round(P * r.u(0.35, 0.65, 0.05)), F = Math.round(Q * (P - V) * r.u(0.3, 0.7, 0.05) / 1000) * 1000;
      const cm = Q * (P - V), dol = cm / (cm - F);
      return { stem: [`A firm sells ${comma(Q)} units at ${usd(P, 0)} each. Variable cost is ${usd(V, 0)} a unit and fixed operating costs are ${usd(F, 0)}. What is its degree of operating leverage?`],
        ans: num(dol), wrong: [num(cm / F), num((cm - F) / cm)],
        sol: [`DOL = Q(P − V) / [Q(P − V) − F] = ${usd(cm, 0)} / (${usd(cm, 0)} − ${usd(F, 0)}) = ${num(dol)}.`, `A 1% change in units sold changes operating income by about ${num(dol)}%.`] };
    } },
    { key: 'ccc', m: 'v3m4', title: 'Cash conversion cycle', make: r => {
      const rt = r.u(6, 14, 0.5), it = r.u(4, 10, 0.5), pt = r.u(6, 15, 0.5);
      const dso = 365 / rt, dio = 365 / it, dpo = 365 / pt;
      return { stem: [`A company's receivables turnover is ${num(rt, 1)}, inventory turnover ${num(it, 1)} and payables turnover ${num(pt, 1)} (365-day year). What is its cash conversion cycle?`],
        ans: num(dso + dio - dpo, 1) + ' days', wrong: [num(dso + dio + dpo, 1) + ' days', num(dso + dio, 1) + ' days'],
        sol: [`DSO = 365 / ${num(rt, 1)} = ${num(dso, 1)}; DIO = 365 / ${num(it, 1)} = ${num(dio, 1)}; DPO = 365 / ${num(pt, 1)} = ${num(dpo, 1)}.`, `CCC = DSO + DIO − DPO = ${num(dso + dio - dpo, 1)} days. ${num(dso + dio, 1)} days is the operating cycle, before credit from suppliers.`] };
    } },

    // ---------- Financial Statement Analysis ----------
    { key: 'inv', m: 'v4m6', title: 'FIFO vs LIFO cost of goods sold', make: r => {
      const c1 = r.u(10, 20, 0.5), c2 = c1 + r.u(0.5, 3, 0.5), c3 = c2 + r.u(0.5, 3, 0.5);
      const lots = [[r.u(100, 300, 10), c1], [r.u(100, 300, 10), c2], [r.u(100, 300, 10), c3]];
      const tot = lots.reduce((a, l) => a + l[0], 0), sold = Math.round(tot * r.u(0.45, 0.8, 0.05) / 10) * 10;
      const cogs = order => { let left = sold, c = 0; for (const [u, p] of order) { const k = Math.min(u, left); c += k * p; left -= k; } return c; };
      const fifo = cogs(lots), lifo = cogs([...lots].reverse()), avg = sold * lots.reduce((a, l) => a + l[0] * l[1], 0) / tot;
      const method = r.pick(['FIFO', 'LIFO']);
      return { stem: [`A retailer with no opening inventory bought ${lots.map(([u, p]) => `${u} units at ${usd(p)}`).join(', then ')}. It sold ${sold} units. What is cost of goods sold under ${method}?`],
        ans: usd(method === 'FIFO' ? fifo : lifo), wrong: [usd(method === 'FIFO' ? lifo : fifo), usd(avg)],
        sol: [`${method} charges the ${method === 'FIFO' ? 'earliest' : 'latest'} purchases to COGS first: ${usd(method === 'FIFO' ? fifo : lifo)}.`, `For comparison: FIFO ${usd(fifo)}, LIFO ${usd(lifo)}, weighted average ${usd(avg)}. With rising prices LIFO gives the highest COGS and lowest profit.`] };
    } },
    { key: 'ddb', m: 'v4m7', title: 'Double-declining-balance depreciation', make: r => {
      const C = r.u(50, 400, 10) * 1000, n = r.pick([5, 8, 10]), S = Math.round(C * r.u(0.02, 0.1, 0.01) / 1000) * 1000;
      const rate = 2 / n, d1 = C * rate, d2 = (C - d1) * rate;
      return { stem: [`Equipment costs ${usd(C, 0)}, with a ${n}-year useful life and an estimated salvage value of ${usd(S, 0)}. Using double-declining-balance depreciation, what is the year 2 depreciation expense?`],
        ans: usd(d2, 0), wrong: [usd((C - S) / n, 0), usd((C - S - (C - S) * rate) * rate, 0)],
        sol: [`DDB rate = 2 / ${n} = ${pc(rate, 1)}, applied to beginning book value (salvage is ignored until book value nears it).`, `Year 1: ${usd(C, 0)} × ${pc(rate, 1)} = ${usd(d1, 0)}. Year 2: (${usd(C, 0)} − ${usd(d1, 0)}) × ${pc(rate, 1)} = ${usd(d2, 0)}.`, `${usd((C - S) / n, 0)} is straight-line depreciation.`] };
    } },
    { key: 'deps', m: 'v4m2', title: 'Diluted EPS with convertible preferred', make: r => {
      const W = r.u(2, 10, 0.5) * 1e6, NI = Math.round(W * r.u(2, 5, 0.1) / 1e4) * 1e4, pd = Math.round(NI * r.u(0.08, 0.15, 0.01) / 1e4) * 1e4;
      const basic = (NI - pd) / W, conv = Math.round(pd / (basic * r.u(0.5, 0.8, 0.05)) / 1e4) * 1e4;
      const dil = NI / (W + conv);
      return { stem: [`Net income is ${usd(NI, 0)} and preferred dividends ${usd(pd, 0)}. Weighted average common shares are ${comma(W)}. The preferred stock is convertible into ${comma(conv)} common shares. What is diluted EPS?`],
        ans: usd(dil), wrong: [usd(basic), usd((NI - pd) / (W + conv))],
        sol: [`Basic EPS = (${usd(NI, 0)} − ${usd(pd, 0)}) / ${comma(W)} = ${usd(basic)}.`, `If-converted: add back the preferred dividends and add the new shares. Diluted EPS = ${usd(NI, 0)} / (${comma(W)} + ${comma(conv)}) = ${usd(dil)}. It is below basic EPS, so the preferred is dilutive.`] };
    } },
    { key: 'dupont', m: 'v4m11', title: 'DuPont return on equity', make: r => {
      const A = r.u(500, 3000, 50) * 1e3, Sales = Math.round(A * r.u(0.6, 1.8, 0.05) / 1e3) * 1e3, NI = Math.round(Sales * r.u(0.04, 0.15, 0.005) / 1e3) * 1e3, E = Math.round(A * r.u(0.3, 0.7, 0.05) / 1e3) * 1e3;
      return { stem: [`A company has revenue of ${usd(Sales, 0)}, net income of ${usd(NI, 0)}, average total assets of ${usd(A, 0)} and average equity of ${usd(E, 0)}. What is its return on equity?`],
        ans: pc(NI / E), wrong: [pc(NI / A), pc(NI / Sales * A / E)],
        sol: [`ROE = net profit margin × asset turnover × leverage = ${pc(NI / Sales)} × ${num(Sales / A)} × ${num(A / E)} = ${pc(NI / E)}.`, `${pc(NI / A)} is ROA (no leverage term); ${pc(NI / Sales * A / E)} drops asset turnover.`] };
    } },
    { key: 'cfo', m: 'v4m4', title: 'Operating cash flow, indirect method', make: r => {
      const k = 1000, NI = r.u(200, 900, 10) * k, D = r.u(40, 200, 5) * k, dAR = r.u(10, 120, 5) * k, dInv = r.u(5, 80, 5) * k, dAP = r.u(5, 90, 5) * k, g = r.u(5, 40, 5) * k;
      const cfo = NI + D - dAR + dInv + dAP - g;
      return { stem: [`Net income was ${usd(NI, 0)}, including depreciation of ${usd(D, 0)} and a ${usd(g, 0)} gain on the sale of equipment. Accounts receivable rose ${usd(dAR, 0)}, inventory fell ${usd(dInv, 0)} and accounts payable rose ${usd(dAP, 0)}. What is cash flow from operations?`],
        ans: usd(cfo, 0), wrong: [usd(NI + D + dAR + dInv + dAP - g, 0), usd(NI + D - dAR + dInv + dAP + g, 0)],
        sol: [`CFO = NI + depreciation − gain − ΔAR + decrease in inventory + ΔAP`, `= ${usd(NI, 0)} + ${usd(D, 0)} − ${usd(g, 0)} − ${usd(dAR, 0)} + ${usd(dInv, 0)} + ${usd(dAP, 0)} = ${usd(cfo, 0)}.`, `The gain is subtracted because the sale's proceeds belong in investing cash flow; a rise in receivables is cash not yet collected.`] };
    } },

    // ---------- Equity ----------
    { key: 'ggm', m: 'v5m6', title: 'Gordon growth model', make: r => {
      const D0 = r.u(0.8, 4, 0.05), g = r.u(0.02, 0.06, 0.0025), k = g + r.u(0.03, 0.07, 0.0025);
      const v = D0 * (1 + g) / (k - g);
      return { stem: [`A stock just paid an annual dividend of ${usd(D0)}. Dividends are expected to grow at ${pc(g)} a year forever, and the required return is ${pc(k)}. What is the stock's intrinsic value?`],
        ans: usd(v), wrong: [usd(D0 / (k - g)), usd(D0 * (1 + g) / k)],
        sol: [`V0 = D1 / (r − g) = ${usd(D0)} × ${num(1 + g, 4)} / (${pc(k)} − ${pc(g)}) = ${usd(D0 * (1 + g))} / ${pc(k - g)} = ${usd(v)}.`, `${usd(D0 / (k - g))} uses the dividend just paid (D0) instead of next year's (D1).`] };
    } },
    { key: 'twostage', m: 'v5m6', title: 'Two-stage dividend discount model', make: r => {
      const D0 = r.u(1, 3, 0.05), gh = r.u(0.1, 0.2, 0.01), gl = r.u(0.02, 0.05, 0.005), k = r.u(0.09, 0.13, 0.005);
      const D1 = D0 * (1 + gh), D2 = D1 * (1 + gh), P2 = D2 * (1 + gl) / (k - gl);
      const v = D1 / (1 + k) + (D2 + P2) / Math.pow(1 + k, 2);
      return { stem: [`A company just paid a dividend of ${usd(D0)}. Dividends will grow ${pc(gh, 0)} a year for the next two years, then ${pc(gl, 1)} a year forever. The required return is ${pc(k, 1)}. What is the stock worth today?`],
        ans: usd(v), wrong: [usd(D1 / (1 + k) + D2 / Math.pow(1 + k, 2) + P2 / Math.pow(1 + k, 3)), usd(D1 / (1 + k) + (D2 + D2 / (k - gl)) / Math.pow(1 + k, 2))],
        sol: [`D1 = ${usd(D1)}, D2 = ${usd(D2)}. Terminal value at year 2: P2 = D3 / (r − g) = ${usd(D2 * (1 + gl))} / ${pc(k - gl, 1)} = ${usd(P2)}.`, `V0 = ${usd(D1)}/${num(1 + k, 3)} + (${usd(D2)} + ${usd(P2)})/${num(1 + k, 3)}² = ${usd(v)}.`, `The terminal value at the end of year 2 is discounted two periods, not three.`] };
    } },
    { key: 'pe', m: 'v5m7', title: 'Justified forward P/E', make: r => {
      const b = r.u(0.3, 0.7, 0.05), roe = r.u(0.08, 0.14, 0.005), k = b * roe + r.u(0.03, 0.06, 0.0025);
      const g = b * roe;
      return { stem: [`A company retains ${pc(b, 0)} of earnings and earns a ${pc(roe, 1)} return on equity. Its required return on equity is ${pc(k)}. What is its justified forward P/E?`],
        ans: num(((1 - b) / (k - g)), 1) + 'x', wrong: [num((1 - b) * (1 + g) / (k - g), 1) + 'x', num(b / (k - g), 1) + 'x'],
        sol: [`g = b × ROE = ${num(b)} × ${pc(roe, 1)} = ${pc(g)}.`, `Forward P/E = payout / (r − g) = ${num(1 - b)} / (${pc(k)} − ${pc(g)}) = ${num((1 - b) / (k - g), 1)}x.`, `Multiplying by (1 + g) gives the trailing P/E, ${num((1 - b) * (1 + g) / (k - g), 1)}x.`] };
    } },
    { key: 'margin', m: 'v5m3', title: 'Margin call price', make: r => {
      const P = r.u(20, 150, 1), im = r.pick([0.4, 0.5, 0.6]), mm = r.pick([0.25, 0.3, 0.35]);
      const call = P * (1 - im) / (1 - mm);
      return { stem: [`An investor buys a stock at ${usd(P, 0)} with an initial margin of ${pc(im, 0)}. The maintenance margin is ${pc(mm, 0)}. Below what price will the investor get a margin call?`],
        ans: usd(call), wrong: [usd(P * (1 - mm)), usd(P * (1 - im))],
        sol: [`Margin call price = P0 × (1 − initial margin) / (1 − maintenance margin) = ${usd(P, 0)} × ${num(1 - im)} / ${num(1 - mm)} = ${usd(call)}.`, `At that price, equity (price minus the ${usd(P * (1 - im))} loan) is exactly ${pc(mm, 0)} of the position's value.`] };
    } },
    { key: 'capm', m: 'v5m12', title: 'CAPM required return', make: r => {
      const rf = r.u(0.02, 0.05, 0.0025), mrp = r.u(0.04, 0.07, 0.0025), b = r.u(0.6, 1.8, 0.05);
      const rm = rf + mrp;
      return { stem: [`The risk-free rate is ${pc(rf)}, the expected market return is ${pc(rm)} and a stock's beta is ${num(b)}. What is its required return under the CAPM?`],
        ans: pc(rf + b * mrp), wrong: [pc(rf + b * rm), pc(b * rm)],
        sol: [`E(R) = Rf + β[E(Rm) − Rf] = ${pc(rf)} + ${num(b)} × (${pc(rm)} − ${pc(rf)}) = ${pc(rf + b * mrp)}.`, `Beta multiplies the market risk premium, not the whole market return.`] };
    } },

    // ---------- Fixed Income ----------
    { key: 'bondpx', m: 'v6m6', title: 'Bond price from yield to maturity', make: r => {
      const c = r.u(0.02, 0.08, 0.0025), y = Math.max(0.005, c + r.u(-0.025, 0.025, 0.0025)), n = r.u(3, 10, 1), f = r.pick([1, 2]);
      const p = bond(100 * c / f, y / f, n * f), annual = bond(100 * c, y, n);
      const short = bond(100 * c, y, n - 1);
      return { stem: [`A ${n}-year bond pays a ${pc(c)} coupon ${f === 2 ? 'semiannually' : 'annually'} and yields ${pc(y)} to maturity${f === 2 ? ' (stated on a semiannual bond basis)' : ''}. What is its price per 100 of par?`],
        ans: num(p, 3), wrong: [num(f === 2 ? annual : short, 3), num(p - 100 / Math.pow(1 + y / f, n * f) + 100, 3)],
        sol: [`Discount ${n * f} coupons of ${num(100 * c / f, 3)} and the 100 at maturity at ${pc(y / f, 3)} a period.`, `Price = ${num(p, 3)}. ${y > c ? 'Yield above the coupon: the bond trades at a discount.' : y < c ? 'Yield below the coupon: the bond trades at a premium.' : 'Yield equals the coupon: the bond trades at par.'}`] };
    } },
    { key: 'cy', m: 'v6m7', title: 'Current yield', make: r => {
      const c = r.u(0.02, 0.08, 0.0025), p = r.u(85, 115, 0.25);
      return { stem: [`A bond with a ${pc(c)} annual coupon trades at ${num(p)} per 100 of par. What is its current yield?`],
        ans: pc(c * 100 / p, 3), wrong: [pc(c, 3), pc(c * 100 / ((p + 100) / 2), 3)],
        sol: [`Current yield = annual coupon / price = ${num(100 * c)} / ${num(p)} = ${pc(c * 100 / p, 3)}.`, `It ignores the gain or loss as the price pulls to par, so it is not the yield to maturity.`] };
    } },
    { key: 'fwd', m: 'v6m9', title: 'Implied forward rate', make: r => {
      const s1 = r.u(0.02, 0.05, 0.0025), s2 = s1 + r.u(0.0025, 0.015, 0.0025), s3 = s2 + r.u(0, 0.01, 0.0025);
      const which = r.pick([0, 1]);
      if (which === 0) {
        const f = Math.pow(1 + s2, 2) / (1 + s1) - 1;
        return { stem: [`The one-year spot rate is ${pc(s1)} and the two-year spot rate is ${pc(s2)}. What is the one-year rate one year forward (1y1y)?`],
          ans: pc(f, 3), wrong: [pc((s1 + s2) / 2, 3), pc(Math.pow(1 + s2, 2) / Math.pow(1 + s1, 2) - 1, 3)],
          sol: [`(1 + S2)² = (1 + S1)(1 + 1y1y), so 1y1y = ${num(1 + s2, 4)}² / ${num(1 + s1, 4)} − 1 = ${pc(f, 3)}.`, `An upward-sloping spot curve means forward rates sit above spot rates.`] };
      }
      const f = Math.pow(1 + s3, 3) / Math.pow(1 + s1, 1);
      const r2 = Math.sqrt(f) - 1;
      return { stem: [`Spot rates are ${pc(s1)} (one year) and ${pc(s3)} (three years). What is the two-year rate one year forward (1y2y)?`],
        ans: pc(r2, 3), wrong: [pc((Math.pow(1 + s3, 3) / (1 + s1) - 1) / 2, 3), pc((3 * s3 - s1) / 2, 3)],
        sol: [`(1 + S3)³ = (1 + S1)(1 + 1y2y)², so 1y2y = [${num(1 + s3, 4)}³ / ${num(1 + s1, 4)}]^(1/2) − 1 = ${pc(r2, 3)}.`] };
    } },
    { key: 'durcon', m: 'v6m12', title: 'Price change from duration and convexity', make: r => {
      const md = r.u(3, 12, 0.05), cx = Math.round(md * md * r.u(0.7, 1.2, 0.05)), bp = r.pick([-150, -100, -75, -50, 50, 75, 100, 150, 200]);
      const dy = bp / 10000, ch = -md * dy + 0.5 * cx * dy * dy;
      return { stem: [`A bond has annual modified duration of ${num(md)} and annual convexity of ${cx}. Estimate its percentage price change if its yield ${bp > 0 ? 'rises' : 'falls'} by ${Math.abs(bp)} basis points.`],
        ans: pc(ch, 3), wrong: [pc(-md * dy, 3), pc(-md * dy - 0.5 * cx * dy * dy, 3)],
        sol: [`%ΔP ≈ −ModDur × Δy + ½ × Convexity × (Δy)² = −${num(md)} × ${num(dy, 4)} + 0.5 × ${cx} × ${num(dy, 4)}² = ${pc(-md * dy, 3)} + ${pc(0.5 * cx * dy * dy, 3)} = ${pc(ch, 3)}.`, `Positive convexity always adds to the estimate, whichever way yields move.`] };
    } },
    { key: 'amd', m: 'v6m11', title: 'Approximate modified duration', make: r => {
      const p0 = r.u(92, 108, 0.01), md = r.u(3, 10, 0.1), dy = r.pick([0.0005, 0.001, 0.0025]);
      const pm = p0 * (1 + md * dy + 30 * dy * dy), pp = p0 * (1 - md * dy + 30 * dy * dy);
      const a = (pm - pp) / (2 * dy * p0);
      return { stem: [`A bond is priced at ${num(p0, 3)}. If its yield falls ${dy * 1e4} bps the price becomes ${num(pm, 3)}; if it rises ${dy * 1e4} bps the price becomes ${num(pp, 3)}. What is its approximate modified duration?`],
        ans: num(a, 3), wrong: [num(a * 2, 3), num((pm - pp) / (2 * dy * pm), 3)],
        sol: [`ApproxModDur = (PV− − PV+) / (2 × Δy × PV0) = (${num(pm, 3)} − ${num(pp, 3)}) / (2 × ${num(dy, 4)} × ${num(p0, 3)}) = ${num(a, 3)}.`, `Forgetting the 2 doubles the answer: the price spread covers a yield move in both directions.`] };
    } },

    // ---------- Derivatives ----------
    { key: 'fwdpx', m: 'v7m5', title: 'Forward price with a known dividend', make: r => {
      const S = r.u(40, 200, 1), y = r.u(0.02, 0.06, 0.0025), T = r.pick([0.5, 0.75, 1]), D = r.u(0.5, 3, 0.25), tD = T / 3;
      const pvD = D / Math.pow(1 + y, tD), F = (S - pvD) * Math.pow(1 + y, T);
      return { stem: [`A stock trades at ${usd(S, 0)} and will pay a ${usd(D)} dividend in ${tD * 12} months. The annual risk-free rate is ${pc(y)} (annual compounding). What is the no-arbitrage price of a ${T * 12}-month forward on the stock?`],
        ans: usd(F), wrong: [usd(S * Math.pow(1 + y, T)), usd((S + pvD) * Math.pow(1 + y, T))],
        sol: [`PV of the dividend = ${usd(D)} / ${num(1 + y, 4)}^${num(tD, 3)} = ${usd(pvD, 4)}.`, `F0 = (S0 − PV(D)) × (1 + r)^T = (${usd(S, 0)} − ${usd(pvD, 4)}) × ${num(1 + y, 4)}^${T} = ${usd(F)}.`, `The dividend is a benefit of holding the stock that the forward buyer doesn't get, so it lowers the forward price.`] };
    } },
    { key: 'pcp', m: 'v7m9', title: 'Put-call parity', make: r => {
      const S = r.u(40, 120, 1), X = S + r.u(-10, 10, 1), y = r.u(0.02, 0.06, 0.0025), T = r.pick([0.25, 0.5, 1]);
      const pvX = X / Math.pow(1 + y, T), c = Math.max(S - pvX, 0) + r.u(1.5, 6, 0.05), p = c - S + pvX;
      return { stem: [`A stock trades at ${usd(S, 0)}. A European call with a ${usd(X, 0)} strike and ${T * 12} months to expiry costs ${usd(c)}. The risk-free rate is ${pc(y)} a year. What should the European put with the same strike and expiry cost?`],
        ans: usd(p), wrong: [usd(c - S + X), usd(c + S - pvX)],
        sol: [`Put-call parity: S0 + p0 = c0 + PV(X), so p0 = c0 − S0 + X/(1 + r)^T.`, `p0 = ${usd(c)} − ${usd(S, 0)} + ${usd(X, 0)}/${num(1 + y, 4)}^${T} = ${usd(c)} − ${usd(S, 0)} + ${usd(pvX)} = ${usd(p)}.`, `${usd(c - S + X)} forgets to discount the strike.`] };
    } },
    { key: 'optprofit', m: 'v7m2', title: 'Option profit at expiration', make: r => {
      const X = r.u(40, 120, 5), prem = r.u(1, 8, 0.25), ST = X + r.u(-15, 15, 1), call = r.pick([true, false]), long = r.pick([true, false]);
      const pay = call ? Math.max(0, ST - X) : Math.max(0, X - ST), prof = (long ? 1 : -1) * (pay - prem);
      const desc = `${long ? 'buys' : 'writes'} a ${call ? 'call' : 'put'} with a ${usd(X, 0)} strike for a premium of ${usd(prem)}`;
      return { stem: [`An investor ${desc}. At expiration the underlying is at ${usd(ST, 0)}. What is the investor's profit per share?`],
        ans: sgn(prof, usd), wrong: [sgn((long ? 1 : -1) * pay, usd), sgn((long ? 1 : -1) * (pay + prem), usd)],
        sol: [`Payoff of the ${call ? 'call' : 'put'} = max(0, ${call ? 'S_T − X' : 'X − S_T'}) = ${usd(pay)}.`, `${long ? 'Buyer' : 'Writer'} profit = ${long ? 'payoff − premium' : 'premium − payoff'} = ${sgn(prof, usd)}.`] };
    } },
    { key: 'binom', m: 'v7m10', title: 'One-period binomial call value', make: r => {
      const S = r.u(40, 100, 1), u = r.u(1.1, 1.3, 0.01), d = r.u(0.75, 0.92, 0.01), y = r.u(0.02, 0.05, 0.0025);
      const X = Math.round(S * r.u(0.9, 1.05, 0.01)), cu = Math.max(0, S * u - X), cd = Math.max(0, S * d - X);
      const q = (1 + y - d) / (u - d), c = (q * cu + (1 - q) * cd) / (1 + y);
      return { stem: [`A stock at ${usd(S, 0)} will move up by a factor of ${num(u)} or down by ${num(d)} over one year. The risk-free rate is ${pc(y)}. What is the value of a one-year European call with a ${usd(X, 0)} strike?`],
        ans: usd(c), wrong: [usd((0.5 * cu + 0.5 * cd) / (1 + y)), usd(q * cu + (1 - q) * cd)],
        sol: [`Up price ${usd(S * u)}, call payoff ${usd(cu)}; down price ${usd(S * d)}, payoff ${usd(cd)}.`, `Risk-neutral probability π = (1 + r − d)/(u − d) = (${num(1 + y, 4)} − ${num(d)})/(${num(u)} − ${num(d)}) = ${num(q, 4)}.`, `c0 = [π × ${usd(cu)} + (1 − π) × ${usd(cd)}] / ${num(1 + y, 4)} = ${usd(c)}.`] };
    } },

    // ---------- Alternative Investments ----------
    { key: 'cap', m: 'v8m4', title: 'Property value from a cap rate', make: r => {
      const rent = r.u(800, 3000, 25) * 1000, vac = r.u(0.03, 0.12, 0.01), opex = Math.round(rent * r.u(0.25, 0.4, 0.01) / 1000) * 1000, cap = r.u(0.045, 0.08, 0.0025);
      const noi = rent * (1 - vac) - opex;
      return { stem: [`An office building has potential gross rent of ${usd(rent, 0)}, expected vacancy and collection loss of ${pc(vac, 0)}, and operating expenses of ${usd(opex, 0)}. Comparable buildings trade at a ${pc(cap)} cap rate. What is it worth?`],
        ans: usd(noi / cap, 0), wrong: [usd((rent - opex) / cap, 0), usd(rent * (1 - vac) / cap, 0)],
        sol: [`NOI = ${usd(rent, 0)} × (1 − ${pc(vac, 0)}) − ${usd(opex, 0)} = ${usd(noi, 0)}.`, `Value = NOI / cap rate = ${usd(noi, 0)} / ${pc(cap)} = ${usd(noi / cap, 0)}.`] };
    } },
    { key: 'hffee', m: 'v8m6', title: 'Hedge fund net return after fees', make: r => {
      const A = r.u(50, 500, 10) * 1e6, g = r.u(0.06, 0.3, 0.005), mf = r.pick([0.01, 0.015, 0.02]), inc = r.pick([0.15, 0.2]);
      const gain = A * g, mgmt = A * mf, perf = inc * (gain - mgmt), net = (gain - mgmt - perf) / A;
      return { stem: [`A hedge fund starts the year with ${usd(A / 1e6, 0)} million and earns a gross return of ${pc(g, 1)}. It charges a ${pc(mf, 1)} management fee on beginning assets and a ${pc(inc, 0)} incentive fee on gains net of the management fee, with no hurdle. What is the investors' net return?`],
        ans: pc(net), wrong: [pc((gain - mgmt - inc * gain) / A), pc(g - mf)],
        sol: [`Management fee = ${pc(mf, 1)} × ${usd(A / 1e6, 0)}m = ${usd(mgmt / 1e6, 2)}m. Incentive fee = ${pc(inc, 0)} × (${usd(gain / 1e6, 2)}m − ${usd(mgmt / 1e6, 2)}m) = ${usd(perf / 1e6, 3)}m.`, `Net return = (${usd(gain / 1e6, 2)}m − ${usd(mgmt / 1e6, 2)}m − ${usd(perf / 1e6, 3)}m) / ${usd(A / 1e6, 0)}m = ${pc(net)}.`, `Charging the incentive fee on the gross gain gives ${pc((gain - mgmt - inc * gain) / A)}.`] };
    } },

    // ---------- Portfolio Management ----------
    { key: 'sharpe', m: 'v9m2', title: 'Sharpe ratio', make: r => {
      const rp = r.u(0.06, 0.15, 0.0025), rf = r.u(0.02, 0.05, 0.0025), s = r.u(0.1, 0.25, 0.005), b = r.u(0.7, 1.4, 0.05);
      return { stem: [`A portfolio returned ${pc(rp)} with a standard deviation of ${pc(s, 1)} and a beta of ${num(b)}. The risk-free rate was ${pc(rf)}. What is its Sharpe ratio?`],
        ans: num((rp - rf) / s, 3), wrong: [num((rp - rf) / b, 3), num(rp / s, 3)],
        sol: [`Sharpe = (Rp − Rf) / σp = (${pc(rp)} − ${pc(rf)}) / ${pc(s, 1)} = ${num((rp - rf) / s, 3)}.`, `${num((rp - rf) / b, 3)} is the Treynor ratio, which uses beta (systematic risk) instead of total risk.`] };
    } },
    { key: 'alpha', m: 'v9m2', title: "Jensen's alpha", make: r => {
      const rp = r.u(0.05, 0.16, 0.0025), rf = r.u(0.02, 0.05, 0.0025), rm = rf + r.u(0.03, 0.08, 0.0025), b = r.u(0.6, 1.5, 0.05);
      const a = rp - (rf + b * (rm - rf));
      return { stem: [`A manager returned ${pc(rp)} with a beta of ${num(b)}. The market returned ${pc(rm)} and the risk-free rate was ${pc(rf)}. What is the manager's Jensen's alpha?`],
        ans: pc(a), wrong: [pc(rp - rm), pc(rp - b * rm)],
        sol: [`CAPM return for that beta = ${pc(rf)} + ${num(b)} × (${pc(rm)} − ${pc(rf)}) = ${pc(rf + b * (rm - rf))}.`, `Alpha = ${pc(rp)} − ${pc(rf + b * (rm - rf))} = ${pc(a)}.`] };
    } },
    { key: 'beta', m: 'v9m2', title: 'Beta from correlation', make: r => {
      const rho = r.u(0.3, 0.9, 0.05), si = r.u(0.15, 0.45, 0.01), sm = r.u(0.12, 0.22, 0.01);
      return { stem: [`A stock's returns have a standard deviation of ${pc(si, 0)} and a correlation of ${num(rho)} with the market, whose standard deviation is ${pc(sm, 0)}. What is the stock's beta?`],
        ans: num(rho * si / sm), wrong: [num(rho * sm / si), num(si / sm)],
        sol: [`β = Cov(i, m) / σm² = ρ × σi / σm = ${num(rho)} × ${pc(si, 0)} / ${pc(sm, 0)} = ${num(rho * si / sm)}.`] };
    } },
    { key: 'var', m: 'v9m6', title: 'Parametric value at risk', make: r => {
      const V = r.u(5, 100, 1) * 1e6, mu = r.u(0.0002, 0.0008, 0.0001), s = r.u(0.008, 0.025, 0.0005), conf = r.pick([[0.95, 1.65], [0.99, 2.33]]);
      const v = V * (conf[1] * s - mu);
      return { stem: [`A portfolio worth ${usd(V / 1e6, 0)} million has an expected daily return of ${pc(mu, 2)} and a daily standard deviation of ${pc(s, 2)}. Using z = ${conf[1]}, what is its one-day ${pc(conf[0], 0)} VaR?`],
        ans: usd(v, 0), wrong: [usd(V * conf[1] * s, 0), usd(V * (conf[1] * s + mu), 0)],
        sol: [`VaR = V × (z × σ − μ) = ${usd(V, 0)} × (${conf[1]} × ${pc(s, 2)} − ${pc(mu, 2)}) = ${usd(v, 0)}.`, `There's a ${pc(1 - conf[0], 0)} chance of losing at least this much in a day.`] };
    } }
  ];

  function comma(n) { return Math.round(n).toLocaleString('en-US'); }
})();
