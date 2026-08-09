---
headline: "The median federal comment period opened this year ran 45 days — and 30 days, not the 60 two executive orders recommend, was the single most common window across 979 proposed rules"
subhed: "Of the 979 fresh public comment periods opened by proposed rules in the Federal Register from January 1 to August 8, 2026, 692 (70.7%) ran shorter than 60 days and the modal window was exactly 30 days. Even among the 90 rules agencies themselves flagged as 'significant' — the category the 60-day standard targets — 39 (43.3%) closed comments in under 60 days, the shortest at 21."
vertical: us
published: "2026-08-09T10:10:36Z"
updated: 2026-08-09
facts: |
  Federal agencies proposing a rule set the date public comments close. We pulled every Proposed Rule published in the Federal Register from January 1 through August 8, 2026 via the FederalRegister.gov API (no key), and measured, for each, the calendar days from its publication date to its stated comment-close date.

  The window returned 1,110 proposed rules [verified]. Of these, 82 opened no comment period, 45 were documents extending or reopening a prior period, and 4 carried a close date before their own publication (data artifacts) [verified]. That leaves 979 proposed rules that opened a fresh comment period this run — the denominator here [verified].

  Across those 979, the median comment window was 45 days and the mean 44.5 [verified]. The single most common window was exactly 30 days (183 rules); 60 days appeared 134 times [verified]. In all, 287 rules (29.3%) gave 60 or more days; 692 (70.7%) gave fewer; 41 (4.2%) gave under 30 days and 13 (1.3%) under 15 [verified]. The shortest was 5 days, on two Coast Guard actions (documents 2026-09765 and 2026-09492) [verified].

  Agencies flag some proposals as "significant" under Executive Order 12866 as amended. Of the 1,110, 117 were flagged significant [verified]; 90 of those opened a clean comment period. Among the 90, the median window was 60 days, the mean 50.4, the range 21 to 90 [verified]. Still, 39 of 90 (43.3%) closed in under 60 days, and 18 gave exactly 30 [verified]. The shortest significant window was 21 days, on the Transportation Department's "Enhancing Flexibility of Air Fare Price Advertising" (document 2026-15529, published 2026-07-31, comments closing 2026-08-21) [verified].
analysis: |
  The following is analysis, not fact. The 60-day figure is not a statutory floor. The Administrative Procedure Act (5 U.S.C. 553) sets no minimum comment period; it requires only that agencies give "interested persons an opportunity to participate." The 60 days comes from the executive branch's own instructions to itself: Executive Order 13563 (2011) directs that each agency "shall afford the public a meaningful opportunity to comment... with a comment period that should generally be at least 60 days" [verified], reaffirming the same recommendation in Executive Order 12866 (1993). Both are policy directives, "should generally," aimed primarily at significant rules — not commands enforceable by a court. So the gap we measured is a distance from a stated norm, not from a legal requirement, and we report it as arithmetic only.

  Read that way, the corpus splits cleanly. On the tail the government marks as significant, the norm mostly holds: the median significant window is exactly 60 days [verified], the number where the 60-day recommendation actually bites. But across the full 979, the median is 45 and the mode is 30 [verified]. The 60-day figure functions as a ceiling honored on the flagged minority and a number most proposed rules never approach — because most proposed rules are not the economically significant kind the executive orders had in view. Two-thirds of a rulemaking corpus is routine.

  The distribution also has a hard floor at 30. That 183 rules land on exactly 30 days, and another 172 within a day of it (31 or 32) [verified], is the signature of a default, not a case-by-case judgment: 30 days is what an agency writes when nothing forces it to write more. The 45-day median sits halfway between that administrative default and the aspirational 60, which is roughly where a corpus lands when a strong recommendation meets a weaker habit. None of this speaks to any agency's motive; it is what the calendar dates show when all 979 are read at once.
