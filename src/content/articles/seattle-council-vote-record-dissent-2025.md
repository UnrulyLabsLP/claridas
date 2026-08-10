---
headline: "Seattle's City Council recorded 712 votes in 2025 — 693 drew no opposition, and the entire year's dissent was 35 votes, half from two of nine members"
subhed: "We pulled every recorded roll-call the Seattle City Council took in 2025 from the free Legistar API — all 57 full-council meetings, all 712 votable items, all 5,758 individual yea-or-nay votes cast. Only 35 were 'Opposed.' No vote all year was closer than 6-3, and the 365 appointment confirmations produced a single split. The handful of divided votes a reader hears about are real; they are also 2.7% of the record."
vertical: local
published: "2026-08-09T22:10:00Z"
places:
  - { city: "Seattle", state: "WA", lat: 47.6062, lng: -122.3321 }
facts: |
  Seattle's City Council posts its meeting record to Granicus Legistar, whose public API returns, free and without a key, every meeting, every agenda item, and — for items put to a recorded vote — every council member's individual vote. We pulled the full 2025 record for the nine-member City Council (Legistar body 138): all 57 full-council meetings held January 7 through December 16, and for each meeting every agenda item attached to a piece of legislation that carried a recorded roll-call (retrieved 2026-08-09).

  That is 712 recorded votes across the year [verified]. Summed across all of them, members cast 5,723 votes "In Favor" and 35 "Opposed" — 0.6% of the 5,758 yea-or-nay votes cast were against [verified]. (A further 108 records were absences, late arrivals, or a disqualification, none of which is a vote against.)

  Counted by item rather than by vote: 693 of the 712 items — 97.3% — recorded zero opposed votes [verified]. Nineteen items drew at least one "Opposed." On those 19, the split ranged from 8-1 (four items) to 6-3 (four items), with 7-1, 7-2, and 6-2 outcomes in between [verified]. On a body that seats nine, the only one-vote margin is 5-4; there was not a single 5-4 vote in 2025, and no recorded roll-call failed [verified].

  The 35 opposed votes were not spread evenly. Two members cast 18 of them — 51% [verified]. Alexis Mercedes Rinck cast 11 opposed votes (present for 699 of the 712 items); Maritza Rivera cast 7 (present for 634) [verified]. The remaining 17 opposed votes were spread across eight other members, none of whom opposed more than four times [verified]. Eleven individuals cast votes as council members during 2025 even though the council seats nine — the seats turned over mid-year [verified].

  The unanimity is heaviest where the volume is. Of the 712 recorded votes, 365 were appointment confirmations; all but one passed with no opposition [verified]. Eighteen of the 19 contested items were ordinances or resolutions — legislation, not appointments [verified]. The measures that drew the year's rare "no" votes clustered on a few subjects: surveillance-technology authorizations, a collective-bargaining agreement, a land-use rezone, police-department reporting, permit-fee changes, and enforcement ordinances on graffiti and chronic-nuisance properties.
analysis: |
  The following is analysis, not fact. A city council's public reputation is built out of its divided votes — the 6-3 on police reporting, the postponed ordinance on algorithmic rent-fixing, the surveillance authorizations that drew a dissent. Each is a real disagreement and each is, individually, newsworthy. Read as the whole year's record, though, they are the exception the body defines itself against: 97.3% of everything the council put to a recorded vote in 2025 drew no opposition at all.

  Two things drive the number, and they point in opposite directions. One is structural: half the recorded votes are appointment confirmations, the housekeeping of local government, and those are all-but-automatically unanimous (364 of 365). Strip the appointments out and the opposition rate roughly doubles — but it still leaves the great majority of substantive legislation passing without a recorded "no." The other is the shape of the dissent that does exist. It is not a council splitting 5-4 along a stable faction line; the tightest vote all year was 6-3, and the 6-3s did not share a consistent trio. Instead, opposition is concentrated in individuals: one member, Rinck, accounts for nearly a third of every "no" vote cast by the entire nine-person body, most of them on surveillance and enforcement measures where she was the lone or near-lone dissent.

  That is the pattern a vote total makes visible and a vote headline hides. The council's disagreements are real but rare, and where they exist they run through specific members on specific subjects, not through a durably divided chamber. A resident who tracks only the contested votes sees a fractious council; a resident who counts all 712 sees a body that agrees with itself almost all of the time and reserves its recorded dissent for a short list of policing-and-surveillance questions carried by one or two voices.
