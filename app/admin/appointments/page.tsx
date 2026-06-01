'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Appointment, AppointmentStatus } from '@/types';

const STATUS_OPTIONS: AppointmentStatus[] = ['pending', 'confirmed', 'completed', 'cancelled'];

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const map: Record<AppointmentStatus, { bg: string; text: string; emoji: string }> = {
    pending: { bg: 'rgba(251,191,36,0.15)', text: '#fbbf24', emoji: '⏳' },
    confirmed: { bg: 'rgba(74,222,128,0.15)', text: '#4ade80', emoji: '✅' },
    completed: { bg: 'rgba(165,180,252,0.15)', text: '#a5b4fc', emoji: '✔' },
    cancelled: { bg: 'rgba(248,113,113,0.15)', text: '#f87171', emoji: '✗' },
  };
  const s = map[status] || map.pending;
  return (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-full capitalize" style={{ background: s.bg, color: s.text }}>
      {s.emoji} {status}
    </span>
  );
}

export default function AppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Filters
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');

  // Modal
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [actionError, setActionError] = useState('');

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: '15',
        ...(filterStatus && { status: filterStatus }),
        ...(filterDate && { date: filterDate }),
        ...(search && { search }),
      });

      const res = await fetch(`/api/appointments?${params}`);
      if (res.status === 401) { router.push('/admin'); return; }

      const data = await res.json();
      if (data.success) {
        setAppointments(data.data.appointments);
        setTotalPages(data.data.pagination.totalPages);
        setTotal(data.data.pagination.total);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, search, filterStatus, filterDate, router]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  async function handleStatusUpdate(id: string, status: AppointmentStatus) {
    setUpdating(true);
    setActionError('');
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setSelected(null);
        fetchAppointments();
      } else {
        setActionError(data.error);
      }
    } catch {
      setActionError('Update failed. Please try again.');
    } finally {
      setUpdating(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this appointment? This cannot be undone.')) return;
    setDeleting(true);
    setActionError('');
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setSelected(null);
        fetchAppointments();
      } else {
        setActionError(data.error);
      }
    } catch {
      setActionError('Delete failed. Please try again.');
    } finally {
      setDeleting(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin');
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #060d28 0%, #0a1540 100%)' }}>
      {/* Nav */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-6 py-4"
        style={{ background: 'rgba(6,13,40,0.95)', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">📋</span>
          <div>
            <p className="text-white font-bold text-sm">Appointments</p>
            <p className="text-blue-400 text-xs">Manage Bookings · {total} total</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/admin/dashboard" className="text-white/60 hover:text-white text-sm transition-colors">← Dashboard</a>
          <a href="/" className="text-white/60 hover:text-white text-sm transition-colors">🌐 Website</a>
          <button onClick={handleLogout} className="text-sm px-3 py-1.5 rounded-lg text-white/70 hover:text-white transition-colors" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
            Sign Out
          </button>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="🔍 Search by name, mobile, or ID..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            id="appointments-search"
            className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl text-white text-sm placeholder-white/30 outline-none"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          />
          <select
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
            id="filter-status"
            className="px-4 py-2.5 rounded-xl text-white text-sm outline-none"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s} className="bg-gray-900 capitalize">{s}</option>)}
          </select>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => { setFilterDate(e.target.value); setPage(1); }}
            id="filter-date"
            className="px-4 py-2.5 rounded-xl text-white text-sm outline-none"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          />
          {(search || filterStatus || filterDate) && (
            <button
              onClick={() => { setSearch(''); setFilterStatus(''); setFilterDate(''); setPage(1); }}
              className="px-4 py-2.5 rounded-xl text-white/60 hover:text-white text-sm transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              ✕ Clear
            </button>
          )}
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-16 text-white/30">
              <p className="text-4xl mb-3">📭</p>
              <p>No appointments found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    {['ID', 'Patient', 'Mobile', 'Department', 'Date', 'Time', 'Age/Gender', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-white/40 font-medium text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => (
                    <tr key={appt.id} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td className="px-4 py-3 text-blue-400 font-mono text-xs whitespace-nowrap">{appt.booking_id}</td>
                      <td className="px-4 py-3">
                        <p className="text-white font-medium">{appt.patient_name}</p>
                        <p className="text-white/40 text-xs">{appt.patient_email}</p>
                      </td>
                      <td className="px-4 py-3 text-white/70 whitespace-nowrap">{appt.patient_mobile}</td>
                      <td className="px-4 py-3 text-white/70 max-w-[140px] truncate">{appt.department}</td>
                      <td className="px-4 py-3 text-white/70 whitespace-nowrap">{appt.appointment_date}</td>
                      <td className="px-4 py-3 text-white/70 whitespace-nowrap">{appt.appointment_time}</td>
                      <td className="px-4 py-3 text-white/50 text-xs">{appt.patient_age || '—'} / {appt.patient_gender || '—'}</td>
                      <td className="px-4 py-3"><StatusBadge status={appt.status} /></td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => { setSelected(appt); setActionError(''); }}
                          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Manage →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1.5 rounded-lg text-white/60 text-sm disabled:opacity-30 transition-colors"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              ← Prev
            </button>
            <span className="text-white/40 text-sm">Page {page} of {totalPages}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 rounded-lg text-white/60 text-sm disabled:opacity-30 transition-colors"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              Next →
            </button>
          </div>
        )}
      </main>

      {/* Detail / Management Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl overflow-hidden"
            style={{ background: '#0f1e40', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div>
                <p className="text-white font-bold">{selected.patient_name}</p>
                <p className="text-blue-400 text-xs font-mono">{selected.booking_id}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white text-xl transition-colors">✕</button>
            </div>

            {/* Details */}
            <div className="p-6 space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                {[
                  ['📱 Mobile', selected.patient_mobile],
                  ['📧 Email', selected.patient_email],
                  ['🎂 Age', selected.patient_age ? String(selected.patient_age) : '—'],
                  ['⚧ Gender', selected.patient_gender || '—'],
                  ['🏥 Department', selected.department],
                  ['📅 Date', selected.appointment_date],
                  ['⏰ Time', selected.appointment_time],
                  ['📊 Status', selected.status],
                ].map(([label, val]) => (
                  <div key={label} className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <p className="text-white/40 text-xs mb-0.5">{label}</p>
                    <p className="text-white text-sm font-medium capitalize">{val}</p>
                  </div>
                ))}
              </div>
              {selected.symptoms && (
                <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <p className="text-white/40 text-xs mb-0.5">🩺 Symptoms</p>
                  <p className="text-white text-sm">{selected.symptoms}</p>
                </div>
              )}
              {selected.notes && (
                <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <p className="text-white/40 text-xs mb-0.5">📝 Notes</p>
                  <p className="text-white text-sm">{selected.notes}</p>
                </div>
              )}

              {actionError && (
                <div className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">⚠️ {actionError}</div>
              )}

              {/* Status update */}
              <div>
                <p className="text-white/50 text-xs mb-2 uppercase tracking-wider">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusUpdate(selected.id, s)}
                      disabled={updating || selected.status === s}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all disabled:opacity-40"
                      style={{
                        background: selected.status === s ? 'rgba(37,99,235,0.3)' : 'rgba(255,255,255,0.06)',
                        border: selected.status === s ? '1px solid rgba(37,99,235,0.5)' : '1px solid rgba(255,255,255,0.1)',
                        color: selected.status === s ? '#60a5fa' : '#9ca3af',
                      }}
                    >
                      {updating ? '...' : s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex gap-3 px-6 pb-6">
              <a
                href={`tel:+91${selected.patient_mobile}`}
                className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                style={{ background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(37,99,235,0.3)' }}
              >
                📞 Call Patient
              </a>
              <a
                href={`https://wa.me/91${selected.patient_mobile}?text=Hello ${encodeURIComponent(selected.patient_name)}, your appointment (${selected.booking_id}) at Dr. Bharat Bhushan clinic on ${selected.appointment_date} at ${selected.appointment_time} is confirmed.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                style={{ background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.3)' }}
              >
                💬 WhatsApp
              </a>
              <button
                onClick={() => handleDelete(selected.id)}
                disabled={deleting}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-red-400 transition-all disabled:opacity-40"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
              >
                {deleting ? '...' : '🗑'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
