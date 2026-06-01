import { createAdminClient } from '@/lib/supabase/server';
import { successResponse, errorResponse } from '@/lib/utils';
import { verifyAdminSession } from '@/lib/auth';
import type { DashboardMetrics, Appointment } from '@/types';

/**
 * GET /api/dashboard
 * Returns metrics for the admin dashboard.
 * Admin protected.
 */
export async function GET() {
  try {
    const isAdmin = await verifyAdminSession();
    if (!isAdmin) return errorResponse('Unauthorized', 401);

    const supabase = createAdminClient();

    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    // Run all queries in parallel
    const [totalResult, todayResult, weekResult, monthResult, statusResult, recentResult] =
      await Promise.all([
        // Total count
        supabase.from('appointments').select('*', { count: 'exact', head: true }),

        // Today's bookings
        supabase
          .from('appointments')
          .select('*', { count: 'exact', head: true })
          .eq('appointment_date', today),

        // Week's bookings
        supabase
          .from('appointments')
          .select('*', { count: 'exact', head: true })
          .gte('appointment_date', weekAgo),

        // Month's bookings
        supabase
          .from('appointments')
          .select('*', { count: 'exact', head: true })
          .gte('appointment_date', monthAgo),

        // By status
        supabase
          .from('appointments')
          .select('status'),

        // Recent 10 appointments
        supabase
          .from('appointments')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10),
      ]);

    // Count by status
    const statusCounts = { pending: 0, confirmed: 0, completed: 0, cancelled: 0 };
    if (statusResult.data) {
      for (const row of statusResult.data as { status: keyof typeof statusCounts }[]) {
        if (row.status in statusCounts) {
          statusCounts[row.status]++;
        }
      }
    }

    const metrics: DashboardMetrics = {
      total_today: todayResult.count ?? 0,
      total_week: weekResult.count ?? 0,
      total_month: monthResult.count ?? 0,
      total_all: totalResult.count ?? 0,
      pending: statusCounts.pending,
      confirmed: statusCounts.confirmed,
      completed: statusCounts.completed,
      cancelled: statusCounts.cancelled,
      recent: (recentResult.data as Appointment[]) ?? [],
    };

    return successResponse(metrics);
  } catch (err) {
    console.error('[GET /api/dashboard]', err);

    if (err instanceof Error && err.message.includes('Missing Supabase')) {
      return errorResponse('Backend not configured yet.', 503);
    }

    return errorResponse('Failed to fetch dashboard data', 500);
  }
}
