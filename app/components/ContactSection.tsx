'use client';

import { useState } from 'react';

const TIMINGS = [
  { day: 'Monday – Friday', morning: '9:00 AM – 1:00 PM', evening: '4:00 PM – 7:00 PM' },
  { day: 'Saturday', morning: '9:00 AM – 1:00 PM', evening: '4:00 PM – 6:00 PM' },
  { day: 'Sunday', morning: '10:00 AM – 12:00 PM', evening: 'Emergency Only' },
];

interface ContactFormData {
  name: string;
  mobile: string;
  email: string;
  message: string;
}

const BLANK_FORM: ContactFormData = {
  name: '',
  mobile: '',
  email: '',
  message: '',
};

export default function ContactSection() {
  const [form, setForm] = useState<ContactFormData>(BLANK_FORM);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');
  const [apiSuccessMsg, setApiSuccessMsg] = useState('');

  const validate = (): boolean => {
    const e: Partial<ContactFormData> = {};
    if (!form.name.trim()) {
      e.name = 'Name is required';
    } else if (form.name.trim().length < 2) {
      e.name = 'Name must be at least 2 characters';
    }

    if (!form.mobile.trim()) {
      e.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) {
      e.mobile = 'Enter a valid 10-digit Indian mobile number';
    }

    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = 'Enter a valid email address';
    }

    if (form.message.trim() && form.message.trim().length > 1000) {
      e.message = 'Message must be less than 1000 characters';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setApiError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setApiError('');

    try {
      const payload = {
        name: form.name.trim(),
        mobile: form.mobile.trim(),
        email: form.email.trim() || undefined,
        message: form.message.trim() || undefined,
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setApiSuccessMsg(data.message || 'Thank you for reaching out!');
        setSubmitted(true);
      } else {
        setApiError(data.error || 'Failed to send message. Please try again.');
      }
    } catch {
      setApiError('Network error. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setForm(BLANK_FORM);
    setErrors({});
    setApiError('');
    setApiSuccessMsg('');
  };

  const inputClass = (field: keyof ContactFormData) =>
    `form-input w-full ${errors[field] ? 'border-red-500/50' : ''}`;

  return (
    <section
      id="contact"
      className="section-padding"
      style={{ background: 'linear-gradient(180deg, #0a1540 0%, #060d28 100%)' }}
    >
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-teal-400 font-semibold text-sm uppercase tracking-widest mb-3">Get In Touch</p>
          <h2 className="section-title">
            Contact <span className="gradient-text">Us</span>
          </h2>
          <div className="divider-line mx-auto" />
          <p className="section-subtitle mx-auto text-center">
            We're here to help. Reach out via call, WhatsApp, or visit us at the clinic.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {/* Phone */}
          <a
            href="tel:+918696352862"
            className="glass-card card-shine rounded-2xl p-6 text-center group"
            id="contact-phone-card"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
              📞
            </div>
            <h3 className="font-bold text-white text-lg mb-1">Call Us</h3>
            <p className="text-blue-400 text-xl font-semibold mb-3">+91 8696352862</p>
            <p className="text-white/50 text-sm mb-4">Available Mon–Sat during clinic hours</p>
            <span className="btn-primary !py-2.5 !px-5 !text-sm inline-flex">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
              </svg>
              Call Now
            </span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/918696352862?text=Hello%20Dr.%20Bharat%20Bhushan%2C%20I%20would%20like%20to%20get%20in%20touch."
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card card-shine rounded-2xl p-6 text-center group"
            id="contact-whatsapp-card"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-green-600/15 border border-green-500/20 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
              💬
            </div>
            <h3 className="font-bold text-white text-lg mb-1">WhatsApp</h3>
            <p className="text-green-400 text-xl font-semibold mb-3">+91 8696352862</p>
            <p className="text-white/50 text-sm mb-4">Chat for appointments, queries & emergencies</p>
            <span className="btn-whatsapp !py-2.5 !px-5 !text-sm inline-flex">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat Now
            </span>
          </a>

          {/* Location */}
          <div className="glass-card card-shine rounded-2xl p-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-600/15 border border-purple-500/20 flex items-center justify-center text-3xl mb-4">
              📍
            </div>
            <h3 className="font-bold text-white text-lg mb-1">Visit Us</h3>
            <p className="text-purple-400 text-base font-medium mb-2">Rajasthan, India</p>
            <p className="text-white/50 text-sm mb-4">
              Dr. Bharat Bhushan Neuro &amp; Healthcare Clinic<br />
              Rajasthan, India
            </p>
            <a
              href="https://maps.google.com/?q=Rajasthan,India"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !py-2.5 !px-5 !text-sm inline-flex"
              id="get-directions-btn"
            >
              Get Directions
            </a>
          </div>
        </div>

        {/* Map, Timings & Contact Form Row */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Map + Timings */}
          <div className="lg:col-span-5 space-y-6">
            {/* Map */}
            <div
              className="rounded-2xl overflow-hidden relative"
              style={{ height: 280, background: 'linear-gradient(135deg, #0f2060 0%, #1a3080 100%)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {/* Embedded map placeholder styled premium */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="text-5xl">🗺️</div>
                <div className="text-center px-4">
                  <p className="text-white font-bold text-base">Dr. Bharat Bhushan Clinic</p>
                  <p className="text-white/60 text-xs">Rajasthan, India</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Rajasthan+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !py-2 !px-4 !text-xs"
                >
                  View on Google Maps
                </a>
              </div>
              {/* Grid decoration */}
              <div className="absolute inset-0 hero-grid-bg opacity-20" />
            </div>

            {/* Timings */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span>⏰</span> Clinic Timings
              </h3>
              <div className="space-y-3.5">
                {TIMINGS.map((t) => (
                  <div key={t.day} className="flex items-start gap-3 pb-3 border-b border-white/5 last:border-0 last:pb-0">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ background: t.day.includes('Sunday') ? '#f97316' : '#2dd4bf' }}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-white text-xs">{t.day}</p>
                      <div className="flex flex-wrap gap-2 mt-0.5">
                        <span className="text-[11px] text-white/60">🌅 {t.morning}</span>
                        <span className="text-[11px] text-white/60">🌆 {t.evening}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-4 rounded-xl p-3 flex items-center gap-3"
                style={{ background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.15)' }}
              >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                <p className="text-white/80 text-xs">
                  <span className="font-semibold text-green-400">Available Now</span> · Contact on WhatsApp for query support
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-8" id="contact-form-container">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6" style={{ background: 'rgba(52,211,153,0.15)', border: '2px solid rgba(52,211,153,0.4)' }}>
                  📨
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                <p className="text-white/70 max-w-md mx-auto mb-6">
                  {apiSuccessMsg}
                </p>
                <button onClick={handleReset} className="btn-secondary">
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-white mb-1">Send us a Message</h3>
                <p className="text-white/50 text-sm mb-6">Have questions or want to discuss clinical consulting? Write to us.</p>
                
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label className="form-label" htmlFor="contact-name">Full Name *</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass('name')}
                      autoComplete="name"
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Mobile Input */}
                  <div>
                    <label className="form-label" htmlFor="contact-mobile">Mobile Number *</label>
                    <input
                      id="contact-mobile"
                      name="mobile"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={form.mobile}
                      onChange={handleChange}
                      className={inputClass('mobile')}
                      maxLength={10}
                      autoComplete="tel"
                    />
                    {errors.mobile && <p className="text-red-400 text-xs mt-1">{errors.mobile}</p>}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="form-label" htmlFor="contact-email">Email Address (Optional)</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass('email')}
                      autoComplete="email"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="form-label" htmlFor="contact-message">Your Message (Optional)</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      placeholder="How can we help you?"
                      value={form.message}
                      onChange={handleChange}
                      className={`form-input w-full resize-none ${errors.message ? 'border-red-500/50' : ''}`}
                      maxLength={1000}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {/* API Error Box */}
                  {apiError && (
                    <div className="p-3 rounded-xl text-red-400 text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                      ⚠️ {apiError}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full justify-center !py-3.5 !text-base"
                    id="submit-contact-btn"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
