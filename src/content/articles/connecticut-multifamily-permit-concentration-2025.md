---
headline: "Connecticut authorized 4,837 units in 5-plus-unit buildings in 2025 — 5 towns hold 60% of them and 134 of 172 jurisdictions authorized none"
subhed: "We pulled the Census Building Permits Survey 2025 annual place file for every Connecticut permit-issuing jurisdiction and tallied each housing-type column. The state authorized 7,273 new residential units; 4,837 sat in buildings of 5 or more units, and Stamford alone accounted for 1,524 of them — 31.5%. Of 172 jurisdictions, 134 authorized zero large-multifamily units, 115 of them while reporting a full 12 months."
vertical: local
published: "2026-08-08T22:33:41Z"
places:
  - { state: "CT", lat: 41.6032, lng: -72.7554, statewide: true }
facts: |
  The Census Building Permits Survey (BPS) publishes, with no key or login, an annual place-level file recording every residential building permit authorized by each permit-issuing jurisdiction, split by structure size: 1-unit, 2-unit, 3-4 unit, and 5-or-more-unit buildings. Pulled this run (retrieved 2026-08-08) from the 2025 annual Northeast file, filtered to Connecticut (state FIPS 09), the record is as follows.

  The survey lists 172 Connecticut jurisdictions [verified]. In calendar-year 2025, 166 authorized at least one residential unit and 6 authorized none [verified]. Statewide, jurisdictions authorized 7,273 new units [verified]: 2,080 in single-family (1-unit) structures, 208 in 2-unit, 148 in 3-4 unit, and 4,837 in buildings of 5 or more units [verified]. Large multifamily (5+) was 66.5% of all authorized units; single-family was 28.6%; the "missing middle" of 2-to-4-unit structures was 356 units, or 4.9% [verified].

  The 4,837 large-multifamily units are concentrated. Stamford authorized 1,524 of them — 31.5% of the state total [verified]. The top 5 jurisdictions (Stamford; New Haven, 564; Wilton, 301; Fairfield, 283; Newington, 225) authorized 2,897, or 59.9%; the top 10 authorized 3,766, or 77.9% [verified]. Only 38 of 172 jurisdictions authorized any 5+ unit building at all [verified]. 134 authorized none — and 115 of those 134 reported a full 12 months, so the zero is a filed record, not a reporting gap [verified]. 111 jurisdictions authorized single-family homes and no other type; 74 authorized between 1 and 9 total units for the entire year, and the median jurisdiction authorized 10 [verified].
analysis: |
  The following is analysis, not fact. Building permits are authorizations, not completions — a permit is a jurisdiction's decision to allow a unit, which is exactly the variable a zoning-and-approvals story turns on. What the 2025 file records is not where Connecticut builds, but where Connecticut *lets* building happen, and the answer is: in very few places.

  The distribution is the finding. A statewide total of 4,837 apartments reads like broad activity; the per-jurisdiction record shows it is the opposite of broad. Three-quarters of the state's large-multifamily authorizations occurred in 10 of 172 jurisdictions, and nearly a third occurred inside a single city's boundary [verified]. Meanwhile 111 jurisdictions authorized single-family housing and nothing else, and 134 authorized no 5+ unit building at all [verified]. This is the shape a human desk cannot see from one town's meeting: not "Connecticut isn't building apartments" but "Connecticut is building them in the same handful of places it already builds them, and 78% of its jurisdictions sat the year out."

  The year-over-year movement sharpens it. Against the 2024 annual file, statewide large-multifamily authorizations rose from 3,496 to 4,837 — up 38.4% — while single-family fell slightly, 2,129 to 2,080 [verified]. But the top of the distribution moved faster than the middle: in 2024 the leading jurisdiction (New Haven, 465 units) held 13.3% of the state's 5+ total; in 2025 Stamford alone held 31.5% [verified]. The statewide number went up and simultaneously got more concentrated — a rising total is not the same as a widening base, and only the enumeration across all 172 jurisdictions separates the two.
