---
type: lesson-set
workstation: Finance Technicals HQ
topic: pm
last_updated: 2026-10-27
---

# v9m1
take: Higher-returning asset classes carry more risk; risk-averse investors maximize U = E(R) − ½Aσ²; low correlation cuts portfolio risk toward the average covariance; and every investor holds the same optimal risky portfolio on the CAL, mixed with the risk-free asset by risk aversion.
mins: 35

## Asset classes: history
Over long periods, small-cap and large-cap stocks earned the most, then long-term bonds, then Treasury bills, with risk (standard deviation) in the same order. Real returns subtract inflation. Returns are often **not normal** (negative skew, fat tails), and liquidity and trading costs differ by market, so risk isn't fully captured by standard deviation.

## Risk aversion and utility
| Type | Behavior | A in the utility function |
|---|---|---|
| Risk-averse | Needs extra return to take extra risk | A > 0 |
| Risk-neutral | Cares only about expected return | A = 0 |
| Risk-seeking | Prefers risk for its own sake | A < 0 |
```
U = E(R) − ½ × A × σ²   (returns as decimals)
```
**Indifference curves** join portfolios with equal utility; they're steeper for more risk-averse investors.

## Diversification
Two assets: σp² = w1²σ1² + w2²σ2² + 2w1w2ρσ1σ2. Lower correlation, lower portfolio risk.

With many equally weighted assets with the same variance σ² and average covariance:
```
σp² = σ²/N + [(N − 1)/N] × Average covariance
```
As N grows, the first term vanishes: risk falls toward the **average covariance**, which can't be diversified away.

Example: σ = 30%, correlation 0.2 (covariance 0.018). With 20 assets: σp² = 0.09/20 + (19/20) × 0.018 = 0.0216 → σp = **14.7%**. The floor is √0.018 = 13.4%.

## Frontiers and the optimal portfolio
- **Minimum-variance frontier**: lowest risk for each return. The **global minimum-variance portfolio** is its leftmost point; the **efficient frontier** is the part above it.
- Adding a risk-free asset gives the **capital allocation line (CAL)**. The best CAL is tangent to the efficient frontier at the **optimal risky portfolio** (highest Sharpe ratio).
- **Two-fund separation**: every investor holds the same two funds (the risk-free asset and the optimal risky portfolio); risk aversion only sets the mix.

Optimal weight in the risky portfolio:
```
y* = [E(Rp) − Rf] / (A × σp²)
```
Example: Rf = 3%, E(Rp) = 11%, σp = 20%, A = 4. y* = 0.08/(4 × 0.04) = **0.5**: 50% risky, 50% risk-free. A less risk-averse investor (A = 1.5) would put 133% in the risky portfolio, borrowing the rest.

## Quick check
? E(R) = 12%, σ = 25%, A = 2. Utility is:
a) 0.0575
b) 0.0950
c) 0.1200
= a
why: 0.12 − 0.5 × 2 × 0.0625 = 0.12 − 0.0625 = 0.0575.

? As more equally weighted assets are added, portfolio variance approaches:
a) zero
b) the average covariance among the assets
c) the average variance of the assets
= b
why: Individual variances diversify away; average covariance (systematic risk) remains.

? Rf = 4%, E(Rp) = 10%, σp = 15%, A = 5. The optimal weight in the risky portfolio is closest to:
a) 0.40
b) 0.53
c) 1.20
= b
why: 0.06 / (5 × 0.0225) = 0.06/0.1125 = 0.533.

? Under two-fund separation, investors with different risk aversion:
a) hold different optimal risky portfolios
b) hold the same optimal risky portfolio in different proportions with the risk-free asset
c) all hold only the risk-free asset
= b
why: The optimal risky portfolio is the same for all; preferences decide the mix.


# v9m2
take: The CML combines the risk-free asset with the market portfolio; only systematic risk (beta) is priced, so E(Ri) = Rf + βi[E(Rm) − Rf] on the SML; β = ρσi/σm; judge managers by Sharpe and M² (total risk) or Treynor and Jensen's alpha (beta).
mins: 40

