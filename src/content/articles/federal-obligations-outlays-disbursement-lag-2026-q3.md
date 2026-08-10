---
headline: "Through nine months of fiscal 2026, federal agencies reported obligating $8.23 trillion and outlaying $7.89 trillion — and two agencies hold 91% of the $331 billion gap between the two"
subhed: "Across the 30 top-tier agencies that obligated more than $1 billion in USAspending's account-level record, the ratio of outlays to obligations runs from 52.9% at Homeland Security to 224.9% at the National Science Foundation. The three agencies that are 64% of all obligations — Health and Human Services, Treasury, and Social Security — outlay 99.1% of what they obligate. The $331.5 billion of money committed but not yet paid is almost entirely Homeland Security ($161.8B) and Defense ($139.8B)."
vertical: us
published: "2026-08-09T20:04:11Z"
updated: 2026-08-09
facts: |
  USAspending.gov's top-tier-agencies reference lists, for each of 111 agencies, the budget authority, obligations, and outlays recorded in its account-level (File A / GTAS) submissions for the current fiscal year. The figures below were pulled this run from that endpoint (retrieved 2026-08-09) and cover fiscal 2026 through the third quarter — the period ending June 30, 2026 (`active_fy` 2026, `active_fq` 3) [verified].

  Summed across the 111 agencies, obligations total $8.226 trillion and outlays total $7.894 trillion, leaving a net $331.5 billion obligated but not yet outlaid [verified]. Ninety-six of the 111 agencies recorded any obligation; 30 obligated more than $1 billion [verified]. Among those 30, the ratio of outlays to obligations spans from 52.9% at the Department of Homeland Security to 224.9% at the National Science Foundation, and 14 of the 30 outlaid more than they obligated this year [verified].

  The three largest obligators — Health and Human Services ($2,220.8B), Treasury ($1,697.2B), and Social Security ($1,359.6B) — are 64.2% of all obligations and together outlaid 99.1% of what they obligated [verified]. The net gap concentrates elsewhere: Homeland Security obligated $343.4 billion and outlaid $181.7 billion, a $161.8 billion difference (47.1% of its obligations unpaid) [verified]; Defense obligated $1,285.0 billion and outlaid $1,145.2 billion, a $139.8 billion difference [verified]. Those two agencies are $301.6 billion — 91.0% — of the $331.5 billion net gap [verified]. The Homeland Security figures are independently confirmed by USAspending's agency-level budgetary-resources endpoint, which reports the department's fiscal-2026 obligations at $343.4 billion and outlays at $181.7 billion against $641.7 billion of budgetary resources [verified].

  At the other end, some agencies outlaid more than they obligated this year, paying down commitments made in prior years: Education outlaid $119.0 billion against $86.9 billion obligated (136.9%), State $30.4B against $25.7B, and the National Science Foundation $6.3B against $2.8B [verified].
analysis: |
  The following is analysis, not fact. An obligation is a legal commitment to pay — a signed contract, an awarded grant, a benefit determination. An outlay is cash actually leaving the Treasury. The two are different events separated by time, and the length of that separation is not uniform across the government: it is a property of what each agency does with money.

  Where the money is a transfer payment, the two events nearly coincide. A Social Security benefit, a Medicare reimbursement, an interest payment on the debt — each is obligated and paid in the same window, because the commitment *is* the payment. That is why the three agencies handling most of the government's transfer and interest spending — HHS, Treasury, SSA, 64.2% of all obligations — show an outlay-to-obligation ratio of 99.1%. There is essentially no lag to observe, because there is essentially no gap between promising and paying.

  Where the money buys or builds something, the two events are years apart. A border-technology contract, a Coast Guard cutter, a disaster-recovery grant, a defense procurement — these are obligated in full when the deal is signed and outlaid in tranches as work is delivered, sometimes over half a decade. That is the mechanical reason Homeland Security shows 52.9% and Defense 89.1%, and why the two of them, which obligate for contracts and construction, hold 91.0% of the entire net gap. The gap is not a backlog in the sense of money stuck; it is the ordinary shape of multi-year spending caught nine months into a fiscal year.

  The mirror image is the agency outlaying more than it obligates. Education's 136.9% and the National Science Foundation's 224.9% do not mean those agencies overspent; they mean this year's outlays are draining commitments made in earlier years faster than new commitments are being written in 2026 — the tail of prior obligations paying out. Read together, the two tails describe the same fact from opposite ends: an agency's outlay-to-obligation ratio in a single year is a fingerprint of how far its spending lags its promises, and the spread from 53% to 225% is the spread of federal missions, not of federal thrift.
