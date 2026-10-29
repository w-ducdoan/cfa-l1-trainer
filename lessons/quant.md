---
type: lesson-set
workstation: Finance Technicals HQ
topic: quant
last_updated: 2026-10-28
---

# v1m1
take: An investment's total return is its price change plus any income it paid, divided by what you paid; averages, annualizing, continuous compounding and adjustments for inflation, fees, taxes and leverage are all ways of reading that one number correctly.
mins: 35

## What a "return" is
A return answers one question: for every dollar I put in, how much did I gain or lose? It's always a percentage of the starting amount, so you can compare a $50 stock with a $5,000 bond.

Money comes back to you in two ways:
- **Price change** (also called capital gain or loss): the asset is worth more or less than you paid.
- **Income**: cash the asset pays while you hold it, such as **dividends** (from stocks) or **coupons** (interest from bonds).

Add them together and you get the **total return**.

## Holding period return (HPR)
The **holding period** is simply how long you owned the investment: a day, a month, three years. The **holding period return** is the total return over exactly that stretch, with no adjustment for how long it was.

```
HPR = (P1 − P0 + Income) / P0
```
~ HPR :: holding period return, as a decimal (0.08 = 8%)
~ P0 :: the price you paid at the start ("price at time 0")
~ P1 :: the price at the end of the period ("price at time 1")
~ Income :: dividends, coupons or other cash received during the period
~ P1 − P0 :: the price change; negative if the price fell

Example: you buy a share for $40 (P0), receive a $1 dividend, and sell for $43 (P1).
- Price change = 43 − 40 = $3.
- Total gain = 3 + 1 = $4.
- HPR = 4 / 40 = **10%**. Of that, 3/40 = 7.5% is price return and 1/40 = 2.5% is income return.

**Linking periods.** If you hold for several periods, you can't just add the returns, because each period's gain earns returns in later periods (compounding). Multiply the "growth factors" (1 + return) instead:
```
Total return = (1 + R1)(1 + R2) ... (1 + Rn) − 1
```
~ R1, R2 ... Rn :: the return in period 1, period 2, up to period n
~ 1 + R :: the growth factor: $1 becomes $(1 + R)

Example: +10% then −5%. Total = 1.10 × 0.95 − 1 = 4.5% (not 5%).

## Averaging returns: arithmetic vs. geometric
Given a series of yearly returns, there are two ways to say "what was the average year?"

The **arithmetic mean** is the ordinary average: add the returns, divide by how many there are. It's the best estimate of **what one future year** might return.

The **geometric mean** is the steady yearly rate that would have turned your starting money into your actual ending money. It accounts for compounding, so it describes **what you actually earned per year** over the whole stretch.

```
Arithmetic mean = (R1 + R2 + ... + Rn) / n
Geometric mean = [(1 + R1)(1 + R2) ... (1 + Rn)]^(1/n) − 1
```
~ n :: the number of periods
~ ^(1/n) :: the n-th root (for 2 years, the square root)

The geometric mean is always less than or equal to the arithmetic mean, and the gap widens the more the returns bounce around.

Example: +50% one year, −50% the next.
- Arithmetic mean = (50% − 50%)/2 = 0%. Looks like you broke even.
- What really happened: $100 → $150 → $75. You lost money.
- Geometric mean = (1.50 × 0.50)^(1/2) − 1 = 0.75^0.5 − 1 = **−13.4%** a year, which matches the loss.

## Annualizing returns
Returns over different lengths of time can't be compared directly: 3% in a quarter isn't the same as 3% in a year. **Annualizing** converts any return into its yearly equivalent, assuming the same rate repeats and compounds.

```
Annualized return = (1 + periodic return)^(periods per year) − 1
```
~ periodic return :: the return for one period (one month, one quarter...)
~ periods per year :: 12 for months, 4 for quarters, 52 for weeks, 365 for days

- 1% a month → 1.01^12 − 1 = **12.68%** a year (more than 12%, because of compounding).
- For periods longer than a year, the exponent is a fraction: a 21% return over 2 years → 1.21^(1/2) − 1 = **10%** a year.

## Continuous compounding
Interest can compound yearly, monthly, daily... or, in the limit, continuously (every instant). Finance models use **continuously compounded returns** because they have a handy property: they **add up** across periods instead of multiplying.

```
Continuously compounded return  r = ln(P1 / P0)
Back to an ordinary return:     e^r − 1
```
~ ln :: the natural logarithm (the "ln" key on your calculator)
~ P1 / P0 :: ending price divided by starting price (the growth factor)
~ e :: the constant 2.718..., the base of natural logs

Example: price from 100 to 110. r = ln(110/100) = ln(1.10) = **9.53%**. The ordinary return is 10%; the continuous version is a little smaller because continuous compounding needs a lower rate to reach the same end value.

## Other return measures
These all start from the same total return and adjust it for something.

required return :: the minimum return an investor needs to be willing to invest: the real risk-free rate + expected inflation + risk premia (extra return for risks such as default, illiquidity or long maturity; for stocks, the equity risk premium)
risk-free rate :: the return on an investment with no default risk, such as a short-term government bill
excess return :: your return minus a comparison rate (the risk-free rate or a benchmark index): how much extra you earned
nominal return :: the return in currency terms, before inflation
real return :: the return after removing inflation: the growth in what your money can actually buy
gross return :: return before the manager's fees
net return :: return after fees: what the investor actually keeps
after-tax return :: return after taxes on income and gains, which can be taxed at different rates

**Real return.** If prices rise, a 7% gain buys less than 7% more stuff.
```
Real return = (1 + nominal return) / (1 + inflation rate) − 1
```
~ nominal return :: the stated return in currency terms
~ inflation rate :: how fast the general price level rose over the same period

Example: nominal 7%, inflation 3%. Real = 1.07/1.03 − 1 = **3.88%**. (Subtracting, 7% − 3% = 4%, is a close shortcut.)

**Leveraged return.** Borrowing to invest more than your own money magnifies both gains and losses.
```
Leveraged return = R + (D / E) × (R − rD)
```
~ R :: the return on the whole investment (your money plus borrowed money)
~ D :: the amount borrowed (debt)
~ E :: your own money in it (equity)
~ rD :: the interest rate on the borrowed money

Example: you invest $100 of your own and borrow $50 at 4%, so D/E = 0.5. The investment returns 8%.
Leveraged return = 8% + 0.5 × (8% − 4%) = **10%**. If the investment returns 0% instead, you get 0% + 0.5 × (0% − 4%) = −2%: you still owe the interest.

