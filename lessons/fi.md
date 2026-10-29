---
type: lesson-set
workstation: Finance Technicals HQ
topic: fi
last_updated: 2026-10-27
---

# v6m1
take: A bond is defined by its issuer, maturity, par, coupon, seniority and contingency features; its price and yield move inversely; the indenture sets the rules, with affirmative covenants (must do) and negative covenants (must not do).
mins: 20

## The features
issuer :: who borrows: sovereign, non-sovereign government, quasi-government, supranational, corporate, or a special purpose entity (securitization)
maturity :: when principal is repaid; tenor is the time remaining. Money market under 1 year; capital market over 1 year; perpetual bonds have none
par (face, principal) :: the amount repaid at maturity; prices are quoted as a percentage of par
coupon :: the interest rate times par, paid at a set frequency (annual, semiannual, quarterly); can be fixed or floating
seniority :: rank in repayment if the issuer defaults: senior before subordinated; secured before unsecured
contingency provision :: a clause that changes cash flows if something happens: call, put, conversion

A bond priced above par trades at a **premium** (coupon above market yield); below par at a **discount** (coupon below yield). A **zero-coupon** bond pays nothing until maturity and is issued at a discount; the gap to par is the interest.

## Price and yield move inversely
The **yield-to-maturity** is the single discount rate that sets the present value of a bond's cash flows equal to its price. Raise the yield and the price falls; lower it and the price rises. A **yield curve** plots yields against maturity for similar bonds (usually government).

## The indenture and covenants
The **indenture** (trust deed) is the legal contract: issuer, amount, maturity, coupon, use of proceeds, sources of repayment, collateral, credit enhancements, covenants. A **trustee** looks after bondholders' interests.

Sources of repayment:
- **Sovereign**: taxes and the ability to print money (for local-currency debt).
- **Non-sovereign government**: taxes or revenue from the project (general obligation vs. revenue bonds).
- **Corporate**: operating cash flow, then collateral if secured.
- **Securitized**: cash flows from the asset pool.

| Affirmative covenants (must do) | Negative covenants (must not do) |
|---|---|
| Pay interest and principal on time | Limit additional debt |
| Maintain insurance and assets | No liens on assets already pledged (negative pledge) |
| Comply with laws, file reports | Limit asset sales, dividends and buybacks |
| Pay taxes | Restrict mergers and change of business |
| Cross-default and pari passu clauses | Restrict investments |

Affirmative covenants are mostly administrative and cheap to comply with; negative covenants protect bondholders by limiting actions that dilute their claim.

## Traps
! A premium bond's coupon is **above** its yield.
! Cross-default (a default on other debt triggers default here) is an affirmative covenant.
! Yield and price always move in opposite directions for option-free bonds.

## Quick check
? A bond's coupon rate is 6% and its yield-to-maturity is 5%. The bond trades:
a) at a premium
b) at par
c) at a discount
= a
why: When the coupon exceeds the market yield, investors pay more than par.

? A covenant that stops the issuer from pledging assets already securing this bond to other lenders is:
a) an affirmative covenant
b) a negative covenant
c) a cross-default clause
= b
why: A negative pledge clause restricts the issuer's actions, so it's a negative covenant.

? The main source of repayment for a corporate bond is usually:
a) the collateral
b) the issuer's operating cash flow
c) the trustee
= b
why: Operating cash flow is the primary source; collateral is a secondary source for secured debt.

? A zero-coupon bond:
a) pays interest annually until maturity
b) is issued at a discount and pays par at maturity
c) has no maturity date
= b
why: The difference between the issue price and par is the interest earned.


# v6m2
take: Cash flows can be bullet, amortizing, sinking-fund, floating or index-linked, zero or deferred; calls help issuers, puts and conversion help investors; and where a bond is issued (domestic, foreign, Eurobond) and how it's taxed affect who buys it.
mins: 25

## Principal structures
| Structure | Principal repaid |
|---|---|
| Bullet | All at maturity |
| Fully amortizing | Gradually, reaching zero at maturity (like a mortgage) |
| Partially amortizing | Gradually, with a **balloon** at maturity |
| Sinking fund | Part retired each year by schedule (often by call at par or open-market purchase) |
| Waterfall | Payments go to tranches in order of priority (securitizations) |

A sinking fund cuts credit risk for investors but creates reinvestment risk if bonds are called when rates have fallen.

## Coupon structures
- **Floating-rate notes (FRNs)**: coupon = market reference rate (MRR, such as SOFR) + a fixed **quoted margin**, reset periodically. May have a **cap** (benefits issuer) or **floor** (benefits investor). An **inverse floater** pays more when the reference rate falls.
- **Step-up**: coupons rise on a schedule or if a condition is met (for example a rating downgrade, or missing a sustainability target).
- **Index-linked**: payments tied to inflation. Capital-indexed bonds (like TIPS) adjust principal; interest-indexed bonds adjust the coupon.
- **Zero-coupon**: no coupons; issued at a discount.
- **Deferred coupon**: nothing for a few years, then regular coupons. **Payment-in-kind (PIK)** bonds pay interest with more bonds.

## Contingency provisions
| Provision | Who holds the option | Effect on price vs. a straight bond | Effect on yield |
|---|---|---|---|
| Call | Issuer | Lower | Higher |
| Put | Investor | Higher | Lower |
| Conversion | Investor | Higher | Lower |

- **Callable**: often non-callable for a first period (call protection), then callable at a premium that declines. **Make-whole** calls pay the PV of remaining cash flows at a small spread over government yields, so they cost the issuer a lot and are rarely used to refinance.
- **Putable**: investor can sell back at par on set dates; valuable when rates rise or credit weakens.
- **Convertible**: investor can swap the bond for shares.
```
Conversion price = Par / Conversion ratio
Conversion value = Share price × Conversion ratio
```
~ Par :: the bond's face value, repaid at maturity
~ Conversion ratio :: the number of shares received for each bond
~ Conversion price :: the effective price paid per share by converting
~ Conversion value :: what the shares received are worth today
Example: $1,000 par, conversion ratio 25. Conversion price = $40. With the stock at $36, conversion value = $900.
- **Contingent convertibles (CoCos)**: bank bonds that convert or are written down automatically if capital falls below a trigger; the holder has no choice.

## Legal, regulatory and tax points
| Type | Issued |
|---|---|
| Domestic | In the issuer's own country and currency |
| Foreign | In another country's market and currency, under its rules (e.g., "Yankee", "Samurai", "Panda" bonds) |
| Eurobond | Outside any one country's jurisdiction, often bearer form, lighter regulation |
| Global | In the Eurobond market and at least one domestic market at the same time |

Bonds are **registered** (owner on record) or **bearer** (whoever holds them). Taxes: coupons are usually taxed as income; price changes as capital gains (often at lower rates); original issue discount may be taxed as it accrues; some government bonds (such as US municipal bonds) are tax-exempt.

## Quick check
? Which provision most benefits the issuer?
a) A put option
b) A call option
c) A conversion option
= b
why: The issuer holds the call; it can refinance when rates fall, so callable bonds trade at lower prices and higher yields.

? A convertible bond with $1,000 par has a conversion ratio of 20. The stock is at $55. The conversion value is:
a) $1,100
b) $1,000
c) $50
= a
why: 55 × 20 = $1,100. The conversion price is 1,000/20 = $50.

? An FRN's cap most directly benefits:
a) the investor
b) the issuer
c) both equally
= b
why: A cap limits how high the coupon can go, protecting the issuer when rates rise.

? A bond issued by a Japanese company in the US market, in US dollars, under US rules is a:
a) foreign bond
b) Eurobond
c) domestic bond
= a
why: It's issued in another country's domestic market and currency, under that country's rules.


# v6m3
take: Bond markets split by issuer, credit quality and maturity; investors pick spots on those dimensions to match liabilities; indexes track segments; new issues are mostly underwritten, and secondary trading is dealer-based OTC, less transparent and liquid than stocks.
mins: 20

