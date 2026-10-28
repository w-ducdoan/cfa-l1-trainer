---
type: lesson-set
workstation: Finance Technicals HQ
topic: quant
last_updated: 2026-10-27
---

# v1m1
take: Total return = price change + income; geometric averages compound and arithmetic ones don't; annualize by compounding, use ln(P1/P0) for continuous returns, and adjust nominal returns for inflation, fees, taxes and leverage.
mins: 30

## Holding period return
```
HPR = (P1 − P0 + Income) / P0
```
Price return is the capital part; income (dividends, coupons) is the rest. Over several periods, link the returns:
```
Total = (1 + R1)(1 + R2)...(1 + Rn) − 1
```

## Arithmetic vs. geometric average
- **Arithmetic mean** = simple average. Ignores compounding; good estimate of a **single period's** expected return.
- **Geometric mean** = [(1 + R1)...(1 + Rn)]^(1/n) − 1. The actual compound growth rate; always ≤ arithmetic (equal only if all returns are the same). The gap grows with volatility.

Example: +50% then −50%. Arithmetic mean = 0%. Geometric = (1.5 × 0.5)^0.5 − 1 = **−13.4%**. You actually lost money: 100 → 150 → 75.

## Annualizing and compounding
```
Annualized return = (1 + periodic return)^(periods per year) − 1
```
1% a month → 1.01^12 − 1 = **12.68%** a year. A 2-year return of 21% → 1.21^0.5 − 1 = 10% a year.

**Continuous compounding**:
```
Continuously compounded return r = ln(P1 / P0)
Effective return = e^r − 1
```
Price from 100 to 110: r = ln(1.10) = **9.53%**. Continuous returns **add** across periods, which is why models use them.

## Other return measures
required return :: real risk-free rate + inflation premium + risk premia (default, liquidity, maturity for bonds; equity risk premium for stocks)
excess return :: return − risk-free rate (or − a benchmark)
real return :: (1 + nominal) / (1 + inflation) − 1
gross return :: before fees; reflects the manager's skill
net return :: after fees; what the investor keeps
after-tax return :: nominal return × (1 − tax rate), with different rates for income and gains

Real return example: nominal 7%, inflation 3%: 1.07/1.03 − 1 = **3.88%** (roughly 4%).

**Leveraged return**: borrowing magnifies results.
```
R_leveraged = R + (Debt / Equity) × (R − Borrowing rate)
```
Return 8%, borrow half your equity at 4%: 8% + 0.5 × (8% − 4%) = **10%**. If R falls to 0%, the leveraged return is −2%.

## Quick check
? Returns are +20% and −10%. The geometric mean return is closest to:
a) 3.92%
b) 5.00%
c) 8.00%
= a
why: (1.20 × 0.90)^0.5 − 1 = 1.08^0.5 − 1 = 3.92%.

? A stock rises from 50 to 55. Its continuously compounded return is closest to:
a) 9.53%
b) 10.00%
c) 10.52%
= a
why: ln(55/50) = ln(1.10) = 9.53%.

? Nominal return 9%, inflation 4%. The real return is closest to:
a) 4.81%
b) 5.00%
c) 13.36%
= a
why: 1.09/1.04 − 1 = 4.81%.

? A quarterly return of 2% annualizes to:
a) 8.00%
b) 8.24%
c) 8.50%
= b
why: 1.02^4 − 1 = 8.24%.


# v1m2
take: Different assets and instruments earn returns in different forms; over the long run equities have beaten bonds, and bonds have beaten cash; systematic risk is paid for, unsystematic risk can be diversified away.
mins: 15

## Where returns come from
| Type | Return comes from |
|---|---|
| Equities | Dividends + price change |
| Bonds | Coupons + price change (pull to par, rate moves) |
| Cash and money market | Interest |
| Real assets (property, commodities) | Rental income or convenience yield + price change |
| Funds and ETFs | The underlying assets' returns, minus fees |
| Derivatives | Changes in value of the underlying, often with leverage |
| Indicators (indexes, rates) | Measures of a market's return or level, not holdings themselves |

Price-return indexes track only price changes; total-return indexes also reinvest income, so over long periods they are much higher.

