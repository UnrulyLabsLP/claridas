---
headline: "Nashville's 40-member Metro Council recorded 2,653 decisions in 2025 and voted down 3 — every one an edit to its own rulebook"
subhed: "We pulled all 27 Metropolitan Council meetings of calendar 2025 through the Granicus Legistar API — 3,440 agenda line-items, 2,653 with a recorded disposition. Exactly 3 failed on the floor, and all three were proposed amendments to the council's own Rules of Procedure (Rule 12, brought and beaten twice; Rule 29). Not one bill, resolution, appointment, or contract was voted down. What the council stopped, it deferred: 212 times across 137 matters, with three zoning ordinances held six meetings each."
vertical: local
published: "2026-08-11T07:15:09Z"
places:
  - { city: "Nashville", state: "TN", lat: 36.1627, lng: -86.7816 }
facts: |
  The Granicus Legistar InSite API exposes the full public legislative record of the Metropolitan Government of Nashville and Davidson County — every meeting, every agenda item, its matter file number, type, and the action the body took — with no key or login. Pulled this run (retrieved 2026-08-11) for the Metropolitan Council body over a fixed window — meetings dated January 1 through December 31, 2025 — the record returns 27 council meetings, from January 21 to December 16 [verified].

  Those 27 agendas carried 3,440 line-items. The council recorded a disposition on 2,653 of them; the remaining 787 carry no action field — agenda section headers, public hearings, reports, and items held without a recorded motion [verified]. Of the 2,653 acted items, exactly 3 failed [verified].

  All three failures were amendments to the council's own Rules of Procedure: a change to Rule 12, moved and defeated in one meeting and moved and defeated again in a later one, and a change to Rule 29 [verified]. No bill, resolution, appointment, contract, purchase, or grant on any 2025 Metro Council agenda was voted down on the floor [verified].

  The affirmative output was large. Resolutions — which take a single vote in Nashville — were adopted 749 times [verified]. Ordinances, which the Metropolitan Charter requires to clear three separate readings on three separate meeting dates before becoming law, moved through that sequence: 500 first readings, 487 second readings, and 479 third readings (each count includes the "as amended" variant) [verified]. Attrition across the three readings is small — 500 to 487 to 479 [verified].

  Where an item stopped, it stopped without a "no." The council deferred 212 times across 137 distinct matters [verified]. Of the 203 plain deferrals, 133 were bills, 44 resolutions, 18 appointments, and 8 rule amendments; a further 9 items were deferred indefinitely, and sponsors withdrew 41 [verified]. Deferral clustered rather than scattered: 92 matters were deferred once, 29 twice, 8 three times, 5 four times, and 3 — every one a Title 17 zoning ordinance — six times each (files BL2025-703, BL2025-704, and BL2025-727) [verified].

  One structural absence bears noting for reproducibility: every one of the 2,653 items with a recorded action carries a roll-call flag of 0 in the API. The only 25 entries the system flags for a roll call are the "Roll Call" attendance items that open each meeting — carrying no matter and no legislative action. The machine-readable record thus holds no member-by-member yes/no for any acted 2025 item; where a vote was contested — the three failed rule amendments among them — the individual tally appears only in the free-text minutes note, not as a queryable field [verified].
analysis: |
  The following is analysis, not fact. It assigns no motive to the council and no judgment to any single vote; the finding is one of the shape of a year's outcomes, legible only when all 27 agendas are read at once.

  A legislature's floor vote is, in the civics-class picture, the moment of decision — the place where a proposal is accepted or rejected. Nashville's 2025 record locates the decision almost everywhere but there. Of 2,653 recorded dispositions, 2,650 were some form of yes — adopted, passed, approved, confirmed, elected — and 3 were no. The three-reading requirement, written into the charter as three separate chances to reject an ordinance, rejected no ordinance at all in 2025; a bill that survived introduction cleared all three readings, with only a handful lost between them (500 to 487 to 479) [modeled].

  The operative filter, on this record, is not the vote but the deferral. An item a member wants to slow, renegotiate, or quietly end is held rather than defeated, and a held item leaves no recorded position for or against — the 212 deferrals and 9 indefinite deferrals are decisions that never register as a "no" [modeled]. That the most-deferred items were zoning ordinances — three of them held six meetings each — is consistent with land-use disputes being worked out through repeated postponement rather than a floor showdown [modeled]. The pattern points to a body whose contested business is resolved before or beside the recorded vote, not at it; it does not, on its own, establish why [modeled].

  The structured record's silence on member-level votes compounds the effect. With no roll call exposed for any of the 2,653 acted items — the only flagged roll calls are the meetings' attendance calls — the machine has no field from which to reconstruct how any of the 40 members voted on the 2,650 items that passed, only the record that they passed. The one place individual positions surface is the free text of the three failed rule amendments. The council's clearest recorded disagreement in 2025 was with itself.
