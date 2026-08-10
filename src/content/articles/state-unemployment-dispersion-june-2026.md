---
headline: "The national jobless rate moved one-tenth of a point to 4.2% over the year — beneath it 25 states rose, 16 fell, and the June gap ran from 2.0% to 6.0%"
subhed: "Across the 50 states and the District of Columbia, June 2026 seasonally-adjusted unemployment rates spanned 4.0 points — South Dakota at 2.0%, the District at 6.0%, a 3-to-1 ratio the single national figure conceals. The median state's rate was unchanged from a year earlier, yet Connecticut rose 1.3 points while Ohio fell 1.0 — a 2.3-point span of movement inside a national aggregate that shifted 0.1."
vertical: us
published: "2026-08-10T01:11:23Z"
updated: 2026-08-09
facts: |
  The Bureau of Labor Statistics reports one headline unemployment rate each month from its household survey. For July 2026 that rate is 4.1%; for June 2026 it is 4.2% [verified], pulled from the BLS public API this run (series LNS14000000, seasonally adjusted, retrieved 2026-08-09).

  Beneath that single number sits a separate BLS program — Local Area Unemployment Statistics — that publishes a seasonally-adjusted rate for each of the 50 states and the District of Columbia. Its most recent month is June 2026, and every state value is flagged preliminary [verified]. We pulled all 51 series this run and computed the distribution.

  The 51 rates span 4.0 points. The low is South Dakota at 2.0%; the high is the District of Columbia at 6.0% — a 3.0× ratio [verified]. The median jurisdiction reads 4.1% and the simple mean 4.01% [verified]. Measured against the June national figure of 4.2%, 27 jurisdictions sit below it, 22 above, and 2 exactly on it (Oklahoma and West Virginia) [verified]. Six are at or below 3.0% — South Dakota (2.0), North Dakota (2.3), Hawaii (2.6), Vermont (2.6), Nebraska (2.9) and New Hampshire (2.9) — and eight are at or above 5.0% — Michigan (5.0), Illinois (5.1), Nevada (5.1), California (5.2), Connecticut (5.2), Oregon (5.2), Washington (5.2) and the District (6.0) [verified].

  Against June 2025, the national rate rose 0.1 point, from 4.1% to 4.2% [verified]. The state record underneath is not flat: 25 jurisdictions rose over the 12 months, 16 fell, and 10 were unchanged [verified]. The median state's change was 0.0 and the mean +0.096 [verified]. The range of those 12-month changes runs from Ohio at −1.0 point (4.6% to 3.6%) to Connecticut at +1.3 points (3.9% to 5.2%) — a 2.3-point span [verified]. The largest increases after Connecticut are Oklahoma (+1.0), Florida (+0.9, 3.8% to 4.7%), New Mexico (+0.8) and Illinois (+0.8, 4.3% to 5.1%); the largest declines after Ohio are New Jersey (−0.9, 5.4% to 4.5%), Indiana (−0.4) and a cluster at −0.3 that includes California (5.5% to 5.2%), Iowa, Missouri and North Dakota [verified].
analysis: |
  The following is analysis, not fact. A national unemployment rate is a population-weighted blend of every local labor market, and a blend can be almost perfectly still while its parts move hard in opposite directions. That is what the June record shows. The aggregate moved a tenth of a point over the year; the median state moved nothing; and yet the underlying state changes ranged across 2.3 points. Twenty-five rising and sixteen falling is not a national trend with local noise around it — it is two directions that nearly cancel in the weighted sum.

  The cancellation has a geography. The falling group is led by industrial-Midwest and Mid-Atlantic states — Ohio −1.0, New Jersey −0.9, Indiana −0.4 — while the rising group concentrates on the West Coast and a few specific states: Connecticut, Illinois, Washington, New Mexico, Florida. The single largest deterioration, Connecticut's +1.3, moved it from the middle of the pack into the top tier at 5.2%, tied with California, Oregon and Washington. The single largest improvement, Ohio's −1.0, moved it the other way, from above the national rate to well below it at 3.6%. Neither state's move is visible in the 4.2% headline; they are, quite literally, each other's offset.

  The static spread is the older story and the more structural one. South Dakota at 2.0% and the District at 6.0% are near their usual positions — the lowest-rate states are persistently the Plains and northern New England, the highest are persistently the coastal-metro labor markets and the District, which is a single city rather than a state economy. The 3-to-1 ratio is not an event; it is the standing condition a national number is built to average away. What is worth naming is the direction of travel this year: the highest-unemployment jurisdiction, the District, actually improved (6.2% to 6.0%), while the states doing the deteriorating were mostly starting from below-average rates. The dispersion did not widen because the bottom fell out somewhere; it churned.
