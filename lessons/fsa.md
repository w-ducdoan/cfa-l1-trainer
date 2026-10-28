---
type: lesson-set
workstation: Finance Technicals HQ
topic: fsa
last_updated: 2026-10-27
---

# v4m1
take: Analysis follows six steps from purpose to follow-up; the statements alone aren't enough, so read the notes, MD&A, the audit report and outside sources, and know which audit opinion means what.
mins: 20

## The framework
| Step | Output |
|---|---|
| 1. Articulate the purpose and context | The question, the audience, the time and budget |
| 2. Collect data | Financial statements, notes, industry and economic data, management interviews |
| 3. Process data | Adjusted statements, common-size statements, ratios, forecasts |
| 4. Analyze and interpret | What the numbers mean for the question |
| 5. Develop and communicate conclusions | A report or recommendation |
| 6. Follow up | Periodic updates; change the call if facts change |

The role of analysis is to form **expectations about future performance, financial position and risk** for investment and credit decisions. Ratios tell you what happened; the analyst's job is to explain why.

## Where the information comes from
- **The statements:** balance sheet, income statement (and comprehensive income), cash flow statement, statement of changes in equity.
- **Notes**: accounting policies, estimates, segment data, contingencies. Often where the real story is.
- **Management commentary / MD&A**: results, trends, known uncertainties, critical accounting estimates. Not audited.
- **Regulatory filings** (US SEC): 10-K annual report, 10-Q quarterly, 8-K material events, proxy statement (DEF 14A) for governance and pay, Forms 20-F and 40-F for foreign issuers, Forms 3, 4 and 5 for insider holdings.
- **Other sources**: earnings calls, investor presentations, industry and economic data, news, and alternative data.

Regulators with legal authority (SEC, national authorities, ESMA in Europe) require filings. **IOSCO** sets cooperative principles but doesn't regulate directly.

## The audit report
An independent auditor gives an opinion on whether the statements are **fairly presented** under the applicable standards. It gives **reasonable assurance**, not a guarantee.

| Opinion | Meaning |
|---|---|
| Unqualified (unmodified) | Fairly presented; the clean opinion |
| Qualified | Fairly presented except for a specific issue |
| Adverse | Not fairly presented; material departures |
| Disclaimer | The auditor couldn't form an opinion |

Reports also describe **key audit matters** (IFRS) or **critical audit matters** (US): areas of significant judgment. US public companies also get an opinion on **internal control** over financial reporting. A "going concern" paragraph signals doubt the company can continue.

## Reporting systems
IFRS (set by the IASB) and US GAAP (set by the FASB) have converged in many areas but still differ. Comparing companies across systems may require adjustments. Watch for new standards and new kinds of transactions, which change reported numbers without changing the economics.

## Traps
! MD&A is management's view and is not audited.
! A qualified opinion is "except for", not a failure. Adverse is the failure.
! Ratios answer "what"; the analysis must answer "why".

## Quick check
? An auditor concludes the statements are fairly presented except for the treatment of one lease. The opinion is:
a) unqualified
b) qualified
c) adverse
= b
why: A qualified opinion is clean except for a specific, identified issue.

? Which document is most likely to show executive compensation and board matters for a US company?
a) Form 10-Q
b) Proxy statement
c) Form 8-K
= b
why: The proxy statement (DEF 14A) covers governance, board elections and executive pay.

? In the analysis framework, calculating ratios and building common-size statements belongs to which step?
a) Collect data
b) Process data
c) Analyze and interpret
= b
why: Processing turns raw data into adjusted statements, ratios and forecasts; interpretation comes next.

? Which statement about management commentary is correct?
a) It is audited along with the financial statements.
b) It discusses trends and known uncertainties and is not audited.
c) It replaces the notes for smaller companies.
= b
why: MD&A gives management's view of results and risks; it is not covered by the audit opinion.


# v4m2
take: Revenue follows the five-step model, expenses are matched to revenue or to the period, capitalizing raises early profit and operating cash flow, non-recurring items sit apart, and diluted EPS adds back the effect of every dilutive security.
mins: 35

## Revenue: the five steps
1. Identify the **contract** with a customer.
2. Identify the separate **performance obligations**.
3. Determine the **transaction price**.
4. **Allocate** the price to the obligations.
5. Recognize revenue **when (or as) each obligation is satisfied**.

Revenue can be recognized at a point in time (control passes) or over time (long-term contracts, measured by progress). An **agent** that only arranges a sale reports **net** revenue (its commission); a **principal** reports gross.

## Expenses, and capitalize vs. expense
Expenses are **matched** to the revenue they produce (cost of goods sold), recorded in the period incurred (administration), or spread over the period of benefit (depreciation).

| Effect of capitalizing a cost instead of expensing it | Early years | Later years |
|---|---|---|
| Net income | Higher | Lower (depreciation) |
| Total assets and equity | Higher | Higher, shrinking |
| Cash from operations | Higher (outflow goes to investing) | Same |
| Cash from investing | Lower | Same |
| Profitability ratios such as ROA | Mixed: profit up, assets up | Lower |

Rules to know:
- **Interest during construction** of an asset for own use is capitalized into the asset's cost.
- **Research** is expensed (IFRS and US GAAP). **Development** can be capitalized under IFRS once feasibility criteria are met; US GAAP expenses it, except software after technological feasibility.
- Depreciation: straight-line, accelerated (double-declining balance), or units of production. Estimates (useful life, salvage, bad debts, warranties) move earnings too.

## Non-recurring items
| Item | Where it goes |
|---|---|
| Unusual or infrequent items (restructuring, gains on sale) | In continuing operations, pretax |
| Discontinued operations | Separate line, net of tax, after continuing operations |
| Change in accounting **policy** | Retrospective: restate prior periods |
| Change in accounting **estimate** | Prospective: future periods only |
| Correction of an **error** | Restate prior periods |

