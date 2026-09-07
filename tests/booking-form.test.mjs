import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('opens a prefilled WhatsApp order without calling the booking API', async () => {
  const form = await readFile(new URL('../src/components/BookingForm.astro', import.meta.url), 'utf8');

  assert.match(form, /https:\/\/wa\.me\/\$\{form\.dataset\.phone\}\?text=\$\{encodeURIComponent\(message\)\}/);
  assert.match(form, /Saya ingin memesan sesi potret/);
  assert.match(form, /Nama: \$\{get\('name'\)\}/);
  assert.match(form, /Jenis Sesi: \$\{get\('session'\)\}/);
  assert.match(form, /Paket: \$\{get\('package'\)\}/);
  assert.match(form, /Tanggal: \$\{get\('date'\)\}/);
  assert.doesNotMatch(form, /fetch\(['"]\/api\/booking['"]/);
  assert.doesNotMatch(form, /Fonnte|FONNTE/);
});
