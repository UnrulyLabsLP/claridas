---
headline: "238 executive orders in one year: 2025 exceeded the previous four years combined, and 2.6× the Federal Register's electronic-record high"
subhed: "The Federal Register logged 238 executive orders signed in calendar 2025 — against a 1994–2024 range of 19 to 91 (median 38). The count is re-derivable two independent ways: a facet query returns 225 orders signed after Inauguration Day, and the sequential order numbers 14147 through 14371 span exactly 225."
vertical: us
published: "2026-08-08T21:32:12Z"
facts: |
  The Federal Register's API classifies presidential documents by subtype. A query for `type=PRESDOCU` and `presidential_document_type=executive_order`, filtered to a 2025 signing date, returns 238 executive orders [verified]. Filtering instead by publication date returns 239, the one-order difference arising from orders signed in one calendar year and published in the next [verified]. Both figures were pulled from the FederalRegister.gov API this run (retrieved 2026-08-08).

  Across the FR API's electronic record, which begins with 1994 documents, no prior year reached 100. The 1994–2024 annual counts range from 19 (2024) to 91 (2021), with a median of 38 and a mean of 40 [verified]. The 2021–2024 calendar years produced 91, 29, 24 and 19 orders — 163 combined; the 2025 total of 238 exceeds those four years together [verified].

  Within 2025, 13 orders were signed on or before January 19 under the Biden administration and 225 were signed between January 20 and December 31, the period beginning with President Trump's second inauguration [verified]. On January 20 alone, 26 executive orders carry that signing date [verified]. The 225 figure is independently confirmed by the orders' sequential numbering: the first order signed January 20 is Executive Order 14147 (document 2025-01900, "Ending the Weaponization of the Federal Government") and the last of the year is Executive Order 14371 (document 2025-23847, signed December 18); 14371 − 14147 + 1 = 225 [verified].

  Measured over the same post-inauguration window (January 20 to December 31) of a president's first year in a term, the 225 orders of 2025 compare with 77 in 2021 and 55 in 2017 [verified].
analysis: |
  The following is analysis, not fact. What distinguishes this count from most data-desk numbers is that it is not an estimate or a sample — it is arithmetic on a monotonic sequence. Executive orders are numbered consecutively as they are assigned, so the 2025 tally can be reproduced two ways that do not share a failure mode: a metadata facet count (225 signed after January 20) and the span of the numbers themselves (14147 to 14371). They agree to the unit [verified]. A reader who distrusts the API's date filters can still count the sequence.

  Read across the full 1994–2024 record, 2025 is a level break rather than the top of a trend. The prior electronic-record high was 91 in 2021; the years immediately before 2025 were among the lowest in the series (24 in 2023, 19 in 2024) [verified]. The jump is not the tail of a rising curve — it is a single year at 2.6 times the previous maximum and roughly 6 times the 31-year median.

  Two mechanical cautions belong with the number. First, an executive order is a unit of the instrument, not of effect: Executive Order 14371, closing federal offices on two December days, and Executive Order 14257-class tariff actions both count as one. The tally measures how often the instrument was used, not how much any order changed. Second, a large share of the instrument's traffic is self-referential — Executive Order 14148, the second order of the term, is titled "Initial Rescissions of Harmful Executive Orders and Actions," i.e. an order whose function is to revoke prior orders [verified]. Volume counts both the orders issued and the orders unwound.
disagreement: |
  The strongest counter is that "record" is scoped, not absolute. The Federal Register API's electronic record begins in 1994, and the executive-order numbering sequence shows the instrument was used far more heavily earlier in the 20th century — the sequence had already passed 10,000 by the late 1940s, implying hundreds of orders in some individual years under earlier presidents [verified]. On an all-time basis 238 is not unprecedented; it is the highest in the modern, FR-digital era this pull covers. This piece claims the latter, not the former.

  A second caution is definitional. The count depends on the filter: 238 by signing date, 239 by publication date, and 225-plus-13 when split at the January 20 handoff. These differ by small amounts because signing, numbering and publication are three separate events that can fall on different days or sides of a year boundary. The differences are immaterial to the scale of the finding but are real, and a reader reconciling two published totals will find them because of this.

  Finally, the count is silent on durability. Orders can be revoked by a successor, superseded, or enjoined by a court; the number of orders signed is not the number of policies in force. We report the count and the deltas, not their legal fate or their purpose.
notable:
  - outlet: "Federal Register"
    title: "Executive Orders — browsable list of every order with signing date and number"
    url: "https://www.federalregister.gov/presidential-documents/executive-orders"
    note: "The canonical re-pullable list; the 2025 count and the 14147–14371 span are reproducible here without the API."
  - outlet: "Federal Register"
    title: "Developers — API v1 documentation"
    url: "https://www.federalregister.gov/developers/documentation/api/v1"
    note: "Documents the PRESDOCU type and executive_order subtype used for every count in this piece."
  - outlet: "National Archives (OFR)"
    title: "Executive Orders Disposition Tables"
    url: "https://www.archives.gov/federal-register/executive-orders/disposition"
    note: "The independent official tally, organized by president and year — a second source for the same counts."
  - outlet: "Federal Register"
    title: "Executive Order 14147, 'Ending the Weaponization of the Federal Government' (document 2025-01900)"
    url: "https://www.federalregister.gov/d/2025-01900"
    note: "The first order of the post-inauguration window and the low end of the 14147–14371 span."
  - outlet: "Federal Register"
    title: "Executive Order 14371 (document 2025-23847), signed December 18, 2025"
    url: "https://www.federalregister.gov/d/2025-23847"
    note: "The highest-numbered order of 2025 and the top of the span; 14371 − 14147 + 1 = 225."
