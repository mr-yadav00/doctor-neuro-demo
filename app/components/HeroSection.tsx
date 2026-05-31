'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

function Particle({ style }: { style: React.CSSProperties }) {
  return <div className="particle" style={style} />;
}

export default function HeroSection() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    left: `${Math.random() * 100}%`,
    duration: `${Math.random() * 20 + 15}s`,
    delay: `${Math.random() * 10}s`,
  }));

  const handleScroll = (href: string) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden hero-grid-bg"
      style={{
        background: 'linear-gradient(135deg, #060d28 0%, #0a1540 40%, #102060 70%, #0a1540 100%)',
      }}
    >
      {/* Ambient blobs */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(37,99,235,0.12)', animation: 'float 8s ease-in-out infinite' }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(45,212,191,0.08)', animation: 'float 10s ease-in-out infinite reverse' }}
      />

      {/* Particles */}
      {particles.map((p) => (
        <Particle
          key={p.id}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: p.left,
            bottom: '-20px',
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}

      <div className="container-max section-padding pt-32 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 border border-blue-500/30">
              <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse-glow" />
              <span className="text-sm text-blue-300 font-medium">Available for Appointments</span>
            </div>

            <h1 className="section-title mb-2" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
              Expert{' '}
              <span className="gradient-text">Neurological</span>
              <br />
              Care You Can
              <br />
              <span className="gradient-text-gold">Trust</span>
            </h1>

            <p className="text-lg text-white/60 mb-2 font-medium">
              Dr. Bharat Bhushan — MBBS, MD (Neurology)
            </p>
            <p className="text-white/50 mb-8 text-base leading-relaxed max-w-lg">
              With 15+ years of dedicated practice, Dr. Bharat Bhushan brings world-class neurological and healthcare expertise to Rajasthan. Comprehensive care for brain, nerve, and lifestyle disorders.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mb-10">
              {[
                { icon: '🏆', label: '15+ Years Exp.' },
                { icon: '👥', label: '10,000+ Patients' },
                { icon: '⭐', label: '4.9 Rating' },
                { icon: '🏥', label: 'Rajasthan, India' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 glass rounded-lg px-3 py-2">
                  <span>{badge.icon}</span>
                  <span className="text-sm text-white/80 font-medium">{badge.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#appointment"
                onClick={(e) => { e.preventDefault(); handleScroll('#appointment'); }}
                className="btn-primary"
                id="hero-book-btn"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Appointment
              </a>
              <a href="tel:+918696352862" className="btn-secondary" id="hero-call-btn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
                Call Now
              </a>
              <a
                href="https://wa.me/918696352862?text=Hello%20Dr.%20Bharat%20Bhushan%2C%20I%20would%20like%20to%20book%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                id="hero-whatsapp-btn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          {/* Doctor Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded-2xl blur-2xl"
                style={{ background: 'rgba(37,99,235,0.2)', transform: 'scale(1.05)' }}
              />
              <div className="relative rounded-2xl overflow-hidden border border-white/10"
                style={{ width: 420, height: 520 }}>
                <Image
                  src="/doctor-hero.png"
                  alt="Dr. Bharat Bhushan - Neurologist Rajasthan"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay gradient */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(6,13,40,0.6) 0%, transparent 60%)' }}
                />
                {/* Name card */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="glass rounded-xl p-4">
                    <p className="font-bold text-white text-lg">Dr. Bharat Bhushan</p>
                    <p className="text-blue-300 text-sm">MBBS, MD (Neurology)</p>
                    <p className="text-white/60 text-xs mt-1">Neuro & Healthcare Specialist • Rajasthan</p>
                  </div>
                </div>
              </div>

              {/* Floating stat cards */}
              <div className="absolute -left-8 top-1/4 glass rounded-xl p-3 animate-float" style={{ animationDelay: '0s' }}>
                <p className="text-2xl font-bold gradient-text">10K+</p>
                <p className="text-xs text-white/60">Patients Treated</p>
              </div>
              <div className="absolute -right-8 top-1/2 glass rounded-xl p-3 animate-float" style={{ animationDelay: '2s' }}>
                <p className="text-2xl font-bold gradient-text">15+</p>
                <p className="text-xs text-white/60">Years Experience</p>
              </div>
              <div className="absolute -left-8 bottom-1/4 glass rounded-xl p-3 animate-float" style={{ animationDelay: '4s' }}>
                <p className="text-2xl font-bold" style={{ color: '#fbbf24' }}>⭐ 4.9</p>
                <p className="text-xs text-white/60">Patient Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs text-white/50 tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 border border-white/30 rounded-full flex items-start justify-center pt-1">
          <div
            className="w-1 h-2 bg-blue-400 rounded-full"
            style={{ animation: 'float 1.5s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  );
}
