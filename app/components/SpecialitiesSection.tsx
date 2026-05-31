'use client';

const SPECIALITIES = [
  {
    icon: '🧠',
    title: 'Neurology',
    desc: 'Advanced diagnosis and treatment of neurological disorders including epilepsy, Parkinson\'s, stroke, and more.',
    color: 'from-blue-600/20 to-purple-600/20',
    border: 'rgba(139,92,246,0.3)',
    tags: ['Epilepsy', 'Parkinson\'s', 'Stroke'],
  },
  {
    icon: '🩺',
    title: 'General Consultation',
    desc: 'Comprehensive health assessments, routine checkups, and personalized health planning for all ages.',
    color: 'from-teal-600/20 to-cyan-600/20',
    border: 'rgba(45,212,191,0.3)',
    tags: ['Health Checkup', 'Preventive Care', 'Follow-up'],
  },
  {
    icon: '⚡',
    title: 'Brain & Nerve Care',
    desc: 'Specialized care for brain and peripheral nerve conditions including neuropathy, headaches, and nerve injuries.',
    color: 'from-yellow-600/20 to-orange-600/20',
    border: 'rgba(251,191,36,0.3)',
    tags: ['Neuropathy', 'Migraine', 'EEG'],
  },
  {
    icon: '🛡️',
    title: 'Preventive Health',
    desc: 'Proactive health screenings, lifestyle modification guidance, and disease prevention strategies.',
    color: 'from-green-600/20 to-emerald-600/20',
    border: 'rgba(52,211,153,0.3)',
    tags: ['Screening', 'Lifestyle', 'Wellness'],
  },
  {
    icon: '💉',
    title: 'Diabetes & Lifestyle Care',
    desc: 'Expert management of diabetes, metabolic syndrome, and lifestyle-related disorders with personalized plans.',
    color: 'from-pink-600/20 to-rose-600/20',
    border: 'rgba(244,114,182,0.3)',
    tags: ['Diabetes', 'Metabolic', 'Nutrition'],
  },
  {
    icon: '🏥',
    title: 'General Medicine',
    desc: 'Holistic internal medicine covering infections, chronic diseases, and complex multi-system conditions.',
    color: 'from-indigo-600/20 to-blue-600/20',
    border: 'rgba(99,102,241,0.3)',
    tags: ['Internal Medicine', 'Chronic Diseases', 'Infections'],
  },
];

export default function SpecialitiesSection() {
  return (
    <section id="specialities" className="section-padding" style={{ background: 'linear-gradient(180deg, #0a1540 0%, #060d28 100%)' }}>
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-teal-400 font-semibold text-sm uppercase tracking-widest mb-3">What We Treat</p>
          <h2 className="section-title">
            Our <span className="gradient-text">Specialities</span>
          </h2>
          <div className="divider-line mx-auto" style={{ background: 'linear-gradient(90deg, #2dd4bf, #2563eb)' }} />
          <p className="section-subtitle mx-auto text-center">
            Comprehensive medical expertise across neurology and general healthcare — all under one roof.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPECIALITIES.map((spec, idx) => (
            <div
              key={spec.title}
              className="service-card card-shine"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${spec.color} flex items-center justify-center text-3xl mb-5`}
                style={{ border: `1px solid ${spec.border}` }}
              >
                {spec.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{spec.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed mb-4">{spec.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {spec.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full text-white/70"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Learn more arrow */}
              <div className="mt-5 flex items-center gap-2 text-blue-400 text-sm font-medium group-hover:gap-3 transition-all">
                <a
                  href="#appointment"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#appointment')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="flex items-center gap-2 hover:text-teal-400 transition-colors"
                >
                  Book Consultation
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