## Segments and who's in them
- **By issuer**: sovereign, non-sovereign (local) government, quasi-government and agencies, supranationals, corporates (financial and non-financial), securitized.
- **By credit**: investment grade (BBB−/Baa3 and above) vs. high yield (below). Many institutions may hold only investment grade, so the boundary matters.
- **By maturity**: money market (one year or less) vs. capital market.
- **Other**: currency, geography (developed vs. emerging), and ESG features such as **green bonds** (proceeds for environmental projects).

Investors: **central banks** (policy, reserves), **institutions** (pension funds and insurers matching long liabilities, banks managing liquidity, sovereign wealth funds, asset managers), and **retail** investors, mostly through funds.

## Indexes
Fixed-income indexes group bonds by sector, credit, maturity, currency or region (aggregate, government, corporate, high-yield, emerging-market, inflation-linked indexes). They're harder to build and replicate than equity indexes: there are far more bonds than stocks, bonds mature and new ones are issued constantly, and many trade rarely, so prices are often estimated.

## Primary market
- **Public offering**: underwritten (the bank buys the issue and resells, taking the risk), best-efforts (the bank sells as agent), or **auction** (the norm for government bonds).
- **Shelf registration**: one approval, then issues off the shelf over time.
- **Private placement**: sold to a small group of qualified investors; less disclosure, less liquid, often with tailored covenants.

## Secondary market
Mostly **over-the-counter**: dealers quote bid and ask prices and hold inventory. Compared with equities:
- Far more distinct securities, each trading less often.
- Less transparent prices; wider bid-ask spreads, especially for older, smaller or lower-rated issues.
- Recently issued government bonds (**on-the-run**) are the most liquid.
- Settlement is typically T+1 or T+2 for corporates; same day or T+1 for many government bonds.

## Quick check
? Compared with equity markets, secondary bond markets are generally:
a) more centralized on exchanges
b) dealer-based over-the-counter markets with less price transparency
c) more liquid for any given security
= b
why: Most bonds trade OTC through dealers; many issues trade infrequently.

? A pension fund with long-dated liabilities would most likely favor:
a) money market instruments
b) long-maturity bonds
c) only floating-rate notes
= b
why: Long bonds help match the duration of long liabilities.

? Building a bond index is harder than an equity index mainly because:
a) bonds can't be priced at all
b) the universe is large and changes constantly as bonds mature and are issued
c) bond indexes may only include government bonds
= b
why: Constant maturity and new issuance, plus infrequent trading, make bond indexes harder to build and track.

? In an underwritten offering, the investment bank:
a) acts only as an agent and takes no risk
b) buys the issue and bears the risk of reselling it
c) runs an auction for a government
= b
why: Underwriting means the bank commits to buy the issue and resell it, taking on the risk.


# v6m4
take: Companies fund short-term needs with bank lines, secured loans, factoring and commercial paper; banks also use deposits, interbank loans and repos; investment-grade issuers borrow long and unsecured with light covenants, high-yield issuers borrow with collateral, covenants and shorter terms.
mins: 25

## Short-term funding for companies
| Source | Notes |
|---|---|
| Uncommitted line | Bank may refuse to lend; cheap, unreliable |
| Committed (regular) line | Bank must lend up to the limit; commitment fee on the unused part |
| Revolving credit agreement | Committed for a longer term (often years), can be drawn and repaid repeatedly |
| Secured / asset-based loan | Backed by receivables or inventory |
| Factoring | Selling receivables at a discount |
| Commercial paper (CP) | Short-term unsecured notes from strong issuers; cheaper than bank debt |

CP carries **rollover risk**: if the market shuts, the issuer can't refinance, so issuers keep **backup credit lines**. Eurocommercial paper trades outside the issuer's home market.

## Short-term funding for banks
Retail deposits (checking, savings, time deposits), wholesale funds, **interbank** loans, **negotiable CDs**, central bank funds, and **repos**.

## Repurchase agreements
A repo is a sale of a security with an agreement to buy it back at a higher price: economically a **secured loan**. The cash lender takes collateral; the **haircut** (initial margin) is the gap between the collateral value and the cash lent.
```
Cash lent = Collateral value × (1 − Haircut)
Repo interest = Cash lent × Repo rate × Days / 360
```
~ Collateral value :: market value of the securities handed over
~ Haircut :: the discount the lender applies to the collateral (its cushion against a price fall)
~ Repo rate :: the annual interest rate on the repo
~ Days / 360 :: the length of the loan as a fraction of a 360-day money market year
Example: borrow against $10m of bonds with a 2% haircut, 30 days at a 5% repo rate. Cash = $9.8m. Interest = 9.8m × 0.05 × 30/360 = $40,833.

**Repo rate drivers**: lower for high-quality, liquid collateral, short terms, scarce ("special") collateral the lender wants, and when collateral is delivered to the lender. Higher haircuts for riskier, less liquid collateral and longer terms.

**Uses**: dealers finance inventories, investors add leverage, money funds park cash safely, central banks run monetary operations.

**Risks**: counterparty default, collateral value falling (margin calls), legal and settlement risk, and in a crisis, lenders pull back or raise haircuts.

## Long-term corporate debt: IG vs. HY
| | Investment grade | High yield |
|---|---|---|
| Security | Mostly unsecured | Often secured, multiple tranches |
| Covenants | Light | Many (incurrence covenants) |
| Maturity | Long (10–30 years common) | Shorter (often 5–10) |
| Call features | Make-whole calls | Non-call period, then a declining call schedule |
| Analysis focus | Ratios, ratings, spreads | Recovery, collateral, covenants, liquidity |
| Loans | Revolvers as backup | Term loans alongside bonds |

## Quick check
? A dealer borrows against $50m of bonds in a repo with a 3% haircut. The cash received is:
a) $48.5m
b) $50.0m
c) $51.5m
= a
why: 50 × (1 − 0.03) = $48.5m.

? Commercial paper issuers usually keep backup bank lines because of:
a) rollover risk
b) call risk
c) inflation risk
= a
why: If the CP market closes, the issuer needs another source to repay maturing paper.

? A bank must lend up to a set limit when asked, for which the borrower pays a fee on unused amounts. This is a:
a) uncommitted line
b) committed line
c) factoring arrangement
= b
why: A committed line obliges the bank to lend; a commitment fee compensates it.

? Compared with investment-grade bonds, high-yield bonds typically have:
a) fewer covenants and longer maturities
b) more covenants, more collateral and shorter maturities
c) make-whole calls only
= b
why: Lenders to riskier issuers demand more protection and shorter terms.


# v6m5
take: Sovereigns borrow on their taxing power, usually through regular auctions that create benchmark bonds; agencies, local governments and supranationals borrow with varying degrees of government backing.
mins: 20

## Sovereign debt
A sovereign can **tax** and, for its own currency, **print money**, so local-currency default risk is low for developed sovereigns. Developed markets have stable, diversified economies; emerging markets grow faster but are more volatile and often borrow in foreign currency, which adds risk because they can't print it.

Sovereign bonds include short-term bills, notes and long bonds, inflation-linked bonds and FRNs. Ratings are often given separately for **local-currency** and **foreign-currency** debt; local is usually rated higher.

## Issuance and trading
- Issued regularly by **auction**, often on a published calendar.
  - **Single-price (uniform)**: all winning bidders pay the same price.
  - **Multiple-price (discriminatory)**: each winner pays its own bid.
- **Primary dealers** must bid in auctions and make markets.
- The newest issue of each maturity (**on-the-run**) is the most liquid and serves as a **benchmark** for pricing other bonds; older issues are **off-the-run**.
- Sovereign bonds are heavily used as repo collateral.

| | Government | Corporate |
|---|---|---|
| Issuance | Regular, scheduled auctions | Ad hoc, when the issuer needs money, mostly underwritten |
| Liquidity | Highest, especially on-the-run | Lower, varies by issue |
| Role | Benchmark for spreads | Priced as a spread over government |