Neither IFRS nor US GAAP allows "extraordinary items" anymore.

## Earnings per share
```
Basic EPS = (Net income − Preferred dividends) / Weighted average common shares
```
Diluted EPS adds every **dilutive** security:
- **Convertible preferred** (if-converted): add back its preferred dividends; add the shares it converts into.
- **Convertible debt** (if-converted): add back after-tax interest, interest × (1 − t); add the shares.
- **Options and warrants** (treasury stock method): new shares = N × (Average price − Exercise price) / Average price. Only if in the money.

A security is **antidilutive** if including it raises EPS; leave it out.

## Worked example
Net income $10m. Preferred dividends $1m, all on convertible preferred that converts into 500,000 common. Weighted average shares 4,000,000. Options on 200,000 shares, exercise price $30, average price $40.

| Step | Calculation | Result |
|---|---|---|
| Basic EPS | (10 − 1) / 4.0m | $2.25 |
| Options (TSM) | 200,000 × (40 − 30)/40 | 50,000 new shares |
| Diluted EPS | 10 / (4.0 + 0.5 + 0.05)m | $2.20 |

Check the preferred alone: 10 / 4.5 = $2.22, below $2.25, so it is dilutive and belongs in.

## Common-size income statement and margins
Divide each line by **revenue**. Gross margin = gross profit / revenue; operating margin = operating income / revenue; net margin = net income / revenue. Trends show where costs are creeping.

## Traps
! For convertible debt, add back interest **after tax**, not the full coupon.
! Options add shares only when the average price is above the exercise price.
! A policy change restates the past; an estimate change doesn't.

## Quick check
? A company capitalizes a cost that its rival expenses. In the first year, the capitalizing company reports:
a) higher net income and higher cash from operations
b) lower net income and higher cash from operations
c) higher net income and the same cash from operations
= a
why: Capitalizing defers the expense (higher net income) and moves the outflow from operating to investing activities (higher CFO).

? Options on 100,000 shares have an exercise price of $20; the average share price is $25. Under the treasury stock method, diluted shares increase by:
a) 20,000
b) 80,000
c) 100,000
= a
why: 100,000 × (25 − 20)/25 = 20,000 incremental shares.

? Convertible bonds pay $1m of interest; the tax rate is 25%. For diluted EPS, the numerator increases by:
a) $1.00m
b) $0.75m
c) $0.25m
= b
why: Add back after-tax interest: 1 × (1 − 0.25) = $0.75m.

? A change in the estimated useful life of equipment is applied:
a) retrospectively, restating prior years
b) prospectively, to current and future periods
c) only when the auditor agrees to restate
= b
why: Changes in estimates are prospective; changes in policy and error corrections are retrospective.


# v4m3
take: Finite-life intangibles are amortized and indefinite ones (and goodwill) are tested for impairment instead; financial assets sit at amortized cost or fair value, with fair value changes going to profit or to OCI; and common-size balance sheets and liquidity and solvency ratios read the structure.
mins: 30

## Intangible assets and goodwill
intangible asset :: identifiable, non-monetary, no physical substance: patents, licenses, trademarks, customer lists
finite life :: amortize over useful life; review method and life at least annually; test for impairment when there are signs
indefinite life :: no amortization; test for impairment at least annually
goodwill :: purchase price minus the fair value of the net identifiable assets acquired

Goodwill arises only in **acquisitions**; internally generated goodwill is never recorded. It is not amortized and is tested for impairment at least annually. Internally developed intangibles follow the research (expense) vs. development (capitalize under IFRS if criteria are met) split.

```
Goodwill = Purchase price − Fair value of identifiable assets + Fair value of liabilities assumed
```
Example: pay $500m for a company whose identifiable assets are worth $450m at fair value and whose liabilities are $120m. Net identifiable assets = $330m, so goodwill = $170m.

## Financial instruments
| IFRS category | US GAAP rough match | Measured at | Unrealized gains and losses go to |
|---|---|---|---|
| Amortized cost (held to collect contractual cash flows) | Held-to-maturity debt | Amortized cost | Not recognized |
| Fair value through OCI | Available-for-sale debt | Fair value | Other comprehensive income (equity) |
| Fair value through profit or loss | Trading; most equity securities | Fair value | Income statement, then retained earnings |

Derivatives are generally at fair value through profit or loss unless hedge accounting applies.

## Non-current liabilities
Long-term debt (loans, bonds) is usually carried at **amortized cost**: the present value of remaining payments at the original market rate. Other non-current liabilities include leases, pension obligations and **deferred tax liabilities**.

## Common-size balance sheet and ratios
Divide each line by **total assets**. Compare across years and against peers.

| Ratio | Formula | Reads |
|---|---|---|
| Current | Current assets / current liabilities | Short-term liquidity |
| Quick | (Cash + marketable securities + receivables) / current liabilities | Liquidity without inventory |
| Cash | (Cash + marketable securities) / current liabilities | The strictest liquidity test |
| Debt-to-assets | Total debt / total assets | Share of assets funded by debt |
| Debt-to-capital | Total debt / (total debt + equity) | Capital structure |
| Debt-to-equity | Total debt / total equity | Leverage |
| Financial leverage | Average total assets / average total equity | Equity multiplier (DuPont) |

## Traps
! Trading-security gains hit net income; available-for-sale (FVOCI) gains bypass it into OCI.
! An impairment write-down shrinks assets and equity, which **raises** debt-to-equity and asset turnover.
! Goodwill is never amortized under IFRS or US GAAP for public companies; it's impaired.

## Quick check
? A patent with a 10-year legal life is best described as:
a) a finite-life intangible, amortized over its useful life
b) an indefinite-life intangible, tested annually and not amortized
c) part of goodwill
= a
why: Patents have finite lives and are amortized; they are separately identifiable, so they're not goodwill.

