'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { DashboardMetrics, Appointment, AppointmentStatus } from '@/types';

// ─── Metric Card ──────────────────────────────────────────────────────────────
function MetricCard({
  label,
  value,
  icon,
  color,
  sub,
}: {
  label: string;
  value: number;
  icon: string;
  color: string;
  sub?: string;
}) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{ background: `${color}20`, color }}
        >
          {label}
        </span>
      </div>
      <p className="text-3xl font-black text-white">{value.toLocaleString()}</p>
      {sub && <p className="text-xs text-white/40 mt-1">{sub}</p>}
    </div>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: AppointmentStatus }) {
  const styles: Record<AppointmentStatus, { bg: string; text: string; label: string }> = {
    pending: { bg: 'rgba(251,191,36,0.15)', text: '#fbbf24', label: '⏳ Pending' },
    confirmed: { bg: 'rgba(37,211,102,0.15)', text: '#4ade80', label: '✅ Confirmed' },
    completed: { bg: 'rgba(99,102,241,0.15)', text: '#a5b4fc', label: '✔ Completed' },
    cancelled: { bg: 'rgba(239,68,68,0.15)', text: '#f87171', label: '✗ Cancelled' },
  };
  const s = styles[status] || styles.pending;
  return (
    <span
      className="text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
      style={{ background: s.bg, color: s.text }}
    >
      {s.label}
    </span>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMetrics = useCallback(async () => {
    try {
      const res = await fetch('/api/dashboard');
      if (res.status === 401) {
        router.push('/admin');
        return;
      }
      const data = await res.json();
      if (data.success) {
        setMetrics(data.data);
      } else {
        setError(data.error || 'Failed to load dashboard');
      }
    } catch {
      setError('Network error loading dashboard data.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchMetrics();
    // Refresh every 60 seconds
    const interval = setInterval(fetchMetrics, 60_000);
    return () => clearInterval(interval);
  }, [fetchMetrics]);

  async function handleLogout() {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#060d28' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #060d28 0%, #0a1540 100%)' }}>
      {/* Top Nav */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-6 py-4"
        style={{
          background: 'rgba(6,13,40,0.95)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏥</span>
          <div>
            <p className="text-white font-bold text-sm">Dr. Bharat Bhushan</p>
            <p className="text-blue-400 text-xs">Admin Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/admin/appointments"
            className="text-white/60 hover:text-white text-sm transition-colors"
          >
            📋 Appointments
          </a>
          <a href="/" className="text-white/60 hover:text-white text-sm transition-colors">
            🌐 Website
          </a>
          <button
            onClick={handleLogout}
            id="admin-logout-btn"
            className="text-sm px-3 py-1.5 rounded-lg text-white/70 hover:text-white transition-colors"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
            <p className="text-white/40 text-sm mt-0.5">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <button
            onClick={() => { setLoading(true); fetchMetrics(); }}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
          >
            🔄 Refresh
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            ⚠️ {error}
            <br />
            <span className="text-xs text-white/40 mt-1 block">
              Make sure your Supabase credentials are configured in .env.local
            </span>
          </div>
        )}

        {metrics ? (
          <>
            {/* Primary metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <MetricCard label="Today" value={metrics.total_today} icon="📅" color="#60a5fa" sub="Appointments today" />
              <MetricCard label="This Week" value={metrics.total_week} icon="📆" color="#34d399" sub="Last 7 days" />
              <MetricCard label="This Month" value={metrics.total_month} icon="🗓️" color="#f59e0b" sub="Last 30 days" />
              <MetricCard label="All Time" value={metrics.total_all} icon="📊" color="#a78bfa" sub="Total bookings" />
            </div>

            {/* Status metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <MetricCard label="Pending" value={metrics.pending} icon="⏳" color="#fbbf24" />
              <MetricCard label="Confirmed" value={metrics.confirmed} icon="✅" color="#4ade80" />
              <MetricCard label="Completed" value={metrics.completed} icon="✔" color="#a5b4fc" />
              <MetricCard label="Cancelled" value={metrics.cancelled} icon="✗" color="#f87171" />
            </div>

            {/* Recent appointments */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 className="text-white font-bold">Recent Appointments</h2>
                <a
                  href="/admin/appointments"
                  className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                >
                  View All →
                </a>
              </div>

              {metrics.recent.length === 0 ? (
                <div className="p-12 text-center text-white/30">
                  <p className="text-4xl mb-3">📋</p>
                  <p>No appointments yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        {['Booking ID', 'Patient', 'Mobile', 'Department', 'Date', 'Time', 'Status'].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-white/40 font-medium text-xs uppercase tracking-wider">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {metrics.recent.map((appt: Appointment) => (
                        <tr
                          key={appt.id}
                          className="hover:bg-white/[0.02] transition-colors"
                          style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                        >
                          <td className="px-4 py-3 text-blue-400 font-mono text-xs">{appt.booking_id}</td>
                          <td className="px-4 py-3 text-white font-medium">{appt.patient_name}</td>
                          <td className="px-4 py-3 text-white/60">{appt.patient_mobile}</td>
                          <td className="px-4 py-3 text-white/70 max-w-[160px] truncate">{appt.department}</td>
                          <td className="px-4 py-3 text-white/70 whitespace-nowrap">{appt.appointment_date}</td>
                          <td className="px-4 py-3 text-white/70 whitespace-nowrap">{appt.appointment_time}</td>
                          <td className="px-4 py-3"><StatusBadge status={appt.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : !error ? (
          <div className="text-center text-white/40 py-20">No data available</div>
        ) : null}
      </main>
    </div>
  );
}