## The long-run record
Over long horizons, in most developed markets: **equities > bonds > bills**, and real (after-inflation) returns on cash are close to zero. Equity returns came with much higher volatility and deep drawdowns. Starting point and period matter a lot: a decade can buck the trend.

## Risk
systematic (macro) risk :: affects the whole market: recessions, interest rates, inflation, wars. Can't be diversified away; investors are paid for bearing it
unsystematic (micro) risk :: specific to one issuer or sector: a product failure, a lawsuit, a CEO leaving. Diversification removes most of it

**Risk-return trade-off**: higher expected returns require accepting more risk. A higher return with no extra risk invites a closer look: it's usually extra risk you haven't spotted.

## Quick check
? Which risk can investors largely eliminate by holding many securities?
a) Systematic risk
b) Unsystematic risk
c) Interest rate risk on all bonds
= b
why: Company-specific (unsystematic) risk diversifies away; market-wide risk does not.

? Over long periods, the typical ranking of average returns is:
a) bills > bonds > equities
b) equities > bonds > bills
c) bonds > equities > bills
= b
why: Historically, riskier assets have earned higher long-run returns.

? A total-return index differs from a price-return index because it:
a) reinvests dividends and other income
b) excludes dividends
c) is equally weighted
= a
why: Total-return indexes include reinvested income.

? Investors are compensated mainly for bearing:
a) unsystematic risk
b) systematic risk
c) both equally
= b
why: Unsystematic risk can be diversified away at no cost, so markets don't pay for it.


# v1m3
take: Time-weighted return measures the manager (it ignores the timing of client cash flows); money-weighted return is the IRR the investor actually earned; index values depend on how constituents are weighted, rebalanced and reconstituted.
mins: 30

## Money-weighted vs. time-weighted
money-weighted return (MWR) :: the internal rate of return on all cash flows in and out, including the ending value. Reflects the investor's timing decisions
time-weighted return (TWR) :: compound the returns of subperiods split at each cash flow. Removes the effect of contributions and withdrawals

Use **TWR to evaluate a manager** (who doesn't control when clients add or withdraw money). Use MWR to see what the investor actually earned.

## Worked example
Year 0: buy 1 share at $100. Year 1: price $120, buy another share. Year 2: price $130, sell both for $260. No dividends.

**TWR**: year 1 return = 120/100 − 1 = 20%; year 2 = 130/120 − 1 = 8.33%.
Total = 1.20 × 1.0833 − 1 = 30%; annualized = 1.30^0.5 − 1 = **14.02%**.

**MWR**: solve −100 − 120/(1 + r) + 260/(1 + r)² = 0 → r = **12.05%**.

MWR is lower because more money was invested in year 2, the weaker year.

## Index construction
| Weighting | Feature |
|---|---|
| Price-weighted | Sum of prices ÷ divisor; high-priced stocks dominate; divisor adjusts for splits |
| Equal-weighted | Small stocks get the same weight as large; needs rebalancing |
| Market-cap weighted | Large companies dominate; self-rebalancing as prices move |
| Float-adjusted | Market cap using only freely tradable shares; the norm |
| Fundamental | Weights from sales, earnings, book value, dividends; value tilt |

**Rebalancing** resets weights to targets (needed for equal weighting). **Reconstitution** changes membership (adds and drops companies). Both create turnover and trading costs for funds that track the index.

Example (price-weighted, 3 stocks, divisor 3): prices 10, 20, 30 → index 20. Next period 12, 18, 33 → index 21. Price return = 21/20 − 1 = **5%**. The $30 stock's 10% rise moved the index more than the $10 stock's 20% rise.

**Price-return vs. total-return** index: total return adds reinvested dividends.

## Quick check
? A manager has no control over client deposits and withdrawals. Her performance should be measured with:
a) money-weighted return
b) time-weighted return
c) the arithmetic mean of client returns
= b
why: TWR strips out the effect of the timing of cash flows the manager doesn't control.

? An investor adds a lot of money just before a strong period. Compared with the TWR, the MWR will be:
a) higher
b) lower
c) the same
= a
why: More capital was exposed during the strong period, so the IRR rises.

? In a price-weighted index, a 10% rise in which stock moves the index most?
a) The stock with the highest price
b) The stock with the largest market cap
c) All move it equally
= a
why: Weights depend on price level.