? A buyer pays $800m for a target with identifiable assets at fair value of $900m and liabilities of $250m. Goodwill is:
a) $100m
b) $150m
c) $550m
= b
why: Net identifiable assets = 900 − 250 = $650m. Goodwill = 800 − 650 = $150m.

? Unrealized gains on debt securities measured at fair value through OCI are reported:
a) in net income
b) in other comprehensive income within equity
c) only when the securities are sold, with nothing recorded before
= b
why: FVOCI changes go to OCI, bypassing the income statement until sale.

? The most stringent liquidity ratio is the:
a) current ratio
b) quick ratio
c) cash ratio
= c
why: The cash ratio counts only cash and marketable securities against current liabilities.


# v4m4
take: The cash flow statement links the other two statements; the indirect method starts from net income and reverses non-cash items and working-capital changes, investing and financing are always shown direct, and IFRS gives more choice where interest and dividends go.
mins: 30

## How the statements connect
Net income flows to retained earnings; the change in cash on the balance sheet equals the net cash flow. Working-capital accounts link revenue and expenses to cash:
- Cash collected from customers = Revenue − increase in accounts receivable (+ decrease).
- Cash paid to suppliers = COGS + increase in inventory − increase in accounts payable.

## Operating cash flow: two methods
**Direct**: list cash receipts and payments by type (from customers, to suppliers, to employees, for interest and taxes). More informative; IFRS and US GAAP encourage it.

**Indirect**: start from net income and adjust. Almost everyone uses it.
```
CFO = Net income
    + Non-cash charges (depreciation, amortization, impairments)
    − Gains on sale / + Losses on sale (those cash flows belong in investing)
    − Increase in operating current assets (receivables, inventory, prepaid)
    + Increase in operating current liabilities (payables, accrued, unearned revenue)
```
Rule of thumb: an **asset going up uses cash**; a **liability going up provides cash**.

## Worked example (indirect)
Net income $500. Depreciation $120. Gain on sale of equipment $30. Receivables up $60, inventory down $20, payables up $45.

| Item | Amount |
|---|---|
| Net income | 500 |
| + Depreciation | 120 |
| − Gain on sale | (30) |
| − Increase in receivables | (60) |
| + Decrease in inventory | 20 |
| + Increase in payables | 45 |
| **Cash from operations** | **595** |

## Investing and financing
**Investing**: buying and selling long-term assets and investments. Cash from selling equipment = carrying amount + gain (or − loss).
```
Cash from sale = Historical cost − Accumulated depreciation + Gain on sale
```
**Financing**: issuing and repaying debt and stock, and paying dividends.
```
Dividends paid = Beginning retained earnings + Net income − Ending retained earnings
```
(with no other changes to retained earnings).

## Converting indirect to direct
1. Aggregate revenue and expenses from the income statement.
2. Remove non-cash items (depreciation) and gains or losses.
3. Convert each accrual to cash using the change in its related working-capital account.

## IFRS vs. US GAAP classification
| Item | US GAAP | IFRS |
|---|---|---|
| Interest paid | Operating | Operating or financing |
| Interest received | Operating | Operating or investing |
| Dividends paid | Financing | Operating or financing |
| Dividends received | Operating | Operating or investing |
| Income taxes | Operating | Operating, unless tied to investing or financing |
| Bank overdrafts | Financing | Can be part of cash |

## Traps
! Add back losses, subtract gains: their cash is in investing.
! Depreciation isn't a source of cash; it's added back because it was never a cash outflow.
! Under US GAAP, dividends **paid** are financing but dividends **received** and all interest are operating.

## Quick check
? Net income is $200, depreciation $50, receivables rose $30 and payables rose $10. CFO is:
a) $210
b) $230
c) $290
= b
why: 200 + 50 − 30 + 10 = $230.

? Equipment with a cost of $100 and accumulated depreciation of $70 is sold at a $15 gain. Cash received is:
a) $15
b) $45
c) $85
= b
why: Carrying amount 100 − 70 = $30, plus a $15 gain, so the cash received is $45.

? Under US GAAP, interest paid on debt is classified as:
a) operating
b) financing
c) either, at the company's choice
= a
why: US GAAP puts interest paid in operating activities; IFRS allows operating or financing.

? Beginning retained earnings $1,000, net income $300, ending retained earnings $1,180. With no other changes, dividends paid were:
a) $120
b) $180
c) $300
= a
why: 1,000 + 300 − 1,180 = $120.


# v4m5
take: Read cash flows by source and use, then measure free cash flow: FCFF is cash for all capital providers, FCFE is cash for shareholders after debt flows; coverage ratios test whether operating cash can pay the bills.
mins: 25

## Reading the statement
1. **Sources and uses**: is the company funding itself from operations, or from borrowing, issuing shares or selling assets? Mature, healthy companies fund investment from operations.
2. **Operating cash flow drivers**: compare CFO to net income. A gap from rising receivables or inventory deserves questions.
3. **Investing**: is capex above depreciation (growing) or below (shrinking)?
4. **Financing**: debt raised or repaid, buybacks, dividends.

**Common-size** cash flow statements show each item as a percentage of revenue, or of total inflows and outflows, to compare years and peers.

