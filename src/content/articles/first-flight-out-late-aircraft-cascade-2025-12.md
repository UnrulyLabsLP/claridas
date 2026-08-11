---
headline: "December's 5 a.m. departures arrived on time 87.7% of the time; 7 p.m. departures, 64.6% — and half the evening's delay was inherited, not made"
subhed: "The advice to book the first flight of the day is folklore with a mechanism. Across all 571,924 arrivals the U.S. Department of Transportation logged in December, weather stayed a flat ~6–9% of delay minutes from dawn to midnight. What actually collapsed the on-time rate through the day was the late-aircraft cascade: 13% of the delay minutes on early-morning flights, 49% by evening — per the carriers' own filings."
vertical: travel
published: "2026-08-08T22:16:12Z"
facts: |
  The U.S. Department of Transportation's on-time database for December 2025 — the most recent month posted (file dated 2026-03-20) — records 582,304 scheduled domestic flights by the reporting carriers. Of these, 9,001 were cancelled (1.55%) and 1,379 diverted, leaving 571,924 operated flights with a recorded arrival-delay status [verified]. DOT counts a flight "on time" if it arrives less than 15 minutes after schedule; by that definition 73.2% of December's arrivals were on time [verified].

  That system-wide average hides a steady decline across the operating day. Grouped by each flight's scheduled departure hour, the on-time arrival rate falls almost monotonically from the first bank to the evening peak: 5 a.m. departures arrived on time 87.7% of the time, 6 a.m. 84.5%, 7 a.m. 82.1%, 9 a.m. 77.8%, noon 73.2%, 3 p.m. 68.5%, 6 p.m. 65.2%, and 7 p.m. 64.6% — the day's trough — before recovering as volume thins after 9 p.m. [verified]. Consolidated, flights scheduled 5–6 a.m. arrived on time 85.4% of the time and ran a mean arrival delay of 13.9 minutes; flights scheduled 6–8 p.m. arrived on time 64.9% of the time with a mean arrival delay of 27.4 minutes — a 20.5-percentage-point gap on the same runways, in the same month [verified].

  DOT also files a cause for every arrival 15 or more minutes late, split across five categories. Across all of December, late-aircraft (a delay inherited because the inbound aircraft or crew arrived late) accounted for 41.1% of all delay minutes — the single largest cause — ahead of air-carrier operations (33.3%), the National Aviation System (19.1%), weather (6.4%) and security (0.2%) [verified]. That mix is not stable through the day. On the 5–6 a.m. flights, late-aircraft was 12.9% of delay minutes and air-carrier causes 55.3%; on the 6–8 p.m. flights, late-aircraft rose to 49.1% while air-carrier fell to 28.5% [verified]. Weather barely moved — 8.7% of early-morning delay minutes, 6.4% in the evening [verified].
analysis: |
  The following is analysis, not fact. The daily on-time curve is not a weather curve. Weather held near a flat 6–9% of delay minutes at every hour we measured; if storms drove the collapse from 87.7% to 64.6%, weather's share would climb through the day, and it does not [verified]. The variable that actually tracks the decline is the late-aircraft category, which nearly quadruples from morning to evening — 12.9% to 49.1% of delay minutes [verified].

  Read across all 571,924 arrivals, that is a cascade, and its shape is mechanical [modeled]. The first bank of the day launches from aircraft that sat overnight: there is no earlier flight to be late, so the late-aircraft category is structurally near-empty at 5 a.m. Every subsequent bank inherits whatever lateness accumulated ahead of it — a delayed 8 a.m. turn becomes the late aircraft for an 11 a.m. departure, which becomes the late aircraft for a 2 p.m. one. By evening, roughly half of all delay minutes are not being generated fresh; they are being passed down the schedule [modeled]. The folk advice to take the first flight out is, in the data, advice to board an aircraft before the day's backlog has had time to reach it.

  This also reframes what "the airline's fault" means. The morning's delays are dominated by air-carrier and NAS causes — 55.3% carrier at 5–6 a.m. — which are original events happening in real time [verified]. The evening's delays are dominated by inheritance. A 7 p.m. passenger whose flight is 40 minutes late is, on the balance of the December record, more likely absorbing a delay created hours earlier on an aircraft they never boarded than one originating at their own gate [modeled]. The single most useful number for that passenger is not the route's published on-time rate; it is the hour they chose to leave.
disagreement: |
  The strongest counter is that late-aircraft is a residual, not a root cause. A delay coded late-aircraft was itself created somewhere upstream — by weather, congestion, or an operational problem earlier in the day — so the evening's 49.1% late-aircraft share does not mean 49.1% of evening delay was avoidable airline error [verified]. It means the evening inherits the whole day's accumulated trouble, whatever first caused it. Attributing the evening collapse to any single actor over-reads the category.

  Three more cautions. December is one winter month with holiday-peak volumes and cold-weather disruption; the level of the curve is seasonal even if the dawn-to-dusk shape is structural, and a July pull could sit lower or higher [speculative]. On-time is measured against each carrier's own schedule, and carriers can pad evening block times differently than morning ones, which would flatter or penalize particular hours in ways this single-month cut cannot fully separate [speculative]. And the recovery after 9 p.m. — on-time climbs back toward 77% near midnight as the schedule empties — shows the effect is an evening-peak phenomenon, not a simple "later is always worse" rule [verified]. The honest claim is a large, cause-decomposed daily cascade in one month, not a verdict on any airline's year.
