---
headline: "Seven MLB slates, 13,698 taken pitches: the two-strike accuracy edge is which pitches get taken, not how they get judged"
subhed: "One night suggested umpires bear down with two strikes. Across 94 games the advantage is pitch selection — and on the closest calls it reverses."
vertical: sports
published: 2026-08-08
facts: |
  On 2026-08-07 this ledger graded a single 15-game slate and found that home-plate umpires missed two-strike taken pitches far less often than other pitches — a result we flagged as a one-night hypothesis to re-test [verified]. We re-ran the identical method across the seven completed slates from 2026-08-01 through 2026-08-07: 94 games, all Final [verified]. For every taken pitch — a called strike or a called ball on which the batter did not swing — that carried a tracked location and the batter's personalized rulebook zone, we measured the call against that zone with a ball-radius allowance (a pitch is a strike if any part of the ball crosses it) [verified]. That is 13,698 taken pitches [verified]. Umpires called 894 of them incorrectly, an accuracy of 93.47% [verified]. The errors ran close to even by direction: 438 pitches outside the zone were called strikes, and 456 pitches inside it were called balls — a net of 18 across 13,698, inside the noise [verified]. Sorted by the count before the pitch, the raw pattern from the single slate held and grew: two-strike taken pitches were missed 3.57% of the time (107 of 2,998), against 7.36% on all other counts (787 of 10,700) — a 51.5% lower error rate [verified]. The decline is monotonic in strikes: 7.82% with no strikes (544 of 6,960), 6.50% with one (243 of 3,740), 3.57% with two [verified].
analysis: |
  What follows is our read of the pattern, not additional fact. Taken at the level a box score allows, the wider sample looks like a clean confirmation: the deeper the count, the sharper the plate. It is not that. Two-strike taken pitches are a different population of pitches. Only 8.0% of them are borderline — within a ball-radius (0.121 ft) of the rulebook edge — against 17.2% of taken pitches on other counts, and their median distance to the nearest edge is 0.693 ft versus 0.379 ft [verified]. With two strikes, batters lay off pitches that are clearly out of the zone and pitchers throw more waste; the mix shifts toward calls that are trivially correct [modeled]. Hold difficulty constant and the edge inverts. On borderline pitches — the calls that are actually hard — umpires missed 27.8% with two strikes (67 of 241) versus 19.7% on other counts (364 of 1,845) [verified]. On clear pitches they missed 1.45% versus 4.78% [verified]. The 51.5% headline advantage is composition: with two strikes the umpire is handed easier pitches, not judging the same pitches better [modeled]. The monotonic 0-1-2 decline is the same artifact viewed from the side — each added strike shifts the taken-pitch mix further out of the zone [modeled].
disagreement: |
  The strongest version of the "bears down" reading survives one number: on clear pitches, two-strike accuracy is genuinely better — 1.45% error versus 4.78%, a threefold gap that composition alone strains to explain [verified]. An advocate would argue umpires do concentrate late in the count, and the clear-pitch gap is the fingerprint. The record answers partway. "Clear" two-strike pitches are clearer still — the same location shift that thins the borderline bucket also pushes the easy pitches deeper out — so a lower error rate on them is expected without any change in judgment [modeled]. And where judgment is actually tested, the sign runs the other way at every reasonable threshold: two-strike error exceeds other-count error at a ball-quarter (22.1% vs 17.1%), a ball-radius (27.8% vs 19.7%), and a ball-third (23.0% vs 21.3%), converging to even only once the band widens to swallow easy pitches [verified]. The honest caveat is sample: the closest two-strike calls number in the low hundreds, so that reversal is directional, not settled, and seven slates is a fraction of a season [speculative]. The claim we will stand on is the weaker, firmer one: controlling for location, the two-strike accuracy edge disappears [verified].
viewFrom: |
  From the vantage of the automated ball-strike challenge system MLB has trialed, the finding relocates the stakes. The misses that a challenge would overturn are, by definition, the borderline ones — and that is exactly the bucket where the deep-count "advantage" is absent and, on the tightest calls, reversed [modeled]. A system marketed as fixing the blown two-strike take would be correcting the pitches on which the count offers umpires no help at all [speculative].
