'use client';

const STATS = [
  {
    number: '10,000+',
    label: 'Patients Treated',
    icon: '👥',
    desc: 'Across Rajasthan',
  },
  {
    number: '15+',
    label: 'Years Experience',
    icon: '📅',
    desc: 'Dedicated Practice',
  },
  {
    number: '4.9 ⭐',
    label: 'Patient Rating',
    icon: '🌟',
    desc: 'Average Score',
  },
  {
    number: '6',
    label: 'Specialities',
    icon: '🏥',
    desc: 'Areas of Expertise',
  },
  {
    number: '98%',
    label: 'Patient Satisfaction',
    icon: '❤️',
    desc: 'Recommend Us',
  },
  {
    number: '24/7',
    label: 'Emergency Support',
    icon: '🚑',
    desc: 'WhatsApp Available',
  },
];

export default function StatsSection() {
  return (
    <section
      id="stats"
      className="py-20 px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f2060 0%, #1a3080 50%, #0f2060 100%)',
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 hero-grid-bg opacity-30" />

      {/* Top gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(37,99,235,0.2)' }}
      />

      <div className="container-max relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-gold-400 font-semibold text-sm uppercase tracking-widest mb-3" style={{ color: '#fbbf24' }}>
            Our Numbers
          </p>
          <h2 className="section-title">
            Trusted by <span className="gradient-text-gold">Thousands</span>
          </h2>
          <div className="divider-line mx-auto" style={{ background: 'linear-gradient(90deg, #fbbf24, #f97316)' }} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map((stat, idx) => (
            <div key={stat.label} className="stat-card" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="text-4xl mb-2">{stat.icon}</div>
              <p className="text-2xl font-black gradient-text leading-none mb-1">{stat.number}</p>
              <p className="text-white font-semibold text-sm">{stat.label}</p>
              <p className="text-white/40 text-xs mt-0.5">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-12 glass rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center text-2xl">🇮🇳</div>
            <div>
              <p className="font-bold text-white">Rajasthan's Trusted Neurologist</p>
              <p className="text-white/50 text-sm">Serving patients across the state since 2009</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            {['IMA Member', 'AIIMS Fellowship', 'ISO Certified', 'NABH Standards'].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-sm text-white/70">
                <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {badge}
              </div>
            ))}
          </div>
          <a
            href="https://wa.me/918696352862?text=Hello%20Dr.%20Bharat%20Bhushan%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp !py-2 !px-5"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