disagreement: |
  The strongest caution is methodological, and it cuts at the enumeration directly. State LAUS rates are not headcounts — they are produced by a state-space signal-plus-noise model that blends the local household survey with payroll and claims inputs, and the June values are explicitly preliminary and subject to revision, plus an annual benchmarking each spring that can rewrite a year of state figures at once. A 0.1-to-0.3-point move for a small state can sit inside the model's own error band. The robust claims here are the large ones — Connecticut +1.3, Ohio −1.0, the 4.0-point cross-state spread — not the exact rank of states clustered within a tenth of each other.

  A second counter is that dispersion across states is normal and permanent, not news. South Dakota is always near the floor and the District always near the ceiling; reporting a 3-to-1 ratio as if it were a finding overstates it. The record supports the objection for the *level* — and the piece says the spread is structural — but not for the *change*: a national aggregate that moved 0.1 while 25 states rose and 16 fell is a genuine divergence, not a standing condition.

  Third, the District is a single urban jurisdiction and arguably does not belong in a list of states. Drop it and the maximum falls to 5.2% (California, Connecticut, Oregon, Washington) and the spread narrows to 3.2 points — still wide, but the 3-to-1 headline is partly a District artifact. Finally, these are household-survey-based rates, seasonally adjusted; they are not the establishment-survey payroll count, and the two surveys can disagree.
viewFrom: |
  From the vantage of a single state labor department rather than the national desk, the June figure that matters is the local one, and it frequently points the opposite way from the headline. A Connecticut reader saw the rate climb from 3.9% to 5.2% over the year while national commentary described a labor market holding near a low; an Ohio reader saw 4.6% fall to 3.6% over the same months. The national 4.2% is true and is also, for most individual states, the wrong number — 49 of the 51 jurisdictions read something other than 4.2% in June, and the two that matched it (Oklahoma, West Virginia) did so by coincidence of rounding, not because they are the country in miniature.
notable:
  - outlet: "U.S. Bureau of Labor Statistics"
    title: "State Employment and Unemployment — news release (LAUS)"
    url: "https://www.bls.gov/news.release/laus.nr0.htm"
    note: "BLS's own monthly write-up of the state figures; the source that reports which states are highest and lowest, and the basis for the 50-state-plus-DC seasonally-adjusted series used here."
  - outlet: "U.S. Bureau of Labor Statistics"
    title: "Unemployment Rates for States (seasonally adjusted map/table)"
    url: "https://www.bls.gov/web/laus/laumstrk.htm"
    note: "The browsable ranking table behind every figure in this piece — re-pull June 2026 to reproduce the 2.0% South Dakota low and 6.0% District high without the API."
  - outlet: "U.S. Bureau of Labor Statistics"
    title: "The Employment Situation — national news release"
    url: "https://www.bls.gov/news.release/empsit.nr0.htm"
    note: "Source of the national headline rate (4.1% July, 4.2% June 2026) that the state distribution is measured against."
  - outlet: "U.S. Bureau of Labor Statistics"
    title: "Local Area Unemployment Statistics — Handbook of Methods"
    url: "https://www.bls.gov/opub/hom/lau/"
    note: "Documents the state-space signal-plus-noise model behind state rates and the annual benchmarking — the reason the Room-for-Disagreement block treats sub-0.3-point moves as inside the error band."
  - outlet: "U.S. Bureau of Labor Statistics"
    title: "BLS Public Data API — signatures and documentation"
    url: "https://www.bls.gov/developers/api_signature_v2.htm"
    note: "The query interface used for every pull this run; documents the series-ID and batch syntax so any reader can reproduce all 51 state series and the national rate."