## Free cash flow
```
FCFF = CFO + Interest paid × (1 − t) − Fixed capital investment
FCFE = CFO − Fixed capital investment + Net borrowing
```
(Using US GAAP classification, where interest paid sits in CFO. If interest is already outside CFO, don't add it back.)

**FCFF** is cash available to all capital providers (debt and equity); **FCFE** is what's left for shareholders after debt is serviced and new borrowing comes in.

## Worked example
CFO $900. Interest paid $100, tax rate 25%. Capex $400. New borrowing $150, repayments $50.

| Measure | Calculation | Result |
|---|---|---|
| FCFF | 900 + 100 × 0.75 − 400 | $575 |
| FCFE | 900 − 400 + (150 − 50) | $600 |

## Cash flow ratios
| Ratio | Formula |
|---|---|
| Cash flow to revenue | CFO / net revenue |
| Cash return on assets | CFO / average total assets |
| Cash return on equity | CFO / average shareholders' equity |
| Cash to income | CFO / operating income |
| Cash flow per share | (CFO − preferred dividends) / weighted average shares |
| Debt coverage | CFO / total debt |
| Interest coverage | (CFO + interest paid + taxes paid) / interest paid |
| Reinvestment | CFO / cash paid for long-term assets |
| Debt payment | CFO / cash paid for long-term debt repayment |
| Dividend payment | CFO / dividends paid |
| Investing and financing | CFO / cash outflows for investing and financing |

## Traps
! In FCFF, add back **after-tax** interest.
! FCFE adds **net** borrowing: new debt minus repayments.
! The cash interest coverage ratio adds back both interest and taxes paid to CFO.

## Quick check
? CFO is $500, capex $200, net borrowing $50. FCFE is:
a) $250
b) $350
c) $750
= b
why: 500 − 200 + 50 = $350.

? CFO $500, interest paid $40, tax rate 30%, capex $200. FCFF is:
a) $300
b) $328
c) $340
= b
why: 500 + 40 × 0.7 − 200 = $328.

? A company's operations generate less cash than it spends on investment, and it funds the gap with new debt each year. This most likely indicates:
a) a mature, self-funding company
b) dependence on outside financing that may not be sustainable
c) high-quality earnings
= b
why: Persistently funding investment with borrowing rather than operating cash is a warning sign.

? The reinvestment ratio is CFO divided by:
a) cash paid for long-term assets
b) total debt
c) dividends paid
= a
why: It measures how much of the spending on long-term assets operations can cover.


# v4m6
take: Inventory is carried at the lower of cost and net realizable value (IFRS lets write-downs reverse, US GAAP doesn't); in inflation FIFO shows higher profit and inventory while LIFO shows higher COGS and lower taxes.
mins: 30

## Measurement
**IFRS**: lower of cost and **net realizable value** (NRV = expected selling price − costs to complete and sell). Write-downs can be **reversed**, up to the original cost.

**US GAAP**:
- FIFO and weighted average cost: lower of cost and NRV.
- LIFO and the retail method: lower of cost or **market**, where market = replacement cost, capped at NRV and floored at NRV − normal profit margin.
- Write-downs can **never be reversed**.

LIFO is allowed only under US GAAP. A write-down raises COGS (lower profit), lowers inventory and equity, and so raises inventory turnover and debt-to-equity.

## Inflation and the cost-flow method
| When prices are rising | FIFO | LIFO |
|---|---|---|
| COGS | Lower (old, cheap costs) | Higher (newest costs) |
| Gross profit and net income | Higher | Lower |
| Ending inventory | Higher, close to current cost | Lower, stale costs |
| Taxes | Higher | Lower |
| Cash flow (after tax) | Lower | Higher |
| Inventory turnover | Lower | Higher |
| Current ratio | Higher | Lower |

Deflation reverses every row. Weighted average lands in between.

**LIFO reserve** = FIFO inventory − LIFO inventory. To restate a LIFO company to FIFO: add the reserve to inventory; subtract the **change** in the reserve from COGS.

## Worked example
A shop buys 100 units at $10, then 100 at $12, and sells 150.
- FIFO COGS = 100 × 10 + 50 × 12 = $1,600; ending inventory = 50 × 12 = $600.
- LIFO COGS = 100 × 12 + 50 × 10 = $1,700; ending inventory = 50 × 10 = $500.
- Weighted average cost = $11: COGS $1,650, inventory $550.

## Ratios and disclosures
```
Inventory turnover = COGS / Average inventory
Days of inventory on hand = 365 / Inventory turnover
Gross profit margin = Gross profit / Revenue
```
Notes show the method used, write-downs and reversals, and the split into raw materials, work in progress and finished goods. Rising **finished goods** with flat sales can signal weakening demand; rising **raw materials and WIP** can signal expected growth. Check MD&A and industry data too.

## Traps
! US GAAP: no reversals of inventory write-downs. IFRS: reversals allowed, never above cost.
! LIFO gives a better income statement (current costs in COGS); FIFO gives a better balance sheet (current costs in inventory).
! Inventory turnover that is too high can mean shortages, not just efficiency.

## Quick check
? In a period of rising prices, compared with LIFO, a company using FIFO reports:
a) lower gross margin
b) higher inventory turnover
c) higher ending inventory and higher net income
= c
why: FIFO leaves the newer, higher costs in inventory and puts older, cheaper costs into COGS.

? Under IFRS, a company wrote inventory down last year and prices have since recovered. It:
a) may reverse the write-down, up to original cost
b) may reverse it above original cost
c) cannot reverse it
= a
why: IFRS allows reversals limited to the amount originally written down.

? A US company using LIFO has a LIFO reserve that rose from $40m to $55m. To restate COGS to FIFO, the analyst:
a) adds $15m
b) subtracts $15m
c) subtracts $55m
= b
why: FIFO COGS = LIFO COGS − increase in the LIFO reserve.

? COGS is $730m and average inventory is $146m. Days of inventory on hand are closest to:
a) 5
b) 73
c) 146
= b
why: Turnover = 730/146 = 5; days = 365/5 = 73.


# v4m7
take: Purchased intangibles go on at cost, internally developed ones are mostly expensed, acquired ones go on at fair value; impairment tests differ (IFRS: recoverable amount, reversals allowed; US GAAP: undiscounted cash flow test, then fair value, no reversals).
mins: 30

