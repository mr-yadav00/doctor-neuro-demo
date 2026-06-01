'use client';

import { useState, useEffect, useCallback } from 'react';
import { DEPARTMENTS } from '@/types';
import type { TimeSlot } from '@/types';

interface FormData {
  patient_name: string;
  patient_mobile: string;
  patient_email: string;
  patient_age: string;
  patient_gender: string;
  department: string;
  appointment_date: string;
  appointment_time: string;
  symptoms: string;
  notes: string;
}

const BLANK_FORM: FormData = {
  patient_name: '', patient_mobile: '', patient_email: '',
  patient_age: '', patient_gender: '', department: '',
  appointment_date: '', appointment_time: '', symptoms: '', notes: '',
};

export default function AppointmentSection() {
  const [form, setForm] = useState<FormData>(BLANK_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [apiError, setApiError] = useState('');

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  // Fetch available slots whenever date changes
  const fetchSlots = useCallback(async (date: string) => {
    if (!date) { setSlots([]); return; }
    setLoadingSlots(true);
    setForm(prev => ({ ...prev, appointment_time: '' }));
    try {
      const res = await fetch(`/api/slots?date=${date}`);
      const data = await res.json();
      if (data.success) setSlots(data.data);
      else setSlots([]);
    } catch {
      // Fallback: generate static slots if API unavailable
      const staticSlots: TimeSlot[] = [
        '09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30',
        '16:00','16:30','17:00','17:30','18:00','18:30',
      ].map(t => {
        const [h, m] = t.split(':');
        const hour = parseInt(h);
        const label = `${hour > 12 ? hour - 12 : hour}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
        return { time: t, label, available: true };
      });
      setSlots(staticSlots);
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (form.appointment_date) fetchSlots(form.appointment_date);
  }, [form.appointment_date, fetchSlots]);

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.patient_name.trim()) e.patient_name = 'Full name is required';
    if (!form.patient_mobile.trim()) e.patient_mobile = 'Mobile is required';
    else if (!/^[6-9]\d{9}$/.test(form.patient_mobile.trim())) e.patient_mobile = 'Enter valid 10-digit Indian mobile';
    if (!form.patient_email.trim()) e.patient_email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.patient_email)) e.patient_email = 'Enter valid email';
    if (!form.department) e.department = 'Select a department';
    if (!form.appointment_date) e.appointment_date = 'Select a date';
    if (!form.appointment_time) e.appointment_time = 'Select a time slot';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
    setApiError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setApiError('');

    try {
      const payload = {
        patient_name: form.patient_name.trim(),
        patient_email: form.patient_email.trim().toLowerCase(),
        patient_mobile: form.patient_mobile.trim(),
        patient_age: form.patient_age ? parseInt(form.patient_age) : undefined,
        patient_gender: form.patient_gender || undefined,
        department: form.department,
        appointment_date: form.appointment_date,
        appointment_time: form.appointment_time,
        symptoms: form.symptoms.trim() || undefined,
        notes: form.notes.trim() || undefined,
      };

      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setBookingId(data.data?.booking_id || 'BBN-CONFIRMED');
        setSubmitted(true);
      } else {
        setApiError(data.error || 'Booking failed. Please try again or call us directly.');
      }
    } catch {
      setApiError('Network error. Please check your connection or call +91 8696352862.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setBookingId('');
    setForm(BLANK_FORM);
    setErrors({});
    setApiError('');
    setSlots([]);
  };

  const inputClass = (field: keyof FormData) =>
    `form-input w-full ${errors[field] ? 'border-red-500/50' : ''}`;

  return (
    <section
      id="appointment"
      className="section-padding"
      style={{ background: 'linear-gradient(180deg, #060d28 0%, #0a1540 100%)' }}
    >
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left info */}
          <div>
            <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Book Now</p>
            <h2 className="section-title mb-4">
              Schedule Your <span className="gradient-text">Appointment</span>
            </h2>
            <div className="divider-line" />
            <p className="text-white/60 leading-relaxed mb-8">
              Take the first step towards better health. Fill in your details and we will confirm your appointment within 24 hours. You can also reach us directly via call or WhatsApp.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 glass-card rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center text-xl flex-shrink-0">📍</div>
                <div>
                  <p className="font-semibold text-white">Clinic Location</p>
                  <p className="text-white/60 text-sm">Dr. Bharat Bhushan Neuro &amp; Healthcare Clinic<br />Rajasthan, India</p>
                </div>
              </div>
              <div className="flex items-start gap-4 glass-card rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center text-xl flex-shrink-0">⏰</div>
                <div>
                  <p className="font-semibold text-white">Clinic Hours</p>
                  <p className="text-white/60 text-sm">Mon – Sat: 9:00 AM – 1:00 PM &amp; 4:00 PM – 7:00 PM<br />Sunday: 10:00 AM – 12:00 PM (Emergency Only)</p>
                </div>
              </div>
              <div className="flex items-start gap-4 glass-card rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center text-xl flex-shrink-0">📞</div>
                <div>
                  <p className="font-semibold text-white">Direct Contact</p>
                  <div className="flex gap-3 mt-2">
                    <a href="tel:+918696352862" className="btn-primary !py-1.5 !px-3 !text-xs">📞 Call</a>
                    <a href="https://wa.me/918696352862?text=Hello%20Doctor%2C%20I%20would%20like%20to%20book%20an%20appointment." target="_blank" rel="noopener noreferrer" className="btn-whatsapp !py-1.5 !px-3 !text-xs">💬 WhatsApp</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="glass-card rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6" style={{ background: 'rgba(52,211,153,0.15)', border: '2px solid rgba(52,211,153,0.4)' }}>✅</div>
                <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
                {bookingId && (
                  <div className="inline-block mb-4 px-4 py-2 rounded-xl" style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)' }}>
                    <p className="text-xs text-white/50 mb-1">Your Booking ID</p>
                    <p className="text-blue-300 font-mono font-bold text-lg">{bookingId}</p>
                  </div>
                )}
                <p className="text-white/60 mb-2">Thank you, <span className="text-blue-300 font-semibold">{form.patient_name}</span>!</p>
                <p className="text-white/50 text-sm mb-2">
                  Appointment requested for <strong className="text-white">{form.appointment_date}</strong> at <strong className="text-white">{slots.find(s => s.time === form.appointment_time)?.label || form.appointment_time}</strong>.
                </p>
                <p className="text-white/40 text-xs mb-6">Confirmation sent to {form.patient_email} · We will contact you within 24 hours.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href={`https://wa.me/918696352862?text=Hello%2C%20my%20booking%20ID%20is%20${bookingId}.%20Please%20confirm%20my%20appointment.`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">Confirm on WhatsApp</a>
                  <button onClick={handleReset} className="btn-secondary">Book Another</button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-white mb-6">Patient Details</h3>
                <form onSubmit={handleSubmit} noValidate>
                  {/* Row 1: Name + Mobile */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="form-label" htmlFor="appt-name">Full Name *</label>
                      <input id="appt-name" name="patient_name" type="text" placeholder="Your full name" value={form.patient_name} onChange={handleChange} className={inputClass('patient_name')} autoComplete="name" />
                      {errors.patient_name && <p className="text-red-400 text-xs mt-1">{errors.patient_name}</p>}
                    </div>
                    <div>
                      <label className="form-label" htmlFor="appt-mobile">Mobile Number *</label>
                      <input id="appt-mobile" name="patient_mobile" type="tel" placeholder="10-digit mobile" value={form.patient_mobile} onChange={handleChange} className={inputClass('patient_mobile')} maxLength={10} autoComplete="tel" />
                      {errors.patient_mobile && <p className="text-red-400 text-xs mt-1">{errors.patient_mobile}</p>}
                    </div>
                  </div>

                  {/* Row 2: Email */}
                  <div className="mb-4">
                    <label className="form-label" htmlFor="appt-email">Email Address *</label>
                    <input id="appt-email" name="patient_email" type="email" placeholder="your@email.com" value={form.patient_email} onChange={handleChange} className={inputClass('patient_email')} autoComplete="email" />
                    {errors.patient_email && <p className="text-red-400 text-xs mt-1">{errors.patient_email}</p>}
                  </div>

                  {/* Row 3: Age + Gender */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="form-label" htmlFor="appt-age">Age</label>
                      <input id="appt-age" name="patient_age" type="number" placeholder="Your age" value={form.patient_age} onChange={handleChange} className="form-input w-full" min={1} max={120} />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="appt-gender">Gender</label>
                      <select id="appt-gender" name="patient_gender" value={form.patient_gender} onChange={handleChange} className="form-input w-full" style={{ colorScheme: 'dark' }}>
                        <option value="" style={{ background: '#0a1540' }}>Select gender</option>
                        {['Male', 'Female', 'Other', 'Prefer not to say'].map(g => <option key={g} value={g} style={{ background: '#0a1540' }}>{g}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Department */}
                  <div className="mb-4">
                    <label className="form-label" htmlFor="appt-dept">Department *</label>
                    <select id="appt-dept" name="department" value={form.department} onChange={handleChange} className={`${inputClass('department')} w-full`} style={{ colorScheme: 'dark' }}>
                      <option value="" style={{ background: '#0a1540' }}>Select department</option>
                      {DEPARTMENTS.map(d => <option key={d} value={d} style={{ background: '#0a1540' }}>{d}</option>)}
                    </select>
                    {errors.department && <p className="text-red-400 text-xs mt-1">{errors.department}</p>}
                  </div>

                  {/* Row 4: Date + Time */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="form-label" htmlFor="appt-date">Preferred Date *</label>
                      <input id="appt-date" name="appointment_date" type="date" value={form.appointment_date} onChange={handleChange} min={today} max={maxDateStr} className={`${inputClass('appointment_date')} w-full`} style={{ colorScheme: 'dark' }} />
                      {errors.appointment_date && <p className="text-red-400 text-xs mt-1">{errors.appointment_date}</p>}
                    </div>
                    <div>
                      <label className="form-label" htmlFor="appt-time">
                        Time Slot *
                        {loadingSlots && <span className="text-blue-400 text-xs ml-2 animate-pulse">Loading...</span>}
                      </label>
                      <select id="appt-time" name="appointment_time" value={form.appointment_time} onChange={handleChange} disabled={!form.appointment_date || loadingSlots} className={`${inputClass('appointment_time')} w-full disabled:opacity-50`} style={{ colorScheme: 'dark' }}>
                        <option value="" style={{ background: '#0a1540' }}>
                          {!form.appointment_date ? 'Select date first' : loadingSlots ? 'Loading slots...' : 'Select time'}
                        </option>
                        {slots.length > 0 && (
                          <>
                            <optgroup label="Morning (9 AM – 1 PM)" style={{ background: '#0a1540' }}>
                              {slots.filter(s => parseInt(s.time) < 13).map(s => (
                                <option key={s.time} value={s.time} disabled={!s.available} style={{ background: '#0a1540' }}>
                                  {s.label}{!s.available ? ' — Booked' : ''}
                                </option>
                              ))}
                            </optgroup>
                            <optgroup label="Evening (4 PM – 7 PM)" style={{ background: '#0a1540' }}>
                              {slots.filter(s => parseInt(s.time) >= 16).map(s => (
                                <option key={s.time} value={s.time} disabled={!s.available} style={{ background: '#0a1540' }}>
                                  {s.label}{!s.available ? ' — Booked' : ''}
                                </option>
                              ))}
                            </optgroup>
                          </>
                        )}
                      </select>
                      {errors.appointment_time && <p className="text-red-400 text-xs mt-1">{errors.appointment_time}</p>}
                    </div>
                  </div>

                  {/* Symptoms */}
                  <div className="mb-4">
                    <label className="form-label" htmlFor="appt-symptoms">Symptoms (Optional)</label>
                    <textarea id="appt-symptoms" name="symptoms" rows={2} placeholder="Briefly describe your symptoms..." value={form.symptoms} onChange={handleChange} className="form-input w-full resize-none" maxLength={500} />
                  </div>

                  {/* Notes */}
                  <div className="mb-6">
                    <label className="form-label" htmlFor="appt-notes">Additional Notes (Optional)</label>
                    <textarea id="appt-notes" name="notes" rows={2} placeholder="Any additional information..." value={form.notes} onChange={handleChange} className="form-input w-full resize-none" maxLength={500} />
                  </div>

                  {/* API Error */}
                  {apiError && (
                    <div className="mb-4 p-3 rounded-xl text-red-400 text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                      ⚠️ {apiError}
                    </div>
                  )}

                  <button type="submit" disabled={submitting} className="btn-primary w-full justify-center !py-4 !text-base" id="submit-appointment-btn">
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        Book Appointment
                      </>
                    )}
                  </button>

                  <p className="text-center text-white/40 text-xs mt-4">
                    Or call/WhatsApp directly at{' '}
                    <a href="tel:+918696352862" className="text-blue-400 hover:underline">+91 8696352862</a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
