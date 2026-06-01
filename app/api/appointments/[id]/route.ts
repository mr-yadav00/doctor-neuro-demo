import { type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { updateStatusSchema } from '@/lib/validation';
import { successResponse, errorResponse } from '@/lib/utils';
import { verifyAdminSession } from '@/lib/auth';

// ─── PATCH /api/appointments/[id] — Update appointment status ─────────────────

export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<'/api/appointments/[id]'>
) {
  try {
    const isAdmin = await verifyAdminSession();
    if (!isAdmin) return errorResponse('Unauthorized', 401);

    const { id } = await ctx.params;

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return errorResponse('Invalid JSON body', 400);
    }

    const parsed = updateStatusSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0]?.message ?? 'Invalid status', 422);
    }

    const supabase = createAdminClient();

    const { data: appointment, error } = await supabase
      .from('appointments')
      .update({
        status: parsed.data.status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return errorResponse('Appointment not found', 404);
      }
      throw error;
    }

    return successResponse(appointment, `Status updated to ${parsed.data.status}`);
  } catch (err) {
    console.error('[PATCH /api/appointments/[id]]', err);
    return errorResponse('Failed to update appointment', 500);
  }
}

// ─── DELETE /api/appointments/[id] — Delete appointment ─────────────────────

export async function DELETE(
  _request: NextRequest,
  ctx: RouteContext<'/api/appointments/[id]'>
) {
  try {
    const isAdmin = await verifyAdminSession();
    if (!isAdmin) return errorResponse('Unauthorized', 401);

    const { id } = await ctx.params;

    const supabase = createAdminClient();

    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return successResponse(null, 'Appointment deleted successfully');
  } catch (err) {
    console.error('[DELETE /api/appointments/[id]]', err);
    return errorResponse('Failed to delete appointment', 500);
  }
}

// ─── GET /api/appointments/[id] — Get single appointment ─────────────────────

export async function GET(
  _request: NextRequest,
  ctx: RouteContext<'/api/appointments/[id]'>
) {
  try {
    const isAdmin = await verifyAdminSession();
    if (!isAdmin) return errorResponse('Unauthorized', 401);

    const { id } = await ctx.params;
    const supabase = createAdminClient();

    const { data: appointment, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return errorResponse('Appointment not found', 404);
      }
      throw error;
    }

    return successResponse(appointment);
  } catch (err) {
    console.error('[GET /api/appointments/[id]]', err);
    return errorResponse('Failed to fetch appointment', 500);
  }
}