## The capital market line
With identical expectations, everyone's optimal risky portfolio is the **market portfolio**:
```
CML: E(Rp) = Rf + [(E(Rm) − Rf) / σm] × σp
```
Points left of M lend (part risk-free); points right of M borrow to buy more of M. If the borrowing rate exceeds the lending rate, the line bends down beyond M.

## Systematic vs. nonsystematic risk
Total risk = systematic (market, can't diversify) + nonsystematic (company-specific, diversifiable). Investors are paid only for **systematic** risk; anyone can remove the rest for free.

**Market model**:
```
Ri = αi + βi × Rm + ei
Total variance = βi² × σm² + σe²
β = Cov(Ri, Rm) / σm² = ρ × σi / σm
```
Example: correlation 0.6, σi = 30%, σm = 15%. β = 0.6 × 30/15 = **1.2**.

## CAPM and the SML
```
E(Ri) = Rf + βi × [E(Rm) − Rf]
```
Assumptions: risk-averse investors maximizing utility over one period, frictionless markets (no taxes or costs), homogeneous expectations, divisible assets, price-taking investors.

The **security market line** plots expected return against beta and applies to every asset, efficient or not. A security plotting **above** the SML offers more return than its risk requires: **undervalued**. Below: overvalued.

Uses: cost of equity for capital budgeting, performance evaluation, security selection. Limitations: a single factor, the true market portfolio is unobservable, beta estimates vary, poor empirical fit. Extensions: APT and multi-factor models.

## Performance measures
Portfolio: Rp = 12%, σp = 20%, βp = 1.2. Market: Rm = 10%, σm = 15%. Rf = 3%.

| Measure | Formula | Result |
|---|---|---|
| Sharpe | (Rp − Rf) / σp | 9/20 = **0.45** (market: 7/15 = 0.467) |
| Treynor | (Rp − Rf) / βp | 9/1.2 = **7.5%** (market: 7%) |
| M² | (Rp − Rf) × σm/σp − (Rm − Rf) | 6.75 − 7 = **−0.25%** |
| Jensen's alpha | Rp − [Rf + βp(Rm − Rf)] | 12 − 11.4 = **+0.6%** |

The beta-based measures (Treynor, alpha) say the manager beat the market; the total-risk measures (Sharpe, M²) say it didn't. Why: the portfolio carries nonsystematic risk. For an investor's **whole** portfolio, use Sharpe or M²; for one part of a well-diversified portfolio, Treynor or alpha.

## Quick check
? Rf = 2%, market risk premium 6%, β = 0.9. CAPM expected return is:
a) 5.4%
b) 7.4%
c) 8.0%
= b
why: 2 + 0.9 × 6 = 7.4%.

? A stock's correlation with the market is 0.5; its σ is 40%; the market's σ is 20%. Its beta is:
a) 0.5
b) 1.0
c) 2.0
= b
why: 0.5 × 40/20 = 1.0.

? An analyst expects a stock to return 14%; its CAPM required return is 11%. The stock plots:
a) above the SML and appears undervalued
b) below the SML and appears overvalued
c) on the SML
= a
why: Expected return above required return means it's cheap for its risk.

? Rp = 10%, βp = 0.8, Rf = 2%, Rm = 9%. Jensen's alpha is:
a) +2.4%
b) +1.0%
c) −0.4%
= a
why: Required = 2 + 0.8 × 7 = 7.6%; alpha = 10 − 7.6 = 2.4%.


# v9m3
take: Portfolios reduce risk without necessarily cutting return; the process runs planning (client needs and IPS), execution (asset allocation, security analysis, construction) and feedback (monitoring, rebalancing, reporting); investor types differ in horizon, liquidity and risk; and pooled vehicles range from mutual funds and ETFs to hedge and private equity funds.
mins: 25

## The portfolio approach
Putting everything into a few securities risks disaster; diversification lowers risk, often without lowering expected return. It doesn't guarantee downside protection: in crises, correlations rise.

## The process
1. **Planning**: understand the client; write the **investment policy statement (IPS)**.
2. **Execution**: **asset allocation** (with capital market expectations), **security analysis**, **portfolio construction**.
3. **Feedback**: **monitoring and rebalancing**, **performance measurement and reporting**.

