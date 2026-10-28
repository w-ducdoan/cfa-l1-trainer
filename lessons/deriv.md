---
type: lesson-set
workstation: Finance Technicals HQ
topic: deriv
last_updated: 2026-10-27
---

# v7m1
take: A derivative's value comes from an underlying (equities, rates, currencies, commodities, credit); it's either a firm commitment or a contingent claim; OTC contracts are customized and bilateral, exchange-traded ones are standardized, margined and centrally cleared.
mins: 20

## What a derivative is
A contract between two counterparties whose value depends on an **underlying**. Its terms set the underlying, the size (**notional**), the price, and the maturity.

- **Firm commitment** (forward commitment): both sides must transact: forwards, futures, swaps.
- **Contingent claim**: one side has the right but not the obligation: options, credit default swaps.

Derivatives let you gain or shed exposure without buying or selling the underlying itself.

## Underlyings
| Underlying | Examples |
|---|---|
| Equities | Single stocks, indexes |
| Fixed income and interest rates | Bonds, reference rates such as SOFR |
| Currencies | Exchange rates |
| Commodities | Oil, metals, agricultural products |
| Credit | A borrower's default risk |
| Other | Weather, volatility, inflation |

## OTC vs. exchange-traded
| | Over-the-counter (OTC) | Exchange-traded (ETD) |
|---|---|---|
| Terms | Customized | Standardized |
| Counterparty | A dealer, bilaterally | The clearinghouse (CCP) |
| Counterparty risk | Higher (unless centrally cleared) | Low: the CCP guarantees, using margin |
| Transparency | Lower | High: prices and volumes public |
| Liquidity | Varies | Generally high for active contracts |
| Flexibility | High | Low |

**Central clearing**: a **central counterparty (CCP)** steps between the two sides (novation), so each faces the CCP. It collects **margin** and settles gains and losses daily. Since the 2008 crisis, regulators require many standardized OTC derivatives (such as interest rate swaps) to be centrally cleared and reported.

## Quick check
? Which is a contingent claim?
a) A forward contract
b) An interest rate swap
c) A call option
= c
why: The option holder may choose not to exercise; forwards and swaps oblige both sides.

? Compared with OTC derivatives, exchange-traded derivatives have:
a) more customization and more counterparty risk
b) standardized terms and lower counterparty risk
c) less price transparency
= b
why: ETDs are standardized and guaranteed by a clearinghouse with margin.

? A central counterparty reduces counterparty risk mainly by:
a) eliminating price risk
b) becoming the counterparty to both sides and collecting margin
c) customizing contracts
= b
why: Novation plus margin requirements protect each side against the other's default.

? A contract whose payoff depends on a company's default is a:
a) commodity derivative
b) credit derivative
c) currency derivative
= b
why: Credit derivatives reference a borrower's credit events.


# v7m2
take: Forwards (OTC) and futures (exchange-traded, marked to market daily) lock in a price; swaps exchange a series of cash flows; options give the right to buy (call) or sell (put) for a premium, with payoffs max(0, S − X) and max(0, X − S); credit default swaps pay on a credit event.
mins: 30

## Forwards, futures and swaps
- **Forward**: agree today to buy (long) or sell (short) an underlying at a set price on a future date. OTC, customized, settled at maturity, with counterparty risk.
- **Futures**: like forwards but standardized and exchange-traded, with **daily settlement**: gains and losses go through margin accounts every day.
- **Swap**: a series of exchanges. In a plain **interest rate swap**, one side pays a fixed rate and the other a floating reference rate on a notional amount; only the net difference is paid, and notional isn't exchanged.

## Options
call :: right to buy the underlying at the exercise (strike) price X
put :: right to sell at X
premium :: the price paid for the option
European / American :: exercisable only at expiration / at any time up to expiration

| Position | Value at expiration | Profit | Breakeven |
|---|---|---|---|
| Long call | max(0, ST − X) | Value − c | X + c |
| Short call | −max(0, ST − X) | c − value | X + c |
| Long put | max(0, X − ST) | Value − p | X − p |
| Short put | −max(0, X − ST) | p − value | X − p |

The long call's loss is limited to the premium and its upside is unlimited; the short call's loss is unlimited. A long put's maximum gain is X − p (the price can't fall below zero).

Example: call with X = 50, premium 3. If ST = 58: value 8, profit **5**; breakeven 53. Put with X = 50, premium 2. If ST = 45: value 5, profit **3**; breakeven 48.