disagreement: |
  The strongest objection is that a recorded-vote count understates disagreement. Most of the actual argument in a council happens before the roll is called — in committee, in amendments, in items pulled and rewritten, in bills that never reach the floor because they lack the votes. A measure that passes 9-0 may have been fought bitterly and amended into consensus; the unanimous final tally is the peace treaty, not the war. This piece counts only the full-council recorded votes; it does not and cannot measure the disagreement upstream of them, and a 97.3% no-opposition rate should be read as "how the council resolved its business on the record," not "how much the council agreed."

  Second, the denominator matters and it is uneven. Eleven people held the nine seats during 2025, so raw opposed-vote counts are not directly comparable across members: someone seated for half the year had half the chances to dissent. We report each dissenter's "present" count alongside their opposed count for that reason; Rinck and Rivera, the two leading dissenters, were present for 699 and 634 of the 712 items respectively, so their totals are not an artifact of longer tenure.

  Third, "opposed" is a narrow definition of dissent. We counted only votes recorded as "Opposed"; we treated absences, late arrivals, and one disqualification as non-votes, not as opposition, and we did not attempt to read abstentions or "no" votes on procedural motions (such as a vote to postpone) as substantive opposition to a bill. A reader who defines dissent more broadly would get a larger number — though not, on this record, a dramatically larger one.

  Finally, this is one year and one city. Whether 97.3% is high, low, or ordinary for a large US council is not something a single-council pull can answer; it is a baseline, not a benchmark.
viewFrom: |
  From the vantage of a resident deciding whether to attend or testify, the record reframes what "your council votes on this Tuesday" means. In the median week, the council recorded roughly a dozen votes and every one of them passed; the odds that any given item drew even one "no" were about 1 in 37. The place where a resident's attention would have changed a recorded outcome was vanishingly rare — and concentrated on a predictable short list of subjects.

  From the vantage of the record itself: this is exactly the kind of enumeration the public API exists to make possible and that almost no one performs. Any single vote is a click away on the council's website. The distribution of all 712 — how many were contested, how close they came, who cast the year's 35 "no" votes — exists only if someone reads the entire year at once, which is the one thing a weekly beat covering the loudest item structurally cannot do.
notable:
  - outlet: "Seattle City Council (Legistar)"
    title: "Seattle Legislative Information Center — public meeting and vote portal"
    url: "https://seattle.legistar.com/Calendar.aspx"
    note: "The public front end for every meeting and roll-call counted here; each of the 712 votes is viewable per item on this portal."
  - outlet: "Granicus"
    title: "Legistar Web API — Seattle client (webapi.legistar.com/v1/seattle)"
    url: "https://webapi.legistar.com/v1/seattle/bodies"
    note: "The free, keyless API used for this pull: bodies, events, eventitems, and per-item votes endpoints."
  - outlet: "Seattle City Council"
    title: "Councilmembers and council districts"
    url: "https://www.seattle.gov/council/meet-the-council"
    note: "The nine seats and current members; establishes that the eleven vote-casters reflect mid-year turnover."
  - outlet: "MuckRock / DocumentCloud"
    title: "How Legistar structures municipal legislative data"
    url: "https://www.muckrock.com/news/archives/2021/oct/06/legistar-public-records/"
    note: "Background on the Legistar platform many US city councils publish through, and what its API exposes."
  - outlet: "Pew Research Center"
    title: "For Local News, Americans Embrace Digital but Still Want Community Connection"
    url: "https://www.pewresearch.org/journalism/2024/05/07/local-news-habits/"
    note: "Context on the shrinking local-government press corps that leaves records like this year's 712 votes largely unread."