disagreement: |
  The strongest counter is that a near-zero floor-rejection rate is not evidence of a rubber stamp. Most municipal business — grant acceptances, routine rezonings, purchases, board appointments, water-service agreements — is non-controversial by the time it reaches the floor, and in a council with standing committees the real scrutiny, and the real "no," happens in committee and in the negotiation behind a deferral, neither of which this dataset captures. A deferred bill is often being amended toward passage, not buried; a withdrawn bill may reflect a sponsor's own read of the room. On that account, deferral-not-rejection is how a functioning council does its work, and the composition reported here is a feature rather than a flaw.

  A second caution is about the charter itself. The three-reading rule and the single-vote resolution are the design; that ordinances pass all three readings is the pipeline working as written, not a lapse of scrutiny. And a council that holds an item for revision rather than killing it preserves the option to fix it — arguably a virtue, not a defect.

  Finally, the classification is bounded by what the field records. "Failed," "deferred," "withdrawn," and the reading actions are the API's own action labels, counted as given; but an action left blank (the 787 no-action items) may hide dispositions the clerk entered only in narrative minutes, and the absence of a roll-call flag does not prove no roll call was called — only that none is exposed as data. The counts of 3 failed and 212 deferred are exact to the action field; the reading that deferral is the council's substitute for rejection is an inference from those counts, reported as [modeled], not established as fact.
notable:
  - outlet: "Metropolitan Government of Nashville and Davidson County"
    title: "Metro Council — Legislative Information Center (Legistar)"
    url: "https://nashville.legistar.com/Calendar.aspx"
    note: "The human-facing portal for the exact record queried here; every 2025 meeting, agenda item, and action counted in this piece is browsable by date and file number behind this calendar."
  - outlet: "Nashville.gov — Office of the Metropolitan Clerk"
    title: "Legislation: ordinances and resolutions of the Metro Council"
    url: "https://www.nashville.gov/departments/metro-clerk/legislative"
    note: "The clerk's record that distinguishes an ordinance (three readings) from a resolution (one vote) — the charter design whose outcomes this piece enumerates."
  - outlet: "Nashville.gov — Metropolitan Council"
    title: "About the Council: 35 district members and five at-large"
    url: "https://www.nashville.gov/departments/council"
    note: "Source for the 40-member size — among the largest municipal legislatures in the United States — whose 2025 floor record is counted here."
  - outlet: "Metropolitan Council of Nashville and Davidson County"
    title: "2023–2027 Rules of Procedure of the Council (PDF)"
    url: "https://www.nashville.gov/sites/default/files/2026-05/Rules-of-Procedure-2023-2027-Amended-4-7-26-Updated-5-19-26.pdf"
    note: "The rulebook whose Rule 12 and Rule 29 were the council's only three floor rejections of 2025; the document the council voted, twice, not to amend."
  - outlet: "Medill Local News Initiative"
    title: "The State of Local News 2024"
    url: "https://localnewsinitiative.northwestern.edu/projects/state-of-local-news/2024/report/"
    note: "Why a council's full-year action pattern goes unremarked: no reporter reads all 27 agendas and 3,440 items, only the handful that make news."
humanWouldMiss: |
  A resident who follows the Metro Council through the news sees the exceptions: the zoning fight that packed a hearing, the bill that made a headline. What no single meeting shows is the shape of the whole year's decisions. Read across all 27 agendas and 3,440 items, the council's entire recorded repertoire of "no" in 2025 was three votes — and all three were cast against its own Rules of Procedure, one of them twice against the same proposed rule. Not one bill, resolution, appointment, or contract failed on the floor. The items the council returned to most were not marquee legislation but zoning ordinances, three of which it deferred through six meetings each before acting. The reason a single-meeting reporter does not see this is that in Nashville the floor vote is where things pass; the place where things stop is the deferral list — and the deferral list, unlike a defeat, records no ayes and nays.
