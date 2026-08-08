// @ts-check
import { defineConfig } from 'astro/config';

// Claridas — static build, deploys to Cloudflare Pages (free tier). $0 hosting.
export default defineConfig({
  site: 'https://claridas.com',
  output: 'static',
  build: { format: 'directory' },
  trailingSlash: 'ignore',
});
