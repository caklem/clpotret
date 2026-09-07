export interface BookingConfirmation {
  name: string;
  phone: string;
  instagram: string;
  session: string;
  package: string;
  date: string;
  time: string;
  location: string;
  people: string;
  notes: string;
}

interface SendConfirmationOptions {
  booking: BookingConfirmation;
  token: string | undefined;
  fetcher?: typeof fetch;
}

const FIELD_LIMITS: Record<keyof BookingConfirmation, number> = {
  name: 100,
  phone: 30,
  instagram: 100,
  session: 100,
  package: 100,
  date: 20,
  time: 20,
  location: 200,
  people: 20,
  notes: 1_000,
};

export function parseBookingConfirmation(input: unknown): BookingConfirmation | null {
  if (typeof input !== 'object' || input === null || Array.isArray(input)) return null;
  const record = input as Record<string, unknown>;
  const read = (key: keyof BookingConfirmation): string | null => {
    const value = record[key];
    if (value === undefined || value === null || value === '') return '';
    if (typeof value !== 'string') return null;
    const trimmed = value.trim();
    return trimmed.length <= FIELD_LIMITS[key] ? trimmed : null;
  };

  const values = {
    name: read('name'),
    phone: read('phone'),
    instagram: read('instagram'),
    session: read('session'),
    package: read('package'),
    date: read('date'),
    time: read('time'),
    location: read('location'),
    people: read('people'),
    notes: read('notes'),
  };
  if (Object.values(values).some((value) => value === null)) return null;

  const booking = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, value || '-']),
  ) as unknown as BookingConfirmation;

  if (!values.name || !values.phone || !values.session || !values.date) return null;
  if (!normalizeIndonesianPhone(booking.phone)) return null;
  return booking;
}

export function normalizeIndonesianPhone(value: string): string | null {
  const compact = value.trim().replace(/[\s()+.-]/g, '');
  if (!/^\d+$/.test(compact)) return null;

  const normalized = compact.startsWith('0')
    ? `62${compact.slice(1)}`
    : compact.startsWith('8')
      ? `62${compact}`
      : compact;

  return /^628\d{7,11}$/.test(normalized) ? normalized : null;
}

export function buildConfirmationMessage(booking: BookingConfirmation): string {
  return `Halo ${booking.name} 👋

Permintaan booking kamu di CL Potret sudah kami terima 📸

Jenis Sesi: ${booking.session}
Paket: ${booking.package}
Tanggal: ${booking.date}
Jam: ${booking.time}
Lokasi: ${booking.location}
Jumlah Orang: ${booking.people}
Catatan: ${booking.notes}

Silakan lanjutkan melalui WhatsApp untuk memastikan ketersediaan jadwal dan mendiskusikan konsep fotonya.`;
}

export async function sendFonnteConfirmation({
  booking,
  token,
  fetcher = fetch,
}: SendConfirmationOptions): Promise<boolean> {
  const target = normalizeIndonesianPhone(booking.phone);
  if (!target || !token) return false;

  const payload = new FormData();
  payload.set('target', target);
  payload.set('message', buildConfirmationMessage(booking));
  payload.set('countryCode', '0');

  try {
    const response = await fetcher('https://api.fonnte.com/send', {
      method: 'POST',
      headers: { Authorization: token },
      body: payload,
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) return false;

    const result = (await response.json()) as { status?: boolean };
    return result.status === true;
  } catch {
    return false;
  }
}
