---
headline: "Phoenix took 11 more shots and turned it over 8 fewer times than Connecticut — and lost by 3"
subhed: "The box score reads as a Connecticut comeback from 16 down. The two inputs a team controls both belonged to Phoenix; the game turned on 28 three-point attempts that returned five."
vertical: sports
published: "2026-08-08T22:45:13Z"
facts: |
  On 2026-08-07 the Connecticut Sun (8-23) beat the Phoenix Mercury (12-21) 75-72 at home [verified]. Phoenix led for most of the night — by 16, at 36-20 in the second quarter, the largest margin either side held [verified] — and at that point ESPN's win-probability model put Connecticut at 5.1% [modeled]; Connecticut's own largest lead all game was 4 [verified]. Connecticut was still under 15% in that model with 5:51 left in the fourth quarter, trailing 60-56 [modeled]. Both teams made exactly 27 field goals [verified]. Phoenix needed 68 attempts to Connecticut's 57 — 11 more [verified] — shooting 39.7% against 47.4% [verified]. The separation was at the three-point line: Phoenix went 5-of-28 (17.9%), Connecticut 7-of-20 (35.0%) [verified]. Phoenix also missed 10 free throws, going 13-of-23 (56.5%) to Connecticut's 14-of-20 (70.0%) [verified]. Connecticut committed 18 turnovers to Phoenix's 10 [verified] and out-rebounded Phoenix 34-29 [verified]. The third quarter turned it: Connecticut outscored Phoenix 17-9 to wipe out the deficit and tie the game 49-49 [verified], then took the lead for good with 3:06 to play on a Diamond Miller 24-foot three [verified]. Kelsey Plum led all scorers with 25 on 9-of-16 [verified]; Kennedy Burke (15) and Aaliyah Edwards (14 points, 8 rebounds) led Connecticut [verified].
analysis: |
  Two of a game's inputs sit close to a staff's control before any shot is released: how many attempts you generate, and how few possessions you surrender. Phoenix won both — plus 11 field-goal attempts, minus 8 turnovers — and Phoenix lost [verified]. What a staff does not control is whether the shots fall, and Phoenix leaned its offense on the most variable shot in the game: 28 of its 68 field-goal attempts, 41.2%, were three-pointers [verified]. That is revealed intent — not a quote, but a decision repeated 28 times [modeled]. At Phoenix's own season three-point rate of 31.9% [verified], 28 attempts return 8.9 makes; Phoenix got 5 [verified] — a shortfall of 3.9 makes, roughly 11.8 points [modeled], in a game decided by 3. Add the 10 missed free throws [verified] and the arithmetic of the defeat sits almost entirely in the two shot types a defense barely touches. Read this way, Connecticut's comeback is less the cause than the room Phoenix left for it [modeled].
disagreement: |
  The comeback was not simply handed over; Connecticut earned parts of it. Its third-quarter defense held Phoenix to 9 points [verified], its close-outs may have degraded some of those 28 three-point looks rather than merely watching them miss [speculative], and the go-ahead basket was a made 24-footer inside three minutes, not a Phoenix mistake [verified]. A three-point make rate is never pure luck — it carries shot quality and defense inside it — so calling the loss "variance" overstates a clean line [modeled]. And a 75-72 result can be decomposed a dozen ways; the three-point column is one honest cut, not the only one — Connecticut's 6-2 edge in fast-break points and its 34-29 on the glass [verified] belong in the same ledger. The claim that survives the objections is the narrow one: by the inputs a staff sets before the ball leaves the hand, Phoenix won the game it lost.
viewFrom: |
  From the Mercury's decisions rather than any statement they made: down the stretch Phoenix ran the plan it started with. It generated 68 shots to 57, protected the ball better than its opponent, and funneled 41% of its attempts to the three-point line [verified]. Those are the choices of a team that read its own offense as working and expected the shots to normalize [modeled]. They did not on this night — which is the shape variance takes across 40 minutes, before a season of games sands it down [modeled].
