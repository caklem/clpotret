import type { APIRoute } from 'astro';
import { verifyTurnstile } from '../../lib/turnstile';

const FONTE_KEY = import.meta.env.FONTE_KEY;
const TURNSTILE_SECRET = import.meta.env.TURNSTILE_SECRET;
const EXPECTED_ACTION = 'booking';
const EXPECTED_HOSTNAMES = new Set<string>(
  String(import.meta.env.TURNSTILE_HOSTNAMES ?? '')
    .split(',')
    .map((hostname: string) => hostname.trim())
    .filter(Boolean),
);

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const raw = await request.text();
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body', raw: raw.slice(0, 200) }), { status: 400 });
  }
  const turnstileToken = body['cf-turnstile-response'];
  const ip =
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    undefined;
  const verified = await verifyTurnstile({
    token: turnstileToken,
    secret: TURNSTILE_SECRET,
    expectedAction: EXPECTED_ACTION,
    expectedHostnames: EXPECTED_HOSTNAMES,
    remoteIp: ip,
  });

  if (!verified) {
    return new Response('forbidden', { status: 403 });
  }

  // Remove turnstile token from body before sending to Fonte
  const { 'cf-turnstile-response': _, ...formData } = body;

  try {
    const res = await fetch('https://api.fonte.app/v1/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form: FONTE_KEY,
        ...formData,
      }),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: res.status });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to submit' }), { status: 500 });
  }
};
