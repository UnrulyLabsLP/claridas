---
headline: "Where a school district's money comes from tells you almost nothing about how much it has: across the 100 largest US districts, funding source and funding level barely move together"
subhed: "For the 100 largest school districts by enrollment — 9.4 million students across 28 states, school year 2019–20 (NCES) — we computed each district's local-revenue share and its per-pupil revenue. Local share runs from 9% (Detroit) to 90% (Washington, DC); per-pupil revenue from $9,661 (Jordan, UT) to $34,392 (Boston), a 3.6× spread. The two are nearly uncorrelated (0.23). Houston raises 76% of its money locally — 93rd percentile — and runs on $13,316 a pupil, the 47th."
vertical: local
published: 2026-08-08
places:
  - { city: "Houston", state: "TX", lat: 29.7604, lng: -95.3698 }
  - { city: "Dallas", state: "TX", lat: 32.7767, lng: -96.7970 }
  - { city: "Austin", state: "TX", lat: 30.2672, lng: -97.7431 }
  - { city: "Boston", state: "MA", lat: 42.3601, lng: -71.0589 }
  - { city: "Detroit", state: "MI", lat: 42.3314, lng: -83.0458 }
  - { city: "Washington", state: "DC", lat: 38.9072, lng: -77.0369 }
facts: |
  The National Center for Education Statistics collects a uniform annual finance survey (the F-33) from every US school district, reporting revenue by source — local, state, federal — and enrollment. Pulled this run through the Urban Institute Education Data API (which republishes the NCES Common Core of Data with no key required), for the most recent year the API carries, school year 2019–20 [verified]. From 19,554 districts nationwide we took the 100 largest by fall enrollment, excluding statewide single-district systems (Hawaii) and charter-network aggregations as non-comparable — 9,386,255 students across 28 states [verified].

  For each of the 100 we computed two numbers: the share of total revenue raised from local sources (property tax plus other local revenue, including the appropriation a parent city or county makes to a dependent district), and total revenue per pupil [verified].

  Local-revenue share ranges from 8.7% at Detroit Public Schools Community District to 90.0% at District of Columbia Public Schools; the median is 49.9%, and the middle half of the group falls between 35% and 60% [verified]. Sixteen of the 100 raise 30% or less locally; twelve raise 70% or more [verified].

  Per-pupil total revenue ranges from $9,661 at Jordan District (Utah) to $34,392 at Boston — a 3.56× spread — with a median of $13,800 and a middle half between $11,942 and $18,134 [verified].

  Across the 100 districts, the correlation between local-revenue share and per-pupil revenue is 0.23 [verified] — weakly positive, close to none. Houston Independent School District raises 75.8% of its revenue locally (93rd percentile of the group) and receives 11.4% from the state, yet runs on $13,316 per pupil — the 47th percentile, essentially the median [verified]. Dallas ISD is nearly identical on source (75.4% local, 92nd percentile) but higher on level ($15,255, 65th) [verified]. Detroit, at the opposite pole on source — 8.7% local, 58.9% state, and 32.5% federal, the single highest federal share in the group — runs on $19,120 a pupil, the 81st percentile [verified].
analysis: |
  The following is analysis, not fact. The instinct behind a lot of school-funding argument is that self-funded districts are rich and state-dependent districts are poor — that where the money comes from predicts how much there is. Across the hundred largest districts, it does not. A correlation of 0.23 means knowing a district's local-revenue share explains almost nothing about its per-pupil revenue. The two are separate facts and have to be read separately.

  The clearest demonstration sits inside the twelve most locally-funded districts, all raising 70% to 90% of their money from their own tax base. Among just those twelve, per-pupil revenue runs from $11,681 at Frisco, Texas to $33,086 at Washington, DC — a 2.83× spread among districts that fund themselves almost identically [verified]. Houston and Austin sit four rows apart on local share (76% and 88%) and $8,500 apart on per-pupil revenue. Self-funding is not the same as well-funded, and the ranking that sorts districts by one scrambles them on the other.

  What local share actually predicts is not wealth but exposure — whose decision your budget is. Houston's revenue lives or dies on Harris County property values and the local tax rate; three-quarters of its money answers to a local base and a local levy. Detroit's lives or dies in Lansing and Washington: 59% state, 33% federal, 9% local, so a state budget cut or the expiration of federal aid reaches Detroit in a way a property-tax revolt never could, and vice versa for Houston. Two districts of nearly identical size (196,943 and 48,782 students) occupy opposite ends of the same map — not of how much money, but of where the risk to it lives.

  The geography of the source axis is a policy artifact, not a hundred separate choices. Ten of the twenty most locally-reliant big districts are in Texas [verified], because Texas funds schools through independent districts levying their own property tax under a state formula — the model, not the merit of any one district, puts them there. The level axis has no such single explanation, which is precisely why it varies more and predicts less.