## Credit derivatives
In a **credit default swap (CDS)**, the **protection buyer** pays a periodic premium; the **protection seller** pays the loss if a **credit event** (default, bankruptcy, restructuring) hits the reference entity. Buying protection is like shorting the credit.

## Firm commitments vs. contingent claims
| | Forward commitments | Contingent claims |
|---|---|---|
| Obligation | Both sides | Only the seller (writer) |
| Payoff | Linear in the underlying, symmetric | Non-linear, asymmetric |
| Up-front payment | Usually none | Premium |

## Quick check
? A put has a strike of 60 and costs 4. At expiration the stock is 52. The put buyer's profit is:
a) 4
b) 8
c) 12
= a
why: Value = 60 − 52 = 8; profit = 8 − 4 = 4.

? The breakeven price at expiration for a call with strike 100 and premium 6 is:
a) 94
b) 100
c) 106
= c
why: The stock must exceed X + c for the buyer to profit.

? A key difference between futures and forwards is that futures:
a) are customized
b) are settled daily through margin accounts
c) have more counterparty risk
= b
why: Daily mark-to-market and margin are features of exchange-traded futures.

? In a credit default swap, the protection buyer:
a) receives periodic premiums
b) pays periodic premiums and is compensated if a credit event occurs
c) owns the reference bonds by definition
= b
why: The buyer pays for insurance-like protection against default.


# v7m3
take: Derivatives let users transfer and manage risk cheaply and discover prices, but bring leverage, opacity, basis, liquidity and counterparty risks; issuers mainly hedge (fair value, cash flow, net investment hedges), investors adjust exposure, add leverage or implement strategies.
mins: 20

## Benefits
- **Risk allocation, transfer and management**: hedge or take exposure without trading the underlying.
- **Information discovery**: futures and options prices reveal expectations (implied volatility, forward rates).
- **Operational efficiency**: lower transaction costs, easier shorting, less capital needed (leverage).
- **Market efficiency**: arbitrage keeps prices aligned across markets.
- Exposures **not available** in cash markets (volatility, weather).

## Risks
- **Implicit leverage**: small price moves cause large gains or losses relative to the money posted.
- **Lack of transparency**: complex OTC contracts are hard to value and monitor.
- **Basis risk**: the hedge and the exposure don't move exactly together.
- **Liquidity risk**: hard to exit, or margin calls drain cash.
- **Counterparty credit risk**: in OTC contracts.
- **Systemic risk**: excessive, interconnected derivative positions helped spread past crises.

## Issuers
Companies mainly **hedge** exposures in their assets, liabilities and earnings. Hedge accounting lets the hedge and the item hedged hit the books together:
| Hedge type | Protects | Example |
|---|---|---|
| Fair value hedge | The value of an asset or liability | Pay-floating swap on fixed-rate debt |
| Cash flow hedge | Variable future cash flows | Pay-fixed swap on floating-rate debt; forward on future fuel purchases |
| Net investment hedge | The value of a foreign subsidiary | FX forward or foreign-currency debt |

## Investors
- **Modify exposure**: shift duration with futures, add or reduce equity exposure.
- **Create leverage**: get more exposure per dollar.
- **Implement strategies**: a **covered call** (own the stock, sell a call: extra income, capped upside) or a **protective put** (own the stock, buy a put: insurance against a fall).
- **Access markets** that are costly or restricted to trade directly.

## Quick check
? A company with floating-rate debt that wants to lock in its interest cost would most likely:
a) enter a pay-fixed, receive-floating swap
b) enter a receive-fixed, pay-floating swap
c) buy call options on its own stock
= a
why: Paying fixed and receiving floating offsets the floating payments on the debt: a cash flow hedge.

? The risk that a hedge doesn't move exactly with the hedged exposure is:
a) basis risk
b) counterparty risk
c) liquidity risk
= a
why: Basis risk arises when the hedge and the exposure diverge.

? An investor who owns shares and buys puts on them is using a:
a) covered call
b) protective put
c) short straddle
= b
why: Buying puts on owned shares sets a floor on losses.

? Which is a benefit of derivatives?
a) They remove all risk from the financial system
b) They can reveal market expectations through their prices
c) They have no leverage
= b
why: Derivative prices aid information discovery, such as implied volatility.


# v7m4
take: No-arbitrage pricing: owning the asset and selling it forward must earn the risk-free rate, so F0 = S0 × (1 + r)^T, raised by carrying costs and lowered by income or convenience yield; the forward price isn't a forecast of the future spot price.
mins: 25

