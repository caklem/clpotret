export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

export class SlidingWindowRateLimiter {
  private readonly blockedUntil = new Map<string, number>();
  private readonly windowMs: number;
  private nextCleanupAt = 0;

  constructor(windowMs: number) {
    if (!Number.isFinite(windowMs) || windowMs <= 0) {
      throw new TypeError('windowMs must be a positive number');
    }
    this.windowMs = windowMs;
  }

  attempt(key: string, now = Date.now()): RateLimitResult {
    if (now >= this.nextCleanupAt) {
      for (const [storedKey, expiry] of this.blockedUntil) {
        if (expiry <= now) this.blockedUntil.delete(storedKey);
      }
      this.nextCleanupAt = now + this.windowMs;
    }

    const existingExpiry = this.blockedUntil.get(key);
    if (existingExpiry !== undefined && existingExpiry > now) {
      return {
        allowed: false,
        retryAfterSeconds: Math.max(1, Math.ceil((existingExpiry - now) / 1000)),
      };
    }

    this.blockedUntil.set(key, now + this.windowMs);
    return { allowed: true, retryAfterSeconds: 0 };
  }
}

export const bookingRateLimiter = new SlidingWindowRateLimiter(60_000);
