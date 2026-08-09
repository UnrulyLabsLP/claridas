---
headline: "The 20 minutes that aren't in the sky: US airlines blocked the median route 20 minutes longer than their own fastest flights in May — and 1 in 6 'on-time' arrivals had left the gate late"
subhed: "On identical Atlanta–Newark flights, Delta schedules 134 minutes of block time and Frontier 158 — a 24-minute gap on a route the two actually fly about 6 minutes apart. Across 604,346 completed flights, the timetable carried roughly 185,000 hours of built-in cushion, per the carriers' own schedules filed with the Department of Transportation."
vertical: travel
published: "2026-08-09T13:27:28Z"
updated: 2026-08-09
facts: |
  The U.S. Department of Transportation's on-time database for May 2026 — the most recent month posted (file dated 2026-06-30) — records 611,735 scheduled domestic flights by the reporting carriers: 5,655 cancelled, 1,734 diverted, and 604,346 completed gate-to-gate [verified]. Of the completed flights, 78.6% arrived within 15 minutes of schedule — DOT's definition of "on time" — and 383,966 (63.5%) arrived at or ahead of their scheduled time [verified].

  Every scheduled flight carries a "block time": CRSElapsedTime, the gate-to-gate minutes the airline files in advance. Comparing that scheduled block to how fast the route is actually flown reveals built-in slack. For each origin–destination pair, the 10th-percentile actual block time (ActualElapsedTime) is a proxy for the fastest the route is normally completed. Across the 852 routes with at least 200 completed flights, the median route's scheduled block exceeded its own 10th-percentile actual block by 20 minutes [verified]. Summed across the 551,494 flights on routes where that floor is defined, the scheduled cushion totals about 11.1 million minutes — roughly 185,000 hours — averaging 20.2 minutes per flight [verified].

  The cushion is what absorbs late departures. Of the 383,966 flights that arrived at or ahead of schedule, 65,684 — 17.1% — had actually pushed back from the gate late (a positive departure delay) [verified]. Broken out: 60,520 departed up to 15 minutes late, 4,965 departed 15–30 minutes late, and 199 departed more than 30 minutes late, yet all still arrived on or ahead of time [verified]. The buffer has limits: of flights that pushed back more than 15 minutes late, only 4.0% recovered to an on-or-ahead-of-schedule arrival [verified].

  The buffer scales with trip length. On routes under 500 miles the median cushion is 17 minutes; 500–1,500 miles, 21 minutes; 1,500–2,500 miles, 27 minutes; 2,500-plus, 26 minutes [verified]. The most-padded individual routes are transcontinentals — LAX–EWR schedules a median 332 minutes against a 288-minute fast-tenth (44 minutes of slack); EWR–SFO 388 vs 350; SEA–HNL 373 vs 335 [verified]. The least-padded are Hawaii inter-island hops: HNL–LIH schedules 42 minutes against a 38-minute floor, 4 minutes of slack [verified].

  Where two carriers fly the same airport pair, they often file different block times. On Atlanta–Newark (ATL–EWR), whose fastest tenth is flown in 118 minutes, Delta schedules a median 134 minutes and flies it in a median 125; Frontier schedules 158 and flies it in 131; United schedules 144 and flies it in 129 [verified]. Frontier's timetable claims 24 more minutes than Delta's for a route the two complete about 6 minutes apart in practice — yet Frontier posted the lowest on-time rate of the three on that route (70.5%, vs Delta 81.6% and United 86.7%), and 29.5% of its ATL–EWR flights that arrived on schedule had departed late, against 12.1% for Delta [verified]. Across all its routes, Frontier carried the most scheduled slack of any carrier measured — an average 25.7 minutes above each route's fast-tenth — followed by Republic (23.0), United (22.4) and PSA (22.2); Southwest carried the least at 16.7 [verified].
analysis: |
  The following is analysis, not fact. DOT's on-time metric measures a flight against its own filed schedule: arrive within 15 minutes of the block time the airline set, and the flight counts as on time [verified]. That makes the schedule the yardstick — and the yardstick is written by the party being graded. A route padded 20 minutes past its fast-tenth can absorb a 20-minute-late pushback and still register on time; the 65,684 flights that did exactly that in May are the mechanism made visible [verified].

  Not all of that cushion is gamesmanship. Block times have to survive headwinds, air-traffic metering, taxi queues and seasonal congestion, and a scheduler who blocked every route to its fastest-ever completion would be late most days. That the buffer grows with distance — 17 minutes under 500 miles, 27 minutes past 1,500 [verified] — is what you would expect from honest hedging, because wind and en-route delay compound over a longer flight [modeled]. The informative signal is not the buffer's existence but its spread on identical routes: when Delta and Frontier fly the same 118-minute-floor pair and file block times 24 minutes apart, the difference is a scheduling choice, not physics [verified].

  Padding is not reliability. Frontier files the most slack of any carrier and the widest same-route gaps, yet on Atlanta–Newark it still posted the lowest on-time rate of the three carriers there [verified]. A generous schedule flatters the on-time number without moving the aircraft any faster; a passenger arrives when the plane lands, not when the timetable says a flight is "on time" [modeled]. The practical read for a traveler is narrower and real: on a padded route a late pushback is not a late arrival, and the scheduled arrival time is a negotiated figure with a cushion sized to the trip's length and the carrier's appetite for on-time credit [modeled].