## Other government-related issuers
- **Agencies and quasi-government entities**: carry out public policy (housing finance, student loans, development). May have explicit or implicit government backing; trade at small spreads over sovereigns.
- **Local and regional governments**: **general obligation** bonds backed by taxing power; **revenue bonds** backed by a project's revenue (a toll road, a utility), which are riskier.
- **Supranationals**: multilateral bodies such as the World Bank (IBRD) or regional development banks, owned by member countries; usually rated AAA thanks to shareholder support and conservative lending.

## Quick check
? In a single-price auction, winning bidders:
a) each pay their own bid
b) all pay the same price
c) pay par regardless of bids
= b
why: Single-price (uniform) auctions clear at one price for all winners.

? Which is usually the most liquid government bond of a given maturity?
a) An off-the-run issue
b) The on-the-run issue
c) A bond issued 20 years ago
= b
why: The most recently issued bond of each maturity is the most traded and serves as the benchmark.

? A bond backed only by the tolls from a new bridge is a:
a) general obligation bond
b) revenue bond
c) supranational bond
= b
why: Revenue bonds rely on the project's revenue, not the government's taxing power.

? Sovereign ratings for local-currency debt are usually:
a) lower than foreign-currency ratings
b) higher than foreign-currency ratings
c) always identical
= b
why: A government can raise taxes or create its own currency to pay local-currency debt.


# v6m6
take: A bond's price is the present value of its cash flows at the yield; between coupon dates, full price = flat price + accrued interest; price moves opposite to yield, more for longer maturities and lower coupons, with convexity; matrix pricing interpolates from similar bonds.
mins: 30

## Pricing with one yield
A bond's price is the present value of everything it will pay you: each coupon, plus the face value at the end, each discounted back to today at the bond's yield.

```
Price = C/(1 + r) + C/(1 + r)^2 + ... + (C + Par)/(1 + r)^N
```
~ C :: the coupon payment each period (coupon rate × par)
~ Par :: the face value repaid at maturity
~ r :: the yield-to-maturity per period (the market discount rate)
~ N :: the number of periods until maturity
Example: 5-year, 4% annual coupon, YTM 5%.
- Annuity factor at 5% for 5 years = (1 − 1.05^−5)/0.05 = 4.3295.
- PV of coupons = 4 × 4.3295 = 17.318.
- PV of par = 100 / 1.05^5 = 78.353.
- **Price = 95.67** (a discount, since the coupon is below the yield).

## Between coupon dates
Bonds are usually bought between coupon dates. The buyer pays the seller the bond's value plus the share of the next coupon the seller has already earned, called **accrued interest**. Quotes leave the accrued interest out so prices don't jump on coupon dates.

```
Full price = PV at the last coupon date × (1 + r)^(t/T)
Accrued interest = (t/T) × Coupon
Flat (quoted, clean) price = Full price − Accrued interest
```
~ Full price :: the price actually paid (also called the dirty or invoice price)
~ PV at the last coupon date :: the bond's value calculated as of the most recent coupon date
~ t :: days since the last coupon date
~ T :: days in the whole coupon period
~ Flat price :: the quoted price, without accrued interest (also called the clean price)
t = days since the last coupon; T = days in the period. Day counts: **actual/actual** for most government bonds, **30/360** for many corporates.

Example: 6% annual coupon, 3 years left at the last coupon, YTM 5%, 20% of the period gone (t/T = 0.2).
- PV at last coupon = 6 × 2.7232 + 100/1.05^3 = 16.339 + 86.384 = 102.723.
- Full price = 102.723 × 1.05^0.2 = 103.731.
- Accrued interest = 0.2 × 6 = 1.200.
- **Flat price = 102.531**.

Prices are quoted flat so they don't jump on coupon dates; buyers pay the full price.

## How price relates to features
| Relationship | Rule |
|---|---|
| Inverse | Yield up, price down |
| Coupon effect | For the same change in yield, lower-coupon bonds move more (in %) |
| Maturity effect | Longer-maturity bonds usually move more (with rare exceptions for long, low-coupon discount bonds) |
| Convexity | A yield drop raises the price more than the same yield rise lowers it |
| Constant-yield trajectory | If the yield doesn't change, a premium bond's price drifts down to par and a discount bond's drifts up ("pull to par") |

## Matrix pricing
For a bond that rarely trades, use yields of similar, actively traded bonds (same credit, similar maturity and coupon) and interpolate.

Example: comparable 3-year bond yields 4.40%, 5-year yields 5.00%. A 4-year bond's estimated yield = 4.40 + (1/2) × 0.60 = **4.70%**; then price it at that yield. Also used to set the yield on new issues: the benchmark yield plus an estimated spread.

## Quick check
? A 3-year bond pays a 5% annual coupon; YTM is 5%. Its price is:
a) above par
b) par
c) below par
= b
why: When the coupon equals the yield, the bond prices at par.

? Full price is 101.80 and accrued interest is 1.25. The flat price is:
a) 100.55
b) 101.80
c) 103.05
= a
why: Flat = full − accrued = 101.80 − 1.25.

? Two bonds have the same maturity and yield. For a 1% rise in yield, the bigger percentage price drop is in the bond with:
a) the higher coupon
b) the lower coupon
c) neither; they fall equally
= b
why: Lower-coupon bonds have more of their value in distant cash flows, so they're more sensitive.

? Comparable 2-year and 6-year bonds yield 3.0% and 4.6%. A 4-year bond's matrix-priced yield is closest to:
a) 3.4%
b) 3.8%
c) 4.2%
= b
why: Halfway between 2 and 6 years: 3.0 + 0.5 × 1.6 = 3.8%.


# v6m7
take: Convert yields between compounding frequencies before comparing them; know current yield, yield-to-call and yield-to-worst, and read spreads: G-spread over government, I-spread over swaps, Z-spread over the whole spot curve, and OAS = Z-spread minus the option's cost.
mins: 30

## Periodicity
A stated annual rate depends on how often it compounds. To compare, convert:
```
(1 + APR_m / m)^m = (1 + APR_n / n)^n
```
~ APR :: annual percentage rate: the stated yearly rate before compounding
~ m, n :: how many times a year each rate compounds (2 = semiannual, 4 = quarterly, 12 = monthly)
~ APR_m / m :: the rate per compounding period
Example: 6% compounded semiannually.
- Effective annual rate = 1.03^2 − 1 = **6.09%**.
- Equivalent quarterly-compounded rate = 4 × (1.03^0.5 − 1) = **5.96%**.

More frequent compounding at a lower stated rate can equal less frequent compounding at a higher one. US Treasuries and many corporates quote **semiannual** bond-equivalent yields; many European bonds quote annual.

## Other yield measures
current yield :: annual coupon / flat price. Ignores reinvestment and the pull to par.
simple yield :: (annual coupon + straight-line amortization of discount or premium) / flat price. Used in Japan.
yield-to-call :: yield assuming the bond is called at the first (or a given) call date and price
yield-to-worst :: the lowest of the yield-to-maturity and all yields-to-call
street convention vs. true yield :: street assumes payments on scheduled dates; true yield uses actual dates, including weekends and holidays

For callable bonds, **yield-to-worst** is the conservative measure. Better still is an option-adjusted measure (below).

## Spreads
| Spread | Measured over | Notes |
|---|---|---|
| Benchmark spread | A specific government bond | Often the on-the-run of similar maturity |
| **G-spread** | Interpolated government yield curve | Same maturity as the bond |
| **I-spread** | Swap rate (interpolated) of the same maturity | Common for corporates and financials |
| **Z-spread** | Each spot rate on the government curve | The constant spread that, added to every spot rate, prices the bond |
| **OAS** | Spot curve, after removing the option's value | Callable: OAS = Z-spread − call option cost |

For a **callable** bond, OAS < Z-spread (part of the extra yield is just paying for the issuer's option). For a **putable** bond, OAS > Z-spread.

A spread reflects **credit risk** and **liquidity risk** (plus taxes in some markets). Widening spreads mean higher compensation demanded, so lower prices.

## Quick check
? A bond yields 8% compounded semiannually. Its effective annual yield is closest to:
a) 8.00%
b) 8.16%
c) 8.24%
= b
why: 1.04^2 − 1 = 8.16%.

