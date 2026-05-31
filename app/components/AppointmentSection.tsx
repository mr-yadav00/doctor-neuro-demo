'use client';

import { useState } from 'react';

interface FormData {
  name: string;
  mobile: string;
  date: string;
  time: string;
  department: string;
  message: string;
}

interface FormErrors {
  name?: string;
  mobile?: string;
  date?: string;
  time?: string;
  department?: string;
}

const DEPARTMENTS = [
  'Neurology',
  'General Consultation',
  'Brain & Nerve Care',
  'Preventive Health',
  'Diabetes & Lifestyle Care',
  'General Medicine',
  'Emergency Consultation',
];

const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
  '06:00 PM', '06:30 PM',
];

export default function AppointmentSection() {
  const [form, setForm] = useState<FormData>({
    name: '', mobile: '', date: '', time: '', department: '', message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) {
      newErrors.mobile = 'Enter a valid 10-digit Indian mobile number';
    }
    if (!form.date) newErrors.date = 'Preferred date is required';
    if (!form.time) newErrors.time = 'Preferred time is required';
    if (!form.department) newErrors.department = 'Please select a department';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setForm({ name: '', mobile: '', date: '', time: '', department: '', message: '' });
    setErrors({});
  };

  const today = new Date().toISOString().split('T')[0];

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

            {/* Clinic info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 glass-card rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center text-xl flex-shrink-0">📍</div>
                <div>
                  <p className="font-semibold text-white">Clinic Location</p>
                  <p className="text-white/60 text-sm">Dr. Bharat Bhushan Neuro & Healthcare Clinic<br />Rajasthan, India</p>
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
                    <a href="tel:+918696352862" className="btn-primary !py-1.5 !px-3 !text-xs">
                      📞 Call
                    </a>
                    <a
                      href="https://wa.me/918696352862?text=Hello%20Doctor%2C%20I%20would%20like%20to%20book%20an%20appointment."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp !py-1.5 !px-3 !text-xs"
                    >
                      💬 WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="glass-card rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6"
                  style={{ background: 'rgba(52,211,153,0.15)', border: '2px solid rgba(52,211,153,0.4)' }}
                >
                  ✅
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Appointment Requested!</h3>
                <p className="text-white/60 mb-2">
                  Thank you, <span className="text-blue-300 font-semibold">{form.name}</span>!
                </p>
                <p className="text-white/50 text-sm mb-6">
                  We have received your appointment request for <strong className="text-white">{form.date}</strong> at <strong className="text-white">{form.time}</strong>.<br />
                  Our team will confirm within 24 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://wa.me/918696352862?text=Hello%2C%20I%20just%20submitted%20an%20appointment%20request."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                  >
                    Confirm on WhatsApp
                  </a>
                  <button onClick={handleReset} className="btn-secondary">
                    Book Another
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-white mb-6">Patient Details</h3>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    {/* Name */}
                    <div>
                      <label className="form-label" htmlFor="appt-name">Full Name *</label>
                      <input
                        id="appt-name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        className="form-input"
                        autoComplete="name"
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Mobile */}
                    <div>
                      <label className="form-label" htmlFor="appt-mobile">Mobile Number *</label>
                      <input
                        id="appt-mobile"
                        name="mobile"
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={form.mobile}
                        onChange={handleChange}
                        className="form-input"
                        maxLength={10}
                        autoComplete="tel"
                      />
                      {errors.mobile && <p className="text-red-400 text-xs mt-1">{errors.mobile}</p>}
                    </div>

                    {/* Date */}
                    <div>
                      <label className="form-label" htmlFor="appt-date">Preferred Date *</label>
                      <input
                        id="appt-date"
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        min={today}
                        className="form-input"
                        style={{ colorScheme: 'dark' }}
                      />
                      {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
                    </div>

                    {/* Time */}
                    <div>
                      <label className="form-label" htmlFor="appt-time">Preferred Time *</label>
                      <select
                        id="appt-time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        className="form-input"
                        style={{ colorScheme: 'dark' }}
                      >
                        <option value="" style={{ background: '#0a1540' }}>Select time slot</option>
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot} style={{ background: '#0a1540' }}>{slot}</option>
                        ))}
                      </select>
                      {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time}</p>}
                    </div>
                  </div>

                  {/* Department */}
                  <div className="mb-4">
                    <label className="form-label" htmlFor="appt-dept">Department *</label>
                    <select
                      id="appt-dept"
                      name="department"
                      value={form.department}
                      onChange={handleChange}
                      className="form-input"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="" style={{ background: '#0a1540' }}>Select department</option>
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept} style={{ background: '#0a1540' }}>{dept}</option>
                      ))}
                    </select>
                    {errors.department && <p className="text-red-400 text-xs mt-1">{errors.department}</p>}
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label className="form-label" htmlFor="appt-msg">Message / Symptoms (Optional)</label>
                    <textarea
                      id="appt-msg"
                      name="message"
                      rows={3}
                      placeholder="Briefly describe your symptoms or concerns..."
                      value={form.message}
                      onChange={handleChange}
                      className="form-input resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full justify-center !py-4 !text-base"
                    id="submit-appointment-btn"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Request Appointment
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