## Types of investors
| Investor | Horizon | Liquidity needs | Risk tolerance | Notes |
|---|---|---|---|---|
| Individuals | Varies with age and goals | Varies | Varies | Taxes matter |
| Defined benefit pension | Long | Low to moderate (depends on retirees) | Moderate to high | Invest to meet promised benefits (liabilities) |
| Endowments and foundations | Very long (perpetual) | Low | High | Spending rule (often about 5% a year) |
| Banks | Short | High | Low | Match assets to deposits |
| Life insurers | Long | Moderate | Low to moderate | Match long liabilities |
| Property and casualty insurers | Short | High | Low | Claims are unpredictable |
| Sovereign wealth funds | Long | Varies | Varies | National wealth, stabilization or savings |

In a **defined contribution** plan, the employee chooses investments and bears the risk; in a **defined benefit** plan, the employer bears it.

## The asset management industry
- **Active** (trying to beat a benchmark) vs. **passive** (tracking it, cheaply). Passive has grown fast.
- **Traditional** (stocks, bonds) vs. **alternative** managers (hedge funds, private equity, real estate); the lines are blurring.
- Trends: passive growth, **big data** and AI in research, **robo-advisers** in wealth management.

## Pooled products
| Product | Key features |
|---|---|
| Open-end mutual fund | Buy and redeem at NAV, daily; money market, bond, stock (active or index), hybrid/balanced |
| Closed-end fund | Fixed shares that trade on an exchange; can trade at a premium or discount to NAV |
| ETF | Trades all day on an exchange; creation and redemption by authorized participants keep the price near NAV; usually low cost and tax-efficient |
| Separately managed account | The investor owns the securities directly; customizable; higher minimums |
| Hedge fund | Limited partnership; flexible strategies; high fees; limited liquidity |
| Private equity / venture capital fund | Limited partnership; management fee on committed capital, ~20% carried interest |

## Quick check
? Writing the investment policy statement belongs to which step?
a) Planning
b) Execution
c) Feedback
= a
why: The IPS records the client's objectives and constraints at the planning stage.

? Which investor typically has the shortest horizon and highest liquidity needs?
a) An endowment
b) A property and casualty insurer
c) A life insurer
= b
why: P&C claims are short-term and unpredictable.

? An ETF's market price stays close to its NAV mainly because of:
a) daily redemptions at NAV by all investors
b) the creation and redemption process run by authorized participants
c) a fixed number of shares
= b
why: Authorized participants arbitrage gaps between price and NAV.

? In a defined contribution pension plan, investment risk is borne by:
a) the employer
b) the employee
c) the government
= b
why: The benefit depends on how the employee's account performs.


# v9m4
take: The IPS sets risk and return objectives and the constraints (liquidity, time horizon, taxes, legal and regulatory, unique circumstances); overall risk tolerance reflects both willingness and ability, and the lower one usually governs; strategic asset allocation turns the IPS and market expectations into target weights, with ESG integrated in several ways.
mins: 30

## Why an IPS
It records what the client wants and can bear, guides the manager, sets how results will be judged, and keeps decisions disciplined when markets get volatile.

Components: introduction, purpose, duties and responsibilities, procedures for updating it, **objectives**, **constraints**, investment guidelines, evaluation and review, and appendices (strategic asset allocation, rebalancing policy).

## Objectives
**Risk**: absolute (e.g., no loss over 4% in a year with 95% confidence) or relative (e.g., tracking error under 3% versus a benchmark).

**Risk tolerance** combines:
- **Willingness** (risk attitude): psychological comfort with risk.
- **Ability** (capacity): financial ability to absorb losses, given wealth, income stability, horizon and goals.

If they conflict, the advisor usually adopts the **lower** of the two; if willingness exceeds ability, ability limits the portfolio. If ability exceeds willingness, the advisor may educate the client but respects their preference.

**Return**: absolute (e.g., 7% a year) or relative (e.g., benchmark + 1%); must be consistent with the risk objective.

## Constraints
| Constraint | Questions |
|---|---|
| Liquidity | Expected and unexpected cash needs |
| Time horizon | When the money is needed; single or multiple stages |
| Tax concerns | Taxable vs. tax-exempt; income vs. capital gains rates |
| Legal and regulatory | Pension laws, insurance regulation, trust law |
| Unique circumstances | Concentrated holdings, ethical or religious preferences, ESG |

