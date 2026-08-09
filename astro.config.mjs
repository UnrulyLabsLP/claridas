// @ts-check
import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import { remarkSemaform, remarkConfidenceTags } from './src/plugins/remark-semaform.mjs';

// Claridas — static build, deploys to Cloudflare Pages (free tier). $0 hosting.
export default defineConfig({
  site: 'https://claridas.com',
  output: 'static',
  build: { format: 'directory' },
  trailingSlash: 'ignore',
  markdown: {
    // remark-directive parses `:::semaform{type=X}` into directive nodes;
    // remarkSemaform maps them to <aside class="sf sf--X">; remarkConfidenceTags
    // handles inline [verified]/[modeled]/… tokens in the feature body.
    remarkPlugins: [remarkDirective, remarkSemaform, remarkConfidenceTags],
  },
});
