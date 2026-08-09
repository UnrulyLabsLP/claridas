---
headline: "The Barrels That Vanish at the Border: Reading Iran's War Economy Through the Holes in the World's Trade Ledger"
subhed: "China says it bought billions of kilograms of crude 'from Malaysia' — several times more than Malaysia sells to the entire planet. The missing origin is printed, free, in the UN's own database. You do not need a spy. You need a calculator."
vertical: world
published: 2026-08-09
facts: |
  China's own trade record (UN Comtrade, HS 2709 crude) shows it imported 46,939,955,132 kg of crude "from Malaysia" in 2023, a primaryValue of $28,611,452,764 [verified]. Malaysia's own Comtrade record shows total crude (HS 2709) exports to the ENTIRE world in 2023 of 10,367,873,490 kg (the all-modes motCode=0 row) — so China alone claims 4.53x Malaysia's whole global crude export [verified]. Over the same window, China's directly-recorded crude imports from Iran in Comtrade fell from 3,918,976,000 kg (2020) to 780,392,000 kg (2022) to zero recorded rows (count:0, data:[]) in 2023 and 2024 [verified]. The "Malaysian" figure kept climbing — to 70,157,360,000 kg in 2024; the 2020 China-from-Malaysia figure was 12,463,031,000 kg against an 852,349,000 kg Malaysian-to-China report, a 14.6x bilateral mirror gap [verified]. EIA reports Malaysia's petroleum-and-other-liquids production declined to 597,000 b/d by 2023 as its fields matured — meaning China's "Malaysian" crude imports exceeded Malaysia's entire crude oil production outright [verified].
analysis: "This is a mirror-statistics investigation: the load-bearing evidence is the arithmetic gap between two free, self-reported trade ledgers (China's and Malaysia's, via UN Comtrade), cross-checked against a free production ceiling (EIA) and a relabeling narrative EIA states in its own words. The subtraction — China-reported 'Malaysian' crude minus Malaysia's real production/exports — yields a volume the same order of magnitude as the Iranian barrels that vanished from China's Iran ledger. Vessel-tracking corroboration (Kpler-attributed) and the shadow-fleet/insurance leg are directional, attributed, not free-reproducible, and flagged as such. No partisan valence: the piece reports documented flows and documented harm."
disagreement: "Volumes vary by basis and source. EIA's Chinese-customs crude figure (~1.1M b/d for 2023) is broader/differently-averaged than the crude-only ~943k b/d that falls out of the annual Comtrade HS-2709 record; both dwarf Malaysian production. Kpler transshipment figures (~670k b/d 2023, ~800k b/d 2024) and export totals (~1.52M b/d for 2024) are commercial, attributed, and vary by methodology. Shadow-fleet counts range from ~1,000 to ~1,900 depending on source and origin scope. The UK's Maritime Mutual designation is framed under the Russia sanctions regime even though the underlying reporting covered both Iranian and Russian cargoes."
notable:
  - outlet: "U.S. Energy Information Administration"
    title: "China imported record amounts of crude oil in 2023 (Today in Energy)"
    url: "https://www.eia.gov/todayinenergy/detail.php?id=61683"
    note: "States China imported 54% more crude (1.1M b/d) from Malaysia in 2023 than 2022, exceeding Malaysia's total production, and that analysts believe Iranian oil was relabeled as Malaysian, UAE and Omani origin."
  - outlet: "U.S. Energy Information Administration"
    title: "Malaysia Country Analysis Brief (Last Update Nov 12, 2024)"
    url: "https://www.eia.gov/international/analysis/country/MYS"
    note: "Malaysia's petroleum-and-other-liquids production declined to 597,000 b/d by 2023 due to maturing fields — the free production ceiling the trade cannot physically meet."
  - outlet: "Reuters"
    title: "Special Report: How a New Zealand insurer became a linchpin of the shadow fleet (Oct 28, 2025)"
    url: "https://www.reuters.com/investigates/"
    note: "Identified Maritime Mutual as having insured almost one in six sanctioned shadow-fleet tankers; vessels it insured carried at least $18bn of Iranian oil since 2018. UK sanctioned the entity Feb 24, 2026."
  - outlet: "Iran International"
    title: "China's 'Malaysian' oil imports hit record, ~3x Malaysia's output (Aug 28, 2024)"
    url: "https://www.iranintl.com/en"
    note: "Chinese-customs 'Malaysian' crude peaked at 1.53M b/d in July 2024 — ~3x Malaysia's total oil production and a 12-fold rise since July 2018. Also carries the Kpler ~800k b/d transshipment figure."
  - outlet: "Foundation for Defense of Democracies"
    title: "China Is Supercharging Iran's Sanctions Evasion Strategy (Oct 10, 2025)"
    url: "https://www.fdd.org/analysis/"
    note: "Details the ~$8.4bn 2024 oil-for-infrastructure barter network (Chuxin mechanism, Sinosure backing) built to keep Iranian oil proceeds off dollar and European clearing."
  - outlet: "Council of the European Union"
    title: "EU consolidated sanctions list / shadow-fleet vessel designations"
    url: "https://data.europa.eu/data/datasets/consolidated-list-of-persons-groups-and-entities-subject-to-eu-financial-sanctions"
    note: "Free authoritative register; nearly 600 vessels listed by December 2025, predominantly Russia-linked with Iranian-linked tonnage increasingly added."
  - outlet: "UN Comtrade"
    title: "Public preview API — HS 2709 crude, reporter/partner mirror queries"
    url: "https://comtradeapi.un.org/public/v1/preview/C/A/HS?reporterCode=156&period=2023&partnerCode=458&cmdCode=2709&flowCode=M"
    note: "The primary, free, one-line-reproducible source of the entire finding. China-from-Malaysia = 46,939,955,132 kg (2023); Malaysia-to-world = 10,367,873,490 kg."
