import { type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { slotQuerySchema } from '@/lib/validation';
import { buildTimeSlots, errorResponse, successResponse } from '@/lib/utils';

/**
 * GET /api/slots?date=YYYY-MM-DD
 * Returns all time slots with availability for a given date.
 * Public endpoint — no auth required.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = { date: searchParams.get('date') || '' };

    const parsed = slotQuerySchema.safeParse(query);
    if (!parsed.success) {
      return errorResponse('Invalid date. Use format YYYY-MM-DD', 400);
    }

    const { date } = parsed.data;

    // Fetch booked times for this date (pending or confirmed)
    const supabase = createAdminClient();

    const { data: booked, error } = await supabase
      .from('appointments')
      .select('appointment_time')
      .eq('appointment_date', date)
      .in('status', ['pending', 'confirmed']);

    if (error) {
      // If Supabase not configured, return all slots as available
      if (error.message?.includes('Missing Supabase')) {
        const slots = buildTimeSlots([]);
        return successResponse(slots);
      }
      throw error;
    }

    const bookedTimes = (booked ?? []).map((b: { appointment_time: string }) => b.appointment_time);
    const slots = buildTimeSlots(bookedTimes);

    return successResponse(slots);
  } catch (err) {
    console.error('[GET /api/slots]', err);

    // Fallback: return all slots as available so booking form still works
    const slots = buildTimeSlots([]);
    return successResponse(slots);
  }
}
