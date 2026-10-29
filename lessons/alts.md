---
type: lesson-set
workstation: Finance Technicals HQ
topic: alts
last_updated: 2026-10-27
---

# v8m1
take: Alternatives (private capital, real assets, hedge funds) are illiquid, specialized and lightly regulated, with high fees; investors reach them through funds, co-investments or direct deals; fund terms set the GP/LP split, management fees, carried interest, hurdles, high-water marks and waterfalls.
mins: 30

## Features and categories
Compared with public stocks and bonds, alternatives tend to have: **illiquidity**, specialized expertise needed, **low correlation** with traditional assets, less regulation and transparency, **high fees**, leverage, limited and less reliable historical data, and non-normal returns.

| Category | Includes |
|---|---|
| Private capital | Private equity, private debt |
| Real assets | Real estate, infrastructure, natural resources (land, timber, farmland, commodities) |
| Hedge funds | Funds using leverage, shorting and derivatives across asset classes |

## Ways to invest
| Method | How | Control | Fees | Expertise needed |
|---|---|---|---|---|
| Fund investment | Commit to a fund as a limited partner | Least | Highest (management + performance) | Least; rely on the manager |
| Co-investment | Invest alongside the fund in a specific deal | Some | Lower or none on the co-investment | Moderate; risk of adverse selection (the GP offers the less attractive deals) |
| Direct investment | Buy the asset or company yourself | Most | Lowest | Most |

## Ownership structures
- **Limited partnership**: the **general partner (GP)** manages the fund and has unlimited liability; **limited partners (LPs)** supply capital and have limited liability. Terms are in the **limited partnership agreement**, sometimes with **side letters** for particular LPs.
- **Master-feeder** (hedge funds): onshore and offshore feeder funds invest in one master fund.
- **Separately managed accounts**: the investor owns the assets directly; more transparency and control.
- **Fund of funds**: diversification and manager selection, with an extra layer of fees.

## Compensation
management fee :: an annual percentage: of committed capital (private equity) or of assets under management (hedge funds), often 1–2%
performance fee / carried interest :: a share of profits, often 20%
hurdle rate :: the minimum return LPs earn before the GP gets performance fees. **Hard**: fee only on returns above the hurdle. **Soft**: once the hurdle is cleared, fee on all returns (via a catch-up)
catch-up :: the GP gets a larger share of profits above the hurdle until it reaches its full carried interest
high-water mark :: performance fees only on gains above the previous peak value, so investors don't pay twice for recovering losses
waterfall :: the order of distributions. **European (whole-of-fund)**: LPs get all their capital and the hurdle back before the GP takes carry; favors LPs. **American (deal-by-deal)**: carry is paid deal by deal; favors the GP
clawback :: the GP must return carry it received earlier if later losses mean it was overpaid

## Quick check
? Which investment method gives an investor the most control and lowest fees but needs the most expertise?
a) Fund investment
b) Co-investment
c) Direct investment
= c
why: Direct investors own the asset outright, skipping the manager's fees.

? A high-water mark ensures that:
a) the manager earns a fee only on gains above the previous peak
b) investors receive a minimum return before fees
c) fees are paid deal by deal
= a
why: Losses must be recovered before new performance fees are charged.

? Which waterfall is more favorable to limited partners?
a) American (deal-by-deal)
b) European (whole-of-fund)
c) Neither: they're identical
= b
why: LPs get back their capital and hurdle across the whole fund before carry is paid.

? A risk of co-investing is that:
a) the GP may offer co-investors less attractive deals (adverse selection)
b) co-investments always carry double fees
c) co-investors have no exposure to the deal
= a
why: The GP decides which deals to offer for co-investment.


# v8m2
take: Alternatives are judged by IRR and multiples like MOIC, over a life cycle of commitment, deployment and distribution (the J-curve); smoothed valuations understate risk; and fees cut returns sharply, so compute management and performance fees carefully.
mins: 30

## Why performance is hard to judge
Long horizons, irregular cash flows, leverage, illiquid positions, complex fees, and **appraisal-based (smoothed)** valuations. Smoothing makes returns look less volatile and less correlated with markets than they really are. Returns are often non-normal (skewed, fat-tailed). Indexes can suffer **survivorship bias** (failed funds drop out) and **backfill bias** (funds add their good history when they join).

**Life cycle**: commitment (LPs pledge capital) → deployment (**capital calls** as deals are found) → distribution (exits return cash). Early years show negative returns from fees and costs: the **J-curve**.

