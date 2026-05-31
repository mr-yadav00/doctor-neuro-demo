'use client';

import { useState } from 'react';

const TESTIMONIALS = [
  {
    name: "Ramesh Sharma",
    location: "Jaipur, Rajasthan",
    rating: 5,
    condition: "Epilepsy Patient",
    text: "Dr. Bharat Bhushan is truly a miracle worker. My son had been suffering from epilepsy for 3 years. After meeting Dr. Bhushan, the seizures reduced significantly within 2 months. His calm demeanor and thorough explanation made us feel so confident.",
    avatar: "RS",
    color: "from-blue-500 to-purple-500",
  },
  {
    name: "Sunita Devi",
    location: "Udaipur, Rajasthan",
    rating: 5,
    condition: "Migraine Treatment",
    text: "I had chronic migraines for over 7 years and visited multiple doctors with no relief. Dr. Bharat Bhushan diagnosed my condition correctly in the very first consultation. Now I am virtually migraine-free. Highly recommend him!",
    avatar: "SD",
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Vikram Patel",
    location: "Jodhpur, Rajasthan",
    rating: 5,
    condition: "Stroke Rehabilitation",
    text: "My father had a stroke 6 months ago. Dr. Bhushan's rehabilitation plan has been remarkable. The doctor's patience, expertise, and care have brought my father back to nearly 80% of his normal life. We are forever grateful.",
    avatar: "VP",
    color: "from-teal-500 to-cyan-500",
  },
  {
    name: "Anjali Mehra",
    location: "Kota, Rajasthan",
    rating: 5,
    condition: "Diabetes & Neuropathy",
    text: "Diabetic neuropathy was making my life miserable. Dr. Bharat Bhushan's treatment approach combined diet, medication, and lifestyle changes. The numbness and pain have reduced greatly. Best doctor in Rajasthan!",
    avatar: "AM",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Mohan Lal Gupta",
    location: "Ajmer, Rajasthan",
    rating: 5,
    condition: "Parkinson's Disease",
    text: "My wife was diagnosed with Parkinson's last year. Dr. Bhushan's expertise is exceptional. He explained every aspect of the disease and crafted a treatment plan that has significantly improved her quality of life. Very professional and caring.",
    avatar: "MG",
    color: "from-orange-500 to-yellow-500",
  },
  {
    name: "Priya Rajput",
    location: "Bikaner, Rajasthan",
    rating: 5,
    condition: "Vertigo Treatment",
    text: "I was dealing with severe vertigo for months. Other doctors couldn't pinpoint the cause but Dr. Bhushan identified it immediately. After his treatment I recovered within 3 weeks! His clinic is clean, modern and the staff is very helpful.",
    avatar: "PR",
    color: "from-indigo-500 to-blue-500",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-white/20'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="testimonials"
      className="section-padding"
      style={{ background: 'linear-gradient(180deg, #0a1540 0%, #060d28 100%)' }}
    >
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-yellow-400 font-semibold text-sm uppercase tracking-widest mb-3">Patient Stories</p>
          <h2 className="section-title">
            What Our <span className="gradient-text">Patients Say</span>
          </h2>
          <div className="divider-line mx-auto" style={{ background: 'linear-gradient(90deg, #fbbf24, #f97316)' }} />
          <p className="section-subtitle mx-auto text-center">
            Real stories from real patients who have experienced the highest standard of neurological care.
          </p>
        </div>

        {/* Featured testimonial */}
        <div className="testimonial-card mb-8 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-1 h-full"
            style={{ background: 'linear-gradient(180deg, #2563eb, #2dd4bf)' }}
          />
          <div className="flex flex-col md:flex-row gap-6 items-start pl-4">
            {/* Avatar */}
            <div
              className={`w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center text-xl font-bold text-white bg-gradient-to-br ${TESTIMONIALS[active].color}`}
            >
              {TESTIMONIALS[active].avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <StarRating rating={TESTIMONIALS[active].rating} />
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(37,99,235,0.15)', color: '#93c5fd', border: '1px solid rgba(37,99,235,0.3)' }}
                >
                  {TESTIMONIALS[active].condition}
                </span>
              </div>
              <p className="text-white/80 text-base leading-relaxed mb-4 italic">
                &ldquo;{TESTIMONIALS[active].text}&rdquo;
              </p>
              <div>
                <p className="font-bold text-white">{TESTIMONIALS[active].name}</p>
                <p className="text-white/50 text-sm">{TESTIMONIALS[active].location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.name}
              onClick={() => setActive(idx)}
              className={`testimonial-card text-left transition-all duration-300 ${
                active === idx
                  ? 'border-blue-500/50 bg-blue-900/20'
                  : ''
              }`}
              id={`testimonial-btn-${idx}`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br ${t.color}`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.location}</p>
                </div>
              </div>
              <StarRating rating={t.rating} />
              <p className="text-white/55 text-sm mt-2 line-clamp-2">{t.text}</p>
              <span
                className="text-xs mt-2 inline-block px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(37,99,235,0.12)', color: '#93c5fd', border: '1px solid rgba(37,99,235,0.2)' }}
              >
                {t.condition}
              </span>
            </button>
          ))}
        </div>

        {/* Overall rating */}
        <div className="mt-12 glass rounded-2xl p-6 text-center">
          <div className="flex justify-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-7 h-7 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-4xl font-black text-white mb-1">4.9 / 5</p>
          <p className="text-white/50 text-sm">Based on 1,200+ patient reviews</p>
        </div>
      </div>
    </section>
  );
}