? A 5% coupon bond trades at a flat price of 96.00. Its current yield is closest to:
a) 4.80%
b) 5.00%
c) 5.21%
= c
why: 5 / 96 = 5.21%.

? For a callable bond, the option-adjusted spread is:
a) larger than the Z-spread
b) smaller than the Z-spread
c) equal to the Z-spread
= b
why: OAS removes the value of the issuer's call option, which the investor is compensated for in the Z-spread.

? The spread measured as a constant amount over every spot rate on the benchmark curve is the:
a) G-spread
b) I-spread
c) Z-spread
= c
why: The Z-spread (zero-volatility spread) is added to each spot rate so the discounted cash flows equal the price.


# v6m8
take: FRNs pay a reference rate plus a quoted margin; the market's required margin is the discount margin, so QM < DM means a discount price; money market yields are quoted on a discount or add-on basis and on 360- or 365-day years, so convert before comparing.
mins: 25

## Floating-rate notes
quoted margin (QM) :: the fixed spread over the reference rate set at issue
discount margin (DM) :: the spread the market now requires; the FRN's "yield spread"

| If | Price |
|---|---|
| QM = DM | Par on reset dates |
| QM < DM (credit worsened) | Discount |
| QM > DM (credit improved) | Premium |

Simplified pricing: discount each coupon (reference rate + QM) at (reference rate + DM) per period. Because coupons reset, an FRN's price moves mostly with changes in **credit** (the DM), not with interest rates.

## Money market yields
Two quoting conventions:
```
Discount rate (DR):  PV = FV × (1 − Days/Year × DR)
Add-on rate (AOR):   PV = FV / (1 + Days/Year × AOR)
```
~ PV :: the price paid today
~ FV :: the face value paid at maturity
~ Days :: days until maturity
~ Year :: the day-count year: 360 for most money markets, 365 for some
~ DR :: discount rate, quoted as a percentage of face value
~ AOR :: add-on rate, quoted as interest added to the amount invested
- Discount basis: US Treasury bills, commercial paper (it understates the true return: it uses FV in the denominator).
- Add-on basis: bank deposits, CDs, repos, SOFR-based instruments.
- Year: **360** for most money markets (some use 365, e.g. GBP).

To compare, convert everything to an add-on rate on a **365-day year**, the **bond equivalent yield**.

## Worked example
A 90-day T-bill, face $100, quoted at a 4.00% discount rate (360-day year).
- PV = 100 × (1 − 90/360 × 0.04) = **$99.00**.
- Add-on rate, 365-day year: (365/90) × (1.00/99.00) = **4.10%**.

So a 4.00% discount quote is about a 4.10% bond-equivalent yield.

## Quick check
? An FRN's quoted margin is 80 bp; investors now require 120 bp. The FRN trades:
a) at a premium
b) at par
c) at a discount
= c
why: When the quoted margin is below the required (discount) margin, the price falls below par.

? A 180-day instrument with face value 100 is quoted at a 5.00% discount rate on a 360-day year. Its price is:
a) 97.50
b) 95.00
c) 97.56
= a
why: 100 × (1 − 180/360 × 0.05) = 97.50.

? Which money market quote understates the investor's actual rate of return?
a) Add-on rate on a 365-day year
b) Discount rate
c) Bond equivalent yield
= b
why: The discount rate divides interest by face value rather than by the price paid.

? An FRN's price is least sensitive to:
a) changes in the reference rate
b) changes in the issuer's credit spread
c) a rating downgrade
= a
why: The coupon resets with the reference rate; credit changes alter the discount margin and move the price.


# v6m9
take: Spot rates price each cash flow separately with no arbitrage; the par rate is the coupon that prices a bond at par; forward rates are the breakeven rates implied by spot rates; an upward curve puts forwards above spot and par below spot.
mins: 30

## Spot rates
A **spot rate** is the yield on a default-free zero-coupon bond for one maturity. Pricing with spot rates discounts each cash flow at its own rate:
```
Price = C/(1 + S1) + C/(1 + S2)^2 + ... + (C + Par)/(1 + SN)^N
```
~ S1, S2 ... SN :: the spot rate for each maturity: the yield on a zero-coupon government bond maturing at that date
~ C :: the coupon each period
~ Par :: the face value repaid at maturity
Example: S1 = 3%, S2 = 4%. A 2-year, 5% annual coupon bond:
5/1.03 + 105/1.04^2 = 4.854 + 97.078 = **101.93**.

The bond's YTM is a weighted blend of the spot rates.

## Par rates
The par rate for maturity N is the coupon that makes a bond priced at par using the spot rates. For 2 years with the spots above:
c/1.03 + (100 + c)/1.0816 = 100 → c × (0.97087 + 0.92456) = 7.544 → **c = 3.98%**.

## Forward rates
A forward rate is the rate agreed today for a loan starting later. "1y1y" = a 1-year rate starting in 1 year.
```
(1 + S2)^2 = (1 + S1) × (1 + 1y1y)
(1 + S3)^3 = (1 + S2)^2 × (1 + 2y1y)
```
~ S1, S2, S3 :: the 1-, 2- and 3-year spot rates
~ 1y1y :: the 1-year rate starting 1 year from now (a forward rate)
~ 2y1y :: the 1-year rate starting 2 years from now
Example: 1y1y = 1.04^2 / 1.03 − 1 = 1.0816/1.03 − 1 = **5.01%**.

Read it as a breakeven: investing for 2 years at 4% gives the same result as 1 year at 3% then rolling at 5.01%. Spot rates are geometric averages of the forwards, so you can go the other way:
```
S_N = [(1 + S1)(1 + 1y1y)(1 + 2y1y)...]^(1/N) − 1
```
~ S_N :: the N-year spot rate
~ ^(1/N) :: the N-th root: turns the total growth back into a yearly rate (a geometric average)
Pricing with forwards gives the same price as pricing with spots.

## How the three curves relate
| Curve shape | Forward vs. spot | Par vs. spot |
|---|---|---|
| Upward-sloping | Forward > spot | Par < spot (slightly) |
| Downward-sloping | Forward < spot | Par > spot |
| Flat | All equal | All equal |

## Quick check
? S1 = 2% and S2 = 3%. The 1y1y forward rate is closest to:
a) 2.5%
b) 3.0%
c) 4.0%
= c
why: 1.03^2 / 1.02 − 1 = 1.0609/1.02 − 1 = 4.01%.

? If the spot curve slopes upward, the par curve lies:
a) slightly below the spot curve
b) above the spot curve
c) exactly on the spot curve
= a
why: A coupon bond's yield blends earlier, lower spot rates, so par rates sit just below spot rates when the curve rises.

? S1 = 4% and 1y1y = 6%. The 2-year spot rate is closest to:
a) 4.99%
b) 5.00%
c) 10.24%
= a
why: (1.04 × 1.06)^0.5 − 1 = 1.1024^0.5 − 1 = 4.995%.

? Pricing a bond with forward rates rather than spot rates gives:
a) a higher price
b) a lower price
c) the same price
= c
why: Forward rates are implied by spot rates, so both give the same no-arbitrage price.


# v6m10
take: Bond returns come from coupons, reinvestment and price change; if rates move right after you buy, a short horizon is dominated by price risk and a long one by reinvestment risk, and they cancel when the horizon equals Macaulay duration.
mins: 30

## Three sources of return
1. Coupon and principal payments.
2. **Reinvestment** of coupons (at whatever rates are available).
3. **Gain or loss** on sale before maturity, measured against the carrying value on the constant-yield path.

If you hold to maturity and can reinvest at the original YTM, you earn exactly the YTM.

## Worked example
Buy a 5-year, 5% annual coupon bond at par (YTM 5%). Immediately after, rates rise to 6% and stay there.

**Hold to maturity**: coupons reinvested at 6% grow to 5 × [(1.06^5 − 1)/0.06] = 5 × 5.6371 = 28.19. Plus par = 128.19. Annualized return = (128.19/100)^(1/5) − 1 = **5.09%**. Higher reinvestment rates helped.

