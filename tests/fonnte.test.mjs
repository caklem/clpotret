import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildConfirmationMessage,
  normalizeIndonesianPhone,
  parseBookingConfirmation,
  sendFonnteConfirmation,
} from '../src/lib/fonnte.ts';

const booking = {
  name: 'Ayu',
  phone: '0812-3456-7890',
  instagram: '@ayu',
  session: 'Graduation Photography',
  package: 'graduation-a',
  date: '2026-09-10',
  time: '09:00',
  location: 'Malang',
  people: '1',
  notes: 'Outdoor',
};

test('normalizes Indonesian mobile numbers without allowing multiple targets', () => {
  assert.equal(normalizeIndonesianPhone('0812-3456-7890'), '6281234567890');
  assert.equal(normalizeIndonesianPhone('+62 812 3456 7890'), '6281234567890');
  assert.equal(normalizeIndonesianPhone('81234567890'), '6281234567890');
  assert.equal(normalizeIndonesianPhone('08123456789,08129876543'), null);
  assert.equal(normalizeIndonesianPhone('08123456789|Admin'), null);
});

test('builds a booking confirmation from server-approved fields', () => {
  const message = buildConfirmationMessage(booking);

  assert.match(message, /Halo Ayu/);
  assert.match(message, /Graduation Photography/);
  assert.match(message, /2026-09-10/);
});

test('parses required booking fields and fills empty optional fields', () => {
  const parsed = parseBookingConfirmation({
    name: ' Ayu ',
    phone: '081234567890',
    session: 'Graduation Photography',
    date: '2026-09-10',
  });

  assert.equal(parsed.name, 'Ayu');
  assert.equal(parsed.instagram, '-');
  assert.equal(parseBookingConfirmation(null), null);
  assert.equal(parseBookingConfirmation([]), null);
  assert.equal(parseBookingConfirmation({ ...booking, phone: 'invalid' }), null);
  assert.equal(parseBookingConfirmation({ ...booking, notes: 'x'.repeat(1001) }), null);
});

test('calls the Fonnte send endpoint with authorization and multipart data', async () => {
  let capturedUrl;
  let capturedInit;
  const sent = await sendFonnteConfirmation({
    booking,
    token: 'device-token',
    fetcher: async (url, init) => {
      capturedUrl = url;
      capturedInit = init;
      return Response.json({ status: true });
    },
  });

  assert.equal(sent, true);
  assert.equal(capturedUrl, 'https://api.fonnte.com/send');
  assert.equal(capturedInit.headers.Authorization, 'device-token');
  assert.equal(capturedInit.body.get('target'), '6281234567890');
  assert.equal(capturedInit.body.get('countryCode'), '0');
  assert.match(capturedInit.body.get('message'), /Permintaan booking kamu/);
});

test('fails closed for invalid input, missing tokens, and upstream errors', async () => {
  assert.equal(await sendFonnteConfirmation({ booking: { ...booking, phone: 'invalid' }, token: 'token' }), false);
  assert.equal(await sendFonnteConfirmation({ booking, token: '' }), false);
  assert.equal(
    await sendFonnteConfirmation({
      booking,
      token: 'token',
      fetcher: async () => Response.json({ status: false }),
    }),
    false,
  );
});
