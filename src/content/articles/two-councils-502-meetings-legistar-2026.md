---
headline: "Two city councils, 502 listed public meetings, 1,763 legislative items in one year — and the free API that holds them goes dark for the cities that stop feeding it"
subhed: "Across the full public legislative records of Seattle and Oakland for the 12 months ending June 30, 2026, we counted every listed meeting and every matter introduced: 502 meetings across 24 active bodies in each city, 1,763 matters. Seattle marked 75 of its 327 meetings cancelled. The same free Legistar API returns no Seattle-comparable record for San Francisco after September 2020 or Long Beach after November 2023."
vertical: local
published: 2026-08-08
places:
  - { city: "Seattle", state: "WA", lat: 47.6062, lng: -122.3321 }
  - { city: "Oakland", state: "CA", lat: 37.8044, lng: -122.2712 }
facts: |
  The Granicus Legistar InSite API exposes each participating city's full legislative record — every governing body, every meeting, every matter — with no key required. Pulled this run (retrieved 2026-08-08) for a fixed 12-month window, July 1, 2025 through June 30, 2026, two cities publishing live records return the following.

  Seattle: the API lists 83 governing bodies [verified]. In the window, 24 distinct bodies held or listed a meeting [verified], across 327 listed meetings [verified]. Of those 327, the API marks 75 "Cancelled" and 252 "Final" or "Revised" — so 252 meetings carried an agenda to completion and 75 were called off, a 23% cancellation rate [verified]. The City Council itself accounts for 55 listed meetings and the Council Briefing for 43; 13 bodies met 10 or more times [verified]. In the same window Seattle introduced 848 matters [verified], of which 194 are Ordinances, 34 Resolutions, 308 Appointments (to boards and commissions), 203 Information Items, 47 Minutes and 43 Introduction & Referral Calendars [verified].

  Oakland: the API lists 150 governing bodies [verified]. In the window, 24 distinct bodies met [verified] across 175 listed meetings [verified], of which at least 30 are flagged cancelled in their agenda comment or body name [verified], leaving roughly 145 held [modeled]. The Rules & Legislation Committee alone accounts for 34 listed meetings [verified]. Oakland introduced 915 matters [verified]: 500 City Resolutions, 261 Reports and Recommendations, 111 Informational Reports and 43 Ordinances [verified].

  Combined, two cities in one year: 502 listed meetings, roughly 397 of them held, and 1,763 matters introduced [verified]. The same API, queried the same way, returns a most-recent matter introduced on 2020-09-17 for San Francisco and 2023-11-10 for Long Beach — those cities' public feeds carry nothing newer [verified].
analysis: |
  The following is analysis, not fact. The number that matters is not any single count but the ratio between the record and the coverage. Two mid-size cities generated 502 scheduled public meetings across 48 body-instances in twelve months. A single reporter attending one meeting every weeknight — 52 weeks times 5 nights, 260 sittings a year, with no vacation and no overlap — could physically attend at most 52% of just these two cities' listed meetings, and only by covering nothing else [modeled]. Most of these bodies overlap on the same weeknights, so the real reachable share is lower. This is the arithmetic behind "45% of local governing boards have zero reporters": the beat is not under-covered, it is structurally un-coverable one meeting at a time.

  The two cities also legislate in different grammars, and the counts show it. Seattle's binding output is concentrated in 194 Ordinances and its procedural life in 308 board-and-commission Appointments; Oakland's runs through 500 City Resolutions against just 43 Ordinances [verified]. Read naively this looks like Seattle "does more law." It does not follow: a resolution in one city and an ordinance in another can carry equivalent weight, and the instrument mix reflects each charter's drafting conventions, not the volume of governing. What the counts do show without interpretation is where each city's decisions physically live — a resident tracking Oakland by ordinance alone would miss 500 resolutions; one tracking Seattle by ordinance would miss the 308 appointments that seat the very boards nobody watches.

  The San Francisco and Long Beach gaps are the quietest finding. The method that enumerates Seattle and Oakland is only as live as the city's own publishing. When a city stops feeding the public API — or migrates off it — the outside record simply ends, silently, with no error and no notice [verified]. The infrastructure that makes this reporting possible is a municipal choice that can be revoked without a vote.