**Sell after 1 year**: price at 6% with 4 years left = 5 × 3.4651 + 100/1.06^4 = 17.33 + 79.21 = 96.53. Plus the 5 coupon = 101.53. Return = **1.53%**. The price loss dominated.

## Horizon and interest rate risk
- **Short horizon**: market price risk dominates. Rising rates hurt.
- **Long horizon**: coupon reinvestment risk dominates. Rising rates help.
- When the **investment horizon = Macaulay duration**, the two effects roughly offset, locking in the original yield (for one parallel shift).

```
Duration gap = Macaulay duration − Investment horizon
```
~ Macaulay duration :: the bond's weighted-average time to receive its cash flows, in years
~ Investment horizon :: how long the investor plans to hold the bond, in years
Positive gap: you're exposed to rising rates (price risk dominates). Negative gap: you're exposed to falling rates (reinvestment risk dominates).

## Macaulay duration
The weighted average time to receive the cash flows, weighted by each cash flow's share of the bond's price (PV of the cash flow / price).

For the 5-year, 5% par bond at a 5% yield:

| Year | Cash flow | PV at 5% | Weight | Year × weight |
|---|---|---|---|---|
| 1 | 5 | 4.762 | 0.0476 | 0.048 |
| 2 | 5 | 4.535 | 0.0454 | 0.091 |
| 3 | 5 | 4.319 | 0.0432 | 0.130 |
| 4 | 5 | 4.114 | 0.0411 | 0.165 |
| 5 | 105 | 82.270 | 0.8227 | 4.114 |
| Total | | 100.000 | 1.0000 | **4.546** |

Macaulay duration ≈ **4.55 years**. A zero-coupon bond's Macaulay duration equals its maturity.

## Quick check
? An investor buys a bond and holds it to maturity. Rates fall right after purchase. Her realized return will most likely be:
a) above the original YTM
b) below the original YTM
c) exactly the original YTM
= b
why: Coupons get reinvested at lower rates, so the realized return falls short of the original yield.

? Macaulay duration is 6.2 years and the investment horizon is 4 years. The investor is mainly exposed to:
a) rising rates, through price risk
b) falling rates, through reinvestment risk
c) neither
= a
why: A positive duration gap means market price risk dominates, so rising rates hurt.

? The Macaulay duration of a 7-year zero-coupon bond is:
a) less than 7 years
b) exactly 7 years
c) more than 7 years
= b
why: A zero has a single cash flow at maturity.

? Which is NOT a source of return on a fixed-rate bond?
a) Reinvestment of coupons
b) Changes in the issuer's share price
c) Gain or loss on sale before maturity
= b
why: The three sources are payments, reinvestment, and gains or losses on sale.


# v6m11
take: Modified duration = Macaulay ÷ (1 + yield per period) gives the % price change for a 1% yield change; money duration and PVBP turn that into currency; duration rises with maturity and falls with higher coupons and higher yields.
mins: 30

## Modified duration
**Duration** measures how sensitive a bond's price is to a change in its yield. Modified duration turns Macaulay duration (a time measure) into a price-sensitivity measure: the approximate percentage price change for a 1-percentage-point change in yield.

```
Modified duration = Macaulay duration / (1 + r)          (r = yield per period)
%ΔPrice ≈ −Modified duration × ΔYield
```
~ Macaulay duration :: weighted-average time to the bond's cash flows, in periods or years
~ r :: the yield per period
~ %ΔPrice :: the percentage change in the bond's price
~ ΔYield :: the change in yield, as a decimal (+1% = +0.01)
~ The minus sign :: price and yield move in opposite directions
For the 5-year 5% par bond: ModDur = 4.546 / 1.05 = **4.33**. A 1% (100 bp) rise in yield cuts the price by about **4.33%**.

**Approximate modified duration**, from prices at yields just above and below:
```
ApproxModDur = (PV− − PV+) / (2 × ΔYield × PV0)
```
~ PV0 :: the bond's price at today's yield
~ PV− :: the price if the yield falls by ΔYield
~ PV+ :: the price if the yield rises by ΔYield
~ ΔYield :: the size of the yield change used, as a decimal
Use the annual modified duration with annual yield changes: if the yield is per semiannual period, divide the periodic duration by 2.

## Money duration and PVBP
Modified duration gives a percentage change. To know how many dollars a position will gain or lose, multiply by the money invested: that's **money duration**. The **price value of a basis point (PVBP)** is the dollar change for a 1 basis point (0.01%) move in yield.

```
Money duration = Modified duration × Full price
ΔPrice ≈ −Money duration × ΔYield
PVBP = (PV− − PV+) / 2   (for a 1 bp change)  ≈ Money duration × 0.0001
```
~ Full price :: the bond's price including accrued interest (for a position, its market value)
~ ΔPrice :: the change in price in currency
~ bp :: basis point: 0.01%, or 0.0001 as a decimal
~ PVBP :: price value of a basis point
Example: ModDur 4.33 on a $10m position at par. Money duration = $43.3m. PVBP ≈ $4,330: a 1 bp rise costs about $4,330.

## Special cases
- **Zero-coupon**: Macaulay duration = maturity.
- **Perpetuity**: Macaulay duration = (1 + r)/r. At 5%: 21 years.
- **Floating-rate note**: duration ≈ the time to the next reset (very short), because the coupon catches up with rates. Its spread duration is much longer.

## Properties of duration
| Change, all else equal | Effect on duration |
|---|---|
| Longer maturity | Higher (almost always) |
| Higher coupon | Lower |
| Higher yield | Lower |
| Call option (when rates fall) | Lower |
| Put option (when rates rise) | Lower |

Yield duration measures sensitivity to the bond's **own** yield and assumes fixed cash flows; curve duration (next lessons) measures sensitivity to the benchmark curve.

## Quick check
? Macaulay duration is 8.0 and the annual yield is 6%. Modified duration is closest to:
a) 7.55
b) 8.00
c) 8.48
= a
why: 8.0 / 1.06 = 7.55.

? Modified duration is 5.0. If the yield falls by 50 bp, the price change is approximately:
a) −2.5%
b) +2.5%
c) +5.0%
= b
why: −5.0 × (−0.005) = +2.5%.

? A perpetual bond yields 4%. Its Macaulay duration is:
a) 25 years
b) 26 years
c) infinite
= b
why: (1 + 0.04)/0.04 = 26 years.

? Which bond has the highest duration, all else equal?
a) A 10-year bond with a 2% coupon
b) A 10-year bond with an 8% coupon
c) A 5-year bond with a 2% coupon
= a
why: Longer maturity and lower coupon both raise duration.


# v6m12
take: Duration is a straight-line estimate; convexity adds back the curve, so %ΔP ≈ −ModDur × Δy + ½ × Convexity × (Δy)²; portfolio duration is the value-weighted average, which works only for parallel shifts.
mins: 25

## The convexity adjustment
Price-yield is curved for option-free bonds. Duration alone **underestimates** price gains when yields fall and **overestimates** losses when they rise.
```
%ΔPrice ≈ −ModDur × ΔYield + ½ × Convexity × (ΔYield)²
```
~ ModDur :: modified duration
~ Convexity :: a measure of how much the price-yield curve bends
~ ΔYield :: the change in yield, as a decimal
~ (ΔYield)² :: the squared yield change; always positive, so convexity always adds for option-free bonds
Approximation from prices:
```
ApproxConvexity = (PV− + PV+ − 2 × PV0) / ((ΔYield)² × PV0)
```
~ PV0 :: price at today's yield
~ PV−, PV+ :: prices if the yield falls / rises by ΔYield
~ ΔYield :: the yield change used, as a decimal

## Worked example
Modified duration 7.0, convexity 60.

| Yield change | Duration effect | Convexity effect | Estimated price change |
|---|---|---|---|
| +100 bp | −7.00% | +0.5 × 60 × 0.0001 = +0.30% | **−6.70%** |
| −100 bp | +7.00% | +0.30% | **+7.30%** |

The convexity term is always positive for option-free bonds: gains are bigger than losses for the same move.