disagreement: |
  The strongest counter is that none of this is an anomaly to be explained — it is exactly how federal budgeting is designed to work. Multi-year and no-year appropriations exist precisely so that money can be obligated in one year and outlaid across several; a snapshot taken nine months into a fiscal year will *always* show obligations running ahead of outlays for contract-heavy agencies, and the $331.5 billion "gap" is the normal in-progress state of that machinery, not a finding. On that reading the piece measures a calendar artifact. The response: the piece reports the spread and its concentration as facts and attributes the lag to spending structure, not to any failure — the point is that the structure is invisible in the topline, not that the structure is wrong.

  A second, sharper caution concerns the numbers themselves. These are USAspending's account-level (File A) budgetary figures, which are *gross*: they include intragovernmental payments and trust-fund flows that the Monthly Treasury Statement nets out. That is why the $7.894 trillion outlay sum over nine months is larger than the roughly $7 trillion in net federal outlays the Treasury reports for a full year. These figures should be read as within-USAspending account totals, re-pullable at the cited endpoint — not as the Treasury's net cash-out-the-door number. The cross-agency ratios and the concentration of the gap are valid inside this dataset regardless, because every agency is measured on the same basis.

  Finally, extreme ratios like the National Science Foundation's 224.9% partly reflect the timing of this year's appropriations — low current-year obligations against continued outlays on prior grants — and should not be read as a stable characteristic of the agency.
viewFrom: |
  From the vantage of the appropriations calendar rather than the spending headline, the gap is a clock, not a ledger. The same $8.23 trillion of "spending" contains money that left the Treasury this month and money that will not leave for five years, and the two are indistinguishable in any single topline. An agency that terms out its commitments into contracts and construction — Homeland Security, Defense, the Corps of Engineers at 80.9% — carries those decisions forward as outlays for years after the obligation is booked; an agency that cuts checks clears its promises inside the quarter. Which kind of agency a dollar passes through determines when it is actually spent, independent of how much was appropriated.
notable:
  - outlet: "USAspending.gov"
    title: "Top-Tier Agencies reference — obligations, outlays, budget authority (FY2026)"
    url: "https://api.usaspending.gov/api/v2/references/toptier_agencies/"
    note: "The single endpoint every government-wide figure in this piece is pulled and summed from; each agency's obligated_amount and outlay_amount are re-pullable here without a key."
  - outlet: "USAspending.gov"
    title: "Agency budgetary resources — Department of Homeland Security (toptier 070)"
    url: "https://api.usaspending.gov/api/v2/agency/070/budgetary_resources/?fiscal_year=2026"
    note: "Independent confirmation of the DHS $343.4B obligated / $181.7B outlaid figures that drive the headline gap."
  - outlet: "U.S. Treasury Fiscal Data"
    title: "Monthly Treasury Statement (MTS) — receipts and outlays"
    url: "https://fiscaldata.treasury.gov/datasets/monthly-treasury-statement/"
    note: "The Treasury's net outlay series; the reason USAspending's gross account-level outlay total is larger, and the number to reconcile against for cash-basis spending."
  - outlet: "U.S. Government Accountability Office"
    title: "A Glossary of Terms Used in the Federal Budget Process (GAO-05-734SP)"
    url: "https://www.gao.gov/products/gao-05-734sp"
    note: "Defines obligation vs. outlay and the multi-year appropriation mechanics that produce the lag this piece measures."
  - outlet: "Congressional Budget Office"
    title: "How CBO Produces Its Baseline Budget Projections — spending, outlays, and spendout rates"
    url: "https://www.cbo.gov/about/products/baseline-projections-tools"
    note: "Explains 'spendout rates' — the share of budget authority that becomes outlays each year — the concept underlying agency-by-agency lag differences."
