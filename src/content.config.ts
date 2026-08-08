import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// SAFETY RAIL #1 (fault-tolerant builds): the Semaform 5-block structure is
// enforced as a schema. A draft missing a mandatory block fails validation —
// editorial rigor as code. The five verticals are a fixed enum.
const VERTICALS = ['sports', 'travel', 'world', 'us', 'local', 'meta'] as const;
const CONFIDENCE = ['verified', 'modeled', 'speculative', 'preprint'] as const;

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    headline: z.string(),
    subhed: z.string().optional(),
    vertical: z.enum(VERTICALS),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    // Semaform 5 blocks — Facts / Analysis / Room-for-Disagreement mandatory,
    // View-From optional, Notable mandatory (3–8 links).
    facts: z.string().min(1, 'Block 1 (The Facts) is mandatory'),
    analysis: z.string().min(1, 'Block 2 (The Analysis) is mandatory'),
    disagreement: z.string().min(1, 'Block 3 (Room for Disagreement) is mandatory'),
    viewFrom: z.string().optional(),
    notable: z.array(z.object({ outlet: z.string(), title: z.string(), url: z.string().url(), note: z.string().optional() }))
      .min(3, 'Notable needs 3–8 links').max(8),
    // Mandatory closer + methodology footer.
    humanWouldMiss: z.string().min(1, '"What a human would miss" closer is mandatory'),
    sources: z.array(z.object({ label: z.string(), url: z.string().url(), retrieved: z.string().optional() })),
    models: z.string().default('Opus/Sonnet/Haiku pod'),
    publisherOfRecord: z.string().default('Ryan Dhookaran'),
    // Gate audit trail.
    gradingScore: z.string().optional(),
    benchVerdict: z.string().optional(),
    crossLlmVerdict: z.string().optional(),
    // Disclosure wall (Travel/Fashion affiliate).
    affiliateDisclosure: z.string().optional(),
  }),
});

export const collections = { articles };