## Quick check
? Returns are +20% and −10%. The geometric mean return is closest to:
a) 3.92%
b) 5.00%
c) 8.00%
= a
why: Multiply the growth factors and take the square root: (1.20 × 0.90)^0.5 − 1 = 1.08^0.5 − 1 = 3.92%. The 5% is the arithmetic mean, which ignores compounding.

? A stock rises from 50 to 55. Its continuously compounded return is closest to:
a) 9.53%
b) 10.00%
c) 10.52%
= a
why: r = ln(P1/P0) = ln(55/50) = ln(1.10) = 9.53%. The ordinary return is 10%.

? Nominal return 9%, inflation 4%. The real return is closest to:
a) 4.81%
b) 5.00%
c) 13.36%
= a
why: Real return = 1.09/1.04 − 1 = 4.81%. Simply subtracting gives 5%, which is only an approximation.

? A quarterly return of 2% annualizes to:
a) 8.00%
b) 8.24%
c) 8.50%
= b
why: Four quarters in a year, compounded: 1.02^4 − 1 = 8.24%. Multiplying 2% × 4 = 8% ignores compounding.


# v1m2
take: Different investments pay you in different ways (dividends, coupons, rent, price changes); over long periods stocks have earned more than bonds and bonds more than cash, and the market rewards only the risk you can't diversify away.
mins: 20

## Assets, instruments and indicators
The module sorts things you can invest in, or measure, into three groups:
- **Financial assets**: things you can own directly, such as stocks (equities), bonds, cash, real estate and commodities.
- **Financial instruments**: packaged or contract-based products built on assets, such as funds, ETFs (exchange-traded funds) and derivatives (contracts whose value depends on another asset).
- **Financial indicators**: measures that track a market but aren't holdings themselves, such as stock indexes (the S&P 500) or interest rates.

## Where each one's return comes from
| Type | Return comes from |
|---|---|
| Equities (stocks) | Dividends + change in share price |
| Bonds | Coupons (interest) + change in bond price |
| Cash and money market | Interest |
| Real assets (property, commodities) | Rent, or for commodities the price change |
| Funds and ETFs | Whatever the underlying holdings earn, minus the fund's fees |
| Derivatives | Changes in the value of the underlying asset, often magnified by leverage |
| Indicators (indexes) | A measure of a market's return; you earn it only by investing in something that tracks it |

**Price-return index vs. total-return index.** A price-return index only tracks price changes. A total-return index also assumes all dividends are reinvested. Over decades the gap is huge, because dividends are a large part of what stocks pay.

## The long-run record
Over long periods in most developed markets, average returns rank: **equities > bonds > bills** (short-term government bills, close to "cash"). After inflation, cash has earned close to nothing. The higher returns came with more volatility: stocks have had deep, multi-year losses. And the starting date matters a lot: some decades break the pattern.

## Two kinds of risk
**Risk** here means the uncertainty of returns: the chance you get something different from what you expected.

systematic risk :: risk that hits the whole market at once: recessions, interest rate changes, inflation, wars. Also called macro or market risk. Owning more stocks doesn't remove it.
unsystematic risk :: risk specific to one company or industry: a failed product, a lawsuit, a CEO leaving. Also called micro, specific or diversifiable risk. Holding many different stocks makes most of it cancel out.

Because anyone can get rid of unsystematic risk for free by diversifying, markets **don't pay you extra for bearing it**. Investors are compensated only for **systematic** risk.

**The risk–return trade-off**: to expect a higher return, you have to accept more (systematic) risk. If something promises high returns with no extra risk, look harder: the risk is usually there, just hidden.

## Quick check
? Which risk can investors largely eliminate by holding many securities?
a) Systematic risk
b) Unsystematic risk
c) Interest rate risk on all bonds
= b
why: Company-specific (unsystematic) risk cancels out across many holdings; market-wide (systematic) risk affects them all and remains.

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
why: The total-return version adds reinvested income to the price changes.

? Investors are compensated mainly for bearing:
a) unsystematic risk
b) systematic risk
c) both equally
= b
why: Unsystematic risk can be diversified away at no cost, so the market doesn't pay for it.


# v1m3
take: To judge a manager, use the time-weighted return, which ignores when clients add or withdraw money; to see what an investor actually earned, use the money-weighted return (an IRR); and know how index weighting, rebalancing and reconstitution work.
mins: 35

## Why there are two "returns"
Imagine a fund that does well in year 1 and badly in year 2. If most clients only put their money in at the start of year 2, those clients lost money, even though the manager's two-year record looks fine. Both statements are true; they measure different things:
- **Time-weighted return (TWR)**: how well the manager's investments performed, regardless of when money came in or out.
- **Money-weighted return (MWR)**: how well the investor's actual dollars did, given when they were added or withdrawn.

## Time-weighted return
Split the time into **subperiods**, cutting each time money is added or withdrawn. Compute the return in each subperiod, then link them by multiplying growth factors, just as with HPR.

```
TWR = (1 + r1)(1 + r2) ... (1 + rn) − 1
```
~ r1, r2 ... rn :: the return in each subperiod between cash flows
~ n :: the number of subperiods

To compare with other managers, annualize it: (1 + TWR)^(1/years) − 1.

## Money-weighted return
The MWR is the **internal rate of return (IRR)**: the single interest rate that makes the present value of all the money you put in equal the present value of everything you took out (including what's still in the account at the end). Bigger contributions get more weight, which is why it reflects your timing.

```
0 = CF0 + CF1/(1 + r) + CF2/(1 + r)^2 + ... + CFn/(1 + r)^n
```
~ CF0, CF1 ... CFn :: each cash flow: money in is negative (it leaves your pocket), money out or the ending value is positive
~ r :: the money-weighted return (solve for it, usually with the calculator's IRR function)
~ (1 + r)^t :: discounts a cash flow t years in the future back to today

## Worked example
- Year 0: buy 1 share at $100.
- Year 1: the price is $120. Buy a second share for $120.
- Year 2: the price is $130. Sell both for $260. No dividends.

**Time-weighted:**
- Year 1 return = 120/100 − 1 = 20%.
- Year 2 return = 130/120 − 1 = 8.33%.
- TWR = 1.20 × 1.0833 − 1 = 30% over two years → 1.30^0.5 − 1 = **14.02% a year**.

**Money-weighted:** cash flows are −100 (year 0), −120 (year 1), +260 (year 2).
- Solve 0 = −100 − 120/(1 + r) + 260/(1 + r)^2 → r = **12.05% a year**.

The MWR is lower because more of the investor's money was in during year 2, the weaker year. The manager's skill (TWR) is the same either way.

## Indexes: how they're built
An **index** tracks a group of securities. How much each security counts depends on its **weighting** method:

| Weighting | Each stock's weight is based on | Effect |
|---|---|---|
| Price-weighted | Its share price | Expensive shares dominate; a stock split changes its influence |
| Equal-weighted | The same for every stock | Small companies count as much as large ones |
| Market-cap weighted | Its total market value (price × shares outstanding) | The biggest companies dominate |
| Float-adjusted market cap | Market value of shares actually available to trade | The standard for most broad indexes |
| Fundamental | Sales, earnings, book value or dividends | Tilts toward cheaper (value) stocks |

A **price-weighted index** value is the sum of the prices divided by a **divisor** (a number adjusted for splits so they don't move the index).

Example: three stocks priced 10, 20 and 30; divisor 3. Index = 60/3 = 20. Next period they're 12, 18 and 33: index = 63/3 = 21, a **5%** price return. The $30 stock rose only 10% but moved the index more than the $10 stock's 20% rise, because its price is higher.

**Rebalancing** resets weights to their targets (needed for equal-weighted indexes as prices drift). **Reconstitution** changes which stocks are in the index. Both create trading costs for funds that track the index.

## Quick check
? A manager has no control over client deposits and withdrawals. Her performance should be measured with:
a) money-weighted return
b) time-weighted return
c) the arithmetic mean of client returns
= b
why: The time-weighted return removes the effect of cash flow timing, which the manager doesn't control.

