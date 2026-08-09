---
headline: "May's 1,734 diverted US flights vanish from every on-time score — 196 never reached their destination, and the ones that did landed a median 3 hours 22 minutes late"
subhed: "A diverted flight is neither a cancellation nor a late arrival, so it drops out of the 78.6% on-time rate entirely. Reading all 1,734 of May's diversions at once shows where they went instead: one in six was bound for Dallas–Fort Worth, and Oklahoma City was the overflow lot — per the carriers' own filings with the Department of Transportation."
vertical: travel
published: "2026-08-09T18:33:43Z"
updated: 2026-08-09
facts: |
  The U.S. Department of Transportation's on-time database for May 2026 — the most recent month posted — records 611,735 scheduled domestic flights by the reporting carriers. Of these, 5,655 were cancelled (0.92%) and 604,346 were completed gate-to-gate. The remainder — 1,734 flights, 0.28% of the schedule, roughly 1 in 353 — were diverted: they operated, but landed somewhere other than where they were going [verified].

  A diverted flight is counted as neither a completed arrival nor a cancellation. In the raw records, all 1,734 diverted flights carry an empty arrival-delay field and an empty on-time flag [verified]. DOT's headline on-time arrival rate — 78.6% for May, computed over the 604,346 flights that arrived at their scheduled destination — excludes every one of them by construction [verified].

  Of the 1,734, the record shows 1,538 (88.7%) eventually reached their intended destination and 196 (11.3%) never did [verified]. For the 1,538 that arrived, the diverted-arrival delay ran a median of 202 minutes — 3 hours 22 minutes — and a mean of 287 minutes; 944 of them (61.4%) arrived three or more hours late, and the single worst, a SkyWest-operated Colorado Springs–Chicago O'Hare flight on May 18 that set down in Kansas City, reached O'Hare 1,862 minutes — 31 hours — behind schedule and still counts as having arrived [verified]. Time parked at the divert airport before continuing ran a median of 34 minutes but reached 355 minutes (5 hours 55 minutes) at the top; 153 flights sat two hours or more, 39 sat three or more [verified].

  The diversions were not spread evenly. Dallas–Fort Worth (DFW) was the intended destination of 282 of them — 16.3% of the national total at a single airport — and Dallas Love Field (DAL) another 81; the two adjacent airports together absorbed 363 diversions, 20.9% of the country's May total [verified]. Measured against arrivals, DAL diverted at 133.5 per 10,000, DFW at 106.4, and LaGuardia at 74.3, against a national rate of 28.3 [verified]. Oklahoma City (OKC) was the single most common airport a diverted flight actually landed at — 78 times, 62 of them DFW-bound [verified].
analysis: |
  The following is analysis, not fact. A diversion is the failure mode the reliability numbers are built not to see. The on-time rate a traveler checks answers one question — did the flight arrive at its destination within 15 minutes of schedule — and a diverted flight cannot answer it, because it did not arrive at that destination at all [verified]. It is also not a cancellation: the flight flew. So the month's worst 1,734 journeys sit in neither of the two columns any fare screen or consumer report shows, and the 78.6% figure is, precisely, the number with those journeys removed [verified].

  Read together, the diversions are less a list of unlucky flights than a map of two weather systems over two metro areas [modeled]. North Texas alone (DFW plus DAL) accounts for 21% of the national total; the second cluster is the San Francisco Bay, where the month's origin–destination pairs are dominated by short West Coast hops into SFO — Orange County, San Diego, Palm Springs — waved off and set down nearby [modeled]. May 2026 diversions concentrated where the month's convective and marine weather concentrated, not across the system.

  Oklahoma City as the country's top catch airport is mechanical, not coincidental [modeled]. When DFW's arrival rate collapses, the holding aircraft have to go down at the nearest fields with the runway and fuel to take them, and DFW's diversions fan out into a ring — OKC 62, Austin 32, Tulsa 30, San Antonio 26, Houston 23, then Wichita Falls, Waco, Abilene, Wichita. The ring is the shape of a hub losing its weather, drawn in the divert-airport codes.

  The carrier spread reads the same way. American Airlines diverted at 42.0 per 10,000 operated flights, the highest of any carrier with 5,000-plus May departures, against a cluster near 26 (Southwest 26.6, Delta 26.0, SkyWest 26.9, United 29.2) and a low of 18.6 at Alaska [verified]. This is a hub artifact, not a safety signal: American flies the most into DFW, and DFW was the country's diversion sink this month. The honest statement is the arithmetic — a carrier concentrated at the airport the weather closed diverted more — not a claim about the airline [modeled].
disagreement: |
  The strongest counter is that 0.28% is a rounding error. One flight in 353 diverts; the 78.6% on-time rate summarizes the other 352 honestly, and elevating 1,734 flights over 604,346 completed ones inverts the real proportions [verified]. The reply is that rarity is the mechanism, not the rebuttal: diversions are too few to move the headline percentage, which is exactly why they are excluded from it and why no widely-cited number tracks them — yet they are the worst outcomes in the system, a median 3 hours 22 minutes late for those that arrive and a stranding for the 196 that do not [verified].

  Three genuine limits. One month is one weather draw: May 2026's North Texas convective pattern put DFW at the center, and a different month would center the map somewhere else — the durable claims here are structural (diversions are excluded from the on-time rate; they cluster by weather-geography; a hub's diversions fan into a ring), not "DFW is unreliable" [modeled]. The divert-airport and ground-time fields are carrier-filed and occasionally sparse, though the diverted flag itself is objective — the aircraft either landed at the scheduled airport or it did not, which makes this cut less exposed to the coding-culture question than cause-code analyses. And "reached destination" can undercount the passenger's experience: a flight the record marks as eventually arriving may have done so on a bus or a next-day rebooking the on-time database does not capture.