## Return measures
- **IRR** (money-weighted): accounts for the timing of calls and distributions; the preferred measure.
- **MOIC** (multiple of invested capital) = (realized + unrealized value) / invested capital. Simple, but ignores timing.

Example: invest 100; receive 50 in year 3 and 150 in year 5. MOIC = 200/100 = **2.0×**. IRR ≈ **16.9%**.

## Fees: a worked example
Hedge fund with $100m at the start, gross return 25% (end value $125m). Fees: 2% management fee on year-end assets and 20% incentive fee on gains **net of the management fee**; no hurdle; no prior losses.
- Management fee = 2% × 125 = **$2.5m**.
- Incentive fee = 20% × (125 − 100 − 2.5) = **$4.5m**.
- Total fees $7.0m. Net return = (125 − 7 − 100)/100 = **18.0%**.

Variations:
- **High-water mark at $110m**: incentive = 20% × (125 − 2.5 − 110) = $2.5m.
- **Hard hurdle of 5%**: incentive = 20% × (22.5 − 5) = $3.5m.

Always check whether the fee is on gross or net gains, on beginning or ending assets, and how the hurdle works.

## Leverage
Many alternative funds borrow to invest more than their own capital. Borrowing magnifies returns: the fund keeps everything earned on the borrowed money above its interest cost, and bears the losses too.

```
Leveraged return = [r × (Equity + Debt) − Interest rate × Debt] / Equity
```
~ r :: the return earned on all the assets (own money plus borrowed)
~ Equity :: the investors' own capital
~ Debt :: the amount borrowed
~ Interest rate :: the cost of the borrowing
Leverage magnifies both gains and losses.

## Quick check
? A fund calls $50m and later returns $120m in total. Its MOIC is:
a) 1.4×
b) 2.4×
c) 0.4×
= b
why: 120/50 = 2.4×.

? $200m fund, end value $240m, 1% management fee on ending assets, 20% incentive fee net of the management fee. Total fees are:
a) $7.52m
b) $9.92m
c) $10.40m
= b
why: Management fee = 1% × 240 = 2.4. Incentive fee = 20% × (240 − 200 − 2.4) = 7.52. Total = $9.92m.

? Appraisal-based valuations of private assets tend to:
a) overstate volatility
b) understate volatility and correlation with public markets
c) have no effect on measured risk
= b
why: Smoothed valuations dampen measured volatility and correlations.

? The J-curve describes:
a) negative early returns from fees and costs, followed by gains as investments mature
b) hedge fund leverage
c) commodity futures roll returns
= a
why: Early fees and unrealized investments drag returns before exits arrive.


# v8m3
take: Private equity spans venture capital, growth equity and buyouts, exiting via trade sales, IPOs, secondaries or write-offs; private debt spans direct lending, mezzanine, venture and distressed debt; both promise a return premium for illiquidity and some diversification, which smoothing can exaggerate.
mins: 25

## Private equity categories
| Category | Target | Notes |
|---|---|---|
| Leveraged buyout (LBO) | Mature companies with steady cash flow | Control stake, heavy debt; **MBO** (existing management buys) or **MBI** (outside managers buy in) |
| Venture capital | Start-ups | Pre-seed and seed, early stage (Series A), later stage, pre-IPO; high risk, many failures, a few big winners |
| Growth equity | Established, growing companies | Usually minority stakes, little debt |
| Other | Distressed companies, secondaries, PIPEs | |

**Value creation**: operational improvements, better governance, financial engineering (leverage), multiple expansion, and buying well.

## Exits
- **Trade sale** to a strategic buyer: fast, often a premium for synergies.
- **IPO** (or merger with a SPAC): potentially the highest value; costly, depends on markets.
- **Secondary sale** to another PE firm.
- **Recapitalization**: re-leverage the company to pay a dividend to the fund.
- **Write-off / liquidation**.

## Private debt categories
| Type | Description |
|---|---|
| Direct lending | Senior, usually secured loans to middle-market companies; floating rate |
| Mezzanine | Subordinated debt, often with warrants or PIK interest; higher yield |
| Venture debt | Loans to venture-backed start-ups, often with warrants |
| Distressed debt | Buying the debt of troubled companies, sometimes to gain control in restructuring |
| Unitranche | One loan combining senior and subordinated tranches |
| Specialty | Litigation finance, royalties, trade finance |

## Risk and return
Private equity targets returns above public equity, compensating for illiquidity, leverage and concentration; dispersion between top and bottom managers is wide. Private debt yields more than public debt for illiquidity and complexity, with seniority and covenants protecting recovery.

