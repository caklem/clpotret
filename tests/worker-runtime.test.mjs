import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Wrangler config deploys Astro SSR as a Cloudflare Worker', async () => {
  const config = await readFile(new URL('../wrangler.toml', import.meta.url), 'utf8');

  assert.match(config, /main\s*=\s*["']@astrojs\/cloudflare\/entrypoints\/server["']/);
  assert.match(config, /binding\s*=\s*["']ASSETS["']/);
  assert.match(config, /directory\s*=\s*["']\.\/dist["']/);
  assert.doesNotMatch(config, /FONNTE_TOKEN/);
});