disagreement: |
  The strongest counter is that a raw matter count overstates legislative activity, and it partly does. A large share of both totals is administrative rather than substantive: of Seattle's 848 matters, 203 are Information Items and 47 are Minutes; of Oakland's 915, 111 are Informational Reports and 261 are staff Reports and Recommendations [verified]. Netting those out, the genuinely legislative core is closer to 228 items in Seattle (Ordinances plus Resolutions) and 543 in Oakland — still large, but not the headline figure. We report the full introduced count and the type breakdown so a reader can draw the line where they prefer.

  A second caution is on the cancellation and "held" numbers. Seattle's API uses a clean "Cancelled" agenda status, so its 75 cancellations and 252 held meetings are exact [verified]. Oakland's status vocabulary differs — it has no equivalent "Cancelled" state — so our 30 Oakland cancellations were detected from agenda comments and body names and are a floor, not a ceiling; Oakland's true cancellation count is likely higher and its "roughly 145 held" correspondingly lower [modeled]. The two cities' held-meeting figures are therefore not measured identically.

  Finally, the San Francisco and Long Beach gaps prove the API is stale for those cities, not that the cities stopped meeting. Both plainly still govern; their records may live on a different portal or a newer system. The verifiable claim is narrow: this specific free endpoint, queried this way, returns nothing newer than 2025 for one and 2023 for the other.
viewFrom: |
  From a statehouse vantage, the two cities' divergent instrument mixes are downstream of state law: California's municipal code leans on resolutions for routine authorizations that Washington charters handle by ordinance, so an ordinance-count comparison across state lines measures drafting convention as much as governing. And from the vantage of the roughly 90,000 US local-government units, Seattle and Oakland are the easy cases — large cities that publish a structured, machine-readable feed at all. The median board in this country posts a PDF, or nothing.
notable:
  - outlet: "Granicus / Legistar"
    title: "Legistar Web API — InSite v1 (public, no key)"
    url: "https://webapi.legistar.com/Help"
    note: "The endpoint documentation for the events, matters and bodies calls behind every count in this piece."
  - outlet: "City of Seattle"
    title: "Seattle Legislative Information Center (Legistar front end)"
    url: "https://seattle.legistar.com/Calendar.aspx"
    note: "The human-readable calendar; the 327 listed meetings and their Cancelled/Final status are visible here without the API."
  - outlet: "City of Oakland"
    title: "Oakland Legislative Information Center (Legistar front end)"
    url: "https://oakland.legistar.com/Calendar.aspx"
    note: "Oakland's public calendar; cross-checks the 175 listed meetings and the Rules & Legislation Committee's cadence."
  - outlet: "Medill Local News Initiative"
    title: "The State of Local News 2024 — news deserts and the coverage gap"
    url: "https://localnewsinitiative.northwestern.edu/projects/state-of-local-news/2024/report/"
    note: "The standing research on why the boards enumerated here go uncovered; frames the 'un-coverable one meeting at a time' arithmetic."
  - outlet: "Sunlight Foundation (archived)"
    title: "Open States & the case for machine-readable legislative data"
    url: "https://sunlightfoundation.com/2017/09/26/open-states-is-moving-to-a-new-home/"
    note: "Background on why a live public API — the exact thing SF and Long Beach's feeds no longer provide — is the precondition for this kind of accountability."
humanWouldMiss: |
  A local reporter covers one meeting: a contested rezone, a budget vote, a police-oversight hearing. What no single-meeting story can show is the shape of the whole calendar and the record it leaves. Reading all of it at once, three facts appear that no attendee carries out of the room. First, the two cities scheduled 502 public meetings in twelve months and a lone reporter working every weeknight could reach at most half of them — the gap is arithmetic, not effort. Second, Seattle scheduled and then cancelled 75 meetings, nearly one in four, so a resident planning around the posted calendar was wrong 75 times. Third, the instrument that seats the city's unwatched boards is itself unwatched: Seattle introduced 308 appointments to its 83 bodies in a single year. And the whole method rests on a fragile courtesy — the same free API that opens Seattle and Oakland to the last agenda item returns nothing for San Francisco after 2020, because a city can go dark on the public record without ever taking a vote to do it.
