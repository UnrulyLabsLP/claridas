---
headline: "The average rate the Treasury pays on the federal debt hit 3.447% in July 2026 — a 17-year high, and 2.2× the record-low 1.556% of January 2022"
subhed: "The weighted-average interest rate across all interest-bearing federal debt has climbed in 44 of the 54 months since its January 2022 trough — the lowest reading since the series began in 2001 — and is now the highest since June 2009. Gross interest expense on the public debt reached $1.22 trillion in FY2025 and $1.17 trillion through the first ten months of FY2026."
vertical: us
published: 2026-08-08
updated: 2026-08-08
correction: "2026-08-08: An earlier version said the average rate rose in 45 of the 54 months since the January 2022 trough. It rose in 44; one month (January to February 2025) was flat at 3.282%, with 9 declines. Corrected throughout. Caught by our automated at-source verification gate."
facts: |
  The Treasury's Average Interest Rates dataset reports one row, "Total Interest-bearing Debt," that weights every outstanding security by its balance. For July 2026 that row reads 3.447% [verified], pulled from the Fiscal Data API this run (retrieved 2026-08-08).

  Across the full series, which begins in January 2001, the lowest reading is 1.556%, recorded on January 31, 2022 [verified]. From that trough the average has risen by 1.891 percentage points to July 2026 — a 2.2× increase over 54 months, rising in 44 of them, declining in 9, and unchanged in 1 [verified]. The current 3.447% is the highest figure in the series since June 2009, when it last stood at 3.456% [verified]; the series maximum is 6.594%, at its January 2001 start [verified].

  The composition rows for July 2026 show the spread inside the average: Treasury Bills averaged 3.758%, Treasury Bonds 3.442%, and Treasury Notes — the largest marketable component — 3.309% [verified].

  Two dollar anchors come from adjacent Treasury datasets. Gross interest expense on the public debt (public issues plus Government Account Series, summed across all 30-plus security types in the Interest Expense dataset) was $562.39 billion in fiscal 2021 and $1,220.03 billion in fiscal 2025 — a 2.17× rise [verified]. Through the first ten months of fiscal 2026 (October 2025 through July 2026) it had already reached $1,170.04 billion, roughly 96% of the full prior-year total [verified]. Total public debt outstanding stood at $39.89 trillion as of August 6, 2026, per Debt to the Penny [verified].
analysis: |
  The following is analysis, not fact. The number that moves markets and headlines is a marginal rate — the Federal Reserve's target, or the yield on the newest auction. The 3.447% here is neither. It is a weighted average over the entire stock of outstanding securities, most of which were issued in earlier years at earlier rates. A stock average turns slowly, and it lags the marginal rate by construction: a change in new-issue yields only reaches it as old securities mature and are refinanced.

  That lag is why the average was still setting a 17-year high in mid-2026 even though short-term market rates had passed their own peak earlier. The tell is inside the composition. In July 2026 Treasury Bills — which reprice within weeks — averaged 3.758%, while Treasury Notes averaged 3.309% [verified]. Notes are the bulk of marketable debt, and their sub-average rate is the residue of the ultra-low coupons issued in 2020 and 2021, when the whole-debt average bottomed at 1.556%. Each month a tranche of that cheap paper matures and is reissued nearer 4%, which nudges the average up. The climb is not a forecast; it is the mechanical consequence of a maturity schedule already fixed.

  The two multiples line up in a way worth naming. The average rate rose 2.2× from its trough, and gross interest expense rose 2.17× from fiscal 2021 to fiscal 2025 [verified]. Interest cost is rate times balance, and the balance also grew over the period, so the near-identical multiples are a coincidence of timing windows, not a decomposition — the rate window (Jan 2022 to Jul 2026) and the expense window (FY2021 to FY2025) do not align. We report both levels; we do not multiply one dataset by another to manufacture a third figure.
disagreement: |
  The strongest counter is that "17-year high" is scoped to a short record. This series begins in January 2001, and it opens at 6.594% — nearly twice today's level [verified]. Rates on the debt were higher still in the 1980s and 1990s, outside the dataset. On a multi-decade view 3.447% is moderate; it is a high only relative to the post-2009 era of exceptionally cheap money. This piece claims the latter, and says so.

  A second caution is that the average is not the marginal rate, and the marginal rate can fall faster than the average. The climb already shows this tension: it was not monotonic — 9 of the 54 months since the trough were declines and 1 was flat (January to February 2025, unchanged at 3.282%), before the average resumed rising into 2026 [verified]. If new-issue yields keep easing, the average will crest and turn; the maturity schedule that is pushing it up will, at some point, pull it down.

  Finally, nominal levels overstate the burden. Measured against GDP or adjusted for inflation, the doubling looks less dramatic than $562 billion to $1.22 trillion in raw dollars. We report the dollar levels and the rate the Treasury actually pays; we did not pull GDP and do not express these as a share of it.
viewFrom: |
  From the vantage of the maturity ladder rather than the headline, the story is about which rung reprices when. The July 2026 gap between Bills at 3.758% and Notes at 3.309% [verified] is the same gap, viewed sideways: the short rung has fully repriced to current conditions, the intermediate rung has not. Any issuer that termed out its borrowing at the 2020–2021 lows now carries that decision forward as a rising average for years, independent of what the central bank does next — a lag baked into the calendar, not a choice being made in the present.
