'use client';

const SERVICES = [
  {
    category: 'Neurology',
    icon: '🧠',
    items: [
      'EEG (Electroencephalography)',
      'Nerve Conduction Studies (NCS)',
      'EMG Testing',
      'Epilepsy Management',
      'Stroke Assessment & Treatment',
      'Parkinson\'s Disease Management',
      'Dementia Evaluation',
      'Headache & Migraine Clinic',
    ],
  },
  {
    category: 'Diagnostic Services',
    icon: '🔬',
    items: [
      'Brain MRI Interpretation',
      'CT Scan Analysis',
      'Blood Panel & Lab Work',
      'Cognitive Assessment',
      'Memory Testing',
      'Balance & Gait Analysis',
      'Vision Field Testing',
      'Doppler Studies',
    ],
  },
  {
    category: 'Preventive & Lifestyle',
    icon: '🛡️',
    items: [
      'Annual Health Checkups',
      'Diabetes Screening & Management',
      'Hypertension Management',
      'Cholesterol & Lipid Profile',
      'Weight Management',
      'Diet & Nutrition Counseling',
      'Stress Management',
      'Sleep Disorder Treatment',
    ],
  },
  {
    category: 'General Medicine',
    icon: '🩺',
    items: [
      'Fever & Infections',
      'Respiratory Illness',
      'Gastroenterology Referrals',
      'Thyroid Disorders',
      'Vitamin Deficiency Treatment',
      'Post-COVID Complications',
      'Chronic Pain Management',
      'Geriatric Care',
    ],
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="section-padding"
      style={{ background: 'linear-gradient(180deg, #060d28 0%, #0a1540 100%)' }}
    >
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3">What We Offer</p>
          <h2 className="section-title">
            Our <span className="gradient-text">Services</span> &amp; Treatments
          </h2>
          <div className="divider-line mx-auto" style={{ background: 'linear-gradient(90deg, #a78bfa, #2563eb)' }} />
          <p className="section-subtitle mx-auto text-center">
            Comprehensive healthcare services covering neurology, diagnostics, preventive health and general medicine.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map((service) => (
            <div key={service.category} className="glass-card card-shine rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)' }}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{service.category}</h3>
              </div>
              <ul className="space-y-2">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/70 text-sm">
                    <svg className="w-4 h-4 text-teal-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div
          className="mt-12 rounded-2xl p-8 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0f2060 50%, #1d4ed8 100%)' }}
        >
          <div className="absolute inset-0 hero-grid-bg opacity-30" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-2">Not Sure Which Service You Need?</h3>
            <p className="text-white/70 mb-6">Book a general consultation and Dr. Bhushan will guide you to the right treatment.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#appointment"
                onClick={(e) => { e.preventDefault(); document.querySelector('#appointment')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-primary"
                id="services-book-btn"
              >
                Book Free Consultation
              </a>
              <a
                href="https://wa.me/918696352862?text=Hello%20Doctor%2C%20I%20need%20guidance%20on%20which%20service%20I%20need."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
