import type { APIRoute } from 'astro';
import { getSecret } from 'astro:env/server';
import { parseBookingConfirmation, sendFonnteConfirmation } from '../../lib/fonnte';

const MAX_BOOKING_BODY_BYTES = 16_384;

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const contentLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(contentLength) && contentLength > MAX_BOOKING_BODY_BYTES) {
    return Response.json({ error: 'Request body terlalu besar.' }, { status: 413 });
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BOOKING_BODY_BYTES) {
    return Response.json({ error: 'Request body terlalu besar.' }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const booking = parseBookingConfirmation(body);
  if (!booking) {
    return Response.json({ error: 'Data booking tidak valid.' }, { status: 400 });
  }

  const token = getSecret('FONNTE_TOKEN');
  if (!token) {
    console.error('[booking:fonnte] FONNTE_TOKEN is not configured in the runtime environment.');
    return Response.json({ error: 'Layanan konfirmasi belum dikonfigurasi.' }, { status: 503 });
  }

  const sent = await sendFonnteConfirmation({ booking, token });
  if (!sent) {
    console.error('[booking:fonnte] Fonnte rejected the request or could not be reached.');
    return Response.json({ error: 'Gagal mengirim konfirmasi.' }, { status: 502 });
  }

  return Response.json({ success: true });
};