viewFrom: |
  This decomposition exists only because U.S. law compels flight-level cause reporting. DOT requires carriers to file a delay cause for every late arrival, which is what lets anyone split the day's delay minutes into original versus inherited and watch the cascade build hour by hour. Most aviation authorities publish nothing at this granularity: Europe's network manager, Eurocontrol, reports punctuality and delay causes in aggregate rather than as a re-pullable flight-level ledger, so the same "is this delay yours or the schedule's?" question cannot be answered there from open data. The pattern is almost certainly global; the visibility into it is a quirk of one country's disclosure rules.
notable:
  - outlet: "Bureau of Transportation Statistics"
    title: "On-Time Performance data (TranStats)"
    url: "https://www.transtats.bts.gov/ONTIME/"
    note: "The primary portal for the flight-level on-time, delay and cause records used here."
  - outlet: "Bureau of Transportation Statistics"
    title: "Understanding the Reporting of Causes of Flight Delays and Cancellations"
    url: "https://www.bts.gov/topics/airlines-and-airports/understanding-reporting-causes-flight-delays-and-cancellations"
    note: "Defines the five cause categories, including Late-Aircraft, that the airlines file against and that this analysis decomposes."
  - outlet: "Bureau of Transportation Statistics"
    title: "Airline On-Time Statistics and Delay Causes (dashboard)"
    url: "https://www.transtats.bts.gov/ot_delay/ot_delaycause1.asp"
    note: "BTS's own summarized view of delay and cancellation causes by carrier and airport."
  - outlet: "U.S. Department of Transportation"
    title: "Air Travel Consumer Report"
    url: "https://www.transportation.gov/airconsumer/air-travel-consumer-reports"
    note: "DOT's monthly consumer-facing report on airline on-time and cancellation performance."
humanWouldMiss: |
  A traveler experiences a delay one flight at a time, at one gate, at one hour. Reading all 571,924 December arrivals at once shows the thing no single gate reveals: the delay on a 7 p.m. departure is, about half the time, not being made at that gate — it is being handed down the schedule from aircraft that fell behind hours earlier and never recovered. Weather, the cause passengers most expect, is a nearly flat 6–9% of delay minutes from the first flight to the last. The daily collapse in reliability, from 87.7% on time at dawn to 64.6% at the evening peak, is overwhelmingly a story of inheritance, not of that day's sky. The most useful number in domestic air travel is not a route's on-time rate; it is the hour of departure, because that hour is a proxy for how much of the day's accumulated lateness has had time to reach your aircraft.
sources:
  - label: "DOT BTS — On-Time Reporting Carrier On-Time Performance, December 2025 (582,304 scheduled flights; 571,924 operated arrivals; flight-level scheduled-departure-time, arrival-delay and delay-cause records). All figures computed this run from the raw CSV: on-time rates and delay-cause shares grouped by scheduled departure hour."
    url: "https://transtats.bts.gov/PREZIP/On_Time_Reporting_Carrier_On_Time_Performance_1987_present_2025_12.zip"
    retrieved: "2026-08-08"
  - label: "DOT BTS — Understanding the Reporting of Causes of Flight Delays and Cancellations (definitions of the Late-Aircraft, Air-Carrier, NAS, Weather and Security delay categories decomposed above)"
    url: "https://www.bts.gov/topics/airlines-and-airports/understanding-reporting-causes-flight-delays-and-cancellations"
    retrieved: "2026-08-08"
models: "Travel pod — Opus writer/editor · single-month DOT BTS pull, no statistical modeling (on-time rates and cause shares are direct counts and minute-sums grouped by scheduled departure hour)"
gradingScore: "PASS (18/21). Strip-the-data test: PASS — remove the 87.7%-vs-64.6% / 20.5-point / 41.1%-late-aircraft / 12.9%-to-49.1% / flat-6-9%-weather figures and nothing survives; the piece IS the pull. Uniquely-AI 3 (hour-by-hour decomposition of 571,924 arrivals), better-than-human 3, evidence-density 3, voice 3, closer 3, balance 2 (late-aircraft-is-a-residual and seasonality steelmanned in Room-for-Disagreement), reader-checkability 3 (every figure re-pullable from the Dec-2025 CSV named in sources). Reports the DOT-filed cause-minute decomposition, not motive. No listicle / press-release."
benchVerdict: "PASS — subjects are aggregate flight records and DOT's own filed delay-cause categories; no named private individuals; all figures timestamped to December 2025 data (retrieved 2026-08-08); not a visa/entry piece, no pricing. Late-aircraft framed as an inherited/residual category per DOT's own definition, with that limitation disclosed. No affiliate links."
crossLlmVerdict: "SKIPPED: browser locked (cross-LLM gate offline this session)"
publisherOfRecord: "Unruly Labs LP"
affiliateDisclosure: "This article contains no affiliate links. Claridas earns nothing from any carrier or booking service named here."
---