## Getting intangibles onto the balance sheet
| How acquired | Treatment |
|---|---|
| Purchased on its own | At cost |
| Developed internally | Research expensed; development capitalized under IFRS if criteria are met; US GAAP expenses (except software after feasibility) |
| In a business combination | Each identifiable intangible at fair value; the residual is goodwill |

## Impairment of property, plant and equipment
**IFRS**: impaired if carrying amount > **recoverable amount**, which is the higher of fair value less costs to sell and **value in use** (PV of future cash flows). Loss = carrying amount − recoverable amount. **Reversals allowed** (except goodwill), up to what the carrying amount would have been.

**US GAAP**, two steps:
1. **Recoverability**: impaired if carrying amount > **undiscounted** future cash flows.
2. **Loss** = carrying amount − **fair value**.
No reversals for assets held for use.

## Worked example
Carrying amount $500. Undiscounted future cash flows $520. Fair value $440. Value in use $460. Costs to sell $10.
- **US GAAP**: 500 < 520, so the asset passes the recoverability test: **no impairment**.
- **IFRS**: recoverable = max(440 − 10, 460) = $460. Loss = 500 − 460 = **$40**.

## Other cases
- **Finite-life intangibles**: same approach as PPE.
- **Indefinite-life intangibles**: tested at least annually (IFRS: carrying vs. recoverable; US GAAP: carrying vs. fair value).
- **Held for sale**: stop depreciating; write down to fair value less costs to sell; reversals allowed under both, up to the earlier carrying amount.

## Derecognition
Sale: gain or loss = proceeds − carrying amount. Abandonment: loss = carrying amount. A long-lived asset exchanged for another is usually recorded at fair value.

## Effects of an impairment
Lower assets and equity; a one-time loss (lower net income now, lower depreciation and higher net income later); **no effect on cash flow** at the time; higher future ROA and asset turnover.

## Reading PP&E disclosures
```
Average age ≈ Accumulated depreciation / Annual depreciation expense
Average total useful life ≈ Gross PP&E / Annual depreciation expense
Average remaining life ≈ Net PP&E / Annual depreciation expense
```
An old asset base relative to peers suggests a capital spending wave ahead. Capex well above depreciation suggests growth.

## Traps
! US GAAP's first test uses **undiscounted** cash flows, so an asset can be impaired under IFRS but not US GAAP.
! Impairments don't affect cash at the time.
! Only IFRS allows reversals for assets held for use, and never for goodwill.

## Quick check
? Under US GAAP, an asset's carrying amount is $300 and its undiscounted future cash flows are $320. The impairment loss is:
a) $0
b) $20
c) the difference between carrying amount and fair value
= a
why: It passes the recoverability test because the undiscounted cash flows exceed the carrying amount.

? Under IFRS, carrying amount $200, fair value less costs to sell $150, value in use $170. The impairment loss is:
a) $30
b) $50
c) $0
= a
why: Recoverable amount = max(150, 170) = 170; loss = 200 − 170 = $30.

? Gross PP&E $1,200, accumulated depreciation $480, annual depreciation $120. The average age of the assets is about:
a) 4 years
b) 6 years
c) 10 years
= a
why: 480 / 120 = 4 years. Total life is 1,200/120 = 10 years, so about 6 years remain.

? In the year an impairment is recorded, cash from operations is:
a) lower by the amount of the loss
b) unaffected
c) higher, because of the tax saving recorded that year
= b
why: An impairment is a non-cash charge.


# v4m8
take: Lessees put a right-of-use asset and a lease liability on the balance sheet (IFRS: one finance-type model; US GAAP: finance or operating with a single straight-line expense); defined benefit plans show net funded status; stock options are expensed at grant-date fair value over the service period.
mins: 35

## Leases: the lessee
At the start, the lessee records a **right-of-use (ROU) asset** and a **lease liability** equal to the present value of lease payments. Exemptions: leases of 12 months or less, and (IFRS) low-value assets.

| | IFRS (all leases) and US GAAP finance lease | US GAAP operating lease |
|---|---|---|
| Income statement | Depreciation of ROU asset + interest on liability (front-loaded) | One straight-line lease expense |
| Cash flow | Principal: financing. Interest: operating (US GAAP) or operating/financing (IFRS) | Whole payment in operating |
| Effect on EBITDA | Higher (lease cost below EBITDA) | Lower (the expense is operating) |

A lease is a **finance lease** if any of these hold: ownership transfers; a purchase option is reasonably certain to be used; the term covers most of the asset's life; PV of payments is substantially all of its fair value; the asset is so specialized only the lessee can use it.

## Leases: the lessor
Same under IFRS and US GAAP:
- **Finance lease**: remove the asset, record a lease receivable (net investment), earn interest income; may book selling profit at the start.
- **Operating lease**: keep and depreciate the asset, record lease revenue.

## Pensions
| | Defined contribution | Defined benefit |
|---|---|---|
| What's fixed | The employer's contribution | The benefit paid to retirees |
| Who bears investment and longevity risk | Employee | Employer |
| Expense | The contribution | Change in net pension liability (see below) |
| Balance sheet | Nothing beyond unpaid contributions | Funded status |

```
Funded status = Fair value of plan assets − Present value of the defined benefit obligation
```
Negative = underfunded, shown as a liability.

Defined benefit periodic cost:
- **IFRS**: service cost and **net interest** (discount rate × net liability) in profit or loss; **remeasurements** (actuarial gains and losses, return on assets above the discount rate) in OCI, never recycled.
- **US GAAP**: service cost, interest cost and **expected return on plan assets** in profit or loss; actuarial gains/losses and past service cost go to OCI and are amortized into profit over time.