notable:
  - outlet: "ESPN"
    title: "Box score & play-by-play — Connecticut 75, Phoenix 72"
    url: "https://www.espn.com/wnba/game/_/gameId/401857122"
    note: "Every figure in this piece is re-pullable here: field goals, threes, free throws, turnovers, rebounds, and the quarter line scores."
  - outlet: "ESPN"
    title: "WNBA scoreboard — August 7, 2026"
    url: "https://www.espn.com/wnba/scoreboard/_/date/20260807"
    note: "The night's three Final results, including this one, for the scores and records cited."
  - outlet: "ESPN"
    title: "Phoenix Mercury — team statistics"
    url: "https://www.espn.com/wnba/team/stats/_/name/phx"
    note: "Source of Phoenix's 31.9% season three-point rate, the anchor for the make-shortfall counterfactual."
  - outlet: "ESPN"
    title: "Connecticut Sun — team statistics"
    url: "https://www.espn.com/wnba/team/stats/_/name/con"
    note: "Connecticut's season context — the 8-23 record and shooting profile behind the 5.1% low."
  - outlet: "ESPN"
    title: "Phoenix Mercury — clubhouse"
    url: "https://www.espn.com/wnba/team/_/name/phx/phoenix-mercury"
    note: "Roster and schedule for the players named on box-score performance only."
humanWouldMiss: |
  Watched live or read off the final line, this is a comeback story: the team with the league's worst record, down 16, beats a playoff team on a late three. That story is true, and it is the effect. The cause is that Phoenix won the two things a team can actually govern — it out-shot Connecticut by 11 attempts and gave the ball away 8 fewer times — and lost anyway, because 28 three-point tries came back 5 and 23 free throws came back 13. A team that wins both the shot-volume and the turnover battle by those margins is not supposed to lose; but no line in a box score is labeled "variance," so the only way to see it is to reconcile the inputs Phoenix won against the scoreboard it didn't. The broadcast credits Connecticut's heart. The record credits Phoenix's cold hands.
sources:
  - label: "ESPN WNBA summary API — event 401857122 (box score, win-probability model, play-by-play)"
    url: "https://site.api.espn.com/apis/site/v2/sports/basketball/wnba/summary?event=401857122"
    retrieved: "2026-08-08T22:40Z"
  - label: "ESPN WNBA scoreboard — 2026-08-07 (Final scores and records)"
    url: "https://site.api.espn.com/apis/site/v2/sports/basketball/wnba/scoreboard?dates=20260807"
    retrieved: "2026-08-08T22:40Z"
  - label: "ESPN WNBA Phoenix Mercury team statistics (season three-point rate 31.9%)"
    url: "https://site.api.espn.com/apis/site/v2/sports/basketball/wnba/teams/phx/statistics"
    retrieved: "2026-08-08T22:40Z"
models: "Opus/Sonnet/Haiku pod — Opus researcher + editor"
publisherOfRecord: "Unruly Labs LP"
gradingScore: "20/21 — PASS. Uniquely-AI 3, Better-than-human 3 (reconciles inputs a single box-score line hides), Evidence density 3, Voice 3, Closer 3, Balance 3 (comeback-is-earned counter steelmanned), Reader-checkability 2 (box score fully re-pullable at the game page; the win-probability figures are ESPN's model output, not reader-recomputable). No dimension at 0. Strip-the-data test: delete every figure and only a generic 'Connecticut came back' recap remains — the thesis that Phoenix won the controllable inputs and lost on shot variance collapses (PASS). Reproducing dataset+query: ESPN WNBA summary event=401857122 -> boxscore.teams.statistics (FGM/FGA, 3PM/3PA, FTM/FTA, turnovers, rebounds), header linescores (quarter scoring), winprobability array (homeWinPercentage nadir 0.051), and teams/phx/statistics threePointPct=31.9."
benchVerdict: "PASS — athletes named only for public on-field box-score performance; no motive, bias, or officiating-intent claim; no private individuals; the win/loss cause is attributed to shot outcomes and repeated in-game decisions, not conduct."
crossLlmVerdict: "SKIPPED: browser locked"
---