## Asset allocation
**Asset classes** should be internally similar, distinct from each other (low correlations), and together cover the investable universe.

**Strategic asset allocation (SAA)**: long-term target weights from the IPS plus **capital market expectations** (expected returns, risks, correlations). Most of a portfolio's return variation comes from it. Set **rebalancing ranges** around the targets.

Deviations: **tactical asset allocation** (short-term over- or underweights) and **security selection**: both take active risk, often under a risk budget. A **core-satellite** approach pairs a passive core with active satellites.

## ESG in portfolio construction
| Approach | What it does |
|---|---|
| Negative screening | Exclude companies or sectors (weapons, tobacco) |
| Positive screening | Favor best-in-class ESG performers |
| ESG integration | Build material ESG factors into analysis |
| Thematic investing | Target themes (clean energy, water) |
| Engagement / active ownership | Use votes and dialogue to change company behavior |
| Impact investing | Seek measurable social or environmental impact plus return |

## Quick check
? A young, high-income client is very nervous about losses. Her ability to take risk is high but willingness is low. The advisor should generally:
a) use her high ability and invest aggressively
b) respect her lower willingness, possibly after educating her
c) ignore both and use a balanced fund
= b
why: When they conflict, the more conservative measure usually governs.

? "Keep tracking error below 2% relative to the index" is a:
a) absolute risk objective
b) relative risk objective
c) liquidity constraint
= b
why: It's defined relative to a benchmark.

? A foundation planning a large grant payment next year should record it under:
a) liquidity
b) legal and regulatory factors
c) tax concerns
= a
why: Known cash outflows are liquidity requirements.

? Excluding tobacco companies from a portfolio is:
a) positive screening
b) negative screening
c) impact investing
= b
why: Excluding sectors is negative (exclusionary) screening.


# v9m5
take: Cognitive errors (belief perseverance and processing errors) come from faulty reasoning and can be corrected; emotional biases (loss aversion, overconfidence, self-control, status quo, endowment, regret aversion) come from feelings and are usually adapted to; biases help explain momentum, bubbles and value effects.
mins: 25

## Two families
| | Cognitive errors | Emotional biases |
|---|---|---|
| Source | Faulty reasoning, statistics, memory | Feelings, impulse, intuition |
| Fix | Easier: **moderate** with information and education | Harder: usually **adapt** (design around them) |

## Cognitive errors
**Belief perseverance** (clinging to existing beliefs):
conservatism :: slow to update views on new information
confirmation :: seeking evidence that supports what you already think
representativeness :: classifying by resemblance and ignoring base rates ("good company = good stock")
illusion of control :: believing you can influence outcomes you can't
hindsight :: "I knew it all along"; seeing past events as predictable

**Information-processing errors**:
anchoring and adjustment :: sticking too close to an initial number
mental accounting :: treating money differently by its label or source
framing :: answers change with how a question is posed (gains vs. losses)
availability :: judging likelihood by how easily examples come to mind

## Emotional biases
loss aversion :: losses hurt more than equal gains please; holding losers too long, selling winners too soon (disposition effect)
overconfidence :: overrating your knowledge and skill; under-diversifying, trading too much
self-control :: favoring today over long-term goals; under-saving
status quo :: preferring to do nothing
endowment :: valuing what you own more than what you'd pay to buy it
regret aversion :: avoiding decisions that might lead to regret; herding, excessive caution

## Biases and market behavior
- **Momentum**: herding, availability and regret aversion (chasing winners) can keep trends going.
- **Bubbles and crashes**: overconfidence, confirmation and herding inflate prices; loss aversion and panic accelerate falls.
- **Value effect**: the **halo effect** (good company, so good stock) and overconfidence about growth can overprice growth stocks. Some argue value returns are instead compensation for risk (the Fama-French view).
- **Home bias**: preferring domestic or nearby companies.

## Quick check
? An investor won't sell a losing stock until it gets back to what he paid. This most reflects:
a) loss aversion
b) availability
c) hindsight
= a
why: Reluctance to realize losses is a hallmark of loss aversion.

? Keeping "fun money" from a bonus in risky bets while treating salary conservatively is:
a) mental accounting
b) anchoring
c) status quo
= a
why: Money is treated differently depending on its source.