## Share-based pay
- **Stock grants**: expense = fair value of the shares at grant date, spread over the service period.
- **Stock options**: expense = **grant-date fair value** from an option-pricing model, spread over the **vesting period**. The assumptions (volatility, expected life, dividend yield, risk-free rate) move the expense: higher volatility, longer expected life and a higher risk-free rate raise the value; a higher dividend yield lowers it.
- **Stock appreciation rights** and **phantom shares** are settled in cash: a liability remeasured to fair value each period.

## Traps
! US GAAP operating leases are on the balance sheet now; only the income statement and cash flow treatment differ.
! A finance lease raises EBITDA and CFO versus an operating lease, because part of the cost is interest and principal.
! Under IFRS, remeasurements stay in OCI forever.

## Quick check
? Under US GAAP, for an operating lease the lessee reports:
a) depreciation and interest expense
b) a single straight-line lease expense, with the full payment in operating cash flow
c) no asset or liability
= b
why: Operating leases are on the balance sheet, but the income statement shows one straight-line expense and the cash flow statement puts the whole payment in operating.

? Compared with an operating lease under US GAAP, a finance lease gives the lessee:
a) higher EBITDA and higher CFO
b) lower EBITDA and lower CFO
c) the same EBITDA and CFO
= a
why: Finance lease costs are depreciation and interest (below EBITDA), and principal repayments are financing cash flows.

? Plan assets $900m, defined benefit obligation $1,050m. The balance sheet shows:
a) a net pension asset of $150m
b) a net pension liability of $150m
c) a liability of $1,050m and an asset of $900m, reported separately
= b
why: Funded status = 900 − 1,050 = −$150m, reported net as a liability.

? Stock option expense is measured using the option's fair value at:
a) the grant date
b) the vesting date
c) each balance sheet date
= a
why: Equity-settled options are valued at grant date and expensed over the vesting period.


# v4m9
take: Income tax expense = taxes payable + the change in deferred taxes; temporary differences create deferred tax assets and liabilities, permanent differences only move the effective rate; and the rate reconciliation shows why.
mins: 30

## Four numbers to keep apart
accounting profit :: pretax income under accounting standards
taxable income :: income under tax law; the basis for taxes payable
income taxes payable :: tax owed to the government for the period (a liability until paid)
income tax expense :: tax on the income statement = taxes payable + ΔDTL − ΔDTA

## Temporary vs. permanent differences
**Temporary** differences reverse over time and create deferred taxes:
- **Deferred tax liability (DTL)**: carrying amount of an asset > its tax base (or a liability's carrying amount < tax base). Classic case: **accelerated depreciation for tax**, straight-line for books. You pay less tax now, more later.
- **Deferred tax asset (DTA)**: tax base of an asset > carrying amount, or a liability expensed for books before it's deductible: **warranty provisions**, bad-debt allowances, tax loss carryforwards. You pay more now, less later.

**Permanent** differences never reverse: tax-exempt interest, non-deductible fines. No deferred taxes; they push the effective rate away from the statutory rate.

## Worked example
Equipment cost $300, 3-year life. Book depreciation straight-line $100 a year. Tax depreciation $150, $100, $50. Tax rate 25%.

| End of year | Carrying amount | Tax base | Difference | DTL at 25% |
|---|---|---|---|---|
| 1 | 200 | 150 | 50 | 12.50 |
| 2 | 100 | 50 | 50 | 12.50 |
| 3 | 0 | 0 | 0 | 0 |

In year 1 tax expense exceeds taxes payable by $12.50; in year 3 the DTL reverses.

## Realizing DTAs
A DTA is only worth something if there will be enough future taxable income. **US GAAP** records the full DTA and a **valuation allowance** against the part that's more likely than not to go unused. **IFRS** recognizes a DTA only to the extent it's probable to be used. Rising valuation allowances signal management expects weaker profits; watch for allowances released just to hit earnings.

## Tax rates
```
Effective tax rate = Income tax expense / Pretax income
Cash tax rate = Cash taxes paid / Pretax income
```
The **statutory** rate is the legal rate. The notes reconcile statutory to effective: foreign rates, permanent differences, credits, valuation allowance changes. A persistently low effective rate from one-off items isn't a good forecast base.

## Analysis
A DTL that isn't expected to reverse (a growing company keeps replacing assets) behaves like **equity**; one expected to reverse is a real **liability**. Analysts may reclassify accordingly when computing leverage.

## Traps
! Permanent differences never create deferred taxes.
! Accelerated tax depreciation creates a DTL, not a DTA.
! A tax rate change remeasures all existing DTAs and DTLs at the new rate.

## Quick check
? A company uses accelerated depreciation for tax and straight-line for its books. This creates a:
a) deferred tax asset
b) deferred tax liability
c) permanent difference
= b
why: The asset's carrying amount exceeds its tax base, so taxes are deferred: a DTL.

? Warranty expense is recognized now for books but is deductible only when claims are paid. This creates a:
a) deferred tax asset
b) deferred tax liability
c) permanent difference
= a
why: Tax is paid earlier than the books record the expense, creating a DTA.

? Taxes payable are $80, the DTL rose by $15 and the DTA rose by $5. Income tax expense is:
a) $70
b) $90
c) $100
= b
why: 80 + 15 − 5 = $90.

? A non-deductible regulatory fine most directly affects:
a) the deferred tax liability
b) the effective tax rate
c) taxes payable in a future year
= b
why: A permanent difference raises the effective rate above the statutory rate and never creates deferred taxes.


# v4m10
take: Reporting quality (are the numbers faithful?) is separate from earnings quality (are the results sustainable?); the spectrum runs from high quality to fraud, and the warning signs sit in revenue, receivables, inventory, capitalization and the gap between cash flow and net income.
mins: 35