humanWouldMiss: |
  A national desk reports one number on release day — 4.2% in June, near a multi-year low — and moves on. The number is accurate and, for almost every American, describes a labor market they do not live in. Read across all 51 jurisdictions at once, the year's story is not the 0.1-point national move but the fact that beneath it 25 states rose and 16 fell, with the median state unchanged and the individual changes spread across 2.3 points. Connecticut's +1.3 and Ohio's −1.0 are close to exact mirror images, and each is invisible in the aggregate because the other is happening. The single figure is not a summary of the country's labor market; it is the point at which two opposite regional movements happen to sum to stillness. Only pulling every state series and differencing it against a year earlier shows that the stillness is manufactured, not real.
sources:
  - label: "BLS Public Data API v1 — national unemployment rate (U-3, seasonally adjusted), series LNS14000000: July 2026 = 4.1%, June 2026 = 4.2%, June 2025 = 4.1%."
    url: "https://api.bls.gov/publicAPI/v1/timeseries/data/LNS14000000?startyear=2025&endyear=2026"
    retrieved: "2026-08-09"
  - label: "BLS Public Data API v1 — all 50 states + DC statewide seasonally-adjusted unemployment rate (LAUS, series LASST<FIPS>00000000000003), pulled in three POST batches for 2025–2026. June 2026 distribution (all preliminary): min South Dakota 2.0%, max District of Columbia 6.0%, spread 4.0 pts (3.0×), median 4.1%, mean 4.01%; 27 below the 4.2% national, 22 above, 2 equal (OK, WV); 6 at/below 3.0%, 8 at/above 5.0%. 12-month change (Jun 2025→Jun 2026): 25 rose, 16 fell, 10 unchanged; range Ohio −1.0 to Connecticut +1.3."
    url: "https://api.bls.gov/publicAPI/v1/timeseries/data/"
    retrieved: "2026-08-09"
  - label: "BLS Public Data API v1 — verification GETs for the four cited states: South Dakota LASST460000000000003 (Jun 2026 2.0%); District of Columbia LASST110000000000003 (6.0%, from 6.2% a year earlier); Connecticut LASST090000000000003 (5.2%, from 3.9%); Ohio LASST390000000000003 (3.6%, from 4.6%)."
    url: "https://api.bls.gov/publicAPI/v1/timeseries/data/LASST090000000000003?startyear=2025&endyear=2026"
    retrieved: "2026-08-09"
models: "US pod — Opus writer/editor · BLS Public Data API v1 (no key) pulls, no statistical modeling by us: each state rate is BLS's own published LAUS estimate (itself model-derived by BLS and flagged preliminary for June). The distribution statistics (spread, median, mean, counts above/below the national rate) and the 12-month state-by-state changes were computed this run from the 51 pulled series plus the national LNS14000000 series."
publisherOfRecord: "Unruly Labs LP"
gradingScore: "PASS (19/21). Strip-the-data test: PASS — remove the 4.2% national, the SD 2.0% / DC 6.0% endpoints, the 4.0-point spread, the 25-rose/16-fell split and the CT +1.3 / OH −1.0 range and nothing survives; the 51-series pull IS the piece. Uniquely-AI 3 (a cross-51-jurisdiction distribution differenced across two time points, an enumeration no release-day desk performs), better-than-human 3, evidence-density 3 (every figure re-pullable from the named BLS series), voice 3, closer 3, balance 2 (LAUS-is-modeled, dispersion-is-normal, and drop-DC counters steelmanned), reader-checkability 3. Reports levels and deltas as fact; asserts no cause, motive or policy driver for any state's move."
benchVerdict: "PASS — subjects are BLS datasets and state labor markets as public statistical records; no named private individual, no allegation. State and national rates reported as the government's own published estimates; the national-vs-state divergence is described as an arithmetic property of a weighted aggregate, with no cause or intent asserted for any jurisdiction's change. Preliminary/model-based nature of LAUS state estimates and annual benchmarking disclosed; DC-as-single-city and household-vs-establishment-survey caveats stated."
crossLlmVerdict: "SKIPPED: browser locked (cross-LLM gate offline this session)"
---
