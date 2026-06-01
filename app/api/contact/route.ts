import { type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { createContactSchema } from '@/lib/validation';
import { successResponse, errorResponse, sanitizeString } from '@/lib/utils';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

/**
 * POST /api/contact
 * Saves a contact form submission to the database.
 * Public endpoint with rate limiting.
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting: max 5 submissions per IP per hour
    const ip = getClientIp(request);
    const { success: withinLimit } = rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000);
    if (!withinLimit) {
      return errorResponse('Too many requests. Please try again later.', 429);
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return errorResponse('Invalid JSON body', 400);
    }

    const parsed = createContactSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0]?.message ?? 'Validation failed', 422);
    }

    const data = parsed.data;
    const supabase = createAdminClient();

    const { error } = await supabase.from('contact_leads').insert({
      name: sanitizeString(data.name),
      mobile: data.mobile.trim(),
      email: data.email ? data.email.toLowerCase().trim() : null,
      message: data.message ? sanitizeString(data.message) : null,
      status: 'new',
    });

    if (error) throw error;

    return successResponse(null, "Thank you for reaching out! We'll contact you shortly.", 201);
  } catch (err) {
    console.error('[POST /api/contact]', err);

    if (err instanceof Error && err.message.includes('Missing Supabase')) {
      return errorResponse('Backend not configured yet. Please add Supabase credentials.', 503);
    }

    return errorResponse('Failed to submit contact form. Please call us directly.', 500);
  }
}