humanWouldMiss: "The single most important methodological trap: reading Malaysia's export figure from the per-transport-mode rows and SUMMING them, which double-counts to ~20.7B kg and halves the apparent scandal. The motCode=0 (all-modes) row already equals the sum of sub-modes (10,362,847,100 + 5,026,290 + 100 = 10,367,873,490). A human skimming the JSON would likely add the rows and quietly understate the gap. The correct read makes the impossibility larger, not smaller. Also easy to miss: the 2020 caveat — the anomaly is visible in 2020 only in the China-Malaysia bilateral mirror, not yet against Malaysia's global total, because the trade had not yet outgrown Malaysia's total book. It decisively does by 2023."
sources:
  - label: "UN Comtrade preview API — China imports of crude (HS 2709) from Malaysia, 2023"
    url: "https://comtradeapi.un.org/public/v1/preview/C/A/HS?reporterCode=156&period=2023&partnerCode=458&cmdCode=2709&flowCode=M"
    retrieved: "2026-08-09"
  - label: "UN Comtrade preview API — Malaysia crude (HS 2709) exports to world, 2023"
    url: "https://comtradeapi.un.org/public/v1/preview/C/A/HS?reporterCode=458&period=2023&partnerCode=0&cmdCode=2709&flowCode=X"
    retrieved: "2026-08-09"
  - label: "EIA — China imported record amounts of crude oil in 2023 (Today in Energy, Apr 16, 2024)"
    url: "https://www.eia.gov/todayinenergy/detail.php?id=61683"
    retrieved: "2026-08-09"
  - label: "EIA — Malaysia Country Analysis Brief (Last Update Nov 12, 2024)"
    url: "https://www.eia.gov/international/analysis/country/MYS"
    retrieved: "2026-08-09"
  - label: "Reuters — Special Report on Maritime Mutual and the shadow fleet (Oct 28, 2025)"
    url: "https://www.reuters.com/investigates/"
    retrieved: "2026-08-09"
  - label: "Iran International — 'Malaysian' oil imports & Kpler transshipment figures (2024)"
    url: "https://www.iranintl.com/en"
    retrieved: "2026-08-09"
  - label: "FDD — China Is Supercharging Iran's Sanctions Evasion Strategy (Oct 10, 2025)"
    url: "https://www.fdd.org/analysis/"
    retrieved: "2026-08-09"
  - label: "Council of the EU — consolidated sanctions list (data.europa.eu)"
    url: "https://data.europa.eu/data/datasets/consolidated-list-of-persons-groups-and-entities-subject-to-eu-financial-sanctions"
    retrieved: "2026-08-09"
models: "Claridas world investigations pod — 5x-audited"
benchVerdict: "PASS — every figure traces to a free primary source; core Comtrade finding independently re-pulled 2026-08-09, all digits matched; attributed/commercial figures (Kpler, shadow-fleet counts) flagged inline as modeled."
crossLlmVerdict: "SKIPPED: browser locked"
---

## The calm water off Malaysia

