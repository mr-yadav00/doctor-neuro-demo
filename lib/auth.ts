import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'fallback-secret-change-in-production-please'
);

const COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 8 * 60 * 60; // 8 hours in seconds

// ─── Create admin session ─────────────────────────────────────────────────────

export async function createAdminSession(): Promise<string> {
  const token = await new SignJWT({ authenticated: true, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(JWT_SECRET);

  return token;
}

// ─── Set session cookie ───────────────────────────────────────────────────────

export async function setAdminSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION,
    path: '/',
  });
}

// ─── Verify session ───────────────────────────────────────────────────────────

export async function verifyAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) return false;

    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

// ─── Clear session ────────────────────────────────────────────────────────────

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// ─── Validate admin password ──────────────────────────────────────────────────

export function validateAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.warn('[Auth] ADMIN_PASSWORD env var not set!');
    return false;
  }
  return password === adminPassword;
}
