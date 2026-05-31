'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '#about', label: 'About Doctor' },
    { href: '#specialities', label: 'Specialities' },
    { href: '#services', label: 'Services' },
    { href: '#appointment', label: 'Book Appointment' },
    { href: '#gallery', label: 'Clinic Gallery' },
    { href: '#contact', label: 'Contact' },
  ];

  const specialities = [
    'Neurology', 'Brain & Nerve Care',
    'General Medicine', 'Diabetes Care',
    'Preventive Health', 'General Consultation',
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer
      style={{ background: 'linear-gradient(180deg, #060d28 0%, #040a1e 100%)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* Main footer */}
      <div className="container-max section-padding !py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <p className="text-white font-bold text-xl">Dr. Bharat Bhushan</p>
              <p className="text-blue-400 text-sm font-medium tracking-widest uppercase">Neuro &amp; Healthcare Clinic</p>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              {"Rajasthan's trusted neurologist delivering world-class healthcare with compassion, expertise, and over 15 years of dedicated service."}
            </p>
            <div className="space-y-2">
              <a
                href="tel:+918696352862"
                className="flex items-center gap-3 text-white/70 hover:text-white text-sm transition-colors"
              >
                <span className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center flex-shrink-0">📞</span>
                +91 8696352862
              </a>
              <a
                href="https://wa.me/918696352862"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white text-sm transition-colors"
              >
                <span className="w-8 h-8 rounded-lg bg-green-600/20 flex items-center justify-center flex-shrink-0">💬</span>
                WhatsApp: +91 8696352862
              </a>
              <div className="flex items-center gap-3 text-white/50 text-sm">
                <span className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center flex-shrink-0">📍</span>
                Rajasthan, India
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-blue-500" /> Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-white/55 text-sm hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialities */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-teal-500" /> Specialities
            </h4>
            <ul className="space-y-2.5">
              {specialities.map((s) => (
                <li key={s}>
                  <a
                    href="#specialities"
                    onClick={(e) => handleNavClick(e, '#specialities')}
                    className="text-white/55 text-sm hover:text-teal-400 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-3 h-3 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Powered by SiteLab */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-purple-500" /> Designed By
            </h4>

            {/* SiteLab Brand */}
            <div
              className="rounded-xl p-4 mb-5"
              style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(37,99,235,0.15) 100%)', border: '1px solid rgba(139,92,246,0.25)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">⚡</span>
                <div>
                  <p className="font-bold text-white text-base">SiteLab India</p>
                  <p className="text-purple-400 text-xs">Premium Web Solutions</p>
                </div>
              </div>
              <p className="text-white/50 text-xs leading-relaxed mb-3">
                We build premium medical websites, clinic demos, and digital solutions for healthcare professionals across India.
              </p>
              <div className="space-y-1.5">
                <a
                  href="https://sitelabindia.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                >
                  🌐 sitelabindia.in
                </a>
                <a
                  href="tel:+918696352862"
                  className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  📞 +91 8696352862
                </a>
                <a
                  href="https://wa.me/918696352862?text=Hello%20SiteLab%20India%2C%20I%20want%20a%20website%20for%20my%20clinic."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-green-400 hover:text-green-300 transition-colors"
                >
                  💬 WhatsApp: +91 8696352862
                </a>
              </div>
            </div>

            <a
              href="https://wa.me/918696352862?text=Hello%20SiteLab%20India%2C%20I%20want%20a%20website%20for%20my%20clinic."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full !justify-center !text-xs !py-2.5"
              id="footer-sitelab-whatsapp"
            >
              Get Your Clinic Website
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container-max py-5 px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>&copy; {currentYear} Dr. Bharat Bhushan Neuro &amp; Healthcare Clinic. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Designed &amp; Powered by{' '}
            <a
              href="https://sitelabindia.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors font-semibold"
            >
              ⚡ SiteLab India
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