? Subperiod returns are 10% and −5%. The time-weighted return over both periods is:
a) 4.50%
b) 5.00%
c) 2.50%
= a
why: 1.10 × 0.95 − 1 = 4.5%.


# v1m4
take: Value is the present value of expected cash flows; solve backward for implied returns (YTM) and implied growth (r − D1/P0); cash flow additivity and no-arbitrage give forward rates, forward exchange rates and option prices.
mins: 35

## Present values
```
PV = FV / (1 + r)^N
Annuity: PV = PMT × [1 − (1 + r)^−N] / r
Perpetuity: PV = PMT / r
Growing perpetuity: PV = CF1 / (r − g)
```
A bond = PV of coupons + PV of par. A zero = PV of par only. A share = PV of expected dividends (Gordon: D1 / (r − g)).

## Implied returns and growth
Turn the price around to find what return the market implies.
- **Bonds**: the yield-to-maturity is the r that makes PV of cash flows = price.
- **Equities**: from P0 = D1/(r − g):
```
Implied required return r = D1 / P0 + g
Implied growth g = r − D1 / P0
```
Example: price $50, next dividend $2.50, required return 9%. Implied growth = 9% − 5% = **4%**.

## Cash flow additivity and no arbitrage
The PV of a series of cash flows equals the sum of their individual PVs. Two portfolios with identical future cash flows must have the same price today; otherwise you could buy the cheap one, sell the dear one, and lock in a riskless profit.

**Forward interest rates**: investing for 2 years at the 2-year rate must equal investing for 1 year and rolling at the 1-year forward:
```
(1 + r2)^2 = (1 + r1)(1 + f1,1)
```

**Forward exchange rates** (price currency per unit of base currency):
```
F = S × (1 + r_price) / (1 + r_base)
```
Example: spot USD/EUR 1.1000 (USD per EUR). USD rate 5%, EUR rate 3%. One-year forward = 1.10 × 1.05/1.03 = **1.1214**. The higher-rate currency (USD) trades at a forward discount.

**Option pricing by replication** (one period): stock at 100 goes to 120 or 80; risk-free rate 5%; call with strike 100 pays 20 or 0.
- Hedge ratio = (20 − 0)/(120 − 80) = 0.5 shares per call.
- Risk-neutral up probability q = (1.05 − 0.80)/(1.20 − 0.80) = 0.625.
- Call value = 0.625 × 20 / 1.05 = **11.90**.

Same answer by replication: buy 0.5 shares (cost 50), borrow 38.10; payoffs match the call in both states.

## Quick check
? A stock trades at $40 and pays a $2 dividend next year; growth is expected at 3% forever. The implied required return is:
a) 5%
b) 8%
c) 3%
= b
why: r = 2/40 + 3% = 5% + 3% = 8%.

? Two portfolios have identical future cash flows but different prices. No-arbitrage implies:
a) the prices will remain different
b) buying the cheaper and selling the dearer earns a riskless profit until prices converge
c) the cheaper one has more risk
= b
why: Identical cash flows must have the same price, or arbitrage is possible.

? Spot is 1.2000 USD per GBP; the USD rate is 4% and the GBP rate 5%. The 1-year forward is closest to:
a) 1.1886
b) 1.2000
c) 1.2115
= a
why: 1.20 × 1.04/1.05 = 1.1886: the higher-rate GBP trades at a forward discount.

? A perpetuity pays $6 a year and the discount rate is 8%. Its value is:
a) $48
b) $75
c) $80
= b
why: 6 / 0.08 = $75.


# v1m5
take: Describe returns by their center (mean, median, mode), spread (range, MAD, variance, standard deviation), shape (skewness, kurtosis) and co-movement (covariance, correlation); use semi-deviation for downside risk and the coefficient of variation to compare risk per unit of return.
mins: 30

## Center and location
- **Mean**: the average; pulled by outliers. A **trimmed** mean drops extremes; a **winsorized** mean caps them.
- **Median**: the middle value; robust to outliers.
- **Mode**: the most frequent value.
- **Quantiles**: quartiles, quintiles, deciles, percentiles. The position of the y-th percentile in sorted data: L = (n + 1) × y / 100.