There is a stretch of sea off the eastern coast of Peninsular Malaysia where the water goes flat and the tankers slow down. Two of them will draw alongside each other, hulls kissed together by rope and rubber, and for the better part of a day one will pump its cargo into the other. When they part, the crude oil is the same oil it always was. What has changed is the paperwork. The barrels went into the transfer as Iranian. They come out — on the manifest, on the certificate, in the customs filing waiting for them in a Chinese port — as Malaysian.

You will not read the vessel names here, and you do not need them. Because the entire operation, run at industrial scale across years, leaves a fingerprint that no rope-and-rubber transfer at sea can hide. It leaves it in a spreadsheet. A free one.

Here is the fingerprint, stated as plainly as it can be stated: **a country reports importing several times more crude oil "from Malaysia" than Malaysia sells to the entire planet combined.** That is not a leak. It is not an intercept. It is an arithmetic impossibility, published by the United Nations, downloadable by anyone with a browser.

> **THE ONE-LINE FINDING**
> - China's 2023 crude imports **from Malaysia** (its own customs, via UN Comtrade): **46,939,955,132 kg** — worth **$28,611,452,764**.
> - Malaysia's 2023 crude exports **to the entire world** (Malaysia's own customs, via UN Comtrade): **10,367,873,490 kg**.
> - So China alone claims to have received **4.53 times** everything Malaysia sold on Earth.
> - Reproduce it: `curl "https://comtradeapi.un.org/public/v1/preview/C/A/HS?reporterCode=156&period=2023&partnerCode=458&cmdCode=2709&flowCode=M"`

## Follow the money: two ledgers that don't agree with each other

International trade is supposed to be double-entry bookkeeping for the planet. When a barrel of crude leaves Malaysia bound for China, Malaysia records an export and China records an import. In an honest world those two numbers — the "mirror" statistics — roughly match. The gaps between them are where the smuggling lives.

For crude petroleum (HS code 2709) the China-Malaysia mirror does not have a gap. It has a chasm.

Start in 2020, before the operation had fully scaled. China's books say it received **12,463,031,000 kg** of crude from Malaysia — around 250,000 barrels a day. Malaysia's books say it shipped China just **852,349,000 kg** — around 17,000 barrels a day. That is a **14.6x** bilateral mirror gap: China "received" almost fifteen times what Malaysia says it "sent." [verified]

An honest caveat, placed here so no fact-checker can spring it later: in 2020 the trick was still small enough to hide inside Malaysia's own book. Malaysia's *total* crude export to the whole world that year (13.69 billion kg) was still slightly larger than China's reported import from Malaysia — so the 2020 impossibility is visible only in the bilateral mirror, not yet against Malaysia's global total. The pipe had not yet outgrown the country it claimed to run through. [verified]

By 2023 it had. Spectacularly.

> **THE MIRROR, YEAR BY YEAR — China's reported crude imports "from Malaysia" (kg)**
> - **2020:** 12,463,031,000 — vs. Malaysia's *entire* world export of 13,690,000,000 (still fits, barely)
> - **2023:** 46,939,955,132 — vs. Malaysia's *entire* world export of 10,367,873,490 (does **not** fit — 4.53x)
> - **2024:** 70,157,360,000 — the "Malaysian" figure keeps climbing
> - *(All re-pulled from the live Comtrade preview API on 2026-08-09; every digit matched.)*

The trade did not just exceed Malaysia's exports to China. It exceeded everything Malaysia sold anywhere. And it dwarfed what Malaysia can physically pull out of the ground.

## The production ceiling: Malaysia cannot do this

You could imagine an innocent explanation — perhaps Malaysia is a great re-exporting hub, buying crude from elsewhere and passing it on. But re-exports of crude at this scale would show up somewhere, and more to the point, the physical ceiling is fixed and public.

The U.S. Energy Information Administration's Malaysia Country Analysis Brief (last updated November 12, 2024) states flatly that "Malaysia's petroleum and other liquids production declined from 2017 to 2023—to **597,000 barrels per day**—due to maturing fields." Crude-and-condensate alone is lower still. And EIA, working directly from Chinese customs data, states in plain English that China's "Malaysian" crude imports **exceeded Malaysia's total crude oil production** outright. [verified]

You cannot ship what you do not have. The surplus — the difference between the 4.53x that China booked and the trickle Malaysia can actually produce and export — is not Malaysian oil. It never was.

## Where the missing barrels went in: Iran's disappearing act

Now look at the other end of the pipe.

China is one of Iran's largest oil customers — for years, the largest. So Iranian crude should be a fat, steady line in China's import ledger. Instead, in China's own Comtrade record, it collapses and then simply stops existing.

