import type { APIRoute } from 'astro';

const FONTE_KEY = import.meta.env.FONTE_KEY;
const TURNSTILE_SECRET = import.meta.env.TURNSTILE_SECRET;

async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
  const formData = new URLSearchParams();
  formData.append('secret', TURNSTILE_SECRET);
  formData.append('response', token);
  if (ip) formData.append('remoteip', ip);

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  return data.success === true;
}

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400 });
  }
  const turnstileToken = body['cf-turnstile-response'];

  // Verify Turnstile token
  if (!turnstileToken) {
    return new Response(JSON.stringify({ error: 'Missing Turnstile token' }), { status: 403 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || undefined;
  const verified = await verifyTurnstile(turnstileToken, ip);

  if (!verified) {
    return new Response(JSON.stringify({ error: 'Turnstile verification failed' }), { status: 403 });
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
