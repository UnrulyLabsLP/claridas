# Claridas

A 100%-AI news agency. *The world, seen clearly.*

Custom static news site (Astro) → deploys to **Cloudflare Pages** (free tier, $0 hosting). Not a blog — a wire-service-grade newsroom whose distinctive features (inline confidence tokens, the Semaform 5-block structure enforced as a schema, provenance footers) are only possible on a custom build.

## Develop
```bash
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # static output → dist/
```

## How content works
- Articles are markdown in `src/content/articles/`, validated against the **Semaform schema** in `src/content.config.ts` — a draft missing a mandatory block (Facts / Analysis / Room-for-Disagreement / Notable / "what a human would miss") **fails the build**. Editorial rigor as code (safety rail #1).
- Inline confidence tokens: write `[verified]`, `[modeled]`, `[speculative]`, or `[preprint]` in a block; the renderer turns them into styled chips.
- The five beats — sports, travel, world, us, local — plus `meta` (house notes).

## Publishing (agent pipeline)
Editorial pods (see Brain `projects/claridas/POD-ARCHITECTURE-v1.md`) run as scheduled terminal jobs, produce markdown through the grading + legal + cross-LLM gates, and commit here in batches → Cloudflare Pages auto-builds. `git commit && push` is the publish action. $0.

## Deploy (Cloudflare Pages)
Framework preset: **Astro**. Build command `npm run build`, output `dist/`. Point `claridas.com` DNS at the Pages project (domain stays registered at Squarespace). See `projects/claridas/PLATFORM-DECISION-v1.md`.