> **IRAN VANISHES FROM CHINA'S BOOKS — China's direct crude imports from Iran (kg)**
> - **2020:** 3,918,976,000
> - **2021:** 260,312,000
> - **2022:** 780,392,000
> - **2023:** **no rows recorded — count:0, data:[]**
> - **2024:** **no rows recorded — count:0, data:[]**
> - *(Confirmed on re-pull 2026-08-09 — this is an empty query result, not a rate-limit artifact.)*

By China's official telling, it bought **zero** crude from Iran in 2023 and 2024. Yet Iran did not stop pumping. Independent vessel-tracking (Kpler-based reporting) puts Iran's 2024 seaborne crude-and-condensate exports at roughly **1.52 million barrels a day** on an annual average, with a September 2024 peak near 1.85 million — the overwhelming majority of it going to China (Kpler-attributed figures run to ~97% of Iranian seaborne barrels bound for China in 2024; other outlets cite 90%-plus for various periods). [modeled — vessel-tracking figures are commercial and attributed, not free-reproducible]

Set the two anomalies side by side. The Iranian barrels that vanished from China's Iran ledger are the same order of magnitude as the "extra" Malaysian barrels that appeared in China's Malaysia ledger. **They are the two ends of one pipe.** The barrels did not disappear. They changed passports off the Malaysian coast.

## The subtraction is the whole story

This is the elegance and the scandal of it at once. You do not need to prove intent through a document nobody will hand you. You subtract.