? An investor adds a lot of money just before a strong period. Compared with the time-weighted return, the money-weighted return will be:
a) higher
b) lower
c) the same
= a
why: More of the investor's money was exposed to the strong period, which raises the IRR.

? In a price-weighted index, a 10% rise in which stock moves the index most?
a) The stock with the highest price
b) The stock with the largest market cap
c) All move it equally
= a
why: Weights depend on share price, so the most expensive stock has the most influence.

? Subperiod returns are 10% and −5%. The time-weighted return over both periods is:
a) 4.50%
b) 5.00%
c) 2.50%
= a
why: Link the growth factors: 1.10 × 0.95 − 1 = 4.5%.


# v1m4
take: Any investment is worth the present value of the cash it will pay you; run that backward from today's price to find the implied return or growth; and because identical cash flows must cost the same (no arbitrage), you can price forward rates, forward exchange rates and options.
mins: 40

## The time value of money
A dollar today is worth more than a dollar next year, because today's dollar can be invested and earn interest. So to compare cash at different dates, we **discount** future cash back to its value today, its **present value (PV)**.

```
PV = FV / (1 + r)^N
```
~ PV :: present value: what a future amount is worth today
~ FV :: future value: the amount you'll receive later
~ r :: the discount rate per period (the return you require)
~ N :: the number of periods until you receive it

Example: $110 in one year, at 10%: PV = 110/1.10 = $100.

Three shortcuts for common patterns:
```
Annuity (same payment for N periods):  PV = PMT × [1 − (1 + r)^−N] / r
Perpetuity (same payment forever):      PV = PMT / r
Growing perpetuity:                     PV = CF1 / (r − g)
```
~ PMT :: the equal payment each period
~ CF1 :: the first cash flow, received one period from now
~ g :: the constant growth rate of the cash flows (must be below r)

A **bond's price** = PV of its coupons + PV of its face value (the amount repaid at maturity). A **zero-coupon bond** pays no coupons, so its price is just the PV of the face value. A **stock's value** = PV of expected future dividends; with constant growth that's the growing-perpetuity formula, known as the Gordon growth model: D1 / (r − g), where D1 is next year's dividend.

## Implied returns and growth
The formulas above go from assumptions to a price. The market gives you the price, so you can also run them backward to see what return or growth the market is assuming.

- For a bond, the return that makes the PV of its cash flows equal its price is its **yield to maturity (YTM)**.
- For a stock, rearrange the Gordon growth model:
```
Implied required return:  r = D1 / P0 + g
Implied growth:           g = r − D1 / P0
```
~ D1 :: the dividend expected next year
~ P0 :: today's share price
~ D1 / P0 :: the dividend yield
~ r :: the return investors require
~ g :: the dividend growth rate

Example: price $50, next dividend $2.50, required return 9%. Dividend yield = 2.50/50 = 5%. Implied growth = 9% − 5% = **4%** a year.

## No arbitrage and cash flow additivity
**Arbitrage** is making a riskless profit with no money of your own: buying something cheap and simultaneously selling the identical thing at a higher price. In working markets these chances vanish almost instantly, so we assume **no arbitrage**: two investments with exactly the same future cash flows must cost the same today.

**Cash flow additivity**: the PV of a group of cash flows is the sum of the PVs of each one. Together with no arbitrage, this lets you price one investment by building a copy of it from others.

**Forward interest rates.** A forward rate is an interest rate agreed today for a loan starting later. Investing for 2 years at today's 2-year rate must give the same result as investing for 1 year and then rolling over at the 1-year rate one year from now:
```
(1 + r2)^2 = (1 + r1) × (1 + f1,1)
```
~ r1 :: today's 1-year interest rate
~ r2 :: today's 2-year interest rate (per year)
~ f1,1 :: the 1-year rate starting one year from now (the forward rate)

**Forward exchange rates.** A currency forward locks in an exchange rate today for a future swap of currencies. Exchange rates are quoted as units of the **price currency** per one unit of the **base currency** (USD/EUR = 1.10 means $1.10 per euro).
```
F = S × (1 + r_price) / (1 + r_base)
```
~ F :: the forward exchange rate
~ S :: the spot (today's) exchange rate
~ r_price :: the interest rate on the price currency (the one in the numerator)
~ r_base :: the interest rate on the base currency (the "one unit" currency)

Example: spot USD/EUR = 1.1000; USD interest 5%, EUR interest 3%; one year. F = 1.10 × 1.05/1.03 = **1.1214**. The euro (lower interest rate) costs more dollars in the forward market.

**Pricing an option by replication.** A **call option** gives you the right to buy a stock at a set price (the **strike** or exercise price) on a future date. Suppose a stock at 100 will be either 120 or 80 in one period, the risk-free rate is 5%, and the call's strike is 100. The call pays 20 if the stock goes up (120 − 100) and 0 if it goes down.

You can copy this payoff with shares plus borrowing, so the call must cost the same as that copy:
- **Hedge ratio** = change in option payoff ÷ change in stock price = (20 − 0)/(120 − 80) = 0.5 shares per call.
- Equivalently, use the **risk-neutral probability** q, the up-probability that makes the stock earn exactly the risk-free rate: q = (1.05 − 0.80)/(1.20 − 0.80) = 0.625.
- Call value = q × up payoff / (1 + risk-free rate) = 0.625 × 20 / 1.05 = **11.90**.

## Quick check
? A stock trades at $40 and pays a $2 dividend next year; growth is expected at 3% forever. The implied required return is:
a) 5%
b) 8%
c) 3%
= b
why: r = D1/P0 + g = 2/40 + 3% = 5% + 3% = 8%.