Convexity is higher for longer maturities, lower coupons, lower yields, and for more dispersed cash flows (a barbell has more convexity than a bullet with the same duration).

**Money convexity** = convexity × full price, used with money duration for currency amounts.

## Portfolio duration and convexity
A portfolio's duration is the average of its bonds' durations, with each bond weighted by its share of the portfolio's market value.

```
Portfolio duration ≈ Σ (Market value weight × Duration of each bond)
```
~ Market value weight :: the bond's market value / the portfolio's total market value
~ Σ :: add up across all the bonds
Same for convexity. Easy and widely used, but it assumes a **parallel shift** in yields; if short and long yields move differently, it misleads. The more precise method (cash-flow yield of the whole portfolio) is harder to use and still assumes parallel moves.

## Quick check
? ModDur 6.0, convexity 50. If yields rise 200 bp, the estimated price change is:
a) −12.0%
b) −11.0%
c) −13.0%
= b
why: −6.0 × 0.02 + 0.5 × 50 × 0.0004 = −12% + 1% = −11%.

? For an option-free bond, the convexity adjustment is:
a) always positive
b) always negative
c) positive for yield falls, negative for yield rises
= a
why: ½ × Convexity × (Δy)² is positive for any yield change when convexity is positive.

? A portfolio is 40% in a bond with duration 3 and 60% in a bond with duration 8. Its duration is:
a) 5.0
b) 5.5
c) 6.0
= c
why: 0.4 × 3 + 0.6 × 8 = 1.2 + 4.8 = 6.0.

? Portfolio duration as a weighted average is most limited because it assumes:
a) all bonds have the same coupon
b) parallel shifts in the yield curve
c) no convexity
= b
why: It treats every bond's yield as moving by the same amount.


# v6m13
take: For bonds with options, use effective duration and convexity, measured against shifts in the benchmark curve; callable bonds show negative convexity when rates fall; key rate durations show exposure to each part of the curve; empirical duration uses history and can be lower than analytical for credit-risky bonds.
mins: 25

## Effective duration and convexity
When cash flows can change (calls, puts, prepayments), you can't use a fixed-cash-flow yield measure. Shift the **benchmark curve** up and down, re-value the bond with a model, and measure:
```
EffDur = (PV− − PV+) / (2 × ΔCurve × PV0)
EffCon = (PV− + PV+ − 2 × PV0) / ((ΔCurve)² × PV0)
%ΔPrice ≈ −EffDur × ΔCurve + ½ × EffCon × (ΔCurve)²
```
~ EffDur :: effective duration
~ EffCon :: effective convexity
~ ΔCurve :: the parallel shift in the benchmark yield curve, as a decimal
~ PV0 :: price today
~ PV−, PV+ :: prices from the valuation model if the curve shifts down / up
These also work better for large shifts. Use full prices.

## Callable and putable bonds
- **Callable**: when rates fall, the price can't rise much above the call price (the issuer will call). The curve flattens: **negative convexity** at low yields. Effective duration falls as rates fall.
- **Putable**: when rates rise, the price can't fall much below the put price. Convexity stays **positive**, and duration shortens as rates rise.

Example: price 100.00; curve −25 bp gives 101.20; curve +25 bp gives 98.70.
EffDur = (101.20 − 98.70) / (2 × 0.0025 × 100) = 2.50 / 0.5 = **5.0**.
EffCon = (101.20 + 98.70 − 200) / (0.0025² × 100) = (−0.10) / 0.000625 = **−160**: negative convexity, typical of a callable bond near its call price.

## Key rate durations
A **key rate (partial) duration** measures sensitivity to a shift at one maturity point of the curve, holding others fixed. The sum of a bond's key rate durations equals its effective duration. Portfolio managers use them to see and adjust exposure to **non-parallel** moves (steepening, flattening, twists).

## Empirical vs. analytical duration
- **Analytical** duration comes from formulas and assumes credit spreads don't react to benchmark moves.
- **Empirical** duration is estimated from historical price data.
- For government bonds, the two are close. For **high-yield** bonds, spreads often widen when benchmark yields fall (flight to quality), offsetting part of the price gain, so empirical duration is **lower** than analytical.

## Quick check
? Effective duration is preferred for a callable bond mainly because:
a) its cash flows change when rates change
b) it has no coupon
c) its yield to maturity is always above its coupon
= a
why: Yield-based measures assume fixed cash flows, which isn't true when the issuer can call.

? Price 100; curve −20 bp: 101.00; curve +20 bp: 99.10. Effective duration is closest to:
a) 4.75
b) 9.50
c) 0.95
= a
why: (101.00 − 99.10)/(2 × 0.002 × 100) = 1.90/0.40 = 4.75.

? A bond's key rate durations are 0.4 (2-year), 1.6 (5-year) and 3.0 (10-year). Its effective duration is:
a) 3.0
b) 5.0
c) 1.67
= b
why: Key rate durations sum to effective duration: 0.4 + 1.6 + 3.0.

? For a high-yield bond, empirical duration is often lower than analytical duration because:
a) its credit spread tends to widen when government yields fall
b) high-yield bonds have no coupons
c) analytical duration ignores maturity
= a
why: Spread widening offsets some of the price gain from falling benchmark yields.


# v6m14
take: Credit risk = probability of default × loss given default; ratings help but lag and miss event risk; spreads move with the cycle, market liquidity and issuer news, and a spread change moves the price by about −spread duration × Δspread.
mins: 25

## Measuring credit risk
probability of default (POD) :: the chance the issuer misses a payment over a period
loss given default (LGD) :: what you lose if it defaults = exposure × (1 − recovery rate)
expected loss :: POD × LGD

Example: 2% annual POD, 40% recovery, $100 exposure. LGD = 100 × 0.60 = $60. Expected loss = 0.02 × 60 = **$1.20**, about 1.2% a year. A bond needs at least that much spread (plus a premium for uncertainty and liquidity).

Sources of credit risk: weak macro conditions, a **mismatch** between the borrower's resources and obligations (refinancing needs), and issuer-specific problems (strategy, governance, competition).

## Ratings
| Moody's | S&P / Fitch | Group |
|---|---|---|
| Aaa to Baa3 | AAA to BBB− | Investment grade |
| Ba1 and below | BB+ and below | High yield (speculative) |
| C / D | D | In default |

Ratings are cheap, comparable signals and drive many investment rules. **Limitations**:
- They change over time (**migration risk**: downgrades hit prices).
- They **lag** the market; prices move before ratings.
- They can miss **event risk** (lawsuits, takeovers, disasters).
- Some sectors and issuers are hard to rate, and agencies have made big mistakes (structured products before 2008).

## What moves spreads
- **Macro**: spreads widen in recessions and narrow in expansions; high-yield spreads move most.
- **Market**: liquidity, dealer capacity, new issue supply, flows into and out of funds.
- **Issuer**: earnings, leverage, ratings changes, corporate actions.

## Price impact of a spread change
When a bond's credit spread (its extra yield over government bonds) changes, its price moves just as it would for any yield change. **Spread duration** measures that sensitivity.

```
%ΔPrice ≈ −Spread duration × ΔSpread + ½ × Spread convexity × (ΔSpread)²
```
~ Spread duration :: the approximate % price change for a 1-percentage-point change in the spread
~ ΔSpread :: the change in the credit spread, as a decimal
~ Spread convexity :: the curvature adjustment for larger spread changes
Example: spread duration 6, spread widens 50 bp → about −3.0% (before convexity).

## Quick check
? POD is 3% and recovery is 30%. Expected loss per $100 is:
a) $0.90
b) $2.10
c) $3.00
= b
why: LGD = 100 × 0.70 = 70; expected loss = 0.03 × 70 = $2.10.

? The lowest investment-grade rating on the S&P scale is:
a) BBB−
b) BB+
c) A−
= a
why: BBB− (Baa3) is the bottom of investment grade.

? Which is a limitation of credit ratings?
a) They are free to use
b) They tend to lag market prices
c) They are always stable
= b
why: Markets react before rating agencies change ratings.

