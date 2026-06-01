// Appointment statuses
export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

// Gender options
export type Gender = 'Male' | 'Female' | 'Other' | 'Prefer not to say';

// Contact lead status
export type LeadStatus = 'new' | 'contacted' | 'resolved';

// ─── Database row types ────────────────────────────────────────────────────────

export interface Appointment {
  id: string;
  booking_id: string;
  patient_name: string;
  patient_email: string;
  patient_mobile: string;
  patient_age: number | null;
  patient_gender: Gender | null;
  department: string;
  doctor_name: string;
  appointment_date: string; // ISO date string YYYY-MM-DD
  appointment_time: string; // e.g. "09:00"
  symptoms: string | null;
  notes: string | null;
  status: AppointmentStatus;
  created_at: string;
  updated_at: string;
}

export interface ContactLead {
  id: string;
  name: string;
  mobile: string;
  email: string | null;
  message: string | null;
  status: LeadStatus;
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  category: string | null;
  is_active: boolean;
  created_at: string;
}

// ─── API request/response types ───────────────────────────────────────────────

export interface CreateAppointmentRequest {
  patient_name: string;
  patient_email: string;
  patient_mobile: string;
  patient_age?: number;
  patient_gender?: Gender;
  department: string;
  appointment_date: string;
  appointment_time: string;
  symptoms?: string;
  notes?: string;
}

export interface CreateContactRequest {
  name: string;
  mobile: string;
  email?: string;
  message?: string;
}

export interface UpdateAppointmentStatusRequest {
  status: AppointmentStatus;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ─── Dashboard metrics ────────────────────────────────────────────────────────

export interface DashboardMetrics {
  total_today: number;
  total_week: number;
  total_month: number;
  total_all: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  recent: Appointment[];
}

// ─── Time slot ────────────────────────────────────────────────────────────────

export interface TimeSlot {
  time: string;      // "09:00"
  label: string;     // "9:00 AM"
  available: boolean;
}

// ─── Departments ──────────────────────────────────────────────────────────────

export const DEPARTMENTS = [
  'Neurology',
  'General Medicine',
  'Diabetes & Endocrinology',
  'Preventive Health Check',
  'Headache & Migraine Clinic',
  'Stroke & Rehabilitation',
  "Parkinson's & Movement Disorders",
  'Epilepsy Clinic',
  'Memory & Cognitive Disorders',
  'General Consultation',
] as const;

export type Department = typeof DEPARTMENTS[number];

// ─── Admin auth ───────────────────────────────────────────────────────────────

export interface AdminSession {
  authenticated: boolean;
  exp: number;
}