## Two kinds of quality
reporting quality :: whether the reports give a faithful, decision-useful picture of what happened
results (earnings) quality :: whether the earnings and cash flow are sustainable and adequate

You can have high-quality reporting of low-quality results (an honest report of a bad year), but low-quality reporting makes it impossible to judge results.

## The quality spectrum
1. GAAP, decision-useful, **sustainable** earnings (highest)
2. GAAP, decision-useful, but **not sustainable**
3. **Biased** accounting choices within GAAP (aggressive or conservative)
4. Within GAAP but **earnings management**: real actions timed to hit targets
5. **Departures from GAAP**: non-compliant accounting
6. **Fictitious** transactions: fraud (lowest)

## Conservative vs. aggressive
Aggressive choices raise current revenue, earnings, operating cash flow or assets, or lower expenses and debt. Conservative choices do the opposite. Both are biased: conservative choices today often create earnings later ("cookie jar" reserves released when needed).

## Why it happens and what stops it
**Motivations**: meet analyst expectations, boost the share price, raise bonuses, avoid **debt covenant** breaches, career concerns.

**Conditions** (the fraud triangle): **opportunity** (weak controls, complex transactions), **motivation or pressure**, and **rationalization**.

**Discipline**: market regulators (filing requirements, review, enforcement), **auditors** (reasonable assurance only), private contracts (lenders, investors with covenants), and the cost of capital: poor reporting raises it.

## Presentation choices
**Non-GAAP measures** (adjusted EBITDA, "core" earnings) must be reconciled to the closest GAAP figure under US rules; IFRS calls them alternative performance measures. Watch for "recurring" non-recurring charges and adjustments that remove normal costs.

## Choices and estimates that move numbers
- **Revenue**: bill-and-hold, channel stuffing, recognizing too early, gross vs. net.
- **Receivables**: allowance for doubtful accounts set too low.
- **Inventory**: cost-flow method, slow write-downs.
- **Capitalization**: capitalizing costs that should be expensed; long depreciation lives; high salvage values.
- **Reserves**: warranty, restructuring, valuation allowances.
- **Cash flow**: stretching payables, selling receivables, classifying operating outflows as investing, capitalizing interest.

## Warning signs
- Receivables growing faster than revenue (DSO rising).
- Inventory growing faster than sales; falling inventory turnover.
- **CFO persistently below net income**; accruals ratio rising.
- Large fourth-quarter revenue or one-time gains each year.
- Frequent "non-recurring" charges.
- Depreciation lives longer than peers.
- Related-party transactions, auditor changes, heavy executive equity pay tied to short-term targets.

## Traps
! Conservative accounting is still biased; it can set up future earnings boosts.
! An unqualified audit opinion doesn't rule out earnings management.
! Rising revenue with flat or falling CFO is a classic red flag.

## Quick check
? A company records revenue on goods customers have ordered but asked it to hold in its warehouse, before control has passed. This is most likely:
a) conservative accounting
b) aggressive or improper revenue recognition
c) high-quality reporting of low-quality results
= b
why: Bill-and-hold arrangements can pull revenue forward before control transfers.

? Which is the clearest warning sign of earnings manipulation?
a) Operating cash flow consistently above net income
b) Receivables growing much faster than revenue
c) An effective tax rate close to the statutory rate
= b
why: Receivables outpacing revenue can indicate aggressive recognition or weak collections.

? Lengthening the estimated useful lives of equipment, all else equal:
a) lowers depreciation and raises reported earnings
b) raises depreciation and lowers reported earnings
c) has no effect on earnings
= a
why: Longer lives spread cost over more years, cutting annual depreciation.

? In the fraud triangle, weak internal controls are an example of:
a) motivation
b) opportunity
c) rationalization
= b
why: Weak controls create the opportunity to misreport.


# v4m11
take: Ratios compare across time and peers; know the activity, liquidity, solvency and profitability families, the cash conversion cycle, and DuPont, which splits ROE into margin, turnover and leverage (and in five steps, tax and interest burden).
mins: 40

## Using ratios well
Compare a company with itself over time (**trend**) and with peers at the same time (**cross-sectional**). Ratios show what happened; they don't explain why. Limits: different accounting choices, diversified companies, one-off items, and judgment about what's "good".

## Activity
| Ratio | Formula |
|---|---|
| Inventory turnover | COGS / average inventory |
| Days of inventory on hand (DOH) | 365 / inventory turnover |
| Receivables turnover | Revenue / average receivables |
| Days sales outstanding (DSO) | 365 / receivables turnover |
| Payables turnover | Purchases / average payables |
| Days payables outstanding | 365 / payables turnover |
| Working capital turnover | Revenue / average working capital |
| Fixed asset turnover | Revenue / average net fixed assets |
| Total asset turnover | Revenue / average total assets |

## Liquidity
Current, quick and cash ratios (see the balance sheet lesson), plus:
```
Defensive interval = (Cash + Marketable securities + Receivables) / Daily cash expenditures
Cash conversion cycle = DOH + DSO − Days payables
```
A shorter cash conversion cycle means less cash tied up in working capital.

## Solvency
Debt-to-assets, debt-to-capital, debt-to-equity, financial leverage (average assets / average equity), and coverage:
```
Interest coverage = EBIT / Interest payments
Fixed charge coverage = (EBIT + Lease payments) / (Interest payments + Lease payments)
```

## Profitability
Gross, operating, pretax and net margin (each over revenue), and returns:
```
ROA = Net income / Average total assets
Operating ROA = Operating income / Average total assets
ROE = Net income / Average shareholders' equity
Return on total capital = EBIT / (Debt + Equity)
```