## Spread
```
Range = Max − Min
Mean absolute deviation (MAD) = Σ|Xi − mean| / n
Sample variance s² = Σ(Xi − mean)² / (n − 1)
Standard deviation s = √s²
```
Use n − 1 for a sample (it corrects the bias); n for a whole population.

## Worked example
Returns: 4%, 8%, −2%, 10%. Mean = 5%.
Deviations: −1, 3, −7, 5. Squared: 1, 9, 49, 25 → sum 84.
- MAD = (1 + 3 + 7 + 5)/4 = **4%**.
- Sample variance = 84/3 = **28**; standard deviation = **5.29%**.
- Coefficient of variation = 5.29/5 = **1.06**.

## Shape
| | Meaning |
|---|---|
| Positive (right) skew | Long right tail; mean > median > mode; occasional big gains |
| Negative (left) skew | Long left tail; mean < median < mode; occasional big losses |
| Excess kurtosis > 0 (leptokurtic) | Fatter tails and a sharper peak than normal: extreme outcomes more likely |

Investors usually prefer positive skew and dislike fat tails. Many asset returns show negative skew and excess kurtosis, so a normal model understates crash risk.

## Co-movement
```
Covariance = Σ(Xi − mean X)(Yi − mean Y) / (n − 1)
Correlation = Cov(X, Y) / (sX × sY)       between −1 and +1
```
Correlation measures **linear** association only, not causation; it can be spurious (two series trending together by chance) or driven by outliers.

## Other measures
- **Semi-deviation (downside deviation)**: standard deviation using only returns below the mean (or a target). Focuses on bad outcomes.
- **Coefficient of variation (CV)** = standard deviation / mean. Risk per unit of return; lower is better.

## Quick check
? A return distribution with a long right tail has:
a) mean < median
b) mean > median
c) mean = median
= b
why: Positive skew pulls the mean above the median.

? Covariance between two assets is 0.006; their standard deviations are 0.10 and 0.15. The correlation is:
a) 0.40
b) 0.60
c) 0.90
= a
why: 0.006 / (0.10 × 0.15) = 0.006 / 0.015 = 0.40.

? Asset A has mean return 8% and standard deviation 12%; asset B has 5% and 6%. Which has more risk per unit of return?
a) A
b) B
c) They're equal
= a
why: CV of A = 1.5; CV of B = 1.2.

? A distribution with excess kurtosis greater than zero has:
a) thinner tails than the normal distribution
b) fatter tails than the normal distribution
c) no skew
= b
why: Leptokurtic distributions have more weight in the tails.


# v1m6
take: Expected value and variance weight outcomes by probability; know the binomial, normal, lognormal, t, chi-square and F distributions; conditional expectations use conditional probabilities; Bayes' rule updates beliefs with new evidence.
mins: 35

## Random variables and expectations
A **discrete** variable has countable outcomes (probability mass function, PMF); a **continuous** one has a density (PDF). The **CDF** gives P(X ≤ x).
```
E(X) = Σ P(xi) × xi
Var(X) = Σ P(xi) × (xi − E(X))²
```
Example: returns of 10%, 5% and −5% with probabilities 0.3, 0.5 and 0.2.
- E(R) = 3.0 + 2.5 − 1.0 = **4.5%**.
- Var = 0.3(5.5²) + 0.5(0.5²) + 0.2(9.5²) = 9.075 + 0.125 + 18.05 = 27.25 → σ = **5.22%**.

## Key distributions
| Distribution | Use | Key facts |
|---|---|---|
| Bernoulli | One trial, success or failure | Mean p |
| Binomial | Number of successes in n trials | P(x) = C(n, x) p^x (1 − p)^(n − x); mean np; variance np(1 − p) |
| Uniform | Equal chances over a range | |
| Normal | Returns (approx.); symmetric | 68% within ±1σ, 95% within ±1.96σ, 99% within ±2.58σ |
| Lognormal | Asset prices | Skewed right, never negative: if ln(P) is normal, P is lognormal |
| Student's t | Small samples, unknown variance | Fatter tails than normal; approaches normal as df rise |
| Chi-square | Tests of a single variance, independence | Non-negative, right-skewed |
| F | Comparing two variances | Ratio of two chi-squares |