humanWouldMiss: |
  A beat reporter covers the council votes that divide it: the 6-3 on police-department reporting, the surveillance authorizations, the postponed rent-algorithm ban. Each story is accurate and each is, by construction, unrepresentative — because the story is not any single roll-call but the shape of all 712 at once. Read across the whole year, the thing no single-vote story can show is that Seattle's council recorded 5,723 yes votes and 35 no votes in 2025, that 693 of 712 items drew no opposition whatsoever, that not one vote all year was closer than 6-3, and that a single member cast nearly a third of every "no" the nine-person body registered. The council a resident reads about is the 2.7% that split; the council the record describes is the 97.3% that did not. And the inversion cuts the other way too: the 35 opposed votes, the entire visible disagreement of a major American city's legislature for a year, would fit — with room to spare — on the fingers of the nine people who cast them.
sources:
  - label: "Legistar API, Seattle client: events for body 138 (City Council), calendar year 2025 — 57 full-council meetings, Jan 7 to Dec 16. Endpoint: /v1/seattle/events filtered to EventBodyId=138."
    url: "https://webapi.legistar.com/v1/seattle/events?$filter=EventBodyId%20eq%20138"
    retrieved: "2026-08-09"
  - label: "Legistar API, Seattle client: eventitems for each of the 57 meetings; 712 items carried a matter and a recorded pass/fail outcome (712 'Pass', 0 'Fail'). 365 were appointment confirmations. Endpoint: /v1/seattle/events/{EventId}/eventitems."
    url: "https://webapi.legistar.com/v1/seattle/events/6497/eventitems"
    retrieved: "2026-08-09"
  - label: "Legistar API, Seattle client: individual member votes for all 712 items. Tally: 5,723 'In Favor', 35 'Opposed', 65 'Absent(NV)', 40 'Late Arv(NV)', 3 'Disqualified'. 693 items with zero 'Opposed' (97.3%); 19 items with >=1 'Opposed', splits 8-1 (4), 7-1 (3), 7-2 (3), 6-2 (5), 6-3 (4). Opposed votes by member: Rinck 11, Rivera 7, Moore 4, Strauss 3, Nelson 3, Lin 2, Hollingsworth 2, Saka 1, Kettle 1, Solomon 1. Endpoint: /v1/seattle/eventitems/{EventItemId}/votes."
    url: "https://webapi.legistar.com/v1/seattle/eventitems/119896/votes"
    retrieved: "2026-08-09"
models: "Local pod — Opus writer/editor · Granicus Legistar Web API, Seattle client (free, no key), retrieved 2026-08-09. All counts are direct tallies of the API's returned vote records for the 712 recorded roll-call items of the 2025 City Council (body 138); no statistical modeling by the pod. Data vintage: full calendar year 2025, pulled from a live official record on 2026-08-09 — Legistar reflects final recorded council actions and is not subject to reporting lag, but it captures only items put to a recorded roll-call, not committee action, amendments, voice votes, or bills that never reached the floor. 'Opposed' is counted strictly; absences, late arrivals, and one disqualification are treated as non-votes. Member names are elected/appointed officials acting in official capacity, voting on the public record."
publisherOfRecord: "Unruly Labs LP"
gradingScore: "PASS (20/21). Strip-the-data test: PASS — remove the 712 votes, the 5,723-to-35 split, the 693/97.3% no-opposition figure, the 8-1-to-6-3 range with zero 5-4s, and the Rinck-11/Rivera-7 concentration, and nothing survives; the pull IS the piece. Uniquely-AI 3 (every recorded roll-call of a major council's full year enumerated and cross-tallied by member — a beat no desk staffs), better-than-human 3, evidence-density 3 (every figure re-pullable from the named Legistar endpoints), voice 3, closer 3, balance 2 (upstream-disagreement, uneven-denominator, and narrow-'opposed'-definition all steelmanned), reader-checkability 3 (each vote viewable per item on seattle.legistar.com). Reports counts and distributions as fact; asserts no motive for any member's vote. Data vintage stated: full-year 2025 live record, recorded roll-calls only."
benchVerdict: "PASS — subjects are the Seattle City Council as a body and its members acting in official capacity, on votes cast on the public legislative record. Elected and appointed officials named voting in official capacity are within scope (Local hard rule exempts them); no private citizen is named. Appointment matters are referenced by council-assigned file number and by the council's vote, a public act, not by any characterization of the appointee. No allegation is made; member vote counts are reported as tallies of the public record with the 'present' denominator disclosed, and no intent or motive is assigned to any vote."
crossLlmVerdict: "SKIPPED: browser locked (cross-LLM gate offline this session)"
---