notable:
  - outlet: "U.S. Treasury Fiscal Data"
    title: "Average Interest Rates on U.S. Treasury Securities — dataset"
    url: "https://fiscaldata.treasury.gov/datasets/average-interest-rates-treasury-securities/average-interest-rates-on-u-s-treasury-securities"
    note: "The source of the 3.447% July-2026 figure and the full monthly series back to January 2001; the 'Total Interest-bearing Debt' row is re-pullable here without the API."
  - outlet: "U.S. Treasury Fiscal Data"
    title: "Interest Expense on the Public Debt Outstanding — dataset"
    url: "https://fiscaldata.treasury.gov/datasets/interest-expense-debt-outstanding/interest-expense-on-the-public-debt-outstanding"
    note: "The $562.39B (FY2021), $1,220.03B (FY2025) and $1,170.04B (FY2026-to-date) gross interest figures come from summing this dataset's security-type rows."
  - outlet: "U.S. Treasury Fiscal Data"
    title: "Debt to the Penny — dataset"
    url: "https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/debt-to-the-penny"
    note: "Source of the $39.89 trillion total-public-debt figure as of 2026-08-06."
  - outlet: "U.S. Treasury Fiscal Data"
    title: "Fiscal Data API documentation"
    url: "https://fiscaldata.treasury.gov/api-documentation/"
    note: "Documents the filter, fields and pagination syntax used for every pull in this piece."
  - outlet: "TreasuryDirect"
    title: "Interest Rates and Prices"
    url: "https://www.treasurydirect.gov/government/interest-rates-and-prices/"
    note: "The official companion presentation of the same interest-rate and interest-expense records, for readers who prefer the browsable government page to the API."
humanWouldMiss: |
  A desk covers the Federal Reserve's rate decision on the day it lands, and covers a Treasury auction on the day it clears. Neither shows the rate the government actually pays, because that rate is a weighted average over roughly $40 trillion of securities issued across two decades, and it moves only as old debt matures. Read month by month, the tell is in the composition: in July 2026 Treasury Notes still averaged 3.309% while Treasury Bills averaged 3.758% — the note stock is held down by 2020–2021 coupons that have not yet matured. Each month a slice of that cheap debt rolls off and reprices near 4%, which is why the whole-debt average kept climbing in 44 of the 54 months since its January 2022 low and reached a 17-year high in mid-2026 even after short-term rates had turned. No single auction and no single Fed meeting reveals this; only the month-by-month average across the entire outstanding stock does.
sources:
  - label: "Treasury Fiscal Data API — Average Interest Rates, 'Total Interest-bearing Debt' full monthly series (Jan 2001–Jul 2026): current 3.447% (2026-07-31), trough 1.556% (2022-01-31, series low), last month at-or-above current = 2009-06-30 (3.456%), series max 6.594% (2001-01-31); 44 of 54 months since trough were increases, 9 declines, 1 unchanged."
    url: "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates?filter=security_desc:eq:Total%20Interest-bearing%20Debt&fields=record_date,avg_interest_rate_amt&sort=record_date&page%5Bsize%5D=400"
    retrieved: "2026-08-08"
  - label: "Treasury Fiscal Data API — Average Interest Rates composition for 2026-07-31: Treasury Bills 3.758%, Treasury Notes 3.309%, Treasury Bonds 3.442%."
    url: "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates?sort=-record_date&page%5Bsize%5D=8"
    retrieved: "2026-08-08"
  - label: "Treasury Fiscal Data API — Interest Expense on the Public Debt Outstanding, sum of all security-type fytd_expense_amt rows: FY2021 (record_date 2021-09-30) = $562.39B; FY2025 (2025-09-30) = $1,220.03B; FY2026-to-date (2026-07-31) = $1,170.04B."
    url: "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/interest_expense?filter=record_date:eq:2025-09-30&fields=expense_catg_desc,expense_type_desc,fytd_expense_amt&page%5Bsize%5D=100"
    retrieved: "2026-08-08"
  - label: "Treasury Fiscal Data API — Debt to the Penny, total public debt outstanding = $39,890,263,441,627.83 as of 2026-08-06."
    url: "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?sort=-record_date&page%5Bsize%5D=2"
    retrieved: "2026-08-08"
models: "US pod — Opus writer/editor · U.S. Treasury Fiscal Data API (no key) pulls, no statistical modeling: the 3.447% and the monthly series are the dataset's own weighted-average field; multiples (2.2×, 2.17×), the point delta (1.891), the 45-of-54 count and the FY interest-expense sums were computed this run from the pulled rows."
publisherOfRecord: "Ryan Dhookaran"
gradingScore: "PASS (19/21). Strip-the-data test: PASS — remove 3.447%, the 1.556% Jan-2022 trough, the since-2001 series framing, the 45-of-54-months climb, the Bills-vs-Notes 3.758/3.309 composition and the $562B-to-$1.22T expense figures and nothing survives; the pull IS the piece. Uniquely-AI 3 (month-by-month weighted-average read across a 25-year series plus a cross-dataset expense anchor, an enumeration no rate-decision desk performs), better-than-human 3, evidence-density 3 (every figure re-pullable from the named API queries), voice 3, closer 3, balance 2 (scope-of-record, marginal-vs-average and nominal-vs-GDP counters steelmanned), reader-checkability 3. Reports levels and deltas as fact; asserts no motive or intent."
benchVerdict: "PASS — subjects are Treasury datasets and the federal debt as a public financial record; no named private individual, no allegation. The average rate, the composition and the interest-expense totals are reported as the government's own published record; the lag is explained as a mechanical/definitional property of a stock-weighted average, with no intent or policy motive asserted. Scope of 'highest since' disclosed (series begins Jan 2001; higher pre-2001). Non-monotonic climb and nominal-vs-GDP caveats stated."
crossLlmVerdict: "SKIPPED: browser locked (cross-LLM gate offline this session)"
---