Standardize a normal variable: z = (x − μ)/σ.

Binomial example: n = 5, p = 0.6. P(exactly 3) = 10 × 0.6³ × 0.4² = **0.3456**.

## Conditional expectations
The expected value given a scenario uses that scenario's probabilities. Total probability links them:
```
E(X) = Σ E(X | Scenario i) × P(Scenario i)
```

## Bayes' rule
Update a prior belief when new evidence arrives:
```
P(A | B) = P(B | A) × P(A) / P(B)
```
Example: 40% of firms have improving fundamentals. Analysts upgrade 70% of improving firms and 20% of the others. P(upgrade) = 0.4 × 0.7 + 0.6 × 0.2 = 0.40. P(improving | upgrade) = 0.28/0.40 = **70%**. The upgrade raises the probability from 40% to 70%.

## Quick check
? A stock returns 12% with probability 0.4 and −3% with probability 0.6. Its expected return is:
a) 3.0%
b) 4.5%
c) 7.5%
= a
why: 0.4 × 12 + 0.6 × (−3) = 4.8 − 1.8 = 3.0%.

? For a normal distribution, about 95% of outcomes lie within:
a) ±1 standard deviation
b) ±1.96 standard deviations
c) ±3 standard deviations
= b
why: The two-tailed 95% critical value is 1.96.

? Asset prices are often modeled as lognormal mainly because:
a) prices can't fall below zero
b) prices are symmetric
c) prices have no variance
= a
why: A lognormal variable is always positive and right-skewed, like prices.

? Prior probability 20%; P(signal | event) = 0.9; P(signal | no event) = 0.3. P(event | signal) is closest to:
a) 20%
b) 43%
c) 90%
= b
why: 0.2 × 0.9 / (0.18 + 0.8 × 0.3) = 0.18/0.42 = 43%.


# v1m7
take: The sample mean is roughly normal for large samples (CLT), giving confidence intervals of mean ± z × σ/√n; hypothesis tests weigh Type I vs. Type II errors at significance α; parametric tests assume a distribution, non-parametric ones don't.
mins: 40

## Sampling and the central limit theorem
**CLT**: for large samples (n ≥ 30 as a rule of thumb), the sample mean is approximately normal with mean μ and **standard error** σ/√n, whatever the population's shape.

Sampling methods: **simple random**, **stratified random** (sample from each subgroup in proportion; more precise), **cluster**, **convenience** and **judgmental** (non-probability). Biases: survivorship, look-ahead, time-period, sample selection and data snooping.

## Confidence intervals
```
Point estimate ± Reliability factor × Standard error
```
Use z when the population variance is known (or n is large); t with n − 1 degrees of freedom when it's estimated from a small sample.

Example: mean return 8%, standard deviation 20%, n = 100. SE = 20/√100 = 2%. 95% interval = 8 ± 1.96 × 2 = **4.08% to 11.92%**.

## Hypothesis testing steps
1. State H0 (no effect, equality) and Ha.
2. Choose the test statistic and its distribution.
3. Set the significance level α.
4. Find the critical value(s) or p-value.
5. Compute the statistic from the sample.
6. Decide: reject H0 if the statistic is beyond the critical value (or p-value < α).

| | H0 true | H0 false |
|---|---|---|
| Reject H0 | **Type I error** (prob. α), false positive | Correct (power = 1 − β) |
| Fail to reject | Correct | **Type II error** (prob. β), false negative |

Lowering α reduces Type I errors but raises Type II errors, unless you increase the sample size.

## Which test
| Question | Test |
|---|---|
| One mean | t (or z) = (mean − μ0)/(s/√n) |
| Two independent means | t-test of difference in means |
| Paired observations (same firms before/after) | Paired t-test on the differences |
| One variance | Chi-square, df = n − 1 |
| Two variances | F = s1²/s2² (larger on top) |
| Correlation | t = r√(n − 2)/√(1 − r²), df = n − 2 |

**p-hacking**: running many tests and reporting only the significant ones; inflates false positives.

