import type { APIRoute } from 'astro';

const FONTE_KEY = import.meta.env.FONTE_KEY;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

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