**(China-reported "Malaysian" crude) − (Malaysia's real production and exports) = the Iranian volume.** Both halves are published for free.

And crucially, you do not have to take an investigative journalist's word that the surplus is relabeled Iranian oil — because the EIA says it. In its Today in Energy briefing of April 16, 2024, using Chinese customs data, EIA reports that "China imported 54% more crude oil (1.1 million b/d) from Malaysia in 2023 than in 2022," that "crude oil imports from Malaysia exceeded Malaysia's total crude oil production," and then, without hedging:

> "Industry analysts believe that much of the oil shipped from Iran to China was relabeled as originating from countries such as Malaysia, the United Arab Emirates, and Oman to avoid U.S. sanctions against countries engaging in petroleum transactions with Iran." — U.S. EIA, Today in Energy, April 16, 2024 [verified]

(EIA's ~1.1M b/d crude figure is on a slightly broader, differently-averaged basis than the crude-only ~943,000 b/d that falls out of the annual Comtrade HS-2709 record; both figures crush Malaysia's ~597,000 b/d of total production.)

The physical act was even caught mid-laundering. Kpler-tracked Iranian crude arriving in Malaysian waters ran about **670,000 b/d in 2023, rising to ~800,000 b/d in 2024** — a Kpler analyst (via Iran International, May 14, 2024) put the latter at "more than 50% of Iran's total oil export to China." Chinese customs' "Malaysian" crude then peaked at **1.53 million b/d in July 2024** — reported (Iran International, citing Chinese customs, Aug 28, 2024) as roughly three times Malaysia's entire oil production and a **12-fold increase since July 2018**, when the modern sanctions regime tightened. [modeled — Kpler and customs-peak figures are attributed, corroborating in direction and magnitude] The volume caught idling in Malaysian waters is the volume that reappears, re-papered, in China's books.

## Follow the money the rest of the way: the plumbing runs near Europe

The laundered crude is a China-facing trade. But its plumbing — the ships, the insurance, the payment rails — runs straight through European-adjacent waters and European-adjacent markets, and that is where a story that starts in the Strait of Hormuz becomes a story about a Baltic coastline.

**The ships and the insurance.** Moving sanctioned Iranian, Russian and Venezuelan crude requires a fleet that does not exist on the normal books — the so-called shadow or dark fleet, variously estimated from around 1,000 Iran-linked tankers to some 1,300-to-1,900 across all three origins by 2026, depending on who is counting and how. [modeled — counts are commercial, methodology-dependent, and vary by source] These are aging tankers — VLCCs, Suezmaxes, Aframaxes, many at or beyond 20 years old — running without recognized (IACS) classification and outside the mainstream International Group P&I insurance clubs. Into that gap, a fringe insurance market grew. A Reuters special report (October 28, 2025) identified a New Zealand-based marine mutual, Maritime Mutual, as having insured, at some point, **almost one in six of the shadow-fleet tankers sanctioned by Western governments** — with vessels it insured having carried **at least $18 billion worth of Iranian oil since 2018.** The United Kingdom sanctioned the entity on **February 24, 2026**, following the report — though, tellingly, the UK's stated legal basis was support for the *Russian* energy sector, even though the underlying investigation centred on both Iranian and Russian cargoes. The asset freeze came with a wind-down licence originally running through April 9, 2026, since extended. [verified] Alongside it, UK-incorporated marine insurers and imitatively-named "clubs" — names that echo genuine European mutuals without any affiliation — have surfaced. The European harm here is quiet and corrosive: the certificate of a legitimate flag state, a real IG club, a real classification society, gets imitated and diluted until it means less.

**The payment rails, built to dodge Europe.** Iranian oil proceeds increasingly settle in yuan through China's CIPS system — a deliberate detour around dollar and SWIFT clearing. Beyond that, per FDD analysis (October 10, 2025), Western officials estimate roughly **$8.4 billion in Iranian oil proceeds flowed in 2024 through a barter-like oil-for-infrastructure network**: an Iranian-controlled seller books crude to a Chinese buyer; the funds land in a mechanism ("Chuxin") that pays Chinese contractors building infrastructure inside Iran, backed by the state export-credit insurer Sinosure — never moving as an ordinary, traceable bank payment. [modeled — attributed to FDD analysis citing Western officials] The design's whole purpose is to keep the laundering leg *out* of European and dollar clearing. What stays behind, in reach of EU regulators, is the residue: freight, brokerage, re-invoicing margins, any euro-denominated insurance or bunkering that so much as brushes these cargoes. That residue is the compliance surface Europe is now chasing.

**Europe's response.** The EU has been designating shadow-fleet vessels on a rolling basis; its consolidated list reached **nearly 600 vessels by December 2025** (the December 18, 2025 tranche of 41 was, per the Council, explicitly Russia-linked — the list skews Russia-linked, with Iranian tonnage increasingly added). That consolidated sanctions list, free on data.europa.eu, is the authoritative public register of who and what is named. [verified]

## Who gets hurt — and it is not abstract

Sanctions evasion sounds bloodless until you stand on a coastline.

**Compliant European refiners, tanker operators and insurers** are being undercut by a cost structure that cheats. A 20-plus-year-old, uninsured, unclassed tanker beats a compliant one on freight for one reason: it has externalized its risk onto everyone downstream. Play by the rules — real class, real P&I, age-based scrapping — and you lose the cargo to the ship that doesn't.

**European taxpayers and coastal states** inherit the tail risk. These aging, under-insured tankers transit the Baltic, thread the Danish Straits, cross the Mediterranean. A full spill from one large tanker in the central Baltic has been described (by CEPA and others) as potentially the region's worst environmental disaster since the Second World War, with clean-up costs in the billions — and because the owner and insurer behind a shadow vessel are unverifiable, legal redress is blocked and the coastal EU state pays the bill. Denmark, Finland and Germany have already moved to tighten tanker and insurance checks. [verified — harm framing per cited analyses]

**Legitimate flag states and P&I clubs** watch their certificates counterfeited and their names imitated, until a genuine certificate is worth a little less to everyone.

**And the crews** — the people actually aboard — sail aging tonnage with pollution-liability gaps through some of the most crowded waters on Earth.

## The Claridas point: hidden in plain sight

Here is what should be uncomfortable. None of the load-bearing evidence in this story is secret.

The mirror gap is a free download from UN Comtrade. Malaysia's production ceiling is a free number from the EIA. The relabeling narrative is not our inference — it is stated, in its own words, by the EIA. Subtract one public number from another and the sanctions-evasion volume falls out into your hand.

> **REPRODUCE THE CORE FINDING**
> - China's 2023 crude import from Malaysia: `reporterCode=156, period=2023, partnerCode=458, cmdCode=2709, flowCode=M` → **46,939,955,132 kg** (primaryValue **$28,611,452,764**).
> - Malaysia's 2023 crude export to world: `reporterCode=458, partnerCode=0, cmdCode=2709, flowCode=X` → read the **all-modes (motCode=0)** row = **10,367,873,490 kg**.
> - **Do NOT sum the per-transport-mode rows** — the motCode=0 row already equals their sum (10,362,847,100 + 5,026,290 + 100). Adding it on top double-counts to ~20.7B and halves the scandal.
> - Compare both to EIA's Malaysia total production of **~597,000 b/d** in 2023.
> - The impossibility is self-evident.

The scandal is not that the war economy is concealed. It is that it is published — in the world's own trade ledger, free to anyone — and that, for years, no one had to do anything harder than subtract.
