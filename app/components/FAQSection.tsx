'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: 'What conditions does Dr. Bharat Bhushan treat?',
    a: 'Dr. Bhushan specializes in a wide range of neurological and general health conditions including epilepsy, migraine, Parkinson\'s disease, stroke, neuropathy, dementia, vertigo, diabetes, and general medicine conditions. He also provides preventive health consultations.',
  },
  {
    q: 'How can I book an appointment?',
    a: 'You can book an appointment through our online form on this page, by calling +91 8696352862, or via WhatsApp at the same number. We typically confirm within 24 hours and aim to accommodate urgent cases same-day.',
  },
  {
    q: 'What are the clinic timings?',
    a: 'The clinic is open Monday to Saturday from 9:00 AM to 1:00 PM and 4:00 PM to 7:00 PM. On Sundays, emergency consultations are available from 10:00 AM to 12:00 PM. Please call ahead for Sunday appointments.',
  },
  {
    q: 'Is Dr. Bhushan available for emergency consultations?',
    a: 'Yes. For neurological emergencies, please call +91 8696352862 immediately. Dr. Bhushan is also reachable via WhatsApp for urgent queries and can guide you on the immediate steps to take.',
  },
  {
    q: 'What should I bring to my first consultation?',
    a: 'Please bring any previous medical reports, MRI/CT scan films, blood test results, and a list of current medications. If you have previous doctor\'s prescriptions, bring those as well. This helps Dr. Bhushan provide the most accurate diagnosis.',
  },
  {
    q: 'Does the clinic have EEG and other diagnostic facilities?',
    a: 'Yes, the clinic is equipped with advanced diagnostic tools including EEG (Electroencephalography), Nerve Conduction Studies (NCS), and EMG testing. Dr. Bhushan can interpret MRI and CT scans and guide you on further investigations.',
  },
  {
    q: 'What is the consultation fee?',
    a: 'Consultation fees vary based on the type of appointment (new patient vs. follow-up) and urgency. Please contact us at +91 8696352862 or WhatsApp for current fee information. We strive to make quality healthcare accessible.',
  },
  {
    q: 'Does Dr. Bhushan offer teleconsultation?',
    a: 'Yes, teleconsultation is available for follow-up appointments and patients who are unable to visit in person. Please WhatsApp us at +91 8696352862 to schedule a video or phone consultation. Initial consultations are preferred in-person.',
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="section-padding"
      style={{ background: 'linear-gradient(180deg, #060d28 0%, #0a1540 100%)' }}
    >
      <div className="container-max">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left */}
          <div className="lg:col-span-2">
            <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Got Questions?</p>
            <h2 className="section-title mb-4">
              Frequently <span className="gradient-text">Asked</span> Questions
            </h2>
            <div className="divider-line" />
            <p className="text-white/60 leading-relaxed mb-8">
              Find answers to the most common questions about our services, appointments, and treatments. Still have questions? Reach out to us directly.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+918696352862"
                className="flex items-center gap-3 glass-card rounded-xl p-4 hover:border-blue-500/40 transition-all"
              >
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-semibold text-white text-sm">Call Us</p>
                  <p className="text-blue-400 text-sm">+91 8696352862</p>
                </div>
              </a>
              <a
                href="https://wa.me/918696352862?text=Hello%2C%20I%20have%20a%20question."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 glass-card rounded-xl p-4 hover:border-green-500/40 transition-all"
              >
                <span className="text-2xl">💬</span>
                <div>
                  <p className="font-semibold text-white text-sm">WhatsApp</p>
                  <p className="text-green-400 text-sm">+91 8696352862</p>
                </div>
              </a>
              <a
                href="https://sitelabindia.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 glass-card rounded-xl p-4 hover:border-purple-500/40 transition-all"
              >
                <span className="text-2xl">🌐</span>
                <div>
                  <p className="font-semibold text-white text-sm">Website</p>
                  <p className="text-purple-400 text-sm">sitelabindia.in</p>
                </div>
              </a>
            </div>
          </div>

          {/* FAQs */}
          <div className="lg:col-span-3">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="faq-item" id={`faq-item-${idx}`}>
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  aria-expanded={openIdx === idx}
                >
                  <span className="font-semibold text-white pr-4">{faq.q}</span>
                  <span
                    className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-transform duration-300 text-blue-400 ${
                      openIdx === idx ? 'rotate-180 bg-blue-600/20' : 'bg-white/5'
                    }`}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIdx === idx ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-white/60 text-sm leading-relaxed px-5 pb-5">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
