# Dr. Bharat Bhushan Neuro & Healthcare Clinic — Enterprise Portal

A premium, enterprise-grade medical practice platform and booking system designed for **Dr. Bharat Bhushan Neuro & Healthcare Clinic** (Rajasthan, India), built and maintained by **SiteLab India**.

This platform combines a luxury visual frontend built with modern design principles (glassmorphism, curated typography, and responsive micro-animations) with a fully integrated PostgreSQL/Supabase backend featuring real-time appointments management, dynamic time-slot allocation, and security mechanisms.

---

## 🌟 Key Features

### 🖥️ Premium Medical Frontend
- **Modern UI/UX**: Built with dark mode aesthetics, dynamic particle effects, glassmorphic headers, and scroll-triggered fade-in animations.
- **11 Responsive Sections**: Hero, About (Bio/Qualifications), Stats, Specialities, Services, Appointment Booking, Testimonials, Gallery (with modal lightbox), FAQs, Contact Info (Interactive maps & timings), and Footer.
- **Mobile-First Responsiveness**: Designed using flexible CSS Grid and Tailwind flexboxes to scale from high-res monitors to small smartphones.

### ⚙️ Integrated Booking System
- **Dynamic Slot Picker**: Communicates with `/api/slots` to query appointment availability for a specific date in real-time, grouping slots into Morning (9 AM – 1 PM) and Evening (4 PM – 7 PM).
- **Double-Booking Prevention**: Automatically validates date and time slots on the server to prevent race conditions or duplicate bookings.
- **Real-Time Client-Side Validation**: Ensures accurate input of Indian mobile numbers, emails, name lengths, and required clinical departments.
- **Booking ID Generation**: Provides the patient with a unique, cryptographically distinct booking confirmation code (e.g., `BBN-XXXX-XXXX`) upon successful submission.

### 🛡️ Backend & Security
- **Next.js Server Actions & API Routes**: Modern Route Handlers (`/api/appointments`, `/api/slots`, `/api/contact`, `/api/admin`, `/api/dashboard`) using clean schemas.
- **Supabase PostgreSQL Integration**: Reliable storage of appointments, time slots, and contact leads.
- **Graceful Fallbacks**: Handles missing environment variables gracefully (503 Service Unavailable API response) rather than crashing the Next.js runtime.
- **Strict Validation**: Utilizes Zod schemas on the server to validate input shapes and boundaries.
- **Client IP Rate Limiting**: Throttles contact submissions (max 5/hour) and appointment requests (max 3/hour) per client IP using server-side rate limits.
- **Secure Admin Session Management**: Custom JWT-based authentication for the administrative dashboard.

### 🚀 Production & SEO Optimization
- **Sitemap & Robots**: Dynamic sitemap (`/sitemap.xml`) and robots instruction set (`/robots.txt`) ensuring only public pages are indexed by search engines.
- **Schema.org Structured Data**: Integrates standard JSON-LD `MedicalBusiness` and `Physician` schemas to enable rich snippet support on Google search.
- **SEO & OpenGraph Tags**: Configured with complete canonical tags, geo-localization metadata, Twitter Card specifications, and semantic HTML5 structures.
- **Optimized Next.js Images**: All images (`<Image />` components) utilize responsive `sizes` props and correct priority settings.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescript.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS
- **Database / Backend**: [Supabase](https://supabase.com/) (PostgreSQL client)
- **Validation**: [Zod](https://zod.dev/)
- **Mailing**: [Resend](https://resend.com/) (ready for email triggers)

---

## 📂 Project Structure

```
├── app/
│   ├── admin/             # Admin Login & Appointments Dashboard
│   ├── api/
│   │   ├── admin/         # Admin Login / Verification endpoints
│   │   ├── appointments/  # CRUD & booking endpoints
│   │   ├── contact/       # Contact submission lead capture
│   │   ├── dashboard/     # Appointments statistics feed
│   │   └── slots/         # Dynamic time-slot picker feed
│   ├── components/        # Highly modular React components (Hero, FAQ, Gallery, etc.)
│   ├── favicon.ico
│   ├── globals.css        # Premium styling tokens & keyframes
│   ├── layout.tsx         # Global layout & SEO metadata / JSON-LD schema
│   ├── page.tsx           # Home entry page assembling all sections
│   ├── robots.ts          # Search engine crawler permissions
│   └── sitemap.ts         # Sitemap generator
├── lib/
│   ├── auth.ts            # Admin JWT signing & session verification helpers
│   ├── email.ts           # Email dispatch handling using Resend
│   ├── rate-limit.ts      # Token bucket rate-limiting algorithms
│   ├── supabase/          # Supabase client instantiation utilities
│   ├── utils.ts           # Shared sanitization and mapping helpers
│   └── validation.ts      # Central Zod validation rules
├── public/                # Static assets (images, logos, optimized vectors)
├── types/                 # Standard TypeScript structures
├── package.json
└── tsconfig.json
```

---

## 🔑 Environment Variables Setup

Create a `.env.local` file in the root directory. Use the following keys:

```env
# ─── SUPABASE ─────────────────────────────────────────────────────────────────
# Retrieve these from Supabase Settings -> API
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# ─── ADMIN AUTHENTICATION ─────────────────────────────────────────────────────
# Credentials for accessing /admin dashboard
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your-strong-password"
JWT_SECRET="your-crypto-secret-key-at-least-32-chars"

# ─── MAILING SYSTEM (OPTIONAL) ────────────────────────────────────────────────
# Resend API key for appointment notification emails
RESEND_API_KEY="re_..."
EMAIL_FROM="onboarding@resend.dev"
EMAIL_TO="doctor-notifications@example.com"
```

---

## 🗄️ Supabase Database Schema

To set up the database tables in your Supabase project, execute the following SQL scripts in the **Supabase SQL Editor**:

### 1. Appointments Table
```sql
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id VARCHAR(50) UNIQUE NOT NULL,
  patient_name VARCHAR(100) NOT NULL,
  patient_email VARCHAR(255) NOT NULL,
  patient_mobile VARCHAR(15) NOT NULL,
  patient_age INT,
  patient_gender VARCHAR(20),
  department VARCHAR(100) NOT NULL,
  doctor_name VARCHAR(100) NOT NULL DEFAULT 'Dr. Bharat Bhushan',
  appointment_date DATE NOT NULL,
  appointment_time VARCHAR(10) NOT NULL,
  symptoms TEXT,
  notes TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index appointments to quickly scan dates and status
CREATE INDEX idx_appointments_date_time ON appointments(appointment_date, appointment_time);
CREATE INDEX idx_appointments_status ON appointments(status);
```

### 2. Contact Leads Table
```sql
CREATE TABLE contact_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  mobile VARCHAR(15) NOT NULL,
  email VARCHAR(255),
  message TEXT,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_contact_leads_status ON contact_leads(status);
```

---

## 🚀 Commands

First, install dependencies:
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

### Production Build Verification
To compile the site and verify typescript static check, run:
```bash
npm run build
```

This will run typechecking, linting, and compile static and server assets into `.next/`.

---

## ☁️ Deployment (Vercel)

This application is fully prepared for Vercel deployment:
1. Push your repository to GitHub / GitLab.
2. Link the repository on the [Vercel Dashboard](https://vercel.com).
3. Inject the variables listed in `.env.local` into the **Environment Variables** panel in Vercel project settings.
4. Click **Deploy**. Vercel will build the edge/node routes and serve the static files with ISR/SSR compilation optimized out of the box.

---
*Developed with excellence by [SiteLab India](https://sitelabindia.in).*