## Non-parametric tests
Don't assume a distribution; use ranks or counts. Use them when data are ranks, have outliers, or clearly aren't normal. Examples: **Spearman rank correlation**; **chi-square test of independence** for categorical data with df = (rows − 1)(columns − 1). Less powerful when the parametric assumptions do hold.

## Quick check
? A sample of 64 has standard deviation 16. The standard error of the mean is:
a) 0.25
b) 2.0
c) 4.0
= b
why: 16/√64 = 16/8 = 2.0.

? Rejecting a true null hypothesis is a:
a) Type I error
b) Type II error
c) correct decision
= a
why: A false positive is a Type I error, with probability α.

? Comparing analysts' forecast errors for the same 40 companies before and after a rule change calls for a:
a) two-sample test of independent means
b) paired comparisons test
c) chi-square test of a variance
= b
why: The same companies are measured twice, so the observations are paired.

? Sample correlation r = 0.4 with n = 27. The t-statistic is closest to:
a) 1.6
b) 2.2
c) 4.0
= b
why: 0.4 × √25 / √(1 − 0.16) = 2.0/0.9165 = 2.18.


# v1m8
take: Portfolio return is a weighted average but portfolio risk isn't: less-than-perfect correlation cuts it; the efficient frontier holds the best portfolios; adding a risk-free asset gives the capital allocation line, and with the market portfolio, the capital market line.
mins: 35

## Two-asset portfolio
```
E(Rp) = w1 E(R1) + w2 E(R2)
σp² = w1²σ1² + w2²σ2² + 2 w1 w2 ρ12 σ1 σ2
```
Example: 60% in A (E = 10%, σ = 20%), 40% in B (E = 6%, σ = 10%), correlation 0.2.
- E(Rp) = 6.0 + 2.4 = **8.4%**.
- σp² = 0.36 × 400 + 0.16 × 100 + 2 × 0.6 × 0.4 × 0.2 × 20 × 10 = 144 + 16 + 19.2 = 179.2 → σp = **13.39%**.

The weighted average of the two standard deviations would be 16%; correlation below 1 brings it down. With ρ = +1 there is no diversification benefit; with ρ = −1 risk can be eliminated. About 30 well-chosen stocks capture most diversification benefits.

## Minimum-variance portfolio and efficient frontier
- The **minimum-variance frontier** is the set of portfolios with the lowest risk for each expected return.
- The **global minimum-variance portfolio** is its left-most point.
- The **efficient frontier** is the part above it: the highest return for each level of risk. Rational investors pick only from it.

## Investor preferences
```
Utility U = E(R) − ½ × A × σ²
```
A = risk aversion coefficient: A > 0 risk-averse, A = 0 risk-neutral, A < 0 risk-seeking. Indifference curves are steeper for more risk-averse investors.

Example: E = 8.4%, σ = 13.39% (σ² = 0.0179), A = 4. U = 0.084 − 0.5 × 4 × 0.0179 = **0.048**.

## CAL, CML and CAPM
Combine a risk-free asset with a risky portfolio and you get a straight line, the **capital allocation line**:
```
E(Rp) = Rf + [(E(Ri) − Rf) / σi] × σp
```
The slope is the **Sharpe ratio**. The best CAL is tangent to the efficient frontier. If everyone has the same expectations, that tangency portfolio is the **market portfolio**, and the line is the **capital market line**. Each investor chooses a point on it: lend (part risk-free) or borrow (leveraged) depending on risk aversion.

**CAPM** follows: only systematic risk (beta) is priced. E(Ri) = Rf + βi[E(Rm) − Rf].

**Limitations**: assumes normal returns, stable variances and correlations, no taxes or transaction costs, and that everyone agrees on inputs. Correlations tend to rise in crises, just when diversification is needed.

## Quick check
? 50% in A (σ = 20%) and 50% in B (σ = 20%) with correlation 0. Portfolio standard deviation is closest to:
a) 10.0%
b) 14.1%
c) 20.0%
= b
why: σ² = 0.25 × 400 + 0.25 × 400 = 200; √200 = 14.1%.

? Portfolio risk equals the weighted average of the assets' standard deviations only when correlation is:
a) −1
b) 0
c) +1
= c
why: With perfect positive correlation there is no diversification benefit.

