import { type NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/utils';
import {
  validateAdminPassword,
  createAdminSession,
  setAdminSessionCookie,
  clearAdminSession,
} from '@/lib/auth';

/**
 * POST /api/admin/login
 * Validates admin password and sets session cookie.
 */
export async function POST(request: NextRequest) {
  try {
    let body: { password?: string };
    try {
      body = await request.json();
    } catch {
      return errorResponse('Invalid request body', 400);
    }

    const { password } = body;

    if (!password || typeof password !== 'string') {
      return errorResponse('Password is required', 400);
    }

    // Validate password
    if (!validateAdminPassword(password)) {
      // Add a small delay to prevent brute force
      await new Promise((r) => setTimeout(r, 500));
      return errorResponse('Invalid password', 401);
    }

    // Create session token and set cookie
    const token = await createAdminSession();
    await setAdminSessionCookie(token);

    return successResponse({ redirectTo: '/admin/dashboard' }, 'Login successful');
  } catch (err) {
    console.error('[POST /api/admin/login]', err);
    return errorResponse('Login failed', 500);
  }
}

/**
 * DELETE /api/admin/login
 * Clears the admin session (logout).
 */
export async function DELETE() {
  try {
    await clearAdminSession();
    return successResponse(null, 'Logged out successfully');
  } catch (err) {
    console.error('[DELETE /api/admin/login]', err);
    return errorResponse('Logout failed', 500);
  }
}