notable:
  - outlet: "Umpire Scorecards"
    title: "Per-game MLB umpire accuracy grades"
    url: "https://umpscorecards.com/"
    note: "The public project that grades one game at a time; our week-wide read is the same method, aggregated across 94 games."
  - outlet: "Baseball Savant"
    title: "Statcast search and the tracked strike zone"
    url: "https://baseballsavant.mlb.com/"
    note: "The pitch-tracking system whose coordinates and personalized zone underlie every number here."
  - outlet: "MLB.com"
    title: "Statcast glossary — the strike zone"
    url: "https://www.mlb.com/glossary/statcast/strike-zone"
    note: "Definition of the rulebook zone (szTop/szBot) we measured against, and of the ABS challenge system referenced above."
  - outlet: "FanGraphs"
    title: "Pitch framing and called-strike research"
    url: "https://www.fangraphs.com/"
    note: "Context on how much of a called strike belongs to the catcher and the pitch, not the umpire — the composition point, from the receiving side."
  - outlet: "Boston University"
    title: "Study of MLB umpires' strike-zone accuracy"
    url: "https://www.bu.edu/articles/2019/mlb-umpires-strike-zone-accuracy/"
    note: "Multi-season baseline for umpire ball-strike error rates, for comparison to a single week."
humanWouldMiss: |
  A human desk grades the one slate it watched and draws the natural lesson: umpires bear down with two strikes, because the deep-count numbers say so. Read seven slates the same way and the lesson collapses. The two-strike advantage is not how the pitches are judged but which pitches get taken — with two strikes the batter surrenders the clearly-bad ones and the umpire inherits an easier docket. Strip the composition away and on the genuinely close calls two-strike accuracy is no better, and by the tightest measure worse. The signal that only survives reading 94 box scores at once is the one no single box score contains: 8% of two-strike takes are borderline against 17% otherwise. The single-night finding was not wrong about the number; it was wrong about the cause, and only the wider record shows the difference.
sources:
  - label: "MLB Stats API — schedule, 2026-08-01 to 2026-08-07 (94 games, all Final)"
    url: "https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=2026-08-01&endDate=2026-08-07"
    retrieved: "2026-08-08T21:42Z"
  - label: "MLB Stats API — game live feed (pitch coordinates, personalized zone, call code); example gamePk 823349"
    url: "https://statsapi.mlb.com/api/v1.1/game/823349/feed/live"
    retrieved: "2026-08-08T21:42Z"
  - label: "Statcast strike-zone reference (Baseball Savant)"
    url: "https://baseballsavant.mlb.com/"
    retrieved: "2026-08-08T21:42Z"
models: "Opus/Sonnet/Haiku pod — Opus researcher + editor"
publisherOfRecord: "Ryan Dhookaran"
gradingScore: "20/21 — PASS. Uniquely-AI 3, Better-than-human 3 (corrects a single-slate causal read across 94 games), Evidence density 3, Voice 3, Closer 3, Balance 3 (clear-call counter steelmanned), Reader-checkability 2 (raw counts re-pullable from the feed; the difficulty decomposition requires re-running the classifier). No dimension at 0. Strip-the-data test: delete every figure and nothing coherent remains (PASS). Reproducing dataset+query: MLB Stats API feed/live over startDate/endDate 2026-08-01..07, taken pitches (call C/B) with tracked pX/pZ vs rulebook zone |pX|<=0.829 ft and szBot-0.121<=pZ<=szTop+0.121; pre-pitch count reconstructed per at-bat; borderline = distance to rulebook rectangle <= 0.121 ft."
benchVerdict: "PASS — no umpire named; aggregate accuracy deltas and a difficulty decomposition reported, no motive or bias claim; no named private individuals; no PED/conduct/injury speculation."
crossLlmVerdict: "SKIPPED: browser locked"
---