sources:
  - label: "Granicus Legistar InSite API, client 'nashville', /v1/nashville/events filtered EventBodyName eq 'Metropolitan Council' and EventDate ge datetime'2025-01-01' and lt datetime'2026-01-01' — returns 27 meetings (2025-01-21 through 2025-12-16)."
    url: "https://webapi.legistar.com/v1/nashville/events?%24filter=EventBodyName+eq+%27Metropolitan+Council%27+and+EventDate+ge+datetime%272025-01-01%27+and+EventDate+lt+datetime%272026-01-01%27"
    retrieved: "2026-08-11"
  - label: "Same pull, /v1/nashville/events/{EventId}/eventitems for all 27 meetings, aggregated by EventItemActionName. Totals: 3,440 line-items; 2,653 with a recorded action; 787 with none. Action tally — adopted 749; passed on first reading 499 (+1 as amended = 500); passed on second reading 464 (+23 as amended = 487); passed on third reading 452 (+27 as amended = 479); deferred 203; approved 98; substituted 49; withdrawn 41; elected 17; nominated 15; deferred indefinitely 9; failed 3; amended 2; motion to defer failed 1. Failure rate 3/2,653 = 0.113%."
    url: "https://webapi.legistar.com/v1/nashville/events/2196/eventitems"
    retrieved: "2026-08-11"
  - label: "The 3 failed items (EventItemActionName = 'failed'), from the eventitems action text: 'Amendment to Rules of Procedure, Rule 12' (failed at meeting EventId 1994 and again at 2112) and 'Amendment to Rules of Procedure, Rule 29' (failed at 2113). All three carry the note '...failed by the following roll call vote', recorded only in free text; EventItemRollCallFlag = 0 on all 2,653 acted items (the only 25 items flagged 1 are meeting-opening 'Roll Call' attendance entries with no matter and no action attached)."
    url: "https://webapi.legistar.com/v1/nashville/events/2112/eventitems"
    retrieved: "2026-08-11"
  - label: "Deferral aggregation by EventItemMatterFile across the same 27 meetings: 212 deferral actions (203 'deferred' + 9 'deferred indefinitely') on 137 distinct matters. Times-deferred distribution: 92 matters once, 29 twice, 8 three times, 5 four times, 3 six times. The three deferred six times — BL2025-703, BL2025-704, BL2025-727 — are all Title 17 (zoning ordinance) amendments. Plain-deferral types: 133 Bill, 44 Resolution, 18 Appointment, 8 Rule Amendment."
    url: "https://webapi.legistar.com/v1/nashville/matters?%24filter=MatterFile+eq+%27BL2025-703%27"
    retrieved: "2026-08-11"
  - label: "Metropolitan Council size (40 members: 35 district + 5 at-large) — Nashville.gov, Metropolitan Council department page."
    url: "https://www.nashville.gov/departments/council"
    retrieved: "2026-08-11"
models: "Opus/Sonnet/Haiku pod"
publisherOfRecord: "Unruly Labs LP"
gradingScore: "PASS (19/21) — Uniquely-AI 3, Better-than-human 3, Evidence density 3, Voice 3, Closer 3, Balance 2, Reader-checkability 2. Data vintage: live legislative record (not a lagged survey); the Legistar action fields are current as retrieved 2026-08-11. Strip-the-data test: passes — remove the counts (3 failed, 212 deferred, 500/487/479 readings, 2,653 dispositions) and nothing remains. Central claim reproducible from /v1/nashville/events + /eventitems aggregated by EventItemActionName."
benchVerdict: "PASS — subjects are the Metropolitan Council as a body and re-pullable matter files (BL2025-703, Rule 12/29); no private citizen named; no council member named in the body; only officials in official capacity implied via the official minutes; no allegations, no motive asserted — deferral-as-filter is tagged modeled, not stated as intent."
crossLlmVerdict: "SKIPPED: browser locked"
---