## Arbitrage and replication
**Arbitrage**: a riskless profit with no net investment. If two portfolios have the same future payoffs, they must cost the same today (the **law of one price**). Arbitrageurs' trades push prices back into line.

**Replication**: build a derivative's payoff from other instruments.
```
Long asset + short forward = risk-free bond
Long asset − risk-free bond (borrowing) = long forward
```
Because of this, the forward price is pinned to the spot price and the risk-free rate.

## The forward price
For an asset with no income or costs:
```
F0(T) = S0 × (1 + r)^T
```
Example: spot 100, risk-free 5%, one year. F0 = **105**.

If the market forward price is 107: sell the forward at 107, borrow 100 at 5%, buy the asset. At maturity deliver the asset for 107 and repay 105: riskless profit **2**. If the forward is below 105, do the reverse (short the asset, lend, buy the forward).

## Cost of carry
Owning the underlying can bring **benefits** (dividends, coupons, a **convenience yield** from holding a physical commodity) and **costs** (storage, insurance).
```
F0(T) = [S0 − PV(benefits) + PV(costs)] × (1 + r)^T
```
Example: spot 100, PV of dividends 2, r = 5%, one year. F0 = 98 × 1.05 = **102.90**.

Benefits lower the forward price (the buyer of the forward doesn't receive them); costs raise it (the forward buyer avoids paying them).

## Spot vs. expected future price
The **expected** future spot price includes a risk premium investors demand for holding the asset. The **forward** price doesn't: it's set by arbitrage using the risk-free rate. So the forward price is not the market's forecast of the future spot price.

## Quick check
? Spot 80, risk-free rate 4%, two years, no income or costs. The forward price is closest to:
a) 83.20
b) 86.53
c) 86.40
= b
why: 80 × 1.04² = 86.53.

? The no-arbitrage forward price is 105, but the market quotes 103. An arbitrageur would:
a) sell the forward, borrow, and buy the asset
b) buy the forward, short the asset, and lend the proceeds
c) do nothing
= b
why: The forward is too cheap: buy it, and short the asset to replicate a short forward at 105.

? All else equal, a higher convenience yield on a commodity:
a) raises its forward price
b) lowers its forward price
c) doesn't affect its forward price
= b
why: Benefits of holding the physical asset reduce the forward price.

? The forward price of a stock equals:
a) the market's expected future stock price
b) the no-arbitrage price based on spot, the risk-free rate and carry
c) the current stock price
= b
why: Forward prices come from replication, not from expectations with a risk premium.


# v7m5
take: A forward is worth zero at initiation; later its value to the long is the spot price (net of carry) minus the PV of the forward price; at expiration it's S_T − F0; FX forwards follow interest rate differentials; FRAs lock in a future borrowing rate, and the long gains when rates rise.
mins: 30

## Price vs. value
The **forward price** F0(T) is fixed at the start. The forward's **value** starts at zero and changes as the spot price moves.
```
At initiation: V0 = 0
During the life (long): Vt = St − PV(benefits) + PV(costs) − F0(T) / (1 + r)^(T − t)
At expiration (long): VT = ST − F0(T)
```
The short's value is the negative of the long's.

Example: F0 = 105 agreed for one year. Six months later the spot is 110 and r = 5%.
Vt = 110 − 105/1.05^0.5 = 110 − 102.47 = **+7.53** to the long.

## FX forwards
```
F = S × (1 + r_price)^T / (1 + r_base)^T
```
The currency with the higher interest rate trades at a forward discount, so investors can't earn the rate difference without risk.

## Interest rate forwards
An **implied forward rate** links short and long zero-coupon rates: it's the breakeven reinvestment rate. A **forward rate agreement (FRA)** locks in a rate for a future period on a notional amount.

A "3×6 FRA" covers the 3-month period starting in 3 months. The **long** FRA (fixed-rate payer, like a future borrower) gains if the reference rate rises above the FRA rate.
```
Payment at the end of the period = Notional × (MRR − FRA rate) × Days / 360
Settled at the start of the period = that amount / (1 + MRR × Days / 360)
```
Example: notional $10m, FRA rate 4%, MRR at settlement 4.5%, 90 days.
End-of-period amount = 10m × 0.005 × 90/360 = $12,500. Settled at the start: 12,500/1.01125 = **$12,361** to the long.

## Quick check
? A long forward was agreed at 50. At expiration the spot price is 46. The long's value is:
a) +4
b) −4
c) 0
= b
why: VT = ST − F0 = 46 − 50 = −4.