## Diversification
Low reported correlations with public markets suggest diversification, but **smoothed** valuations overstate it. Real diversification comes from access to different companies, sectors and stages not available publicly.

## Quick check
? A fund buys control of a mature company with stable cash flows, financing most of the price with debt. This is:
a) venture capital
b) a leveraged buyout
c) growth equity
= b
why: LBOs use significant leverage to acquire mature businesses.

? Mezzanine debt is best described as:
a) senior secured bank loans
b) subordinated debt, often with equity kickers such as warrants
c) government bonds
= b
why: Mezzanine sits below senior debt and compensates with higher yield and equity features.

? Selling a portfolio company to a competitor that values synergies is a:
a) trade sale
b) recapitalization
c) write-off
= a
why: Trade sales go to strategic (corporate) buyers.

? Reported correlations between private equity and public equity are likely:
a) overstated
b) understated, because valuations are smoothed
c) exactly right
= b
why: Infrequent, appraisal-based valuations dampen measured co-movement.


# v8m4
take: Real estate is heterogeneous, illiquid and costly to trade, earning rent plus appreciation, accessible directly or through REITs, funds and mortgage securities; infrastructure owns long-lived essential assets with stable, often inflation-linked cash flows, with greenfield projects riskier than brownfield.
mins: 25

## Real estate
Sectors: **residential** (about 75% of the global market) and **commercial**: office, retail, industrial and warehouse, hospitality, multifamily rental.

Unique features: **heterogeneity** (no two properties alike), fragmented markets, **high transaction costs**, **illiquidity**, infrequent prices (appraisals), and the need for local knowledge and management.

| | Equity | Debt |
|---|---|---|
| Private | Direct ownership, private real estate funds | Mortgages, private real estate debt |
| Public | REITs, real estate operating companies | Mortgage-backed securities |

**REITs** own income-producing property, trade on exchanges and usually must distribute most of their income; they offer liquidity but behave partly like equities.

**Returns**: rental income (stable, contractual) plus capital appreciation. Drivers: economic growth, interest rates, location, occupancy, lease terms. Real estate offers moderate diversification and partial inflation protection (rents can reset).

A common valuation shortcut:
```
Value = Net operating income / Capitalization rate
```
~ Net operating income (NOI) :: rental income minus operating expenses, before financing costs and taxes
~ Capitalization (cap) rate :: the yield buyers require on similar properties (NOI / price)
NOI $5m at a 6.25% cap rate → value **$80m**. Higher cap rates mean lower values.

## Infrastructure
Assets that provide essential services:
- **Economic**: transport (toll roads, airports, ports), energy and utilities (power, water), communications (towers, fiber).
- **Social**: schools, hospitals, prisons.

| Stage | Risk |
|---|---|
| **Greenfield** (to be built) | Higher: construction, demand and cost-overrun risk; higher expected return |
| **Brownfield** (existing, operating) | Lower: known cash flows; bond-like |

Revenue models: **availability payments** (paid for keeping the asset available), **user fees** (tolls, demand risk), **regulated returns** (utilities).

Characteristics: long lives, high barriers to entry (often monopoly-like), stable and often **inflation-linked** cash flows, low correlation with the economic cycle. Risks: construction, regulatory and political (tariff caps, expropriation), operational, leverage, and illiquidity. Forms: direct, **public-private partnerships (PPPs)**, unlisted funds, listed infrastructure companies.

## Quick check
? A property's NOI is $3m and the market cap rate is 5%. Its estimated value is:
a) $15m
b) $60m
c) $150m
= b
why: 3 / 0.05 = $60m.

? Buying shares of a publicly traded REIT is:
a) private equity real estate
b) public equity real estate
c) public debt real estate
= b
why: REITs are listed equity claims on property portfolios.

? Compared with brownfield infrastructure, greenfield projects have:
a) lower risk, because they're new
b) higher risk, including construction and demand risk
c) the same risk profile
= b
why: Greenfield projects must still be built and prove their demand.

? A toll road paid by drivers is exposed mainly to:
a) availability-payment risk
b) demand (usage) risk
c) no revenue risk
= b
why: User-fee revenue depends on traffic volumes.


# v8m5
take: Land, timber and farmland earn from appreciation plus harvests (timber can delay harvesting); commodities pay no cash flows, so futures returns come from spot price changes, roll yield (positive in backwardation, negative in contango) and collateral interest; both can hedge inflation and diversify.
mins: 25

