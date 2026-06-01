import { type NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'fallback-secret-change-in-production-please'
);

const PROTECTED_ADMIN_ROUTES = ['/admin/dashboard', '/admin/appointments'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin/dashboard and /admin/appointments routes
  if (PROTECTED_ADMIN_ROUTES.some((route) => pathname.startsWith(route))) {
    const token = request.cookies.get('admin_session')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      // Expired or invalid token — clear cookie and redirect to login
      const response = NextResponse.redirect(new URL('/admin', request.url));
      response.cookies.delete('admin_session');
      return response;
    }
  }

  // Redirect already-authenticated admin away from login page
  if (pathname === '/admin') {
    const token = request.cookies.get('admin_session')?.value;
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } catch {
        // Token invalid, show login page
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