? The value of a forward contract at initiation is:
a) zero
b) the forward price
c) the spot price
= a
why: The forward price is set so neither side pays anything up front.

? A company plans to borrow in six months and fears rates will rise. It should:
a) take a long FRA position
b) take a short FRA position
c) sell interest rate futures calls
= a
why: The long FRA locks in the borrowing rate and gains if rates rise.

? F0 = 200 for one year. With six months left, the spot is 190 and r = 4%. The long's value is closest to:
a) −6.10
b) −10.00
c) +6.10
= a
why: 190 − 200/1.04^0.5 = 190 − 196.12 = −6.12.


# v7m6
take: Futures are priced like forwards but marked to market daily, which resets their value to zero; margin calls restore the account to initial margin; futures and forward prices differ when interest rates correlate with the futures price, and interest rate futures differ from FRAs by a convexity bias.
mins: 25

## Pricing and daily settlement
At inception, f0(T) = S0 × (1 + r)^T, as for a forward. The difference: each day the gain or loss is settled through the margin account, so the futures contract's value resets to **zero** at the new futures price. A forward's value builds up until maturity.

## Margin
initial margin :: deposit required to open a position
maintenance margin :: the minimum balance; below it, a margin call
variation margin :: the cash needed to bring the account back up to **initial** margin

Example: initial margin $6,000, maintenance $4,500. A $2,000 loss leaves $4,000, below maintenance. The trader must deposit **$2,000** to return to $6,000.

## Why forward and futures prices differ
Daily settlement means futures gains are received (and losses paid) earlier.
| Correlation between interest rates and the futures price | Result |
|---|---|
| Positive | Futures price > forward price (gains are reinvested at higher rates) |
| Negative | Futures price < forward price |
| Zero (or rates constant) | Equal |

With central clearing of OTC derivatives (daily margining), forwards behave more like futures and the gap narrows.

## Interest rate futures vs. FRAs
Interest rate futures are often quoted as 100 − the rate, with a fixed value per basis point (linear). FRAs have a payoff that is discounted at the rate itself, so they're **convex**. That **convexity bias** means futures-implied rates are typically **higher** than forward rates for the same period.

## Quick check
? Initial margin $5,000, maintenance $3,500. After a loss the balance is $3,200. The variation margin required is:
a) $300
b) $1,800
c) $5,000
= b
why: The account must be brought back to initial margin: 5,000 − 3,200.

? Futures prices are likely to be above forward prices when futures prices and interest rates are:
a) positively correlated
b) negatively correlated
c) uncorrelated
= a
why: Gains arrive when rates are high and can be reinvested at those rates.

? After daily settlement, a futures contract's value is:
a) zero
b) the cumulative gain since inception
c) the futures price
= a
why: Marking to market settles gains and losses and resets the value.

? Compared with FRAs for the same period, interest rate futures-implied rates are usually:
a) lower, because of convexity bias
b) higher, because of convexity bias
c) identical
= b
why: The FRA's convexity is valuable to its holder, so the futures rate must be higher to compensate.


# v7m7
take: A swap is a series of forwards all at one fixed rate; the swap rate is set so the swap is worth zero at inception (like a par rate); after that, the pay-fixed side gains when rates rise.
mins: 25

## Swaps vs. forwards
A **forward** is one exchange; a **swap** is several, on set dates. A plain interest rate swap is like a series of FRAs, but every period uses the **same fixed rate**. Individually, those forwards would have non-zero values (some positive, some negative); together they sum to zero at inception.

Swaps are usually OTC (often centrally cleared), settle periodically on a net basis, and don't exchange notional.

## Pricing: the swap rate
The swap rate is the fixed rate that makes the PV of fixed payments equal the PV of floating payments at inception. Using discount factors DF (from zero rates):
```
Swap rate = (1 − DF_N) / (DF_1 + DF_2 + ... + DF_N)
```
Example: 1-year zero rate 4%, 2-year zero rate 4.5% (annual payments).
DF1 = 1/1.04 = 0.9615; DF2 = 1/1.045² = 0.9157.
Swap rate = (1 − 0.9157)/(0.9615 + 0.9157) = 0.0843/1.8772 = **4.49%**.

This is the same as the par rate on a coupon bond.

## Valuation after inception
The swap's **price** (fixed rate) stays the same; its **value** changes with rates. If rates rise, a new swap would require a higher fixed rate, so the old pay-fixed swap is valuable:
```
Value to the pay-fixed side ≈ (Current swap rate − Original fixed rate) × Notional × Σ remaining DF
```
Example: you pay 3% fixed; the current 2-year swap rate is 4% and the DFs are as above. Value = 0.01 × 1.8772 × notional ≈ **+1.88% of notional**.