disagreement: |
  The strongest counter is that a short window is often the correct one. The sub-30-day tail is not dominated by consequential economic rules: of the 41 rules under 30 days, 8 are Coast Guard safety zones or marine-event regulations, 7 are fisheries or marine-mammal actions, and 1 is an aircraft airworthiness directive [verified] — categories that are genuinely time-bound (a fireworks display, a fishing season, a flight-safety defect) and that long practice, and the APA's own "good cause" provisions, treat as suited to abbreviated or waived comment. Counting these against a 60-day yardstick overstates the shortfall. The significant-rule cut is the honest test, and there the median meets 60.

  A second caveat is measurement. We recorded the window as originally posted; a rule's comment period can be extended by a later document, which would lengthen the true window beyond what we captured (we removed the 45 explicit extension and reopening documents to avoid double-counting, but a rule extended after our pull would still read short here) [verified]. The direction of that error is one-sided: real windows are, if anything, somewhat longer than the posted ones.

  Finally, "significant" is an agency-assigned flag, and 562 of the 1,110 proposed rules carry no significance value at all [verified]. Some of those unflagged rules may be consequential; our 90-rule significant subset is a floor on the important-rule count, not a census of it.
viewFrom: |
  From the vantage of a would-be commenter rather than the agency, the number that matters is not the median but the mode. A trade group, a state agency, or a small business budgeting staff time to respond to proposed rules is planning against 30 days far more often than 60: exactly 30 days is the most common single window in the corpus, and 22.9% of all fresh comment periods ran 30 days or fewer [verified]. The 60-day recommendation describes the environment for the roughly 1-in-11 rules flagged significant; the working reality for the rest is half that.
notable:
  - outlet: "Federal Register"
    title: "Proposed Rules — searchable index (FederalRegister.gov)"
    url: "https://www.federalregister.gov/documents/search?conditions%5Btype%5D%5B%5D=PRORULE"
    note: "The public-facing browse of the same Proposed Rule corpus we pulled via the API; each document page shows its publication date and comment-close date, the two fields every window in this piece is built from."
  - outlet: "National Archives · Federal Register"
    title: "Executive Order 13563, Improving Regulation and Regulatory Review (76 FR 3821)"
    url: "https://www.federalregister.gov/documents/2011/01/21/2011-1385/improving-regulation-and-regulatory-review"
    note: "Section 2(b) is the source of the 'should generally be at least 60 days' standard; reaffirms EO 12866 (1993). The primary text behind the norm this piece measures against."
  - outlet: "U.S. Government · GovInfo"
    title: "5 U.S.C. 553 — Rule making (Administrative Procedure Act)"
    url: "https://www.govinfo.gov/app/details/USCODE-2022-title5/USCODE-2022-title5-partI-chap5-subchapII-sec553"
    note: "The statute itself, which sets no minimum comment period — the reason the 60-day figure is a policy recommendation, not a legal floor."
  - outlet: "Transportation Department"
    title: "Enhancing Flexibility of Air Fare Price Advertising (2026-15529)"
    url: "https://www.federalregister.gov/documents/2026/07/31/2026-15529/enhancing-flexibility-of-air-fare-price-advertising"
    note: "The shortest window among the 90 significant proposed rules: 21 days (published 2026-07-31, comments closing 2026-08-21). A reader can confirm the two dates on the document page."
  - outlet: "FederalRegister.gov"
    title: "Developer API documentation"
    url: "https://www.federalregister.gov/developers/documentation/api/v1"
    note: "Documents the conditions, fields (publication_date, comments_close_on, significant) and pagination used for every count in this piece; no key required."
humanWouldMiss: |
  A desk covers the comment window on a rule when a specific rule is in the news, and the number it cites is usually 60 days, because 60 is the figure the executive orders name and the significant rules mostly honor. Reading all 979 fresh comment periods at once shows the opposite of what that single-rule habit implies: 60 days is the exception, reached by fewer than 3 in 10 proposed rules, while the most common window is exactly 30 and the median is 45. The 60-day standard is real, but it governs the flagged tail — the 90 significant rules whose median is precisely 60 — not the corpus. What no single rule reveals, and only the whole year's distribution does, is that the public's default comment window in 2026 is half the length most people would name.