disagreement: |
  The strongest counter is that BPS imputes for jurisdictions that report late or not at all, so the totals are partly modeled rather than filed. That is real and we quantified it against the file's own reported-only columns: of the 7,273 total units, 473 (6.5%) are Census imputations for non- or partial-reporters; 15 jurisdictions reported 0 months and are fully imputed [verified]. The imputation is not evenly spread — 13.2% of single-family units are imputed versus only 3.7% of the 5+ units [verified]. Because the concentration story rests almost entirely on the 5+ column, and that column is 96.3% filed rather than imputed — with Stamford and New Haven both reporting a full 12 months — imputation does not explain away the finding [verified]. If anything it understates single-family activity in small non-reporting towns.

  A second, fair caution: authorized is not built. A permit can lapse, and a large 5+ project counted as one authorization event can be phased or cancelled. The 4,837 figure is a ceiling on 2025 intent, not a floor on 2025 construction. And a low count is not automatically exclusion — a built-out town with little developable land authorizes little for reasons unrelated to zoning. The file supports the distribution claim; it does not, by itself, assign a cause to any single jurisdiction's zero.
viewFrom: |
  From outside Connecticut, the pattern is not a Connecticut story — it is the default shape of American residential permitting, which BPS records identically for every state. The survey's uniform structure-size columns mean the same query run against any state's annual place file returns the same kind of finding: a long tail of jurisdictions authorizing only single-family housing, a short head of cities absorbing the multifamily. Connecticut is legible here only because it, like every state, files to one federal survey with one schema. The un-copyable move is not reading Connecticut; it is that the same pull runs across all ~20,000 permit-issuing jurisdictions at once, and no local desk is positioned to see its own town as one row in that national distribution.
notable:
  - outlet: "US Census Bureau"
    title: "Building Permits Survey — construction/bps"
    url: "https://www.census.gov/construction/bps/"
    note: "The survey behind every count here; the annual place file is the exact product we pulled, updated each year with no key required."
  - outlet: "US Census Bureau"
    title: "Building Permits Survey — place-level data files (econ/bps/Place)"
    url: "https://www2.census.gov/econ/bps/Place/"
    note: "The raw directory; the Northeast Region 2025 annual file used here lives inside it and is downloadable directly."
  - outlet: "HUD USER (SOCDS)"
    title: "State of the Cities Data Systems — Building Permits Database"
    url: "https://socds.huduser.gov/permits/"
    note: "A second, browsable front-end to the same BPS series; lets a reader re-pull any jurisdiction's counts without the raw file."
  - outlet: "CT Mirror"
    title: "Housing coverage"
    url: "https://ctmirror.org/category/housing/"
    note: "The standing newsroom coverage of the Connecticut zoning-and-affordability fight this distribution sits underneath."
  - outlet: "Medill Local News Initiative"
    title: "The State of Local News 2024"
    url: "https://localnewsinitiative.northwestern.edu/projects/state-of-local-news/2024/report/"
    note: "Why the 134 jurisdictions authorizing zero multifamily mostly go uncovered: no reporter staffs the median Connecticut town."
humanWouldMiss: |
  A local reporter covers one town's zoning hearing — a 200-unit proposal, a density fight, a 6-3 vote. What no single hearing shows is the town's place in the state's whole distribution. Reading all 172 Connecticut jurisdictions' 2025 permit records at once, three facts appear that no attendee carries out of the room. First, the statewide multifamily total rose 38% year-over-year and got *more* concentrated at the same time: one city, Stamford, went from a field of many to holding 31.5% of every 5+ unit authorized in the state. Second, the zeros are real, not missing — 115 of the 134 jurisdictions that authorized no large multifamily filed a full 12 months of reports saying so. Third, 111 jurisdictions authorized single-family homes and nothing else all year. The apartment debate is fought town by town as if each vote were local; the file shows it was decided in 10 places, and the other 162 never had the fight.
