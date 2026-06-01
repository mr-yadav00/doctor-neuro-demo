import { type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { createAppointmentSchema } from '@/lib/validation';
import { generateBookingId, successResponse, errorResponse, sanitizeString } from '@/lib/utils';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { sendPatientConfirmationEmail, sendAdminNotificationEmail } from '@/lib/email';
import { verifyAdminSession } from '@/lib/auth';
import type { Appointment } from '@/types';

// ─── POST /api/appointments — Create new appointment ─────────────────────────

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: max 3 booking attempts per IP per hour
    const ip = getClientIp(request);
    const { success: withinLimit } = rateLimit(ip, 3, 60 * 60 * 1000);
    if (!withinLimit) {
      return errorResponse('Too many booking attempts. Please try again in an hour.', 429);
    }

    // Parse and validate body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return errorResponse('Invalid JSON body', 400);
    }

    const parsed = createAppointmentSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0]?.message ?? 'Validation failed', 422);
    }

    const data = parsed.data;

    // Check Supabase is configured
    const supabase = createAdminClient();

    // Check if slot is still available (prevent double booking)
    const { data: existing, error: existingError } = await supabase
      .from('appointments')
      .select('id')
      .eq('appointment_date', data.appointment_date)
      .eq('appointment_time', data.appointment_time)
      .in('status', ['pending', 'confirmed'])
      .limit(1);

    if (existingError) throw existingError;

    if (existing && existing.length > 0) {
      return errorResponse(
        'This time slot is already booked. Please choose another time.',
        409
      );
    }

    // Generate booking ID
    const bookingId = generateBookingId();

    // Insert appointment
    const appointmentData = {
      booking_id: bookingId,
      patient_name: sanitizeString(data.patient_name),
      patient_email: data.patient_email.toLowerCase().trim(),
      patient_mobile: data.patient_mobile.trim(),
      patient_age: data.patient_age ?? null,
      patient_gender: data.patient_gender ?? null,
      department: data.department,
      doctor_name: 'Dr. Bharat Bhushan',
      appointment_date: data.appointment_date,
      appointment_time: data.appointment_time,
      symptoms: data.symptoms ? sanitizeString(data.symptoms) : null,
      notes: data.notes ? sanitizeString(data.notes) : null,
      status: 'pending' as const,
    };

    const { data: appointment, error: insertError } = await supabase
      .from('appointments')
      .insert(appointmentData)
      .select()
      .single<Appointment>();

    if (insertError) throw insertError;

    // Send emails (non-blocking)
    Promise.all([
      sendPatientConfirmationEmail(appointment),
      sendAdminNotificationEmail(appointment),
    ]).catch((err) => console.error('[Email] Failed:', err));

    return successResponse(
      { booking_id: appointment.booking_id, id: appointment.id },
      'Appointment booked successfully! Confirmation sent to your email.',
      201
    );
  } catch (err) {
    console.error('[POST /api/appointments]', err);

    // Check if it's a missing env var error (before Supabase is configured)
    if (err instanceof Error && err.message.includes('Missing Supabase')) {
      return errorResponse(
        'Backend not configured yet. Please add Supabase credentials to .env.local',
        503
      );
    }

    return errorResponse('An unexpected error occurred. Please try again.', 500);
  }
}

// ─── GET /api/appointments — List appointments (admin only) ───────────────────

export async function GET(request: NextRequest) {
  try {
    // Verify admin session
    const isAdmin = await verifyAdminSession();
    if (!isAdmin) {
      return errorResponse('Unauthorized', 401);
    }

    const supabase = createAdminClient();
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const date = searchParams.get('date');

    const offset = (page - 1) * limit;

    let query = supabase
      .from('appointments')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    if (date) {
      query = query.eq('appointment_date', date);
    }

    if (search) {
      query = query.or(
        `patient_name.ilike.%${search}%,patient_mobile.ilike.%${search}%,booking_id.ilike.%${search}%`
      );
    }

    const { data: appointments, error, count } = await query;

    if (error) throw error;

    return successResponse({
      appointments: appointments ?? [],
      pagination: {
        total: count ?? 0,
        page,
        limit,
        totalPages: Math.ceil((count ?? 0) / limit),
      },
    });
  } catch (err) {
    console.error('[GET /api/appointments]', err);
    return errorResponse('Failed to fetch appointments', 500);
  }
}