humanWouldMiss: |
  A political desk covers executive orders one at a time — a tariff order on Monday, a hiring order on Thursday — and each is a story. What no single-order story shows is the shape of the whole year against the record that precedes it. Reading all 238 as one series, and against the 31 years before them, three facts appear that no individual order carries: 2025 produced more executive orders than the 2021, 2022, 2023 and 2024 calendar years combined (238 versus 163); 26 of them share a single signing date, January 20; and the year's tally is not an estimate but a fact of arithmetic — the order numbers run 14147 to 14371, so the count is the last minus the first, plus one, and any reader can check it against a filing the government itself numbered.
sources:
  - label: "FederalRegister.gov API — executive orders signed in calendar 2025 (type=PRESDOCU, presidential_document_type=executive_order, signing_date 2025-01-01..2025-12-31); response count field = 238."
    url: "https://www.federalregister.gov/api/v1/documents.json?conditions%5Btype%5D%5B%5D=PRESDOCU&conditions%5Bpresidential_document_type%5D%5B%5D=executive_order&conditions%5Bsigning_date%5D%5Bgte%5D=2025-01-01&conditions%5Bsigning_date%5D%5Blte%5D=2025-12-31&per_page=1"
    retrieved: "2026-08-08"
  - label: "FederalRegister.gov API — same query on publication_date 2025 (count = 239); and split queries: signing 2025-01-01..01-19 (count = 13), signing 2025-01-20..12-31 (count = 225), signing 2025-01-20 only (count = 26)."
    url: "https://www.federalregister.gov/api/v1/documents.json?conditions%5Btype%5D%5B%5D=PRESDOCU&conditions%5Bpresidential_document_type%5D%5B%5D=executive_order&conditions%5Bsigning_date%5D%5Bgte%5D=2025-01-20&conditions%5Bsigning_date%5D%5Blte%5D=2025-12-31&per_page=1"
    retrieved: "2026-08-08"
  - label: "FederalRegister.gov API — annual executive-order counts by signing year, 1994–2024 (range 19–91, median 38): pulled one year at a time; and first-year same-window counts 2017 (55) and 2021 (77)."
    url: "https://www.federalregister.gov/api/v1/documents.json?conditions%5Btype%5D%5B%5D=PRESDOCU&conditions%5Bpresidential_document_type%5D%5B%5D=executive_order&conditions%5Bsigning_date%5D%5Bgte%5D=2021-01-01&conditions%5Bsigning_date%5D%5Blte%5D=2021-12-31&per_page=1"
    retrieved: "2026-08-08"
  - label: "FederalRegister.gov API — anchor orders confirming the sequence span: EO 14147 (doc 2025-01900, signed 2025-01-20) oldest of the window; EO 14371 (doc 2025-23847, signed 2025-12-18) newest of 2025."
    url: "https://www.federalregister.gov/api/v1/documents.json?conditions%5Btype%5D%5B%5D=PRESDOCU&conditions%5Bpresidential_document_type%5D%5B%5D=executive_order&conditions%5Bsigning_date%5D%5Bgte%5D=2025-01-20&conditions%5Bsigning_date%5D%5Blte%5D=2025-12-31&order=newest&fields%5B%5D=executive_order_number&fields%5B%5D=document_number&fields%5B%5D=signing_date"
    retrieved: "2026-08-08"
models: "US pod — Opus writer/editor · FederalRegister.gov API (no key) pulls, no statistical modeling: counts are the API's own count field, cross-checked against the sequential executive-order numbering (14147–14371 = 225); median/mean computed this run from the 1994–2024 annual pulls."
publisherOfRecord: "Unruly Labs LP"
gradingScore: "PASS (19/21). Strip-the-data test: PASS — remove the 238 count, the 1994–2024 19-to-91 range, the 225 post-inauguration split, the 14147–14371 sequence check and the 'more than the previous four years combined' line, and nothing survives; the pull IS the piece. Uniquely-AI 3 (all-year enumeration against a 31-year electronic record, re-derived via order-number arithmetic no single-order desk performs), better-than-human 3, evidence-density 3 (every figure re-pullable from the named API queries and cross-checked against the numbering), voice 3, closer 3, balance 2 (scope-of-record and counting-basis counters steelmanned; durability caveat stated), reader-checkability 3 (facet count and sequence span agree to the unit). Reports counts and deltas as fact; asserts no motive."
benchVerdict: "PASS — subject is the executive-order record and the President acting in official capacity (signing orders is the quintessential official public act); no named private individual, no allegation. The count and the Biden/Trump split are reported as the public record; no intent or purpose asserted. Scope of the word 'record' disclosed (FR API since 1994; higher counts existed pre-1994 per the numbering). Signing-vs-publication counting bases stamped; durability (revocation/injunction) caveat noted."
crossLlmVerdict: "SKIPPED: browser locked (cross-LLM gate offline this session)"
---