? Two portfolios have identical future cash flows but different prices. No-arbitrage implies:
a) the prices will remain different
b) buying the cheaper and selling the dearer earns a riskless profit until prices converge
c) the cheaper one has more risk
= b
why: Identical cash flows must have the same price; otherwise traders lock in a riskless profit until prices line up.

? Spot is 1.2000 USD per GBP; the USD rate is 4% and the GBP rate 5%. The 1-year forward is closest to:
a) 1.1886
b) 1.2000
c) 1.2115
= a
why: GBP is the base currency. F = 1.20 × 1.04/1.05 = 1.1886: the higher-rate GBP buys fewer dollars forward.

? A perpetuity pays $6 a year and the discount rate is 8%. Its value is:
a) $48
b) $75
c) $80
= b
why: PV = PMT / r = 6 / 0.08 = $75.


# v1m5
take: Summarize a set of returns by its center (mean, median, mode), its spread (range, mean absolute deviation, variance, standard deviation), its shape (skewness, kurtosis) and how it moves with other assets (covariance, correlation); semi-deviation measures downside only and the coefficient of variation measures risk per unit of return.
mins: 35

## Why describe a distribution
A list of 60 monthly returns is hard to read. A few summary numbers tell you what's typical (the center), how much returns swing (the spread), whether big surprises tend to be good or bad (the shape), and whether two assets move together.

## The center
mean :: the average: add all values and divide by how many. Pulled toward extreme values (outliers)
median :: the middle value when the data are sorted. Not affected by outliers
mode :: the value that occurs most often
trimmed mean :: the mean after dropping a set share of the highest and lowest values
winsorized mean :: the mean after replacing extreme values with the nearest remaining value
quantiles :: values that split sorted data into equal parts: quartiles (4 parts), quintiles (5), deciles (10), percentiles (100)

To locate a percentile in sorted data:
```
Ly = (n + 1) × y / 100
```
~ Ly :: the position (1st, 2nd, ...) of the y-th percentile in the sorted list
~ n :: the number of observations
~ y :: the percentile you want (e.g., 25 for the first quartile)

## The spread
Spread (also called dispersion) measures how far returns stray from the mean. More spread means more uncertainty, which is how finance usually measures risk.

```
Range = Maximum − Minimum
Mean absolute deviation (MAD) = Σ |Xi − X̄| / n
Sample variance s² = Σ (Xi − X̄)² / (n − 1)
Standard deviation s = √s²
```
~ Xi :: each individual observation
~ X̄ :: the mean of the observations ("X-bar")
~ Σ :: "sum of": add the expression up for every observation
~ |  | :: absolute value: ignore the minus sign
~ n :: the number of observations
~ n − 1 :: used for a sample (it corrects a bias); use n only for a whole population

Variance squares the deviations, so its units are awkward (percent squared). The **standard deviation** is its square root, back in percent, which is why it's the usual measure of volatility.

## Worked example
Four yearly returns: 4%, 8%, −2%, 10%.
- Mean = (4 + 8 − 2 + 10)/4 = **5%**.
- Deviations from the mean: −1, 3, −7, 5.
- MAD = (1 + 3 + 7 + 5)/4 = **4%**.
- Squared deviations: 1, 9, 49, 25; sum = 84.
- Sample variance = 84/(4 − 1) = **28** (%²). Standard deviation = √28 = **5.29%**.
- Coefficient of variation = 5.29/5 = **1.06** (see below).

## The shape
skewness :: whether the distribution is lopsided. Positive (right) skew: a long tail of big gains; mean > median > mode. Negative (left) skew: a long tail of big losses; mean < median < mode.
kurtosis :: how heavy the tails are. "Excess kurtosis" compares with the normal (bell-curve) distribution: above zero means fatter tails (extreme outcomes more likely) and a sharper peak, called leptokurtic.

Investors generally like positive skew and dislike fat tails. Many asset returns have negative skew and excess kurtosis, so assuming a normal distribution understates crash risk.

## Moving together: covariance and correlation
```
Covariance = Σ (Xi − X̄)(Yi − Ȳ) / (n − 1)
Correlation = Covariance(X, Y) / (sX × sY)
```
~ X, Y :: the two assets' returns
~ X̄, Ȳ :: their means
~ sX, sY :: their standard deviations

Covariance is positive when the two tend to be above (or below) their means at the same time. Its size is hard to interpret, so we scale it into the **correlation**, which always lies between −1 (perfect opposites) and +1 (perfectly together); 0 means no linear relationship.

Correlation only captures **straight-line** relationships, says nothing about cause, and can be **spurious** (two unrelated series that trend together by chance) or driven by a few outliers.

## Two more risk measures
```
Coefficient of variation (CV) = s / X̄
```
~ s :: standard deviation of returns
~ X̄ :: mean return

The CV is risk per unit of return; lower is better. It lets you compare assets with very different average returns.

**Semi-deviation** (downside deviation) is a standard deviation calculated using only the returns **below** the mean (or below a target return). It focuses on the bad outcomes investors actually worry about.

## Quick check
? A return distribution with a long right tail has:
a) mean < median
b) mean > median
c) mean = median
= b
why: A few very large gains (the right tail) pull the mean above the median.

? Covariance between two assets is 0.006; their standard deviations are 0.10 and 0.15. The correlation is:
a) 0.40
b) 0.60
c) 0.90
= a
why: Correlation = covariance / (sX × sY) = 0.006 / (0.10 × 0.15) = 0.006 / 0.015 = 0.40.

? Asset A has mean return 8% and standard deviation 12%; asset B has 5% and 6%. Which has more risk per unit of return?
a) A
b) B
c) They're equal
= a
why: CV of A = 12/8 = 1.5; CV of B = 6/5 = 1.2. A carries more risk per unit of return.

? A distribution with excess kurtosis greater than zero has:
a) thinner tails than the normal distribution
b) fatter tails than the normal distribution
c) no skew
= b
why: Positive excess kurtosis (leptokurtic) means extreme outcomes are more likely than under a normal distribution.


# v1m6
take: A random variable's expected value weights each outcome by its probability, and its variance measures the spread around that; learn the main distributions used in finance (binomial, normal, lognormal, t, chi-square, F), how conditional probabilities work, and how Bayes' rule updates a belief when new evidence arrives.
mins: 40