? Which bias is generally easiest to correct through education?
a) Conservatism (a cognitive error)
b) Loss aversion
c) Regret aversion
= a
why: Cognitive errors stem from faulty reasoning and respond to information.

? An analyst sticks closely to last year's revenue figure when forecasting despite clear changes. This is:
a) anchoring and adjustment
b) endowment
c) self-control
= a
why: The forecast is anchored to an initial value and adjusted too little.


# v9m6
take: Risk management sets risk tolerance and then measures, monitors and modifies risk to stay within it; good governance starts at the board; separate financial risks (market, credit, liquidity) from non-financial ones; measure with volatility, beta, duration, Greeks, VaR and stress tests; and prevent, accept, transfer or shift risk by cost and benefit.
mins: 30

## The process and framework
**Risk management** defines risk tolerance and measures, monitors and modifies exposures to stay within it. It's not about avoiding risk; it's about choosing which risks to take.

Framework components:
- **Risk governance**: the board sets tolerance and oversees.
- Risk **identification and measurement**.
- Risk **infrastructure**: people, systems, data.
- **Policies and processes**.
- Risk **mitigation and management**.
- **Communication**: reporting and feedback.
- **Strategic risk analysis and integration** into decisions.

Strong governance usually means an enterprise-wide view, a **risk management committee** and a **chief risk officer (CRO)**.

## Risk tolerance and budgeting
**Risk tolerance**: which risks are acceptable, which aren't, and how much loss the organization can bear. It depends on its goals, competitive position, and ability to withstand losses.

**Risk budgeting**: allocating the total risk allowed across activities or asset classes (e.g., by volatility, tracking error, VaR), so risk goes where it's expected to earn the most.

## Sources of risk
| Financial | Non-financial |
|---|---|
| **Market** risk: prices, rates, FX, commodities | **Settlement** risk |
| **Credit** risk: a counterparty doesn't pay | **Legal**, **regulatory/compliance**, **accounting**, **tax** risk |
| **Liquidity** risk: can't sell without a big price concession | **Model** risk |
| | **Tail** risk (extreme events more likely than assumed) |
| | **Operational** risk: people, systems, cyber, disasters |
| | **Solvency** risk: running out of cash |

Individuals also face **mortality, longevity, health** and **property** risks. Risks interact: a market crash can trigger credit losses and liquidity squeezes at once, often in non-linear ways.

## Measuring risk
- **Standard deviation** (volatility).
- **Beta** for equities; **duration** for bonds.
- **Greeks** for derivatives: delta (price), gamma (change in delta), vega (volatility), rho (rates).
- **Value at risk (VaR)**: a minimum loss at a given probability over a period. "5% one-day VaR of $2m": a 5% chance of losing at least $2m in a day.
- **Conditional VaR (expected shortfall)**: the average loss beyond VaR.
- **Scenario analysis** and **stress testing** for extreme events.
- For credit: expected loss given default.

## Modifying risk
| Method | How |
|---|---|
| Prevention and avoidance | Don't take the activity, or stop it |
| Acceptance | **Self-insurance** (bear it, perhaps with reserves) or **diversification** |
| Transfer | **Insurance**: pay a premium to move the risk; works when insurers can pool many diversifiable risks |
| Shifting | **Derivatives**: forwards, futures, swaps, options change the distribution of outcomes |

Choose by weighing **costs against benefits**, given the overall risk profile and the governance limits.

## Quick check
? A portfolio's 1% one-day VaR is $5m. This means:
a) there's a 1% chance of losing at least $5m in a day
b) the maximum possible daily loss is $5m
c) the expected daily loss is $5m
= a
why: VaR is a minimum loss at a stated probability, not a maximum.

? Buying an insurance policy to cover factory fire damage is risk:
a) shifting
b) transfer
c) avoidance
= b
why: Insurance transfers the risk to an insurer for a premium.

? Which is a non-financial risk?
a) Credit risk
b) Model risk
c) Liquidity risk
= b
why: Model risk comes from using wrong or misapplied models; the others are financial risks.

? Setting the organization's overall risk tolerance is primarily the responsibility of:
a) individual traders
b) the board, as part of risk governance
c) external auditors
= b
why: Risk governance, including tolerance, starts at the top.
