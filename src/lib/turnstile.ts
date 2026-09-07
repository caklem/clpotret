export interface TurnstileVerification {
  success: boolean;
  action?: string;
  hostname?: string;
  'error-codes'?: string[];
}

interface VerifyTurnstileOptions {
  token: unknown;
  secret: string | undefined;
  expectedAction: string;
  expectedHostnames: ReadonlySet<string>;
  remoteIp?: string;
  fetcher?: typeof fetch;
}

export async function verifyTurnstile({
  token,
  secret,
  expectedAction,
  expectedHostnames,
  remoteIp,
  fetcher = fetch,
}: VerifyTurnstileOptions): Promise<boolean> {
  if (
    typeof token !== 'string' ||
    token.length === 0 ||
    token.length > 2048 ||
    !secret ||
    expectedHostnames.size === 0
  ) {
    return false;
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (remoteIp) body.set('remoteip', remoteIp);

  try {
    const response = await fetcher('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(10_000),
      body,
    });
    if (!response.ok) return false;

    const result = (await response.json()) as TurnstileVerification;
    return (
      result.success === true &&
      result.action === expectedAction &&
      typeof result.hostname === 'string' &&
      expectedHostnames.has(result.hostname)
    );
  } catch {
    return false;
  }
}