## Random variables
A **random variable** is a number whose value depends on chance, such as next month's return.
- **Discrete**: it can take a countable set of values (the number of defaults in a portfolio). Each value's probability comes from the **probability mass function (PMF)**.
- **Continuous**: it can take any value in a range (a return). Probabilities come from areas under the **probability density function (PDF)**.
- The **cumulative distribution function (CDF)** gives the probability that the variable is at or below a value: P(X ≤ x).

## Expected value and variance
The **expected value** is the probability-weighted average of the outcomes: the long-run average if the situation repeated many times. The **variance** is the probability-weighted average of the squared distances from that expected value.
```
E(X) = Σ P(xi) × xi
Var(X) = Σ P(xi) × [xi − E(X)]²
```
~ E(X) :: the expected value of X
~ xi :: each possible outcome
~ P(xi) :: the probability of that outcome (the probabilities add to 1)
~ Var(X) :: the variance; its square root is the standard deviation σ

Example: a stock returns 10% with probability 0.3, 5% with probability 0.5, and −5% with probability 0.2.
- E(R) = 0.3 × 10 + 0.5 × 5 + 0.2 × (−5) = 3.0 + 2.5 − 1.0 = **4.5%**.
- Variance = 0.3 × (10 − 4.5)² + 0.5 × (5 − 4.5)² + 0.2 × (−5 − 4.5)² = 9.075 + 0.125 + 18.05 = 27.25.
- Standard deviation = √27.25 = **5.22%**.

## The distributions you need
**Binomial**: counts successes in a fixed number of independent tries, each with the same success probability (a single try is a Bernoulli trial).
```
P(x successes) = C(n, x) × p^x × (1 − p)^(n − x)
Mean = n × p        Variance = n × p × (1 − p)
```
~ n :: the number of tries
~ x :: the number of successes you're asking about
~ p :: the probability of success on each try
~ C(n, x) :: the number of ways to choose x of the n tries ("n choose x"; the nCr key)

Example: 5 tries, p = 0.6. P(exactly 3) = C(5, 3) × 0.6³ × 0.4² = 10 × 0.216 × 0.16 = **0.3456**.

**Normal**: the symmetric bell curve, described fully by its mean μ and standard deviation σ. About 68% of outcomes fall within 1σ of the mean, 95% within 1.96σ, and 99% within 2.58σ. Convert any value to a **z-score** (how many standard deviations it is from the mean):
```
z = (x − μ) / σ
```
~ x :: the value you're looking at
~ μ :: the mean ("mu")
~ σ :: the standard deviation ("sigma")

**Lognormal**: a variable whose natural log is normal. It's always positive and skewed right, which fits **asset prices** (they can't fall below zero).

| Distribution | Used for |
|---|---|
| Uniform | Every value in a range equally likely |
| Student's t | Tests with small samples when the variance is estimated; fatter tails than the normal, approaching it as the sample grows |
| Chi-square | Testing a single variance; testing whether two categories are independent; never negative |
| F | Comparing two variances (a ratio of two chi-squares) |

## Conditional expectations
A **conditional** expectation is the expected value given that some scenario happens: "expected return if the economy grows." The overall expected value is the probability-weighted average of the scenario expectations:
```
E(X) = Σ E(X | Si) × P(Si)
```
~ Si :: scenario i (the scenarios must cover all possibilities)
~ E(X | Si) :: the expected value of X if scenario i happens
~ P(Si) :: the probability of scenario i

## Bayes' rule
Bayes' rule updates a belief (a **prior** probability) when new evidence arrives, giving an updated (**posterior**) probability.
```
P(A | B) = P(B | A) × P(A) / P(B)
```
~ A :: the event you care about (e.g., the company is improving)
~ B :: the evidence you observed (e.g., an analyst upgrade)
~ P(A) :: your prior: the probability of A before seeing B
~ P(B | A) :: how likely the evidence is if A is true
~ P(B) :: the overall probability of the evidence, from all ways it can happen

Example: 40% of companies have improving fundamentals. Analysts upgrade 70% of improving companies and 20% of the others. You see an upgrade.
- P(B) = 0.4 × 0.7 + 0.6 × 0.2 = 0.28 + 0.12 = 0.40.
- P(improving | upgrade) = 0.28 / 0.40 = **70%**. The upgrade raised the probability from 40% to 70%.

## Quick check
? A stock returns 12% with probability 0.4 and −3% with probability 0.6. Its expected return is:
a) 3.0%
b) 4.5%
c) 7.5%
= a
why: E(R) = 0.4 × 12 + 0.6 × (−3) = 4.8 − 1.8 = 3.0%.

? For a normal distribution, about 95% of outcomes lie within:
a) ±1 standard deviation
b) ±1.96 standard deviations
c) ±3 standard deviations
= b
why: 1.96 standard deviations on either side of the mean covers 95%.

? Asset prices are often modeled as lognormal mainly because:
a) prices can't fall below zero
b) prices are symmetric
c) prices have no variance
= a
why: A lognormal variable is always positive and skewed right, like prices.

? Prior probability 20%; P(signal | event) = 0.9; P(signal | no event) = 0.3. P(event | signal) is closest to:
a) 20%
b) 43%
c) 90%
= b
why: P(signal) = 0.2 × 0.9 + 0.8 × 0.3 = 0.42. P(event | signal) = 0.18/0.42 = 43%.


# v1m7
take: You learn about a whole population from a sample; the central limit theorem makes the sample mean roughly normal, which gives confidence intervals; hypothesis tests decide whether a result is real or chance, balancing two kinds of error.
mins: 45

## Samples and the central limit theorem
We almost never see the whole **population** (every possible return). We see a **sample** and estimate from it. The **sample mean** itself varies from sample to sample; its standard deviation is the **standard error**.