? E(R) = 10%, σ = 20%, A = 3. Utility is:
a) 0.04
b) 0.07
c) 0.10
= a
why: 0.10 − 0.5 × 3 × 0.04 = 0.10 − 0.06 = 0.04.

? The capital market line is the CAL that uses:
a) the global minimum-variance portfolio
b) the market portfolio
c) any portfolio with beta of 1
= b
why: The CML combines the risk-free asset with the market (tangency) portfolio.


# v1m9
take: Simulation estimates outcomes that formulas can't handle: historical simulation replays the past, bootstrapping resamples it with replacement, and Monte Carlo draws from assumed distributions; each is only as good as its inputs.
mins: 20

## Why simulate
Some exposures are **non-linear** (options) or **path-dependent** (outcomes depend on the sequence of prices, like a barrier option or a retirement plan with withdrawals). Simulation generates many possible futures and measures the distribution of results: average, percentiles, probability of shortfall, value at risk.

## The three methods
| Method | How | Strengths | Weaknesses |
|---|---|---|---|
| Historical simulation | Apply actual past changes in risk factors to today's portfolio | Uses real data with real fat tails and correlations; no distribution to assume; regulators use it for bank risk | Limited to what happened; can't produce scenarios worse than history; one path only |
| Bootstrapping | Randomly sample past observations **with replacement** to build many synthetic paths | Non-parametric; many paths from limited data | Assumes the sample represents the population; breaks time dependence (volatility clustering) unless handled |
| Monte Carlo | Specify distributions and parameters (e.g., normal or lognormal returns, correlations), generate random draws | Flexible; can model any scenario, including ones not seen; handles complex products | Results depend on the assumed model ("garbage in, garbage out"); computationally heavy |

**Multivariate Monte Carlo** simulates several correlated variables together, so the correlation assumptions matter.

## Using the output
- Expected values and the spread of outcomes.
- Percentiles: the 5th percentile loss as a value-at-risk estimate.
- Probability of hitting a goal or of a shortfall (retirement planning).
- Sensitivity: rerun with different assumptions.

A good simulation engine can take inputs from any of the three approaches.

## Quick check
? A risk manager applies each of the last 500 days' market moves to today's portfolio. This is:
a) Monte Carlo simulation
b) historical simulation
c) bootstrapping
= b
why: Historical simulation replays actual past changes on current positions.

? Bootstrapping differs from historical simulation in that it:
a) assumes returns are normal
b) samples past observations with replacement to create many paths
c) can't use historical data
= b
why: Resampling with replacement turns one history into many synthetic paths.

? A key weakness of Monte Carlo simulation is that:
a) it can't model scenarios outside history
b) results depend on the assumed distributions and parameters
c) it only works for one variable
= b
why: If the model's distribution is wrong, the outputs will be too.

? Simulation is most useful for valuing:
a) a simple fixed-rate bond
b) a path-dependent option
c) cash in a bank account
= b
why: Path-dependent payoffs are hard to value with closed-form formulas.


# v1m10
take: OLS fits Y = b0 + b1X by minimizing squared errors (b1 = Cov/Var); check the four assumptions with residuals; judge fit with R², the standard error of estimate and t- and F-tests; and the CAPM regression gives alpha and beta.
mins: 40

## The model
```
Yi = b0 + b1 Xi + εi
b1 = Cov(X, Y) / Var(X)
b0 = mean(Y) − b1 × mean(X)
```
Y is the dependent (explained) variable; X the independent (explanatory) one. Example: Cov = 0.0024, Var(X) = 0.0016 → b1 = **1.5**. Means: X = 1%, Y = 2% → b0 = 2 − 1.5 × 1 = **0.5%**.

## Assumptions (LINE)
1. **Linearity** between X and Y.
2. **Independence** of residuals (no serial correlation).
3. **Normality** of residuals.
4. **Equal variance** of residuals (homoskedasticity).

Plot residuals against X or time: patterns, funnels (heteroskedasticity) or runs (autocorrelation) signal violations; outliers can drive the result.

## Goodness of fit
```
SST (total) = SSR (explained) + SSE (unexplained)
R² = SSR / SST
Standard error of estimate (SEE) = √[SSE / (n − 2)]
F = MSR / MSE = (SSR / 1) / (SSE / (n − 2))
```
Example: SST = 100, SSE = 36, n = 32. R² = **0.64**. SEE = √(36/30) = **1.10**. In simple regression, R² = correlation².

