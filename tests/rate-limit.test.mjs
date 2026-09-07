import assert from 'node:assert/strict';
import test from 'node:test';
import { SlidingWindowRateLimiter } from '../src/lib/rate-limit.ts';

test('allows only one attempt per key in a rolling minute', () => {
  const limiter = new SlidingWindowRateLimiter(60_000);

  assert.deepEqual(limiter.attempt('visitor-a', 1_000), { allowed: true, retryAfterSeconds: 0 });
  assert.deepEqual(limiter.attempt('visitor-a', 1_001), { allowed: false, retryAfterSeconds: 60 });
  assert.deepEqual(limiter.attempt('visitor-a', 60_999), { allowed: false, retryAfterSeconds: 1 });
  assert.deepEqual(limiter.attempt('visitor-a', 61_000), { allowed: true, retryAfterSeconds: 0 });
});

test('tracks visitors independently', () => {
  const limiter = new SlidingWindowRateLimiter(60_000);

  assert.equal(limiter.attempt('visitor-a', 1_000).allowed, true);
  assert.equal(limiter.attempt('visitor-b', 1_000).allowed, true);
  assert.equal(limiter.attempt('visitor-a', 2_000).allowed, false);
});

test('rejects invalid windows', () => {
  assert.throws(() => new SlidingWindowRateLimiter(0), /positive number/);
  assert.throws(() => new SlidingWindowRateLimiter(Number.NaN), /positive number/);
});