## Land, timberland and farmland
| | Raw land | Timberland | Farmland |
|---|---|---|---|
| Income | Little or none | Harvested timber | Crops or leases |
| Return sources | Appreciation (future development) | Biological growth, timber prices, land value | Crop prices and yields, land value |
| Flexibility | Hold for development | Can **delay harvest** when prices are low; trees keep growing | Harvests must happen on schedule |
| Risks | No income, illiquidity | Weather, fire, pests, timber prices | Weather, crop prices, water, regulation |

Unlike most real estate, these earn from biological production as well as the land itself. Forms: direct ownership, private funds, timberland investment management organizations, farmland REITs.

## Commodities
Forms of exposure: **futures** (the main route), commodity ETFs and index funds, physical holdings (mainly precious metals), and shares of producers (which also carry company risk).

Commodities produce **no cash flows**, so returns come from price changes. Prices depend on supply and demand, storage costs, inventory levels and the **convenience yield** (the benefit of holding the physical good when supply is tight).

## Futures returns
A commodity futures investor doesn't own the physical commodity; they hold futures contracts and the cash backing them. So their return comes from three sources.

```
Total return = Spot (price) return + Roll return + Collateral return (+ rebalancing return for an index)
```
~ Spot (price) return :: the change in the commodity's spot price
~ Roll return :: gain or loss from replacing an expiring contract with a later one (positive in backwardation, negative in contango)
~ Collateral return :: interest earned on the cash posted to back the futures
~ Rebalancing return :: for an index, the effect of resetting weights
- **Contango**: futures prices above spot (upward curve), typical when inventories are ample. Rolling a long position means selling the cheaper expiring contract and buying a dearer one: **negative roll return**.
- **Backwardation**: futures below spot (downward curve), typical when supplies are tight and the convenience yield is high: **positive roll return** for longs.
- **Collateral return**: interest earned on the cash backing the futures.

## Risk, return and diversification
Commodity returns are volatile and driven by supply shocks, weather, geopolitics and the business cycle. Commodities and natural resources have tended to do well when **unexpected inflation** rises, offering a hedge that stocks and bonds don't, and low correlations with financial assets.

## Quick check
? An oil futures curve is in contango. A long investor rolling positions earns:
a) a positive roll return
b) a negative roll return
c) no roll return
= b
why: Each roll sells low and buys a higher-priced contract.

? Timberland differs from farmland mainly because:
a) timber can be left to grow when prices are low, delaying the harvest
b) farmland produces no income
c) timberland can't be sold
= a
why: Trees keep growing, giving timber owners flexibility on harvest timing.

? A commodity futures index's total return includes spot return, roll return and:
a) dividend yield
b) collateral return
c) coupon income
= b
why: The cash posted as collateral earns interest.

? Backwardation is most likely when:
a) inventories are high
b) supplies are tight and the convenience yield is high
c) storage costs are large
= b
why: A high convenience yield pushes futures prices below spot.


# v8m6
take: Hedge funds run equity hedge, event-driven, relative value and opportunistic (macro, managed futures) strategies with leverage, shorting and derivatives; access is direct (LPs, master-feeder, separate accounts) or indirect (funds of funds, liquid alternatives); returns are non-normal and index data are biased.
mins: 25

## Strategies
| Group | Strategies | Return driver |
|---|---|---|
| Equity hedge | Long/short (fundamental growth or value), market neutral, short bias, quantitative | Stock selection; net market exposure varies |
| Event-driven | **Merger arbitrage**, distressed securities, activist, special situations | Corporate events |
| Relative value | Fixed income arbitrage, **convertible bond arbitrage**, volatility arbitrage | Mispricing between related securities, often with leverage |
| Opportunistic | **Global macro** (top-down bets on rates, currencies, indexes), **managed futures (CTAs)** (often trend-following) | Macro trends |
| Multi-manager | Multi-strategy funds, funds of funds | Diversification across strategies |

Merger arbitrage example: a company agrees to be bought for $50 cash; its shares trade at $46. Buying captures a **$4 spread (8.7%)** if the deal closes; the risk is the deal failing. In a stock-for-stock deal, the arbitrageur buys the target and shorts the acquirer.

## Distinguishing features
Leverage, short selling and derivatives; few investment restrictions; less regulation and disclosure; high fees (management + incentive); **liquidity terms**: **lock-up periods**, redemption frequency and **notice periods**, and **gates** that limit withdrawals in stress.

## Forms
- **Direct**: limited partnership interests; **master-feeder** structures (onshore and offshore feeders into one master); **separately managed accounts** (more transparency and control, higher minimums).
- **Indirect**: **funds of funds** (manager selection, diversification and smaller minimums, plus an extra fee layer); **liquid alternatives** (hedge fund-like strategies in regulated mutual fund form, with daily liquidity and limits on leverage).

