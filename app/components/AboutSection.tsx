'use client';

import Image from 'next/image';

const QUALIFICATIONS = [
  { degree: 'MBBS', institution: 'Rajasthan University of Health Sciences', year: '2004' },
  { degree: 'MD – Neurology', institution: 'SMS Medical College, Jaipur', year: '2009' },
  { degree: 'Fellowship – Neuroscience', institution: 'AIIMS New Delhi', year: '2011' },
];

const EXPERTISE = [
  'Epilepsy & Seizure Disorders',
  'Migraine & Headache Management',
  'Stroke Prevention & Rehabilitation',
  'Parkinson\'s Disease',
  'Neuropathy & Nerve Pain',
  'Multiple Sclerosis',
  'Dementia & Memory Disorders',
  'Sleep Disorders (Neurology)',
  'Diabetes Neuropathy',
  'Vertigo & Balance Disorders',
];

const AWARDS = [
  { icon: '🏆', title: 'Best Neurologist Award', body: 'Rajasthan Medical Association, 2022' },
  { icon: '🌟', title: 'Excellence in Healthcare', body: 'IMA Rajasthan Chapter, 2020' },
  { icon: '🎖️', title: 'Community Health Hero', body: 'State Govt. of Rajasthan, 2019' },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding" style={{ background: 'linear-gradient(180deg, #060d28 0%, #0a1540 100%)' }}>
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">About The Doctor</p>
          <h2 className="section-title gradient-text">
            Dr. Bharat Bhushan
          </h2>
          <div className="divider-line mx-auto" />
          <p className="section-subtitle mx-auto text-center">
            Rajasthan's most trusted neurologist with over 15 years of dedicated service to patients across the region.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Image + Stats */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden" style={{ height: 500 }}>
              <Image
                src="/clinic-interior.png"
                alt="Dr. Bharat Bhushan – Neurology Clinic"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(6,13,40,0.8) 0%, transparent 50%)' }}
              />
            </div>

            {/* Awards overlay */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {AWARDS.map((award) => (
                <div key={award.title} className="glass-card card-shine rounded-xl p-4 text-center">
                  <span className="text-3xl">{award.icon}</span>
                  <p className="text-xs font-semibold text-white mt-2 leading-tight">{award.title}</p>
                  <p className="text-xs text-white/40 mt-1">{award.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            {/* Bio */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">A Life Dedicated to Healing</h3>
              <p className="text-white/60 leading-relaxed mb-4">
                Dr. Bharat Bhushan is a distinguished neurologist based in Rajasthan, India, with over 15 years of clinical experience treating complex neurological conditions. His patient-first philosophy, combined with cutting-edge diagnostic techniques, has made him one of the most trusted healthcare professionals in the region.
              </p>
              <p className="text-white/60 leading-relaxed">
                He has treated more than 10,000 patients across Rajasthan, helping them manage conditions ranging from migraines and epilepsy to Parkinson's disease and stroke rehabilitation. Dr. Bhushan is known for his empathetic approach and thorough diagnostic process.
              </p>
            </div>

            {/* Qualifications */}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-blue-500" /> Education & Qualifications
              </h4>
              <div className="space-y-3">
                {QUALIFICATIONS.map((q) => (
                  <div key={q.degree} className="flex items-start gap-4 glass-card rounded-xl p-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-white">{q.degree}</p>
                      <p className="text-sm text-white/60">{q.institution}</p>
                      <p className="text-xs text-blue-400 mt-0.5">{q.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expertise */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-teal-500" /> Areas of Expertise
              </h4>
              <div className="flex flex-wrap gap-2">
                {EXPERTISE.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-sm rounded-full text-blue-300 font-medium"
                    style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)' }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