## DuPont
```
ROE = (Net income / Revenue) × (Revenue / Assets) × (Assets / Equity)
    = Net profit margin × Asset turnover × Financial leverage
```
Five-way:
```
ROE = (NI / EBT) × (EBT / EBIT) × (EBIT / Revenue) × (Revenue / Assets) × (Assets / Equity)
    = Tax burden × Interest burden × EBIT margin × Asset turnover × Leverage
```
A **higher** tax burden ratio means a **lower** tax rate; a higher interest burden ratio means **less** interest.

## Worked example
Revenue $1,000; EBIT $150; interest $30; tax rate 25%; average assets $1,200; average equity $500.
EBT = 120; NI = 90.

| Component | Value |
|---|---|
| Tax burden (90/120) | 0.75 |
| Interest burden (120/150) | 0.80 |
| EBIT margin (150/1,000) | 0.15 |
| Asset turnover (1,000/1,200) | 0.833 |
| Leverage (1,200/500) | 2.40 |
| ROE | 0.75 × 0.80 × 0.15 × 0.833 × 2.40 = 18% |

Check: 90 / 500 = 18%.

## Industry-specific and forecasting
Banks use capital adequacy and net interest margin; retailers use same-store sales and sales per square foot; airlines use load factor. Forecasts start from ratios (margins, turnover) applied to a sales forecast, tested with **sensitivity analysis**, **scenarios** and **simulation**.

## Traps
! Rising ROE from more leverage isn't the same as rising ROE from better margins.
! Use averages for balance sheet items in turnover and return ratios.
! The cash conversion cycle subtracts payables days.

## Quick check
? DOH is 50 days, DSO 40 days and days payables 35. The cash conversion cycle is:
a) 55 days
b) 125 days
c) 25 days
= a
why: 50 + 40 − 35 = 55 days.

? Net profit margin 5%, asset turnover 1.6, financial leverage 2.5. ROE is:
a) 8%
b) 20%
c) 12.5%
= b
why: 0.05 × 1.6 × 2.5 = 0.20.

? Holding everything else constant, a fall in the tax burden ratio (NI / EBT) means:
a) the effective tax rate rose and ROE fell
b) the effective tax rate fell and ROE rose
c) interest expense rose
= a
why: NI/EBT = 1 − tax rate, so a lower ratio means a higher tax rate and lower ROE.

? Revenue $900, average receivables $75. DSO is closest to:
a) 12 days
b) 30 days
c) 83 days
= b
why: Turnover = 900/75 = 12; DSO = 365/12 ≈ 30 days.


# v4m12
take: Build the model from a sales forecast and link costs, working capital and capex to it; watch for analyst biases; use Porter's five forces to judge pricing power; adjust for inflation; and pick a forecast horizon that ends when the company reaches a steady state.
mins: 30

## Building a sales-based model
1. **Revenue**: by segment, from growth vs. GDP, market share, price × volume, or capacity.
2. **COGS and gross margin**: from history, adjusted for input costs, mix and competition.
3. **SG&A**: split fixed and variable parts.
4. **Non-operating items**: interest from debt levels and rates; tax from the effective rate (watch one-offs).
5. **Shares**: buybacks, issuance, dilution.
6. **Balance sheet**: working capital from days (DSO, DOH, days payables) applied to forecast sales and COGS; PP&E from capex and depreciation.
7. **Cash flow statement** ties it together; the balance sheet must balance.

```
Forecast receivables = Forecast revenue × DSO / 365
Forecast inventory = Forecast COGS × DOH / 365
```

## Analyst biases and fixes
| Bias | What happens | Remedy |
|---|---|---|
| Overconfidence | Ranges too narrow | Record forecasts, check hit rates, use scenarios |
| Illusion of control | Thinking more data or contact with management gives control | Focus on what matters; seek contrary views |
| Conservatism | Slow to update on new information | Update formally (Bayesian thinking) |
| Representativeness | Judging by resemblance to a familiar story; ignoring base rates | Start from base rates |
| Confirmation | Seeking only evidence that agrees | Look actively for disconfirming evidence; peer review |

## Competition: Porter's five forces
**Threat of substitutes, rivalry, supplier power, buyer power, threat of new entrants.** Strong forces squeeze margins: buyers push prices down, suppliers push costs up. A company with weak forces against it can raise prices and hold margins, which shows up as high, persistent **ROIC**:
```
ROIC = Net operating profit after tax / (Operating assets − Operating liabilities)
```

## Inflation and deflation
Revenue: forecast price and volume separately; a company with pricing power passes inflation through, one without it may lose volume if it raises prices. Costs: map each cost line to its own inflation driver (raw materials, wages). Hedging, contracts and pricing lags change the timing.

## Forecast horizon
Choose a horizon that covers the investment's holding period, the business cycle, and the time until the company reaches a **steady state**. Past that, use a terminal value. Use **normalized** revenue and margins (mid-cycle) rather than peak or trough years.

## Traps
! Working capital is forecast from sales and COGS, not as a flat number.
! A high ROIC that isn't persistent usually reflects the cycle, not an advantage.
! Ending the forecast at a cyclical peak inflates the terminal value.

## Quick check
? Forecast revenue is $730m and DSO is 40 days. Forecast receivables are:
a) $40m
b) $80m
c) $18m
= b
why: 730 × 40 / 365 = $80m.

? An analyst keeps the old earnings estimate despite a clear guidance cut. This is most likely:
a) conservatism bias
b) confirmation bias
c) illusion of control
= a
why: Conservatism is under-reacting to new information.

? Which of Porter's forces most directly limits a company's ability to raise prices to customers?
a) Bargaining power of suppliers
b) Bargaining power of buyers
c) Threat of new entrants only in the long run
= b
why: Powerful buyers push prices down.

? Ending a forecast horizon at a cyclical peak most likely:
a) understates the terminal value
b) overstates the terminal value
c) has no effect if the discount rate is right
= b
why: Peak margins and revenue carried into the terminal value overstate long-run cash flows.