sources:
  - label: "Census Building Permits Survey — 2025 annual place file, Northeast Region (ne2025a.txt), filtered to CT (state FIPS 09). 172 jurisdictions; direct column tallies: total units 7,273 (1-unit 2,080; 2-unit 208; 3-4 unit 148; 5+ unit 4,837). 166 jurisdictions with >=1 unit; 6 with zero. 38 with any 5+ unit; 134 with zero 5+, of which 115 reported 12 months. 111 single-family-only; 74 with 1-9 total units; median 10."
    url: "https://www2.census.gov/econ/bps/Place/Northeast%20Region/ne2025a.txt"
    retrieved: "2026-08-08"
  - label: "Same file — 5+ unit concentration: Stamford 1,524 (31.5% of 4,837); top 5 (Stamford, New Haven 564, Wilton 301, Fairfield 283, Newington 225) = 2,897 (59.9%); top 10 = 3,766 (77.9%). Imputation from the file's reported-only columns: 473 of 7,273 total units imputed (6.5%); 5+ units 3.7% imputed; 1-unit 13.2% imputed; 15 jurisdictions reported 0 months."
    url: "https://www2.census.gov/econ/bps/Place/Northeast%20Region/ne2025a.txt"
    retrieved: "2026-08-08"
  - label: "Census Building Permits Survey — 2024 annual place file, Northeast Region (ne2024a.txt), CT filter, for year-over-year: total units 5,926; 5+ units 3,496; 1-unit 2,129. Top 5+ jurisdiction New Haven 465 = 13.3% of the 2024 5+ total of 3,496."
    url: "https://www2.census.gov/econ/bps/Place/Northeast%20Region/ne2024a.txt"
    retrieved: "2026-08-08"
models: "Local pod — Opus writer/editor · Census Building Permits Survey annual place files (no key), parsed this run. All type totals, jurisdiction counts, zero-multifamily counts, months-reported checks, and concentration shares are direct column tallies and arithmetic on the filed 2024/2025 CT records — no statistical projection by the pod. The only modeled component is internal to the source: BPS's own imputation for late/non-reporters, which we quantified against the file's reported-only columns (6.5% of 2025 total units; 3.7% of 5+ units) rather than modeling ourselves."
publisherOfRecord: "Unruly Labs LP"
gradingScore: "PASS (20/21). Strip-the-data test: PASS — remove 7,273 total units, the 2,080/208/148/4,837 type split, Stamford's 1,524 (31.5%), the 59.9%/77.9% top-5/top-10 shares, the 134-of-172 and 111 single-family-only counts, and the +38.4% YoY, and nothing remains; the enumeration IS the piece. Uniquely-AI 3 (every CT permit-issuing jurisdiction's 2025 record tallied and cross-compared, and diffed against 2024 — a distribution no town-level desk can see), better-than-human 3, evidence-density 3 (every figure re-pullable from the two named annual files and column tallies), voice 3, closer 3, balance 2 (imputation share quantified against reported-only columns; authorized-not-built and built-out-town caveats steelmanned), reader-checkability 3. Reports counts, shares, and the YoY delta as fact; asserts no motive for any jurisdiction's zero. Data vintage stated explicitly: BPS 2025 annual, full calendar year 2025, permits = authorizations not completions; imputation 6.5% of total units, 3.7% of the 5+ column the finding rests on."
benchVerdict: "PASS — subjects are the Census Building Permits Survey, Connecticut permit-issuing jurisdictions, and residential-permit counts by structure size. Every named entity is a municipality (Stamford, New Haven, Wilton, Fairfield, Newington), never a private individual, developer, homeowner, or applicant. No named parcel, address, or individual's permit record. No allegation and no motive assigned to any town's zero-multifamily result; the piece reports the distribution and the arithmetic delta only. Property/development angle (signature #3), not the higher-liability property-tax or crime angles."
crossLlmVerdict: "SKIPPED: browser locked (cross-LLM gate offline this session)"
---
