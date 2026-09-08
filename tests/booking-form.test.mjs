import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('opens a prefilled WhatsApp order without calling the booking API', async () => {
  const form = await readFile(new URL('../src/components/BookingForm.astro', import.meta.url), 'utf8');

  assert.match(form, /https:\/\/wa\.me\/\$\{form\.dataset\.phone\}\?text=\$\{encodeURIComponent\(message\)\}/);
  const emojiCodePoint = Number.parseInt(
    form.match(/const cameraEmoji = String\.fromCodePoint\(0x([\dA-F]+)\)/)?.[1] ?? '',
    16,
  );
  const encodedEmoji = encodeURIComponent(String.fromCodePoint(emojiCodePoint));

  assert.equal(emojiCodePoint, 0x1F4F8);
  assert.equal(encodedEmoji, '%F0%9F%93%B8');
  assert.match(form, /Halo CL Potret \$\{cameraEmoji\}/);
  assert.doesNotMatch(form, /\uFFFD/);
  assert.match(form, /Saya ingin memesan sesi potret/);
  assert.match(form, /Nama: \$\{get\('name'\)\}/);
  assert.match(form, /Jenis Sesi: \$\{get\('session'\)\}/);
  assert.match(form, /Paket: \$\{get\('package'\)\}/);
  assert.match(form, /Tanggal: \$\{get\('date'\)\}/);
  assert.doesNotMatch(form, /fetch\(['"]\/api\/booking['"]/);
  assert.doesNotMatch(form, /Fonnte|FONNTE/);
});