## Risk, return and diversification
Returns are often non-normal (negative skew, fat tails) and depend heavily on the manager. Index returns are flattered by **survivorship bias** (dead funds vanish) and **backfill bias** (funds report their good history when joining). Diversification depends on the strategy: equity hedge funds correlate with stocks; macro and managed futures have often helped in equity sell-offs.

## Quick check
? A target trades at $38 after an agreed $40 cash takeover. The merger arbitrage spread is closest to:
a) 2.0%
b) 5.3%
c) 5.0%
= b
why: 2/38 = 5.3%.

? A fund that makes top-down bets on interest rates, currencies and equity indexes follows:
a) global macro
b) convertible arbitrage
c) market neutral equity
= a
why: Global macro trades broad economic themes across asset classes.

? A drawback of investing through a fund of funds is:
a) no diversification
b) an extra layer of fees
c) higher minimum investments than direct funds
= b
why: Funds of funds charge their own fees on top of the underlying funds' fees.

? Hedge fund index returns are likely to be:
a) understated because of survivorship bias
b) overstated because of survivorship and backfill bias
c) unbiased
= b
why: Failed funds drop out and new funds add their strong past records.


# v8m7
take: Distributed ledgers record transactions without a central authority, validated by proof of work or proof of stake; digital assets range from Bitcoin and stablecoins to tokens and tokenized real assets; they have no intrinsic cash flows, little legal protection and extreme volatility, and their diversification value is unproven.
mins: 25

## Distributed ledger technology
A **distributed ledger** is a shared database copied across many participants; a **blockchain** is a ledger made of blocks of transactions linked cryptographically, so past records can't be changed without detection.

**Consensus protocols**:
- **Proof of work (PoW)**: miners compete to solve hard puzzles; secure but energy-intensive (Bitcoin).
- **Proof of stake (PoS)**: validators lock up ("stake") coins and are chosen to validate; far less energy.

**Permissionless** networks are open to anyone; **permissioned** networks restrict who can participate and validate (common for institutions).

Financial uses: faster post-trade clearing and settlement, **smart contracts** (self-executing code), **tokenization** of real assets, and identity checks for compliance.

## Types of digital assets
- **Cryptocurrencies**: Bitcoin; **altcoins** including **stablecoins** (pegged to a currency or asset) and **meme coins**.
- **Tokens**: **non-fungible tokens** (unique items), **security tokens** (digital claims like shares or bonds), **utility tokens** (access to a service), **governance tokens** (votes on a protocol).
- **Asset-backed tokens**: claims on physical or financial assets, collateralized by them.
- **DeFi**: decentralized lending, trading and other services built from smart contracts.

## How they differ from traditional assets
| | Traditional | Digital assets |
|---|---|---|
| Intrinsic value | Cash flows (dividends, coupons) | Mostly none; price from demand vs. (often capped) supply |
| Validation | Intermediaries | Network consensus |
| Legal tender | Currencies are | Generally not |
| Legal protection | Strong | Limited; oversight evolving |

**Exchanges**: centralized (run by a company, custody risk) and decentralized (smart-contract based). Both have seen fraud and manipulation.

## Investment forms
- **Direct**: buy and hold in a wallet (**hot**: online, convenient, more hack risk; **cold**: offline, safer).
- **Indirect**: exchange-traded products, futures, trusts, hedge funds, and shares of crypto-related companies.

## Risk, return and diversification
Very high volatility and large drawdowns; returns driven by expectations of appreciation, adoption and limited supply. Risks: regulation, fraud, hacks and lost keys, exchange failures, liquidity. Correlations with equities have risen over time, so the diversification benefit is uncertain.

## Quick check
? A consensus protocol where validators lock up coins to earn the right to validate is:
a) proof of work
b) proof of stake
c) permissioned consensus
= b
why: Staking replaces energy-intensive mining in proof of stake.

? A token designed to hold a stable value pegged to the US dollar is a:
a) meme coin
b) stablecoin
c) governance token
= b
why: Stablecoins aim to track a reference value such as a currency.

? Compared with stocks and bonds, cryptocurrencies typically:
a) generate regular cash flows
b) have no underlying cash flows; prices depend on demand and supply
c) are legal tender everywhere
= b
why: Their value comes from market demand, not from income.

? Keeping digital assets in an offline wallet is called:
a) hot storage
b) cold storage
c) staking
= b
why: Cold wallets are offline, reducing hacking risk.