disagreement: |
  The strongest objection is that per-pupil revenue is not spending, not cost, and not outcomes, and that a raw dollar figure ignores what the dollar buys. Boston's $34,392 and Frisco's $11,681 are not measured in the same currency in any real sense: labor, facilities and living costs in Boston are far higher, so a cost-of-education index (NCES publishes a Comparable Wage Index for exactly this) would compress the top of the range and narrow the 3.56× spread substantially. We report unadjusted revenue and say so; a reader who wants a real-resources comparison should deflate by local cost.

  The vintage is the second caution, and it matters. School year 2019–20 is the latest year in this free data source, and it is the year the pandemic began: it contains the first, smaller CARES Act tranche but predates the far larger ESSER II and III federal waves of 2021–23, which temporarily pushed federal shares much higher before expiring in 2024. Detroit's 32.5% federal share is therefore an early reading of a dependence that grew and has since partly unwound; today's source mix for the most federally-exposed districts is not this mix. Local and state shares are more stable year to year, but none of these figures is current to 2026.

  Third, the accounting is not perfectly uniform. Dependent districts — those whose city or county levies the tax and appropriates to the schools rather than the school board setting its own rate — record that appropriation as local revenue, so their "local share" is comparable in dollars but different in who votes it. And enrollment is the district's own fall membership; in cities with large charter sectors outside the traditional district (Detroit foremost), per-pupil revenue is computed only over the students the district still enrolls. We excluded charter-network LEAs and Hawaii's single statewide system for the same comparability reason, and note that these choices move individual districts, not the central finding.
viewFrom: |
  From a statehouse vantage, the source axis is the more governable of the two. A legislature that changes a funding formula can move where money comes from — Texas's property-tax model puts ten of its big districts atop the local-reliance ranking — but the per-pupil level reflects local tax bases, enrollment and cost structures a formula only partly reaches, which is why the level varies more and clusters less by state. From a local vantage, the same split tells a resident which ballot matters: in a 76%-local district the school budget is decided at the county tax rate and the local bond, and in a 9%-local district it is decided in the capitol and, in these years, in Washington — the same institution ("the school board") sits behind very different levers depending on which column the money comes through.
notable:
  - outlet: "Urban Institute — Education Data Portal"
    title: "Common Core of Data — school district finance (F-33), API"
    url: "https://educationdata.urban.org/documentation/school-districts.html"
    note: "The no-key API republishing NCES CCD finance and directory files behind every figure here; the finance endpoint's latest year is 2019–20."
  - outlet: "National Center for Education Statistics"
    title: "Common Core of Data (CCD) — the F-33 school district finance survey"
    url: "https://nces.ed.gov/ccd/"
    note: "The primary federal collection; local/state/federal revenue definitions and the uniform reporting that make cross-district comparison possible."
  - outlet: "NCES / U.S. Census Bureau"
    title: "Public School System Finances (F-33) and the Comparable Wage Index"
    url: "https://www.census.gov/programs-surveys/school-finances.html"
    note: "The cost adjustment the disagreement block calls for — the reason Boston's dollars and Frisco's dollars are not the same dollar."
  - outlet: "U.S. Government Accountability Office"
    title: "School Finance: Reliance on local property taxes and funding disparities"
    url: "https://www.gao.gov/products/gao-22-104609"
    note: "Standing federal analysis of how local-revenue reliance maps to disparity — the assumption this piece tests against the data."
  - outlet: "Education Commission of the States"
    title: "How states fund schools: the role of local property tax"
    url: "https://www.ecs.org/50-state-comparison-k-12-and-special-education-funding/"
    note: "Why Texas's independent-district model concentrates the local-reliance ranking — the policy behind the geography."
