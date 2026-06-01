import { z } from 'zod';
import { DEPARTMENTS } from '@/types';

// ─── Appointment booking validation ──────────────────────────────────────────

export const createAppointmentSchema = z.object({
  patient_name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s.'"-]+$/, 'Name contains invalid characters'),

  patient_email: z
    .string()
    .email('Please enter a valid email address')
    .max(255),

  patient_mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),

  patient_age: z
    .number()
    .int()
    .min(1, 'Age must be at least 1')
    .max(120, 'Age must be realistic')
    .optional(),

  patient_gender: z
    .string()
    .refine(
      (v) => ['Male', 'Female', 'Other', 'Prefer not to say'].includes(v),
      { message: 'Invalid gender value' }
    )
    .optional(),

  department: z
    .string({ error: 'Please select a department' })
    .refine(
      (val) => (DEPARTMENTS as readonly string[]).includes(val),
      { message: 'Please select a valid department' }
    ),

  appointment_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format')
    .refine((date) => {
      const d = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return d >= today;
    }, 'Appointment date must be today or in the future')
    .refine((date) => {
      const d = new Date(date);
      const maxDate = new Date();
      maxDate.setMonth(maxDate.getMonth() + 3);
      return d <= maxDate;
    }, 'Cannot book more than 3 months in advance'),

  appointment_time: z
    .string()
    .regex(/^([01]?\d|2[0-3]):([0-5]\d)$/, 'Invalid time format'),

  symptoms: z
    .string()
    .max(500, 'Symptoms must be less than 500 characters')
    .optional(),

  notes: z
    .string()
    .max(500, 'Notes must be less than 500 characters')
    .optional(),
});

// ─── Contact form validation ──────────────────────────────────────────────────

export const createContactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100),

  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),

  email: z
    .string()
    .max(255)
    .refine(
      (v) => v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      { message: 'Please enter a valid email address' }
    )
    .optional(),

  message: z
    .string()
    .max(1000, 'Message must be less than 1000 characters')
    .optional(),
});

// ─── Status update validation ─────────────────────────────────────────────────

export const updateStatusSchema = z.object({
  status: z
    .string()
    .refine(
      (v) => ['pending', 'confirmed', 'cancelled', 'completed'].includes(v),
      { message: 'Invalid status value' }
    ),
});

// ─── Slot query validation ────────────────────────────────────────────────────

export const slotQuerySchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type CreateContactInput = z.infer<typeof createContactSchema>;
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
