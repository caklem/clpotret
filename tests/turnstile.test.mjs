import assert from 'node:assert/strict';
import test from 'node:test';
import { verifyTurnstile } from '../src/lib/turnstile.ts';

const defaults = {
  token: 'fresh-token',
  secret: 'secret',
  expectedAction: 'booking',
  expectedHostnames: new Set(['localhost']),
};

function response(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

test('accepts a successful response with the expected action and hostname', async () => {
  const valid = await verifyTurnstile({
    ...defaults,
    fetcher: async () => response({ success: true, action: 'booking', hostname: 'localhost' }),
  });

  assert.equal(valid, true);
});

test('rejects action and hostname mismatches', async () => {
  const wrongAction = await verifyTurnstile({
    ...defaults,
    fetcher: async () => response({ success: true, action: 'login', hostname: 'localhost' }),
  });
  const wrongHostname = await verifyTurnstile({
    ...defaults,
    fetcher: async () => response({ success: true, action: 'booking', hostname: 'example.com' }),
  });

  assert.equal(wrongAction, false);
  assert.equal(wrongHostname, false);
});

test('rejects missing and oversized tokens plus mocked duplicate and upstream failures', async () => {
  const shouldNotFetch = async () => {
    throw new Error('fetch should not be called');
  };
  assert.equal(await verifyTurnstile({ ...defaults, token: '', fetcher: shouldNotFetch }), false);
  assert.equal(await verifyTurnstile({ ...defaults, token: 'x'.repeat(2049), fetcher: shouldNotFetch }), false);
  assert.equal(
    await verifyTurnstile({
      ...defaults,
      fetcher: async () => response({ success: false, 'error-codes': ['timeout-or-duplicate'] }),
    }),
    false,
  );
  assert.equal(
    await verifyTurnstile({ ...defaults, fetcher: async () => response({}, 500) }),
    false,
  );
});