The **central limit theorem (CLT)**: for a large enough sample (n of 30 or more is the usual rule), the sample mean is approximately normally distributed, whatever the shape of the population.
```
Standard error of the mean = σ / √n
```
~ σ :: the population standard deviation (use the sample's s if σ is unknown)
~ n :: the sample size
~ √n :: the square root of n: quadrupling the sample halves the standard error

**Sampling methods**: simple random (everyone equally likely to be picked), stratified random (sample from each subgroup in proportion; more precise), cluster, and non-random methods (convenience, judgment). **Biases** to watch: survivorship (failed funds drop out of the data), look-ahead (using information that wasn't available at the time), time-period (results that only hold for one era), sample selection, and data snooping (searching many patterns until one looks significant).

## Confidence intervals
A **confidence interval** is a range likely to contain the true population value.
```
Point estimate ± Reliability factor × Standard error
```
~ point estimate :: your best single guess, e.g., the sample mean
~ reliability factor :: how many standard errors wide; for 95% confidence it's 1.96 (z) or a t value from the table
~ standard error :: σ/√n for a mean

Use **z** (normal) when the population variance is known or the sample is large; use **t** with n − 1 degrees of freedom when the variance is estimated from a small sample.

Example: mean return 8%, standard deviation 20%, 100 observations. Standard error = 20/√100 = 2%. 95% interval = 8 ± 1.96 × 2 = **4.08% to 11.92%**.

## Hypothesis testing
A **hypothesis test** asks whether a sample result is strong enough to reject a starting assumption.
null hypothesis (H0) :: the starting assumption, usually "no effect" or "no difference" (e.g., the mean excess return is zero)
alternative hypothesis (Ha) :: what you'd conclude if you reject H0 (e.g., the mean excess return isn't zero)
significance level (α) :: the probability of wrongly rejecting a true H0 that you're willing to accept, typically 5% or 1%
test statistic :: a number computed from the sample that you compare with a critical value
p-value :: the smallest α at which you'd reject H0; reject if the p-value is below α

The steps: state the hypotheses → pick the test statistic → set α → find the critical value → compute the statistic → decide.

| | H0 is actually true | H0 is actually false |
|---|---|---|
| You reject H0 | **Type I error** (false positive), probability α | Correct; the probability of this is the test's **power** (1 − β) |
| You don't reject H0 | Correct | **Type II error** (false negative), probability β |

Lowering α cuts Type I errors but raises Type II errors, unless you get a bigger sample.

## Which test to use
| Question | Test |
|---|---|
| Is one mean equal to a value? | t-test: t = (X̄ − μ0) / (s/√n) |
| Are two independent groups' means equal? | t-test of the difference in means |
| Did the same items change (before vs. after)? | Paired t-test on the differences |
| Is one variance equal to a value? | Chi-square test, n − 1 degrees of freedom |
| Are two variances equal? | F-test: larger variance ÷ smaller variance |
| Is a correlation zero? | t = r√(n − 2) / √(1 − r²), n − 2 degrees of freedom |

In the one-mean test: X̄ is the sample mean, μ0 the value in H0, s the sample standard deviation, n the sample size. In the correlation test: r is the sample correlation.

**p-hacking**: running many tests and reporting only the ones that happen to be significant. It produces false discoveries.

## Non-parametric tests
**Parametric** tests assume the data follow a particular distribution (usually normal). **Non-parametric** tests don't; they use ranks or counts. Use them when the data are ranks, contain big outliers, or clearly aren't normal. Examples: **Spearman rank correlation**, and the **chi-square test of independence** for categories, with degrees of freedom = (rows − 1) × (columns − 1). The trade-off: when the parametric assumptions do hold, non-parametric tests are less likely to detect a real effect.

## Quick check
? A sample of 64 has standard deviation 16. The standard error of the mean is:
a) 0.25
b) 2.0
c) 4.0
= b
why: Standard error = s/√n = 16/√64 = 16/8 = 2.0.

? Rejecting a true null hypothesis is a:
a) Type I error
b) Type II error
c) correct decision
= a
why: A false positive is a Type I error; its probability is α.

? Comparing analysts' forecast errors for the same 40 companies before and after a rule change calls for a:
a) two-sample test of independent means
b) paired comparisons test
c) chi-square test of a variance
= b
why: The same companies are measured twice, so each before figure pairs with an after figure.

? Sample correlation r = 0.4 with n = 27. The t-statistic is closest to:
a) 1.6
b) 2.2
c) 4.0
= b
why: t = r√(n − 2)/√(1 − r²) = 0.4 × √25 / √0.84 = 2.0/0.9165 = 2.18.


# v1m8
take: A portfolio's expected return is the weighted average of its assets' returns, but its risk is less than the weighted average whenever the assets don't move perfectly together; the best portfolios form the efficient frontier, and combining them with a risk-free asset gives the capital allocation line.
mins: 40

## Why portfolios behave differently
If two stocks don't always move together, one's bad months are partly offset by the other's good months. So the portfolio swings less than its parts. This is **diversification**, and it's the only "free lunch" in investing: less risk without giving up expected return.

## Two-asset portfolio
```
Expected return:  E(Rp) = w1 × E(R1) + w2 × E(R2)
Variance:         σp² = w1²σ1² + w2²σ2² + 2 × w1 × w2 × ρ12 × σ1 × σ2
```
~ E(Rp) :: the portfolio's expected return
~ w1, w2 :: the share of money in each asset (weights add to 1)
~ E(R1), E(R2) :: each asset's expected return
~ σ1, σ2 :: each asset's standard deviation (volatility)
~ ρ12 :: the correlation between the two assets ("rho"), from −1 to +1
~ σp :: the portfolio's standard deviation (square root of the variance)

The third term in the variance is where diversification happens: the lower the correlation, the smaller it is.

## Worked example
60% in asset A (expected return 10%, standard deviation 20%) and 40% in asset B (6%, 10%). Correlation 0.2.
- Expected return = 0.6 × 10 + 0.4 × 6 = **8.4%**.
- Variance = 0.6² × 20² + 0.4² × 10² + 2 × 0.6 × 0.4 × 0.2 × 20 × 10
  = 144 + 16 + 19.2 = 179.2 (%²).
- Standard deviation = √179.2 = **13.39%**.

The weighted average of the two standard deviations would be 0.6 × 20 + 0.4 × 10 = 16%. Correlation below 1 brought the risk down to 13.39%. With correlation +1 there's no benefit; with −1, risk can be eliminated entirely. About 30 well-chosen stocks capture most of the diversification benefit.

## Minimum-variance and efficient portfolios
Plot every possible mix of risky assets by risk (x-axis) and expected return (y-axis).
- The **minimum-variance frontier** is the curve of portfolios with the lowest risk for each level of expected return.
- Its left-most point is the **global minimum-variance portfolio**: the least risky mix possible.
- The upper half of the curve, from that point up, is the **efficient frontier**: the highest expected return for each level of risk. A rational investor picks only from here.

## Investor preferences
**Utility** is a score of how much an investor likes a portfolio, rewarding expected return and penalizing risk.
```
U = E(R) − ½ × A × σ²
```
~ U :: utility (higher is better)
~ E(R) :: expected return, as a decimal
~ σ² :: variance of returns, as a decimal (20% standard deviation → 0.04)
~ A :: risk aversion: above 0 for risk-averse investors (most people), 0 for risk-neutral, below 0 for risk-seeking

Example: E(R) = 8.4%, σ = 13.39% (σ² = 0.0179), A = 4. U = 0.084 − 0.5 × 4 × 0.0179 = **0.048**.

