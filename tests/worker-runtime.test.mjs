import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('booking endpoint reads Fonnte token from the Cloudflare runtime', async () => {
  const endpoint = await readFile(new URL('../src/pages/api/booking.ts', import.meta.url), 'utf8');

  assert.match(endpoint, /getSecret\(['"]FONNTE_TOKEN['"]\)/);
  assert.doesNotMatch(endpoint, /import\.meta\.env\.FONNTE_TOKEN/);
});

test('Wrangler config deploys Astro SSR as a Cloudflare Worker with a required secret', async () => {
  const config = await readFile(new URL('../wrangler.toml', import.meta.url), 'utf8');

  assert.match(config, /main\s*=\s*["']@astrojs\/cloudflare\/entrypoints\/server["']/);
  assert.match(config, /binding\s*=\s*["']ASSETS["']/);
  assert.match(config, /directory\s*=\s*["']\.\/dist["']/);
  assert.match(config, /required\s*=\s*\[\s*["']FONNTE_TOKEN["']\s*\]/);
});
