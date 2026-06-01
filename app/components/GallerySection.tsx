'use client';

import { useState } from 'react';
import Image from 'next/image';

const GALLERY_ITEMS = [
  {
    src: '/clinic-interior.png',
    alt: 'Modern Neurology Clinic – Advanced Equipment',
    label: 'Advanced MRI Suite',
    category: 'Equipment',
  },
  {
    src: '/doctor-hero.png',
    alt: 'Dr. Bharat Bhushan – Expert Neurologist',
    label: 'Dr. Bharat Bhushan',
    category: 'Doctor',
  },
  {
    src: '/clinic-gallery2.png',
    alt: 'Patient Consultation Room',
    label: 'Consultation Room',
    category: 'Clinic',
  },
  {
    src: '/clinic-gallery3.png',
    alt: 'EEG & Diagnostics Lab',
    label: 'Diagnostics Lab',
    category: 'Equipment',
  },
  {
    src: '/clinic-waiting.png',
    alt: 'Premium Patient Waiting Area',
    label: 'Waiting Lounge',
    category: 'Clinic',
  },
  {
    src: '/clinic-interior.png',
    alt: 'State-of-the-art Healthcare Facility',
    label: 'Treatment Suite',
    category: 'Clinic',
  },
];

const CATEGORIES = ['All', 'Clinic', 'Equipment', 'Doctor'];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((g) => g.category === activeCategory);

  return (
    <section
      id="gallery"
      className="section-padding"
      style={{ background: 'linear-gradient(180deg, #0a1540 0%, #060d28 100%)' }}
    >
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-teal-400 font-semibold text-sm uppercase tracking-widest mb-3">Our Facility</p>
          <h2 className="section-title">
            Clinic <span className="gradient-text">Gallery</span>
          </h2>
          <div className="divider-line mx-auto" />
          <p className="section-subtitle mx-auto text-center">
            State-of-the-art facilities designed to provide the highest standard of medical care.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'glass text-white/70 hover:text-white hover:border-blue-500/40'
              }`}
              id={`gallery-filter-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((item, idx) => (
            <button
              key={`${item.src}-${idx}`}
              onClick={() => setLightbox(item.src)}
              className="relative rounded-xl overflow-hidden group cursor-pointer"
              style={{ aspectRatio: idx === 0 || idx === 3 ? '16/10' : '4/3' }}
              id={`gallery-item-${idx}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 400px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center"
                style={{ background: 'rgba(6,13,40,0.7)' }}
              >
                <svg className="w-10 h-10 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
                <span className="text-white font-semibold text-sm">{item.label}</span>
                <span className="text-white/60 text-xs">{item.category}</span>
              </div>

              {/* Label */}
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-3 transition-transform duration-300 group-hover:translate-y-full"
                style={{ background: 'linear-gradient(to top, rgba(6,13,40,0.9), transparent)' }}
              >
                <p className="text-white text-sm font-semibold">{item.label}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.9)' }}
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl max-h-full w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors text-lg font-semibold"
              id="lightbox-close-btn"
            >
              ✕ Close
            </button>
            <div className="relative rounded-xl overflow-hidden" style={{ height: '70vh' }}>
              <Image
                src={lightbox}
                alt="Gallery Image"
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
