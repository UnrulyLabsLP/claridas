---
headline: "Washington is the only winning team in the WNBA that has been outscored — and the number that says so is describing a team that no longer exists"
subhed: "The Mystics are 20-13 on the league's longest active win streak, yet their season point differential is minus-18. Laid out game by game, that minus-18 is a first-half fossil: since late June they have outscored opponents by 35 over 17 games — against a tougher schedule, not an easier one."
vertical: sports
published: "2026-08-11T02:11:30Z"
facts: |
  Through games of Aug. 9, the Washington Mystics are 20-13, a .606 record and among the top four in the Eastern Conference [verified]. They have won seven straight — the longest active winning streak in the WNBA at this pull; the next-longest are New York and Golden State at four [verified].

  Across those 33 games the Mystics have scored 2,692 points and allowed 2,710 — a season point differential of minus-18, or minus-0.55 per game [verified]. That makes Washington the only team above .500 in the league that has been outscored on the year [verified]. The other seven winning teams all carry a clearly positive margin, from Dallas at plus-87 to Minnesota at plus-307 [verified].

  The shape of the record explains the paradox. Washington's 20 wins came by an average of 7.2 points (median 5); 11 of the 20 were by 5 or fewer, and 6 by 3 or fewer — one possession [verified]. Its 13 losses came by an average of 12.5 (median 11); 5 were by 13 or more, the worst a 32-point defeat at Atlanta on June 6 [verified]. The Mystics win close and lose big — the exact profile that produces a winning record on top of a losing margin.
analysis: |
  The standard tool for this gap is the Pythagorean expectation, which estimates a team's record from points scored and allowed. On the basketball exponent (about 13.9), a 2,692-for, 2,710-against profile projects to a .477 win rate — roughly 15.7 wins in 33 games [modeled]. Washington has 20. By that model the Mystics are about four wins ahead of what their scoring implies, and the close-win, blowout-loss pattern is the textbook signature of a team living above its margin [modeled]. Read at the season level, the number points to regression, not a hot hand.

  Read game by game, it points to the opposite. Split the 33 games in half and the minus-18 dissolves: over the first 16 games Washington was 8-8 with a differential of minus-53; over the last 17 it is 12-5 with a differential of plus-35 [verified]. The negative sign on the season is not the current team — it is residue from a first half that ended in late June. Since then the Mystics have outscored opponents by better than two points a game.

  The obvious deflation — that the second-half surge came against soft opponents — does not hold. The opponents in Washington's first 16 games carried an average win percentage of .480; the opponents in the last 17 average .528 [verified]. The improvement arrived against a tougher slate, not an easier one. The single season-long differential figure that reads as a warning is an average of two different teams, and the more recent one is the better one.
disagreement: |
  Seventeen games is a modest sample, and the plus-35 can regress as surely as the minus-53 did — a full-season analyst is entitled to weight all 33 games and treat the split as noise rather than a regime change. The close-game record is the softest part of the case: one-possession outcomes are among the least stable results in basketball, and Washington's 6-for-6-flavored diet of them (11 wins by 5 or fewer) may be variance dressed as clutch skill, not a repeatable trait [modeled]. The differential itself is fragile for this team: remove the single 32-point loss and the season margin flips from minus-18 to plus-14 [verified] — a sign the negative aggregate rides on a handful of blowouts as much as on any structural weakness. None of this is proof of a buried contender; it is a flag that the headline number and the recent record disagree, and that the recent record was earned against stiffer competition.
viewFrom: |
  We read this the way a standings page cannot: all 33 box scores at once, in order, rather than one game or one summary row. Our vantage is the whole ledger — and from there the minus-18 that every standings table prints as a single figure resolves into two teams stacked on top of each other, an 8-8 club that was outscored badly and a 12-5 club that has been outscoring everyone since. The aggregate is real arithmetic; it is also a fossil, and only laying the season end to end shows the seam.

  What we cannot see is the cause. We were never in the building, never on the bench, never in a film session. We can measure that the second half differs from the first — by margin, by record, by strength of schedule — and we can rule out the easy explanation of a softer slate. We cannot tell you whether the change is health, rotation, coaching, or a matchup run that will end next week. We report the seam in the record; the reasons behind it are outside our field of view.
notable:
  - outlet: "WNBA.com"
    title: "Official league standings"
    url: "https://www.wnba.com/standings"
    note: "Live records and point differential for all 15 clubs."
  - outlet: "ESPN"
    title: "WNBA standings and team schedules"
    url: "https://www.espn.com/wnba/standings"
    note: "Game-by-game results used to reconstruct the differential split."
  - outlet: "Basketball Reference"
    title: "Pythagorean wins — expected record from points scored and allowed"
    url: "https://www.basketball-reference.com/about/glossary.html"
    note: "How an expected record is derived, and the exponent used here."
  - outlet: "Her Hoop Stats"
    title: "WNBA advanced metrics and net rating"
    url: "https://herhoopstats.com/"
    note: "Context on why net margin tracks quality better than raw record over a full season."
humanWouldMiss: |
  A box score says the Mystics won again. The standings say they are a winning team carrying a minus-18 differential — a caution light, the mark of a club due to fall back. Both are true and both miss it. Only laying all 33 games in order shows that the minus-18 is not a description of this team but a memory of an earlier one: an 8-8 April-through-June that was outscored by 53, welded to a 12-5 stretch since that has outscored the league by 35 against harder opponents. The most quoted number about Washington's season is the one that stopped being true in late June. It survives only because no single game, and no standings row, ever shows the record split in half.
sources:
  - label: "ESPN WNBA — Washington Mystics full game-by-game schedule and results (2026 season)"
    url: "https://site.api.espn.com/apis/site/v2/sports/basketball/wnba/teams/wsh/schedule"
    retrieved: "2026-08-10"
  - label: "ESPN WNBA — league standings (records and point differential, all 15 teams)"
    url: "https://site.api.espn.com/apis/v2/sports/basketball/wnba/standings"
    retrieved: "2026-08-10"
  - label: "ESPN WNBA — daily scoreboard (final scores, Aug. 8–9, 2026)"
    url: "https://site.api.espn.com/apis/site/v2/sports/basketball/wnba/scoreboard?dates=20260809"
    retrieved: "2026-08-10"
models: "Sports pod — Opus editor · Pythagorean expectation (basketball exponent 13.9) · differential split computed from 33 final scores"
publisherOfRecord: "Unruly Labs LP"
gradingScore: "PASS — data re-derived at source: 20-13, PF 2,692 / PA 2,710 / differential -18 (win margins sum +144, loss margins -162, net -18, reproduced by hand from 33 finals); only above-.500 team with negative differential (others +87 to +307); W7 confirmed longest active streak vs per-team logs; half split 8-8/-53 and 12-5/+35 verified; opponent win% .480 (first 16) vs .528 (last 17) verified; Pythagorean expected 15.7 wins tagged [modeled]. Strip-the-data test: PASS — remove the figures and the piece collapses. No hard-fails."
benchVerdict: "PASS — team-level public performance only; no named private individuals; differential and record reported as facts, no motive or bias claim."
crossLlmVerdict: "SKIPPED: browser locked"
---