## Quick check
? An interest rate swap is most similar to:
a) a single forward contract
b) a series of forward contracts at the same fixed rate
c) a call option
= b
why: Each settlement is like an FRA, all priced at the swap's fixed rate.

? Discount factors are 0.97 for year 1 and 0.93 for year 2. The 2-year annual swap rate is closest to:
a) 3.50%
b) 3.68%
c) 7.00%
= b
why: (1 − 0.93)/(0.97 + 0.93) = 0.07/1.90 = 3.68%.

? After a company enters a pay-fixed swap, market rates fall. The swap's value to the company:
a) rises
b) falls (becomes negative)
c) stays at zero
= b
why: It's locked into paying a fixed rate above what the market now requires.

? At inception, the value of a plain interest rate swap is:
a) zero
b) the notional amount
c) the PV of the fixed payments
= a
why: The swap rate is chosen so the PVs of the two legs are equal.


# v7m8
take: Option value = exercise value + time value; moneyness compares the spot to the strike; higher spot, volatility, time and rates raise call values, while higher strike and income lower them; puts move the opposite way on spot, strike, rates and income, and also gain from volatility.
mins: 30

## Exercise value, moneyness and time value
```
Call exercise value = max(0, S − X)
Put exercise value = max(0, X − S)
Time value = Option price − Exercise value
```
| | Call | Put |
|---|---|---|
| In the money | S > X | S < X |
| At the money | S = X | S = X |
| Out of the money | S < X | S > X |

Example: S = 52, X = 50, call price 4.10. Exercise value 2; time value **2.10**.

Time value comes from the chance the option ends further in the money. It shrinks as expiration nears (**time decay**) and is zero at expiration.

**Lower bounds** (European, no income):
```
Call ≥ max(0, S − X / (1 + r)^T)
Put ≥ max(0, X / (1 + r)^T − S)
```

## Arbitrage and replication
Forwards can be replicated statically (buy the asset, borrow). Options can't be replicated with a fixed mix because their payoff is non-linear; replication requires a **hedge ratio** that changes as the price moves (the binomial model shows this in one period).

## What drives option values
| Increase in | Call value | Put value |
|---|---|---|
| Underlying price | ↑ | ↓ |
| Exercise price | ↓ | ↑ |
| Time to expiration | ↑ | Usually ↑ (a deep ITM European put can fall) |
| Risk-free rate | ↑ | ↓ |
| Volatility | ↑ | ↑ |
| Income from the underlying (dividends) | ↓ | ↑ |
| Carrying costs | ↑ | ↓ |

Volatility helps both because the holder benefits from big moves one way and is protected the other way.

## Quick check
? S = 45, X = 50, put price 6.20. The put's time value is:
a) 1.20
b) 5.00
c) 6.20
= a
why: Exercise value = 50 − 45 = 5; time value = 6.20 − 5 = 1.20.

? An increase in the volatility of the underlying:
a) raises calls, lowers puts
b) raises both calls and puts
c) lowers both
= b
why: Holders benefit from large favorable moves while losses are limited.

? A stock is expected to pay a large dividend before expiration. Compared with no dividend, the call is worth:
a) more
b) less
c) the same
= b
why: The dividend lowers the expected stock price, hurting calls and helping puts.

? A call with S = 40 and X = 45 is:
a) in the money
b) at the money
c) out of the money
= c
why: The spot price is below the strike, so exercising wouldn't pay.


# v7m9
take: Put–call parity: S + p = c + X/(1 + r)^T (a protective put equals a fiduciary call), so any one instrument can be built from the other three; with forwards, F0/(1 + r)^T + p = c + X/(1 + r)^T; and a firm's equity is a call on its assets.
mins: 25

## Put–call parity
For European options with the same strike and expiration:
```
S0 + p0 = c0 + X / (1 + r)^T
```
- Left side: **protective put** (stock + put).
- Right side: **fiduciary call** (call + a risk-free bond paying X).
Both pay max(ST, X) at expiration, so they must cost the same.

Example: S = 50, p = 3, X = 50, r = 5%, one year.
c = 50 + 3 − 50/1.05 = 53 − 47.62 = **5.38**.

If the call trades at 6.00, it's too expensive: sell the call and buy the synthetic call (buy the stock, buy the put, borrow 47.62), locking in about 0.62.