## The capital allocation line and capital market line
Add a **risk-free asset** (one with a known return and zero volatility, like a Treasury bill). Mixing it with any risky portfolio gives a straight line of possible portfolios, the **capital allocation line (CAL)**:
```
E(Rp) = Rf + [(E(Ri) − Rf) / σi] × σp
```
~ Rf :: the risk-free rate
~ E(Ri), σi :: the risky portfolio's expected return and standard deviation
~ σp :: the standard deviation of your combined portfolio (how far along the line you go)
~ (E(Ri) − Rf) / σi :: the line's slope, the **Sharpe ratio**: extra return per unit of risk

The best CAL is the one that just touches (is **tangent** to) the efficient frontier. If all investors agree on expected returns and risks, that tangent portfolio is the whole **market portfolio**, and the line is called the **capital market line (CML)**. Each investor picks a point on it: put some money in the risk-free asset (lending) if cautious, or borrow to hold more than 100% of the market portfolio if aggressive.

**CAPM** follows: an asset's expected return depends only on its **systematic risk**, measured by beta. E(Ri) = Rf + βi × [E(Rm) − Rf], where E(Rm) is the market's expected return.

**Limits of the theory**: it assumes returns are normal, variances and correlations are stable, and there are no taxes or trading costs. In crises, correlations tend to rise, just when diversification is needed most.

## Quick check
? 50% in A (σ = 20%) and 50% in B (σ = 20%) with correlation 0. Portfolio standard deviation is closest to:
a) 10.0%
b) 14.1%
c) 20.0%
= b
why: Variance = 0.25 × 400 + 0.25 × 400 + 0 = 200; the square root of 200 is 14.1%.

? Portfolio risk equals the weighted average of the assets' standard deviations only when correlation is:
a) −1
b) 0
c) +1
= c
why: With perfect positive correlation the assets always move together, so there's no diversification benefit.

? E(R) = 10%, σ = 20%, A = 3. Utility is:
a) 0.04
b) 0.07
c) 0.10
= a
why: U = 0.10 − 0.5 × 3 × 0.20² = 0.10 − 0.06 = 0.04.

? The capital market line is the CAL that uses:
a) the global minimum-variance portfolio
b) the market portfolio
c) any portfolio with beta of 1
= b
why: The CML combines the risk-free asset with the market (tangency) portfolio.


# v1m9
take: Simulation generates many possible futures to see the range of outcomes when formulas can't: historical simulation replays the past, bootstrapping reshuffles past data, and Monte Carlo draws from distributions you specify; the output is only as good as the inputs.
mins: 20

## Why simulate
Some questions don't have a neat formula. An option's payoff is **non-linear** (it bends: zero below the strike, rising above it). Some outcomes are **path-dependent** (they depend on the order of returns, not just where prices end up, such as a retirement plan with yearly withdrawals). Simulation creates thousands of possible paths and reads off the results: the average, the spread, the worst 5%, the chance of falling short of a goal.

## The three methods
**Historical simulation**: take the actual day-by-day (or month-by-month) changes in market variables from the past and apply each one to today's portfolio.
- Strengths: uses real data, including real fat tails and real correlations; no distribution to choose. Regulators often require it for big banks' risk numbers.
- Weaknesses: can't produce anything worse than what has happened; only one historical path.

**Bootstrapping**: draw past observations at random **with replacement** (the same day can be picked more than once) to build many new, synthetic paths.
- Strengths: turns a limited history into many paths without assuming a distribution (it's **non-parametric**).
- Weaknesses: assumes the past sample represents the future; random draws break patterns in time, such as calm and volatile periods clustering together.

**Monte Carlo simulation**: choose a distribution for each variable (for example, normal returns with a given mean and standard deviation, and given correlations), then generate random draws from it.
- Strengths: very flexible; can model situations never seen before and complex products.
- Weaknesses: the results depend entirely on the assumed model ("garbage in, garbage out"); heavier computing.

**Multivariate** Monte Carlo simulates several related variables together, so the correlation assumptions matter as much as the individual distributions.

## Using the output
- Expected values and the spread of outcomes.
- **Percentiles**: the 5th percentile loss is one way to estimate **value at risk** (VaR), a loss you'd expect to exceed only 5% of the time.
- The probability of reaching a goal, or of a shortfall.
- **Sensitivity**: rerun with different assumptions to see what drives the result.

## Quick check
? A risk manager applies each of the last 500 days' market moves to today's portfolio. This is:
a) Monte Carlo simulation
b) historical simulation
c) bootstrapping
= b
why: Replaying actual past changes on the current positions is historical simulation.

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
why: If the assumed model is wrong, every simulated path inherits the error.

? Simulation is most useful for valuing:
a) a simple fixed-rate bond
b) a path-dependent option
c) cash in a bank account
= b
why: Path-dependent payoffs are hard to value with a formula; simple bonds and cash aren't.


# v1m10
take: Simple linear regression fits a straight line through data to explain one variable with another, choosing the line that minimizes squared errors; check its assumptions with the residuals, judge the fit with R², the standard error of estimate and t- and F-tests, and read the CAPM's beta and alpha from a regression.
mins: 45

## What regression does
Regression asks: when X changes, how does Y tend to change? For example, when the market rises 1%, how much does a stock tend to move?

The model draws the straight line that best fits the points:
```
Yi = b0 + b1 × Xi + εi
```
~ Yi :: the dependent variable: what you're explaining (e.g., the stock's return in period i)
~ Xi :: the independent variable: what you're using to explain it (e.g., the market's return)
~ b0 :: the intercept: the value of Y when X is zero
~ b1 :: the slope: how much Y changes, on average, when X rises by 1
~ εi :: the error term ("epsilon"): the part of Y the line doesn't explain

## Fitting the line: ordinary least squares
**Ordinary least squares (OLS)** picks the line that makes the sum of the squared vertical gaps (the **residuals**) as small as possible. That gives:
```
b1 = Cov(X, Y) / Var(X)
b0 = Ȳ − b1 × X̄
```
~ Cov(X, Y) :: the covariance of X and Y
~ Var(X) :: the variance of X
~ X̄, Ȳ :: the means of X and Y (the line always passes through this point)

Example: Cov(X, Y) = 0.0024 and Var(X) = 0.0016, so b1 = 0.0024/0.0016 = **1.5**. If the mean X is 1% and the mean Y is 2%, b0 = 2 − 1.5 × 1 = **0.5%**.

## Assumptions to check
1. **Linearity**: the true relationship is a straight line.
2. **Homoskedasticity**: the residuals have the same spread at every value of X.
3. **Independence**: the residuals aren't related to each other (for example, no pattern over time).
4. **Normality**: the residuals are normally distributed.