? Spread duration is 5.0 and the spread narrows by 40 bp. Ignoring convexity, the price change is approximately:
a) −2.0%
b) +2.0%
c) +0.4%
= b
why: −5.0 × (−0.004) = +2.0%.


# v6m15
take: Sovereign credit rests on institutions, fiscal room, monetary flexibility, economic flexibility and external position, plus ratios like debt/GDP; non-sovereigns range from near-sovereign agencies and supranationals to local governments whose general obligation and revenue bonds carry different risks.
mins: 25

## Sovereign credit: qualitative
| Factor | Questions |
|---|---|
| Institutions and policy | Rule of law, stable government, corruption, willingness to pay, transparency |
| Fiscal flexibility | Can it raise revenue or cut spending? Debt burden and trend |
| Monetary effectiveness | Credible, independent central bank; reserve-currency status |
| Economic flexibility | Growth, income per head, diversification |
| External status | Reserves, current account, foreign-currency debt, reserve currency status |

## Sovereign credit: quantitative
- **Debt / GDP**, deficit / GDP, interest expense / revenue (fiscal strength).
- **GDP growth** and **GDP per capita** (economic strength).
- **Foreign reserves**, current account balance, external debt / GDP (external strength).
- Inflation history.

Local-currency debt is generally lower risk than foreign-currency debt, since the government can tax and print its own currency. Sovereign defaults are usually about **willingness** as much as ability to pay, and often end in restructuring rather than liquidation.

## Non-sovereign government debt
- **Agencies**: carry out public policy; risk depends on how explicitly the government backs them.
- **Government sector banks and development finance institutions**: lend for national policy goals.
- **Supranationals** (World Bank, regional development banks): owned by member countries, strong capital, preferred-creditor status; usually AAA.
- **Regional and local governments**: can't print money, may face limits on borrowing.
  - **General obligation (GO)** bonds: backed by taxing power. Analyze the tax base, economy, debt burden, pension liabilities, budget practices.
  - **Revenue bonds**: backed by a specific project's revenue. Analyze the project like a business, often with a **debt service coverage ratio** (net revenue / debt service).

## Quick check
? Which ratio most directly measures a sovereign's fiscal strength?
a) Debt to GDP
b) GDP per capita
c) Foreign exchange reserves to imports
= a
why: Debt and deficits relative to GDP measure fiscal burden; the others measure economic and external strength.

? A sovereign's local-currency debt is usually rated:
a) lower than its foreign-currency debt
b) higher than its foreign-currency debt
c) the same as corporate debt in that country
= b
why: The government can tax and create its own currency to service local-currency debt.

? A municipal bond backed only by water utility fees is analyzed mainly using:
a) the city's total tax base
b) the utility's revenue and debt service coverage
c) the country's GDP
= b
why: Revenue bonds depend on the project's revenue, so coverage from that revenue is key.

? Supranational issuers such as the World Bank are typically rated highly because:
a) they can tax citizens of member countries directly
b) they have strong capital and backing from member governments
c) they only issue short-term debt
= b
why: Shareholder support from member countries and conservative lending underpin their ratings.


# v6m16
take: Corporate credit analysis weighs qualitative factors (business model, industry, competition, management, ESG) and ratios for profitability, coverage and leverage; seniority and collateral decide recovery, so issue ratings get notched above or below the issuer rating.
mins: 30

## Qualitative factors
- **Business model**: how the company makes money and how stable that is.
- **Industry**: cyclicality, growth, competition, regulation, supplier and buyer power.
- **Competitive position**: market share, cost advantages, brand.
- **Management and governance**: strategy, track record, financial policy (appetite for debt, buybacks), alignment with creditors.
- **ESG**: risks that could hurt cash flows or access to capital.

## Ratios
| Family | Common ratios | Better credit when |
|---|---|---|
| Profitability | EBIT margin, EBITDA margin | Higher, more stable |
| Coverage | EBIT / interest, EBITDA / interest | Higher |
| Leverage | Debt / EBITDA, debt / capital, FFO / debt, RCF / debt | Lower debt multiples; higher FFO/debt |

FFO = funds from operations (net income + non-cash items); RCF = retained cash flow (FFO − dividends). Analysts often adjust debt for leases and pension deficits. Compare with peers and the rating agencies' benchmarks, and look at trends.

Example: EBITDA $400m, interest $50m, debt $1,400m. EBITDA/interest = **8.0×**; debt/EBITDA = **3.5×**.

## Seniority and recovery
Order of claims in bankruptcy (highest first):

| Rank | Typical recovery |
|---|---|
| First lien (senior secured) | Highest |
| Second lien | |
| Senior unsecured | |
| Senior subordinated | |
| Subordinated | |
| Junior subordinated | Lowest |

**Secured** debt has a claim on specific collateral; **unsecured** debt shares in the remaining assets. In practice the **absolute priority rule** is often not followed exactly: negotiated settlements give junior creditors something to avoid long fights.

**Structural subordination**: debt of a holding company ranks behind the operating subsidiaries' debt for claims on the subsidiaries' assets.

## Issuer and issue ratings
The **issuer (corporate family) rating** usually applies to senior unsecured debt. **Issue ratings** are **notched** up for secured debt and down for subordinated debt, to reflect expected recovery. Notching is wider for high-yield issuers (default is more likely, so recovery matters more) and narrower for investment grade.

## Quick check
? EBITDA is $300m and debt is $1,200m. Debt/EBITDA is:
a) 0.25×
b) 4.0×
c) 2.5×
= b
why: 1,200 / 300 = 4.0×.

? Which claim ranks highest in bankruptcy?
a) Senior unsecured bonds
b) First lien secured loans
c) Subordinated bonds
= b
why: First lien secured debt has the first claim on the pledged collateral.

? Notching of issue ratings relative to the issuer rating is typically larger for:
a) investment-grade issuers
b) high-yield issuers
c) sovereign issuers
= b
why: When default is more likely, differences in recovery matter more, so agencies notch more.

? Bonds of a holding company with no operating assets are, relative to the operating subsidiaries' debt:
a) structurally subordinated
b) senior secured
c) equal in priority
= a
why: Holding company creditors are paid only from what's left after the subsidiaries' creditors.


# v6m17
take: Securitization pools loans, sells them to a bankruptcy-remote SPE, and issues bonds backed by the pool's cash flows; issuers free up capital and lower funding costs, investors get tailored risk and return, and markets gain liquidity.
mins: 20

## How it works
1. A lender (**originator / seller**) makes loans: mortgages, auto loans, credit card balances.
2. It **sells** a pool of them to a **special purpose entity (SPE)**, also called a special purpose vehicle or trust.
3. The SPE issues **asset-backed securities (ABS)** to investors and pays the seller with the proceeds.
4. A **servicer** (often the originator) collects payments, chases delinquencies and handles defaults and repossessions.
5. A **trustee** represents investors and checks that payments follow the rules.

The sale must be a **true sale** and the SPE **bankruptcy-remote**: if the originator goes bust, its creditors can't claim the pool, so investors rely on the loans' cash flows, not the originator's credit.

## Benefits
| To | Benefit |
|---|---|
| Issuers | Remove assets and risk from the balance sheet (lower leverage), recycle capital into new loans, fund at lower cost (pool can be rated above the originator) |
| Investors | Access to loan cash flows not otherwise available; tranches tailored by risk, return and maturity; credit enhancement; more predictable payments |
| Economy and markets | More credit available, more liquid financial system, risk spread across many investors |

Risks: complexity, misaligned incentives (originate-to-distribute can lower lending standards), and dependence on model assumptions. 2008 showed how poorly underwritten collateral and opaque structures can spread losses.

## Quick check
? The main reason the SPE is made bankruptcy-remote is to:
a) let investors rely on the pool's cash flows rather than the originator's credit
b) avoid paying a servicer
c) let the originator keep the assets on its balance sheet
= a
why: Separating the pool from the originator protects investors if the originator fails.

? The party that collects payments from borrowers and handles delinquencies is the:
a) trustee
b) servicer
c) SPE
= b
why: The servicer manages the loans day to day.