## Synthetic positions
Rearrange the equation:
```
Synthetic call = S + p − X / (1 + r)^T
Synthetic put = c − S + X / (1 + r)^T
Synthetic stock = c − p + X / (1 + r)^T
```
A plus sign means buy; a minus sign means sell (or borrow, for the bond).

## Put–call forward parity
Replace the stock with a forward plus a bond:
```
F0 / (1 + r)^T + p0 = c0 + X / (1 + r)^T
```
So **c − p = (F0 − X) / (1 + r)^T**. When the strike equals the forward price, the call and put cost the same.

## Firm value
Shareholders of a company with debt face value D can walk away if assets fall below D:
- **Equity** = a **call** on the firm's assets with strike D.
- **Debt** = a risk-free bond paying D minus a **put** on the assets with strike D.

This explains why shareholders may favor riskier projects: volatility raises the call's value at the lenders' expense.

## Quick check
? S = 40, c = 4, X = 40, r = 5%, one year. The European put is worth about:
a) 2.10
b) 4.00
c) 5.90
= a
why: p = c − S + X/(1 + r) = 4 − 40 + 38.10 = 2.10.

? A protective put consists of:
a) a long call and a risk-free bond
b) a long stock and a long put
c) a short stock and a long call
= b
why: Owning the stock and a put on it.

? Under put–call forward parity, if the strike equals the forward price, then:
a) the call is worth more than the put
b) the call and put are worth the same
c) the put is worth more
= b
why: c − p = (F0 − X)/(1 + r)^T = 0.

? Viewed through option theory, a firm's equity holders own:
a) a put on the firm's assets
b) a call on the firm's assets with a strike equal to the debt's face value
c) a risk-free bond
= b
why: They receive the excess of asset value over debt, or nothing.


# v7m10
take: In one period the underlying goes up or down; hold h = (c_u − c_d)/(S_u − S_d) shares per option to make a riskless portfolio; equivalently, value the option as its expected payoff under the risk-neutral probability π = (1 + r − R_d)/(R_u − R_d), discounted at the risk-free rate.
mins: 30

## The setup
Today the stock is S0. In one period it becomes S0 × Ru (up) or S0 × Rd (down), with Rd < 1 + r < Ru (otherwise there's an arbitrage). The option pays c_u or c_d.

## Hedge ratio and riskless portfolio
```
Hedge ratio h = (c_u − c_d) / (S_u − S_d)
```
Buy h shares and sell one call: the portfolio has the same value in both states, so it must earn the risk-free rate. That pins down the call's price.

## Risk-neutral valuation
```
π = (1 + r − Rd) / (Ru − Rd)
c0 = [π × c_u + (1 − π) × c_d] / (1 + r)
```
π isn't the real probability of an up move; it's the probability that makes the stock earn the risk-free rate. Because the option is priced by replication, investors' risk preferences and the real probabilities don't matter: this is **risk neutrality**.

## Worked example
S0 = 40, Ru = 1.25 (S_u = 50), Rd = 0.80 (S_d = 32), r = 4%. Call with X = 42.
- c_u = 8, c_d = 0.
- h = 8/18 = **0.444** shares per call.
- π = (1.04 − 0.80)/(1.25 − 0.80) = 0.24/0.45 = **0.533**.
- c0 = 0.533 × 8 / 1.04 = **4.10**.

Put with X = 42: p_u = 0, p_d = 10. p0 = (1 − 0.533) × 10 / 1.04 = **4.49**.

Check with put–call parity: c − p = 4.10 − 4.49 = −0.38; S − X/(1 + r) = 40 − 40.38 = −0.38. ✓

## Quick check
? S0 = 100, Ru = 1.20, Rd = 0.90, r = 3%. The risk-neutral probability of an up move is:
a) 0.40
b) 0.43
c) 0.50
= b
why: (1.03 − 0.90)/(1.20 − 0.90) = 0.13/0.30 = 0.433.

? Using that tree, a call with X = 100 pays 20 up and 0 down. Its value is closest to:
a) 8.41
b) 8.67
c) 10.00
= a
why: 0.4333 × 20 / 1.03 = 8.41.

? The hedge ratio for that call is:
a) 0.33
b) 0.67
c) 1.00
= b
why: (20 − 0)/(120 − 90) = 0.667 shares per call.

? Risk-neutral valuation works because:
a) investors are actually risk-neutral
b) the option can be replicated with the stock and borrowing, so risk preferences drop out
c) real probabilities are always 50/50
= b
why: Replication fixes the price regardless of investors' attitudes to risk.