viewFrom: |
  This accounting exists only because U.S. law compels it. DOT requires carriers to file, for every diverted flight, the alternate airport it landed at, the wheels-on time there, how long it sat, whether it ever reached its scheduled destination, and how late it was when it did. Most aviation authorities publish nothing at the diverted-flight level. In the EU, a diversion feeds the same passenger-rights machinery as a long delay or cancellation under EC261 — but it is adjudicated after the fact, claim by claim, rather than published as a record anyone can re-pull and count. The 1,734-flight shape of a month's diversions is visible in the United States because the divert fields are public data, not because diversions are more common here.
notable:
  - outlet: "Bureau of Transportation Statistics"
    title: "On-Time Performance data (TranStats)"
    url: "https://www.transtats.bts.gov/ONTIME/"
    note: "The primary portal for the flight-level on-time, cancellation and diversion records used here, including the Div-prefixed divert fields."
  - outlet: "Bureau of Transportation Statistics"
    title: "Understanding the Reporting of Causes of Flight Delays and Cancellations"
    url: "https://www.bts.gov/topics/airlines-and-airports/understanding-reporting-causes-flight-delays-and-cancellations"
    note: "BTS's own explanation of how delayed, cancelled and diverted flights are defined and counted — the basis for why diverted flights sit outside the on-time arrival rate."
  - outlet: "U.S. Department of Transportation"
    title: "Air Travel Consumer Report"
    url: "https://www.transportation.gov/airconsumer/air-travel-consumer-reports"
    note: "DOT's monthly consumer-facing on-time and mishandling report — the summarized on-time figure this piece looks past."
  - outlet: "Bureau of Transportation Statistics"
    title: "Airline On-Time Statistics and Delay Causes (dashboard)"
    url: "https://www.transtats.bts.gov/ot_delay/ot_delaycause1.asp"
    note: "The aggregate carrier-and-airport view of on-time performance, which reports diversions separately from delays and cancellations."
  - outlet: "Federal Aviation Administration"
    title: "Operations Network (OPSNET) — air traffic operations and delays"
    url: "https://aspm.faa.gov/opsnet/sys/main.asp"
    note: "The FAA's operational counts, including the ground-stop and airport-closure events that drive diversions in the first place."
humanWouldMiss: |
  The board at the gate and the DOT consumer report both answer the same narrow question — did the flight reach this airport within 15 minutes of schedule — and a diverted flight answers neither, because it never reached this airport at all. So it disappears from the percentage, not by oversight but by definition. Read all 1,734 of May's diversions at once and the month's worst travel outcomes surface as a shape the summary statistic is designed to exclude: a plane that flew, burned its fuel, set down in Oklahoma City, and either reached Dallas a median 3 hours 22 minutes late or, 196 times, never got there — none of it visible in the one number a traveler is told measures whether the flight was on time.
sources:
  - label: "DOT BTS — Reporting Carrier On-Time Performance (1987–present), May 2026 (611,735 scheduled flights; flight-level Diverted, DivReachedDest, DivArrDelay, DivAirportLandings, Div1Airport, Div1TotalGTime, ArrDel15 fields). All figures computed this run from the raw CSV."
    url: "https://transtats.bts.gov/PREZIP/On_Time_Reporting_Carrier_On_Time_Performance_1987_present_2026_5.zip"
    retrieved: "2026-08-09"
  - label: "DOT BTS — On-Time Performance database, field definitions (Diverted flag; DivReachedDest; DivArrDelay measured against schedule at the intended destination; DivAirportLandings; Div1TotalGTime = ground time at first divert airport; ArrDelay/ArrDel15 null for diverted flights)"
    url: "https://www.transtats.bts.gov/ONTIME/"
    retrieved: "2026-08-09"
  - label: "DOT BTS — Understanding the Reporting of Causes of Flight Delays and Cancellations (definitions distinguishing completed, cancelled and diverted flights)"
    url: "https://www.bts.gov/topics/airlines-and-airports/understanding-reporting-causes-flight-delays-and-cancellations"
    retrieved: "2026-08-09"
models: "Travel pod — Opus writer/editor · single-month DOT BTS pull, no statistical modeling (counts, means and medians are direct over the raw flight records; carrier and airport rates are per-10,000 operated flights/arrivals)"
publisherOfRecord: "Unruly Labs LP"
gradingScore: "PASS (18/21). Strip-the-data test: PASS — remove 1,734 / 196 / 202-min / 78.6% / DFW-282 / OKC-62 / AA-42.0 and nothing survives; the piece IS the pull. Uniquely-AI 3 (the diverted-flight cut — excluded from the on-time rate, mapped to divert airports across every record — is not a human-desk product), better-than-human 3, evidence-density 3, voice 3, closer 3, balance 2 (the 0.28%-is-noise counter steelmanned in Room-for-Disagreement), reader-checkability 3 (every figure re-pullable from the May-2026 CSV named in sources). Reports the arithmetic — the on-time rate excludes diversions; a hub concentrated at the closed airport diverts more — not motive. No listicle / press-release."
benchVerdict: "PASS — subjects are airports, carriers-in-aggregate and DOT's own recorded operational fields; no named private individuals; all figures timestamped to May 2026 data (retrieved 2026-08-09). Not a visa/entry piece; no advisory or entry-rule claim requiring a consulate line. Diversion outcomes reported as recorded, with the 'reached destination may undercount the passenger experience' and 'one-month weather draw' limitations disclosed. No affiliate links; no disclosure wall required."
crossLlmVerdict: "SKIPPED: browser locked (cross-LLM gate offline this session)"
---