**Testing the slope**: t = (b1 − hypothesized value) / standard error of b1, with n − 2 df. Testing b1 = 0 is the same as testing whether X explains Y; in simple regression, F = t².

## Prediction
Plug X into the fitted line. A **prediction interval** for Y is wider than the SEE alone, and wider the further X is from its mean.

**Non-linear relationships**: transform with logs.
| Model | Form |
|---|---|
| Log-lin | ln Y = b0 + b1 X |
| Lin-log | Y = b0 + b1 ln X |
| Log-log | ln Y = b0 + b1 ln X (b1 is an elasticity) |

## CAPM by regression
Regress a stock's excess return on the market's excess return:
```
Ri − Rf = αi + βi (Rm − Rf) + εi
```
β is the slope (systematic risk); α the intercept (abnormal return). A significant positive α suggests outperformance after adjusting for market risk.

## Quick check
? Cov(X, Y) = 0.0030 and Var(X) = 0.0020. The slope is:
a) 0.67
b) 1.50
c) 0.0010
= b
why: 0.0030 / 0.0020 = 1.5.

? SST is 200 and SSE is 50. R² is:
a) 0.25
b) 0.75
c) 4.00
= b
why: SSR = 150; 150/200 = 0.75.

? Residuals that fan out as X increases suggest a violation of:
a) linearity
b) homoskedasticity
c) normality only
= b
why: Changing residual variance is heteroskedasticity.

? In a log-log regression, the slope coefficient is best read as:
a) an elasticity
b) a dollar change in Y
c) the correlation between X and Y
= a
why: A 1% change in X is associated with a b1% change in Y.


# v1m11
take: Financial data science combines statistics, computing and finance to learn from large, varied data; machine learning is supervised (labeled targets), unsupervised (finds structure) or deep (neural networks); watch for overfitting, bias and opaque models.
mins: 20

## Data
- **Structured**: tables of numbers: prices, financial statements.
- **Unstructured**: text, images, audio: filings, news, earnings call transcripts, satellite images.
- **Alternative data**: from individuals (social media, reviews), business processes (credit card transactions) and sensors (satellites, geolocation).

**Big data** is described by volume, velocity (speed of arrival), variety (types) and veracity (reliability). Data science turns it into insight: capture, curate (clean), store, search and analyze.

## Machine learning
| Type | Learns from | Typical tasks |
|---|---|---|
| Supervised | Labeled data: inputs and a known target | Regression (predict a number: returns, default losses); classification (default or not, fraud or not) |
| Unsupervised | Unlabeled data | Clustering (grouping similar stocks); dimension reduction (finding a few drivers) |
| Deep learning | Many-layered neural networks | Images, speech, text; complex non-linear patterns |

Reinforcement learning (learning by trial and reward) is used in areas like trade execution.

**Overfitting**: a model learns the noise in the training data and fails on new data. Guard against it by splitting data into **training, validation and test** sets, using cross-validation, and keeping models no more complex than needed.

## AI tools
**Natural language processing (NLP)** reads text: sentiment in news, tone of earnings calls, extracting data from filings. **Large language models (LLMs)** generate and summarize text and can carry out tasks with little human oversight.

Risks: models can **hallucinate**, encode **biases** in their training data, and be hard to explain (a problem for regulators and clients). Human judgment, data governance and validation remain essential.

## Quick check
? Predicting whether a borrower will default (yes/no) from labeled historical loans is:
a) unsupervised learning
b) supervised classification
c) dimension reduction
= b
why: The target (default or not) is labeled, and the output is a category.

? Grouping stocks by similar return patterns without predefined labels is:
a) clustering
b) regression
c) a chi-square test
= a
why: Clustering is an unsupervised method that finds groups.

? A model performs very well on training data but poorly on new data. This is:
a) underfitting
b) overfitting
c) homoskedasticity
= b
why: Overfitting captures noise specific to the training set.

? Earnings call transcripts are an example of:
a) structured data
b) unstructured data
c) a labeled dataset by default
= b
why: Free text is unstructured.