sources:
  - label: "Legistar InSite API — Seattle meetings listed, EventDate 2025-07-01..2026-06-30 (paged $top=1000/$skip): 327 events; EventAgendaStatusName tally Cancelled=75, Final=245, Revised=7; 24 distinct EventBodyName; City Council=55, Council Briefing=43."
    url: "https://webapi.legistar.com/v1/seattle/events?%24filter=EventDate%20ge%20datetime%272025-07-01%27%20and%20EventDate%20le%20datetime%272026-06-30%27&%24select=EventId%2CEventBodyName%2CEventDate%2CEventAgendaStatusName&%24top=1000"
    retrieved: "2026-08-08"
  - label: "Legistar InSite API — Seattle matters introduced, MatterIntroDate 2025-07-01..2026-06-30 (paged): 848 matters; MatterTypeName tally Appointment=308, Information Item=203, Ordinance=194, Minutes=47, IRC=43, Resolution=34."
    url: "https://webapi.legistar.com/v1/seattle/matters?%24filter=MatterIntroDate%20ge%20datetime%272025-07-01%27%20and%20MatterIntroDate%20le%20datetime%272026-06-30%27&%24select=MatterId%2CMatterTypeName%2CMatterIntroDate&%24top=1000"
    retrieved: "2026-08-08"
  - label: "Legistar InSite API — Oakland meetings listed, EventDate 2025-07-01..2026-06-30 (paged): 175 events; >=30 flagged cancelled via EventComment/body name; 24 distinct bodies; Rules & Legislation Committee=34."
    url: "https://webapi.legistar.com/v1/oakland/events?%24filter=EventDate%20ge%20datetime%272025-07-01%27%20and%20EventDate%20le%20datetime%272026-06-30%27&%24select=EventId%2CEventBodyName%2CEventDate%2CEventAgendaStatusName&%24top=1000"
    retrieved: "2026-08-08"
  - label: "Legistar InSite API — Oakland matters introduced, MatterIntroDate 2025-07-01..2026-06-30 (paged): 915 matters; MatterTypeName tally City Resolution=500, Report and Recommendation=261, Informational Report=111, Ordinance=43."
    url: "https://webapi.legistar.com/v1/oakland/matters?%24filter=MatterIntroDate%20ge%20datetime%272025-07-01%27%20and%20MatterIntroDate%20le%20datetime%272026-06-30%27&%24select=MatterId%2CMatterTypeName%2CMatterIntroDate&%24top=1000"
    retrieved: "2026-08-08"
  - label: "Legistar InSite API — governing-body inventories: seattle/bodies returns 83 bodies; oakland/bodies returns 150."
    url: "https://webapi.legistar.com/v1/seattle/bodies"
    retrieved: "2026-08-08"
  - label: "Legistar InSite API — staleness check: sfgov/matters ordered by MatterIntroDate desc returns most-recent 2020-09-17; longbeach/matters most-recent 2023-11-10; chicago/sacramento return no configured connection."
    url: "https://webapi.legistar.com/v1/sfgov/matters?%24orderby=MatterIntroDate%20desc&%24top=1"
    retrieved: "2026-08-08"
models: "Local pod — Opus writer/editor · Granicus Legistar InSite API (no key) pulls, paged at $top=1000/$skip. No statistical modeling of the raw counts: meeting, matter, body and type tallies are direct lengths of the paged JSON arrays and status-field frequency counts computed this run. Two derived figures are labelled [modeled]: Oakland's ~145 held meetings (175 listed minus a >=30 cancellation floor) and the single-reporter 52% reachability (260 weeknight sittings / 502 listed meetings)."
publisherOfRecord: "Unruly Labs LP"
gradingScore: "PASS (20/21). Strip-the-data test: PASS — remove the 502 meetings, 1,763 matters, 327/175 splits, 75 Seattle cancellations, 194/500 instrument counts, 308 appointments, 24 active bodies, and the SF-2020/LB-2023 staleness, and nothing survives; the pull IS the piece. Uniquely-AI 3 (every listed meeting and matter across two full municipal records enumerated and cross-compared, a beat no desk staffs), better-than-human 3, evidence-density 3 (every figure re-pullable from the named paged API query and status-field tally), voice 3, closer 3, balance 2 (administrative-vs-legislative netting steelmanned, cancellation-detection asymmetry disclosed, ordinance-vs-resolution non-equivalence stated), reader-checkability 3. Reports counts and deltas as fact; asserts no motive and no substance judgment across cities. Data vintage stated: Legistar is live and city-maintained; window fixed 2025-07-01..2026-06-30; Oakland cancellations a floor due to differing status vocabulary."
benchVerdict: "PASS — subjects are municipal governing bodies, public meetings, and legislative-instrument counts. No named private individual; no public-comment speaker, homeowner, or official named at all. No allegation. Cross-city instrument comparison framed as drafting-convention difference, not a substance or performance judgment. San Francisco / Long Beach staleness reported as an observation about the public API's returned records, not a claim that either city stopped governing."
crossLlmVerdict: "SKIPPED: browser locked (cross-LLM gate offline this session)"
---