humanWouldMiss: |
  A desk covers the appropriations fight, which is about budget authority, and the Monthly Treasury Statement, which is about net outlays. Neither reconciles the two agency by agency, because doing so means reading all 111 top-tier accounts at once. When you do, the $331.5 billion the government has committed but not yet paid nine months into fiscal 2026 turns out to be 91% just two agencies — Homeland Security and Defense — the two that buy and build rather than transfer. The three agencies that are 64% of the entire budget show almost no gap at all, because a Social Security check or a debt-interest payment is obligated and paid in the same breath. The lesson the enumeration forces is that "the government spent X" is an answer to two different questions with two different numbers, and the two diverge most precisely at the agencies where a dollar spent is a promise rather than a payment. No single agency's release, and no topline, shows this; only the ratio, read across every account together, does.
sources:
  - label: "USAspending.gov top-tier agencies (FY2026, active_fq 3, period ending 2026-06-30), summed across 111 agencies: obligations $8.226T, outlays $7.894T, net gap $331.5B; 96 agencies with any obligation, 30 with obligations > $1B; outlay/obligation ratio range 52.9% (DHS) to 224.9% (NSF), 14 of 30 above 100%."
    url: "https://api.usaspending.gov/api/v2/references/toptier_agencies/"
    retrieved: "2026-08-09"
  - label: "Same pull, agency detail: HHS obl $2,220.8B / out $2,183.9B; Treasury $1,697.2B / $1,695.7B; SSA $1,359.6B / $1,350.7B (top-3 = 64.2% of obligations, 99.1% outlaid); DOD $1,285.0B / $1,145.2B (gap $139.8B); DHS $343.4B / $181.7B (gap $161.8B); ED $86.9B / $119.0B; DHS+DOD gap = $301.6B = 91.0% of net gap."
    url: "https://api.usaspending.gov/api/v2/references/toptier_agencies/"
    retrieved: "2026-08-09"
  - label: "USAspending.gov agency budgetary resources, DHS (toptier 070), FY2026: budgetary resources $641.7B, agency_total_obligated $343.4B, agency_total_outlayed $181.7B — independent confirmation of the toptier-agencies DHS figures. Gov-wide total budgetary resources $16,047.1B."
    url: "https://api.usaspending.gov/api/v2/agency/070/budgetary_resources/?fiscal_year=2026"
    retrieved: "2026-08-09"
models: "US pod — Opus writer/editor · USAspending.gov API (no key) pulls, no statistical modeling: obligations and outlays are the dataset's own account-level (File A/GTAS) fields; the $8.226T/$7.894T sums, the $331.5B net gap, the 64.2%/99.1% top-3 figures, the DHS+DOD 91.0% concentration and all outlay/obligation ratios were computed this run from the 111 pulled agency rows. Figures are gross budgetary-account totals, not Monthly-Treasury-Statement net outlays."
publisherOfRecord: "Unruly Labs LP"
gradingScore: "PASS (19/21). Strip-the-data test: PASS — remove the $8.226T/$7.894T totals, the $331.5B gap, DHS 52.9% / DOD 89.1%, the 64.2%/99.1% top-3, the 53%-to-225% ratio spread and the DHS+DOD 91.0% concentration and nothing survives; the cross-agency pull IS the piece. Uniquely-AI 3 (obligation-vs-outlay reconciliation across all 111 top-tier accounts, an enumeration no appropriations or MTS desk performs), better-than-human 3, evidence-density 3 (every figure re-pullable from the named endpoints), voice 3, closer 3, balance 2 (calendar-artifact, gross-vs-net File A, and appropriations-timing counters steelmanned), reader-checkability 3. Reports levels, ratios and deltas as fact; asserts no motive or intent — the lag is explained as a structural property of transfer vs. contract spending."
benchVerdict: "PASS — subjects are federal agencies in their official capacity and the USAspending account-level record; no named private individual, no allegation. Obligations and outlays are reported as the agencies' own published File A figures; the outlay-to-obligation lag is explained as a mechanical property of multi-year contract vs. transfer spending, with no intent, mismanagement, or policy motive asserted. Gross-vs-net (File A vs. Monthly Treasury Statement) scope disclosed; data vintage stated as FY2026 through Q3 (period ending 2026-06-30)."
crossLlmVerdict: "SKIPPED: browser locked (cross-LLM gate offline this session)"
---