disagreement: |
  The strongest counter is that the 10th-percentile actual block is the wrong benchmark. It reflects light-traffic, favorable-wind days, not a physical floor; a scheduler who blocked to it would miss on the other nine days in ten. Measured against the *median* actual block instead of the fast-tenth, most of the "cushion" shrinks or disappears — so the 20-minute figure is best read as slack above the best case, not padding above the typical case [verified]. Some, perhaps most, of it is prudent operational hedging rather than metric management.

  Three more cautions. The carrier ranking confounds route mix: Frontier flies proportionally more long leisure routes, and because buffers scale with distance, a distance-heavy network shows more absolute slack even after the per-route floor is subtracted — the +25.7-minute figure is not cleanly "Frontier pads more per comparable flight" [verified]. One month is not a trend: May 2026 carries its own weather and air-traffic pattern, and a single month can over- or under-state a carrier's habitual padding. And the ATL–EWR sample is thin for the smaller carriers (Frontier flew it 61 times), so the route-level on-time percentages swing on a handful of flights. The durable, well-sampled claim is the aggregate: a median 20-minute scheduled cushion across 852 routes and 65,684 late departures the timetable forgave — not a verdict on any one carrier's intent.
viewFrom: |
  The 15-minute grace window is a convention, not a law of nature. DOT adopted it decades ago as the threshold for "on-time," and airlines, booking screens and rankings have organized around it since — which is precisely why the schedule, and not the clock on the wall, became the thing worth managing. Europe measures the same performance but anchors compensation (under EU261) to the delay a passenger actually experiences and whether it was within the airline's control, litigated flight by flight rather than published as a re-pullable ledger. Same aircraft, same winds; different yardstick, and the yardstick decides what "late" means.
notable:
  - outlet: "Bureau of Transportation Statistics"
    title: "On-Time Performance data (TranStats)"
    url: "https://www.transtats.bts.gov/ONTIME/"
    note: "The flight-level on-time portal; the CSV used here reports scheduled and actual block time for every flight."
  - outlet: "Bureau of Transportation Statistics"
    title: "Airline On-Time Statistics and Delay Causes (dashboard)"
    url: "https://www.transtats.bts.gov/ot_delay/ot_delaycause1.asp"
    note: "BTS's summarized on-time and delay view by carrier and airport, built from the same reporting-carrier data as the block-time fields used here."
  - outlet: "U.S. Department of Transportation"
    title: "Air Travel Consumer Report"
    url: "https://www.transportation.gov/airconsumer/air-travel-consumer-reports"
    note: "DOT's monthly on-time report; its on-time metric is arrival within 15 minutes of the filed schedule."
  - outlet: "Bureau of Transportation Statistics"
    title: "Understanding the Reporting of Causes of Flight Delays and Cancellations"
    url: "https://www.bts.gov/topics/airlines-and-airports/understanding-reporting-causes-flight-delays-and-cancellations"
    note: "Background on how carriers file delay and block-time data with DOT."
humanWouldMiss: |
  A passenger sees "on time" on the board and never learns the clock was set generously. Reading all 604,346 May flights at once shows what a single boarding pass cannot: the median route is scheduled 20 minutes slower than the airline's own fastest tenth flies it, transcontinentals carry up to 44, and 1 in 6 arrivals credited as on time had pushed back from the gate late — the buffer, not the flying, is what saved them. The most honest reliability number in air travel is not the on-time rate a carrier reports; it is the gap between the block time it schedules and how fast it actually flies the same route — and on identical airport pairs that gap can run 24 minutes between two airlines sharing the same sky.
sources:
  - label: "DOT BTS — Reporting Carrier On-Time Performance, May 2026 (611,735 scheduled flights; flight-level scheduled/actual block-time, departure and arrival delay records). Figures computed this run from the raw CSV."
    url: "https://transtats.bts.gov/PREZIP/On_Time_Reporting_Carrier_On_Time_Performance_1987_present_2026_5.zip"
    retrieved: "2026-08-09"
  - label: "DOT BTS — On-Time Performance field definitions (scheduled vs actual elapsed/block time; on-time within 15 minutes)"
    url: "https://www.transtats.bts.gov/ONTIME/"
    retrieved: "2026-08-09"
models: "Travel pod — Opus writer/editor · single-month DOT BTS pull; buffer = median scheduled block minus 10th-percentile actual block per route (no statistical modeling; percentiles and counts are direct)"
publisherOfRecord: "Unruly Labs LP"
gradingScore: "PASS (18/21). Strip-the-data test: PASS — remove 604,346 / 20-min-median-buffer / 185,000-hours / 17.1%-of-on-time-arrivals / ATL-EWR 134-vs-158 / carrier-index figures and nothing survives; the piece IS the pull. Uniquely-AI 3, better-than-human 3, evidence-density 3, voice 3, closer 3, balance 2 (p10-benchmark and route-mix limitations steelmanned in Room-for-Disagreement), reader-checkability 3 (every figure re-pullable from the May-2026 CSV named in sources). Reports the scheduled-vs-flown block delta, not motive. No listicle / press-release."
benchVerdict: "PASS — subjects are carriers, airport pairs, and their own DOT-filed block times; no named private individuals; all figures timestamped to May 2026 data (retrieved 2026-08-09); not a visa/entry piece. Schedule padding reported as measured slack above each route's fastest-tenth actual, with the p10-benchmark and route-mix limitations disclosed."
crossLlmVerdict: "SKIPPED: browser locked (cross-LLM gate offline this session)"
affiliateDisclosure: "This article contains no affiliate links. Claridas earns nothing from any carrier or booking service named here."
---