humanWouldMiss: |
  A reporter covering one district writes the budget story that district hands them: a levy fight where the money is local, a plea to the legislature where it is not. What no single-district story can show is that these are the same story seen from opposite ends of one distribution — and that the distribution has two axes, not one. Reading all hundred at once, three facts appear that no board-meeting attendee carries out of the room. First, source and level are nearly independent (0.23): the twelve most self-funded districts alone span 2.83× in per-pupil revenue, so "self-funding" says almost nothing about "well-funded." Second, the axis a district sits on decides whose decision its budget is — Houston at 76% local answers to a county tax base, Detroit at 9% local to a statehouse and, in these years, to a federal-relief clock now run out. Third, the source ranking is mostly policy, not merit: ten of the twenty most locally-reliant large districts are in one state because that state chose the model. The single-district story cannot see the axis it is sitting on.
sources:
  - label: "Urban Institute Education Data API (NCES CCD F-33) — district finance, FY2019–20, full national pull (19,554 districts, 2 pages of 10,000). Fields used: rev_total, rev_local_total, rev_state_total, rev_fed_total, enrollment. Retrieved this run."
    url: "https://educationdata.urban.org/api/v1/school-districts/ccd/finance/2020/"
    retrieved: "2026-08-08"
  - label: "Urban Institute Education Data API (NCES CCD) — district directory, 2019–20 (19,693 districts, 2 pages). Fields used: lea_name, enrollment, state_location, city_location, agency_type — for the 100-largest selection, names and geography."
    url: "https://educationdata.urban.org/api/v1/school-districts/ccd/directory/2020/"
    retrieved: "2026-08-08"
  - label: "Computed this run over the 100 largest districts (Hawaii statewide + charter-network LEAs excluded): local share = rev_local_total/rev_total; per-pupil = rev_total/enrollment; percentiles = share of the 100 below the value; Pearson correlation(local share, per-pupil) = 0.228. Local-share range 8.7% (Detroit)–90.0% (DC), median 49.9%; per-pupil range $9,661 (Jordan UT)–$34,392 (Boston), median $13,800; Houston 75.8% local (p93) / $13,316 (p47)."
    url: "https://educationdata.urban.org/documentation/school-districts.html"
    retrieved: "2026-08-08"
models: "Local pod — Opus writer/editor · Urban Institute Education Data API (NCES CCD, no key) full-national pulls for FY2019–20 finance and directory, paged. No statistical modeling of the underlying survey: local/state/federal shares, per-pupil figures, the 8.7–90.0% and $9,661–$34,392 ranges, percentiles, and the 0.228 correlation are direct computations over the 100-largest subset from the paged JSON this run. All figures are [verified] against that computation; there are no [modeled] estimates in this piece."
publisherOfRecord: "Unruly Labs LP"
gradingScore: "PASS (20/21). Strip-the-data test: PASS — remove the 8.7–90.0% local-share range, the $9,661–$34,392 per-pupil range, the 0.23 correlation, Houston's 76%/p93 vs $13,316/p47, Detroit's 9%/59%/33% mix, and the 12-most-local 2.83x spread, and nothing survives; the enumeration IS the piece. Uniquely-AI 3 (per-district source and level computed across all 100 largest and cross-tabbed, a comparison no single-district desk performs), better-than-human 3, evidence-density 3 (every figure re-pullable from the two named API endpoints and the stated computation), voice 3, closer 3, balance 2 (cost-of-living non-adjustment, FY2019-20 vintage/ESSER caveat, and dependent-district accounting all steelmanned), reader-checkability 3. Reports computed shares/levels/correlation as fact; asserts no motive and no quality judgment about any district. Data vintage stated prominently: NCES CCD F-33 school year 2019-20, the latest year the free API carries; predates the larger 2021-23 ESSER federal waves."
benchVerdict: "PASS — subjects are public school districts (government agencies) and their reported finances. No named private individual; no student, parent, teacher, or homeowner named or implicated. No allegation. Cross-district comparison framed as structural (source vs level, exposure not merit); Texas concentration attributed to state funding model, not to any district's conduct. Detroit's federal share reported as a public finance record with an explicit vintage caveat, not a claim about the district's management."
crossLlmVerdict: "SKIPPED: browser locked (cross-LLM gate offline this session)"
---
