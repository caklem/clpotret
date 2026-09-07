import type { APIRoute } from 'astro';
import { bookingRateLimiter } from '../../lib/rate-limit';

const FONTE_KEY = import.meta.env.FONTE_KEY;

export const prerender = false;

function getClientKey(request: Request, clientAddress?: string): string {
  return request.headers.get('cf-connecting-ip') ?? clientAddress ?? 'unknown';
}

export const POST: APIRoute = async (context) => {
  const { request } = context;
  let clientAddress: string | undefined;
  try {
    clientAddress = context.clientAddress;
  } catch {
    // Some adapters do not provide a direct client address.
  }

  const rateLimit = bookingRateLimiter.attempt(getClientKey(request, clientAddress));
  if (!rateLimit.allowed) {
    return Response.json(
      { error: 'Terlalu banyak permintaan. Silakan coba lagi nanti.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  const raw = await request.text();
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  try {
    const res = await fetch('https://api.fonte.app/v1/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form: FONTE_KEY,
        ...body,
      }),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: res.status });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to submit' }), { status: 500 });
  }
};