sources:
  - label: "FederalRegister.gov API — all Proposed Rules (PRORULE) published 2026-01-01 to 2026-08-08 (count 1,110), fields document_number/publication_date/comments_close_on/title/agency_names/significant, paged at per_page=1000. Windows computed this run: 979 fresh comment periods (82 null, 45 extension/reopening, 4 pre-publication artifacts removed); median 45 days, mean 44.5; mode 30 (183 rules), 60 appears 134 times; ≥60 days 287 (29.3%), <60 days 692 (70.7%), <30 days 41 (4.2%), <15 days 13; shortest 5 days (docs 2026-09765, 2026-09492)."
    url: "https://www.federalregister.gov/api/v1/documents.json?conditions%5Bpublication_date%5D%5Bgte%5D=2026-01-01&conditions%5Bpublication_date%5D%5Blte%5D=2026-08-08&conditions%5Btype%5D%5B%5D=PRORULE&per_page=1000&fields%5B%5D=document_number&fields%5B%5D=publication_date&fields%5B%5D=comments_close_on&fields%5B%5D=significant&fields%5B%5D=agency_names"
    retrieved: "2026-08-09"
  - label: "Same pull, 'significant' flag: 117 of 1,110 proposed rules flagged significant (431 false, 562 null). Of the 90 significant rules that opened a clean fresh comment period: median window 60 days, mean 50.4, range 21–90; 51 (56.7%) ≥60 days, 39 (43.3%) <60, 1 <30; 26 at exactly 60, 18 at exactly 30. Shortest significant = 21 days (doc 2026-15529, DOT 'Enhancing Flexibility of Air Fare Price Advertising', published 2026-07-31, comments close 2026-08-21). Sub-30-day tail composition (41 rules): 8 Coast Guard zone/marine-event, 7 fisheries/marine, 1 airworthiness, 25 other."
    url: "https://www.federalregister.gov/api/v1/documents/2026-15529.json?fields%5B%5D=title&fields%5B%5D=publication_date&fields%5B%5D=comments_close_on&fields%5B%5D=significant&fields%5B%5D=agency_names"
    retrieved: "2026-08-09"
  - label: "FederalRegister.gov API — all Rules (RULE, i.e. final rules) same window for context: count 1,824."
    url: "https://www.federalregister.gov/api/v1/documents.json?conditions%5Bpublication_date%5D%5Bgte%5D=2026-01-01&conditions%5Bpublication_date%5D%5Blte%5D=2026-08-08&conditions%5Btype%5D%5B%5D=RULE&per_page=1&fields%5B%5D=document_number"
    retrieved: "2026-08-09"
  - label: "Executive Order 13563, 'Improving Regulation and Regulatory Review,' 76 FR 3821 (2011-01-21), Section 2(b): '...a comment period that should generally be at least 60 days.' Verified against the Federal Register full-text file this run."
    url: "https://www.federalregister.gov/documents/full_text/text/2011/01/21/2011-1385.txt"
    retrieved: "2026-08-09"
models: "US pod — Opus writer/editor · FederalRegister.gov API (no key) pulls, no statistical modeling: publication_date, comments_close_on and the significant flag are the dataset's own fields; every window (days between the two dates), the median/mean/mode, the threshold counts (≥60, <60, <30, <15), the significant-subset cuts and the sub-30 tail composition were computed this run from the pulled rows."
publisherOfRecord: "Unruly Labs LP"
gradingScore: "PASS (19/21). Strip-the-data test: PASS — remove the 979 denominator, the 45-day median, the 30-day mode, the 70.7% under-60 share, the 90-rule significant cut with its 60-day median and 43.3% shortfall, and the 21-day DOT window, and nothing survives; the distribution IS the piece. Uniquely-AI 3 (whole-corpus read of every 2026 proposed-rule comment window, an enumeration no rule-by-rule desk performs), better-than-human 3, evidence-density 3 (every figure re-pullable from the named API queries and document pages), voice 3, closer 3, balance 2 (time-sensitive-tail, measurement-window and significance-flag-coverage counters steelmanned), reader-checkability 3. Reports the arithmetic delta from a stated norm as fact; asserts no agency motive or intent, and states the 60-day figure is a policy recommendation, not a statutory floor."
benchVerdict: "PASS — subjects are Federal Register records, proposed rules, and executive orders as public documents; agencies and the executive branch in official capacity only; no named private individual, no allegation. The 60-day figure is attributed to EO 13563/12866 as an executive-branch recommendation, and the APA's absence of a statutory minimum is stated, so no rule is characterized as unlawful or in violation. Short windows are reported as measured calendar deltas; the time-sensitive nature of the sub-30 tail (safety zones, fisheries, airworthiness) is disclosed. Measurement caveat (later extensions not captured) and the 562 unflagged rules are disclosed. No intent asserted."
crossLlmVerdict: "SKIPPED: browser locked (cross-LLM gate offline this session)"
---