Check by plotting the residuals. A curve suggests non-linearity; a funnel shape (spread growing with X) is **heteroskedasticity**; runs of positive then negative residuals over time suggest dependence. Outliers can drag the line.

## How good is the fit?
The total variation in Y splits into the part the line explains and the part it doesn't:
```
SST = SSR + SSE
R² = SSR / SST
Standard error of estimate (SEE) = √[SSE / (n − 2)]
F = MSR / MSE = (SSR / 1) / [SSE / (n − 2)]
```
~ SST :: total sum of squares: Σ(Yi − Ȳ)², all the variation in Y
~ SSR :: regression sum of squares: the variation the line explains
~ SSE :: sum of squared errors: the variation left unexplained
~ R² :: coefficient of determination: the share of Y's variation explained, from 0 to 1
~ SEE :: the typical size of a residual; smaller means a tighter fit
~ n :: the number of observations (n − 2 because two coefficients were estimated)
~ MSR, MSE :: mean regression and mean squared error, each sum of squares divided by its degrees of freedom

Example: SST = 100, SSE = 36, n = 32. SSR = 64, so R² = **0.64** (the line explains 64% of the variation). SEE = √(36/30) = **1.10**. In simple regression, R² also equals the correlation squared.

**Testing the slope**: is b1 really different from zero (does X explain Y at all)?
```
t = (b1 − B1) / s_b1
```
~ B1 :: the value in the null hypothesis, usually 0
~ s_b1 :: the standard error of the estimated slope
~ degrees of freedom :: n − 2

In simple regression the F-test and the slope t-test give the same answer (F = t²).

## Predicting and curves
To predict, plug an X value into the fitted line. A **prediction interval** around the forecast is wider than the SEE, and wider the further X is from its mean.

When the relationship curves, take logarithms of one or both variables so a straight line fits:
| Model | Form | How to read the slope |
|---|---|---|
| Log-lin | ln Y = b0 + b1 X | A 1-unit rise in X changes Y by about b1 × 100% |
| Lin-log | Y = b0 + b1 ln X | A 1% rise in X changes Y by about b1/100 units |
| Log-log | ln Y = b0 + b1 ln X | A 1% rise in X changes Y by about b1% (an **elasticity**) |

## The CAPM as a regression
Regress a stock's **excess return** (its return minus the risk-free rate) on the market's excess return:
```
Ri − Rf = αi + βi × (Rm − Rf) + εi
```
~ Ri :: the stock's return
~ Rm :: the market's return
~ Rf :: the risk-free rate
~ βi :: beta, the slope: how much the stock moves for a 1% market move (its systematic risk)
~ αi :: alpha, the intercept: return beyond what the market exposure explains

A statistically significant positive alpha suggests the stock (or manager) beat what its market risk would predict.

## Quick check
? Cov(X, Y) = 0.0030 and Var(X) = 0.0020. The slope is:
a) 0.67
b) 1.50
c) 0.0010
= b
why: b1 = Cov(X, Y) / Var(X) = 0.0030 / 0.0020 = 1.5.

? SST is 200 and SSE is 50. R² is:
a) 0.25
b) 0.75
c) 4.00
= b
why: SSR = SST − SSE = 150; R² = 150/200 = 0.75.

? Residuals that fan out as X increases suggest a violation of:
a) linearity
b) homoskedasticity
c) normality only
= b
why: A widening spread of residuals is heteroskedasticity: the variance isn't constant.

? In a log-log regression, the slope coefficient is best read as:
a) an elasticity
b) a dollar change in Y
c) the correlation between X and Y
= a
why: With logs on both sides, a 1% change in X goes with a b1% change in Y.


# v1m11
take: Financial data science uses statistics and computing to learn from large, messy data; machine learning comes in supervised (learning from labeled examples), unsupervised (finding structure without labels) and deep learning forms; the main dangers are overfitting, biased data and models no one can explain.
mins: 25

## The data
structured data :: neat tables of numbers, such as prices or financial statements
unstructured data :: text, images, audio: news, filings, earnings call transcripts, satellite photos
alternative data :: non-traditional sources: social media and reviews (from individuals), credit card transactions (from business processes), satellites and geolocation (from sensors)

**Big data** is usually described by four Vs: **volume** (how much), **velocity** (how fast it arrives), **variety** (how many types) and **veracity** (how reliable it is). Data science turns it into insight through steps such as capture, curation (cleaning), storage, search and analysis.

## Artificial intelligence and machine learning
**Artificial intelligence (AI)** is the broad goal of computers doing tasks that normally need human intelligence. **Machine learning (ML)** is the part of AI where algorithms learn patterns from data rather than following hand-written rules.

| Type | Learns from | Typical tasks |
|---|---|---|
| Supervised learning | **Labeled** data: examples where the right answer (the target) is known | **Regression** (predict a number, like next month's return); **classification** (predict a category, like default or no default) |
| Unsupervised learning | **Unlabeled** data | **Clustering** (grouping similar stocks); **dimension reduction** (summarizing many variables with a few) |
| Deep learning | Layered **neural networks** (models loosely inspired by the brain) | Images, speech and text; complex non-linear patterns |

**Reinforcement learning** (learning by trial, error and reward) appears in areas such as trade execution.

## Overfitting
A model **overfits** when it memorizes the noise in its training data and then fails on new data. Guard against it by splitting data into a **training set** (to fit the model), a **validation set** (to tune it) and a **test set** (to check it on data it has never seen), using cross-validation, and keeping models no more complex than needed.

## Language tools
**Natural language processing (NLP)** lets computers read text: measuring the tone of news or an earnings call, or pulling figures out of filings. **Large language models (LLMs)** generate and summarize text and can carry out multi-step tasks with little human oversight.

Risks: models can **hallucinate** (state false things confidently), absorb **biases** from their training data, and be hard to **explain**, which matters to clients and regulators. Human judgment, data governance and testing remain essential.

## Quick check
? Predicting whether a borrower will default (yes/no) from labeled historical loans is:
a) unsupervised learning
b) supervised classification
c) dimension reduction
= b
why: The outcome is known for past loans (labeled), and the prediction is a category.

? Grouping stocks by similar return patterns without predefined labels is:
a) clustering
b) regression
c) a chi-square test
= a
why: Clustering is an unsupervised method that finds groups without labels.

? A model performs very well on training data but poorly on new data. This is:
a) underfitting
b) overfitting
c) homoskedasticity
= b
why: The model learned noise specific to its training data.

? Earnings call transcripts are an example of:
a) structured data
b) unstructured data
c) a labeled dataset by default
= b
why: Free text is unstructured; it isn't in rows and columns.
