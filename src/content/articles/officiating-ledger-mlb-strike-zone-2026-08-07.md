---
headline: "One MLB slate, 2,174 taken pitches: umpires were 93.65% right — and most accurate on the counts that end at-bats"
subhed: "The blown third strike is the call fans remember. Across every game on August 7, it was the call umpires missed least."
vertical: sports
published: "2026-08-08T20:30:18Z"
facts: |
  On 2026-08-07 the major leagues played a 15-game slate, all completed [verified]. We pulled the pitch-level record for every game from the MLB Stats API live feed and examined every taken pitch — a called strike or a called ball on which the batter did not swing — that carried a tracked location and the batter's personalized rulebook zone [verified]. That is 2,174 taken pitches [verified]. Measured against the rulebook zone with a ball-radius allowance — a pitch is a strike if any part of the ball crosses it — home-plate umpires called 138 of those pitches incorrectly, an accuracy of 93.65% [verified]. The errors ran close to even by direction: 74 pitches outside the zone were called strikes, and 64 pitches inside it were called balls [verified]. Accuracy varied by plate. Austin Jones (Cleveland at Chicago White Sox) missed 4 of 161 taken pitches, 97.52% [verified]. Manny Gonzalez (Athletics at Boston) missed 19 of 128, 85.16% — a 12.36-point spread between the night's most and least accurate plate [verified]. In that Boston game, 12 of the incorrect calls benefited the Athletics and 7 benefited the Red Sox [verified].
analysis: |
  What follows is our read of the pattern, not additional fact. The call a broadcast fixates on is the blown two-strike take — the pitch that ends, or should have ended, a plate appearance. The record for this slate points the other way. On two-strike counts, umpires missed 19 of 459 taken pitches, a 4.14% error rate; on every other count they missed 119 of 1,715, a 6.94% rate [verified]. One of the highest-leverage taken pitches in baseball was called wrong about 40% less often than the average taken pitch [modeled]. That is consistent with a plate that bears down as the count deepens: the pitch that decides the at-bat is the one the umpire is least likely to give away [speculative]. The direction of error offers a second, quieter reading. With 74 balls called strikes against 64 strikes called balls, this slate shows no meaningful tilt toward hitters or pitchers as a group — the net is 10 pitches across 2,174, inside the noise [modeled]. The variance that matters is not a league-wide lean; it is the 12.36-point gap between the best and worst plate on the same night, calling the same rulebook zone [verified].
disagreement: |
  The strongest counter to the two-strike finding: accuracy looks better there only because pitchers throw more clearly out-of-zone chase pitches with two strikes, and an easy pitch a foot off the plate is a trivial "ball." We tested it on this slate. Two-strike taken pitches sat a median 0.259 ft from the nearest zone edge versus 0.245 ft on other counts, and 48.6% fell within a ball-width of the edge versus 51.0% on other counts [verified]. That difference is small and does not account for a miss rate about 40% lower — the two-strike pitches are barely easier, yet called far better. The larger caveat is sample: one night, 15 games, 459 two-strike pitches [verified]. A single slate can bounce, and this is a hypothesis we will re-test daily, not a settled fact [speculative]. Our zone also uses a fixed ball-radius buffer and the feed's tracked coordinates, both of which carry small measurement error near the boundary [verified].
notable:
  - outlet: "Umpire Scorecards"
    title: "Per-game MLB umpire accuracy grades"
    url: "https://umpscorecards.com/"
    note: "The public project that grades one game at a time; our slate-wide read is the same method, aggregated."
  - outlet: "Baseball Savant"
    title: "Statcast search and the tracked strike zone"
    url: "https://baseballsavant.mlb.com/statcast_search"
    note: "The pitch-tracking system whose coordinates and personalized zone underlie every number here."
  - outlet: "MLB.com"
    title: "Statcast glossary — the strike zone"
    url: "https://www.mlb.com/glossary/statcast/strike-zone"
    note: "Definition of the rulebook zone (szTop/szBot) we measured against."
  - outlet: "FanGraphs"
    title: "Pitch framing and called-strike research"
    url: "https://www.fangraphs.com/"
    note: "Context on how much of a called strike belongs to the catcher, not the umpire."
  - outlet: "Boston University"
    title: "Study of MLB umpires' strike-zone accuracy"
    url: "https://www.bu.edu/articles/2019/mlb-umpires-strike-zone-accuracy/"
    note: "Multi-season baseline for umpire ball-strike error rates, for comparison to a single slate."
humanWouldMiss: |
  A human desk grades one game — the one it watched — and remembers the single call that turned it. Read all 15 plates from the same night together and the memorable call disqualifies itself: the two-strike take, the one the dugout screams about, is the pitch umpires get right most often. The variance that actually shapes at-bats is quieter and lives on the counts nobody replays — the 1-1 taken strike that makes it 1-2 instead of 2-1. Across 2,174 pitches, the miss you notice is the rare one; the 119 misses that bend plate appearances sit on counts no camera lingers on.
sources:
  - label: "MLB Stats API — schedule, 2026-08-07 (15 games, all Final)"
    url: "https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=2026-08-07"
    retrieved: "2026-08-08T20:26Z"
  - label: "MLB Stats API — game live feed (pitch coordinates, personalized zone, call code); example gamePk 823349"
    url: "https://statsapi.mlb.com/api/v1.1/game/823349/feed/live"
    retrieved: "2026-08-08T20:26Z"
  - label: "Statcast strike-zone reference (Baseball Savant — Statcast Search)"
    url: "https://baseballsavant.mlb.com/statcast_search"
    retrieved: "2026-08-08T20:26Z"
models: "Opus/Sonnet/Haiku pod — Opus researcher + editor"
publisherOfRecord: "Unruly Labs LP"
gradingScore: "20/21 — PASS. Uniquely-AI 3, Better-than-human 3, Evidence density 3, Voice 3, Closer 3, Balance 2, Reader-checkability 3. No dimension at 0. Strip-the-data test: removing every figure collapses the piece to nothing (PASS). Reproducing dataset+query: MLB Stats API feed/live, taken pitches (call C/B) vs rulebook zone |pX|<=0.829 ft and szBot-0.121<=pZ<=szTop+0.121."
benchVerdict: "PASS — umpires named only for on-field public performance; deltas/predictiveness reported, no motive or bias claim; no named private individuals; no PED/conduct/injury speculation."
crossLlmVerdict: "SKIPPED: browser locked"
---