? A benefit of securitization to the originating bank is:
a) higher leverage on its balance sheet
b) recycling capital to make new loans
c) guaranteed returns
= b
why: Selling loans frees capital that can be lent again.

? A "true sale" of assets to the SPE means:
a) the originator keeps legal ownership
b) the assets legally belong to the SPE, out of reach of the originator's creditors
c) the trustee buys the assets
= b
why: A true sale transfers ownership so the pool is protected from the originator's bankruptcy.


# v6m18
take: Covered bonds stay on the bank's balance sheet with recourse to both the bank and a dynamic cover pool; ABS use internal enhancement (subordination, overcollateralization, excess spread, reserves) and external enhancement; credit card ABS revolve, and CLOs tranche leveraged loans.
mins: 25

## Covered bonds vs. ABS
| | Covered bond | ABS |
|---|---|---|
| Issuer | A bank, as senior debt | An SPE |
| Assets | Stay on the bank's balance sheet in a segregated **cover pool** | Sold off to the SPE |
| Recourse | **Dual**: the bank and the cover pool | Only the pool |
| Pool | **Dynamic**: bad loans must be replaced | Usually static (or revolving by rules) |
| Credit risk | Lower; usually lower yield | Depends on tranche |

Covered bonds are common in Europe and are governed by specific laws (hard-bullet, soft-bullet or conditional pass-through maturity structures).

## Credit enhancement
**Internal**
- **Subordination (credit tranching)**: senior, mezzanine and junior (equity) tranches. Losses hit the junior tranche first (the "waterfall").
- **Overcollateralization**: pool value exceeds the bonds issued.
- **Excess spread**: interest from the pool exceeds bond coupons and fees; the excess absorbs losses or builds reserves.
- **Reserve accounts**: cash set aside.

**External**: third-party guarantees, letters of credit, bond insurance. Only as strong as the guarantor.

Example: a $100m pool funds $70m senior, $20m mezzanine and $10m equity tranches. A $12m loss wipes out the equity ($10m) and $2m of the mezzanine; the senior tranche is untouched.

## Non-mortgage ABS
- **Credit card ABS**: the pool **revolves**. During the **lockout (revolving) period**, principal collected buys new receivables and investors get interest only; then principal is paid out. **Early amortization triggers** (rising losses, falling excess spread) start repayment sooner.
- **Auto loan ABS**: amortizing loans; prepayment and default risk.
- **Solar ABS**: backed by loans or leases on residential solar systems; cash flows depend on borrower credit, panel performance and, in some cases, energy prices and tax incentives.

## Collateralized debt obligations
A **CDO** pools debt instruments and issues tranches. A **CLO** (collateralized loan obligation) pools **leveraged (high-yield) loans**, run by a **collateral manager** who can trade the portfolio within rules. **Overcollateralization** and **interest coverage tests** protect senior tranches: if a test fails, cash is diverted from junior tranches to pay down the seniors. Equity investors get the leftover cash and the most risk.

## Quick check
? A key difference between covered bonds and ABS is that covered bonds:
a) are issued by an SPE
b) give investors recourse to both the issuing bank and the cover pool
c) have static pools
= b
why: Dual recourse and dynamic cover pools are what distinguish covered bonds.

? A $200m pool funds a senior tranche of $150m, a mezzanine of $30m and an equity tranche of $20m. A $25m loss reduces the mezzanine tranche by:
a) $0
b) $5m
c) $25m
= b
why: Equity absorbs the first $20m; the remaining $5m hits the mezzanine.

? During a credit card ABS lockout period, investors receive:
a) interest only; principal collections buy new receivables
b) principal only
c) nothing
= a
why: The pool revolves during lockout; principal is reinvested in new receivables.

? Which is a form of internal credit enhancement?
a) A bank letter of credit
b) Excess spread
c) Bond insurance
= b
why: Excess spread comes from the structure itself; the others are third-party (external).


# v6m19
take: Mortgage securities carry prepayment risk: contraction when rates fall and extension when they rise; pass-throughs share it pro rata, CMOs redistribute it across tranches (sequential, PAC and support), and CMBS add call protection and balloon risk.
mins: 30

## Prepayment risk
Borrowers can usually prepay. When rates **fall**, they refinance: principal comes back early, to be reinvested at lower rates (**contraction risk**). When rates **rise**, prepayments slow and the security's life lengthens just when you'd rather reinvest at higher rates (**extension risk**). This makes MBS behave like callable bonds: negative convexity.

## Residential mortgage features
loan-to-value (LTV) :: loan / property value; higher LTV, higher default risk and loss severity
amortization :: fully amortizing, partially (balloon), or interest-only
rate :: fixed, adjustable (ARM), or hybrid
prepayment penalties :: discourage early repayment
recourse :: whether the lender can go after the borrower's other assets (non-recourse loans raise strategic default risk)

**Agency RMBS** are backed by government agencies or GSEs and carry little or no credit risk; loans must meet **conforming** standards. **Non-agency RMBS** carry credit risk and use credit enhancement.

## Pass-throughs
Investors share pro rata in all principal (scheduled and prepaid) and interest, minus servicing and guarantee fees, so the pass-through rate is below the mortgage rate.
weighted average coupon (WAC) :: average mortgage rate in the pool
weighted average maturity (WAM) :: average remaining term
CPR :: conditional prepayment rate, an annual rate
SMM :: single monthly mortality rate = 1 − (1 − CPR)^(1/12)
PSA benchmark :: 100 PSA: CPR rises 0.2% a month to 6% at month 30, then stays at 6%

Example: CPR 6% → SMM = 1 − 0.94^(1/12) = **0.514%** of the remaining balance (after scheduled principal) prepaid each month.

## CMOs
A **collateralized mortgage obligation** carves pass-through cash flows into tranches with different prepayment exposure. It **redistributes** risk; it doesn't remove it.
- **Sequential pay**: tranche A gets all principal until retired, then B, then C. Early tranches face less extension risk; late tranches less contraction risk.
- **PAC (planned amortization class)**: follows a set principal schedule as long as prepayments stay within a band.
- **Support (companion)**: absorbs the prepayment variability so the PAC can stay on schedule. The most risky, highest yield.
- **Floaters and inverse floaters** can be carved from fixed-rate tranches.

## Commercial MBS
Backed by loans on income-producing properties (offices, apartments, malls, hotels). Credit risk is analyzed loan by loan using:
```
Debt service coverage ratio = Net operating income / Debt service
LTV = Loan / Appraised property value
```
~ Net operating income (NOI) :: the property's rental income minus operating costs (before debt payments)
~ Debt service :: the yearly loan payments, interest plus principal
~ LTV :: loan-to-value ratio
~ Appraised property value :: the property's estimated market value
Lower LTV and higher DSCR are better. CMBS loans are usually **non-recourse**.

**Call protection** (limits on prepayment): prepayment lockout, **defeasance** (borrower buys government bonds to replicate the remaining payments), prepayment penalty points, and **yield maintenance** charges. **Balloon risk**: loans often have large balloon payments; if the borrower can't refinance at maturity, the loan extends (a form of extension risk).

## Quick check
? When interest rates fall sharply, an MBS investor faces mainly:
a) extension risk
b) contraction risk
c) no prepayment risk
= b
why: Falling rates trigger refinancing, returning principal early to reinvest at lower rates.

? In a PAC/support structure, the tranche that absorbs prepayment variability is the:
a) PAC tranche
b) support tranche
c) sequential tranche A
= b
why: Support tranches take the prepayment surprises so the PAC can stay on schedule.

? A commercial property's net operating income is $1.2m and annual debt service is $1.0m. The DSCR is:
a) 0.83×
b) 1.20×
c) 2.20×
= b
why: 1.2 / 1.0 = 1.20×.

? Defeasance in a CMBS loan means the borrower:
a) defaults and the lender seizes the property
b) buys government securities that replicate the remaining loan payments
c) extends the loan past its balloon date
= b
why: Defeasance provides call protection: investors keep receiving the scheduled payments.
